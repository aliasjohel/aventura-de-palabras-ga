/* Consecuencias de los errores de palabras: viento, hielo y cadenas. */
(() => {
  const actor = document.getElementById('personajeImagen');
  const scene = actor.parentElement;
  const layer = document.createElement('div');
  layer.className = 'peligro-palabras'; layer.hidden = true;
  layer.setAttribute('aria-hidden', 'true');
  scene.append(layer);
  const poses = {
    nervioso: [1024,1536,210,156,735,1369], feliz: [1536,1024,568,71,904,757],
    preocupado: [1536,1024,558,43,928,839], acierto: [1024,1536,227,208,728,1151],
    desanimado: [1024,1536,290,243,773,1082], triste: [1536,1024,560,91,1041,841],
    celebrando: [1536,1024,489,56,1033,928],
  };
  const messages = {
    2: ['', 'El viento empieza a girar alrededor de Aren.', 'Las ráfagas rodean sus botas.', 'El remolino se enrosca en sus piernas.', 'Aren apenas puede moverse contra el viento.', '¡El torbellino está por envolverlo!', 'El torbellino atrapó a Aren. ¡Reintentá para liberarlo!'],
    3: ['', 'La escarcha se pega a las botas de Aren.', 'El hielo empieza a sujetarle los tobillos.', 'Sus piernas quedan cubiertas de hielo.', 'El frío le alcanza la cintura. ¡Encontrá la palabra!', 'El hielo sube hasta sus hombros.', 'Aren quedó congelado. ¡Reintentá para romper el hielo!'],
    4: ['', 'Una cadena oscura emerge del suelo.', 'Las cadenas rodean sus tobillos.', 'Otra cadena le sujeta una muñeca.', 'Las cadenas se cruzan frente a Aren.', 'Un sello oscuro empieza a cerrarse.', 'Las cadenas atraparon a Aren. ¡Reintentá para romper el sello!'],
  };
  const group = (body, i) => `<g class="peligro-etapa" data-etapa="${i+1}">${body}</g>`;
  const wind = Array.from({length:6}, (_, i) => {
    const y = 177-i*27, rx=30+i*7;
    return group(`<ellipse class="viento-sombra" cx="80" cy="${y}" rx="${rx}" ry="${8+i*2}"/><path class="viento-cinta" d="M${80-rx} ${y} C${70-rx} ${y-18} ${90+rx} ${y-20} ${80+rx} ${y} C${70+rx} ${y+17} ${90-rx} ${y+13} ${84-rx} ${y+5}"/><path class="viento-destello" d="M${85-rx} ${y+4} Q80 ${y+19} ${78+rx} ${y-3}"/><path class="viento-particula" d="M${42+i*9} ${y-10} l9 -3 m-18 10 l5 -2"/>`, i);
  }).join('');
  const ice = [
    'M32 186 L41 159 L53 167 L67 155 L79 170 L91 153 L103 163 L119 157 L129 186Z',
    'M36 173 L39 138 L53 126 L67 143 L83 123 L99 137 L117 128 L125 170Z',
    'M37 146 L32 106 L50 91 L66 109 L82 92 L102 102 L125 91 L128 146Z',
    'M33 115 L31 77 L46 65 L65 78 L84 65 L103 74 L123 65 L131 114Z',
    'M30 86 L34 48 L51 36 L65 50 L84 37 L102 42 L124 32 L132 85Z',
    'M33 57 L39 24 L60 12 L86 18 L106 9 L124 26 L132 58Z',
  ].map((d,i)=>group(`<path class="hielo-bloque" d="${d}"/><path class="hielo-grieta" d="M${48+i*2} ${177-i*28} l12 -12 -5 -10 m5 10 19 -3 M${104-i*2} ${174-i*28} l-9 -11 5 -11"/>`,i)).join('');
  function chain(x1,y1,x2,y2) {
    const length=Math.hypot(x2-x1,y2-y1), angle=Math.atan2(y2-y1,x2-x1)*180/Math.PI;
    return `<g transform="translate(${x1} ${y1}) rotate(${angle})">${Array.from({length:Math.ceil(length/9)},(_,i)=>`<rect class="cadena-eslabon" x="${i*9}" y="${i%2?-2.3:-4}" width="13" height="${i%2?4.6:8}" rx="4"/>`).join('')}</g>`;
  }
  const chains = [chain(12,190,62,159), chain(146,190,96,155), chain(12,130,112,81), chain(147,126,48,78), chain(32,112,124,112), '<path class="sello-oscuro" d="M64 110 V97 A16 16 0 0 1 96 97 V110 M57 109 H103 V145 L80 155 57 145Z"/><path class="sello-runa" d="M80 118 L89 131 80 143 71 131Z"/>'].map(group).join('');
  const art = {2:wind,3:ice,4:chains};
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
