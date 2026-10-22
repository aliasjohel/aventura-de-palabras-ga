-- Currency version 2: one-time data conversion in the same transaction as prices.
lock table versus_private.game_wallets in access exclusive mode;
alter table versus_private.coin_rewards drop constraint coin_rewards_amount_check;
alter table versus_private.adventure_coin_events drop constraint adventure_coin_events_amount_check;
update versus_private.game_wallets set coins=coins*10,revision=revision+1;
update versus_private.coin_rewards set amount=amount*10;
update versus_private.adventure_coin_events set amount=amount*10;
alter table versus_private.coin_rewards add constraint coin_rewards_amount_check check(amount in (30,50,100,200));
alter table versus_private.adventure_coin_events add constraint adventure_coin_events_amount_check check(amount in (50,100,300));
create table versus_private.adventure_mission_claims (
 user_id uuid not null references auth.users(id) on delete cascade,
 world integer not null check(world between 0 and 4),
 mission integer not null check(mission between 0 and 9),
 primary key(user_id,world,mission)
);
alter table versus_private.adventure_mission_claims enable row level security;
revoke all on versus_private.adventure_mission_claims from public,anon,authenticated;
-- Preserve known completed missions from the old reward history without new credit.
insert into versus_private.adventure_mission_claims(user_id,world,mission)
 select distinct user_id,split_part(origin,':',2)::integer,split_part(origin,':',3)::integer
 from versus_private.adventure_coin_events
 where origin ~ '^aventura:[0-4]:[0-9]:(3:palabra|puzzle:[a-zA-Z0-9_]+)$'
 on conflict do nothing;
insert into versus_private.adventure_mission_claims(user_id,world,mission)
 select distinct e.user_id,m.world,m.mission from versus_private.adventure_coin_events e
 join (values ('aventura:guardiana:duelo',0,9),('aventura:mago_desierto:duelo',1,9),('aventura:nimbus_cumbres:duelo',2,9),('aventura:nivor_cero_absoluto:duelo',3,9),('aventura:azrak_final:duelo',4,9),('aventura:kairos_bosque:duelo',0,1),('aventura:hombre_lobo:duelo',0,5),('aventura:calamo_desierto:duelo',1,5),('aventura:nivor_glacial:duelo',3,5),('aventura:shadow_primero:duelo',4,2))m(origin,world,mission) on m.origin=e.origin
 on conflict do nothing;
create or replace function versus_private.sync_game_wallet(p_legacy jsonb,p_events jsonb,p_equipped jsonb,p_match_id uuid)
returns jsonb language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid(); w versus_private.game_wallets; e jsonb; ids uuid[]:='{}';
 n integer; mission_world integer; mission_index integer; imported integer; skin text; char_key text; accepted jsonb:='{}';
