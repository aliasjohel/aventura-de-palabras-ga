-- CANDIDATE ONLY: prerequisites are installed Tower 20261031183634 and existing XP frame catalog.
begin;
set local lock_timeout='5s';
set local statement_timeout='60s';
do $prerequisites$ begin
if coalesce((select md5(btrim(replace(prosrc,E'\r\n',E'\n'),E' \t\n\r')) from pg_proc where oid=to_regprocedure('versus_private.get_versus_room_costumes(uuid)')),'')<>'2ee5d3abaaa2a13d75ef39e916a97232' then raise exception 'Tower prerequisite function changed: versus_private.get_versus_room_costumes(uuid)';end if;
if coalesce((select md5(btrim(replace(prosrc,E'\r\n',E'\n'),E' \t\n\r')) from pg_proc where oid=to_regprocedure('versus_private.public_player_profile(uuid,integer)')),'')<>'bedaec9fdc49bfb3d90bc5feaed1c73c' then raise exception 'Tower prerequisite function changed: versus_private.public_player_profile(uuid,integer)';end if;
if coalesce((select md5(btrim(replace(prosrc,E'\r\n',E'\n'),E' \t\n\r')) from pg_proc where oid=to_regprocedure('versus_private.tower_game(text,uuid,uuid,bigint,jsonb)')),'')<>'0e53d4cc3f832d8280a7fc91a80c834e' then raise exception 'Tower prerequisite function changed: versus_private.tower_game(text,uuid,uuid,bigint,jsonb)';end if;
if (select count(*) from versus_private.tower_definitions)<>110 then raise exception 'Tower requires its 110 reviewed definitions';end if;
end $prerequisites$;
-- Prepared candidate only. No global activation and no historical data rewrite.
create table versus_private.tower_cosmetic_catalog (
 item text primary key, kind text not null check(kind in ('costume','frame')),
 character_key text, completed_characters integer,
 check((kind='costume' and character_key is not null and completed_characters is null)
 or(kind='frame' and character_key is null and completed_characters in (1,6,11)))
);
insert into versus_private.tower_cosmetic_catalog(item,kind,character_key)
select 'tower_'||character_key,'costume',character_key from versus_private.tower_definitions group by character_key;
insert into versus_private.tower_cosmetic_catalog values
 ('tower_conquistador','frame',null,1),('tower_maestro','frame',null,6),('tower_leyenda','frame',null,11);
create table versus_private.tower_cosmetic_rollout(singleton boolean primary key default true check(singleton),grants_enabled boolean not null default false);
insert into versus_private.tower_cosmetic_rollout values(true,false);
create table versus_private.tower_cosmetic_grants (
 user_id uuid not null references auth.users(id) on delete cascade,
 item text not null references versus_private.tower_cosmetic_catalog(item),
 evidence jsonb not null, awarded_at timestamptz not null default clock_timestamp(),
 primary key(user_id,item)
);
create table versus_private.tower_equipment (
 user_id uuid primary key references auth.users(id) on delete cascade,
 costumes jsonb not null default '{}' check(jsonb_typeof(costumes)='object'),
 frame_key text references versus_private.tower_cosmetic_catalog(item),
 revision bigint not null default 0 check(revision between 0 and 9007199254740991)
);
create table versus_private.tower_cosmetic_actions (
 user_id uuid not null references auth.users(id) on delete cascade,request_id uuid not null,
 parameters jsonb not null,response jsonb not null,created_at timestamptz not null default clock_timestamp(),
 primary key(user_id,request_id)
);
do $secure$ declare t text;begin
 foreach t in array array['tower_cosmetic_catalog','tower_cosmetic_rollout','tower_cosmetic_grants','tower_equipment','tower_cosmetic_actions'] loop
 execute format('alter table versus_private.%I enable row level security',t);
 execute format('revoke all on versus_private.%I from public,anon,authenticated,service_role',t);
 end loop;
end $secure$;

create function versus_private.tower_completed_characters(p_user uuid)
returns table(character_key text) language sql stable security definer set search_path='' as $$
 select v.character_key from versus_private.tower_verified_floors v
 join versus_private.tower_attempts a on a.id=v.attempt_id and a.user_id=v.user_id
 join versus_private.tower_definitions d on d.key=a.definition and d.character_key=v.character_key and d.floor=v.floor
 where v.user_id=p_user and a.status='won' and a.state->>'winner'='player' and (a.state->>'finished')::boolean
 group by v.character_key having count(distinct v.floor)=10
