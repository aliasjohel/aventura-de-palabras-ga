/* Isolated practice before matchmaking. Never writes a room or a game wallet. */
(()=>{
 'use strict';
 const U=GameUI,t=(key,params={})=>U.resolve(U.key('multiplayer.preparationGuide.'+key,params));
 const localKey=()=> 'versusPreparationGuide:v1:'+(CosmeticStore.read().accountId||'local');
 const busy=()=>Boolean(busquedaPublicaActiva||partidaOnlineVersus?.status==='playing'||(adaptadorSalasVersus.proveedor==='supabase'&&adaptadorSalasVersus.obtenerSala()?.id&&adaptadorSalasVersus.obtenerSala().estado!=='finished'));
 const modal=document.createElement('dialog');modal.id='guiaPreparacionVersus';modal.className='menu-dialogo guia-preparacion';modal.setAttribute('aria-labelledby','tituloGuiaPreparacion');
 modal.innerHTML='<header class="menu-dialogo-cabecera"><div><small data-guide-progress></small><h2 id="tituloGuiaPreparacion"></h2></div><button type="button" data-guide-close>×</button></header><div class="guia-preparacion-cuerpo"><section class="guia-preparacion-explicacion"><p data-guide-copy></p><p class="guia-preparacion-practica" data-guide-practice></p><p data-guide-notice role="status" aria-live="polite"></p></section><section class="guia-preparacion-formulario"><label data-guide-topic-label><span></span><select data-guide-topic></select></label><div data-guide-words></div><button type="button" data-guide-random></button><p data-guide-pin-help></p><div class="guia-preparacion-reloj"><span></span><strong>01:30</strong></div></section></div><footer><button type="button" data-guide-prev></button><button type="button" data-guide-next></button><button type="button" data-guide-combat hidden></button><button type="button" data-guide-skip></button></footer>';
 document.body.append(modal);const el=s=>modal.querySelector(s),wordsEl=el('[data-guide-words]');
 let step=0,after=null,storageKey=null,values=['','','','',''],pins=[false,false,false,false,false],topic='',notice='',last=[];
 const inputs=[],pinButtons=[];const rules=()=>WordGameplay.rules(I18n.language);
 const banks=()=>ReviewedWordBanks.banks[I18n.language]||ReviewedWordBanks.banks.es;
 const pool=()=>banks()[topic]||[];
 function valid(word){return rules().validate(word)&&pool().some(w=>rules().key(w)===rules().key(word));}
 const validAt=i=>valid(values[i])&&!values.some((w,j)=>j!==i&&rules().key(w)===rules().key(values[i]));
 for(let i=0;i<5;i++){
  const row=document.createElement('label');row.className='guia-preparacion-palabra';const n=document.createElement('span');n.textContent=String(i+1);const input=document.createElement('input');input.type='text';input.maxLength=12;input.autocomplete='off';input.spellcheck=false;input.dataset.guideWord=String(i);
  const pin=document.createElement('button');pin.type='button';pin.textContent='📌';pin.dataset.guidePin=String(i);pin.setAttribute('aria-pressed','false');
  input.addEventListener('input',()=>{values[i]=rules().clean(input.value);input.value=values[i];pins=pins.map((p,j)=>p&&validAt(j));notice=values[i]&&!validAt(i)?t('invalid'):'';renderFields();});
  pin.addEventListener('click',e=>{e.preventDefault();if(!valid(values[i]))return;pins[i]=!pins[i];notice=t(pins[i]?'pinned':'unpinned');renderFields();});
  row.append(n,input,pin);wordsEl.append(row);inputs.push(input);pinButtons.push(pin);
 }
 function renderFields(){
  inputs.forEach((input,i)=>{input.disabled=!topic;input.value=values[i];input.setAttribute('aria-label',t('word',{number:i+1}));input.setAttribute('aria-invalid',String(Boolean(values[i]&&!validAt(i))));const pin=pinButtons[i];pin.disabled=!validAt(i);pin.setAttribute('aria-pressed',String(pins[i]));pin.setAttribute('aria-label',t(pins[i]?'unpin':'pin',{number:i+1}));});
  el('[data-guide-random]').disabled=!topic;el('[data-guide-notice]').textContent=notice;
  el('[data-guide-next]').disabled=step===0&&!topic;
 }
 function render(){
  el('[data-guide-progress]').textContent=t('progress',{step:step+1,total:5});el('#tituloGuiaPreparacion').textContent=t('steps.s'+step+'.title');el('[data-guide-copy]').textContent=t('steps.s'+step+'.copy');el('[data-guide-practice]').textContent=t('practice');
  el('[data-guide-close]').setAttribute('aria-label',t('close'));el('[data-guide-topic-label]>span').textContent=t('topic');el('[data-guide-random]').textContent=U.resolve(U.key('common.duelPreparation.random'));el('[data-guide-pin-help]').textContent=U.resolve(U.key('common.duelPreparation.pinHelp'));
  const select=el('[data-guide-topic]');select.replaceChildren(new Option(t('chooseTopic'),''),...Object.keys(banks()).map(id=>new Option(U.resolve(U.key('common.duelPreparation.topics.'+id)),id)));select.value=topic;
  el('.guia-preparacion-reloj span').textContent=t('practiceClock');el('[data-guide-prev]').textContent=t('previous');el('[data-guide-prev]').disabled=step===0;el('[data-guide-next]').textContent=t(step===4?'enter':'next');
  el('[data-guide-combat]').hidden=step!==4;el('[data-guide-combat]').textContent=t('combat');el('[data-guide-skip]').textContent=t('later');
  modal.dataset.step=String(step);el('[data-guide-topic-label]').classList.toggle('guia-objetivo',step===0);wordsEl.classList.toggle('guia-objetivo',step===1);el('[data-guide-random]').classList.toggle('guia-objetivo',step===2);wordsEl.classList.toggle('guia-fijar',step===3);el('.guia-preparacion-reloj').classList.toggle('guia-objetivo',step===4);renderFields();
 }
 function fill(){
  const fixed=new Set(values.filter((_,i)=>pins[i]).map(w=>rules().key(w)));let candidates=pool().filter(w=>!fixed.has(rules().key(w))&&!last.includes(w));if(candidates.length<5-fixed.size)candidates=pool().filter(w=>!fixed.has(rules().key(w)));
  const shuffled=[...candidates];for(let i=shuffled.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];}
  let n=0;values=values.map((w,i)=>pins[i]?w:shuffled[n++]||'');last=[...values];notice=t('filled');renderFields();
 }
 function finish(combat=false){
  const continuation=after;after=null;try{if(storageKey)localStorage.setItem(storageKey,'seen');}catch{}modal.close();
  if(combat&&!busy())abrirTutorialVersus({alCerrar:continuation});else continuation?.();
 }
 function open(continuation=null){
  if(busy()){U.text(document.getElementById('estadoCuentaVersus'),U.key('multiplayer.preparationGuide.busy'));return false;}
  if(modal.open)return true;after=continuation;storageKey=localKey();step=0;values=['','','','',''];pins=[false,false,false,false,false];topic='';notice='';last=[];render();modal.showModal();el('[data-guide-topic]').focus();return true;
 }
 function offer(continuation){try{if(localStorage.getItem(localKey())==='seen')return false;}catch{}return open(continuation);}
 el('[data-guide-topic]').addEventListener('change',()=>{topic=el('[data-guide-topic]').value;values=['','','','',''];pins=[false,false,false,false,false];last=[];notice='';renderFields();});
 el('[data-guide-random]').addEventListener('click',fill);
 el('[data-guide-prev]').addEventListener('click',()=>{if(step>0){step--;notice='';render();}});
 el('[data-guide-next]').addEventListener('click',()=>{if(step===0&&!topic)return;if(step===4){finish();return;}step++;notice='';render();el('#tituloGuiaPreparacion').scrollIntoView({block:'nearest'});});
 el('[data-guide-combat]').addEventListener('click',()=>finish(true));el('[data-guide-skip]').addEventListener('click',()=>finish());el('[data-guide-close]').addEventListener('click',()=>finish());modal.addEventListener('cancel',e=>{e.preventDefault();finish();});
 document.getElementById('btnTutorialVersus').addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();open();},true);
 I18n.subscribe(()=>{if(modal.open){step=0;topic='';values=['','','','',''];pins=[false,false,false,false,false];notice='';last=[];render();}});
 globalThis.VersusPreparationGuide=Object.freeze({offer,open});
})();
