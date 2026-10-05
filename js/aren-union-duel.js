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
    const capeIncluded=/aren-union-(disparo-v2|ataque-rayo-v2|ataque-v1|concepto-v1)\.png$/.test(actor.getAttribute('src')||'');
    layer.hidden=!active||capeIncluded||actor.hasAttribute('data-cambiando-pose');if(!active){gems.forEach(gem=>gem.hidden=true);entranceStart=null;if(follow!==null)cancelAnimationFrame(follow);follow=null;return;}
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
  new MutationObserver(update).observe(actor,{attributes:true,attributeFilter:['src','class','style','data-cambiando-pose']});
  new ResizeObserver(update).observe(arena);
  window.addEventListener('costume-equipped',update);actor.addEventListener('load',update);
  }
  prepararCapaUnion(document.getElementById('personajeVersusUno'));
  prepararCapaUnion(document.getElementById('personajeVersusDos'));

  // Follow actual key bounds so the current also fits the rival preview and mobile layout.
  function prepararCorrienteUnion(keyboard,selector){
    const ns='http://www.w3.org/2000/svg';
    let layer=null,frame=null,keys=[],bounds=[],lastPaint=0,started=0,active=false;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    function clear(){
      if(frame!==null)cancelAnimationFrame(frame);frame=null;
      layer?.remove();layer=null;
      keys.forEach(key=>key.classList.remove('union-tecla-cargada'));keys=[];bounds=[];
    }
    function measure(){
      const box=keyboard.getBoundingClientRect();
      keys.forEach(key=>key.classList.remove('union-tecla-cargada'));
      keys=[...keyboard.querySelectorAll(selector)].filter(key=>{const r=key.getBoundingClientRect();return r.width>0&&r.height>0;});
      bounds=keys.map(key=>{const r=key.getBoundingClientRect();return {x:r.left-box.left,y:r.top-box.top,w:r.width,h:r.height};});
      if(layer){layer.setAttribute('viewBox',`0 0 ${box.width} ${box.height}`);layer.style.width=box.width+'px';layer.style.height=box.height+'px';}
    }
    function path(points,kind){
      const el=document.createElementNS(ns,'path');el.setAttribute('class',kind);
      el.setAttribute('d',points.map(([x,y],i)=>`${i?'L':'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' '));layer.append(el);
    }
    function lightning(a,b,seed){
      const dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy)||1;
      const count=Math.max(4,Math.ceil(length/9));const points=[a];
      for(let i=1;i<count;i++){const t=i/count,jitter=Math.sin(i*12.7+seed*9.1)*Math.min(6,length*.15);points.push([a[0]+dx*t-dy/length*jitter,a[1]+dy*t+dx/length*jitter]);}
      points.push(b);return points;
    }
    function paint(time){
      if(!layer||!bounds.length)return;
      layer.replaceChildren();keys.forEach(key=>key.classList.remove('union-tecla-cargada'));
      const hop=reduced.matches?3:Math.floor((time-started)/95);
      for(let n=0;n<3;n++){
        const index=(hop+n*Math.ceil(bounds.length/3))%bounds.length;
        const a=bounds[index],b=bounds[(index+1)%bounds.length];
        keys[index].classList.add('union-tecla-cargada');
        const points=lightning([a.x+a.w*.18,a.y+a.h*.14],[a.x+a.w*.9,a.y+a.h*.14],hop+n);
        points.push(...lightning(points[points.length-1],[a.x+a.w*.9,a.y+a.h*.82],hop+n+1).slice(1));
        // Branch into the next key; wrap between rows along the spaces surrounding them.
        const next=[b.x+b.w*.15,b.y+b.h*.22];
        if(Math.abs(a.y-b.y)>a.h*.5){
          const corridor=a.y+a.h+Math.max(2,(b.y-a.y-a.h)/2);
          points.push(...lightning(points[points.length-1],[a.x+a.w*.9,corridor],hop+2).slice(1));
          points.push(...lightning(points[points.length-1],[next[0],corridor],hop+3).slice(1));
        }
        points.push(...lightning(points[points.length-1],next,hop+n+4).slice(1));
        path(points,'union-corriente-halo');path(points,'union-corriente-nucleo');
        const spark=[next,[next[0]+4,next[1]-7],[next[0]+1,next[1]-3],[next[0]+8,next[1]-5]];
        path(spark,'union-corriente-chispa');
      }
    }
    function tick(time){frame=null;if(!active)return;if(time-lastPaint>=75){paint(time);lastPaint=time;}frame=requestAnimationFrame(tick);}
    function sync(){
      const enabled=keyboard.classList.contains('efecto-descarga-union');
      if(enabled===active)return;active=enabled;clear();
      if(!active)return;
      layer=document.createElementNS(ns,'svg');layer.classList.add('union-corriente');layer.setAttribute('aria-hidden','true');layer.setAttribute('focusable','false');keyboard.append(layer);
      started=performance.now();lastPaint=started;measure();paint(started);
      if(!reduced.matches)frame=requestAnimationFrame(tick);
    }
    new MutationObserver(changes=>{
      if(active&&keyboard.classList.contains('efecto-descarga-union')&&changes.some(change=>change.type==='childList')){
        if(layer?.isConnected){measure();paint(performance.now());return;}
        active=false;
      }
      sync();
    }).observe(keyboard,{attributes:true,attributeFilter:['class'],childList:true});
    new ResizeObserver(()=>{if(active){measure();paint(performance.now());}}).observe(keyboard);
    reduced.addEventListener('change',()=>{if(frame!==null)cancelAnimationFrame(frame);frame=null;if(active){paint(performance.now());if(!reduced.matches)frame=requestAnimationFrame(tick);}});
    sync();
  }
  prepararCorrienteUnion(document.getElementById('tecladoVersus'),'button');
  prepararCorrienteUnion(document.getElementById('miniTecladoRivalVersus'),'i');
})();
