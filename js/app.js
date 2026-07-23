// ====================
// Elementos del DOM
// ====================
const btnSiguiente = document.getElementById("btnSiguiente");
const btnReintentar = document.getElementById("btnReintentar");
const btnPista = document.getElementById("btnPista");
const textoPista = document.getElementById("textoPista");
const textoMonedas = document.getElementById("textoMonedas");

const textoXP = document.getElementById("textoXP");
const textoCristales = document.getElementById("textoCristales");
const panelCristales = document.getElementById("panelCristales");
const ranuraCristalBosque = document.getElementById("ranuraCristalBosque");
const cristalPanelBosque = document.getElementById("cristalPanelBosque");
const pantallaMenu = document.getElementById("pantallaMenu");
const pantallaJuego = document.getElementById("pantallaJuego");

const btnJugar = document.getElementById("btnJugar");
const btnSalirJuego = document.getElementById("btnSalirJuego");
const btnMisionAnterior = document.getElementById("btnMisionAnterior");
const btnMisionSiguiente = document.getElementById("btnMisionSiguiente");

const categoriaActual = document.getElementById("categoriaActual");
const detalleMision = document.getElementById("detalleMision");
const vidas = document.getElementById("vidas");
const personaje = document.getElementById("personaje");
const teclado = document.getElementById("teclado");
const mensajePersonaje = document.getElementById("mensajePersonaje");
const palabraOculta = document.getElementById("palabraOculta");
const btnNuevaAventura = document.getElementById("btnNuevaAventura");
const escenaAventura = document.getElementById("escenaAventura");
const personajeImagen = document.getElementById("personajeImagen");
const fondoEscenario = document.getElementById("fondoEscenario");
const contenedorEscenario = document.querySelector(".escenario");
const modalHistoria = document.getElementById("modalHistoria");
const numeroCapitulo = document.getElementById("numeroCapitulo");
const tituloCapitulo = document.getElementById("tituloCapitulo");
const textoCapitulo = document.getElementById("textoCapitulo");
const btnContinuarHistoria = document.getElementById("btnContinuarHistoria");
const modalPrologo = document.getElementById("modalPrologo");
const btnComenzarPrologo = document.getElementById("btnComenzarPrologo");

// ====================
// Sonidos
// ====================
const sonidos = {
  acertar: new Audio("assets/sounds/acertar.mp3"),
  error: new Audio("assets/sounds/error.mp3"),
  moneda: new Audio("assets/sounds/moneda.mp3"),
  victoria: new Audio("assets/sounds/victoria.mp3"),
  derrota: new Audio("assets/sounds/derrota.mp3"),
  piedra: new Audio("assets/sounds/piedra.mp3"),
  ramas: new Audio("assets/sounds/ramas.mp3"),
  lluvia: new Audio("assets/sounds/lluvia.mp3"),
  niebla: new Audio("assets/sounds/niebla.mp3"),
  lobos: new Audio("assets/sounds/lobos.mp3"),
  bosqueProhibido: new Audio("assets/sounds/bosque-prohibido.mp3"),
  ambientePuente: new Audio("assets/sounds/ambiente-puente.mp3"),
  crujidoPuente: new Audio("assets/sounds/crujido-puente.mp3"),
  ambienteSantuario: new Audio("assets/sounds/ambiente-santuario.mp3"),
  ambientePortal: new Audio("assets/sounds/ambiente-portal.mp3"),
};

const musicaPrologo = new Audio("assets/sounds/prologo.mp3");
musicaPrologo.loop = false;
musicaPrologo.volume = 0.25;
const sonidoComenzarAventura = new Audio(
  "assets/sounds/comenzar-aventura.wav",
);

let colaSonidos = [];
let audioDesbloqueado = false;
let ambienteActual = "";
let temporizadorCrujidoPuente = null;
const debugAudio = true;

const ambientesPorMision = {
  6: "bosqueProhibido",
  7: "ambientePuente",
  8: "ambienteSantuario",
  9: "ambientePortal",
};
const nombresAmbiente = new Set(Object.values(ambientesPorMision));

const sonidosEventoBosque = new Set([
  "piedra",
  "ramas",
  "lluvia",
  "niebla",
  "lobos",
]);

const sonidosNarrativosPorMision = {
  1: "piedra",
  2: "ramas",
  3: "lluvia",
  4: "niebla",
  5: "lobos",
};

const duracionTransicionHistoria = 300;
const duracionCaminataExplorador = 1200;
const duracionFadeEscenarioSalida = 250;
const duracionFadeEscenarioEntrada = 350;
const duracionNegroPresentacion = 320;
const duracionVistaPresentacion = 720;
const duracionZoomPresentacion = 1350;
const duracionFundidoFondo = 700;
const intervaloMinimoRafagaHojas = 8000;
const intervaloMaximoRafagaHojas = 15000;
const intervaloMinimoHojaPuente = 12000;
const intervaloMaximoHojaPuente = 22000;
const intervaloMinimoRayo = 10000;
const intervaloMaximoRayo = 25000;
const intervaloMinimoClaroNiebla = 16000;
const intervaloMaximoClaroNiebla = 29000;
const duracionMinimaClaroNiebla = 6500;
const duracionMaximaClaroNiebla = 9500;
const intervaloMinimoMiradaLobos = 3800;
const intervaloMaximoMiradaLobos = 8500;
const duracionMinimaMiradaLobos = 1000;
const duracionMaximaMiradaLobos = 2000;
const intervaloMinimoPresenciaBosque = 18000;
const intervaloMaximoPresenciaBosque = 38000;
const duracionMinimaPresenciaBosque = 900;
const duracionMaximaPresenciaBosque = 1450;
const intervaloMinimoAranaBosque = 30000;
const intervaloMaximoAranaBosque = 56000;
const duracionMinimaAranaBosque = 6200;
const duracionMaximaAranaBosque = 7400;
const prefiereReducirMovimiento = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);
const clasesAnimacionExplorador = [
  "celebrando",
  "reaccion-acierto",
  "reaccion-error",
  "reaccion-derrota",
];
const clasesEstadoExplorador = [
  "expresion-acierto",
  "expresion-desanimado",
];
const duracionReaccionExplorador = 900;
const imagenesExploradorPrecargadas = new Map();

document.addEventListener("touchstart", desbloquearAudio, { once: true });
document.addEventListener("click", desbloquearAudio, { once: true });

// ====================
// Variables del juego
// ====================

const filasTeclado = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const aventura = [
  {
    nombre: "🌲 Bosque Encantado",
    palabras: [
      { palabra: "ARBOL", pista: "Tiene tronco, ramas y hojas." },
      { palabra: "HOJA", pista: "Crece en las ramas de los árboles." },
      { palabra: "RIO", pista: "Agua que corre por el bosque." },
      { palabra: "ZORRO", pista: "Animal astuto de color rojizo." },
      { palabra: "CUEVA", pista: "Refugio natural entre rocas." },
      {
        palabra: "MUSGO",
        pista: "Planta pequeña que crece en lugares húmedos.",
      },
      { palabra: "LOBO", pista: "Animal salvaje parecido al perro." },
      { palabra: "CIERVO", pista: "Animal del bosque con astas." },
      { palabra: "RAMA", pista: "Parte del árbol donde nacen las hojas." },
      { palabra: "BUHO", pista: "Ave nocturna de ojos grandes." },
    ],
  },
  {
    nombre: "🏜️ Desierto Perdido",
    palabras: [
      { palabra: "ARENA", pista: "Cubre gran parte del desierto." },
      { palabra: "DUNA", pista: "Montaña de arena formada por el viento." },
      {
        palabra: "CAMELLO",
        pista: "Animal que resiste mucho tiempo sin agua.",
      },
      { palabra: "CACTUS", pista: "Planta con espinas." },
      { palabra: "OASIS", pista: "Lugar con agua en el desierto." },
      { palabra: "SOL", pista: "En el desierto suele ser muy fuerte." },
      { palabra: "ESCORPION", pista: "Animal pequeño con aguijón." },
      { palabra: "SERPIENTE", pista: "Reptil que se arrastra." },
      { palabra: "CALOR", pista: "Sensación típica del desierto." },
      { palabra: "BRUJULA", pista: "Sirve para orientarse." },
    ],
  },
];

const historiaBosque = [
  {
    capitulo: "Misión 1",
    titulo: "El Bosque Encantado",
    texto:
      "El joven explorador entra al Bosque Encantado siguiendo un antiguo mapa. La leyenda dice que en lo más profundo del bosque se encuentra el Primer Cristal de la Sabiduría. El sendero parece tranquilo, pero la aventura recién comienza.",
  },
  {
    capitulo: "Misión 2",
    titulo: "La Piedra del Sendero",
    texto:
      "Un fuerte estruendo rompe el silencio. Una enorme roca cae delante del explorador y bloquea el camino. Tendrá que encontrar una nueva forma de continuar su viaje.",
  },
  {
    capitulo: "Misión 3",
    titulo: "Entre las Ramas",
    texto:
      "Mientras rodea la roca, descubre que el sendero está cubierto por grandes ramas caídas. Avanza lentamente, apartando cada obstáculo para seguir adelante.",
  },
  {
    capitulo: "Misión 4",
    titulo: "La Tormenta",
    texto:
      "El cielo se oscurece y una intensa lluvia comienza a caer. El bosque cambia por completo y cada paso se vuelve más difícil.",
  },
  {
    capitulo: "Misión 5",
    titulo: "La Niebla Misteriosa",
    texto:
      "Una espesa niebla cubre el bosque. Apenas puede distinguir el camino y cualquier sombra parece esconder un peligro.",
  },
  {
    capitulo: "Misión 6",
    titulo: "Los Aullidos",
    texto:
      "Desde la oscuridad se escuchan los aullidos de varios lobos. Aunque el miedo comienza a aparecer, el explorador decide continuar.",
  },
  {
    capitulo: "Misión 7",
    titulo: "El Bosque Prohibido",
    texto:
      "Los árboles son gigantes y el bosque permanece en un silencio absoluto. El explorador siente que está muy cerca de descubrir un antiguo secreto.",
  },
  {
    capitulo: "Misión 8",
    titulo: "El Puente Olvidado",
    texto:
      "Después de mucho caminar encuentra un viejo puente de madera que cruje con cada paso. Del otro lado parece haber una extraña luz azul.",
  },
  {
    capitulo: "Misión 9",
    titulo: "El Santuario del Cristal",
    texto:
      "Al cruzar el puente descubre un antiguo santuario cubierto por raíces. En su centro brilla el Primer Cristal de la Sabiduría protegido por una misteriosa energía.",
  },
  {
    capitulo: "Misión 10",
    titulo: "El Portal de los Mundos",
    texto:
      "El explorador toma el Primer Cristal. El bosque recupera su luz y un antiguo portal vuelve a abrirse. El siguiente destino será el Desierto Perdido, donde lo espera un nuevo desafío.",
  },
];

