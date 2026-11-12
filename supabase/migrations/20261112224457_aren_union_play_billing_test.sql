-- No purchases or entitlements are granted by this migration. Test checkout is OFF.
create table if not exists versus_private.aren_play_settings (
 singleton boolean primary key default true check(singleton),
 test_checkout_enabled boolean not null default false
);
insert into versus_private.aren_play_settings(singleton) values(true) on conflict do nothing;
create table if not exists versus_private.aren_play_testers (
 user_id uuid primary key references auth.users(id) on delete cascade,
 enabled boolean not null default false
);
create table if not exists versus_private.aren_play_receipts (
 token_hash text primary key check(token_hash ~ '^[a-f0-9]{64}$'),
 user_id uuid not null references auth.users(id) on delete cascade,
 package_name text not null check(package_name='com.gagames.aventura.experimental'),
 product_id text not null check(product_id='aren_union_permanent'),
 environment text not null default 'test' check(environment='test'),
 state text not null check(state in ('verified','revoked')),
 verified_at timestamptz not null default now(),
 revoked_at timestamptz,
 proof jsonb not null check(jsonb_typeof(proof)='object')
);
create index if not exists aren_play_receipts_owner on versus_private.aren_play_receipts(user_id,state);
alter table versus_private.aren_play_settings enable row level security;
alter table versus_private.aren_play_testers enable row level security;
alter table versus_private.aren_play_receipts enable row level security;
revoke all on versus_private.aren_play_settings,versus_private.aren_play_testers,versus_private.aren_play_receipts from public,anon,authenticated;

create or replace function versus_private.aren_play_status(p_user uuid)
returns jsonb language plpgsql stable security definer set search_path='' as $$
begin
 if (coalesce(auth.jwt()->>'role','')<>'service_role' and p_user is distinct from auth.uid()) or p_user is null
  or not exists(select 1 from auth.users where id=p_user and not coalesce(is_anonymous,true) and email_confirmed_at is not null)
 then raise exception 'Own verified account required' using errcode='42501';end if;
 return jsonb_build_object('userId',p_user,'productId','aren_union_permanent',
  'owned',exists(select 1 from versus_private.aren_play_receipts where user_id=p_user and state='verified'),
  'testOnly',true,'testAllowed',exists(select 1 from versus_private.aren_play_settings s
   join versus_private.aren_play_testers t on t.user_id=p_user where s.singleton and s.test_checkout_enabled and t.enabled));
end
$$;
revoke all on function versus_private.aren_play_status(uuid) from public,anon,authenticated;
grant execute on function versus_private.aren_play_status(uuid) to authenticated;

create or replace function public.aren_play_status()
returns jsonb language sql security invoker set search_path='' as $$select versus_private.aren_play_status(auth.uid())$$;
revoke all on function public.aren_play_status() from public,anon;
grant execute on function public.aren_play_status() to authenticated;

