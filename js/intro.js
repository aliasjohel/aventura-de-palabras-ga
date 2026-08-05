// Secuencia de inicio oficial de Aventura de Palabras.
// Todo el comportamiento vive aquí para poder evolucionarlo sin tocar el juego.
(() => {
  "use strict";

  const DURACION_NORMAL = 6300;
  const DURACION_REDUCIDA = 3000;
  const RETRASO_INICIO = 500;
  const DURACION_SALIDA = 720;
  const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const intro = document.createElement("div");
  intro.id = "introOficial";
  intro.className = "intro-oficial";
  intro.setAttribute("role", "dialog");
  intro.setAttribute("aria-label", "Presentación de Aventura de Palabras");
  intro.tabIndex = 0;
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
    <span class="intro-omitir" aria-hidden="true">TOCÁ PARA OMITIR</span>
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

  const sonidoMagico = new Audio("assets/sounds/cristal-casilla.mp3");
  const musicaMenu = globalThis.musicaMenuAventura
    || new Audio("assets/sounds/melodia-menu.mp3");
  globalThis.musicaMenuAventura = musicaMenu;
  sonidoMagico.volume = 0.16;
  musicaMenu.volume = 1;
  musicaMenu.loop = true;
  sonidoMagico.preload = "auto";
  musicaMenu.preload = "auto";

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

  const finalizar = (evento) => {
    if (finalizada) return;
    finalizada = true;

    if (evento) {
      evento.preventDefault();
      evento.stopPropagation();
    }

    window.clearTimeout(temporizadorFinal);
    window.clearTimeout(temporizadorSonido);
    detenerSonidoMagico();
    intro.classList.add("intro-finalizando");
    document.body.classList.remove("intro-pendiente");

    window.setTimeout(() => {
      intro.remove();
      window.dispatchEvent(new CustomEvent("aventura:intro-finalizada"));
    }, DURACION_SALIDA);
  };

  const omitir = (evento) => {
    reproducir(musicaMenu, { reiniciar: false });
    finalizar(evento);
  };

  const omitirConTeclado = (evento) => {
    if (["Enter", " ", "Escape"].includes(evento.key)) omitir(evento);
  };

  intro.addEventListener("pointerdown", omitir);
  intro.addEventListener("keydown", omitirConTeclado);

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
