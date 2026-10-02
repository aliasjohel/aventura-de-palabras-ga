-- Administrator-only Aren Union trial. No payment or coin purchase is recorded.
begin;
create table versus_private.game_admins (
 user_id uuid primary key references auth.users(id) on delete cascade,
 union_enabled boolean not null default false,
 activated_at timestamptz not null default now()
);
create table versus_private.game_admin_attempts (
 user_id uuid primary key references auth.users(id) on delete cascade,
 attempts integer not null default 0,
 window_started timestamptz not null default now()
);
alter table versus_private.game_admins enable row level security;
alter table versus_private.game_admin_attempts enable row level security;
revoke all on versus_private.game_admins,versus_private.game_admin_attempts from public,anon,authenticated;

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
   if jsonb_typeof(p_legacy->'owned')<>'array' or jsonb_array_length(p_legacy->'owned')>11
    or (p_legacy->>'coins')::numeric not between 0 and 9007199254740991
    or trunc((p_legacy->>'coins')::numeric)<>(p_legacy->>'coins')::numeric then raise exception 'Saldo anterior inválido.'; end if;
   insert into versus_private.wallet_imports(device_id,user_id) values((p_legacy->>'deviceId')::uuid,u) on conflict do nothing;
   get diagnostics imported=row_count;
   if imported=1 then
    w.coins:=w.coins+(p_legacy->>'coins')::bigint;
    select coalesce(array_agg(distinct s),'{}') into w.owned from jsonb_array_elements_text(p_legacy->'owned') s
     where s in ('aren-bosque','zafir-celestial','kairos-real','guardiana-otono','alba-lunar','shadow-carmesi','lobo-lunar','nimbus-aviador','nivor-boreal','azrak-eclipse','kalamo-astral');
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
 return jsonb_build_object('userId',u,'coins',w.coins,'owned',w.owned,'equipped',w.equipped,'revision',w.revision,'acknowledged',ids,
  'admin',exists(select 1 from versus_private.game_admins where user_id=u),
  'adminUnion',exists(select 1 from versus_private.game_admins where user_id=u and union_enabled),
  'reward',(select jsonb_build_object('matchId',match_id,'amount',amount,'outcome',outcome) from versus_private.coin_rewards where user_id=u and match_id=p_match_id));
end $$;
revoke all on function versus_private.sync_game_wallet(jsonb,jsonb,jsonb,uuid) from public,anon,authenticated;
grant execute on function versus_private.sync_game_wallet(jsonb,jsonb,jsonb,uuid) to authenticated;
create or replace function public.sync_game_wallet(p_legacy jsonb default null,p_events jsonb default '[]',p_equipped jsonb default null,p_match_id uuid default null)
returns jsonb language sql security invoker set search_path='' as $$ select versus_private.sync_game_wallet(p_legacy,p_events,p_equipped,p_match_id) $$;
revoke all on function public.sync_game_wallet(jsonb,jsonb,jsonb,uuid) from public,anon,authenticated;
grant execute on function public.sync_game_wallet(jsonb,jsonb,jsonb,uuid) to authenticated;


create function versus_private.set_admin_union_access(p_enabled boolean) returns jsonb
language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid();
begin
 if u is null or not exists(select 1 from versus_private.game_admins where user_id=u) then
  raise exception 'Este desbloqueo requiere tu código personal de administrador.';
 end if;
 if exists(select 1 from public.versus_matches m join public.versus_match_players p on p.match_id=m.id
  where p.user_id=u and m.status='playing' and m.deadline_at>now()) then
  raise exception 'Terminá el duelo antes de cambiar el acceso a Aren Unión.';
 end if;
 perform versus_private.sync_game_wallet(null,'[]',null,null);
 update versus_private.game_admins set union_enabled=coalesce(p_enabled,false) where user_id=u;
 if p_enabled then
  update versus_private.game_wallets set
   owned=case when 'aren-union'=any(owned) then owned else array_append(owned,'aren-union') end,
   equipped=equipped||jsonb_build_object('explorador','aren-union'),revision=revision+1 where user_id=u;
 else
  update versus_private.game_wallets set owned=array_remove(owned,'aren-union'),
   equipped=case when equipped->>'explorador'='aren-union' then equipped-'explorador' else equipped end,
   revision=revision+1 where user_id=u;
 end if;
 return versus_private.sync_game_wallet(null,'[]',null,null);