let palabraSecreta = "";
let pistaActual = "";
let letrasElegidas = [];
let palabrasUsadasEnMision = [];
let intentos = 6;
let escenarioActual = 0;
let misionActual = 0;
let monedas = 0;
let experiencia = 0;
let cristalesObtenidos = 0;
let desafioActual = 1;
let desafiosCompletados = 0;
let sonidoNarrativoPendiente = "";
let historiaMisionPendiente = false;
let transicionEscenaActiva = false;
let navegacionDevPendiente = false;
let temporizadorReaccionExplorador = null;
let secuenciaReaccionExplorador = 0;
let transicionPrologoActiva = false;
let transicionCinematicaActiva = false;
let secuenciaFundidoFondo = 0;
let temporizadorRafagaHojas = null;
let secuenciaAmbienteHojas = 0;
let temporizadorPulsoCristal = null;
let secuenciaAmbienteCristal = 0;
let cinematicaSantuarioActiva = false;
let temporizadorRayo = null;
let secuenciaTormenta = 0;
let secuenciaNiebla = 0;
let temporizadorNiebla = null;
let secuenciaMiradasLobos = 0;
let temporizadorMiradasLobos = null;
let ultimoLoboIluminado = -1;
let secuenciaPresenciaBosque = 0;
let temporizadorPresenciaBosque = null;
let ultimaRutaPresenciaBosque = -1;
let imagenSiluetaBosque = null;
let secuenciaAranaBosque = 0;
let temporizadorAranaBosque = null;
let ultimaZonaAranaBosque = -1;
let imagenAranaBosque = null;
const desafiosPorMision = 3;

// ====================
// Eventos
// ====================
btnPista.addEventListener("click", () => {
  mostrarReaccionExplorador("pensando");

  textoPista.textContent = `💡 ${pistaActual}`;

  textoPista.classList.remove("oculto");

  btnPista.disabled = true;
});

btnSiguiente.addEventListener("click", () => {
  btnSiguiente.classList.add("oculto");
  limpiarCinematicaSantuario();

  if (historiaMisionPendiente) {
    mostrarHistoriaMision();
    return;
  }

  iniciarMisionAventura();
});

btnContinuarHistoria.addEventListener("click", async () => {
  if (btnContinuarHistoria.disabled || transicionEscenaActiva) return;

  btnContinuarHistoria.disabled = true;
  transicionEscenaActiva = true;
  modalHistoria.classList.remove("abriendo");
  modalHistoria.classList.add("cerrando");

  try {
    await esperarTransicionHistoria();

    modalHistoria.classList.add("oculto");
    modalHistoria.classList.remove("cerrando");

    console.log("[transicion] Empieza la caminata");
    personajeImagen.classList.remove("caminando");
    void personajeImagen.offsetWidth;
    personajeImagen.classList.add("caminando");
    console.log("[transicion] Clase caminando agregada", {
      aplicada: personajeImagen.classList.contains("caminando"),
      clases: personajeImagen.className,
    });
    await esperarMovimiento(duracionCaminataExplorador);

    personajeImagen.classList.remove("caminando");
    console.log("[transicion] Termina la caminata");
    personajeImagen.classList.add("oculto-transicion");

    await cambiarEscenarioConTransicion();

    personajeImagen.classList.remove("oculto-transicion");

    historiaMisionPendiente = false;

    if (sonidoNarrativoPendiente) {
      if (sonidoNarrativoPendiente === "piedra") {
        animarImpactoPiedra();
      }

      reproducirSonido(sonidoNarrativoPendiente);
      sonidoNarrativoPendiente = "";
    }

    await esperarFadeEscenarioEntrada();
  } finally {
    contenedorEscenario.classList.remove(
      "cambiando-escena",
      "apareciendo-escena",
    );
    personajeImagen.classList.remove("caminando", "oculto-transicion");
    btnContinuarHistoria.disabled = false;
    transicionEscenaActiva = false;
    navegacionDevPendiente = false;
  }
});

btnJugar.addEventListener("click", async () => {
  if (!localStorage.getItem("progresoAventuraGA")) {
    reiniciarEstadoAventura();
    mostrarPrologo();
    return;
  }

  await iniciarMisionAventura({
    presentarMision: desafiosCompletados === 0,
  });
});

btnComenzarPrologo.addEventListener("click", async () => {
  if (btnComenzarPrologo.disabled || transicionPrologoActiva) return;

  reproducirSonidoComenzarAventura();
  btnComenzarPrologo.disabled = true;
  transicionPrologoActiva = true;
  modalPrologo.classList.remove("abriendo");
  modalPrologo.classList.add("cerrando");

  try {
    await Promise.all([
      esperarTransicionHistoria(),
      desvanecerMusicaPrologo(1000),
    ]);

    modalPrologo.classList.add("oculto");
    modalPrologo.classList.remove("cerrando");

    await iniciarMisionAventura({ presentarMision: true });
    guardarProgreso();
  } finally {
    modalPrologo.classList.remove("abriendo", "cerrando");
    btnComenzarPrologo.disabled = false;
    transicionPrologoActiva = false;
  }
});

btnSalirJuego.addEventListener("click", () => {
  detenerSonidos();
  mostrarPantalla(pantallaMenu);
});

btnMisionAnterior.addEventListener("click", () => {
  navegarMisionDev(-1);
});

btnMisionSiguiente.addEventListener("click", () => {
  navegarMisionDev(1);
});

btnReintentar.addEventListener("click", () => {
  btnReintentar.classList.add("oculto");
  sonidoNarrativoPendiente = "";
  historiaMisionPendiente = false;

  iniciarMisionAventura();
});

btnNuevaAventura.addEventListener("click", () => {
  const confirmar = confirm(
    "Ya tenés una aventura guardada.\n\n¿Querés comenzar una nueva aventura?\nSe perderá el progreso actual.",
  );

  if (!confirmar) return;

  localStorage.removeItem("progresoAventuraGA");
  reiniciarEstadoAventura();
  mostrarPrologo();
});

// ====================
// Funciones principales
// ====================

function mostrarPalabra() {
  palabraOculta.innerHTML = "";

  palabraSecreta.split("").forEach((letra) => {
    const casilla = document.createElement("span");
    casilla.classList.add("casilla");

    if (letrasElegidas.includes(letra)) {
      casilla.textContent = letra;
      casilla.classList.add("revelada");
    } else {
      casilla.textContent = "";
    }

    palabraOculta.appendChild(casilla);
  });
}

function crearTeclado() {
  filasTeclado.forEach((fila) => {
    const filaTeclado = document.createElement("div");
    filaTeclado.classList.add("fila-teclado");

    fila.forEach((letra) => {
      const botonLetra = document.createElement("button");
      botonLetra.textContent = letra;
      botonLetra.classList.add("letra");

      botonLetra.addEventListener("click", () => {
        elegirLetra(letra, botonLetra);
      });

      filaTeclado.appendChild(botonLetra);
    });

    teclado.appendChild(filaTeclado);
  });
}

function elegirLetra(letra, boton) {
  boton.disabled = true;
  letrasElegidas.push(letra);

  if (palabraSecreta.includes(letra)) {
    boton.classList.add("correcta");
    personaje.textContent = "😁";
    mostrarReaccionExplorador("acierto", "reaccion-acierto");
    mensajePersonaje.textContent = "¡Bien! Esa letra está.";

    if (!palabraCompleta()) {
      reproducirSonido("acertar");
    }
  } else {
    boton.classList.add("incorrecta");
    intentos--;

    if (intentos > 0) {
      reproducirSonido("error");
    }

    actualizarVidas();

    personaje.textContent = intentos <= 2 ? "😨" : "😕";
    mostrarReaccionExplorador("desanimado", "reaccion-error");
    mensajePersonaje.textContent = "Uy... esa letra no está.";
  }

  mostrarPalabra();
  verificarEstado();
}

function verificarEstado() {
  const gano = palabraCompleta();

  if (gano) {
    personaje.textContent = "🥳";
    cancelarRetornoEstadoBaseExplorador();
    cambiarPersonaje("celebrando");
    mensajePersonaje.textContent = "🌟 ¡Desafío superado!";
    monedas += 10;
    experiencia += 20;

    actualizarJugador();

    const completaSantuarioPorPrimeraVez =
      escenarioActual === 0 &&
      misionActual === 8 &&
      desafiosCompletados === desafiosPorMision - 1 &&
      cristalesObtenidos === 0;

    if (completaSantuarioPorPrimeraVez) {
      reproducirSecuenciaSonidos(["acertar", "moneda", "victoria"]);
      guardarProgreso();
      bloquearTeclado();
      void completarSantuarioConCinematica();
      return;
    }

    sonidoNarrativoPendiente = avanzarMision();
    btnSiguiente.textContent = historiaMisionPendiente
      ? "➡️ Siguiente misión"
      : "➡️ Siguiente desafío";

    if (
      escenarioActual === 0 &&
      misionActual === 0 &&
      desafiosCompletados === 1
    ) {
      cambiarFondoMisionConFundido("bosque-1.png");
    }

    reproducirSecuenciaSonidos(["acertar", "moneda", "victoria"]);
    guardarProgreso();
    bloquearTeclado();
    btnSiguiente.classList.remove("oculto");
  }

  if (intentos === 0) {
    personaje.textContent = "😵";
    cancelarRetornoEstadoBaseExplorador();
    cambiarPersonaje("triste");
    animarPersonajeTemporal("reaccion-derrota");
    mensajePersonaje.textContent = "No lo lograste. ¡Intentá otra vez!";
    reproducirSecuenciaSonidos(["error", "derrota"]);
    bloquearTeclado();
    btnReintentar.classList.remove("oculto");
  }
}

// ====================
// Utilidades
// ====================

function mostrarPantalla(pantallaSeleccionada) {
  document.querySelectorAll(".pantalla").forEach((pantalla) => {
    pantalla.classList.remove("activa");
  });

  pantallaSeleccionada.classList.add("activa");
}

function mostrarHistoriaMision() {
  const historia = obtenerHistoriaMision();

  numeroCapitulo.textContent = historia.capitulo;
  tituloCapitulo.textContent = historia.titulo;
  textoCapitulo.textContent = historia.texto;
  btnContinuarHistoria.disabled = false;
  modalHistoria.classList.remove("cerrando");
  modalHistoria.classList.remove("oculto");
  modalHistoria.classList.add("abriendo");
}

function navegarMisionDev(direccion) {
  if (transicionEscenaActiva || navegacionDevPendiente) return;

  const nuevaMision = Math.min(Math.max(misionActual + direccion, 0), 9);

  if (nuevaMision === misionActual) return;

  detenerSonidos();
  misionActual = nuevaMision;
  sonidoNarrativoPendiente = sonidosNarrativosPorMision[misionActual] || "";
  historiaMisionPendiente = true;
  navegacionDevPendiente = true;
  actualizarControlesDev();
  mostrarHistoriaMision();
}

function actualizarControlesDev() {
  btnMisionAnterior.disabled = misionActual === 0;
  btnMisionSiguiente.disabled = misionActual === 9;
}

function actualizarCabeceraMision() {
  const escenario = aventura[escenarioActual];
  categoriaActual.textContent =
    escenarioActual === 0
      ? "🌲 Tema: palabras del Bosque Encantado"
      : `Tema: palabras de ${escenario.nombre}`;
  detalleMision.textContent =
    `Misión ${misionActual + 1} · Desafío ${desafioActual} de ${desafiosPorMision}`;
}

