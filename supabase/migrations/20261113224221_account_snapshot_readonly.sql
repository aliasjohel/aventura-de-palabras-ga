-- Keep the STABLE account read endpoint free of writes. Entitlement mutations project access through their own triggers.
begin;
CREATE OR REPLACE FUNCTION player_state_private.account_snapshot()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare u uuid:=auth.uid();w jsonb;ch jsonb;bg jsonb;xp jsonb;tw jsonb;s jsonb;begin
 if u is null then raise exception 'Authentication required' using errcode='28000';end if;
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
notify pgrst,'reload schema';
commit;
