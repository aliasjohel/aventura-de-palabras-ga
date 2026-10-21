-- Additive inventory; existing wallet, costumes and match history are retained.
create table versus_private.profile_background_inventory (
 user_id uuid primary key references auth.users(id) on delete cascade,
 owned text[] not null default array['bosque']::text[],
 equipped text not null default 'bosque',
 revision bigint not null default 0 check(revision>=0),
 legacy_done boolean not null default false,
 constraint profile_background_known check(owned <@ array['bosque','desierto','zafir','cumbres','hielo','azrak']::text[]),
 constraint profile_background_owned check(equipped=any(owned))
);
alter table versus_private.profile_background_inventory enable row level security;
revoke all on versus_private.profile_background_inventory from public,anon,authenticated;

create function versus_private.profile_backgrounds(p_action text,p_background text,p_legacy_worlds integer)
returns jsonb language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid(); inv versus_private.profile_background_inventory;
 old_owned text[]; old_equipped text; cost integer; worlds integer:=0; points bigint;
begin
 if u is null then raise exception 'Iniciá sesión para guardar tus fondos.'; end if;
 if p_action is null or p_action not in ('sync','purchase','equip') then raise exception 'Acción de fondo inválida.'; end if;
 if p_legacy_worlds is null or p_legacy_worlds not between 0 and 5 then raise exception 'Progreso anterior inválido.'; end if;
 if p_action in ('purchase','equip') and (p_background is null or p_background not in ('bosque','desierto','zafir','cumbres','hielo','azrak')) then raise exception 'Fondo no disponible.'; end if;
 -- All callers take the existing wallet lock first, including costume purchases.
 perform versus_private.sync_game_wallet(null,'[]'::jsonb,null,null);
 insert into versus_private.profile_background_inventory(user_id) values(u) on conflict do nothing;
 select * into inv from versus_private.profile_background_inventory where user_id=u for update;
 old_owned:=inv.owned; old_equipped:=inv.equipped;
 -- Preserve offline Adventure achievements once, as the game already does for
 -- legacy coins and frames. This is not an anti-cheat attestation of local play.
 if not inv.legacy_done then worlds:=p_legacy_worlds; end if;
 if worlds>=3 or exists(select 1 from versus_private.adventure_coin_events where user_id=u and origin='aventura:nimbus_cumbres:duelo') then
  if not ('cumbres'=any(inv.owned)) then inv.owned:=array_append(inv.owned,'cumbres'); end if;
 end if;
 if worlds>=4 or exists(select 1 from versus_private.adventure_coin_events where user_id=u and origin='aventura:nivor_cero_absoluto:duelo') then
  if not ('hielo'=any(inv.owned)) then inv.owned:=array_append(inv.owned,'hielo'); end if;
 end if;
 -- after_points preserves a genuinely reached rank even after a later loss.
 select greatest(coalesce(sum(r.points),0),coalesce(max(r.after_points),0)) into points
 from versus_private.ranked_results r where r.user_id=u;
 if points>=240 and not ('azrak'=any(inv.owned)) then inv.owned:=array_append(inv.owned,'azrak'); end if;
 if p_action='purchase' then
  cost:=case p_background when 'desierto' then 100 when 'zafir' then 150 else null end;
  if cost is null then raise exception 'Este fondo se consigue mediante un logro.'; end if;
  if not (p_background=any(inv.owned)) then
   update versus_private.game_wallets set coins=coins-cost,revision=revision+1 where user_id=u and coins>=cost;
   if not found then raise exception 'No tenés suficientes monedas para este fondo.'; end if;
   inv.owned:=array_append(inv.owned,p_background);
  end if;
 elsif p_action='equip' then
  if not (p_background=any(inv.owned)) then raise exception 'Primero conseguí este fondo.'; end if;
  inv.equipped:=p_background;
 end if;
 if inv.owned<>old_owned or inv.equipped<>old_equipped or not inv.legacy_done then inv.revision:=inv.revision+1; end if;
 update versus_private.profile_background_inventory set owned=inv.owned,equipped=inv.equipped,revision=inv.revision,legacy_done=true where user_id=u;
 return versus_private.sync_game_wallet(null,'[]'::jsonb,null,null) || jsonb_build_object('backgrounds',jsonb_build_object('userId',u,'owned',inv.owned,'equipped',inv.equipped,'revision',inv.revision));
