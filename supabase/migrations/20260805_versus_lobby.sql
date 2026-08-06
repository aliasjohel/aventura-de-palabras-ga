-- Salas multijugador de Aventura de Palabras.
-- Ejecutar una sola vez desde Supabase > SQL Editor.

create table if not exists public.versus_rooms (
  id uuid primary key default gen_random_uuid(),
  code varchar(6) not null unique,
  status text not null default 'waiting'
    check (status in ('waiting', 'complete', 'preparing', 'playing', 'finished')),
  host_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (code = upper(code) and char_length(code) = 6)
);

create table if not exists public.versus_players (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.versus_rooms(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  alias varchar(16) not null check (char_length(alias) between 2 and 16),
  slot smallint not null check (slot in (1, 2)),
  ready boolean not null default false,
  character_key text,
  joined_at timestamptz not null default now(),
  unique (room_id, user_id),
  unique (room_id, slot)
);

create index if not exists versus_players_user_id_idx
  on public.versus_players(user_id);

create index if not exists versus_players_room_id_idx
  on public.versus_players(room_id);

create or replace function public.touch_versus_room_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists versus_rooms_touch_updated_at on public.versus_rooms;
create trigger versus_rooms_touch_updated_at
before update on public.versus_rooms
for each row execute function public.touch_versus_room_updated_at();

create or replace function public.is_versus_room_member(p_room_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.versus_players
    where room_id = p_room_id
      and user_id = auth.uid()
  );
$$;

create or replace function public.create_versus_room(p_alias text)
returns public.versus_rooms
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_alias text;
  v_code text;
  v_room public.versus_rooms;
begin
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
$$;

create or replace function public.join_versus_room(p_code text, p_alias text)
returns public.versus_rooms
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_alias text;
  v_room public.versus_rooms;
  v_player_count integer;
begin
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

  if exists (
    select 1 from public.versus_players
    where room_id = v_room.id and user_id = v_user_id
  ) then
    return v_room;
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

  if not found then
    return;
  end if;

  if v_host_id = v_user_id then
    delete from public.versus_rooms where id = p_room_id;
    return;
  end if;

  if not exists (
    select 1 from public.versus_players
    where room_id = p_room_id and user_id = v_user_id
  ) then
    raise exception 'No perteneces a esta sala.';
  end if;

  delete from public.versus_players
  where room_id = p_room_id and user_id = v_user_id;

  update public.versus_rooms
  set status = 'waiting'
  where id = p_room_id;
end;
$$;

alter table public.versus_rooms enable row level security;
alter table public.versus_players enable row level security;

drop policy if exists "Room members can read their room" on public.versus_rooms;
create policy "Room members can read their room"
on public.versus_rooms
for select
to authenticated
using (public.is_versus_room_member(id));

drop policy if exists "Room members can read players" on public.versus_players;
create policy "Room members can read players"
on public.versus_players
for select
to authenticated
using (public.is_versus_room_member(room_id));

revoke all on public.versus_rooms from anon, authenticated;
revoke all on public.versus_players from anon, authenticated;
grant select on public.versus_rooms to authenticated;
grant select on public.versus_players to authenticated;

revoke execute on function public.create_versus_room(text) from public, anon;
revoke execute on function public.join_versus_room(text, text) from public, anon;
revoke execute on function public.leave_versus_room(uuid) from public, anon;
revoke execute on function public.is_versus_room_member(uuid) from public, anon;
grant execute on function public.create_versus_room(text) to authenticated;
grant execute on function public.join_versus_room(text, text) to authenticated;
grant execute on function public.leave_versus_room(uuid) to authenticated;
grant execute on function public.is_versus_room_member(uuid) to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'versus_rooms'
  ) then
    alter publication supabase_realtime add table public.versus_rooms;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'versus_players'
  ) then
    alter publication supabase_realtime add table public.versus_players;
  end if;
end;
$$;
