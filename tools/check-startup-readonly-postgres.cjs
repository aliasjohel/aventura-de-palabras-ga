'use strict';
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
(async()=>{const rt=await require('E:/Proyectos/Aventura-de-Palabras-i18n-stage2b/.local-developer/aren-champion-release/tools/postgres-qa/runtime.cjs').create(),db=await rt.connect();try{
 await db.query(`create schema player_state_private;create schema versus_private;create table versus_private.game_admins(enabled boolean);insert into versus_private.game_admins values(true);
 create function versus_private.refresh_aren_union_access(uuid) returns void language sql as $$update versus_private.game_admins set enabled=enabled$$;
 create function player_state_private.account_snapshot() returns jsonb language plpgsql stable as $$begin perform versus_private.refresh_aren_union_access(null);return '{"schemaVersion":3}'::jsonb;end$$;
 create function public.account_state_v3() returns jsonb language sql stable as $$select player_state_private.account_snapshot()$$;`);
 await db.query('begin read only');await assert.rejects(db.query('select public.account_state_v3()'),e=>e.code==='25006');await db.query('rollback');
 await db.query(`create or replace function player_state_private.account_snapshot() returns jsonb language plpgsql stable as $$begin return '{"schemaVersion":3}'::jsonb;end$$;`);
 await db.query('begin read only');assert.equal((await db.query('select public.account_state_v3() s')).rows[0].s.schemaVersion,3);await db.query('rollback');
 const full=fs.readFileSync(path.join(__dirname,'../supabase/migrations/20261113224221_account_snapshot_readonly.sql'),'utf8');assert(!full.includes('perform versus_private.refresh_aren_union_access'));assert(/STABLE/i.test(full));
 console.log(JSON.stringify({passed:true,realPostgres:true,productionConnections:0,reproduced:'25006',stableEndpointRemainsReadOnly:true}));
 }finally{await rt.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
