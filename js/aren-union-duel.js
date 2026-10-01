(() => {
  document.getElementById('btnProbarUnionIntegrado').addEventListener('click',()=>{if(!modoPruebasActivo||!herramientasAutorDisponibles)return;ladoGanadorCinematicaVersus='jugador';void reproducirJuicioCristalesVersus(victimaPruebaFaucesVersus.value);});
  const actor=document.getElementById('personajeVersusUno'),arena=actor.parentElement;
  const layer=document.createElement('div');layer.className='aren-union-duelo-capa';layer.hidden=true;layer.setAttribute('aria-hidden','true');
  const cape=new Image();cape.src='assets/images/trajes/aren-union-capa-v1.png';layer.append(cape);
  for(let i=0;i<5;i++){const gem=document.createElement('i');gem.style.setProperty('--i',i);gem.style.setProperty('--color',['#68e557','#ffc650','#55cfff','#c27eff','#ff6955'][i]);layer.append(gem);}
  arena.insertBefore(layer,actor);
  let follow=null;
  function update(){
    const active=modoPruebasActivo&&herramientasAutorDisponibles&&actor.getAttribute('src')?.includes('/aren-union-');
    layer.hidden=!active;if(!active){if(follow!==null)cancelAnimationFrame(follow);follow=null;return;}
    const style=getComputedStyle(actor),w=actor.offsetWidth,h=actor.offsetHeight;
    const ratio=(actor.naturalWidth||1152)/(actor.naturalHeight||1536);
    const ih=Math.min(h,w/ratio),iw=ih*ratio;
    // The image is contained and bottom aligned; attach at its shoulder pixels.
    const shoulderX=(w-iw)/2+iw*.56,shoulderY=h-ih+ih*.31;
    const ch=ih*.52,cw=ch*1.5;
    layer.style.left=actor.offsetLeft+'px';layer.style.top=actor.offsetTop+'px';layer.style.width=w+'px';layer.style.height=h+'px';
    layer.style.transform=style.transform;layer.style.translate=style.translate;layer.style.rotate=style.rotate;layer.style.scale=style.scale;layer.style.opacity=style.opacity;
    cape.style.width=cw+'px';cape.style.height=ch+'px';cape.style.left=(shoulderX-cw*.87)+'px';cape.style.top=(shoulderY-ch*.24)+'px';
    layer.classList.toggle('invocando',actor.classList.contains('entrada-union'));
    if(follow===null)follow=requestAnimationFrame(tick);
  }
  function tick(){follow=null;update();}
  new MutationObserver(update).observe(actor,{attributes:true,attributeFilter:['src','class','style']});
  new ResizeObserver(update).observe(arena);
  window.addEventListener('costume-equipped',update);actor.addEventListener('load',update);
})();
