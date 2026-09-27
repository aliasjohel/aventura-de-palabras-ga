-- Same or adjacent main tiers are eligible immediately. Prefer closer tiers/points.
-- Preserve queue locking, active-room checks, alias validation and RPC permissions.
begin;
create or replace function versus_private.find_opponent_mode(p_alias text,p_cancel boolean,p_mode text) returns jsonb
language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid(); q versus_private.search_queue; rival versus_private.search_queue;
 r public.versus_rooms; n text; score bigint; my_rank jsonb; tier integer;
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
 insert into versus_private.search_queue(user_id,alias,mode,rating) values(u,n,p_mode,score)
 on conflict(user_id) do update set alias=excluded.alias,mode=excluded.mode,rating=excluded.rating,touched_at=now(),room_id=null,
 queued_at=case when search_queue.mode<>excluded.mode or search_queue.room_id is not null then now() else search_queue.queued_at end
 returning * into q;
 select candidate.* into rival from versus_private.search_queue candidate
 cross join lateral(select public.versus_rank_info(candidate.rating) as info) rank
 where candidate.user_id<>u and candidate.room_id is null and candidate.mode=p_mode
 and not exists(select 1 from public.versus_players p join public.versus_rooms room on room.id=p.room_id
   where p.user_id=candidate.user_id and room.status in ('complete','preparing','playing'))
 and (p_mode='classic' or abs((rank.info->>'index')::integer-tier)<=1)
 order by case when p_mode='ranked' then abs((rank.info->>'index')::integer-tier) else 0 end,
   case when p_mode='ranked' then abs(candidate.rating-score) else 0 end,candidate.queued_at,candidate.user_id
 limit 1;
 if rival.user_id is null then return jsonb_build_object('waiting',true,'mode',p_mode,'points',score,'rank',my_rank,'expanded',true,'wait_seconds',floor(extract(epoch from now()-q.queued_at))); end if;
 r:=public.create_versus_room(n);
 insert into public.versus_players(room_id,user_id,alias,slot) values(r.id,rival.user_id,rival.alias,2);
 update public.versus_rooms set status='complete',queue_mode=p_mode where id=r.id;
 if p_mode='ranked' then insert into versus_private.ranked_rooms values(r.id); end if;
 update versus_private.search_queue set room_id=r.id,touched_at=now() where user_id in(u,rival.user_id);
 return jsonb_build_object('room_id',r.id,'mode',p_mode);
end $$;
revoke all on function versus_private.find_opponent_mode(text,boolean,text) from public,anon,authenticated;
grant execute on function versus_private.find_opponent_mode(text,boolean,text) to authenticated;

notify pgrst, 'reload schema';
commit;
