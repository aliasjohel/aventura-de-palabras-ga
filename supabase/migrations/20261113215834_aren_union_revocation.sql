begin;
-- Canonical authorization. Compatibility flags never grant access by themselves.
create or replace function versus_private.has_aren_union_access(p_user uuid)
returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from versus_private.aren_entitlements e
 where e.user_id=p_user and e.product='aren-union' and e.enabled and e.revoked_at is null
 and (e.expires_at is null or e.expires_at>now())
 and (e.source in ('developer_trial','legacy_trial') or
 (e.source='google_play_purchase' and exists(select 1 from versus_private.aren_play_receipts r
 where r.user_id=e.user_id and r.state='verified' and e.external_reference='play:'||r.token_hash))))
$$;
revoke all on function versus_private.has_aren_union_access(uuid) from public,anon,authenticated;
create or replace view versus_private.aren_access as
select user_id,versus_private.has_aren_union_access(user_id) as union_enabled
from versus_private.aren_entitlements group by user_id;

create or replace function versus_private.refresh_aren_union_access(p_user uuid)
returns void language plpgsql security definer set search_path='' as $$
declare allowed_ boolean; trial_ boolean;
begin
 perform pg_advisory_xact_lock(hashtextextended('account-v3:'||p_user::text,0));
 allowed_:=versus_private.has_aren_union_access(p_user);
 select exists(select 1 from versus_private.aren_entitlements where user_id=p_user and product='aren-union'
 and source in ('developer_trial','legacy_trial') and enabled and revoked_at is null
 and (expires_at is null or expires_at>now())) into trial_;
 update versus_private.game_admins set union_enabled=trial_ where user_id=p_user and union_enabled is distinct from trial_;
 update versus_private.game_wallets set
 owned=case when allowed_ then array_append(owned,'aren-union') else array_remove(owned,'aren-union') end,
 equipped=case when not allowed_ and equipped->>'explorador'='aren-union' then equipped-'explorador' else equipped end,
 revision=revision+1
 where user_id=p_user and (allowed_<>('aren-union'=any(owned)) or (not allowed_ and equipped->>'explorador'='aren-union'));
end $$;
revoke all on function versus_private.refresh_aren_union_access(uuid) from public,anon,authenticated;

create or replace function versus_private.aren_union_access_changed()
returns trigger language plpgsql security definer set search_path='' as $$
declare uid_ uuid:=case when TG_OP='DELETE' then old.user_id else new.user_id end;
begin
 perform versus_private.refresh_aren_union_access(uid_);
 insert into player_state_private.account_versions(user_id,revision) values(uid_,1)
 on conflict(user_id) do update set revision=player_state_private.account_versions.revision+1;
 if TG_OP='UPDATE' and old.user_id is distinct from new.user_id then
  perform versus_private.refresh_aren_union_access(old.user_id);
  insert into player_state_private.account_versions(user_id,revision) values(old.user_id,1)
  on conflict(user_id) do update set revision=player_state_private.account_versions.revision+1;
 end if;
 return null;
end $$;
revoke all on function versus_private.aren_union_access_changed() from public,anon,authenticated;
create trigger aren_union_entitlement_changed after insert or update or delete on versus_private.aren_entitlements
for each row execute function versus_private.aren_union_access_changed();
create trigger aren_union_receipt_changed after insert or update or delete on versus_private.aren_play_receipts
for each row execute function versus_private.aren_union_access_changed();

create or replace function versus_private.set_aren_trial_access(p_enabled boolean)
returns jsonb language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid();
begin
 if u is null or p_enabled is null then raise exception 'Permiso de prueba requerido.' using errcode='42501';end if;
 perform pg_advisory_xact_lock(hashtextextended('account-v3:'||u::text,0));
 if not exists(select 1 from versus_private.aren_entitlements where user_id=u and product='aren-union'
 and source in ('developer_trial','legacy_trial') and revoked_at is null and (expires_at is null or expires_at>now())) then
  raise exception 'Permiso de prueba requerido.' using errcode='42501';end if;
 if exists(select 1 from public.versus_matches m join public.versus_match_players p on p.match_id=m.id
 where p.user_id=u and m.status='playing' and m.deadline_at>now()) then
  raise exception 'Terminá el duelo antes de cambiar el acceso a Aren Unión.';end if;
 update versus_private.aren_entitlements set enabled=p_enabled where user_id=u and product='aren-union'
 and source in ('developer_trial','legacy_trial') and revoked_at is null and (expires_at is null or expires_at>now());
 perform versus_private.refresh_aren_union_access(u);
 if p_enabled then update versus_private.game_wallets set equipped=equipped||jsonb_build_object('explorador','aren-union'),revision=revision+1 where user_id=u;end if;
 return versus_private.sync_game_wallet(null,'[]',null,null);
