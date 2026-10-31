/* Presentation only. Amounts, levels and boundaries come from confirmed RPCs. */
(() => {
 'use strict';
 const root=globalThis,queue=new Map();let active=null,wake=null;
 const messages={
  es:{complete:'MISIÓN COMPLETADA',confirmed:'XP confirmado',up:'¡SUBISTE DE NIVEL!',available:'Premios disponibles en tu perfil',total:'{n} XP totales',coins:'{n} monedas'},
  en:{complete:'MISSION COMPLETE',confirmed:'XP confirmed',up:'LEVEL UP!',available:'Rewards available in your profile',total:'{n} total XP',coins:'{n} coins'},
  'pt-BR':{complete:'MISSÃO CONCLUÍDA',confirmed:'XP confirmado',up:'VOCÊ SUBIU DE NÍVEL!',available:'Prêmios disponíveis no seu perfil',total:'{n} XP no total',coins:'{n} moedas'}
 };
 const t=(key,n)=>((messages[root.I18n?.language]||messages.es)[key]||key).replace('{n}',String(n));
 const owner=()=>root.CosmeticStore?.read().accountId;
 const key=()=> 'aventuraXPAnimadoV1:'+owner();
 function shown(){try{const a=JSON.parse(localStorage.getItem(key())||'[]');return Array.isArray(a)?a:[];}catch{return [];}}
 function mark(id){try{localStorage.setItem(key(),JSON.stringify([...new Set([...shown(),id])]));}catch{}}
 function node(tag,text,cls){const e=document.createElement(tag);if(text)e.textContent=text;if(cls)e.className=cls;return e;}
 const visible=e=>e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden';
 function blocked(){
  return document.hidden||Boolean(document.querySelector('dialog[open]'))||
   [...document.querySelectorAll('.kairos-cinema,.cinematica-azrak,.cinematica-final-cumbres,.cinematica-final-desierto,.cinematica-desafio-guardiana,.cinematica-santuario,.cinematica-despertar-dragon,.cierre-cinematica-mundo,.cinematica-final-versus.activa')].some(visible)||
   (typeof cinematicaPortalActiva!=='undefined'&&cinematicaPortalActiva)||(typeof cinematicaSantuarioActiva!=='undefined'&&cinematicaSantuarioActiva);
 }
 const audio={};
 function sound(kind){
  if(!root.GameAudio||GameAudio.get('effects')===0)return;
  const files={coin:'moneda.mp3',xp:'cristal-casilla.mp3',level:'diamante-recolectado.mp3'};
  const a=audio[kind]||(audio[kind]=GameAudio.create('assets/sounds/'+files[kind]));a.volume=.45;a.currentTime=0;void a.play().catch(()=>{});
 }
 function silence(){Object.values(audio).forEach(a=>a.pause());}
 function enqueue(attempt,userId,kind,value){
  if(userId!==owner())return;
  if(active?.attempt===attempt&&active.userId===userId){active[kind]=value;active.refresh=true;return;}
  let item=queue.get(attempt);
  if(!item){item={attempt,userId,notBefore:performance.now()+350};queue.set(attempt,item);}
  item[kind]=value;
  if(!wake)wake=setTimeout(pump,100);
 }
 async function pump(){
  clearTimeout(wake);wake=null;if(active||!queue.size)return;
  for(const [id,item]of queue)if(item.userId!==owner())queue.delete(id);
  const item=queue.values().next().value;if(!item)return;
  if(blocked()||performance.now()<item.notBefore){wake=setTimeout(pump,250);return;}
  queue.delete(item.attempt);active=item;
  try{await present(item);}finally{if(active===item){active=null;silence();}if(queue.size&&!wake)wake=setTimeout(pump,100);}
 }
 async function present(item,existing=null){
  const reward=item.xp,hasXP=reward&&(!shown().includes(reward.event)||item.presentedEvent===reward.event);
  if(!item.coin&&!hasXP)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches||(hasXP&&!reward.levels?.length);
  const card=existing||node('section');card.className='recompensa-confirmada recompensa-xp';card.replaceChildren();card.dataset.owner=item.userId;card.dataset.attempt=item.attempt;
  const heading=node('small',t('complete'),'xp-celebration-heading'),amounts=node('div',null,'xp-celebration-amounts');card.append(heading,amounts);
  if(item.coin){const c=node('strong','+'+item.coin.amount);c.append(node('b',null,'moneda-confirmada-dibujo'));amounts.append(c);}
  if(hasXP)amounts.append(node('strong','+'+reward.earned+' XP','xp-earned'));
  const announce=node('span',null,'xp-announcement');announce.setAttribute('role','status');announce.textContent=hasXP?t('confirmed'):root.I18n?.resolve?.('adventure.rewards.feedback.paid')||t('complete');card.append(announce);
  const level=node('strong',null,'xp-celebration-level'),track=node('div',null,'xp-celebration-track'),fill=node('div',null,'xp-celebration-fill'),numbers=node('span',null,'xp-celebration-numbers');
  const progress=node('div',null,'xp-celebration-progress');progress.setAttribute('aria-hidden','true');track.append(fill);progress.append(level,track,numbers);if(hasXP)card.append(progress);
  const prizes=node('p',null,'xp-celebration-prizes');card.append(prizes);
  if(item.coin&&!reduced&&!item.coinAnimated){
   for(let i=0;i<10;i++){const coin=node('i',null,'moneda-confirmada-dibujo');coin.setAttribute('aria-hidden','true');coin.style.setProperty('--coin-i',i);card.append(coin);}
   item.coinAnimated=true;
  }
  if(!existing)document.body.append(card);if(hasXP){mark(reward.event);item.presentedEvent=reward.event;}
  if(item.coin&&!item.coinSounded){sound('coin');item.coinSounded=true;}else if(hasXP&&!item.xpSounded){sound('xp');item.xpSounded=true;}
  const steps=hasXP&&reward.levels?.length?reward.levels:[reward?.xp].filter(Boolean);
  const duration=reduced?0:Math.max(100,Math.min(850,3000/Math.max(1,steps.length)));
  let index=0,elapsed=0,hold=0,last=performance.now(),lastCheck=0,paused=false,leveled=false;
  function draw(info,total){
   level.textContent=root.PlayerXP.text('level',{n:info.level});card.dataset.level=info.level;
   const current=Math.max(0,total-info.levelStart),max=Math.max(1,info.nextLevel-info.levelStart);
   fill.style.transform='scaleX('+Math.min(1,current/max)+')';numbers.textContent=current+' / '+max+' XP · '+t('total',total);
  }
  function prizesText(){
   const list=reward.xp.rewards?.filter(r=>r.threshold>reward.from.total&&r.threshold<=reward.xp.total&&!r.claimed)||[];
   prizes.textContent=list.length?t('available')+': '+list.map(r=>[t('coins',r.coins),r.frame&&PlayerXP.name(r.frame),r.title&&PlayerXP.name(r.title)].filter(Boolean).join(' · ')).join(' / '):'';
  }
  if(hasXP&&reduced){draw(reward.xp,reward.xp.total);if(reward.xp.level>reward.from.level){leveled=true;heading.textContent=t('up');announce.textContent=t('up')+' '+PlayerXP.text('level',{n:reward.xp.level});card.classList.add('xp-level-up');sound('level');}prizesText();}
  const outcome=await new Promise(resolve=>{
   function frame(now){
    if(item.userId!==owner()||!card.isConnected){card.remove();resolve();return;}
    if(item.refresh){item.refresh=false;resolve('refresh');return;}
    if(now-lastCheck>150){paused=blocked();lastCheck=now;card.hidden=Boolean(paused);if(paused)silence();}
    const delta=Math.min(64,now-last);last=now;
    if(!paused){
     if(hasXP&&!reduced&&index<steps.length){
      const info=steps[index],start=Math.max(reward.from.total,info.levelStart),end=Math.min(reward.xp.total,info.nextLevel);
      elapsed+=delta;const f=Math.min(1,elapsed/duration),ease=1-Math.pow(1-f,3);draw(info,Math.round(start+(end-start)*ease));
      if(f===1){index++;elapsed=0;if(index<steps.length){leveled=true;heading.textContent=t('up');card.classList.add('xp-level-up');card.dataset.levelUps=String(index);announce.textContent=t('up')+' '+PlayerXP.text('level',{n:steps[index].level});sound('level');}else{draw(reward.xp,reward.xp.total);prizesText();}}
     }else hold+=delta;
     if(hold>=(hasXP?2100:3000)){card.remove();resolve();return;}
     if(!leveled)heading.textContent=t('complete');
    }
    requestAnimationFrame(frame);
   }
   requestAnimationFrame(frame);
  });
  if(outcome==='refresh')return present(item,card);
 }
 root.AdventureXPFeedback=Object.freeze({coin:r=>enqueue(r.attemptId,r.userId,'coin',r)});
 root.addEventListener('adventure-xp-confirmed',e=>{
  const r=e.detail;
  if(r?.confirmed!==true||r.userId!==owner()||!Number.isInteger(r.earned)||r.earned<=0||typeof r.event!=='string'||shown().includes(r.event))return;
  if(r.xp?.userId!==r.userId||!Number.isSafeInteger(r.xp.total)||!r.from||r.from.total>r.xp.total)return;
  if(active?.xp?.event===r.event||[...queue.values()].some(i=>i.xp?.event===r.event))return;
  enqueue(r.attemptId,r.userId,'xp',r);
 });
 function clear(){queue.clear();active=null;clearTimeout(wake);wake=null;document.querySelectorAll('.recompensa-xp').forEach(e=>e.remove());silence();}
 root.addEventListener('wallet-session-ended',clear);
 root.addEventListener('wallet-updated',()=>{if(active&&active.userId!==owner())clear();});
})();
