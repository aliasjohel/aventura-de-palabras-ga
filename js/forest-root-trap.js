/* Peligro progresivo para los desafíos de palabras de todo el Bosque Encantado. */
(() => {
  const scene = document.querySelector('#pantallaJuego .escenario') || document.querySelector('.escenario');
  const trap = document.createElement('div');
  trap.className = 'trampa-raices';
  trap.hidden = true;
  trap.setAttribute('aria-hidden', 'true');
  // Las curvas se dibujan desde el suelo para que cada raíz crezca, no aparezca de golpe.
  const paths = [
    ['M18 174 Q32 162 48 171 Q60 176 70 165', 'M30 168 Q22 156 17 160'],
    ['M180 174 Q164 157 150 170 Q138 181 126 167', 'M164 166 Q177 151 185 153'],
    ['M39 180 Q48 159 72 157 Q105 170 132 158 Q148 148 164 171', 'M58 161 Q51 143 41 145'],
    ['M38 177 C16 131 43 102 56 128 Q61 143 49 147', 'M167 180 C187 131 164 102 151 124 Q143 138 154 145'],
    ['M36 178 C9 121 28 70 72 51 Q85 46 88 58 M38 83 Q22 75 23 63', 'M170 179 C194 119 173 70 127 51 Q117 46 113 58 M161 77 Q178 67 176 55'],
    ['M65 177 C49 136 54 84 86 59 Q101 43 115 60 C146 86 150 140 133 178', 'M37 112 Q69 90 105 105 T167 112 M37 137 Q68 146 105 130 T169 139'],
  ];
  const leaves = [[32, 164], [168, 160], [52, 150], [159, 123], [34, 78], [139, 130]];
  trap.innerHTML = `<svg viewBox="0 0 200 190" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="cortezaRaices" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#332616"/><stop offset=".45" stop-color="#867044"/><stop offset=".65" stop-color="#617039"/><stop offset="1" stop-color="#302719"/></linearGradient></defs>
    <ellipse class="raices-suelo" cx="100" cy="175" rx="83" ry="9"/>
    ${paths.map((group, i) => `<g class="raiz-etapa" data-etapa="${i + 1}">${group.map(d => `<path class="raiz-borde" d="${d}" pathLength="1"/><path class="raiz-corteza" d="${d}" pathLength="1"/><path class="raiz-luz" d="${d}" pathLength="1"/>`).join('')}<path class="raiz-hoja" transform="translate(${leaves[i].join(' ')}) rotate(${i % 2 ? 30 : -55})" d="M0 0 Q-16 -3 -12 -18 Q3 -14 0 0 M0 0 Q12 -1 14 -11 Q1 -14 0 0"/></g>`).join('')}
  </svg>`;
  scene.append(trap);
  const descriptions = ['', 'Una raíz asoma cerca de Aren.', 'Las raíces se acercan por ambos lados.', 'Las raíces rodean sus botas.', 'Las ramas comienzan a levantarse.', '¡Cuidado! La jaula está por cerrarse.', 'Las raíces atraparon a Aren. ¡Reintentá para liberarlo!'];
  let enabled = false;
  let stage = 0;
  window.ForestRootTrap = {
    update(world, mission, lives) {
      enabled = world === 0 && mission >= 0 && mission < 10;
      stage = enabled ? Math.max(0, Math.min(6, 6 - lives)) : 0;
      trap.hidden = !enabled || stage === 0;
      trap.classList.remove('liberando');
      trap.classList.toggle('capturado', stage === 6);
      trap.dataset.stage = String(stage);
      trap.querySelectorAll('.raiz-etapa').forEach(group => {
        group.classList.toggle('crecida', Number(group.dataset.etapa) <= stage);
      });
    },
    release() {
      if (enabled && stage > 0) trap.classList.add('liberando');
    },
    message() { return enabled ? descriptions[stage] : ''; },
  };
})();
