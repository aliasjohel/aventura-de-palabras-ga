// ====================
// Elementos del DOM
// ====================
const btnSiguiente = document.getElementById("btnSiguiente");
const btnReintentar = document.getElementById("btnReintentar");
const btnPista = document.getElementById("btnPista");
const textoPista = document.getElementById("textoPista");
const textoMonedas = document.getElementById("textoMonedas");

const textoXP = document.getElementById("textoXP");
const pantallaMenu = document.getElementById("pantallaMenu");
const pantallaJuego = document.getElementById("pantallaJuego");

const btnJugar = document.getElementById("btnJugar");
const btnSalirJuego = document.getElementById("btnSalirJuego");

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
};

let colaSonidos = [];
let audioDesbloqueado = false;
const debugAudio = true;

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
const duracionFadeEscenarioSalida = 250;
const duracionFadeEscenarioEntrada = 350;
const prefiereReducirMovimiento = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

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
    texto: "El explorador entra al bosque dispuesto a comenzar su aventura.",
  },
  {
    capitulo: "Misión 2",
    titulo: "El Sendero Bloqueado",
    texto:
      "Un enorme estruendo rompe el silencio. Una gran piedra cae y bloquea el sendero.",
  },
  {
    capitulo: "Misión 3",
    titulo: "Entre las Ramas",
    texto:
      "Grandes ramas caídas dificultan el paso y obligan al explorador a avanzar con cuidado.",
  },
  {
    capitulo: "Misión 4",
    titulo: "La Tormenta",
    texto:
      "La lluvia comienza a caer y el camino se vuelve cada vez más resbaladizo.",
  },
  {
    capitulo: "Misión 5",
    titulo: "La Niebla",
    texto: "Una niebla espesa cubre el bosque y apenas permite ver el sendero.",
  },
  {
    capitulo: "Misión 6",
    titulo: "El Aullido",
    texto:
      "A lo lejos se escuchan lobos. El explorador deberá seguir adelante con valentía.",
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
let desafioActual = 1;
let desafiosCompletados = 0;
let sonidoNarrativoPendiente = "";
let historiaMisionPendiente = false;
let transicionEscenaActiva = false;
const desafiosPorMision = 3;

// ====================
// Eventos
// ====================
btnPista.addEventListener("click", () => {
  cambiarPersonaje("pensando");

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

    await cambiarEscenarioConTransicion();

    historiaMisionPendiente = false;

    if (sonidoNarrativoPendiente) {
      reproducirSonido(sonidoNarrativoPendiente);
      sonidoNarrativoPendiente = "";
    }

    await esperarFadeEscenarioEntrada();
  } finally {
    contenedorEscenario.classList.remove(
      "cambiando-escena",
      "apareciendo-escena",
    );
    btnContinuarHistoria.disabled = false;
    transicionEscenaActiva = false;
  }
});

btnJugar.addEventListener("click", () => {
  iniciarMisionAventura();
});

