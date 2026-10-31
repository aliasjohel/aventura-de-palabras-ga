/* Account XP is a server snapshot. Local Adventure XP is never an award source. */
(() => {
 'use strict';
 const root=globalThis;
 let state=null,busy=false,notice='';
 const messages={
 es:{heading:'Nivel general',level:'Nivel {n}',progress:'{xp} / {next} XP',daily:'Actividad diaria: {used} / 300 XP · reinicio 00:00 UTC',collection:'Maestría de palabras · Premios de XP',claim:'Recibir premio',claimed:'Recibido',locked:'Nivel {n}',equip:'Equipar',equipped:'Equipado',noTitle:'Sin título especial',connect:'Conectate con tu cuenta para consultar tus niveles.',paused:'Los niveles están temporalmente en pausa.',saved:'Cambio guardado.',reward:'Premio recibido.',failed:'No pudimos guardar el cambio. Reintentá con conexión.',legacy:'XP histórico de este dispositivo: {n} · no acredita premios',coins:'{n} monedas',title:'Título',frame:'Marco'},
 en:{heading:'General level',level:'Level {n}',progress:'{xp} / {next} XP',daily:'Daily activity: {used} / 300 XP · resets 00:00 UTC',collection:'Word Mastery · XP rewards',claim:'Claim reward',claimed:'Claimed',locked:'Level {n}',equip:'Equip',equipped:'Equipped',noTitle:'No special title',connect:'Connect with your account to view your levels.',paused:'Levels are temporarily paused.',saved:'Change saved.',reward:'Reward claimed.',failed:'Could not save the change. Reconnect and retry.',legacy:'Historical XP on this device: {n} · does not grant rewards',coins:'{n} coins',title:'Title',frame:'Frame'},
 'pt-BR':{heading:'Nível geral',level:'Nível {n}',progress:'{xp} / {next} XP',daily:'Atividade diária: {used} / 300 XP · reinício 00:00 UTC',collection:'Maestria das palavras · Prêmios de XP',claim:'Receber prêmio',claimed:'Recebido',locked:'Nível {n}',equip:'Equipar',equipped:'Equipado',noTitle:'Sem título especial',connect:'Conecte sua conta para consultar seus níveis.',paused:'Os níveis estão temporariamente pausados.',saved:'Alteração salva.',reward:'Prêmio recebido.',failed:'Não foi possível salvar. Conecte-se e tente novamente.',legacy:'XP histórico neste dispositivo: {n} · não concede prêmios',coins:'{n} moedas',title:'Título',frame:'Moldura'}
 };
 const names={
 es:{xp_tinta:'Tinta naciente',xp_constelacion:'Constelación de letras',xp_codice:'Códice luminoso',xp_infinito:'Alfabeto infinito',xp_buscapalabras:'Buscapalabras',xp_tejedor:'Tejedor de vocablos',xp_cronista:'Cronista estelar',xp_voz:'Voz de las mil historias'},
 en:{xp_tinta:'Rising Ink',xp_constelacion:'Letter Constellation',xp_codice:'Luminous Codex',xp_infinito:'Infinite Alphabet',xp_buscapalabras:'Word Seeker',xp_tejedor:'Word Weaver',xp_cronista:'Star Chronicler',xp_voz:'Voice of a Thousand Stories'},
 'pt-BR':{xp_tinta:'Tinta nascente',xp_constelacion:'Constelação de letras',xp_codice:'Códice luminoso',xp_infinito:'Alfabeto infinito',xp_buscapalabras:'Buscador de palavras',xp_tejedor:'Tecelão de palavras',xp_cronista:'Cronista estelar',xp_voz:'Voz de mil histórias'}
 };
 const lang=()=>messages[root.I18n?.language]?root.I18n.language:'es';
 const text=(key,args={})=>Object.entries(args).reduce((s,[k,v])=>s.replaceAll('{'+k+'}',String(v)),messages[lang()][key]||key);
 const name=id=>names[lang()][id]||'';
 const account=()=>root.CosmeticStore?.read().accountId||null;
 const read=()=>state?.userId===account()?state:null;
 const own=document.createElement('section');own.id='nivelPerfilPropio';own.className='perfil-xp';
 document.getElementById('rangoPerfilPropio').after(own);
 const publicNode=document.createElement('section');publicNode.id='nivelPerfilPublico';publicNode.className='perfil-xp';
 document.getElementById('rangoPerfilPublico').after(publicNode);
 let shownPublic=null;
 function node(tag,value){const n=document.createElement(tag);n.textContent=value;return n;}
 function badge(target,xp){
  target.replaceChildren(node('h3',text('heading')));
  if(!xp){target.append(node('p',text('connect')));return;}
  target.append(node('strong',text('level',{n:xp.level})));
  target.append(node('p',text('progress',{xp:xp.total,next:xp.nextLevel})));
  const bar=document.createElement('progress');bar.max=Math.max(1,xp.nextLevel-xp.levelStart);bar.value=Math.max(0,xp.total-xp.levelStart);bar.setAttribute('aria-label',text('heading'));target.append(bar);
  if(xp.title)target.append(node('p',name(xp.title)));
 }
 function button(label,action,disabled=false){const b=node('button',label);b.type='button';b.disabled=busy||disabled;b.addEventListener('click',action);return b;}
 function render(){
  const xp=read();badge(own,xp);badge(publicNode,shownPublic);
  if(!xp)return;
  own.append(node('small',text('daily',{used:xp.dailyUsed||0})));
  if(!xp.enabled)own.append(node('p',text('paused')));
  own.append(node('h4',text('collection')));
  for(const r of xp.rewards||[]){
   const row=document.createElement('article');row.className='xp-reward';row.dataset.level=r.level;
   row.append(node('strong',text('level',{n:r.level})),node('span',text('coins',{n:r.coins})));
   if(r.frame)row.append(node('span',text('frame')+': '+name(r.frame)));
   if(r.title)row.append(node('span',text('title')+': '+name(r.title)));
   row.append(button(r.claimed?text('claimed'):xp.total>=r.threshold?text('claim'):text('locked',{n:r.level}),()=>act('claim',r.level),r.claimed||xp.total<r.threshold||!xp.enabled));own.append(row);
  }
  const titles=document.createElement('label');titles.textContent=text('title')+' ';
  const select=document.createElement('select');select.id='tituloXP';select.append(new Option(text('noTitle'),''));
  for(const id of xp.ownedTitles||[])select.append(new Option(name(id),id));select.value=xp.title||'';select.disabled=busy||!xp.enabled;
  select.addEventListener('change',()=>act('equip',null,null,select.value));titles.append(select);own.append(titles);
  for(const id of xp.ownedFrames||[]){const equipped=root.PlayerAvatar?.obtener().frame===id;own.append(button(name(id)+' · '+text(equipped?'equipped':'equip'),()=>act('equip',null,id),!xp.enabled));}
  const status=node('p',notice);status.setAttribute('role','status');own.append(status);
  try{const old=JSON.parse(localStorage.getItem('aventuraXPHistoricoV1'));if(Number.isSafeInteger(old?.xp)&&old.xp>=0)own.append(node('small',text('legacy',{n:old.xp})));}catch{}
 }
 function apply(xp){
  if(!xp||xp.userId!==account()||!Number.isSafeInteger(xp.total)||!Number.isInteger(xp.level))return false;
  if(state?.userId===xp.userId&&state.revision>xp.revision)return false;
  state=xp;render();root.dispatchEvent(new Event('player-xp-updated'));return true;
 }
 async function act(action,reward=null,frame=null,title=null){
  if(busy||!read())return;const owner=account();busy=true;notice='';render();
  try{const result=await root.GameWallet.xp(action,reward,frame,title);if(owner!==account())return;apply(result.xp);
   if(action==='equip'&&frame&&result.appearance)root.PlayerAvatar?.aplicarXP(result.appearance);
   notice=text(action==='claim'?'reward':'saved');
  }catch{if(owner===account())notice=text('failed');}finally{busy=false;render();}
 }
 async function sync(){try{return await root.GameWallet.xp('sync');}catch{render();return null;}}
 function archive(){try{if(localStorage.getItem('aventuraXPHistoricoV1')!==null)return;const p=JSON.parse(localStorage.getItem('progresoAventuraGA'));if(Number.isSafeInteger(p?.experiencia)&&p.experiencia>=0)localStorage.setItem('aventuraXPHistoricoV1',JSON.stringify({xp:p.experiencia,source:'local-adventure',capturedAt:new Date().toISOString()}));}catch{}}
 archive();
 root.PlayerXP=Object.freeze({apply,read,sync,text,name,ownedFrame:id=>Boolean(read()?.ownedFrames?.includes(id)),publicProfile:xp=>{shownPublic=xp||null;badge(publicNode,shownPublic);},preserveHistorical:archive});
 root.addEventListener('wallet-session-ended',()=>{state=null;busy=false;notice='';shownPublic=null;render();});
 root.addEventListener('wallet-updated',()=>{if(state?.userId!==account()){state=null;notice='';render();}});
 document.getElementById('avatarMenu').addEventListener('click',()=>{void sync();});
 root.I18n?.subscribe(render);render();
})();
