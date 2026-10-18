-- Execute whole file: synthetic fixtures always roll back.
begin;
do $$
declare
 a uuid; b uuid; c uuid; outsider uuid:=gen_random_uuid();l text;terminal text;
 i public.versus_invites; other public.versus_invites; r public.versus_rooms; r2 public.versus_rooms;
 j jsonb;words text[];m uuid;rooms_before bigint;invite_count int;
begin
 insert into auth.users(id,is_anonymous) values(outsider,false);
 foreach l in array array['es','en','pt-BR'] loop
 a:=gen_random_uuid();b:=gen_random_uuid();c:=gen_random_uuid();
 insert into auth.users(id,is_anonymous) values(a,false),(b,false),(c,false);
 perform set_config('request.jwt.claim.sub',a::text,true);
 perform set_config('request.jwt.claims',jsonb_build_object('sub',a,'is_anonymous',false)::text,true);
 set local role authenticated;
 perform public.upsert_versus_profile('QA Amigo Uno');
 perform set_config('request.jwt.claim.sub',b::text,true);
 perform set_config('request.jwt.claims',jsonb_build_object('sub',b,'is_anonymous',false)::text,true);
 perform public.upsert_versus_profile('QA Amigo Dos');
 perform set_config('request.jwt.claim.sub',c::text,true);
 perform set_config('request.jwt.claims',jsonb_build_object('sub',c,'is_anonymous',false)::text,true);
 perform public.upsert_versus_profile('QA Amigo Tres');
 reset role;
 insert into public.versus_friendships(requester_id,addressee_id,status) values(a,b,'accepted'),(a,c,'accepted'),(b,c,'accepted');
 -- Rejected/cancelled/expired invitations never create or recover rooms.
 foreach terminal in array array['declined','cancelled','expired','elapsed-pending'] loop
  perform set_config('request.jwt.claim.sub',a::text,true);
  perform set_config('request.jwt.claims',jsonb_build_object('sub',a,'is_anonymous',false)::text,true);
  set local role authenticated;
  i:=public.send_versus_invite_localized(b,l);
  reset role;
  if terminal='declined' then
   perform set_config('request.jwt.claim.sub',b::text,true);
   perform set_config('request.jwt.claims',jsonb_build_object('sub',b,'is_anonymous',false)::text,true);
   set local role authenticated;
   perform public.respond_versus_invite_localized(i.id,false);
   reset role;
  elsif terminal='cancelled' then
   set local role authenticated;
   perform public.cancel_versus_invite(i.id);
   reset role;
  elsif terminal='elapsed-pending' then update public.versus_invites set expires_at=now()-interval '1 second' where id=i.id;
  else update public.versus_invites set status=terminal where id=i.id;end if;
  select count(*) into rooms_before from public.versus_rooms;
  perform set_config('request.jwt.claim.sub',b::text,true);
  perform set_config('request.jwt.claims',jsonb_build_object('sub',b,'is_anonymous',false)::text,true);
  set local role authenticated;
  begin perform public.respond_versus_invite_localized(i.id,true);raise exception using errcode='23514',message='terminal invitation reopened';exception when sqlstate 'P0001' then null;end;
  j:=public.get_versus_social_state();
  assert jsonb_array_length(j->'accepted_invites')=0,'terminal recovered';
  reset role;
  assert (select count(*)=rooms_before from public.versus_rooms),'terminal created room';
 end loop;
 -- Accept, recover on both sides, and retry after losing the HTTP response.
 perform set_config('request.jwt.claim.sub',a::text,true);
 perform set_config('request.jwt.claims',jsonb_build_object('sub',a,'is_anonymous',false)::text,true);
 set local role authenticated;
 i:=public.send_versus_invite_localized(b,l);
 j:=public.get_versus_social_state();assert j#>>'{outgoing_invites,0,word_language}'=l;
 perform set_config('request.jwt.claim.sub',b::text,true);
 perform set_config('request.jwt.claims',jsonb_build_object('sub',b,'is_anonymous',false)::text,true);
 if l<>'es' then
  begin perform public.respond_versus_invite(i.id,true);raise exception using errcode='23514',message='legacy accepted non-Spanish';exception when sqlstate 'P0001' then null;end;
 end if;
 r:=public.respond_versus_invite_localized(i.id,true);
 r2:=public.respond_versus_invite_localized(i.id,true);
 assert r2.id=r.id and r.word_language=l,'retry creates duplicate or changes language';
 j:=public.get_versus_social_state();assert j#>>'{accepted_invites,0,room_id}'=r.id::text;
 assert j#>>'{accepted_invites,0,word_language}'=l;
 perform set_config('request.jwt.claim.sub',a::text,true);
 perform set_config('request.jwt.claims',jsonb_build_object('sub',a,'is_anonymous',false)::text,true);
 j:=public.get_versus_social_state();assert j#>>'{accepted_invites,0,room_id}'=r.id::text,'challenger missed event';
 -- Creating another private room, sending another invitation and matchmaking are blocked.
 begin perform public.create_versus_room_localized('QA Otro',l);raise exception using errcode='23514',message='busy create';exception when sqlstate 'P0001' then null;end;
 begin perform public.send_versus_invite_localized(c,l);raise exception using errcode='23514',message='busy send';exception when sqlstate 'P0001' then null;end;
 begin perform public.find_versus_opponent_localized('QA Otro',false,'classic',l);raise exception using errcode='23514',message='busy queue';exception when sqlstate 'P0001' then null;end;
 -- A third party cannot recover or accept the invitation.
 perform set_config('request.jwt.claim.sub',outsider::text,true);
 perform set_config('request.jwt.claims',jsonb_build_object('sub',outsider,'is_anonymous',false)::text,true);
 j:=public.get_versus_social_state();assert jsonb_array_length(j->'accepted_invites')=0;
 begin perform public.respond_versus_invite_localized(i.id,true);raise exception using errcode='23514',message='outsider accepted';exception when sqlstate 'P0001' then null;end;
 -- Prepare/start/finish and rematch keep authoritative language.
 perform set_config('request.jwt.claim.sub',a::text,true);
 perform set_config('request.jwt.claims',jsonb_build_object('sub',a,'is_anonymous',false)::text,true);
 perform public.set_versus_character(r.id,'explorador',true);
 perform set_config('request.jwt.claim.sub',b::text,true);
 perform set_config('request.jwt.claims',jsonb_build_object('sub',b,'is_anonymous',false)::text,true);
 perform public.set_versus_character(r.id,'kairos',true);
 words:=case l when 'en' then array['CAT','DOG','GOOSE','OTTER','TIGER'] when 'pt-BR' then array['LEÃO','CACHORRO','PÁSSARO','ONÇA','GATO'] else array['GATO','PERRO','LORO','TIGRE','OSO'] end;
 perform public.set_versus_challenge(r.id,'animales',words);
 perform set_config('request.jwt.claim.sub',a::text,true);
 perform set_config('request.jwt.claims',jsonb_build_object('sub',a,'is_anonymous',false)::text,true);
 perform public.set_versus_challenge(r.id,'animales',words);
 j:=public.get_versus_social_state();assert j#>>'{accepted_invites,0,room_status}'='playing';
 reset role;
 select id into m from public.versus_matches where room_id=r.id;
 perform public.finish_versus_match(m,'time');
 set local role authenticated;
 j:=public.get_versus_social_state();assert jsonb_array_length(j->'accepted_invites')=0,'finished invite recovered';
 begin perform public.respond_versus_invite_localized(i.id,true);raise exception using errcode='23514',message='finished invite reopened';exception when sqlstate 'P0001' then null;end;
 perform public.request_versus_rematch(r.id);
 perform set_config('request.jwt.claim.sub',b::text,true);
 perform set_config('request.jwt.claims',jsonb_build_object('sub',b,'is_anonymous',false)::text,true);
 r2:=public.request_versus_rematch(r.id);assert r2.status='preparing' and r2.word_language=l,'rematch broken';
 reset role;
 -- Release only this synthetic room without deleting it, to exercise later routes.
 update public.versus_rooms set status='finished' where id=r.id;
 -- Pending invitation made before either player became busy must be rejected.
 perform set_config('request.jwt.claim.sub',a::text,true);
 perform set_config('request.jwt.claims',jsonb_build_object('sub',a,'is_anonymous',false)::text,true);
 set local role authenticated;
 i:=public.send_versus_invite_localized(b,l);
 perform set_config('request.jwt.claim.sub',b::text,true);
 perform set_config('request.jwt.claims',jsonb_build_object('sub',b,'is_anonymous',false)::text,true);
 r:=public.create_versus_room_localized('QA Privada',l);
 perform set_config('request.jwt.claim.sub',c::text,true);
 perform set_config('request.jwt.claims',jsonb_build_object('sub',c,'is_anonymous',false)::text,true);
 r:=public.join_versus_room_localized(r.code,'QA Tercero');
 perform set_config('request.jwt.claim.sub',b::text,true);
 perform set_config('request.jwt.claims',jsonb_build_object('sub',b,'is_anonymous',false)::text,true);
 begin perform public.respond_versus_invite_localized(i.id,true);raise exception using errcode='23514',message='busy challenged accepted';exception when sqlstate 'P0001' then null;end;
 reset role;
 assert (select status='pending' and room_id is null from public.versus_invites where id=i.id);
 update public.versus_rooms set status='finished' where id=r.id;
 -- Now the challenger is busy instead.
 perform set_config('request.jwt.claim.sub',a::text,true);
 perform set_config('request.jwt.claims',jsonb_build_object('sub',a,'is_anonymous',false)::text,true);
 set local role authenticated;
 r:=public.create_versus_room_localized('QA Privada',l);
 perform set_config('request.jwt.claim.sub',c::text,true);
 perform set_config('request.jwt.claims',jsonb_build_object('sub',c,'is_anonymous',false)::text,true);
 r:=public.join_versus_room_localized(r.code,'QA Tercero');
 perform set_config('request.jwt.claim.sub',b::text,true);
 perform set_config('request.jwt.claims',jsonb_build_object('sub',b,'is_anonymous',false)::text,true);
 begin perform public.respond_versus_invite_localized(i.id,true);raise exception using errcode='23514',message='busy challenger accepted';exception when sqlstate 'P0001' then null;end;
 reset role;
 update public.versus_rooms set status='finished' where id=r.id;
 -- Automatic matchmaking remains usable and language-separated.
 perform set_config('request.jwt.claim.sub',a::text,true);
 perform set_config('request.jwt.claims',jsonb_build_object('sub',a,'is_anonymous',false)::text,true);
 set local role authenticated;
 j:=public.find_versus_opponent_localized('QA Uno',false,'ranked',l);assert (j->>'waiting')::boolean;
 perform set_config('request.jwt.claim.sub',b::text,true);
 perform set_config('request.jwt.claims',jsonb_build_object('sub',b,'is_anonymous',false)::text,true);
 j:=public.find_versus_opponent_localized('QA Dos',false,'ranked',l);assert j->>'room_id' is not null;
 reset role;
 assert (select word_language=l from public.versus_rooms where id=(j->>'room_id')::uuid);
 end loop;
 assert not has_function_privilege('authenticated','private.assert_versus_available(uuid[],uuid)','EXECUTE');
end $$;
select 'PASS Stage 2: invitation lifecycle, both busy players, retry/recovery, privacy, private rooms, ranked matchmaking, rematch and three languages' result;
rollback;