end $$;
revoke all on function versus_private.profile_backgrounds(text,text,integer) from public,anon,authenticated;
grant execute on function versus_private.profile_backgrounds(text,text,integer) to authenticated;
create function public.profile_backgrounds(p_action text default 'sync',p_background text default null,p_legacy_worlds integer default 0)
returns jsonb language sql security invoker set search_path='' as $$select versus_private.profile_backgrounds(p_action,p_background,p_legacy_worlds)$$;
revoke all on function public.profile_backgrounds(text,text,integer) from public,anon,authenticated;
grant execute on function public.profile_backgrounds(text,text,integer) to authenticated;

CREATE OR REPLACE FUNCTION versus_private.public_player_profile(p_user_id uuid DEFAULT NULL::uuid, p_offset integer DEFAULT 0)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare u uuid:=coalesce(p_user_id,auth.uid()); result jsonb; favorites jsonb; recent jsonb; place bigint;
begin
  if auth.uid() is null then raise exception 'Iniciá sesión para ver los perfiles.'; end if;
  if p_offset is null or p_offset<0 or p_offset>100000 then raise exception 'Página inválida.'; end if;
  if u<>auth.uid() and not exists(select 1 from public.versus_profiles where user_id=u)
    and not exists(select 1 from versus_private.player_history where user_id=u)
    and not exists(select 1 from public.versus_players where user_id=u) then
    raise exception 'Este perfil ya no está disponible.';
  end if;
  with scores as (
    select user_id,sum(points) points,count(*) filter(where win) wins from versus_private.ranked_results group by user_id
  ), positions as(select user_id,rank() over(order by points desc,wins desc) position from scores)
  select position into place from positions where user_id=u;
  select coalesce(jsonb_agg(to_jsonb(f)),'[]'::jsonb) into favorites from (
    select character_key as character,count(*) as played,count(*) filter(where win) as wins
    from versus_private.player_history where user_id=u and character_key is not null
    group by character_key order by count(*) desc,count(*) filter(where win) desc,character_key limit 3
  ) f;
  select coalesce(jsonb_agg(to_jsonb(r)),'[]'::jsonb) into recent from (
    select h.match_id,h.finished_at,h.win,h.draw,h.ranked,h.character_key as character,
      opponent.user_id as opponent_id,
      case when public.versus_alias_inappropriate(coalesce(p.alias,opponent.alias)) then 'Aventurero'
        else coalesce(p.alias,opponent.alias,'Rival no disponible') end as opponent_alias,
      opponent.character_key as opponent_character
    from (select * from versus_private.player_history where user_id=u order by finished_at desc nulls last,match_id desc limit 20 offset p_offset) h
    left join lateral(select * from versus_private.player_history o where o.match_id=h.match_id and o.user_id<>u order by o.user_id limit 1) opponent on true
    left join public.versus_profiles p on p.user_id=opponent.user_id
    order by h.finished_at desc nulls last,h.match_id desc
  ) r;
  select jsonb_build_object(
    'id',u,
    'alias',coalesce((select alias from public.versus_profiles where user_id=u),
      (select alias from public.versus_players where user_id=u order by joined_at desc limit 1),
      (select alias from versus_private.player_history where user_id=u order by finished_at desc nulls last,match_id desc limit 1),'Aventurero'),
    'avatar',coalesce((select avatar_key from versus_private.player_appearance where user_id=u),'explorador'),
    'frame',coalesce((select frame_key from versus_private.player_appearance where user_id=u),'clasico'),
    'background',coalesce((select equipped from versus_private.profile_background_inventory where user_id=u),'bosque'),
    'played',count(*),'wins',count(*) filter(where win),'draws',count(*) filter(where draw),
    'losses',count(*) filter(where not win and not draw),
    'points',coalesce((select sum(points) from versus_private.ranked_results where user_id=u),0),
    'position',place,'favorites',favorites,'recent',recent,'has_more',count(*)>p_offset+20,
    'legacy_played',count(*) filter(where character_key is null)
  ) into result from versus_private.player_history where user_id=u;
  if public.versus_alias_inappropriate(result->>'alias') then result:=jsonb_set(result,'{alias}','"Aventurero"'); end if;
  return result || jsonb_build_object('rank',public.versus_rank_info((result->>'points')::bigint));
end $function$;

notify pgrst, 'reload schema';

