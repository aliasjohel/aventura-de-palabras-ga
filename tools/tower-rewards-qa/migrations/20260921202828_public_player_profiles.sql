-- Public game profiles expose game identity and server-authored results only.
create table versus_private.player_appearance (
  user_id uuid primary key references auth.users(id) on delete cascade,
  avatar_key text not null,
  frame_key text not null,
  updated_at timestamptz not null default now(),
  check (avatar_key in ('explorador','mago','guardian-alba','t-shadow','kalamo','dragon','dragon-hielo','hombre-lobo','azrak')),
  check (frame_key in ('clasico','bosque','hielo','fuego','arcano','real'))
);
alter table versus_private.player_appearance enable row level security;
revoke all on versus_private.player_appearance from public, anon, authenticated;
insert into versus_private.player_appearance(user_id,avatar_key,frame_key)
select distinct on(user_id) user_id,avatar_key,frame_key from public.versus_players order by user_id,joined_at desc;
create index player_history_match_opponent_idx on versus_private.player_history(match_id,user_id);
create index player_history_recent_idx on versus_private.player_history(user_id,finished_at desc,match_id);

create function versus_private.save_player_appearance(p_avatar text,p_frame text) returns void
language plpgsql security definer set search_path='' as $$
begin
  if auth.uid() is null then raise exception 'Iniciá sesión para guardar tu apariencia.'; end if;
  insert into versus_private.player_appearance(user_id,avatar_key,frame_key) values(auth.uid(),p_avatar,p_frame)
  on conflict(user_id) do update set avatar_key=excluded.avatar_key,frame_key=excluded.frame_key,updated_at=now()
  where (player_appearance.avatar_key,player_appearance.frame_key) is distinct from (excluded.avatar_key,excluded.frame_key);
end $$;
revoke all on function versus_private.save_player_appearance(text,text) from public,anon,authenticated;
grant execute on function versus_private.save_player_appearance(text,text) to authenticated;
create function public.save_versus_appearance(p_avatar text,p_frame text) returns void
language sql security invoker set search_path='' as $$ select versus_private.save_player_appearance(p_avatar,p_frame) $$;
revoke all on function public.save_versus_appearance(text,text) from public,anon,authenticated;
grant execute on function public.save_versus_appearance(text,text) to authenticated;

create function versus_private.public_player_profile(p_user_id uuid default null,p_offset integer default 0) returns jsonb
language plpgsql security definer set search_path='' as $$
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
    'played',count(*),'wins',count(*) filter(where win),'draws',count(*) filter(where draw),
    'losses',count(*) filter(where not win and not draw),
    'points',coalesce((select sum(points) from versus_private.ranked_results where user_id=u),0),
    'position',place,'favorites',favorites,'recent',recent,'has_more',count(*)>p_offset+20,
    'legacy_played',count(*) filter(where character_key is null)
  ) into result from versus_private.player_history where user_id=u;
  if public.versus_alias_inappropriate(result->>'alias') then result:=jsonb_set(result,'{alias}','"Aventurero"'); end if;
  return result;
end $$;
revoke all on function versus_private.public_player_profile(uuid,integer) from public,anon,authenticated;
grant execute on function versus_private.public_player_profile(uuid,integer) to authenticated;
create function public.get_versus_public_profile(p_user_id uuid default null,p_offset integer default 0) returns jsonb
language sql security invoker set search_path='' as $$ select versus_private.public_player_profile(p_user_id,p_offset) $$;
revoke all on function public.get_versus_public_profile(uuid,integer) from public,anon,authenticated;
grant execute on function public.get_versus_public_profile(uuid,integer) to authenticated;

-- Include a stable player identifier in ranking rows so their profiles can be opened.
create or replace function versus_private.ranking() returns jsonb
language plpgsql security definer set search_path='' as $$
declare result jsonb;
begin
 if auth.uid() is null then raise exception 'Iniciá sesión para ver el ranking.'; end if;
 with scores as (
 select r.user_id,coalesce(max(p.alias),max(r.alias)) as alias,sum(r.points) as points,count(*) as played,count(*) filter(where r.win) as wins,count(*) filter(where r.draw) as draws
 from versus_private.ranked_results r left join public.versus_profiles p on p.user_id=r.user_id group by r.user_id
 ), positions as (select *,rank() over(order by points desc,wins desc) as position from scores),
 visible as (select user_id,position,case when public.versus_alias_inappropriate(alias) then 'Aventurero' else alias end as alias,points,played,wins,draws,user_id=auth.uid() as me from positions where position<=50 or user_id=auth.uid() order by position,alias limit 51)
 select coalesce(jsonb_agg(to_jsonb(visible)),'[]'::jsonb) into result from visible;
 return result;
end $$;
