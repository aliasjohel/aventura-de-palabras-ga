-- Stage 2: one admission lock shared with the existing matchmaking transaction.
-- No table/data reset, backfill or new social system.
create or replace function private.assert_versus_available(p_users uuid[], p_room_id uuid default null)
returns void language plpgsql security definer set search_path='' as $$
begin
 perform pg_advisory_xact_lock(927341);
 if exists (
  select 1 from public.versus_players p join public.versus_rooms r on r.id=p.room_id
  where p.user_id=any(p_users) and (p_room_id is null or r.id<>p_room_id)
   and (r.status in ('complete','preparing','playing') or exists (
    select 1 from public.versus_matches m where m.room_id=r.id and m.status='playing'
   ))
 ) then raise exception 'Terminá o abandoná tu partida actual antes de buscar otra.';end if;
end $$;
revoke all on function private.assert_versus_available(uuid[],uuid) from public,anon,authenticated;

CREATE OR REPLACE FUNCTION public.create_versus_room(p_alias text)
 RETURNS versus_rooms
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_user_id uuid := auth.uid();
  v_alias text;
  v_code text;
  v_room public.versus_rooms;
begin
  perform private.assert_versus_available(array[v_user_id]);
  if v_user_id is null then
    raise exception 'Debes iniciar una sesión anónima antes de crear una sala.';
  end if;

  v_alias := regexp_replace(btrim(coalesce(p_alias, '')), '\s+', ' ', 'g');
  if char_length(v_alias) not between 2 and 16 then
    raise exception 'El nombre debe tener entre 2 y 16 caracteres.';
  end if;

  loop
    select string_agg(
      substr('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 1 + floor(random() * 32)::integer, 1),
      ''
    )
    into v_code
    from generate_series(1, 6);

    begin
      insert into public.versus_rooms (code, host_id)
      values (v_code, v_user_id)
      returning * into v_room;
      exit;
    exception when unique_violation then
      -- La posibilidad de repetir un código es mínima; si ocurre, generamos otro.
    end;
  end loop;

  insert into public.versus_players (room_id, user_id, alias, slot)
  values (v_room.id, v_user_id, v_alias, 1);

  return v_room;
end;
$function$
;

CREATE OR REPLACE FUNCTION versus_private.join_room_core(p_code text, p_alias text)
 RETURNS versus_rooms
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_user_id uuid := auth.uid();
  v_alias text;
  v_room public.versus_rooms;
  v_player_count integer;
begin
  perform pg_advisory_xact_lock(927341);
  if v_user_id is null then
    raise exception 'Debes iniciar una sesión anónima antes de unirte.';
  end if;

  v_alias := regexp_replace(btrim(coalesce(p_alias, '')), '\s+', ' ', 'g');
  if char_length(v_alias) not between 2 and 16 then
    raise exception 'El nombre debe tener entre 2 y 16 caracteres.';
  end if;

  select *
  into v_room
  from public.versus_rooms
  where code = upper(btrim(coalesce(p_code, '')))
  for update;

  if not found then
    raise exception 'No encontramos una sala con ese código.';
  end if;

  perform private.assert_versus_available(
    array(select user_id from public.versus_players where room_id=v_room.id) || array[v_user_id],v_room.id);

  if exists (
    select 1 from public.versus_players
    where room_id = v_room.id and user_id = v_user_id
  ) then
    return v_room;
  end if;

  if v_room.queue_mode = 'ranked' then
    raise exception 'Las salas clasificatorias se forman con Buscar rival.';
  end if;

  select count(*) into v_player_count
  from public.versus_players
  where room_id = v_room.id;

  if v_player_count >= 2 or v_room.status <> 'waiting' then
    raise exception 'La sala ya está completa.';
  end if;

  insert into public.versus_players (room_id, user_id, alias, slot)
  values (v_room.id, v_user_id, v_alias, 2);

  update public.versus_rooms
  set status = 'complete'
  where id = v_room.id
  returning * into v_room;

  return v_room;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.set_versus_character(p_room_id uuid, p_character_key text, p_ready boolean DEFAULT true)
 RETURNS versus_rooms
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_user_id uuid := auth.uid();
  v_room public.versus_rooms;
  v_player_count integer;
  v_ready_count integer;
begin
  perform private.assert_versus_available(
    array(select user_id from public.versus_players where room_id=p_room_id) || array[auth.uid()],p_room_id);
  if v_user_id is null then raise exception 'Debes iniciar una sesión antes de elegir personaje.'; end if;
  if p_character_key not in (
    'explorador', 'mago', 'guardiana', 'dragon', 'hombre_lobo', 't_shadow',
    'guardian_alba', 'dragon_hielo', 'azrak', 'kalamo', 'kairos'
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
$function$
;

CREATE OR REPLACE FUNCTION public.set_versus_challenge(p_room_id uuid, p_theme_key text, p_words text[])
 RETURNS versus_rooms
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_user_id uuid := auth.uid();
  v_target_id uuid;
  v_room public.versus_rooms;
  v_words text[];
  v_player_count integer;
  v_ready_count integer;
begin
  perform private.assert_versus_available(
    array(select user_id from public.versus_players where room_id=p_room_id) || array[auth.uid()],p_room_id);
  if v_user_id is null then
    raise exception 'Debes iniciar una sesión antes de preparar el desafío.';
  end if;

  select * into v_room
  from public.versus_rooms
  where id = p_room_id
  for update;

  if not found or not public.is_versus_room_member(p_room_id) then
    raise exception 'No perteneces a esta sala.';
  end if;
  if v_room.status not in ('preparing') then
    raise exception 'La sala todavía no está lista para recibir palabras.';
  end if;

  if p_theme_key is null or p_theme_key not in (
    'paises', 'frutas', 'animales', 'comidas', 'profesiones',
    'deportes', 'transportes', 'objetos', 'naturaleza', 'nombres'
  ) then
    raise exception 'La temática elegida no es válida.';
  end if;

  if coalesce(cardinality(p_words),0) <> 5 or array_ndims(p_words) <> 1 then
    raise exception 'Debes enviar exactamente cinco palabras.';
  end if;

  select array_agg(upper(normalize(btrim(word),NFC)) order by position)
  into v_words
  from unnest(p_words) with ordinality as supplied(word, position);

  if exists (
    select 1 from unnest(v_words) as word
    where word is null or char_length(word) not between 3 and 12
       or word !~ case v_room.word_language when 'en' then '^[A-Z]+$' when 'pt-BR' then '^[A-ZÁÀÂÃÉÊÍÓÔÕÚÜÇ]+$' else '^[A-ZÁÉÍÓÚÜÑ]+$' end
  ) then
    raise exception 'Las palabras deben tener entre 3 y 12 letras, sin espacios ni números.';
  end if;

  if (
    select count(distinct public.versus_letter_key(word))
    from unnest(v_words) as word
  ) <> 5 then
    raise exception 'Las cinco palabras deben ser diferentes.';
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
$function$
;

CREATE OR REPLACE FUNCTION public.request_versus_rematch(p_room_id uuid)
 RETURNS versus_rooms
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_room public.versus_rooms;
  v_player_count integer;
  v_ready_count integer;
begin
  perform private.assert_versus_available(
    array(select user_id from public.versus_players where room_id=p_room_id) || array[auth.uid()],p_room_id);
  select * into v_room
  from public.versus_rooms
  where id = p_room_id
  for update;

  if not found or not public.is_versus_room_member(p_room_id) then
    raise exception 'No perteneces a esta sala.';
  end if;

  if exists(select 1 from public.versus_matches where room_id=p_room_id and status='playing') then
    raise exception 'La partida todavía no terminó.';
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
$function$
;

CREATE OR REPLACE FUNCTION public.start_versus_match_on_room_ready()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_match_id uuid;
  v_start timestamptz := now() + interval '4 seconds';
begin
  if new.status <> 'playing' or old.status = 'playing' then return new; end if;

  perform private.assert_versus_available(array(select user_id from public.versus_players where room_id=new.id),new.id);
  if exists(select 1 from public.versus_matches where room_id=new.id and status='playing') then
    raise exception 'La partida todavía no terminó.';
  end if;
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
$function$
;

CREATE OR REPLACE FUNCTION public.send_versus_invite(p_friend_id uuid)
 RETURNS versus_invites
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_user_id uuid := auth.uid();
  v_invite public.versus_invites;
begin
  perform private.assert_versus_available(array[v_user_id,p_friend_id]);
  if not public.is_permanent_versus_user() then
    raise exception 'Guardá tu cuenta para desafiar amigos.';
  end if;
  if p_friend_id = v_user_id then
    raise exception 'No podés desafiarte a vos mismo.';
  end if;
  if not exists (
    select 1 from public.versus_friendships
    where status = 'accepted'
      and least(requester_id, addressee_id) = least(v_user_id, p_friend_id)
      and greatest(requester_id, addressee_id) = greatest(v_user_id, p_friend_id)
  ) then
    raise exception 'Solo podés desafiar a jugadores de tu lista de amigos.';
  end if;

  update public.versus_invites
  set status = 'expired', responded_at = now()
  where status = 'pending' and expires_at <= now()
    and v_user_id in (challenger_id, challenged_id);

  if exists (
    select 1 from public.versus_invites
    where challenger_id = p_friend_id
      and challenged_id = v_user_id
      and status = 'pending' and expires_at > now()
  ) then
    raise exception 'Ese amigo ya te envió un desafío. Revisá tus invitaciones.';
  end if;

  update public.versus_invites
  set status = 'cancelled', responded_at = now()
  where challenger_id = v_user_id and status = 'pending';

  insert into public.versus_invites (challenger_id, challenged_id)
  values (v_user_id, p_friend_id)
  returning * into v_invite;
  return v_invite;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.cancel_versus_invite(p_invite_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  perform pg_advisory_xact_lock(927341);
  if not public.is_permanent_versus_user() then
    raise exception 'Guardá tu cuenta para cancelar desafíos.';
  end if;

  update public.versus_invites
  set status = 'cancelled', responded_at = now()
  where id = p_invite_id
    and challenger_id = auth.uid()
    and status = 'pending';
  if not found then
    raise exception 'No se pudo cancelar ese desafío.';
  end if;
end;
$function$
;

CREATE OR REPLACE FUNCTION versus_private.respond_invite_core(p_invite_id uuid, p_accept boolean)
 RETURNS versus_rooms
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_user_id uuid := auth.uid();
  v_invite public.versus_invites;
  v_challenger_alias text;
  v_challenged_alias text;
  v_code text;
  v_room public.versus_rooms;
begin
  perform pg_advisory_xact_lock(927341);
  if not public.is_permanent_versus_user() then
    raise exception 'Guardá tu cuenta para responder desafíos.';
  end if;

  select * into v_invite
  from public.versus_invites
  where id = p_invite_id
  for update;

  if not found or v_invite.challenged_id <> v_user_id then
    raise exception 'No podés responder ese desafío.';
  end if;
  -- A lost HTTP response can be retried, but only for the same still-live room.
  if v_invite.status='accepted' and coalesce(p_accept,false) then
    select r.* into v_room from public.versus_rooms r
    where r.id=v_invite.room_id and r.status in ('complete','preparing','playing')
      and exists(select 1 from public.versus_players p where p.room_id=r.id and p.user_id=v_user_id)
      and exists(select 1 from public.versus_players p where p.room_id=r.id and p.user_id=v_invite.challenger_id);
    if v_room.id is not null then return v_room;end if;
  end if;
  if v_invite.status <> 'pending' then
    raise exception 'El desafío ya fue respondido.';
  end if;
  if v_invite.expires_at <= clock_timestamp() then
    update public.versus_invites
    set status = 'expired', responded_at = now()
    where id = v_invite.id;
    raise exception 'El desafío venció. Pedile a tu amigo que envíe otro.';
  end if;

  if not coalesce(p_accept, false) then
    update public.versus_invites
    set status = 'declined', responded_at = now()
    where id = v_invite.id;
    return null;
  end if;

  perform private.assert_versus_available(array[v_invite.challenger_id,v_user_id]);
  if not exists (
    select 1 from public.versus_friendships
    where status = 'accepted'
      and least(requester_id, addressee_id) = least(v_invite.challenger_id, v_user_id)
      and greatest(requester_id, addressee_id) = greatest(v_invite.challenger_id, v_user_id)
  ) then
    raise exception 'La amistad ya no está activa.';
  end if;

  select alias into v_challenger_alias
  from public.versus_profiles where user_id = v_invite.challenger_id;
  select alias into v_challenged_alias
  from public.versus_profiles where user_id = v_user_id;
  if v_challenger_alias is null or v_challenged_alias is null then
    raise exception 'Falta el perfil de uno de los jugadores.';
  end if;

  loop
    select string_agg(
      substr('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 1 + floor(random() * 32)::integer, 1),
      ''
    ) into v_code
    from generate_series(1, 6);
    begin
      insert into public.versus_rooms (code, status, host_id, word_language)
      values (v_code, 'complete', v_invite.challenger_id, v_invite.word_language)
      returning * into v_room;
      exit;
    exception when unique_violation then
      -- Reintentamos con otro código compatible con las salas manuales.
    end;
  end loop;

  insert into public.versus_players (room_id, user_id, alias, slot)
  values
    (v_room.id, v_invite.challenger_id, v_challenger_alias, 1),
    (v_room.id, v_user_id, v_challenged_alias, 2);

  update public.versus_invites
  set status = 'accepted', room_id = v_room.id, responded_at = now()
  where id = v_invite.id;

  update public.versus_invites
  set status = 'cancelled', responded_at = now()
  where id <> v_invite.id
    and status = 'pending'
    and (
      v_invite.challenger_id in (challenger_id, challenged_id)
      or v_user_id in (challenger_id, challenged_id)
    );

  return v_room;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.get_versus_social_state()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_user_id uuid := auth.uid();
  v_result jsonb;
begin
  if not public.is_permanent_versus_user() then
    raise exception 'Guardá tu cuenta para usar Amigos.';
  end if;

  select jsonb_build_object(
    'profile', (
      select to_jsonb(p) - 'created_at' - 'updated_at'
      from public.versus_profiles p
      where p.user_id = v_user_id
    ),
    'friends', coalesce((
      select jsonb_agg(jsonb_build_object(
        'friendship_id', f.id,
        'user_id', p.user_id,
        'alias', p.alias,
        'friend_code', p.friend_code
      ) order by lower(p.alias))
      from public.versus_friendships f
      join public.versus_profiles p
        on p.user_id = case
          when f.requester_id = v_user_id then f.addressee_id
          else f.requester_id
        end
      where f.status = 'accepted'
        and v_user_id in (f.requester_id, f.addressee_id)
    ), '[]'::jsonb),
    'incoming_requests', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', f.id,
        'user_id', p.user_id,
        'alias', p.alias,
        'friend_code', p.friend_code,
        'created_at', f.created_at
      ) order by f.created_at)
      from public.versus_friendships f
      join public.versus_profiles p on p.user_id = f.requester_id
      where f.addressee_id = v_user_id and f.status = 'pending'
    ), '[]'::jsonb),
    'outgoing_requests', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', f.id,
        'user_id', p.user_id,
        'alias', p.alias,
        'friend_code', p.friend_code,
        'created_at', f.created_at
      ) order by f.created_at)
      from public.versus_friendships f
      join public.versus_profiles p on p.user_id = f.addressee_id
      where f.requester_id = v_user_id and f.status = 'pending'
    ), '[]'::jsonb),
    'incoming_invites', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', i.id,
        'challenger_id', i.challenger_id,
        'alias', p.alias,
        'created_at', i.created_at,
        'expires_at', i.expires_at, 'word_language', i.word_language
      ) order by i.created_at desc)
      from public.versus_invites i
      join public.versus_profiles p on p.user_id = i.challenger_id
      where i.challenged_id = v_user_id
        and i.status = 'pending'
        and i.expires_at > now()
    ), '[]'::jsonb),
    'outgoing_invites', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', i.id,
        'challenged_id', i.challenged_id,
        'alias', p.alias,
        'created_at', i.created_at,
        'expires_at', i.expires_at, 'word_language', i.word_language
      ) order by i.created_at desc)
      from public.versus_invites i
      join public.versus_profiles p on p.user_id = i.challenged_id
      where i.challenger_id = v_user_id
        and i.status = 'pending'
        and i.expires_at > now()
    ), '[]'::jsonb)
  ) into v_result;

  return v_result || jsonb_build_object('accepted_invites',coalesce((
    select jsonb_agg(jsonb_build_object('id',i.id,'room_id',r.id,
      'challenger_id',i.challenger_id,'challenged_id',i.challenged_id,
      'word_language',r.word_language,'room_status',r.status,'responded_at',i.responded_at)
      order by i.responded_at desc,i.id)
    from public.versus_invites i join public.versus_rooms r on r.id=i.room_id
    where i.status='accepted' and v_user_id in(i.challenger_id,i.challenged_id)
      and r.status in ('complete','preparing','playing')
      and exists(select 1 from public.versus_players p where p.room_id=r.id and p.user_id=i.challenger_id)
      and exists(select 1 from public.versus_players p where p.room_id=r.id and p.user_id=i.challenged_id)
  ),'[]'::jsonb));
end;
$function$
;

notify pgrst,'reload schema';
