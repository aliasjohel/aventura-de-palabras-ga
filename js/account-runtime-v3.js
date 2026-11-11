(function(root){
 'use strict';
 let repo=null,owner=null,client=null,ready=Promise.resolve(),applied=false,applying=false,lastProjection=null,generation=0,connecting=false;
 const state=()=>repo?.read().state||null;
 function render(){if(!root.document)return;let box=document.getElementById('accountSyncState');if(!box){box=document.createElement('aside');box.id='accountSyncState';box.innerHTML='<h3>Sincronización de cuenta</h3><p role="status" aria-live="polite"></p><button type="button">Recuperar cuenta</button><button type="button" data-collection>Conciliar colección verificada</button>';(document.querySelector('#modalConfiguracion .panel-configuracion')||document.body).append(box);box.querySelector('button').addEventListener('click',()=>void refresh().catch(()=>{}));box.querySelector('[data-collection]').addEventListener('click',()=>void command('reconcile_cosmetics',{}).catch(()=>{}));}const s=state(),pending=s?.tower.pendingRewards.length||0,legacy=s?.appearance&&!s.frames.includes(s.appearance.frame);box.querySelector('p').textContent=(repo?.read().message||root.AccountSyncV3.messages.signed_out)+(pending?' · '+pending+' victoria(s) de Torre pendientes: ingresá a Torre para recuperar su resultado.':'')+(legacy?' · Marco histórico conservado como referencia; no acredita un logro verificado.':'');box.querySelector('[data-collection]').hidden=!s?.enabled;box.querySelector('[data-collection]').disabled=!repo?.read().canWrite;}
 function hydrate(){const r=repo?.read(),s=r?.state;if(!s||!r.confirmed&&navigator.onLine||owner!==root.CosmeticStore?.read().accountId){render();return;}const projection=JSON.stringify([r.confirmed,s.wallet,s.characters,s.backgrounds,s.xp,s.towerCosmetics,s.appearance,s.frames,s.preferences,s.profile,s.tower]);if(projection===lastProjection){render();return;}applying=true;
  try{
   const wallet=s.wallet||{userId:owner,securityVersion:3,currencyVersion:2,coins:0,owned:[],equipped:{},revision:0,missionClaims:[],world5Complete:false};
   root.CosmeticStore.applyAccount(wallet,root.CosmeticStore.read().equipmentVersion,r.confirmed);
   root.CharacterStore?.apply(s.characters,owner,r.confirmed);if(s.backgrounds)root.ProfileBackgrounds?.apply(s.backgrounds,owner,r.confirmed);
   root.PlayerXP?.apply(s.xp,r.confirmed);root.TowerRewards?.apply(s.towerCosmetics,{quiet:!applied,authoritative:r.confirmed,cached:!r.confirmed});
   root.PlayerAvatar?.applyAccount(s.appearance,s.frames);
   const prefs=s.preferences;
   if(Object.hasOwn(prefs,'language')&&root.I18n?.preference!==prefs.language)void root.I18n?.setPreference(prefs.language).catch(()=>{});
   if(prefs.audio)for(const k of ['music','keyboard','effects'])root.GameAudio?.set(k,prefs.audio[k]);
   if(Object.hasOwn(prefs,'messagesMuted'))root.VersusIdentity?.setAccountMuted?.(prefs.messagesMuted);
   applied=true;lastProjection=projection;root.dispatchEvent(new CustomEvent('account-state-updated',{detail:{preferences:prefs,tower:s.tower}}));
   root.dispatchEvent(new Event('wallet-updated'));
  }finally{applying=false;render();}
 }
 function connect(nextClient,id){if((repo||connecting)&&client===nextClient&&owner===id)return ready;const ticket=++generation;repo?.close();repo=null;owner=id||null;client=nextClient;applied=false;lastProjection=null;connecting=false;
  root.TowerRewards?.reset();root.PlayerAvatar?.clearAccount?.();root.dispatchEvent(new Event('account-state-cleared'));
  if(!owner){ready=Promise.resolve();render();return ready;}
  connecting=true;const uid=owner;ready=(async()=>{
  const writer=await root.AdventureSyncV2.writerIdentity(root,uid,'account');if(ticket!==generation)return null;
  const cfg=root.AVENTURA_SUPABASE_CONFIG||{},transport=root.AVENTURA_SYNC_LOCAL_LAB?.transport?root.AVENTURA_SYNC_LOCAL_LAB.transport(client,owner):root.AdventureSyncV2.transport({client,owner,url:cfg.url,publishableKey:cfg.publishableKey});
  const next=root.AccountSyncV3.create({owner,writer,storage:root.localStorage,transport,online:()=>navigator.onLine,onChange:()=>{if(repo===next)hydrate();}});repo=next;
  await next.load();if(ticket!==generation)return null;hydrate();return state();
  })().catch(()=>{if(ticket===generation)render();return null;}).finally(()=>{if(ticket===generation)connecting=false;});return ready;
 }
 async function wait(){if(!repo)await root.AventuraShop?.connect();await ready;if(!state()||!repo.read().confirmed)throw new root.AccountSyncV3.AccountError('unavailable');return state();}
 async function refresh(){if(!repo)await root.AventuraShop?.connect();await ready;if(!repo)throw new root.AccountSyncV3.AccountError('unavailable');if(navigator.onLine)await repo.reconcile();hydrate();return state();}
 async function command(action,payload){await wait();const result=await repo.command(action,payload);hydrate();return result;}
 function getFrames(){return repo?.read().confirmed||!navigator.onLine?state()?.frames||[]:[];}
 async function equipSkin(character,skin){await command('wallet_equip',{character,skin});return root.CosmeticStore.read();}
 const saveAppearance=value=>command('appearance',{avatar:value.avatar,frame:value.frame});
 const preferences=patch=>command('preferences',{patch});
 const towerEquip=async(kind,item=null,character=null)=>{const s=await wait();const result=await command('tower_equip',{action:kind==='frame'?'equip_frame':'equip_costume',item,character:kind==='frame'?null:character,revision:s.towerCosmetics.revision});return result;};
 async function xpEquip(frame,title){return command('xp_equip',{frame,title});}
 async function route(name,args){const s=await wait();
  if(name==='game_characters'&&args.p_action==='sync')return {...(s.wallet||{}),userId:owner,characters:s.characters};
  if(name==='profile_backgrounds'&&args.p_action==='sync')return {...(s.wallet||{}),userId:owner,backgrounds:s.backgrounds};
  if(name==='profile_backgrounds'&&args.p_action==='equip')return command('background_equip',{background:args.p_background});
  if(name==='player_xp'&&args.p_action==='sync')return {userId:owner,xp:s.xp,appearance:s.appearance};
  if(name==='player_xp'&&args.p_action==='equip')return xpEquip(args.p_frame,args.p_title);
  if(name==='tower_cosmetics'&&['status','sync'].includes(args.p_action))return s.towerCosmetics;
  if(name==='save_versus_appearance')return saveAppearance({avatar:args.p_avatar,frame:args.p_frame});
  if(name==='upsert_versus_profile')return command('profile',{alias:args.p_alias});
  throw new root.AccountSyncV3.AccountError('configuration');
 }
 function handles(name,args){return name==='game_characters'&&args.p_action==='sync'||name==='profile_backgrounds'&&['sync','equip'].includes(args.p_action)||name==='player_xp'&&['sync','equip'].includes(args.p_action)||name==='tower_cosmetics'&&['status','sync'].includes(args.p_action);}
 const api={installed:true,connect,wait,refresh,state,read:()=>repo?.read(),command,route,handles,equipSkin,saveAppearance,towerEquip,xpEquip,preferences,frames:getFrames,ownsFrame:id=>getFrames().includes(id),applying:()=>applying};root.AccountRuntimeV3=Object.freeze(api);
 root.addEventListener('online',()=>{if(repo)void refresh().catch(()=>{});});root.addEventListener('focus',()=>{if(repo&&navigator.onLine)void refresh().catch(()=>{});});
 root.addEventListener('offline',render);
 root.addEventListener('DOMContentLoaded',()=>{
  render();document.getElementById('idiomaJuego')?.addEventListener('change',e=>{if(owner&&!applying)void preferences({language:e.target.value}).catch(()=>{});});
  for(const k of ['music','keyboard','effects'])document.getElementById('volume-'+k)?.addEventListener('change',()=>{if(owner&&!applying)void preferences({audio:Object.fromEntries(['music','keyboard','effects'].map(key=>[key,root.GameAudio.get(key)]))}).catch(()=>{});});
 });
})(globalThis);
