(() => {
 'use strict';
 let toast=null,timer=null,ready=false;
 const messages={es:{paid:'Monedas acreditadas',offline:'El progreso offline no acredita monedas verificadas. Para cobrarlas, completá esta misión online.',verify:'Esperando la confirmación del servidor.',off:'Las recompensas todavía no están habilitadas.',done:'Recompensa ya cobrada.',online:'Monedas disponibles al completar y validar la misión online.'},en:{paid:'Coins credited',offline:'Offline progress does not credit verified coins. Complete this mission online to claim them.',verify:'Waiting for server confirmation.',off:'Rewards are not enabled yet.',done:'Reward already claimed.',online:'Coins available after completing and verifying this mission online.'},'pt-BR':{paid:'Moedas creditadas',offline:'O progresso offline não credita moedas verificadas. Conclua esta missão online para recebê-las.',verify:'Aguardando a confirmação do servidor.',off:'As recompensas ainda não estão habilitadas.',done:'Recompensa já recebida.',online:'Moedas disponíveis ao concluir e validar a missão online.'}};
 const text=key=>globalThis.I18n?.resolve?.('adventure.rewards.feedback.'+key)||(messages[globalThis.I18n?.language]||messages.es)[key];
 function render(){
  if(!ready)return;const detail=document.getElementById('detalleMision');if(!detail||typeof escenarioActual==='undefined')return;
  let note=document.getElementById('estadoRecompensaMision');if(!note){note=document.createElement('p');note.id='estadoRecompensaMision';note.className='estado-recompensa-mision';note.setAttribute('role','status');detail.after(note);}
  const status=AdventureRewards.status(escenarioActual,misionActual);
  note.dataset.rewardStatus=status;
  note.textContent=text(status==='claimed'?'done':status==='processing'?'verify':status==='unavailable'?'off':!navigator.onLine||status==='replay_required'?'offline':'online');
 }
 function show(receipt){
  if(receipt.userId!==globalThis.CosmeticStore?.read().accountId)return;
  if(document.hidden)return;
  toast?.remove();clearTimeout(timer);toast=document.createElement('div');toast.className='recompensa-confirmada';toast.setAttribute('role','status');toast.dataset.receipt=receipt.id;toast.dataset.owner=receipt.userId;
  const label=document.createElement('strong');label.textContent='+'+receipt.amount;const icon=document.createElement('b');icon.className='moneda-confirmada-dibujo';icon.setAttribute('aria-hidden','true');label.append(icon);const caption=document.createElement('span');caption.textContent=text('paid');toast.append(label,caption);
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches)for(let i=0;i<10;i++){const coin=document.createElement('i');coin.className='moneda-confirmada-dibujo';coin.setAttribute('aria-hidden','true');coin.style.setProperty('--coin-i',i);toast.append(coin);}
  document.body.append(toast);if(typeof reproducirSonido==='function')reproducirSonido('moneda');timer=setTimeout(()=>{toast?.remove();toast=null;},3300);
 }
 window.addEventListener('wallet-session-ended',()=>{toast?.remove();toast=null;clearTimeout(timer);});
 window.addEventListener('adventure-reward-confirmed',event=>{if(document.hidden){event.preventDefault();return;}show(event.detail);});
 for(const event of ['adventure-rewards-updated','wallet-updated','online','offline'])window.addEventListener(event,()=>{render();if(toast&&toast.dataset.owner!==CosmeticStore.read().accountId){/* Account changes never retain a previous player's toast. */toast.remove();toast=null;}});
 // Presentation is not persisted as an offline payment. Recovery must ask the server again.
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)void AdventureRewards.recover().catch(()=>{});});
 window.addEventListener('DOMContentLoaded',()=>{ready=true;render();I18n.subscribe(render);});
})();
