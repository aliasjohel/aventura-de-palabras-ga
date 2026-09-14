/* Consecuencias de los errores de palabras: viento, hielo y una jaula de llamas. */
(() => {
  const actor = document.getElementById('personajeImagen');
  const scene = actor.parentElement;
  const layer = document.createElement('div');
  layer.className = 'peligro-palabras'; layer.hidden = true;
  layer.setAttribute('aria-hidden', 'true');
  scene.append(layer);
  const poses = {
    pensando: [1536,1024,558,78,930,841],
    nervioso: [1024,1536,210,156,735,1369], feliz: [1536,1024,568,71,904,757],
    preocupado: [1536,1024,558,43,928,839], acierto: [1024,1536,227,208,728,1151],
    desanimado: [1024,1536,290,243,773,1082], triste: [1536,1024,560,91,1041,841],
    celebrando: [1536,1024,489,56,1033,928],
  };
  const messages = {
    2: ['', 'El viento empieza a girar alrededor de Aren.', 'Las ráfagas rodean sus botas.', 'El remolino se enrosca en sus piernas.', 'Aren apenas puede moverse contra el viento.', '¡El torbellino está por envolverlo!', 'El torbellino atrapó a Aren. ¡Reintentá para liberarlo!'],
    3: ['', 'La escarcha se pega a las botas de Aren.', 'El hielo empieza a sujetarle los tobillos.', 'Sus piernas quedan cubiertas de hielo.', 'El frío le alcanza la cintura. ¡Encontrá la palabra!', 'El hielo sube hasta sus hombros.', 'Aren quedó congelado. ¡Reintentá para romper el hielo!'],
    4: ['', 'Las primeras llamas brotan alrededor de Aren.', 'Un círculo de fuego rodea sus botas.', 'Las llamas se elevan a un lado de Aren.', 'El fuego levanta las paredes de la jaula.', 'Las llamas se curvan sobre su cabeza. ¡Encontrá la palabra!', 'La jaula de fuego se cerró alrededor de Aren. ¡Reintentá para liberarlo!'],
  };
  const group = (body, i) => `<g class="peligro-etapa" data-etapa="${i+1}">${body}</g>`;
  const wind = Array.from({length:6}, (_, i) => {
    const y = 177-i*27, rx=30+i*7;
    const dust = Array.from({length:14}, (_, n) => {
      const angle = n * Math.PI * 2 / 14;
      const x = 80 + Math.cos(angle) * rx, py = y + Math.sin(angle) * (9+i*2);
      return `<g class="viento-polvo" style="--orbita-x:${80-x}px;--orbita-y:${y-py}px;--demora:${-n*.19-i*.23}s;--duracion:${1.8+i*.16}s"><circle cx="${x}" cy="${py}" r="${.7+n%3*.4}"/>${n%4===0?`<path class="viento-fragmento" d="M${x+3} ${py-2} l4 -1 -1 3 -3 1Z"/>`:''}</g>`;
    }).join('');
    return group(`<ellipse class="viento-sombra" cx="80" cy="${y}" rx="${rx}" ry="${8+i*2}"/><path class="viento-cinta" d="M${80-rx} ${y} C${70-rx} ${y-18} ${90+rx} ${y-20} ${80+rx} ${y} C${70+rx} ${y+17} ${90-rx} ${y+13} ${84-rx} ${y+5}"/><path class="viento-destello" d="M${85-rx} ${y+4} Q80 ${y+19} ${78+rx} ${y-3}"/><path class="viento-particula" d="M${42+i*9} ${y-10} l9 -3 m-18 10 l5 -2"/>${dust}`, i);
  }).join('');
  const ice = [
    'M32 186 L41 159 L53 167 L67 155 L79 170 L91 153 L103 163 L119 157 L129 186Z',
    'M36 173 L39 138 L53 126 L67 143 L83 123 L99 137 L117 128 L125 170Z',
    'M37 146 L32 106 L50 91 L66 109 L82 92 L102 102 L125 91 L128 146Z',
    'M33 115 L31 77 L46 65 L65 78 L84 65 L103 74 L123 65 L131 114Z',
    'M30 86 L34 48 L51 36 L65 50 L84 37 L102 42 L124 32 L132 85Z',
    'M33 57 L39 24 L60 12 L86 18 L106 9 L124 26 L132 58Z',
  ].map((d,i)=>group(`<path class="hielo-bloque" d="${d}"/><path class="hielo-grieta" d="M${48+i*2} ${177-i*28} l12 -12 -5 -10 m5 10 19 -3 M${104-i*2} ${174-i*28} l-9 -11 5 -11"/>`,i)).join('');
  // Seis capas acumulativas: brasas, base, paredes, techo y cierre frontal.
  function flame(x, bottom, top, width = 9, delay = 0) {
    const height = bottom - top;
    return `<g class="jaula-llama" style="--demora:${delay}s"><path class="jaula-fuego-exterior" d="M${x-width} ${bottom} C${x-width*2} ${bottom-height*.3} ${x+width} ${top+height*.4} ${x} ${top} C${x+width*2} ${top+height*.25} ${x+width*.3} ${bottom-height*.3} ${x+width} ${bottom}Z"/><path class="jaula-fuego-nucleo" d="M${x-width*.35} ${bottom} Q${x-width} ${bottom-height*.3} ${x+width*.2} ${top+height*.35} Q${x+width} ${bottom-height*.2} ${x+width*.35} ${bottom}Z"/></g>`;
  }
  const embers = Array.from({length:18},(_,i)=>`<circle class="jaula-brasa" cx="${24+(i*37)%113}" cy="${173+(i%4)*5}" r="${.65+(i%3)*.35}" style="--demora:${-i*.21}s;--deriva:${i%2?8:-8}px"/>`).join('');
  const fire = `<defs><linearGradient id="jaula-fuego-gradiente" x1="0" y1="1" x2="0" y2="0"><stop stop-color="#ff4209"/><stop offset=".55" stop-color="#ff9c16"/><stop offset="1" stop-color="#ffde64"/></linearGradient></defs>` + [
    `<ellipse class="jaula-resplandor" cx="80" cy="185" rx="63" ry="12"/>${[30,52,79,106,130].map((x,i)=>flame(x,190,170-i%2*9,5,-i*.3)).join('')}${embers}`,
    `<ellipse class="jaula-aro" cx="80" cy="183" rx="63" ry="15"/>${[20,41,65,91,117,139].map((x,i)=>flame(x,188,151+i%2*9,6,-i*.23)).join('')}`,
    flame(23,178,46,7,-.4)+flame(39,183,64,6,-.8)+[75,109,143].map((y,i)=>flame(19,y,y-24,5,-i*.4)).join(''),
    flame(137,178,46,7,-.6)+flame(121,183,64,6,-.2)+[75,109,143].map((y,i)=>flame(141,y,y-24,5,-i*.4)).join(''),
    `<path class="jaula-boveda" d="M23 64 Q23 18 66 14 M137 64 Q137 18 94 14"/>${flame(48,46,17,5,-.7)}${flame(112,46,17,5,-.3)}`,
    `<path class="jaula-boveda jaula-cierre" d="M22 79 Q18 13 80 11 Q142 13 138 79 M65 15 Q80 3 95 15"/>${[54,80,106].map((x,i)=>flame(x,22,2+i%2*4,5,-i*.3)).join(' ')}${flame(58,192,26,4,-.5)}${flame(102,192,26,4,-.9)}<ellipse class="jaula-aro" cx="80" cy="187" rx="62" ry="13"/>`,
  ].map(group).join('');
  const art = {2:wind,3:ice,4:fire};
  let world = -1, stage = 0, frame = 0;
  function align() {
    if (layer.hidden) return;
    const r=actor.getBoundingClientRect(), s=scene.getBoundingClientRect();
    const pose=poses[actor.getAttribute('src')?.match(/explorador-([a-z]+)\.png/)?.[1]];
    if (!pose) { layer.style.visibility='hidden'; return; }
    layer.style.visibility='';
    const [w,h,x0,y0,x1,y1]=pose, fit=Math.min(r.width/w,r.height/h);
    const center=r.left+(r.width-w*fit)/2+(x0+x1)*fit/2;
    const feet=r.bottom-(h-y1)*fit;
    const height=(y1-y0)*fit*1.16, width=height*.8;
    layer.style.width=width+'px'; layer.style.height=height+'px';
    layer.style.left=(center-s.left-scene.clientLeft-width/2)+'px';
    layer.style.top=(feet-s.top-scene.clientTop-height*.93)+'px';
  }
  function followReaction() {
    cancelAnimationFrame(frame); align();
    if (layer.hidden || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const end=performance.now()+700;
    const tick=()=>{align(); if(performance.now()<end && !layer.hidden) frame=requestAnimationFrame(tick);};
    frame=requestAnimationFrame(tick);
  }
  new ResizeObserver(align).observe(scene);
  new MutationObserver(followReaction).observe(actor,{attributes:true,attributeFilter:['src','class']});
  actor.addEventListener('load',align);
  window.WorldWordHazards = {
    update(nextWorld, mission, lives) {
      const enabled=nextWorld>=2 && nextWorld<=4 && mission>=0 && mission<10;
      if (enabled && (world!==nextWorld || !layer.firstChild)) {
        layer.innerHTML=`<svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg">${art[nextWorld]}</svg>`;
      }
      world=nextWorld; stage=enabled?Math.max(0,Math.min(6,6-lives)):0;
      layer.hidden=!stage; layer.dataset.world=String(world); layer.dataset.stage=String(stage);
      layer.classList.remove('liberando');
      layer.querySelectorAll('.peligro-etapa').forEach(g=>g.classList.toggle('activa',Number(g.dataset.etapa)<=stage));
      followReaction();
    },
    release() { if(stage) layer.classList.add('liberando'); },
    message() { return stage ? messages[world]?.[stage] || '' : ''; },
  };
})();
