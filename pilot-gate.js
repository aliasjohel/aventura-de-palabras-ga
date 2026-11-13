/* Admission for prepared sync clients. Never creates users or starts a session. */
(() => {
 'use strict';
 const cfg=globalThis.AVENTURA_PILOT_CONFIG,general=cfg?.scope==='verified-accounts';
 let node,client,subscription,generation=0,scheduled;
 const cacheKey=uid=>general?'syncAdmission:v2:'+cfg.project+':'+uid:'pilotAdmission:v1:'+cfg.uuid;
 const cached=uid=>{try{return localStorage.getItem(cacheKey(uid))==='previously_verified';}catch{return false;}};
 function remember(uid,allowed){try{if(allowed)localStorage.setItem(cacheKey(uid),'previously_verified');else localStorage.removeItem(cacheKey(uid));}catch{}}
 function show(message){
  globalThis.AVENTURA_SYNC_ADMISSION={confirmed:false,offline:false};
  const app=document.querySelector('.app');if(app)app.inert=true;
  if(!node){
   node=document.createElement('section');node.id='pilotAdmission';node.setAttribute('role','dialog');node.setAttribute('aria-modal','true');node.setAttribute('aria-label','Sincronización de cuenta');
   node.style.cssText='position:fixed;inset:0;z-index:2147483000;overflow:auto;background:#10251f;color:white;padding:32px;box-sizing:border-box;display:grid;align-content:center;gap:16px;font:18px system-ui';
   const title=document.createElement('h1');title.textContent='Aventura de Palabras · Sincronización';const text=document.createElement('p');text.setAttribute('role','status');
   const retry=document.createElement('button');retry.textContent='Comprobar sincronización';retry.onclick=()=>void check();
   const account=document.createElement('button');account.textContent='Ingresar con mi cuenta';account.onclick=()=>{if(globalThis.NativePrototype)globalThis.NativePrototype.showAccount();else window.open(cfg.publicPwa,'_blank','noopener');};
   node.append(title,text,retry,account);document.body.append(node);
  }
  node.querySelector('p').textContent=message;
  globalThis.dispatchEvent(new Event('pilot-admission-changed'));
 }
 function admit(uid,offline=false){
  node?.remove();node=null;let notice=document.getElementById('pilotOfflineNotice');
  if(offline){if(!notice){notice=document.createElement('p');notice.id='pilotOfflineNotice';notice.setAttribute('role','status');(document.querySelector('#modalConfiguracion .panel-configuracion')||document.body).prepend(notice);}notice.textContent='Sin conexión: última copia local de esta cuenta. Los avances no están confirmados por Supabase.';}else notice?.remove();
  globalThis.AVENTURA_SYNC_ADMISSION={owner:uid,confirmed:!offline,offline};globalThis.dispatchEvent(new Event('pilot-admission-confirmed'));
  const app=document.querySelector('.app');if(app&&!document.getElementById('introOficial'))app.inert=false;
  globalThis.dispatchEvent(new Event('pilot-admission-changed'));
 }
 function deadline(promise,ms=10000){let timer;return Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('ADMISSION_TIMEOUT')),ms);})]).finally(()=>clearTimeout(timer));}
 function diagnose(phase,error){globalThis.AVENTURA_SYNC_DIAGNOSTIC={phase,code:String(error?.code||error?.message==='ADMISSION_TIMEOUT'&&'ADMISSION_TIMEOUT'||'UNAVAILABLE').slice(0,60),status:Number(error?.status)||null,checkedAt:new Date().toISOString()};}
 function recheck(){generation++;show('Comprobando tu cuenta y la sincronización…');clearTimeout(scheduled);scheduled=setTimeout(()=>void check(),0);}
 async function recuperarCopias(uid){
  if(!globalThis.AccountRuntimeV3?.installed||!globalThis.AdventureAccountV2?.installed)return true;
  globalThis.GameWallet.connect(client,uid);
  await Promise.all([globalThis.AccountRuntimeV3.connect(client,uid),globalThis.AdventureAccountV2.connect(client,uid)]);
  if(navigator.onLine)await Promise.all([globalThis.AccountRuntimeV3.refresh(),globalThis.AdventureAccountV2.refresh()]);
  return globalThis.AccountRuntimeV3.state()?.userId===uid&&globalThis.AdventureAccountV2.state()?.userId===uid&&(!navigator.onLine||globalThis.AccountRuntimeV3.read()?.confirmed);
 }
 async function check(){
  const ticket=++generation;show('Comprobando tu cuenta y la sincronización…');const current=()=>ticket===generation;
  node.querySelector('button').disabled=true;
  try{
   await deadline(globalThis.AventuraOnline.cargarSupabase());if(!current())return;client=globalThis.AventuraSupabase.obtenerCliente();
   if(navigator.onLine&&!subscription&&client.auth.onAuthStateChange)subscription=client.auth.onAuthStateChange(()=>recheck());
   const local=!navigator.onLine&&globalThis.AventuraSupabase.leerSesionLocal?globalThis.AventuraSupabase.leerSesionLocal():await deadline(client.auth.getSession());if(!current())return;
   const session=local.data?.session,uid=session?.user?.id;
   if(local.error||!uid){show('Ingresá con tu cuenta habitual. Esta candidata no crea cuentas nuevas.');return;}
   if(!general&&uid!==cfg.uuid){show('Esta candidata está limitada a la cuenta autorizada del piloto.');return;}
   if(general&&session.user.is_anonymous===true){remember(uid,false);show('Para recuperar tu progreso entre dispositivos, ingresá con tu cuenta verificada. No se crea un invitado nuevo.');return;}
   if(!navigator.onLine){
    if(!cached(uid)){show('Conectate una vez para verificar esta cuenta y su sincronización antes de usar su copia offline.');return;}
    const recovered=await deadline(recuperarCopias(uid),20000);if(!current())return;
    if(!recovered){show('No hay una copia local completa de esta cuenta. Reconectá para recuperarla sin borrar datos.');return;}
    admit(uid,true);return;
   }
   const verified=await deadline(client.auth.getUser());if(!current())return;const user=verified.data?.user;
   if(verified.error){diagnose('identity',verified.error);if([401,403].includes(verified.error.status))remember(uid,false);show('No pudimos verificar la conexión con tu cuenta. Tus datos se conservan; volvé a comprobar la sincronización.');return;}
   if(user?.id!==uid||(general&&(user.is_anonymous===true||!(user.email_confirmed_at||user.phone_confirmed_at||user.confirmed_at)))){remember(uid,false);show('No pudimos verificar esta cuenta. Volvé a ingresar con tu cuenta habitual.');return;}
   const result=await deadline(client.rpc('account_state_v3'));if(!current())return;
   const latest=await deadline(client.auth.getSession());if(!current())return;
   if(latest.error){diagnose('session',latest.error);show('No pudimos volver a consultar tu sesión. Reconectá y comprobá la sincronización; tus datos se conservan.');return;}
   if(latest.data?.session?.user?.id!==uid){recheck();return;}
   // A transient read failure is not an account revocation. Keep the prior
   // admission proof and snapshots, but never admit online from this error.
   if(result.error){diagnose('account-read',result.error);show('No pudimos consultar la sincronización. Tus datos se conservan; reconectá y volvé a intentar.');return;}
   const state=result.data;
   if(state?.userId!==uid||state.schemaVersion!==3||!state.enabled||(general&&state.adventureState?.userId!==uid)||!state.adventureState?.adventure?.enabled){remember(uid,false);show('La sincronización está suspendida o todavía no está activada para esta cuenta. Tus datos se conservan.');return;}
   const recovered=await deadline(recuperarCopias(uid),20000);if(!current())return;
   if(!recovered){show('No pudimos recuperar la copia de esta cuenta. Reconectá y volvé a intentar sin borrar datos.');return;}
   remember(uid,true);globalThis.AVENTURA_SYNC_DIAGNOSTIC={phase:'ready',checkedAt:new Date().toISOString()};admit(uid);
  }catch(error){if(current()){diagnose('recovery',error);show('No pudimos comprobar la sincronización. Reconectá y volvé a intentar; no borres tus datos.');}}
  finally{if(current()&&node)node.querySelector('button').disabled=false;}
 }
 function start(){void check();}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
 for(const event of ['online','offline','focus','storage'])window.addEventListener(event,()=>recheck());
 document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')recheck();});
})();
