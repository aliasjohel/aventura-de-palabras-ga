-- Server-only clock boundary. No browser can supply or change the authoritative clock.
create function versus_private.adventure_server_now() returns timestamptz language sql volatile set search_path='' as $$select clock_timestamp()$$;
revoke all on function versus_private.adventure_server_now() from public,anon,authenticated,service_role;

-- DRAFT: NOT APPLIED. Preserve balances/inventories; never infer proof from client imports.
-- Gate: a trusted gameplay verifier is required before enabling new Adventure rewards.
-- Default OFF until a real authoritative gameplay verifier has passed integration tests.
create table versus_private.adventure_reward_rollout(singleton boolean primary key default true check(singleton),enabled boolean not null default false);
insert into versus_private.adventure_reward_rollout values(true,false);
alter table versus_private.adventure_reward_rollout enable row level security;
revoke all on versus_private.adventure_reward_rollout from public,anon,authenticated,service_role;
create table versus_private.adventure_reward_attempts (
 id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,
 world integer not null check(world between 0 and 4),mission integer not null check(mission between 0 and 9),
 request_id uuid not null,started_at timestamptz not null default versus_private.adventure_server_now(),
 expires_at timestamptz not null default versus_private.adventure_server_now()+interval '2 hours',finish_requested_at timestamptz,interrupted_at timestamptz,
 status text not null default 'running' check(status in ('running','awaiting_verification','credited','already_claimed','retry_required')),
 unique(user_id,request_id),unique(id,user_id,world,mission)
);
create index adventure_reward_attempts_rate on versus_private.adventure_reward_attempts(user_id,started_at);
create index adventure_reward_attempts_owner on versus_private.adventure_reward_attempts(user_id,world,mission);
alter table versus_private.adventure_reward_attempts enable row level security;
revoke all on versus_private.adventure_reward_attempts from public,anon,authenticated,service_role;
grant select on versus_private.adventure_reward_attempts to service_role;
create table versus_private.verified_adventure_completions (
 attempt_id uuid primary key,user_id uuid not null,world integer not null,mission integer not null,
 evidence_id uuid not null unique,verifier_version text not null check(length(trim(verifier_version)) between 1 and 100),
 completed_at timestamptz not null,verified_at timestamptz not null default versus_private.adventure_server_now(),
 foreign key(attempt_id,user_id,world,mission) references versus_private.adventure_reward_attempts(id,user_id,world,mission) on delete cascade
);
create index verified_adventure_completions_owner on versus_private.verified_adventure_completions(user_id,world,mission);
alter table versus_private.verified_adventure_completions enable row level security;
revoke all on versus_private.verified_adventure_completions from public,anon,authenticated,service_role;
grant usage on schema versus_private to service_role;
grant select on versus_private.verified_adventure_completions to service_role;
create or replace function versus_private.sync_game_wallet(p_legacy jsonb,p_events jsonb,p_equipped jsonb,p_match_id uuid)
returns jsonb language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid(); w versus_private.game_wallets; skin text; char_key text; accepted jsonb:='{}';
begin
 if u is null then raise exception 'Iniciá sesión para guardar tus monedas.'; end if;
 if jsonb_typeof(coalesce(p_events,'[]'))<>'array' or jsonb_array_length(coalesce(p_events,'[]'))>100 then raise exception 'Lista de recompensas inválida.'; end if;
 insert into versus_private.game_wallets(user_id) values(u) on conflict do nothing;
 select * into w from versus_private.game_wallets where user_id=u for update;
 -- Historical imports and generic credits are permanently disabled, including direct calls.
 if p_legacy is not null or p_events is distinct from '[]'::jsonb then
  raise exception 'La importación histórica y los créditos genéricos están desactivados.' using errcode='22023';
 end if;
 w.legacy_done:=true;
 if not exists(select 1 from versus_private.game_admins where user_id=u and union_enabled) then
  w.owned:=array_remove(w.owned,'aren-union');
  if w.equipped->>'explorador'='aren-union' then w.equipped:=w.equipped-'explorador';w.revision:=w.revision+1;end if;
 end if;
 if p_equipped is not null then
  if jsonb_typeof(p_equipped) is distinct from 'object' then raise exception 'Trajes inválidos.' using errcode='22023'; end if;
  if (select count(*) from jsonb_object_keys(p_equipped))>12 or exists(select 1 from jsonb_each(p_equipped) where jsonb_typeof(value)<>'string') then raise exception 'Trajes inválidos.' using errcode='22023';end if;
  for char_key,skin in select key,value from jsonb_each_text(p_equipped) loop
   if skin=any(w.owned) and (char_key,skin) in (('explorador','aren-union'),('explorador','aren-bosque'),('mago','zafir-celestial'),('kairos','kairos-real'),('guardiana','guardiana-otono'),('guardian_alba','alba-lunar'),('t_shadow','shadow-carmesi'),('hombre_lobo','lobo-lunar'),('dragon','nimbus-aviador'),('dragon_hielo','nivor-boreal'),('azrak','azrak-eclipse'),('kalamo','kalamo-astral')) then
    accepted:=accepted||jsonb_build_object(char_key,skin);
   end if;
  end loop;
  if w.equipped<>accepted then w.equipped:=accepted;w.revision:=w.revision+1;end if;
 end if;
 update versus_private.game_wallets set coins=w.coins,owned=w.owned,equipped=w.equipped,legacy_done=w.legacy_done,revision=w.revision where user_id=u;
 return jsonb_build_object('currencyVersion',2,'securityVersion',3,'world5Complete',exists(select 1 from versus_private.verified_adventure_completions where user_id=u and world=4 and mission=9),'userId',u,'coins',w.coins,'owned',w.owned,'equipped',w.equipped,'revision',w.revision,'acknowledged','[]'::jsonb,
  'missionClaims',(select coalesce(jsonb_agg('aventura:'||world||':'||mission||':mision'),'[]'::jsonb) from versus_private.adventure_mission_claims where user_id=u),
  'admin',exists(select 1 from versus_private.game_admins where user_id=u),
  'adminUnion',exists(select 1 from versus_private.game_admins where user_id=u and union_enabled),
  'reward',(select jsonb_build_object('matchId',match_id,'amount',amount,'outcome',outcome) from versus_private.coin_rewards where user_id=u and match_id=p_match_id));
