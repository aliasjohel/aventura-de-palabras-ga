-- Additive XP ledger. Installation is inert until the separately verified activation.
begin;
set local lock_timeout='5s';
set local statement_timeout='60s';

create table versus_private.xp_rollout(
 singleton boolean primary key default true check(singleton),
 enabled boolean not null default false,
 historical_cutoff timestamptz,
 activated_at timestamptz
);
insert into versus_private.xp_rollout(singleton) values(true);
create table versus_private.xp_accounts(
 user_id uuid primary key references auth.users(id) on delete cascade,
 total bigint not null default 0 check(total between 0 and 9007199254740991),
 revision bigint not null default 0,
 selected_title text
);
create table versus_private.xp_daily(
 user_id uuid not null references auth.users(id) on delete cascade,
 day date not null, earned integer not null default 0 check(earned between 0 and 300),
 primary key(user_id,day)
);
create table versus_private.xp_events(
 user_id uuid not null references auth.users(id) on delete cascade,
 source text not null check(length(source) between 1 and 160),
 mode text not null check(mode in ('adventure_first','adventure_repeat','multiplayer')),
 amount integer not null check(amount between 0 and 120),
 occurred_at timestamptz not null,
 historical boolean not null default false,
 primary key(user_id,source)
);
create index xp_events_account_date on versus_private.xp_events(user_id,occurred_at);
create table versus_private.xp_rewards(
 level integer primary key, threshold bigint not null unique,
 coins integer not null check(coins>0), frame text unique, title text unique
);
insert into versus_private.xp_rewards values
 (5,800,100,null,'xp_buscapalabras'),
 (10,2925,150,'xp_tinta',null),
 (15,6300,200,null,'xp_tejedor'),
 (20,10925,250,'xp_constelacion',null),
 (30,23925,400,'xp_codice','xp_cronista'),
 (50,64925,750,'xp_infinito','xp_voz');
create table versus_private.xp_reward_receipts(
 user_id uuid not null references auth.users(id) on delete cascade,
 level integer not null references versus_private.xp_rewards(level),
 id uuid not null unique default gen_random_uuid(), coins integer not null,
 claimed_at timestamptz not null default clock_timestamp(),
 primary key(user_id,level)
);
create table versus_private.xp_cosmetics(
 user_id uuid not null references auth.users(id) on delete cascade,
 item text not null, kind text not null check(kind in ('frame','title')),
 reward_level integer not null,
 primary key(user_id,item),
 foreign key(user_id,reward_level) references versus_private.xp_reward_receipts(user_id,level)
);
-- Moves are written only around the existing authoritative letter implementation.
-- No FK to ephemeral matches: evidence survives room cleanup.
create table versus_private.xp_multiplayer_moves(
 user_id uuid not null references auth.users(id) on delete cascade,
 match_id uuid not null, word_index integer not null, letter text not null,
 correct boolean not null, accepted_at timestamptz not null,
 primary key(user_id,match_id,word_index,letter)
);

do $secure$ declare t text;begin
 foreach t in array array['xp_rollout','xp_accounts','xp_daily','xp_events','xp_rewards','xp_reward_receipts','xp_cosmetics','xp_multiplayer_moves'] loop
  execute format('alter table versus_private.%I enable row level security',t);
  execute format('revoke all on versus_private.%I from public,anon,authenticated,service_role',t);
 end loop;
end $secure$;

create function versus_private.xp_permanent(p_user uuid) returns boolean
language sql stable security definer set search_path='' as $$
 select exists(select 1 from auth.users where id=p_user and is_anonymous is false
 and email_confirmed_at is not null and nullif(email,'') is not null
 and coalesce((to_jsonb(users)->>'banned_until')::timestamptz,'-infinity')<=now())
$$;
create function versus_private.xp_level_info(p_total bigint) returns jsonb
language sql immutable set search_path='' as $$
 with v as(select greatest(coalesce(p_total,0),0) x),
 k as(select x,floor((sqrt(10000+100*x::numeric)-100)/50)::bigint n from v)
 select jsonb_build_object('total',x,'level',n+1,'levelStart',100*n+25*n*n,
 'nextLevel',100*(n+1)+25*(n+1)*(n+1)) from k
$$;

-- Lock order: existing wallet first, then XP account and daily quota. This is the
-- same order used by mission settlement, match rewards and level reward claims.
create function versus_private.xp_award(p_user uuid,p_source text,p_mode text,p_amount integer,
 p_at timestamptz,p_recurring boolean,p_historical boolean default false) returns integer
