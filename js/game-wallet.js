(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.GameWallet=api.create(root.CosmeticStore,root);
})(globalThis,()=>{
  'use strict';
  function create(store,root){
    let client=null,userId=null,queue=Promise.resolve(),timer=null,connectionGeneration=0;
    const notify=()=>root.dispatchEvent?.(new Event('wallet-updated'));
    const check=id=>{if(!id||id!==userId||store.read().accountId!==id)throw Error('La cuenta cambió. Volvé a intentar.');};
    function enqueue(operation){
      const id=userId,generation=connectionGeneration;
      const run=()=>{check(id);if(generation!==connectionGeneration)throw Error('La sesión cambió. Volvé a intentar.');return operation(id);};
      // Server revisions and receipts fence this client's serialized queue.
      // A frozen legacy tab must not hold the authoritative runtime hostage.
      const next=queue.then(()=>root.AccountRuntimeV3?.installed?run():root.navigator?.locks?root.navigator.locks.request('aventura-wallet',run):run());
      queue=next.catch(()=>{});return next;
    }
    async function rpc(id,name,args){
      check(id);
      const generation=connectionGeneration;
      const {data,error}=root.AccountRuntimeV3?.handles(name,args)?{data:await root.AccountRuntimeV3.route(name,args),error:null}:root.AdventureAccountV2?.handles(name)?{data:await root.AdventureAccountV2.route(name,args),error:null}:await client.rpc(name,args);
      check(id);if(generation!==connectionGeneration)throw Error('La sesión cambió. Volvé a intentar.');
      if(error)throw Error(error.message||'No pudimos sincronizar las monedas. Reintentá con conexión.');
      if(data?.activationError)throw Error(data.activationError);
      if(data?.userId!==id)throw Error('No pudimos verificar el saldo de tu cuenta.');
      return data;
    }
    async function syncXP(id){
 if(root.AccountRuntimeV3?.installed){const s=await root.AccountRuntimeV3.wait();root.PlayerXP?.apply(s.xp,true);return {userId:id,xp:s.xp,appearance:s.appearance};}
      if(!root.PlayerXP)return null;
      try{const result=await rpc(id,'player_xp',{p_action:'sync'});root.PlayerXP.apply(result.xp);if(result.appearance?.frame?.startsWith('xp_'))root.PlayerAvatar?.aplicarXP(result.appearance);return result;}catch{return null;}
    }
    async function adventureXP(id,attempt,before=null){
      if(!root.PlayerXP||!attempt)return null;
      try{
        const result=await rpc(id,'adventure_xp_feedback',{p_attempt:attempt,p_from:Number.isSafeInteger(before?.total)?before.total:null});
        if(result.attemptId!==attempt||!root.PlayerXP.apply(result.xp))return null;
        root.dispatchEvent?.(new CustomEvent('adventure-xp-confirmed',{detail:result}));return result;
      }catch{return null;} // Presentation failure never changes mission settlement.
    }
    const xp=(action='sync',reward=null,frame=null,title=null)=>enqueue(async id=>{
 if(root.AccountRuntimeV3?.installed&&['sync','equip'].includes(action))return root.AccountRuntimeV3.route('player_xp',{p_action:action,p_frame:frame,p_title:title});
      let result;
      if(action==='equip'&&frame&&root.TowerRewards?.read().frame){
        const current=await rpc(id,'tower_cosmetics',{p_action:'status',p_item:null,p_character:null,p_request:null,p_revision:null});
        const selected=await rpc(id,'tower_cosmetics',{p_action:'use_xp_frame',p_item:frame,p_character:null,p_request:root.crypto.randomUUID(),p_revision:current.revision});
        root.TowerRewards.apply(selected);result=selected.xpResult;
      }
      else result=await rpc(id,'player_xp',{p_action:action,p_reward:reward,p_frame:frame,p_title:title});
      root.PlayerXP?.apply(result.xp);
      if(action==='claim')await syncNow(id);
      return result;
    });
    async function syncNow(id,matchId=null){
 if(root.AccountRuntimeV3?.installed&&!matchId){const snapshot=await root.AccountRuntimeV3.refresh();return snapshot.wallet;}
      let result;
      {
        check(id);const state=store.read();
        result=await rpc(id,'sync_game_wallet_v3',{
          p_missions:[],
          p_equipped:state.equipmentDirty?state.equipped:null,p_match_id:matchId,
        });
        store.applyAccount(result,state.equipmentVersion);notify();
      }
      if(root.CharacterStore){
        const inventory=await rpc(id,'game_characters',{p_action:'sync',p_character:null});
        root.CharacterStore.apply(inventory.characters,id);
      }
      const towerBefore=root.TowerRewards?.read().frame,xpState=await syncXP(id);
      if(root.TowerRewards){try{const rewards=await rpc(id,'tower_cosmetics',{p_action:'sync',p_item:null,p_character:null,p_request:root.crypto.randomUUID(),p_revision:null});root.TowerRewards.apply(rewards);}catch{/* Previous servers keep the existing wallet usable. */}}
      if(towerBefore&&!root.TowerRewards?.read().frame&&xpState?.appearance)root.PlayerAvatar?.aplicarXP(xpState.appearance);
      return result;
    }
    const multiplayerRewards=matchId=>enqueue(async id=>{
      const result=await rpc(id,'multiplayer_reward_feedback',{p_match:matchId});
      if(result.matchId!==matchId)throw Error('Invalid duel receipt');
      root.PlayerXP?.apply(result.xp);
      // Preserve the normal wallet refresh after a duel. Settlement is never
      // requested by this presentation read; refresh failures do not hide it.
      schedule();return result;
    });
    const sync=matchId=>enqueue(id=>syncNow(id,matchId));
    const adminAction=(name,args)=>enqueue(async id=>{
      await syncNow(id);
      const result=await rpc(id,name,args);
      store.applyAccount(result);notify();
      // Persist the confirmed authorization in the account snapshot as well.
      // Otherwise an offline reload can rehydrate the pre-toggle premium state.
      if(root.AccountRuntimeV3?.installed)await root.AccountRuntimeV3.refresh();
      return store.read();
    });

    const setArenTrial=enabled=>adminAction('set_aren_trial_access',{p_enabled:Boolean(enabled)});
    const backgrounds=(action,id)=>enqueue(async account=>{
 if(root.AccountRuntimeV3?.installed&&['sync','equip'].includes(action)){if(root.AventuraShop?.testing())throw Error(root.ProfileBackgrounds?.text('testing')||'Volvé del modo de prueba para comprar o equipar.');const r=await root.AccountRuntimeV3.route('profile_backgrounds',{p_action:action,p_background:id});return r.backgrounds;}
      if(root.AventuraShop?.testing())throw Error(root.ProfileBackgrounds?.text('testing')||'Volvé del modo de prueba para comprar o equipar.');
      await syncNow(account);
      const result=await rpc(account,'profile_backgrounds',{p_action:action,p_background:id,p_legacy_worlds:0});
      if(result.backgrounds?.userId!==account)throw Error('No pudimos verificar tus fondos.');
      store.applyAccount(result);notify();if(action==='purchase'&&root.AccountRuntimeV3?.installed)await root.AccountRuntimeV3.refresh().catch(()=>{});return result.backgrounds;
    });
    const characters=(action,id)=>enqueue(async account=>{
      if(root.AventuraShop?.testing())throw Error('Volvé del modo de prueba para comprar.');
      await syncNow(account);
      const result=await rpc(account,'game_characters',{p_action:action,p_character:id});
      if(result.characters?.userId!==account)throw Error('No pudimos verificar tus personajes.');
      store.applyAccount(result);notify();if(action==='purchase'&&root.AccountRuntimeV3?.installed)await root.AccountRuntimeV3.refresh().catch(()=>{});return result.characters;
    });
    const rewardAttempt=args=>enqueue(async id=>{
      const previous=root.PlayerXP?.read?.();
      const result=await rpc(id,'adventure_reward_attempt',args);
      store.applyAccount(result);notify();
      if(['finish','status'].includes(args.p_action))await adventureXP(id,args.p_attempt,previous);
      if(args.p_action==='finish'&&root.AccountRuntimeV3?.installed)await root.AccountRuntimeV3.refresh().catch(()=>{});
      return result;
    });
      const gameAction=args=>enqueue(async id=>{
        const previous=root.PlayerXP?.read?.();
        const result=await rpc(id,'adventure_game_action',args);
        const before=store.read();
        if(!before.securityReady||before.revision!==result.revision||before.coins!==result.coins||Boolean(before.world5Complete)!==Boolean(result.world5Complete)){
          store.applyAccount(result);notify();
        }
        if(result.game?.complete&&!await adventureXP(id,args.p_attempt,previous))await syncXP(id);
        if(result.game?.complete&&root.AccountRuntimeV3?.installed)await root.AccountRuntimeV3.refresh().catch(()=>{});
        return result;
      });
    const adventureHelp=args=>enqueue(id=>rpc(id,'adventure_word_help',args));
    const cosmetics=args=>enqueue(id=>rpc(id,'tower_cosmetics',args));
    const tower=args=>enqueue(async id=>{
      const result=await rpc(id,'tower_game_sync_v4',args);
      if(result.wallet){const before=store.read();store.applyAccount({...before,userId:id,securityVersion:3,currencyVersion:2,coins:result.wallet.coins,revision:result.wallet.revision});notify();}
      if(result.towerCosmetics)root.TowerRewards?.apply(result.towerCosmetics);
      if(root.AccountRuntimeV3?.installed&&(result.wallet||result.towerCosmetics))await root.AccountRuntimeV3.refresh().catch(()=>{});
      return result;
    });
    function schedule(){
      if(!userId)return;
      root.clearTimeout(timer);
      timer=root.setTimeout(()=>{void sync().catch(()=>{
        root.dispatchEvent?.(new Event('wallet-sync-pending'));
      });},100);
    }
    function connect(nextClient,id){
      if(client!==nextClient||userId!==(id||null))connectionGeneration++;
      client=nextClient;userId=id||null;void root.AccountRuntimeV3?.connect(nextClient,userId);void root.AdventureAccountV2?.connect(nextClient,userId);
      store.setPurchaseHandler(null);
      if(!userId){notify();root.dispatchEvent?.(new Event('wallet-session-ended'));return;}
      store.beginAccount(userId);notify();
      store.setPurchaseHandler(skin=>enqueue(async account=>{
        await syncNow(account);
        if(root.AccountRuntimeV3?.installed)await rpc(account,'sync_game_wallet_v3',{p_missions:[],p_equipped:null,p_match_id:null});
        const result=await rpc(account,'purchase_game_costume',{p_skin:skin});
        store.applyAccount(result);notify();if(root.AccountRuntimeV3?.installed)await root.AccountRuntimeV3.refresh().catch(()=>{});return store.read();
      }));
      schedule();
    }
    root.addEventListener?.('wallet-local-changed',schedule);
    root.addEventListener?.('online',schedule);
    root.addEventListener?.('focus',schedule);
    root.document?.addEventListener('visibilitychange',()=>{if(!root.document.hidden)schedule();});
    return Object.freeze({connect,sync,xp,multiplayerRewards,setArenTrial,backgrounds,characters,rewardAttempt,gameAction,adventureHelp,tower,cosmetics});
  }
  return {create};
});
