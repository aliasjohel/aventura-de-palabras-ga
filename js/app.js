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
const pantallaMenu = document.getElementById("pantallaMenu");
const pantallaJuego = document.getElementById("pantallaJuego");

const btnJugar = document.getElementById("btnJugar");
const btnSalirJuego = document.getElementById("btnSalirJuego");
const btnMisionAnterior = document.getElementById("btnMisionAnterior");
const btnMisionSiguiente = document.getElementById("btnMisionSiguiente");

const categoriaActual = document.getElementById("categoriaActual");
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

function actualizarVistaMisionDev() {
  detenerPolvoImpacto();
  detenerEfectos();
  actualizarAmbienteMision();

  const escenario = aventura[escenarioActual];

  categoriaActual.textContent = `${escenario.nombre}
 | Misión ${misionActual + 1}
 | Desafío ${desafioActual} de ${desafiosPorMision}`;

  cancelarRetornoEstadoBaseExplorador();
  actualizarEscenaPorMision();
  actualizarAmbienteHojasMision();
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
  detenerPolvoImpacto();
  detenerAmbienteHojas();
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

    reproducirEfectoAmbiental("crujidoPuente");
    programarCrujidoPuente();
  }, demora);
}

function cancelarCrujidoPuente() {
  if (!temporizadorCrujidoPuente) return;

  clearTimeout(temporizadorCrujidoPuente);
  temporizadorCrujidoPuente = null;
}

function reproducirEfectoAmbiental(nombre) {
  const sonido = sonidos[nombre];
  if (!sonido) return;

  sonido.currentTime = 0;
  sonido.play().catch((error) => {
    logAudio(`${nombre} play bloqueado`, error);
  });
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
  detenerAmbienteHojas();
  detenerEfectos();
  actualizarAmbienteMision();

  desafioActual = desafiosCompletados + 1;
  actualizarControlesDev();

  const escenario = aventura[escenarioActual];

  categoriaActual.textContent = `${escenario.nombre}
 | Misión ${misionActual + 1}
 | Desafío ${desafioActual} de ${desafiosPorMision}`;

  const palabraSeleccionada = obtenerPalabraAleatoria();

  palabraSecreta = palabraSeleccionada.palabra;

  pistaActual = palabraSeleccionada.pista;

  letrasElegidas = [];
  intentos = 6;
  cancelarRetornoEstadoBaseExplorador();

  actualizarVidas();
  personaje.textContent = "😄";
  actualizarEscenaPorMision();
  actualizarAmbienteHojasMision();
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
  detenerAmbienteHojas();

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

function actualizarAmbienteHojasMision() {
  detenerAmbienteHojas();

  if (
    escenarioActual !== 0 ||
    misionActual !== 2 ||
    prefiereReducirMovimiento.matches
  ) {
    return;
  }

  const capaHojas = document.createElement("div");
  capaHojas.className = "capa-hojas-viento";
  capaHojas.setAttribute("aria-hidden", "true");
  contenedorEscenario.insertBefore(capaHojas, personajeImagen);

  programarRafagaHojas(secuenciaAmbienteHojas, capaHojas);
}

function programarRafagaHojas(secuencia, capaHojas) {
  const demora = aleatorioEntre(
    intervaloMinimoRafagaHojas,
    intervaloMaximoRafagaHojas,
  );

  temporizadorRafagaHojas = setTimeout(() => {
    if (
      secuencia !== secuenciaAmbienteHojas ||
      escenarioActual !== 0 ||
      misionActual !== 2 ||
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
  const cantidadHojas = Math.floor(aleatorioEntre(4, 9));

  for (let indice = 0; indice < cantidadHojas; indice++) {
    crearHojaViento(capaHojas, ancho, alto);
  }
}

function crearHojaViento(capaHojas, ancho, alto) {
  const hoja = document.createElement("img");
  const entrada = ["arriba", "izquierda", "derecha"][
    Math.floor(Math.random() * 3)
  ];
  const duracion = aleatorioEntre(4800, 7200);
  const retraso = aleatorioEntre(0, 700);
  const tamano = aleatorioEntre(28, 54);
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
    inicioY = aleatorioEntre(0, alto * 0.7);
    finX = ancho + tamano + 20;
    finY = inicioY + aleatorioEntre(alto * 0.12, alto * 0.42);
  } else {
    inicioX = ancho + tamano + 10;
    inicioY = aleatorioEntre(0, alto * 0.7);
    finX = -tamano - 20;
    finY = inicioY + aleatorioEntre(alto * 0.12, alto * 0.42);
  }

  const recorridoX = finX - inicioX;
  const recorridoY = finY - inicioY;
  const onda = aleatorioEntre(18, 48) * (Math.random() < 0.5 ? -1 : 1);
  const rotacionInicial = aleatorioEntre(-180, 180);
  const giroTotal =
    aleatorioEntre(420, 900) * (Math.random() < 0.5 ? -1 : 1);

  const numeroHoja = Math.random() < 0.5 ? 1 : 2;
  hoja.className = `hoja-viento hoja-viento-${numeroHoja}`;
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
