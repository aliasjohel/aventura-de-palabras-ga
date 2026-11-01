/* Permanent server receipts only. This module never settles or claims rewards. */
(() => {
 'use strict';
 const root=globalThis,seen=new Set();let generation=0,current=null;
 const messages={
  es:{heading:'Premios del duelo',loading:'Consultando premios…',failed:'No pudimos consultar los premios.',retry:'Reintentar',coins:'Monedas obtenidas: +{n}',xp:'XP obtenido: +{n} XP',cap:'Límite diario de XP alcanzado.',none:'Este duelo no acreditó XP.',progress:'{n} / {max} XP para el siguiente nivel'},
  en:{heading:'Duel rewards',loading:'Checking rewards…',failed:'Could not check the rewards.',retry:'Retry',coins:'Coins earned: +{n}',xp:'XP earned: +{n} XP',cap:'Daily XP limit reached.',none:'This duel did not award XP.',progress:'{n} / {max} XP toward the next level'},
  'pt-BR':{heading:'Prêmios do duelo',loading:'Consultando prêmios…',failed:'Não foi possível consultar os prêmios.',retry:'Tentar novamente',coins:'Moedas obtidas: +{n}',xp:'XP obtido: +{n} XP',cap:'Limite diário de XP atingido.',none:'Este duelo não concedeu XP.',progress:'{n} / {max} XP para o próximo nível'}
 };
 const text=(key,args={})=>Object.entries(args).reduce((s,[k,v])=>s.replaceAll('{'+k+'}',v),(messages[root.I18n?.language]||messages.es)[key]);
 const owner=()=>root.CosmeticStore?.read().accountId;
 const node=(tag,value)=>{const n=document.createElement(tag);if(value)n.textContent=value;return n;};
 function render(){
  if(!current)return;const {target,state,receipt,matchId,valid}=current;
  target.hidden=false;target.classList.add('duel-xp-summary');target.replaceChildren();
  target.setAttribute('aria-live','polite');target.setAttribute('aria-atomic','true');
  target.append(node('h3',text('heading')));
  if(state!=='ready'){
   target.append(node('p',text(state==='loading'?'loading':'failed')));
   if(state==='failed'){const b=node('button',text('retry'));b.type='button';b.addEventListener('click',()=>void show(matchId,target,valid));target.append(b);}return;
  }
  const xp=receipt.xp;
  target.append(node('p',text('coins',{n:receipt.coins})),node('p',text('xp',{n:receipt.earned})),node('h4',root.PlayerXP.text('heading')),node('strong',root.PlayerXP.text('level',{n:xp.level})));
  const max=Math.max(1,xp.nextLevel-xp.levelStart),value=Math.max(0,xp.total-xp.levelStart),bar=node('progress');
  bar.max=max;bar.value=value;bar.setAttribute('aria-label',root.PlayerXP.text('heading'));bar.setAttribute('aria-valuetext',text('progress',{n:value,max}));
  target.append(bar,node('p',text('progress',{n:value,max})));
  if(receipt.earned===0)target.append(node('small',text(receipt.dailyCapped?'cap':'none')));
 }
 function validReceipt(r,id,user){return r?.confirmed===true&&r.matchId===id&&r.userId===user&&Number.isSafeInteger(r.coins)&&r.coins>=0&&Number.isSafeInteger(r.earned)&&r.earned>=0&&r.xp?.userId===user&&Number.isSafeInteger(r.xp.total)&&Number.isInteger(r.xp.level)&&Number.isSafeInteger(r.xp.levelStart)&&Number.isSafeInteger(r.xp.nextLevel)&&r.xp.nextLevel>r.xp.levelStart;}
 async function show(matchId,target,valid=()=>true){
  const version=++generation,user=owner();current={matchId,target,valid,state:'loading'};render();
  try{
   const r=await root.GameWallet.multiplayerRewards(matchId);
   if(version!==generation||user!==owner()||!valid())return;
   if(!validReceipt(r,matchId,user))throw Error('Unconfirmed receipt');
   current.receipt=r;current.state='ready';render();
   const id=user+':'+matchId,key='multiplayerXPAnimatedV1:'+id;
   let stored=false;try{stored=localStorage.getItem(key)==='1';}catch{}
   if(!seen.has(id)&&!stored){
    seen.add(id);try{localStorage.setItem(key,'1');}catch{}
    root.AdventureXPFeedback.duel(r,()=>version===generation&&user===owner()&&valid());
   }
  }catch{
   if(version!==generation||user!==owner()||!valid())return;
   current.state='failed';render();
  }
 }
 function clear(){generation++;if(current){current.target.hidden=true;current.target.replaceChildren();}current=null;}
 root.MultiplayerXPFeedback=Object.freeze({show,clear});
 root.addEventListener('wallet-session-ended',clear);
 root.addEventListener('wallet-updated',()=>{if(current?.receipt&&current.receipt.userId!==owner())clear();});
 root.I18n?.subscribe(render);
})();
