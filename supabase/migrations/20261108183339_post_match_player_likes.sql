-- Permanent receipts deliberately outlive ephemeral rooms/matches.
create table versus_private.match_likes (
  match_id uuid not null,
  sender_id uuid not null references auth.users(id) on delete cascade,
  recipient_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (match_id, sender_id),
  check (sender_id <> recipient_id)
);
create index match_likes_recipient_idx on versus_private.match_likes(recipient_id);
alter table versus_private.match_likes enable row level security;
revoke all on table versus_private.match_likes from public, anon, authenticated, service_role;

create or replace function versus_private.match_like(p_match uuid, p_send boolean default false)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  u uuid := auth.uid();
  opponent uuid;
  sent boolean := false;
begin
  if u is null then raise exception 'Iniciá sesión.' using errcode = '42501'; end if;
  if p_match is null or p_send is null then raise exception 'Duelo inválido.' using errcode = '22023'; end if;
  select recipient_id into opponent from versus_private.match_likes
    where match_id = p_match and sender_id = u;
  sent := found;
  if not sent then
    if not exists (select 1 from public.versus_matches m
      join public.versus_match_players p on p.match_id = m.id and p.user_id = u
      where m.id = p_match and m.status = 'finished')
      or (select count(*) from public.versus_match_players where match_id = p_match) <> 2
    then raise exception 'El duelo todavía no terminó o no participaste.' using errcode = '42501'; end if;
    select user_id into opponent from public.versus_match_players where match_id = p_match and user_id <> u;
    if p_send then
      insert into versus_private.match_likes(match_id, sender_id, recipient_id)
      values (p_match, u, opponent) on conflict (match_id, sender_id) do nothing;
      sent := true;
    end if;
  end if;
  return jsonb_build_object('userId', u, 'matchId', p_match, 'opponentId', opponent, 'sent', sent);
end $$;
revoke all on function versus_private.match_like(uuid, boolean) from public, anon, authenticated, service_role;
grant execute on function versus_private.match_like(uuid, boolean) to authenticated;

create or replace function public.versus_match_like(p_match uuid, p_send boolean default false)
returns jsonb language sql security invoker set search_path = '' as $$
  select versus_private.match_like(p_match, p_send)
$$;
revoke all on function public.versus_match_like(uuid, boolean) from public, anon, authenticated, service_role;
grant execute on function public.versus_match_like(uuid, boolean) to authenticated;

create or replace function versus_private.player_profile()
returns jsonb language sql security definer set search_path = '' as $$
  select versus_private.player_profile_before_xp()
    || jsonb_build_object('xp', versus_private.xp_view(auth.uid(), true),
      'likes', (select count(*) from versus_private.match_likes where recipient_id = auth.uid()))
$$;

create or replace function versus_private.public_player_profile(p_user_id uuid default null, p_offset integer default 0)
returns jsonb language sql security definer set search_path = '' as $$
  select versus_private.public_player_profile_before_xp(p_user_id, p_offset)
    || jsonb_build_object('xp', versus_private.xp_view(coalesce(p_user_id, auth.uid()), false),
      'likes', (select count(*) from versus_private.match_likes where recipient_id = coalesce(p_user_id, auth.uid())))
    || versus_private.tower_public_appearance(coalesce(p_user_id, auth.uid()))
$$;
