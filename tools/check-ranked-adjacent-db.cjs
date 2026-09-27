const fs=require('node:fs'),assert=require('node:assert/strict');
const {PGlite}=require('C:/Users/User/.codex/cache/versus-rewards-test/node_modules/@electric-sql/pglite');
(async()=>{const db=new PGlite();try{
await db.exec(`create role anon;create role authenticated;create schema auth;create schema versus_private;
create function auth.uid() returns uuid language sql as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
create table public.versus_rooms(id uuid primary key default gen_random_uuid(), status text default 'waiting',queue_mode text default 'classic',created_at timestamptz default now());
create table public.versus_players(room_id uuid,user_id uuid,alias text,slot int);
create table versus_private.ranked_rooms(room_id uuid primary key);
create table versus_private.ranked_results(user_id uuid,points bigint);
create table versus_private.search_queue(user_id uuid primary key,alias text,touched_at timestamptz default now(),room_id uuid,mode text default 'ranked',queued_at timestamptz default now(),rating bigint default 0);
create function public.versus_alias_inappropriate(text) returns boolean language sql as $$select false$$;
create function public.create_versus_room(n text) returns public.versus_rooms language plpgsql as $$declare r public.versus_rooms;begin insert into public.versus_rooms default values returning * into r;insert into public.versus_players values(r.id,auth.uid(),n,1);return r;end$$;`);
const old=fs.readFileSync('supabase/migrations/20260922015020_ranked_modes_and_fair_matchmaking.sql','utf8');
await db.exec(old.slice(old.indexOf('create function public.versus_rank_info'),old.indexOf('create function versus_private.find_opponent_mode')));
await db.exec(fs.readFileSync('supabase/migrations/20260927204829_ranked_adjacent_tiers.sql','utf8'));
const uid=n=>`00000000-0000-0000-0000-${String(n).padStart(12,'0')}`;
async function search(n,mode='ranked',cancel=false){await db.query("select set_config('request.jwt.claim.sub',$1,false)",[uid(n)]);return(await db.query('select versus_private.find_opponent_mode($1,$2,$3) value',['Prueba '+n,cancel,mode])).rows[0].value;}
async function reset(a,b){await db.exec('truncate versus_private.search_queue,versus_private.ranked_rooms,versus_private.ranked_results,public.versus_rooms,public.versus_players');await db.query('insert into versus_private.ranked_results values($1,$2),($3,$4)',[uid(1),a,uid(2),b]);}
for(const [a,b,eligible] of [[0,29,true],[29,0,true],[60,119,true],[60,239,true],[239,60,true],[0,30,false],[30,0,false],[240,10000,true],[480,100000,true]]){await reset(a,b);assert((await search(1)).waiting);const r=await search(2);assert.equal(Boolean(r.room_id),eligible,`${a} vs ${b}`);if(eligible){assert.equal((await search(1)).room_id,r.room_id);assert.equal((await db.query('select count(*)::int n from public.versus_players')).rows[0].n,2);}}
await reset(0,10000);await search(1,'classic');assert((await search(2,'classic')).room_id);
await reset(0,0);await search(1,'classic');assert((await search(2,'ranked')).waiting);assert((await search(1,'classic',true)).cancelled);
await reset(0,0);await search(1);await db.exec("update versus_private.search_queue set touched_at=now()-interval '31 seconds'");assert((await search(2)).waiting);
await db.exec('set role anon');await assert.rejects(search(1));await db.exec('reset role');
console.log('PASS ranked SQL: same/adjacent tiers immediately both directions, distant tiers excluded, classic unrestricted, modes isolated, repeat polls, cancellation, expired queue and anonymous denial');
}finally{await db.close();}})().catch(e=>{console.error(e);process.exitCode=1});