end $$;
create or replace function versus_private.purchase_game_costume(p_skin text)
returns jsonb language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid();w versus_private.game_wallets;cost integer;
begin
 if u is null then raise exception 'Iniciá sesión para comprar.';end if;
 cost:=case p_skin when 'aren-bosque' then 2000 when 'zafir-celestial' then 2500 when 'kairos-real' then 3000 when 'guardiana-otono' then 1500 when 'alba-lunar' then 2000 when 'shadow-carmesi' then 2500 when 'lobo-lunar' then 2000 when 'nimbus-aviador' then 1500 when 'nivor-boreal' then 2500 when 'azrak-eclipse' then 2500 when 'kalamo-astral' then 2000 else null end;
 if cost is null then raise exception 'Este traje no está disponible.';end if;
 select * into w from versus_private.game_wallets where user_id=u for update;
 if not found or not w.legacy_done then raise exception 'Sincronizá tus monedas antes de comprar.';end if;
 if not (p_skin=any(w.owned)) then
  if p_skin='azrak-eclipse' and not exists(select 1 from versus_private.verified_adventure_completions where user_id=u and world=4 and mission=9) then
   raise exception 'Completá el Mundo 5 para comprar este traje.' using errcode='42501';
  end if;
  if w.coins<cost then raise exception 'Te faltan % monedas.',cost-w.coins;end if;
  update versus_private.game_wallets set coins=coins-cost,owned=array_append(owned,p_skin),revision=revision+1 where user_id=u;
 end if;
 return versus_private.sync_game_wallet(null,'[]',null,null);
end $$;
create or replace function versus_private.profile_backgrounds(p_action text,p_background text,p_legacy_worlds integer)
returns jsonb language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid(); inv versus_private.profile_background_inventory;
 old_owned text[]; old_equipped text; cost integer; points bigint;