begin
 if u is null then raise exception 'Iniciá sesión para guardar tus monedas.'; end if;
 if jsonb_typeof(coalesce(p_events,'[]'))<>'array' or jsonb_array_length(coalesce(p_events,'[]'))>100 then raise exception 'Lista de recompensas inválida.'; end if;
 insert into versus_private.game_wallets(user_id) values(u) on conflict do nothing;
 select * into w from versus_private.game_wallets where user_id=u for update;
 if not w.legacy_done then
  if p_legacy is not null then
   if jsonb_typeof(p_legacy->'owned')<>'array' or jsonb_array_length(p_legacy->'owned')>11
    or (p_legacy->>'coins')::numeric not between 0 and 9007199254740991
    or trunc((p_legacy->>'coins')::numeric)<>(p_legacy->>'coins')::numeric then raise exception 'Saldo anterior inválido.'; end if;
   insert into versus_private.wallet_imports(device_id,user_id) values((p_legacy->>'deviceId')::uuid,u) on conflict do nothing;
   get diagnostics imported=row_count;
   if imported=1 then
    w.coins:=w.coins+(p_legacy->>'coins')::bigint*case when p_legacy->>'currencyVersion'='2' then 1 else 10 end;
    select coalesce(array_agg(distinct s),'{}') into w.owned from jsonb_array_elements_text(p_legacy->'owned') s
     where s in ('aren-bosque','zafir-celestial','kairos-real','guardiana-otono','alba-lunar','shadow-carmesi','lobo-lunar','nimbus-aviador','nivor-boreal','azrak-eclipse','kalamo-astral');
    p_equipped:=coalesce(p_legacy->'equipped','{}');
   end if;
  end if;
  w.legacy_done:=true;w.revision:=w.revision+1;
 end if;
 for e in select value from jsonb_array_elements(coalesce(p_events,'[]')) loop
  if (e->>'amount')::integer not in (50,100,300) or coalesce(e->>'origin','') !~ '^aventura:[a-zA-Z0-9_:]+$'
    or length(e->>'origin')>150 then raise exception 'Recompensa de aventura inválida.'; end if;
  insert into versus_private.adventure_coin_events(user_id,event_id,amount,origin)
   values(u,(e->>'id')::uuid,(e->>'amount')::integer,e->>'origin') on conflict do nothing;
  get diagnostics n=row_count;
  if n=1 and e->>'origin' ~ '^aventura:[0-4]:[0-9]:mision$' then
   mission_world:=split_part(e->>'origin',':',2)::integer;
   mission_index:=split_part(e->>'origin',':',3)::integer;
   if (e->>'amount')::integer<>(case when mission_index=9 then 300 else 50 end) then raise exception 'Recompensa de misión inválida.';end if;
   insert into versus_private.adventure_mission_claims(user_id,world,mission) values(u,mission_world,mission_index) on conflict do nothing;
   get diagnostics n=row_count;
  end if;
  if n=1 then w.coins:=w.coins+(e->>'amount')::integer;w.revision:=w.revision+1;end if;
  ids:=array_append(ids,(e->>'id')::uuid);
 end loop;
 if not exists(select 1 from versus_private.game_admins where user_id=u and union_enabled) then
  w.owned:=array_remove(w.owned,'aren-union');
  if w.equipped->>'explorador'='aren-union' then w.equipped:=w.equipped-'explorador';w.revision:=w.revision+1;end if;
 end if;
 if p_equipped is not null then
  if jsonb_typeof(p_equipped)<>'object' then raise exception 'Trajes inválidos.'; end if;
  for char_key,skin in select key,value from jsonb_each_text(p_equipped) loop
   if skin=any(w.owned) and (char_key,skin) in (('explorador','aren-union'),('explorador','aren-bosque'),('mago','zafir-celestial'),('kairos','kairos-real'),('guardiana','guardiana-otono'),('guardian_alba','alba-lunar'),('t_shadow','shadow-carmesi'),('hombre_lobo','lobo-lunar'),('dragon','nimbus-aviador'),('dragon_hielo','nivor-boreal'),('azrak','azrak-eclipse'),('kalamo','kalamo-astral')) then
    accepted:=accepted||jsonb_build_object(char_key,skin);
   end if;
  end loop;
  if w.equipped<>accepted then w.equipped:=accepted;w.revision:=w.revision+1;end if;
 end if;
 update versus_private.game_wallets set coins=w.coins,owned=w.owned,equipped=w.equipped,legacy_done=w.legacy_done,revision=w.revision where user_id=u;
 return jsonb_build_object('currencyVersion',2,'userId',u,'coins',w.coins,'owned',w.owned,'equipped',w.equipped,'revision',w.revision,'acknowledged',ids,
  'missionClaims',(select coalesce(jsonb_agg('aventura:'||world||':'||mission||':mision'),'[]'::jsonb) from versus_private.adventure_mission_claims where user_id=u),
  'admin',exists(select 1 from versus_private.game_admins where user_id=u),
  'adminUnion',exists(select 1 from versus_private.game_admins where user_id=u and union_enabled),
  'reward',(select jsonb_build_object('matchId',match_id,'amount',amount,'outcome',outcome) from versus_private.coin_rewards where user_id=u and match_id=p_match_id));
