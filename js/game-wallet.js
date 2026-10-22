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
      if(data?.activationError)throw Error(data.activationError);
      if(data?.userId!==id)throw Error('No pudimos verificar el saldo de tu cuenta.');
      return data;
    }
    async function syncNow(id,matchId=null){
      let result;
      do {
        check(id);const state=store.read();
        result=await rpc(id,'sync_game_wallet_v2',{
          p_legacy:state.legacy?{...state.legacy,equipped:state.equipped}:null,p_events:state.pending.slice(0,100),
          p_equipped:state.equipmentDirty?state.equipped:null,p_match_id:matchId,
        });
        store.applyAccount(result,state.equipmentVersion);notify();
      } while(store.read().pending.length);
      if(root.CharacterStore){
        const inventory=await rpc(id,'game_characters',{p_action:'sync',p_character:null});
        root.CharacterStore.apply(inventory.characters,id);
      }
      return result;
    }
    const sync=matchId=>enqueue(id=>syncNow(id,matchId));
    const adminAction=(name,args)=>enqueue(async id=>{
      await syncNow(id);
      const result=await rpc(id,name,args);
      store.applyAccount(result);notify();return store.read();
    });
    const activateAdmin=code=>adminAction('activate_game_admin',{p_code:code});
    const setAdminUnion=enabled=>adminAction('set_admin_union_access',{p_enabled:Boolean(enabled)});
    const backgrounds=(action,id)=>enqueue(async account=>{
      if(root.AventuraShop?.testing())throw Error(root.ProfileBackgrounds?.text('testing')||'Volvé del modo de prueba para comprar o equipar.');
      await syncNow(account);
      let worlds=0;
      try{const progress=JSON.parse(root.localStorage?.getItem('progresoAventuraGA')||'{}');worlds=Math.max(0,Math.min(5,Number(progress.cristalesObtenidos)||0));if(progress.mundoTresCompletado)worlds=Math.max(worlds,3);if(progress.mundoCuatroCompletado)worlds=Math.max(worlds,4);}catch(_){}
      const result=await rpc(account,'profile_backgrounds',{p_action:action,p_background:id,p_legacy_worlds:Math.trunc(worlds)});
      if(result.backgrounds?.userId!==account)throw Error('No pudimos verificar tus fondos.');
      store.applyAccount(result);notify();return result.backgrounds;
    });
    const characters=(action,id)=>enqueue(async account=>{
      if(root.AventuraShop?.testing())throw Error('Volvé del modo de prueba para comprar.');
      await syncNow(account);
      const result=await rpc(account,'game_characters',{p_action:action,p_character:id});
      if(result.characters?.userId!==account)throw Error('No pudimos verificar tus personajes.');
      store.applyAccount(result);notify();return result.characters;
    });
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
    return Object.freeze({connect,sync,activateAdmin,setAdminUnion,backgrounds,characters});
  }
  return {create};
});