btnSalirJuego.addEventListener("click", () => {
  mostrarPantalla(pantallaMenu);
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

  escenarioActual = 0;
  misionActual = 0;
  desafioActual = 1;
  desafiosCompletados = 0;
  historiaMisionPendiente = false;

  monedas = 0;
  experiencia = 0;

  palabrasUsadasEnMision = [];
  sonidoNarrativoPendiente = "";
  historiaMisionPendiente = false;

  actualizarJugador();
  actualizarMenuPrincipal();

  iniciarMisionAventura();
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
    cambiarPersonaje("feliz");
    mensajePersonaje.textContent = "¡Bien! Esa letra está.";

    if (!palabraCompleta()) {
      animarPersonajeTemporal("reaccion-acierto");
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
    animarPersonajeTemporal("reaccion-error");
    mensajePersonaje.textContent = "Uy... esa letra no está.";
  }

  mostrarPalabra();
  verificarEstado();
}

function verificarEstado() {
  const gano = palabraCompleta();

  if (gano) {
    personaje.textContent = "🥳";
    cambiarPersonaje("celebrando");
    mensajePersonaje.textContent = "🌟 ¡Desafío superado!";
    monedas += 10;
    experiencia += 20;

    actualizarJugador();
    sonidoNarrativoPendiente = avanzarMision();
    reproducirSecuenciaSonidos(["acertar", "moneda", "victoria"]);
    guardarProgreso();
    bloquearTeclado();
    btnSiguiente.classList.remove("oculto");
  }

  if (intentos === 0) {
    personaje.textContent = "😵";
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

  iniciarMisionAventura();
  await esperarCargaFondoEscenario();

  contenedorEscenario.classList.add("apareciendo-escena");
  contenedorEscenario.classList.remove("cambiando-escena");
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

  Object.entries(sonidos).forEach(([nombre, audio]) => {
    if (esSonidoEventoBosque(nombre)) {
      logAudioEvento(`${nombre} incluido en desbloquearAudio`, {
        existeEnSonidos: Boolean(sonidos[nombre]),
        src: audio.src,
      });
    }

    audio.volume = 0;
    audio
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
}

function detenerSonidos() {
  colaSonidos = [];

  Object.values(sonidos).forEach((sonido) => {
    sonido.onended = null;
    sonido.pause();
    sonido.currentTime = 0;
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

  detenerSonidos();
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
  detenerSonidos();
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
  const clasesAnimacion = [
    "reaccion-acierto",
    "reaccion-error",
    "reaccion-derrota",
  ];

  personajeImagen.classList.remove(...clasesAnimacion);
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

function iniciarMisionAventura() {
  detenerSonidos();

  desafioActual = desafiosCompletados + 1;

  const escenario = aventura[escenarioActual];

  categoriaActual.textContent = `${escenario.nombre}
 | Misión ${misionActual + 1}
 | Desafío ${desafioActual} de ${desafiosPorMision}`;

  const palabraSeleccionada = obtenerPalabraAleatoria();

  palabraSecreta = palabraSeleccionada.palabra;

  pistaActual = palabraSeleccionada.pista;

  letrasElegidas = [];
  intentos = 6;

  actualizarVidas();
  personaje.textContent = "😄";
  cambiarPersonaje("feliz");
  actualizarEscenaPorMision();
  mensajePersonaje.textContent = "¡Comienza la expedición!";
  teclado.innerHTML = "";
  textoPista.classList.add("oculto");
  textoPista.textContent = "";
  btnPista.disabled = false;
  btnSiguiente.classList.add("oculto");

  mostrarPalabra();
  crearTeclado();
  mostrarPantalla(pantallaJuego);
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
}

function guardarProgreso() {
  const progreso = {
    escenarioActual,
    misionActual,
    desafioActual,
    desafiosCompletados,
    monedas,
    experiencia,
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
precargarImagenesBosque();
precargarSonidos();

function cambiarPersonaje(estado) {
  personajeImagen.src = `assets/images/personajes/explorador-${estado}.png`;

  personajeImagen.classList.remove("celebrando");

  if (estado === "celebrando") {
    personajeImagen.classList.add("celebrando");
  }
}

function actualizarEscenaPorMision() {
  const escenasPorEscenario = [
    [
      {
        fondo: "bosque-0.png",
        texto: "🌲 El camino del bosque está tranquilo...",
        expresion: "feliz",
      },
      {
        fondo: "bosque-2.png",
        texto: "🪨 Una piedra cayó en el sendero.",
        expresion: "feliz",
      },
      {
        fondo: "bosque-3.png",
        texto: "🌿 Unas ramas bloquean el camino.",
        expresion: "nervioso",
      },
      {
        fondo: "bosque-4.png",
        texto: "🌧️ Comienza a llover en el bosque.",
        expresion: "nervioso",
      },
      {
        fondo: "bosque-5.png",
        texto: "🌫️ La niebla cubre el sendero.",
        expresion: "preocupado",
      },
      {
        fondo: "bosque-6.png",
        texto: "🐺 Se escuchan lobos a lo lejos...",
        expresion: "preocupado",
      },
    ],
  ];

  const escenasPorMision =
    escenasPorEscenario[escenarioActual] || escenasPorEscenario[0];
  const escena =
    escenasPorMision[Math.min(misionActual, escenasPorMision.length - 1)];

  fondoEscenario.src = `assets/images/fondos/${escena.fondo}`;
  escenaAventura.textContent = escena.texto;

  if (escena.expresion) {
    cambiarPersonaje(escena.expresion);
  }
}

function precargarImagenesBosque() {
  for (let i = 0; i <= 6; i++) {
    const img = new Image();
    img.src = `assets/images/fondos/bosque-${i}.png`;
  }
}