$$;

create function versus_private.tower_grant_cosmetics(p_user uuid) returns void
language plpgsql security definer set search_path='' as $$
begin
 perform 1 from versus_private.tower_cosmetic_rollout where singleton for share;
 if not exists(select 1 from versus_private.tower_rollout r cross join versus_private.tower_cosmetic_rollout c
 where r.singleton and c.singleton and r.enabled and c.grants_enabled and (r.global_enabled or p_user=any(r.pilot_users))) then return;end if;
 -- Caller holds the same per-account advisory lock as Tower settlement.
 insert into versus_private.tower_cosmetic_grants(user_id,item,evidence)
 select p_user,c.item,jsonb_build_object('ruleVersion',1,'character',c.character_key,'attempts',
  (select jsonb_agg(jsonb_build_object('floor',v.floor,'attempt',v.attempt_id) order by v.floor)
   from versus_private.tower_verified_floors v where v.user_id=p_user and v.character_key=c.character_key))
 from versus_private.tower_cosmetic_catalog c join versus_private.tower_completed_characters(p_user) done using(character_key)
 where c.kind='costume' on conflict do nothing;
 insert into versus_private.tower_cosmetic_grants(user_id,item,evidence)
 select p_user,c.item,jsonb_build_object('ruleVersion',1,'characters',(select jsonb_agg(character_key order by character_key) from versus_private.tower_completed_characters(p_user)))
 from versus_private.tower_cosmetic_catalog c where c.kind='frame' and c.completed_characters <=
  (select count(*) from versus_private.tower_completed_characters(p_user)) on conflict do nothing;
end $$;

create function versus_private.tower_equipped_costumes(p_user uuid) returns jsonb
language sql stable security definer set search_path='' as $$
 select coalesce(jsonb_object_agg(e.key,e.value),'{}') from versus_private.tower_equipment q
 cross join lateral jsonb_each_text(q.costumes) e
 join versus_private.tower_cosmetic_catalog c on c.item=e.value and c.kind='costume' and c.character_key=e.key
 join versus_private.tower_cosmetic_grants g on g.user_id=q.user_id and g.item=c.item where q.user_id=p_user
 and not(e.key='explorador' and exists(select 1 from versus_private.game_wallets w join versus_private.aren_access a on a.user_id=w.user_id
  where w.user_id=p_user and a.union_enabled and w.equipped->>'explorador'='aren-union'))
$$;
create function versus_private.tower_cosmetic_view(p_user uuid) returns jsonb
language sql stable security definer set search_path='' as $$
 select jsonb_build_object('userId',p_user,'owned',(select coalesce(jsonb_agg(item order by item),'[]') from versus_private.tower_cosmetic_grants where user_id=p_user),
 'completedCharacters',(select coalesce(jsonb_agg(character_key order by character_key),'[]') from versus_private.tower_completed_characters(p_user)),
 'equipped',versus_private.tower_equipped_costumes(p_user),'selectedCostumes',coalesce((select costumes from versus_private.tower_equipment where user_id=p_user),'{}'),'frame',(select q.frame_key from versus_private.tower_equipment q join versus_private.tower_cosmetic_grants g on g.user_id=q.user_id and g.item=q.frame_key where q.user_id=p_user),
 'revision',coalesce((select revision from versus_private.tower_equipment where user_id=p_user),0),
 'grantsEnabled',exists(select 1 from versus_private.tower_rollout r cross join versus_private.tower_cosmetic_rollout c where r.enabled and c.grants_enabled and (r.global_enabled or p_user=any(r.pilot_users))))
$$;
create function versus_private.tower_public_appearance(p_user uuid) returns jsonb
language sql stable security definer set search_path='' as $$
 select coalesce((select jsonb_build_object('frame',q.frame_key) from versus_private.tower_equipment q
 join versus_private.tower_cosmetic_grants g on g.user_id=q.user_id and g.item=q.frame_key
 join versus_private.tower_cosmetic_catalog c on c.item=g.item and c.kind='frame'
 where q.user_id=p_user),'{}')
$$;

