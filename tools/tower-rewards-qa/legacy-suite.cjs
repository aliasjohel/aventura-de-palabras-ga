'use strict';
// Real PostgreSQL, synthetic accounts, loopback only. No production connection.
const fs=require('fs'),path=require('path'),assert=require('assert/strict'),{randomUUID:uuid,createHash}=require('crypto');
const root=path.resolve(__dirname,'../..'),migration='20261031183634_tower_authoritative_combat_and_coins.sql';
const users=Array.from({length:53},(_,i)=>`10000000-0000-4000-8000-${String(i+1).padStart(12,'0')}`),chars=['explorador','mago','guardiana','dragon','hombre_lobo','guardian_alba','dragon_hielo','kalamo','kairos','t_shadow','azrak'];
async function fixture(){
 const manifest=JSON.parse(fs.readFileSync(path.join(__dirname,'fixture-manifest.json'))),migrationDir=path.join(__dirname,'migrations');
 assert.deepEqual(fs.readdirSync(migrationDir).filter(f=>f.endsWith('.sql')).sort(),manifest.migrations.map(m=>m.file));
 for(const m of manifest.migrations)assert.equal(createHash('sha256').update(fs.readFileSync(path.join(migrationDir,m.file),'utf8').replaceAll('\r\n','\n')).digest('hex'),m.sha256,'Test-only baseline changed: '+m.file);
 const runtime=await require('../postgres-qa/runtime.cjs').create(),owner=await runtime.connect();
 try{
 const sources=Object.fromEntries(fs.readdirSync(path.join(root,'tools/tower-rewards-qa/migrations')).filter(f=>f.endsWith('.sql')&&f<migration).map(f=>[f,fs.readFileSync(path.join(root,'tools/tower-rewards-qa/migrations',f),'utf8')]));
 await require('../postgres-qa/load-schema.cjs').load(owner,{sources});
 for(let i=0;i<users.length;i++)await owner.query('insert into auth.users(id,email,email_confirmed_at,is_anonymous) values($1,$2,case when $3 then now() end,$4)',[users[i],`synthetic${i}@example.invalid`,i<52,i===52]);
 for(let i=0;i<20;i++)await owner.query("insert into versus_private.game_wallets(user_id,coins,owned,equipped,revision) values($1,$2,array['aren-bosque'],jsonb_build_object('explorador','aren-bosque'),7)",[users[i],i===0?777:50]);
 for(const u of users.slice(0,2)){
 await owner.query("insert into versus_private.character_inventory(user_id,owned) values($1,array['hombre_lobo','kairos','kalamo','guardian_alba','t_shadow'])",[u]);
 for(let world=0;world<5;world++){
 const id=uuid();await owner.query('insert into versus_private.adventure_reward_attempts(id,user_id,world,mission,request_id) values($1,$2,$3,9,$4)',[id,u,world,uuid()]);
 await owner.query("insert into versus_private.verified_adventure_completions(attempt_id,user_id,world,mission,evidence_id,verifier_version,completed_at) values($1,$2,$3,9,$4,'synthetic-qa-only',now())",[id,u,world,uuid()]);
 }}
 const snapshot=async({excludeWallet=false}={})=>{const tables=(await owner.query("select schemaname,tablename from pg_tables where schemaname in ('public','versus_private','auth') and tablename not like 'tower_%' order by 1,2")).rows;const result={};for(const t of tables){if(excludeWallet&&t.tablename==='game_wallets')continue;const r=await owner.query(`select coalesce(jsonb_agg(to_jsonb(t) order by to_jsonb(t)::text),'[]') data from "${t.schemaname}"."${t.tablename}" t`);result[t.schemaname+'.'+t.tablename]=createHash('sha256').update(JSON.stringify(r.rows[0].data)).digest('hex');}return result;};
 const before=await snapshot();const functions=(await owner.query("select p.oid::regprocedure::text name,pg_get_functiondef(p.oid) definition from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname in ('public','versus_private') order by 1")).rows;
 await owner.query('begin');await owner.query(fs.readFileSync(path.join(root,'tools/tower-rewards-qa/migrations',migration),'utf8'));await owner.query('commit');
 assert.deepEqual(await snapshot(),before,'Installing the draft must preserve every existing row');
 for(const fn of functions){const now=(await owner.query('select pg_get_functiondef($1::regprocedure) definition',[fn.name])).rows[0].definition;assert.equal(now,fn.definition,'Existing function changed: '+fn.name);}
 await owner.query("create table public.qa_tower_clock(value timestamptz);insert into public.qa_tower_clock values('2026-10-31 12:00:00+00');revoke all on public.qa_tower_clock from public,anon,authenticated,service_role;create or replace function versus_private.tower_server_now() returns timestamptz language sql volatile set search_path='' as $$select value from public.qa_tower_clock$$");
 const clients=[await runtime.connect(),await runtime.connect()];
 async function sql(client,user,query,values=[],role='authenticated'){await client.query('begin');try{await client.query('set local role '+role);await client.query("select set_config('request.jwt.claim.sub',$1,true),set_config('request.jwt.claims',$2,true)",[user||'',JSON.stringify({sub:user,role,is_anonymous:user===users[52]})]);const r=await client.query(query,values);await client.query('commit');return r;}catch(e){await client.query('rollback');throw e;}}
 const rpc=(client,user,args={})=>sql(client,user,'select public.tower_game($1,$2,$3,$4,$5) result',[args.p_action||'status',args.p_attempt||null,args.p_request||null,args.p_sequence??null,args.p_payload||{}]).then(r=>r.rows[0].result);
 const clock=async ms=>owner.query("update public.qa_tower_clock set value=value+$1*interval '1 millisecond'",[ms]);
 return {runtime,owner,clients,sql,rpc,clock,snapshot,before,users,chars,migration};
 }catch(error){await runtime.close();throw error;}
}
exports.fixture=fixture;
async function main(){
 const f=await fixture(),{owner,clients:[a,b],rpc,sql,clock}=f;const results={database:'isolated real PostgreSQL',syntheticAccounts:53,productionWrites:0,migration:f.migration,checks:[]};
 const check=(name)=>results.checks.push(name),call=(args,user=users[0],client=a)=>rpc(client,user,args),action=(attempt,name,payload={},request=uuid())=>call({p_action:name,p_attempt:attempt.id,p_request:request,p_sequence:attempt.sequence,p_payload:payload});
 const begin=async(character='explorador',floor=1,language='es',user=users[0],client=a)=>rpc(client,user,{p_action:'begin',p_request:uuid(),p_payload:{character,floor,language,reducedMotion:false}}).then(r=>r.attempt);
 const state=async id=>(await owner.query('select state from versus_private.tower_attempts where id=$1',[id])).rows[0].state;
 async function win(attempt){attempt=(await action(attempt,'start')).attempt;for(let guard=0;attempt.status==='playing'&&guard<100;guard++){
 const s=await state(attempt.id),word=(await owner.query("select versus_private.tower_duel_word($1,'player') word",[s])).rows[0].word;
 const letter=[...word].find(l=>!s.player.letters.includes(l));assert(letter,'No legal word input available');attempt=(await action(attempt,'letter',{letter,word:s.player.index})).attempt;
 }assert.equal(attempt.status,'won');return attempt;}
 try{
 assert.equal((await call()).enabled,false);await assert.rejects(begin(),/disabled/);check('Default rollout and payments OFF; installation preserves every existing table and function');
 await owner.query('update versus_private.tower_rollout set enabled=true,payments_enabled=true');assert.equal((await call()).enabled,false);await assert.rejects(begin(),/disabled/);check('Empty pilot list fails closed; global activation requires its explicit flag');
 await owner.query('update versus_private.tower_rollout set global_enabled=true');
 await assert.rejects(begin('explorador',10),/TOWER_FLOOR_LOCKED/);await assert.rejects(begin('explorador',2),/TOWER_FLOOR_LOCKED/);check('New character Tower starts at floor 1; direct RPC skips denied');
 for(const [user,role]of [[users[52],'authenticated'],[null,'anon']])await assert.rejects(sql(a,user,'select public.tower_game()',[],role),/permission denied|verified permanent/);
 for(const query of ['select * from versus_private.tower_attempts','select * from versus_private.tower_progress',"update versus_private.tower_progress set completed=10","select versus_private.tower_duel_actor('explorador:1','es')","update versus_private.tower_rollout set enabled=true","insert into versus_private.tower_coin_receipts(user_id) values(auth.uid())"] )await assert.rejects(sql(a,users[0],query),/permission denied/);
 await assert.rejects(begin('kalamo',1,'es',users[2]),/not owned/);check('Anonymous and unowned characters denied; private state, clock, configuration and ledgers inaccessible');
 let t=await begin();const initial=t;
 assert(!JSON.stringify(t).includes('bankVersion'));assert(!Object.hasOwn(t.detail.player,'words'));assert.deepEqual(t.detail.npc.letters,[]);
 await assert.rejects(begin(),/existing Tower/);
 await assert.rejects(call({p_action:'resume',p_attempt:t.id,p_request:uuid()},users[1]),/unavailable/);
 await assert.rejects(action(t,'settle'),/not verified/);
 await assert.rejects(action(t,'letter',{letter:'A',word:0,winner:'player',coins:150}),/payload/);
 await assert.rejects(action(t,'finish',{winner:'player'}),/Invalid Tower action/);
 const req=uuid(),args={p_action:'start',p_attempt:t.id,p_request:req,p_sequence:t.sequence,p_payload:{}};
 const started=await call(args);assert.deepEqual(await call(args),started);await assert.rejects(call({...args,p_action:'tick'}),/reused/);t=started.attempt;
 const stale=await action(initial,'letter',{letter:'A',word:0});assert.equal(stale.stale,true);assert.equal(stale.attempt.sequence,t.sequence);
 const lost=uuid(),s=await state(t.id),word=(await owner.query("select versus_private.tower_duel_word($1,'player') word",[s])).rows[0].word;
 const letterArgs={p_action:'letter',p_attempt:t.id,p_request:lost,p_sequence:t.sequence,p_payload:{letter:word[0],word:0}};const first=await call(letterArgs);assert.deepEqual(await call(letterArgs),first);t=first.attempt;
 check('Server-only outcome, payload validation, ownership, stale sequence and lost-response idempotency');
 t=await win(t);assert.equal(t.completedFloors,1);const next=(await begin('explorador',2));await action(next,'abandon');await assert.rejects(begin('mago',2),/TOWER_FLOOR_LOCKED/);await assert.rejects(begin('explorador',2,'es',users[1]),/TOWER_FLOOR_LOCKED/);check('Winning unlocks next floor before settlement; no cross-character or cross-account progress');const settleArgs={p_action:'settle',p_attempt:t.id,p_request:uuid()};
 const paid=await Promise.all([rpc(a,users[0],settleArgs),rpc(b,users[0],{...settleArgs,p_request:uuid()})]);assert.equal(paid.filter(r=>r.newlyCredited).length,1);assert.equal(paid[0].receipt.id,paid[1].receipt.id);assert.equal(paid[0].receipt.amount,30);
 assert.equal((await call(settleArgs)).newlyCredited,false);const replay=await win(await begin());assert.equal((await action(replay,'settle')).newlyCredited,false);check('Concurrent settlements, reconnection and replayed floors pay exactly once');
 for(const language of ['es','en','pt-BR'])for(const character of chars)for(let floor=1;floor<=10;floor++){
 const attempt=await win(await begin(character,floor,language));const response=await action(attempt,'settle');assert.equal(response.receipt.amount,floor<=4?30:floor<=9?50:150);
 }
 const totals=(await owner.query('select count(*)::int count,sum(amount)::int coins from versus_private.tower_coin_receipts where user_id=$1',[users[0]])).rows[0];assert.deepEqual(totals,{count:110,coins:5720});results.completedFights=332;results.languageConfigurations=330;results.maximumCoins=totals.coins;check('All 11 characters × 10 floors × 3 languages finish through legal letters; cap 110 rewards / 5720 coins');
 // No client elapsed time is used. Real lazy NPC turns and timeout use the server clock.
 t=await begin('explorador',10);t=(await action(t,'start')).attempt;const original=await state(t.id);await clock(10000);t=(await action(t,'tick')).attempt;const advanced=await state(t.id);assert(advanced.event_seq>original.event_seq);await clock(300000);t=(await action(t,'resume')).attempt;assert(['lost','draw'].includes(t.status));await assert.rejects(action(t,'settle'),/not verified/);check('NPC advances without client moves; server timeout cannot be submitted as a win');
 // Abandon and prepared expiry free the unique active slot.
 t=await begin();await clock(901000);t=(await action(t,'resume')).attempt;assert.equal(t.status,'expired');t=await begin();t=(await action(t,'abandon')).attempt;assert.equal(t.status,'abandoned');check('Prepared expiry and abandonment release the active slot without payouts');
 // Ability state fixtures are created by QA owner only, then exercised via authenticated API.
 const abilityResults=[];
 for(const character of chars){t=await begin(character,1);t=(await action(t,'start')).attempt;await owner.query("update versus_private.tower_attempts set state=jsonb_set(state,'{player,charge}','8') where id=$1",[t.id]);t=(await action(t,'ability')).attempt;let s=await state(t.id);assert.equal(s.player.charge,0);assert.equal(s.pending.length,1);const kind=s.pending[0].kind;
 await clock(750);t=(await action(t,'tick')).attempt;s=await state(t.id);
 if(kind==='hint')assert(s.player.hint);else if(kind==='forced_miss')assert.equal(s.npc.errors,1);else assert.equal(s.npc.effect,kind);
 if(kind==='time_steal')assert.equal(Date.parse(s.player.deadline)-Date.parse(s.npc.deadline),20000);
 abilityResults.push({character,effect:kind});await action(t,'abandon');}
 results.abilities=abilityResults;check('All 11 player abilities: authoritative charge, windup, effects and Kairos time subtraction');
 // Payments OFF retains proof, no credit, then recovers exactly once when enabled.
 t=await begin('explorador',1,'es',users[1]);const actionB=async(t,n,p={})=>rpc(a,users[1],{p_action:n,p_attempt:t.id,p_request:uuid(),p_sequence:t.sequence,p_payload:p});
 t=(await actionB(t,'start')).attempt;for(let n=0;t.status==='playing'&&n<100;n++){const s=await state(t.id),w=(await owner.query("select versus_private.tower_duel_word($1,'player') w",[s])).rows[0].w;t=(await actionB(t,'letter',{letter:[...w].find(l=>!s.player.letters.includes(l)),word:s.player.index})).attempt;}
 await owner.query('update versus_private.game_wallets set coins=9007199254740991 where user_id=$1',[users[1]]);await assert.rejects(actionB(t,'settle'),/check constraint/);assert.equal((await owner.query('select count(*)::int n from versus_private.tower_coin_receipts where user_id=$1',[users[1]])).rows[0].n,0);assert.equal((await owner.query('select count(*)::int n from versus_private.tower_verified_floors where user_id=$1',[users[1]])).rows[0].n,0);await owner.query('update versus_private.game_wallets set coins=50 where user_id=$1',[users[1]]);check('A wallet constraint failure rolls back both ledgers atomically; no partial reward survives');
 await owner.query('update versus_private.tower_rollout set payments_enabled=false');assert.equal((await actionB(t,'settle')).pending,true);await owner.query('update versus_private.tower_rollout set payments_enabled=true');assert.equal((await actionB(t,'settle')).newlyCredited,true);assert.equal((await actionB(t,'settle')).newlyCredited,false);check('Payment gate preserves verified proof and recovers one credit without replaying gameplay');
 const progressB=(await owner.query('select completed from versus_private.tower_progress where user_id=$1 and character_key=$2',[users[1],'explorador'])).rows[0].completed;assert.equal(progressB,1);check('Failed wallet credit does not roll back an already verified floor unlock');
 // NPC effects execute from scheduled server turns, never a client impact event.
 const npcAbilities=[];
 for(const rival of chars){const def=(await owner.query('select character_key,floor from versus_private.tower_definitions where rival=$1 order by key limit 1',[rival])).rows[0];let n=await begin(def.character_key,def.floor);n=(await action(n,'start')).attempt;
 await owner.query("update versus_private.tower_attempts set state=jsonb_set(jsonb_set(state,'{npc,charge}','8'),'{next_tick}',to_jsonb(versus_private.tower_server_now()+interval '1 millisecond')) where id=$1",[n.id]);await clock(1);n=(await action(n,'tick')).attempt;let st=await state(n.id);const e=st.pending[0];assert(e,'NPC ability missing: '+rival);assert.equal(st.npc.charge<8,true);await clock(750);n=(await action(n,'tick')).attempt;st=await state(n.id);
 if(e.kind==='hint')assert(st.npc.hint);else if(e.kind==='forced_miss'){assert.equal(st.player.effect,'forced_miss');await clock(2001);n=(await action(n,'tick')).attempt;st=await state(n.id);assert.equal(st.player.errors,1);}else assert.equal(st.player.effect,e.kind);
 if(rival==='dragon_hielo'){
  const ready=st.nybor_ready_at;assert(ready);await owner.query("update versus_private.tower_attempts set state=jsonb_set(jsonb_set(state,'{npc,charge}','8'),'{next_tick}',to_jsonb(versus_private.tower_server_now()+interval '1 millisecond')) where id=$1",[n.id]);await clock(1);n=(await action(n,'tick')).attempt;const cooldown=await state(n.id);assert.equal(cooldown.npc.charge,8);assert.equal(cooldown.pending.length,0);
 }
 npcAbilities.push({rival,effect:e.kind});await action(n,'abandon');}
 results.npcAbilities=npcAbilities;check('All 11 NPC abilities execute on server turns; Azrak delayed error and Nybor cooldown enforced');
 t=await begin();t=(await action(t,'start')).attempt;let wrongState=await state(t.id),wrongWord=(await owner.query("select versus_private.tower_duel_word($1,'player') w",[wrongState])).rows[0].w;
 const wrongs=[...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].filter(l=>!wrongWord.includes(l));for(const letter of wrongs.slice(0,6))t=(await action(t,'letter',{letter,word:0})).attempt;
 wrongState=await state(t.id);assert.equal(wrongState.player.lives,4);assert.equal(wrongState.player.index,1);assert.equal(wrongState.player.words.length,6);assert.equal(new Set(wrongState.player.words).size,6);assert(!Object.hasOwn(t.detail.player,'words'));await action(t,'abandon');check('Six wrong letters cost a life and add a distinct recovery word without exposing future words');
 const races=await Promise.allSettled([begin('explorador',1,'es',users[0],a),begin('explorador',2,'es',users[0],b)]);assert.equal(races.filter(x=>x.status==='fulfilled').length,1);await action(races.find(x=>x.status==='fulfilled').value,'abandon');check('Simultaneous begins serialize to one active attempt per account');
 const after=await f.snapshot({excludeWallet:true}),before={...f.before};delete after['public.qa_tower_clock'];delete before['versus_private.game_wallets'];assert.deepEqual(after,before);
 const wallets=(await owner.query('select user_id,coins,owned,equipped,revision from versus_private.game_wallets order by user_id')).rows;
 assert.equal(wallets.length,20);for(let i=0;i<20;i++){assert.equal(Number(wallets[i].coins),i===0?777+5720:i===1?80:50);assert.deepEqual(wallets[i].owned,['aren-bosque']);assert.deepEqual(wallets[i].equipped,{explorador:'aren-bosque'});assert.equal(Number(wallets[i].revision),i===0?117:i===1?8:7);}
 check('53 account fixture unchanged; XP, purchases, hints, profiles, progress and other-mode rewards byte-for-byte unchanged; wallet changes exactly the authorized Tower payouts');
 results.ok=true;fs.writeFileSync(path.join(root,'docs/tower-existing-postgres-candidate-results.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
 }finally{await f.runtime.close();}
}
if(require.main===module)main().catch(e=>{console.error(e);process.exitCode=1;});
