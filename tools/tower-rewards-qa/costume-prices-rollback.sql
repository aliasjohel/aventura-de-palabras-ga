-- Run inside a transaction. Synthetic rows are rolled back by a subtransaction.
create temporary table costume_price_qa_result(payload jsonb) on commit drop;
do $qa$
declare u uuid:=gen_random_uuid();attempt_ uuid;row_ record;result_ jsonb;remaining_ bigint:=20000;world_ integer;
begin
 begin
  insert into auth.users(id,email,email_confirmed_at,is_anonymous) values(u,'shop-qa-'||u::text||'@example.invalid',now(),false);
  perform set_config('request.jwt.claim.sub',u::text,true);
  perform set_config('request.jwt.claims',jsonb_build_object('sub',u,'role','authenticated','is_anonymous',false)::text,true);
  insert into versus_private.game_wallets(user_id,coins,legacy_done) values(u,remaining_,true);
  for row_ in select * from (values ('aren-bosque',1000,'explorador'),
('zafir-celestial',1500,'mago'),
('kairos-real',1500,'kairos'),
('guardiana-otono',1000,'guardiana'),
('alba-lunar',1000,'guardian_alba'),
('shadow-carmesi',1500,'t_shadow'),
('lobo-lunar',1000,'hombre_lobo'),
('nimbus-aviador',1000,'dragon'),
('nivor-boreal',1500,'dragon_hielo'),
('azrak-eclipse',1500,'azrak'),
('kalamo-astral',1500,'kalamo')) as p(skin,cost,character) loop
   if row_.character<>'explorador' then
    begin
     perform public.purchase_game_costume(row_.skin);
     raise exception 'Missing character was allowed: %',row_.skin;
    exception when insufficient_privilege then null;end;
   end if;
  end loop;
  if (select coins from versus_private.game_wallets where user_id=u)<>remaining_ then raise exception 'Blocked purchase changed balance';end if;
  insert into versus_private.character_inventory(user_id,owned) values(u,array['hombre_lobo','kairos','kalamo','guardian_alba','t_shadow']);
  result_:=public.game_characters('sync',null);
  if jsonb_array_length(result_->'characters'->'unlocked')<>6 then raise exception 'Verified unlock inventory mismatch';end if;
  for row_ in select * from (values ('aren-bosque',1000,'explorador'),
('zafir-celestial',1500,'mago'),
('kairos-real',1500,'kairos'),
('guardiana-otono',1000,'guardiana'),
('alba-lunar',1000,'guardian_alba'),
('shadow-carmesi',1500,'t_shadow'),
('lobo-lunar',1000,'hombre_lobo'),
('nimbus-aviador',1000,'dragon'),
('nivor-boreal',1500,'dragon_hielo'),
('azrak-eclipse',1500,'azrak'),
('kalamo-astral',1500,'kalamo')) as p(skin,cost,character) loop
   if not versus_private.tower_character_allowed(u,row_.character) then continue;end if;
   remaining_:=remaining_-row_.cost;result_:=public.purchase_game_costume(row_.skin);
   if (result_->>'coins')::bigint<>remaining_ then raise exception 'Wrong price: %',row_.skin;end if;
   result_:=public.purchase_game_costume(row_.skin);
   if (result_->>'coins')::bigint<>remaining_ then raise exception 'Duplicate debit: %',row_.skin;end if;
  end loop;
  if has_function_privilege('anon','public.purchase_game_costume(text)','EXECUTE') or not has_function_privilege('authenticated','public.purchase_game_costume(text)','EXECUTE') then raise exception 'RPC permission mismatch';end if;
  raise exception using errcode='ZX001',message='Rollback synthetic costume QA';
 exception when sqlstate 'ZX001' then null;end;
 if exists(select 1 from auth.users where id=u) then raise exception 'Synthetic user persisted';end if;
 insert into costume_price_qa_result values(jsonb_build_object('passed',true,'pricesChecked',6,'blockedCharacterChecks',10,'repeatPurchasesChecked',6,'verifiedUnlocks',6,'syntheticRowsPersisted',false));
end $qa$;
select payload from costume_price_qa_result;