function actualizarVistaMisionDev() {
  detenerPolvoImpacto();
  detenerEfectos();
  actualizarAmbienteMision();

  actualizarCabeceraMision();

  cancelarRetornoEstadoBaseExplorador();
  actualizarEscenaPorMision();
  actualizarAmbientePuenteMision();
  actualizarAmbienteCristalMision();
  actualizarAmbienteHojasMision();
  actualizarTormentaMision();
  actualizarNieblaMision();
  actualizarMiradasLobosMision();
  actualizarPresenciaBosqueMision();
  actualizarAranaBosqueMision();
  mensajePersonaje.textContent = "¡Comienza la expedición!";
  actualizarControlesDev();
}

function mostrarPrologo() {
  btnComenzarPrologo.disabled = false;
  modalPrologo.classList.remove("cerrando", "oculto");
  modalPrologo.classList.add("abriendo");
  reproducirMusicaPrologo();
}

function reiniciarEstadoAventura() {
  detenerSonidos();
  cancelarRetornoEstadoBaseExplorador();
  secuenciaFundidoFondo++;
  contenedorEscenario
    .querySelectorAll(".fondo-escenario-fundido")
    .forEach((fondo) => fondo.remove());

  palabraSecreta = "";
  pistaActual = "";
  letrasElegidas = [];
  palabrasUsadasEnMision = [];
  intentos = 6;
  escenarioActual = 0;
  misionActual = 0;
  monedas = 0;
  experiencia = 0;
  cristalesObtenidos = 0;
  desafioActual = 1;
  desafiosCompletados = 0;
  sonidoNarrativoPendiente = "";
  historiaMisionPendiente = false;
  transicionEscenaActiva = false;
  navegacionDevPendiente = false;

  contenedorEscenario.classList.remove(
    "cambiando-escena",
    "apareciendo-escena",
  );
  personajeImagen.classList.remove("caminando", "oculto-transicion");

  actualizarJugador();
  actualizarMenuPrincipal();
}

function obtenerHistoriaMision() {
  if (escenarioActual === 0) {
    return (
      historiaBosque[misionActual] || {
        capitulo: `Misión ${misionActual + 1}`,
        titulo: "Más Profundo en el Bosque",
        texto:
          "El explorador continúa su camino mientras el bosque guarda nuevos secretos.",
      }
    );
  }

  return {
    capitulo: `Misión ${misionActual + 1}`,
    titulo: aventura[escenarioActual].nombre,
    texto: "Una nueva región se abre ante el explorador.",
  };
}

function esperarTransicionHistoria() {
  const duracion = prefiereReducirMovimiento.matches
    ? 0
    : duracionTransicionHistoria;

  return new Promise((resolve) => {
    setTimeout(resolve, duracion);
  });
}

async function cambiarEscenarioConTransicion() {
  contenedorEscenario.classList.add("cambiando-escena");
  await esperarFadeEscenarioSalida();

  console.log("[transicion] Se cambia el fondo");
  pantallaJuego.classList.add("presentacion-mision-preparada");
  if (navegacionDevPendiente) {
    actualizarVistaMisionDev();
  } else {
    await iniciarMisionAventura();
  }
  await esperarCargaFondoEscenario();

  contenedorEscenario.classList.remove("cambiando-escena");
  await presentarInicioMision();
}

function esperarFadeEscenarioSalida() {
  return esperarMovimiento(duracionFadeEscenarioSalida);
}

function esperarFadeEscenarioEntrada() {
  return esperarMovimiento(duracionFadeEscenarioEntrada);
}

function esperarMovimiento(duracion) {
  const duracionFinal = prefiereReducirMovimiento.matches ? 0 : duracion;

  return new Promise((resolve) => {
    setTimeout(resolve, duracionFinal);
  });
}

function esperarCargaFondoEscenario() {
  if (fondoEscenario.complete && fondoEscenario.naturalWidth > 0) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const finalizar = () => {
      fondoEscenario.removeEventListener("load", finalizar);
      fondoEscenario.removeEventListener("error", finalizar);
      resolve();
    };

    fondoEscenario.addEventListener("load", finalizar, { once: true });
    fondoEscenario.addEventListener("error", finalizar, { once: true });
  });
}

function bloquearTeclado() {
  document.querySelectorAll(".letra").forEach((boton) => {
    boton.disabled = true;
  });
}

function actualizarVidas() {
  vidas.textContent = "❤️".repeat(intentos) + "🤍".repeat(6 - intentos);
}

function palabraCompleta() {
  return palabraSecreta
    .split("")
    .every((letra) => letrasElegidas.includes(letra));
}

function precargarSonidos() {
  Object.entries(sonidos).forEach(([nombre, sonido]) => {
    sonido.preload = "auto";
    sonido.addEventListener("loadedmetadata", () => {
      logAudio(`${nombre} metadata cargada`, {
        src: sonido.currentSrc || sonido.src,
        duration: sonido.duration,
        readyState: sonido.readyState,
        networkState: sonido.networkState,
      });
    });
    sonido.addEventListener("loadeddata", () => {
      logAudio(`${nombre} data cargada`, {
        readyState: sonido.readyState,
        networkState: sonido.networkState,
      });
    });
    sonido.addEventListener("canplay", () => {
      logAudio(`${nombre} puede reproducirse`, {
        readyState: sonido.readyState,
        networkState: sonido.networkState,
      });
    });
    sonido.addEventListener("canplaythrough", () => {
      logAudio(`${nombre} cargado completo`, {
        readyState: sonido.readyState,
        networkState: sonido.networkState,
      });
    });
    sonido.addEventListener("error", () => {
      logAudio(`${nombre} error de carga`, {
        src: sonido.currentSrc || sonido.src,
        readyState: sonido.readyState,
        networkState: sonido.networkState,
        error: sonido.error,
      });
    });
    sonido.load();
    logAudio(`${nombre} precargando`, sonido.src);
  });
}

function desbloquearAudio() {
  logAudio("desbloqueando audio por primer toque");

  const desbloqueos = Object.entries(sonidos).map(([nombre, audio]) => {
    if (esSonidoEventoBosque(nombre)) {
      logAudioEvento(`${nombre} incluido en desbloquearAudio`, {
        existeEnSonidos: Boolean(sonidos[nombre]),
        src: audio.src,
      });
    }

    audio.volume = 0;
    return audio
      .play()
      .then(() => {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 1;
        audioDesbloqueado = true;
        logAudio(`${nombre} desbloqueado`);

        if (esSonidoEventoBosque(nombre)) {
          logAudioEvento(`${nombre} desbloqueado`);
        }
      })
      .catch((error) => {
        audio.volume = 1;
        logAudio(`${nombre} no se pudo desbloquear`, error);

        if (esSonidoEventoBosque(nombre)) {
          logAudioEvento(`${nombre} fallo al desbloquear`, error);
        }
      });
  });

  Promise.allSettled(desbloqueos).then(() => {
    audioDesbloqueado = true;

    if (ambienteActual) {
      ambienteActual = "";
      actualizarAmbienteMision();
    }
  });
}

function reproducirMusicaPrologo() {
  musicaPrologo.pause();
  musicaPrologo.currentTime = 0;
  musicaPrologo.volume = 0.25;
  musicaPrologo.play().catch((error) => {
    logAudio("musica del prologo bloqueada", error);
  });
}

function reproducirSonidoComenzarAventura() {
  sonidoComenzarAventura.currentTime = 0;
  sonidoComenzarAventura.play().catch((error) => {
    logAudio("sonido de comenzar aventura bloqueado", error);
  });
}

function desvanecerMusicaPrologo(duracion) {
  if (musicaPrologo.paused || musicaPrologo.ended) {
    musicaPrologo.currentTime = 0;
    musicaPrologo.volume = 0.25;
    return Promise.resolve();
  }

  const volumenInicial = musicaPrologo.volume;
  const inicio = performance.now();

  return new Promise((resolve) => {
    const reducirVolumen = (ahora) => {
      const progreso = Math.min((ahora - inicio) / duracion, 1);
      musicaPrologo.volume = volumenInicial * (1 - progreso);

      if (progreso < 1) {
        requestAnimationFrame(reducirVolumen);
        return;
      }

      musicaPrologo.pause();
      musicaPrologo.currentTime = 0;
      musicaPrologo.volume = 0.25;
      resolve();
    };

    requestAnimationFrame(reducirVolumen);
  });
}

function detenerSonidos() {
  limpiarCinematicaSantuario();
  detenerPolvoImpacto();
  detenerAmbientePuente();
  detenerAmbienteCristal();
  detenerAmbienteHojas();
  detenerTormenta();
  detenerNiebla();
  detenerMiradasLobos();
  detenerPresenciaBosque();
  detenerAranaBosque();
  detenerEfectos();
  detenerAmbiente();
}

function detenerEfectos() {
  colaSonidos = [];

  Object.entries(sonidos).forEach(([nombre, sonido]) => {
    if (nombresAmbiente.has(nombre)) return;

    sonido.onended = null;
    sonido.pause();
    sonido.currentTime = 0;
  });
}

function detenerPolvoImpacto() {
  contenedorEscenario
    .querySelectorAll(".capa-polvo-impacto")
    .forEach((capa) => capa.remove());
}

function detenerAmbienteHojas() {
  secuenciaAmbienteHojas++;

  if (temporizadorRafagaHojas) {
    clearTimeout(temporizadorRafagaHojas);
    temporizadorRafagaHojas = null;
  }

  contenedorEscenario
    .querySelectorAll(".capa-hojas-viento")
    .forEach((capa) => capa.remove());
}

function detenerAmbientePuente() {
  contenedorEscenario
    .querySelectorAll(".capa-puente-antiguo")
    .forEach((capa) => capa.remove());
}

function detenerAmbienteCristal() {
  secuenciaAmbienteCristal++;

  if (temporizadorPulsoCristal) {
    clearTimeout(temporizadorPulsoCristal);
    temporizadorPulsoCristal = null;
  }

  contenedorEscenario
    .querySelectorAll(".capa-energia-cristal")
    .forEach((capa) => capa.remove());
}

function detenerAmbiente() {
  cancelarCrujidoPuente();

  nombresAmbiente.forEach((nombre) => {
    const ambiente = sonidos[nombre];
    ambiente.pause();
    ambiente.currentTime = 0;
  });

  ambienteActual = "";
}

function actualizarAmbienteMision() {
  const nuevoAmbiente =
    escenarioActual === 0 ? ambientesPorMision[misionActual] || "" : "";

  if (nuevoAmbiente === ambienteActual) {
    if (nuevoAmbiente === "ambientePuente") programarCrujidoPuente();
    return;
  }

  detenerAmbiente();

  if (!nuevoAmbiente) return;

  const ambiente = sonidos[nuevoAmbiente];
  ambienteActual = nuevoAmbiente;
  ambiente.loop =
    nuevoAmbiente === "bosqueProhibido" || nuevoAmbiente === "ambientePuente";
  ambiente.currentTime = 0;

  ambiente
    .play()
    .then(() => {
      logAudio(
        `${nuevoAmbiente} reproduciendo${ambiente.loop ? " en loop" : " una vez"}`,
      );

      if (nuevoAmbiente === "ambientePuente") programarCrujidoPuente();
    })
    .catch((error) => {
      logAudio(`${nuevoAmbiente} play bloqueado`, error);
    });
}

