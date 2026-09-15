-- Run against a migrated database. All synthetic users and rooms roll back.
begin;
do $$
declare
  a uuid := gen_random_uuid();
  b uuid := gen_random_uuid();
  outsider uuid := gen_random_uuid();
  room uuid := gen_random_uuid();
  denied boolean;
begin
  insert into auth.users (id) values (a), (b), (outsider);
  insert into public.versus_rooms (id, code, host_id, status)
    values (room, upper(substr(replace(room::text, '-', ''), 1, 6)), a, 'playing');
  insert into public.versus_players(room_id,user_id,alias,slot)
    values (room,a,'Avatar QA 1',1),(room,b,'Avatar QA 2',2);
  perform set_config('request.jwt.claims', json_build_object('sub',a,'role','authenticated')::text, true);
  set local role authenticated;
  perform public.set_versus_identity(room,'dragon-hielo','real');
  assert (select avatar_key = 'dragon-hielo' and frame_key = 'real' from public.versus_players where user_id=a and room_id=room);
  assert (select avatar_key = 'explorador' from public.versus_players where user_id=b and room_id=room);
  perform public.send_versus_quick_message(room,'facil');
  assert (select quick_message_key = 'facil' and quick_message_at is not null from public.versus_players where user_id=a and room_id=room);
  denied := false;
  begin perform public.send_versus_quick_message(room,'buena'); exception when others then denied := SQLERRM like '%5 segundos%'; end;
  assert denied, 'Server must enforce the cooldown';
  denied := false;
  begin perform public.send_versus_quick_message(room,'arbitrary text'); exception when others then denied := true; end;
  assert denied, 'Only allowlisted messages can be sent';
  denied := false;
  begin perform public.set_versus_identity(room,'../../invalid','real'); exception when others then denied := true; end;
  assert denied, 'Only catalog avatars can be saved';
  denied := false;
  begin update public.versus_players set quick_message_at = null where user_id=a; exception when insufficient_privilege then denied := true; end;
  assert denied, 'Clients cannot bypass the cooldown with direct updates';
  reset role;
  perform set_config('request.jwt.claims', json_build_object('sub',b,'role','authenticated')::text, true);
  set local role authenticated;
  assert (select avatar_key = 'dragon-hielo' and quick_message_key = 'facil' from public.versus_players where user_id=a and room_id=room), 'Opponent can read identity and message';
  perform public.send_versus_quick_message(room,'buena');
  reset role;
  update public.versus_players set quick_message_at = now() - interval '6 seconds' where user_id=a and room_id=room;
  perform set_config('request.jwt.claims', json_build_object('sub',a,'role','authenticated')::text, true);
  set local role authenticated;
  perform public.send_versus_quick_message(room,'alcanzo');
  reset role;
  perform set_config('request.jwt.claims', json_build_object('sub',outsider,'role','authenticated')::text, true);
  set local role authenticated;
  assert (select count(*) = 0 from public.versus_players where room_id=room), 'Other players cannot read the room';
  denied := false;
  begin perform public.set_versus_identity(room,'azrak','fuego'); exception when others then denied := true; end;
  assert denied, 'Outsider cannot change a room identity';
  denied := false;
  begin perform public.send_versus_quick_message(room,'facil'); exception when others then denied := true; end;
  assert denied, 'Outsider cannot send a message';
  reset role;
  update public.versus_rooms set status='waiting' where id=room;
  perform set_config('request.jwt.claims', json_build_object('sub',a,'role','authenticated')::text, true);
  set local role authenticated;
  denied := false;
  begin perform public.send_versus_quick_message(room,'buena'); exception when others then denied := true; end;
  assert denied, 'Messages require a duel';
  reset role;
  assert not has_function_privilege('anon','public.send_versus_quick_message(uuid,text)','execute');
  assert not has_function_privilege('anon','public.set_versus_identity(uuid,text,text)','execute');
end;
$$;
rollback;
select 'PASS: member visibility, ownership, allowlists, cooldown, direct-write protection and anonymous denial' as result;
