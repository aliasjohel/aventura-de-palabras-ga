-- Incorpora a Kálamo y aplica Tinta ladrona durante cinco segundos al rival.

alter table public.versus_match_players
  drop constraint if exists versus_match_players_active_effect_check;

alter table public.versus_match_players
  add constraint versus_match_players_active_effect_check
  check (
    active_effect is null
    or active_effect in ('roots', 'roar', 'shuffle', 'invert', 'black_hole', 'key_bounce', 'ice_screen', 'key_theft')
  );

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
    'guardian_alba', 'dragon_hielo', 'azrak', 'kalamo'
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
  v_word text;
  v_hint text;
  v_effect text;
  v_expires_at timestamptz;
  v_forced_letter text;
  v_forced_letters text[];
  v_word_failed boolean := false;
  v_should_finish boolean := false;
begin
  if not public.is_versus_room_member(p_room_id) then raise exception 'No perteneces a esta sala.'; end if;

  select * into v_match from public.versus_matches where room_id = p_room_id for update;
  if not found or v_match.status <> 'playing' or now() >= v_match.deadline_at then
    raise exception 'La partida ya no está disponible.';
  end if;

  select * into v_me from public.versus_match_players
  where match_id = v_match.id and user_id = v_user_id for update;
  select * into v_opponent from public.versus_match_players
  where match_id = v_match.id and user_id <> v_user_id for update;

  if v_me.finished then raise exception 'Tu recorrido ya terminó.'; end if;
  if v_me.ability_charge < 8 then raise exception 'La habilidad todavía no está cargada.'; end if;

  select character_key into v_character from public.versus_players
  where room_id = p_room_id and user_id = v_user_id;
  if v_character not in (
    'explorador', 'guardiana', 'dragon', 'mago', 'hombre_lobo', 't_shadow',
    'guardian_alba', 'dragon_hielo', 'azrak', 'kalamo'
  ) then
    raise exception 'El personaje no tiene una habilidad válida.';
  end if;

  if v_character = 'explorador' then
    select words[v_me.current_word_index + 1] into v_word
    from public.versus_challenges where room_id = p_room_id and target_id = v_user_id;
    select key into v_hint
    from (
      select distinct public.versus_letter_key(character) as key
      from unnest(string_to_array(coalesce(v_word, ''), null)) as character
    ) as pending
    where key <> all(v_me.guessed_letters)
    order by random() limit 1;
    if v_hint is null then raise exception 'No quedan letras para revelar.'; end if;
    update public.versus_match_players
    set ability_charge = 0, ability_hint = v_hint, updated_at = now()
    where match_id = v_match.id and user_id = v_user_id;

  elsif v_character = 'azrak' then
    if v_opponent.finished then raise exception 'El recorrido del rival ya terminó.'; end if;
    select words[v_opponent.current_word_index + 1] into v_word
    from public.versus_challenges where room_id = p_room_id and target_id = v_opponent.user_id;
    if v_word is null then raise exception 'No encontramos la palabra actual del rival.'; end if;

    select candidate into v_forced_letter
    from unnest(array[
      'A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'
    ]) as candidate
    where candidate <> all(v_opponent.guessed_letters)
      and not exists (
        select 1 from unnest(string_to_array(v_word, null)) as character
        where public.versus_letter_key(character) = candidate
      )
    order by random() limit 1;
    if v_forced_letter is null then raise exception 'No quedan letras incorrectas disponibles.'; end if;

    v_forced_letters := array_append(v_opponent.guessed_letters, v_forced_letter);
    v_word_failed := v_opponent.errors + 1 >= 6;
    if v_word_failed then
      update public.versus_match_players
      set current_word_index = current_word_index + 1,
          guessed_letters = '{}', errors = 0,
          lives = greatest(0, lives - 1),
          finished = current_word_index + 1 >= 5 or lives - 1 <= 0,
          finish_reason = case
            when lives - 1 <= 0 then 'lives'
            when current_word_index + 1 >= 5 then 'complete'
            else null
          end,
          updated_at = now()
      where match_id = v_match.id and user_id = v_opponent.user_id;
    else
      update public.versus_match_players
      set guessed_letters = v_forced_letters, errors = errors + 1, updated_at = now()
      where match_id = v_match.id and user_id = v_opponent.user_id;
    end if;
    update public.versus_match_players
    set ability_charge = 0, ability_hint = null, updated_at = now()
    where match_id = v_match.id and user_id = v_user_id;
    v_effect := 'forced_miss';

  else
    v_effect := case v_character
      when 'guardiana' then 'roots' when 'dragon' then 'roar'
      when 'hombre_lobo' then 'invert' when 't_shadow' then 'black_hole'
      when 'guardian_alba' then 'key_bounce' when 'dragon_hielo' then 'ice_screen'
      when 'kalamo' then 'key_theft'
      else 'shuffle'
    end;
    v_expires_at := now() + interval '5 seconds';
    update public.versus_match_players
    set ability_charge = 0, ability_hint = null, updated_at = now()
    where match_id = v_match.id and user_id = v_user_id;
    update public.versus_match_players
    set active_effect = v_effect, effect_expires_at = v_expires_at, updated_at = now()
    where match_id = v_match.id and user_id = v_opponent.user_id;
  end if;

  update public.versus_matches
  set event_sequence = event_sequence + 1,
      last_event = jsonb_strip_nulls(jsonb_build_object(
        'type', 'ability_used', 'actorId', v_user_id, 'character', v_character,
        'effect', coalesce(v_effect, 'hint'), 'expiresAt', v_expires_at,
        'letter', v_forced_letter, 'wordFailed', v_word_failed,
        'word', case when v_word_failed then v_word else null end
      )),
      updated_at = now()
  where id = v_match.id;

  if v_character = 'azrak' and v_word_failed then
    select exists (
      select 1 from public.versus_match_players where match_id = v_match.id and lives <= 0
    ) or (
      select bool_and(finished) from public.versus_match_players where match_id = v_match.id
    ) into v_should_finish;
    if v_should_finish then perform public.finish_versus_match(v_match.id, 'rules'); end if;
  end if;
  return public.get_versus_match_state(p_room_id);
end;
$$;

revoke execute on function public.set_versus_character(uuid, text, boolean) from public, anon;
grant execute on function public.set_versus_character(uuid, text, boolean) to authenticated;
revoke execute on function public.activate_versus_ability(uuid) from public, anon;
grant execute on function public.activate_versus_ability(uuid) to authenticated;
