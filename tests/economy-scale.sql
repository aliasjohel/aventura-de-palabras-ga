-- All users, rooms, matches and coin changes below are rolled back.
begin;
do $$
declare a uuid:=gen_random_uuid();b uuid:=gen_random_uuid();c uuid:=gen_random_uuid();r jsonb;e jsonb;w integer;m integer;mid uuid;rid uuid;outcome integer;expected integer;before_a bigint;before_b bigint;
begin
 insert into auth.users(id) values(a),(b),(c);
 insert into versus_private.game_wallets(user_id,coins,legacy_done) values(a,20000,true),(b,0,true);
 perform set_config('request.jwt.claim.sub',a::text,true);
 r:=public.game_characters('purchase','hombre_lobo');assert (r->>'coins')::int=18000,'wolf costs 2000';
 r:=public.game_characters('purchase','hombre_lobo');assert (r->>'coins')::int=18000,'wolf single charge';
 r:=public.game_characters('purchase','kairos');assert (r->>'coins')::int=15500,'Kairos costs 2500';
 r:=public.game_characters('purchase','kalamo');assert (r->>'coins')::int=12500,'Kalamo costs 3000';
 r:=public.game_characters('purchase','guardian_alba');assert (r->>'coins')::int=9500,'Lume costs 3000';
 r:=public.game_characters('purchase','t_shadow');assert (r->>'coins')::int=6000,'Shadow costs 3500';
 r:=public.purchase_game_costume('aren-bosque');assert (r->>'coins')::int=4000,'costume scaled';
 r:=public.profile_backgrounds('purchase','desierto',0);assert (r->>'coins')::int=3000,'desert scaled';
 r:=public.profile_backgrounds('purchase','zafir',0);assert (r->>'coins')::int=1500,'Zafir background scaled';
 perform set_config('request.jwt.claim.sub',b::text,true);
 for w in 0..4 loop for m in 0..9 loop
  e:=jsonb_build_array(jsonb_build_object('id',gen_random_uuid(),'amount',case when m=9 then 300 else 50 end,'origin','aventura:'||w||':'||m||':mision'));
  r:=public.sync_game_wallet_v2(null,e,null,null);
  -- A different event ID for the same mission must never pay again.
  e:=jsonb_set(e,'{0,id}',to_jsonb(gen_random_uuid()::text));
  r:=public.sync_game_wallet_v2(null,e,null,null);
 end loop;end loop;
 assert (r->>'coins')::int=3750,'campaign capped at 3750';
 assert jsonb_array_length(r->'missionClaims')=50,'all fifty claims';
 r:=public.profile_backgrounds('sync',null,0);assert (r#>'{backgrounds,owned}') ?& array['cumbres','hielo'],'new world rewards unlock backgrounds';
 perform set_config('request.jwt.claim.sub',c::text,true);
 r:=public.sync_game_wallet_v2(jsonb_build_object('deviceId',gen_random_uuid(),'coins',200,'missionClaims',jsonb_build_array('aventura:0:0:mision'),'owned','[]'::jsonb,'equipped','{}'::jsonb),'[]',null,null);
 assert (r->>'coins')::int=2000,'legacy import scales';
 r:=public.sync_game_wallet_v2(null,'[]',null,null);assert (r->>'coins')::int=2000,'repeat import not scaled again';
 e:=jsonb_build_array(jsonb_build_object('id',gen_random_uuid(),'amount',50,'origin','aventura:0:0:mision'));
 r:=public.sync_game_wallet_v2(null,e,null,null);assert (r->>'coins')::int=2000,'imported offline mission cannot repay';
 for outcome in 1..3 loop
  insert into public.versus_rooms(code,host_id) values(upper(substr(replace(gen_random_uuid()::text,'-',''),1,6)),a) returning id into rid;
  insert into public.versus_players(room_id,user_id,alias,slot) values(rid,a,'Economy QA A',1),(rid,b,'Economy QA B',2);
  insert into public.versus_matches(room_id,started_at,deadline_at) values(rid,now(),now()+interval '5 minutes') returning id into mid;
  insert into public.versus_match_players(match_id,user_id,score_letters) values(mid,a,1),(mid,b,1) on conflict(match_id,user_id) do update set score_letters=1;
  select coins into before_a from versus_private.game_wallets where user_id=a;
  select coins into before_b from versus_private.game_wallets where user_id=b;
  update public.versus_matches set status='finished',winner_id=case when outcome=2 then null else a end,last_event=jsonb_build_object('reason',case when outcome=3 then 'abandon' else 'rules' end) where id=mid;
  set constraints all immediate;
  if outcome=1 then
   assert (select coins from versus_private.game_wallets where user_id=a)=before_a+100,'win pays 100';
   assert (select coins from versus_private.game_wallets where user_id=b)=before_b+30,'loss pays 30';
  elsif outcome=2 then
   assert (select coins from versus_private.game_wallets where user_id=a)=before_a+50,'draw pays 50';
   assert (select coins from versus_private.game_wallets where user_id=b)=before_b+50,'both draw';
  else assert (select coins from versus_private.game_wallets where user_id=a)=before_a,'abandon pays nothing';end if;
 end loop;
end $$;
select 'PASS: all shop prices, no double charge, 50 missions capped at 3750, unique mission claims across event IDs, background achievements, one-time legacy import, real match win/draw/loss rewards and no abandonment reward' as result;
rollback;