function programarCrujidoPuente() {
  if (temporizadorCrujidoPuente || ambienteActual !== "ambientePuente") return;

  const demora = 12000 + Math.random() * 18000;
  temporizadorCrujidoPuente = setTimeout(() => {
    temporizadorCrujidoPuente = null;

    if (ambienteActual !== "ambientePuente") return;

    reproducirEfectoAmbiental("crujidoPuente", animarCrujidoPuente);
    programarCrujidoPuente();
  }, demora);
}

function cancelarCrujidoPuente() {
  if (!temporizadorCrujidoPuente) return;

  clearTimeout(temporizadorCrujidoPuente);
  temporizadorCrujidoPuente = null;
}

function reproducirEfectoAmbiental(nombre, alReproducir = null) {
  const sonido = sonidos[nombre];
  if (!sonido) return;

  sonido.currentTime = 0;
  sonido
    .play()
    .then(() => alReproducir?.())
    .catch((error) => {
      logAudio(`${nombre} play bloqueado`, error);
    });
}

function animarCrujidoPuente() {
  if (escenarioActual !== 0 || misionActual !== 7) return;

  const capaPuente = contenedorEscenario.querySelector(".capa-puente-antiguo");
  if (!capaPuente || prefiereReducirMovimiento.matches) return;

  capaPuente.classList.remove("crujiendo");
  void capaPuente.offsetWidth;
  capaPuente.classList.add("crujiendo");

  capaPuente.addEventListener(
    "animationend",
    (evento) => {
      if (evento.target === capaPuente) capaPuente.classList.remove("crujiendo");
    },
    { once: true },
  );
}

function reproducirSonido(nombre) {
  const sonido = sonidos[nombre];
  const esEvento = esSonidoEventoBosque(nombre);

  if (esEvento) {
    logAudioEvento(`intento reproducir ${nombre}`, {
      existeEnSonidos: Boolean(sonido),
      audioDesbloqueado,
    });
  }

  if (!sonido) {
    if (esEvento) {
      logAudioEvento(`${nombre} no existe en sonidos`);
    }

    return;
  }

  detenerEfectos();
  sonido.currentTime = 0;

  if (esEvento) {
    logAudioEvento(`${nombre} ejecutando play()`, {
      readyState: sonido.readyState,
      networkState: sonido.networkState,
      src: sonido.currentSrc || sonido.src,
    });
  }

  sonido
    .play()
    .then(() => {
      logAudio(`${nombre} reproduciendo`, {
        audioDesbloqueado,
        readyState: sonido.readyState,
        networkState: sonido.networkState,
      });

      if (esEvento) {
        logAudioEvento(`${nombre} play() ejecutado correctamente`, {
          readyState: sonido.readyState,
          networkState: sonido.networkState,
        });
      }
    })
    .catch((error) => {
      // Algunos navegadores bloquean audio hasta la primera interaccion.
      logAudio(`${nombre} play bloqueado`, {
        audioDesbloqueado,
        readyState: sonido.readyState,
        networkState: sonido.networkState,
        error: sonido.error,
      });

      if (esEvento) {
        logAudioEvento(`${nombre} play() fallo`, {
          audioDesbloqueado,
          readyState: sonido.readyState,
          networkState: sonido.networkState,
          mediaError: sonido.error,
          playError: error,
        });
      }
    });
}

function reproducirSecuenciaSonidos(nombres) {
  colaSonidos = [...nombres];
  detenerEfectos();
  colaSonidos = [...nombres];
  reproducirSiguienteSonido();
}

function reproducirSiguienteSonido() {
  const nombre = colaSonidos.shift();
  const sonido = sonidos[nombre];

  if (!sonido) return;

  sonido.currentTime = 0;
  sonido.onended = reproducirSiguienteSonido;
  sonido
    .play()
    .then(() => {
      logAudio(`${nombre} reproduciendo en secuencia`, {
        audioDesbloqueado,
        readyState: sonido.readyState,
        networkState: sonido.networkState,
      });
    })
    .catch((error) => {
      logAudio(`${nombre} play de secuencia bloqueado`, {
        audioDesbloqueado,
        readyState: sonido.readyState,
        networkState: sonido.networkState,
        error,
      });
      reproducirSiguienteSonido();
    });
}

function animarPersonajeTemporal(claseAnimacion) {
  personajeImagen.classList.remove(...clasesAnimacionExplorador);
  void personajeImagen.offsetWidth;
  personajeImagen.classList.add(claseAnimacion);

  personajeImagen.addEventListener(
    "animationend",
    () => {
      personajeImagen.classList.remove(claseAnimacion);
    },
    { once: true },
  );
}

function animarImpactoPiedra() {
  contenedorEscenario.classList.remove("temblor");

  if (prefiereReducirMovimiento.matches) return;

  void contenedorEscenario.offsetWidth;
  contenedorEscenario.classList.add("temblor");
  animarPolvoImpacto();

  const finalizarTemblor = (evento) => {
    if (
      evento.target !== contenedorEscenario ||
      evento.animationName !== "temblorEscenario"
    ) {
      return;
    }

    contenedorEscenario.classList.remove("temblor");
    contenedorEscenario.removeEventListener("animationend", finalizarTemblor);
  };

  contenedorEscenario.addEventListener("animationend", finalizarTemblor);
}

function animarPolvoImpacto() {
  detenerPolvoImpacto();

  const capaPolvo = document.createElement("div");
  capaPolvo.className = "capa-polvo-impacto";
  capaPolvo.setAttribute("aria-hidden", "true");

  const nubes = [
    { x: "-155px", y: "-24px", escala: 1.25, retraso: "40ms" },
    { x: "-105px", y: "-48px", escala: 0.95, retraso: "90ms" },
    { x: "-52px", y: "-38px", escala: 1.15, retraso: "20ms" },
    { x: "18px", y: "-54px", escala: 1.05, retraso: "75ms" },
    { x: "78px", y: "-35px", escala: 1.2, retraso: "35ms" },
    { x: "132px", y: "-46px", escala: 0.9, retraso: "105ms" },
    { x: "175px", y: "-20px", escala: 1.15, retraso: "55ms" },
  ];

  nubes.forEach(({ x, y, escala, retraso }) => {
    const nube = document.createElement("span");
    nube.className = "nube-polvo";
    nube.style.setProperty("--desplazamiento-x", x);
    nube.style.setProperty("--desplazamiento-y", y);
    nube.style.setProperty("--escala-polvo", escala);
    nube.style.setProperty("--retraso-polvo", retraso);
    capaPolvo.appendChild(nube);
  });

  contenedorEscenario.appendChild(capaPolvo);

  let temporizadorLimpieza;
  const eliminarPolvo = (evento) => {
    if (
      evento &&
      (evento.target !== capaPolvo ||
        evento.animationName !== "completarPolvoImpacto")
    ) {
      return;
    }

    clearTimeout(temporizadorLimpieza);
    capaPolvo.removeEventListener("animationend", eliminarPolvo);
    capaPolvo.remove();
  };

  capaPolvo.addEventListener("animationend", eliminarPolvo);
  temporizadorLimpieza = setTimeout(eliminarPolvo, 1500);
}

function obtenerEstadoBaseExplorador() {
  if (misionActual <= 1) return "feliz";

  if (misionActual <= 3) return "nervioso";

  if (misionActual <= 5) return "preocupado";

  if (escenarioActual === 0 && misionActual <= 9) return "feliz";

  return "triste";
}

function volverEstadoBaseExplorador() {
  cambiarPersonaje(obtenerEstadoBaseExplorador());
}

function cancelarRetornoEstadoBaseExplorador() {
  secuenciaReaccionExplorador++;

  if (!temporizadorReaccionExplorador) return;

  clearTimeout(temporizadorReaccionExplorador);
  temporizadorReaccionExplorador = null;
}

async function mostrarReaccionExplorador(estado, claseAnimacion = "") {
  cancelarRetornoEstadoBaseExplorador();
  const secuenciaActual = secuenciaReaccionExplorador;

  await cargarImagenExplorador(estado);

  if (secuenciaActual !== secuenciaReaccionExplorador) return;

  cambiarPersonaje(estado);

  if (claseAnimacion) {
    animarPersonajeTemporal(claseAnimacion);
  }

  temporizadorReaccionExplorador = setTimeout(() => {
    volverEstadoBaseExplorador();
    temporizadorReaccionExplorador = null;
  }, duracionReaccionExplorador);
}

function esSonidoEventoBosque(nombre) {
  return sonidosEventoBosque.has(nombre);
}

function logAudio(mensaje, detalle = "") {
  if (!debugAudio) return;

  console.log(`[audio] ${mensaje}`, detalle);
}

function logAudioEvento(mensaje, detalle = "") {
  if (!debugAudio) return;

  console.log(`[audio-evento] ${mensaje}`, detalle);
}

function iniciarMisionAventura({ presentarMision = false } = {}) {
  detenerPolvoImpacto();
  detenerAmbientePuente();
  detenerAmbienteCristal();
  detenerAmbienteHojas();
  detenerTormenta();
  detenerEfectos();
  actualizarAmbienteMision();

  desafioActual = desafiosCompletados + 1;
  actualizarControlesDev();

  actualizarCabeceraMision();

  const palabraSeleccionada = obtenerPalabraAleatoria();

  palabraSecreta = palabraSeleccionada.palabra;

  pistaActual = palabraSeleccionada.pista;

  letrasElegidas = [];
  intentos = 6;
  cancelarRetornoEstadoBaseExplorador();

  actualizarVidas();
  personaje.textContent = "😄";
  actualizarEscenaPorMision();
  actualizarAmbientePuenteMision();
  actualizarAmbienteCristalMision();
  actualizarAmbienteHojasMision();
  actualizarTormentaMision();
  actualizarNieblaMision();
  actualizarMiradasLobosMision();
  actualizarPresenciaBosqueMision();
  actualizarAranaBosqueMision();
  mensajePersonaje.textContent = "¡Comienza la expedición!";
  teclado.innerHTML = "";
  textoPista.classList.add("oculto");
  textoPista.textContent = "";
  btnPista.disabled = false;
  btnSiguiente.classList.add("oculto");

  mostrarPalabra();
  crearTeclado();
  mostrarPantalla(pantallaJuego);

  if (presentarMision) {
    return presentarInicioMision();
  }

  return Promise.resolve();
}

function avanzarMision() {
  desafiosCompletados++;

  if (desafiosCompletados < desafiosPorMision) {
    historiaMisionPendiente = false;
    return "";
  }

  desafiosCompletados = 0;
  palabrasUsadasEnMision = [];
  historiaMisionPendiente = true;
  detenerAmbiente();
  detenerAmbientePuente();
  detenerAmbienteCristal();
  detenerAmbienteHojas();
  detenerTormenta();
  detenerNiebla();
  detenerMiradasLobos();
  detenerPresenciaBosque();
  detenerAranaBosque();

  misionActual++;
  mensajePersonaje.textContent = "🏆 ¡Misión completada!";
  let sonidoNarrativo = sonidosNarrativosPorMision[misionActual] || "";

  if (misionActual >= 10) {
    misionActual = 0;
    sonidoNarrativo = "";

    escenarioActual++;

    if (escenarioActual >= aventura.length) {
      escenarioActual = 0;

      mensajePersonaje.textContent = "🏆 ¡Completaste toda la aventura!";

      return "";
    }

    mensajePersonaje.textContent = `🔓 Nuevo escenario desbloqueado: ${aventura[escenarioActual].nombre}`;
  }

  return sonidoNarrativo;
}

