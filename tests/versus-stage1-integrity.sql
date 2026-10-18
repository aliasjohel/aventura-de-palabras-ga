-- Safe to run against the linked database: all fixtures are rolled back.
begin;
-- Regression: the actual Kairos ability expires a leading opponent's clock.
do $$
declare a uuid:=gen_random_uuid();b uuid:=gen_random_uuid();r public.versus_rooms;m uuid;j jsonb;
begin
 insert into auth.users(id) values(a),(b);
 perform set_config('request.jwt.claim.sub',a::text,true);
 set local role authenticated;
 r:=public.create_versus_room_localized('QA Kairos','pt-BR');
 perform set_config('request.jwt.claim.sub',b::text,true);
 perform public.join_versus_room_localized(r.code,'QA Rival');
 perform public.set_versus_character(r.id,'explorador',true);
 perform set_config('request.jwt.claim.sub',a::text,true);
 perform public.set_versus_character(r.id,'kairos',true);
 perform public.set_versus_challenge(r.id,'animales',array['LEÃO','CACHORRO','PÁSSARO','ONÇA','GATO']);
 perform set_config('request.jwt.claim.sub',b::text,true);
 perform public.set_versus_challenge(r.id,'animales',array['LEÃO','CACHORRO','PÁSSARO','ONÇA','GATO']);
 reset role;
 select id into m from public.versus_matches where room_id=r.id;
 insert into versus_private.ranked_rooms(room_id) values(r.id);
 update public.versus_matches set started_at=now()-interval '220 seconds',deadline_at=now()+interval '20 seconds' where id=m;
 update public.versus_match_players set ability_charge=8,score_letters=8,guessed_letters=array['A'],lives=1 where match_id=m and user_id=a;
 update public.versus_match_players set completed_words=3,score_letters=20,lives=5 where match_id=m and user_id=b;
 perform set_config('request.jwt.claim.sub',a::text,true);
 set local role authenticated;
 j:=public.activate_versus_ability(r.id);
 reset role;
 assert (select winner_id=a and status='finished' from public.versus_matches where id=m),'Kairos final winner';
 assert (select win from versus_private.player_history where match_id=m and user_id=a),'Kairos history must use final winner';
 assert (select win and points=3 from versus_private.ranked_results where match_id=m and user_id=a),'Kairos ranked winner';
 set constraints all immediate;
 assert (select outcome='win' and amount=20 from versus_private.coin_rewards where match_id=m and user_id=a),'Kairos reward';
end $$;
-- All identities/rooms/results are synthetic and ALWAYS rolled back by runner.
do $$
declare
 a uuid:=gen_random_uuid(); b uuid:=gen_random_uuid(); outsider uuid:=gen_random_uuid();
 r public.versus_rooms; m uuid; l text; v_ranked boolean; scenario text; words text[];
 expected uuid; state jsonb; snapshot jsonb; seq bigint; results_before bigint;
