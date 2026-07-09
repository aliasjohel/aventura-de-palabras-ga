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

const sonidosEventosPorError = {
  1: "piedra",
  2: "ramas",
  3: "lluvia",
  4: "niebla",
  5: "lobos",
};

let ultimoEventoSonoroActivo = "";

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

  iniciarMisionAventura();
});

btnJugar.addEventListener("click", () => {
  iniciarMisionAventura();
});

btnSalirJuego.addEventListener("click", () => {
  mostrarPantalla(pantallaMenu);
});

btnReintentar.addEventListener("click", () => {
  btnReintentar.classList.add("oculto");

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

  monedas = 0;
  experiencia = 0;

  palabrasUsadasEnMision = [];

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
      reproducirSonido("acertar");
    }
  } else {
    boton.classList.add("incorrecta");
    intentos--;

    actualizarVidas();
    actualizarFondoBosque();
    actualizarEscenaAventura();

    if (intentos > 0) {
      reproducirFeedbackErrorAventura();
    }

    personaje.textContent = intentos <= 2 ? "😨" : "😕";
    if (intentos <= 2) {
      cambiarPersonaje("preocupado");
    }
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
    reproducirSecuenciaSonidos(["acertar", "moneda", "victoria"]);

    actualizarJugador();
    avanzarMision();
    guardarProgreso();
    bloquearTeclado();
    btnSiguiente.classList.remove("oculto");
  }

  if (intentos === 0) {
    personaje.textContent = "😵";
    cambiarPersonaje("triste");
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
    audio.volume = 0;
    audio
      .play()
      .then(() => {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 1;
        audioDesbloqueado = true;
        logAudio(`${nombre} desbloqueado`);
      })
      .catch((error) => {
        audio.volume = 1;
        logAudio(`${nombre} no se pudo desbloquear`, error);
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

  if (!sonido) return;

  detenerSonidos();
  sonido.currentTime = 0;

  sonido
    .play()
    .then(() => {
      logAudio(`${nombre} reproduciendo`, {
        audioDesbloqueado,
        readyState: sonido.readyState,
        networkState: sonido.networkState,
      });
    })
    .catch(() => {
      // Algunos navegadores bloquean audio hasta la primera interaccion.
      logAudio(`${nombre} play bloqueado`, {
        audioDesbloqueado,
        readyState: sonido.readyState,
        networkState: sonido.networkState,
        error: sonido.error,
      });
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

function reproducirFeedbackErrorAventura() {
  const errores = 6 - intentos;
  const nombreSonido = sonidosEventosPorError[errores];

  if (!nombreSonido || ultimoEventoSonoroActivo === nombreSonido) {
    reproducirSonido("error");
    return;
  }

  ultimoEventoSonoroActivo = nombreSonido;
  reproducirSecuenciaSonidos(["error", nombreSonido]);
}

function logAudio(mensaje, detalle = "") {
  if (!debugAudio) return;

  console.log(`[audio] ${mensaje}`, detalle);
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
  ultimoEventoSonoroActivo = "";

  actualizarVidas();
  actualizarFondoBosque();
  actualizarEscenaAventura();
  personaje.textContent = "😄";
  cambiarPersonaje("feliz");
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
    return;
  }

  desafiosCompletados = 0;
  palabrasUsadasEnMision = [];

  misionActual++;
  mensajePersonaje.textContent = "🏆 ¡Misión completada!";

  if (misionActual >= 10) {
    misionActual = 0;

    escenarioActual++;

    if (escenarioActual >= aventura.length) {
      escenarioActual = 0;

      mensajePersonaje.textContent = "🏆 ¡Completaste toda la aventura!";

      return;
    }

    mensajePersonaje.textContent = `🔓 Nuevo escenario desbloqueado: ${aventura[escenarioActual].nombre}`;
  }
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

function actualizarEscenaAventura() {
  const errores = 6 - intentos;

  const escenas = [
    "🌲 El camino del bosque está tranquilo...",
    "🪨 Una piedra cayó en el sendero.",
    "🌿 Unas ramas bloquean el camino.",
    "🌧️ Comienza a llover en el bosque.",
    "🌫️ La niebla cubre el sendero.",
    "🐺 Se escuchan lobos a lo lejos...",
    "🏕️ La expedición falló. Volvés al campamento.",
  ];

  escenaAventura.textContent = escenas[errores];
}

function cambiarPersonaje(estado) {
  personajeImagen.src = `assets/images/personajes/explorador-${estado}.png`;

  personajeImagen.classList.remove("celebrando");

  if (estado === "celebrando") {
    personajeImagen.classList.add("celebrando");
  }
}

function actualizarFondoBosque() {
  const errores = 6 - intentos;

  const fondosBosque = [
    "bosque-0.png", // 0 errores - camino tranquilo
    "bosque-2.png", // 1 error - piedra
    "bosque-3.png", // 2 errores - ramas
    "bosque-4.png", // 3 errores - lluvia
    "bosque-5.png", // 4 errores - niebla
    "bosque-6.png", // 5 errores - lobos
    "bosque-6.png", // 6 errores - por ahora usamos lobos hasta crear campamento
  ];

  fondoEscenario.src = `assets/images/fondos/${fondosBosque[errores]}`;
}

function precargarImagenesBosque() {
  for (let i = 0; i <= 6; i++) {
    const img = new Image();
    img.src = `assets/images/fondos/bosque-${i}.png`;
  }
}