language plpgsql security definer set search_path='' as $$
declare c versus_private.xp_rollout;d date;available integer;credited integer;n integer;
begin
 select * into c from versus_private.xp_rollout where singleton for share;
 if not versus_private.xp_permanent(p_user) then return 0;end if;
 if p_historical then
  if c.historical_cutoff is null or p_at>c.historical_cutoff then raise exception 'Invalid historical XP source';end if;
 elsif not c.enabled then return 0;end if;
 if p_amount not between 1 and 120 or p_at is null then raise exception 'Invalid XP event';end if;
 insert into versus_private.game_wallets(user_id) values(p_user) on conflict do nothing;
 perform 1 from versus_private.game_wallets where user_id=p_user for update;
 insert into versus_private.xp_accounts(user_id) values(p_user) on conflict do nothing;
 perform 1 from versus_private.xp_accounts where user_id=p_user for update;
 if exists(select 1 from versus_private.xp_events where user_id=p_user and source=p_source) then return 0;end if;
 credited:=p_amount;
 if p_recurring then
  d:=(p_at at time zone 'UTC')::date;
  insert into versus_private.xp_daily(user_id,day) values(p_user,d) on conflict do nothing;
  select 300-earned into available from versus_private.xp_daily where user_id=p_user and day=d for update;
  credited:=least(p_amount,available);
 end if;
 insert into versus_private.xp_events(user_id,source,mode,amount,occurred_at,historical)
 values(p_user,p_source,p_mode,credited,p_at,p_historical) on conflict do nothing;
 get diagnostics n=row_count;if n=0 then return 0;end if;
 if p_recurring then update versus_private.xp_daily set earned=earned+credited where user_id=p_user and day=d;end if;
 update versus_private.xp_accounts set total=total+credited,revision=revision+1 where user_id=p_user;
 return credited;
end $$;

create function versus_private.xp_adventure(p_attempt uuid,p_historical boolean default false) returns integer
language plpgsql security definer set search_path='' as $$
declare v versus_private.verified_adventure_completions;first_at timestamptz;key_ text;
begin
 select p.* into v from versus_private.verified_adventure_completions p
 join versus_private.adventure_reward_attempts a on a.id=p.attempt_id and a.user_id=p.user_id and a.world=p.world and a.mission=p.mission
 join versus_private.adventure_validation_sessions s on s.attempt_id=p.attempt_id and s.complete
 where p.attempt_id=p_attempt and p.verifier_version='sql-actions-v1';
 if not found or not versus_private.xp_permanent(v.user_id) then return 0;end if;
 if not p_historical and not (select enabled from versus_private.xp_rollout where singleton) then return 0;end if;
 -- The wallet lock serializes the first/repeat decision as well as the credit.
 insert into versus_private.game_wallets(user_id) values(v.user_id) on conflict do nothing;
 perform 1 from versus_private.game_wallets where user_id=v.user_id for update;
 key_:='adventure:first:'||v.world||':'||v.mission;
 select occurred_at into first_at from versus_private.xp_events where user_id=v.user_id and source=key_;
 if not found then
  return versus_private.xp_award(v.user_id,key_,'adventure_first',case when v.mission=9 then 120 else 60 end,v.completed_at,false,p_historical);
 end if;
 if p_historical or (v.completed_at at time zone 'UTC')::date<=(first_at at time zone 'UTC')::date then return 0;end if;
 return versus_private.xp_award(v.user_id,'adventure:repeat:'||v.world||':'||v.mission||':'||(v.completed_at at time zone 'UTC')::date,
 'adventure_repeat',20,v.completed_at,true,false);
end $$;
create function versus_private.xp_adventure_trigger() returns trigger
language plpgsql security definer set search_path='' as $$
begin perform versus_private.xp_adventure(new.attempt_id);return new;end $$;
create trigger verified_adventure_xp after insert on versus_private.verified_adventure_completions
for each row execute function versus_private.xp_adventure_trigger();

alter function versus_private.play_versus_letter(uuid,text) rename to play_versus_letter_before_xp;
revoke all on function versus_private.play_versus_letter_before_xp(uuid,text) from public,anon,authenticated,service_role;
create function versus_private.play_versus_letter(p_room_id uuid,p_letter text) returns jsonb
language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid();m public.versus_matches;before_ public.versus_match_players;after_ public.versus_match_players;
 result jsonb;l text:=public.versus_letter_key(btrim(coalesce(p_letter,'')));at_ timestamptz;
