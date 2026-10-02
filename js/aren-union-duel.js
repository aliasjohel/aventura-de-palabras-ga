(() => {
  document.getElementById('btnProbarUnionIntegrado').addEventListener('click',()=>{if(!modoPruebasActivo||!herramientasAutorDisponibles)return;ladoGanadorCinematicaVersus='jugador';void reproducirJuicioCristalesVersus(victimaPruebaFaucesVersus.value);});
  function prepararCapaUnion(actor){
  const arena=actor.parentElement;
  const layer=document.createElement('div');layer.className='aren-union-duelo-capa';layer.hidden=true;layer.setAttribute('aria-hidden','true');
  const cape=new Image();cape.src='assets/images/trajes/aren-union-capa-v1.png';layer.append(cape);
  const gems=Array.from({length:5},(_,i)=>{
    const gem=new Image();gem.src='assets/images/elements/cristal-sabiduria-esmeralda.png';
    gem.className='aren-union-cristal-entrada';gem.hidden=true;gem.alt='';gem.setAttribute('aria-hidden','true');
    gem.style.setProperty('--tono',i*65+'deg');arena.append(gem);return gem;
  });
  let entranceStart=null;
  arena.insertBefore(layer,actor);
  let follow=null;
  function update(){
    const active=actor.getAttribute('src')?.includes('/aren-union-');
    layer.hidden=!active;if(!active){gems.forEach(gem=>gem.hidden=true);entranceStart=null;if(follow!==null)cancelAnimationFrame(follow);follow=null;return;}
    const style=getComputedStyle(actor),w=actor.offsetWidth,h=actor.offsetHeight;
    const ratio=(actor.naturalWidth||1152)/(actor.naturalHeight||1536);
    const ih=Math.min(h,w/ratio),iw=ih*ratio;
    // The image is contained and bottom aligned; attach at its shoulder pixels.
    const shoulderX=(w-iw)/2+iw*.56,shoulderY=h-ih+ih*.31;
    const ch=ih*.52,cw=ch*1.5;
    layer.style.left=actor.offsetLeft+'px';layer.style.top=actor.offsetTop+'px';layer.style.width=w+'px';layer.style.height=h+'px';
    layer.style.transform=style.transform;layer.style.translate=style.translate;layer.style.rotate=style.rotate;layer.style.scale=style.scale;layer.style.opacity=style.opacity;
    cape.style.width=cw+'px';cape.style.height=ch+'px';cape.style.left=(shoulderX-cw*.87)+'px';cape.style.top=(shoulderY-ch*.24)+'px';
    const entering=actor.classList.contains('entrada-union');
    layer.classList.toggle('invocando',entering);
    if(entering&&entranceStart===null)entranceStart=performance.now();
    if(!entering)entranceStart=null;
    const elapsed=entering?performance.now()-entranceStart:0;
    const progress=Math.min(1,elapsed/2180),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    gems.forEach((gem,i)=>{
      gem.hidden=!entering||reduced;if(gem.hidden)return;
      const angle=i*Math.PI*2/5+elapsed/1100*Math.PI*2;
      const depth=Math.sin(angle),size=1+depth*.2,gw=iw*.09*size,gh=ih*.12*size;
      const cx=(w-iw)/2+iw*.52,cy=h-ih+ih*(.78-progress*.28);
      gem.style.width=gw+'px';gem.style.height=gh+'px';
      gem.style.left=(actor.offsetLeft+cx+Math.cos(angle)*iw*.48-gw/2)+'px';
      gem.style.top=(actor.offsetTop+cy+depth*ih*.15-gh/2)+'px';
      gem.style.zIndex=depth>=0?'4':'1';
      gem.style.opacity=Math.min(1,elapsed/180,(2180-elapsed)/260)*(depth>=0?1:.65);
    });
    if(follow===null)follow=requestAnimationFrame(tick);
  }
  function tick(){follow=null;update();}
  new MutationObserver(update).observe(actor,{attributes:true,attributeFilter:['src','class','style']});
  new ResizeObserver(update).observe(arena);
  window.addEventListener('costume-equipped',update);actor.addEventListener('load',update);
  }
  prepararCapaUnion(document.getElementById('personajeVersusUno'));
  prepararCapaUnion(document.getElementById('personajeVersusDos'));
})();
