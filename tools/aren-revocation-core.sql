-- Canonical authorization. Compatibility flags never grant access by themselves.
create or replace function versus_private.has_aren_union_access(p_user uuid)
returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from versus_private.aren_entitlements e
 where e.user_id=p_user and e.product='aren-union' and e.enabled and e.revoked_at is null
 and (e.expires_at is null or e.expires_at>now())
 and (e.source in ('developer_trial','legacy_trial') or
 (e.source='google_play_purchase' and exists(select 1 from versus_private.aren_play_receipts r
 where r.user_id=e.user_id and r.state='verified' and e.external_reference='play:'||r.token_hash))))
$$;
revoke all on function versus_private.has_aren_union_access(uuid) from public,anon,authenticated;
create or replace view versus_private.aren_access as
select user_id,versus_private.has_aren_union_access(user_id) as union_enabled
from versus_private.aren_entitlements group by user_id;

create or replace function versus_private.refresh_aren_union_access(p_user uuid)
returns void language plpgsql security definer set search_path='' as $$
declare allowed_ boolean; trial_ boolean;
begin
 perform pg_advisory_xact_lock(hashtextextended('account-v3:'||p_user::text,0));
 allowed_:=versus_private.has_aren_union_access(p_user);
 select exists(select 1 from versus_private.aren_entitlements where user_id=p_user and product='aren-union'
 and source in ('developer_trial','legacy_trial') and enabled and revoked_at is null
 and (expires_at is null or expires_at>now())) into trial_;
 update versus_private.game_admins set union_enabled=trial_ where user_id=p_user and union_enabled is distinct from trial_;
 update versus_private.game_wallets set
 owned=case when allowed_ then array_append(owned,'aren-union') else array_remove(owned,'aren-union') end,
 equipped=case when not allowed_ and equipped->>'explorador'='aren-union' then equipped-'explorador' else equipped end,
 revision=revision+1
 where user_id=p_user and (allowed_<>('aren-union'=any(owned)) or (not allowed_ and equipped->>'explorador'='aren-union'));
end $$;
revoke all on function versus_private.refresh_aren_union_access(uuid) from public,anon,authenticated;

create or replace function versus_private.aren_union_access_changed()
returns trigger language plpgsql security definer set search_path='' as $$
declare uid_ uuid:=case when TG_OP='DELETE' then old.user_id else new.user_id end;
begin
 -- Auth cascades already remove this account's projections; do not recreate them.
 if not exists(select 1 from auth.users where id=uid_) then return null;end if;
 perform versus_private.refresh_aren_union_access(uid_);
 insert into player_state_private.account_versions(user_id,revision) values(uid_,1)
 on conflict(user_id) do update set revision=player_state_private.account_versions.revision+1;
 if TG_OP='UPDATE' and old.user_id is distinct from new.user_id and exists(select 1 from auth.users where id=old.user_id) then
  perform versus_private.refresh_aren_union_access(old.user_id);
  insert into player_state_private.account_versions(user_id,revision) values(old.user_id,1)
  on conflict(user_id) do update set revision=player_state_private.account_versions.revision+1;
 end if;
 return null;
end $$;
revoke all on function versus_private.aren_union_access_changed() from public,anon,authenticated;
create trigger aren_union_entitlement_changed after insert or update or delete on versus_private.aren_entitlements
for each row execute function versus_private.aren_union_access_changed();
create trigger aren_union_receipt_changed after insert or update or delete on versus_private.aren_play_receipts
for each row execute function versus_private.aren_union_access_changed();

create or replace function versus_private.set_aren_trial_access(p_enabled boolean)
returns jsonb language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid();
begin
 if u is null or p_enabled is null then raise exception 'Permiso de prueba requerido.' using errcode='42501';end if;
 perform pg_advisory_xact_lock(hashtextextended('account-v3:'||u::text,0));
 if not exists(select 1 from versus_private.aren_entitlements where user_id=u and product='aren-union'
 and source in ('developer_trial','legacy_trial') and revoked_at is null and (expires_at is null or expires_at>now())) then
  raise exception 'Permiso de prueba requerido.' using errcode='42501';end if;
 if exists(select 1 from public.versus_matches m join public.versus_match_players p on p.match_id=m.id
 where p.user_id=u and m.status='playing' and m.deadline_at>now()) then
  raise exception 'Terminá el duelo antes de cambiar el acceso a Aren Unión.';end if;
 update versus_private.aren_entitlements set enabled=p_enabled where user_id=u and product='aren-union'
 and source in ('developer_trial','legacy_trial') and revoked_at is null and (expires_at is null or expires_at>now());
 perform versus_private.refresh_aren_union_access(u);
 if p_enabled then update versus_private.game_wallets set equipped=equipped||jsonb_build_object('explorador','aren-union'),revision=revision+1 where user_id=u;end if;
 return versus_private.sync_game_wallet(null,'[]',null,null);
end $$;
revoke all on function versus_private.set_aren_trial_access(boolean) from public,anon;
grant execute on function versus_private.set_aren_trial_access(boolean) to authenticated;