end $$;
revoke all on function versus_private.set_admin_union_access(boolean) from public,anon,authenticated;
grant execute on function versus_private.set_admin_union_access(boolean) to authenticated;
create function public.set_admin_union_access(p_enabled boolean) returns jsonb
language sql security invoker set search_path='' as $$select versus_private.set_admin_union_access(p_enabled)$$;
revoke all on function public.set_admin_union_access(boolean) from public,anon,authenticated;
grant execute on function public.set_admin_union_access(boolean) to authenticated;

create function versus_private.activate_game_admin(p_code text) returns jsonb
language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid(); a versus_private.game_admin_attempts; token text:=btrim(coalesce(p_code,'')); h text;
begin
 if u is null then raise exception 'Conectate para activar el acceso de administrador.';end if;
 insert into versus_private.game_admin_attempts(user_id) values(u) on conflict do nothing;
 select * into a from versus_private.game_admin_attempts where user_id=u for update;
 if a.window_started<now()-interval '15 minutes' then a.attempts:=0;a.window_started:=now();end if;
 if a.attempts>=6 then return jsonb_build_object('userId',u,'activationError','Demasiados intentos. Esperá 15 minutos antes de volver a probar.');end if;
 update versus_private.game_admin_attempts set attempts=a.attempts+1,window_started=a.window_started where user_id=u;
 if upper(regexp_replace(token,'[[:space:]-]','','g')) ~ '^[A-F0-9]{12}$' then token:=upper(regexp_replace(token,'[[:space:]-]','','g'));end if;
 h:=encode(sha256(convert_to(token,'UTF8')),'hex');
 if length(token)>256 or h not in ('425638c83a8fdbb0920472d04e2ef5f11897e6d69839c360231144c8a4fe7e2a','41c991eb6a66242c0454191244278183ce58cf4a6bcd372f799e4b9cc01886af') then
  return jsonb_build_object('userId',u,'activationError','Código incorrecto. Revisalo e intentá nuevamente.');
 end if;
 insert into versus_private.game_admins(user_id) values(u) on conflict do nothing;
 delete from versus_private.game_admin_attempts where user_id=u;
 return versus_private.set_admin_union_access(true);
end $$;
revoke all on function versus_private.activate_game_admin(text) from public,anon,authenticated;
grant execute on function versus_private.activate_game_admin(text) to authenticated;
create function public.activate_game_admin(p_code text) returns jsonb
language sql security invoker set search_path='' as $$select versus_private.activate_game_admin(p_code)$$;
revoke all on function public.activate_game_admin(text) from public,anon,authenticated;
grant execute on function public.activate_game_admin(text) to authenticated;

-- Cosmetics come from server ownership, never from a rival's broadcast payload.
create function versus_private.get_versus_room_costumes(p_room_id uuid) returns jsonb
language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid(); result jsonb;
begin
 if u is null or not public.is_versus_room_member(p_room_id) then raise exception 'No perteneces a esta sala.';end if;
 select coalesce(jsonb_object_agg(p.user_id,coalesce(w.equipped,'{}') -
  case when coalesce(w.equipped->>'explorador','')='aren-union'
   and not exists(select 1 from versus_private.game_admins a where a.user_id=p.user_id and a.union_enabled)
   then 'explorador' else '' end),'{}') into result
 from public.versus_players p left join versus_private.game_wallets w on w.user_id=p.user_id
 where p.room_id=p_room_id;
 return result;
end $$;
revoke all on function versus_private.get_versus_room_costumes(uuid) from public,anon,authenticated;
grant execute on function versus_private.get_versus_room_costumes(uuid) to authenticated;
create function public.get_versus_room_costumes(p_room_id uuid) returns jsonb
language sql security invoker set search_path='' as $$select versus_private.get_versus_room_costumes(p_room_id)$$;
revoke all on function public.get_versus_room_costumes(uuid) from public,anon,authenticated;
grant execute on function public.get_versus_room_costumes(uuid) to authenticated;

