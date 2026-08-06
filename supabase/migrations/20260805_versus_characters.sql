-- Sincronización de selección de personajes del modo versus.
-- Ejecutar después de 20260805_versus_lobby.sql.

create or replace function public.set_versus_character(
  p_room_id uuid,
  p_character_key text,
  p_ready boolean default true
)
returns public.versus_rooms
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_room public.versus_rooms;
  v_player_count integer;
  v_ready_count integer;
begin
  if v_user_id is null then
    raise exception 'Debes iniciar una sesión antes de elegir personaje.';
  end if;

  if p_character_key not in ('explorador', 'mago', 'guardiana', 'dragon') then
    raise exception 'El personaje elegido no es válido.';
  end if;

  select * into v_room
  from public.versus_rooms
  where id = p_room_id
  for update;

  if not found or not public.is_versus_room_member(p_room_id) then
    raise exception 'No perteneces a esta sala.';
  end if;

  if v_room.status not in ('complete', 'preparing') then
    raise exception 'La sala todavía no está lista para elegir personajes.';
  end if;

  update public.versus_players
  set character_key = p_character_key,
      ready = p_ready
  where room_id = p_room_id
    and user_id = v_user_id;

  select count(*), count(*) filter (where ready)
  into v_player_count, v_ready_count
  from public.versus_players
  where room_id = p_room_id;

  update public.versus_rooms
  set status = case
    when v_player_count = 2 and v_ready_count = 2 then 'preparing'
    else 'complete'
  end
  where id = p_room_id
  returning * into v_room;

  return v_room;
end;
$$;

-- Si el invitado abandona, el anfitrión debe volver a confirmar su selección
-- antes de jugar con un nuevo rival.
create or replace function public.leave_versus_room(p_room_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_host_id uuid;
begin
  select host_id into v_host_id
  from public.versus_rooms
  where id = p_room_id;

  if not found then
    return;
  end if;

  if v_host_id = v_user_id then
    delete from public.versus_rooms where id = p_room_id;
    return;
  end if;

  if not exists (
    select 1 from public.versus_players
    where room_id = p_room_id and user_id = v_user_id
  ) then
    raise exception 'No perteneces a esta sala.';
  end if;

  delete from public.versus_players
  where room_id = p_room_id and user_id = v_user_id;

  update public.versus_players
  set ready = false,
      character_key = null
  where room_id = p_room_id;

  update public.versus_rooms
  set status = 'waiting'
  where id = p_room_id;
end;
$$;

revoke execute on function public.set_versus_character(uuid, text, boolean)
  from public, anon;
grant execute on function public.set_versus_character(uuid, text, boolean)
  to authenticated;
