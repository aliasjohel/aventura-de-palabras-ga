/* Tower-only authority. Offline input is never replayed as a new action. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.TowerOnline=api;})(globalThis,()=>{
 'use strict';
 const messages={es:{practice:'Torre de práctica: sin monedas verificadas. Conectate con una cuenta para validar victorias.',disabled:'La validación y las recompensas de Torre todavía no están habilitadas. Esta partida será de práctica.',waiting:'Conexión interrumpida. El combate está pausado en pantalla; el reloj del servidor continúa. Reconectá para recuperar el resultado.',confirmed:'Victoria validada por el servidor.',paid:'Monedas de Torre acreditadas',pending:'Victoria validada. El pago todavía no está habilitado.',unverified:'Este personaje necesita confirmar su desbloqueo para jugar por monedas. Tu avance local se conserva.'},en:{practice:'Practice Tower: no verified coins. Connect with an account to validate victories.',disabled:'Tower validation and rewards are not enabled yet. This fight is practice.',waiting:'Connection interrupted. The screen is paused; the server clock continues. Reconnect to recover the result.',confirmed:'Victory verified by the server.',paid:'Tower coins credited',pending:'Victory verified. Payments are not enabled yet.',unverified:'This character needs a verified unlock to earn coins. Your local progress is preserved.'},'pt-BR':{practice:'Torre de prática: sem moedas verificadas. Conecte uma conta para validar vitórias.',disabled:'A validação e as recompensas da Torre ainda não estão habilitadas. Esta partida será de prática.',waiting:'Conexão interrompida. A tela está pausada; o relógio do servidor continua. Reconecte para recuperar o resultado.',confirmed:'Vitória validada pelo servidor.',paid:'Moedas da Torre creditadas',pending:'Vitória validada. O pagamento ainda não está habilitado.',unverified:'Este personagem precisa confirmar o desbloqueio para ganhar moedas. Seu progresso local foi preservado.'}};
 const ready={es:'Combate de Torre validado por el servidor. Las monedas requieren una victoria.',en:'Server-validated Tower fight. Coins require a victory.','pt-BR':'Combate da Torre validado pelo servidor. As moedas exigem uma vitória.'};
 const retry={es:'Reconectar combate',en:'Reconnect fight','pt-BR':'Reconectar combate'};
 const locked={es:'Este piso todavía está bloqueado. Ganá el piso anterior con conexión para desbloquearlo.',en:'This floor is still locked. Win the previous floor online to unlock it.','pt-BR':'Este andar ainda está bloqueado. Vença o andar anterior online para desbloqueá-lo.'};
 const practiceOnly={es:'Partida de práctica: no guarda progreso verificado ni entrega monedas o premios.',en:'Practice fight: no verified progress, coins or rewards.','pt-BR':'Partida de treino: não salva progresso verificado nem concede moedas ou prêmios.'};
 const guidance={
  checkingAccount:{es:'Confirmando tu cuenta para jugar por premios…',en:'Confirming your account to play for rewards…','pt-BR':'Confirmando sua conta para jogar por prêmios…'},
  accountWaiting:{es:'No se pudo confirmar tu cuenta. El combate no comenzó. Reintentá con conexión; si hace falta, iniciá sesión en Mi perfil.',en:'Could not confirm your account. The fight has not started. Retry online; if needed, sign in from My profile.','pt-BR':'Não foi possível confirmar sua conta. O combate não começou. Tente novamente online; se necessário, entre em Meu perfil.'},
  battleReady:{es:'Combate por premios',en:'Reward fight','pt-BR':'Combate por prêmios'},
  battlePractice:{es:'Práctica · Sin premios',en:'Practice · No rewards','pt-BR':'Treino · Sem prêmios'},
  verifiedProgress:{es:'Progreso para premios: victorias verificadas con conexión. El avance antiguo se conserva aparte; los premios nuevos requieren completar los pisos desde el primero.',en:'Reward progress: online verified wins. Historical progress is preserved separately; new rewards require completing floors from the first.', 'pt-BR':'Progresso para prêmios: vitórias verificadas online. O avanço antigo é preservado separadamente; os novos prêmios exigem completar os andares desde o primeiro.'},
  testPractice:{es:'Modo prueba activo: este combate no entrega monedas ni premios. Desactivalo en Configuración para jugar por recompensas.',en:'Test mode is on: this fight awards no coins or rewards. Turn it off in Settings to earn rewards.','pt-BR':'Modo de teste ativo: este combate não concede moedas nem prêmios. Desative-o nas Configurações para ganhar recompensas.'},
  previewPractice:{es:'Selector visual de trajes activo: este combate es de práctica, sin monedas ni premios. Elegí Desactivado · Usar mi traje habitual y aplicá el cambio en Configuración.',en:'Visual outfit preview is on: this is practice, with no coins or rewards. Select Off · Use my usual outfit and apply in Settings.','pt-BR':'Teste visual de trajes ativo: este combate é de treino, sem moedas nem prêmios. Selecione Desativado · Usar meu traje habitual e aplique nas Configurações.'}
 };
 const text=(key,language='es')=>guidance[key]?(guidance[key][language]||guidance[key].es):key==='locked'?(locked[language]||locked.es):key==='practiceOnly'?(practiceOnly[language]||practiceOnly.es):key==='ready'?(ready[language]||ready.es):key==='retry'?(retry[language]||retry.es):(messages[language]||messages.es)[key];
 function create({rpc,account,storage,online,id,onView=()=>{},onReward=()=>{},onProblem=()=>{}}){
  let run=null,current=null,pending=null,queue=Promise.resolve(),generation=0,paused=false;
  let confirmedSettlement=null,settlementInFlight=null;
  const key=owner=>'towerOnlineV1:'+owner;
  const progressKey=owner=>'towerProgressV1:'+owner;
  function progress(){const owner=account();if(!owner)return null;try{const p=JSON.parse(storage.getItem(progressKey(owner))||'null');return p?.userId===owner&&p.managed===true&&p.completed&&typeof p.completed==='object'?p:null;}catch{return null;}}
  function acceptStatus(response,owner){if(owner!==account()||response?.userId!==owner)throw Error('Tower account changed');const completed={};for(const p of response.progress||[])if(typeof p.character==='string'&&Number.isInteger(p.completed)&&p.completed>=0&&p.completed<=10)completed[p.character]=p.completed;const value={userId:owner,managed:true,completed};storage.setItem(progressKey(owner),JSON.stringify(value));return value;}
  async function refresh(){const owner=account();if(!owner)return null;if(!online())return progress();try{return acceptStatus(await rpc({p_action:'status',p_attempt:null,p_request:null,p_sequence:null,p_payload:{}}),owner);}catch{return progress();}}
  function acceptAttempt(attempt){if(!Number.isInteger(attempt?.completedFloors)||attempt.completedFloors<0||attempt.completedFloors>10)return;const before=progress()||{userId:run.owner,managed:true,completed:{}};before.completed[attempt.character]=Math.max(before.completed[attempt.character]||0,attempt.completedFloors);storage.setItem(progressKey(run.owner),JSON.stringify(before));}
  function save(){if(run)storage.setItem(key(run.owner),JSON.stringify({owner:run.owner,attemptId:run.attemptId,selection:run.selection,pending}));}
  function load(owner){try{const s=JSON.parse(storage.getItem(key(owner))||'null');return s?.owner===owner?s:null;}catch{return null;}}
  const active=()=>Boolean(run&&run.owner===account());
  function stop(){generation++;run=null;current=null;pending=null;paused=false;confirmedSettlement=null;settlementInFlight=null;}
  function forget(){if(run)storage.removeItem(key(run.owner));stop();}
  function apply(response,render=true){if(!response||response.userId!==run?.owner||run.owner!==account())throw Error('Tower account changed');if(response.attempt&&(!current||current.id!==response.attempt.id||response.attempt.sequence>=current.sequence)){current=response.attempt;run.attemptId=current.id;acceptAttempt(current);}if(render&&current)onView(current,response);return response;}
  function confirmed(response){const r=response?.receipt;return Boolean(current&&response?.pending===false&&r?.confirmed===true&&typeof r.id==='string'&&r.userId===run?.owner&&r.character===current.character&&r.floor===current.floor&&r.amount===(current.floor<=4?30:current.floor<=9?50:150));}
  async function request(args,render=true){const owner=run?.owner,token=generation;pending=args;save();const response=await rpc(args);if(token!==generation||owner!==account()||owner!==run?.owner)return null;apply(response,render);pending=null;paused=false;if(args.p_action==='settle'&&args.p_attempt===current?.id&&confirmed(response))confirmedSettlement={owner,attemptId:current.id,response};save();return response;}
  function serialize(task){const token=generation;const job=queue.then(()=>token===generation?task():null);queue=job.catch(()=>{});return job;}
  function presentReceipt(response){const receipt=response.receipt;const seenKey='towerCoinSeenV1:'+run.owner;let seen=[];try{seen=JSON.parse(storage.getItem(seenKey)||'[]');if(!Array.isArray(seen))seen=[];}catch{}
   if(receipt?.confirmed===true&&receipt.userId===run.owner&&Number.isInteger(receipt.amount)&&[30,50,150].includes(receipt.amount)&&!seen.includes(receipt.id)&&(response.newlyCredited||receipt.attemptId===current.id)){
    onReward(receipt);try{storage.setItem(seenKey,JSON.stringify([...seen,receipt.id].slice(-256)));}catch{}
   }
  }
  function settle(render=true){if(!active()||current?.status!=='won')return Promise.resolve(null);
   if(confirmedSettlement?.owner===run.owner&&confirmedSettlement.attemptId===current.id){const response={...confirmedSettlement.response,attempt:current,newlyCredited:false};presentReceipt(response);if(render)onView(current,response);return Promise.resolve(response);}
   if(settlementInFlight?.owner===run.owner&&settlementInFlight.attemptId===current.id)return settlementInFlight.promise;
   const flight={owner:run.owner,attemptId:current.id};settlementInFlight=flight;
   flight.promise=(async()=>{const response=await request({p_action:'settle',p_attempt:current.id,p_request:id(),p_sequence:null,p_payload:{}},false);if(!response)return null;
   presentReceipt(response);
   if(render)onView(current,response);return response;
   })().finally(()=>{if(settlementInFlight===flight)settlementInFlight=null;});return flight.promise;
  }
  function send(action,payload={}){return serialize(async()=>{
   if(!active()||!online()||pending){paused=true;onProblem('waiting');return null;}
   try{const response=await request({p_action:action,p_attempt:current.id,p_request:id(),p_sequence:action==='resume'?null:current.sequence,p_payload:payload});if(response&&current.status==='won')await settle();return response;}
   catch{paused=true;onProblem('waiting');return null;}
  });}
  function recover(){return serialize(async()=>{if(!active()||!online())return null;try{
   if(pending&&!await request(pending,false))return null;
   const response=await request({p_action:'resume',p_attempt:run.attemptId,p_request:id(),p_sequence:null,p_payload:{}},false);if(!response)return null;
   if(current.status==='won')await settle(false);paused=false;onView(current,response);return response;
  }catch{paused=true;onProblem('waiting');return null;}});}
  async function prepare(character,floor,language,reducedMotion=false){
   await queue;stop();const owner=account();if(!owner||!online())return {practice:true,reason:'practice'};
   let status;try{status=await rpc({p_action:'status',p_attempt:null,p_request:null,p_sequence:null,p_payload:{}});}catch{paused=true;onProblem('accountWaiting');return {waiting:true,reason:'accountWaiting'};}
   if(owner!==account()||status.userId!==owner)return {waiting:true};
   acceptStatus(status,owner);
   if(!status.enabled)return {practice:true,reason:'disabled'};
   const stored=load(owner);run={owner,attemptId:stored?.pending?stored.attemptId:(status.activeAttempt?.id||stored?.attemptId||null),selection:{character,floor,language,reducedMotion}};pending=stored?.pending||null;
   try{
    if(pending){if(!await request(pending,false))return {waiting:true};}
    if(current?.status==='won')await settle(false);
    const recoveredId=run.attemptId;
    // Server discovery also recovers a committed victory after reinstall or on another device.
    for(const attemptId of status.pendingRewards||[]){
     if(attemptId===current?.id)continue;
     await request({p_action:'resume',p_attempt:attemptId,p_request:id(),p_sequence:null,p_payload:{}},false);
     if(current.status==='won')await settle(false);
    }
    run.attemptId=status.activeAttempt?.id||recoveredId;
    if(run.attemptId){await request({p_action:'resume',p_attempt:run.attemptId,p_request:id(),p_sequence:null,p_payload:{}},false);
     if(current.status==='won')await settle(false);
     if(['prepared','playing'].includes(current.status)&&current.character===character&&current.floor===floor&&current.language===language)return {attempt:current,resumed:true};
     if(['prepared','playing'].includes(current.status))return {recoveryRequired:true,attempt:current};
    }
    current=null;run.attemptId=null;
    const response=await request({p_action:'begin',p_attempt:null,p_request:id(),p_sequence:null,p_payload:{character,floor,language,reducedMotion}},false);return response?{attempt:current}:{waiting:true};
   }catch(error){if(/TOWER_FLOOR_LOCKED/.test(error?.message||'')){forget();await refresh();return {locked:true};}if(/character not owned or verified|verified permanent account|validation disabled/.test(error?.message||'')){forget();return {practice:true,reason:/character/.test(error.message)?'unverified':'disabled'};}paused=true;onProblem('waiting');return {waiting:true};}
  }
  return Object.freeze({prepare,send,recover,settle,refresh,progress,active,paused:()=>paused,view:()=>current,stop,forget,flush:()=>queue});
 }
 return Object.freeze({create,text});
});
