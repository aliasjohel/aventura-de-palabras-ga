-- Keep existing scores while separating casual matches from the competitive ladder.
alter table public.versus_rooms add column queue_mode text not null default 'classic' check(queue_mode in ('classic','ranked'));
update public.versus_rooms set queue_mode='ranked' where id in(select room_id from versus_private.ranked_rooms);
alter table versus_private.search_queue add column mode text not null default 'ranked' check(mode in ('classic','ranked')),
  add column queued_at timestamptz not null default now(), add column rating bigint not null default 0;
alter table versus_private.ranked_results add column before_points bigint, add column after_points bigint;
create index ranked_results_user_points_idx on versus_private.ranked_results(user_id);
create index search_queue_mode_rating_idx on versus_private.search_queue(mode,rating,queued_at) where room_id is null;

create function public.versus_rank_info(p_points bigint) returns jsonb
language sql immutable parallel safe security invoker set search_path='' as $$
 select jsonb_build_object('index',tier,'key',key,'name',name,'title',title,'min',minimum,'next',following)
 from (values
 (0,'novato','Novato','Aprendiz',0,10),(1,'bronce','Bronce','Aventurero',10,30),
 (2,'plata','Plata','Explorador',30,60),(3,'oro','Oro','Guardián',60,120),
 (4,'platino','Platino','Maestro de Palabras',120,240),(5,'diamante','Diamante','Campeón',240,480),
 (6,'leyenda','Leyenda','Leyenda de los Cinco Mundos',480,null)
 ) t(tier,key,name,title,minimum,following) where minimum<=greatest(coalesce(p_points,0),0) order by tier desc limit 1
$$;

create function versus_private.find_opponent_mode(p_alias text,p_cancel boolean,p_mode text) returns jsonb
language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid(); q versus_private.search_queue; rival versus_private.search_queue;
 r public.versus_rooms; n text; score bigint; my_rank jsonb; tier integer; width integer; waited boolean;
begin
 if u is null then raise exception 'Iniciá sesión para buscar partida.'; end if;
 if p_mode is null or p_mode not in ('classic','ranked') then raise exception 'Modo de juego inválido.'; end if;
 -- One short transaction pairs exactly two players, including simultaneous polls/cancel.
 perform pg_advisory_xact_lock(927341);
 select * into q from versus_private.search_queue where user_id=u;
 if q.room_id is not null then
   select room.* into r from public.versus_rooms room join public.versus_players p on p.room_id=room.id
     where room.id=q.room_id and p.user_id=u and room.status in ('complete','preparing','playing');
   if r.id is not null then return jsonb_build_object('room_id',r.id,'mode',r.queue_mode); end if;
   delete from versus_private.search_queue where user_id=u;
 end if;
 if p_cancel then
   delete from versus_private.search_queue where user_id=u;
   return jsonb_build_object('cancelled',true);
 end if;
 -- Resume a pairing made by the previous app version.
 select room.* into r from public.versus_rooms room join versus_private.ranked_rooms rr on rr.room_id=room.id
   join public.versus_players p on p.room_id=room.id where p.user_id=u and room.status='complete' order by room.created_at desc limit 1;
 if r.id is not null then return jsonb_build_object('room_id',r.id,'mode',r.queue_mode); end if;
 n:=regexp_replace(btrim(coalesce(p_alias,'')),'\s+',' ','g');
 if length(n) not between 2 and 16 then raise exception 'Escribí un nombre de entre 2 y 16 caracteres.'; end if;
 if public.versus_alias_inappropriate(n) then raise exception 'Elegí otro nombre: no se permiten malas palabras ni insultos.' using errcode='23514'; end if;
 if exists(select 1 from public.versus_players p join public.versus_rooms room on room.id=p.room_id where p.user_id=u and room.status in ('complete','preparing','playing')) then
   raise exception 'Terminá o abandoná tu partida actual antes de buscar otra.';
 end if;
 delete from versus_private.search_queue where touched_at<now()-interval '30 seconds' and room_id is null;
 select coalesce(sum(points),0) into score from versus_private.ranked_results where user_id=u;
 my_rank:=public.versus_rank_info(score); tier:=(my_rank->>'index')::integer;
 width:=coalesce((my_rank->>'next')::integer-(my_rank->>'min')::integer,240);
 insert into versus_private.search_queue(user_id,alias,mode,rating) values(u,n,p_mode,score)
 on conflict(user_id) do update set alias=excluded.alias,mode=excluded.mode,rating=excluded.rating,touched_at=now(),room_id=null,
 queued_at=case when search_queue.mode<>excluded.mode or search_queue.room_id is not null then now() else search_queue.queued_at end
 returning * into q;
 waited:=q.queued_at<=now()-interval '30 seconds';
 select candidate.* into rival from versus_private.search_queue candidate
 cross join lateral(select public.versus_rank_info(candidate.rating) as info) rank
 where candidate.user_id<>u and candidate.room_id is null and candidate.mode=p_mode
 and not exists(select 1 from public.versus_players p join public.versus_rooms room on room.id=p.room_id
   where p.user_id=candidate.user_id and room.status in ('complete','preparing','playing'))
 and (p_mode='classic' or (
   ((rank.info->>'index')::integer=tier and abs(candidate.rating-score)<=greatest(6,width/3))
   or (waited and candidate.queued_at<=now()-interval '30 seconds'
       and abs((rank.info->>'index')::integer-tier)<=1
       and abs(candidate.rating-score)<=greatest(8,least(width,coalesce((rank.info->>'next')::integer-(rank.info->>'min')::integer,240))/2))
 ))
 order by case when p_mode='ranked' then abs((rank.info->>'index')::integer-tier) else 0 end,
   case when p_mode='ranked' then abs(candidate.rating-score) else 0 end,candidate.queued_at,candidate.user_id
 limit 1;
 if rival.user_id is null then return jsonb_build_object('waiting',true,'mode',p_mode,'points',score,'rank',my_rank,'expanded',waited,'wait_seconds',floor(extract(epoch from now()-q.queued_at))); end if;
 r:=public.create_versus_room(n);
 insert into public.versus_players(room_id,user_id,alias,slot) values(r.id,rival.user_id,rival.alias,2);
 update public.versus_rooms set status='complete',queue_mode=p_mode where id=r.id;
 if p_mode='ranked' then insert into versus_private.ranked_rooms values(r.id); end if;
 update versus_private.search_queue set room_id=r.id,touched_at=now() where user_id in(u,rival.user_id);
 return jsonb_build_object('room_id',r.id,'mode',p_mode);
