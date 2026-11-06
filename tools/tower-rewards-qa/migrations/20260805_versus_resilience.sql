-- Reconexión, abandono y revancha para el modo versus.
-- Ejecutar después de 20260805_versus_matches.sql.

alter table public.versus_players
  add column if not exists rematch_ready boolean not null default false;

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
  v_room_id uuid;
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
  where id = p_match_id and status = 'playing'
  returning room_id into v_room_id;

  if v_room_id is not null then
    update public.versus_rooms
    set status = 'finished'
    where id = v_room_id;
  end if;
end;
$$;

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

  if not found then return; end if;

  if v_host_id = v_user_id then
    delete from public.versus_rooms where id = p_room_id;
    return;
  end if;

  if not public.is_versus_room_member(p_room_id) then
    raise exception 'No perteneces a esta sala.';
  end if;

  delete from public.versus_challenges where room_id = p_room_id;
  delete from public.versus_matches where room_id = p_room_id;
  delete from public.versus_players
  where room_id = p_room_id and user_id = v_user_id;

  update public.versus_players
  set ready = false,
      character_key = null,
      theme_key = null,
      preparation_ready = false,
      rematch_ready = false
  where room_id = p_room_id;

  update public.versus_rooms
  set status = 'waiting'
  where id = p_room_id;
end;
$$;

revoke execute on function public.finish_versus_match(uuid, text)
  from public, anon, authenticated;
revoke execute on function public.request_versus_rematch(uuid)
  from public, anon;
grant execute on function public.request_versus_rematch(uuid)
  to authenticated;
