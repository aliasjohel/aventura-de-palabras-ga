-- Las vocales acentuadas se juegan con la misma tecla que su vocal base.
-- La Ñ se conserva como una letra independiente y los acentos originales
-- continúan mostrándose en el progreso de la palabra.

create or replace function public.versus_letter_key(p_value text)
returns text
language sql
immutable
set search_path = ''
as $$
  select translate(upper(coalesce(p_value, '')), 'ÁÉÍÓÚÜ', 'AEIOUU');
$$;

create or replace function public.versus_word_progress(
  p_word text,
  p_letters text[],
  p_hide_letters boolean default false
)
returns text[]
language sql
immutable
set search_path = ''
as $$
  select coalesce(
    array_agg(
      case
        when public.versus_letter_key(character) = any(coalesce(p_letters, '{}'::text[]))
          then case when p_hide_letters then '?' else character end
        else '_'
      end
      order by position
    ),
    '{}'::text[]
  )
  from unnest(string_to_array(coalesce(p_word, ''), null))
    with ordinality as characters(character, position);
$$;

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

  select * into v_match
  from public.versus_matches
  where room_id = p_room_id
  for update;

  if not found then raise exception 'La partida todavía no fue creada.'; end if;
  if v_match.status <> 'playing' then return public.get_versus_match_state(p_room_id); end if;

  if now() >= v_match.deadline_at then
    perform public.finish_versus_match(v_match.id, 'time');
    return public.get_versus_match_state(p_room_id);
  end if;

  if now() < v_match.started_at then return public.get_versus_match_state(p_room_id); end if;

  select * into v_me
  from public.versus_match_players
  where match_id = v_match.id and user_id = v_user_id
  for update;

  select * into v_opponent
  from public.versus_match_players
  where match_id = v_match.id and user_id <> v_user_id
  for update;

  if v_me.finished then return public.get_versus_match_state(p_room_id); end if;

  select words[v_me.current_word_index + 1]
  into v_word
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
      select 1
      from unnest(string_to_array(v_word, null)) as character
      where public.versus_letter_key(character) <> all(v_letters)
    ) into v_word_complete;

    if v_word_complete then
      update public.versus_match_players
      set current_word_index = current_word_index + 1,
          guessed_letters = '{}',
          errors = 0,
          completed_words = completed_words + 1,
          score_letters = score_letters + v_occurrences,
          finished = current_word_index + 1 >= 3,
          finish_reason = case when current_word_index + 1 >= 3 then 'complete' else null end,
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
          guessed_letters = '{}',
          errors = 0,
          lives = greatest(0, lives - 1),
          finished = current_word_index + 1 >= 3 or lives - 1 <= 0,
          finish_reason = case
            when lives - 1 <= 0 then 'lives'
            when current_word_index + 1 >= 3 then 'complete'
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
      set guessed_letters = v_letters,
          errors = errors + 1,
          updated_at = now()
      where match_id = v_match.id and user_id = v_user_id;
      v_event := jsonb_build_object('type', 'miss', 'actorId', v_user_id, 'letter', v_letter);
    end if;
  end if;

  update public.versus_matches
  set event_sequence = event_sequence + 1,
      last_event = v_event,
      updated_at = now()
  where id = v_match.id;

  select
    exists (
      select 1 from public.versus_match_players
      where match_id = v_match.id and lives <= 0
    )
    or (
      select bool_and(finished)
      from public.versus_match_players
      where match_id = v_match.id
    )
  into v_should_finish;

  if v_should_finish then perform public.finish_versus_match(v_match.id, 'rules'); end if;
  return public.get_versus_match_state(p_room_id);
end;
$$;

revoke execute on function public.versus_letter_key(text) from public, anon;
grant execute on function public.versus_letter_key(text) to authenticated;
revoke execute on function public.play_versus_letter(uuid, text) from public, anon;
grant execute on function public.play_versus_letter(uuid, text) to authenticated;
