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
    if p_legacy ? 'missionClaims' then
     if jsonb_typeof(p_legacy->'missionClaims')<>'array' or jsonb_array_length(p_legacy->'missionClaims')>50 then raise exception 'Misiones anteriores inválidas.';end if;
     insert into versus_private.adventure_mission_claims(user_id,world,mission)
      select u,split_part(origin,':',2)::integer,split_part(origin,':',3)::integer
      from jsonb_array_elements_text(p_legacy->'missionClaims') as origins(origin)
      where origin ~ '^aventura:[0-4]:[0-9]:mision$' on conflict do nothing;
    end if;
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
