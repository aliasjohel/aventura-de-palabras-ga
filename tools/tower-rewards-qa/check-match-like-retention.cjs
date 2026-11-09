'use strict';
const fs=require('fs'),path=require('path'),assert=require('assert/strict'),{randomUUID}=require('crypto');
process.env.AVENTURA_POSTGRES_QA_PATH ||= path.join(require('os').tmpdir(),'aventura-postgres-qa-20261023');
process.env.TEMP=path.resolve(__dirname,'../../.local-developer/tmp/match-like-retention');process.env.TMP=process.env.TEMP;fs.mkdirSync(process.env.TEMP,{recursive:true});
(async()=>{const runtime=await require('../postgres-qa/runtime.cjs').create();try{
 const db=await runtime.connect(),other=await runtime.connect();
 await db.query(`create role anon;create role authenticated;create role service_role;create schema auth;create schema versus_private;
 create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
 grant usage on schema auth,versus_private to authenticated;
 create table auth.users(id uuid primary key);
 create table public.versus_matches(id uuid primary key,status text);create table versus_private.player_history(match_id uuid,user_id uuid,finished_at timestamptz,primary key(match_id,user_id));
 create table public.versus_match_players(match_id uuid references public.versus_matches on delete cascade,user_id uuid references auth.users on delete cascade,primary key(match_id,user_id));
 create function versus_private.player_profile_before_xp() returns jsonb language sql as $$select '{"points":12}'::jsonb$$;
 create function versus_private.public_player_profile_before_xp(uuid,integer) returns jsonb language sql as $$select '{"points":14}'::jsonb$$;
 create function versus_private.xp_view(uuid,boolean) returns jsonb language sql as $$select '{"total":20}'::jsonb$$;
 create function versus_private.tower_public_appearance(uuid) returns jsonb language sql as $$select '{"costume":"original"}'::jsonb$$;`);
 const migration=fs.readdirSync(path.join(__dirname,'../../supabase/migrations')).find(n=>n.endsWith('_post_match_player_likes.sql'));
 await db.query(fs.readFileSync(path.join(__dirname,'../../supabase/migrations',migration),'utf8').replace(/\r\n/g,'\n'));
 const originalHelper=(await db.query("select pg_get_functiondef('versus_private.match_like(uuid,boolean)'::regprocedure) d")).rows[0].d;
 const beforeACL=(await db.query("select proacl,proowner,oid from pg_proc where oid='versus_private.match_like(uuid,boolean)'::regprocedure")).rows[0];
 const wrapperBefore=(await db.query("select pg_get_functiondef('public.versus_match_like(uuid,boolean)'::regprocedure) d")).rows[0].d;
 const [a,b,c]=[randomUUID(),randomUUID(),randomUUID()],m=randomUUID(),playing=randomUUID(),one=randomUUID();
 await db.query('insert into auth.users values ($1),($2),($3)',[a,b,c]);
 await db.query("insert into public.versus_matches values ($1,'finished'),($2,'playing'),($3,'finished')",[m,playing,one]);
 await db.query('insert into public.versus_match_players values ($1,$4),($1,$5),($2,$4),($2,$5),($3,$4)',[m,playing,one,a,b]);
 async function like(user,match,send=false,client=db){await client.query("select set_config('request.jwt.claim.sub',$1,false)",[user||'']);await client.query('set role authenticated');return (await client.query('select public.versus_match_like($1,$2) r',[match,send])).rows[0].r;}
 const archived=randomUUID();await db.query("insert into public.versus_matches values($1,'finished')",[archived]);await db.query('insert into public.versus_match_players values($1,$2),($1,$3)',[archived,a,b]);await db.query('insert into versus_private.player_history values ($1,$2,now()),($1,$3,now())',[archived,a,b]);
 await db.query('delete from public.versus_matches where id=$1',[archived]);
 assert.equal((await db.query('select count(*) n from public.versus_match_players where match_id=$1',[archived])).rows[0].n,'0');
 await assert.rejects(like(a,archived,true),/no participaste/); // Reproduces v408 after room cleanup.
 await db.query('reset role');const prior=randomUUID();await db.query("insert into public.versus_matches values($1,'finished')",[prior]);await db.query('insert into public.versus_match_players values($1,$2),($1,$3)',[prior,a,b]);await like(a,prior,true);await db.query('reset role');await db.query('delete from public.versus_matches where id=$1',[prior]);
 await db.query('reset role');const correction=fs.readdirSync(path.join(__dirname,'../../supabase/migrations')).find(n=>n.endsWith('_retain_post_cleanup_match_likes.sql'));await db.query(fs.readFileSync(path.join(__dirname,'../../supabase/migrations',correction),'utf8').replace(/\r\n/g,'\n'));
 assert.equal((await like(a,prior,true)).sent,true);await db.query('reset role');await db.query('delete from versus_private.match_likes where match_id=$1',[prior]);
 assert.deepEqual((await db.query("select proacl,proowner,oid from pg_proc where oid='versus_private.match_like(uuid,boolean)'::regprocedure")).rows[0],beforeACL);
 assert.equal((await db.query("select pg_get_functiondef('public.versus_match_like(uuid,boolean)'::regprocedure) d")).rows[0].d,wrapperBefore);
 // A concurrent cleanup must not separate participant validation from lookup.
 const cleaner=await runtime.connect();
 for(let i=0;i<12;i++){const race=randomUUID();await db.query("insert into public.versus_matches values($1,'finished')",[race]);await db.query('insert into public.versus_match_players values($1,$2),($1,$3)',[race,a,b]);await db.query('insert into versus_private.player_history values($1,$2,now()),($1,$3,now())',[race,a,b]);
 const [receipt]=await Promise.all([like(a,race,true,other),cleaner.query('delete from public.versus_matches where id=$1',[race])]);assert.equal(receipt.opponentId,b);assert.equal(receipt.sent,true);await db.query('delete from versus_private.match_likes where match_id=$1',[race]);}
 const beforeRead=(await db.query('select count(*) n from versus_private.match_likes')).rows[0].n;
 assert.equal((await like(a,archived)).sent,false);await db.query('reset role');assert.equal((await db.query('select count(*) n from versus_private.match_likes')).rows[0].n,beforeRead);
 await assert.rejects(like(c,archived,true),/no participaste/);
 const archivedReplies=await Promise.all([like(a,archived,true),like(a,archived,true,other)]);assert(archivedReplies.every(r=>r.sent&&r.opponentId===b));assert.equal((await like(a,archived,true)).sent,true);
 await db.query('reset role');assert.equal((await db.query('select count(*) n from versus_private.match_likes where match_id=$1',[archived])).rows[0].n,'1');
 // The public role cannot fabricate history or provide an arbitrary recipient.
 await db.query('set role authenticated');await assert.rejects(db.query('insert into versus_private.player_history values($1,$2,now())',[randomUUID(),a]),/permission denied/);
 await assert.rejects(db.query('select public.versus_match_like($1,true,$2)',[archived,c]),/does not exist/);await db.query('reset role');
 const unknown=randomUUID(),incomplete=randomUUID(),three=randomUUID(),unfinished=randomUUID();
 await db.query('insert into versus_private.player_history values($1,$5,now()),($2,$5,now()),($2,$6,now()),($2,$7,now()),($3,$5,now()),($3,$6,null),($4,$5,now()),($4,$6,now())',[incomplete,three,unfinished,playing,a,b,c]);
 for(const invalid of [unknown,incomplete,three,unfinished,playing])await assert.rejects(like(a,invalid,true),/no participaste/);
 await db.query('reset role');await db.query('delete from versus_private.match_likes where match_id=$1',[archived]);
 assert.equal((await like(a,m)).sent,false);
 await db.query('reset role');assert.equal((await db.query('select count(*) n from versus_private.match_likes')).rows[0].n,'0');
 await assert.rejects(like(c,m,true),/no participaste/);
 await assert.rejects(like(a,playing,true),/no participaste/);
 await assert.rejects(like(a,one,true),/no participaste/);
 await assert.rejects(like(null,m,true),/Iniciá sesión/);
 await assert.rejects(like(a,null,true),/inválido/);
 await assert.rejects(like(a,m,null),/inválido/);
 const replies=await Promise.all([like(a,m,true),like(a,m,true,other)]);
 assert(replies.every(r=>r.sent&&r.opponentId===b&&r.userId===a&&r.matchId===m));
 assert.equal((await like(a,m,true)).sent,true);
 await db.query('reset role');assert.equal((await db.query('select count(*) n from versus_private.match_likes')).rows[0].n,'1');
 assert.equal((await like(b,m)).sent,false);assert.equal((await like(b,m,true)).opponentId,a);
 await db.query('reset role');
 const profile=(await db.query('select versus_private.player_profile() r')).rows[0].r;
 assert.equal(profile.likes,1);assert.equal(profile.points,12);assert.equal(profile.xp.total,20);
 assert.equal((await db.query('select versus_private.public_player_profile($1,0) r',[a])).rows[0].r.likes,1);
 assert.equal((await db.query('select versus_private.public_player_profile($1,0) r',[a])).rows[0].r.costume,'original');
 await db.query('delete from public.versus_matches where id=$1',[m]);
 assert.equal((await like(a,m,true)).sent,true);
 await db.query('reset role');assert.equal((await db.query('select count(*) n from versus_private.match_likes')).rows[0].n,'2');
 await db.query('set role authenticated');await assert.rejects(db.query('select * from versus_private.match_likes'),/permission denied/);await db.query('reset role');
 assert.equal((await db.query("select relrowsecurity r from pg_class where oid='versus_private.match_likes'::regclass")).rows[0].r,true);
 for(const role of ['anon','service_role']){await db.query('set role '+role);await assert.rejects(db.query('select public.versus_match_like($1,true)',[m]),/permission denied/);await db.query('reset role');}
 await db.query(originalHelper);assert.equal((await like(a,m,true)).sent,true);await db.query('reset role');assert.equal((await db.query('select count(*) n from versus_private.match_likes')).rows[0].n,'2');await db.query(fs.readFileSync(path.join(__dirname,'../../supabase/migrations',correction),'utf8').replace(/\r\n/g,'\n'));
 await db.query('delete from auth.users where id=$1',[a]);assert.equal((await db.query('select count(*) n from versus_private.match_likes')).rows[0].n,'0');
 console.log('PASS FORMAL MIGRATION, PostgreSQL likes: explicit send, participant/finished checks, concurrent idempotency, reciprocal votes, profile counts, cleanup retention, auth deletion, RLS and ACL');
}finally{await runtime.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
