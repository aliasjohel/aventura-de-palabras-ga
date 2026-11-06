-- El primer reloj individual que llega a cero pierde la partida.
-- Esto incluye el tiempo adelantado por la habilidad de Kairós.

create or replace function private.expire_versus_player_times(p_match_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_status text;
  v_timed_out_ids uuid[];
  v_winner_id uuid;
begin
  select status into v_status
  from public.versus_matches
  where id = p_match_id
  for update;

  if v_status <> 'playing' then return; end if;

  select coalesce(array_agg(player.user_id order by player.user_id), '{}'::uuid[])
  into v_timed_out_ids
  from public.versus_match_players as player
  join public.versus_matches as match on match.id = player.match_id
  where match.id = p_match_id
    and not player.finished
    and now() >= match.deadline_at - make_interval(secs => player.time_penalty_seconds);

  if cardinality(v_timed_out_ids) = 0 then return; end if;

  update public.versus_match_players
  set finished = true,
      finish_reason = 'time',
      updated_at = now()
  where match_id = p_match_id
    and user_id = any(v_timed_out_ids);

  -- La función general conserva su desempate habitual si ambos relojes
  -- vencen simultáneamente. Si vence uno solo, el otro gana sin importar
  -- vidas, palabras o puntaje acumulado.
  perform public.finish_versus_match(p_match_id, 'time');

  if cardinality(v_timed_out_ids) = 1 then
    select user_id into v_winner_id
    from public.versus_match_players
    where match_id = p_match_id
      and user_id <> v_timed_out_ids[1]
    limit 1;

    update public.versus_matches
    set winner_id = v_winner_id,
        last_event = jsonb_build_object(
          'type', 'match_finished',
          'reason', 'time',
          'winnerId', v_winner_id,
          'loserId', v_timed_out_ids[1]
        ),
        updated_at = now()
    where id = p_match_id
      and status = 'finished';
  end if;
end;
$$;

revoke execute on function private.expire_versus_player_times(uuid)
  from public, anon, authenticated;
