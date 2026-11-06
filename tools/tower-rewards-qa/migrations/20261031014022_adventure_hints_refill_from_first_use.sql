-- Free Adventure hints: refill to capacity 120 minutes after falling below three.
-- Existing paid levels/letters, receipts, bonus markers and all other resources stay intact.
begin;
set local lock_timeout='5s';set local statement_timeout='60s';
lock table versus_private.adventure_hint_inventory in share row exclusive mode;
do $guard$ begin
 if exists(select 1 from versus_private.adventure_hint_inventory where balance>3) then
  raise exception 'Existing hint stock exceeds three; preserve it and review before installing';
 end if;
 if md5(pg_get_functiondef('versus_private.adventure_word_help(uuid,text,jsonb)'::regprocedure)) is distinct from '6a8ddeacd9dc1087f75909bc98ac79e8' then
  raise exception 'Hint implementation changed; refresh the review before installing';
 end if;
end $guard$;
-- A receipt proves the stock was already below three at its server timestamp.
-- Matching refill_count excludes older cycles; the one-time QA grant is another
-- known boundary after which a historical witness must fall. Never use device dates.
with deadlines as (
 select i.user_id,case when i.balance=3 then null else
  coalesce(least(i.refill_at,p.first_seen+interval '120 minutes'),transaction_timestamp()+interval '120 minutes') end deadline
 from versus_private.adventure_hint_inventory i
 left join lateral (
  select min((r.response->>'serverNow')::timestamptz) first_seen
  from versus_private.adventure_hint_receipts r where r.user_id=i.user_id and r.action in ('open','use')
   and (r.response->>'balance')::integer between 0 and 2
   and (r.response->>'refillCount')::integer=i.refill_count
   and (r.response->>'balanceRevision')::bigint<=i.revision
   and (r.response->>'serverNow')::timestamptz>=greatest(i.created_at,coalesce(i.qa_bonus_granted_at,i.created_at))
   and (r.response->>'serverNow')::timestamptz<=transaction_timestamp()
 ) p on true
)
update versus_private.adventure_hint_inventory i set refill_at=d.deadline,revision=i.revision+1
from deadlines d where i.user_id=d.user_id and i.refill_at is distinct from d.deadline;

alter table versus_private.adventure_hint_inventory add constraint adventure_hint_free_capacity check(balance<=3);
alter table versus_private.adventure_hint_inventory add constraint adventure_hint_refill_cycle
 check((balance=3 and refill_at is null) or (balance<3 and refill_at is not null));

do $patch$ declare d text;old_ text;begin
 select pg_get_functiondef('versus_private.adventure_word_help(uuid,text,jsonb)'::regprocedure) into d;old_:=d;
 d:=replace(d,' if balance_=0 and refill_ is not null and now_>=refill_ then',
$start$ if balance_<3 and refill_ is null then
  refill_:=now_+interval '120 minutes';revision_:=revision_+1;
  update versus_private.adventure_hint_inventory set refill_at=refill_,revision=revision_ where user_id=u;
 end if;
 if balance_<3 and refill_ is not null and now_>=refill_ then$start$);
 d:=replace(d,'   if balance_=0 then refill_:=now_+interval ''2 hours'';end if;',
  '   if balance_<3 and refill_ is null then refill_:=now_+interval ''120 minutes'';end if;');
 -- A replay never repeats a debit, but its stock/timer must reflect the current
 -- inventory after any due refill, not the old stock cached in its receipt.
 d:=replace(d,'  return r.response;',
$replay$  return r.response||jsonb_build_object('balance',balance_,'refillAt',refill_,'refillCount',refills_,
    'balanceRevision',revision_,'serverNow',now_);$replay$);
 if d=old_ or position('if balance_=0' in d)>0 or position('return r.response;' in d)>0
  or position('if balance_<3 and refill_ is null then' in d)=0 then raise exception 'Hint patch did not match reviewed implementation';end if;
 execute d;
end $patch$;
notify pgrst,'reload schema';
commit;
