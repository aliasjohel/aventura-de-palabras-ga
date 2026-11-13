'use strict';
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..');
(async()=>{const runtime=await require('E:/Proyectos/Aventura-de-Palabras-i18n-stage2b/.local-developer/aren-champion-release/tools/postgres-qa/runtime.cjs').create(),db=await runtime.connect();let checks=0;
try{
await db.query(`create role anon;create role authenticated;create schema auth;create schema versus_private;create schema player_state_private;
create table auth.users(id uuid primary key);create function auth.uid() returns uuid language sql as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
create table versus_private.game_wallets(user_id uuid primary key,coins bigint default 0,owned text[] default '{}',equipped jsonb default '{}',revision bigint default 0);

create table versus_private.game_admins(user_id uuid primary key,union_enabled boolean default false);
create table versus_private.aren_entitlements(user_id uuid,product text default 'aren-union',source text,enabled boolean default true,revoked_at timestamptz,expires_at timestamptz,external_reference text);
create view versus_private.aren_access as select user_id,bool_or(enabled) union_enabled from versus_private.aren_entitlements where revoked_at is null and (expires_at is null or expires_at>now()) group by user_id;
create table versus_private.aren_play_receipts(user_id uuid,state text,token_hash text);
create table player_state_private.account_versions(user_id uuid primary key,revision bigint default 0);
create table public.versus_matches(id uuid, status text,deadline_at timestamptz);create table public.versus_match_players(match_id uuid,user_id uuid);
create function versus_private.sync_game_wallet(jsonb,jsonb,jsonb,uuid) returns jsonb language sql as $$select to_jsonb(w)||jsonb_build_object('adminUnion',a.union_enabled) from versus_private.game_wallets w join versus_private.aren_access a using(user_id) where w.user_id=auth.uid()$$;
grant usage on schema versus_private,auth to authenticated;grant execute on function auth.uid() to authenticated;`);
await db.query(fs.readFileSync(path.join(root,'tools/aren-revocation-core.sql'),'utf8'));
const u='10000000-0000-4000-8000-000000000001',common='10000000-0000-4000-8000-000000000002';
for(const query of `insert into auth.users values($1),($2);insert into versus_private.game_wallets values($1,2510,array['aren-bosque'],'{"explorador":"aren-bosque"}',7),($2,19,'{}','{}',0);insert into versus_private.game_admins values($1,true);`.split(';').filter(Boolean))await db.query(query,query.includes('$2')?[u,common]:[u]);
const allowed=async()=>{checks++;return (await db.query('select versus_private.has_aren_union_access($1) a',[u])).rows[0].a;};
const wallet=async()=> (await db.query('select * from versus_private.game_wallets where user_id=$1',[u])).rows[0];
const toggle=async(id,enabled)=>{await db.query('begin');try{await db.query('set local role authenticated');await db.query("select set_config('request.jwt.claim.sub',$1,true)",[id]);const r=await db.query('select versus_private.set_aren_trial_access($1) result',[enabled]);await db.query('commit');return r.rows[0].result;}catch(e){await db.query('rollback');throw e;}};
assert.equal(await allowed(),false);
await db.query("insert into versus_private.aren_entitlements(user_id,source) values($1,'developer_trial')",[u]);assert.equal(await allowed(),true);
await toggle(u,true);assert.equal((await wallet()).equipped.explorador,'aren-union');checks++;
const rev=(await db.query('select revision from player_state_private.account_versions where user_id=$1',[u])).rows[0].revision;
await toggle(u,false);assert.equal(await allowed(),false);let w=await wallet();assert.deepEqual(w.owned,['aren-bosque']);assert.deepEqual(w.equipped,{});assert.equal(Number(w.coins),2510);assert.equal((await db.query('select union_enabled from versus_private.game_admins where user_id=$1',[u])).rows[0].union_enabled,false);assert((await db.query('select revision from player_state_private.account_versions where user_id=$1',[u])).rows[0].revision>rev);checks+=5;
await toggle(u,true);assert.equal(await allowed(),true);
await assert.rejects(toggle(common,true),/Permiso de prueba/);checks++;
await db.query("insert into versus_private.aren_entitlements(user_id,source,external_reference) values($1,'google_play_purchase','play:abc')",[u]);
await toggle(u,false);assert.equal(await allowed(),false); // Purchase label alone is not a verified receipt.
await db.query("insert into versus_private.aren_play_receipts values($1,'verified','abc')",[u]);assert.equal(await allowed(),true);
await toggle(u,true);await toggle(u,false);assert.equal(await allowed(),true);assert((await wallet()).owned.includes('aren-union'));checks++;
await db.query("update versus_private.aren_play_receipts set state='revoked' where user_id=$1",[u]);assert.equal(await allowed(),false);
await toggle(u,true);assert.equal(await allowed(),true); // Refund does not revoke developer permission.
await db.query("update versus_private.aren_entitlements set revoked_at=now(),enabled=false where user_id=$1 and source='developer_trial'",[u]);assert.equal(await allowed(),false);await assert.rejects(toggle(u,true),/Permiso de prueba/);checks++;
assert.equal(Number((await wallet()).coins),2510);assert((await wallet()).owned.includes('aren-bosque'));checks+=2;
await db.query("insert into versus_private.aren_entitlements(user_id,source,expires_at) values($1,'legacy_trial',now()-interval '1 minute')",[u]);assert.equal(await allowed(),false);
await db.query('begin;set local role authenticated');for(const table of ['aren_access','aren_entitlements','aren_play_receipts','game_admins']){await db.query('savepoint denied');await assert.rejects(db.query('insert into versus_private.'+table+'(user_id) values($1)',[common]),/permission denied|cannot insert into view/);await db.query('rollback to denied');checks++;}await db.query('rollback');
console.log(JSON.stringify({passed:true,checks,realPostgres:true,productionConnections:0,coinsAndOtherUnlocksPreserved:true,purchaseAndTrialIndependent:true}));
}finally{await runtime.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
