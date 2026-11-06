-- General Aventura hints: initial allocation once; refill three two hours after depletion.
begin;
create table versus_private.adventure_hint_inventory(
 user_id uuid primary key references auth.users(id) on delete cascade,
 balance integer not null default 3 check(balance>=0),created_at timestamptz not null default now(),
 enabled boolean not null default true,
 refill_at timestamptz,refill_count integer not null default 0 check(refill_count>=0),
 revision bigint not null default 0 check(revision>=0),
 qa_bonus_amount integer not null default 0,
 qa_bonus_granted_at timestamptz,
 check((qa_bonus_amount=0 and qa_bonus_granted_at is null) or (qa_bonus_amount=9 and qa_bonus_granted_at is not null))
);
create table versus_private.adventure_hint_words(
 user_id uuid not null references auth.users(id) on delete cascade,id uuid not null,
 world integer not null check(world between 0 and 4),mission integer not null check(mission between 0 and 9),
 phase integer not null check(phase between 0 and 20),language text not null check(language in ('es','en','pt-BR')),
 word_id integer not null,attempt_id uuid,stage integer not null default 0 check(stage between 0 and 3),
 letters text[] not null default '{}',local_only boolean not null default false,primary key(user_id,id)
);
create table versus_private.adventure_hint_receipts(
 user_id uuid not null references auth.users(id) on delete cascade,request_id uuid not null,
 action text not null,payload jsonb not null,response jsonb not null,primary key(user_id,request_id)
);
create unique index adventure_hint_qa_bonus_once on versus_private.adventure_hint_receipts(user_id)
 where action='qa_bonus_v1';
alter table versus_private.adventure_hint_inventory enable row level security;
alter table versus_private.adventure_hint_words enable row level security;
alter table versus_private.adventure_hint_receipts enable row level security;
revoke all on versus_private.adventure_hint_inventory,versus_private.adventure_hint_words,versus_private.adventure_hint_receipts from public,anon,authenticated,service_role;

create function versus_private.adventure_word_help(p_request uuid,p_action text,p_payload jsonb)
returns jsonb language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid();h versus_private.adventure_hint_words;w versus_private.adventure_validation_words;
 r versus_private.adventure_hint_receipts;s versus_private.adventure_validation_sessions;
 a versus_private.adventure_reward_attempts;balance_ integer;refill_ timestamptz;refills_ integer;revision_ bigint;now_ timestamptz;id_ uuid;new_ text[];known_ text[];level_ integer;result jsonb;