begin
 insert into auth.users(id) values(a),(b),(outsider);
 foreach l in array array['es','en','pt-BR'] loop
 foreach v_ranked in array array[false,true] loop
 foreach scenario in array array['single','both-winner','both-draw','rules'] loop
  perform set_config('request.jwt.claim.sub',a::text,true);
  set local role authenticated;
  r:=public.create_versus_room_localized('QA Stage Uno',l);
  perform set_config('request.jwt.claim.sub',b::text,true);
  perform public.join_versus_room_localized(r.code,'QA Stage Dos');
  perform public.set_versus_character(r.id,'explorador',true);
  perform set_config('request.jwt.claim.sub',a::text,true);
  perform public.set_versus_character(r.id,'kairos',true);
  words:=case l when 'en' then array['CAT','DOG','GOOSE','OTTER','TIGER'] when 'pt-BR' then array['LEÃO','CACHORRO','PÁSSARO','ONÇA','GATO'] else array['GATO','PERRO','LORO','TIGRE','OSO'] end;
  perform public.set_versus_challenge(r.id,'animales',words);
  -- Legitimate preparation cancellation remains available and repeatable.
  perform public.cancel_versus_challenge(r.id);
  perform public.cancel_versus_challenge(r.id);
  reset role;
  assert not exists(select 1 from public.versus_challenges where room_id=r.id and owner_id=a),'own challenge canceled';
  assert (select not preparation_ready and theme_key is null from public.versus_players where room_id=r.id and user_id=a);
  set local role authenticated;
  perform public.set_versus_challenge(r.id,'animales',words);
  perform set_config('request.jwt.claim.sub',b::text,true);
  perform public.set_versus_challenge(r.id,'animales',words);
  reset role;
  select id into m from public.versus_matches where room_id=r.id;
  assert m is not null;
  if v_ranked then insert into versus_private.ranked_rooms(room_id) values(r.id); end if;
  snapshot:=jsonb_build_object('room',(select to_jsonb(x) from public.versus_rooms x where id=r.id),'match',(select to_jsonb(x) from public.versus_matches x where id=m),'challenges',(select jsonb_agg(to_jsonb(x) order by owner_id) from public.versus_challenges x where room_id=r.id),'players',(select jsonb_agg(to_jsonb(x) order by user_id) from public.versus_players x where room_id=r.id));
  -- Reject both participants, outsider and unauthenticated identity.
  foreach expected in array array[a,b,outsider,null::uuid] loop
   perform set_config('request.jwt.claim.sub',coalesce(expected::text,''),true);
   set local role authenticated;
   begin
    perform public.cancel_versus_challenge(r.id);
    raise exception using errcode='23514',message='Unsafe cancellation accepted';
   exception when sqlstate 'P0001' then null; end;
   reset role;
  end loop;
  assert snapshot=jsonb_build_object('room',(select to_jsonb(x) from public.versus_rooms x where id=r.id),'match',(select to_jsonb(x) from public.versus_matches x where id=m),'challenges',(select jsonb_agg(to_jsonb(x) order by owner_id) from public.versus_challenges x where room_id=r.id),'players',(select jsonb_agg(to_jsonb(x) order by user_id) from public.versus_players x where room_id=r.id)),'rejected cancellation changed data';
  -- A leads on every tiebreaker, but loses if only its own clock expires.
  update public.versus_match_players set score_letters=1,guessed_letters=array['A'] where match_id=m;
  if scenario<>'both-draw' then
   update public.versus_match_players set lives=5,completed_words=3,score_letters=20,current_word_index=3 where match_id=m and user_id=a;
   update public.versus_match_players set lives=1 where match_id=m and user_id=b;
  end if;
  update public.versus_matches set started_at=now()-interval '220 seconds', deadline_at=now()+interval '20 seconds' where id=m;
  perform private.expire_versus_player_times(m);
  assert (select status='playing' from public.versus_matches where id=m),'premature expiry';
  if scenario='single' then
   update public.versus_match_players set time_penalty_seconds=20 where match_id=m and user_id=a;
   expected:=b;
  elsif scenario in ('both-winner','both-draw') then
   update public.versus_matches set deadline_at=now()-interval '1 second' where id=m;
   expected:=case when scenario='both-draw' then null else a end;
  else expected:=a;
  end if;
  perform set_config('request.jwt.claim.sub',b::text,true);
  if scenario='rules' then perform public.finish_versus_match(m,'rules'); end if;
  set local role authenticated;
  state:=public.get_versus_match_state(r.id);
  reset role;
  assert (select status='finished' and winner_id is not distinct from expected and last_event->>'winnerId' is not distinct from expected::text from public.versus_matches where id=m),'definitive winner';
  assert state->>'wordLanguage'=l,'language preserved';
  assert (select count(*)=2 from versus_private.player_history where match_id=m),'two history entries';
  assert not exists(select 1 from versus_private.player_history where match_id=m and (win is distinct from coalesce(user_id=expected,false) or draw is distinct from (expected is null) or player_history.ranked<>v_ranked)),'history outcome';
  assert (select count(*)=case when v_ranked then 2 else 0 end from versus_private.ranked_results where match_id=m),'ranked only when appropriate';
  assert not exists(select 1 from versus_private.ranked_results where match_id=m and (win is distinct from coalesce(user_id=expected,false) or draw is distinct from (expected is null) or points<>case when user_id=expected then 3 when expected is null then 1 when before_points<10 then 0 else -1 end or after_points<>before_points+points)),'ranking outcome and points';
  set constraints all immediate;
  assert (select count(*)=2 from versus_private.coin_rewards where match_id=m),'two coin awards';
  assert not exists(select 1 from versus_private.coin_rewards where match_id=m and (outcome<>case when expected is null then 'draw' when user_id=expected then 'win' else 'loss' end or amount<>case when expected is null then 10 when user_id=expected then 20 else 5 end)),'coin outcome';
  select event_sequence into seq from public.versus_matches where id=m;
  select count(*) into results_before from versus_private.player_history where match_id=m;
  perform private.expire_versus_player_times(m);
  perform public.finish_versus_match(m,'time');
  assert (select event_sequence=seq and winner_id is not distinct from expected from public.versus_matches where id=m),'repeat finalization changed winner';
  assert (select count(*)=results_before from versus_private.player_history where match_id=m),'duplicate history';
  set local role authenticated;
  begin perform public.cancel_versus_challenge(r.id);raise exception using errcode='23514',message='Finished room reopened';exception when sqlstate 'P0001' then null;end;
  reset role;
 end loop;
 end loop;
 end loop;
 assert not has_function_privilege('anon','public.cancel_versus_challenge(uuid)','EXECUTE');
 assert has_function_privilege('authenticated','public.cancel_versus_challenge(uuid)','EXECUTE');
 assert not has_function_privilege('authenticated','private.expire_versus_player_times(uuid)','EXECUTE');
 assert not has_function_privilege('authenticated','public.finish_versus_match(uuid,text)','EXECUTE');
end $$;
select 'PASS: 24 match scenarios plus real Kairos ability; 3 languages; classic/ranked; cancellation, history, points, coins, idempotence, permissions' result;




rollback;