end $$;
revoke all on function versus_private.find_opponent_mode(text,boolean,text) from public,anon,authenticated;
grant execute on function versus_private.find_opponent_mode(text,boolean,text) to authenticated;
-- Keep the existing two-argument RPC working for installed clients.
create or replace function versus_private.find_opponent(p_alias text,p_cancel boolean default false) returns jsonb
language sql security invoker set search_path='' as $$select versus_private.find_opponent_mode(p_alias,p_cancel,'ranked')$$;
create function public.find_versus_opponent_mode(p_alias text,p_cancel boolean,p_mode text) returns jsonb
language sql security invoker set search_path='' as $$select versus_private.find_opponent_mode(p_alias,p_cancel,p_mode)$$;
revoke all on function public.find_versus_opponent_mode(text,boolean,text) from public,anon,authenticated;
grant execute on function public.find_versus_opponent_mode(text,boolean,text) to authenticated;

create or replace function versus_private.record_result() returns trigger
language plpgsql security definer set search_path='' as $$
declare player record; score bigint; delta integer;
begin
 if new.status='finished' and old.status<>'finished' and exists(select 1 from versus_private.ranked_rooms where room_id=new.room_id) then
   perform pg_advisory_xact_lock(927341);
   for player in select * from public.versus_players where room_id=new.room_id order by user_id loop
     if exists(select 1 from versus_private.ranked_results where match_id=new.id and user_id=player.user_id) then continue; end if;
     select coalesce(sum(points),0) into score from versus_private.ranked_results where user_id=player.user_id;
     delta:=case when new.winner_id=player.user_id then 3 when new.winner_id is null then 1 when score<10 then 0 else -1 end;
     insert into versus_private.ranked_results(match_id,user_id,alias,points,win,draw,before_points,after_points)
       values(new.id,player.user_id,player.alias,delta,coalesce(new.winner_id=player.user_id,false),new.winner_id is null,score,score+delta)
       on conflict do nothing;
   end loop;
 end if;
 return new;
end $$;

create function versus_private.rank_status(p_match_id uuid default null) returns jsonb
language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid(); score bigint; change jsonb;
begin
 if u is null then raise exception 'Iniciá sesión para ver tu rango.'; end if;
 select coalesce(sum(points),0) into score from versus_private.ranked_results where user_id=u;
 select jsonb_build_object('delta',points,'before',before_points,'after',after_points,
   'previous_rank',public.versus_rank_info(before_points),'rank',public.versus_rank_info(after_points)) into change
 from versus_private.ranked_results where user_id=u and match_id=p_match_id and before_points is not null;
 return jsonb_build_object('points',score,'rank',public.versus_rank_info(score),'result',change);
end $$;
revoke all on function versus_private.rank_status(uuid) from public,anon,authenticated;
grant execute on function versus_private.rank_status(uuid) to authenticated;
create function public.get_versus_rank_status(p_match_id uuid default null) returns jsonb
language sql security invoker set search_path='' as $$select versus_private.rank_status(p_match_id)$$;
revoke all on function public.get_versus_rank_status(uuid) from public,anon,authenticated;
grant execute on function public.get_versus_rank_status(uuid) to authenticated;


