/* Arenas encantadas: una etapa por corazón perdido en el Desierto Perdido. */
(() => {
  const actor = document.getElementById('personajeImagen');
  const scene = actor.parentElement;
  const sand = document.createElement('div');
  sand.className = 'trampa-arena';
  sand.hidden = true;
  sand.setAttribute('aria-hidden', 'true');
  sand.innerHTML = `<img class="arena-brazo" src="assets/images/personajes/explorador-brazo-arena-v1.png" alt=""><svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="arenaDuna" x2="0" y2="1"><stop stop-color="#f8dc87"/><stop offset=".4" stop-color="#dca64e"/><stop offset="1" stop-color="#a26930"/></linearGradient>
      <radialGradient id="arenaRemolino"><stop stop-color="#62401f"/><stop offset=".65" stop-color="#b67f3c"/><stop offset="1" stop-color="#e3b961" stop-opacity="0"/></radialGradient>
    </defs>
    <ellipse cx="100" cy="85" rx="95" ry="14" fill="url(#arenaRemolino)"/>
    <g class="arena-monticulo">
      <path d="M4 86 Q26 80 39 69 Q51 52 70 44 Q85 34 101 39 Q120 29 143 53 Q158 71 195 86 Q102 107 4 86" fill="url(#arenaDuna)"/>
      <path d="M40 69 Q68 65 86 53 M110 45 Q133 44 147 64 M25 84 Q75 96 113 83 T178 85" fill="none" stroke="#ffe4a0" stroke-width="2" opacity=".7"/>
      <path d="M50 80 Q80 87 98 75 M116 66 Q134 70 148 77" fill="none" stroke="#aa7238" stroke-width="2" opacity=".55"/>
      ${Array.from({length:18},(_,i)=>`<circle cx="${35+(i*37)%130}" cy="${65+(i*11)%22}" r="${i%3===0?1.3:.7}" fill="${i%2?'#f9d888':'#9b692d'}"/>`).join('')}
    </g>
    <g class="arena-rafaga" fill="none" stroke="#ffe2a0" stroke-linecap="round"><path d="M28 80 Q53 67 83 77 T171 76"/><path d="M43 90 Q111 98 160 85"/></g>
  </svg>`;
  scene.append(sand);
  const messages = ['', 'La arena comienza a girar bajo sus botas.', 'La arena le cubre los tobillos.', 'Aren se hunde hasta las rodillas.', 'La arena sigue subiendo. ¡Encontrá la palabra!', '¡Cuidado! Aren está quedando atrapado.', '¡La arena atrapó a Aren! Levanta la mano para pedir ayuda. Reintentá para liberarlo.'];
  let enabled = false, stage = 0, released = false;
  // Límites visibles (alfa > 128) de los PNG originales. Alineamos el dibujo,
  // no el lienzo transparente: todas las expresiones apoyan en el mismo suelo.
  const poses = {
    nervioso: [1024,1536,210,156,735,1369],
    feliz: [1536,1024,568,71,904,757],
    preocupado: [1536,1024,558,43,928,839],
    acierto: [1024,1536,227,208,728,1151],
    desanimado: [1024,1536,290,243,773,1082],
    triste: [1536,1024,560,91,1041,841],
    celebrando: [1536,1024,489,56,1033,928],
  };
  function align() {
    if (!enabled) return;
    const style = getComputedStyle(actor);
    const width = actor.offsetWidth;
    const state = actor.getAttribute('src')?.match(/explorador-([a-z]+)\.png/)?.[1];
    const pose = poses[state];
    if (pose) {
      const [w,h,x0,y0,x1,y1] = pose;
      const fit = Math.min(width / w, actor.offsetHeight / h);
      const scale = (width * (1213 / 2304)) / (fit * (y1 - y0));
      actor.style.setProperty('--arena-pose-escala', String(scale));
      actor.style.setProperty('--arena-pose-x', `${-scale * fit * ((x0+x1)/2-w/2)}px`);
      actor.style.setProperty('--arena-pose-y', `${scale * fit * (h-y1)-width*(167/2304)}px`);
    }
    if (sand.hidden) return;
    sand.style.left = `${actor.offsetLeft}px`;
    sand.style.width = `${width}px`;
    sand.style.height = `${width * .5}px`;
    sand.style.bottom = `${parseFloat(style.bottom) + width * .045}px`;
    actor.style.setProperty('--hundimiento-arena', `${released ? 0 : stage * width * .012}px`);
  }
  new ResizeObserver(align).observe(scene);
  new MutationObserver(align).observe(actor, {attributes:true, attributeFilter:['class','src']});
  window.DesertSandTrap = {
    update(world, mission, lives) {
      enabled = world === 1 && mission >= 0 && mission < 10;
      stage = enabled ? Math.max(0, Math.min(6, 6 - lives)) : 0;
      released = false;
      sand.hidden = !enabled || stage === 0;
      sand.dataset.stage = String(stage);
      sand.classList.remove('liberando');
      sand.style.setProperty('--altura-arena', String([0,.14,.3,.5,.7,.9,1.5][stage]));
      scene.classList.toggle('arena-poses-fijas', enabled);
      scene.classList.toggle('arena-captura-final', enabled && stage === 6);
      scene.classList.toggle('arena-atrapando', enabled && stage > 0);
      if (!enabled || !stage) actor.style.removeProperty('--hundimiento-arena');
      sand.classList.remove('arena-error');
      void sand.offsetWidth;
      if (stage) sand.classList.add('arena-error');
      align();
    },
    release() {
      if (!enabled || !stage) return;
      released = true;
      sand.classList.add('liberando');
      actor.style.setProperty('--hundimiento-arena', '0px');
    },
    message() { return enabled ? messages[stage] : ''; },
  };
})();