begin
 if u is null then raise exception 'Authentication required' using errcode='42501';end if;
 if p_request is null or p_action not in ('open','use','sync') or p_action is null or p_payload is null or jsonb_typeof(p_payload)<>'object' or pg_column_size(p_payload)>2048 then raise exception 'Invalid help request' using errcode='22023';end if;
 -- Provision the initial three exactly once, independently of wallet/character data.
 -- All debits and refills lock the same account row across devices.
 perform 1 from versus_private.game_wallets where user_id=u for update;
 insert into versus_private.adventure_hint_inventory(user_id) values(u) on conflict do nothing;
 select balance,refill_at,refill_count,revision into balance_,refill_,refills_,revision_
  from versus_private.adventure_hint_inventory where user_id=u and enabled for update;
 if not found then raise exception 'Hints unavailable for this account' using errcode='42501';end if;
 now_:=versus_private.adventure_server_now();
 if balance_=0 and refill_ is not null and now_>=refill_ then
  balance_:=3;refill_:=null;refills_:=refills_+1;revision_:=revision_+1;
  update versus_private.adventure_hint_inventory set balance=3,refill_at=null,refill_count=refills_,revision=revision_ where user_id=u;
 end if;
 id_:=(p_payload->>'id')::uuid;
 if id_ is null then raise exception 'Missing word session';end if;
 if p_action='sync' then
  if p_payload-'id'<>'{}'::jsonb then raise exception 'Unexpected sync fields';end if;
  return jsonb_build_object('userId',u,'id',id_,'balance',balance_,'refillAt',refill_,'refillCount',refills_,
   'balanceRevision',revision_,'serverNow',now_);
 end if;
 select * into r from versus_private.adventure_hint_receipts where user_id=u and request_id=p_request;
 if found then
  if r.action<>p_action or r.payload<>p_payload then raise exception 'Reused request' using errcode='22023';end if;
  return r.response;
 end if;
 id_:=(p_payload->>'id')::uuid;
 if id_ is null then raise exception 'Missing word session';end if;
 select * into h from versus_private.adventure_hint_words where user_id=u and id=id_ for update;
 if p_action='open' then
  if p_payload-array['id','world','mission','phase','language','wordId','attemptId']<>'{}'::jsonb then raise exception 'Unexpected fields';end if;
  if h.id is null then
   h.user_id:=u;h.id:=id_;h.world:=(p_payload->>'world')::integer;h.mission:=(p_payload->>'mission')::integer;
   h.phase:=(p_payload->>'phase')::integer;h.language:=p_payload->>'language';h.word_id:=(p_payload->>'wordId')::integer;
   h.attempt_id:=(p_payload->>'attemptId')::uuid;h.stage:=0;h.letters:='{}';h.local_only:=false;
   if h.attempt_id is not null then
    select * into a from versus_private.adventure_reward_attempts where id=h.attempt_id and user_id=u for no key update;
    select * into s from versus_private.adventure_validation_sessions where attempt_id=a.id for update;
    if a.id is null or s.attempt_id is null or s.phase<>h.phase or a.world<>h.world or a.mission<>h.mission or s.language<>h.language or
      (select phases->>s.phase from versus_private.adventure_validation_catalog where world=a.world and mission=a.mission)<>'word' then raise exception 'Invalid word phase';end if;
    h.word_id:=s.word_ids[s.phase+1];
    -- One help progression per authoritative word, even if the client invents new IDs.
    if exists(select 1 from versus_private.adventure_hint_words where user_id=u and attempt_id=h.attempt_id and phase=h.phase and word_id=h.word_id) then raise exception 'Word already registered';end if;
   end if;
   perform 1 from versus_private.adventure_validation_words where language=h.language and world=h.world and word_id=h.word_id;
   if not found then raise exception 'Unknown word';end if;
   insert into versus_private.adventure_hint_words values(h.*);
  elsif h.world is distinct from (p_payload->>'world')::integer or h.mission is distinct from (p_payload->>'mission')::integer or h.phase is distinct from (p_payload->>'phase')::integer or h.language is distinct from p_payload->>'language' or h.attempt_id is distinct from (p_payload->>'attemptId')::uuid then raise exception 'Word session changed';
  end if;
 else
  if h.id is null or p_payload-array['id','level','letters','errors','localOnly']<>'{}'::jsonb then raise exception 'Unknown help session';end if;
 end if;
 select * into strict w from versus_private.adventure_validation_words where language=h.language and world=h.world and word_id=h.word_id;
 if p_action='use' then
  level_:=(p_payload->>'level')::integer;
  if level_ is null or level_ not between 1 and 3 or level_>h.stage+1 then raise exception 'Invalid help level';end if;
  if jsonb_typeof(p_payload->'letters') is distinct from 'array' or jsonb_array_length(p_payload->'letters')>27 or (p_payload->>'errors')::integer not between 0 and 6 or p_payload->>'errors' is null then raise exception 'Invalid letters';end if;
  if exists(select 1 from jsonb_array_elements_text(p_payload->'letters') l where l !~ (case when h.language='es' then '^[A-ZÑ]$' else '^[A-Z]$' end) or l is null) then raise exception 'Invalid letter';end if;
  if p_payload ? 'localOnly' and jsonb_typeof(p_payload->'localOnly')<>'boolean' then raise exception 'Invalid local flag';end if;
  h.local_only:=h.local_only or coalesce((p_payload->>'localOnly')::boolean,false);
  update versus_private.adventure_hint_words set local_only=h.local_only where user_id=u and id=id_;
  known_:=array(select distinct l from jsonb_array_elements_text(p_payload->'letters') l);
  if h.attempt_id is not null and not h.local_only then
   select * into a from versus_private.adventure_reward_attempts where id=h.attempt_id and user_id=u for no key update;
   select * into s from versus_private.adventure_validation_sessions where attempt_id=a.id for update;
   if s.phase<>h.phase or s.word_ids[s.phase+1]<>h.word_id then raise exception 'Word phase changed';end if;
   if a.status='running' and a.interrupted_at is null and versus_private.adventure_server_now()<=a.expires_at and versus_private.adventure_server_now()<=s.last_action_at+interval '90 seconds' then
    if s.errors>=6 or s.phase_done then raise exception 'Inactive word';end if;
    known_:=s.letters;
   else
    -- Expired/interrupted reward attempts continue only as local story. Never
    -- revive the attempt, issue completion proof, or change reward eligibility.
    a.id:=null;
   end if;
  end if;
  known_:=array(select distinct unnest(known_||h.letters));
  new_:=array(select letter from (select substr(w.word_key,i,1) letter,min(i) pos from generate_series(1,length(w.word_key)) i group by 1) q where not(letter=any(known_)) order by pos limit case when level_=2 then 2 else 3 end);
  if level_=h.stage+1 and balance_>0 and (p_payload->>'errors')::integer<6 and cardinality(new_)>0 and (level_<>1 or length(trim(w.hint))>0) then
   if level_>1 then h.letters:=array(select distinct unnest(h.letters||new_));end if;
   h.stage:=level_;balance_:=balance_-1;revision_:=revision_+1;
   if balance_=0 then refill_:=now_+interval '2 hours';end if;
   update versus_private.adventure_hint_inventory set balance=balance_,refill_at=refill_,revision=revision_ where user_id=u;
   update versus_private.adventure_hint_words set stage=h.stage,letters=h.letters where user_id=u and id=id_;
   if h.attempt_id is not null and a.id is not null and level_>1 then
    s.letters:=array(select distinct unnest(s.letters||h.letters));
    s.phase_done:=not exists(select 1 from generate_series(1,length(w.word_key)) i where not(substr(w.word_key,i,1)=any(s.letters)));
    update versus_private.adventure_validation_sessions set letters=s.letters,phase_done=s.phase_done where attempt_id=a.id;
   end if;
  end if;
 end if;
 result:=jsonb_build_object('userId',u,'id',id_,'opened',true,'stage',h.stage,'balance',balance_,
  'refillAt',refill_,'refillCount',refills_,'balanceRevision',revision_,'serverNow',now_,
  'revealed',h.letters,'description',case when h.stage>0 then w.hint else null end);
 insert into versus_private.adventure_hint_receipts values(u,p_request,p_action,p_payload,result);
 return result;
end $$;
create function public.adventure_word_help(p_request uuid,p_action text,p_payload jsonb)
returns jsonb language sql security invoker set search_path='' as $$ select versus_private.adventure_word_help(p_request,p_action,p_payload) $$;
revoke all on function versus_private.adventure_word_help(uuid,text,jsonb),public.adventure_word_help(uuid,text,jsonb) from public,anon,authenticated,service_role;
grant execute on function versus_private.adventure_word_help(uuid,text,jsonb),public.adventure_word_help(uuid,text,jsonb) to authenticated;
notify pgrst, 'reload schema';
commit;
