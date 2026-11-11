(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.AdventureSyncV2=api;})(globalThis,()=>{
 'use strict';
 const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
 const messages={loading:'Recuperando tu aventura…',confirmed:'Guardado en tu cuenta',pending:'Confirmación pendiente. Reconectá para recuperar el resultado.',offline:'Sin conexión: el avance local todavía no está verificado.',conflict:'Otro dispositivo avanzó. Recuperá el progreso antes de continuar.',takeover:'La aventura está abierta en otro dispositivo. Podés tomar el control.',unavailable:'No pudimos recuperar la aventura. Reintentá sin borrar tus datos.',signed_out:'Ingresá con tu cuenta para recuperar tu aventura.'};
 class SyncError extends Error{constructor(code){super(messages[code]||'No pudimos completar la operación. Recuperá el estado de tu cuenta.');this.code=code;}}
 const clone=v=>structuredClone(v),integer=(n,min=0,max=Number.MAX_SAFE_INTEGER)=>Number.isSafeInteger(n)&&n>=min&&n<=max;
 async function writerIdentity(root,owner,kind='adventure'){
  const key=kind==='adventure'?'adventureWriter:v2:'+owner:'accountSyncWriterV3';
  const seed=root.sessionStorage.getItem(key);
  let writer;
  if(root.Capacitor?.isNativePlatform?.()){
   if(!root.Capacitor.isPluginAvailable?.('Prototype'))throw new SyncError('unavailable');
   const result=await root.Capacitor.registerPlugin('Prototype').syncWriter({kind,seed:UUID.test(seed||'')?seed:''});
   writer=result?.writer;
   if(!UUID.test(writer||''))throw new SyncError('identity');
  }else writer=UUID.test(seed||'')?seed:root.crypto.randomUUID();
  // Keep the journal namespace of a running pre-upgrade session when possible.
  // A native restart reads SharedPreferences; browser tabs stay independent.
  root.sessionStorage.setItem(key,writer);return writer;
 }
 function validate(s,uid){
  if(!s||s.schemaVersion!==2||s.contentVersion!=='adventure-v1')throw new SyncError('incompatible');
  if(s.userId!==uid||!UUID.test(uid))throw new SyncError('identity');
  for(const k of ['adventure','characters','wallet','xp','xpCosmetics','xpRewardReceipts','tower','backgrounds','appearance','profile','hints'])if(!Object.hasOwn(s,k))throw new SyncError('incomplete');
  const a=s.adventure,c=a?.checkpoint;
  if(!a||typeof a.enabled!=='boolean'||!integer(a.revision)||!integer(a.epoch)||a.runId!==null&&!UUID.test(a.runId)||!c||c.contentVersion!=='adventure-v1'||!integer(c.world,0,4)||!integer(c.mission,0,9)||!integer(c.phase,0,10)||!['mission_ready','objective_active','campaign_complete'].includes(c.status))throw new SyncError('incomplete');
  for(const key of ['completedMissions','earnedMissions'])if(!Array.isArray(a[key])||a[key].some(f=>!integer(f.world,0,4)||!integer(f.mission,0,9)))throw new SyncError('incomplete');
  if(!Array.isArray(a.archives)||!Array.isArray(a.seenScenes)||!a.narrative||!Array.isArray(s.characters.narrative)||!Array.isArray(s.tower?.progress))throw new SyncError('incomplete');
  for(const k of ['wallet','xp','backgrounds','hints'])if(s[k]!==null&&!integer(s[k]?.revision))throw new SyncError('incomplete');
  return clone(s);
 }
 function create({owner,writer,storage,transport,online=()=>true,id=()=>globalThis.crypto.randomUUID(),onChange=()=>{}}){
  if(!UUID.test(owner)||!UUID.test(writer))throw new SyncError('identity');
  const prefix='adventureSync:v2:'+owner+':',cacheKey=prefix+'snapshot',journalKey=prefix+writer+':journal';
  let generation=0,alive=true,state=null,status='loading',confirmed=false,queue=Promise.resolve();
  function emit(){onChange(read());}
  function read(){return {userId:owner,state:state&&clone(state),status,confirmed,message:messages[status]||messages.unavailable,canWrite:alive&&status==='confirmed'&&state?.adventure.enabled===true&&state.adventure.writerId===writer,pending:journal().length};}
  function journal(){const raw=storage.getItem(journalKey);if(!raw)return [];try{const value=JSON.parse(raw);if(!Array.isArray(value)||value.some(x=>x.owner!==owner||!UUID.test(x.args?.p_request)))throw Error();return value;}catch{quarantine(journalKey,raw);throw new SyncError('unavailable');}}
  function quarantine(key,raw){const q=key+':quarantine:'+id();try{storage.setItem(q,raw);}catch{} }
  function writeJournal(value){storage.setItem(journalKey,JSON.stringify(value));}
  function restore(){const raw=storage.getItem(cacheKey);if(raw){try{state=validate(JSON.parse(raw),owner);}catch{quarantine(cacheKey,raw);}}}
  function apply(next){next=validate(next,owner);if(state){
   if(next.adventure.revision<state.adventure.revision)return false;
   const facts=new Set(next.adventure.earnedMissions.map(f=>f.world+':'+f.mission));if(state.adventure.earnedMissions.some(f=>!facts.has(f.world+':'+f.mission)))throw new SyncError('incomplete');
   for(const key of ['wallet','xp','backgrounds','hints'])if(state[key]&&(!next[key]||next[key].revision<state[key].revision))return false;
  }state=next;try{storage.setItem(cacheKey,JSON.stringify(next));}catch{}return true;}
  async function check(gen){if(!alive||gen!==generation)throw new SyncError('identity');if(await transport.user()!==owner||!alive||gen!==generation)throw new SyncError('identity');}
  async function pull(){const gen=generation;await check(gen);const next=await transport.rpc('adventure_state_v2',{});if(!alive||gen!==generation)return null;apply(next);confirmed=true;return state;}
  function classify(error){if(error instanceof SyncError)return error.code;if(error?.code==='40001'||/PLAYER_WRITER_CHANGED/.test(error?.message||''))return 'conflict';if(/PLAYER_TAKEOVER_REQUIRED/.test(error?.message||''))return 'takeover';return 'unavailable';}
  function definitive(error){return error instanceof SyncError||['22023','22P02','42501','28000','40001','55000','P0001'].includes(error?.code);}
  async function transmit(entry){const gen=generation;await check(gen);let received=false;try{
   const reply=await transport.rpc('adventure_command_v2',entry.args);received=true;if(!alive||gen!==generation)return null;
   if(reply?.userId!==owner||reply.requestId!==entry.args.p_request)throw new SyncError('identity');
   validate(reply.state,owner);if(state&&reply.state.adventure.revision<=state.adventure.revision||!apply(reply.state))await pull();writeJournal(journal().filter(v=>v.args.p_request!==entry.args.p_request));status='confirmed';emit();return reply.result;
  }catch(error){if(!alive||gen!==generation)return null;
   if(!received&&definitive(error)){writeJournal(journal().filter(v=>v.args.p_request!==entry.args.p_request));status=classify(error);try{await pull();}catch{}emit();throw new SyncError(status);}
   status='pending';emit();throw new SyncError('pending');
  }}
  function serial(task){const run=queue.then(task);queue=run.catch(()=>{});return run;}
  async function load(){return serial(async()=>{status='loading';emit();try{if(!online()){status='offline';emit();return state&&clone(state);}await pull();status=journal().length?'pending':'confirmed';emit();return state&&clone(state);}catch(error){status=classify(error);emit();throw new SyncError(status);}});}
  function command(action,payload={},requestId=id()){return serial(async()=>{
   if(!alive||!state)throw new SyncError('unavailable');if(!online()){status='offline';emit();throw new SyncError('offline');}
   if(journal().length)throw new SyncError('pending');
   const args={p_request:requestId,p_revision:state.adventure.revision,p_writer:writer,p_epoch:state.adventure.epoch,p_action:action,p_payload:clone(payload)};
   const entry={owner,args};writeJournal([entry]); // Failure here prevents any network mutation.
   return transmit(entry);
  });}
  function reconcile(){return serial(async()=>{if(!online()){status='offline';emit();return null;}await pull();for(const entry of journal())await transmit(entry);status='confirmed';emit();return state&&clone(state);});}
  function recordLocal(history){if(!alive||!state)throw new SyncError('identity');const allowed={};for(const key of ['world','mission','phase','narrative','wordHistory','recordedAt','sourceHash'])if(Object.hasOwn(history,key))allowed[key]=clone(history[key]);
   const value={owner,transferId:id(),baseRevision:state.adventure.revision,history:allowed,verified:false};storage.setItem(prefix+'offline',JSON.stringify(value));status='offline';emit();return clone(value);}
  function localHistory(){const raw=storage.getItem(prefix+'offline');if(!raw)return null;try{const v=JSON.parse(raw);return v.owner===owner?clone(v):null;}catch{quarantine(prefix+'offline',raw);return null;}}
  async function archiveLocal(confirmOwner=false){if(!confirmOwner)throw new SyncError('confirmation');const v=localHistory();if(!v)return null;const result=await command('archive',{transferId:v.transferId,origin:'offline_local',history:v.history,confirmedOwner:true});if(result?.transferId===v.transferId){v.backedUp=true;storage.setItem(prefix+'offline',JSON.stringify(v));}return result;}
  function previewLegacy(raw){storage.setItem(prefix+'legacy-original:'+id(),raw);let p;try{p=JSON.parse(raw);}catch{throw new SyncError('corrupt');}
   return {transferId:id(),origin:'chrome_local',verified:false,history:{world:p.escenarioActual,mission:p.misionActual,phase:p.desafiosCompletados,narrative:Object.fromEntries(['portalAbierto','mundoDosCompletado','mundoTresCompletado','mundoCuatroCompletado','estadoFinalAzrak','estadoPruebaKairos','estadoEncuentroCalamo','estadoPrimerEncuentroShadow'].filter(k=>Object.hasOwn(p,k)).map(k=>[k,p[k]])),wordHistory:p.historialPalabrasPorIdioma||{},recordedAt:new Date().toISOString()},requiresOwnerConfirmation:true};}
  function close(){alive=false;generation++;state=null;confirmed=false;status='signed_out';emit();}
  async function history(transferId){if(!UUID.test(transferId))throw new SyncError('incomplete');const gen=generation;await check(gen);const value=await transport.rpc('adventure_history_v2',{p_transfer:transferId});if(!alive||gen!==generation)return null;if(value?.userId!==owner||value.transferId!==transferId||value.verified!==false)throw new SyncError('identity');return clone(value);}
  restore();return {load,command,reconcile,read,close,recordLocal,localHistory,archiveLocal,previewLegacy,history,archiveLegacy:(preview,confirmedOwner=false)=>{if(!confirmedOwner)throw new SyncError('confirmation');return command('archive',{transferId:preview.transferId,origin:'chrome_local',history:preview.history,confirmedOwner:true});},owns:character=>Boolean(state?.characters.narrative.includes(character)),writer};
 }
 // Bind each HTTP request to the captured, verified user's token. SDK account
 // changes cannot silently change the owner of an already prepared command.
 function transport({client,url,publishableKey,owner,fetch:fetcher=globalThis.fetch}){
  let verifiedOwner=false;
  async function session(){const local=await client.auth.getSession(),s=local.data?.session;if(local.error||s?.user?.id!==owner||!s?.access_token)throw new SyncError('identity');if(!verifiedOwner){const verified=await client.auth.getUser();if(verified.error||verified.data?.user?.id!==owner)throw new SyncError('identity');verifiedOwner=true;}return s.access_token;}
  if(!/^https:\/\/[a-z0-9.-]+(?::\d+)?\/?$/i.test(url))throw new SyncError('configuration');
  return {user:async()=>{await session();return owner;},rpc:async(name,args)=>{if(!['adventure_state_v2','adventure_command_v2','adventure_history_v2','account_state_v3','account_command_v3'].includes(name)&&!(name==='adventure_reward_attempt'&&args.p_action==='status'))throw new SyncError('configuration');const token=await session();const response=await fetcher(url.replace(/\/$/,'')+'/rest/v1/rpc/'+name,{method:'POST',headers:{apikey:publishableKey,Authorization:'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify(args),credentials:'omit',cache:'no-store',redirect:'error'});const value=await response.json();if(!response.ok)throw {code:value.code,message:/(?:PLAYER_(?:STATE_CONFLICT|WRITER_CHANGED|TAKEOVER_REQUIRED)|ACCOUNT_[A-Z_]+)/.exec(value.message||'')?.[0]||'Request failed'};return value;}};
 }
 return {create,validate,transport,writerIdentity,SyncError,messages};
});