begin
 if u is null or not public.is_versus_room_member(p_room_id) then raise exception 'No pertenecés a esta sala.';end if;
 select * into m from public.versus_matches where room_id=p_room_id for update;
 select * into before_ from public.versus_match_players where match_id=m.id and user_id=u;
 result:=versus_private.play_versus_letter_before_xp(p_room_id,p_letter);
 at_:=clock_timestamp();
 if (select enabled from versus_private.xp_rollout where singleton) and m.status='playing' and m.started_at<=at_
 and not before_.finished and not (l=any(before_.guessed_letters)) then
  select * into after_ from public.versus_match_players where match_id=m.id and user_id=u;
  if after_.score_letters>before_.score_letters or after_.errors<>before_.errors
   or after_.current_word_index<>before_.current_word_index or l=any(after_.guessed_letters) then
   insert into versus_private.xp_multiplayer_moves(user_id,match_id,word_index,letter,correct,accepted_at)
   values(u,m.id,before_.current_word_index,l,after_.score_letters>before_.score_letters,at_) on conflict do nothing;
  end if;
 end if;
 return result;
end $$;
grant execute on function versus_private.play_versus_letter(uuid,text) to authenticated;

create function versus_private.xp_match_trigger() returns trigger
language plpgsql security definer set search_path='' as $$
declare m public.versus_matches;p record;at_ timestamptz:=clock_timestamp();n integer;hit boolean;last_ timestamptz;
begin
 if not (select enabled from versus_private.xp_rollout where singleton) then return null;end if;
 -- Deferred execution reads the final corrected result and the final accepted move.
 select * into m from public.versus_matches where id=new.id;
 if m.status is distinct from 'finished' or coalesce(m.last_event->>'reason','') not in ('rules','time')
 or at_-m.started_at<interval '45 seconds'
 or (select count(*) from public.versus_match_players where match_id=m.id)<>2 then return null;end if;
 for p in select * from public.versus_match_players where match_id=m.id order by user_id loop
  select count(*),coalesce(bool_or(correct),false),max(accepted_at) into n,hit,last_
   from versus_private.xp_multiplayer_moves where user_id=p.user_id and match_id=m.id;
  -- Both sides must really participate: no XP for farming an AFK opponent.
  if n<5 or not hit or last_ is null or at_-last_>interval '60 seconds' then return null;end if;
 end loop;
 for p in select * from public.versus_match_players where match_id=m.id order by user_id loop
  perform versus_private.xp_award(p.user_id,'multiplayer:'||m.id,'multiplayer',
   case when m.winner_id is null then 25 when m.winner_id=p.user_id then 30 else 20 end,at_,true,false);
 end loop;
 return null;
end $$;
create constraint trigger xp_match_finished after update on public.versus_matches
deferrable initially deferred for each row when(new.status='finished' and old.status<>'finished')
execute function versus_private.xp_match_trigger();

create function versus_private.xp_view(p_user uuid,p_private boolean default false) returns jsonb
language plpgsql stable security definer set search_path='' as $$
declare a versus_private.xp_accounts;result jsonb;
begin
 select * into a from versus_private.xp_accounts where user_id=p_user;
 result:=versus_private.xp_level_info(coalesce(a.total,0))||jsonb_build_object('title',a.selected_title,
 'enabled',(select enabled from versus_private.xp_rollout where singleton),'revision',coalesce(a.revision,0));
 if p_private then
  result:=result||jsonb_build_object('userId',p_user,'dailyLimit',300,'dailyUsed',coalesce((select earned from versus_private.xp_daily where user_id=p_user and day=(now() at time zone 'UTC')::date),0),
   'day',(now() at time zone 'UTC')::date,'resetAt',(date_trunc('day',now() at time zone 'UTC') at time zone 'UTC')+interval '1 day',
   'ownedFrames',(select coalesce(jsonb_agg(item order by item),'[]') from versus_private.xp_cosmetics where user_id=p_user and kind='frame'),
   'ownedTitles',(select coalesce(jsonb_agg(item order by item),'[]') from versus_private.xp_cosmetics where user_id=p_user and kind='title'),
   'rewards',(select jsonb_agg(to_jsonb(r)||jsonb_build_object('claimed',exists(select 1 from versus_private.xp_reward_receipts c where c.user_id=p_user and c.level=r.level)) order by r.level) from versus_private.xp_rewards r));
 end if;
 return result;
end $$;

