-- Run with game.admin_test_code set privately. Fixtures and changes are rolled back.
do $$
declare a uuid:=gen_random_uuid();b uuid:=gen_random_uuid();c uuid:=gen_random_uuid();
 room public.versus_rooms; state jsonb; m uuid; outfits jsonb; i integer; letter text;
begin
 insert into auth.users(id,aud,role,is_anonymous,raw_app_meta_data,raw_user_meta_data)
 select id,'authenticated','authenticated',true,'{}','{}' from unnest(array[a,b,c]) id;
 perform set_config('request.jwt.claim.sub',a::text,true);
 set local role authenticated;
 state:=public.sync_game_wallet(jsonb_build_object('deviceId',gen_random_uuid(),'coins',500,'owned','[]'::jsonb,'equipped','{}'::jsonb));
 if state->>'coins'<>'500' then raise exception 'Wallet fixture failed';end if;
 begin perform public.set_admin_union_access(true);raise exception using errcode='23514',message='Non-admin grant accepted';exception when sqlstate 'P0001' then null;end;
 begin perform public.purchase_game_costume('aren-union');raise exception using errcode='23514',message='Premium coin purchase accepted';exception when sqlstate 'P0001' then null;end;
 state:=public.activate_game_admin(current_setting('game.admin_test_code'));
 if state->>'adminUnion'<>'true' or state->'equipped'->>'explorador'<>'aren-union' or state->>'coins'<>'500' then raise exception 'Admin activation failed';end if;
 state:=public.sync_game_wallet(null,'[]','{"explorador":"aren-union"}');
 if state->'equipped'->>'explorador'<>'aren-union' then raise exception 'Union equipment lost on sync';end if;
 state:=public.set_admin_union_access(false);
 if state->>'adminUnion'<>'false' or state->'owned' ? 'aren-union' or state->'equipped'->>'explorador'='aren-union' then raise exception 'Revoke failed';end if;
 state:=public.set_admin_union_access(true);
 begin perform 1 from versus_private.game_admins;raise exception using errcode='23514',message='Admin table exposed';exception when insufficient_privilege then null;end;
 begin perform versus_private.activate_versus_ability_without_union(gen_random_uuid());raise exception using errcode='23514',message='Core ability exposed';exception when insufficient_privilege then null;end;
 reset role;

 perform set_config('request.jwt.claim.sub',c::text,true);
 set local role authenticated;
 state:=public.sync_game_wallet(jsonb_build_object('deviceId',gen_random_uuid(),'coins',0,'owned','["aren-union"]'::jsonb,'equipped','{"explorador":"aren-union"}'::jsonb));
 if state->'owned' ? 'aren-union' or state->'equipped'->>'explorador'='aren-union' then raise exception 'Forged premium import accepted';end if;
 for i in 1..6 loop
  state:=public.activate_game_admin('incorrecto');
  if state->>'activationError' not like 'Código incorrecto%' then raise exception 'Incorrect code accepted';end if;
 end loop;
 state:=public.activate_game_admin(current_setting('game.admin_test_code'));
 if state->>'activationError' not like 'Demasiados intentos%' then raise exception 'Rate limit failed';end if;
 reset role;

 perform set_config('request.jwt.claim.sub',a::text,true);
 room:=public.create_versus_room('UnionTestA');
 perform set_config('request.jwt.claim.sub',b::text,true);
 perform public.join_versus_room(room.code,'UnionTestB');
 update public.versus_players set character_key='explorador',ready=true where room_id=room.id;
 insert into public.versus_challenges(room_id,owner_id,target_id,theme_key,words)
 values(room.id,a,b,'animales',array['GATO','PERRO','LORO','TIGRE','OSO']),
       (room.id,b,a,'animales',array['GATO','PERRO','LORO','TIGRE','OSO']);
 update public.versus_rooms set status='playing' where id=room.id;
 select id into m from public.versus_matches where room_id=room.id;
 update public.versus_matches set started_at=now()-interval '1 second',deadline_at=now()+interval '2 minutes' where id=m;
 update public.versus_match_players set ability_charge=8 where match_id=m and user_id=b;

 perform set_config('request.jwt.claim.sub',b::text,true);
 set local role authenticated;
 outfits:=public.get_versus_room_costumes(room.id);
 if outfits->a::text->>'explorador'<>'aren-union' then raise exception 'Rival cannot see Union';end if;
 reset role;
 perform set_config('request.jwt.claim.sub',c::text,true);
 set local role authenticated;
 begin perform public.get_versus_room_costumes(room.id);raise exception using errcode='23514',message='Outsider can read room costumes';exception when sqlstate 'P0001' then null;end;
 reset role;
 perform set_config('request.jwt.claim.sub',a::text,true);
 set local role authenticated;
 foreach letter in array array['G','A','T','O','P','E','R','O'] loop state:=public.play_versus_letter(room.id,letter);end loop;
 if state->'me'->>'abilityCharge'<>'8' then raise exception 'Union ability did not charge through real letters';end if;
 begin perform public.set_admin_union_access(false);raise exception using errcode='23514',message='Admin can change access mid-duel';exception when sqlstate 'P0001' then null;end;
 state:=public.activate_versus_ability(room.id);
 if state->'lastEvent'->>'costume'<>'aren-union' or state->'opponent'->>'activeEffect'<>'roots'
  or coalesce(state->'me'->>'abilityHint','')='' or state->'me'->>'abilityCharge'<>'0' then raise exception 'Union ability failed';end if;
 reset role;
 if not exists(select 1 from public.versus_match_players where match_id=m and user_id=b and effect_expires_at=now()+interval '2 seconds') then raise exception 'Union duration is not two seconds';end if;
 perform set_config('request.jwt.claim.sub',b::text,true);
 set local role authenticated;
 state:=public.play_versus_letter(room.id,'G');
 if state->'me'->>'scoreLetters'<>'0' or state->'me'->'usedLetters' ? 'G' then raise exception 'Server accepted a letter during Union block';end if;
 state:=public.activate_versus_ability(room.id);
 if state->'lastEvent' ? 'costume' or state->'opponent'->>'activeEffect' is not null then raise exception 'Ordinary Aren acquired Union power';end if;
 reset role;
 update public.versus_match_players set effect_expires_at=now()-interval '1 second' where match_id=m and user_id=b;
 set local role authenticated;
 state:=public.play_versus_letter(room.id,'G');
 if state->'me'->>'scoreLetters'<>'1' then raise exception 'Letters did not resume after block';end if;
 reset role;
 if has_function_privilege('anon','public.activate_game_admin(text)','execute')
  or has_function_privilege('anon','public.get_versus_room_costumes(uuid)','execute') then raise exception 'Anonymous database role has admin API access';end if;
end $$;
select 'PASS: admin code, rate limit, ownership, no coin charge, revoke, room privacy, online hint and authoritative two-second block' as result;