create or replace function public.join_versus_room(p_code text, p_alias text)
returns public.versus_rooms
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_alias text;
  v_room public.versus_rooms;
  v_player_count integer;
begin
  if v_user_id is null then
    raise exception 'Debes iniciar una sesión anónima antes de unirte.';
  end if;

  v_alias := regexp_replace(btrim(coalesce(p_alias, '')), '\s+', ' ', 'g');
  if char_length(v_alias) not between 2 and 16 then
    raise exception 'El nombre debe tener entre 2 y 16 caracteres.';
  end if;

  select *
  into v_room
  from public.versus_rooms
  where code = upper(btrim(coalesce(p_code, '')))
  for update;

  if not found then
    raise exception 'No encontramos una sala con ese código.';
  end if;

  if exists (
    select 1 from public.versus_players
    where room_id = v_room.id and user_id = v_user_id
  ) then
    return v_room;
  end if;

  if v_room.queue_mode = 'ranked' then
    raise exception 'Las salas clasificatorias se forman con Buscar rival.';
  end if;

  select count(*) into v_player_count
  from public.versus_players
  where room_id = v_room.id;

  if v_player_count >= 2 or v_room.status <> 'waiting' then
    raise exception 'La sala ya está completa.';
  end if;

  insert into public.versus_players (room_id, user_id, alias, slot)
  values (v_room.id, v_user_id, v_alias, 2);

  update public.versus_rooms
  set status = 'complete'
  where id = v_room.id
  returning * into v_room;

  return v_room;
end;
$$;

