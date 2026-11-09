-- Entrega 2 only: keep server-authored vote eligibility after ephemeral room cleanup.
-- No data rewrite or privilege changes; existing owner, ACL and receipt PK are preserved.
do $guard$
begin
  if not exists (select 1 from pg_proc where oid=to_regprocedure('versus_private.match_like(uuid,boolean)')
    and md5(replace(prosrc,E'\r\n',E'\n'))='13ed04f2d7b6e43a7d4f03ed0ce644d2' and prosecdef)
  then raise exception 'Match-like helper changed since review; stop and reconcile.'; end if;
end $guard$;

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
    -- One statement snapshot: room cleanup cannot split eligibility and opponent lookup.
    with live_match as (
      select status from public.versus_matches where id=p_match
    ), eligible as (
      select p.user_id, m.status='finished' as completed
      from public.versus_match_players p cross join live_match m where p.match_id=p_match
      union all
      select h.user_id, h.finished_at is not null as completed
      from versus_private.player_history h where h.match_id=p_match and not exists (select 1 from live_match)
    )
    select case when count(*)=2 and bool_and(completed) and bool_or(user_id=u)
      then (min(user_id::text) filter (where user_id<>u))::uuid end into opponent
    from eligible;
    if opponent is null or opponent=u then
      raise exception 'El duelo todavía no terminó o no participaste.' using errcode = '42501';
    end if;
    if p_send then
      insert into versus_private.match_likes(match_id, sender_id, recipient_id)
      values (p_match, u, opponent) on conflict (match_id, sender_id) do nothing;
      sent := true;
    end if;
  end if;
  return jsonb_build_object('userId', u, 'matchId', p_match, 'opponentId', opponent, 'sent', sent);
end $$;
