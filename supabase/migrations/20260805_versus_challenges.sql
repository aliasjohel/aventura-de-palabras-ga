-- Temáticas y palabras secretas para el modo versus.
-- Ejecutar después de 20260805_versus_characters.sql.

alter table public.versus_players
  add column if not exists theme_key text,
  add column if not exists preparation_ready boolean not null default false;

create table if not exists public.versus_challenges (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.versus_rooms(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  target_id uuid not null references auth.users(id) on delete cascade,
  theme_key text not null,
  words text[] not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (room_id, owner_id),
  unique (room_id, target_id),
  check (owner_id <> target_id),
  check (cardinality(words) = 3)
);

create index if not exists versus_challenges_room_id_idx
  on public.versus_challenges(room_id);

alter table public.versus_challenges enable row level security;

drop policy if exists "Challenge creators can read their own words"
  on public.versus_challenges;
create policy "Challenge creators can read their own words"
on public.versus_challenges
for select
to authenticated
using (owner_id = auth.uid());

revoke all on public.versus_challenges from anon, authenticated;
grant select on public.versus_challenges to authenticated;

create or replace function public.set_versus_challenge(
  p_room_id uuid,
  p_theme_key text,
  p_words text[]
)
returns public.versus_rooms
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_target_id uuid;
  v_room public.versus_rooms;
  v_words text[];
  v_player_count integer;
  v_ready_count integer;
begin
  if v_user_id is null then
    raise exception 'Debes iniciar una sesión antes de preparar el desafío.';
  end if;

  if p_theme_key not in (
    'paises', 'frutas', 'animales', 'comidas', 'profesiones',
    'deportes', 'transportes', 'objetos', 'naturaleza', 'nombres'
  ) then
    raise exception 'La temática elegida no es válida.';
  end if;

  if cardinality(p_words) <> 3 then
    raise exception 'Debes enviar exactamente tres palabras.';
  end if;

  select array_agg(upper(btrim(word)) order by position)
  into v_words
  from unnest(p_words) with ordinality as supplied(word, position);

  if exists (
    select 1 from unnest(v_words) as word
    where char_length(word) not between 3 and 12
       or word !~ '^[A-ZÁÉÍÓÚÜÑ]+$'
  ) then
    raise exception 'Las palabras deben tener entre 3 y 12 letras, sin espacios ni números.';
  end if;

  if (select count(distinct word) from unnest(v_words) as word) <> 3 then
    raise exception 'Las tres palabras deben ser diferentes.';
  end if;

  select * into v_room
  from public.versus_rooms
  where id = p_room_id
  for update;

  if not found or not public.is_versus_room_member(p_room_id) then
    raise exception 'No perteneces a esta sala.';
  end if;

  if v_room.status not in ('preparing', 'playing') then
    raise exception 'La sala todavía no está lista para recibir palabras.';
  end if;

  select user_id into v_target_id
  from public.versus_players
  where room_id = p_room_id
    and user_id <> v_user_id;

  if not found then
    raise exception 'El rival ya no está en la sala.';
  end if;

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
  set theme_key = p_theme_key,
      preparation_ready = true
  where room_id = p_room_id
    and user_id = v_user_id;

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
$$;

create or replace function public.cancel_versus_challenge(p_room_id uuid)
returns public.versus_rooms
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_room public.versus_rooms;
begin
  if not public.is_versus_room_member(p_room_id) then
    raise exception 'No perteneces a esta sala.';
  end if;

  delete from public.versus_challenges
  where room_id = p_room_id and owner_id = v_user_id;

  update public.versus_players
  set theme_key = null,
      preparation_ready = false
  where room_id = p_room_id and user_id = v_user_id;

  update public.versus_rooms
  set status = 'preparing'
  where id = p_room_id
  returning * into v_room;

  return v_room;
end;
$$;

-- Al salir un invitado se eliminan también los desafíos de esa sala.
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
  delete from public.versus_players
  where room_id = p_room_id and user_id = v_user_id;

  update public.versus_players
  set ready = false,
      character_key = null,
      theme_key = null,
      preparation_ready = false
  where room_id = p_room_id;

  update public.versus_rooms
  set status = 'waiting'
  where id = p_room_id;
end;
$$;

revoke execute on function public.set_versus_challenge(uuid, text, text[])
  from public, anon;
revoke execute on function public.cancel_versus_challenge(uuid)
  from public, anon;
grant execute on function public.set_versus_challenge(uuid, text, text[])
  to authenticated;
grant execute on function public.cancel_versus_challenge(uuid)
  to authenticated;
