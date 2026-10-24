/* Reward state is independent from the local story save. Browser completions are never proof. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.AdventureRewards=api.create({storage:root.localStorage,account:()=>root.CosmeticStore.read().accountId,claims:()=>root.CosmeticStore.read().missionClaims,online:()=>root.navigator.onLine,connect:()=>root.AventuraShop.connect(),rpc:args=>root.GameWallet.rewardAttempt(args),id:()=>root.crypto.randomUUID(),changed:()=>root.dispatchEvent(new Event('adventure-rewards-updated'))});})(globalThis,()=>{
 'use strict';
 function create({storage,account,claims=()=>[],online,connect=async()=>{},rpc,id,changed=()=>{}}){
  let active=null,generation=0;
  const key=owner=>'aventuraRecompensasOnlineV1:'+owner;
  const missionKey=(w,m)=>w+':'+m;
  const valid=(w,m)=>Number.isInteger(w)&&w>=0&&w<5&&Number.isInteger(m)&&m>=0&&m<10;
  function read(owner=account()){try{return owner?JSON.parse(storage.getItem(key(owner))||'{}'):{};}catch{throw Error('No pudimos leer el estado de tus recompensas.');}}
  function save(owner,w,m,value){if(!owner)return;const state=read(owner);state[missionKey(w,m)]=value;storage.setItem(key(owner),JSON.stringify(state));changed();}
  function status(w,m){
   try{
   if(claims().includes('aventura:'+w+':'+m+':mision'))return 'claimed';
   const state=read()[missionKey(w,m)];
   if(['finish_submitted','awaiting_verification'].includes(state?.status))return 'processing';
   if(active?.owner===account()&&active.world===w&&active.mission===m&&!active.interrupted)return 'playing_online';
   if(state?.status==='unavailable')return 'unavailable';
   if(['running','retry_required'].includes(state?.status))return 'replay_required';
   return 'pending';
   }catch{return 'unavailable';}
  }
  async function cancel(){
   generation++;const previous=active;active=null;
   if(previous&&!previous.submitted){save(previous.owner,previous.world,previous.mission,{...previous,status:previous.actionPending?'finish_submitted':'retry_required'});
    if(online()&&account()===previous.owner&&previous.attemptId)try{await rpc({p_action:'interrupt',p_attempt:previous.attemptId});}catch{}
   }
  }
  async function begin(world,mission){
   if(!valid(world,mission))throw Error('Misión inválida.');
   if(active?.owner===account()&&active.world===world&&active.mission===mission&&!active.interrupted)return active;
   await cancel();const token=++generation;
   if(!online())return;
   let owner=null;
   try{
    owner=account();await connect();owner=account();if(!owner||!online()||token!==generation)return;
    const response=await rpc({p_action:'begin',p_world:world,p_mission:mission,p_request:id()});
    const a=response.attempt;
    if(!a||account()!==owner)return;
    if(token!==generation||!online()){
     if(a.id)try{await rpc({p_action:'interrupt',p_attempt:a.id});}catch{}
     return;
    }
    if(a.status==='running'){active={owner,world,mission,attemptId:a.id,status:'running',interrupted:false,gameplayVersion:a.gameplayVersion};save(owner,world,mission,active);return active;}
    else save(owner,world,mission,{attemptId:a.id,status:a.status});
   }catch{if(token===generation){if(owner)save(owner,world,mission,{status:'unavailable'});else changed();}} // Story remains playable if rewards are unavailable.
  }
  async function complete(world,mission){
   if(!valid(world,mission))throw Error('Misión inválida.');
   const run=active;
   if(!run||run.owner!==account()||run.world!==world||run.mission!==mission||run.interrupted||!online()){
    if(run&&!run.submitted)await cancel();changed();return;
   }
   if(run.submitted)return;
   run.submitted=true;save(run.owner,world,mission,{attemptId:run.attemptId,status:'finish_submitted'});
   try{const response=await rpc({p_action:'finish',p_attempt:run.attemptId});if(account()===run.owner)save(run.owner,world,mission,{attemptId:run.attemptId,status:response.attempt.status});}
   catch{ /* Keep the receipt request; recover only with a read/status operation. */ }
   finally{if(active===run)active=null;}
  }
  function disconnected(){
   generation++;
   if(active&&!active.submitted){active.interrupted=true;save(active.owner,active.world,active.mission,{...active,status:active.actionPending?'finish_submitted':'retry_required'});}
   changed();
  }
  function actionPending(attemptId){if(active?.attemptId===attemptId){active.actionPending=true;save(active.owner,active.world,active.mission,{attemptId,status:'finish_submitted'});}}
  function actionConfirmed(attemptId,response){if(active?.attemptId!==attemptId||active.owner!==account())return;active.actionPending=false;save(active.owner,active.world,active.mission,{attemptId,status:['credited','already_claimed'].includes(response.attempt.status)?response.attempt.status:active.interrupted?'retry_required':response.attempt.status});}
  function actionLost(attemptId){if(active?.attemptId!==attemptId)return;active.actionPending=false;active.interrupted=true;active.submitted=true;save(active.owner,active.world,active.mission,{attemptId,status:'finish_submitted'});}
  async function recover(){
   if(!online()||!account())return;const owner=account(),state=read(owner);
   for(const [which,value]of Object.entries(state)){
    if(!['finish_submitted','awaiting_verification'].includes(value.status)||!value.attemptId)continue;
    if(owner!==account())return;
    try{const response=await rpc({p_action:'status',p_attempt:value.attemptId});if(owner!==account())return;const [w,m]=which.split(':').map(Number);save(owner,w,m,{attemptId:value.attemptId,status:response.attempt.status==='running'?'retry_required':response.attempt.status});}catch{}
   }
  }
  return Object.freeze({begin,complete,cancel,disconnected,recover,status,read,actionPending,actionConfirmed,actionLost});
 }
 return {create};
});
