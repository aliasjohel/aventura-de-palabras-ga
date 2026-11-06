-- Server-authored prizes survive room deletion and rematches.
create table versus_private.game_wallets (
 user_id uuid primary key references auth.users(id) on delete cascade,
 coins bigint not null default 0 check(coins between 0 and 9007199254740991),
 owned text[] not null default '{}', equipped jsonb not null default '{}',
 legacy_done boolean not null default false, revision bigint not null default 0
);
create table versus_private.wallet_imports (
 device_id uuid primary key, user_id uuid not null references auth.users(id) on delete cascade
);
create index wallet_imports_user_idx on versus_private.wallet_imports(user_id);
create table versus_private.adventure_coin_events (
 user_id uuid not null references auth.users(id) on delete cascade,
 event_id uuid not null, amount integer not null check(amount in (10,30)), origin text not null,
 primary key(user_id,event_id)
);
alter table versus_private.game_wallets enable row level security;
alter table versus_private.wallet_imports enable row level security;
alter table versus_private.adventure_coin_events enable row level security;
revoke all on versus_private.game_wallets,versus_private.wallet_imports,versus_private.adventure_coin_events from public,anon,authenticated;

create table versus_private.coin_rewards (
 user_id uuid not null references auth.users(id) on delete cascade,
 match_id uuid not null,
 amount integer not null check (amount in (5,10,20)),
 outcome text not null check (outcome in ('win','draw','loss')),
 awarded_at timestamptz not null default now(),
 primary key(user_id,match_id)
);
alter table versus_private.coin_rewards enable row level security;
revoke all on versus_private.coin_rewards from public,anon,authenticated;

create function versus_private.record_coin_reward() returns trigger
language plpgsql security definer set search_path='' as $$
declare m public.versus_matches%rowtype; reward record;
begin
 -- Read the FINAL winner at transaction end. The individual-timeout rule
 -- may correct winner_id after finish_versus_match changes the status.
 select * into m from public.versus_matches where id=new.id;
 if m.status is distinct from 'finished' or coalesce(m.last_event->>'reason','') not in ('rules','time') then return null; end if;
 if (select count(*) from public.versus_match_players where match_id=m.id)<>2 then return null; end if;
 for reward in
 insert into versus_private.coin_rewards(user_id,match_id,amount,outcome)
 select p.user_id,m.id,
   case when m.winner_id is null then 10 when m.winner_id=p.user_id then 20 else 5 end,
   case when m.winner_id is null then 'draw' when m.winner_id=p.user_id then 'win' else 'loss' end
 from public.versus_match_players p
 where p.match_id=m.id and (p.score_letters>0 or p.current_word_index>0 or cardinality(p.guessed_letters)>0)
 order by p.user_id on conflict do nothing returning user_id,amount
 loop
  insert into versus_private.game_wallets(user_id,coins,revision) values(reward.user_id,reward.amount,1)
  on conflict(user_id) do update set coins=versus_private.game_wallets.coins+excluded.coins, revision=versus_private.game_wallets.revision+1;
 end loop;
 return null;
end $$;
revoke all on function versus_private.record_coin_reward() from public,anon,authenticated;
create constraint trigger coin_reward_finished after update on public.versus_matches
deferrable initially deferred for each row
when (new.status='finished' and old.status<>'finished')
execute function versus_private.record_coin_reward();

-- Offline adventure and legacy balances were already client-authored. Import
-- them once, preserving existing progress. They are not proof of ranked play.
-- New Versus awards have NO client-supplied amount or claim endpoint.
create function versus_private.sync_game_wallet(p_legacy jsonb,p_events jsonb,p_equipped jsonb,p_match_id uuid)
returns jsonb language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid(); w versus_private.game_wallets; e jsonb; ids uuid[]:='{}';
 n integer; imported integer; skin text; char_key text; accepted jsonb:='{}';