end $$;
create or replace function versus_private.record_coin_reward() returns trigger
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
   case when m.winner_id is null then 50 when m.winner_id=p.user_id then 100 else 30 end,
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
create or replace function versus_private.purchase_game_costume(p_skin text)
returns jsonb language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid();w versus_private.game_wallets;cost integer;
begin
 if u is null then raise exception 'Iniciá sesión para comprar.';end if;
 cost:=case p_skin when 'aren-bosque' then 2000 when 'zafir-celestial' then 2500 when 'kairos-real' then 3000 when 'guardiana-otono' then 1500 when 'alba-lunar' then 2000 when 'shadow-carmesi' then 2500 when 'lobo-lunar' then 2000 when 'nimbus-aviador' then 1500 when 'nivor-boreal' then 2500 when 'azrak-eclipse' then 2500 when 'kalamo-astral' then 2000 else null end;
 if cost is null then raise exception 'Este traje no está disponible.';end if;
 select * into w from versus_private.game_wallets where user_id=u for update;
 if not found or not w.legacy_done then raise exception 'Sincronizá tus monedas antes de comprar.';end if;
 if not (p_skin=any(w.owned)) then
  if w.coins<cost then raise exception 'Te faltan % monedas.',cost-w.coins;end if;
  update versus_private.game_wallets set coins=coins-cost,owned=array_append(owned,p_skin),revision=revision+1 where user_id=u;
 end if;
 return versus_private.sync_game_wallet(null,'[]',null,null);
end $$;
create or replace function versus_private.game_characters(p_action text,p_character text)
returns jsonb language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid(); inv versus_private.character_inventory; cost integer; wallet jsonb;
begin
 if u is null then raise exception 'Iniciá sesión para comprar personajes.'; end if;
 if p_action is null or p_action not in ('sync','purchase') then raise exception 'Acción inválida.'; end if;
 cost:=case p_character when 'hombre_lobo' then 2000 when 'kairos' then 2500 when 'kalamo' then 3000 when 'guardian_alba' then 3000 when 't_shadow' then 3500 else null end;
 if p_action='purchase' and cost is null then raise exception 'Personaje no disponible.'; end if;
 wallet:=versus_private.sync_game_wallet(null,'[]'::jsonb,null,null);
 insert into versus_private.character_inventory(user_id) values(u) on conflict do nothing;
 select * into inv from versus_private.character_inventory where user_id=u for update;
 if p_action='purchase' and not(p_character=any(inv.owned)) then
  update versus_private.game_wallets set coins=coins-cost,revision=revision+1 where user_id=u and coins>=cost;
  if not found then raise exception 'No tenés suficientes monedas para este personaje.'; end if;
  inv.owned:=array_append(inv.owned,p_character);inv.revision:=inv.revision+1;
  update versus_private.character_inventory set owned=inv.owned,revision=inv.revision where user_id=u;
  wallet:=versus_private.sync_game_wallet(null,'[]'::jsonb,null,null);
 end if;
 return wallet || jsonb_build_object('characters',jsonb_build_object('userId',u,'owned',inv.owned,'revision',inv.revision));
end $$;
create or replace function versus_private.profile_backgrounds(p_action text,p_background text,p_legacy_worlds integer)
returns jsonb language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid(); inv versus_private.profile_background_inventory;
 old_owned text[]; old_equipped text; cost integer; worlds integer:=0; points bigint;