function actualizarJugador() {
  textoMonedas.textContent = `🪙 ${monedas}`;

  textoXP.textContent = `⭐ ${experiencia} XP`;

  textoCristales.textContent = `💎 ${cristalesObtenidos}`;
  actualizarPanelCristales();
}

function actualizarPanelCristales() {
  const cristalBosqueObtenido = cristalesObtenidos > 0;

  cristalPanelBosque.classList.toggle("oculto", !cristalBosqueObtenido);
  ranuraCristalBosque.classList.toggle("obtenida", cristalBosqueObtenido);
  ranuraCristalBosque.setAttribute(
    "aria-label",
    cristalBosqueObtenido
      ? "Cristal del Bosque Encantado obtenido"
      : "Espacio del Cristal del Bosque Encantado vacío",
  );
}

function guardarProgreso() {
  const progreso = {
    escenarioActual,
    misionActual,
    desafioActual,
    desafiosCompletados,
    monedas,
    experiencia,
    cristalesObtenidos,
  };

  localStorage.setItem("progresoAventuraGA", JSON.stringify(progreso));

  actualizarMenuPrincipal();
}

function cargarProgreso() {
  const progresoGuardado = localStorage.getItem("progresoAventuraGA");

  if (!progresoGuardado) {
    actualizarMenuPrincipal();
    return;
  }

  let progreso;

  try {
    progreso = JSON.parse(progresoGuardado);
  } catch {
    localStorage.removeItem("progresoAventuraGA");
    actualizarMenuPrincipal();
    return;
  }

  escenarioActual = progreso.escenarioActual ?? 0;
  misionActual = progreso.misionActual ?? 0;
  desafiosCompletados =
    progreso.desafiosCompletados ??
    Math.max((progreso.desafioActual ?? 1) - 1, 0);
  escenarioActual = Math.min(Math.max(escenarioActual, 0), aventura.length - 1);
  misionActual = Math.max(misionActual, 0);
  desafiosCompletados = Math.min(
    Math.max(desafiosCompletados, 0),
    desafiosPorMision - 1,
  );
  desafioActual = desafiosCompletados + 1;
  monedas = progreso.monedas ?? 0;
  experiencia = progreso.experiencia ?? 0;
  cristalesObtenidos = Math.min(
    Math.max(progreso.cristalesObtenidos ?? 0, 0),
    5,
  );

  actualizarJugador();
  actualizarMenuPrincipal();
}

function actualizarMenuPrincipal() {
  const progresoGuardado = localStorage.getItem("progresoAventuraGA");

  if (!progresoGuardado) {
    btnJugar.textContent = "🆕 Nueva aventura";

    btnNuevaAventura.classList.add("oculto");

    return;
  }

  btnJugar.textContent = "▶️ Continuar aventura";

  btnNuevaAventura.classList.remove("oculto");
}

function obtenerPalabraAleatoria() {
  const escenario = aventura[escenarioActual];

  let palabrasDisponibles = escenario.palabras.filter(
    (item) => !palabrasUsadasEnMision.includes(item.palabra),
  );

  if (palabrasDisponibles.length === 0) {
    palabrasUsadasEnMision = [];
    palabrasDisponibles = escenario.palabras;
  }

  const indice = Math.floor(Math.random() * palabrasDisponibles.length);
  const palabraSeleccionada = palabrasDisponibles[indice];

  palabrasUsadasEnMision.push(palabraSeleccionada.palabra);

  return palabraSeleccionada;
}

cargarProgreso();
actualizarControlesDev();
precargarImagenesBosque();
precargarImagenesExplorador();
precargarImagenesHojas();
precargarRecursosCinematicaSantuario();
precargarSonidos();

function cambiarPersonaje(estado) {
  personajeImagen.src = obtenerSrcExplorador(estado);

  personajeImagen.classList.remove(...clasesAnimacionExplorador);
  personajeImagen.classList.remove(...clasesEstadoExplorador);
  personajeImagen.classList.add(`expresion-${estado}`);

  if (estado === "celebrando") {
    personajeImagen.classList.add("celebrando");
  }
}

function actualizarEscenaPorMision() {
  const escenasPorEscenario = [
    [
      {
        fondo: desafiosCompletados > 0 ? "bosque-1.png" : "bosque-0.png",
        texto:
          "🌲 Encuentra la palabra secreta para comenzar tu viaje por el Bosque Encantado.",
      },
      {
        fondo: "bosque-2.png",
        texto:
          "🪨 Resuelve la palabra secreta para encontrar un camino alrededor de la roca.",
      },
      {
        fondo: "bosque-3.png",
        texto: "🌿 Resuelve la palabra para encontrar un paso entre las ramas.",
      },
      {
        fondo: "bosque-4.png",
        texto:
          "⛈️ Encuentra la palabra secreta para atravesar la tormenta y continuar el viaje.",
      },
      {
        fondo: "bosque-5.png",
        texto:
          "🌫️ Solo la palabra correcta te ayudará a encontrar el camino entre la niebla.",
      },
      {
        fondo: "bosque-6.png",
        texto:
          "🐺 Resuelve la palabra para escabullirte de los lobos y continuar el viaje.",
      },
      {
        fondo: "bosque-7.png",
        texto:
          "🌲 La palabra secreta revelará el sendero oculto del Bosque Prohibido.",
      },
      {
        fondo: "bosque-8.png",
        texto:
          "🌉 Descubre la palabra para cruzar el viejo puente con seguridad.",
      },
      {
        fondo: "bosque-9.png",
        texto:
          "💎 Solo quien resuelva la palabra podrá acercarse al Cristal de la Sabiduría.",
      },
      {
        fondo: "bosque-10.png",
        texto: "🌌 La última palabra abrirá el Portal de los Mundos.",
      },
    ],
  ];

  const escenasPorMision =
    escenasPorEscenario[escenarioActual] || escenasPorEscenario[0];
  const escena =
    escenasPorMision[Math.min(misionActual, escenasPorMision.length - 1)];

  fondoEscenario.src = `assets/images/fondos/${escena.fondo}`;
  escenaAventura.textContent = escena.texto;
  volverEstadoBaseExplorador();
}

async function presentarInicioMision() {
  if (transicionCinematicaActiva) return;

  transicionCinematicaActiva = true;
  pantallaJuego.classList.remove("presentacion-mision-preparada");
  pantallaJuego.classList.add("presentacion-mision-activa");

  const presentacion = document.createElement("div");
  const imagen = document.createElement("img");
  presentacion.className = "presentacion-mision";
  presentacion.setAttribute("aria-hidden", "true");
  imagen.className = "presentacion-mision-imagen";
  imagen.alt = "";
  imagen.src = fondoEscenario.currentSrc || fondoEscenario.src;
  presentacion.appendChild(imagen);
  document.body.appendChild(presentacion);

  try {
    await esperarCargaImagen(imagen);
    await esperarMovimiento(duracionNegroPresentacion);

    presentacion.classList.add("mostrando-fondo");
    await esperarMovimiento(duracionVistaPresentacion);

    const destino = contenedorEscenario.getBoundingClientRect();
    pantallaJuego.classList.add("interfaz-revelandose");
    presentacion.classList.add("haciendo-zoom");

    if (prefiereReducirMovimiento.matches || !imagen.animate) {
      await esperarMovimiento(180);
    } else {
      const zoom = imagen.animate(
        [
          {
            top: "0px",
            left: "0px",
            width: `${window.innerWidth}px`,
            height: `${window.innerHeight}px`,
            borderRadius: "0px",
          },
          {
            top: `${destino.top}px`,
            left: `${destino.left}px`,
            width: `${destino.width}px`,
            height: `${destino.height}px`,
            borderRadius: getComputedStyle(contenedorEscenario).borderRadius,
          },
        ],
        {
          duration: duracionZoomPresentacion,
          easing: "cubic-bezier(0.22, 0.75, 0.2, 1)",
          fill: "forwards",
        },
      );

      await zoom.finished.catch(() => {});
    }
  } finally {
    presentacion.remove();
    pantallaJuego.classList.remove(
      "presentacion-mision-activa",
      "presentacion-mision-preparada",
      "interfaz-revelandose",
    );
    transicionCinematicaActiva = false;
  }
}

async function cambiarFondoMisionConFundido(nombreFondo) {
  const secuenciaActual = ++secuenciaFundidoFondo;
  const siguienteFondo = document.createElement("img");
  siguienteFondo.className = "fondo-escenario fondo-escenario-fundido";
  siguienteFondo.alt = "";
  siguienteFondo.src = `assets/images/fondos/${nombreFondo}`;

  await esperarCargaImagen(siguienteFondo);
  if (secuenciaActual !== secuenciaFundidoFondo) return;

  contenedorEscenario.insertBefore(siguienteFondo, personajeImagen);
  void siguienteFondo.offsetWidth;
  siguienteFondo.classList.add("visible");
  await esperarMovimiento(duracionFundidoFondo);

  if (secuenciaActual !== secuenciaFundidoFondo) {
    siguienteFondo.remove();
    return;
  }

  fondoEscenario.src = siguienteFondo.src;
  siguienteFondo.remove();
}

function esperarCargaImagen(imagen) {
  if (imagen.complete && imagen.naturalWidth > 0) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    imagen.addEventListener("load", resolve, { once: true });
    imagen.addEventListener("error", resolve, { once: true });
  });
}

function actualizarAmbientePuenteMision() {
  detenerAmbientePuente();

  if (
    escenarioActual !== 0 ||
    misionActual !== 7 ||
    prefiereReducirMovimiento.matches
  ) {
    return;
  }

  const capaPuente = document.createElement("div");
  capaPuente.className = "capa-puente-antiguo";
  capaPuente.setAttribute("aria-hidden", "true");

  ["tablas", "soga-izquierda", "soga-derecha"].forEach((parte) => {
    const recorte = document.createElement("img");
    recorte.className = `recorte-puente recorte-puente-${parte}`;
    recorte.alt = "";
    recorte.draggable = false;
    recorte.src = "assets/images/fondos/bosque-8.png";
    capaPuente.appendChild(recorte);
  });

  contenedorEscenario.insertBefore(capaPuente, personajeImagen);
}

