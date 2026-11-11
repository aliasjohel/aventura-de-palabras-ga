(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.AccountSyncV3=api;})(globalThis,()=>{
 'use strict';
 const clone=v=>structuredClone(v),uuid=s=>typeof s==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);
 const messages={loading:'Recuperando tu cuenta…',confirmed:'Cuenta recuperada. Cambios confirmados en Supabase.',pending:'Cambio pendiente de confirmar. Reconectá antes de elegir otro.',conflict:'Tu cuenta cambió en otro dispositivo. Se recuperó el estado actual; volvé a elegir.',offline:'Sin conexión. Se muestra la última copia de tu cuenta.',unavailable:'No pudimos recuperar tu cuenta. Reintentá sin borrar tus datos.',signed_out:'Ingresá con tu cuenta para recuperar tus datos.'};
 class AccountError extends Error{constructor(code){super(messages[code]||messages.unavailable);this.code=code;}}
 function validate(s,owner){
  if(!s||s.schemaVersion!==3||s.contentVersion!=='adventure-v1'||s.userId!==owner||!uuid(owner)||!Number.isSafeInteger(s.revision)||s.revision<0||typeof s.enabled!=='boolean')throw new AccountError('incompatible');
  for(const k of ['adventureState','wallet','characters','backgrounds','xp','towerCosmetics','appearance','frames','preferences','profile','tower'])if(!Object.hasOwn(s,k))throw new AccountError('incomplete');
  if(s.adventureState.userId!==owner||s.characters?.userId!==owner||s.xp?.userId!==owner||s.towerCosmetics?.userId!==owner||s.profile?.id!==owner||s.wallet&&s.wallet.userId!==owner||s.backgrounds&&s.backgrounds.userId!==owner||!Array.isArray(s.frames)||!Array.isArray(s.tower?.progress)||!Array.isArray(s.tower?.pendingRewards)||!s.preferences||typeof s.preferences!=='object')throw new AccountError('incomplete');
  const object=v=>v&&typeof v==='object'&&!Array.isArray(v),number=n=>Number.isSafeInteger(n)&&n>=0,strings=a=>Array.isArray(a)&&a.every(v=>typeof v==='string');
  if(s.wallet&&(!number(s.wallet.coins)||!number(s.wallet.revision)||!strings(s.wallet.owned)||!object(s.wallet.equipped)||s.wallet.securityVersion!==3||s.wallet.currencyVersion!==2||!strings(s.wallet.missionClaims)))throw new AccountError('incomplete');
  if(!number(s.characters.revision)||!strings(s.characters.owned)||!strings(s.characters.unlocked)||!number(s.xp.total)||!number(s.xp.revision)||!number(s.xp.level)||!strings(s.xp.ownedFrames)||!strings(s.xp.ownedTitles))throw new AccountError('incomplete');
  const t=s.towerCosmetics;if(!number(t.revision)||!strings(t.owned)||!object(t.equipped)||!object(t.selectedCostumes)||!strings(t.completedCharacters)||t.frame!==null&&typeof t.frame!=='string')throw new AccountError('incomplete');
  if(!strings(s.frames)||!object(s.preferences)||s.appearance&&(!object(s.appearance)||typeof s.appearance.avatar!=='string'||typeof s.appearance.frame!=='string')||s.backgrounds&&(!number(s.backgrounds.revision)||!strings(s.backgrounds.owned)||typeof s.backgrounds.equipped!=='string'))throw new AccountError('incomplete');
  if(s.tower.progress.some(p=>typeof p.character!=='string'||!number(p.completed)||p.completed>10)||!strings(s.tower.pendingRewards)||!Array.isArray(s.tower.receipts))throw new AccountError('incomplete');
  return s;
 }
 function create({owner,writer,storage,transport,id=()=>globalThis.crypto.randomUUID(),online=()=>true,onChange=()=>{}}){
  if(!uuid(owner)||!uuid(writer))throw new AccountError('identity');
  const prefix='accountSync:v3:'+owner+':',journalKey=prefix+'pending:'+writer;let state=null,status='loading',alive=true,generation=0,queue=Promise.resolve(),confirmed=false;
  const emit=()=>onChange(read());
  function quarantine(key,raw){storage.setItem(key+':quarantine:'+id(),raw);storage.removeItem(key);}
  function journal(){const raw=storage.getItem(journalKey);if(!raw)return null;try{const v=JSON.parse(raw);if(v.owner!==owner||!uuid(v.args?.p_request)||!Number.isSafeInteger(v.args.p_revision)||typeof v.args.p_action!=='string'||!v.args.p_payload)throw Error();return v;}catch{quarantine(journalKey,raw);throw new AccountError('journal_corrupt');}}
  function read(){const pending=storage.getItem(journalKey)?1:0,visibleStatus=alive&&!online()?'offline':status;return {state:state&&clone(state),status:visibleStatus,pending,confirmed,message:pending?messages.pending+(!online()?' Sin conexión.':''):messages[visibleStatus]||messages.unavailable,canWrite:alive&&state?.enabled===true&&status==='confirmed'&&online()};}
  function accept(value){validate(value,owner);if(confirmed&&state&&value.revision<state.revision)return false;state=clone(value);confirmed=true;storage.setItem(prefix+'snapshot',JSON.stringify(state));return true;}
  const current=token=>{if(!alive||token!==generation)throw new AccountError('signed_out');};
  async function check(token){current(token);if(await transport.user()!==owner)throw new AccountError('identity');current(token);}
  async function pull(){const token=generation;await check(token);const value=await transport.rpc('account_state_v3',{});current(token);accept(value);status=journal()?'pending':'confirmed';emit();return read();}
  async function load(){try{const raw=storage.getItem(prefix+'snapshot');if(raw){try{state=clone(validate(JSON.parse(raw),owner));}catch{quarantine(prefix+'snapshot',raw);}}if(!online()){status='offline';emit();return read();}return await pull();}catch(e){status=journal()?'pending':'unavailable';emit();throw e;}}
  async function send(entry){const token=generation;try{
    await check(token);const value=await transport.rpc('account_command_v3',entry.args);current(token);
    if(value?.userId!==owner||value.requestId!==entry.args.p_request)throw new AccountError('identity');validate(value.state,owner);
    const previous=state?.revision??-1;if(value.state.revision>previous)accept(value.state);
    storage.removeItem(journalKey);status='confirmed';
    // A replayed receipt contains its historical snapshot. Refresh pause flags,
    // gameplay rewards and profile even when its equipment revision is equal.
    if(value.state.revision<=previous)await pull();else emit();return clone(value.result);
   }catch(e){if(!alive||token!==generation)return null;
    if(/^(22023|42501|28000|40001|40P01|55000|57014|23514|23503|23505|P0001)$/.test(e.code||'')){
     storage.removeItem(journalKey);await pull().catch(()=>{});status=e.code==='40001'?'conflict':'unavailable';emit();throw new AccountError(status);
    }
    status='pending';emit();throw new AccountError('pending');
   }}
  function serialized(fn){const next=queue.then(fn);queue=next.catch(()=>{});return next;}
  function command(action,payload={}){const basis=state?.revision;return serialized(async()=>{
    if(!alive||!online())throw new AccountError('offline');if(journal())throw new AccountError('pending');if(!state||!state.enabled||basis===undefined){status='unavailable';emit();throw new AccountError('unavailable');}
    const entry={owner,args:{p_request:id(),p_revision:basis,p_action:action,p_payload:clone(payload)}};
    // Quota failure leaves cloud untouched. No success is shown before ACK.
    try{storage.setItem(journalKey,JSON.stringify(entry));}catch{status='unavailable';emit();throw new AccountError('unavailable');}status='pending';emit();return send(entry);
  });}
  function reconcile(){return serialized(async()=>{await pull();const entry=journal();return entry?send(entry):read();});}
  function close(){alive=false;generation++;state=null;status='signed_out';emit();}
  return {load,pull,command,reconcile,read,close};
 }
 return {create,validate,AccountError,messages};
});
