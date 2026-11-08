'use strict';
const test=require('node:test'),assert=require('assert/strict'),Tower=require('../js/tower-online.js');
const tick=()=>new Promise(r=>setImmediate(r));
function fixture(){
 let owner='a',serial=0,attempt=null,payments=true,lose=false,hold=false,release;
 const data=new Map(),calls=[],rewards=[],ledger=new Map(),attempts=new Map();let coins=0;
 const storage={getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};
 const rpc=async args=>{
  calls.push(structuredClone(args));const user=owner;
  if(args.p_action==='status')return{userId:user,enabled:true,progress:[],pendingRewards:[]};
  if(args.p_action==='begin'){attempt={id:'attempt-'+(++serial),character:args.p_payload.character,floor:args.p_payload.floor,language:args.p_payload.language,status:'prepared',sequence:0,completedFloors:0};attempts.set(attempt.id,attempt);}
  else attempt=attempts.get(args.p_attempt);
  if(args.p_action==='letter'){attempt.status='won';attempt.sequence++;}
  const result={userId:user,attempt:structuredClone(attempt)};
  if(args.p_action==='settle'){
   const key=user+':'+attempt.character+':'+attempt.floor,existing=ledger.get(key);result.newlyCredited=false;
   if(payments&&!existing){const receipt={id:'receipt-'+key,userId:user,attemptId:attempt.id,character:attempt.character,floor:attempt.floor,amount:30,confirmed:true};ledger.set(key,receipt);coins+=30;result.newlyCredited=true;}
   result.receipt=ledger.get(key)||null;result.pending=!result.receipt;
   if(hold)await new Promise(r=>release=r);
   if(lose){lose=false;throw Error('lost after commit');}
  }
  return result;
 };
 const device=()=>Tower.create({rpc,account:()=>owner,storage,online:()=>true,id:()=>String(++serial),onReward:r=>rewards.push(r)});
 return{device,calls,rewards,coins:()=>coins,account:v=>owner=v,payments:v=>payments=v,lose:()=>lose=true,hold:()=>hold=true,release:()=>{hold=false;release();},settles:()=>calls.filter(c=>c.p_action==='settle')};
}
test('confirmed attempt and concurrent settlement share one RPC; reconnect does not settle it again',async()=>{
 const f=fixture(),a=f.device();await a.prepare('explorador',1,'es');f.hold();const winning=a.send('letter',{letter:'A'});await tick();
 const first=a.settle(),second=a.settle();assert.equal(first,second);assert.equal(f.settles().length,1);f.release();await Promise.all([winning,first,second]);
 await a.settle();await a.recover();assert.equal(f.settles().length,1);assert.equal(f.coins(),30);assert.equal(f.rewards.length,1);
});
test('a new replay of the same floor is still validated and never pays or celebrates twice',async()=>{
 const f=fixture(),a=f.device();await a.prepare('explorador',1,'es');await a.send('letter',{letter:'A'});const original=a.view().id;
 await a.prepare('explorador',1,'es');assert.notEqual(a.view().id,original);const before=f.settles().length;await a.send('letter',{letter:'A'});await a.settle();
 assert.equal(f.settles().length,before+1);assert.equal(f.coins(),30);assert.equal(f.rewards.length,1);
});
test('an unconfirmed payment remains retryable instead of being remembered as paid',async()=>{
 const f=fixture(),a=f.device();f.payments(false);await a.prepare('explorador',1,'es');await a.send('letter',{letter:'A'});assert.equal(f.coins(),0);
 f.payments(true);await a.settle();await a.settle();assert.equal(f.settles().length,2);assert.equal(f.coins(),30);assert.equal(f.rewards.length,1);
});
test('lost confirmation survives a clean client and resends the exact pending request once',async()=>{
 const f=fixture(),a=f.device();await a.prepare('explorador',1,'es');f.lose();await a.send('letter',{letter:'A'});assert.equal(f.coins(),30);
 const pending=f.settles()[0],b=f.device();await b.prepare('explorador',1,'es');
 assert.equal(f.settles().length,2);assert.deepEqual(f.settles()[1],pending);assert.equal(f.coins(),30);assert.equal(f.rewards.length,1);
});
test('an account switch rejects an in-flight receipt without displaying it for the new account',async()=>{
 const f=fixture(),a=f.device();await a.prepare('explorador',1,'es');f.hold();const winning=a.send('letter',{letter:'A'});await tick();f.account('b');f.release();await winning;
 assert.equal(await a.settle(),null);assert.equal(f.rewards.length,0);assert.equal(f.settles().length,1);
});