create function versus_private.tower_frame_guard() returns trigger
language plpgsql security definer set search_path='' as $$
declare selected_ text;
begin
 select q.frame_key into selected_ from versus_private.tower_equipment q join versus_private.tower_cosmetic_grants g on g.user_id=q.user_id and g.item=q.frame_key where q.user_id=new.user_id;
 if selected_ is not null then new.frame_key:=selected_;end if;
 if new.frame_key like 'tower\_%' escape '\' and (selected_ is distinct from new.frame_key or not exists(
  select 1 from versus_private.tower_cosmetic_grants g join versus_private.tower_cosmetic_catalog c using(item)
  where g.user_id=new.user_id and g.item=new.frame_key and c.kind='frame')) then
  raise exception 'Tower frame not owned' using errcode='42501';
 end if;
 return new;
end $$;
create trigger tower_frame_ownership before insert or update of frame_key on versus_private.player_appearance for each row execute function versus_private.tower_frame_guard();
create trigger tower_room_frame_ownership before insert or update of frame_key on public.versus_players for each row execute function versus_private.tower_frame_guard();

create function versus_private.tower_cosmetics(p_action text,p_item text,p_character text,p_request uuid,p_revision bigint)
returns jsonb language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid();q versus_private.tower_equipment;c versus_private.tower_cosmetic_catalog;
 prior versus_private.tower_cosmetic_actions;args_ jsonb;result_ jsonb;xp_result_ jsonb;
begin
 if u is null or not exists(select 1 from auth.users where id=u and not is_anonymous and (email_confirmed_at is not null or phone_confirmed_at is not null)) then raise exception 'Verified permanent account required' using errcode='42501';end if;
 if p_action is null or p_action not in ('status','sync','equip_costume','equip_frame','use_xp_frame') then raise exception 'Invalid Tower cosmetic action';end if;
 if p_action='status' then
  if p_item is not null or p_character is not null or p_request is not null or p_revision is not null then raise exception 'Invalid status parameters';end if;
  return versus_private.tower_cosmetic_view(u);
 end if;
 if p_request is null then raise exception 'Request ID required';end if;
 perform pg_advisory_xact_lock(hashtextextended('tower:'||u::text,0));
 args_:=jsonb_build_object('action',p_action,'item',p_item,'character',p_character,'revision',p_revision);
 select * into prior from versus_private.tower_cosmetic_actions where user_id=u and request_id=p_request;
 if found then if prior.parameters<>args_ then raise exception 'Request ID reused';end if;return prior.response;end if;
 if p_action='sync' then
  if p_item is not null or p_character is not null or p_revision is not null then raise exception 'Invalid sync parameters';end if;
  perform versus_private.tower_grant_cosmetics(u);
 else
  insert into versus_private.tower_equipment(user_id) values(u) on conflict do nothing;
  select * into strict q from versus_private.tower_equipment where user_id=u for update;
  if p_revision is null or p_revision<>q.revision then raise exception 'TOWER_EQUIPMENT_STALE' using errcode='40001';end if;
  if p_action='use_xp_frame' then
   if p_character is not null or p_item is null or p_item not like 'xp\_%' escape '\' then raise exception 'Invalid XP frame';end if;
   update versus_private.tower_equipment set frame_key=null,revision=revision+1 where user_id=u;
   -- Existing XP ownership/rules remain authoritative; failure rolls back clearing Tower.
   xp_result_:=versus_private.player_xp('equip',null,p_item,null);
  else
  if p_item is not null then
   select * into c from versus_private.tower_cosmetic_catalog where item=p_item;
   if not found or not exists(select 1 from versus_private.tower_cosmetic_grants where user_id=u and item=p_item) then raise exception 'Tower item not owned' using errcode='42501';end if;
  end if;
  if p_action='equip_costume' then
   if p_item='tower_explorador' and exists(select 1 from versus_private.game_wallets w join versus_private.aren_access access on access.user_id=w.user_id
    where w.user_id=u and access.union_enabled and w.equipped->>'explorador'='aren-union') then raise exception 'TOWER_UNION_ACTIVE' using errcode='42501';end if;
   if p_character is null or not exists(select 1 from versus_private.tower_cosmetic_catalog where kind='costume' and character_key=p_character)
    or(p_item is not null and (c.kind<>'costume' or c.character_key<>p_character)) then raise exception 'Wrong costume character';end if;
   update versus_private.tower_equipment set costumes=case when p_item is null then costumes-p_character else costumes||jsonb_build_object(p_character,p_item) end,revision=revision+1 where user_id=u;
  else
   if p_character is not null or(p_item is not null and c.kind<>'frame') then raise exception 'Invalid frame';end if;
   update versus_private.tower_equipment set frame_key=p_item,revision=revision+1 where user_id=u;
   insert into versus_private.player_appearance(user_id,avatar_key,frame_key) values(u,'explorador',coalesce(p_item,'clasico'))
   on conflict(user_id) do update set frame_key=excluded.frame_key,updated_at=now();
   update public.versus_players set frame_key=coalesce(p_item,'clasico') where user_id=u;
  end if;
  end if;
 end if;
 result_:=versus_private.tower_cosmetic_view(u);
 if xp_result_ is not null then result_:=result_||jsonb_build_object('xpResult',xp_result_);end if;
 if p_action<>'sync' then insert into versus_private.tower_cosmetic_actions(user_id,request_id,parameters,response) values(u,p_request,args_,result_);end if;
 return result_;
