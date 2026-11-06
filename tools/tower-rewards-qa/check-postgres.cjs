'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{randomUUID:uuid}=require('node:crypto');
const root=path.resolve(__dirname,'../..');
(async()=>{
 const f=await require('./legacy-suite.cjs').fixture(),{owner,clients:[a,b],rpc,sql,clock,users,chars}=f,checks=[],floors=[];
 const migration=fs.readdirSync(path.join(root,'supabase/migrations')).find(n=>n.endsWith('_tower_exclusive_rewards_inventory.sql'));
 const cosmetics=(args={},user=users[0],client=a)=>sql(client,user,'select public.tower_cosmetics($1,$2,$3,$4,$5) result',[args.action||'status',args.item??null,args.character??null,args.request??(args.action&&args.action!=='status'?uuid():null),args.revision??null]).then(r=>r.rows[0].result);
 const game=(args,user=users[0],client=a)=>rpc(client,user,args);
 async function win(character,floor,language='es',user=users[0]){
  let t=(await game({p_action:'begin',p_request:uuid(),p_payload:{character,floor,language,reducedMotion:false}},user)).attempt;
  const action=async(name,payload={})=>{t=(await game({p_action:name,p_attempt:t.id,p_request:uuid(),p_sequence:t.sequence,p_payload:payload},user)).attempt;};await action('start');
  for(let n=0;t.status==='playing'&&n<100;n++){const s=(await owner.query('select state from versus_private.tower_attempts where id=$1',[t.id])).rows[0].state,word=(await owner.query("select versus_private.tower_duel_word($1,'player') word",[s])).rows[0].word,letter=[...word].find(l=>!s.player.letters.includes(l));assert(letter);await action('letter',{letter,word:s.player.index});}
  assert.equal(t.status,'won');return t;
 }
 const settle=(t,user=users[0],client=a)=>game({p_action:'settle',p_attempt:t.id,p_request:uuid(),p_payload:{}},user,client);
 try{
  const before=await f.snapshot();await owner.query(fs.readFileSync(path.join(root,'supabase/migrations',migration),'utf8'));assert.deepEqual(await f.snapshot(),before);checks.push('Migration preserves every existing row; grants default OFF and global access unchanged');
  assert.deepEqual((await cosmetics()).owned,[]);assert.equal((await cosmetics()).grantsEnabled,false);
  for(const role of ['anon','authenticated'])for(const query of ['select * from versus_private.tower_cosmetic_grants',"insert into versus_private.tower_cosmetic_grants(user_id,item,evidence) values(auth.uid(),'tower_explorador','{}')","select versus_private.tower_grant_cosmetics(auth.uid())","update versus_private.tower_equipment set frame_key='tower_leyenda'"]){await assert.rejects(sql(a,users[0],query,[],role),/permission denied/);}
  await assert.rejects(cosmetics({action:'equip_costume',item:'tower_explorador',character:'explorador',revision:0}),/not owned/);
  await assert.rejects(cosmetics({},users[52]),/Verified permanent/);await assert.rejects(sql(a,null,'select public.tower_cosmetics()',[],'anon'),/permission denied/);
  await owner.query('update versus_private.tower_rollout set enabled=true,payments_enabled=true,pilot_users=$1',[users.slice(0,2)]);
  await owner.query('update versus_private.tower_cosmetic_rollout set grants_enabled=true');assert.equal((await cosmetics()).grantsEnabled,true);assert.equal((await cosmetics({},users[2])).grantsEnabled,false);
  checks.push('Private RLS/ACL, unowned equipment, anonymous and unconfirmed accounts rejected; two-account pilot only');
  for(const language of ['es','en','pt-BR'])for(const [ci,character]of chars.entries())for(let floor=1;floor<=10;floor++){
   const t=await win(character,floor,language);const results=await Promise.all([settle(t),settle(t,users[0],b)]);const expected=floor<=4?30:floor<=9?50:150;
   assert.equal(results.filter(r=>r.newlyCredited).length,language==='es'?1:0);assert(results.every(r=>r.receipt.amount===expected));
   const state=await cosmetics();assert.equal(state.owned.includes('tower_'+character),language!=='es'||floor===10);
   if(language==='es'){
    assert.equal(state.owned.filter(i=>i.startsWith('tower_')&&chars.some(c=>'tower_'+c===i)).length,ci+(floor===10?1:0));
    const completed=ci+(floor===10?1:0);for(const [item,count]of [['tower_conquistador',1],['tower_maestro',6],['tower_leyenda',11]])assert.equal(state.owned.includes(item),completed>=count);
    floors.push({character,floor,amount:expected,costume:state.owned.includes('tower_'+character)});
   }
   // Delivery lost after commit: a new settle ID and a new sync never add coins/items.
   assert.equal((await settle(t)).newlyCredited,false);await cosmetics({action:'sync'});
  }
  const totals=(await owner.query('select count(*)::int receipts,sum(amount)::int coins from versus_private.tower_coin_receipts where user_id=$1',[users[0]])).rows[0];assert.deepEqual(totals,{receipts:110,coins:5720});assert.equal((await cosmetics()).owned.length,14);
  checks.push('330 legal wins, all 110 distinct floors: exact coins once, 11 costumes and cumulative 1/6/11 frames; concurrent settlement/replay/lost responses idempotent');
  // A gap or a certificate tied to another character does not complete a run.
  const t=await win('explorador',1,'es',users[1]);await settle(t,users[1]);assert.equal((await cosmetics({action:'sync'},users[1])).owned.length,0);
  checks.push('One floor and replay cannot complete a character; another account receives no prizes');
  // Simulate storage failure at the last step, then recover the same won attempt.
  let pendingFinal;for(let floor=2;floor<=10;floor++){const won=await win('explorador',floor,'es',users[1]);if(floor<10)await settle(won,users[1]);else pendingFinal=won;}
  await owner.query(`create function public.qa_fail_tower_grant() returns trigger language plpgsql as $$begin if new.user_id='${users[1]}'::uuid then raise exception 'synthetic grant storage failure';end if;return new;end$$;create trigger qa_fail_tower_grant before insert on versus_private.tower_cosmetic_grants for each row execute function public.qa_fail_tower_grant()`);
  await assert.rejects(settle(pendingFinal,users[1]),/synthetic grant storage failure/);
  assert.equal((await owner.query('select count(*)::int n from versus_private.tower_coin_receipts where user_id=$1',[users[1]])).rows[0].n,9);
  assert.equal((await cosmetics({},users[1])).owned.length,0);await owner.query('drop trigger qa_fail_tower_grant on versus_private.tower_cosmetic_grants;drop function public.qa_fail_tower_grant()');
  const recovered=await settle(pendingFinal,users[1]);assert.equal(recovered.newlyCredited,true);assert.equal((await settle(pendingFinal,users[1])).newlyCredited,false);assert.equal((await cosmetics({},users[1])).owned.length,2);
  checks.push('Cosmetic storage failure rolls back floor certificate, receipt, coins and grants together; reconnect settlement recovers exactly once');
  // Synthetic server fixtures exercise gaps and simultaneous *different* final
  // attempts at both aggregate thresholds; no client can create these fixtures.
  const thresholdUser=users[2];await owner.query('update versus_private.tower_rollout set pilot_users=$1',[[...users.slice(0,3)]]);
  async function seed(character,floor,verified=true){const attempt=uuid();await owner.query("insert into versus_private.tower_attempts(id,user_id,request_id,definition,language,state,status) values($1,$2,$3,$4,'es',$5,'won')",[attempt,thresholdUser,uuid(),character+':'+floor,{finished:true,winner:'player',config:{player:character},player:{},npc:{}}]);if(verified)await owner.query('insert into versus_private.tower_verified_floors(user_id,character_key,floor,attempt_id) values($1,$2,$3,$4)',[thresholdUser,character,floor,attempt]);return{id:attempt};}
  // Attempt view requires a complete engine state; clone a real won state's view data.
  const template=(await owner.query("select state from versus_private.tower_attempts where user_id=$1 and status='won' limit 1",[users[0]])).rows[0].state;
  async function seedRun(character,last=false){for(let floor=1;floor<=9;floor++)await seed(character,floor);const t=await seed(character,10,!last);if(last){const definition=(await owner.query('select config from versus_private.tower_definitions where key=$1',[character+':10'])).rows[0];await owner.query('update versus_private.tower_attempts set state=$1 where id=$2',[{...template,config:{...template.config,...definition.config}},t.id]);}return t;}
  for(const character of chars.slice(0,4))await seedRun(character);
  const fifth=await seedRun(chars[4],true),sixth=await seedRun(chars[5],true);assert.equal((await cosmetics({action:'sync'},thresholdUser)).owned.length,5);
  await Promise.all([settle(fifth,thresholdUser),settle(sixth,thresholdUser,b)]);assert.equal((await cosmetics({},thresholdUser)).owned.length,8);
  for(const character of chars.slice(6,9))await seedRun(character);const tenth=await seedRun(chars[9],true),eleventh=await seedRun(chars[10],true);
  await Promise.all([settle(tenth,thresholdUser),settle(eleventh,thresholdUser,b)]);assert.equal((await cosmetics({},thresholdUser)).owned.length,14);
  assert.equal((await owner.query("select count(*)::int n from versus_private.tower_cosmetic_grants where user_id=$1 and item in ('tower_maestro','tower_leyenda')",[thresholdUser])).rows[0].n,2);
  checks.push('Distinct concurrent final settlements cross 6/11 thresholds once; missing tenth certificates and completed progress alone cannot grant a costume');
  // Equipment on device A; device B and an old wallet/appearance client cannot clear it.
  let state=await cosmetics();for(const character of chars){state=await cosmetics({action:'equip_costume',character,item:'tower_'+character,revision:state.revision});assert.equal((await cosmetics({},users[0],b)).equipped[character],'tower_'+character);}
  for(const frame of ['tower_conquistador','tower_maestro','tower_leyenda']){state=await cosmetics({action:'equip_frame',item:frame,revision:state.revision});await sql(b,users[0],"select public.save_versus_appearance('explorador','clasico')");assert.equal((await owner.query('select frame_key from versus_private.player_appearance where user_id=$1',[users[0]])).rows[0].frame_key,frame);}
  await owner.query('update versus_private.xp_rollout set enabled=true');
  await owner.query('insert into versus_private.xp_accounts(user_id,total) values($1,5000) on conflict do nothing',[users[0]]);
  await owner.query('insert into versus_private.xp_reward_receipts(user_id,level,coins) select $1,level,coins from versus_private.xp_rewards where level=10',[users[0]]);
  await owner.query("insert into versus_private.xp_cosmetics(user_id,item,kind,reward_level) values($1,'xp_tinta','frame',10)",[users[0]]);
  const existingMoney=(await owner.query('select coins from versus_private.game_wallets where user_id=$1',[users[0]])).rows[0].coins,xpTotal=(await owner.query('select total from versus_private.xp_accounts where user_id=$1',[users[0]])).rows[0].total;
  await assert.rejects(cosmetics({action:'use_xp_frame',item:'xp_infinito',revision:state.revision}));assert.equal((await cosmetics()).frame,'tower_leyenda');assert.equal((await cosmetics()).revision,state.revision);
  state=await cosmetics({action:'use_xp_frame',item:'xp_tinta',revision:state.revision});assert.equal(state.frame,null);assert.equal((await owner.query('select frame_key from versus_private.player_appearance where user_id=$1',[users[0]])).rows[0].frame_key,'xp_tinta');
  assert.equal((await owner.query('select coins from versus_private.game_wallets where user_id=$1',[users[0]])).rows[0].coins,existingMoney);assert.equal((await owner.query('select total from versus_private.xp_accounts where user_id=$1',[users[0]])).rows[0].total,xpTotal);
  state=await cosmetics({action:'equip_frame',item:'tower_leyenda',revision:state.revision});checks.push('Switching to an already-owned XP frame is atomic; invalid XP frame cannot clear Tower; existing XP total and coins unchanged');
  const room=uuid();await owner.query("insert into public.versus_rooms(id,code,host_id) values($1,'TWQ395',$2)",[room,users[0]]);
  for(const [i,user]of users.slice(0,2).entries())await owner.query("insert into public.versus_players(room_id,user_id,alias,slot) values($1,$2,$3,$4)",[room,user,'Fixture'+i,i+1]);
  await sql(b,users[0],"select public.set_versus_identity($1,'explorador','clasico')",[room]);
  assert.equal((await owner.query('select frame_key from public.versus_players where room_id=$1 and user_id=$2',[room,users[0]])).rows[0].frame_key,'tower_leyenda');
  const visible=(await sql(b,users[1],'select public.get_versus_room_costumes($1) data',[room])).rows[0].data;assert.equal(visible[users[0]].dragon_hielo,'tower_dragon_hielo');assert.equal(visible[users[0]].explorador,'tower_explorador');
  await assert.rejects(sql(b,users[4],'select public.get_versus_room_costumes($1)',[room]),/No perteneces/);
  const profile=(await sql(b,users[1],'select public.get_versus_public_profile($1,0) data',[users[0]])).rows[0].data;assert.equal(profile.frame,'tower_leyenda');assert(!Object.hasOwn(profile,'owned'));assert(!Object.hasOwn(profile,'towerCosmetics'));
  checks.push('Room identity preserves frames against old clients; public room costumes/profile show only verified equipped items, never private ownership; outsiders denied');
  await owner.query('begin');try{
   await owner.query("insert into versus_private.aren_entitlements(user_id,source,authorized_by) values($1,'developer_trial','synthetic-qa') on conflict do nothing",[users[0]]);
   await owner.query("update versus_private.game_wallets set owned=array_append(owned,'aren-union'),equipped=jsonb_build_object('explorador','aren-union') where user_id=$1",[users[0]]);
   await owner.query("select set_config('request.jwt.claim.sub',$1,true),set_config('request.jwt.claims',$2,true)",[users[0],JSON.stringify({sub:users[0],role:'authenticated',is_anonymous:false})]);await owner.query('set local role authenticated');
   const effective=(await owner.query('select public.tower_cosmetics() data')).rows[0].data;assert.equal(effective.equipped.explorador,undefined);assert.equal(effective.selectedCostumes.explorador,'tower_explorador');
   await owner.query('savepoint invalid_union_equip');await assert.rejects(owner.query("select public.tower_cosmetics('equip_costume','tower_explorador','explorador',$1,$2)",[uuid(),state.revision]),/TOWER_UNION_ACTIVE/);await owner.query('rollback to savepoint invalid_union_equip');
   assert.equal((await owner.query('select public.get_versus_room_costumes($1) data',[room])).rows[0].data[users[0]].explorador,'aren-union');
   const unionAttempt=(await owner.query("select public.tower_game('begin',null,$1,null,$2) data",[uuid(),{character:'explorador',floor:1,language:'es',reducedMotion:false}])).rows[0].data.attempt;await owner.query('reset role');assert.equal((await owner.query("select (state#>>'{config,playerUnion}')::boolean active from versus_private.tower_attempts where id=$1",[unionAttempt.id])).rows[0].active,true);
  }finally{await owner.query('rollback');}
  assert.equal((await cosmetics()).equipped.explorador,'tower_explorador');checks.push('Aren Union retains its authorized visuals/mechanics; Tower selection cannot hide Union and dormant Tower equipment survives unchanged');
  await sql(b,users[0],"select public.sync_game_wallet_v3('[]','{}',null)");assert.equal(Object.keys((await cosmetics()).equipped).length,11);assert.equal((await cosmetics()).frame,'tower_leyenda');
  const saved={action:'equip_costume',character:'explorador',item:null,revision:state.revision,request:uuid()};const first=await cosmetics(saved);assert.deepEqual(await cosmetics(saved,users[0],b),first);await assert.rejects(cosmetics({...saved,item:'tower_explorador'}),/reused/);
  await assert.rejects(cosmetics({action:'equip_costume',character:'mago',item:'tower_explorador',revision:first.revision}),/Wrong costume/);
  await assert.rejects(cosmetics({action:'equip_frame',item:'tower_conquistador',revision:0}),/STALE/);
  await assert.rejects(cosmetics({action:'equip_frame',item:'tower_leyenda',revision:0},users[1]),/not owned/);
  for(const item of [...chars.map(c=>'tower_'+c),'tower_conquistador','tower_maestro','tower_leyenda'])await assert.rejects(sql(a,users[0],'select public.purchase_game_costume($1)',[item]),/no está disponible/);
  checks.push('All 11 costumes/3 frames equip on A and persist on B; old wallet/appearance clients preserve new equipment; stale/cross-character/foreign/unowned and purchase attempts rejected');
  // Optimistic revision rejects concurrent conflicting equipment on separate connections.
  state=await cosmetics();const race=await Promise.allSettled([cosmetics({action:'equip_frame',item:'tower_conquistador',revision:state.revision}),cosmetics({action:'equip_frame',item:'tower_maestro',revision:state.revision},users[0],b)]);assert.equal(race.filter(x=>x.status==='fulfilled').length,1);
  checks.push('Two-device equipment race commits one revision; lost successful response replays its exact receipt');
  const current=await cosmetics();await owner.query('update versus_private.tower_cosmetic_rollout set grants_enabled=false');assert.equal((await cosmetics({action:'sync'})).owned.length,14);assert.deepEqual((await cosmetics()).equipped,current.equipped);
  checks.push('Rollback flag disables grants without removing ownership, equipment, coins or progress');
  const purchases=(await owner.query('select user_id,owned,equipped from versus_private.game_wallets where user_id=any($1) order by user_id',[users.slice(0,20)])).rows;
  for(const w of purchases){assert.deepEqual(w.owned,['aren-bosque']);assert.deepEqual(w.equipped,w.user_id===users[0]?{}:{explorador:'aren-bosque'});}
  const result={passed:true,productionConnections:0,productionWrites:0,fixture:'ephemeral real PostgreSQL; synthetic accounts',migration,globalRewardsActivated:false,floorCases:floors.length,languageConfigurations:330,maximumCoins:5720,ownedCosmetics:14,checks,floors};fs.writeFileSync(path.join(root,'docs/tower-rewards-postgres-results.json'),JSON.stringify(result,null,2));console.log(JSON.stringify({...result,floors:undefined},null,2));
 }finally{await f.runtime.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
