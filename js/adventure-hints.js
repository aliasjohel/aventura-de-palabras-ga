/* Paid help is authorized by the server; the local save only preserves presentation.
   Pending requests are persisted BEFORE sending, then retried with the same UUID. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;
else root.AdventureHints=api.create({storage:root.localStorage,account:()=>root.CosmeticStore.read().accountId,
online:()=>root.navigator.onLine,id:()=>root.crypto.randomUUID(),rpc:async args=>{
 const owner=root.CosmeticStore.read().accountId;await root.AventuraShop.connect();
 if(root.CosmeticStore.read().accountId!==owner)throw Error('account_changed');
 return root.GameWallet.adventureHelp(args);
}});
})(globalThis,()=>{
 'use strict';
 function create({storage,account,online,id,rpc,monotonic=()=>performance.now()}){
  let active=null,busy=false,syncing=false,anchor=null;
  const key=()=> 'aventuraPistasV1:'+(account()||'guest');
  function persist(value,storageKey=key()){
   const stored=JSON.parse(storage.getItem(storageKey)||'{"version":1,"slots":{}}');
   const slots=stored.slots||{};slots[value.slot]=value;
   storage.setItem(storageKey,JSON.stringify({version:1,slots}));
  }
  function save(value){persist(value);active=value;}
  function restore(slot){active=null;const stored=JSON.parse(storage.getItem(key())||'null');active=stored?.slots?.[slot]||null;return active;}
  function start(slot,data){const previous=restore(slot);if(previous&&!previous.finished)return previous;
   const value={version:1,owner:account(),slot,id:id(),stage:0,letters:[],errors:0,...data};save(value);return value;}
  function snapshot(){return active?.owner===account()?active:null;}
  function record(letters,errors,finished=false){if(!snapshot())return;save({...active,letters:[...new Set(letters)],errors,finished});}
  function localOnly(){if(snapshot())save({...active,localOnly:true});}
  function abandon(){if(snapshot())save({...active,finished:true});}
  async function request(action,payload){
   if(!snapshot()||!account()||!online()||busy)throw Error('unavailable');
   busy=true;const owner=account(),storageKey=key(),captured=active;
   try{
    // A response lost after a debit is recovered before another operation is issued.
    const pending=captured.pending||{p_request:id(),p_action:action,p_payload:payload};
    save({...captured,pending});
    const response=await rpc(pending);
    if(response.userId!==owner||response.id!==captured.id)throw Error('identity');
    const next={...captured,...response,pending:null};
    if(response.balanceRevision!==undefined)anchor={id:captured.id,at:monotonic(),server:Date.parse(response.serverNow)};
    // Write to the captured account, never to whichever account is now signed in.
    persist(next,storageKey);
    if(owner!==account()||active?.id!==captured.id)return null;
    active=next;return next;
   }finally{busy=false;}
  }
  async function use(){
   const state=snapshot();if(!state||state.finished||state.errors>=6||state.stage>=3)return null;
   if(state.pending){const recovered=await request(state.pending.p_action,state.pending.p_payload);if(!recovered||state.pending.p_action==='use')return recovered;}
   if(!active.opened){const opened=await request('open',{id:active.id,world:active.world,mission:active.mission,
    phase:active.phase,language:active.language,wordId:active.wordId,attemptId:active.attemptId||null});if(!opened)return null;}
   return request('use',{id:active.id,level:active.stage+1,letters:active.letters,errors:active.errors,localOnly:Boolean(active.localOnly)});
  }
  async function sync(){
   if(!snapshot()||!account()||!online()||busy||syncing||active.pending)return null;
   const captured=active,owner=account();syncing=true;
   try{
    const response=await rpc({p_request:id(),p_action:'sync',p_payload:{id:captured.id}});
    if(owner!==account()||active?.id!==captured.id)return null;
    if(response.userId!==owner||response.id!==captured.id)throw Error('identity');
    if(response.balanceRevision<(active.balanceRevision??-1))return active;
    const {balance,refillAt,refillCount,balanceRevision,serverNow}=response;
    save({...active,balance,refillAt,refillCount,balanceRevision,serverNow});
    anchor={id:active.id,at:monotonic(),server:Date.parse(serverNow)};return active;
   }finally{syncing=false;}
  }
  function remainingMs(){const state=snapshot();if(!state?.refillAt||anchor?.id!==state.id)return null;
   return Math.max(0,Date.parse(state.refillAt)-anchor.server-(monotonic()-anchor.at));}
  return Object.freeze({start,restore,snapshot,record,use,sync,remainingMs,localOnly,abandon,disable:()=>{active=null;},busy:()=>busy});
 }
 return {create};
});
