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
