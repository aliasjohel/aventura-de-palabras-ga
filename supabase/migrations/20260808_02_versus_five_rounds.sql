-- Amplía el duelo a cinco palabras, cinco corazones y cuatro minutos.

alter table public.versus_challenges
  drop constraint if exists versus_challenges_words_check;
alter table public.versus_challenges
  add constraint versus_challenges_words_check check (cardinality(words) = 5);

alter table public.versus_match_players
  drop constraint if exists versus_match_players_current_word_index_check,
  drop constraint if exists versus_match_players_lives_check,
  drop constraint if exists versus_match_players_completed_words_check;
alter table public.versus_match_players
  alter column lives set default 5,
  add constraint versus_match_players_current_word_index_check
    check (current_word_index between 0 and 5),
  add constraint versus_match_players_lives_check check (lives between 0 and 5),
  add constraint versus_match_players_completed_words_check
    check (completed_words between 0 and 5);

create or replace function public.set_versus_challenge(
  p_room_id uuid,
  p_theme_key text,
  p_words text[]
)
returns public.versus_rooms
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_target_id uuid;
  v_room public.versus_rooms;
  v_words text[];
  v_player_count integer;
  v_ready_count integer;
begin
  if v_user_id is null then
    raise exception 'Debes iniciar una sesión antes de preparar el desafío.';
  end if;

  if p_theme_key not in (
    'paises', 'frutas', 'animales', 'comidas', 'profesiones',
    'deportes', 'transportes', 'objetos', 'naturaleza', 'nombres'
  ) then
    raise exception 'La temática elegida no es válida.';
  end if;

  if cardinality(p_words) <> 5 then
    raise exception 'Debes enviar exactamente cinco palabras.';
  end if;

  select array_agg(upper(btrim(word)) order by position)
  into v_words
  from unnest(p_words) with ordinality as supplied(word, position);

  if exists (
    select 1 from unnest(v_words) as word
    where char_length(word) not between 3 and 12
       or word !~ '^[A-ZÁÉÍÓÚÜÑ]+$'
  ) then
    raise exception 'Las palabras deben tener entre 3 y 12 letras, sin espacios ni números.';
  end if;

  if (
    select count(distinct public.versus_letter_key(word))
    from unnest(v_words) as word
  ) <> 5 then
    raise exception 'Las cinco palabras deben ser diferentes.';
  end if;

  select * into v_room
  from public.versus_rooms
  where id = p_room_id
  for update;

  if not found or not public.is_versus_room_member(p_room_id) then
    raise exception 'No perteneces a esta sala.';
  end if;
  if v_room.status not in ('preparing', 'playing') then
    raise exception 'La sala todavía no está lista para recibir palabras.';
  end if;

  select user_id into v_target_id
  from public.versus_players
  where room_id = p_room_id and user_id <> v_user_id;
  if not found then raise exception 'El rival ya no está en la sala.'; end if;

  insert into public.versus_challenges (
    room_id, owner_id, target_id, theme_key, words
  ) values (
    p_room_id, v_user_id, v_target_id, p_theme_key, v_words
  )
  on conflict (room_id, owner_id) do update
  set target_id = excluded.target_id,
      theme_key = excluded.theme_key,
      words = excluded.words,
      updated_at = now();

  update public.versus_players
  set theme_key = p_theme_key, preparation_ready = true
  where room_id = p_room_id and user_id = v_user_id;

  select count(*), count(*) filter (where preparation_ready)
  into v_player_count, v_ready_count
  from public.versus_players
  where room_id = p_room_id;

  update public.versus_rooms
  set status = case
    when v_player_count = 2 and v_ready_count = 2 then 'playing'
    else 'preparing'
  end
  where id = p_room_id
  returning * into v_room;

  return v_room;
end;
$$;

create or replace function public.start_versus_match_on_room_ready()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_match_id uuid;
  v_start timestamptz := now() + interval '4 seconds';
begin
  if new.status <> 'playing' or old.status = 'playing' then return new; end if;

  delete from public.versus_matches where room_id = new.id;
  insert into public.versus_matches (room_id, started_at, deadline_at, arena_index)
  values (new.id, v_start, v_start + interval '240 seconds', floor(random() * 3)::smallint)
  returning id into v_match_id;

  insert into public.versus_match_players (match_id, user_id, lives)
  select v_match_id, user_id, 5
  from public.versus_players
  where room_id = new.id;
  return new;
end;
$$;

-- Reemplaza únicamente los topes de rondas del motor autoritativo; conserva
-- la equivalencia de acentos incorporada en la migración anterior.
create or replace function public.play_versus_letter(
  p_room_id uuid,
  p_letter text
)
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
  v_word text;
  v_letter text := public.versus_letter_key(btrim(coalesce(p_letter, '')));
  v_letters text[];
  v_occurrences integer;
  v_word_complete boolean;
  v_event jsonb;
  v_should_finish boolean;
