-- Cosmetics and one ephemeral quick-message snapshot per room member.
-- Existing member-only SELECT RLS and lack of direct UPDATE grants are preserved.
alter table public.versus_players
  add column avatar_key text not null default 'explorador'
    check (avatar_key in ('explorador','mago','guardian-alba','t-shadow','kalamo','dragon','dragon-hielo','hombre-lobo','azrak')),
  add column frame_key text not null default 'clasico'
    check (frame_key in ('clasico','bosque','hielo','fuego','arcano','real')),
  add column quick_message_key text
    check (quick_message_key in ('buena','alcanzo','facil','preparate','revancha','suerte')),
  add column quick_message_at timestamptz;

-- Privileged implementations live outside the exposed API schema.
create schema if not exists versus_identity_private;
revoke all on schema versus_identity_private from public, anon;
grant usage on schema versus_identity_private to authenticated;

create function versus_identity_private.set_identity(p_room_id uuid, p_avatar_key text, p_frame_key text)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null then raise exception 'Iniciá sesión para elegir tu avatar.'; end if;
  if coalesce(p_avatar_key, '') not in ('explorador','mago','guardian-alba','t-shadow','kalamo','dragon','dragon-hielo','hombre-lobo','azrak')
    or coalesce(p_frame_key, '') not in ('clasico','bosque','hielo','fuego','arcano','real') then
    raise exception 'Elegí un avatar y un marco del catálogo.';
  end if;
  update public.versus_players set avatar_key = p_avatar_key, frame_key = p_frame_key
    where room_id = p_room_id and user_id = auth.uid();
  if not found then raise exception 'No pertenecés a esta sala.'; end if;
end;
$$;

create function versus_identity_private.send_quick_message(p_room_id uuid, p_message_key text)
returns void language plpgsql security definer set search_path = '' as $$
declare
  v_status text;
  v_last timestamptz;
begin
  if auth.uid() is null then raise exception 'Iniciá sesión para enviar mensajes.'; end if;
  if coalesce(p_message_key, '') not in ('buena','alcanzo','facil','preparate','revancha','suerte') then
    raise exception 'Elegí un mensaje del menú.';
  end if;
  -- Use the same room-first lock order as gameplay and leaving a room.
  select status into v_status from public.versus_rooms where id = p_room_id for update;
  if v_status is null or v_status not in ('playing', 'finished') then
    raise exception 'Los mensajes están disponibles durante el duelo.';
  end if;
  select quick_message_at into v_last from public.versus_players
    where room_id = p_room_id and user_id = auth.uid() for update;
  if not found then raise exception 'No pertenecés a esta sala.'; end if;
  if (select count(*) from public.versus_players where room_id = p_room_id) <> 2 then
    raise exception 'Tu rival ya salió de la sala.';
  end if;
  if v_last is not null and clock_timestamp() < v_last + interval '5 seconds' then
    raise exception 'Esperá 5 segundos entre mensajes.';
  end if;
  update public.versus_players set quick_message_key = p_message_key, quick_message_at = clock_timestamp()
    where room_id = p_room_id and user_id = auth.uid();
end;
$$;

revoke all on function versus_identity_private.set_identity(uuid,text,text) from public, anon;
revoke all on function versus_identity_private.send_quick_message(uuid,text) from public, anon;
grant execute on function versus_identity_private.set_identity(uuid,text,text) to authenticated;
grant execute on function versus_identity_private.send_quick_message(uuid,text) to authenticated;

create function public.set_versus_identity(p_room_id uuid, p_avatar_key text, p_frame_key text)
returns void language sql security invoker set search_path = '' as $$
  select versus_identity_private.set_identity(p_room_id, p_avatar_key, p_frame_key);
$$;
create function public.send_versus_quick_message(p_room_id uuid, p_message_key text)
returns void language sql security invoker set search_path = '' as $$
  select versus_identity_private.send_quick_message(p_room_id, p_message_key);
$$;
revoke all on function public.set_versus_identity(uuid,text,text) from public, anon;
revoke all on function public.send_versus_quick_message(uuid,text) from public, anon;
grant execute on function public.set_versus_identity(uuid,text,text) to authenticated;
grant execute on function public.send_versus_quick_message(uuid,text) to authenticated;
