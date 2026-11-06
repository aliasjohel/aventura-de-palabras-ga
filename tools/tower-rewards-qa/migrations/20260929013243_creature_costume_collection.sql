-- Creature costumes: Hombre Lobo, Nimbus and Nivor. Earned coins only.
-- Apply after earnable_costume_collection. Does not alter balances or existing purchases.
begin;
create or replace function versus_private.sync_game_wallet(p_legacy jsonb,p_events jsonb,p_equipped jsonb,p_match_id uuid)
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
   if jsonb_typeof(p_legacy->'owned')<>'array' or jsonb_array_length(p_legacy->'owned')>9
    or (p_legacy->>'coins')::numeric not between 0 and 9007199254740991
    or trunc((p_legacy->>'coins')::numeric)<>(p_legacy->>'coins')::numeric then raise exception 'Saldo anterior inválido.'; end if;
   insert into versus_private.wallet_imports(device_id,user_id) values((p_legacy->>'deviceId')::uuid,u) on conflict do nothing;
   get diagnostics imported=row_count;
   if imported=1 then
    w.coins:=w.coins+(p_legacy->>'coins')::bigint;
    select coalesce(array_agg(distinct s),'{}') into w.owned from jsonb_array_elements_text(p_legacy->'owned') s
     where s in ('aren-bosque','zafir-celestial','kairos-real','guardiana-otono','alba-lunar','shadow-carmesi','lobo-lunar','nimbus-aviador','nivor-boreal');
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
   if skin=any(w.owned) and (char_key,skin) in (('explorador','aren-bosque'),('mago','zafir-celestial'),('kairos','kairos-real'),('guardiana','guardiana-otono'),('guardian_alba','alba-lunar'),('t_shadow','shadow-carmesi'),('hombre_lobo','lobo-lunar'),('dragon','nimbus-aviador'),('dragon_hielo','nivor-boreal')) then
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
create or replace function public.sync_game_wallet(p_legacy jsonb default null,p_events jsonb default '[]',p_equipped jsonb default null,p_match_id uuid default null)
returns jsonb language sql security invoker set search_path='' as $$ select versus_private.sync_game_wallet(p_legacy,p_events,p_equipped,p_match_id) $$;
revoke all on function public.sync_game_wallet(jsonb,jsonb,jsonb,uuid) from public,anon,authenticated;
grant execute on function public.sync_game_wallet(jsonb,jsonb,jsonb,uuid) to authenticated;

create or replace function versus_private.purchase_game_costume(p_skin text)
returns jsonb language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid();w versus_private.game_wallets;cost integer;
begin
 if u is null then raise exception 'Iniciá sesión para comprar.';end if;
 cost:=case p_skin when 'aren-bosque' then 200 when 'zafir-celestial' then 250 when 'kairos-real' then 300 when 'guardiana-otono' then 150 when 'alba-lunar' then 200 when 'shadow-carmesi' then 250 when 'lobo-lunar' then 200 when 'nimbus-aviador' then 150 when 'nivor-boreal' then 250 else null end;
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
create or replace function public.purchase_game_costume(p_skin text) returns jsonb
language sql security invoker set search_path='' as $$ select versus_private.purchase_game_costume(p_skin) $$;
revoke all on function public.purchase_game_costume(text) from public,anon,authenticated;
grant execute on function public.purchase_game_costume(text) to authenticated;

notify pgrst, 'reload schema';
commit;
