create or replace function versus_private.find_opponent(p_alias text, p_cancel boolean default false)
returns jsonb language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid(); q versus_private.search_queue; rival versus_private.search_queue; r public.versus_rooms; n text;
begin
 if u is null then raise exception 'Iniciá sesión para buscar partida.'; end if;
 perform pg_advisory_xact_lock(927341);
 select * into q from versus_private.search_queue where user_id=u;
 if q.room_id is not null then
  delete from versus_private.search_queue where user_id=u;
  if exists(select 1 from public.versus_players where room_id=q.room_id and user_id=u) then
   return jsonb_build_object('room_id',q.room_id);
  end if;
 end if;
 if p_cancel then delete from versus_private.search_queue where user_id=u; return jsonb_build_object('cancelled',true); end if;
 select r0.* into r from public.versus_rooms r0 join versus_private.ranked_rooms rr on rr.room_id=r0.id join public.versus_players p on p.room_id=r0.id where p.user_id=u and r0.status='complete' order by r0.created_at desc limit 1;
 if r.id is not null then return jsonb_build_object('room_id',r.id); end if;
 n:=regexp_replace(btrim(coalesce(p_alias,'')),'\s+',' ','g');
 if length(n) not between 2 and 16 then raise exception 'Escribí un nombre de entre 2 y 16 caracteres.'; end if;
 if exists(select 1 from public.versus_players p join public.versus_rooms active_room on active_room.id=p.room_id where p.user_id=u and active_room.status in ('complete','preparing','playing')) then
  raise exception 'Terminá o abandoná tu partida actual antes de buscar otra.';
 end if;
 delete from versus_private.search_queue where touched_at < now()-interval '30 seconds' and room_id is null;
 select * into rival from versus_private.search_queue where user_id<>u and room_id is null order by touched_at limit 1;
 if rival.user_id is null then
  insert into versus_private.search_queue(user_id,alias) values(u,n) on conflict(user_id) do update set alias=excluded.alias,touched_at=now(),room_id=null;
  return jsonb_build_object('waiting',true);
 end if;
 r:=public.create_versus_room(n);
 insert into public.versus_players(room_id,user_id,alias,slot) values(r.id,rival.user_id,rival.alias,2);
 update public.versus_rooms set status='complete' where id=r.id;
 insert into versus_private.ranked_rooms values(r.id);
 update versus_private.search_queue set room_id=r.id,touched_at=now() where user_id=rival.user_id;
 delete from versus_private.search_queue where user_id=u;
 return jsonb_build_object('room_id',r.id);
end $$;
