(() => {
  document.getElementById('btnProbarUnionIntegrado').addEventListener('click',()=>{if(!modoPruebasActivo||!herramientasAutorDisponibles)return;ladoGanadorCinematicaVersus='jugador';void reproducirJuicioCristalesVersus(victimaPruebaFaucesVersus.value);});
  const actor=document.getElementById('personajeVersusUno'),arena=actor.parentElement;
  const layer=document.createElement('div');layer.className='aren-union-duelo-capa';layer.hidden=true;layer.setAttribute('aria-hidden','true');
  const cape=new Image();cape.src='assets/images/trajes/aren-union-capa-v1.png';layer.append(cape);
  for(let i=0;i<5;i++){const gem=document.createElement('i');gem.style.setProperty('--i',i);gem.style.setProperty('--color',['#68e557','#ffc650','#55cfff','#c27eff','#ff6955'][i]);layer.append(gem);}
  arena.insertBefore(layer,actor);
  function update(){
    const active=modoPruebasActivo&&herramientasAutorDisponibles&&actor.getAttribute('src')?.includes('/aren-union-');
    layer.hidden=!active;if(!active)return;
    const style=getComputedStyle(actor);layer.style.left=actor.offsetLeft+'px';layer.style.top=actor.offsetTop+'px';layer.style.width=actor.offsetWidth+'px';layer.style.height=actor.offsetHeight+'px';layer.style.transform=style.transform;
    layer.classList.toggle('invocando',actor.classList.contains('entrada-union'));
  }
  new MutationObserver(update).observe(actor,{attributes:true,attributeFilter:['src','class','style']});
  new ResizeObserver(update).observe(arena);
  window.addEventListener('costume-equipped',update);actor.addEventListener('load',update);
})();
