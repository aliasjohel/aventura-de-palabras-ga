-- Purchases share the wallet lock with costumes and profile backgrounds.
create table versus_private.character_inventory (
 user_id uuid primary key references auth.users(id) on delete cascade,
 owned text[] not null default '{}'::text[],
 revision bigint not null default 0 check(revision>=0),
 constraint character_inventory_known check(owned <@ array['hombre_lobo','kairos','kalamo','guardian_alba','t_shadow']::text[])
);
alter table versus_private.character_inventory enable row level security;
revoke all on versus_private.character_inventory from public,anon,authenticated;
create function versus_private.game_characters(p_action text,p_character text)
returns jsonb language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid(); inv versus_private.character_inventory; cost integer; wallet jsonb;
begin
 if u is null then raise exception 'Iniciá sesión para comprar personajes.'; end if;
 if p_action is null or p_action not in ('sync','purchase') then raise exception 'Acción inválida.'; end if;
 cost:=case p_character when 'hombre_lobo' then 200 when 'kairos' then 250 when 'kalamo' then 300 when 'guardian_alba' then 300 when 't_shadow' then 350 else null end;
 if p_action='purchase' and cost is null then raise exception 'Personaje no disponible.'; end if;
 wallet:=versus_private.sync_game_wallet(null,'[]'::jsonb,null,null);
 insert into versus_private.character_inventory(user_id) values(u) on conflict do nothing;
 select * into inv from versus_private.character_inventory where user_id=u for update;
 if p_action='purchase' and not(p_character=any(inv.owned)) then
  update versus_private.game_wallets set coins=coins-cost,revision=revision+1 where user_id=u and coins>=cost;
  if not found then raise exception 'No tenés suficientes monedas para este personaje.'; end if;
  inv.owned:=array_append(inv.owned,p_character);inv.revision:=inv.revision+1;
  update versus_private.character_inventory set owned=inv.owned,revision=inv.revision where user_id=u;
  wallet:=versus_private.sync_game_wallet(null,'[]'::jsonb,null,null);
 end if;
 return wallet || jsonb_build_object('characters',jsonb_build_object('userId',u,'owned',inv.owned,'revision',inv.revision));
end $$;
revoke all on function versus_private.game_characters(text,text) from public,anon,authenticated;
grant execute on function versus_private.game_characters(text,text) to authenticated;
create function public.game_characters(p_action text default 'sync',p_character text default null)
returns jsonb language sql security invoker set search_path='' as $$select versus_private.game_characters(p_action,p_character)$$;
revoke all on function public.game_characters(text,text) from public,anon,authenticated;
grant execute on function public.game_characters(text,text) to authenticated;

CREATE OR REPLACE FUNCTION public.set_versus_character(p_room_id uuid, p_character_key text, p_ready boolean DEFAULT true)
 RETURNS versus_rooms
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_user_id uuid := auth.uid();
  v_room public.versus_rooms;
  v_player_count integer;
  v_ready_count integer;
begin
  perform private.assert_versus_available(
    array(select user_id from public.versus_players where room_id=p_room_id) || array[auth.uid()],p_room_id);
  if v_user_id is null then raise exception 'Debes iniciar una sesión antes de elegir personaje.'; end if;
  if p_character_key not in (
    'explorador', 'mago', 'guardiana', 'dragon', 'hombre_lobo', 't_shadow',
    'guardian_alba', 'dragon_hielo', 'azrak', 'kalamo', 'kairos'
  ) then
    raise exception 'El personaje elegido no es válido.';
  end if;

  if p_character_key in ('hombre_lobo','kairos','kalamo','guardian_alba','t_shadow')
    and not exists(select 1 from versus_private.character_inventory where user_id=v_user_id and p_character_key=any(owned)) then
    raise exception 'Primero comprá este personaje en la tienda.';
  end if;

  select * into v_room from public.versus_rooms where id = p_room_id for update;
  if not found or not public.is_versus_room_member(p_room_id) then
    raise exception 'No perteneces a esta sala.';
  end if;
  if v_room.status not in ('complete', 'preparing') then
    raise exception 'La sala todavía no está lista para elegir personajes.';
  end if;

  update public.versus_players
  set character_key = p_character_key, ready = p_ready
  where room_id = p_room_id and user_id = v_user_id;

  select count(*), count(*) filter (where ready)
  into v_player_count, v_ready_count
  from public.versus_players where room_id = p_room_id;

  update public.versus_rooms
  set status = case when v_player_count = 2 and v_ready_count = 2 then 'preparing' else 'complete' end
  where id = p_room_id returning * into v_room;
  return v_room;
end;
$function$
;

