-- PREPARED ONLY. Installs an empty, disabled single-account pilot. No grants or payments.
do $pilot_preflight$ begin
 if coalesce((select enabled from versus_private.adventure_reward_rollout where singleton),false) then raise exception 'Pause global rewards before installing the account pilot';end if;
 if to_regprocedure('versus_private.adventure_reward_attempt_protocol(text,integer,integer,uuid,uuid)') is null or md5(pg_get_functiondef(to_regprocedure('versus_private.adventure_reward_attempt_protocol(text,integer,integer,uuid,uuid)'))) is distinct from '6c2cf6bec1de9bee6086db7293ef2d2a' then raise exception 'Pilot preflight function drift: versus_private.adventure_reward_attempt_protocol(text,integer,integer,uuid,uuid)';end if;
 if to_regprocedure('versus_private.adventure_game_action(uuid,uuid,integer,text,jsonb)') is null or md5(pg_get_functiondef(to_regprocedure('versus_private.adventure_game_action(uuid,uuid,integer,text,jsonb)'))) is distinct from 'e2d5602c76f4d3158237122b814e5ee7' then raise exception 'Pilot preflight function drift: versus_private.adventure_game_action(uuid,uuid,integer,text,jsonb)';end if;
 if to_regprocedure('versus_private.settle_adventure_reward(uuid,uuid)') is null or md5(pg_get_functiondef(to_regprocedure('versus_private.settle_adventure_reward(uuid,uuid)'))) is distinct from 'ce2c4b215f707875b00d67cca12fb258' then raise exception 'Pilot preflight function drift: versus_private.settle_adventure_reward(uuid,uuid)';end if;
end $pilot_preflight$;

create table versus_private.adventure_reward_pilot(
 singleton boolean primary key default true check(singleton),
 user_id uuid references auth.users(id) on delete cascade,
 enabled boolean not null default false,
 enabled_at timestamptz,expires_at timestamptz,
 check(not enabled or (user_id is not null and enabled_at is not null and expires_at is not null and expires_at>enabled_at and expires_at<=enabled_at+interval '24 hours'))
);
insert into versus_private.adventure_reward_pilot(singleton,enabled) values(true,false);
alter table versus_private.adventure_reward_pilot enable row level security;
revoke all on versus_private.adventure_reward_pilot from public,anon,authenticated,service_role;

create function versus_private.adventure_reward_allowed(p_user uuid) returns boolean
language plpgsql volatile security definer set search_path='' as $eligibility$
declare global_enabled boolean;pilot versus_private.adventure_reward_pilot;now_ timestamptz;
begin
 if p_user is null then return false;end if;
 -- Wallet/attempt locks are acquired by the existing callers first. A pause waits
 -- for accepted transactions; no administrative operation locks a player's wallet here.
 select enabled into global_enabled from versus_private.adventure_reward_rollout where singleton for share;
 if global_enabled is true then return true;end if;
 select * into pilot from versus_private.adventure_reward_pilot where singleton for share;
 now_:=versus_private.adventure_server_now();
 if not found or pilot.enabled is not true or pilot.user_id is distinct from p_user or pilot.enabled_at>now_ or pilot.expires_at is null or pilot.expires_at<=now_ then return false;end if;
 -- Never trust mutable JWT/user_metadata flags, names, codes or client clocks.
 return exists(select 1 from auth.users u where u.id=p_user and u.is_anonymous is false
  and u.email_confirmed_at is not null and nullif(u.email,'') is not null
  and coalesce(nullif(to_jsonb(u)->>'banned_until','')::timestamptz,'-infinity'::timestamptz)<=now_);
end $eligibility$;
revoke all on function versus_private.adventure_reward_allowed(uuid) from public,anon,authenticated,service_role;

