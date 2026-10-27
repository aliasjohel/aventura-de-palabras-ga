// Secuencia de inicio oficial de Aventura de Palabras.
// Todo el comportamiento vive aquí para poder evolucionarlo sin tocar el juego.
(() => {
  "use strict";

  const DURACION_NORMAL = 6300;
  const DURACION_REDUCIDA = 3000;
  const RETRASO_INICIO = 500;
  const DURACION_SALIDA = 720;
  const DURACION_FONDO = 2000;
  const movimiento = window.matchMedia("(prefers-reduced-motion: reduce)");
  const reducirMovimiento = movimiento.matches;
  const app = document.querySelector('.app');
  app.inert = true;
  const menu = document.getElementById('pantallaMenu');

  const intro = document.createElement("div");
  intro.id = "introOficial";
  intro.className = "intro-oficial";
  intro.setAttribute("role", "img");
  intro.setAttribute("aria-label", "Presentación de Aventura de Palabras");
  intro.innerHTML = `
    <div class="intro-escena" aria-hidden="true">
      <div class="intro-resplandor"></div>
      <img class="intro-libro" src="assets/images/intro/libro-intro-sin-cristal.png" alt="">
      <div class="intro-particulas"></div>
      <img class="intro-cristal" src="assets/images/intro/cristal-icono.png" alt="">
      <div class="intro-destello"></div>
      <div class="intro-logo">
        <span class="intro-logo-titulo">Aventura de Palabras</span>
        <span class="intro-logo-estudio">GA Games</span>
      </div>
    </div>
  `;

  const contenedorParticulas = intro.querySelector(".intro-particulas");
  const posiciones = [
    [-88, -84], [-55, -116], [-24, -94], [22, -121], [57, -88], [92, -107],
    [-105, -43], [-68, -63], [-35, -142], [37, -67], [73, -139], [111, -51],
    [-81, -154], [-15, -168], [18, -155], [82, -173], [-125, -94], [126, -122],
  ];

  posiciones.forEach(([x, y], indice) => {
    const particula = document.createElement("i");
    particula.className = "intro-particula";
    particula.style.setProperty("--x", `${x}px`);
    particula.style.setProperty("--y", `${y}px`);
    particula.style.setProperty("--d", `${(indice % 6) * 105}ms`);
    contenedorParticulas.appendChild(particula);
  });

  document.body.prepend(intro);

  const sonidoMagico = GameAudio.create("assets/sounds/cristal-casilla.mp3");
  const musicaMenu = globalThis.musicaMenuAventura
    || GameAudio.create("assets/sounds/melodia-menu.mp3", "music");
  globalThis.musicaMenuAventura = musicaMenu;
  sonidoMagico.volume = 0.16;
  musicaMenu.volume = 1;
  musicaMenu.loop = true;
  sonidoMagico.preload = "auto";
  musicaMenu.preload = "auto";
  const sonidoBoton = GameAudio.create('assets/sounds/menu-impacto-roca-v1.wav', 'effects');
  sonidoBoton.volume = 0.22;
  sonidoBoton.preload = 'auto';
  let fondoVisibleDesde = 0;
  let fondoRestante = DURACION_FONDO;
  let temporizadorFondo = 0;
  let temporizadorEntrada = 0;
  let fondoIniciado = false;
  let menuMostrado = false;
  const botonesSonados = new Set();
  const botones = ['btnJugar', 'btnModosJuego', 'btnRankingMenu', 'btnTienda', 'btnConfiguracion'];
  const capaPolvo = document.createElement('div');
  capaPolvo.className = 'menu-impact-layer';
  capaPolvo.setAttribute('aria-hidden', 'true');
  menu.appendChild(capaPolvo);
  const polvoTimers = new Set();
  function limpiarPolvo() {
    polvoTimers.forEach(clearTimeout);
    polvoTimers.clear();
    capaPolvo.replaceChildren();
  }
  function soltarPolvo(button) {
    if (movimiento.matches || document.hidden) return;
    const rect = button.getBoundingClientRect(), root = menu.getBoundingClientRect();
    const burst = document.createElement('span');
    burst.className = 'menu-impact-dust';
    burst.dataset.button = button.id;
    burst.style.cssText = `left:${rect.left-root.left}px;top:${rect.bottom-root.top+8}px;width:${rect.width}px`;
    const positions = [5,16,29,42,58,71,84,95];
    const offsets = [-30,-22,-14,-8,8,14,22,30];
    const heights = [-4,-12,-6,-14,-14,-6,-12,-4];
    positions.forEach((left, i) => {
      const grain = document.createElement('i');
      grain.style.cssText = `left:${left}%;--dust-x:${offsets[i]}px;--dust-y:${heights[i]}px`;
      if ([1,3,4,6].includes(i)) grain.className = 'menu-dust-grain';
      burst.appendChild(grain);
    });
    capaPolvo.appendChild(burst);
    const timer = setTimeout(() => { burst.remove(); polvoTimers.delete(timer); }, 650);
    polvoTimers.add(timer);
  }

  function completarEntrada() {
    clearTimeout(temporizadorEntrada);
    document.body.classList.remove('menu-entrada');
    sonidoBoton.pause();
    limpiarPolvo();
    botones.forEach(id => { document.getElementById(id).inert = false; });
  }
  function mostrarMenu() {
    if (menuMostrado) return;
    menuMostrado = true;
    clearTimeout(temporizadorFondo);
    document.body.classList.remove('menu-fondo-pendiente');
    if (!movimiento.matches) {
      botones.forEach(id => { document.getElementById(id).inert = true; });
      document.body.classList.add('menu-entrada');
    }
    app.inert = false;
    if (!movimiento.matches) temporizadorEntrada = setTimeout(completarEntrada, 6300);
  }
  function continuarFondo() {
    if (!fondoIniciado || menuMostrado || document.hidden) return;
    if (movimiento.matches) return mostrarMenu();
    fondoVisibleDesde = performance.now();
    temporizadorFondo = setTimeout(mostrarMenu, fondoRestante);
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { sonidoBoton.pause(); limpiarPolvo(); }
    if (!fondoIniciado || menuMostrado) return;
    if (document.hidden) {
      clearTimeout(temporizadorFondo);
      if (fondoVisibleDesde) fondoRestante = Math.max(0, fondoRestante - (performance.now() - fondoVisibleDesde));
      fondoVisibleDesde = 0;
    } else continuarFondo();
  });
  movimiento.addEventListener('change', () => {
    if (!movimiento.matches) return;
    if (fondoIniciado) mostrarMenu();
    completarEntrada();
  });
  menu.addEventListener('animationstart', event => {
    if (event.animationName !== 'menu-button-settle' || !botones.includes(event.target.id)
      || botonesSonados.has(event.target.id) || document.hidden || movimiento.matches
      || !menu.classList.contains('activa')) return;
    event.target.inert = false;
    botonesSonados.add(event.target.id);
    soltarPolvo(event.target);
    sonidoBoton.currentTime = 0;
    void sonidoBoton.play().catch(() => {});
  });
  // Entering a mode during the assembly cancels the remaining pieces and sounds.
  new MutationObserver(() => {
    if (!menu.classList.contains('activa')) completarEntrada();
  }).observe(menu, { attributes: true, attributeFilter: ['class'] });
  menu.addEventListener('click', event => {
    if (document.body.classList.contains('menu-entrada')
      && event.target.closest('.menu-contenido button')) completarEntrada();
  });

  let finalizada = false;
  let temporizadorFinal = 0;
  let temporizadorSonido = 0;

  const reproducir = (audio, { reiniciar = true } = {}) => {
    if (reiniciar) audio.currentTime = 0;
    audio.play().catch(() => {
      // Los navegadores pueden bloquear audio antes de la primera interacción.
    });
  };

  const detenerSonidoMagico = () => {
    sonidoMagico.pause();
    sonidoMagico.currentTime = 0;
  };

  const finalizar = () => {
    if (finalizada) return;
    finalizada = true;

    window.clearTimeout(temporizadorFinal);
    window.clearTimeout(temporizadorSonido);
    detenerSonidoMagico();
    intro.classList.add("intro-finalizando");
    document.body.classList.remove("intro-pendiente");

    window.setTimeout(() => {
      intro.remove();
      window.dispatchEvent(new CustomEvent("aventura:intro-finalizada"));
      fondoIniciado = true;
      continuarFondo();
    }, DURACION_SALIDA);
  };

  // A gesture may unlock audio, but never skips or shortens the presentation.
  intro.addEventListener('pointerdown', () => reproducir(musicaMenu, { reiniciar: false }));

  // El navegador puede cargar el juego en paralelo durante el medio segundo negro.
  window.setTimeout(() => {
    if (finalizada) return;
    intro.classList.add("intro-iniciada");
    reproducir(sonidoMagico);
    reproducir(musicaMenu, { reiniciar: false });
  }, RETRASO_INICIO);

  temporizadorFinal = window.setTimeout(
    () => finalizar(),
    reducirMovimiento ? DURACION_REDUCIDA : DURACION_NORMAL,
  );
})();
