-- Durable server-authored results, independent of room cleanup and rematches.
create table versus_private.player_history (
  user_id uuid not null references auth.users(id) on delete cascade,
  match_id uuid not null,
  alias text not null,
  character_key text,
  win boolean not null,
  draw boolean not null,
  ranked boolean not null,
  finished_at timestamptz,
  primary key (user_id, match_id)
);
alter table versus_private.player_history enable row level security;
revoke all on versus_private.player_history from public, anon, authenticated;

-- Old ranked results are authoritative, but did not record the character.
insert into versus_private.player_history(user_id,match_id,alias,win,draw,ranked)
select user_id,match_id,alias,win,draw,true from versus_private.ranked_results
on conflict do nothing;

create function versus_private.record_player_history() returns trigger
language plpgsql security definer set search_path='' as $$
begin
  if new.status='finished' and old.status<>'finished' then
    insert into versus_private.player_history(user_id,match_id,alias,character_key,win,draw,ranked,finished_at)
    select p.user_id,new.id,p.alias,p.character_key,coalesce(new.winner_id=p.user_id,false),
      new.winner_id is null,exists(select 1 from versus_private.ranked_rooms r where r.room_id=new.room_id),now()
    from public.versus_players p where p.room_id=new.room_id
    on conflict do nothing;
  end if;
  return new;
end $$;
revoke all on function versus_private.record_player_history() from public,anon,authenticated;
create trigger player_history_finished after update of status on public.versus_matches
for each row execute function versus_private.record_player_history();

create function versus_private.player_profile() returns jsonb
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
    'points',coalesce(sum(case when ranked and win then 3 when ranked and draw then 1 else 0 end),0),
    'legacy_played',count(*) filter(where character_key is null),
    'favorites',favorites
  ) into result from versus_private.player_history where user_id=u;
  return result;
end $$;
revoke all on function versus_private.player_profile() from public,anon,authenticated;
grant execute on function versus_private.player_profile() to authenticated;
create function public.get_versus_player_profile() returns jsonb
language sql security invoker set search_path='' as $$ select versus_private.player_profile() $$;
revoke all on function public.get_versus_player_profile() from public,anon,authenticated;
grant execute on function public.get_versus_player_profile() to authenticated;