-- Keep the current hint, timing and charge rules; add only the authorized Union effect.
alter function public.activate_versus_ability(uuid) set schema versus_private;
alter function versus_private.activate_versus_ability(uuid) rename to activate_versus_ability_without_union;
revoke all on function versus_private.activate_versus_ability_without_union(uuid) from public,anon,authenticated;
create function versus_private.activate_versus_ability(p_room_id uuid) returns jsonb
language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid(); result jsonb; m uuid;
begin
 if u is null or not public.is_versus_room_member(p_room_id) then raise exception 'No perteneces a esta sala.';end if;
 result:=versus_private.activate_versus_ability_without_union(p_room_id);
 if result->'lastEvent'->>'type'='ability_used' and result->'lastEvent'->>'actorId'=u::text
  and result->'lastEvent'->>'character'='explorador'
  and exists(select 1 from versus_private.game_admins a join versus_private.game_wallets w on w.user_id=a.user_id
   where a.user_id=u and a.union_enabled and 'aren-union'=any(w.owned) and w.equipped->>'explorador'='aren-union') then
  select id into m from public.versus_matches where room_id=p_room_id;
  update public.versus_match_players set active_effect='roots',effect_expires_at=greatest(coalesce(effect_expires_at,now()),now()+interval '2 seconds'),updated_at=now()
   where match_id=m and user_id<>u and not finished;
  update public.versus_matches set last_event=last_event||jsonb_build_object('costume','aren-union','effect','union_discharge','milliseconds',2000),updated_at=now() where id=m;
  result:=public.get_versus_match_state(p_room_id);
 end if;
 return result;
end $$;
revoke all on function versus_private.activate_versus_ability(uuid) from public,anon,authenticated;
grant execute on function versus_private.activate_versus_ability(uuid) to authenticated;
create function public.activate_versus_ability(p_room_id uuid) returns jsonb
language sql security invoker set search_path='' as $$select versus_private.activate_versus_ability(p_room_id)$$;
revoke all on function public.activate_versus_ability(uuid) from public,anon,authenticated;
grant execute on function public.activate_versus_ability(uuid) to authenticated;

-- Enforce the block in the server letter endpoint and charge Union through real hits.
alter function public.play_versus_letter(uuid,text) set schema versus_private;
alter function versus_private.play_versus_letter(uuid,text) rename to play_versus_letter_without_union;
revoke all on function versus_private.play_versus_letter_without_union(uuid,text) from public,anon,authenticated;
create function versus_private.play_versus_letter(p_room_id uuid,p_letter text) returns jsonb
language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid();m public.versus_matches;me public.versus_match_players;result jsonb;delta integer;
begin
 if u is null or not public.is_versus_room_member(p_room_id) then raise exception 'No perteneces a esta sala.';end if;
 select * into m from public.versus_matches where room_id=p_room_id for update;
 if not found then raise exception 'La partida todavía no fue creada.';end if;
 select * into me from public.versus_match_players where match_id=m.id and user_id=u;
 if m.status='playing' and me.effect_expires_at>now()
  and me.active_effect in ('roots','black_hole','key_bounce','ice_screen','key_theft') then
  return public.get_versus_match_state(p_room_id);
 end if;
 result:=versus_private.play_versus_letter_without_union(p_room_id,p_letter);
 delta:=coalesce((result->'me'->>'scoreLetters')::integer,me.score_letters)-me.score_letters;
 if delta>0 and exists(select 1 from versus_private.game_admins a join versus_private.game_wallets w on w.user_id=a.user_id
   join public.versus_players p on p.user_id=a.user_id and p.room_id=p_room_id and p.character_key='explorador'
   where a.user_id=u and a.union_enabled and 'aren-union'=any(w.owned) and w.equipped->>'explorador'='aren-union') then
  update public.versus_match_players set ability_charge=least(8,ability_charge+delta) where match_id=m.id and user_id=u;
  result:=public.get_versus_match_state(p_room_id);
 end if;
 return result;
end $$;
revoke all on function versus_private.play_versus_letter(uuid,text) from public,anon,authenticated;
grant execute on function versus_private.play_versus_letter(uuid,text) to authenticated;
create function public.play_versus_letter(p_room_id uuid,p_letter text) returns jsonb
language sql security invoker set search_path='' as $$select versus_private.play_versus_letter(p_room_id,p_letter)$$;
revoke all on function public.play_versus_letter(uuid,text) from public,anon,authenticated;
grant execute on function public.play_versus_letter(uuid,text) to authenticated;
notify pgrst,'reload schema';
commit;
