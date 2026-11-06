-- Motor autoritativo del combate versus.
-- Ejecutar después de 20260805_versus_challenges.sql.

create table if not exists public.versus_matches (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null unique references public.versus_rooms(id) on delete cascade,
  status text not null default 'playing' check (status in ('playing', 'finished')),
  started_at timestamptz not null,
  deadline_at timestamptz not null,
  winner_id uuid references auth.users(id) on delete set null,
  arena_index smallint not null default 0 check (arena_index between 0 and 2),
  event_sequence bigint not null default 0,
  last_event jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.versus_match_players (
  match_id uuid not null references public.versus_matches(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  current_word_index smallint not null default 0 check (current_word_index between 0 and 3),
  guessed_letters text[] not null default '{}',
  errors smallint not null default 0 check (errors between 0 and 6),
  lives smallint not null default 3 check (lives between 0 and 3),
  completed_words smallint not null default 0 check (completed_words between 0 and 3),
  score_letters integer not null default 0 check (score_letters >= 0),
  finished boolean not null default false,
  finish_reason text,
  updated_at timestamptz not null default now(),
  primary key (match_id, user_id)
);

create index if not exists versus_match_players_user_idx
  on public.versus_match_players(user_id);

alter table public.versus_matches enable row level security;
alter table public.versus_match_players enable row level security;

drop policy if exists "Room members can read match signals" on public.versus_matches;
create policy "Room members can read match signals"
on public.versus_matches
for select
to authenticated
using (public.is_versus_room_member(room_id));

-- Los estados internos no se exponen directamente: contienen letras usadas.
revoke all on public.versus_matches from anon, authenticated;
revoke all on public.versus_match_players from anon, authenticated;
grant select on public.versus_matches to authenticated;

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
  if new.status <> 'playing' or old.status = 'playing' then
    return new;
  end if;

  delete from public.versus_matches where room_id = new.id;

  insert into public.versus_matches (
    room_id, started_at, deadline_at, arena_index
  ) values (
    new.id,
    v_start,
    v_start + interval '150 seconds',
    floor(random() * 3)::smallint
  )
  returning id into v_match_id;

  insert into public.versus_match_players (match_id, user_id)
  select v_match_id, user_id
  from public.versus_players
  where room_id = new.id;

  return new;
end;
$$;

drop trigger if exists versus_room_starts_match on public.versus_rooms;
create trigger versus_room_starts_match
after update of status on public.versus_rooms
for each row
execute function public.start_versus_match_on_room_ready();

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
        when character = any(coalesce(p_letters, '{}'::text[]))
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

create or replace function public.finish_versus_match(
  p_match_id uuid,
  p_reason text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_first public.versus_match_players%rowtype;
  v_second public.versus_match_players%rowtype;
  v_winner uuid;
begin
  select * into v_first
  from public.versus_match_players
  where match_id = p_match_id
  order by user_id
  limit 1;

  select * into v_second
  from public.versus_match_players
  where match_id = p_match_id
  order by user_id
  offset 1 limit 1;

  if v_first.lives > v_second.lives then v_winner := v_first.user_id;
  elsif v_second.lives > v_first.lives then v_winner := v_second.user_id;
  elsif v_first.completed_words > v_second.completed_words then v_winner := v_first.user_id;
  elsif v_second.completed_words > v_first.completed_words then v_winner := v_second.user_id;
  elsif v_first.score_letters > v_second.score_letters then v_winner := v_first.user_id;
  elsif v_second.score_letters > v_first.score_letters then v_winner := v_second.user_id;
  elsif v_first.current_word_index > v_second.current_word_index then v_winner := v_first.user_id;
  elsif v_second.current_word_index > v_first.current_word_index then v_winner := v_second.user_id;
  else v_winner := null;
  end if;

  update public.versus_matches
  set status = 'finished',
      winner_id = v_winner,
      event_sequence = event_sequence + 1,
      last_event = jsonb_build_object(
        'type', 'match_finished',
        'reason', p_reason,
        'winnerId', v_winner
      ),
      updated_at = now()
  where id = p_match_id and status = 'playing';
end;
$$;

create or replace function public.get_versus_match_state(p_room_id uuid)
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
  v_my_word text;
  v_opponent_word text;
  v_my_theme text;
  v_opponent_theme text;
begin
  if not public.is_versus_room_member(p_room_id) then
    raise exception 'No perteneces a esta sala.';
  end if;

  select * into v_match
  from public.versus_matches
  where room_id = p_room_id;

  if not found then
    return null;
  end if;

  if v_match.status = 'playing' and now() >= v_match.deadline_at then
    perform public.finish_versus_match(v_match.id, 'time');
    select * into v_match from public.versus_matches where id = v_match.id;
  end if;

  select * into v_me
  from public.versus_match_players
  where match_id = v_match.id and user_id = v_user_id;

  select * into v_opponent
  from public.versus_match_players
  where match_id = v_match.id and user_id <> v_user_id;

  select
    words[v_me.current_word_index + 1], theme_key
  into v_my_word, v_my_theme
  from public.versus_challenges
  where room_id = p_room_id and target_id = v_user_id;

  select
    words[v_opponent.current_word_index + 1], theme_key
  into v_opponent_word, v_opponent_theme
  from public.versus_challenges
  where room_id = p_room_id and target_id = v_opponent.user_id;

  return jsonb_build_object(
    'matchId', v_match.id,
    'roomId', v_match.room_id,
    'status', v_match.status,
    'startedAt', v_match.started_at,
    'deadlineAt', v_match.deadline_at,
    'winnerId', v_match.winner_id,
    'arenaIndex', v_match.arena_index,
    'eventSequence', v_match.event_sequence,
    'lastEvent', v_match.last_event,
    'serverTime', now(),
    'me', jsonb_build_object(
      'userId', v_me.user_id,
      'wordIndex', v_me.current_word_index,
      'usedLetters', v_me.guessed_letters,
      'errors', v_me.errors,
      'lives', v_me.lives,
      'completedWords', v_me.completed_words,
      'scoreLetters', v_me.score_letters,
      'finished', v_me.finished,
      'finishReason', v_me.finish_reason,
      'theme', v_my_theme,
      'wordLength', char_length(coalesce(v_my_word, '')),
      'progress', public.versus_word_progress(v_my_word, v_me.guessed_letters, false)
    ),
    'opponent', jsonb_build_object(
      'userId', v_opponent.user_id,
      'wordIndex', v_opponent.current_word_index,
      'errors', v_opponent.errors,
      'lives', v_opponent.lives,
      'completedWords', v_opponent.completed_words,
      'scoreLetters', v_opponent.score_letters,
      'finished', v_opponent.finished,
      'finishReason', v_opponent.finish_reason,
      'theme', v_opponent_theme,
      'wordLength', char_length(coalesce(v_opponent_word, '')),
      'progress', public.versus_word_progress(
        v_opponent_word,
        v_opponent.guessed_letters,
        true
      )
    )
  );
end;
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
  v_letter text := upper(btrim(coalesce(p_letter, '')));
  v_letters text[];
  v_occurrences integer;
  v_word_complete boolean;
  v_event jsonb;
  v_should_finish boolean;
begin
  if char_length(v_letter) <> 1 or v_letter !~ '^[A-ZÁÉÍÓÚÜÑ]$' then
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

  if v_match.status <> 'playing' then
    return public.get_versus_match_state(p_room_id);
  end if;

  if now() >= v_match.deadline_at then
    perform public.finish_versus_match(v_match.id, 'time');
    return public.get_versus_match_state(p_room_id);
  end if;

  if now() < v_match.started_at then
    return public.get_versus_match_state(p_room_id);
  end if;

  select * into v_me
  from public.versus_match_players
  where match_id = v_match.id and user_id = v_user_id
  for update;

  select * into v_opponent
  from public.versus_match_players
  where match_id = v_match.id and user_id <> v_user_id
  for update;

  if v_me.finished then
    return public.get_versus_match_state(p_room_id);
  end if;

  select words[v_me.current_word_index + 1]
  into v_word
  from public.versus_challenges
  where room_id = p_room_id and target_id = v_user_id;

  if v_word is null then
    raise exception 'No encontramos la palabra actual.';
  end if;

  if v_letter = any(v_me.guessed_letters) then
    return public.get_versus_match_state(p_room_id);
  end if;

  v_letters := array_append(v_me.guessed_letters, v_letter);
  select count(*) into v_occurrences
  from unnest(string_to_array(v_word, null)) as character
  where character = v_letter;

  if v_occurrences > 0 then
    select not exists (
      select 1
      from unnest(string_to_array(v_word, null)) as character
      where character <> all(v_letters)
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

  if v_should_finish then
    perform public.finish_versus_match(v_match.id, 'rules');
  end if;

  return public.get_versus_match_state(p_room_id);
end;
$$;

revoke execute on function public.start_versus_match_on_room_ready() from public, anon, authenticated;
revoke execute on function public.versus_word_progress(text, text[], boolean) from public, anon;
revoke execute on function public.finish_versus_match(uuid, text) from public, anon, authenticated;
revoke execute on function public.get_versus_match_state(uuid) from public, anon;
revoke execute on function public.play_versus_letter(uuid, text) from public, anon;
grant execute on function public.get_versus_match_state(uuid) to authenticated;
grant execute on function public.play_versus_letter(uuid, text) to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'versus_matches'
  ) then
    alter publication supabase_realtime add table public.versus_matches;
  end if;
end;
$$;
