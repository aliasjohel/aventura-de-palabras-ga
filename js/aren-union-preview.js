(() => {
  'use strict';
  const $=id=>document.getElementById(id),scene=$('escena'),body=$('cuerpo');
  const params=new URLSearchParams(location.search),embedded=params.get('integrado')==='1';
  if(embedded){document.body.classList.add('integrada');const victim=params.get('victima');if(victim&&/^assets\/images\/[a-zA-Z0-9_/-]+\.png$/.test(victim))$('rival').src=victim;}
  const dir='assets/images/trajes/aren-union-',colors=['#70e350','#ffc247','#54caff','#bd79ff','#ff6651'];
  const heroes=[['assets/images/personajes/coleccion/guardiana-bosque-base.png',5,30],['assets/images/personajes/versus/guardian-alba-base.png',22,16],['assets/images/personajes/versus/dragon-base.png',40,12],['assets/images/personajes/versus/dragon-hielo-base.png',57,17],['assets/images/personajes/versus/t-shadow-base.png',75,28]];
  heroes.forEach(([src,x,y],i)=>{const img=new Image();img.src=src;img.style.cssText=`--x:${x}%;--y:${y}%;--color:${colors[i]}`;$('guardianes').append(img);const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',`M${(x+10)*10} ${(y+18)*6} Q${(x+15)*10} 350 350 340`);path.setAttribute('stroke',colors[i]);$('rayos').append(path);});
  const gems=colors.map((color,i)=>{const el=document.createElement('i');el.className='gema';el.style.setProperty('--color',color);$('cristales').append(el);return el;});
  for(let i=0;i<25;i++){const el=document.createElement('i');const a=i*2.399;el.style.cssText=`--color:${colors[i%5]};--dx:${Math.cos(a)*(110+i*5)}px;--dy:${Math.sin(a)*(100+i*4)}px;animation-delay:${i%4*.04}s`;$('fragmentos').append(el);}
  const preloads=['base','invocacion','victoria','capa'].map(p=>{const img=new Image();img.src=dir+p+'-v1.png';return img.decode();});
  let steps=[],timer=null,remaining=0,due=0,paused=false,version=0,pending=null;
  function orbit(){gems.forEach((g,i)=>{g.style.left=[18,30,43,14,45][i]+'%';g.style.top=[37,22,38,59,60][i]+'%';g.style.opacity='1';g.style.transform='scale(1)';});}
  function title(t,label){$('titulo').textContent=t;$('fase').textContent=label;}
  function stop(){clearTimeout(timer);timer=null;pending=null;steps=[];paused=false;scene.className='escena';$('pausa').textContent='Pausar';$('pausa').setAttribute('aria-pressed','false');body.src=dir+'base-v1.png';orbit();}
  function next(){if(!steps.length){timer=null;pending=null;return;}const [delay,fn]=steps.shift();pending=fn;remaining=delay;due=performance.now()+delay;timer=setTimeout(resume,delay);}
  function resume(){if(pending){const fn=pending;pending=null;fn();next();}}
  async function start(mode){const token=++version;stop();await Promise.all(preloads);if(token!==version)return;scene.dataset.mode=mode;title('Aren y su capa de energía','EL PODER DE LA UNIÓN');$('estado').textContent='Prueba visual · sin compras ni cambios en tu partida.';
    if(mode==='duelo'){gems.forEach(g=>g.style.opacity='.35');return;}
    if(mode==='ataque'){scene.classList.add('ataque');body.src=dir+'invocacion-v1.png';steps=[[700,()=>{scene.classList.remove('ataque');body.src=dir+'base-v1.png';}]];next();return;}
    if(mode==='entrada'){scene.classList.add('entrada');title('El poder de los cinco cristales','ENTRADA DE AREN');steps=[[800,()=>{body.src=dir+'invocacion-v1.png';}],[1200,()=>{gems.forEach(g=>{g.style.left='49%';g.style.top='55%';g.style.transform='scale(.3)';});}],[1000,()=>{body.src=dir+'base-v1.png';gems.forEach(g=>g.style.opacity='0');title('Guardián de los Cinco Cristales','LISTO PARA EL DUELO');}]];next();return;}
    title('Los guardianes responden','JUICIO DE LOS CINCO CRISTALES');scene.classList.add('guardianes-activos');
    steps=[[1900,()=>{body.src=dir+'invocacion-v1.png';title('La unión concentra su energía','LOS CINCO GUARDIANES');}],[1700,()=>{gems.forEach((g,i)=>{g.style.left=[67,78,88,68,87][i]+'%';g.style.top=[35,21,37,67,68][i]+'%';});title('Prisión de los Cinco Cristales','EL PODER RODEA AL RIVAL');}],[1100,()=>{scene.classList.add('encerrado');}],[1700,()=>{scene.classList.add('estallido');body.src=dir+'victoria-v1.png';title('El cristal se rompe','JUICIO DE LA UNIÓN');}],[1100,()=>{scene.classList.remove('guardianes-activos');gems.forEach(g=>{g.style.left='32%';g.style.top='56%';});title('La energía regresa a Aren','LOS CRISTALES VUELVEN');}],[1100,()=>{scene.classList.add('victoria');gems.forEach(g=>{g.style.left='49%';g.style.opacity='0';g.style.transform='scale(.2)';});title('Guardián de los Cinco Cristales','VICTORIA');if(embedded)steps.push([1200,()=>parent.postMessage('aren-union-final-listo',location.origin)]);}]];next();
  }
  for(const id of ['entrada','duelo','ataque','remate'])$(id).addEventListener('click',()=>start(id).catch(()=>{$('estado').textContent='No se pudieron cargar las imágenes. Recargá la prueba.';}));
  $('pausa').addEventListener('click',()=>{paused=!paused;scene.classList.toggle('pausada',paused);$('pausa').textContent=paused?'Continuar':'Pausar';$('pausa').setAttribute('aria-pressed',String(paused));if(paused){remaining=Math.max(0,due-performance.now());clearTimeout(timer);for(const a of scene.getAnimations({subtree:true}))a.pause();}else{for(const a of scene.getAnimations({subtree:true}))a.play();if(timer!==null){due=performance.now()+remaining;timer=setTimeout(resume,remaining);}}});
  start(embedded?'remate':'duelo').catch(()=>{$('estado').textContent='No se pudieron cargar las imágenes.';});
})();
