-- Cuentas permanentes, amistades e invitaciones directas para el modo versus.

create table public.versus_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  alias varchar(16) not null check (char_length(alias) between 2 and 16),
  friend_code varchar(8) not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (friend_code = upper(friend_code) and friend_code ~ '^[A-HJ-NP-Z2-9]{8}$')
);

create table public.versus_friendships (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references auth.users(id) on delete cascade,
  addressee_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending'
    check (status in ('pending', 'accepted', 'declined')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (requester_id <> addressee_id)
);

create unique index versus_friendships_pair_idx
  on public.versus_friendships (
    (least(requester_id, addressee_id)),
    (greatest(requester_id, addressee_id))
  );

create index versus_friendships_requester_idx
  on public.versus_friendships(requester_id, status);
create index versus_friendships_addressee_idx
  on public.versus_friendships(addressee_id, status);

create table public.versus_invites (
  id uuid primary key default gen_random_uuid(),
  challenger_id uuid not null references auth.users(id) on delete cascade,
  challenged_id uuid not null references auth.users(id) on delete cascade,
  room_id uuid references public.versus_rooms(id) on delete set null,
  status text not null default 'pending'
    check (status in ('pending', 'accepted', 'declined', 'cancelled', 'expired')),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '10 minutes'),
  responded_at timestamptz,
  check (challenger_id <> challenged_id)
);

create index versus_invites_challenged_idx
  on public.versus_invites(challenged_id, status, expires_at desc);
create index versus_invites_challenger_idx
  on public.versus_invites(challenger_id, status, expires_at desc);

create trigger versus_profiles_touch_updated_at
before update on public.versus_profiles
for each row execute function public.touch_versus_room_updated_at();

create trigger versus_friendships_touch_updated_at
before update on public.versus_friendships
for each row execute function public.touch_versus_room_updated_at();

create or replace function public.is_permanent_versus_user()
returns boolean
language sql
stable
set search_path = ''
as $$
  select auth.uid() is not null
    and coalesce((auth.jwt() ->> 'is_anonymous')::boolean, true) is false;
$$;

create or replace function public.upsert_versus_profile(p_alias text)
returns public.versus_profiles
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_alias text;
  v_code text;
  v_profile public.versus_profiles;
begin
  if not public.is_permanent_versus_user() then
    raise exception 'Guardá tu cuenta antes de crear un perfil de Amigos.';
  end if;

  v_alias := regexp_replace(btrim(coalesce(p_alias, '')), '\s+', ' ', 'g');
  if char_length(v_alias) not between 2 and 16 then
    raise exception 'El nombre debe tener entre 2 y 16 caracteres.';
  end if;

  select * into v_profile
  from public.versus_profiles
  where user_id = v_user_id
  for update;

  if found then
    update public.versus_profiles
    set alias = v_alias
    where user_id = v_user_id
    returning * into v_profile;
    return v_profile;
  end if;

  loop
    select string_agg(
      substr('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 1 + floor(random() * 32)::integer, 1),
      ''
    ) into v_code
    from generate_series(1, 8);

    begin
      insert into public.versus_profiles (user_id, alias, friend_code)
      values (v_user_id, v_alias, v_code)
      returning * into v_profile;
      return v_profile;
    exception when unique_violation then
      -- Si el código ya existe, generamos otro sin alterar el perfil.
    end;
  end loop;
end;
$$;

create or replace function public.get_versus_social_state()
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
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
        'expires_at', i.expires_at
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
        'expires_at', i.expires_at
      ) order by i.created_at desc)
      from public.versus_invites i
      join public.versus_profiles p on p.user_id = i.challenged_id
      where i.challenger_id = v_user_id
        and i.status = 'pending'
        and i.expires_at > now()
    ), '[]'::jsonb)
  ) into v_result;

  return v_result;
end;
$$;

create or replace function public.send_versus_friend_request(p_friend_code text)
returns public.versus_friendships
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_target_id uuid;
  v_friendship public.versus_friendships;
begin
  if not public.is_permanent_versus_user() then
    raise exception 'Guardá tu cuenta para agregar amigos.';
  end if;
  if not exists (select 1 from public.versus_profiles where user_id = v_user_id) then
    raise exception 'Creá tu perfil de jugador antes de agregar amigos.';
  end if;

  select user_id into v_target_id
  from public.versus_profiles
  where friend_code = upper(regexp_replace(coalesce(p_friend_code, ''), '[^A-Za-z0-9]', '', 'g'));

  if v_target_id is null then
    raise exception 'No encontramos un jugador con ese código.';
  end if;
  if v_target_id = v_user_id then
    raise exception 'Ese es tu propio código de amigo.';
  end if;

  select * into v_friendship
  from public.versus_friendships
  where least(requester_id, addressee_id) = least(v_user_id, v_target_id)
    and greatest(requester_id, addressee_id) = greatest(v_user_id, v_target_id)
  for update;

  if not found then
    insert into public.versus_friendships (requester_id, addressee_id)
    values (v_user_id, v_target_id)
    returning * into v_friendship;
    return v_friendship;
  end if;

  if v_friendship.status = 'accepted' then
    raise exception 'Ese jugador ya está en tu lista de amigos.';
  end if;

  if v_friendship.status = 'pending'
     and v_friendship.requester_id = v_target_id then
    update public.versus_friendships
    set status = 'accepted'
    where id = v_friendship.id
    returning * into v_friendship;
    return v_friendship;
  end if;

  update public.versus_friendships
  set requester_id = v_user_id,
      addressee_id = v_target_id,
      status = 'pending'
  where id = v_friendship.id
  returning * into v_friendship;
  return v_friendship;