end $$;
create function public.tower_cosmetics(p_action text default 'status',p_item text default null,p_character text default null,p_request uuid default null,p_revision bigint default null)
returns jsonb language sql security invoker set search_path='' as $$select versus_private.tower_cosmetics(p_action,p_item,p_character,p_request,p_revision)$$;

-- Internal helpers have no client EXECUTE grant. Public API has no anonymous access.
revoke all on function versus_private.tower_completed_characters(uuid),versus_private.tower_grant_cosmetics(uuid),versus_private.tower_equipped_costumes(uuid),versus_private.tower_cosmetic_view(uuid),versus_private.tower_public_appearance(uuid),versus_private.tower_frame_guard() from public,anon,authenticated,service_role;
revoke all on function public.tower_cosmetics(text,text,text,uuid,bigint),versus_private.tower_cosmetics(text,text,text,uuid,bigint) from public,anon,authenticated,service_role;
grant execute on function public.tower_cosmetics(text,text,text,uuid,bigint),versus_private.tower_cosmetics(text,text,text,uuid,bigint) to authenticated;

alter table versus_private.player_appearance drop constraint player_appearance_frame_key_check;
alter table versus_private.player_appearance add constraint player_appearance_frame_key_check check(frame_key in ('clasico','bosque','hielo','fuego','arcano','real','bronce','plata','oro','platino','diamante','leyenda','xp_tinta','xp_constelacion','xp_codice','xp_infinito','tower_conquistador','tower_maestro','tower_leyenda'));
alter table public.versus_players drop constraint versus_players_frame_key_check;
alter table public.versus_players add constraint versus_players_frame_key_check check(frame_key in ('clasico','bosque','hielo','fuego','arcano','real','bronce','plata','oro','platino','diamante','leyenda','xp_tinta','xp_constelacion','xp_codice','xp_infinito','tower_conquistador','tower_maestro','tower_leyenda'));
create or replace function versus_identity_private.set_identity(p_room_id uuid,p_avatar_key text,p_frame_key text)
returns void language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null then raise exception 'Iniciá sesión para elegir tu avatar.';end if;
 if coalesce(p_avatar_key,'') not in ('explorador','mago','guardian-alba','t-shadow','kalamo','dragon','dragon-hielo','hombre-lobo','azrak')
 or coalesce(p_frame_key,'') not in ('clasico','bosque','hielo','fuego','arcano','real','bronce','plata','oro','platino','diamante','leyenda','xp_tinta','xp_constelacion','xp_codice','xp_infinito','tower_conquistador','tower_maestro','tower_leyenda') then raise exception 'Elegí un avatar y un marco del catálogo.';end if;
 update public.versus_players set avatar_key=p_avatar_key,frame_key=p_frame_key where room_id=p_room_id and user_id=auth.uid();
 if not found then raise exception 'No pertenecés a esta sala.';end if;
