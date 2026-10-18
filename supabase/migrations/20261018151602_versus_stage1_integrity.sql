-- Stage 1: preserve existing signatures, privileges and all stored data.
-- Room lock serializes cancellation against character/challenge preparation.
create or replace function public.cancel_versus_challenge(p_room_id uuid)
returns public.versus_rooms
language plpgsql security definer set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_room public.versus_rooms;
begin
  select * into v_room from public.versus_rooms
  where id = p_room_id for update;
  if not found or v_user_id is null or not public.is_versus_room_member(p_room_id) then
    raise exception 'No perteneces a esta sala.';
  end if;
  -- A late cancellation must never reopen a playing/finished room.
  -- Also reject inconsistent legacy rooms with a still-active match.
  if v_room.status <> 'preparing' or exists (
    select 1 from public.versus_matches
    where room_id = p_room_id and status = 'playing'
  ) then
    raise exception 'La sala todavía no está lista para recibir palabras.';
  end if;

  delete from public.versus_challenges
  where room_id = p_room_id and owner_id = v_user_id;
  update public.versus_players
  set theme_key = null, preparation_ready = false
  where room_id = p_room_id and user_id = v_user_id;
  return v_room;
end;
$$;

-- The finished transition must already contain the final winner:
-- history/ranking triggers execute immediately on that transition.
create or replace function private.expire_versus_player_times(p_match_id uuid)
returns void
language plpgsql security definer set search_path = ''
as $$
declare
  v_status text;
  v_timed_out_ids uuid[];
  v_winner_id uuid;
begin
  select status into v_status from public.versus_matches
  where id = p_match_id for update;
  if v_status is distinct from 'playing' then return; end if;

  select coalesce(array_agg(player.user_id order by player.user_id), '{}'::uuid[])
  into v_timed_out_ids
  from public.versus_match_players as player
  join public.versus_matches as match on match.id = player.match_id
  where match.id = p_match_id and not player.finished
    and now() >= match.deadline_at - make_interval(secs => player.time_penalty_seconds);
  if cardinality(v_timed_out_ids) = 0 then return; end if;

  update public.versus_match_players
  set finished = true, finish_reason = 'time', updated_at = now()
  where match_id = p_match_id and user_id = any(v_timed_out_ids);

  if cardinality(v_timed_out_ids) = 1 then
    select user_id into v_winner_id from public.versus_match_players
    where match_id = p_match_id and user_id <> v_timed_out_ids[1]
    limit 1;
    update public.versus_matches
    set status = 'finished', winner_id = v_winner_id,
        event_sequence = event_sequence + 1,
        last_event = jsonb_build_object(
          'type', 'match_finished', 'reason', 'time',
          'winnerId', v_winner_id, 'loserId', v_timed_out_ids[1],
          'previousEvent', last_event
        ), updated_at = now()
    where id = p_match_id and status = 'playing';
  else
    -- Simultaneous expiry retains the existing general tiebreaker.
    perform public.finish_versus_match(p_match_id, 'time');
  end if;
end;
$$;

-- Explicitly preserve the preexisting API access boundaries.
revoke execute on function public.cancel_versus_challenge(uuid) from public, anon;
grant execute on function public.cancel_versus_challenge(uuid) to authenticated;
revoke execute on function private.expire_versus_player_times(uuid) from public, anon, authenticated;