end $$;
revoke all on function versus_private.set_aren_trial_access(boolean) from public,anon;
grant execute on function versus_private.set_aren_trial_access(boolean) to authenticated;

CREATE OR REPLACE FUNCTION versus_private.activate_versus_ability(p_room_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare u uuid:=auth.uid(); result jsonb; m uuid;
begin
 if u is null or not public.is_versus_room_member(p_room_id) then raise exception 'No perteneces a esta sala.';end if;
 result:=versus_private.activate_versus_ability_without_union(p_room_id);
 if result->'lastEvent'->>'type'='ability_used' and result->'lastEvent'->>'actorId'=u::text
  and result->'lastEvent'->>'character'='explorador'
  and exists(select 1 from versus_private.aren_access a join versus_private.game_wallets w on w.user_id=a.user_id
   where a.user_id=u and versus_private.has_aren_union_access(a.user_id) and 'aren-union'=any(w.owned) and w.equipped->>'explorador'='aren-union') then
  select id into m from public.versus_matches where room_id=p_room_id;
  update public.versus_match_players set active_effect='roots',effect_expires_at=greatest(coalesce(effect_expires_at,now()),now()+interval '2 seconds'),updated_at=now()
   where match_id=m and user_id<>u and not finished;
  update public.versus_matches set last_event=last_event||jsonb_build_object('costume','aren-union','effect','union_discharge','milliseconds',2000),updated_at=now() where id=m;
  result:=public.get_versus_match_state(p_room_id);
 end if;
 return result;
end $function$
;

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
   and not exists(select 1 from versus_private.aren_access a where a.user_id=p.user_id and versus_private.has_aren_union_access(a.user_id))
   then 'explorador' else '' end),'{}') into result
 from public.versus_players p left join versus_private.game_wallets w on w.user_id=p.user_id
 where p.room_id=p_room_id;
 return result;
end $function$
;

CREATE OR REPLACE FUNCTION versus_private.adventure_duel_ability(p_state jsonb, p_actor text, p_now timestamp with time zone)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare s jsonb:=p_state;a jsonb:=s->p_actor;effect_ text;delay_ integer;hint_ text;word_ text;union_ boolean:=false;e jsonb;
begin
 if (s->>'finished')::boolean or (a->>'finished')::boolean or (a->>'charge')::integer<8 then return s;end if;
 if p_actor='player' then effect_:='hint';delay_:=(s->'config'->>'playerWindup')::integer;
  word_:=versus_private.adventure_duel_word(s,p_actor);
  select letter into hint_ from (select substr(word_,i,1) letter from generate_series(1,length(word_)) i group by substr(word_,i,1)) q where not(a->'letters' @> jsonb_build_array(letter)) order by random() limit 1;
  select exists(select 1 from versus_private.aren_access adm join versus_private.game_wallets w on w.user_id=adm.user_id where adm.user_id=auth.uid() and versus_private.has_aren_union_access(adm.user_id) and w.equipped->>'explorador'='aren-union') into union_;
 else effect_:=s->'config'->'ability'->>'efecto';delay_:=(s->'config'->>'windup')::integer;
 end if;
 if coalesce((s->>'reduced')::boolean,false) then delay_:=80;end if;
 e:=jsonb_build_object('actor',p_actor,'kind',effect_,'impact_at',p_now+make_interval(secs=>delay_::numeric/1000),'hint',coalesce(hint_,''),'union',union_);
 a:=jsonb_set(a,'{charge}','0');s:=jsonb_set(s,array[p_actor],a);s:=jsonb_set(s,'{pending}',s->'pending'||jsonb_build_array(e));
 return versus_private.adventure_duel_event(s,jsonb_build_object('type','ability','actor',p_actor,'effect',effect_,'windup',delay_));