create or replace function public.leave_versus_room(p_room_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_host_id uuid;
  active_match public.versus_matches;
  opponent uuid;
begin
  select host_id into v_host_id
  from public.versus_rooms
  where id = p_room_id;

  if not found then
    return;
  end if;

  if v_user_id is null or not public.is_versus_room_member(p_room_id) then
    raise exception 'No perteneces a esta sala.';
  end if;
  -- Record a forfeit before either player or the room is removed.
  select * into active_match from public.versus_matches where room_id=p_room_id and status='playing' for update;
  if active_match.id is not null then
    select user_id into opponent from public.versus_players where room_id=p_room_id and user_id<>v_user_id limit 1;
    if opponent is not null then
      update public.versus_matches set status='finished',winner_id=opponent where id=active_match.id;
    end if;
  end if;
  if exists(select 1 from versus_private.ranked_rooms where room_id=p_room_id) then
    delete from public.versus_rooms where id=p_room_id;
    return;
  end if;

  if v_host_id = v_user_id then
    delete from public.versus_rooms where id = p_room_id;
    return;
  end if;

  if not exists (
    select 1 from public.versus_players
    where room_id = p_room_id and user_id = v_user_id
  ) then
    raise exception 'No perteneces a esta sala.';
  end if;

  delete from public.versus_challenges where room_id = p_room_id;
  delete from public.versus_matches where room_id = p_room_id;
  delete from public.versus_players where room_id = p_room_id and user_id = v_user_id;
  update public.versus_players set ready=false,character_key=null,theme_key=null,preparation_ready=false,rematch_ready=false where room_id=p_room_id;

  update public.versus_rooms
  set status = 'waiting'
  where id = p_room_id;
end;
$$;

create or replace function versus_private.public_player_profile(p_user_id uuid default null,p_offset integer default 0) returns jsonb
language plpgsql security definer set search_path='' as $$
declare u uuid:=coalesce(p_user_id,auth.uid()); result jsonb; favorites jsonb; recent jsonb; place bigint;
begin
  if auth.uid() is null then raise exception 'Iniciá sesión para ver los perfiles.'; end if;
  if p_offset is null or p_offset<0 or p_offset>100000 then raise exception 'Página inválida.'; end if;
  if u<>auth.uid() and not exists(select 1 from public.versus_profiles where user_id=u)
    and not exists(select 1 from versus_private.player_history where user_id=u)
    and not exists(select 1 from public.versus_players where user_id=u) then
    raise exception 'Este perfil ya no está disponible.';
  end if;
  with scores as (
    select user_id,sum(points) points,count(*) filter(where win) wins from versus_private.ranked_results group by user_id
  ), positions as(select user_id,rank() over(order by points desc,wins desc) position from scores)
  select position into place from positions where user_id=u;
  select coalesce(jsonb_agg(to_jsonb(f)),'[]'::jsonb) into favorites from (
    select character_key as character,count(*) as played,count(*) filter(where win) as wins
    from versus_private.player_history where user_id=u and character_key is not null
    group by character_key order by count(*) desc,count(*) filter(where win) desc,character_key limit 3
  ) f;
  select coalesce(jsonb_agg(to_jsonb(r)),'[]'::jsonb) into recent from (
    select h.match_id,h.finished_at,h.win,h.draw,h.ranked,h.character_key as character,
      opponent.user_id as opponent_id,
      case when public.versus_alias_inappropriate(coalesce(p.alias,opponent.alias)) then 'Aventurero'
        else coalesce(p.alias,opponent.alias,'Rival no disponible') end as opponent_alias,
      opponent.character_key as opponent_character
    from (select * from versus_private.player_history where user_id=u order by finished_at desc nulls last,match_id desc limit 20 offset p_offset) h
    left join lateral(select * from versus_private.player_history o where o.match_id=h.match_id and o.user_id<>u order by o.user_id limit 1) opponent on true
    left join public.versus_profiles p on p.user_id=opponent.user_id
    order by h.finished_at desc nulls last,h.match_id desc
  ) r;
  select jsonb_build_object(
    'id',u,
    'alias',coalesce((select alias from public.versus_profiles where user_id=u),
      (select alias from public.versus_players where user_id=u order by joined_at desc limit 1),
      (select alias from versus_private.player_history where user_id=u order by finished_at desc nulls last,match_id desc limit 1),'Aventurero'),
    'avatar',coalesce((select avatar_key from versus_private.player_appearance where user_id=u),'explorador'),
    'frame',coalesce((select frame_key from versus_private.player_appearance where user_id=u),'clasico'),
    'played',count(*),'wins',count(*) filter(where win),'draws',count(*) filter(where draw),
    'losses',count(*) filter(where not win and not draw),
    'points',coalesce((select sum(points) from versus_private.ranked_results where user_id=u),0),
    'position',place,'favorites',favorites,'recent',recent,'has_more',count(*)>p_offset+20,
    'legacy_played',count(*) filter(where character_key is null)
  ) into result from versus_private.player_history where user_id=u;
  if public.versus_alias_inappropriate(result->>'alias') then result:=jsonb_set(result,'{alias}','"Aventurero"'); end if;
  return result || jsonb_build_object('rank',public.versus_rank_info((result->>'points')::bigint));
end $$;

create or replace function versus_private.ranking() returns jsonb
language plpgsql security definer set search_path='' as $$
declare result jsonb;
begin
 if auth.uid() is null then raise exception 'Iniciá sesión para ver el ranking.'; end if;
 with scores as (
 select r.user_id,coalesce(max(p.alias),max(r.alias)) as alias,sum(r.points) as points,count(*) as played,count(*) filter(where r.win) as wins,count(*) filter(where r.draw) as draws
 from versus_private.ranked_results r left join public.versus_profiles p on p.user_id=r.user_id group by r.user_id
 ), positions as (select *,rank() over(order by points desc,wins desc) as position from scores),
 visible as (select user_id,position,case when public.versus_alias_inappropriate(alias) then 'Aventurero' else alias end as alias,points,played,wins,draws,user_id=auth.uid() as me,public.versus_rank_info(points) as rank from positions where position<=50 or user_id=auth.uid() order by position,alias limit 51)
 select coalesce(jsonb_agg(to_jsonb(visible)),'[]'::jsonb) into result from visible;
 return result;
end $$;

create or replace function versus_private.player_profile() returns jsonb
language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid(); result jsonb; favorites jsonb;
begin
  if u is null then raise exception 'Iniciá sesión para ver tu perfil.'; end if;
  select coalesce(jsonb_agg(to_jsonb(f)),'[]'::jsonb) into favorites from (
    select character_key as character,count(*) as played,count(*) filter(where win) as wins
    from versus_private.player_history where user_id=u and character_key is not null
    group by character_key order by count(*) desc,count(*) filter(where win) desc,character_key limit 3
  ) f;
  select jsonb_build_object(
    'id',u,
    'friend_code',(select friend_code from public.versus_profiles where user_id=u),
    'alias',coalesce((select alias from public.versus_profiles where user_id=u),
      (select alias from public.versus_players where user_id=u order by joined_at desc limit 1),
      (select alias from versus_private.player_history where user_id=u order by finished_at desc nulls last,match_id limit 1)),
    'played',count(*),'wins',count(*) filter(where win),
    'losses',count(*) filter(where not win and not draw),'draws',count(*) filter(where draw),
    'ranked_played',count(*) filter(where ranked),
    'points',coalesce((select sum(points) from versus_private.ranked_results where user_id=u),0),
    'legacy_played',count(*) filter(where character_key is null),
    'favorites',favorites
  ) into result from versus_private.player_history where user_id=u;
  return result || jsonb_build_object('rank',public.versus_rank_info((result->>'points')::bigint));
end $$;
