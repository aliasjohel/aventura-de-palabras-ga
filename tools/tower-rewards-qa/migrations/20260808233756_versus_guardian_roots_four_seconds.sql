-- Iguala la duración de las raíces de la guardiana con el rugido del dragón.

-- Ajusta las duraciones de los efectos especiales para que sean perceptibles en línea.

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
begin
  if not public.is_versus_room_member(p_room_id) then
    raise exception 'No perteneces a esta sala.';
  end if;

  select * into v_match from public.versus_matches
  where room_id = p_room_id for update;
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
  if v_character not in ('explorador', 'guardiana', 'dragon', 'mago') then
    raise exception 'El personaje no tiene una habilidad válida.';
  end if;

  if v_character = 'explorador' then
    select words[v_me.current_word_index + 1] into v_word
    from public.versus_challenges
    where room_id = p_room_id and target_id = v_user_id;

    select key into v_hint
    from (
      select distinct public.versus_letter_key(character) as key
      from unnest(string_to_array(coalesce(v_word, ''), null)) as character
    ) as pending
    where key <> all(v_me.guessed_letters)
    order by random()
    limit 1;

    if v_hint is null then raise exception 'No quedan letras para revelar.'; end if;
    update public.versus_match_players
    set ability_charge = 0, ability_hint = v_hint, updated_at = now()
    where match_id = v_match.id and user_id = v_user_id;
  else
    v_effect := case v_character
      when 'guardiana' then 'roots'
      when 'dragon' then 'roar'
      else 'shuffle'
    end;
    v_expires_at := now() + case v_character
      when 'guardiana' then interval '4 seconds'
      when 'dragon' then interval '4 seconds'
      else interval '5 seconds'
    end;

    update public.versus_match_players
    set ability_charge = 0, ability_hint = null, updated_at = now()
    where match_id = v_match.id and user_id = v_user_id;
    update public.versus_match_players
    set active_effect = v_effect,
        effect_expires_at = v_expires_at,
        updated_at = now()
    where match_id = v_match.id and user_id = v_opponent.user_id;
  end if;

  update public.versus_matches
  set event_sequence = event_sequence + 1,
      last_event = jsonb_build_object(
        'type', 'ability_used',
        'actorId', v_user_id,
        'character', v_character,
        'effect', coalesce(v_effect, 'hint'),
        'expiresAt', v_expires_at
      ),
      updated_at = now()
  where id = v_match.id;

  return public.get_versus_match_state(p_room_id);
end;
$$;


revoke execute on function public.activate_versus_ability(uuid) from public, anon;
grant execute on function public.activate_versus_ability(uuid) to authenticated;

