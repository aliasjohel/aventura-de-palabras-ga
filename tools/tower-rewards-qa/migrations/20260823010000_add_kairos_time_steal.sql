-- Incorpora a Kairós. Su habilidad adelanta 20 segundos el reloj rival.

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

alter table public.versus_match_players
  add column if not exists time_penalty_seconds smallint not null default 0;

alter table public.versus_match_players
  drop constraint if exists versus_match_players_time_penalty_seconds_check;

alter table public.versus_match_players
  add constraint versus_match_players_time_penalty_seconds_check
  check (time_penalty_seconds between 0 and 240);

create or replace function private.expire_versus_player_times(p_match_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_status text;
  v_everyone_finished boolean;
begin
  select status into v_status
  from public.versus_matches
  where id = p_match_id
  for update;

  if v_status <> 'playing' then return; end if;

  update public.versus_match_players as player
  set finished = true,
      finish_reason = 'time',
      updated_at = now()
  from public.versus_matches as match
  where match.id = p_match_id
    and player.match_id = match.id
    and not player.finished
    and now() >= match.deadline_at - make_interval(secs => player.time_penalty_seconds);

  select bool_and(finished) into v_everyone_finished
  from public.versus_match_players
  where match_id = p_match_id;

  if coalesce(v_everyone_finished, false) then
    perform public.finish_versus_match(p_match_id, 'time');
  end if;
end;
$$;

revoke execute on function private.expire_versus_player_times(uuid)
  from public, anon, authenticated;

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
  if v_user_id is null then raise exception 'Debes iniciar una sesión antes de elegir personaje.'; end if;
  if p_character_key not in (
    'explorador', 'mago', 'guardiana', 'dragon', 'hombre_lobo', 't_shadow',
    'guardian_alba', 'dragon_hielo', 'azrak', 'kalamo', 'kairos'
  ) then
    raise exception 'El personaje elegido no es válido.';
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
$$;

-- Conservamos los motores probados y colocamos delante una capa autoritativa
-- que aplica los relojes individuales.
alter function public.get_versus_match_state(uuid)
  rename to get_versus_match_state_without_time_penalty;

create or replace function public.get_versus_match_state(p_room_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_match public.versus_matches%rowtype;
  v_state jsonb;
  v_me public.versus_match_players%rowtype;
  v_opponent public.versus_match_players%rowtype;
begin
  if v_user_id is null or not public.is_versus_room_member(p_room_id) then
    raise exception 'No perteneces a esta sala.';
  end if;

  select * into v_match from public.versus_matches where room_id = p_room_id;
  if not found then return null; end if;
  perform private.expire_versus_player_times(v_match.id);
  select * into v_match from public.versus_matches where id = v_match.id;

  v_state := public.get_versus_match_state_without_time_penalty(p_room_id);
  if v_state is null then return null; end if;

  select * into v_me from public.versus_match_players
  where match_id = v_match.id and user_id = v_user_id;
  select * into v_opponent from public.versus_match_players
  where match_id = v_match.id and user_id <> v_user_id;

  return v_state || jsonb_build_object(
    'me', (v_state->'me') || jsonb_build_object(
      'timePenaltySeconds', v_me.time_penalty_seconds,
      'remainingSeconds', greatest(0, ceil(extract(epoch from (v_match.deadline_at - now())))::integer - v_me.time_penalty_seconds)
    ),
    'opponent', (v_state->'opponent') || jsonb_build_object(
      'timePenaltySeconds', v_opponent.time_penalty_seconds,
      'remainingSeconds', greatest(0, ceil(extract(epoch from (v_match.deadline_at - now())))::integer - v_opponent.time_penalty_seconds)
    )
  );
end;
$$;

alter function public.play_versus_letter(uuid, text)
  rename to play_versus_letter_without_time_penalty;

create or replace function public.play_versus_letter(p_room_id uuid, p_letter text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_match public.versus_matches%rowtype;
  v_finished boolean;
begin
  if v_user_id is null or not public.is_versus_room_member(p_room_id) then
    raise exception 'No perteneces a esta sala.';
  end if;
  select * into v_match from public.versus_matches where room_id = p_room_id;
  if not found then raise exception 'La partida todavía no fue creada.'; end if;
  perform private.expire_versus_player_times(v_match.id);
  select finished into v_finished from public.versus_match_players
  where match_id = v_match.id and user_id = v_user_id;
  if coalesce(v_finished, true) then return public.get_versus_match_state(p_room_id); end if;
  return public.play_versus_letter_without_time_penalty(p_room_id, p_letter);
end;
$$;

alter function public.activate_versus_ability(uuid)
  rename to activate_versus_ability_without_kairos;

create or replace function public.activate_versus_ability(p_room_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_match public.versus_matches%rowtype;
  v_me public.versus_match_players%rowtype;
  v_opponent public.versus_match_players%rowtype;
  v_character text;
begin
  if v_user_id is null or not public.is_versus_room_member(p_room_id) then
    raise exception 'No perteneces a esta sala.';
  end if;

  select character_key into v_character from public.versus_players
  where room_id = p_room_id and user_id = v_user_id;
  if v_character <> 'kairos' then
    return public.activate_versus_ability_without_kairos(p_room_id);
  end if;

  select * into v_match from public.versus_matches where room_id = p_room_id for update;
  if not found or v_match.status <> 'playing' or now() >= v_match.deadline_at then
    raise exception 'La partida ya no está disponible.';
  end if;
  perform private.expire_versus_player_times(v_match.id);

  select * into v_me from public.versus_match_players
  where match_id = v_match.id and user_id = v_user_id for update;
  select * into v_opponent from public.versus_match_players
  where match_id = v_match.id and user_id <> v_user_id for update;

  if v_me.finished then raise exception 'Tu recorrido ya terminó.'; end if;
  if v_opponent.finished then raise exception 'El recorrido del rival ya terminó.'; end if;
  if v_me.ability_charge < 8 then raise exception 'La habilidad todavía no está cargada.'; end if;

  update public.versus_match_players
  set ability_charge = 0, ability_hint = null, updated_at = now()
  where match_id = v_match.id and user_id = v_user_id;

  update public.versus_match_players
  set time_penalty_seconds = least(240, time_penalty_seconds + 20),
      updated_at = now()
  where match_id = v_match.id and user_id = v_opponent.user_id;

  update public.versus_matches
  set event_sequence = event_sequence + 1,
      last_event = jsonb_build_object(
        'type', 'ability_used', 'actorId', v_user_id, 'character', 'kairos',
        'effect', 'time_steal', 'seconds', 20
      ),
      updated_at = now()
  where id = v_match.id;

  perform private.expire_versus_player_times(v_match.id);
  return public.get_versus_match_state(p_room_id);
end;
$$;

revoke execute on function public.get_versus_match_state_without_time_penalty(uuid)
  from public, anon, authenticated;
revoke execute on function public.play_versus_letter_without_time_penalty(uuid, text)
  from public, anon, authenticated;
revoke execute on function public.activate_versus_ability_without_kairos(uuid)
  from public, anon, authenticated;
revoke execute on function public.set_versus_character(uuid, text, boolean) from public, anon;
revoke execute on function public.get_versus_match_state(uuid) from public, anon;
revoke execute on function public.play_versus_letter(uuid, text) from public, anon;
revoke execute on function public.activate_versus_ability(uuid) from public, anon;
grant execute on function public.set_versus_character(uuid, text, boolean) to authenticated;
grant execute on function public.get_versus_match_state(uuid) to authenticated;
grant execute on function public.play_versus_letter(uuid, text) to authenticated;
grant execute on function public.activate_versus_ability(uuid) to authenticated;
