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
const pantallaPreparacionVersus = document.getElementById(
  "pantallaPreparacionVersus",
);
const pantallaVersus = document.getElementById("pantallaVersus");

const btnJugar = document.getElementById("btnJugar");
const btnVersus = document.getElementById("btnVersus");
const btnSalirPreparacionVersus = document.getElementById(
  "btnSalirPreparacionVersus",
);
const btnSalirPreparacionVersusVertical = document.getElementById(
  "btnSalirPreparacionVersusVertical",
);
const formPreparacionVersus = document.getElementById("formPreparacionVersus");
const tematicaVersus = document.getElementById("tematicaVersus");
const inputsPalabrasVersus = [...document.querySelectorAll(".input-palabra-versus")];
const btnConfirmarPalabrasVersus = document.getElementById("btnConfirmarPalabrasVersus");
const btnCompletarPalabrasPruebasVersus = document.getElementById(
  "btnCompletarPalabrasPruebasVersus",
);
const esperaRivalVersus = document.getElementById("esperaRivalVersus");
const btnSalirVersus = document.getElementById("btnSalirVersus");
const btnSalirVersusVertical = document.getElementById(
  "btnSalirVersusVertical",
);
const tecladoVersus = document.getElementById("tecladoVersus");
const vidasVersusUno = document.getElementById("vidasVersusUno");
const vidasVersusDos = document.getElementById("vidasVersusDos");
const tiempoVersusUno = document.getElementById("tiempoVersusUno");
const tiempoVersusDos = document.getElementById("tiempoVersusDos");
const textoTiempoVersusUno = document.getElementById("textoTiempoVersusUno");
const textoTiempoVersusDos = document.getElementById("textoTiempoVersusDos");
const mensajeRondaVersus = document.getElementById("mensajeRondaVersus");
const tituloVersus = document.getElementById("tituloVersus");
const tituloProgresoUno = document.getElementById("tituloProgresoUno");
const tituloProgresoDos = document.getElementById("tituloProgresoDos");
const fondoVersus = document.querySelector(".versus-fondo");
const personajeVersusUno = document.getElementById("personajeVersusUno");
const personajeVersusDos = document.getElementById("personajeVersusDos");
const bumeranVersus = document.getElementById("bumeranVersus");
const proyectilMagoVersus = document.getElementById("proyectilMagoVersus");
const cinematicaFinalVersus = document.getElementById("cinematicaFinalVersus");
const fondoCinematicaVersus = document.getElementById("fondoCinematicaVersus");
const particulasEclipseVersus = document.getElementById("particulasEclipseVersus");
const etiquetaCinematicaVersus = document.getElementById("etiquetaCinematicaVersus");
const tituloCinematicaVersus = document.getElementById("tituloCinematicaVersus");
const btnSaltarCinematicaVersus = document.getElementById("btnSaltarCinematicaVersus");
const avisoAvanceVersus = document.getElementById("avisoAvanceVersus");
const resultadoRondaVersus = document.getElementById("resultadoRondaVersus");
const iconoResultadoVersus = document.getElementById("iconoResultadoVersus");
const etiquetaResultadoVersus = document.getElementById("etiquetaResultadoVersus");
const tituloResultadoVersus = document.getElementById("tituloResultadoVersus");
const detalleResultadoVersus = document.getElementById("detalleResultadoVersus");
const btnRevanchaVersus = document.getElementById("btnRevanchaVersus");
const btnMenuResultadoVersus = document.getElementById("btnMenuResultadoVersus");
const herramientasPruebasVersus = document.getElementById("herramientasPruebasVersus");
const btnProbarCinematicaExplorador = document.getElementById(
  "btnProbarCinematicaExplorador",
);
const btnProbarCinematicaMago = document.getElementById("btnProbarCinematicaMago");
const btnProbarCinematicaGuardiana = document.getElementById(
  "btnProbarCinematicaGuardiana",
);
const btnSalirJuego = document.getElementById("btnSalirJuego");
const btnMisionAnterior = document.getElementById("btnMisionAnterior");
const btnMisionSiguiente = document.getElementById("btnMisionSiguiente");
const modoPruebas = document.getElementById("modoPruebas");
const panelModoPruebas = document.getElementById("panelModoPruebas");
const herramientasPruebasJuego = document.getElementById(
  "herramientasPruebasJuego",
);
const selectorMundoPruebas = document.getElementById("selectorMundoPruebas");
const selectorMisionPruebas = document.getElementById(
  "selectorMisionPruebas",
);
const btnIniciarMisionPruebas = document.getElementById(
  "btnIniciarMisionPruebas",
);

const categoriaActual = document.getElementById("categoriaActual");
const detalleMision = document.getElementById("detalleMision");
const vidas = document.getElementById("vidas");
const personaje = document.getElementById("personaje");
const teclado = document.getElementById("teclado");
const mensajePersonaje = document.getElementById("mensajePersonaje");
const palabraOculta = document.getElementById("palabraOculta");
const btnNuevaAventura = document.getElementById("btnNuevaAventura");
const personajeImagen = document.getElementById("personajeImagen");
const fondoEscenario = document.getElementById("fondoEscenario");
const contenedorEscenario = document.querySelector(".escenario");
const mensajeDesafioSuperado = document.getElementById(
  "mensajeDesafioSuperado",
);
const modalHistoria = document.getElementById("modalHistoria");
const numeroCapitulo = document.getElementById("numeroCapitulo");
const tituloCapitulo = document.getElementById("tituloCapitulo");
const textoCapitulo = document.getElementById("textoCapitulo");
const btnContinuarHistoria = document.getElementById("btnContinuarHistoria");
const modalPrologo = document.getElementById("modalPrologo");
const btnComenzarPrologo = document.getElementById("btnComenzarPrologo");
const modalIntroduccionMundo2 = document.getElementById(
  "modalIntroduccionMundo2",
);
const btnComenzarMundo2 = document.getElementById("btnComenzarMundo2");
const btnSaltarNarrativa = document.getElementById("btnSaltarNarrativa");

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
  diamanteRecolectado: new Audio(
    "assets/sounds/diamante-recolectado.mp3",
  ),
  cristalCasilla: new Audio("assets/sounds/cristal-casilla.mp3"),
  comienzaMundo2: new Audio("assets/sounds/comienza-mundo-2.mp3"),
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
const duracionCierrePresentacionMision = 1350;
const duracionPresentacionMision = 8200;
const duracionPresentacionMisionReducida = 5000;
const duracionCaminataExplorador = 1200;
const duracionCrucePuente = 3600;
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
const demoraInicialMinimaPresenciaBosque = 2000;
const demoraInicialMaximaPresenciaBosque = 4000;
const intervaloMinimoPresenciaBosque = 9000;
const intervaloMaximoPresenciaBosque = 16000;
const duracionMinimaPresenciaBosque = 900;
const duracionMaximaPresenciaBosque = 1450;
const demoraInicialMinimaAranaBosque = 6000;
const demoraInicialMaximaAranaBosque = 9000;
const intervaloMinimoAranaBosque = 15000;
const intervaloMaximoAranaBosque = 24000;
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
const intervaloSpriteCaminata = 150;
const spritesCaminataPorEscenario = {
  0: crearRutasSpritesCaminata("bosque"),
};
const spritesPortalPorEscenario = {
  0: crearRutasSpritesCaminata("portal-bosque", "explorador-portal"),
};

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

const estadosExploradorPorEscenario = {
  0: [
    "feliz", // El Bosque Encantado
    "nervioso", // La Piedra del Sendero
    "feliz", // Entre las Ramas
    "preocupado", // La Tormenta
    "nervioso", // La Niebla Misteriosa
    "preocupado", // Los Aullidos
    "preocupado", // El Bosque Prohibido
    "nervioso", // El Puente Olvidado
    "feliz", // El Santuario del Cristal
    "feliz", // El Portal de los Mundos
  ],
};

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
let secuenciaAperturaPortal = 0;
let cinematicaPortalActiva = false;
let portalAbierto = false;
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
let secuenciaMensajeDesafioSuperado = 0;
let temporizadorSpriteCaminata = null;
let srcReposoCaminata = "";
let secuenciaPresentacionMision = 0;
let presentacionMisionYaCargada = false;
let transicionIntroduccionMundo2Activa = false;
let resolverIntroduccionMundo2 = null;
let secuenciaNarrativaActual = null;
let secuenciaHistoriaActiva = null;
let secuenciaPrologoActiva = null;
let secuenciaIntroduccionMundoActiva = null;
let modoPruebasActivo = false;
let maximoEscenarioDesbloqueado = 0;
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

function continuarAventura() {
  btnSiguiente.classList.add("oculto");
  limpiarCinematicaSantuario();

  if (historiaMisionPendiente) {
    mostrarHistoriaMision();
    return;
  }

  iniciarMisionAventura();
}

btnSiguiente.addEventListener("click", continuarAventura);

btnVersus.addEventListener("click", () => {
  cancelarSecuenciaNarrativaActual();
  detenerSonidos();
  abrirPreparacionVersus();
});

function volverAlMenuDesdePreparacionVersus() {
  if (transicionCombateVersus) clearTimeout(transicionCombateVersus);
  transicionCombateVersus = null;
  esperaRivalVersus.classList.add("oculto");
  mostrarPantalla(pantallaMenu);
}

btnSalirPreparacionVersus.addEventListener("click", volverAlMenuDesdePreparacionVersus);
btnSalirPreparacionVersusVertical.addEventListener("click", volverAlMenuDesdePreparacionVersus);

let palabrasSecretasVersus = [];
let transicionCombateVersus = null;

function limpiarPalabraParaVersus(valor) {
  return valor.toLocaleUpperCase("es-AR").replace(/[^A-ZÁÉÍÓÚÜÑ]/g, "");
}