begin
  if char_length(v_letter) <> 1 or v_letter !~ '^[A-ZÑ]$' then
    raise exception 'La letra enviada no es válida.';
  end if;
  if not public.is_versus_room_member(p_room_id) then
    raise exception 'No perteneces a esta sala.';
  end if;

  select * into v_match from public.versus_matches
  where room_id = p_room_id for update;
  if not found then raise exception 'La partida todavía no fue creada.'; end if;
  if v_match.status <> 'playing' then return public.get_versus_match_state(p_room_id); end if;
  if now() >= v_match.deadline_at then
    perform public.finish_versus_match(v_match.id, 'time');
    return public.get_versus_match_state(p_room_id);
  end if;
  if now() < v_match.started_at then return public.get_versus_match_state(p_room_id); end if;

  select * into v_me from public.versus_match_players
  where match_id = v_match.id and user_id = v_user_id for update;
  select * into v_opponent from public.versus_match_players
  where match_id = v_match.id and user_id <> v_user_id for update;
  if v_me.finished then return public.get_versus_match_state(p_room_id); end if;

  select words[v_me.current_word_index + 1] into v_word
  from public.versus_challenges
  where room_id = p_room_id and target_id = v_user_id;
  if v_word is null then raise exception 'No encontramos la palabra actual.'; end if;
  if v_letter = any(v_me.guessed_letters) then return public.get_versus_match_state(p_room_id); end if;

  v_letters := array_append(v_me.guessed_letters, v_letter);
  select count(*) into v_occurrences
  from unnest(string_to_array(v_word, null)) as character
  where public.versus_letter_key(character) = v_letter;

  if v_occurrences > 0 then
    select not exists (
      select 1 from unnest(string_to_array(v_word, null)) as character
      where public.versus_letter_key(character) <> all(v_letters)
    ) into v_word_complete;

    if v_word_complete then
      update public.versus_match_players
      set current_word_index = current_word_index + 1,
          guessed_letters = '{}', errors = 0,
          completed_words = completed_words + 1,
          score_letters = score_letters + v_occurrences,
          finished = current_word_index + 1 >= 5,
          finish_reason = case when current_word_index + 1 >= 5 then 'complete' else null end,
          updated_at = now()
      where match_id = v_match.id and user_id = v_user_id;

      update public.versus_match_players
      set lives = greatest(0, lives - 1),
          finished = finished or lives - 1 <= 0,
          finish_reason = case when lives - 1 <= 0 then 'lives' else finish_reason end,
          updated_at = now()
      where match_id = v_match.id and user_id = v_opponent.user_id;
      v_event := jsonb_build_object(
        'type', 'word_complete', 'actorId', v_user_id,
        'wordNumber', v_me.current_word_index + 1
      );
    else
      update public.versus_match_players
      set guessed_letters = v_letters,
          score_letters = score_letters + v_occurrences,
          updated_at = now()
      where match_id = v_match.id and user_id = v_user_id;
      v_event := jsonb_build_object('type', 'hit', 'actorId', v_user_id, 'letter', v_letter);
    end if;
  else
    if v_me.errors + 1 >= 6 then
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
      where match_id = v_match.id and user_id = v_user_id;
      v_event := jsonb_build_object(
        'type', 'word_failed', 'actorId', v_user_id,
        'wordNumber', v_me.current_word_index + 1
      );
    else
      update public.versus_match_players
      set guessed_letters = v_letters, errors = errors + 1, updated_at = now()
      where match_id = v_match.id and user_id = v_user_id;
      v_event := jsonb_build_object('type', 'miss', 'actorId', v_user_id, 'letter', v_letter);
    end if;
  end if;

  update public.versus_matches
  set event_sequence = event_sequence + 1, last_event = v_event, updated_at = now()
  where id = v_match.id;

  select exists (
    select 1 from public.versus_match_players
    where match_id = v_match.id and lives <= 0
  ) or (
    select bool_and(finished) from public.versus_match_players where match_id = v_match.id
  ) into v_should_finish;

  if v_should_finish then perform public.finish_versus_match(v_match.id, 'rules'); end if;
  return public.get_versus_match_state(p_room_id);
end;
$$;

revoke execute on function public.set_versus_challenge(uuid, text, text[]) from public, anon;
grant execute on function public.set_versus_challenge(uuid, text, text[]) to authenticated;
revoke execute on function public.play_versus_letter(uuid, text) from public, anon;
grant execute on function public.play_versus_letter(uuid, text) to authenticated;
