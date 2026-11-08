'use strict';
const fs=require('fs'),path=require('path'),assert=require('assert/strict'),{randomUUID}=require('crypto');
const root=path.resolve(__dirname,'../..');
(async()=>{const f=await require('./legacy-suite.cjs').fixture();try{
 const {owner,users,clients:[a,b],sql}=f;
 const migration=fs.readdirSync(path.join(root,'supabase/migrations')).find(n=>n.endsWith('_costume_prices_and_character_ownership.sql'));
 const before=await f.snapshot();await owner.query(fs.readFileSync(path.join(root,'supabase/migrations',migration),'utf8'));assert.deepEqual(await f.snapshot(),before);
 const purchase=(skin,user=users[0],client=a)=>sql(client,user,'select public.purchase_game_costume($1) result',[skin]).then(r=>r.rows[0].result);
 await owner.query("update versus_private.game_wallets set coins=20000,owned='{}',equipped='{}',legacy_done=true where user_id=any($1::uuid[])",[[users[0],users[2]]]);
 let balance=20000;const rows=[];
 for(const item of require('../../js/cosmetic-store.js').catalog.filter(i=>!i.adminOnly)){
  const purchased=await purchase(item.id);balance-=item.price;assert.equal(purchased.coins,balance,item.id);assert(purchased.owned.includes(item.id));assert.equal((await purchase(item.id)).coins,balance);
  if(item.character!=='explorador')await assert.rejects(purchase(item.id,users[2],b),/Primero conseguí el personaje/);
  rows.push({id:item.id,price:item.price});
 }
 assert.equal(Number((await owner.query('select coins from versus_private.game_wallets where user_id=$1',[users[2]])).rows[0].coins),20000);
 assert.equal((await purchase('aren-bosque',users[2],b)).coins,19000);
 const unlocked=(await sql(b,users[2],"select public.game_characters('purchase','hombre_lobo') result")).rows[0].result;
 assert(unlocked.characters.unlocked.includes('hombre_lobo'));assert.equal((await purchase('lobo-lunar',users[2],b)).coins,16000);
 const id=randomUUID();await owner.query('insert into versus_private.adventure_reward_attempts(id,user_id,world,mission,request_id) values($1,$2,0,9,$3)',[id,users[2],randomUUID()]);
 await owner.query("insert into versus_private.verified_adventure_completions(attempt_id,user_id,world,mission,evidence_id,verifier_version,completed_at) values($1,$2,0,9,$3,'synthetic-shop-test',now())",[id,users[2],randomUUID()]);
 const story=(await sql(b,users[2],"select public.game_characters('sync',null) result")).rows[0].result;assert(story.characters.unlocked.includes('guardiana'));assert(!story.characters.unlocked.includes('azrak'));
 assert.equal((await purchase('guardiana-otono',users[2],b)).coins,15000);
 await owner.query("update versus_private.game_wallets set legacy_done=true,owned='{}',equipped='{}',coins=50 where user_id=$1",[users[3]]);
 await assert.rejects(purchase('aren-bosque',users[3],b),/faltan/);
 await assert.rejects(purchase('aren-union'),/no está disponible/);await assert.rejects(purchase('tower_guardiana'),/no está disponible/);
 await owner.query("update versus_private.game_wallets set owned='{}',coins=5000 where user_id=$1",[users[0]]);
 const race=await Promise.all([purchase('aren-bosque'),purchase('aren-bosque',users[0],b)]);assert(race.every(r=>r.coins===4000));
 const grants=(await owner.query("select has_function_privilege('anon','public.purchase_game_costume(text)','EXECUTE') anon,has_function_privilege('authenticated','public.purchase_game_costume(text)','EXECUTE') authenticated")).rows[0];assert.equal(grants.anon,false);assert.equal(grants.authenticated,true);
 const report={passed:true,migration,productionWrites:0,rows,checks:['existing rows preserved','11 exact prices and idempotent repeat purchases','10 unavailable characters rejected without a debit','character purchase unlocks its outfit','verified story completion unlocks its outfit','insufficient funds','admin and Tower items rejected','two concurrent purchases charge once','RPC permissions preserved']};fs.mkdirSync(path.join(root,'.local-developer/costume-prices'),{recursive:true});fs.writeFileSync(path.join(root,'.local-developer/costume-prices/postgres-results.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));
}finally{await f.runtime.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