end;
$$;

create or replace function public.respond_versus_friend_request(
  p_friendship_id uuid,
  p_accept boolean
)
returns public.versus_friendships
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_friendship public.versus_friendships;
begin
  if not public.is_permanent_versus_user() then
    raise exception 'Guardá tu cuenta para responder solicitudes.';
  end if;

  select * into v_friendship
  from public.versus_friendships
  where id = p_friendship_id
  for update;

  if not found or v_friendship.addressee_id <> auth.uid() then
    raise exception 'No podés responder esa solicitud.';
  end if;
  if v_friendship.status <> 'pending' then
    raise exception 'La solicitud ya fue respondida.';
  end if;

  update public.versus_friendships
  set status = case when coalesce(p_accept, false) then 'accepted' else 'declined' end
  where id = v_friendship.id
  returning * into v_friendship;
  return v_friendship;
end;
$$;

create or replace function public.remove_versus_friend(p_friendship_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_permanent_versus_user() then
    raise exception 'Guardá tu cuenta para administrar amigos.';
  end if;

  delete from public.versus_friendships
  where id = p_friendship_id
    and auth.uid() in (requester_id, addressee_id);

  if not found then
    raise exception 'No encontramos esa amistad.';
  end if;
end;
$$;

create or replace function public.send_versus_invite(p_friend_id uuid)
returns public.versus_invites
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_invite public.versus_invites;
begin
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
$$;

create or replace function public.cancel_versus_invite(p_invite_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
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
$$;

create or replace function public.respond_versus_invite(
  p_invite_id uuid,
  p_accept boolean
)
returns public.versus_rooms
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_invite public.versus_invites;
  v_challenger_alias text;
  v_challenged_alias text;
  v_code text;
  v_room public.versus_rooms;
begin
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
  if v_invite.status <> 'pending' then
    raise exception 'El desafío ya fue respondido.';
  end if;
  if v_invite.expires_at <= now() then
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
      insert into public.versus_rooms (code, status, host_id)
      values (v_code, 'complete', v_invite.challenger_id)
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
$$;

alter table public.versus_profiles enable row level security;
alter table public.versus_friendships enable row level security;
alter table public.versus_invites enable row level security;

create policy "Players can read connected profiles"
on public.versus_profiles for select to authenticated
using (
  versus_profiles.user_id = (select auth.uid())
  or exists (
    select 1 from public.versus_friendships f
    where (select auth.uid()) in (f.requester_id, f.addressee_id)
      and versus_profiles.user_id in (f.requester_id, f.addressee_id)
  )
);

create policy "Players can read their friendships"
on public.versus_friendships for select to authenticated
using ((select auth.uid()) in (requester_id, addressee_id));

create policy "Players can read their invites"
on public.versus_invites for select to authenticated
using ((select auth.uid()) in (challenger_id, challenged_id));

revoke all on public.versus_profiles from public, anon, authenticated;
revoke all on public.versus_friendships from public, anon, authenticated;
revoke all on public.versus_invites from public, anon, authenticated;
grant select on public.versus_profiles to authenticated;
grant select on public.versus_friendships to authenticated;
grant select on public.versus_invites to authenticated;

revoke execute on function public.is_permanent_versus_user() from public, anon;
revoke execute on function public.upsert_versus_profile(text) from public, anon;
revoke execute on function public.get_versus_social_state() from public, anon;
revoke execute on function public.send_versus_friend_request(text) from public, anon;
revoke execute on function public.respond_versus_friend_request(uuid, boolean) from public, anon;
revoke execute on function public.remove_versus_friend(uuid) from public, anon;
revoke execute on function public.send_versus_invite(uuid) from public, anon;
revoke execute on function public.cancel_versus_invite(uuid) from public, anon;
revoke execute on function public.respond_versus_invite(uuid, boolean) from public, anon;

grant execute on function public.is_permanent_versus_user() to authenticated;
grant execute on function public.upsert_versus_profile(text) to authenticated;
grant execute on function public.get_versus_social_state() to authenticated;
grant execute on function public.send_versus_friend_request(text) to authenticated;
grant execute on function public.respond_versus_friend_request(uuid, boolean) to authenticated;
grant execute on function public.remove_versus_friend(uuid) to authenticated;
grant execute on function public.send_versus_invite(uuid) to authenticated;
grant execute on function public.cancel_versus_invite(uuid) to authenticated;
grant execute on function public.respond_versus_invite(uuid, boolean) to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public' and tablename = 'versus_profiles'
  ) then
    alter publication supabase_realtime add table public.versus_profiles;
  end if;
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public' and tablename = 'versus_friendships'
  ) then
    alter publication supabase_realtime add table public.versus_friendships;
  end if;
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public' and tablename = 'versus_invites'
  ) then
    alter publication supabase_realtime add table public.versus_invites;
  end if;
end;
$$;
