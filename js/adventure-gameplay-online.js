/* Online authority adapter. A lost action is never queued for submission on reconnect. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;
 else root.AdventureOnline=api.create({rpc:args=>root.GameWallet.gameAction(args),id:()=>root.crypto.randomUUID(),
 account:()=>root.CosmeticStore.read().accountId,online:()=>root.navigator.onLine,
 pending:id=>root.AdventureRewards.actionPending(id),confirmed:(id,r)=>root.AdventureRewards.actionConfirmed(id,r),lost:id=>root.AdventureRewards.actionLost(id)});
})(globalThis,()=>{
 'use strict';
 function create({rpc,id,account,online,pending=()=>{},confirmed=()=>{},lost=()=>{},interval=setInterval,stop=clearInterval}){
  let run=null,current=null,queue=Promise.resolve(),timer=null,generation=0;
  function clear(){generation++;run=null;current=null;if(timer!==null)stop(timer);timer=null;}
  function handles(world,mission,kind){return Boolean(run&&run.owner===account()&&run.world===world&&run.mission===mission&&current?.kind===kind);}
  function action(action,payload={}){
   const captured=run,token=generation,capturedPhase=current?.phase;
   const task=async()=>{
    if(!captured||run!==captured||token!==generation||captured.owner!==account()||!online())return null;
    if(current?.complete&&action!=='open')return current;
    if(!['open','next','heartbeat'].includes(action)&&capturedPhase!==current?.phase)return current;
    if(current?.phaseDone&&current.kind?.startsWith('duel:')&&action==='puzzle'&&['tick','letter','ability'].includes(payload.op))return current;
    try{
     const args={p_attempt:captured.attemptId,p_request:id(),p_sequence:current?.sequence||0,p_action:action,p_payload:payload};
     pending(captured.attemptId);
     const response=await rpc(args);confirmed(captured.attemptId,response);
     if(run!==captured||token!==generation||captured.owner!==account())return null;
     if(!response.game||response.attempt.status==='retry_required'){clear();return null;}
     current=response.game;
     if(current.complete&&timer!==null){stop(timer);timer=null;}
     return current;
    }catch{try{lost(captured.attemptId);}catch{}if(run===captured)clear();return null;}
   };
   const next=queue.then(task);queue=next.catch(()=>{});return next;
  }
  async function prepare(attempt,world,mission,phase,language,reducedMotion=false){
   await queue;
   if(attempt?.gameplayVersion==='sql-actions-v1'&&run?.attemptId!==attempt.attemptId){
    clear();run={...attempt};current=null;
    if(!await action('open',reducedMotion?{language,reducedMotion:true}:{language})){clear();return null;}
    timer=interval(()=>{if(!online()||run?.owner!==account()){clear();return;}void action('heartbeat');},20000);
   }
   if(!run||run.world!==world||run.mission!==mission||run.owner!==account()||!online()){clear();return null;}
   if(current.phase===phase&&current.kind==='word'&&current.errors===6)await action('restart_word');
   else if(current.phase+1===phase&&current.phaseDone)await action('next');
   if(current?.phase!==phase){clear();return null;}
   return current;
  }
  return Object.freeze({prepare,action,handles,view:()=>current,clear,flush:()=>queue});
 }
 return {create};
});
