-- Run inside a transaction after installing the migration; fixtures are rolled back.
do $$
declare a uuid:=gen_random_uuid(); b uuid:=gen_random_uuid(); r public.versus_rooms; mid uuid; summary jsonb;
begin
  insert into auth.users(id) values(a),(b);
  perform set_config('request.jwt.claim.sub',a::text,true);
  summary:=public.get_versus_player_profile();
  if (summary->>'played')::int<>0 then raise exception 'new player not empty'; end if;
  for i in 1..3 loop
    r:=public.create_versus_room('Perfil QA');
    update public.versus_players set character_key=case when i=3 then 'mago' else 'kairos' end where room_id=r.id;
    insert into public.versus_players(room_id,user_id,alias,slot,character_key) values(r.id,b,'Rival QA',2,'dragon');
    if i=1 then insert into versus_private.ranked_rooms values(r.id); end if;
    mid:=gen_random_uuid();
    insert into public.versus_matches(id,room_id,started_at,deadline_at) values(mid,r.id,now(),now()+interval '5 minutes');
    update public.versus_matches set status='finished',winner_id=case when i=1 then a when i=2 then b else null end where id=mid;
    update public.versus_matches set status='finished' where id=mid;
    delete from public.versus_rooms where id=r.id;
  end loop;
  summary:=public.get_versus_player_profile();
  if summary->>'id'<>a::text or (summary->>'played')::int<>3 or (summary->>'wins')::int<>1 or (summary->>'losses')::int<>1 or (summary->>'draws')::int<>1 or (summary->>'points')::int<>3 or (summary->>'ranked_played')::int<>1 then raise exception 'wrong stats: %',summary; end if;
  if summary#>>'{favorites,0,character}'<>'kairos' or (summary#>>'{favorites,0,played}')::int<>2 then raise exception 'wrong favorites'; end if;
  perform set_config('request.jwt.claim.sub',b::text,true);
  summary:=public.get_versus_player_profile();
  if summary->>'id'<>b::text or summary#>>'{favorites,0,character}'<>'dragon' then raise exception 'identity leak'; end if;
  perform set_config('request.jwt.claim.sub','',true);
  begin
    perform public.get_versus_player_profile();
    raise exception 'missing auth allowed';
  exception when others then
    if sqlerrm='missing auth allowed' then raise; end if;
  end;
  if has_table_privilege('authenticated','versus_private.player_history','INSERT') or has_table_privilege('authenticated','versus_private.player_history','SELECT') or has_function_privilege('anon','public.get_versus_player_profile()','EXECUTE') then raise exception 'excess permissions'; end if;
end $$;
select 'PASS: empty profile, wins/losses/draws, favorites, ranked points, deduplication, durable history, user isolation, permissions' as result;