-- Only the backend service can submit Google-verified evidence. The client
-- cannot supply a successful purchase flag, a user ID or entitlement directly.
create or replace function public.aren_play_commit(p_user uuid,p_token_hash text,p_proof jsonb)
returns jsonb language plpgsql security definer set search_path='' as $$
declare prior versus_private.aren_play_receipts;item jsonb;active_token text;other_access boolean;w versus_private.game_wallets;
begin
 if coalesce(auth.jwt()->>'role','')<>'service_role' then raise exception 'Backend verification required' using errcode='42501';end if;
 if p_user is null or p_token_hash is null or p_token_hash!~'^[a-f0-9]{64}$' or p_proof is null or jsonb_typeof(p_proof)<>'object' or octet_length(p_proof::text)>16384 then raise exception 'Invalid proof' using errcode='22023';end if;
 if not exists(select 1 from auth.users where id=p_user and not coalesce(is_anonymous,true) and email_confirmed_at is not null) then raise exception 'Verified account required' using errcode='42501';end if;
 perform pg_advisory_xact_lock(hashtextextended('account-v3:'||p_user::text,0));
 perform pg_advisory_xact_lock(hashtextextended('aren-play:'||p_token_hash,0));
 select * into prior from versus_private.aren_play_receipts where token_hash=p_token_hash for update;
 if found and prior.user_id<>p_user then raise exception 'Purchase belongs to another game account' using errcode='42501';end if;
 if p_proof#>>'{purchaseStateContext,purchaseState}'='PURCHASED' and coalesce(p_proof#>>'{productLineItem,0,productOfferDetails,refundableQuantity}','1')<>'0' then
  if prior.state='revoked' then raise exception 'Purchase revoked' using errcode='42501';end if;
  if not exists(select 1 from versus_private.aren_play_settings s join versus_private.aren_play_testers t on t.user_id=p_user where s.singleton and s.test_checkout_enabled and t.enabled) then raise exception 'Test checkout disabled' using errcode='42501';end if;
  if p_proof#>>'{testPurchaseContext,fopType}' is distinct from 'TEST' or p_proof->>'acknowledgementState' is distinct from 'ACKNOWLEDGEMENT_STATE_ACKNOWLEDGED'
   or p_proof->>'obfuscatedExternalAccountId' is distinct from encode(sha256(convert_to('gagames.play.v1:com.gagames.aventura.experimental:'||p_user::text,'UTF8')),'hex')
   or jsonb_array_length(coalesce(p_proof->'productLineItem','[]'))<>1 then raise exception 'Unverified test purchase' using errcode='42501';end if;
  item:=p_proof->'productLineItem'->0;
  if item->>'productId' is distinct from 'aren_union_permanent' or item#>>'{productOfferDetails,quantity}' is distinct from '1'
   or item#>>'{productOfferDetails,refundableQuantity}' is distinct from '1' or item#>>'{productOfferDetails,consumptionState}' is distinct from 'CONSUMPTION_STATE_YET_TO_BE_CONSUMED'
   or item#>'{productOfferDetails,rentOfferDetails}' is not null or item#>'{productOfferDetails,preorderOfferDetails}' is not null then raise exception 'Wrong permanent product' using errcode='42501';end if;
  if prior.state='verified' then return versus_private.aren_play_status(p_user);end if;
  insert into versus_private.aren_play_receipts(token_hash,user_id,package_name,product_id,state,proof)
   values(p_token_hash,p_user,'com.gagames.aventura.experimental','aren_union_permanent','verified',p_proof);
 elsif p_proof#>>'{purchaseStateContext,purchaseState}'='CANCELLED' or p_proof#>>'{productLineItem,0,productOfferDetails,refundableQuantity}'='0' then
  if prior.token_hash is null then raise exception 'Unknown purchase' using errcode='42501';end if;
  update versus_private.aren_play_receipts set state='revoked',revoked_at=coalesce(revoked_at,now()),verified_at=now(),proof=p_proof where token_hash=p_token_hash;
 else raise exception 'Purchase not completed' using errcode='42501';end if;
 select token_hash into active_token from versus_private.aren_play_receipts where user_id=p_user and state='verified' order by verified_at desc limit 1;
 if active_token is not null then
  insert into versus_private.aren_entitlements(user_id,product,source,scope,enabled,authorized_by,external_reference)
   values(p_user,'aren-union','google_play_purchase','character.aren_five_crystals.purchase',true,'google-play-test-verifier','play:'||active_token)
   on conflict(user_id,product,source) do update set enabled=true,revoked_at=null,expires_at=null,external_reference=excluded.external_reference;
  insert into versus_private.aren_access(user_id,union_enabled) values(p_user,true) on conflict(user_id) do update set union_enabled=true;
  insert into versus_private.game_wallets(user_id,coins,owned,equipped,legacy_done,revision) values(p_user,0,array['aren-union'],'{}',true,1) on conflict(user_id) do nothing;
  update versus_private.game_wallets set owned=array_append(owned,'aren-union'),revision=revision+1 where user_id=p_user and not('aren-union'=any(owned));
 else
  update versus_private.aren_entitlements set enabled=false,revoked_at=coalesce(revoked_at,now()) where user_id=p_user and product='aren-union' and source='google_play_purchase';
  select exists(select 1 from versus_private.aren_entitlements where user_id=p_user and product='aren-union' and source<>'google_play_purchase' and enabled and revoked_at is null and (expires_at is null or expires_at>now()))
   or exists(select 1 from versus_private.game_admins where user_id=p_user and union_enabled) into other_access;
  if not other_access then
   update versus_private.aren_access set union_enabled=false where user_id=p_user and union_enabled;
   update versus_private.game_wallets set owned=array_remove(owned,'aren-union'),equipped=case when equipped->>'explorador'='aren-union' then equipped-'explorador' else equipped end,revision=revision+1
    where user_id=p_user and ('aren-union'=any(owned) or equipped->>'explorador'='aren-union');
  end if;
 end if;
 return versus_private.aren_play_status(p_user);
end $$;
revoke all on function public.aren_play_commit(uuid,text,jsonb) from public,anon,authenticated;
grant execute on function public.aren_play_commit(uuid,text,jsonb) to service_role;

create or replace function public.aren_play_receipt_owner(p_token_hash text)
returns uuid language plpgsql security definer set search_path='' as $$
begin
 if coalesce(auth.jwt()->>'role','')<>'service_role' then raise exception 'Backend required' using errcode='42501';end if;
 return (select user_id from versus_private.aren_play_receipts where token_hash=p_token_hash);
end $$;
revoke all on function public.aren_play_receipt_owner(text) from public,anon,authenticated;
grant execute on function public.aren_play_receipt_owner(text) to service_role;
