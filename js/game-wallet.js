(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.GameWallet=api.create(root.CosmeticStore,root);
})(globalThis,()=>{
  'use strict';
  function create(store,root){
    let client=null,userId=null,queue=Promise.resolve(),timer=null;
    const notify=()=>root.dispatchEvent?.(new Event('wallet-updated'));
    const check=id=>{if(!id||id!==userId||store.read().accountId!==id)throw Error('La cuenta cambió. Volvé a intentar.');};
    function enqueue(operation){
      const id=userId;
      const run=()=>{check(id);return operation(id);};
      const next=queue.then(()=>root.navigator?.locks?root.navigator.locks.request('aventura-wallet',run):run());
      queue=next.catch(()=>{});return next;
    }
    async function rpc(id,name,args){
      check(id);
      const {data,error}=await client.rpc(name,args);
      check(id);
      if(error)throw Error(error.message||'No pudimos sincronizar las monedas. Reintentá con conexión.');
      if(data?.userId!==id)throw Error('No pudimos verificar el saldo de tu cuenta.');
      return data;
    }
    async function syncNow(id,matchId=null){
      let result;
      do {
        check(id);const state=store.read();
        result=await rpc(id,'sync_game_wallet',{
          p_legacy:state.legacy?{...state.legacy,equipped:state.equipped}:null,p_events:state.pending.slice(0,100),
          p_equipped:state.equipmentDirty?state.equipped:null,p_match_id:matchId,
        });
        store.applyAccount(result,state.equipmentVersion);notify();
      } while(store.read().pending.length);
      return result;
    }
    const sync=matchId=>enqueue(id=>syncNow(id,matchId));
    function schedule(){
      if(!userId)return;
      root.clearTimeout(timer);
      timer=root.setTimeout(()=>{void sync().catch(()=>{
        root.dispatchEvent?.(new Event('wallet-sync-pending'));
      });},100);
    }
    function connect(nextClient,id){
      client=nextClient;userId=id||null;
      store.setPurchaseHandler(null);
      if(!userId)return;
      store.beginAccount(userId);notify();
      store.setPurchaseHandler(skin=>enqueue(async account=>{
        await syncNow(account);
        const result=await rpc(account,'purchase_game_costume',{p_skin:skin});
        store.applyAccount(result);notify();return store.read();
      }));
      schedule();
    }
    root.addEventListener?.('wallet-local-changed',schedule);
    root.addEventListener?.('online',schedule);
    root.addEventListener?.('focus',schedule);
    root.document?.addEventListener('visibilitychange',()=>{if(!root.document.hidden)schedule();});
    return Object.freeze({connect,sync});
  }
  return {create};
});