function actualizarAmbienteCristalMision() {
  detenerAmbienteCristal();

  if (
    escenarioActual !== 0 ||
    misionActual !== 8 ||
    prefiereReducirMovimiento.matches
  ) {
    return;
  }

  const capaCristal = document.createElement("div");
  const halo = document.createElement("div");
  const brillo = document.createElement("img");
  capaCristal.className = "capa-energia-cristal";
  capaCristal.setAttribute("aria-hidden", "true");
  halo.className = "halo-base-cristal";
  brillo.className = "brillo-cristal";
  brillo.alt = "";
  brillo.draggable = false;
  brillo.src = "assets/images/fondos/bosque-9.png";
  capaCristal.append(halo, brillo);

  const particulas = [
    [50.2, 2.5, 7.8, -1.4, -5],
    [51.5, 3, 9.2, -4.8, 5],
    [52.8, 2, 8.5, -6.2, -3],
    [54.1, 3.5, 10.4, -2.1, 4],
    [55.2, 2.5, 9.7, -7.6, -4],
    [56.3, 2, 8.9, -3.5, 3],
    [57.1, 3, 10.8, -9.1, -5],
  ];

  particulas.forEach(([x, tamano, duracion, retraso, deriva]) => {
    const particula = document.createElement("span");
    particula.className = "particula-cristal";
    particula.style.setProperty("--particula-x", `${x}%`);
    particula.style.setProperty("--tamano-particula", `${tamano}px`);
    particula.style.setProperty("--duracion-particula", `${duracion}s`);
    particula.style.setProperty("--retraso-particula", `${retraso}s`);
    particula.style.setProperty("--deriva-particula", `${deriva}px`);
    capaCristal.appendChild(particula);
  });

  [
    [50.8, 34, 9.5, -2.8],
    [56.5, 38, 12, -7.2],
    [53.8, 27, 14, -10.5],
  ].forEach(([x, y, duracion, retraso]) => {
    const destello = document.createElement("span");
    destello.className = "destello-cristal";
    destello.style.left = `${x}%`;
    destello.style.top = `${y}%`;
    destello.style.setProperty("--duracion-destello", `${duracion}s`);
    destello.style.setProperty("--retraso-destello", `${retraso}s`);
    capaCristal.appendChild(destello);
  });

  contenedorEscenario.insertBefore(capaCristal, personajeImagen);
  programarPulsoCristal(secuenciaAmbienteCristal, capaCristal);
}

function programarPulsoCristal(secuencia, capaCristal) {
  const demora = aleatorioEntre(8000, 12000);

  temporizadorPulsoCristal = setTimeout(() => {
    temporizadorPulsoCristal = null;

    if (
      secuencia !== secuenciaAmbienteCristal ||
      escenarioActual !== 0 ||
      misionActual !== 8 ||
      !pantallaJuego.classList.contains("activa") ||
      !capaCristal.isConnected
    ) {
      detenerAmbienteCristal();
      return;
    }

    capaCristal.classList.add("pulsando");
    capaCristal.addEventListener(
      "animationend",
      (evento) => {
        if (evento.target === capaCristal) {
          capaCristal.classList.remove("pulsando");
        }
      },
      { once: true },
    );

    programarPulsoCristal(secuencia, capaCristal);
  }, demora);
}

async function completarSantuarioConCinematica() {
  if (cinematicaSantuarioActiva) return;

  cinematicaSantuarioActiva = true;
  pantallaJuego.classList.add("cinematica-santuario-activa");
  btnSiguiente.classList.add("oculto");

  try {
    await esperarMovimiento(850);
    await ejecutarCinematicaSantuario();
  } catch (error) {
    console.error("[cinematica-santuario] No se pudo completar la animación", error);
    limpiarCinematicaSantuario();
  }

  cristalesObtenidos = Math.max(cristalesObtenidos, 1);
  actualizarJugador();
  sonidoNarrativoPendiente = avanzarMision();
  guardarProgreso();
  mensajePersonaje.textContent = "💎 ¡Cristal de la Sabiduría obtenido!";
  btnSiguiente.textContent = "➡️ Ir al Portal";
  btnSiguiente.classList.remove("oculto");
  pantallaJuego.classList.remove("cinematica-santuario-activa");
  cinematicaSantuarioActiva = false;
}

async function ejecutarCinematicaSantuario() {
  detenerAmbienteCristal();

  const capa = document.createElement("div");
  const pulso = document.createElement("div");
  const destello = document.createElement("div");
  const velo = document.createElement("div");
  const mensaje = document.createElement("p");
  const mensajePrincipal = document.createElement("span");
  const mensajeProgreso = document.createElement("span");
  const poses = [
    ["acercandose", "assets/images/elements/explorador-acercandose-cristal.png"],
    ["extendiendo", "assets/images/elements/explorador-brazo-extendido.png"],
    ["sosteniendo", "assets/images/elements/explorador-sosteniendo-cristal.png"],
  ].map(([nombre, src]) => {
    const pose = document.createElement("img");
    pose.className = `pose-cinematica pose-${nombre}`;
    pose.alt = "";
    pose.draggable = false;
    pose.src = src;
    capa.appendChild(pose);
    return pose;
  });

  capa.className = "cinematica-santuario";
  capa.setAttribute("aria-hidden", "true");
  pulso.className = "pulso-final-cristal";
  destello.className = "destello-santuario-final";
  velo.className = "velo-final-santuario";
  mensaje.className = "mensaje-cristal-obtenido";
  mensajePrincipal.className = "mensaje-cristal-principal";
  mensajePrincipal.textContent = "¡Cristal de la Sabiduría obtenido!";
  mensajeProgreso.className = "mensaje-cristal-progreso";
  mensajeProgreso.textContent = "1 de 5 cristales encontrados";
  mensaje.append(mensajePrincipal, mensajeProgreso);
  capa.prepend(pulso);
  capa.append(destello, mensaje, velo);
  contenedorEscenario.appendChild(capa);
  personajeImagen.classList.add("oculto-cinematica");

  await Promise.all(poses.map(esperarCargaImagen));
  pulso.classList.add("activo");
  await esperarMovimiento(1150);

  activarPoseCinematica(poses, "pose-acercandose");
  capa.classList.add("explorador-acercandose");
  await esperarMovimiento(1650);

  activarPoseCinematica(poses, "pose-extendiendo");
  await esperarMovimiento(950);

  destello.classList.add("activo");
  activarPoseCinematica(poses, "pose-sosteniendo");
  mensaje.classList.add("visible");
  await esperarMovimiento(1150);

  activarPoseCinematica(poses, "pose-extendiendo");
  await volarCristalHaciaPanel();
  cristalesObtenidos = Math.max(cristalesObtenidos, 1);
  actualizarJugador();
  ranuraCristalBosque.classList.add("recibiendo");
  setTimeout(() => ranuraCristalBosque.classList.remove("recibiendo"), 900);

  mensaje.classList.add("progreso-visible");
  await esperarMovimiento(1650);
  mensaje.classList.add("saliendo");
  await esperarMovimiento(500);
  velo.classList.add("visible");
  await esperarMovimiento(850);
}

function activarPoseCinematica(poses, claseActiva) {
  poses.forEach((pose) => {
    pose.classList.toggle("visible", pose.classList.contains(claseActiva));
  });
}

async function volarCristalHaciaPanel() {
  const escena = contenedorEscenario.getBoundingClientRect();
  const destino = ranuraCristalBosque.getBoundingClientRect();
  const cristal = document.createElement("img");
  const inicioX = escena.left + escena.width * 0.61;
  const inicioY = escena.top + escena.height * 0.35;
  const destinoX = destino.left + destino.width / 2;
  const destinoY = destino.top + destino.height / 2;
  cristal.className = "cristal-volador-santuario";
  cristal.alt = "";
  cristal.src = "assets/images/elements/cristal-sabiduria-esmeralda.png";
  cristal.style.left = `${inicioX}px`;
  cristal.style.top = `${inicioY}px`;
  document.body.appendChild(cristal);
  await esperarCargaImagen(cristal);

  if (prefiereReducirMovimiento.matches || !cristal.animate) {
    cristal.remove();
    return;
  }

  const puntoMedioX = inicioX + (destinoX - inicioX) * 0.52;
  const puntoMedioY = Math.min(inicioY, destinoY) - 55;
  const vuelo = cristal.animate(
    [
      {
        left: `${inicioX}px`,
        top: `${inicioY}px`,
        opacity: 0,
        transform: "translate(-50%, -50%) scale(0.65) rotate(0deg)",
      },
      {
        left: `${inicioX}px`,
        top: `${inicioY - 8}px`,
        opacity: 1,
        transform: "translate(-50%, -50%) scale(0.82) rotate(4deg)",
        offset: 0.12,
      },
      {
        left: `${puntoMedioX}px`,
        top: `${puntoMedioY}px`,
        opacity: 1,
        transform: "translate(-50%, -50%) scale(0.68) rotate(-5deg)",
        offset: 0.58,
      },
      {
        left: `${destinoX}px`,
        top: `${destinoY}px`,
        opacity: 0.9,
        transform: "translate(-50%, -50%) scale(0.34) rotate(0deg)",
      },
    ],
    {
      duration: 1450,
      easing: "cubic-bezier(0.42, 0, 0.2, 1)",
      fill: "forwards",
    },
  );

  await vuelo.finished.catch(() => {});
  cristal.remove();
}

function limpiarCinematicaSantuario() {
  contenedorEscenario
    .querySelectorAll(".cinematica-santuario")
    .forEach((capa) => capa.remove());
  document
    .querySelectorAll(".cristal-volador-santuario")
    .forEach((cristal) => cristal.remove());
  personajeImagen.classList.remove("oculto-cinematica");
  pantallaJuego.classList.remove("cinematica-santuario-activa");
  cinematicaSantuarioActiva = false;
}

function actualizarAmbienteHojasMision() {
  detenerAmbienteHojas();

  if (
    escenarioActual !== 0 ||
    ![2, 7].includes(misionActual) ||
    prefiereReducirMovimiento.matches
  ) {
    return;
  }

  const capaHojas = document.createElement("div");
  capaHojas.className = `capa-hojas-viento${
    misionActual === 7 ? " capa-hojas-puente" : ""
  }`;
  capaHojas.setAttribute("aria-hidden", "true");
  contenedorEscenario.insertBefore(capaHojas, personajeImagen);

  programarRafagaHojas(secuenciaAmbienteHojas, capaHojas);
}

function programarRafagaHojas(secuencia, capaHojas) {
  const hojasPuente = misionActual === 7;
  const demora = aleatorioEntre(
    hojasPuente ? intervaloMinimoHojaPuente : intervaloMinimoRafagaHojas,
    hojasPuente ? intervaloMaximoHojaPuente : intervaloMaximoRafagaHojas,
  );

  temporizadorRafagaHojas = setTimeout(() => {
    if (
      secuencia !== secuenciaAmbienteHojas ||
      escenarioActual !== 0 ||
      ![2, 7].includes(misionActual) ||
      !pantallaJuego.classList.contains("activa") ||
      !capaHojas.isConnected
    ) {
      detenerAmbienteHojas();
      return;
    }

    crearRafagaHojas(capaHojas);
    programarRafagaHojas(secuencia, capaHojas);
  }, demora);
}

function crearRafagaHojas(capaHojas) {
  const ancho = capaHojas.clientWidth;
  const alto = capaHojas.clientHeight;
  const cantidadHojas =
    misionActual === 7
      ? Math.floor(aleatorioEntre(1, 3))
      : Math.floor(aleatorioEntre(4, 9));

  for (let indice = 0; indice < cantidadHojas; indice++) {
    crearHojaViento(capaHojas, ancho, alto);
  }
}

