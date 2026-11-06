-- DRAFT v387. Install only AFTER the four reviewed security migrations.
-- No Auth/account or legacy permission updates. No Google purchase is granted.
create table versus_private.aren_entitlements (
 user_id uuid not null references auth.users(id) on delete cascade,
 product text not null default 'aren-union' check(product='aren-union'),
 source text not null check(source in ('developer_trial','legacy_trial','google_play_purchase')),
 scope text not null default 'character.aren_five_crystals.playtest'
  check(scope in ('character.aren_five_crystals.playtest','character.aren_five_crystals.purchase')),
 enabled boolean not null default true,
 granted_at timestamptz not null default now(),
 authorized_by text not null,
 expires_at timestamptz, revoked_at timestamptz,
 external_reference text unique,
 primary key(user_id,product,source),
 check((source='google_play_purchase' and scope='character.aren_five_crystals.purchase' and external_reference is not null)
    or (source in ('developer_trial','legacy_trial') and scope='character.aren_five_crystals.playtest' and external_reference is null))
);
alter table versus_private.aren_entitlements enable row level security;
revoke all on versus_private.aren_entitlements from public,anon,authenticated,service_role;

-- Preserve every old trial (including the unidentified anonymous account).
-- This table is historical after transition and never grants new entitlements.
insert into versus_private.aren_entitlements(user_id,source,enabled,granted_at,authorized_by)
 select user_id,'legacy_trial',union_enabled,activated_at,'v387:preserve_existing_trial'
 from versus_private.game_admins;

-- Private projection shared by wallet, room display, Versus and Adventure rules.
-- Owner-only view over an RLS-protected private table. Never grant API access.
create view versus_private.aren_access as
 select user_id,bool_or(enabled) union_enabled from versus_private.aren_entitlements
 where revoked_at is null and (expires_at is null or expires_at>now()) group by user_id;
revoke all on versus_private.aren_access from public,anon,authenticated,service_role;

-- Replace only known consumers; abort if a future definition changes the scope.
do $consumers$
declare f record; body text; count_ integer:=0;
begin
 for f in select p.oid,p.proname from pg_proc p join pg_namespace n on n.oid=p.pronamespace
  where n.nspname='versus_private' and p.proname in
   ('sync_game_wallet','get_versus_room_costumes','activate_versus_ability','play_versus_letter','adventure_duel_ability')
 loop
  body:=pg_get_functiondef(f.oid);
  if position('versus_private.game_admins' in body)=0 then raise exception 'Unexpected Aren consumer definition: %',f.proname;end if;
  body:=replace(body,'versus_private.game_admins','versus_private.aren_access');
  if f.proname='sync_game_wallet' then
   body:=replace(body,'''admin'',exists(select 1 from versus_private.aren_access where user_id=u)',
     '''admin'',false,''arenTrial'',exists(select 1 from versus_private.aren_entitlements where user_id=u and source in (''developer_trial'',''legacy_trial'') and revoked_at is null and (expires_at is null or expires_at>now()))');
   if position('''arenTrial''' in body)=0 then raise exception 'Unexpected wallet response';end if;
   -- Reconcile server-authorized ownership, including future verified purchases.
   body:=replace(body,'if not exists(select 1 from versus_private.aren_access where user_id=u and union_enabled) then',
    'if exists(select 1 from versus_private.aren_access where user_id=u and union_enabled) then
      if not (''aren-union''=any(w.owned)) then w.owned:=array_append(w.owned,''aren-union'');w.revision:=w.revision+1;end if;
     else');
  end if;
  execute body;count_:=count_+1;
 end loop;
 if count_<>5 then raise exception 'Missing pending security migration or Aren consumer';end if;
end $consumers$;

-- Retire both layers, so an old client or a direct call cannot use the secret.
create or replace function versus_private.activate_game_admin(p_code text) returns jsonb
language plpgsql security definer set search_path='' as $$begin
 raise exception 'La activación por código fue retirada.' using errcode='42501';
end $$;
revoke all on function versus_private.activate_game_admin(text),public.activate_game_admin(text) from public,anon,authenticated,service_role;

create function versus_private.set_aren_trial_access(p_enabled boolean) returns jsonb
language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid();
begin
 if u is null or p_enabled is null then raise exception 'Permiso de prueba requerido.' using errcode='42501';end if;
 -- Serialize equipment and entitlement updates in the same order as wallet RPCs.
 perform versus_private.sync_game_wallet(null,'[]',null,null);
 if not exists(select 1 from versus_private.aren_entitlements where user_id=u
  and source in ('developer_trial','legacy_trial') and revoked_at is null and (expires_at is null or expires_at>now())) then
  raise exception 'Permiso de prueba requerido.' using errcode='42501';
 end if;
 if exists(select 1 from public.versus_matches m join public.versus_match_players p on p.match_id=m.id
  where p.user_id=u and m.status='playing' and m.deadline_at>now()) then
  raise exception 'Terminá el duelo antes de cambiar el acceso a Aren Unión.';
 end if;
 update versus_private.aren_entitlements set enabled=p_enabled where user_id=u
  and source in ('developer_trial','legacy_trial') and revoked_at is null and (expires_at is null or expires_at>now());
 if p_enabled then
  update versus_private.game_wallets set equipped=equipped||jsonb_build_object('explorador','aren-union'),revision=revision+1 where user_id=u;
 end if;
 return versus_private.sync_game_wallet(null,'[]',null,null);
end $$;
revoke all on function versus_private.set_aren_trial_access(boolean) from public,anon,authenticated,service_role;
grant execute on function versus_private.set_aren_trial_access(boolean) to authenticated;
create function public.set_aren_trial_access(p_enabled boolean) returns jsonb
language sql security invoker set search_path='' as $$select versus_private.set_aren_trial_access(p_enabled)$$;
revoke all on function public.set_aren_trial_access(boolean) from public,anon,authenticated,service_role;
grant execute on function public.set_aren_trial_access(boolean) to authenticated;

-- Compatibility for old installed clients, with the SAME scoped authorization.
create or replace function versus_private.set_admin_union_access(p_enabled boolean) returns jsonb
language sql security invoker set search_path='' as $$select versus_private.set_aren_trial_access(p_enabled)$$;

-- No purchase-grant endpoint exists yet. A future trusted Google verifier must
-- validate package/product/state/account/token, enforce uniqueness and handle
-- revocations before writing source=google_play_purchase. All API roles denied.
notify pgrst,'reload schema';
