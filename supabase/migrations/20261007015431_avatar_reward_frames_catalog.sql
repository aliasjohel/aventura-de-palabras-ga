-- Expand only the appearance frame catalog; existing rows and permissions remain intact.
begin;
set local lock_timeout='5s';
set local statement_timeout='30s';
alter table public.versus_players drop constraint versus_players_frame_key_check;
alter table public.versus_players add constraint versus_players_frame_key_check
  check(frame_key in ('clasico','bosque','hielo','fuego','arcano','real','bronce','plata','oro','platino','diamante','leyenda'));
alter table versus_private.player_appearance drop constraint player_appearance_frame_key_check;
alter table versus_private.player_appearance add constraint player_appearance_frame_key_check
  check(frame_key in ('clasico','bosque','hielo','fuego','arcano','real','bronce','plata','oro','platino','diamante','leyenda'));

create or replace function versus_identity_private.set_identity(p_room_id uuid,p_avatar_key text,p_frame_key text)
returns void language plpgsql security definer set search_path='' as $function$
begin
  if auth.uid() is null then raise exception 'Iniciá sesión para elegir tu avatar.'; end if;
  if coalesce(p_avatar_key, '') not in ('explorador','mago','guardian-alba','t-shadow','kalamo','dragon','dragon-hielo','hombre-lobo','azrak')
    or coalesce(p_frame_key, '') not in ('clasico','bosque','hielo','fuego','arcano','real','bronce','plata','oro','platino','diamante','leyenda') then
    raise exception 'Elegí un avatar y un marco del catálogo.';
  end if;
  update public.versus_players set avatar_key=p_avatar_key,frame_key=p_frame_key
    where room_id=p_room_id and user_id=auth.uid();
  if not found then raise exception 'No pertenecés a esta sala.'; end if;
end;
$function$;
commit;