begin
 if u is null then raise exception 'Iniciá sesión para guardar tus fondos.'; end if;
 if p_action is null or p_action not in ('sync','purchase','equip') then raise exception 'Acción de fondo inválida.'; end if;
 if p_legacy_worlds is distinct from 0 then raise exception 'Progreso anterior inválido.'; end if;
 if p_action in ('purchase','equip') and (p_background is null or p_background not in ('bosque','desierto','zafir','cumbres','hielo','azrak')) then raise exception 'Fondo no disponible.'; end if;
 -- All callers take the existing wallet lock first, including costume purchases.
 perform versus_private.sync_game_wallet(null,'[]'::jsonb,null,null);
 insert into versus_private.profile_background_inventory(user_id) values(u) on conflict do nothing;
 select * into inv from versus_private.profile_background_inventory where user_id=u for update;
 old_owned:=inv.owned; old_equipped:=inv.equipped;
 -- No client-supplied progress is imported. Existing ownership is preserved.
 if exists(select 1 from versus_private.verified_adventure_completions where user_id=u and world=2 and mission=9) then
  if not ('cumbres'=any(inv.owned)) then inv.owned:=array_append(inv.owned,'cumbres'); end if;
 end if;
 if exists(select 1 from versus_private.verified_adventure_completions where user_id=u and world=3 and mission=9) then
  if not ('hielo'=any(inv.owned)) then inv.owned:=array_append(inv.owned,'hielo'); end if;
 end if;
 -- after_points preserves a genuinely reached rank even after a later loss.
 select greatest(coalesce(sum(r.points),0),coalesce(max(r.after_points),0)) into points
 from versus_private.ranked_results r where r.user_id=u;
 if points>=240 and not ('azrak'=any(inv.owned)) then inv.owned:=array_append(inv.owned,'azrak'); end if;
 if p_action='purchase' then
  cost:=case p_background when 'desierto' then 1000 when 'zafir' then 1500 else null end;
  if cost is null then raise exception 'Este fondo se consigue mediante un logro.'; end if;
  if not (p_background=any(inv.owned)) then
   update versus_private.game_wallets set coins=coins-cost,revision=revision+1 where user_id=u and coins>=cost;
   if not found then raise exception 'No tenés suficientes monedas para este fondo.'; end if;
   inv.owned:=array_append(inv.owned,p_background);
  end if;
 elsif p_action='equip' then
  if not (p_background=any(inv.owned)) then raise exception 'Primero conseguí este fondo.'; end if;
  inv.equipped:=p_background;
 end if;
 if inv.owned<>old_owned or inv.equipped<>old_equipped or not inv.legacy_done then inv.revision:=inv.revision+1; end if;
 update versus_private.profile_background_inventory set owned=inv.owned,equipped=inv.equipped,revision=inv.revision,legacy_done=true where user_id=u;
 return versus_private.sync_game_wallet(null,'[]'::jsonb,null,null) || jsonb_build_object('backgrounds',jsonb_build_object('userId',u,'owned',inv.owned,'equipped',inv.equipped,'revision',inv.revision));
end $$;


-- Both old public credit endpoints fail closed; private compatibility helper also rejects credits.
create or replace function public.sync_game_wallet(p_legacy jsonb default null,p_events jsonb default '[]',p_equipped jsonb default null,p_match_id uuid default null)
returns jsonb language plpgsql security invoker set search_path='' as $$begin raise exception 'Actualizá el juego para sincronizar tus monedas.';end$$;
create or replace function public.sync_game_wallet_v2(p_legacy jsonb default null,p_events jsonb default '[]',p_equipped jsonb default null,p_match_id uuid default null)
returns jsonb language plpgsql security invoker set search_path='' as $$begin raise exception 'Actualizá el juego para sincronizar tus monedas.';end$$;

revoke all on function public.sync_game_wallet(jsonb,jsonb,jsonb,uuid),public.sync_game_wallet_v2(jsonb,jsonb,jsonb,uuid) from public,anon,authenticated,service_role;

create function versus_private.sync_game_wallet_v3(p_missions jsonb,p_equipped jsonb,p_match_id uuid)
returns jsonb language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null then raise exception 'Iniciá sesión.' using errcode='42501';end if;
 if p_missions is distinct from '[]'::jsonb then raise exception 'Usá un intento online para solicitar recompensas.' using errcode='22023';end if;
 return versus_private.sync_game_wallet(null,'[]',p_equipped,p_match_id);