end $function$
;

CREATE OR REPLACE FUNCTION versus_private.play_versus_letter_before_xp(p_room_id uuid, p_letter text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare u uuid:=auth.uid();m public.versus_matches;me public.versus_match_players;result jsonb;delta integer;
begin
 if u is null or not public.is_versus_room_member(p_room_id) then raise exception 'No perteneces a esta sala.';end if;
 select * into m from public.versus_matches where room_id=p_room_id for update;
 if not found then raise exception 'La partida todavía no fue creada.';end if;
 select * into me from public.versus_match_players where match_id=m.id and user_id=u;
 if m.status='playing' and me.effect_expires_at>now()
  and me.active_effect in ('roots','black_hole','key_bounce','ice_screen','key_theft') then
  return public.get_versus_match_state(p_room_id);
 end if;
 if p_letter is null or public.versus_letter_key(p_letter) !~ (case (select word_language from public.versus_rooms where id=p_room_id) when 'es' then '^[A-ZÑ]$' else '^[A-Z]$' end) then raise exception 'Letra inválida para el idioma de la partida.';end if;
 result:=versus_private.play_versus_letter_without_union(p_room_id,p_letter);
 delta:=coalesce((result->'me'->>'scoreLetters')::integer,me.score_letters)-me.score_letters;
 if delta>0 and exists(select 1 from versus_private.aren_access a join versus_private.game_wallets w on w.user_id=a.user_id
   join public.versus_players p on p.user_id=a.user_id and p.room_id=p_room_id and p.character_key='explorador'
   where a.user_id=u and versus_private.has_aren_union_access(a.user_id) and 'aren-union'=any(w.owned) and w.equipped->>'explorador'='aren-union') then
  update public.versus_match_players set ability_charge=least(8,ability_charge+delta) where match_id=m.id and user_id=u;
  result:=public.get_versus_match_state(p_room_id);
 end if;
 return result;
end $function$
;

CREATE OR REPLACE FUNCTION versus_private.tower_equipped_costumes(p_user uuid)
 RETURNS jsonb
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
 select coalesce(jsonb_object_agg(e.key,e.value),'{}') from versus_private.tower_equipment q
 cross join lateral jsonb_each_text(q.costumes) e
 join versus_private.tower_cosmetic_catalog c on c.item=e.value and c.kind='costume' and c.character_key=e.key
 join versus_private.tower_cosmetic_grants g on g.user_id=q.user_id and g.item=c.item where q.user_id=p_user
 and not(e.key='explorador' and exists(select 1 from versus_private.game_wallets w join versus_private.aren_access a on a.user_id=w.user_id
  where w.user_id=p_user and versus_private.has_aren_union_access(a.user_id) and w.equipped->>'explorador'='aren-union'))
$function$
;

CREATE OR REPLACE FUNCTION player_state_private.v420_account_sync_game_wallet(p_legacy jsonb, p_events jsonb, p_equipped jsonb, p_match_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
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
 if exists(select 1 from versus_private.aren_access where user_id=u and versus_private.has_aren_union_access(user_id)) then
      if not ('aren-union'=any(w.owned)) then w.owned:=array_append(w.owned,'aren-union');w.revision:=w.revision+1;end if;
     else
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
  'admin',false,'arenTrial',exists(select 1 from versus_private.aren_entitlements where user_id=u and source in ('developer_trial','legacy_trial') and revoked_at is null and (expires_at is null or expires_at>now())),
  'adminUnion',exists(select 1 from versus_private.aren_access where user_id=u and versus_private.has_aren_union_access(user_id)),
  'reward',(select jsonb_build_object('matchId',match_id,'amount',amount,'outcome',outcome) from versus_private.coin_rewards where user_id=u and match_id=p_match_id));
end $function$
;

CREATE OR REPLACE FUNCTION player_state_private.v420_account_tower_cosmetics(p_action text, p_item text, p_character text, p_request uuid, p_revision bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
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
   xp_result_:=player_state_private.v420_account_player_xp('equip',null,p_item,null);
  else
  if p_item is not null then
   select * into c from versus_private.tower_cosmetic_catalog where item=p_item;
   if not found or not exists(select 1 from versus_private.tower_cosmetic_grants where user_id=u and item=p_item) then raise exception 'Tower item not owned' using errcode='42501';end if;
  end if;
  if p_action='equip_costume' then
   if p_item='tower_explorador' and exists(select 1 from versus_private.game_wallets w join versus_private.aren_access access on access.user_id=w.user_id
    where w.user_id=u and versus_private.has_aren_union_access(access.user_id) and w.equipped->>'explorador'='aren-union') then raise exception 'TOWER_UNION_ACTIVE' using errcode='42501';end if;
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
end $function$
;

CREATE OR REPLACE FUNCTION player_state_private.account_snapshot()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare u uuid:=auth.uid();w jsonb;ch jsonb;bg jsonb;xp jsonb;tw jsonb;s jsonb;begin
 if u is null then raise exception 'Authentication required' using errcode='28000';end if;
 perform versus_private.refresh_aren_union_access(u);
 s:=player_state_private.adventure_snapshot();
 select jsonb_build_object('userId',u,'securityVersion',3,'currencyVersion',2,'coins',coins,'owned',owned,'equipped',equipped,'revision',revision,'missionClaims',(select coalesce(jsonb_agg('aventura:'||world||':'||mission||':mision'),'[]') from versus_private.adventure_mission_claims where user_id=u),'world5Complete',exists(select 1 from player_state_private.adventure_facts where user_id=u and world=4 and mission=9),'adminUnion',exists(select 1 from versus_private.aren_access where user_id=u and versus_private.has_aren_union_access(user_id)),'arenTrial',exists(select 1 from versus_private.aren_entitlements where user_id=u and source in ('developer_trial','legacy_trial') and revoked_at is null and (expires_at is null or expires_at>now()))) into w from versus_private.game_wallets where user_id=u;
 ch:=jsonb_build_object('userId',u,'owned',s#>'{characters,owned}','unlocked',(select coalesce(jsonb_agg(character),'[]') from unnest(array['explorador','guardiana','mago','dragon','dragon_hielo','azrak','hombre_lobo','kairos','kalamo','guardian_alba','t_shadow']) character where versus_private.tower_character_allowed(u,character)),'revision',coalesce((select revision from versus_private.character_inventory where user_id=u),0));
 select jsonb_build_object('userId',u,'owned',owned,'equipped',equipped,'revision',revision) into bg from versus_private.profile_background_inventory where user_id=u;
 xp:=versus_private.xp_view(u,true);tw:=versus_private.tower_cosmetic_view(u);
 return jsonb_build_object('schemaVersion',3,'contentVersion','adventure-v1','userId',u,'revision',coalesce((select revision from player_state_private.account_versions where user_id=u),0),'enabled',player_state_private.account_enabled(u),'adventureState',s,'wallet',w,'characters',ch,'backgrounds',bg,'xp',xp,'towerCosmetics',tw,
 'appearance',coalesce(s->'appearance','{"avatar":"explorador","frame":"clasico"}'::jsonb),
 'frames',jsonb_build_array('clasico')||coalesce((select jsonb_agg(item order by item) from player_state_private.account_frame_rights where user_id=u),'[]')||coalesce((select jsonb_agg(item order by item) from versus_private.xp_cosmetics where user_id=u and kind='frame'),'[]')||coalesce((select jsonb_agg(g.item order by g.item) from versus_private.tower_cosmetic_grants g join versus_private.tower_cosmetic_catalog c using(item) where g.user_id=u and c.kind='frame'),'[]'),
 'preferences',coalesce((select settings from player_state_private.account_preferences where user_id=u),'{}'),
 'profile',versus_private.player_profile_before_xp(),
 'tower',jsonb_build_object('progress',s#>'{tower,progress}','enabled',coalesce((select enabled and (global_enabled or u=any(pilot_users)) from versus_private.tower_rollout where singleton),false),'paymentsEnabled',coalesce((select enabled and payments_enabled and (global_enabled or u=any(pilot_users)) from versus_private.tower_rollout where singleton),false),
 'activeAttempt',(select jsonb_build_object('id',a.id,'character',d.character_key,'floor',d.floor,'language',a.language,'sequence',a.sequence) from versus_private.tower_attempts a join versus_private.tower_definitions d on d.key=a.definition where a.user_id=u and a.status in ('prepared','playing')),
 'pendingRewards',coalesce((select jsonb_agg(q.id) from (select distinct on(a.definition) a.id from versus_private.tower_attempts a join versus_private.tower_definitions d on d.key=a.definition where a.user_id=u and a.status='won' and not exists(select 1 from versus_private.tower_coin_receipts r where r.user_id=u and r.character_key=d.character_key and r.floor=d.floor) order by a.definition,a.created_at desc limit 110) q),'[]'),
 'receipts',coalesce((select jsonb_agg(jsonb_build_object('id',id,'character',character_key,'floor',floor,'amount',amount) order by character_key,floor) from versus_private.tower_coin_receipts where user_id=u),'[]')));
end $function$
;

CREATE OR REPLACE FUNCTION player_state_private.v420_tower_game(p_action text, p_attempt uuid, p_request uuid, p_sequence bigint, p_payload jsonb)
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
  select exists(select 1 from versus_private.aren_access acc join versus_private.game_wallets w on w.user_id=acc.user_id where acc.user_id=u and versus_private.has_aren_union_access(acc.user_id) and w.equipped->>'explorador'='aren-union') into union_;
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
  if a.status='prepared' and now_>a.created_at+interval '15 minutes' then state_:=a.state||jsonb_build_object('finished',true,'winner','expired','finished_at',now_);else state_:=versus_private.tower_duel_input(case when a.status='prepared' and not versus_private.has_aren_union_access(u) then jsonb_set(a.state,'{config,playerUnion}','false'::jsonb) else a.state end,p_action,p_payload,now_);end if;
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
end $function$
;

CREATE OR REPLACE FUNCTION public.aren_play_commit(p_user uuid, p_token_hash text, p_proof jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare prior versus_private.aren_play_receipts;item jsonb;active_token text;other_access boolean;w versus_private.game_wallets;
begin
 if coalesce(auth.jwt()->>'role','')<>'service_role' then raise exception 'Backend verification required' using errcode='42501';end if;
 if p_user is null or p_token_hash is null or p_token_hash!~'^[a-f0-9]{64}$' or p_proof is null or jsonb_typeof(p_proof)<>'object' or octet_length(p_proof::text)>16384 then raise exception 'Invalid proof' using errcode='22023';end if;
 if not exists(select 1 from auth.users where id=p_user and not coalesce(is_anonymous,true) and email_confirmed_at is not null) then raise exception 'Verified account required' using errcode='42501';end if;
 perform pg_advisory_xact_lock(hashtextextended('account-v3:'||p_user::text,0));
 perform pg_advisory_xact_lock(hashtextextended('aren-play:'||p_token_hash,0));
 select * into prior from versus_private.aren_play_receipts where token_hash=p_token_hash for update;
 if found and prior.user_id<>p_user then raise exception 'Purchase belongs to another game account' using errcode='42501';end if;
 if p_proof#>>'{purchaseStateContext,purchaseState}'='PURCHASED' and coalesce(p_proof#>>'{productLineItem,0,productOfferDetails,refundableQuantity}','1')<>'0' then
  if prior.state='revoked' then raise exception 'Purchase revoked' using errcode='42501';end if;
  if not exists(select 1 from versus_private.aren_play_settings s join versus_private.aren_play_testers t on t.user_id=p_user where s.singleton and s.test_checkout_enabled and t.enabled) then raise exception 'Test checkout disabled' using errcode='42501';end if;
  if p_proof#>>'{testPurchaseContext,fopType}' is distinct from 'TEST' or p_proof->>'acknowledgementState' is distinct from 'ACKNOWLEDGEMENT_STATE_ACKNOWLEDGED'
   or p_proof->>'obfuscatedExternalAccountId' is distinct from encode(sha256(convert_to('gagames.play.v1:com.gagames.aventura.experimental:'||p_user::text,'UTF8')),'hex')
   or jsonb_array_length(coalesce(p_proof->'productLineItem','[]'))<>1 then raise exception 'Unverified test purchase' using errcode='42501';end if;
  item:=p_proof->'productLineItem'->0;
  if item->>'productId' is distinct from 'aren_union_permanent' or item#>>'{productOfferDetails,quantity}' is distinct from '1'
   or item#>>'{productOfferDetails,refundableQuantity}' is distinct from '1' or item#>>'{productOfferDetails,consumptionState}' is distinct from 'CONSUMPTION_STATE_YET_TO_BE_CONSUMED'
   or item#>'{productOfferDetails,rentOfferDetails}' is not null or item#>'{productOfferDetails,preorderOfferDetails}' is not null then raise exception 'Wrong permanent product' using errcode='42501';end if;
  if prior.state='verified' then return versus_private.aren_play_status(p_user);end if;
  insert into versus_private.aren_play_receipts(token_hash,user_id,package_name,product_id,state,proof)
   values(p_token_hash,p_user,'com.gagames.aventura.experimental','aren_union_permanent','verified',p_proof);
 elsif p_proof#>>'{purchaseStateContext,purchaseState}'='CANCELLED' or p_proof#>>'{productLineItem,0,productOfferDetails,refundableQuantity}'='0' then
  if prior.token_hash is null then raise exception 'Unknown purchase' using errcode='42501';end if;
  update versus_private.aren_play_receipts set state='revoked',revoked_at=coalesce(revoked_at,now()),verified_at=now(),proof=p_proof where token_hash=p_token_hash;
 else raise exception 'Purchase not completed' using errcode='42501';end if;
 select token_hash into active_token from versus_private.aren_play_receipts where user_id=p_user and state='verified' order by verified_at desc limit 1;
 if active_token is not null then
  insert into versus_private.aren_entitlements(user_id,product,source,scope,enabled,authorized_by,external_reference)
   values(p_user,'aren-union','google_play_purchase','character.aren_five_crystals.purchase',true,'google-play-test-verifier','play:'||active_token)
   on conflict(user_id,product,source) do update set enabled=true,revoked_at=null,expires_at=null,external_reference=excluded.external_reference;
  insert into versus_private.game_wallets(user_id,coins,owned,equipped,legacy_done,revision) values(p_user,0,array['aren-union'],'{}',true,1) on conflict(user_id) do nothing;
  update versus_private.game_wallets set owned=array_append(owned,'aren-union'),revision=revision+1 where user_id=p_user and not('aren-union'=any(owned));
 else
  update versus_private.aren_entitlements set enabled=false,revoked_at=coalesce(revoked_at,now()) where user_id=p_user and product='aren-union' and source='google_play_purchase';
  select exists(select 1 from versus_private.aren_entitlements where user_id=p_user and product='aren-union' and source<>'google_play_purchase' and enabled and revoked_at is null and (expires_at is null or expires_at>now()))
   or false into other_access;
  if not other_access then
   update versus_private.game_wallets set owned=array_remove(owned,'aren-union'),equipped=case when equipped->>'explorador'='aren-union' then equipped-'explorador' else equipped end,revision=revision+1
    where user_id=p_user and ('aren-union'=any(owned) or equipped->>'explorador'='aren-union');
  end if;
 end if;
 perform versus_private.refresh_aren_union_access(p_user);
 return versus_private.aren_play_status(p_user);
end $function$
;

-- Retire only the audited inherited test permission; preserve developer and purchase sources.
do $$ begin
 perform pg_advisory_xact_lock(hashtextextended('account-v3:18425265-68af-459d-8b2d-15def95b6e24',0));
 update versus_private.aren_entitlements set enabled=false,revoked_at=coalesce(revoked_at,now())
 where user_id='18425265-68af-459d-8b2d-15def95b6e24' and product='aren-union' and source='legacy_trial';
 perform versus_private.refresh_aren_union_access('18425265-68af-459d-8b2d-15def95b6e24');
end $$;
notify pgrst,'reload schema';
commit;
