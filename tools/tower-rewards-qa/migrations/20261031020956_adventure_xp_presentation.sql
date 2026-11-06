-- Read-only presentation data. No award, claim, quota or balance code changes.
begin;
set local lock_timeout='5s';set local statement_timeout='60s';
create function versus_private.adventure_xp_feedback(p_attempt uuid,p_from bigint default null) returns jsonb
language plpgsql stable security definer set search_path='' as $$
declare u uuid:=auth.uid();v versus_private.verified_adventure_completions;e versus_private.xp_events;
 x jsonb;f jsonb;cursor_ jsonb;steps jsonb:='[]';first_ text;repeat_ text;i integer;
begin
 if not versus_private.xp_permanent(u) then raise exception 'A confirmed account is required';end if;
 if not exists(select 1 from versus_private.adventure_reward_attempts where id=p_attempt and user_id=u) then raise exception 'Attempt does not belong to this account';end if;
 x:=versus_private.xp_view(u,true);
 select * into v from versus_private.verified_adventure_completions where attempt_id=p_attempt and user_id=u and verifier_version='sql-actions-v1';
 if found then
  first_:='adventure:first:'||v.world||':'||v.mission;
  repeat_:='adventure:repeat:'||v.world||':'||v.mission||':'||(v.completed_at at time zone 'UTC')::date;
  -- A previous completion's event never pays for a new, ineligible replay.
  select * into e from versus_private.xp_events where user_id=u and source in(first_,repeat_)
   and mode in('adventure_first','adventure_repeat') and occurred_at=v.completed_at and not historical;
 end if;
 -- p_from is a previous server snapshot supplied by the UI, used only to select
 -- visual level boundaries. It cannot change earned XP or any stored resource.
 f:=versus_private.xp_level_info(case when p_from between 0 and (x->>'total')::bigint then p_from else (x->>'total')::bigint end);
 if (x->>'level')::bigint-(f->>'level')::bigint<=128 then
  cursor_:=f;
  for i in 0..128 loop
   steps:=steps||jsonb_build_array(cursor_);
   exit when (cursor_->>'level')::bigint>=(x->>'level')::bigint;
   cursor_:=versus_private.xp_level_info((cursor_->>'nextLevel')::bigint);
  end loop;
 end if;
 return jsonb_build_object('userId',u,'attemptId',p_attempt,'xp',x,'from',f,'levels',steps,
  'earned',coalesce(e.amount,0),'event',e.source,'confirmed',v.attempt_id is not null);
end $$;
create function public.adventure_xp_feedback(p_attempt uuid,p_from bigint default null) returns jsonb
language sql stable security invoker set search_path='' as $$select versus_private.adventure_xp_feedback(p_attempt,p_from)$$;
revoke all on function versus_private.adventure_xp_feedback(uuid,bigint),public.adventure_xp_feedback(uuid,bigint) from public,anon,authenticated,service_role;
grant execute on function versus_private.adventure_xp_feedback(uuid,bigint),public.adventure_xp_feedback(uuid,bigint) to authenticated;
notify pgrst,'reload schema';
commit;