create function versus_private.xp_cosmetic_guard() returns trigger
language plpgsql security definer set search_path='' as $$
declare item_ text;kind_ text;
begin
 if tg_table_name='xp_accounts' then item_:=new.selected_title;kind_:='title';else item_:=new.frame_key;kind_:='frame';end if;
 if item_ like 'xp\_%' escape '\' and not exists(select 1 from versus_private.xp_cosmetics where user_id=new.user_id and item=item_ and kind=kind_) then
  raise exception 'Este elemento de XP todavía no pertenece a tu cuenta.';
 end if;
 return new;
end $$;
alter table versus_private.player_appearance drop constraint player_appearance_frame_key_check;
alter table versus_private.player_appearance add constraint player_appearance_frame_key_check
 check(frame_key in ('clasico','bosque','hielo','fuego','arcano','real','bronce','plata','oro','platino','diamante','leyenda','xp_tinta','xp_constelacion','xp_codice','xp_infinito'));
alter table public.versus_players drop constraint versus_players_frame_key_check;
alter table public.versus_players add constraint versus_players_frame_key_check
 check(frame_key in ('clasico','bosque','hielo','fuego','arcano','real','bronce','plata','oro','platino','diamante','leyenda','xp_tinta','xp_constelacion','xp_codice','xp_infinito'));
create trigger xp_frame_ownership before insert or update of frame_key,user_id on versus_private.player_appearance
for each row execute function versus_private.xp_cosmetic_guard();
create trigger xp_frame_ownership before insert or update of frame_key,user_id on public.versus_players
for each row execute function versus_private.xp_cosmetic_guard();
create trigger xp_title_ownership before insert or update of selected_title,user_id on versus_private.xp_accounts
for each row execute function versus_private.xp_cosmetic_guard();
create or replace function versus_identity_private.set_identity(p_room_id uuid,p_avatar_key text,p_frame_key text)
returns void language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null then raise exception 'Iniciá sesión para elegir tu avatar.';end if;
 if coalesce(p_avatar_key,'') not in ('explorador','mago','guardian-alba','t-shadow','kalamo','dragon','dragon-hielo','hombre-lobo','azrak')
 or coalesce(p_frame_key,'') not in ('clasico','bosque','hielo','fuego','arcano','real','bronce','plata','oro','platino','diamante','leyenda','xp_tinta','xp_constelacion','xp_codice','xp_infinito') then raise exception 'Elegí un avatar y un marco del catálogo.';end if;
 update public.versus_players set avatar_key=p_avatar_key,frame_key=p_frame_key where room_id=p_room_id and user_id=auth.uid();
 if not found then raise exception 'No pertenecés a esta sala.';end if;
end $$;

create function versus_private.player_xp(p_action text,p_reward integer,p_frame text,p_title text) returns jsonb
language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid();r versus_private.xp_rewards;a versus_private.xp_accounts;rec versus_private.xp_reward_receipts;n integer;
begin
 if not versus_private.xp_permanent(u) then raise exception 'Iniciá sesión con una cuenta confirmada para usar los niveles.';end if;
 if p_action not in ('sync','claim','equip') or p_action is null then raise exception 'Acción de XP inválida.';end if;
 if p_action<>'sync' then
  if not (select enabled from versus_private.xp_rollout where singleton) then raise exception 'El sistema de niveles está temporalmente en pausa.';end if;
  insert into versus_private.game_wallets(user_id) values(u) on conflict do nothing;
  perform 1 from versus_private.game_wallets where user_id=u for update;
  insert into versus_private.xp_accounts(user_id) values(u) on conflict do nothing;
  select * into a from versus_private.xp_accounts where user_id=u for update;
  if p_action='claim' then
   select * into r from versus_private.xp_rewards where level=p_reward;
   if not found or a.total<r.threshold then raise exception 'Todavía no alcanzaste este premio de nivel.';end if;
   insert into versus_private.xp_reward_receipts(user_id,level,coins) values(u,r.level,r.coins) on conflict do nothing;
   get diagnostics n=row_count;
   if n=1 then
    update versus_private.game_wallets set coins=coins+r.coins,revision=revision+1 where user_id=u;
    if r.frame is not null then insert into versus_private.xp_cosmetics(user_id,item,kind,reward_level) values(u,r.frame,'frame',r.level);end if;
    if r.title is not null then insert into versus_private.xp_cosmetics(user_id,item,kind,reward_level) values(u,r.title,'title',r.level);end if;
   end if;
   select * into rec from versus_private.xp_reward_receipts where user_id=u and level=r.level;
  else
   if p_frame is not null then
    if not exists(select 1 from versus_private.xp_cosmetics where user_id=u and item=p_frame and kind='frame') then raise exception 'Este marco de XP todavía no pertenece a tu cuenta.';end if;
    insert into versus_private.player_appearance(user_id,avatar_key,frame_key)
    values(u,'explorador',p_frame) on conflict(user_id) do update set frame_key=excluded.frame_key,updated_at=now();
   end if;
   if p_title is not null then
    if p_title<>'' and not exists(select 1 from versus_private.xp_cosmetics where user_id=u and item=p_title and kind='title') then raise exception 'Este título todavía no pertenece a tu cuenta.';end if;
    update versus_private.xp_accounts set selected_title=nullif(p_title,''),revision=revision+1 where user_id=u;
   end if;
  end if;
 end if;
 return jsonb_build_object('userId',u,'xp',versus_private.xp_view(u,true),'receipt',case when rec.id is not null then to_jsonb(rec)-'user_id' else null end,
 'appearance',(select jsonb_build_object('avatar',avatar_key,'frame',frame_key) from versus_private.player_appearance where user_id=u));