function crearHojaViento(capaHojas, ancho, alto) {
  const hoja = document.createElement("img");
  const hojasPuente = misionActual === 7;
  const entradas = hojasPuente
    ? ["izquierda", "derecha"]
    : ["arriba", "izquierda", "derecha"];
  const entrada = entradas[Math.floor(Math.random() * entradas.length)];
  const duracion = hojasPuente
    ? aleatorioEntre(6500, 9000)
    : aleatorioEntre(4800, 7200);
  const retraso = hojasPuente ? aleatorioEntre(0, 350) : aleatorioEntre(0, 700);
  const tamano = hojasPuente ? aleatorioEntre(18, 30) : aleatorioEntre(28, 54);
  let inicioX;
  let inicioY;
  let finX;
  let finY;

  if (entrada === "arriba") {
    inicioX = aleatorioEntre(0, ancho);
    inicioY = -tamano - 10;
    finX = inicioX + aleatorioEntre(-ancho * 0.3, ancho * 0.3);
    finY = alto + tamano + 20;
  } else if (entrada === "izquierda") {
    inicioX = -tamano - 10;
    inicioY = hojasPuente
      ? aleatorioEntre(alto * 0.34, alto * 0.52)
      : aleatorioEntre(0, alto * 0.7);
    finX = ancho + tamano + 20;
    finY = inicioY +
      (hojasPuente
        ? aleatorioEntre(-alto * 0.04, alto * 0.12)
        : aleatorioEntre(alto * 0.12, alto * 0.42));
  } else {
    inicioX = ancho + tamano + 10;
    inicioY = hojasPuente
      ? aleatorioEntre(alto * 0.34, alto * 0.52)
      : aleatorioEntre(0, alto * 0.7);
    finX = -tamano - 20;
    finY = inicioY +
      (hojasPuente
        ? aleatorioEntre(-alto * 0.04, alto * 0.12)
        : aleatorioEntre(alto * 0.12, alto * 0.42));
  }

  const recorridoX = finX - inicioX;
  const recorridoY = finY - inicioY;
  const onda = aleatorioEntre(hojasPuente ? 8 : 18, hojasPuente ? 20 : 48) *
    (Math.random() < 0.5 ? -1 : 1);
  const rotacionInicial = aleatorioEntre(-180, 180);
  const giroTotal =
    aleatorioEntre(420, 900) * (Math.random() < 0.5 ? -1 : 1);

  const numeroHoja = Math.random() < 0.5 ? 1 : 2;
  hoja.className = `hoja-viento hoja-viento-${numeroHoja}${
    hojasPuente ? " hoja-viento-puente" : ""
  }`;
  hoja.alt = "";
  hoja.draggable = false;
  hoja.src = `assets/images/elementos/hoja-${numeroHoja}.png?v=20260717-hojas-transparentes-1`;
  hoja.style.left = `${inicioX}px`;
  hoja.style.top = `${inicioY}px`;
  hoja.style.width = `${tamano}px`;
  hoja.style.setProperty("--duracion-hoja", `${duracion}ms`);
  hoja.style.setProperty("--retraso-hoja", `${retraso}ms`);

  [0.25, 0.5, 0.75, 1].forEach((progreso, indice) => {
    const sufijo = ["25", "50", "75", "100"][indice];
    const desviacion = progreso === 1 ? 0 : onda * (indice % 2 === 0 ? 1 : -1);
    hoja.style.setProperty(
      `--hoja-x-${sufijo}`,
      `${recorridoX * progreso}px`,
    );
    hoja.style.setProperty(
      `--hoja-y-${sufijo}`,
      `${recorridoY * progreso + desviacion}px`,
    );
    hoja.style.setProperty(
      `--hoja-rotacion-${sufijo}`,
      `${rotacionInicial + giroTotal * progreso}deg`,
    );
  });

  hoja.style.setProperty("--hoja-rotacion-inicial", `${rotacionInicial}deg`);
  capaHojas.appendChild(hoja);

  const eliminarHoja = () => hoja.remove();
  hoja.addEventListener("animationend", eliminarHoja, { once: true });
  setTimeout(eliminarHoja, duracion + retraso + 500);
}

function actualizarTormentaMision() {
  detenerTormenta();

  if (escenarioActual !== 0 || misionActual !== 3) return;

  const capaTormenta = document.createElement("div");
  const lluviaCercana = document.createElement("div");
  const destello = document.createElement("div");
  const secuencia = secuenciaTormenta;

  capaTormenta.className = "capa-tormenta";
  capaTormenta.setAttribute("aria-hidden", "true");
  lluviaCercana.className = "lluvia-cercana";
  destello.className = "destello-rayo";
  capaTormenta.appendChild(lluviaCercana);
  capaTormenta.appendChild(destello);
  contenedorEscenario.appendChild(capaTormenta);

  programarRayo(secuencia, capaTormenta, destello);
}

function actualizarNieblaMision() {
  detenerNiebla();

  if (escenarioActual !== 0 || misionActual !== 4) return;

  const capaNiebla = document.createElement("div");
  const configuraciones = [
    { nombre: "lejana", duracion: [31, 38], retraso: -17 },
    { nombre: "media", duracion: [37, 46], retraso: -29 },
    { nombre: "cercana", duracion: [52, 65], retraso: -41 },
  ];
  const secuencia = secuenciaNiebla;

  capaNiebla.className = "capa-niebla";
  capaNiebla.setAttribute("aria-hidden", "true");

  configuraciones.forEach(({ nombre, duracion, retraso }) => {
    const franja = document.createElement("div");
    franja.className = `niebla niebla-${nombre}`;
    franja.style.setProperty(
      "--duracion-niebla",
      `${aleatorioEntre(duracion[0], duracion[1]).toFixed(2)}s`,
    );
    franja.style.setProperty(
      "--retraso-niebla",
      `${retraso - aleatorioEntre(0, 11).toFixed(2)}s`,
    );
    franja.style.setProperty(
      "--desfase-vertical-niebla",
      `${aleatorioEntre(-2.5, 2.5).toFixed(2)}%`,
    );

    if (!prefiereReducirMovimiento.matches) {
      franja.addEventListener("animationiteration", () => {
        if (secuencia !== secuenciaNiebla || !franja.isConnected) return;

        const variacion = aleatorioEntre(0.94, 1.07);
        const nuevaDuracion =
          aleatorioEntre(duracion[0], duracion[1]) * variacion;
        franja.style.setProperty(
          "--duracion-niebla",
          `${nuevaDuracion.toFixed(2)}s`,
        );
        franja.style.setProperty(
          "--variacion-opacidad-niebla",
          aleatorioEntre(-0.025, 0.025).toFixed(3),
        );
      });
    }

    capaNiebla.appendChild(franja);
  });

  contenedorEscenario.insertBefore(capaNiebla, personajeImagen);
  programarClaroSenderoNiebla(secuencia, capaNiebla);
}

function programarClaroSenderoNiebla(secuencia, capaNiebla) {
  const demora = aleatorioEntre(
    intervaloMinimoClaroNiebla,
    intervaloMaximoClaroNiebla,
  );

  temporizadorNiebla = setTimeout(() => {
    if (
      secuencia !== secuenciaNiebla ||
      escenarioActual !== 0 ||
      misionActual !== 4 ||
      !pantallaJuego.classList.contains("activa") ||
      !capaNiebla.isConnected
    ) {
      detenerNiebla();
      return;
    }

    capaNiebla.classList.add("sendero-despejado");

    temporizadorNiebla = setTimeout(() => {
      if (secuencia !== secuenciaNiebla || !capaNiebla.isConnected) return;

      capaNiebla.classList.remove("sendero-despejado");
      programarClaroSenderoNiebla(secuencia, capaNiebla);
    }, aleatorioEntre(duracionMinimaClaroNiebla, duracionMaximaClaroNiebla));
  }, demora);
}

function detenerNiebla() {
  secuenciaNiebla++;

  if (temporizadorNiebla) {
    clearTimeout(temporizadorNiebla);
    temporizadorNiebla = null;
  }

  contenedorEscenario
    .querySelectorAll(".capa-niebla")
    .forEach((capa) => capa.remove());
}

function actualizarMiradasLobosMision() {
  detenerMiradasLobos();

  if (escenarioActual !== 0 || misionActual !== 5) return;

  const capaMiradas = document.createElement("div");
  const posicionesMiradas = [
    { x: 23.9, y: 33.4 },
    { x: 81.65, y: 38.55 },
    { x: 45.3, y: 45.6 },
    { x: 53.2, y: 47.25 },
  ];
  const secuencia = secuenciaMiradasLobos;

  capaMiradas.className = "capa-miradas-lobos";
  capaMiradas.setAttribute("aria-hidden", "true");

  posicionesMiradas.forEach(({ x, y }, indice) => {
    const mirada = document.createElement("div");
    mirada.className = "mirada-lobo";
    mirada.style.left = `${x}%`;
    mirada.style.top = `${y}%`;
    mirada.style.setProperty(
      "--duracion-respiracion-lobo",
      `${aleatorioEntre(6.2, 9.4).toFixed(2)}s`,
    );
    mirada.style.setProperty(
      "--retraso-respiracion-lobo",
      `${-aleatorioEntre(0, 8).toFixed(2)}s`,
    );
    mirada.dataset.indiceLobo = indice;
    capaMiradas.appendChild(mirada);
  });

  contenedorEscenario.insertBefore(capaMiradas, personajeImagen);
  programarBrilloOjosLobos(secuencia, capaMiradas);
}

function programarBrilloOjosLobos(secuencia, capaMiradas) {
  const demora = aleatorioEntre(
    intervaloMinimoMiradaLobos,
    intervaloMaximoMiradaLobos,
  );

  temporizadorMiradasLobos = setTimeout(() => {
    if (
      secuencia !== secuenciaMiradasLobos ||
      escenarioActual !== 0 ||
      misionActual !== 5 ||
      !pantallaJuego.classList.contains("activa") ||
      !capaMiradas.isConnected
    ) {
      detenerMiradasLobos();
      return;
    }

    const miradas = [...capaMiradas.querySelectorAll(".mirada-lobo")];
    const cantidad = Math.random() < 0.38 ? 2 : 1;
    let indiceInicial = Math.floor(Math.random() * miradas.length);

    if (indiceInicial === ultimoLoboIluminado) {
      indiceInicial = (indiceInicial + 1 + Math.floor(Math.random() * 3)) % 4;
    }

    const indices = [indiceInicial];

    if (cantidad === 2) {
      let segundoIndice;
      do {
        segundoIndice = Math.floor(Math.random() * miradas.length);
      } while (segundoIndice === indiceInicial);
      indices.push(segundoIndice);
    }

    ultimoLoboIluminado = indiceInicial;
    const duracion = aleatorioEntre(
      duracionMinimaMiradaLobos,
      duracionMaximaMiradaLobos,
    );

    indices.forEach((indice) => {
      miradas[indice].style.setProperty(
        "--duracion-brillo-lobo",
        `${duracion.toFixed(0)}ms`,
      );
      miradas[indice].classList.add("brillando");
    });

    temporizadorMiradasLobos = setTimeout(() => {
      if (secuencia !== secuenciaMiradasLobos || !capaMiradas.isConnected) {
        return;
      }

      indices.forEach((indice) => miradas[indice].classList.remove("brillando"));
      programarBrilloOjosLobos(secuencia, capaMiradas);
    }, duracion);
  }, demora);
}

function detenerMiradasLobos() {
  secuenciaMiradasLobos++;
  ultimoLoboIluminado = -1;

  if (temporizadorMiradasLobos) {
    clearTimeout(temporizadorMiradasLobos);
    temporizadorMiradasLobos = null;
  }

  contenedorEscenario
    .querySelectorAll(".capa-miradas-lobos")
    .forEach((capa) => capa.remove());
}

