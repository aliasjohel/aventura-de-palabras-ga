-- Corrige la revancha y permite recuperar las palabras falladas sin revelar desafíos rivales.

alter table public.versus_match_players
  add column if not exists last_failed_word text;

alter table public.versus_challenges
  drop constraint if exists versus_challenges_words_check;
alter table public.versus_challenges
  add constraint versus_challenges_words_check
  check (cardinality(words) between 5 and 9);

alter table public.versus_match_players
  drop constraint if exists versus_match_players_current_word_index_check;
alter table public.versus_match_players
  add constraint versus_match_players_current_word_index_check
  check (current_word_index between 0 and 9);

create or replace function private.add_versus_recovery_word()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_room_id uuid;
  v_theme_key text;
  v_words text[];
  v_failed_word text;
  v_recovery_word text;
begin
  if new.current_word_index <> old.current_word_index + 1 then
    return new;
  end if;

  select m.room_id, challenge.theme_key, challenge.words
  into v_room_id, v_theme_key, v_words
  from public.versus_matches as m
  join public.versus_challenges as challenge
    on challenge.room_id = m.room_id
   and challenge.target_id = new.user_id
  where m.id = new.match_id
  for update of challenge;

  if new.completed_words = old.completed_words then
    v_failed_word := v_words[old.current_word_index + 1];
    new.last_failed_word := v_failed_word;

    if new.lives > 0 and cardinality(v_words) < 9 then
      select dictionary.word
      into v_recovery_word
      from private.versus_word_dictionary as dictionary
      where dictionary.theme_key = v_theme_key
        and not exists (
          select 1
          from unnest(v_words) as existing(word)
          where public.versus_letter_key(existing.word) = dictionary.word_key
        )
      order by random()
      limit 1;

      if v_recovery_word is null then
        raise exception 'No quedan palabras de recuperación para esta temática.';
      end if;

      update public.versus_challenges
      set words = array_append(words, v_recovery_word),
          updated_at = now()
      where room_id = v_room_id and target_id = new.user_id;
    end if;
  end if;

  -- Cinco palabras acertadas siguen siendo el objetivo. El índice también cuenta
  -- las falladas, por eso no debe finalizar el recorrido por sí solo.
  if new.lives > 0 and new.completed_words < 5 then
    new.finished := false;
    new.finish_reason := null;
  end if;

  return new;
end;
$$;

drop trigger if exists versus_player_adds_recovery_word
  on public.versus_match_players;
create trigger versus_player_adds_recovery_word
before update of current_word_index, completed_words, lives
on public.versus_match_players
for each row execute function private.add_versus_recovery_word();

revoke execute on function private.add_versus_recovery_word()
  from public, anon, authenticated;

-- Mantiene sincronizados el estado de la partida y el de la sala aunque se
-- reemplace la implementación interna que calcula el ganador.
create or replace function private.sync_versus_room_finished()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.status = 'finished' and old.status is distinct from new.status then
    update public.versus_rooms
    set status = 'finished'
    where id = new.room_id;
  end if;
  return new;
end;
$$;

drop trigger if exists versus_match_syncs_finished_room on public.versus_matches;
create trigger versus_match_syncs_finished_room
after update of status on public.versus_matches
for each row execute function private.sync_versus_room_finished();

revoke execute on function private.sync_versus_room_finished()
  from public, anon, authenticated;

-- Repara salas que hayan quedado desincronizadas antes de esta migración.
update public.versus_rooms as room
set status = 'finished'
where room.status <> 'finished'
  and exists (
    select 1
    from public.versus_matches as m
    where m.room_id = room.id and m.status = 'finished'
  );

create or replace function public.request_versus_rematch(p_room_id uuid)
returns public.versus_rooms
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_room public.versus_rooms;
  v_player_count integer;
  v_ready_count integer;
begin
  select * into v_room
  from public.versus_rooms
  where id = p_room_id
  for update;

  if not found or not public.is_versus_room_member(p_room_id) then
    raise exception 'No perteneces a esta sala.';
  end if;

  if v_room.status <> 'finished' and exists (
    select 1 from public.versus_matches
    where room_id = p_room_id and status = 'finished'
  ) then
    update public.versus_rooms
    set status = 'finished'
    where id = p_room_id
    returning * into v_room;
  end if;

  if v_room.status <> 'finished' then
    raise exception 'La partida todavía no terminó.';
  end if;

  update public.versus_players
  set rematch_ready = true
  where room_id = p_room_id and user_id = auth.uid();

  select count(*), count(*) filter (where rematch_ready)
  into v_player_count, v_ready_count
  from public.versus_players
  where room_id = p_room_id;

  if v_player_count = 2 and v_ready_count = 2 then
    delete from public.versus_challenges where room_id = p_room_id;
    delete from public.versus_matches where room_id = p_room_id;

    update public.versus_players
    set theme_key = null,
        preparation_ready = false,
        rematch_ready = false
    where room_id = p_room_id;

    update public.versus_rooms
    set status = 'preparing'
    where id = p_room_id
    returning * into v_room;
  else
    select * into v_room from public.versus_rooms where id = p_room_id;
  end if;

  return v_room;
end;
$$;

revoke execute on function public.request_versus_rematch(uuid)
  from public, anon;
grant execute on function public.request_versus_rematch(uuid)
  to authenticated;

-- El cliente recibe sólo su propia última palabra fallada.
create or replace function public.get_versus_match_state(p_room_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_state jsonb;
  v_match_id uuid;
  v_me public.versus_match_players%rowtype;
  v_opponent public.versus_match_players%rowtype;
begin
  v_state := public.get_versus_match_state_core(p_room_id);
  if v_state is null then return null; end if;

  v_match_id := (v_state->>'matchId')::uuid;
  select * into v_me from public.versus_match_players
  where match_id = v_match_id and user_id = v_user_id;
  select * into v_opponent from public.versus_match_players
  where match_id = v_match_id and user_id <> v_user_id;

  return v_state || jsonb_build_object(
    'me', (v_state->'me') || jsonb_build_object(
      'abilityCharge', v_me.ability_charge,
      'abilityHint', v_me.ability_hint,
      'activeEffect', case
        when v_me.effect_expires_at > now() then v_me.active_effect
        else null
      end,
      'effectExpiresAt', case
        when v_me.effect_expires_at > now() then v_me.effect_expires_at
        else null
      end,
      'lastFailedWord', v_me.last_failed_word
    ),
    'opponent', (v_state->'opponent') || jsonb_build_object(
      'abilityCharge', v_opponent.ability_charge,
      'activeEffect', case
        when v_opponent.effect_expires_at > now() then v_opponent.active_effect
        else null
      end,
      'effectExpiresAt', case
        when v_opponent.effect_expires_at > now() then v_opponent.effect_expires_at
        else null
      end
    )
  );
end;
$$;

revoke execute on function public.get_versus_match_state(uuid)
  from public, anon;
grant execute on function public.get_versus_match_state(uuid)
  to authenticated;
