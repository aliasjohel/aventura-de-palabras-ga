const fs=require('node:fs');const assert=require('node:assert/strict');
const {PGlite}=require('C:/Users/User/.codex/cache/versus-rewards-test/node_modules/@electric-sql/pglite');
(async()=>{const db=new PGlite();try{
await db.exec(`create role anon;create role authenticated;create schema auth;create schema versus_private;
 grant usage on schema auth,versus_private to authenticated;create table auth.users(id uuid primary key);
 create function auth.uid() returns uuid language sql as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
 create table public.versus_matches(id uuid primary key,status text,winner_id uuid,last_event jsonb);
 create table public.versus_match_players(match_id uuid,user_id uuid,score_letters integer,current_word_index integer,guessed_letters text[]);
 insert into auth.users values('00000000-0000-0000-0000-000000000001'),('00000000-0000-0000-0000-000000000002'),('00000000-0000-0000-0000-000000000003');`);
await db.exec(fs.readFileSync('supabase/migrations/20260924154955_versus_coin_rewards.sql','utf8'));
const uid=n=>`00000000-0000-0000-0000-${String(n).padStart(12,'0')}`;
async function as(n){await db.query("select set_config('request.jwt.claim.sub',$1,false)",[n?uid(n):'']);}
async function sync(legacy=null,events=[],equipped=null,match=null){return (await db.query('select public.sync_game_wallet($1,$2,$3,$4) value',[legacy,events,equipped,match])).rows[0].value;}
async function finish(n,winner,reason='rules',correction){const id=uid(n);await db.exec('begin');await db.query("insert into public.versus_matches values($1,'playing',null,null)",[id]);for(const player of [1,2])await db.query('insert into public.versus_match_players values($1,$2,1,0,$3)',[id,uid(player),['A']]);await db.query("update public.versus_matches set status='finished',winner_id=$2,last_event=jsonb_build_object('reason',$3::text) where id=$1",[id,winner?uid(winner):null,reason]);if(correction)await db.query('update public.versus_matches set winner_id=$2 where id=$1',[id,uid(correction)]);await db.exec('commit');return id;}
const match=await finish(100,1);await as(1);let s=await sync();assert.equal(s.coins,20);assert.equal((await sync(null,[],null,match)).reward.amount,20);
await as(2);assert.equal((await sync()).coins,5);await db.query("update public.versus_matches set status='finished' where id=$1",[match]);assert.equal((await sync()).coins,5);
await finish(101,null);await as(1);assert.equal((await sync()).coins,30);await as(2);assert.equal((await sync()).coins,15);
await finish(102,1,'time',2);await as(1);assert.equal((await sync()).coins,35);await as(2);assert.equal((await sync()).coins,35);
await finish(103,1,'abandoned');await as(1);assert.equal((await sync()).coins,35);
await db.query('delete from public.versus_matches where id=$1',[match]);assert.equal((await sync(null,[],null,match)).reward.amount,20);
await as(3);const legacy={deviceId:uid(200),coins:300,owned:['aren-bosque'],equipped:{explorador:'aren-bosque'}};
s=await sync(legacy);assert.equal(s.coins,300);assert.deepEqual(s.owned,['aren-bosque']);assert.equal((await sync(legacy)).coins,300);
const event={id:uid(201),amount:10,origin:'aventura:0:0:1:palabra'};assert.equal((await sync(null,[event])).coins,310);assert.equal((await sync(null,[event])).coins,310);
await assert.rejects(sync(null,[{...event,id:uid(202),amount:20,origin:'versus:win'}]));
const purchase=async skin=>(await db.query('select public.purchase_game_costume($1) value',[skin])).rows[0].value;
assert.equal((await purchase('zafir-celestial')).coins,60);assert.equal((await purchase('zafir-celestial')).coins,60);await assert.rejects(purchase('kairos-real'));
assert.deepEqual((await sync(null,[],{kairos:'kairos-real',mago:'zafir-celestial'})).equipped,{mago:'zafir-celestial'});
await as(1);assert.equal((await sync()).coins,35);assert.deepEqual((await sync()).owned,[]);
await as(null);await assert.rejects(sync());await as(1);await db.exec('set role authenticated');await assert.rejects(db.query('select * from versus_private.game_wallets'));await assert.rejects(db.query('update versus_private.game_wallets set coins=999'));assert.equal((await sync()).userId,uid(1));
await db.exec('reset role;set role anon');await assert.rejects(sync());await db.exec('reset role');
console.log('PASS SQL: win/draw/loss, final timeout winner, abandonment, idempotency, room cleanup, migration, offline events, purchases, insufficient funds, ownership and permissions');
}finally{await db.close();}})().catch(e=>{console.error(e);process.exitCode=1});