CREATE OR REPLACE FUNCTION versus_private.adventure_reward_attempt_protocol(p_action text, p_world integer, p_mission integer, p_request uuid, p_attempt uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare u uuid:=auth.uid(); a versus_private.adventure_reward_attempts; snapshot jsonb;
begin
 if u is null then raise exception 'Iniciá sesión.' using errcode='42501';end if;
 if p_action is null or p_action not in ('begin','finish','status','interrupt') then raise exception 'Acción inválida.' using errcode='22023';end if;
 snapshot:=versus_private.sync_game_wallet(null,'[]',null,null);
 if p_action='begin' then
  if p_world is null or p_world not between 0 and 4 or p_mission is null or p_mission not between 0 and 9 or p_request is null then raise exception 'Misión inválida.' using errcode='22023';end if;
  if not versus_private.adventure_reward_allowed(u) then return snapshot||jsonb_build_object('attempt',jsonb_build_object('world',p_world,'mission',p_mission,'status','unavailable'));end if;
  select * into a from versus_private.adventure_reward_attempts where user_id=u and request_id=p_request for no key update;
  if found then
   if a.world<>p_world or a.mission<>p_mission then raise exception 'Solicitud reutilizada para otra misión.' using errcode='22023';end if;
  else
   if (select count(*) from versus_private.adventure_reward_attempts where user_id=u and started_at>versus_private.adventure_server_now()-interval '1 hour')>=120 then
    raise exception 'Demasiados intentos nuevos. Reintentá más tarde.' using errcode='54000';
   end if;
   -- Other devices may have their own attempts; the unique mission claim settles at most once.
   insert into versus_private.adventure_reward_attempts(user_id,world,mission,request_id) values(u,p_world,p_mission,p_request) returning * into a;
  end if;
 else
  select * into a from versus_private.adventure_reward_attempts where id=p_attempt and user_id=u for no key update;
  if not found then raise exception 'Intento no disponible.' using errcode='42501';end if;
  if p_action='interrupt' and a.status='running' then update versus_private.adventure_reward_attempts set status='retry_required',interrupted_at=versus_private.adventure_server_now() where id=a.id;
  elsif p_action='finish' and a.status='running' then
   update versus_private.adventure_reward_attempts set finish_requested_at=versus_private.adventure_server_now(),status=case when versus_private.adventure_server_now()>expires_at then 'retry_required' else 'awaiting_verification' end where id=a.id;
   perform versus_private.settle_adventure_reward(u,a.id);
  end if;
  select * into a from versus_private.adventure_reward_attempts where id=a.id;
 end if;
 return versus_private.sync_game_wallet(null,'[]',null,null)||jsonb_build_object('attempt',jsonb_build_object('id',a.id,'world',a.world,'mission',a.mission,'status',a.status,'expiresAt',a.expires_at));
end $function$
;
CREATE OR REPLACE FUNCTION versus_private.adventure_game_action(p_attempt uuid, p_request uuid, p_sequence integer, p_action text, p_payload jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare u uuid:=auth.uid();a versus_private.adventure_reward_attempts;s versus_private.adventure_validation_sessions;
 c versus_private.adventure_validation_catalog;receipt versus_private.adventure_validation_receipts;
 w versus_private.adventure_validation_words;chosen integer[];lang text;kind text;letter text;idx integer;empty_idx integer;
 prior_empty integer:=0;options integer[];step integer;tmp integer;accepted_at timestamptz;result jsonb;
begin
 if u is null then raise exception 'Iniciá sesión.' using errcode='42501';end if;
 if p_request is null or p_sequence is null or p_sequence<0 or p_sequence>32767 or p_action is null or
  p_action not in ('open','letter','next','restart_word','tile','mural_place','puzzle','reset_puzzle','heartbeat') or p_payload is null or jsonb_typeof(p_payload)<>'object' or pg_column_size(p_payload)>1024 then
  raise exception 'Acción inválida.' using errcode='22023';end if;
 -- Same order as settlement, purchases and attempt protocol. Serializes devices on one wallet.
 perform 1 from versus_private.game_wallets where user_id=u for update;
 select * into a from versus_private.adventure_reward_attempts where id=p_attempt and user_id=u for no key update;
 if not found then raise exception 'Intento no disponible.' using errcode='42501';end if;
 select * into c from versus_private.adventure_validation_catalog where world=a.world and mission=a.mission;
 if c.supported is distinct from true then raise exception 'Mecánica sin validar.' using errcode='55000';end if;
 select * into receipt from versus_private.adventure_validation_receipts where attempt_id=a.id and request_id=p_request;
 if found then
  if receipt.sequence<>p_sequence+1 or receipt.action<>p_action or receipt.payload<>p_payload then raise exception 'Solicitud reutilizada con otras acciones.' using errcode='22023';end if;
  return receipt.response; -- Read-only recovery, including after expiry or rollout pause.
 end if;
 if not versus_private.adventure_reward_allowed(u) then raise exception 'Recompensas deshabilitadas.' using errcode='55000';end if;
 accepted_at:=versus_private.adventure_server_now();
 if a.status<>'running' or accepted_at>a.expires_at or a.interrupted_at is not null then raise exception 'Repetí la misión online.' using errcode='55000';end if;
 select * into s from versus_private.adventure_validation_sessions where attempt_id=a.id for update;
 if p_action='open' and accepted_at>a.started_at+interval '90 seconds' then
  update versus_private.adventure_reward_attempts set status='retry_required',interrupted_at=accepted_at where id=a.id;
  return versus_private.sync_game_wallet(null,'[]',null,null)||jsonb_build_object('attempt',jsonb_build_object('id',a.id,'status','retry_required'));
 end if;
 if p_action='open' then
  if s.attempt_id is not null or p_sequence<>0 or p_payload-array['language','reducedMotion']<>'{}'::jsonb or (p_payload ? 'reducedMotion' and jsonb_typeof(p_payload->'reducedMotion')<>'boolean') then raise exception 'Inicio inválido.' using errcode='22023';end if;
  lang:=p_payload->>'language';
  if lang is null or lang not in ('es','en','pt-BR') then raise exception 'Idioma inválido.' using errcode='22023';end if;
  select array_agg(word_id) into chosen from (select word_id from versus_private.adventure_validation_words where language=lang and world=a.world order by gen_random_uuid() limit 4) q;
  if cardinality(chosen)<>4 then raise exception 'Banco incompleto.';end if;
  insert into versus_private.adventure_validation_sessions(attempt_id,language,word_ids,reduced_motion) values(a.id,lang,chosen,coalesce((p_payload->>'reducedMotion')::boolean,false)) returning * into s;
  if c.phases->>0 not in ('word','slide','mural') then s.detail:=versus_private.adventure_puzzle_start(c.phases->>0,s.language,accepted_at);end if;
 else
  if s.attempt_id is null or s.sequence<>p_sequence then raise exception 'Secuencia inválida.' using errcode='22023';end if;
  if accepted_at>s.last_action_at+interval '90 seconds' then
   -- Persist closure; raising here would roll it back. Queries/reconnect cannot resume it.
   update versus_private.adventure_reward_attempts set status='retry_required',interrupted_at=accepted_at where id=a.id;
   return versus_private.sync_game_wallet(null,'[]',null,null)||jsonb_build_object('attempt',jsonb_build_object('id',a.id,'status','retry_required'));
  end if;
  kind:=c.phases->>s.phase;
  if p_action='letter' then
   if kind<>'word' or s.phase_done or s.errors>=6 or p_payload-'letter'<>'{}'::jsonb then raise exception 'Letra fuera de fase.' using errcode='22023';end if;
   letter:=p_payload->>'letter';
   if letter is null or letter !~ (case when s.language='es' then '^[A-ZÑ]$' else '^[A-Z]$' end) or letter=any(s.letters) then raise exception 'Letra inválida o repetida.' using errcode='22023';end if;
   select * into strict w from versus_private.adventure_validation_words where language=s.language and world=a.world and word_id=s.word_ids[s.phase+1];
   s.letters:=array_append(s.letters,letter);
   if position(letter in w.word_key)=0 then s.errors:=s.errors+1;end if;
   s.phase_done:=not exists(select 1 from generate_series(1,length(w.word_key)) i where not (substr(w.word_key,i,1)=any(s.letters)));
  elsif p_action='next' then
   if not s.phase_done or s.phase>=jsonb_array_length(c.phases)-1 or p_payload<>'{}'::jsonb then raise exception 'Faltan objetivos.' using errcode='22023';end if;
   s.phase:=s.phase+1;s.phase_done:=false;s.errors:=0;s.letters:='{}';
   if c.phases->>s.phase='slide' then
    s.board:=versus_private.adventure_slide_board();
   elsif c.phases->>s.phase='mural' then
    s.board:=array_fill(-1,array[16]);
   elsif c.phases->>s.phase<>'word' then
    s.detail:=versus_private.adventure_puzzle_start(c.phases->>s.phase,s.language,accepted_at);
   end if;
  elsif p_action='restart_word' then
   if kind<>'word' or s.errors<>6 or p_payload<>'{}'::jsonb then raise exception 'Reintento inválido.' using errcode='22023';end if;
   select word_id into idx from versus_private.adventure_validation_words where language=s.language and world=a.world and not(word_id=any(s.word_ids)) order by gen_random_uuid() limit 1;
   s.word_ids[s.phase+1]:=idx;s.letters:='{}';s.errors:=0;s.phase_done:=false;
  elsif p_action='tile' then
   if kind<>'slide' or s.phase_done or p_payload-'index'<>'{}'::jsonb or jsonb_typeof(p_payload->'index') is distinct from 'number' or (p_payload->>'index') !~ '^[0-8]$' then raise exception 'Movimiento inválido.' using errcode='22023';end if;
   idx:=(p_payload->>'index')::integer+1;empty_idx:=array_position(s.board,-1);
   if abs((idx-1)/3-(empty_idx-1)/3)+abs((idx-1)%3-(empty_idx-1)%3)<>1 then raise exception 'Las piezas deben ser vecinas.' using errcode='22023';end if;
   s.board[empty_idx]:=s.board[idx];s.board[idx]:=-1;
   s.phase_done:=s.board=array[0,1,2,3,4,5,6,7,-1];
  elsif p_action='mural_place' then
   if kind<>'mural' or s.phase_done or p_payload-array['piece','slot']<>'{}'::jsonb or
    jsonb_typeof(p_payload->'piece') is distinct from 'number' or jsonb_typeof(p_payload->'slot') is distinct from 'number' or
    (p_payload->>'piece')!~ '^(1[0-5]|[0-9])$' or (p_payload->>'slot')!~ '^(-1|1[0-5]|[0-9])$' then raise exception 'Fragmento inválido.' using errcode='22023';end if;
   idx:=(p_payload->>'slot')::integer+1;tmp:=(p_payload->>'piece')::integer;
   empty_idx:=array_position(s.board,tmp);
   if idx=0 then
    if empty_idx is null then raise exception 'El fragmento no está colocado.' using errcode='22023';end if;
    s.board[empty_idx]:=-1;
   else
    if empty_idx=idx then raise exception 'El fragmento ya está aquí.' using errcode='22023';end if;
    if empty_idx is not null then s.board[empty_idx]:=s.board[idx];end if;
    s.board[idx]:=tmp;
   end if;
   s.phase_done:=s.board=array[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  elsif p_action='puzzle' then
   if s.phase_done then raise exception 'Objetivo ya completado.' using errcode='22023';end if;
   s.detail:=versus_private.adventure_puzzle_step(kind,s.language,s.detail,p_payload,accepted_at);
   s.phase_done:=coalesce((s.detail->>'done')::boolean,false);
  elsif p_action='reset_puzzle' then
   if p_payload<>'{}'::jsonb or kind='word' or kind like 'duel:%' then raise exception 'Reinicio inválido.' using errcode='22023';end if;
   if kind='slide' then s.board:=versus_private.adventure_slide_board();
   elsif kind='mural' then s.board:=array_fill(-1,array[16]);
   else s.detail:=versus_private.adventure_puzzle_start(kind,s.language,accepted_at);end if;
   s.phase_done:=false;
  elsif p_action='heartbeat' then
   if p_payload<>'{}'::jsonb then raise exception 'Latido inválido.' using errcode='22023';end if;
  end if;
 end if;
 if c.phases->>s.phase like 'duel:%' then s.detail:=s.detail||jsonb_build_object('reduced',s.reduced_motion);end if;
 s.complete:=s.phase_done and s.phase=jsonb_array_length(c.phases)-1;
 s.sequence:=s.sequence+1;
 update versus_private.adventure_validation_sessions set word_ids=s.word_ids,phase=s.phase,letters=s.letters,errors=s.errors,
  phase_done=s.phase_done,complete=s.complete,board=s.board,detail=s.detail,sequence=s.sequence,last_action_at=accepted_at where attempt_id=a.id;
 if s.complete then
  -- No client victory, score, board, amount or device timestamp is accepted as evidence.
  insert into versus_private.verified_adventure_completions(attempt_id,user_id,world,mission,evidence_id,verifier_version,completed_at)
   values(a.id,u,a.world,a.mission,gen_random_uuid(),'sql-actions-v1',accepted_at);
 end if;
 select * into a from versus_private.adventure_reward_attempts where id=a.id;
 result:=versus_private.sync_game_wallet(null,'[]',null,null)||jsonb_build_object('attempt',jsonb_build_object('id',a.id,'status',a.status),'game',versus_private.adventure_game_view(a.id));
 insert into versus_private.adventure_validation_receipts values(a.id,p_request,s.sequence,p_action,p_payload,result);
 return result;
end $function$
;
CREATE OR REPLACE FUNCTION versus_private.settle_adventure_reward(p_user uuid, p_attempt uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare a versus_private.adventure_reward_attempts; proof versus_private.verified_adventure_completions; n integer; reward integer; credited_event uuid;
begin
 perform 1 from versus_private.game_wallets where user_id=p_user for update;
 select * into a from versus_private.adventure_reward_attempts where id=p_attempt and user_id=p_user for no key update;
 if not found then return;end if;
 select * into proof from versus_private.verified_adventure_completions where attempt_id=a.id;
 if not found then return;end if;
 -- completed_at must come from the server-validated final action, never a device clock.
 if proof.completed_at<a.started_at or proof.completed_at>a.expires_at or proof.completed_at>versus_private.adventure_server_now() or
   (a.interrupted_at is not null and proof.completed_at>a.interrupted_at) then
   raise exception 'La autorización no corresponde a un final online válido.' using errcode='22023';
 end if;
 if a.status in ('credited','already_claimed') then return;end if;
 -- Revocation/expiry also blocks a new credit; previously committed receipts remain readable.
 if not versus_private.adventure_reward_allowed(p_user) then return;end if;

 if exists(select 1 from versus_private.adventure_mission_claims where user_id=p_user and world=a.world and mission=a.mission) then
  update versus_private.adventure_reward_attempts set status='already_claimed' where id=a.id;return;
 end if;
 insert into versus_private.adventure_mission_claims(user_id,world,mission) values(p_user,a.world,a.mission) on conflict do nothing;
 get diagnostics n=row_count;
 if n=1 then
  reward:=case when a.mission=9 then 300 else 50 end;
  insert into versus_private.adventure_coin_events(user_id,event_id,amount,origin) values(p_user,gen_random_uuid(),reward,'aventura:'||a.world||':'||a.mission||':mision') returning event_id into credited_event;
  insert into versus_private.adventure_reward_receipts(event_id,user_id,attempt_id,world,mission,amount) values(credited_event,p_user,a.id,a.world,a.mission,reward);
  update versus_private.game_wallets set coins=coins+reward,revision=revision+1 where user_id=p_user;
 end if;
 update versus_private.adventure_reward_attempts set status=case when n=1 then 'credited' else 'already_claimed' end where id=a.id;
end $function$
;
revoke all on function versus_private.adventure_reward_attempt_protocol(text,integer,integer,uuid,uuid),versus_private.adventure_game_action(uuid,uuid,integer,text,jsonb),versus_private.settle_adventure_reward(uuid,uuid) from public,anon,authenticated,service_role;
grant execute on function versus_private.adventure_game_action(uuid,uuid,integer,text,jsonb) to authenticated;
-- Existing public SECURITY INVOKER wrappers, unique claims, proofs and receipts are unchanged.
-- Target association, pilot enable and global enable require separate explicit authorization.
notify pgrst,'reload schema';
