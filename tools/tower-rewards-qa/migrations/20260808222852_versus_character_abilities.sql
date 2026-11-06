-- Habilidades cargables de los cuatro personajes.

alter table public.versus_match_players
  add column if not exists ability_charge smallint not null default 0,
  add column if not exists ability_hint text,
  add column if not exists active_effect text,
  add column if not exists effect_expires_at timestamptz;

alter table public.versus_match_players
  drop constraint if exists versus_match_players_ability_charge_check,
  drop constraint if exists versus_match_players_active_effect_check;
alter table public.versus_match_players
  add constraint versus_match_players_ability_charge_check
    check (ability_charge between 0 and 8),
  add constraint versus_match_players_active_effect_check
    check (active_effect is null or active_effect in ('roots', 'roar', 'shuffle'));

create or replace function public.charge_versus_ability()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.score_letters > old.score_letters then
    new.ability_charge := least(8, old.ability_charge + new.score_letters - old.score_letters);
  end if;
  if new.current_word_index <> old.current_word_index
     or new.ability_hint = any(new.guessed_letters) then
    new.ability_hint := null;
  end if;
  return new;
end;
$$;

drop trigger if exists versus_player_charges_ability on public.versus_match_players;
create trigger versus_player_charges_ability
before update on public.versus_match_players
for each row execute function public.charge_versus_ability();

-- Conserva el estado base existente y lo envuelve con los datos de habilidad.
alter function public.get_versus_match_state(uuid)
  rename to get_versus_match_state_core;

create function public.get_versus_match_state(p_room_id uuid)
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
      end
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
      when 'guardiana' then interval '2 seconds'
      when 'dragon' then interval '3 seconds'
      else interval '4 seconds'
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

revoke execute on function public.charge_versus_ability() from public, anon, authenticated;
revoke execute on function public.get_versus_match_state_core(uuid) from public, anon, authenticated;
revoke execute on function public.get_versus_match_state(uuid) from public, anon;
grant execute on function public.get_versus_match_state(uuid) to authenticated;
revoke execute on function public.activate_versus_ability(uuid) from public, anon;
grant execute on function public.activate_versus_ability(uuid) to authenticated;
