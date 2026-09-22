-- Execute in a transaction; all fixture users, games and aliases are rolled back.
do $$
declare a uuid:=gen_random_uuid(); b uuid:=gen_random_uuid(); mid uuid; p jsonb; r public.versus_rooms; n integer;
begin
  insert into auth.users(id) values(a),(b);
  perform set_config('request.jwt.claim.sub',a::text,true);
  p:=public.get_versus_public_profile();
  if (p->>'played')::int<>0 or p->>'position' is not null then raise exception 'empty profile incorrect'; end if;
  perform public.save_versus_appearance('mago','arcano');
  begin
    perform public.save_versus_appearance('../invalid','arcano');
    raise exception 'invalid appearance allowed';
  exception when check_violation then null; end;
  begin
    perform public.create_versus_room('p.u.t.o');
    raise exception 'invalid alias allowed';
  exception when check_violation then null; end;
  r:=public.create_versus_room('Jugador QA');
  insert into public.versus_players(room_id,user_id,alias,slot,character_key) values(r.id,b,'Rival QA',2,'dragon');
  mid:=gen_random_uuid();
  insert into public.versus_matches(id,room_id,started_at,deadline_at) values(mid,r.id,now(),now()+interval '5 minutes');
  update public.versus_players set character_key='mago' where room_id=r.id and user_id=a;
  update public.versus_matches set status='finished',winner_id=a where id=mid;
  update public.versus_matches set status='finished' where id=mid;
  delete from public.versus_rooms where id=r.id;
  p:=public.get_versus_public_profile(a);
  if (p->>'played')::int<>1 or p#>>'{recent,0,opponent_id}'<>b::text then raise exception 'history not durable: %',p; end if;
  if p->>'avatar'<>'mago' or p->>'frame'<>'arcano' or p#>>'{favorites,0,character}'<>'mago' then raise exception 'appearance or favorite incorrect'; end if;
  for i in 1..24 loop
    mid:=gen_random_uuid();
    insert into versus_private.player_history values(a,mid,'Jugador QA','mago',true,false,true,now()+i*interval '1 second'),(b,mid,'Rival QA','dragon',false,false,true,now()+i*interval '1 second');
    insert into versus_private.ranked_results values(mid,a,'Jugador QA',3,true,false),(mid,b,'Rival QA',0,false,false);
  end loop;
  perform set_config('request.jwt.claim.sub',b::text,true);
  p:=public.get_versus_public_profile(a);
  if (p->>'wins')::int<>25 or (p->>'played')::int<>25 or (p->>'points')::int<>72 or p->>'position' is null then raise exception 'public stats incorrect: %',p; end if;
  if jsonb_array_length(p->'recent')<>20 or not (p->>'has_more')::boolean then raise exception 'first page incorrect'; end if;
  p:=public.get_versus_public_profile(a,20);
  if jsonb_array_length(p->'recent')<>5 or (p->>'has_more')::boolean then raise exception 'second page incorrect'; end if;
  if p ? 'email' or p ? 'friend_code' or p ? 'access_token' then raise exception 'private field exposed'; end if;
  perform public.save_versus_appearance('dragon','fuego');
  p:=public.get_versus_public_profile(a);
  if p->>'frame'<>'arcano' then raise exception 'appearance ownership violated'; end if;
  if not exists(select 1 from jsonb_array_elements(public.get_versus_ranking()) x where x->>'user_id'=b::text) then raise exception 'ranking profile link missing'; end if;
  if has_table_privilege('authenticated','versus_private.player_appearance','UPDATE') or has_function_privilege('anon','public.get_versus_public_profile(uuid,integer)','EXECUTE') then raise exception 'excess privileges'; end if;
  perform set_config('request.jwt.claim.sub','',true);
  begin
    perform public.get_versus_public_profile(a);
    raise exception 'unauthenticated read allowed';
  exception when others then if sqlerrm='unauthenticated read allowed' then raise; end if; end;
end $$;