function obtenerClavePalabraVersus(valor) {
  return valor.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function validarPreparacionVersus(mostrarErrores = false) {
  const valores = inputsPalabrasVersus.map((input) => input.value);
  const claves = valores.map(obtenerClavePalabraVersus);
  let formularioValido = true;

  inputsPalabrasVersus.forEach((input, indice) => {
    const campo = input.closest(".campo-palabra-secreta");
    const contador = campo.querySelector(".contador-palabra-versus");
    const error = campo.querySelector(".error-palabra-versus");
    const valor = valores[indice];
    const repetida = valor.length >= 3 && claves.some(
      (otra, otroIndice) => otroIndice !== indice && otra === claves[indice],
    );
    let mensaje = "";

    contador.textContent = `${valor.length} ${valor.length === 1 ? "letra" : "letras"}`;
    if (valor.length > 0 && valor.length < 2) mensaje = "Debe tener al menos 2 letras.";
    if (repetida) mensaje = "Esta palabra está repetida.";

    const valida = valor.length >= 2 && !repetida;
    formularioValido = formularioValido && valida;
    input.classList.toggle("invalida", mostrarErrores && !valida);
    error.textContent = mostrarErrores ? mensaje : "";
  });

  btnConfirmarPalabrasVersus.disabled = !formularioValido;
  return formularioValido;
}

function abrirPreparacionVersus() {
  if (transicionCombateVersus) clearTimeout(transicionCombateVersus);
  transicionCombateVersus = null;
  palabrasSecretasVersus = [];
  formPreparacionVersus.reset();
  esperaRivalVersus.classList.add("oculto");
  inputsPalabrasVersus.forEach((input) => {
    input.disabled = false;
    input.classList.remove("invalida");
  });
  tematicaVersus.disabled = false;
  validarPreparacionVersus();
  mostrarPantalla(pantallaPreparacionVersus);
}

inputsPalabrasVersus.forEach((input) => {
  input.addEventListener("input", () => {
    input.value = limpiarPalabraParaVersus(input.value);
    validarPreparacionVersus(true);
  });
});

formPreparacionVersus.addEventListener("submit", (evento) => {
  evento.preventDefault();
  if (!validarPreparacionVersus(true)) return;

  palabrasSecretasVersus = inputsPalabrasVersus.map((input) => input.value);
  inputsPalabrasVersus.forEach((input) => { input.disabled = true; });
  tematicaVersus.disabled = true;
  btnConfirmarPalabrasVersus.disabled = true;
  esperaRivalVersus.classList.remove("oculto");

  transicionCombateVersus = setTimeout(() => {
    transicionCombateVersus = null;
    prepararDueloVersus();
    mostrarPantalla(pantallaVersus);
  }, modoPruebasActivo ? 150 : 1100);
});

btnCompletarPalabrasPruebasVersus.addEventListener("click", () => {
  if (!modoPruebasActivo) return;
  const palabrasDePrueba = bancosPalabrasVersus[tematicaVersus.value].slice(
    0,
    maximoPalabrasVersus,
  );
  inputsPalabrasVersus.forEach((input, indice) => {
    input.value = palabrasDePrueba[indice];
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
  btnConfirmarPalabrasVersus.focus();
});

function volverAlMenuDesdeVersus() {
  cancelarCinematicaFinalVersus();
  detenerRondaVersus();
  mostrarPantalla(pantallaMenu);
}

btnSalirVersus.addEventListener("click", volverAlMenuDesdeVersus);
btnSalirVersusVertical.addEventListener("click", volverAlMenuDesdeVersus);
btnMenuResultadoVersus.addEventListener("click", volverAlMenuDesdeVersus);

btnSaltarNarrativa.addEventListener("click", solicitarSaltoNarrativo);

btnContinuarHistoria.addEventListener("click", async () => {
  if (btnContinuarHistoria.disabled || transicionEscenaActiva) return;

  const secuenciaNarrativa = secuenciaHistoriaActiva;

  secuenciaPresentacionMision += 1;
  btnContinuarHistoria.disabled = true;
  transicionEscenaActiva = true;
  modalHistoria.classList.remove("abriendo");
  modalHistoria.classList.add("cerrando");

  try {
    await esperarMovimiento(duracionCierrePresentacionMision);

    modalHistoria.classList.add("oculto");
    modalHistoria.classList.remove("cerrando");

    if (presentacionMisionYaCargada) {
      presentacionMisionYaCargada = false;
      historiaMisionPendiente = false;
      return;
    }

    if (debeCruzarPuenteEnTransicion()) {
      console.log("[transicion] Empieza el cruce del puente");
      await ejecutarCrucePuente();
    } else {
      console.log("[transicion] Empieza la caminata");
      personajeImagen.classList.remove("caminando");
      void personajeImagen.offsetWidth;
      personajeImagen.classList.add("caminando");
      iniciarCicloCaminata();
      console.log("[transicion] Clase caminando agregada", {
        aplicada: personajeImagen.classList.contains("caminando"),
        clases: personajeImagen.className,
      });
      await esperarMovimiento(duracionCaminataExplorador);
    }

    detenerCicloCaminata();
    personajeImagen.classList.remove(
      "caminando",
      "explorador-cruzando-puente",
    );
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
    detenerCicloCaminata();
    personajeImagen.classList.remove(
      "caminando",
      "explorador-cruzando-puente",
      "oculto-transicion",
    );
    btnContinuarHistoria.disabled = false;
    transicionEscenaActiva = false;
    navegacionDevPendiente = false;
    finalizarSecuenciaNarrativa(secuenciaNarrativa);

    if (secuenciaHistoriaActiva === secuenciaNarrativa) {
      secuenciaHistoriaActiva = null;
    }
  }
});

btnJugar.addEventListener("click", async () => {
  if (!localStorage.getItem("progresoAventuraGA")) {
    reiniciarEstadoAventura();
    mostrarPrologo();
    return;
  }

  const debePresentarMision = desafiosCompletados === 0;
  await iniciarMisionAventura({ presentarMision: debePresentarMision });

  if (debePresentarMision) {
    mostrarHistoriaMision({ misionYaCargada: true });
  }
});

btnComenzarPrologo.addEventListener("click", async () => {
  if (btnComenzarPrologo.disabled || transicionPrologoActiva) return;

  const secuenciaNarrativa = secuenciaPrologoActiva;

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
    mostrarHistoriaMision({ misionYaCargada: true });
    guardarProgreso();
  } finally {
    modalPrologo.classList.remove("abriendo", "cerrando");
    btnComenzarPrologo.disabled = false;
    transicionPrologoActiva = false;
    finalizarSecuenciaNarrativa(secuenciaNarrativa);

    if (secuenciaPrologoActiva === secuenciaNarrativa) {
      secuenciaPrologoActiva = null;
    }
  }
});

btnComenzarMundo2.addEventListener("click", async () => {
  if (
    btnComenzarMundo2.disabled ||
    transicionIntroduccionMundo2Activa
  ) {
    return;
  }

  const secuenciaNarrativa = secuenciaIntroduccionMundoActiva;

  btnComenzarMundo2.disabled = true;
  transicionIntroduccionMundo2Activa = true;
  modalIntroduccionMundo2.classList.remove("abriendo");
  modalIntroduccionMundo2.classList.add("cerrando");

  try {
    await desvanecerSonido("comienzaMundo2", 2000);
    modalIntroduccionMundo2.classList.add("oculto");
    modalIntroduccionMundo2.classList.remove("cerrando");
  } finally {
    sonidos.comienzaMundo2.loop = false;
    sonidos.comienzaMundo2.volume = 1;
    btnComenzarMundo2.disabled = false;
    transicionIntroduccionMundo2Activa = false;

    const resolver = resolverIntroduccionMundo2;
    resolverIntroduccionMundo2 = null;
    resolver?.();
    finalizarSecuenciaNarrativa(secuenciaNarrativa);

    if (secuenciaIntroduccionMundoActiva === secuenciaNarrativa) {
      secuenciaIntroduccionMundoActiva = null;
    }
  }
});

btnSalirJuego.addEventListener("click", () => {
  cancelarSecuenciaNarrativaActual();
  ocultarMensajeDesafioSuperado();
  detenerSonidos();
  mostrarPantalla(pantallaMenu);
});

btnMisionAnterior.addEventListener("click", () => {
  if (!modoPruebasActivo) return;
  navegarMisionDev(-1);
});

btnMisionSiguiente.addEventListener("click", () => {
  if (!modoPruebasActivo) return;
  navegarMisionDev(1);
});

modoPruebas.addEventListener("change", () => {
  actualizarModoPruebas(modoPruebas.checked);
});

selectorMundoPruebas.addEventListener("change", () => {
  actualizarSelectorMisionesPruebas();
});

btnIniciarMisionPruebas.addEventListener("click", () => {
  iniciarMisionSeleccionadaPruebas();
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
    mensajePersonaje.textContent = "";
    mensajePersonaje.classList.add("oculto");
    const mensajeSuperadoTerminado = mostrarMensajeDesafioSuperado();
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
      void mensajeSuperadoTerminado.then((mensajeCompleto) => {
        if (mensajeCompleto) {
          mensajePersonaje.classList.remove("oculto");
          void completarSantuarioConCinematica();
        }
      });
      return;
    }

    const completaPortalDeLosMundos =
      escenarioActual === 0 &&
      misionActual === 9 &&
      desafiosCompletados === desafiosPorMision - 1;

    if (completaPortalDeLosMundos) {
      portalAbierto = true;
      reproducirSecuenciaSonidos(["acertar", "moneda", "victoria"]);
      bloquearTeclado();
      btnPista.disabled = true;
      btnSiguiente.classList.add("oculto");
      guardarProgreso();
      void mensajeSuperadoTerminado.then((mensajeCompleto) => {
        if (mensajeCompleto) {
          mensajePersonaje.classList.remove("oculto");
          void completarAperturaPortal();
        }
      });
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
    btnSiguiente.classList.add("oculto");
    void mensajeSuperadoTerminado.then((mensajeCompleto) => {
      if (mensajeCompleto) continuarAventura();
    });
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

function crearTecladoVersus() {
  if (tecladoVersus.children.length > 0) return;

  filasTeclado.forEach((fila) => {
    const filaTeclado = document.createElement("div");
    filaTeclado.className = "fila-teclado-versus";

    fila.forEach((letra) => {
      const botonLetra = document.createElement("button");
      botonLetra.type = "button";
      botonLetra.textContent = letra;
      botonLetra.className = "letra-versus";
      botonLetra.setAttribute("aria-label", `Letra ${letra}`);
      botonLetra.addEventListener("click", () => jugarLetraDemoVersus(letra, botonLetra));
      filaTeclado.appendChild(botonLetra);
    });

    tecladoVersus.appendChild(filaTeclado);
  });
}

// Duelo local de tres rondas. Cuando exista el servidor, las palabras y jugadas
// del rival llegarán desde el otro dispositivo en lugar de esta simulación.
const bancosPalabrasVersus = {
  desierto: aventura[1].palabras.map((item) => item.palabra),
  bosque: aventura[0].palabras.map((item) => item.palabra),
  animales: [
    "AGUILA", "BALLENA", "CABALLO", "CONEJO", "DELFIN",
    "GATO", "JIRAFA", "LEON", "PANDA", "TIGRE",
  ],
};
const fondosTematicaVersus = {
  desierto: "assets/images/fondos/desierto-1.png",
  bosque: "assets/images/fondos/bosque-1.png",
  animales: "assets/images/fondos/bosque-6.png",
};
const descripcionFondosVersus = {
  desierto: "Ruinas del desierto",
  bosque: "Sendero del bosque encantado",
  animales: "Bosque de los animales",
};
const duracionPartidaVersus = 150;
const maximoPalabrasVersus = 3;
const maximoErroresVersus = 6;
const intervaloJugadaRivalVersus = 3000;
const probabilidadAciertoRivalVersus = 0.56;
const srcExploradorBaseVersus = "assets/images/personajes/versus/explorador-base.png";
const srcExploradorPreparaBumeran = "assets/images/personajes/versus/explorador-bumeran-preparacion.png";
const srcExploradorLanzaBumeran = "assets/images/personajes/versus/explorador-bumeran-lanzamiento.png";
const srcMagoBaseVersus = "assets/images/personajes/versus/mago-base.png";
const srcMagoAtaqueVersus = "assets/images/personajes/versus/mago-ataque.png";

const demoVersus = {
  tematica: "desierto",
  palabrasJugador: [],
  palabrasRival: [],
  indiceJugador: 0,
  indiceRival: 0,
  letrasJugador: new Set(),
  letrasRival: new Set(),
  erroresJugador: 0,
  erroresRival: 0,
  vidasJugador: 3,
  vidasRival: 3,
  tiempoJugador: duracionPartidaVersus,
  tiempoRival: duracionPartidaVersus,
  finalizadoJugador: false,
  finalizadoRival: false,
  motivoFinalJugador: "",
  motivoFinalRival: "",
  intervaloTiempo: null,
  intervaloRival: null,
  temporizadorAviso: null,
  temporizadoresAtaqueJugador: [],
  temporizadoresAtaqueRival: [],
  temporizadorCinematica: null,
  resolverCinematica: null,
  partidaFinalizada: false,
};

function programarPasoAtaqueVersus(accion, demora, atacante) {
  const temporizador = setTimeout(accion, demora);
  const grupo = atacante === "rival"
    ? demoVersus.temporizadoresAtaqueRival
    : demoVersus.temporizadoresAtaqueJugador;
  grupo.push(temporizador);
}

function limpiarAnimacionAtaqueJugadorVersus() {
  demoVersus.temporizadoresAtaqueJugador.forEach(clearTimeout);
  demoVersus.temporizadoresAtaqueJugador = [];
  personajeVersusUno.src = srcExploradorBaseVersus;
  personajeVersusUno.classList.remove("preparando-bumeran", "lanzando-bumeran");
  personajeVersusDos.classList.remove("recibiendo-dano");
  vidasVersusDos.classList.remove("recibiendo-dano");
  bumeranVersus.classList.remove("volando");
}

function limpiarAnimacionAtaqueRivalVersus() {
  demoVersus.temporizadoresAtaqueRival.forEach(clearTimeout);
  demoVersus.temporizadoresAtaqueRival = [];
  personajeVersusDos.src = srcMagoBaseVersus;
  personajeVersusDos.classList.remove("concentrando-hechizo", "lanzando-hechizo");
  personajeVersusUno.classList.remove("recibiendo-dano-magico");
  vidasVersusUno.classList.remove("recibiendo-dano");
  proyectilMagoVersus.classList.remove("volando");
}

function limpiarAnimacionAtaqueVersus() {
  limpiarAnimacionAtaqueJugadorVersus();
  limpiarAnimacionAtaqueRivalVersus();
}

function reproducirAtaqueBumeranVersus() {
  limpiarAnimacionAtaqueJugadorVersus();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    personajeVersusDos.classList.add("recibiendo-dano");
    programarPasoAtaqueVersus(() => {
      personajeVersusDos.classList.remove("recibiendo-dano");
    }, 220, "jugador");
    return;
  }

  personajeVersusUno.src = srcExploradorPreparaBumeran;
  personajeVersusUno.classList.add("preparando-bumeran");

  programarPasoAtaqueVersus(() => {
    personajeVersusUno.src = srcExploradorLanzaBumeran;
    personajeVersusUno.classList.remove("preparando-bumeran");
    personajeVersusUno.classList.add("lanzando-bumeran");
    void bumeranVersus.offsetWidth;
    bumeranVersus.classList.add("volando");
  }, 260, "jugador");

  programarPasoAtaqueVersus(() => {
    personajeVersusDos.classList.add("recibiendo-dano");
    vidasVersusDos.classList.add("recibiendo-dano");
  }, 760, "jugador");

  programarPasoAtaqueVersus(() => {
    personajeVersusDos.classList.remove("recibiendo-dano");
    vidasVersusDos.classList.remove("recibiendo-dano");
  }, 1110, "jugador");

  programarPasoAtaqueVersus(limpiarAnimacionAtaqueJugadorVersus, 1510, "jugador");
}

function reproducirAtaqueMagoVersus() {
  limpiarAnimacionAtaqueRivalVersus();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    personajeVersusUno.classList.add("recibiendo-dano-magico");
    programarPasoAtaqueVersus(() => {
      personajeVersusUno.classList.remove("recibiendo-dano-magico");
    }, 220, "rival");
    return;
  }

  personajeVersusDos.classList.add("concentrando-hechizo");

  programarPasoAtaqueVersus(() => {
    personajeVersusDos.src = srcMagoAtaqueVersus;
    personajeVersusDos.classList.remove("concentrando-hechizo");
    personajeVersusDos.classList.add("lanzando-hechizo");
    void proyectilMagoVersus.offsetWidth;
    proyectilMagoVersus.classList.add("volando");
  }, 220, "rival");

  programarPasoAtaqueVersus(() => {
    personajeVersusUno.classList.add("recibiendo-dano-magico");
    vidasVersusUno.classList.add("recibiendo-dano");
  }, 760, "rival");

  programarPasoAtaqueVersus(() => {
    personajeVersusUno.classList.remove("recibiendo-dano-magico");
    vidasVersusUno.classList.remove("recibiendo-dano");
  }, 1080, "rival");

  programarPasoAtaqueVersus(limpiarAnimacionAtaqueRivalVersus, 1260, "rival");
}

function mostrarEstadoProgresoVersus(elemento, mensaje, tipo = "") {
  elemento.textContent = mensaje;
  elemento.className = tipo;
}

function actualizarIntentosVersus(contenedor, errores, nombreJugador) {
  const restantes = Math.max(0, maximoErroresVersus - errores);
  [...contenedor.children].forEach((intento, indice) => {
    intento.classList.toggle("agotado", indice >= restantes);
  });
  contenedor.setAttribute(
    "aria-label",
    `${nombreJugador} ${restantes === 1 ? "tiene un intento" : `tiene ${restantes} intentos`}`
  );
}

function bloquearTecladoDemoVersus() {
  tecladoVersus.querySelectorAll("button").forEach((boton) => {
    boton.disabled = true;
  });
}

function habilitarTecladoVersus() {
  tecladoVersus.querySelectorAll("button").forEach((boton) => {
    boton.disabled = false;
  });
}

function mezclarPalabrasVersus(palabras) {
  const copia = [...palabras];
  for (let indice = copia.length - 1; indice > 0; indice -= 1) {
    const destino = Math.floor(Math.random() * (indice + 1));
    [copia[indice], copia[destino]] = [copia[destino], copia[indice]];
  }
  return copia;
}

function prepararDueloVersus() {
  cancelarCinematicaFinalVersus();
  detenerRondaVersus();
  limpiarAnimacionAtaqueVersus();
  demoVersus.tematica = tematicaVersus.value;
  demoVersus.palabrasJugador = mezclarPalabrasVersus(
    bancosPalabrasVersus[demoVersus.tematica],
  ).slice(0, maximoPalabrasVersus);
  demoVersus.palabrasRival = palabrasSecretasVersus.map(obtenerClavePalabraVersus);
  demoVersus.indiceJugador = 0;
  demoVersus.indiceRival = 0;
  demoVersus.letrasJugador.clear();
  demoVersus.letrasRival.clear();
  demoVersus.erroresJugador = 0;
  demoVersus.erroresRival = 0;
  demoVersus.vidasJugador = 3;
  demoVersus.vidasRival = 3;
  demoVersus.tiempoJugador = duracionPartidaVersus;
  demoVersus.tiempoRival = duracionPartidaVersus;
  demoVersus.finalizadoJugador = false;
  demoVersus.finalizadoRival = false;
  demoVersus.motivoFinalJugador = "";
  demoVersus.motivoFinalRival = "";
  demoVersus.partidaFinalizada = false;
  fondoVersus.src = fondosTematicaVersus[demoVersus.tematica];
  fondoVersus.alt = descripcionFondosVersus[demoVersus.tematica];
  resultadoRondaVersus.classList.add("oculto");
  avisoAvanceVersus.classList.add("oculto");
  actualizarVidasVersus();
  actualizarIntentosVersus(document.getElementById("intentosVersusUno"), 0, "Jugador 1");
  actualizarIntentosVersus(document.getElementById("intentosVersusDos"), 0, "El rival");
  mostrarEstadoProgresoVersus(document.getElementById("estadoProgresoUno"), "Elegí una letra");
  mostrarEstadoProgresoVersus(document.getElementById("estadoProgresoDos"), "Pensando...");
  habilitarTecladoVersus();
  actualizarProgresosVersus();
  actualizarTiemposVersus();

  demoVersus.intervaloTiempo = setInterval(actualizarRelojesVersus, 1000);
  demoVersus.intervaloRival = setInterval(
    jugarTurnoRivalVersus,
    modoPruebasActivo ? intervaloJugadaRivalVersus * 4 : intervaloJugadaRivalVersus,
  );
}

function detenerRondaVersus() {
  if (demoVersus.intervaloTiempo) clearInterval(demoVersus.intervaloTiempo);
  if (demoVersus.intervaloRival) clearInterval(demoVersus.intervaloRival);
  demoVersus.intervaloTiempo = null;
  demoVersus.intervaloRival = null;
  if (demoVersus.temporizadorAviso) clearTimeout(demoVersus.temporizadorAviso);
  demoVersus.temporizadorAviso = null;
  limpiarAnimacionAtaqueVersus();
}

function jugarLetraDemoVersus(letra, boton) {
  if (boton.disabled || demoVersus.finalizadoJugador || demoVersus.partidaFinalizada) return;

  const estadoJugador = document.getElementById("estadoProgresoUno");
  const intentosJugador = document.getElementById("intentosVersusUno");
  const palabraJugador = obtenerPalabraActualJugadorVersus();

  boton.disabled = true;
  demoVersus.letrasJugador.add(letra);

  if (palabraJugador.includes(letra)) {
    mostrarEstadoProgresoVersus(estadoJugador, "¡Acierto!", "acierto");
  } else {
    demoVersus.erroresJugador += 1;
    actualizarIntentosVersus(intentosJugador, demoVersus.erroresJugador, "Jugador 1");
    mostrarEstadoProgresoVersus(estadoJugador, "Fallaste", "error");
  }

  actualizarProgresosVersus();

  if (palabraCompletadaVersus(palabraJugador, demoVersus.letrasJugador)) {
    avanzarPalabraJugadorVersus(true);
    return;
  }

  if (demoVersus.erroresJugador >= maximoErroresVersus) {
    avanzarPalabraJugadorVersus(false);
  }
}

function jugarTurnoRivalVersus() {
  if (demoVersus.finalizadoRival || demoVersus.partidaFinalizada) return;

  const alfabeto = filasTeclado.flat();
  const palabraRival = obtenerPalabraActualRivalVersus();
  const letrasPendientes = [...new Set(palabraRival)]
    .filter((letra) => !demoVersus.letrasRival.has(letra));
  const letrasIncorrectas = alfabeto.filter(
    (letra) => !palabraRival.includes(letra) && !demoVersus.letrasRival.has(letra),
  );
  const acierta = Math.random() < probabilidadAciertoRivalVersus
    || letrasIncorrectas.length === 0;
  const opciones = acierta ? letrasPendientes : letrasIncorrectas;
  const letra = opciones[Math.floor(Math.random() * opciones.length)];
  if (!letra) return;

  demoVersus.letrasRival.add(letra);
  const estadoRival = document.getElementById("estadoProgresoDos");
  if (palabraRival.includes(letra)) {
    mostrarEstadoProgresoVersus(estadoRival, "El rival acertó", "acierto");
  } else {
    demoVersus.erroresRival += 1;
    actualizarIntentosVersus(
      document.getElementById("intentosVersusDos"),
      demoVersus.erroresRival,
      "El rival",
    );
    mostrarEstadoProgresoVersus(estadoRival, "El rival falló", "error");
  }

  actualizarProgresosVersus();

  if (palabraCompletadaVersus(palabraRival, demoVersus.letrasRival)) {
    avanzarPalabraRivalVersus(true);
  } else if (demoVersus.erroresRival >= maximoErroresVersus) {
    avanzarPalabraRivalVersus(false);
  }
}

function obtenerPalabraActualJugadorVersus() {
  return obtenerClavePalabraVersus(
    demoVersus.palabrasJugador[demoVersus.indiceJugador] || "",
  );
}

function obtenerPalabraActualRivalVersus() {
  return demoVersus.palabrasRival[demoVersus.indiceRival] || "";
}

function palabraCompletadaVersus(palabra, letras) {
  return [...palabra].every((letra) => letras.has(letra));
}

function contarLetrasDescubiertasVersus(palabra, letras) {
  return [...palabra].filter((letra) => letras.has(letra)).length;
}

function actualizarProgresosVersus() {
  const palabraJugador = document.getElementById("palabraVersusUno");
  const palabraRival = document.getElementById("palabraVersusDos");
  const objetivoJugador = obtenerPalabraActualJugadorVersus();
  const objetivoRival = obtenerPalabraActualRivalVersus();
  const progresoJugador = [...objetivoJugador]
    .map((letra) => demoVersus.letrasJugador.has(letra) ? letra : "_");
  const progresoRival = [...objetivoRival]
    .map((letra) => demoVersus.letrasRival.has(letra) ? "?" : "_");

  tituloProgresoUno.textContent = demoVersus.finalizadoJugador
    ? "TU RECORRIDO TERMINÓ"
    : `TU PALABRA ${demoVersus.indiceJugador + 1}/${maximoPalabrasVersus}`;
  tituloProgresoDos.textContent = demoVersus.finalizadoRival
    ? "EL RIVAL TERMINÓ"
    : `RIVAL: PALABRA ${demoVersus.indiceRival + 1}/${maximoPalabrasVersus}`;
  tituloVersus.textContent = `J1 ${Math.min(demoVersus.indiceJugador, maximoPalabrasVersus)}/3 · J2 ${Math.min(demoVersus.indiceRival, maximoPalabrasVersus)}/3`;

  if (demoVersus.finalizadoJugador) {
    palabraJugador.textContent = demoVersus.motivoFinalJugador === "tiempo"
      ? "TIEMPO AGOTADO"
      : "✓ 3 PALABRAS";
  } else {
    palabraJugador.textContent = progresoJugador.join(" ");
  }
  palabraJugador.setAttribute("aria-label", `Tu progreso: ${palabraJugador.textContent}`);

  if (demoVersus.finalizadoRival) {
    palabraRival.textContent = demoVersus.motivoFinalRival === "tiempo"
      ? "TIEMPO AGOTADO"
      : "✓ 3 PALABRAS";
  } else {
    palabraRival.textContent = progresoRival.join(" ");
  }
  palabraRival.setAttribute(
    "aria-label",
    demoVersus.finalizadoRival
      ? palabraRival.textContent
      : `El rival descubrió ${contarLetrasDescubiertasVersus(objetivoRival, demoVersus.letrasRival)} de ${objetivoRival.length} letras`,
  );
  ajustarPalabraLargaVersus(palabraJugador, objetivoJugador.length);
  ajustarPalabraLargaVersus(palabraRival, objetivoRival.length);
}

function ajustarPalabraLargaVersus(elemento, cantidadLetras) {
  const panel = elemento.closest(".versus-palabra");
  panel.classList.toggle("palabra-larga", cantidadLetras > 10);
  panel.classList.toggle("palabra-muy-larga", cantidadLetras > 16);
}

function actualizarRelojesVersus() {
  if (!demoVersus.finalizadoJugador) {
    demoVersus.tiempoJugador = Math.max(0, demoVersus.tiempoJugador - 1);
    if (demoVersus.tiempoJugador === 0) agotarTiempoJugadorVersus();
  }
  if (!demoVersus.finalizadoRival) {
    demoVersus.tiempoRival = Math.max(0, demoVersus.tiempoRival - 1);
    if (demoVersus.tiempoRival === 0) agotarTiempoRivalVersus();
  }
  actualizarTiemposVersus();
}

function actualizarTiemposVersus() {
  actualizarTiempoPersonalVersus(
    tiempoVersusUno,
    textoTiempoVersusUno,
    demoVersus.tiempoJugador,
    "Jugador 1",
    demoVersus.finalizadoJugador,
  );
  actualizarTiempoPersonalVersus(
    tiempoVersusDos,
    textoTiempoVersusDos,
    demoVersus.tiempoRival,
    "Jugador 2",
    demoVersus.finalizadoRival,
  );
}

function actualizarTiempoPersonalVersus(panel, texto, segundos, nombre, finalizado) {
  const minutos = Math.floor(segundos / 60);
  const resto = segundos % 60;
  texto.textContent = `${String(minutos).padStart(2, "0")}:${String(resto).padStart(2, "0")}`;
  panel.setAttribute("aria-label", `Tiempo de ${nombre}: ${minutos} minutos y ${resto} segundos`);
  panel.classList.toggle("urgente", !finalizado && segundos <= 15);
}

function actualizarVidasVersus() {
  actualizarCorazonesVersus(vidasVersusUno, demoVersus.vidasJugador, "Jugador 1");
  actualizarCorazonesVersus(vidasVersusDos, demoVersus.vidasRival, "Jugador 2");
}

function actualizarCorazonesVersus(elemento, vidasActuales, nombre) {
  elemento.innerHTML = Array.from({ length: 3 }, (_, indice) => (
    `<span class="${indice < vidasActuales ? "" : "perdido"}">♥</span>`
  )).join(" ");
  elemento.setAttribute("aria-label", `${nombre}: ${vidasActuales} vidas`);
}

function mostrarAvisoAvanceVersus(mensaje, tipo = "", demora = 0) {
  if (demoVersus.temporizadorAviso) clearTimeout(demoVersus.temporizadorAviso);
  avisoAvanceVersus.classList.add("oculto");

  const mostrarAviso = () => {
    avisoAvanceVersus.textContent = mensaje;
    avisoAvanceVersus.className = `aviso-avance-versus${tipo ? ` ${tipo}` : ""}`;
    demoVersus.temporizadorAviso = setTimeout(() => {
      avisoAvanceVersus.classList.add("oculto");
      demoVersus.temporizadorAviso = null;
    }, 1800);
  };

  if (demora > 0) {
    demoVersus.temporizadorAviso = setTimeout(mostrarAviso, demora);
    return;
  }

  mostrarAviso();
}

function avanzarPalabraJugadorVersus(acertada) {
  const numeroPalabra = demoVersus.indiceJugador + 1;
  demoVersus.indiceJugador += 1;
  demoVersus.letrasJugador.clear();
  demoVersus.erroresJugador = 0;

  if (acertada) {
    demoVersus.vidasRival -= 1;
    reproducirAtaqueBumeranVersus();
    mostrarAvisoAvanceVersus(
      `¡Palabra ${numeroPalabra} superada! Atacaste al rival.`,
      "acierto",
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 260 : 1550,
    );
  } else {
    demoVersus.vidasJugador -= 1;
    reproducirAtaqueMagoVersus();
    mostrarAvisoAvanceVersus(
      `Sin energía en la palabra ${numeroPalabra}. Perdés un corazón.`,
      "error",
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 260 : 1300,
    );
  }
  actualizarVidasVersus();

  if (demoVersus.vidasRival <= 0) {
    finalizarPartidaVersus("jugador", "¡Ataque final! El rival se quedó sin corazones.");
    return;
  }

  if (demoVersus.vidasJugador <= 0) {
    finalizarPartidaVersus("rival", "Agotaste tu energía y te quedaste sin corazones.");
    return;
  }

  if (demoVersus.indiceJugador >= maximoPalabrasVersus) {
    demoVersus.finalizadoJugador = true;
    demoVersus.motivoFinalJugador = "completo";
    bloquearTecladoDemoVersus();
    mostrarEstadoProgresoVersus(document.getElementById("estadoProgresoUno"), "Esperando al rival");
  } else {
    habilitarTecladoVersus();
    actualizarIntentosVersus(document.getElementById("intentosVersusUno"), 0, "Jugador 1");
    mostrarEstadoProgresoVersus(document.getElementById("estadoProgresoUno"), "Nueva palabra");
  }
  actualizarProgresosVersus();
  verificarFinNaturalVersus();
}

function avanzarPalabraRivalVersus(acertada) {
  const numeroPalabra = demoVersus.indiceRival + 1;
  demoVersus.indiceRival += 1;
  demoVersus.letrasRival.clear();
  demoVersus.erroresRival = 0;

  if (acertada) {
    demoVersus.vidasJugador -= 1;
    reproducirAtaqueMagoVersus();
    mostrarAvisoAvanceVersus(
      `El rival superó su palabra ${numeroPalabra} y te atacó.`,
      "error",
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 260 : 1300,
    );
  } else {
    demoVersus.vidasRival -= 1;
    reproducirAtaqueBumeranVersus();
    mostrarAvisoAvanceVersus(
      `El rival agotó la energía de su palabra ${numeroPalabra} y perdió un corazón.`,
      "acierto",
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 260 : 1550,
    );
  }
  actualizarVidasVersus();

  if (demoVersus.vidasJugador <= 0) {
    finalizarPartidaVersus("rival", "El rival completó su ataque y te dejó sin corazones.");
    return;
  }

  if (demoVersus.vidasRival <= 0) {
    finalizarPartidaVersus("jugador", "El rival agotó su energía y se quedó sin corazones.");
    return;
  }

  if (demoVersus.indiceRival >= maximoPalabrasVersus) {
    demoVersus.finalizadoRival = true;
    demoVersus.motivoFinalRival = "completo";
    mostrarEstadoProgresoVersus(document.getElementById("estadoProgresoDos"), "Esperando resultado");
  } else {
    actualizarIntentosVersus(document.getElementById("intentosVersusDos"), 0, "El rival");
    mostrarEstadoProgresoVersus(document.getElementById("estadoProgresoDos"), "Nueva palabra");
  }
  actualizarProgresosVersus();
  verificarFinNaturalVersus();
}

function agotarTiempoJugadorVersus() {
  if (demoVersus.finalizadoJugador) return;
  demoVersus.finalizadoJugador = true;
  demoVersus.motivoFinalJugador = "tiempo";
  bloquearTecladoDemoVersus();
  mostrarEstadoProgresoVersus(document.getElementById("estadoProgresoUno"), "Tiempo agotado", "agotado");
  mostrarAvisoAvanceVersus("Se agotó tu tiempo. El rival todavía puede continuar.", "error");
  actualizarProgresosVersus();
  verificarFinNaturalVersus();
}

function agotarTiempoRivalVersus() {
  if (demoVersus.finalizadoRival) return;
  demoVersus.finalizadoRival = true;
  demoVersus.motivoFinalRival = "tiempo";
  mostrarEstadoProgresoVersus(document.getElementById("estadoProgresoDos"), "Tiempo agotado", "agotado");
  mostrarAvisoAvanceVersus("El rival agotó su tiempo.", "acierto");
  actualizarProgresosVersus();
  verificarFinNaturalVersus();
}

function verificarFinNaturalVersus() {
  if (!demoVersus.finalizadoJugador || !demoVersus.finalizadoRival) return;
  const diferencia = demoVersus.vidasJugador - demoVersus.vidasRival;
  finalizarPartidaVersus(
    diferencia > 0 ? "jugador" : diferencia < 0 ? "rival" : "empate",
    `Resultado final: ${demoVersus.vidasJugador} a ${demoVersus.vidasRival} corazones.`,
  );
}

function finalizarPartidaVersus(ganador, detalle) {
  if (demoVersus.partidaFinalizada) return;
  actualizarProgresosVersus();
  demoVersus.partidaFinalizada = true;
  detenerRondaVersus();
  bloquearTecladoDemoVersus();

  if (ganador === "rival") {
    reproducirEclipseVioletaVersus().then(() => {
      mostrarResultadoPartidaVersus(ganador, detalle);
    });
    return;
  }

  if (ganador === "jugador") {
    reproducirTrampaSelvaticaVersus().then(() => {
      mostrarResultadoPartidaVersus(ganador, detalle);
    });
    return;
  }

  mostrarResultadoPartidaVersus(ganador, detalle);
}

function mostrarResultadoPartidaVersus(ganador, detalle) {

  iconoResultadoVersus.textContent = ganador === "jugador" ? "🏆" : ganador === "rival" ? "🛡️" : "⚔️";
  etiquetaResultadoVersus.textContent = ganador === "empate" ? "DUELO EMPATADO" : "DUELO FINALIZADO";
  tituloResultadoVersus.textContent = ganador === "jugador"
    ? "¡Victoria del Jugador 1!"
    : ganador === "rival"
      ? "Victoria del Jugador 2"
      : "¡Duelo empatado!";
  detalleResultadoVersus.textContent = detalle;
  btnRevanchaVersus.classList.remove("oculto");
  resultadoRondaVersus.classList.remove("oculto");
}

function crearParticulasEclipseVersus() {
  particulasEclipseVersus.replaceChildren();
  for (let indice = 0; indice < 28; indice += 1) {
    const particula = document.createElement("i");
    particula.style.setProperty("--angulo", `${(360 / 28) * indice}deg`);
    particula.style.setProperty("--distancia", `${70 + (indice % 7) * 14}px`);
    particula.style.setProperty("--demora", `${(indice % 5) * 35}ms`);
    particulasEclipseVersus.appendChild(particula);
  }
}

function reproducirEclipseVioletaVersus() {
  cancelarCinematicaFinalVersus();
  crearParticulasEclipseVersus();
  fondoCinematicaVersus.src = fondoVersus.src;
  etiquetaCinematicaVersus.textContent = "GOLPE LEGENDARIO";
  tituloCinematicaVersus.textContent = "ECLIPSE VIOLETA";
  cinematicaFinalVersus.classList.remove("trampa-selvatica");
  cinematicaFinalVersus.classList.add("eclipse-violeta");
  cinematicaFinalVersus.classList.remove("oculto");
  void cinematicaFinalVersus.offsetWidth;
  cinematicaFinalVersus.classList.add("activa");
  btnSaltarCinematicaVersus.focus();

  return new Promise((resolve) => {
    demoVersus.resolverCinematica = resolve;
    demoVersus.temporizadorCinematica = setTimeout(
      completarCinematicaFinalVersus,
      5200,
    );
  });
}

function reproducirTrampaSelvaticaVersus() {
  cancelarCinematicaFinalVersus();
  crearParticulasEclipseVersus();
  fondoCinematicaVersus.src = fondoVersus.src;
  etiquetaCinematicaVersus.textContent = "TÉCNICA SECRETA";
  tituloCinematicaVersus.textContent = "TRAMPA SELVÁTICA";
  cinematicaFinalVersus.classList.remove("eclipse-violeta");
  cinematicaFinalVersus.classList.add("trampa-selvatica");
  cinematicaFinalVersus.classList.remove("oculto");
  void cinematicaFinalVersus.offsetWidth;
  cinematicaFinalVersus.classList.add("activa");
  btnSaltarCinematicaVersus.focus();

  return new Promise((resolve) => {
    demoVersus.resolverCinematica = resolve;
    demoVersus.temporizadorCinematica = setTimeout(
      completarCinematicaFinalVersus,
      5200,
    );
  });
}

function reproducirPrisionEsmeraldaVersus() {
  cancelarCinematicaFinalVersus();
  crearParticulasEclipseVersus();
  fondoCinematicaVersus.src = fondoVersus.src;
  etiquetaCinematicaVersus.textContent = "TÉCNICA ANCESTRAL";
  tituloCinematicaVersus.textContent = "FAUCES ESMERALDA";
  cinematicaFinalVersus.classList.remove("eclipse-violeta", "trampa-selvatica");
  cinematicaFinalVersus.classList.add("prision-esmeralda");
  cinematicaFinalVersus.classList.remove("oculto");
  void cinematicaFinalVersus.offsetWidth;
  cinematicaFinalVersus.classList.add("activa");
  btnSaltarCinematicaVersus.focus();

  return new Promise((resolve) => {
    demoVersus.resolverCinematica = resolve;
    demoVersus.temporizadorCinematica = setTimeout(
      completarCinematicaFinalVersus,
      5200,
    );
  });
}

function completarCinematicaFinalVersus() {
  if (demoVersus.temporizadorCinematica) {
    clearTimeout(demoVersus.temporizadorCinematica);
    demoVersus.temporizadorCinematica = null;
  }
  cinematicaFinalVersus.classList.remove("activa");
  cinematicaFinalVersus.classList.add("oculto");
  cinematicaFinalVersus.classList.remove(
    "eclipse-violeta",
    "trampa-selvatica",
    "prision-esmeralda",
  );
  particulasEclipseVersus.replaceChildren();
  const resolver = demoVersus.resolverCinematica;
  demoVersus.resolverCinematica = null;
  resolver?.();
}

function cancelarCinematicaFinalVersus() {
  if (demoVersus.temporizadorCinematica) {
    clearTimeout(demoVersus.temporizadorCinematica);
    demoVersus.temporizadorCinematica = null;
  }
  cinematicaFinalVersus.classList.remove("activa");
  cinematicaFinalVersus.classList.add("oculto");
  cinematicaFinalVersus.classList.remove(
    "eclipse-violeta",
    "trampa-selvatica",
    "prision-esmeralda",
  );
  particulasEclipseVersus.replaceChildren();
  demoVersus.resolverCinematica = null;
}

btnSaltarCinematicaVersus.addEventListener("click", completarCinematicaFinalVersus);

function probarCinematicaVersus(ganador) {
  if (!modoPruebasActivo || demoVersus.partidaFinalizada) return;

  if (ganador === "jugador") {
    demoVersus.indiceJugador = maximoPalabrasVersus;
    demoVersus.finalizadoJugador = true;
    demoVersus.motivoFinalJugador = "completo";
    demoVersus.vidasRival = 0;
    actualizarVidasVersus();
    finalizarPartidaVersus(
      "jugador",
      "Cinemática del explorador iniciada desde el Modo Pruebas.",
    );
    return;
  }

  demoVersus.indiceRival = maximoPalabrasVersus;
  demoVersus.finalizadoRival = true;
  demoVersus.motivoFinalRival = "completo";
  demoVersus.vidasJugador = 0;
  actualizarVidasVersus();
  finalizarPartidaVersus(
    "rival",
    "Cinemática del mago iniciada desde el Modo Pruebas.",
  );
}

btnProbarCinematicaExplorador.addEventListener("click", () => {
  probarCinematicaVersus("jugador");
});

btnProbarCinematicaMago.addEventListener("click", () => {
  probarCinematicaVersus("rival");
});

btnProbarCinematicaGuardiana.addEventListener("click", () => {
  if (!modoPruebasActivo || demoVersus.partidaFinalizada) return;
  void reproducirPrisionEsmeraldaVersus();
});

btnRevanchaVersus.addEventListener("click", prepararDueloVersus);

// Control reutilizable para cualquier secuencia narrativa presente o futura.
// Las esperas y animaciones siguen su ruta normal, pero se completan al instante.
function iniciarSecuenciaNarrativa(alSaltar = null) {
  const secuencia = {
    alSaltar,
    esperas: new Set(),
    saltada: false,
  };

  secuenciaNarrativaActual = secuencia;
  btnSaltarNarrativa.disabled = false;
  btnSaltarNarrativa.classList.remove("oculto");
  return secuencia;
}

function solicitarSaltoNarrativo() {
  const secuencia = secuenciaNarrativaActual;
  if (!secuencia || secuencia.saltada) return;

  secuencia.saltada = true;
  btnSaltarNarrativa.disabled = true;
  secuencia.esperas.forEach((resolver) => resolver());

  const selectoresNarrativos = [
    "#modalHistoria",
    "#modalPrologo",
    "#modalIntroduccionMundo2",
    ".presentacion-mision",
    ".cinematica-santuario",
    ".capa-portal-magico",
    ".cierre-cinematica-mundo",
    ".corriente-energia-portal",
    ".cristal-volador-santuario",
  ].join(",");

  document.getAnimations().forEach((animacion) => {
    try {
      const objetivo = animacion.effect?.target;
      const perteneceALaSecuencia =
        objetivo instanceof Element &&
        (objetivo.matches(selectoresNarrativos) ||
          objetivo.closest(selectoresNarrativos) ||
          (objetivo === personajeImagen &&
            (transicionEscenaActiva ||
              cinematicaSantuarioActiva ||
              cinematicaPortalActiva)));
      const duracion = animacion.effect?.getComputedTiming().endTime;
      if (perteneceALaSecuencia && Number.isFinite(duracion)) {
        animacion.finish();
      }
    } catch (_error) {
      // Una animacion ya cancelada no impide completar la secuencia.
    }
  });

  secuencia.alSaltar?.();
}

function finalizarSecuenciaNarrativa(secuencia) {
  if (!secuencia || secuenciaNarrativaActual !== secuencia) return;

  secuencia.esperas.forEach((resolver) => resolver());
  secuenciaNarrativaActual = null;
  btnSaltarNarrativa.disabled = false;
  btnSaltarNarrativa.classList.add("oculto");
}

function cancelarSecuenciaNarrativaActual() {
  const secuencia = secuenciaNarrativaActual;
  if (secuencia) finalizarSecuenciaNarrativa(secuencia);

  secuenciaHistoriaActiva = null;
  secuenciaPrologoActiva = null;
  secuenciaIntroduccionMundoActiva = null;
}

function saltoNarrativoSolicitado() {
  return Boolean(secuenciaNarrativaActual?.saltada);
}

function esperarAnimacionNarrativa(animacion) {
  const secuencia = secuenciaNarrativaActual;

  if (!secuencia) return animacion.finished.catch(() => {});
  if (secuencia.saltada) return Promise.resolve();

  return new Promise((resolve) => {
    let terminada = false;
    const completar = () => {
      if (terminada) return;
      terminada = true;
      secuencia.esperas.delete(completar);
      resolve();
    };

    secuencia.esperas.add(completar);
    animacion.finished.then(completar).catch(completar);
  });
}

function mostrarHistoriaMision({ misionYaCargada = false } = {}) {
  const historia = obtenerHistoriaMision();
  const secuenciaActual = ++secuenciaPresentacionMision;

  presentacionMisionYaCargada = misionYaCargada;
  numeroCapitulo.textContent = historia.capitulo;
  tituloCapitulo.textContent = historia.titulo;
  textoCapitulo.textContent = historia.texto;
  btnContinuarHistoria.disabled = false;
  modalHistoria.classList.remove("cerrando");
  modalHistoria.classList.remove("oculto");
  modalHistoria.classList.add("abriendo");
  finalizarSecuenciaNarrativa(secuenciaHistoriaActiva);
  secuenciaHistoriaActiva = iniciarSecuenciaNarrativa(() => {
    btnContinuarHistoria.click();
  });

  const duracion = prefiereReducirMovimiento.matches
    ? duracionPresentacionMisionReducida
    : duracionPresentacionMision;

  window.setTimeout(() => {
    const presentacionSigueActiva =
      secuenciaActual === secuenciaPresentacionMision &&
      !modalHistoria.classList.contains("oculto") &&
      !transicionEscenaActiva;

    if (presentacionSigueActiva) btnContinuarHistoria.click();
  }, duracion);
}

function navegarMisionDev(direccion) {
  if (
    !modoPruebasActivo ||
    transicionEscenaActiva ||
    navegacionDevPendiente
  ) {
    return;
  }

  const ultimaMision = obtenerCantidadMisiones(escenarioActual) - 1;
  const nuevaMision = Math.min(
    Math.max(misionActual + direccion, 0),
    ultimaMision,
  );

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
  herramientasPruebasJuego.classList.toggle("oculto", !modoPruebasActivo);
  btnMisionAnterior.disabled = misionActual === 0;
  btnMisionSiguiente.disabled =
    misionActual >= obtenerCantidadMisiones(escenarioActual) - 1;
}

function actualizarModoPruebas(activar, { restaurarProgreso = true } = {}) {
  modoPruebasActivo = Boolean(activar);
  modoPruebas.checked = modoPruebasActivo;
  panelModoPruebas.classList.toggle("oculto", !modoPruebasActivo);
  btnCompletarPalabrasPruebasVersus.classList.toggle("oculto", !modoPruebasActivo);
  herramientasPruebasVersus.classList.toggle("oculto", !modoPruebasActivo);
  localStorage.setItem(
    "modoPruebasAventuraGA",
    modoPruebasActivo ? "activo" : "inactivo",
  );

  if (modoPruebasActivo) {
    actualizarSelectoresPruebas();
  } else if (restaurarProgreso) {
    restaurarPartidaTrasPruebas();
  }

  actualizarControlesDev();
}

function actualizarSelectoresPruebas() {
  const mundoSeleccionado =
    selectorMundoPruebas.value === ""
      ? Number.NaN
      : Number(selectorMundoPruebas.value);
  const limiteDisponible = aventura.length - 1;

  selectorMundoPruebas.innerHTML = "";

  for (let indice = 0; indice <= limiteDisponible; indice++) {
    const opcion = document.createElement("option");
    opcion.value = `${indice}`;
    opcion.textContent = `Mundo ${indice + 1} · ${aventura[indice].nombre}`;
    selectorMundoPruebas.appendChild(opcion);
  }

  const mundoPreferido = Number.isInteger(mundoSeleccionado)
    ? mundoSeleccionado
    : escenarioActual;
  selectorMundoPruebas.value = `${Math.min(mundoPreferido, limiteDisponible)}`;
  actualizarSelectorMisionesPruebas();
}

function actualizarSelectorMisionesPruebas() {
  const mundo = Number(selectorMundoPruebas.value) || 0;
  const misionSeleccionada =
    selectorMisionPruebas.value === ""
      ? Number.NaN
      : Number(selectorMisionPruebas.value);
  const cantidadMisiones = obtenerCantidadMisiones(mundo);

  selectorMisionPruebas.innerHTML = "";

  for (let indice = 0; indice < cantidadMisiones; indice++) {
    const opcion = document.createElement("option");
    const historia = mundo === 0 ? historiaBosque[indice] : null;
    opcion.value = `${indice}`;
    opcion.textContent = historia
      ? `Misión ${indice + 1} · ${historia.titulo}`
      : `Misión ${indice + 1}`;
    selectorMisionPruebas.appendChild(opcion);
  }

  const misionPreferida = Number.isInteger(misionSeleccionada)
    ? misionSeleccionada
    : mundo === escenarioActual
      ? misionActual
      : 0;
  selectorMisionPruebas.value = `${Math.min(
    Math.max(misionPreferida, 0),
    cantidadMisiones - 1,
  )}`;
}

function obtenerCantidadMisiones(escenario) {
  if (escenario === 0) return historiaBosque.length;
  if (escenario === 1) return 1;
  return aventura[escenario]?.palabras.length || 1;
}

function iniciarMisionSeleccionadaPruebas() {
  if (!modoPruebasActivo) return;

  const mundoSeleccionado = Number(selectorMundoPruebas.value);
  const misionSeleccionada = Number(selectorMisionPruebas.value);

  if (
    !Number.isInteger(mundoSeleccionado) ||
    !Number.isInteger(misionSeleccionada) ||
    mundoSeleccionado < 0 ||
    mundoSeleccionado >= aventura.length ||
    misionSeleccionada < 0 ||
    misionSeleccionada >= obtenerCantidadMisiones(mundoSeleccionado)
  ) {
    return;
  }

  cancelarSecuenciaNarrativaActual();
  detenerSonidos();
  escenarioActual = mundoSeleccionado;
  misionActual = misionSeleccionada;
  desafioActual = 1;
  desafiosCompletados = 0;
  palabrasUsadasEnMision = [];
  sonidoNarrativoPendiente = "";
  historiaMisionPendiente = false;
  portalAbierto = false;

  if (escenarioActual === 0 && misionActual >= 9) {
    cristalesObtenidos = Math.max(cristalesObtenidos, 1);
  }

  actualizarJugador();
  void iniciarMisionAventura();
}

function restaurarPartidaTrasPruebas() {
  const progresoGuardado = localStorage.getItem("progresoAventuraGA");

  if (progresoGuardado) {
    cargarProgreso();
    return;
  }

  reiniciarEstadoAventura();
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
  actualizarPortalMision();
  actualizarAmbienteHojasMision();
  actualizarTormentaMision();
  actualizarNieblaMision();
  actualizarMiradasLobosMision();
  actualizarPresenciaBosqueMision();
  actualizarAranaBosqueMision();
  mensajePersonaje.textContent = "";
  const portalFinalizado =
    escenarioActual === 0 && misionActual === 9 && portalAbierto;
  pantallaJuego.classList.toggle("portal-finalizado", portalFinalizado);

  if (portalFinalizado) {
    bloquearTeclado();
    btnPista.disabled = true;
    btnSiguiente.classList.add("oculto");
    mensajePersonaje.textContent = "El Portal de los Mundos está abierto.";
  }

  actualizarControlesDev();
}

function mostrarPrologo() {
  btnComenzarPrologo.disabled = false;
  modalPrologo.classList.remove("cerrando", "oculto");
  modalPrologo.classList.add("abriendo");
  reproducirMusicaPrologo();
  finalizarSecuenciaNarrativa(secuenciaPrologoActiva);
  secuenciaPrologoActiva = iniciarSecuenciaNarrativa(() => {
    btnComenzarPrologo.click();
  });
}

function mostrarIntroduccionMundoDos() {
  btnComenzarMundo2.disabled = false;
  modalIntroduccionMundo2.classList.remove("cerrando", "oculto");
  modalIntroduccionMundo2.classList.add("abriendo");
  sonidos.comienzaMundo2.loop = true;
  sonidos.comienzaMundo2.volume = 1;
  reproducirSonido("comienzaMundo2");
  finalizarSecuenciaNarrativa(secuenciaIntroduccionMundoActiva);
  secuenciaIntroduccionMundoActiva = iniciarSecuenciaNarrativa(() => {
    btnComenzarMundo2.click();
  });

  return new Promise((resolve) => {
    resolverIntroduccionMundo2 = resolve;
  });
}

function reiniciarEstadoAventura() {
  cancelarSecuenciaNarrativaActual();
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
  maximoEscenarioDesbloqueado = 0;
  portalAbierto = false;
  desafioActual = 1;
  desafiosCompletados = 0;
  sonidoNarrativoPendiente = "";
  historiaMisionPendiente = false;
  transicionEscenaActiva = false;
  navegacionDevPendiente = false;
  secuenciaPresentacionMision += 1;
  presentacionMisionYaCargada = false;
  transicionIntroduccionMundo2Activa = false;
  sonidos.comienzaMundo2.loop = false;
  sonidos.comienzaMundo2.volume = 1;
  modalIntroduccionMundo2.classList.add("oculto");
  modalIntroduccionMundo2.classList.remove("abriendo", "cerrando");

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
  return esperarMovimiento(duracionTransicionHistoria);
}

function debeCruzarPuenteEnTransicion() {
  const fondoActual = fondoEscenario.currentSrc || fondoEscenario.src;

  return (
    escenarioActual === 0 &&
    misionActual === 8 &&
    fondoActual.includes("bosque-8-peligroso.png")
  );
}

async function ejecutarCrucePuente() {
  if (prefiereReducirMovimiento.matches || !personajeImagen.animate) return;

  const escena = contenedorEscenario.getBoundingClientRect();
  const explorador = personajeImagen.getBoundingClientRect();
  const origenX = explorador.left + explorador.width / 2;
  const origenY = explorador.bottom;
  const crearTransformacion = (x, y, escala) =>
    `translate3d(${escena.left + escena.width * x - origenX}px, ` +
    `${escena.top + escena.height * y - origenY}px, 0) scale(${escala})`;

  personajeImagen.classList.remove("caminando");
  personajeImagen.classList.add("explorador-cruzando-puente");
  iniciarCicloCaminata(escenarioActual, "portal");

  const cruce = personajeImagen.animate(
    [
      {
        offset: 0,
        transform: "translate3d(0, 0, 0) scale(1)",
      },
      {
        offset: 0.28,
        transform: crearTransformacion(0.49, 0.72, 0.9),
      },
      {
        offset: 0.55,
        transform: crearTransformacion(0.53, 0.58, 0.68),
      },
      {
        offset: 0.78,
        transform: crearTransformacion(0.57, 0.46, 0.46),
      },
      {
        offset: 1,
        transform: crearTransformacion(0.6, 0.33, 0.27),
      },
    ],
    {
      duration: duracionCrucePuente,
      easing: "linear",
      fill: "forwards",
    },
  );

  try {
    await esperarAnimacionNarrativa(cruce);
  } finally {
    personajeImagen.classList.add("oculto-transicion");
    detenerCicloCaminata();
    cruce.cancel();
    personajeImagen.classList.remove("explorador-cruzando-puente");
  }
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
  const secuencia = secuenciaNarrativaActual;
  const duracionFinal =
    prefiereReducirMovimiento.matches || secuencia?.saltada ? 0 : duracion;

  if (duracionFinal === 0) return Promise.resolve();

  return new Promise((resolve) => {
    let terminada = false;
    const completar = () => {
      if (terminada) return;
      terminada = true;
      clearTimeout(temporizador);
      secuencia?.esperas.delete(completar);
      resolve();
    };
    const temporizador = setTimeout(completar, duracionFinal);

    secuencia?.esperas.add(completar);
  });
}

function mostrarMensajeDesafioSuperado() {
  const secuencia = ++secuenciaMensajeDesafioSuperado;
  const duracion = prefiereReducirMovimiento.matches ? 1500 : 2200;

  mensajeDesafioSuperado.classList.remove("visible");
  void mensajeDesafioSuperado.offsetWidth;
  mensajeDesafioSuperado.textContent = "✨ ¡Desafío superado! ✨";
  mensajeDesafioSuperado.classList.add("visible");

  return new Promise((resolve) => {
    setTimeout(() => {
      if (secuencia !== secuenciaMensajeDesafioSuperado) {
        resolve(false);
        return;
      }

      mensajeDesafioSuperado.classList.remove("visible");
      mensajeDesafioSuperado.textContent = "";
      resolve(true);
    }, duracion);
  });
}

function ocultarMensajeDesafioSuperado() {
  secuenciaMensajeDesafioSuperado++;
  mensajeDesafioSuperado.classList.remove("visible");
  mensajeDesafioSuperado.textContent = "";
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
      if (saltoNarrativoSolicitado()) {
        musicaPrologo.pause();
        musicaPrologo.currentTime = 0;
        musicaPrologo.volume = 0.25;
        resolve();
        return;
      }

      const progreso = Math.min(
        Math.max((ahora - inicio) / duracion, 0),
        1,
      );
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
  detenerCicloCaminata();
  limpiarCinematicaSantuario();
  detenerPolvoImpacto();
  detenerAmbientePuente();
  detenerAmbienteCristal();
  detenerPortalMision();
  detenerAmbienteHojas();
  detenerTormenta();
  detenerNiebla();
  detenerMiradasLobos();
  detenerPresenciaBosque();
  detenerAranaBosque();
  detenerVientoArena();
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

function detenerVientoArena() {
  contenedorEscenario
    .querySelectorAll(".capa-viento-arena")
    .forEach((capa) => capa.remove());
}

function actualizarVientoArenaMision() {
  const esPrimeraMisionDesierto =
    escenarioActual === 1 && misionActual === 0;
  const capaExistente = contenedorEscenario.querySelector(
    ".capa-viento-arena",
  );

  if (!esPrimeraMisionDesierto || prefiereReducirMovimiento.matches) {
    capaExistente?.remove();
    return;
  }

  if (capaExistente) return;

  const capa = document.createElement("div");
  const cantidadParticulas = window.matchMedia("(max-width: 600px)").matches
    ? 10
    : 16;

  capa.className = "capa-viento-arena";
  capa.setAttribute("aria-hidden", "true");

  for (let indice = 0; indice < cantidadParticulas; indice++) {
    const particula = document.createElement("span");
    const tamano = 1 + Math.random() * 1.6;

    particula.className = "particula-arena";
    particula.style.setProperty("--y-arena", `${12 + Math.random() * 76}%`);
    particula.style.setProperty(
      "--duracion-arena",
      `${10 + Math.random() * 9}s`,
    );
    particula.style.setProperty(
      "--retraso-arena",
      `${-Math.random() * 18}s`,
    );
    particula.style.setProperty(
      "--deriva-arena",
      `${-8 + Math.random() * 16}px`,
    );
    particula.style.setProperty("--tamano-arena", `${tamano}px`);
    particula.style.setProperty(
      "--opacidad-arena",
      `${0.28 + Math.random() * 0.3}`,
    );
    capa.appendChild(particula);
  }

  contenedorEscenario.appendChild(capa);
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

function detenerSonido(nombre) {
  const sonido = sonidos[nombre];
  if (!sonido) return;

  sonido.onended = null;
  sonido.pause();
  sonido.currentTime = 0;
}

function desvanecerSonido(nombre, duracion) {
  const sonido = sonidos[nombre];

  if (!sonido || sonido.paused || sonido.ended) {
    if (sonido) sonido.volume = 1;
    return Promise.resolve();
  }

  const volumenInicial = sonido.volume;
  const inicio = performance.now();

  return new Promise((resolve) => {
    const reducirVolumen = (ahora) => {
      if (saltoNarrativoSolicitado()) {
        detenerSonido(nombre);
        sonido.volume = 1;
        resolve();
        return;
      }

      const progreso = Math.min(
        Math.max((ahora - inicio) / duracion, 0),
        1,
      );
      sonido.volume = volumenInicial * (1 - progreso);

      if (progreso < 1 && !sonido.paused && !sonido.ended) {
        requestAnimationFrame(reducirVolumen);
        return;
      }

      detenerSonido(nombre);
      sonido.volume = 1;
      resolve();
    };

    requestAnimationFrame(reducirVolumen);
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
  const estadoConfigurado =
    estadosExploradorPorEscenario[escenarioActual]?.[misionActual];

  if (estadoConfigurado) return estadoConfigurado;

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
  ocultarMensajeDesafioSuperado();
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
  actualizarPortalMision();
  actualizarAmbienteHojasMision();
  actualizarTormentaMision();
  actualizarNieblaMision();
  actualizarMiradasLobosMision();
  actualizarPresenciaBosqueMision();
  actualizarAranaBosqueMision();
  mensajePersonaje.textContent = "";
  mensajePersonaje.classList.remove("oculto");
  teclado.innerHTML = "";
  textoPista.classList.add("oculto");
  textoPista.textContent = "";
  btnPista.disabled = false;
  btnSiguiente.classList.add("oculto");

  mostrarPalabra();
  crearTeclado();
  const portalFinalizado =
    escenarioActual === 0 && misionActual === 9 && portalAbierto;
  pantallaJuego.classList.toggle("portal-finalizado", portalFinalizado);

  if (portalFinalizado) {
    bloquearTeclado();
    btnPista.disabled = true;
    mensajePersonaje.textContent = "El Portal de los Mundos está abierto.";
  }

  mostrarPantalla(pantallaJuego);

  if (portalFinalizado) {
    requestAnimationFrame(() => {
      void reanudarCinematicaFinalPortal();
    });
  }

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
  detenerPortalMision();
  detenerAmbienteHojas();
  detenerTormenta();
  detenerNiebla();
  detenerMiradasLobos();
  detenerPresenciaBosque();
  detenerAranaBosque();

  misionActual++;
  mensajePersonaje.textContent = "🏆 ¡Misión completada!";
  let sonidoNarrativo = sonidosNarrativosPorMision[misionActual] || "";

  if (misionActual >= obtenerCantidadMisiones(escenarioActual)) {
    misionActual = 0;
    sonidoNarrativo = "";

    escenarioActual++;

    if (!modoPruebasActivo) {
      maximoEscenarioDesbloqueado = Math.max(
        maximoEscenarioDesbloqueado,
        Math.min(escenarioActual, aventura.length - 1),
      );
    }

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
  if (modoPruebasActivo) return;

  const progreso = {
    escenarioActual,
    misionActual,
    desafioActual,
    desafiosCompletados,
    monedas,
    experiencia,
    cristalesObtenidos,
    portalAbierto,
    maximoEscenarioDesbloqueado,
  };

  localStorage.setItem("progresoAventuraGA", JSON.stringify(progreso));

  actualizarMenuPrincipal();
}

function cargarProgreso() {
  const progresoGuardado = localStorage.getItem("progresoAventuraGA");

  if (!progresoGuardado) {
    maximoEscenarioDesbloqueado = 0;
    actualizarMenuPrincipal();
    return;
  }

  let progreso;

  try {
    progreso = JSON.parse(progresoGuardado);
  } catch {
    localStorage.removeItem("progresoAventuraGA");
    maximoEscenarioDesbloqueado = 0;
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
  portalAbierto = progreso.portalAbierto === true;
  maximoEscenarioDesbloqueado = Math.min(
    Math.max(
      progreso.maximoEscenarioDesbloqueado ?? escenarioActual,
      escenarioActual,
      0,
    ),
    aventura.length - 1,
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
actualizarModoPruebas(
  localStorage.getItem("modoPruebasAventuraGA") === "activo",
  { restaurarProgreso: false },
);
actualizarControlesDev();
crearTecladoVersus();
precargarImagenesBosque();
precargarImagenesExplorador();
precargarSpritesCaminata();
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
        fondo: "bosque-8-peligroso.png",
        texto:
          "🌉 Descubre la palabra para cruzar el viejo puente con seguridad.",
      },
      {
        fondo: "bosque-9.png",
        texto:
          "💎 Solo quien resuelva la palabra podrá acercarse al Cristal de la Sabiduría.",
      },
      {
        fondo: "bosque-10-apagado.png",
        texto: "🌌 La última palabra abrirá el Portal de los Mundos.",
      },
    ],
    [
      {
        fondo: "desierto-1.png",
        texto:
          "🌵 Descubre la palabra secreta para comenzar tu expedición por el Desierto Perdido.",
      },
    ],
  ];

  const escenasPorMision =
    escenasPorEscenario[escenarioActual] || escenasPorEscenario[0];
  const escena =
    escenasPorMision[Math.min(misionActual, escenasPorMision.length - 1)];
  const fondoPortalActivo =
    escenarioActual === 0 && misionActual === 9 && portalAbierto;
  const nombreFondo = fondoPortalActivo ? "bosque-10.png" : escena.fondo;

  contenedorEscenario.classList.toggle(
    "escenario-desierto",
    escenarioActual === 1,
  );
  fondoEscenario.src = `assets/images/fondos/${nombreFondo}`;
  actualizarVientoArenaMision();
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

    if (
      prefiereReducirMovimiento.matches ||
      saltoNarrativoSolicitado() ||
      !imagen.animate
    ) {
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

      await esperarAnimacionNarrativa(zoom);
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
    recorte.src = "assets/images/fondos/bosque-8-peligroso.png";
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

function actualizarPortalMision() {
  detenerPortalMision();

  if (escenarioActual !== 0 || misionActual !== 9) return;

  const capaPortal = document.createElement("div");
  const remolino = document.createElement("div");
  const resplandor = document.createElement("div");
  const neblina = document.createElement("div");

  capaPortal.className = "capa-portal-magico";
  capaPortal.setAttribute("aria-hidden", "true");
  remolino.className = "remolino-portal";
  resplandor.className = "resplandor-portal";
  neblina.className = "neblina-portal";
  capaPortal.append(remolino, resplandor);

  const particulas = [
    [35, 38, 2, 10.8, -2.4, -8, -13, "verde"],
    [38, 29, 3, 12.6, -7.1, 7, -16, "celeste"],
    [43, 22, 2, 9.8, -5.6, -5, -12, "verde"],
    [50, 18, 3, 13.4, -9.3, 6, -15, "celeste"],
    [57, 22, 2, 11.7, -4.2, 8, -11, "verde"],
    [63, 30, 3, 12.9, -8.4, -6, -15, "celeste"],
    [66, 40, 2, 10.3, -1.8, -8, -12, "verde"],
    [63, 51, 3, 14.1, -10.5, 6, -14, "celeste"],
    [57, 58, 2, 11.2, -6.7, -7, -10, "verde"],
    [43, 58, 3, 13.7, -11.2, 8, -14, "celeste"],
    [37, 51, 2, 10.6, -3.5, 6, -12, "verde"],
    [69, 47, 2, 12.1, -8.9, -5, -10, "celeste"],
  ];

  particulas.forEach(
    ([x, y, tamano, duracion, retraso, derivaX, derivaY, color]) => {
      const particula = document.createElement("span");
      particula.className = `particula-portal particula-portal-${color}`;
      particula.style.setProperty("--portal-x", `${x}%`);
      particula.style.setProperty("--portal-y", `${y}%`);
      particula.style.setProperty("--portal-tamano", `${tamano}px`);
      particula.style.setProperty("--portal-duracion", `${duracion}s`);
      particula.style.setProperty("--portal-retraso", `${retraso}s`);
      particula.style.setProperty("--portal-deriva-x", `${derivaX}px`);
      particula.style.setProperty("--portal-deriva-y", `${derivaY}px`);
      capaPortal.appendChild(particula);
    },
  );

  [
    [50, 20, 8.8, -3.1],
    [62, 28, 11.6, -8.4],
    [66, 43, 10.2, -5.7],
    [57, 58, 12.8, -10.3],
    [39, 54, 9.7, -6.5],
    [34, 38, 13.1, -11.8],
  ].forEach(([x, y, duracion, retraso]) => {
    const destello = document.createElement("span");
    destello.className = "destello-aro-portal";
    destello.style.left = `${x}%`;
    destello.style.top = `${y}%`;
    destello.style.setProperty("--destello-portal-duracion", `${duracion}s`);
    destello.style.setProperty("--destello-portal-retraso", `${retraso}s`);
    capaPortal.appendChild(destello);
  });

  capaPortal.appendChild(neblina);
  contenedorEscenario.insertBefore(capaPortal, personajeImagen);

  if (portalAbierto) {
    capaPortal.classList.add("portal-abierto");
    agregarRefuerzoPortal(capaPortal);
    mostrarMensajePortal(
      capaPortal,
      "El Portal de los Mundos está abierto.",
      true,
    );
    ranuraCristalBosque.classList.add("portal-conectado");
  }
}

function detenerPortalMision() {
  secuenciaAperturaPortal++;
  cinematicaPortalActiva = false;
  pantallaJuego.classList.remove("secuencia-apertura-portal-activa");
  ranuraCristalBosque.classList.remove(
    "energizando-portal",
    "portal-conectado",
  );
  document
    .querySelectorAll(".corriente-energia-portal")
    .forEach((corriente) => corriente.remove());
  contenedorEscenario
    .querySelectorAll(".capa-portal-magico")
    .forEach((capa) => capa.remove());
}

function agregarRefuerzoPortal(capaPortal) {
  if (capaPortal.querySelector(".refuerzo-portal")) return;

  const refuerzo = document.createElement("div");
  refuerzo.className = "refuerzo-portal";

  [
    [40, 31, 2, 7.8, -1.2, 8, -16, "verde"],
    [46, 24, 3, 8.6, -5.3, -6, -18, "celeste"],
    [55, 25, 2, 7.4, -3.7, 7, -15, "verde"],
    [61, 34, 3, 9.1, -6.4, -8, -17, "celeste"],
    [60, 49, 2, 8.2, -2.8, 7, -14, "verde"],
    [53, 55, 3, 9.5, -7.2, -6, -17, "celeste"],
    [45, 54, 2, 7.7, -4.6, 8, -14, "verde"],
    [38, 44, 3, 8.9, -6.9, -7, -16, "celeste"],
  ].forEach(([x, y, tamano, duracion, retraso, derivaX, derivaY, color]) => {
    const particula = document.createElement("span");
    particula.className =
      `particula-portal particula-portal-${color} particula-portal-refuerzo`;
    particula.style.setProperty("--portal-x", `${x}%`);
    particula.style.setProperty("--portal-y", `${y}%`);
    particula.style.setProperty("--portal-tamano", `${tamano}px`);
    particula.style.setProperty("--portal-duracion", `${duracion}s`);
    particula.style.setProperty("--portal-retraso", `${retraso}s`);
    particula.style.setProperty("--portal-deriva-x", `${derivaX}px`);
    particula.style.setProperty("--portal-deriva-y", `${derivaY}px`);
    refuerzo.appendChild(particula);
  });

  [
    [45, 21, 6.8, -2.1],
    [57, 24, 8.1, -5.6],
    [65, 36, 7.4, -3.8],
    [63, 50, 8.8, -6.9],
    [53, 59, 7.1, -4.4],
    [41, 56, 8.5, -7.3],
  ].forEach(([x, y, duracion, retraso]) => {
    const destello = document.createElement("span");
    destello.className = "destello-aro-portal destello-portal-refuerzo";
    destello.style.left = `${x}%`;
    destello.style.top = `${y}%`;
    destello.style.setProperty("--destello-portal-duracion", `${duracion}s`);
    destello.style.setProperty("--destello-portal-retraso", `${retraso}s`);
    refuerzo.appendChild(destello);
  });

  capaPortal.appendChild(refuerzo);
}

function mostrarMensajePortal(capaPortal, texto, final = false) {
  let mensaje = capaPortal.querySelector(".mensaje-apertura-portal");

  if (!mensaje) {
    mensaje = document.createElement("p");
    mensaje.className = "mensaje-apertura-portal";
    capaPortal.appendChild(mensaje);
  }

  mensaje.textContent = texto;
  mensaje.classList.toggle("mensaje-final", final);
  mensaje.classList.add("visible");
  return mensaje;
}

function crearCorrienteEnergiaPortal() {
  const origen = cristalPanelBosque.getBoundingClientRect();
  const escena = contenedorEscenario.getBoundingClientRect();
  const inicioX = origen.left + origen.width / 2;
  const inicioY = origen.top + origen.height / 2;
  const destinoX = escena.left + escena.width * 0.5;
  const destinoY = escena.top + escena.height * 0.4;
  const distancia = Math.hypot(destinoX - inicioX, destinoY - inicioY);
  const angulo =
    (Math.atan2(destinoY - inicioY, destinoX - inicioX) * 180) / Math.PI;
  const corriente = document.createElement("span");

  corriente.className = "corriente-energia-portal";
  corriente.setAttribute("aria-hidden", "true");
  corriente.style.left = `${inicioX}px`;
  corriente.style.top = `${inicioY}px`;
  corriente.style.setProperty("--corriente-longitud", `${distancia}px`);
  corriente.style.setProperty("--corriente-angulo", `${angulo}deg`);
  document.body.appendChild(corriente);
  return corriente;
}

async function encuadrarCorrientePortalEnMovil() {
  if (!window.matchMedia("(max-width: 700px)").matches) return;

  const cristal = cristalPanelBosque.getBoundingClientRect();
  const escena = contenedorEscenario.getBoundingClientRect();
  const viewport = window.visualViewport;
  const limiteSuperior = viewport?.offsetTop ?? 0;
  const limiteInferior =
    limiteSuperior + (viewport?.height ?? window.innerHeight);
  const centroPortal = escena.top + escena.height * 0.4;
  const cristalVisible =
    cristal.top >= limiteSuperior + 6 &&
    cristal.bottom <= limiteInferior - 6;
  const portalVisible =
    centroPortal >= limiteSuperior + 6 &&
    centroPortal <= limiteInferior - 6;

  if (cristalVisible && portalVisible) return;

  const destinoScroll = Math.max(
    0,
    window.scrollY + panelCristales.getBoundingClientRect().top - 8,
  );

  window.scrollTo({
    top: destinoScroll,
    behavior: prefiereReducirMovimiento.matches ? "auto" : "smooth",
  });
  await esperarMovimiento(600);
}

function bloquearControlesAperturaPortal() {
  const estados = Array.from(pantallaJuego.querySelectorAll("button")).map(
    (boton) => [boton, boton.disabled],
  );

  estados.forEach(([boton]) => {
    boton.disabled = true;
  });
  pantallaJuego.classList.add("secuencia-apertura-portal-activa");

  return () => {
    if (escenarioActual === 0 && misionActual === 9) {
      estados.forEach(([boton, estabaDeshabilitado]) => {
        if (boton.isConnected) boton.disabled = estabaDeshabilitado;
      });
    }

    pantallaJuego.classList.remove("secuencia-apertura-portal-activa");
  };
}

async function completarAperturaPortal() {
  if (cinematicaPortalActiva) return;

  let capaPortal = contenedorEscenario.querySelector(".capa-portal-magico");

  if (!capaPortal) {
    actualizarPortalMision();
    capaPortal = contenedorEscenario.querySelector(".capa-portal-magico");
  }

  if (!capaPortal) return;

  cinematicaPortalActiva = true;
  const secuenciaNarrativa = iniciarSecuenciaNarrativa();
  const secuencia = ++secuenciaAperturaPortal;
  const restaurarControles = bloquearControlesAperturaPortal();
  let corriente = null;

  ranuraCristalBosque.classList.add("energizando-portal");
  capaPortal.classList.remove("portal-abierto");
  capaPortal.classList.add("portal-despertando");

  try {
    await esperarMovimiento(650);
    if (secuencia !== secuenciaAperturaPortal || !capaPortal.isConnected) return;

    await encuadrarCorrientePortalEnMovil();
    if (secuencia !== secuenciaAperturaPortal || !capaPortal.isConnected) return;

    corriente = crearCorrienteEnergiaPortal();
    requestAnimationFrame(() => corriente?.classList.add("activa"));
    await esperarMovimiento(1250);
    if (secuencia !== secuenciaAperturaPortal || !capaPortal.isConnected) return;

    capaPortal.classList.add("recibiendo-energia");
    agregarRefuerzoPortal(capaPortal);
    reproducirEfectoAmbiental("ambientePortal");
    void cambiarFondoMisionConFundido("bosque-10.png");

    const onda = document.createElement("span");
    onda.className = "onda-apertura-portal";
    capaPortal.appendChild(onda);
    requestAnimationFrame(() => onda.classList.add("activa"));

    mostrarMensajePortal(
      capaPortal,
      "El Cristal de la Sabiduría ha despertado el portal.",
    );
    await esperarMovimiento(1900);
    onda.remove();
    if (secuencia !== secuenciaAperturaPortal || !capaPortal.isConnected) return;

    const mensaje = capaPortal.querySelector(".mensaje-apertura-portal");
    mensaje?.classList.add("cambiando");
    await esperarMovimiento(280);

    capaPortal.classList.remove("portal-despertando", "recibiendo-energia");
    capaPortal.classList.add("portal-abierto");
    ranuraCristalBosque.classList.remove("energizando-portal");
    ranuraCristalBosque.classList.add("portal-conectado");
    mostrarMensajePortal(
      capaPortal,
      "El Portal de los Mundos está abierto.",
      true,
    ).classList.remove("cambiando");
    mensajePersonaje.textContent = "El Portal de los Mundos está abierto.";
    corriente?.classList.add("desvaneciendo");
    await esperarMovimiento(1000);
    if (secuencia !== secuenciaAperturaPortal || !capaPortal.isConnected) return;

    await ejecutarCinematicaFinalPortal(capaPortal, secuencia);
  } catch (error) {
    console.error("[portal] No se pudo completar la apertura", error);
    capaPortal.classList.remove("portal-despertando", "recibiendo-energia");
    capaPortal.classList.add("portal-abierto");
    fondoEscenario.src = "assets/images/fondos/bosque-10.png";
    agregarRefuerzoPortal(capaPortal);
    mostrarMensajePortal(
      capaPortal,
      "El Portal de los Mundos está abierto.",
      true,
    );
  } finally {
    corriente?.remove();
    restaurarControles();

    if (secuencia === secuenciaAperturaPortal) {
      cinematicaPortalActiva = false;
      pantallaJuego.classList.add("portal-finalizado");
      ranuraCristalBosque.classList.remove("energizando-portal");
      ranuraCristalBosque.classList.add("portal-conectado");
    }

    finalizarSecuenciaNarrativa(secuenciaNarrativa);
  }
}

async function ejecutarCinematicaFinalPortal(capaPortal, secuencia) {
  if (
    secuencia !== secuenciaAperturaPortal ||
    !capaPortal?.isConnected ||
    escenarioActual !== 0 ||
    misionActual !== 9
  ) {
    return;
  }

  const escena = contenedorEscenario.getBoundingClientRect();
  const explorador = personajeImagen.getBoundingClientRect();
  const destinoX =
    escena.left + escena.width * 0.5 - (explorador.left + explorador.width / 2);
  const destinoY =
    escena.top + escena.height * 0.43 - (explorador.top + explorador.height);
  const duracionCaminata = prefiereReducirMovimiento.matches ? 0 : 4800;
  const duracionAbsorcion = prefiereReducirMovimiento.matches ? 0 : 900;
  const luz = document.createElement("span");
  const destello = document.createElement("span");
  const cierre = document.createElement("div");
  const titulo = document.createElement("h2");
  const subtitulo = document.createElement("p");

  luz.className = "luz-absorcion-portal";
  destello.className = "destello-final-portal";
  cierre.className = "cierre-cinematica-mundo";
  cierre.setAttribute("aria-hidden", "true");
  titulo.className = "titulo-mundo-siguiente";
  titulo.textContent = "Mundo 2";
  subtitulo.className = "nombre-mundo-siguiente";
  subtitulo.textContent = "Desierto Perdido";
  cierre.append(titulo, subtitulo);
  contenedorEscenario.append(luz, destello, cierre);

  const mensajePortal = capaPortal.querySelector(".mensaje-apertura-portal");
  mensajePortal?.classList.add("saliendo-cinematica");
  pantallaJuego.classList.add("cinematica-final-portal-activa");
  personajeImagen.classList.remove(
    "celebrando",
    "reaccion-acierto",
    "reaccion-error",
    "reaccion-derrota",
    "caminando",
  );
  personajeImagen.classList.add("explorador-viajando-portal");

  let caminata = null;
  let absorcion = null;

  try {
    if (
      duracionCaminata > 0 &&
      !saltoNarrativoSolicitado() &&
      personajeImagen.animate
    ) {
      iniciarCicloCaminata(escenarioActual, "portal");
      const pasos = Array.from({ length: 11 }, (_, indice) => {
        const progreso = indice / 10;
        const oscilacion =
          indice === 0 || indice === 10 ? 0 : indice % 2 === 0 ? 2 : -2;
        const escala = 1 - progreso * 0.72;

        return {
          offset: progreso,
          transform:
            `translate3d(${destinoX * progreso}px, ` +
            `${destinoY * progreso + oscilacion}px, 0) scale(${escala})`,
        };
      });

      caminata = personajeImagen.animate(pasos, {
        duration: duracionCaminata,
        easing: "linear",
        fill: "forwards",
      });
      await esperarAnimacionNarrativa(caminata);
      detenerCicloCaminata();
    } else {
      personajeImagen.style.transform =
        `translate3d(${destinoX}px, ${destinoY}px, 0) scale(0.28)`;
    }

    if (
      secuencia !== secuenciaAperturaPortal ||
      !capaPortal.isConnected ||
      escenarioActual !== 0 ||
      misionActual !== 9
    ) {
      return;
    }

    capaPortal.classList.add("absorbiendo-explorador");
    luz.classList.add("activa");

    const transformacionFinal =
      `translate3d(${destinoX}px, ${destinoY}px, 0) scale(0.28)`;
    const transformacionAbsorbida =
      `translate3d(${destinoX}px, ${destinoY - 2}px, 0) scale(0.12)`;

    if (
      duracionAbsorcion > 0 &&
      !saltoNarrativoSolicitado() &&
      personajeImagen.animate
    ) {
      absorcion = personajeImagen.animate(
        [
          {
            opacity: 1,
            filter: "brightness(1) blur(0)",
            transform: transformacionFinal,
          },
          {
            opacity: 0,
            filter: "brightness(2.2) blur(2px)",
            transform: transformacionAbsorbida,
          },
        ],
        {
          duration: duracionAbsorcion,
          easing: "cubic-bezier(0.4, 0, 0.3, 1)",
          fill: "forwards",
        },
      );
      await esperarAnimacionNarrativa(absorcion);
    } else {
      personajeImagen.style.opacity = "0";
      personajeImagen.style.filter = "brightness(2.2) blur(2px)";
      personajeImagen.style.transform = transformacionAbsorbida;
    }

    capaPortal.classList.remove("absorbiendo-explorador");
    destello.classList.add("activo");
    await esperarMovimiento(850);

    cierre.classList.add("visible");
    await esperarMovimiento(1200);
    cierre.classList.add("mostrando-titulo");
    await esperarMovimiento(3200);

    if (
      secuencia !== secuenciaAperturaPortal ||
      escenarioActual !== 0 ||
      misionActual !== 9
    ) {
      return;
    }

    portalAbierto = false;
    sonidoNarrativoPendiente = avanzarMision();
    historiaMisionPendiente = false;
    guardarProgreso();

    caminata?.cancel();
    absorcion?.cancel();
    limpiarEstadoExploradorPortal();

    cierre.remove();
    luz.remove();
    destello.remove();

    await mostrarIntroduccionMundoDos();
    await iniciarMisionAventura({ presentarMision: true });
    mostrarHistoriaMision({ misionYaCargada: true });
    guardarProgreso();
    restablecerControlesTrasPortal();
  } finally {
    detenerCicloCaminata();
    caminata?.cancel();
    absorcion?.cancel();
    limpiarEstadoExploradorPortal();
    capaPortal?.classList.remove("absorbiendo-explorador");
    luz.remove();
    destello.remove();
    cierre.remove();
    pantallaJuego.classList.remove("cinematica-final-portal-activa");

    if (escenarioActual !== 0) {
      restablecerControlesTrasPortal();
    }
  }
}

function limpiarEstadoExploradorPortal() {
  personajeImagen.classList.remove("explorador-viajando-portal");
  personajeImagen.style.removeProperty("filter");
  personajeImagen.style.removeProperty("opacity");
  personajeImagen.style.removeProperty("transform");
}

function restablecerControlesTrasPortal() {
  cinematicaPortalActiva = false;
  transicionCinematicaActiva = false;
  pantallaJuego.classList.remove(
    "portal-finalizado",
    "secuencia-apertura-portal-activa",
    "cinematica-final-portal-activa",
  );

  btnPista.disabled = false;
  btnSalirJuego.disabled = false;
  btnSiguiente.disabled = false;
  btnReintentar.disabled = false;
  teclado.querySelectorAll(".letra").forEach((boton) => {
    boton.disabled = false;
  });
  actualizarControlesDev();
}

async function reanudarCinematicaFinalPortal() {
  if (
    cinematicaPortalActiva ||
    !portalAbierto ||
    escenarioActual !== 0 ||
    misionActual !== 9
  ) {
    return;
  }

  const capaPortal = contenedorEscenario.querySelector(".capa-portal-magico");
  if (!capaPortal) return;

  cinematicaPortalActiva = true;
  const secuenciaNarrativa = iniciarSecuenciaNarrativa();
  const secuencia = ++secuenciaAperturaPortal;
  const restaurarControles = bloquearControlesAperturaPortal();

  try {
    await esperarMovimiento(1000);
    await ejecutarCinematicaFinalPortal(capaPortal, secuencia);
  } catch (error) {
    console.error("[portal] No se pudo completar el viaje al Mundo 2", error);
  } finally {
    restaurarControles();

    if (secuencia === secuenciaAperturaPortal) {
      cinematicaPortalActiva = false;
    }

    finalizarSecuenciaNarrativa(secuenciaNarrativa);
  }
}

async function completarSantuarioConCinematica() {
  if (cinematicaSantuarioActiva) return;

  cinematicaSantuarioActiva = true;
  const secuenciaNarrativa = iniciarSecuenciaNarrativa();
  pantallaJuego.classList.add("cinematica-santuario-activa");
  btnSiguiente.classList.add("oculto");

  try {
    try {
      await esperarMovimiento(850);
      await ejecutarCinematicaSantuario();
    } catch (error) {
      console.error(
        "[cinematica-santuario] No se pudo completar la animación",
        error,
      );
      limpiarCinematicaSantuario();
    }

    cristalesObtenidos = Math.max(cristalesObtenidos, 1);
    actualizarJugador();
    sonidoNarrativoPendiente = avanzarMision();
    guardarProgreso();
    mensajePersonaje.textContent = "💎 ¡Cristal de la Sabiduría obtenido!";
    btnSiguiente.textContent = "➡️ Ir al Portal";
    btnSiguiente.classList.remove("oculto");
  } finally {
    pantallaJuego.classList.remove("cinematica-santuario-activa");
    cinematicaSantuarioActiva = false;
    finalizarSecuenciaNarrativa(secuenciaNarrativa);
  }
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
  reproducirSonido("diamanteRecolectado");
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

  if (
    prefiereReducirMovimiento.matches ||
    saltoNarrativoSolicitado() ||
    !cristal.animate
  ) {
    detenerSonido("diamanteRecolectado");
    cristal.remove();
    return;
  }

  const puntoMedioX = inicioX + (destinoX - inicioX) * 0.52;
  const puntoMedioY = Math.min(inicioY, destinoY) - 55;
  detenerSonido("diamanteRecolectado");
  reproducirSonido("cristalCasilla");
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

  await esperarAnimacionNarrativa(vuelo);
  detenerSonido("cristalCasilla");
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

  programarPresenciaFugazBosque(
    secuencia,
    capaPresencia,
    aleatorioEntre(
      demoraInicialMinimaPresenciaBosque,
      demoraInicialMaximaPresenciaBosque,
    ),
  );
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

  programarDescensoAranaBosque(
    secuencia,
    capaAranas,
    aleatorioEntre(
      demoraInicialMinimaAranaBosque,
      demoraInicialMaximaAranaBosque,
    ),
  );
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

function crearRutasSpritesCaminata(
  vestuario,
  nombreBase = "explorador-caminata",
) {
  return Array.from(
    { length: 4 },
    (_, indice) =>
      `assets/images/personajes/caminata/${vestuario}/` +
      `${nombreBase}-${indice + 1}.png`,
  );
}

function obtenerSpritesCaminata(
  escenario = escenarioActual,
  variante = "misiones",
) {
  const spritesPorEscenario =
    variante === "portal"
      ? spritesPortalPorEscenario
      : spritesCaminataPorEscenario;

  return spritesPorEscenario[escenario] || [];
}

function iniciarCicloCaminata(
  escenario = escenarioActual,
  variante = "misiones",
) {
  detenerCicloCaminata();

  const sprites = obtenerSpritesCaminata(escenario, variante);
  if (sprites.length === 0) return;

  srcReposoCaminata =
    personajeImagen.getAttribute("src") || obtenerSrcExplorador("feliz");
  let indice = 0;

  const mostrarSiguienteSprite = () => {
    personajeImagen.src = sprites[indice];
    indice = (indice + 1) % sprites.length;
  };

  mostrarSiguienteSprite();
  temporizadorSpriteCaminata = setInterval(
    mostrarSiguienteSprite,
    intervaloSpriteCaminata,
  );
}

function detenerCicloCaminata() {
  if (temporizadorSpriteCaminata) {
    clearInterval(temporizadorSpriteCaminata);
    temporizadorSpriteCaminata = null;
  }

  if (!srcReposoCaminata) return;

  personajeImagen.src = srcReposoCaminata;
  srcReposoCaminata = "";
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

  const fondoPortalApagado = new Image();
  fondoPortalApagado.src = "assets/images/fondos/bosque-10-apagado.png";

  const fondoPuentePeligroso = new Image();
  fondoPuentePeligroso.src =
    "assets/images/fondos/bosque-8-peligroso.png";
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

function precargarSpritesCaminata() {
  [
    ...Object.values(spritesCaminataPorEscenario),
    ...Object.values(spritesPortalPorEscenario),
  ]
    .flat()
    .forEach((src) => {
      const img = new Image();
      img.src = src;
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