end $$;
CREATE OR REPLACE FUNCTION versus_private.tower_game(p_action text, p_attempt uuid, p_request uuid, p_sequence bigint, p_payload jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare u uuid:=auth.uid();now_ timestamptz:=versus_private.tower_server_now();c versus_private.tower_rollout;
 a versus_private.tower_attempts;d versus_private.tower_definitions;prior versus_private.tower_action_receipts;rec versus_private.tower_coin_receipts;
 response_ jsonb;state_ jsonb;allowed_ boolean;paid_ boolean:=false;definition_ text;theme_ text;bag_ text[];language_ text;reduced_ boolean;union_ boolean;
begin
 if u is null or not exists(select 1 from auth.users where id=u and not is_anonymous and (email_confirmed_at is not null or phone_confirmed_at is not null)) then raise exception 'Tower requires a verified permanent account' using errcode='42501';end if;
 if p_action is null or p_action not in ('status','begin','start','letter','ability','tick','resume','abandon','settle') or p_payload is null or jsonb_typeof(p_payload)<>'object' or octet_length(p_payload::text)>2048 then raise exception 'Invalid Tower action' using errcode='22023';end if;
 select * into strict c from versus_private.tower_rollout where singleton for share;
 allowed_:=c.enabled and (c.global_enabled or coalesce(u=any(c.pilot_users),false));
 if p_action='status' then
  if p_payload<>'{}'::jsonb or p_attempt is not null or p_request is not null or p_sequence is not null then raise exception 'Invalid Tower status parameters';end if;
  return jsonb_build_object('userId',u,'enabled',allowed_,'paymentsEnabled',allowed_ and c.payments_enabled,
   'progress',(select jsonb_agg(jsonb_build_object('character',ch.character_key,'completed',coalesce(p.completed,0),'eligible',versus_private.tower_character_allowed(u,ch.character_key)) order by ch.character_key) from (select distinct character_key from versus_private.tower_definitions) ch left join versus_private.tower_progress p on p.user_id=u and p.character_key=ch.character_key),
   'cleared',(select coalesce(jsonb_agg(jsonb_build_object('character',v.character_key,'floor',v.floor,'claimed',r.id is not null)),'[]') from versus_private.tower_verified_floors v left join versus_private.tower_coin_receipts r using(user_id,character_key,floor) where v.user_id=u),
   'pendingRewards',(select coalesce(jsonb_agg(id),'[]') from (select distinct on(t.definition) t.id from versus_private.tower_attempts t join versus_private.tower_definitions td on td.key=t.definition where t.user_id=u and t.status='won' and not exists(select 1 from versus_private.tower_coin_receipts r where r.user_id=u and r.character_key=td.character_key and r.floor=td.floor) order by t.definition,t.created_at desc limit 110) q),
   'activeAttempt',(select jsonb_build_object('id',t.id,'character',td.character_key,'floor',td.floor,'language',t.language) from versus_private.tower_attempts t join versus_private.tower_definitions td on td.key=t.definition where t.user_id=u and t.status in ('prepared','playing')));
 end if;
 if p_request is null then raise exception 'Tower request ID required' using errcode='22023';end if;
 -- The per-user lock serializes begin/recovery/settlement without involving other modes.
 perform pg_advisory_xact_lock(hashtextextended('tower:'||u::text,0));
 if p_action='begin' then
  if not allowed_ then raise exception 'Tower validation disabled' using errcode='42501';end if;
  if p_attempt is not null or p_sequence is not null or p_payload-array['character','floor','language','reducedMotion']<>'{}'::jsonb
    or jsonb_typeof(p_payload->'character') is distinct from 'string' or jsonb_typeof(p_payload->'floor') is distinct from 'number'
    or (p_payload->>'floor')!~ '^(10|[1-9])$' or coalesce(p_payload->>'language','') not in ('es','en','pt-BR')
    or (p_payload?'reducedMotion' and jsonb_typeof(p_payload->'reducedMotion')<>'boolean') then raise exception 'Invalid Tower start parameters' using errcode='22023';end if;
  definition_:=(p_payload->>'character')||':'||(p_payload->>'floor');language_:=p_payload->>'language';reduced_:=coalesce((p_payload->>'reducedMotion')::boolean,false);
  select * into a from versus_private.tower_attempts where user_id=u and request_id=p_request;
  if found then
   if a.definition<>definition_ or a.language<>language_ or (a.state->>'reduced')::boolean<>reduced_ then raise exception 'Tower request ID reused with different content';end if;
   return jsonb_build_object('userId',u,'attempt',versus_private.tower_attempt_view(a,now_));
  end if;
  select * into d from versus_private.tower_definitions where key=definition_;
  if not found or not versus_private.tower_character_allowed(u,d.character_key) then raise exception 'Tower character not owned or verified' using errcode='42501';end if;
  if d.floor>coalesce((select completed+1 from versus_private.tower_progress where user_id=u and character_key=d.character_key),1) then raise exception 'TOWER_FLOOR_LOCKED' using errcode='42501';end if;
  if exists(select 1 from versus_private.tower_attempts where user_id=u and status in ('prepared','playing')) then raise exception 'Recover the existing Tower attempt before starting another';end if;
  -- Browser history is not imported. Replays are allowed only within server-unlocked floors.
  insert into versus_private.tower_category_rotation(user_id,character_key) values(u,d.character_key) on conflict do nothing;
  select remaining into bag_ from versus_private.tower_category_rotation where user_id=u and character_key=d.character_key for update;
  if cardinality(bag_)=0 then select array_agg(theme order by random()) into bag_ from versus_private.tower_pools where definition=d.key and language=language_;end if;
  theme_:=bag_[1];update versus_private.tower_category_rotation set remaining=coalesce(bag_[2:cardinality(bag_)],'{}') where user_id=u and character_key=d.character_key;
  select exists(select 1 from versus_private.aren_access acc join versus_private.game_wallets w on w.user_id=acc.user_id where acc.user_id=u and acc.union_enabled and w.equipped->>'explorador'='aren-union') into union_;
  state_:=jsonb_build_object('config',d.config||jsonb_build_object('playerUnion',union_ and d.character_key='explorador'),'language',language_,'reduced',reduced_,'started',false,'finished',false,'winner','','done',false,'player',versus_private.tower_duel_actor(d.key,language_),'npc',versus_private.tower_duel_actor(d.key,language_,theme_),'pending','[]'::jsonb,'events','[]'::jsonb,'event_seq',0);
  insert into versus_private.tower_attempts(user_id,request_id,definition,language,state,created_at,updated_at) values(u,p_request,d.key,language_,state_,now_,now_) returning * into a;
  return jsonb_build_object('userId',u,'attempt',versus_private.tower_attempt_view(a,now_));
 end if;
 if p_attempt is null or (p_action not in ('letter') and p_payload<>'{}'::jsonb) then raise exception 'Invalid Tower attempt parameters';end if;
 if p_action='letter' and (p_payload-array['letter','word']<>'{}'::jsonb or jsonb_typeof(p_payload->'letter') is distinct from 'string' or jsonb_typeof(p_payload->'word') is distinct from 'number' or coalesce(p_payload->>'word','')!~ '^[0-9]$' or length(p_payload->>'letter')<>1) then raise exception 'Invalid Tower letter payload';end if;
 select * into a from versus_private.tower_attempts where id=p_attempt and user_id=u;
 if not found then raise exception 'Tower attempt unavailable' using errcode='42501';end if;
 if p_action='settle' then
  if a.status<>'won' or a.state->>'winner'<>'player' or not(a.state->>'finished')::boolean then raise exception 'Tower victory not verified' using errcode='42501';end if;
  -- Match existing wallet lock order. No lock held by a normal action waits on a wallet.
  if allowed_ and c.payments_enabled then
   insert into versus_private.game_wallets(user_id) values(u) on conflict do nothing;
   perform 1 from versus_private.game_wallets where user_id=u for update;
  end if;
  select * into a from versus_private.tower_attempts where id=p_attempt and user_id=u for update;
  select * into strict d from versus_private.tower_definitions where key=a.definition;
  insert into versus_private.tower_verified_floors(user_id,character_key,floor,attempt_id) values(u,d.character_key,d.floor,a.id) on conflict do nothing;
  if allowed_ and c.payments_enabled then
   insert into versus_private.tower_coin_receipts(user_id,character_key,floor,attempt_id,amount) values(u,d.character_key,d.floor,a.id,case when d.floor<=4 then 30 when d.floor<=9 then 50 else 150 end) on conflict do nothing returning * into rec;
   if found then
    paid_:=true;update versus_private.game_wallets set coins=coins+rec.amount,revision=revision+1 where user_id=u;
   else select * into rec from versus_private.tower_coin_receipts where user_id=u and character_key=d.character_key and floor=d.floor;end if;
  end if;
  perform versus_private.tower_grant_cosmetics(u);
  return jsonb_build_object('userId',u,'attempt',versus_private.tower_attempt_view(a,now_),'towerCosmetics',versus_private.tower_cosmetic_view(u),'newlyCredited',paid_,'pending',rec.id is null,'receipt',case when rec.id is null then null else jsonb_build_object('id',rec.id,'userId',u,'attemptId',rec.attempt_id,'character',rec.character_key,'floor',rec.floor,'amount',rec.amount,'confirmed',true) end,'wallet',(select jsonb_build_object('coins',coins,'revision',revision) from versus_private.game_wallets where user_id=u));
 end if;
 if not allowed_ and p_action not in ('resume','abandon') then raise exception 'Tower validation disabled' using errcode='42501';end if;
 select * into a from versus_private.tower_attempts where id=p_attempt and user_id=u for update;
 select * into prior from versus_private.tower_action_receipts where attempt_id=a.id and request_id=p_request;
 if found then
  if prior.action<>p_action or prior.payload<>p_payload or prior.expected_sequence is distinct from p_sequence then raise exception 'Tower action ID reused with different content';end if;
  return prior.response;
 end if;
 if a.sequence>=4096 or (select count(*) from versus_private.tower_action_receipts where attempt_id=a.id)>=4096 then raise exception 'Tower action limit exceeded';end if;
 if p_action<>'resume' and (p_sequence is null or p_sequence<0 or p_sequence<>a.sequence) then return jsonb_build_object('userId',u,'stale',true,'attempt',versus_private.tower_attempt_view(a,now_));end if;
 now_:=greatest(now_,a.updated_at);
 if a.status in ('prepared','playing') then
  if a.status='prepared' and now_>a.created_at+interval '15 minutes' then state_:=a.state||jsonb_build_object('finished',true,'winner','expired','finished_at',now_);else state_:=versus_private.tower_duel_input(a.state,p_action,p_payload,now_);end if;
  update versus_private.tower_attempts set state=state_,sequence=sequence+1,updated_at=now_,status=case when (state_->>'finished')::boolean then case state_->>'winner' when 'player' then 'won' when 'npc' then 'lost' when 'abandoned' then 'abandoned' when 'expired' then 'expired' else 'draw' end when (state_->>'started')::boolean then 'playing' else 'prepared' end where id=a.id returning * into a;
  if a.status='won' then
   select * into strict d from versus_private.tower_definitions where key=a.definition;
   insert into versus_private.tower_progress(user_id,character_key,completed,updated_at) values(u,d.character_key,d.floor,now_)
    on conflict(user_id,character_key) do update set completed=greatest(tower_progress.completed,excluded.completed),updated_at=excluded.updated_at;
  end if;
 end if;
 response_:=jsonb_build_object('userId',u,'attempt',versus_private.tower_attempt_view(a,now_));
 insert into versus_private.tower_action_receipts(attempt_id,request_id,action,expected_sequence,payload,response) values(a.id,p_request,p_action,p_sequence,p_payload,response_);
 return response_;
end $function$;

CREATE OR REPLACE FUNCTION versus_private.get_versus_room_costumes(p_room_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare u uuid:=auth.uid(); result jsonb;
begin
 if u is null or not public.is_versus_room_member(p_room_id) then raise exception 'No perteneces a esta sala.';end if;
 select coalesce(jsonb_object_agg(p.user_id,(coalesce(w.equipped,'{}') || versus_private.tower_equipped_costumes(p.user_id)) -
  case when coalesce((coalesce(w.equipped,'{}')||versus_private.tower_equipped_costumes(p.user_id))->>'explorador','')='aren-union'
   and not exists(select 1 from versus_private.aren_access a where a.user_id=p.user_id and a.union_enabled)
   then 'explorador' else '' end),'{}') into result
 from public.versus_players p left join versus_private.game_wallets w on w.user_id=p.user_id
 where p.room_id=p_room_id;
 return result;
end $function$;

CREATE OR REPLACE FUNCTION versus_private.public_player_profile(p_user_id uuid DEFAULT NULL::uuid, p_offset integer DEFAULT 0)
 RETURNS jsonb
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
 select versus_private.public_player_profile_before_xp(p_user_id,p_offset)||jsonb_build_object('xp',versus_private.xp_view(coalesce(p_user_id,auth.uid()),false))||versus_private.tower_public_appearance(coalesce(p_user_id,auth.uid()))
$function$;

notify pgrst,'reload schema';
commit;
