/* Server-owned Tower prizes. The visual playtest never supplies ownership. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.TowerRewards=api.create({rpc:args=>root.GameWallet.cosmetics(args),account:()=>root.CosmeticStore.read().accountId,storage:root.localStorage,id:()=>root.crypto.randomUUID(),artwork:root.TowerOutfitArtwork||[],changed:()=>root.dispatchEvent(new Event('tower-rewards-updated'))});})(globalThis,()=>{
 'use strict';
 const frames=Object.freeze([{id:'tower_conquistador',count:1,names:{es:'Conquistador',en:'Conqueror','pt-BR':'Conquistador'}},{id:'tower_maestro',count:6,names:{es:'Maestro',en:'Master','pt-BR':'Mestre'}},{id:'tower_leyenda',count:11,names:{es:'Leyenda',en:'Legend','pt-BR':'Lenda'}}].map(f=>Object.freeze({...f,tower:true,asset:'assets/images/perfil/marco-'+f.id+'-v1.webp',thumbnail:'assets/images/perfil/miniaturas/marco-'+f.id+'-v1.webp'})));
 function create({rpc,account,storage,id,artwork=[],changed=()=>{}}){
  const aren={character:'explorador',hero:'Aren',id:'aren-campeon',name:'Campeón del Último Piso',assets:Object.fromEntries(['base','preparacion','ataque','habilidad','impacto','final','planta','mano','vidrio','envejecido','anciano'].map(p=>[p,'assets/images/tower-preview/aren-campeon-'+p+'-v1.webp'])),combat:['base','preparacion','ataque','habilidad','impacto'],finals:['final','planta','mano','vidrio','envejecido','anciano']};
  const catalog=Object.freeze([aren,...artwork].map(c=>Object.freeze({...c,previewId:c.id,id:'tower_'+c.character})));
  let state=null,generation=0,queue=Promise.resolve(),rememberedOwner=null,fromCache=false;const pendingKey=owner=>'towerCosmeticPendingV1:'+owner,cacheKey=owner=>'towerCosmeticCacheV1:'+owner;
  let noticeOwner=null,notices=[];const noticeKey=owner=>'towerRewardNoticeV1:'+owner;
  function loadNotices(){const owner=account();if(owner!==noticeOwner){noticeOwner=owner;notices=[];try{const saved=JSON.parse(storage?.getItem(noticeKey(owner))||'[]');if(Array.isArray(saved))notices=saved.filter(item=>typeof item==='string');}catch{}}return notices;}
  function saveNotices(){if(noticeOwner)try{storage?.setItem(noticeKey(noticeOwner),JSON.stringify(notices));}catch{/* A visual notice cannot affect ownership. */}}
  const empty=()=>({userId:account(),owned:[],equipped:{},selectedCostumes:{},frame:null,revision:0,completedCharacters:[],grantsEnabled:false});
  const read=()=>{const owner=account();if(owner&&state?.userId!==owner&&rememberedOwner!==owner){rememberedOwner=owner;try{const cached=JSON.parse(storage?.getItem(cacheKey(owner))||'null');if(cached)apply(cached,{cached:true,quiet:true});}catch{/* Invalid cache never grants server ownership. */}}return state?.userId===owner?{...structuredClone(state),confirmed:!fromCache}:empty();};
  function apply(value,{cached=false,quiet=false,authoritative=false}={}){if(!value||value.userId!==account()||!Array.isArray(value.owned)||!Number.isSafeInteger(value.revision)||value.revision<0)return false;
   if(!cached)read();
   if(!authoritative&&!fromCache&&!cached&&state?.userId===value.userId&&value.revision<state.revision)return false;
   const before=state?.userId===value.userId?state.owned:null;
   const allowed=new Set([...catalog.map(c=>c.id),...frames.map(f=>f.id)]),owned=[...new Set([...(!authoritative&&!fromCache&&!cached&&state?.userId===value.userId?state.owned:[]),...value.owned.filter(i=>allowed.has(i))])],equipped={};
   for(const c of catalog)if(value.equipped?.[c.character]===c.id&&owned.includes(c.id))equipped[c.character]=c.id;
   const selectedCostumes={};for(const c of catalog)if((value.selectedCostumes||value.equipped)?.[c.character]===c.id&&owned.includes(c.id))selectedCostumes[c.character]=c.id;
   state={userId:value.userId,owned,equipped,selectedCostumes,frame:frames.some(f=>f.id===value.frame)&&owned.includes(value.frame)?value.frame:null,revision:value.revision,completedCharacters:(Array.isArray(value.completedCharacters)?value.completedCharacters:[]).filter(c=>catalog.some(i=>i.character===c)),grantsEnabled:value.grantsEnabled===true};fromCache=cached;rememberedOwner=value.userId;
   if(!cached&&before){const added=owned.filter(item=>!before.includes(item));if(added.length){loadNotices();notices=[...new Set([...notices,...added])];saveNotices();}}
   if(!cached)try{storage?.setItem(cacheKey(value.userId),JSON.stringify(state));}catch{/* Cache failure cannot undo a confirmed server result. */}
   if(!quiet)changed();return true;
  }
  function reset(){generation++;state=null;fromCache=false;rememberedOwner=account();noticeOwner=null;notices=[];changed();}
  function pendingNotices(){const current=read();return current.confirmed===true?loadNotices().filter(item=>current.owned.includes(item)):[];}
  function acknowledgeNotices(items){loadNotices();notices=notices.filter(item=>!items.includes(item));saveNotices();}
  function operation(task){const owner=account(),token=generation,run=async()=>{if(!owner||owner!==account()||token!==generation)throw Error('Tower account changed');const result=await task(owner);if(owner!==account()||token!==generation)throw Error('Tower account changed');apply(result);return result;};const next=queue.then(run);queue=next.catch(()=>{});return next;}
  async function call(owner,args){if(owner!==account())throw Error('Tower account changed');const result=await rpc(args);if(owner!==account()||result?.userId!==owner)throw Error('Tower account changed');return result;}
  async function send(owner,args){if(owner!==account())throw Error('Tower account changed');storage?.setItem(pendingKey(owner),JSON.stringify(args));try{const result=await call(owner,args);storage?.removeItem(pendingKey(owner));return result;}catch(error){if(/TOWER_EQUIPMENT_STALE|TOWER_UNION_ACTIVE|not owned|Wrong costume|Invalid .*parameters|Request ID reused/.test(error.message))storage?.removeItem(pendingKey(owner));throw error;}}
  const statusArgs=()=>({p_action:'status',p_item:null,p_character:null,p_request:null,p_revision:null});
  const refreshLegacy=()=>operation(async owner=>{const raw=storage?.getItem(pendingKey(owner));if(raw){const pending=JSON.parse(raw);await send(owner,pending);}return call(owner,{...statusArgs(),p_action:'sync',p_request:id()});});
  const equipLegacy=(kind,item=null,character=null)=>operation(async owner=>{
   const raw=storage?.getItem(pendingKey(owner));if(raw)apply(await send(owner,JSON.parse(raw)));
   apply(await call(owner,statusArgs()));const snapshot=read();
   if(item&&!snapshot.owned.includes(item))throw Error('Tower item not owned');
   return send(owner,{p_action:kind==='frame'?'equip_frame':'equip_costume',p_item:item,p_character:kind==='frame'?null:character,p_request:id(),p_revision:snapshot.revision});
  });
  const refresh=()=>globalThis.AccountRuntimeV3?.installed?globalThis.AccountRuntimeV3.refresh().then(s=>s.towerCosmetics):refreshLegacy();
 const equip=(...args)=>globalThis.AccountRuntimeV3?.installed?globalThis.AccountRuntimeV3.towerEquip(...args):equipLegacy(...args);
 const owns=item=>read().owned.includes(item),equipped=character=>read().equipped[character]||null;
  const find=item=>catalog.find(c=>c.id===item);
  const asset=(item,pose='base')=>find(item)?.assets[pose]||null;
  function source(item,original,herido=false){const c=find(item);if(!c)return null;if(herido)return c.assets.impacto;
   if(c.sourceMap?.[original])return c.sourceMap[original];
   if(c.character==='explorador'){const pose=original.includes('lupa')?'habilidad':original.includes('bumeran-preparacion')?'preparacion':original.includes('bumeran-lanzamiento')?'ataque':'base';return c.assets[pose]||c.assets.base;}return null;}
  const combat=item=>{const c=find(item);return c?(c.combat||['base','ataque','impacto']).map(p=>c.assets[p]).filter(Boolean):[];};
  async function prepareFinal(winner,victim,player,side,resources){const character=side==='jugador'?winner:victim,item=equipped(character),c=find(item);if(!c||character!==player)return;
   const poses=side==='jugador'?(c.finals||['final']):winner==='guardiana'?['base','impacto','planta']:winner==='azrak'?['base','impacto','mano']:winner==='kalamo'?['base','impacto','vidrio']:winner==='kairos'?['base','envejecido','anciano']:['base','impacto','impacto-tronco'];await resources?.ensure(poses.map(p=>c.assets[p]).filter(Boolean));}
  const normalizeSkins=value=>Object.fromEntries(catalog.filter(c=>value?.[c.character]===c.id).map(c=>[c.character,c.id]));
  return Object.freeze({catalog,frames,read,apply,reset,refresh,equip,owns,equipped,find,asset,source,combat,prepareFinal,normalizeSkins,pendingNotices,acknowledgeNotices});
 }
 return {create,frames};
});