end $$;
create function public.sync_game_wallet_v3(p_missions jsonb default '[]',p_equipped jsonb default null,p_match_id uuid default null)
returns jsonb language sql security invoker set search_path='' as $$select versus_private.sync_game_wallet_v3(p_missions,p_equipped,p_match_id)$$;
revoke all on function versus_private.sync_game_wallet_v3(jsonb,jsonb,uuid) from public,anon,authenticated;
revoke all on function public.sync_game_wallet_v3(jsonb,jsonb,uuid) from public,anon,authenticated;
grant execute on function versus_private.sync_game_wallet_v3(jsonb,jsonb,uuid),public.sync_game_wallet_v3(jsonb,jsonb,uuid) to authenticated;

-- Reinforce the existing boundary; no browser may invoke the internal compatibility helper.
revoke all on function versus_private.sync_game_wallet(jsonb,jsonb,jsonb,uuid) from public,anon,authenticated;
revoke all on versus_private.game_wallets,versus_private.wallet_imports,versus_private.adventure_coin_events,versus_private.adventure_mission_claims,versus_private.coin_rewards,versus_private.character_inventory,versus_private.profile_background_inventory from public,anon,authenticated;

-- Only internal callers/verified completion trigger may settle; never exposed as a credit API.
create function versus_private.settle_adventure_reward(p_user uuid,p_attempt uuid)
returns void language plpgsql security definer set search_path='' as $$
declare a versus_private.adventure_reward_attempts; proof versus_private.verified_adventure_completions; n integer; reward integer;
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
  insert into versus_private.adventure_coin_events(user_id,event_id,amount,origin) values(p_user,gen_random_uuid(),reward,'aventura:'||a.world||':'||a.mission||':mision');
  update versus_private.game_wallets set coins=coins+reward,revision=revision+1 where user_id=p_user;
 end if;
 update versus_private.adventure_reward_attempts set status=case when n=1 then 'credited' else 'already_claimed' end where id=a.id;
end $$;
revoke all on function versus_private.settle_adventure_reward(uuid,uuid) from public,anon,authenticated,service_role;
create function versus_private.verified_adventure_reward_trigger() returns trigger
language plpgsql security definer set search_path='' as $$begin perform versus_private.settle_adventure_reward(new.user_id,new.attempt_id);return new;end$$;
revoke all on function versus_private.verified_adventure_reward_trigger() from public,anon,authenticated,service_role;
create trigger verified_adventure_reward after insert on versus_private.verified_adventure_completions
for each row execute function versus_private.verified_adventure_reward_trigger();

create function versus_private.adventure_reward_attempt(p_action text,p_world integer,p_mission integer,p_request uuid,p_attempt uuid)
returns jsonb language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid(); a versus_private.adventure_reward_attempts; snapshot jsonb;
begin
 if u is null then raise exception 'Iniciá sesión.' using errcode='42501';end if;
 if p_action is null or p_action not in ('begin','finish','status','interrupt') then raise exception 'Acción inválida.' using errcode='22023';end if;
 snapshot:=versus_private.sync_game_wallet(null,'[]',null,null);
 if p_action='begin' then
  if p_world is null or p_world not between 0 and 4 or p_mission is null or p_mission not between 0 and 9 or p_request is null then raise exception 'Misión inválida.' using errcode='22023';end if;
  if not coalesce((select enabled from versus_private.adventure_reward_rollout where singleton),false) then return snapshot||jsonb_build_object('attempt',jsonb_build_object('world',p_world,'mission',p_mission,'status','unavailable'));end if;
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
end $$;
create function public.adventure_reward_attempt(p_action text,p_world integer default null,p_mission integer default null,p_request uuid default null,p_attempt uuid default null)
returns jsonb language sql security invoker set search_path='' as $$select versus_private.adventure_reward_attempt(p_action,p_world,p_mission,p_request,p_attempt)$$;
revoke all on function versus_private.adventure_reward_attempt(text,integer,integer,uuid,uuid),public.adventure_reward_attempt(text,integer,integer,uuid,uuid) from public,anon,authenticated;
grant execute on function versus_private.adventure_reward_attempt(text,integer,integer,uuid,uuid),public.adventure_reward_attempt(text,integer,integer,uuid,uuid) to authenticated;