function actualizarPresenciaBosqueMision() {
  detenerPresenciaBosque();

  if (escenarioActual !== 0 || misionActual !== 6) return;

  const capaPresencia = document.createElement("div");
  const secuencia = secuenciaPresenciaBosque;

  capaPresencia.className = "capa-presencia-bosque";
  capaPresencia.setAttribute("aria-hidden", "true");
  contenedorEscenario.insertBefore(capaPresencia, personajeImagen);

  if (!imagenSiluetaBosque) {
    imagenSiluetaBosque = new Image();
    imagenSiluetaBosque.src =
      "assets/images/elementos/silueta-bosque-prohibido.png";
  }

  programarPresenciaFugazBosque(secuencia, capaPresencia);
}

function programarPresenciaFugazBosque(
  secuencia,
  capaPresencia,
  demoraForzada = null,
) {
  const demora =
    demoraForzada ??
    aleatorioEntre(
      intervaloMinimoPresenciaBosque,
      intervaloMaximoPresenciaBosque,
    );

  temporizadorPresenciaBosque = setTimeout(() => {
    if (
      secuencia !== secuenciaPresenciaBosque ||
      escenarioActual !== 0 ||
      misionActual !== 6 ||
      !pantallaJuego.classList.contains("activa") ||
      !capaPresencia.isConnected
    ) {
      detenerPresenciaBosque();
      return;
    }

    if (contenedorEscenario.querySelector(".descenso-arana")) {
      programarPresenciaFugazBosque(
        secuencia,
        capaPresencia,
        aleatorioEntre(4000, 8000),
      );
      return;
    }

    const duracion = crearPresenciaFugazBosque(capaPresencia);

    temporizadorPresenciaBosque = setTimeout(() => {
      if (
        secuencia !== secuenciaPresenciaBosque ||
        !capaPresencia.isConnected
      ) {
        return;
      }

      capaPresencia.querySelector(".presencia-fugaz")?.remove();
      programarPresenciaFugazBosque(secuencia, capaPresencia);
    }, duracion + 100);
  }, demora);
}

function crearPresenciaFugazBosque(capaPresencia) {
  const rutas = [
    { x: 30, y: 35, dx: 8, dy: 2, altura: 27, opacidad: 0.22 },
    { x: 69, y: 37, dx: -9, dy: 1, altura: 25, opacidad: 0.19 },
    { x: 41, y: 48, dx: 11, dy: -1, altura: 31, opacidad: 0.16 },
    { x: 60, y: 45, dx: -10, dy: 2, altura: 28, opacidad: 0.18 },
  ];
  let indiceRuta = Math.floor(Math.random() * rutas.length);

  if (indiceRuta === ultimaRutaPresenciaBosque) {
    indiceRuta = (indiceRuta + 1 + Math.floor(Math.random() * 3)) % rutas.length;
  }

  ultimaRutaPresenciaBosque = indiceRuta;
  const ruta = rutas[indiceRuta];
  const duracion = aleatorioEntre(
    duracionMinimaPresenciaBosque,
    duracionMaximaPresenciaBosque,
  );
  const silueta = imagenSiluetaBosque.cloneNode();

  silueta.className = "presencia-fugaz";
  silueta.alt = "";
  silueta.draggable = false;
  silueta.style.left = `${ruta.x}%`;
  silueta.style.top = `${ruta.y}%`;
  silueta.style.height = `${ruta.altura}%`;
  silueta.style.setProperty(
    "--recorrido-x-presencia",
    `${(capaPresencia.clientWidth * ruta.dx) / 100}px`,
  );
  silueta.style.setProperty("--recorrido-y-presencia", `${ruta.dy}px`);
  silueta.style.setProperty("--opacidad-presencia", ruta.opacidad);
  silueta.style.setProperty("--duracion-presencia", `${duracion.toFixed(0)}ms`);
  capaPresencia.appendChild(silueta);

  return duracion;
}

function detenerPresenciaBosque() {
  secuenciaPresenciaBosque++;
  ultimaRutaPresenciaBosque = -1;

  if (temporizadorPresenciaBosque) {
    clearTimeout(temporizadorPresenciaBosque);
    temporizadorPresenciaBosque = null;
  }

  contenedorEscenario
    .querySelectorAll(".capa-presencia-bosque")
    .forEach((capa) => capa.remove());
}

function actualizarAranaBosqueMision() {
  detenerAranaBosque();

  if (escenarioActual !== 0 || misionActual !== 6) return;

  const capaAranas = document.createElement("div");
  const secuencia = secuenciaAranaBosque;

  capaAranas.className = "capa-aranas-bosque";
  capaAranas.setAttribute("aria-hidden", "true");
  contenedorEscenario.insertBefore(capaAranas, personajeImagen);

  if (!imagenAranaBosque) {
    imagenAranaBosque = new Image();
    imagenAranaBosque.src =
      "assets/images/elementos/arana-bosque-prohibido.png";
  }

  programarDescensoAranaBosque(secuencia, capaAranas);
}

function programarDescensoAranaBosque(
  secuencia,
  capaAranas,
  demoraForzada = null,
) {
  const demora =
    demoraForzada ??
    aleatorioEntre(intervaloMinimoAranaBosque, intervaloMaximoAranaBosque);

  temporizadorAranaBosque = setTimeout(() => {
    if (
      secuencia !== secuenciaAranaBosque ||
      escenarioActual !== 0 ||
      misionActual !== 6 ||
      !pantallaJuego.classList.contains("activa") ||
      !capaAranas.isConnected
    ) {
      detenerAranaBosque();
      return;
    }

    if (contenedorEscenario.querySelector(".presencia-fugaz")) {
      programarDescensoAranaBosque(
        secuencia,
        capaAranas,
        aleatorioEntre(4000, 8000),
      );
      return;
    }

    const duracion = crearDescensoAranaBosque(capaAranas);

    temporizadorAranaBosque = setTimeout(() => {
      if (secuencia !== secuenciaAranaBosque || !capaAranas.isConnected) {
        return;
      }

      capaAranas.querySelector(".descenso-arana")?.remove();
      programarDescensoAranaBosque(secuencia, capaAranas);
    }, duracion + 100);
  }, demora);
}

function crearDescensoAranaBosque(capaAranas) {
  const zonas = [
    { x: 23, descenso: 37 },
    { x: 39, descenso: 44 },
    { x: 59, descenso: 34 },
    { x: 76, descenso: 42 },
  ];
  let indiceZona = Math.floor(Math.random() * zonas.length);

  if (indiceZona === ultimaZonaAranaBosque) {
    indiceZona = (indiceZona + 1 + Math.floor(Math.random() * 3)) % zonas.length;
  }

  ultimaZonaAranaBosque = indiceZona;
  const zona = zonas[indiceZona];
  const duracion = aleatorioEntre(
    duracionMinimaAranaBosque,
    duracionMaximaAranaBosque,
  );
  const descenso = document.createElement("div");
  const arana = imagenAranaBosque.cloneNode();

  descenso.className = "descenso-arana";
  descenso.style.left = `${zona.x}%`;
  descenso.style.setProperty(
    "--longitud-hilo-arana",
    `${(capaAranas.clientHeight * zona.descenso) / 100}px`,
  );
  descenso.style.setProperty(
    "--duracion-descenso-arana",
    `${duracion.toFixed(0)}ms`,
  );
  descenso.style.setProperty(
    "--retraso-balanceo-arana",
    `${-aleatorioEntre(0, 2.8).toFixed(2)}s`,
  );

  arana.className = "arana-bosque";
  arana.alt = "";
  arana.draggable = false;
  descenso.appendChild(arana);
  capaAranas.appendChild(descenso);

  return duracion;
}

function detenerAranaBosque() {
  secuenciaAranaBosque++;
  ultimaZonaAranaBosque = -1;

  if (temporizadorAranaBosque) {
    clearTimeout(temporizadorAranaBosque);
    temporizadorAranaBosque = null;
  }

  contenedorEscenario
    .querySelectorAll(".capa-aranas-bosque")
    .forEach((capa) => capa.remove());
}

function programarRayo(secuencia, capaTormenta, destello) {
  const demora = aleatorioEntre(intervaloMinimoRayo, intervaloMaximoRayo);

  temporizadorRayo = setTimeout(() => {
    temporizadorRayo = null;

    if (
      secuencia !== secuenciaTormenta ||
      escenarioActual !== 0 ||
      misionActual !== 3 ||
      !pantallaJuego.classList.contains("activa") ||
      !capaTormenta.isConnected
    ) {
      detenerTormenta();
      return;
    }

    activarDestelloRayo(destello);
    programarRayo(secuencia, capaTormenta, destello);
  }, demora);
}

function activarDestelloRayo(destello) {
  destello.classList.remove("activo");
  void destello.offsetWidth;
  destello.classList.add("activo");
  reproducirTruenoRayo();
}

function reproducirTruenoRayo() {
  // Punto de sincronizacion futuro: reproducir aqui el archivo independiente
  // assets/sounds/trueno.mp3 cuando ese recurso sea incorporado al proyecto.
}

function detenerTormenta() {
  secuenciaTormenta++;

  if (temporizadorRayo) {
    clearTimeout(temporizadorRayo);
    temporizadorRayo = null;
  }

  contenedorEscenario
    .querySelectorAll(".capa-tormenta")
    .forEach((capa) => capa.remove());
}

function aleatorioEntre(minimo, maximo) {
  return minimo + Math.random() * (maximo - minimo);
}

function obtenerSrcExplorador(estado) {
  return `assets/images/personajes/explorador-${estado}.png`;
}

function cargarImagenExplorador(estado) {
  if (imagenesExploradorPrecargadas.has(estado)) {
    return imagenesExploradorPrecargadas.get(estado);
  }

  const img = new Image();
  const promesaCarga = new Promise((resolve) => {
    img.onload = () => {
      if (!img.decode) {
        resolve();
        return;
      }

      img.decode().then(resolve).catch(resolve);
    };
    img.onerror = resolve;
  });

  img.src = obtenerSrcExplorador(estado);
  imagenesExploradorPrecargadas.set(estado, promesaCarga);

  return promesaCarga;
}

function precargarImagenesBosque() {
  for (let i = 0; i <= 10; i++) {
    const img = new Image();
    img.src = `assets/images/fondos/bosque-${i}.png`;
  }
}

function precargarImagenesExplorador() {
  [
    "acierto",
    "celebrando",
    "desanimado",
    "feliz",
    "nervioso",
    "pensando",
    "preocupado",
    "triste",
  ].forEach((estado) => {
    cargarImagenExplorador(estado);
  });
}

function precargarImagenesHojas() {
  [1, 2].forEach((numero) => {
    const img = new Image();
    img.src = `assets/images/elementos/hoja-${numero}.png?v=20260717-hojas-transparentes-1`;
  });
}

function precargarRecursosCinematicaSantuario() {
  [
    "explorador-acercandose-cristal.png",
    "explorador-brazo-extendido.png",
    "explorador-sosteniendo-cristal.png",
    "cristal-sabiduria-esmeralda.png",
  ].forEach((nombre) => {
    const img = new Image();
    img.src = `assets/images/elements/${nombre}`;
  });
}