end $$;
create function public.player_xp(p_action text default 'sync',p_reward integer default null,p_frame text default null,p_title text default null)
returns jsonb language sql security invoker set search_path='' as $$select versus_private.player_xp(p_action,p_reward,p_frame,p_title)$$;

alter function versus_private.player_profile() rename to player_profile_before_xp;
revoke all on function versus_private.player_profile_before_xp() from public,anon,authenticated,service_role;
create function versus_private.player_profile() returns jsonb language sql security definer set search_path='' as $$
 select versus_private.player_profile_before_xp()||jsonb_build_object('xp',versus_private.xp_view(auth.uid(),true))
$$;
alter function versus_private.public_player_profile(uuid,integer) rename to public_player_profile_before_xp;
revoke all on function versus_private.public_player_profile_before_xp(uuid,integer) from public,anon,authenticated,service_role;
create function versus_private.public_player_profile(p_user_id uuid default null,p_offset integer default 0) returns jsonb
language sql security definer set search_path='' as $$
 select versus_private.public_player_profile_before_xp(p_user_id,p_offset)||jsonb_build_object('xp',versus_private.xp_view(coalesce(p_user_id,auth.uid()),false))
$$;

-- Activation invokes this once with a server cutoff in the same transaction.
-- Re-running is safe: identical first-mission/match source keys never pay again.
create function versus_private.xp_backfill() returns void
language plpgsql security definer set search_path='' as $$
declare c versus_private.xp_rollout;p record;
begin
 select * into c from versus_private.xp_rollout where singleton for update;
 if c.historical_cutoff is null then raise exception 'Set a fixed server cutoff before XP recognition';end if;
 for p in select * from versus_private.verified_adventure_completions where completed_at<=c.historical_cutoff order by user_id,completed_at,attempt_id loop
  perform versus_private.xp_adventure(p.attempt_id,true);
 end loop;
 for p in select r.* from versus_private.coin_rewards r
 join versus_private.player_history h on h.user_id=r.user_id and h.match_id=r.match_id
 where r.awarded_at<=c.historical_cutoff and ((r.outcome='win' and h.win) or (r.outcome='draw' and h.draw) or (r.outcome='loss' and not h.win and not h.draw))
 order by r.user_id,r.awarded_at,r.match_id loop
  perform versus_private.xp_award(p.user_id,'multiplayer:'||p.match_id,'multiplayer',case p.outcome when 'win' then 30 when 'draw' then 25 else 20 end,p.awarded_at,true,true);
 end loop;
end $$;

-- No generic award, backfill, view or old implementation is callable by clients.
do $acl$ declare p record;begin
 for p in select oid::regprocedure signature from pg_proc where pronamespace='versus_private'::regnamespace and proname like 'xp\_%' escape '\' loop
  execute format('revoke all on function %s from public,anon,authenticated,service_role',p.signature);
 end loop;
end $acl$;
revoke all on function versus_private.player_xp(text,integer,text,text),public.player_xp(text,integer,text,text),
 versus_private.play_versus_letter(uuid,text),versus_private.player_profile(),versus_private.public_player_profile(uuid,integer) from public,anon,authenticated,service_role;
grant execute on function versus_private.player_xp(text,integer,text,text),public.player_xp(text,integer,text,text),
 versus_private.play_versus_letter(uuid,text),versus_private.player_profile(),versus_private.public_player_profile(uuid,integer) to authenticated;
notify pgrst,'reload schema';
commit;