begin
 if u is null then raise exception 'Iniciá sesión para guardar tus fondos.'; end if;
 if p_action is null or p_action not in ('sync','purchase','equip') then raise exception 'Acción de fondo inválida.'; end if;
 if p_legacy_worlds is null or p_legacy_worlds not between 0 and 5 then raise exception 'Progreso anterior inválido.'; end if;
 if p_action in ('purchase','equip') and (p_background is null or p_background not in ('bosque','desierto','zafir','cumbres','hielo','azrak')) then raise exception 'Fondo no disponible.'; end if;
 -- All callers take the existing wallet lock first, including costume purchases.
 perform versus_private.sync_game_wallet(null,'[]'::jsonb,null,null);
 insert into versus_private.profile_background_inventory(user_id) values(u) on conflict do nothing;
 select * into inv from versus_private.profile_background_inventory where user_id=u for update;
 old_owned:=inv.owned; old_equipped:=inv.equipped;
 -- Preserve offline Adventure achievements once, as the game already does for
 -- legacy coins and frames. This is not an anti-cheat attestation of local play.
 if not inv.legacy_done then worlds:=p_legacy_worlds; end if;
 if worlds>=3 or exists(select 1 from versus_private.adventure_coin_events where user_id=u and origin in ('aventura:nimbus_cumbres:duelo','aventura:2:9:mision')) then
  if not ('cumbres'=any(inv.owned)) then inv.owned:=array_append(inv.owned,'cumbres'); end if;
 end if;
 if worlds>=4 or exists(select 1 from versus_private.adventure_coin_events where user_id=u and origin in ('aventura:nivor_cero_absoluto:duelo','aventura:3:9:mision')) then
  if not ('hielo'=any(inv.owned)) then inv.owned:=array_append(inv.owned,'hielo'); end if;
 end if;
 -- after_points preserves a genuinely reached rank even after a later loss.
 select greatest(coalesce(sum(r.points),0),coalesce(max(r.after_points),0)) into points
 from versus_private.ranked_results r where r.user_id=u;
 if points>=240 and not ('azrak'=any(inv.owned)) then inv.owned:=array_append(inv.owned,'azrak'); end if;
 if p_action='purchase' then
  cost:=case p_background when 'desierto' then 1000 when 'zafir' then 1500 else null end;
  if cost is null then raise exception 'Este fondo se consigue mediante un logro.'; end if;
  if not (p_background=any(inv.owned)) then
   update versus_private.game_wallets set coins=coins-cost,revision=revision+1 where user_id=u and coins>=cost;
   if not found then raise exception 'No tenés suficientes monedas para este fondo.'; end if;
   inv.owned:=array_append(inv.owned,p_background);
  end if;
 elsif p_action='equip' then
  if not (p_background=any(inv.owned)) then raise exception 'Primero conseguí este fondo.'; end if;
  inv.equipped:=p_background;
 end if;
 if inv.owned<>old_owned or inv.equipped<>old_equipped or not inv.legacy_done then inv.revision:=inv.revision+1; end if;
 update versus_private.profile_background_inventory set owned=inv.owned,equipped=inv.equipped,revision=inv.revision,legacy_done=true where user_id=u;
 return versus_private.sync_game_wallet(null,'[]'::jsonb,null,null) || jsonb_build_object('backgrounds',jsonb_build_object('userId',u,'owned',inv.owned,'equipped',inv.equipped,'revision',inv.revision));
end $$;

-- Old builds must update before they can send/interpret currency amounts.
create or replace function public.sync_game_wallet(p_legacy jsonb default null,p_events jsonb default '[]',p_equipped jsonb default null,p_match_id uuid default null)
returns jsonb language plpgsql security invoker set search_path='' as $$begin raise exception 'Actualizá el juego para sincronizar tus monedas.';end$$;
create function public.sync_game_wallet_v2(p_legacy jsonb default null,p_events jsonb default '[]',p_equipped jsonb default null,p_match_id uuid default null)
returns jsonb language sql security invoker set search_path='' as $$select versus_private.sync_game_wallet(p_legacy,p_events,p_equipped,p_match_id)$$;
revoke all on function public.sync_game_wallet_v2(jsonb,jsonb,jsonb,uuid) from public,anon,authenticated;
grant execute on function public.sync_game_wallet_v2(jsonb,jsonb,jsonb,uuid) to authenticated;
