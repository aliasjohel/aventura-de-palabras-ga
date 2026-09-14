create schema if not exists versus_private;
revoke all on schema versus_private from public, anon;
grant usage on schema versus_private to authenticated;
create table versus_private.search_queue (
 user_id uuid primary key references auth.users(id) on delete cascade,
 alias text not null, touched_at timestamptz not null default now(),
 room_id uuid references public.versus_rooms(id) on delete cascade
);
create table versus_private.ranked_rooms (room_id uuid primary key references public.versus_rooms(id) on delete cascade);
create table versus_private.ranked_results (
 match_id uuid not null, user_id uuid not null references auth.users(id) on delete cascade,
 alias text not null, points integer not null, win boolean not null, draw boolean not null,
 primary key(match_id,user_id)
);
alter table versus_private.search_queue enable row level security;
alter table versus_private.ranked_rooms enable row level security;
alter table versus_private.ranked_results enable row level security;
revoke all on all tables in schema versus_private from public, anon, authenticated;
create function versus_private.find_opponent(p_alias text, p_cancel boolean default false)
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
 if exists(select 1 from public.versus_players p join public.versus_rooms r on r.id=p.room_id where p.user_id=u and r.status in ('complete','preparing','playing')) then
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
create function public.find_versus_opponent(p_alias text, p_cancel boolean default false)
returns jsonb language sql security invoker set search_path='' as $$select versus_private.find_opponent(p_alias,p_cancel)$$;
create function versus_private.record_result() returns trigger language plpgsql security definer set search_path='' as $$
begin
 if new.status='finished' and old.status<>'finished' and exists(select 1 from versus_private.ranked_rooms where room_id=new.room_id) then
  insert into versus_private.ranked_results(match_id,user_id,alias,points,win,draw)
  select new.id,p.user_id,p.alias,case when new.winner_id=p.user_id then 3 when new.winner_id is null then 1 else 0 end,
   coalesce(new.winner_id=p.user_id,false),new.winner_id is null
  from public.versus_players p where p.room_id=new.room_id on conflict do nothing;
 end if;
 return new;
end $$;
create trigger ranked_result_finished after update of status on public.versus_matches for each row execute function versus_private.record_result();
create function versus_private.ranking() returns jsonb language plpgsql security definer set search_path='' as $$
declare result jsonb;
begin
 if auth.uid() is null then raise exception 'Iniciá sesión para ver el ranking.'; end if;
 with scores as (
 select r.user_id,coalesce(max(p.alias),max(r.alias)) as alias,sum(r.points) as points,count(*) as played,count(*) filter(where r.win) as wins,count(*) filter(where r.draw) as draws
 from versus_private.ranked_results r left join public.versus_profiles p on p.user_id=r.user_id group by r.user_id
 ), positions as (select *,rank() over(order by points desc,wins desc) as position from scores),
 visible as (select position,alias,points,played,wins,draws,user_id=auth.uid() as me from positions where position<=50 or user_id=auth.uid() order by position,alias limit 51)
 select coalesce(jsonb_agg(to_jsonb(visible)),'[]'::jsonb) into result from visible;
 return result;
end $$;
create function public.get_versus_ranking() returns jsonb language sql security invoker set search_path='' as $$select versus_private.ranking()$$;
revoke all on function versus_private.find_opponent(text,boolean),versus_private.ranking(),versus_private.record_result(),public.find_versus_opponent(text,boolean),public.get_versus_ranking() from public,anon,authenticated;
grant execute on function versus_private.find_opponent(text,boolean),versus_private.ranking(),public.find_versus_opponent(text,boolean),public.get_versus_ranking() to authenticated;