begin
 if u is null then raise exception 'Iniciá sesión para guardar tus monedas.'; end if;
 if jsonb_typeof(coalesce(p_events,'[]'))<>'array' or jsonb_array_length(coalesce(p_events,'[]'))>100 then raise exception 'Lista de recompensas inválida.'; end if;
 insert into versus_private.game_wallets(user_id) values(u) on conflict do nothing;
 select * into w from versus_private.game_wallets where user_id=u for update;
 if not w.legacy_done then
  if p_legacy is not null then
   if jsonb_typeof(p_legacy->'owned')<>'array' or jsonb_array_length(p_legacy->'owned')>3
    or (p_legacy->>'coins')::numeric not between 0 and 9007199254740991
    or trunc((p_legacy->>'coins')::numeric)<>(p_legacy->>'coins')::numeric then raise exception 'Saldo anterior inválido.'; end if;
   insert into versus_private.wallet_imports(device_id,user_id) values((p_legacy->>'deviceId')::uuid,u) on conflict do nothing;
   get diagnostics imported=row_count;
   if imported=1 then
    w.coins:=w.coins+(p_legacy->>'coins')::bigint;
    select coalesce(array_agg(distinct s),'{}') into w.owned from jsonb_array_elements_text(p_legacy->'owned') s
     where s in ('aren-bosque','zafir-celestial','kairos-real');
    p_equipped:=coalesce(p_legacy->'equipped','{}');
   end if;
  end if;
  w.legacy_done:=true;w.revision:=w.revision+1;
 end if;
 for e in select value from jsonb_array_elements(coalesce(p_events,'[]')) loop
  if (e->>'amount')::integer not in (10,30) or coalesce(e->>'origin','') !~ '^aventura:[a-zA-Z0-9_:]+$'
    or length(e->>'origin')>150 then raise exception 'Recompensa de aventura inválida.'; end if;
  insert into versus_private.adventure_coin_events(user_id,event_id,amount,origin)
   values(u,(e->>'id')::uuid,(e->>'amount')::integer,e->>'origin') on conflict do nothing;
  get diagnostics n=row_count;
  if n=1 then w.coins:=w.coins+(e->>'amount')::integer;w.revision:=w.revision+1;end if;
  ids:=array_append(ids,(e->>'id')::uuid);
 end loop;
 if p_equipped is not null then
  if jsonb_typeof(p_equipped)<>'object' then raise exception 'Trajes inválidos.'; end if;
  for char_key,skin in select key,value from jsonb_each_text(p_equipped) loop
   if skin=any(w.owned) and (char_key,skin) in (('explorador','aren-bosque'),('mago','zafir-celestial'),('kairos','kairos-real')) then
    accepted:=accepted||jsonb_build_object(char_key,skin);
   end if;
  end loop;
  if w.equipped<>accepted then w.equipped:=accepted;w.revision:=w.revision+1;end if;
 end if;
 update versus_private.game_wallets set coins=w.coins,owned=w.owned,equipped=w.equipped,legacy_done=w.legacy_done,revision=w.revision where user_id=u;
 return jsonb_build_object('userId',u,'coins',w.coins,'owned',w.owned,'equipped',w.equipped,'revision',w.revision,'acknowledged',ids,
  'reward',(select jsonb_build_object('matchId',match_id,'amount',amount,'outcome',outcome) from versus_private.coin_rewards where user_id=u and match_id=p_match_id));
end $$;
revoke all on function versus_private.sync_game_wallet(jsonb,jsonb,jsonb,uuid) from public,anon,authenticated;
grant execute on function versus_private.sync_game_wallet(jsonb,jsonb,jsonb,uuid) to authenticated;
create function public.sync_game_wallet(p_legacy jsonb default null,p_events jsonb default '[]',p_equipped jsonb default null,p_match_id uuid default null)
returns jsonb language sql security invoker set search_path='' as $$ select versus_private.sync_game_wallet(p_legacy,p_events,p_equipped,p_match_id) $$;
revoke all on function public.sync_game_wallet(jsonb,jsonb,jsonb,uuid) from public,anon,authenticated;
grant execute on function public.sync_game_wallet(jsonb,jsonb,jsonb,uuid) to authenticated;

create function versus_private.purchase_game_costume(p_skin text)
returns jsonb language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid();w versus_private.game_wallets;cost integer;
begin
 if u is null then raise exception 'Iniciá sesión para comprar.';end if;
 cost:=case p_skin when 'aren-bosque' then 200 when 'zafir-celestial' then 250 when 'kairos-real' then 300 else null end;
 if cost is null then raise exception 'Este traje no está disponible.';end if;
 select * into w from versus_private.game_wallets where user_id=u for update;
 if not found or not w.legacy_done then raise exception 'Sincronizá tus monedas antes de comprar.';end if;
 if not (p_skin=any(w.owned)) then
  if w.coins<cost then raise exception 'Te faltan % monedas.',cost-w.coins;end if;
  update versus_private.game_wallets set coins=coins-cost,owned=array_append(owned,p_skin),revision=revision+1 where user_id=u;
 end if;
 return versus_private.sync_game_wallet(null,'[]',null,null);
end $$;
revoke all on function versus_private.purchase_game_costume(text) from public,anon,authenticated;
grant execute on function versus_private.purchase_game_costume(text) to authenticated;
create function public.purchase_game_costume(p_skin text) returns jsonb
language sql security invoker set search_path='' as $$ select versus_private.purchase_game_costume(p_skin) $$;
revoke all on function public.purchase_game_costume(text) from public,anon,authenticated;
grant execute on function public.purchase_game_costume(text) to authenticated;
