(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.AzrakWorld = api;
})(typeof globalThis === 'object' ? globalThis : this, () => {
  'use strict';
  const base = 'assets/images/fondos/reino-azrak/';
  const sprites = 'assets/images/personajes/versus/';
  const missions = [
    ['La puerta de ceniza', 'entrada', 'Los cuatro cristales llevan a Aren al reino de Azrak. Tras él, la grieta se cierra. Una brasa verde entre las rocas le recuerda que todavía hay vida que proteger.'],
    ['El puente de las runas', 'entrada', 'El puente se desarma sobre el abismo. Sus runas muestran un camino por unos instantes: Aren deberá recordar el orden para reconstruir cada tramo.', 'runas-azrak'],
    ['La sombra del centinela', 'entrada', 'Shadow, el centinela de Azrak, observa desde una torre. Podría derrumbar el sendero, pero aparta la mirada. «Volvé mientras puedas», murmura antes de desaparecer.'],
    ['La forja de los nombres', 'forja', 'La fortaleza se alimenta de palabras arrancadas a los cuatro mundos. Aren recupera los nombres que la forja había borrado. Entre ellos descubre el de Lume, guardiana del último cristal, a quien Azrak encerró en la Cámara del Eclipse.'],
    ['Los cuatro juramentos', 'forja', 'Los guardianes responden a los cristales. Para abrirles un camino, Aren debe devolver cada símbolo a su sello: bosque, desierto, cielo e invierno.', 'sellos-azrak'],
    ['Una orden imposible', 'forja', 'Azrak ordena a Shadow destruir el puente, aunque sus propios centinelas sigan cruzándolo. Shadow vacila. Aren comprende que bajo esa armadura todavía queda una voluntad propia.'],
    ['Luz entre las sombras', 'forja', 'Una voz llega desde la luz cautiva: «Soy Lume, guardiana del Cristal de la Unión. Azrak me encerró aquí y debilitó mi cristal con el Quinto Sello». Para liberarla, Aren debe apagar la red de sombras: cada sello cambia también a sus vecinos.', 'eclipse-azrak'],
    ['El camino de los guardianes', 'entrada', 'Lume conserva el quinto cristal, aunque Azrak debilitó su luz. «Con cada palabra que recuperes podré encender un portal y llamar a los guardianes». Cuatro palabras despertarán los caminos del bosque, el desierto, el cielo y el invierno.'],
    ['Antes del último umbral', 'trono', 'Aren avanza solo hacia el trono. Lume se queda con el quinto cristal, sosteniendo los cuatro portales para traer a los guardianes. Shadow espera en la puerta. «Le juré lealtad», dice. Aren responde: «Todavía podés elegir a quién proteger».'],
    ['La última palabra', 'trono', 'Shadow desenvaina frente al trono de Azrak. Primero habrá que vencer al centinela. Detrás de él espera quien encadenó a los cuatro mundos.'],
  ].map(([title, background, text, puzzle], index) => ({
    capitulo: `Misión ${index + 1}`, titulo: title, texto: text,
    fondos: [`reino-azrak/${[
      'entrada', 'puente-runas', 'torre-centinela', 'forja', 'sala-juramentos',
      'balcon-orden', 'camara-eclipse', 'sendero-guardianes-apagado', 'ultimo-umbral', 'trono',
    ][index]}-v1.png`], puzzle: puzzle || '',
  }));
  const words = [
    ['CENIZA', 'Polvo que queda después del fuego.'], ['PUENTE', 'Une dos orillas sobre un río o un abismo.'],
    ['SOMBRA', 'Aparece donde un objeto impide que llegue la luz.'], ['FORJA', 'Lugar donde se trabaja el metal con calor.'],
    ['UNION', 'Lo que logramos cuando decidimos trabajar juntos.'], ['LEALTAD', 'Compromiso de no abandonar a quienes confiaron en vos.'],
    ['LUZ', 'Nos permite ver y aleja la oscuridad.'], ['VALOR', 'Nos ayuda a actuar aunque sintamos miedo.'],
    ['ESPERANZA', 'Confianza en que el futuro puede ser mejor.'], ['LIBERTAD', 'Poder elegir el propio camino.'],
  ].map(([palabra, pista]) => ({ palabra, pista }));
  const symbols = ['🌿', '☀️', '☁️', '❄️'];
  function mountScene(container, mission, completed = 0) {
    container.querySelectorAll('.vida-azrak').forEach(element => element.remove());
    container.dataset.misionAzrak = mission < 0 ? '' : String(mission + 1);
    if (mission < 0) return;
    const layer = document.createElement('div');
    layer.className = 'vida-azrak';
    const addImage = (parent, src, className, alt = '') => {
      const img = document.createElement('img');
      img.src = src; img.className = className; img.alt = alt;
      parent.append(img); return img;
    };
    if (mission === 7) mountPortals(layer, completed);
    if ([6, 7].includes(mission)) {
      const lume = document.createElement('figure');
      lume.className = `lume-azrak ${mission === 6 ? 'lume-cautiva' : 'lume-libre'}`;
      addImage(lume, sprites + 'guardian-alba-base.png', 'lume-figura', 'Lume, guardiana del Cristal de la Unión');
      if (mission === 7) addImage(lume, 'assets/images/elements/cristal-celeste-v1.png', 'cristal-union-lume', 'Quinto cristal');
      const label = document.createElement('figcaption');
      label.textContent = mission === 6 ? 'Lume · Atrapada en el eclipse' : 'Lume · Guardiana de la Unión';
      lume.append(label); layer.append(lume);
    }
    const creatures = { 0: ['vuelo'], 1: ['vuelo', 'vuelo'], 2: ['vuelo'], 3: ['acecho'], 4: ['acecho'], 5: ['vuelo'], 8: ['acecho'] }[mission] || [];
    creatures.forEach((type, index) => {
      const creature = document.createElement('div');
      creature.className = `demonio-azrak demonio-${type}`;
      creature.style.setProperty('--demora', `${index ? -9 : -3}s`);
      creature.style.setProperty('--altura', `${index ? 28 : 12}%`);
      creature.setAttribute('aria-hidden', 'true');
      const files = type === 'vuelo' ? ['demonio-volador-v1.png', 'demonio-volador-alas-bajas-v1.png'] : ['cancerbero-acecho-v1.png'];
      files.forEach((file, frame) => addImage(creature, 'assets/images/ambiente/reino-azrak/' + file, `demonio-cuadro cuadro-${frame}`));
      layer.append(creature);
    });
    container.append(layer);
  }
  const portalNames = ['Bosque', 'Desierto', 'Cielo', 'Invierno'];
  const portalShapes = [[285, 414, 103, 142], [595, 447, 74, 110], [1077, 459, 72, 99], [1398, 445, 74, 113]];
  function mountPortals(layer, completed) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 1672 941');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    svg.classList.add('portales-lume');
    svg.setAttribute('aria-hidden', 'true');
    const defs = document.createElementNS(ns, 'defs'); svg.append(defs);
    portalShapes.forEach(([cx, cy, rx, ry], i) => {
      const clip = document.createElementNS(ns, 'clipPath'); clip.id = `portal-lume-${i}`;
      const ellipse = document.createElementNS(ns, 'ellipse');
      for (const [key, value] of Object.entries({ cx, cy, rx, ry })) ellipse.setAttribute(key, value);
      clip.append(ellipse); defs.append(clip);
      const light = document.createElementNS(ns, 'image');
      light.setAttribute('href', base + 'sendero-guardianes-v1.png');
      light.setAttribute('width', '1672'); light.setAttribute('height', '941');
      light.setAttribute('clip-path', `url(#portal-lume-${i})`);
      light.classList.add('portal-lume');
      light.classList.toggle('encendido', i < completed);
      svg.append(light);
    });
    const beam = document.createElementNS(ns, 'path');
    beam.classList.add('rayo-lume'); svg.append(beam);
    layer.append(svg);
    const status = document.createElement('p'); status.className = 'estado-portales-lume';
    status.setAttribute('aria-live', 'polite');
    status.textContent = `Portales encendidos: ${Math.min(completed, 4)}/4`;
    layer.append(status);
  }
  async function ignitePortal(container, index, reduced = false) {
    const layer = container.querySelector('.vida-azrak');
    const portals = layer?.querySelectorAll('.portal-lume');
    if (!portals?.[index]) return;
    const lume = layer.querySelector('.lume-azrak');
    lume?.classList.add('invocando');
    const beam = layer.querySelector('.rayo-lume');
    const [x, y] = portalShapes[index];
    const svg = layer.querySelector('svg');
    const crystal = layer.querySelector('.cristal-union-lume').getBoundingClientRect();
    const point = svg.createSVGPoint();
    point.x = crystal.x + crystal.width / 2; point.y = crystal.y + crystal.height / 2;
    const start = point.matrixTransform(svg.getScreenCTM().inverse());
    beam.setAttribute('d', `M ${start.x} ${start.y} Q 880 580 ${x} ${y}`);
    beam.classList.add('activo');
    portals[index].classList.add('encendido');
    layer.querySelector('.estado-portales-lume').textContent = index === 3
      ? '«Seguí, Aren. Yo sostendré los portales hasta que lleguen los guardianes»'
      : `Lume llama al ${portalNames[index]} · ${index + 1}/4`;
    await new Promise(resolve => setTimeout(resolve, reduced ? 900 : 2300));
    if (!layer.isConnected) return;
    beam.classList.remove('activo'); lume?.classList.remove('invocando');
  }
  const paths = [[0, 2, 1, 3], [3, 0, 2, 1, 0], [1, 3, 2, 0, 3, 1]];
  function toggleLight(board, index) {
    const next = [...board];
    for (const candidate of [index, index - 3, index + 3, ...(index % 3 ? [index - 1] : []), ...(index % 3 < 2 ? [index + 1] : [])]) {
      if (candidate >= 0 && candidate < 9) next[candidate] = !next[candidate];
    }
    return next;
  }
  function initialLights() {
    return [0, 4, 8, 2].reduce(toggleLight, Array(9).fill(false));
  }
  function sealsSolved(values) { return values.every((value, index) => value === [2, 0, 3, 1][index]); }

  // Each puzzle owns its timers. Closing or restarting invalidates the old board.
  function mountPuzzle(container, type, complete) {
    let disposed = false, busy = false, round = 0, progress = 0, replay = 0;
    const timers = new Set();
    const later = (fn, delay) => {
      const id = setTimeout(() => { timers.delete(id); if (!disposed) fn(); }, delay);
      timers.add(id);
    };
    container.replaceChildren();
    container.className = 'puzzle-cumbres puzzle-azrak';
    container.setAttribute('role', 'group');
    container.setAttribute('aria-label', 'Puzzle del Reino de Azrak');
    const message = document.createElement('p');
    message.className = 'azrak-puzzle-status'; message.setAttribute('aria-live', 'polite');
    const board = document.createElement('div'); board.className = 'azrak-puzzle-board';
    container.append(message, board);
    const makeButton = (label, action, parent = board) => {
      const button = document.createElement('button'); button.type = 'button'; button.textContent = label;
      button.addEventListener('click', () => { if (!disposed && !busy) action(button); });
      parent.append(button); return button;
    };
    const finish = () => {
      if (busy || disposed) return;
      busy = true; message.textContent = '¡El camino está abierto!';
      container.querySelectorAll('button').forEach(button => { button.disabled = true; });
      later(complete, 650);
    };
    if (type === 'runas-azrak') {
      const buttons = symbols.map((symbol, index) => makeButton(symbol, () => {
        if (index !== paths[round][progress]) {
          progress = 0; message.textContent = 'Esa runa no sigue el camino. Observá la secuencia otra vez.';
          showPath(); return;
        }
        progress++;
        message.textContent = `Tramo ${round + 1}/3 · ${progress}/${paths[round].length} runas recordadas`;
        if (progress === paths[round].length) {
          round++; progress = 0;
          if (round === paths.length) finish(); else showPath();
        }
      }));
      buttons.forEach((button, index) => button.setAttribute('aria-label', `Runa ${['bosque', 'sol', 'cielo', 'hielo'][index]}`));
      const repeat = makeButton('Volver a mirar', () => { progress = 0; showPath(); }, container);
      function showPath() {
        const token = ++replay;
        busy = true; buttons.forEach(button => { button.disabled = true; }); repeat.disabled = true;
        message.textContent = `Tramo ${round + 1}/3 · Observá el orden de las runas.`;
        paths[round].forEach((index, step) => {
          later(() => { if (token === replay) buttons[index].classList.add('runa-encendida'); }, 450 + step * 900);
          later(() => { if (token === replay) buttons[index].classList.remove('runa-encendida'); }, 1050 + step * 900);
        });
        later(() => {
          if (token !== replay) return;
          busy = false; buttons.forEach(button => { button.disabled = false; }); repeat.disabled = false;
          message.textContent = `Tramo ${round + 1}/3 · Repetí el camino tocando las runas.`;
        }, 450 + paths[round].length * 900);
      }
      showPath();
    } else if (type === 'sellos-azrak') {
      const values = [0, 1, 2, 3];
      ['Norte', 'Este', 'Sur', 'Oeste'].forEach((direction, index) => {
        makeButton(`${direction}: ${symbols[values[index]]}`, button => {
          values[index] = (values[index] + 1) % symbols.length;
          button.textContent = `${direction}: ${symbols[values[index]]}`;
        });
      });
      const clues = document.createElement('p'); clues.className = 'azrak-puzzle-clues';
      clues.textContent = 'El cielo guía al norte. El bosque recibe el amanecer al este. El invierno espera al sur. El sol descansa al oeste.';
      container.prepend(clues);
      makeButton('Abrir los cuatro sellos', () => {
        if (sealsSolved(values)) finish();
        else message.textContent = 'Todavía hay símbolos fuera de lugar. Leé las cuatro pistas.';
      }, container);
      message.textContent = 'Tocá cada sello para cambiar su símbolo. Después comprobá el orden.';
    } else if (type === 'eclipse-azrak') {
      let lights = initialLights(), moves = 0;
      board.classList.add('tablero-eclipse');
      const buttons = lights.map((_, index) => makeButton('', () => {
        lights = toggleLight(lights, index); moves++; render();
        if (lights.every(value => !value)) finish();
      }));
      function render() {
        buttons.forEach((button, index) => {
          button.textContent = lights[index] ? '◆' : '◇';
          button.classList.toggle('runa-encendida', lights[index]);
          button.setAttribute('aria-label', `Sello ${index + 1}, ${lights[index] ? 'encendido' : 'apagado'}`);
          button.setAttribute('aria-pressed', String(lights[index]));
        });
        message.textContent = `Apagá los nueve sellos. Cada toque cambia ese sello y sus vecinos de arriba, abajo y los lados. Movimientos: ${moves}`;
      }
      makeButton('Mostrar una pista', () => {
        // Solve the CURRENT board, including any player moves, by enumeration.
        for (let mask = 1; mask < 512; mask++) {
          let candidate = [...lights];
          for (let i = 0; i < 9; i++) if (mask & (1 << i)) candidate = toggleLight(candidate, i);
          if (candidate.every(value => !value)) {
            const index = Math.log2(mask & -mask);
            message.textContent = `Probá el sello ${index + 1}. Después podés pedir otra pista.`;
            buttons[index].focus(); break;
          }
        }
      }, container);
      render();
    }
    return () => { disposed = true; timers.forEach(clearTimeout); timers.clear(); };
  }

  const actor = (id, file, x, y, size, motion = '') => ({ id, file, x, y, size, motion });
  const aren = (x = 17, y = 72, motion = '') => actor('aren', 'explorador-base.png', x, y, 23, motion);
  const azrak = (motion = '', file = 'azrak-base.png') => actor('azrak', file, 77, 73, 49, motion);
  const shadow = (x = 35, motion = '', file = 't-shadow-base.png') => actor('shadow', file, x, 72, 34, motion);
  const team = () => [aren(12), actor('guardiana', '../coleccion/guardiana-bosque-base.png', 26, 73, 27), actor('zafir', 'mago-base.png', 40, 73, 29), actor('nivor', 'dragon-hielo-base.png', 57, 75, 38), actor('nimbus', 'dragon-base.png', 72, 73, 23), shadow(87)];
  const betrayal = [
    { key: 'derrota-shadow', text: 'Shadow cae de rodillas. Aren baja su arma: «No tenés que seguir obedeciéndolo».', actors: [aren(), shadow(48, 'arrodillado', 't-shadow-impacto.png'), azrak()] },
    { key: 'traicion', text: '«Ya no me servís», sentencia Azrak. Una descarga alcanza a Shadow y abre una grieta bajo sus pies.', actors: [aren(), shadow(45, 'desvanecer', 't-shadow-impacto.png'), azrak('', 'azrak-ataque.png')], effect: 'traicion' },
    { key: 'ausencia', text: 'La grieta se cierra entre humo violeta. No queda rastro de Shadow. Aren se interpone: «Se terminó, Azrak».', actors: [aren(25), azrak()], effect: 'bruma' },
  ];
  const finale = [
    { key: 'resiste', text: 'El duelo está ganado, pero Azrak absorbe la energía del trono. Los guardianes atraviesan el portal: esta vez, Aren no luchará solo.', actors: [aren(), actor('guardiana', '../coleccion/guardiana-bosque-base.png', 31, 74, 30), actor('zafir', 'mago-base.png', 43, 73, 29), azrak()], effect: 'portal' },
    { key: 'emboscada-cancerbero', text: 'Un rugido sacude el trono. El cancerbero de Azrak se alza sobre los guardianes, enorme como una torre. Sus tres cabezas lanzan llamaradas y Aren apenas alcanza a levantar su espada.', actors: [aren(), actor('guardiana', '../coleccion/guardiana-bosque-base.png', 31, 74, 30)], duration: 8500 },
    { key: 'portal-nivor', text: 'Antes de que el fuego los alcance, un rayo de hielo surge del portal que Lume mantiene abierto. Dos garras gigantes se aferran a la piedra. ¡Nivor ha respondido a la llamada!', actors: [actor('nivor', 'dragon-hielo-ataque-v2.png', 30, 75, 60)], duration: 8500 },
    { key: 'titanes', text: 'Nivor emerge del portal frente al cancerbero. Fuego y hielo chocan por encima de los guardianes. El dragón avanza entre el vapor y levanta una muralla de hielo que contiene a la bestia.', actors: [actor('nivor', 'dragon-hielo-ataque-v2.png', 30, 75, 60)], duration: 9500 },
    { key: 'rescate', text: 'Azrak lanza un ataque hacia Aren mientras Nivor contiene al cancerbero. Nimbus se arroja entre ambos y lo recoge al vuelo. Por un instante, el tiempo parece detenerse.', actors: [azrak('', 'azrak-ataque.png')], effect: 'rescate', duration: 8500 },
    { key: 'madre', text: 'Otra descarga corta el cielo. Aeralis se interpone: su aliento luminoso choca con el ataque de Azrak y protege a su hijo y a Aren.', actors: [actor('aeralis', '../aventura/aeralis-liberada-v1.png', 27, 57, 58), azrak('', 'azrak-ataque.png')], effect: 'choque' },
    { key: 'hielo', text: 'Con el cancerbero contenido tras el hielo, Nivor congela los pies de Azrak y sujeta su brazo al suelo. «No volverás a encadenar a mi familia».', actors: [actor('nivor', 'dragon-hielo-ataque-v2.png', 26, 73, 49), azrak('sacudida', 'azrak-impacto.png')], effect: 'hielo' },
    { key: 'guardianes', text: 'La Guardiana enlaza sus raíces con la magia de Zafir. El Guardián de la Luna corta las sombras y Lume, la guardiana que Aren liberó del eclipse, abre una brecha de luz en la defensa de Azrak.', actors: [actor('guardiana', '../coleccion/guardiana-bosque-ataque-raices.png', 13, 76, 30), actor('zafir', 'mago-ataque.png', 31, 73, 30), actor('luna', 'hombre-lobo-zarpazo.png', 47, 76, 34), actor('alume', 'guardian-alba-final-carga-sin-rayo.png', 55, 55, 30), azrak('sacudida')], effect: 'guardianes' },
    { key: 'contraataque', text: 'Azrak se sobrepone. Quiebra las raíces y extiende una ola oscura sobre la arena. Los guardianes retroceden; Aren apenas logra mantenerse en pie.', actors: [aren(17, 76, 'sacudida'), actor('guardiana', 'guardiana-susto-impacto.png', 34, 77, 28), azrak('', 'azrak-invocacion-portal.png')], effect: 'onda' },
    { key: 'regreso', text: 'Una sombra intercepta el golpe. Shadow reaparece: usó la grieta para escapar. Azrak extiende la mano, pero su antiguo centinela se vuelve hacia Aren.', actors: [aren(), shadow(47, 'aparecer'), azrak()], effect: 'bruma' },
    { key: 'eleccion', image: 'eleccion-v2.png', text: '«Mi juramento ya no te pertenece. Yo elijo a quién proteger». Shadow abre un paso dentro de la tormenta e invita a los guardianes a reunir su poder.', actors: [aren(), shadow(43, '', 't-shadow-ataque.png'), azrak()], effect: 'portal' },
    { key: 'union', image: 'union-v2.png', text: 'Hielo, cielo, bosque, sol, luna y sombra se unen. Aren alza los cuatro cristales y Lume suma la luz del quinto desde el portal. Juntos alcanzan el corazón del Quinto Sello y rompen el poder de Azrak.', actors: [aren(12), actor('guardiana', '../coleccion/guardiana-bosque-ataque-raices.png', 26, 76, 27), actor('zafir', 'mago-ataque.png', 38, 73, 26), shadow(51, '', 't-shadow-ataque.png'), azrak('derrota', 'azrak-impacto.png')], effect: 'union', duration: 8500 },
    { key: 'amanecer', text: 'La tormenta se apaga. Azrak queda encerrado en el sello que pretendía dominar. Lume llega con el Cristal de la Unión, que recupera toda su luz al romperse el Quinto Sello, y se lo entrega a Aren. Los cinco cristales restauran los caminos entre mundos, y Shadow permanece junto a quienes eligió proteger.', actors: team(), effect: 'amanecer' },
    { key: 'epilogo', text: 'Aren guarda su mapa. No fue una sola fuerza la que salvó los mundos: fue aprender a escucharse y elegir ayudarse. FIN · Gracias por vivir esta aventura.', actors: team(), effect: 'amanecer', duration: 9000 },
  ];

  async function playCinematic(kind, { reduced = false, sound = () => {} } = {}) {
    const shots = kind === 'traicion' ? betrayal : finale;
    const layer = document.createElement('section'); layer.className = 'cinematica-azrak';
    layer.setAttribute('role', 'dialog'); layer.setAttribute('aria-modal', 'true');
    layer.setAttribute('aria-label', kind === 'traicion' ? 'La traición de Azrak' : 'El último juramento');
    layer.innerHTML = '<div class="azrak-cinema-stage"></div><div class="azrak-cinema-caption"><span></span><p aria-live="polite"></p></div><nav><button type="button">Pausar</button><button type="button">Saltar cinemática</button></nav>';
    document.body.append(layer);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const stage = layer.querySelector('.azrak-cinema-stage');
    const [pause, skip] = layer.querySelectorAll('button');
    const focusBefore = document.activeElement;
    let skipped = false, paused = false;
    const syncPause = () => layer.classList.toggle('pausada', paused || document.hidden);
    const onKey = event => {
      if (event.key === 'Escape') { skipped = true; event.preventDefault(); }
      if (event.key === 'Tab') {
        event.preventDefault();
        (document.activeElement === pause ? skip : pause).focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('visibilitychange', syncPause);
    pause.onclick = () => { paused = !paused; syncPause(); pause.textContent = paused ? 'Continuar' : 'Pausar'; };
    skip.onclick = () => { skipped = true; };
    skip.focus();
    try {
      for (const [index, shot] of shots.entries()) {
        if (skipped) break;
        layer.dataset.shot = shot.key;
        stage.className = 'azrak-cinema-stage escena-ilustrada';
        stage.replaceChildren();
        layer.querySelector('.azrak-cinema-caption span').textContent = `${kind === 'traicion' ? 'LA TRAICIÓN' : 'EL ÚLTIMO JURAMENTO'} · ${index + 1}/${shots.length}`;
        layer.querySelector('.azrak-cinema-caption p').textContent = shot.text;
        const illustration = document.createElement('img');
        illustration.className = 'azrak-cinema-illustration';
        illustration.src = `assets/images/cinematicas/reino-azrak/${shot.image || shot.key + '-v1.png'}`;
        illustration.alt = shot.text;
        stage.append(illustration);
        illustration.onerror = () => {
        if (!illustration.isConnected) return;
        illustration.remove();
        stage.className = `azrak-cinema-stage efecto-${shot.effect || 'ninguno'}`;
        for (const a of shot.actors) {
          const img = document.createElement('img'); img.src = sprites + a.file; img.alt = a.id;
          img.className = `azrak-cinema-actor actor-${a.id} ${a.motion}`;
          img.style.cssText = `--x:${a.x}%;--y:${a.y}%;--size:${a.size}%;`;
          stage.append(img);
        }
        const effect = document.createElement('div'); effect.className = 'azrak-cinema-effect'; effect.setAttribute('aria-hidden', 'true'); stage.append(effect);
        if (shot.effect === 'rescate') {
          const rescue = document.createElement('div'); rescue.className = 'azrak-rescate';
          rescue.innerHTML = `<img class="rescate-nimbus" src="${sprites}dragon-base.png" alt="Nimbus volando"><img class="rescate-aren" src="${sprites}explorador-base.png" alt="Aren a salvo sobre Nimbus">`;
          stage.append(rescue);
        }
        };
        sound(shot.key === 'amanecer' ? 'victoria' : 'habilidad');
        // The readable duration remains intact for reduced motion; only movement changes.
        layer.classList.toggle('movimiento-reducido', reduced);
        let elapsed = 0;
        while (elapsed < (shot.duration || 7200) && !skipped) {
          await new Promise(resolve => setTimeout(resolve, 100));
          if (!paused && !document.hidden) elapsed += 100;
        }
      }
    } finally {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('visibilitychange', syncPause);
      layer.remove();
      document.body.style.overflow = oldOverflow;
      if (focusBefore?.isConnected) focusBefore.focus({ preventScroll: true });
    }
  }
  return { missions, words, paths, symbols, toggleLight, initialLights, sealsSolved, mountPuzzle, mountScene, ignitePortal, playCinematic, betrayal, finale, base };
});
