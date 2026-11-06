-- BEGIN REVIEWED PREFLIGHT
-- Fail closed on function drift; this draft never enables rewards.
do $reviewed_preflight$
begin
 if coalesce((select enabled from versus_private.adventure_reward_rollout where singleton),false) then raise exception 'Pausá las recompensas antes de instalar esta revisión.';end if;
 if to_regprocedure('public.adventure_game_action(uuid,uuid,integer,text,jsonb)') is null or md5(pg_get_functiondef(to_regprocedure('public.adventure_game_action(uuid,uuid,integer,text,jsonb)'))) is distinct from '2121c39ace1d2070d70131e31368eec1' then raise exception 'La función public.adventure_game_action(uuid,uuid,integer,text,jsonb) cambió: detené la instalación y revisá el preflight.';end if;
 if to_regprocedure('public.adventure_reward_attempt(text,integer,integer,uuid,uuid)') is null or md5(pg_get_functiondef(to_regprocedure('public.adventure_reward_attempt(text,integer,integer,uuid,uuid)'))) is distinct from 'd4631582c9ddfa022cece8b91333c07f' then raise exception 'La función public.adventure_reward_attempt(text,integer,integer,uuid,uuid) cambió: detené la instalación y revisá el preflight.';end if;
 if to_regprocedure('versus_private.settle_adventure_reward(uuid,uuid)') is null or md5(pg_get_functiondef(to_regprocedure('versus_private.settle_adventure_reward(uuid,uuid)'))) is distinct from '21367ec14793d9aab67ebfbc902165f5' then raise exception 'La función versus_private.settle_adventure_reward(uuid,uuid) cambió: detené la instalación y revisá el preflight.';end if;
end $reviewed_preflight$;
-- END REVIEWED PREFLIGHT
-- DRAFT: NOT INSTALLED. Does not enable the rollout, import balances or backfill historical claims.
create table versus_private.adventure_reward_receipts (
 event_id uuid primary key,user_id uuid not null references auth.users(id) on delete cascade,
 attempt_id uuid not null unique references versus_private.verified_adventure_completions(attempt_id),
 world integer not null check(world between 0 and 4),mission integer not null check(mission between 0 and 9),
 amount integer not null check(amount=case when mission=9 then 300 else 50 end),credited_at timestamptz not null default versus_private.adventure_server_now(),
 unique(user_id,world,mission),
 foreign key(user_id,event_id) references versus_private.adventure_coin_events(user_id,event_id),
 foreign key(attempt_id,user_id,world,mission) references versus_private.adventure_reward_attempts(id,user_id,world,mission)
);
alter table versus_private.adventure_reward_receipts enable row level security;
revoke all on versus_private.adventure_reward_receipts from public,anon,authenticated,service_role;
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
revoke all on function versus_private.settle_adventure_reward(uuid,uuid) from public,anon,authenticated,service_role;
create function versus_private.adventure_reward_receipt(p_attempt uuid) returns jsonb
language plpgsql stable security definer set search_path='' as $$
declare u uuid:=auth.uid(); result jsonb;
begin
 if u is null then raise exception 'Iniciá sesión.' using errcode='42501';end if;
 select jsonb_build_object('confirmed',true,'id',r.event_id,'userId',r.user_id,'attemptId',r.attempt_id,'world',r.world,'mission',r.mission,'amount',r.amount,'creditedAt',r.credited_at)
 into result from versus_private.adventure_reward_receipts r where r.attempt_id=p_attempt and r.user_id=u;
 return result;
end $$;
revoke all on function versus_private.adventure_reward_receipt(uuid) from public,anon,authenticated,service_role;
grant execute on function versus_private.adventure_reward_receipt(uuid) to authenticated;
CREATE OR REPLACE FUNCTION public.adventure_reward_attempt(p_action text, p_world integer DEFAULT NULL::integer, p_mission integer DEFAULT NULL::integer, p_request uuid DEFAULT NULL::uuid, p_attempt uuid DEFAULT NULL::uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$ declare result jsonb;begin result:=versus_private.adventure_reward_attempt(p_action,p_world,p_mission,p_request,p_attempt); return result||jsonb_build_object('rewardReceipt',versus_private.adventure_reward_receipt(nullif(result->'attempt'->>'id','')::uuid));end;$function$;
CREATE OR REPLACE FUNCTION public.adventure_game_action(p_attempt uuid, p_request uuid, p_sequence integer, p_action text, p_payload jsonb DEFAULT '{}'::jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$ declare result jsonb;begin result:=versus_private.adventure_game_action(p_attempt,p_request,p_sequence,p_action,p_payload); return result||jsonb_build_object('rewardReceipt',versus_private.adventure_reward_receipt(nullif(result->'attempt'->>'id','')::uuid));end;$function$;
-- Rollout remains unchanged (production is OFF); explicit later authorization is required.
notify pgrst, 'reload schema';
