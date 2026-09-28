const fs=require('node:fs'),assert=require('node:assert/strict');
const {PGlite}=require('C:/Users/User/.codex/cache/versus-rewards-test/node_modules/@electric-sql/pglite');
(async()=>{const db=new PGlite();try{
await db.exec(`create role anon;create role authenticated;create schema auth;create schema versus_private;
grant usage on schema auth,versus_private to authenticated;create table auth.users(id uuid primary key);
create function auth.uid() returns uuid language sql as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
create table public.versus_matches(id uuid primary key,status text,winner_id uuid,last_event jsonb);
create table public.versus_match_players(match_id uuid,user_id uuid,score_letters integer,current_word_index integer,guessed_letters text[]);
insert into auth.users values('00000000-0000-0000-0000-000000000001'),('00000000-0000-0000-0000-000000000002');`);
await db.exec(fs.readFileSync('supabase/migrations/20260924154955_versus_coin_rewards.sql','utf8'));
await db.exec(fs.readFileSync('supabase/migrations/20260928013057_earnable_costume_collection.sql','utf8'));
const uid=n=>`00000000-0000-0000-0000-${String(n).padStart(12,'0')}`;
const sync=async(legacy=null,equipped=null)=>(await db.query('select public.sync_game_wallet($1,$2,$3) value',[legacy,[],equipped])).rows[0].value;
const buy=async skin=>(await db.query('select public.purchase_game_costume($1) value',[skin])).rows[0].value;
await db.query("select set_config('request.jwt.claim.sub',$1,false)",[uid(1)]);await sync({deviceId:uid(99),coins:1000,owned:['aren-bosque'],equipped:{explorador:'aren-bosque'}});
for(const [skin,balance] of [['guardiana-otono',850],['alba-lunar',650],['shadow-carmesi',400]]){assert.equal((await buy(skin)).coins,balance);assert.equal((await buy(skin)).coins,balance);}
const equipped={explorador:'aren-bosque',guardiana:'guardiana-otono',guardian_alba:'alba-lunar',t_shadow:'shadow-carmesi'};
assert.deepEqual((await sync(null,equipped)).equipped,equipped);assert.deepEqual((await sync(null,{mago:'alba-lunar',kairos:'kairos-real'})).equipped,{});
await assert.rejects(buy('made-up'));assert.equal((await sync()).coins,400);
await db.query("select set_config('request.jwt.claim.sub',$1,false)",[uid(2)]);await sync();await assert.rejects(buy('guardiana-otono'));assert.equal((await sync()).coins,0);
await db.exec('set role authenticated');await assert.rejects(db.query('select * from versus_private.game_wallets'));assert.equal((await sync()).userId,uid(2));await db.exec('reset role;set role anon');await assert.rejects(buy('alba-lunar'));await db.exec('reset role');
console.log('PASS collection SQL: new prices, no double charge, owned equipment only, existing ownership, isolated balances, insufficient funds and permissions');
}finally{await db.close();}})().catch(e=>{console.error(e);process.exitCode=1});
