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
const pantallaSalaVersus = document.getElementById("pantallaSalaVersus");
const pantallaSeleccionPersonajeVersus = document.getElementById(
  "pantallaSeleccionPersonajeVersus",
);
const pantallaPreparacionVersus = document.getElementById(
  "pantallaPreparacionVersus",
);
const pantallaVersus = document.getElementById("pantallaVersus");
const marcoVersus = document.getElementById("marcoVersus");

const btnJugar = document.getElementById("btnJugar");
const btnVersus = document.getElementById("btnVersus");
const btnConfiguracion = document.getElementById("btnConfiguracion");
const modalConfiguracion = document.getElementById("modalConfiguracion");
const btnCerrarConfiguracion = document.getElementById("btnCerrarConfiguracion");
const vibracionAtaques = document.getElementById("vibracionAtaques");
const estadoVibracion = document.getElementById("estadoVibracion");
const btnSalirSalaVersus = document.getElementById("btnSalirSalaVersus");
const btnSalirSalaVersusVertical = document.getElementById("btnSalirSalaVersusVertical");
const inicioSalaVersus = document.getElementById("inicioSalaVersus");
const esperaSalaVersus = document.getElementById("esperaSalaVersus");
const aliasSalaVersus = document.getElementById("aliasSalaVersus");
const codigoSalaVersus = document.getElementById("codigoSalaVersus");
const btnCrearSalaVersus = document.getElementById("btnCrearSalaVersus");
const btnUnirseSalaVersus = document.getElementById("btnUnirseSalaVersus");
const errorSalaVersus = document.getElementById("errorSalaVersus");
const codigoCreadoVersus = document.getElementById("codigoCreadoVersus");
const btnCopiarCodigoVersus = document.getElementById("btnCopiarCodigoVersus");
const jugadoresSalaVersus = document.getElementById("jugadoresSalaVersus");
const estadoSalaVersus = document.getElementById("estadoSalaVersus");
const btnRivalPruebaVersus = document.getElementById("btnRivalPruebaVersus");
const btnContinuarSalaVersus = document.getElementById("btnContinuarSalaVersus");
const notaAdaptadorVersus = document.querySelector(".nota-adaptador-versus");
const btnSalirSeleccionPersonajeVersus = document.getElementById(
  "btnSalirSeleccionPersonajeVersus",
);
const btnSalirSeleccionPersonajeVersusVertical = document.getElementById(
  "btnSalirSeleccionPersonajeVersusVertical",
);
const btnConfirmarPersonajeVersus = document.getElementById(
  "btnConfirmarPersonajeVersus",
);
const estadoPersonajePropioVersus = document.getElementById("estadoPersonajePropioVersus");
const estadoPersonajeRivalVersus = document.getElementById("estadoPersonajeRivalVersus");
const tarjetasPersonajesVersus = [
  ...document.querySelectorAll(".tarjeta-personaje-versus"),
];
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
const btnPalabrasAleatoriasVersus = document.getElementById("btnPalabrasAleatoriasVersus");
const btnCompletarPalabrasPruebasVersus = document.getElementById(
  "btnCompletarPalabrasPruebasVersus",
);
const esperaRivalVersus = document.getElementById("esperaRivalVersus");
const tituloEsperaRivalVersus = esperaRivalVersus.querySelector("strong");
const textoEsperaRivalVersus = esperaRivalVersus.querySelector("p");
const estadoPreparacionRivalVersus = document.getElementById(
  "estadoPreparacionRivalVersus",
);
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
const btnHabilidadVersus = document.getElementById("btnHabilidadVersus");
const iconoHabilidadVersus = document.getElementById("iconoHabilidadVersus");
const nombreHabilidadVersus = document.getElementById("nombreHabilidadVersus");
const cargaHabilidadVersus = document.getElementById("cargaHabilidadVersus");
const progresoHabilidadVersus = document.getElementById("progresoHabilidadVersus");
const animacionHabilidadVersus = document.getElementById("animacionHabilidadVersus");
const tituloVersus = document.getElementById("tituloVersus");
const tituloProgresoUno = document.getElementById("tituloProgresoUno");
const tituloProgresoDos = document.getElementById("tituloProgresoDos");
const desafioJugadorVersus = document.getElementById("desafioJugadorVersus");
const revelacionPalabraVersusUno = document.getElementById("revelacionPalabraVersusUno");
const revelacionPalabraVersusDos = document.getElementById("revelacionPalabraVersusDos");
const fondoVersus = document.querySelector(".versus-fondo");
const personajeVersusUno = document.getElementById("personajeVersusUno");
const personajeVersusDos = document.getElementById("personajeVersusDos");
const bumeranVersus = document.getElementById("bumeranVersus");
const proyectilMagoVersus = document.getElementById("proyectilMagoVersus");
const proyectilMagoJugadorVersus = document.getElementById(
  "proyectilMagoJugadorVersus",
);
const proyectilGuardianaVersus = document.getElementById(
  "proyectilGuardianaVersus",
);
const rugidoDragonVersus = document.getElementById("rugidoDragonVersus");
const zarpazoLoboVersus = document.getElementById("zarpazoLoboVersus");
const corteShadowVersus = document.getElementById("corteShadowVersus");
const corteLumenVersus = document.getElementById("corteLumenVersus");
const alientoHieloVersus = document.getElementById("alientoHieloVersus");
const corteInfernalVersus = document.getElementById("corteInfernalVersus");
const congelacionNivorVersus = document.getElementById("congelacionNivorVersus");
const teclasRotasVersus = document.getElementById("teclasRotasVersus");
const entradaDueloVersus = document.getElementById("entradaDueloVersus");
const btnSaltarEntradaVersus = document.getElementById(
  "btnSaltarEntradaVersus",
);
const cinematicaFinalVersus = document.getElementById("cinematicaFinalVersus");
const fondoCinematicaVersus = document.getElementById("fondoCinematicaVersus");
const particulasEclipseVersus = document.getElementById("particulasEclipseVersus");
const etiquetaCinematicaVersus = document.getElementById("etiquetaCinematicaVersus");
const tituloCinematicaVersus = document.getElementById("tituloCinematicaVersus");
const btnSaltarCinematicaVersus = document.getElementById("btnSaltarCinematicaVersus");
const avisoAvanceVersus = document.getElementById("avisoAvanceVersus");
const anuncioFinVersus = document.getElementById("anuncioFinVersus");
const palabraFinalVersus = document.getElementById("palabraFinalVersus");
const resultadoRondaVersus = document.getElementById("resultadoRondaVersus");
const iconoResultadoVersus = document.getElementById("iconoResultadoVersus");
const etiquetaResultadoVersus = document.getElementById("etiquetaResultadoVersus");
const tituloResultadoVersus = document.getElementById("tituloResultadoVersus");
const detalleResultadoVersus = document.getElementById("detalleResultadoVersus");
const btnRevanchaVersus = document.getElementById("btnRevanchaVersus");
const btnMenuResultadoVersus = document.getElementById("btnMenuResultadoVersus");
const herramientasPruebasVersus = document.getElementById("herramientasPruebasVersus");
const herramientasHabilidadesPruebasVersus = document.getElementById(
  "herramientasHabilidadesPruebasVersus",
);
const origenHabilidadPruebaVersus = document.getElementById("origenHabilidadPruebaVersus");
const botonesProbarHabilidadVersus = [
  ...document.querySelectorAll(".btn-probar-habilidad-versus"),
];
const btnProbarCinematicaExplorador = document.getElementById(
  "btnProbarCinematicaExplorador",
);
const btnProbarCinematicaMago = document.getElementById("btnProbarCinematicaMago");
const btnProbarCinematicaGuardiana = document.getElementById(
  "btnProbarCinematicaGuardiana",
);
const btnProbarCinematicaDragon = document.getElementById(
  "btnProbarCinematicaDragon",
);
const btnProbarCinematicaHombreLobo = document.getElementById(
  "btnProbarCinematicaHombreLobo",
);
const btnProbarCinematicaShadow = document.getElementById("btnProbarCinematicaShadow");
const btnProbarCinematicaGuardianAlba = document.getElementById(
  "btnProbarCinematicaGuardianAlba",
);
const btnProbarCinematicaDragonHielo = document.getElementById(
  "btnProbarCinematicaDragonHielo",
);
const btnProbarCinematicaAzrak = document.getElementById("btnProbarCinematicaAzrak");
const victimaEclipseVersus = document.getElementById("victimaEclipseVersus");
const victimaTrampaVersus = document.getElementById("victimaTrampaVersus");
const rivalCinematicaMatriarca = document.querySelector(
  ".cinematica-rival-matriarca",
);
const victimaCaceriaVersus = document.getElementById("victimaCaceriaVersus");
const victimaShadowVersus = document.getElementById("victimaShadowVersus");
const victimaGuardianAlbaVersus = document.getElementById("victimaGuardianAlbaVersus");
const victimaNivorVersus = document.getElementById("victimaNivorVersus");
const victimaPortalAzrakVersus = document.getElementById("victimaPortalAzrakVersus");
const manoVictimaAzrakVersus = document.getElementById("manoVictimaAzrakVersus");
const victimaPruebaFaucesVersus = document.getElementById(
  "victimaPruebaFaucesVersus",
);
const victimaFaucesVersus = document.getElementById("victimaFaucesVersus");
const carnivoraDevorandoVersus = document.getElementById(
  "carnivoraDevorandoVersus",
);
const btnProbarAtaqueElegido = document.getElementById(
  "btnProbarAtaqueElegido",
);
const btnSalirJuego = document.getElementById("btnSalirJuego");
const btnMisionAnterior = document.getElementById("btnMisionAnterior");
const btnMisionSiguiente = document.getElementById("btnMisionSiguiente");
const btnProbarMuralSantuario = document.getElementById("btnProbarMuralSantuario");
const modalMuralSantuario = document.getElementById("modalMuralSantuario");
const tableroMuralSantuario = document.getElementById("tableroMuralSantuario");
const bandejaMuralSantuario = document.getElementById("bandejaMuralSantuario");
const estadoMuralSantuario = document.getElementById("estadoMuralSantuario");
const btnAyudaMuralSantuario = document.getElementById("btnAyudaMuralSantuario");
const btnRetirarPiezaMural = document.getElementById("btnRetirarPiezaMural");
const btnSalirMuralSantuario = document.getElementById("btnSalirMuralSantuario");
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
  colocarPieza: new Audio("assets/sounds/colocar-piezas.mp3"),
  comienzaMundo2: new Audio("assets/sounds/comienza-mundo-2.mp3"),
  versusAtaqueUno: new Audio("assets/sounds/ataque-1.mp3"),
  versusAtaqueDos: new Audio("assets/sounds/ataque-2.mp3"),
  versusFight: new Audio("assets/sounds/fight.mp3"),
  versusFinish: new Audio("assets/sounds/finish.mp3"),
};

const claveVibracionAtaques = "vibracionAtaquesAventuraGA";

function vibracionAtaquesActiva() {
  try {
    return localStorage.getItem(claveVibracionAtaques) !== "desactivada";
  } catch {
    return true;
  }
}

function vibrarImpactoVersus(patron = [55, 35, 85]) {
  if (!vibracionAtaquesActiva() || typeof navigator.vibrate !== "function") return false;
  try {
    return navigator.vibrate(patron);
  } catch {
    return false;
  }
}

function actualizarControlVibracion() {
  if (!vibracionAtaques || !estadoVibracion) return;
  const activa = vibracionAtaquesActiva();
  vibracionAtaques.checked = activa;
  estadoVibracion.textContent = typeof navigator.vibrate === "function"
    ? (activa ? "Vibración activada" : "Vibración desactivada")
    : "Este navegador no admite vibración";
}

function abrirConfiguracion() {
  modalConfiguracion.classList.remove("oculto");
  actualizarControlVibracion();
  vibracionAtaques.focus();
}

function cerrarConfiguracion() {
  if (typeof navigator.vibrate === "function") navigator.vibrate(0);
  modalConfiguracion.classList.add("oculto");
  btnConfiguracion.focus();
}

btnConfiguracion.addEventListener("click", abrirConfiguracion);
btnCerrarConfiguracion.addEventListener("click", cerrarConfiguracion);
modalConfiguracion.addEventListener("click", (evento) => {
  if (evento.target === modalConfiguracion) cerrarConfiguracion();
});
vibracionAtaques.addEventListener("change", () => {
  try {
    localStorage.setItem(
      claveVibracionAtaques,
      vibracionAtaques.checked ? "activada" : "desactivada",
    );
  } catch {
    // Mantiene el ajuste activo durante la sesión si el navegador bloquea el almacenamiento.
  }
  actualizarControlVibracion();
  if (vibracionAtaques.checked) vibrarImpactoVersus([35, 25, 55]);
  else if (typeof navigator.vibrate === "function") navigator.vibrate(0);
});
document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && !modalConfiguracion.classList.contains("oculto")) cerrarConfiguracion();
});

const musicaPrologo = new Audio("assets/sounds/prologo.mp3");
musicaPrologo.loop = false;
musicaPrologo.volume = 0.25;
const musicaMenu = globalThis.musicaMenuAventura
  || new Audio("assets/sounds/melodia-menu.mp3");
globalThis.musicaMenuAventura = musicaMenu;
musicaMenu.loop = true;
musicaMenu.volume = 1;
musicaMenu.preload = "auto";
const sonidoComenzarAventura = new Audio(
  "assets/sounds/comenzar-aventura.wav",
);
const sonidoSeleccionPersonaje = new Audio(
  "assets/sounds/seleccion-personaje.mp3",
);
Object.values(sonidos).forEach((sonido) => {
  sonido.preload = "none";
});
sonidoComenzarAventura.preload = "auto";
sonidoSeleccionPersonaje.preload = "auto";

let colaSonidos = [];
let audioDesbloqueado = false;
let ambienteActual = "";
let temporizadorCrujidoPuente = null;
const instanciasSonidoVersus = new Set();
const debugAudio = true;

function reproducirSonidoVersus(nombre, volumen = 0.68) {
  const fuente = sonidos[nombre];
  if (!fuente) return;

  const instancia = new Audio(fuente.currentSrc || fuente.src);
  instancia.volume = volumen;
  instancia.preload = "auto";
  instanciasSonidoVersus.add(instancia);

  const liberar = () => instanciasSonidoVersus.delete(instancia);
  instancia.addEventListener("ended", liberar, { once: true });
  instancia.addEventListener("error", liberar, { once: true });
  instancia.play().catch((error) => {
    liberar();
    logAudio(`${nombre} versus bloqueado`, error);
  });
}

function detenerSonidosVersus() {
  instanciasSonidoVersus.forEach((instancia) => {
    instancia.pause();
    instancia.currentTime = 0;
  });
  instanciasSonidoVersus.clear();
}

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
const imagenesPrecargadas = new Map();
const intervaloSpriteCaminata = 150;
const spritesCaminataPorEscenario = {
  0: crearRutasSpritesCaminata("bosque"),
};
const spritesPortalPorEscenario = {
  0: crearRutasSpritesCaminata("portal-bosque", "explorador-portal"),
};
const escenasPorEscenario = [
  [
    {
      fondos: ["bosque-0.png", "bosque-1.png"],
      texto:
        "🌲 Encuentra la palabra secreta para comenzar tu viaje por el Bosque Encantado.",
    },
    {
      fondos: ["bosque-2.png"],
      texto:
        "🪨 Resuelve la palabra secreta para encontrar un camino alrededor de la roca.",
    },
    {
      fondos: ["bosque-3-despejado.png"],
      texto: "🌿 Resuelve la palabra para encontrar un paso entre las ramas.",
    },
    {
      fondos: ["bosque-4.png"],
      texto:
        "⛈️ Encuentra la palabra secreta para atravesar la tormenta y continuar el viaje.",
    },
    {
      fondos: ["bosque-5.png"],
      texto:
        "🌫️ Solo la palabra correcta te ayudará a encontrar el camino entre la niebla.",
    },
    {
      fondos: ["bosque-6.png"],
      texto:
        "🐺 Resuelve la palabra para escabullirte de los lobos y continuar el viaje.",
    },
    {
      fondos: ["bosque-7.png"],
      texto:
        "🌲 La palabra secreta revelará el sendero oculto del Bosque Prohibido.",
    },
    {
      fondos: ["bosque-8-peligroso.png", "bosque-8.png"],
      texto:
        "🌉 Descubre la palabra para cruzar el viejo puente con seguridad.",
    },
    {
      fondos: ["bosque-9.png"],
      texto:
        "💎 Solo quien resuelva la palabra podrá acercarse al Cristal de la Sabiduría.",
    },
    {
      fondos: ["bosque-10-apagado.png", "bosque-10.png"],
      texto: "🌌 La última palabra abrirá el Portal de los Mundos.",
    },
  ],
  [
    {
      fondos: ["desierto-1.png"],
      texto:
        "🌵 Descubre la palabra secreta para comenzar tu expedición por el Desierto Perdido.",
    },
  ],
];

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
let rompecabezasMuralActivo = false;
let muralSantuarioCompletado = false;
let resolverRompecabezasMural = null;
let temporizadorAyudaMural = null;
let piezaSeleccionadaMural = null;
let focoPrevioMural = null;
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
const adaptadorLocalSalasVersus = VersusRoom.crearAdaptadorLocal();
let adaptadorSalasVersus = adaptadorLocalSalasVersus;
let promesaConexionSalasVersus = null;
let cancelarSuscripcionPartidaVersus = null;
let partidaOnlineVersus = null;
let partidaOnlineIniciada = false;
let ultimoEventoPartidaVersus = -1;
let desfaseServidorVersus = 0;
let jugadaOnlineEnCurso = false;
let salidaSalaVersusEnCurso = false;
let revanchaVersusEnCurso = false;
let cancelarSuscripcionSalasVersus = adaptadorSalasVersus.suscribir(
  actualizarEstadoMultijugador,
);

async function asegurarConexionSalasVersus() {
  if (adaptadorSalasVersus.proveedor === "supabase") return adaptadorSalasVersus;
  if (promesaConexionSalasVersus) return promesaConexionSalasVersus;

  promesaConexionSalasVersus = (async () => {
    const configurado = globalThis.AventuraSupabase?.configuracionDisponible?.();
    if (!configurado) return adaptadorLocalSalasVersus;

    const cliente = globalThis.AventuraSupabase.obtenerCliente();
    if (!cliente || !globalThis.VersusRoomSupabase) {
      throw new Error("No se pudo cargar la conexión con Supabase. Revisá tu conexión a internet.");
    }

    const adaptadorSupabase = VersusRoomSupabase.crearAdaptador(cliente);
    await adaptadorSupabase.inicializar();
    cancelarSuscripcionSalasVersus?.();
    adaptadorSalasVersus = adaptadorSupabase;
    cancelarSuscripcionSalasVersus = adaptadorSalasVersus.suscribir(
      actualizarEstadoMultijugador,
    );
    cancelarSuscripcionPartidaVersus?.();
    cancelarSuscripcionPartidaVersus = adaptadorSalasVersus.suscribirPartida(
      actualizarPartidaOnline,
    );
    actualizarEstadoMultijugador(adaptadorSalasVersus.obtenerSala());
    actualizarPartidaOnline(adaptadorSalasVersus.obtenerPartida());
    return adaptadorSalasVersus;
  })();

  try {
    return await promesaConexionSalasVersus;
  } finally {
    promesaConexionSalasVersus = null;
  }
}

function mostrarErrorSalaVersus(mensaje = "") {
  errorSalaVersus.textContent = mensaje;
}

function actualizarSalaVersus(sala) {
  if (!sala) {
    inicioSalaVersus.classList.remove("oculto");
    esperaSalaVersus.classList.add("oculto");
    return;
  }

  inicioSalaVersus.classList.add("oculto");
  esperaSalaVersus.classList.remove("oculto");
  codigoCreadoVersus.textContent = sala.codigo;
  jugadoresSalaVersus.replaceChildren();

  for (let indice = 0; indice < 2; indice += 1) {
    const jugador = sala.jugadores[indice];
    const tarjeta = document.createElement("article");
    tarjeta.className = `jugador-sala-versus${jugador ? "" : " vacio"}`;
    const etiqueta = document.createElement("span");
    etiqueta.textContent = `JUGADOR ${indice + 1}${jugador?.anfitrion ? " · ANFITRIÓN" : ""}`;
    const nombre = document.createElement("strong");
    nombre.textContent = jugador?.alias || "Esperando rival…";
    tarjeta.append(etiqueta, nombre);
    jugadoresSalaVersus.append(tarjeta);
  }

  const salaCompleta = sala.jugadores.length === 2;
  btnContinuarSalaVersus.disabled = !salaCompleta;
  estadoSalaVersus.textContent = salaCompleta
    ? "¡Los dos jugadores están conectados! Ya pueden continuar."
    : "Esperando al segundo jugador…";
  notaAdaptadorVersus.textContent = adaptadorSalasVersus.proveedor === "supabase"
    ? "Conectado a Supabase · sala sincronizada en tiempo real."
    : "Vista local de desarrollo. La conexión entre celulares requiere Supabase.";
  btnRivalPruebaVersus.classList.toggle(
    "oculto",
    adaptadorSalasVersus.proveedor !== "local" || !modoPruebasActivo || salaCompleta,
  );
}

function actualizarSeleccionPersonajeRemota(sala) {
  if (adaptadorSalasVersus.proveedor !== "supabase" || !sala) return;

  const usuarioId = adaptadorSalasVersus.obtenerUsuarioId?.();
  const jugadorPropio = sala.jugadores.find((jugador) => jugador.id === usuarioId);
  const jugadorRival = sala.jugadores.find((jugador) => jugador.id !== usuarioId);

  if (jugadorPropio?.personaje && personajesVersus[jugadorPropio.personaje]) {
    seleccionarPersonajeVersus(jugadorPropio.personaje);
  }

  const propioListo = Boolean(jugadorPropio?.listo);
  const rivalListo = Boolean(jugadorRival?.listo);
  tarjetasPersonajesVersus.forEach((tarjeta) => { tarjeta.disabled = propioListo; });
  btnConfirmarPersonajeVersus.disabled = propioListo;

  estadoPersonajePropioVersus.className = propioListo ? "listo" : "";
  estadoPersonajePropioVersus.textContent = propioListo
    ? `${jugadorPropio.alias}: ${personajesVersus[jugadorPropio.personaje].nombre} listo.`
    : "Elegí tu personaje.";

  estadoPersonajeRivalVersus.className = rivalListo ? "listo" : "";
  estadoPersonajeRivalVersus.textContent = rivalListo
    ? `${jugadorRival.alias} eligió ${personajesVersus[jugadorRival.personaje].nombre}.`
    : `${jugadorRival?.alias || "Tu rival"} está eligiendo…`;

  if (rivalListo && personajesVersus[jugadorRival.personaje]) {
    personajeRivalVersus = jugadorRival.personaje;
  }

  const ambosListos = sala.jugadores.length === 2 && sala.jugadores.every(
    (jugador) => jugador.listo && personajesVersus[jugador.personaje],
  );
  if (ambosListos && pantallaSeleccionPersonajeVersus.classList.contains("activa")) {
    abrirPreparacionVersus();
  } else if (
    !ambosListos
    && pantallaPreparacionVersus.classList.contains("activa")
    && sala.estado === "complete"
  ) {
    mostrarPantalla(pantallaSeleccionPersonajeVersus);
  }
}

function actualizarEstadoMultijugador(sala) {
  actualizarSalaVersus(sala);
  actualizarSeleccionPersonajeRemota(sala);
  actualizarPreparacionRemota(sala);

  if (adaptadorSalasVersus.proveedor !== "supabase") return;

  if (sala?.estado === "finished") actualizarEstadoRevanchaVersus(sala);

  if (
    sala?.estado === "preparing"
    && sala.jugadores.length === 2
    && pantallaVersus.classList.contains("activa")
  ) {
    prepararInterfazRevanchaVersus();
    return;
  }

  if (
    !salidaSalaVersusEnCurso
    && pantallaVersus.classList.contains("activa")
    && (!sala || sala.jugadores.length < 2)
  ) {
    mostrarAbandonoRivalVersus();
    return;
  }

  if (
    !salidaSalaVersusEnCurso
    && sala
    && sala.jugadores.length < 2
    && (
      pantallaSeleccionPersonajeVersus.classList.contains("activa")
      || pantallaPreparacionVersus.classList.contains("activa")
    )
  ) {
    mostrarPantalla(pantallaSalaVersus);
    mostrarErrorSalaVersus("El rival abandonó la sala. Podés esperar a otro jugador o volver al menú.");
    return;
  }

  if (
    !sala
    && !salidaSalaVersusEnCurso
    && (
      pantallaSeleccionPersonajeVersus.classList.contains("activa")
      || pantallaPreparacionVersus.classList.contains("activa")
    )
  ) {
    mostrarPantalla(pantallaSalaVersus);
    mostrarErrorSalaVersus("La sala fue cerrada por el anfitrión.");
  }
}

function actualizarEstadoRevanchaVersus(sala) {
  const usuarioId = adaptadorSalasVersus.obtenerUsuarioId?.();
  const propio = sala.jugadores.find((jugador) => jugador.id === usuarioId);
  const rival = sala.jugadores.find((jugador) => jugador.id !== usuarioId);
  if (!propio || !rival || resultadoRondaVersus.classList.contains("oculto")) return;

  btnRevanchaVersus.classList.remove("oculto");
  btnRevanchaVersus.disabled = revanchaVersusEnCurso || Boolean(propio.revanchaLista);
  btnRevanchaVersus.textContent = propio.revanchaLista
    ? "Esperando al rival…"
    : rival.revanchaLista ? "Aceptar revancha" : "Pedir revancha";
}

function prepararInterfazRevanchaVersus() {
  cancelarCinematicaFinalVersus();
  detenerRondaVersus();
  resultadoRondaVersus.classList.add("oculto");
  btnRevanchaVersus.disabled = false;
  btnRevanchaVersus.textContent = "Pedir revancha";
  revanchaVersusEnCurso = false;
  partidaOnlineVersus = null;
  partidaOnlineIniciada = false;
  ultimoEventoPartidaVersus = -1;
  demoVersus.partidaFinalizada = false;
  abrirPreparacionVersus();
}

function mostrarAbandonoRivalVersus() {
  if (demoVersus.partidaFinalizada) {
    btnRevanchaVersus.classList.add("oculto");
    return;
  }
  demoVersus.partidaFinalizada = true;
  detenerRondaVersus();
  bloquearTecladoDemoVersus();
  mostrarResultadoPartidaVersus("jugador", "El rival abandonó la sala. La partida terminó.");
  tituloResultadoVersus.textContent = "El rival abandonó";
  etiquetaResultadoVersus.textContent = "PARTIDA INTERRUMPIDA";
  btnRevanchaVersus.classList.add("oculto");
}

function actualizarPreparacionRemota(sala) {
  if (adaptadorSalasVersus.proveedor !== "supabase" || !sala) return;

  const usuarioId = adaptadorSalasVersus.obtenerUsuarioId?.();
  const jugadorPropio = sala.jugadores.find((jugador) => jugador.id === usuarioId);
  const jugadorRival = sala.jugadores.find((jugador) => jugador.id !== usuarioId);
  const propioListo = Boolean(jugadorPropio?.preparacionLista);
  const rivalListo = Boolean(jugadorRival?.preparacionLista);
  const nombreTemaRival = nombresTematicasVersus[jugadorRival?.tematica];

  estadoPreparacionRivalVersus.className = `estado-preparacion-rival-versus${rivalListo ? " listo" : ""}`;
  estadoPreparacionRivalVersus.textContent = rivalListo
    ? `${jugadorRival.alias} ya preparó tu desafío${nombreTemaRival ? ` · ${nombreTemaRival}` : ""}.`
    : `${jugadorRival?.alias || "Tu rival"} está preparando su desafío…`;

  if (!propioListo) return;

  inputsPalabrasVersus.forEach((input) => { input.disabled = true; });
  tematicaVersus.disabled = true;
  btnPalabrasAleatoriasVersus.disabled = true;
  btnConfirmarPalabrasVersus.disabled = true;
  esperaRivalVersus.classList.remove("oculto");
  tituloEsperaRivalVersus.textContent = rivalListo
    ? "Ambos desafíos están listos"
    : "Tus palabras están protegidas";
  textoEsperaRivalVersus.textContent = rivalListo
    ? "Preparando el combate en línea…"
    : `Esperando a ${jugadorRival?.alias || "tu rival"}…`;
}

function obtenerNombreTemaVersus(tema) {
  return nombresTematicasVersus[tema] || tema || "Sorpresa";
}

function actualizarRelojPartidaOnline() {
  if (!partidaOnlineVersus) return;
  const restante = Math.max(0, Math.ceil(
    (Date.parse(partidaOnlineVersus.deadlineAt) - (Date.now() + desfaseServidorVersus)) / 1000,
  ));
  demoVersus.tiempoJugador = restante;
  demoVersus.tiempoRival = restante;
  actualizarTiemposVersus();
  if (restante === 0 && partidaOnlineVersus.status === "playing") {
    void adaptadorSalasVersus.cargarPartida?.();
  }
}

function actualizarTecladoPartidaOnline(partida) {
  const comenzo = Date.now() + desfaseServidorVersus >= Date.parse(partida.startedAt);
  const usadas = new Set(partida.me?.usedLetters || []);
  const efectoBloqueoActivo = ["roots", "black_hole", "key_bounce", "ice_screen"].includes(partida.me?.activeEffect)
    && Date.now() + desfaseServidorVersus < Date.parse(partida.me?.effectExpiresAt || 0);
  tecladoVersus.querySelectorAll("button").forEach((boton) => {
    boton.disabled = jugadaOnlineEnCurso
      || efectoBloqueoActivo
      || partida.status !== "playing"
      || !comenzo
      || partida.me?.finished
      || usadas.has(boton.textContent);
  });
}

function renderizarPartidaOnline(partida) {
  const propio = partida.me;
  const rival = partida.opponent;
  if (!propio || !rival) return;

  demoVersus.tematicaParaJugador = propio.theme;
  demoVersus.tematicaParaRival = rival.theme;
  demoVersus.indiceJugador = propio.wordIndex;
  demoVersus.indiceRival = rival.wordIndex;
  demoVersus.erroresJugador = propio.errors;
  demoVersus.erroresRival = rival.errors;
  demoVersus.vidasJugador = propio.lives;
  demoVersus.vidasRival = rival.lives;
  demoVersus.finalizadoJugador = propio.finished;
  demoVersus.finalizadoRival = rival.finished;
  demoVersus.motivoFinalJugador = propio.finishReason || "";
  demoVersus.motivoFinalRival = rival.finishReason || "";

  const firmaEfecto = `${propio.activeEffect || ""}:${propio.effectExpiresAt || ""}`;
  if (demoVersus.firmaEfectoHabilidad !== firmaEfecto) {
    demoVersus.firmaEfectoHabilidad = firmaEfecto;
    const restanteEfecto = propio.effectExpiresAt
      ? Math.max(0, Date.parse(propio.effectExpiresAt) - (Date.now() + desfaseServidorVersus))
      : 0;
    const eventoHabilidadRival = partida.lastEvent?.type === "ability_used"
      && partida.lastEvent.actorId !== propio.userId
      && partida.eventSequence > ultimoEventoPartidaVersus;
    if (eventoHabilidadRival && propio.activeEffect && restanteEfecto > 0) {
      const personajeAtacante = partida.lastEvent.character || personajeRivalVersus;
      reproducirAnimacionHabilidadVersus(personajeAtacante, {
        desdeRival: true,
        alImpactar: () => {
          const restanteAlImpactar = Math.max(
            0,
            Date.parse(propio.effectExpiresAt) - (Date.now() + desfaseServidorVersus),
          );
          aplicarEfectoVisualHabilidadVersus(propio.activeEffect, restanteAlImpactar);
        },
      });
    } else {
      aplicarEfectoVisualHabilidadVersus(propio.activeEffect || "", restanteEfecto);
    }
  }
  const lupaPropiaRecienActivada = partida.lastEvent?.type === "ability_used"
    && partida.lastEvent.actorId === propio.userId
    && partida.lastEvent.character === "explorador"
    && partida.eventSequence > ultimoEventoPartidaVersus;
  actualizarPanelHabilidadVersus(
    propio.abilityCharge || 0,
    lupaPropiaRecienActivada ? "" : (propio.abilityHint || ""),
  );

  tituloProgresoUno.textContent = propio.finished
    ? "TU RECORRIDO TERMINÓ"
    : `TU DESAFÍO · ${obtenerNombreTemaVersus(propio.theme).toUpperCase()} ${propio.wordIndex + 1}/${maximoPalabrasVersus}`;
  tituloProgresoDos.textContent = rival.finished
    ? "EL RIVAL TERMINÓ"
    : `RIVAL · ${obtenerNombreTemaVersus(rival.theme).toUpperCase()} ${rival.wordIndex + 1}/${maximoPalabrasVersus}`;
  tituloVersus.textContent = `J1 ${propio.completedWords}/${maximoPalabrasVersus} · J2 ${rival.completedWords}/${maximoPalabrasVersus}`;

  const palabraPropia = document.getElementById("palabraVersusUno");
  const palabraRival = document.getElementById("palabraVersusDos");
  palabraPropia.textContent = propio.finished
    ? (propio.finishReason === "lives"
      ? "SIN CORAZONES"
      : propio.finishReason === "time" ? "TIEMPO AGOTADO" : `✓ ${propio.completedWords} PALABRAS`)
    : (propio.progress || []).join(" ");
  palabraRival.textContent = rival.finished
    ? (rival.finishReason === "lives"
      ? "SIN CORAZONES"
      : rival.finishReason === "time" ? "TIEMPO AGOTADO" : `✓ ${rival.completedWords} PALABRAS`)
    : (rival.progress || []).join(" ");
  palabraPropia.setAttribute("aria-label", `Tu progreso: ${palabraPropia.textContent}`);
  palabraRival.setAttribute("aria-label", `Progreso rival: ${palabraRival.textContent}`);
  ajustarPalabraLargaVersus(palabraPropia, propio.wordLength || 0);
  ajustarPalabraLargaVersus(palabraRival, rival.wordLength || 0);
  actualizarIntentosVersus(document.getElementById("intentosVersusUno"), propio.errors, "Jugador 1");
  actualizarIntentosVersus(document.getElementById("intentosVersusDos"), rival.errors, "El rival");
  actualizarVidasVersus();
  actualizarRelojPartidaOnline();
  actualizarTecladoPartidaOnline(partida);
}

function procesarEventoPartidaOnline(partida) {
  if (partida.eventSequence <= ultimoEventoPartidaVersus) return;
  ultimoEventoPartidaVersus = partida.eventSequence;
  const eventoFinal = partida.lastEvent;
  const evento = eventoFinal?.type === "match_finished"
    && ["word_failed", "ability_used"].includes(eventoFinal.previousEvent?.type)
    ? eventoFinal.previousEvent
    : eventoFinal;
  if (!evento) return;
  const propio = evento.actorId === partida.me?.userId;
  const estadoPropio = document.getElementById("estadoProgresoUno");
  const estadoRival = document.getElementById("estadoProgresoDos");

  if (evento.type === "hit") {
    mostrarEstadoProgresoVersus(propio ? estadoPropio : estadoRival, propio ? "¡Acierto!" : "El rival acertó", "acierto");
    if (propio) reproducirSonidoVersus("acertar", 0.5);
  } else if (evento.type === "miss") {
    mostrarEstadoProgresoVersus(propio ? estadoPropio : estadoRival, propio ? "Fallaste" : "El rival falló", "error");
    if (propio) reproducirSonidoVersus("error", 0.48);
  } else if (evento.type === "word_complete") {
    if (propio) reproducirAtaqueJugadorVersus();
    else reproducirAtaqueRivalVersus();
    mostrarAvisoAvanceVersus(
      propio ? "¡Palabra superada! Atacaste al rival." : "El rival superó una palabra y te atacó.",
      propio ? "acierto" : "error",
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 260 : 1300,
    );
  } else if (evento.type === "word_failed") {
    mostrarRevelacionPalabraVersus(
      propio ? revelacionPalabraVersusUno : revelacionPalabraVersusDos,
      evento.word,
      propio ? partida.me?.theme : partida.opponent?.theme,
      propio ? "temporizadorRevelacionJugador" : "temporizadorRevelacionRival",
    );
    if (propio) reproducirAtaqueRivalVersus();
    else reproducirAtaqueJugadorVersus();
    mostrarAvisoAvanceVersus(
      propio ? "Agotaste los intentos y perdiste un corazón." : "El rival agotó sus intentos y perdió un corazón.",
      propio ? "error" : "acierto",
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 260 : 1300,
    );
  } else if (evento.type === "ability_used") {
    const habilidad = habilidadesVersus[evento.character] || habilidadesVersus.explorador;
    if (propio) {
      reproducirAnimacionHabilidadVersus(evento.character || personajeJugadorVersus, {
        alImpactar: () => {
          if (evento.character === "explorador") {
            actualizarPistaLupaVersus(partida.me?.abilityHint || "");
          }
        },
      });
    } else if (evento.character === "explorador") {
      reproducirAnimacionHabilidadVersus("explorador", { desdeRival: true });
    } else if (evento.character === "azrak") {
      reproducirAnimacionHabilidadVersus("azrak", {
        desdeRival: true,
        alImpactar: () => {
          animarTeclaCalaveraIgneaVersus(evento.letter || "", true);
          vibrarImpactoVersus();
          reproducirSonidoVersus("error", 0.58);
          mostrarEstadoProgresoVersus(estadoPropio, `La calavera pulsó ${evento.letter || "una tecla"}`, "error");
          if (evento.wordFailed && evento.word) {
            mostrarRevelacionPalabraVersus(
              revelacionPalabraVersusUno,
              evento.word,
              partida.me?.theme,
              "temporizadorRevelacionJugador",
            );
          }
        },
      });
    }
    mostrarAvisoAvanceVersus(
      propio ? `¡Activaste ${habilidad.nombre}!` : `El rival activó ${habilidad.nombre}.`,
      propio ? "acierto" : "error",
    );
  }
}

function finalizarPartidaOnline(partida) {
  if (demoVersus.partidaFinalizada) return;
  demoVersus.partidaFinalizada = true;
  detenerRondaVersus();
  bloquearTecladoDemoVersus();
  const ganador = !partida.winnerId
    ? "empate"
    : partida.winnerId === partida.me?.userId ? "jugador" : "rival";
  const detalle = ganador === "empate"
    ? "La partida terminó empatada."
    : ganador === "jugador" ? "¡Ganaste el duelo en línea!" : "Tu rival ganó el duelo en línea.";
  const eventoPrevio = partida.lastEvent?.type === "match_finished"
    ? partida.lastEvent.previousEvent
    : partida.lastEvent;
  const palabraPerdida = eventoPrevio?.type === "word_failed" || eventoPrevio?.wordFailed
    ? eventoPrevio.word || ""
    : "";
  reproducirCierrePartidaVersus(ganador, detalle, palabraPerdida);
}

function actualizarPartidaOnline(partida) {
  if (adaptadorSalasVersus.proveedor !== "supabase") return;
  if (!partida) {
    partidaOnlineVersus = null;
    partidaOnlineIniciada = false;
    return;
  }
  const esNueva = partidaOnlineVersus?.matchId !== partida.matchId;
  partidaOnlineVersus = partida;
  desfaseServidorVersus = Date.parse(partida.serverTime) - Date.now();

  if (esNueva) {
    detenerRondaVersus();
    ocultarRevelacionesPalabrasVersus();
    cancelarCinematicaFinalVersus();
    limpiarAnimacionAtaqueVersus();
    demoVersus.partidaFinalizada = false;
    partidaOnlineIniciada = false;
    ultimoEventoPartidaVersus = partida.eventSequence || 0;
    const sala = adaptadorSalasVersus.obtenerSala();
    const usuarioId = adaptadorSalasVersus.obtenerUsuarioId?.();
    const propio = sala?.jugadores.find((jugador) => jugador.id === usuarioId);
    const rival = sala?.jugadores.find((jugador) => jugador.id !== usuarioId);
    if (propio?.personaje && personajesVersus[propio.personaje]) personajeJugadorVersus = propio.personaje;
    if (rival?.personaje && personajesVersus[rival.personaje]) personajeRivalVersus = rival.personaje;
    const arena = arenasVersus[partida.arenaIndex] || arenasVersus[0];
    fondoVersus.src = arena.src;
    fondoVersus.alt = arena.alt;
    resultadoRondaVersus.classList.add("oculto");
    avisoAvanceVersus.classList.add("oculto");
    configurarPersonajesCombateVersus();
  }

  renderizarPartidaOnline(partida);
  procesarEventoPartidaOnline(partida);

  if (!partidaOnlineIniciada && partida.status === "playing") {
    partidaOnlineIniciada = true;
    mostrarPantalla(pantallaVersus);
    const tiempoTranscurrido = Date.parse(partida.serverTime) - Date.parse(partida.startedAt);
    if (tiempoTranscurrido > duracionEntradaDueloVersus + 1000) {
      configurarPersonajesCombateVersus();
      comenzarRondaVersus();
    } else {
      requestAnimationFrame(iniciarEntradaDueloVersus);
    }
  } else if (!partidaOnlineIniciada && partida.status === "finished") {
    partidaOnlineIniciada = true;
    mostrarPantalla(pantallaVersus);
  }
  if (partida.status === "finished") finalizarPartidaOnline(partida);
}

async function abrirSalaVersus() {
  mostrarErrorSalaVersus();
  mostrarPantalla(pantallaSalaVersus);
  btnCrearSalaVersus.disabled = true;
  btnUnirseSalaVersus.disabled = true;

  try {
    await asegurarConexionSalasVersus();
    actualizarSalaVersus(adaptadorSalasVersus.obtenerSala());
  } catch (error) {
    mostrarErrorSalaVersus(error.message || "No pudimos conectarnos con Supabase.");
  } finally {
    btnCrearSalaVersus.disabled = false;
    btnUnirseSalaVersus.disabled = false;
  }
}

async function salirDeSalaVersus() {
  salidaSalaVersusEnCurso = true;
  try {
    await adaptadorSalasVersus.salirSala();
  } catch (error) {
    console.warn("No se pudo cerrar la sala remota.", error);
  } finally {
    salidaSalaVersusEnCurso = false;
  }
  partidaOnlineVersus = null;
  partidaOnlineIniciada = false;
  mostrarPantalla(pantallaMenu);
}

async function ejecutarAccionSalaVersus(accion) {
  mostrarErrorSalaVersus();
  btnCrearSalaVersus.disabled = true;
  btnUnirseSalaVersus.disabled = true;
  try {
    await asegurarConexionSalasVersus();
    const sala = await accion();
    actualizarSalaVersus(sala);
  } catch (error) {
    mostrarErrorSalaVersus(error.message || "No pudimos completar la acción.");
  } finally {
    btnCrearSalaVersus.disabled = false;
    btnUnirseSalaVersus.disabled = false;
  }
}

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

  void iniciarMisionAventura();
}

btnSiguiente.addEventListener("click", continuarAventura);

function seleccionarPersonajeVersus(personaje) {
  if (!personajesVersus[personaje]) return;
  personajeJugadorVersus = personaje;
  tarjetasPersonajesVersus.forEach((tarjeta) => {
    const seleccionada = tarjeta.dataset.personaje === personaje;
    tarjeta.classList.toggle("seleccionada", seleccionada);
    tarjeta.setAttribute("aria-checked", `${seleccionada}`);
  });
  btnConfirmarPersonajeVersus.textContent = `Luchar con ${personajesVersus[personaje].nombre}`;
}

function abrirSeleccionPersonajeVersus() {
  seleccionarPersonajeVersus(personajeJugadorVersus);
  mostrarPantalla(pantallaSeleccionPersonajeVersus);
  actualizarSeleccionPersonajeRemota(adaptadorSalasVersus.obtenerSala());
}

btnVersus.addEventListener("click", () => {
  reproducirSonidoComenzarAventura();
  cancelarSecuenciaNarrativaActual();
  detenerSonidos();
  if (modoPruebasActivo) {
    iniciarPruebaVersusLocal();
    return;
  }
  abrirSalaVersus();
});

function iniciarPruebaVersusLocal() {
  cancelarSuscripcionSalasVersus?.();
  cancelarSuscripcionPartidaVersus?.();
  cancelarSuscripcionPartidaVersus = null;
  adaptadorSalasVersus = adaptadorLocalSalasVersus;
  cancelarSuscripcionSalasVersus = adaptadorSalasVersus.suscribir(
    actualizarEstadoMultijugador,
  );
  partidaOnlineVersus = null;
  partidaOnlineIniciada = false;
  adaptadorSalasVersus.crearSala({ alias: "Jugador 1" });
  adaptadorSalasVersus.agregarRivalDePrueba("Rival de prueba");
  abrirSeleccionPersonajeVersus();
}

btnCrearSalaVersus.addEventListener("click", () => ejecutarAccionSalaVersus(() => (
  adaptadorSalasVersus.crearSala({ alias: aliasSalaVersus.value })
)));

btnUnirseSalaVersus.addEventListener("click", () => ejecutarAccionSalaVersus(() => (
  adaptadorSalasVersus.unirseSala({
    alias: aliasSalaVersus.value,
    codigo: codigoSalaVersus.value,
  })
)));

codigoSalaVersus.addEventListener("input", () => {
  codigoSalaVersus.value = VersusRoom.limpiarCodigo(codigoSalaVersus.value);
});

btnCopiarCodigoVersus.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(codigoCreadoVersus.textContent);
    btnCopiarCodigoVersus.textContent = "Copiado";
    setTimeout(() => { btnCopiarCodigoVersus.textContent = "Copiar"; }, 1300);
  } catch (error) {
    estadoSalaVersus.textContent = `Código: ${codigoCreadoVersus.textContent}`;
  }
});

btnRivalPruebaVersus.addEventListener("click", () => ejecutarAccionSalaVersus(() => (
  adaptadorSalasVersus.agregarRivalDePrueba?.()
)));

btnContinuarSalaVersus.addEventListener("click", abrirSeleccionPersonajeVersus);
btnSalirSalaVersus.addEventListener("click", salirDeSalaVersus);
btnSalirSalaVersusVertical.addEventListener("click", salirDeSalaVersus);

tarjetasPersonajesVersus.forEach((tarjeta) => {
  tarjeta.addEventListener("click", () => {
    reproducirSonidoSeleccionPersonaje();
    seleccionarPersonajeVersus(tarjeta.dataset.personaje);
  });
});

btnConfirmarPersonajeVersus.addEventListener("click", async () => {
  reproducirSonidoComenzarAventura();
  if (adaptadorSalasVersus.proveedor !== "supabase") {
    abrirPreparacionVersus();
    return;
  }

  btnConfirmarPersonajeVersus.disabled = true;
  tarjetasPersonajesVersus.forEach((tarjeta) => { tarjeta.disabled = true; });
  estadoPersonajePropioVersus.className = "";
  estadoPersonajePropioVersus.textContent = "Guardando tu elección…";
  try {
    const sala = await adaptadorSalasVersus.actualizarPersonaje({
      personaje: personajeJugadorVersus,
      listo: true,
    });
    actualizarEstadoMultijugador(sala);
  } catch (error) {
    estadoPersonajePropioVersus.className = "error";
    estadoPersonajePropioVersus.textContent = error.message || "No pudimos guardar tu personaje.";
    btnConfirmarPersonajeVersus.disabled = false;
    tarjetasPersonajesVersus.forEach((tarjeta) => { tarjeta.disabled = false; });
  }
});

async function volverASalaDesdeSeleccionVersus() {
  const sala = adaptadorSalasVersus.obtenerSala();
  const usuarioId = adaptadorSalasVersus.obtenerUsuarioId?.();
  const jugadorPropio = sala?.jugadores.find((jugador) => jugador.id === usuarioId);
  if (adaptadorSalasVersus.proveedor === "supabase" && jugadorPropio) {
    try {
      if (jugadorPropio.preparacionLista) await adaptadorSalasVersus.cancelarDesafio();
      if (jugadorPropio.listo) {
        await adaptadorSalasVersus.actualizarPersonaje({
          personaje: jugadorPropio.personaje || personajeJugadorVersus,
          listo: false,
        });
      }
    } catch (error) {
      estadoPersonajePropioVersus.className = "error";
      estadoPersonajePropioVersus.textContent = error.message;
      return;
    }
  }
  await abrirSalaVersus();
}

btnSalirSeleccionPersonajeVersus.addEventListener("click", volverASalaDesdeSeleccionVersus);
btnSalirSeleccionPersonajeVersusVertical.addEventListener("click", volverASalaDesdeSeleccionVersus);

async function volverAlMenuDesdePreparacionVersus() {
  if (transicionCombateVersus) clearTimeout(transicionCombateVersus);
  transicionCombateVersus = null;
  esperaRivalVersus.classList.add("oculto");
  const sala = adaptadorSalasVersus.obtenerSala();
  if (adaptadorSalasVersus.proveedor === "supabase" && sala) {
    try {
      const usuarioId = adaptadorSalasVersus.obtenerUsuarioId?.();
      const jugadorPropio = sala.jugadores.find((jugador) => jugador.id === usuarioId);
      if (jugadorPropio?.preparacionLista) await adaptadorSalasVersus.cancelarDesafio();
      await adaptadorSalasVersus.actualizarPersonaje({
        personaje: personajeJugadorVersus,
        listo: false,
      });
    } catch (error) {
      console.warn("No se pudo cancelar la preparación remota.", error);
    }
  }
  mostrarPantalla(pantallaSeleccionPersonajeVersus);
  actualizarSeleccionPersonajeRemota(adaptadorSalasVersus.obtenerSala());
}

btnSalirPreparacionVersus.addEventListener("click", volverAlMenuDesdePreparacionVersus);
btnSalirPreparacionVersusVertical.addEventListener("click", volverAlMenuDesdePreparacionVersus);

let palabrasSecretasVersus = [];
let transicionCombateVersus = null;

function limpiarPalabraParaVersus(valor) {
  return VersusEngine.normalizarPalabra(valor, maximoLetrasPalabraVersus);
}

function obtenerClavePalabraVersus(valor) {
  return VersusEngine.obtenerClavePalabra(valor);
}

function validarPreparacionVersus(mostrarErrores = false) {
  const valores = inputsPalabrasVersus.map((input) => input.value);
  const claves = valores.map(obtenerClavePalabraVersus);
  const clavesDiccionario = clavesBancosPalabrasVersus[tematicaVersus.value] || new Set();
  let formularioValido = true;

  inputsPalabrasVersus.forEach((input, indice) => {
    const campo = input.closest(".campo-palabra-secreta");
    const contador = campo.querySelector(".contador-palabra-versus");
    const error = campo.querySelector(".error-palabra-versus");
    const valor = valores[indice];
    const repetida = valor.length >= minimoLetrasPalabraVersus && claves.some(
      (otra, otroIndice) => otroIndice !== indice && otra === claves[indice],
    );
    const figuraEnDiccionario = clavesDiccionario.has(claves[indice]);
    let mensaje = "";

    contador.textContent = `${valor.length} ${valor.length === 1 ? "letra" : "letras"}`;
    if (valor.length > 0 && valor.length < minimoLetrasPalabraVersus) {
      mensaje = `Debe tener al menos ${minimoLetrasPalabraVersus} letras.`;
    }
    if (valor.length > maximoLetrasPalabraVersus) {
      mensaje = `Puede tener hasta ${maximoLetrasPalabraVersus} letras.`;
    }
    if (
      valor.length >= minimoLetrasPalabraVersus &&
      valor.length <= maximoLetrasPalabraVersus &&
      !figuraEnDiccionario
    ) {
      mensaje = `No figura en el diccionario de ${nombresTematicasVersus[tematicaVersus.value] || "esta temática"}.`;
    }
    if (repetida) mensaje = "Esta palabra está repetida.";

    const valida =
      valor.length >= minimoLetrasPalabraVersus &&
      valor.length <= maximoLetrasPalabraVersus &&
      figuraEnDiccionario &&
      !repetida;
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
  tituloEsperaRivalVersus.textContent = "Palabras listas";
  textoEsperaRivalVersus.textContent = "Esperando al rival…";
  estadoPreparacionRivalVersus.className = "estado-preparacion-rival-versus";
  estadoPreparacionRivalVersus.textContent = "Tu rival está preparando su desafío…";
  inputsPalabrasVersus.forEach((input) => {
    input.disabled = false;
    input.classList.remove("invalida");
  });
  tematicaVersus.disabled = false;
  btnPalabrasAleatoriasVersus.disabled = false;
  validarPreparacionVersus();
  mostrarPantalla(pantallaPreparacionVersus);
  actualizarPreparacionRemota(adaptadorSalasVersus.obtenerSala());
}

inputsPalabrasVersus.forEach((input) => {
  input.addEventListener("input", () => {
    input.value = limpiarPalabraParaVersus(input.value);
    validarPreparacionVersus(true);
  });
});

tematicaVersus.addEventListener("change", () => validarPreparacionVersus(true));

function completarPalabrasAleatoriasVersus() {
  const banco = bancosPalabrasVersus[tematicaVersus.value] || [];
  const seleccion = mezclarPalabrasVersus(banco).slice(0, maximoPalabrasVersus);
  inputsPalabrasVersus.forEach((input, indice) => {
    input.value = seleccion[indice] || "";
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
  btnConfirmarPalabrasVersus.focus();
}

btnPalabrasAleatoriasVersus.addEventListener("click", completarPalabrasAleatoriasVersus);

formPreparacionVersus.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  if (!validarPreparacionVersus(true)) return;

  palabrasSecretasVersus = inputsPalabrasVersus.map((input) => input.value);
  inputsPalabrasVersus.forEach((input) => { input.disabled = true; });
  tematicaVersus.disabled = true;
  btnPalabrasAleatoriasVersus.disabled = true;
  btnConfirmarPalabrasVersus.disabled = true;
  esperaRivalVersus.classList.remove("oculto");

  if (adaptadorSalasVersus.proveedor === "supabase") {
    tituloEsperaRivalVersus.textContent = "Protegiendo tus palabras…";
    textoEsperaRivalVersus.textContent = "Guardando el desafío de forma segura.";
    try {
      const sala = await adaptadorSalasVersus.guardarDesafio({
        tematica: tematicaVersus.value,
        palabras: palabrasSecretasVersus,
      });
      actualizarEstadoMultijugador(sala);
    } catch (error) {
      esperaRivalVersus.classList.add("oculto");
      inputsPalabrasVersus.forEach((input) => { input.disabled = false; });
      tematicaVersus.disabled = false;
      btnPalabrasAleatoriasVersus.disabled = false;
      estadoPreparacionRivalVersus.className = "estado-preparacion-rival-versus error";
      estadoPreparacionRivalVersus.textContent = error.message || "No pudimos guardar el desafío.";
      validarPreparacionVersus(true);
    }
    return;
  }

  transicionCombateVersus = setTimeout(() => {
    transicionCombateVersus = null;
    prepararDueloVersus({ comenzarRonda: false });
    mostrarPantalla(pantallaVersus);
    requestAnimationFrame(iniciarEntradaDueloVersus);
  }, modoPruebasActivo ? 150 : 1100);
});

btnCompletarPalabrasPruebasVersus.addEventListener("click", () => {
  if (!modoPruebasActivo) return;
  completarPalabrasAleatoriasVersus();
});

async function volverAlMenuDesdeVersus() {
  cancelarCinematicaFinalVersus();
  detenerRondaVersus();
  salidaSalaVersusEnCurso = true;
  try {
    await adaptadorSalasVersus.salirSala();
  } catch (error) {
    console.warn("No se pudo cerrar la sala remota.", error);
  } finally {
    salidaSalaVersusEnCurso = false;
  }
  partidaOnlineVersus = null;
  partidaOnlineIniciada = false;
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
    protegerTransicionTrasCartel(secuenciaNarrativa);

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

      if (sonidoNarrativoPendiente === "ramas") {
        activarBloqueoRamas();
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
  reproducirSonidoComenzarAventura();
  solicitarOrientacion("portrait");

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
      precargarRecursosCriticosMision(),
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

btnProbarMuralSantuario.addEventListener("click", async () => {
  if (!modoPruebasActivo || rompecabezasMuralActivo) return;
  const completado = await abrirRompecabezasMuralSantuario();
  if (completado) await probarDespertarDragonSantuario();
});

btnAyudaMuralSantuario.addEventListener("click", mostrarAyudaMuralSantuario);
btnRetirarPiezaMural.addEventListener("click", retirarPiezaMuralSantuario);
btnSalirMuralSantuario.addEventListener("click", () => {
  cerrarRompecabezasMuralSantuario(false);
  detenerSonidos();
  mostrarPantalla(pantallaMenu);
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

  void iniciarMisionAventura();
});

btnNuevaAventura.addEventListener("click", () => {
  const confirmar = confirm(
    "Ya tenés una aventura guardada.\n\n¿Querés comenzar una nueva aventura?\nSe perderá el progreso actual.",
  );

  if (!confirmar) return;

  reproducirSonidoComenzarAventura();
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
          void completarSantuarioConMural();
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

function solicitarOrientacion(orientacion = null) {
  const controladorOrientacion = globalThis.screen?.orientation;

  if (!controladorOrientacion) return;

  try {
    if (!orientacion) {
      controladorOrientacion.unlock?.();
      return;
    }

    const solicitudBloqueo = controladorOrientacion.lock?.(orientacion);
    solicitudBloqueo?.catch(() => {});
  } catch {
    // El navegador puede rechazar el bloqueo fuera de una PWA instalada.
  }
}

function actualizarOrientacionPantalla(pantallaSeleccionada) {
  if (
    pantallaSeleccionada === pantallaMenu
    || pantallaSeleccionada === pantallaJuego
  ) {
    solicitarOrientacion("portrait");
    return;
  }

  if (
    pantallaSeleccionada === pantallaSalaVersus
    || pantallaSeleccionada === pantallaSeleccionPersonajeVersus
    || pantallaSeleccionada === pantallaPreparacionVersus
    || pantallaSeleccionada === pantallaVersus
  ) {
    solicitarOrientacion("landscape");
    return;
  }

  solicitarOrientacion();
}

function mostrarPantalla(pantallaSeleccionada) {
  document.querySelectorAll(".pantalla").forEach((pantalla) => {
    pantalla.classList.remove("activa");
  });

  pantallaSeleccionada.classList.add("activa");
  actualizarOrientacionPantalla(pantallaSeleccionada);

  if (pantallaSeleccionada === pantallaMenu) {
    reproducirMusicaMenu();
  } else {
    pausarMusicaMenu();
  }
}

function crearTecladoVersus() {
  if (tecladoVersus.children.length > 0) return;

  let indiceTecla = 0;
  filasTeclado.forEach((fila) => {
    const filaTeclado = document.createElement("div");
    filaTeclado.className = "fila-teclado-versus";

    fila.forEach((letra) => {
      const botonLetra = document.createElement("button");
      botonLetra.type = "button";
      botonLetra.textContent = letra;
      botonLetra.className = "letra-versus";
      botonLetra.setAttribute("aria-label", `Letra ${letra}`);
      botonLetra.style.setProperty("--demora-agujero", `${indiceTecla * 30}ms`);
      botonLetra.style.setProperty("--giro-agujero", `${(indiceTecla % 2 ? -1 : 1) * (180 + (indiceTecla % 5) * 36)}deg`);
      botonLetra.addEventListener("click", () => jugarLetraVersus(letra, botonLetra));
      filaTeclado.appendChild(botonLetra);
      indiceTecla += 1;
    });

    tecladoVersus.appendChild(filaTeclado);
  });
  const vorticeInterior = document.createElement("span");
  vorticeInterior.className = "vortice-interior-agujero-versus";
  vorticeInterior.setAttribute("aria-hidden", "true");
  for (let indice = 0; indice < 6; indice += 1) vorticeInterior.appendChild(document.createElement("i"));
  tecladoVersus.appendChild(vorticeInterior);
}

function animarCambioOrdenTecladoVersus(reordenar) {
  const botones = [...tecladoVersus.querySelectorAll("button")];
  const posicionesIniciales = new Map(
    botones.map((boton) => [boton, boton.getBoundingClientRect()]),
  );
  reordenar();
  tecladoVersus.classList.add("reordenando-caos");
  botones.forEach((boton) => {
    const inicio = posicionesIniciales.get(boton);
    const destino = boton.getBoundingClientRect();
    boton.style.transition = "none";
    boton.style.transform = `translate(${inicio.left - destino.left}px, ${inicio.top - destino.top}px)`;
  });
  requestAnimationFrame(() => requestAnimationFrame(() => {
    botones.forEach((boton) => {
      boton.style.transition = "transform 680ms cubic-bezier(0.2, 0.78, 0.18, 1)";
      boton.style.transform = "translate(0, 0)";
    });
  }));
  setTimeout(() => {
    tecladoVersus.classList.remove("reordenando-caos");
    botones.forEach((boton) => {
      boton.style.removeProperty("transition");
      boton.style.removeProperty("transform");
    });
  }, 720);
}

function restaurarOrdenTecladoVersus(animar = false) {
  const botones = new Map(
    [...tecladoVersus.querySelectorAll("button")].map((boton) => [boton.textContent, boton]),
  );
  const restaurar = () => {
    [...tecladoVersus.querySelectorAll(".fila-teclado-versus")].forEach((fila, indice) => {
      filasTeclado[indice].forEach((letra) => fila.appendChild(botones.get(letra)));
    });
  };
  if (animar) animarCambioOrdenTecladoVersus(restaurar);
  else restaurar();
}

function desordenarTecladoVersus(animar = true) {
  const botones = mezclarPalabrasVersus([...tecladoVersus.querySelectorAll("button")]);
  const desordenar = () => {
    let desplazamiento = 0;
    [...tecladoVersus.querySelectorAll(".fila-teclado-versus")].forEach((fila, indice) => {
      const cantidad = filasTeclado[indice].length;
      botones.slice(desplazamiento, desplazamiento + cantidad).forEach((boton) => fila.appendChild(boton));
      desplazamiento += cantidad;
    });
  };
  if (animar) animarCambioOrdenTecladoVersus(desordenar);
  else desordenar();
}

function detenerCaosContinuoTecladoVersus() {
  if (demoVersus.intervaloCaosHabilidad) clearInterval(demoVersus.intervaloCaosHabilidad);
  demoVersus.intervaloCaosHabilidad = null;
}

function iniciarCaosContinuoTecladoVersus() {
  desordenarTecladoVersus(true);
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  demoVersus.intervaloCaosHabilidad = setInterval(() => {
    desordenarTecladoVersus(true);
  }, 760);
}

function actualizarPistaLupaVersus(letra = "") {
  tecladoVersus.querySelectorAll("button").forEach((boton) => {
    boton.classList.toggle("pista-lupa", Boolean(letra) && boton.textContent === letra);
  });
}

function limpiarAnimacionHabilidadVersus() {
  demoVersus.temporizadoresHabilidad.forEach(clearTimeout);
  demoVersus.temporizadoresHabilidad = [];
  animacionHabilidadVersus.className = "animacion-habilidad-versus";
  herramientasHabilidadesPruebasVersus.classList.remove("ataque-en-curso");
  [personajeVersusUno, personajeVersusDos].forEach((personaje) => {
    personaje.classList.remove("usando-habilidad", "nivor-en-vuelo");
  });
  if (personajesVersus[personajeJugadorVersus]) {
    personajeVersusUno.src = personajesVersus[personajeJugadorVersus].base;
  }
  if (personajesVersus[personajeRivalVersus]) {
    personajeVersusDos.src = personajesVersus[personajeRivalVersus].base;
  }
}

function programarPasoHabilidadVersus(accion, demora) {
  const temporizador = setTimeout(accion, demora);
  demoVersus.temporizadoresHabilidad.push(temporizador);
}

function reproducirAnimacionHabilidadVersus(
  personaje,
  { desdeRival = false, alImpactar = () => {} } = {},
) {
  limpiarAnimacionHabilidadVersus();
  herramientasHabilidadesPruebasVersus.classList.add("ataque-en-curso");
  const movimientoReducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const atacante = desdeRival ? personajeVersusDos : personajeVersusUno;
  const pose = {
    explorador: srcExploradorLupaVersus,
    mago: srcMagoAtaqueVersus,
    guardiana: srcGuardianaAtaqueVersus,
    dragon: srcDragonAtaqueVersus,
    hombre_lobo: srcHombreLoboSaltoVersus,
    t_shadow: srcShadowAtaqueVersus,
    guardian_alba: srcGuardianAlbaHabilidadVersus,
    dragon_hielo: srcDragonHieloVueloVersus,
    azrak: srcAzrakAtaqueVersus,
  }[personaje];
  if (pose) atacante.src = pose;
  atacante.classList.add("usando-habilidad");
  if (personaje === "dragon_hielo" && !movimientoReducido) {
    atacante.classList.add("nivor-en-vuelo");
  }

  animacionHabilidadVersus.className = [
    "animacion-habilidad-versus",
    `habilidad-${personaje}`,
    desdeRival ? "desde-rival" : "desde-jugador",
  ].join(" ");
  void animacionHabilidadVersus.offsetWidth;
  animacionHabilidadVersus.classList.add("activa");
  reproducirSonidoVersus(desdeRival ? "versusAtaqueDos" : "versusAtaqueUno", 0.5);

  const demoraImpacto = personaje === "dragon_hielo" ? 140 : personaje === "azrak" ? 620 : 560;
  const demoraLimpieza = personaje === "dragon_hielo" ? 1900 : personaje === "azrak" ? 1380 : 1120;
  programarPasoHabilidadVersus(alImpactar, movimientoReducido ? 80 : demoraImpacto);
  programarPasoHabilidadVersus(limpiarAnimacionHabilidadVersus, movimientoReducido ? 180 : demoraLimpieza);
}

function sincronizarTecladoDemoVersus() {
  const bloqueado = demoVersus.finalizadoJugador
    || demoVersus.partidaFinalizada
    || tecladoVersus.classList.contains("efecto-raices")
    || tecladoVersus.classList.contains("efecto-agujero-negro")
    || tecladoVersus.classList.contains("efecto-teclas-rotas")
    || tecladoVersus.classList.contains("efecto-congelado");
  tecladoVersus.querySelectorAll("button").forEach((boton) => {
    boton.disabled = bloqueado || demoVersus.letrasJugador.has(boton.textContent);
  });
}

function limpiarEfectoVisualHabilidadVersus() {
  if (demoVersus.temporizadorEfectoHabilidad) clearTimeout(demoVersus.temporizadorEfectoHabilidad);
  demoVersus.temporizadorEfectoHabilidad = null;
  detenerCaosContinuoTecladoVersus();
  tecladoVersus.classList.remove("efecto-raices", "efecto-rugido", "efecto-caos", "efecto-agujero-negro", "efecto-teclas-rotas", "efecto-congelado");
  tecladoVersus.style.removeProperty("--duracion-agujero-negro");
  desafioJugadorVersus.classList.remove(
    "efecto-raices-desafio",
    "efecto-rugido-desafio",
    "efecto-caos-desafio",
    "efecto-agujero-negro-desafio",
    "efecto-ruptura-desafio",
  );
  desafioJugadorVersus.style.removeProperty("--duracion-agujero-negro");
  marcoVersus.classList.remove("efecto-inversion-lunar");
  marcoVersus.classList.remove("efecto-invierno-absoluto");
  marcoVersus.style.removeProperty("--duracion-invierno-absoluto");
  congelacionNivorVersus.classList.remove("activa", "desde-rival");
  teclasRotasVersus.classList.remove("activa");
  teclasRotasVersus.replaceChildren();
  restaurarOrdenTecladoVersus();
}

function prepararAgujeroNegroTecladoVersus() {
  const teclado = tecladoVersus.getBoundingClientRect();
  const centroX = teclado.left + teclado.width / 2;
  const centroY = teclado.top + teclado.height / 2;
  tecladoVersus.querySelectorAll("button").forEach((boton) => {
    const tecla = boton.getBoundingClientRect();
    boton.style.setProperty("--absorcion-x", `${centroX - tecla.left - tecla.width / 2}px`);
    boton.style.setProperty("--absorcion-y", `${centroY - tecla.top - tecla.height / 2}px`);
  });
}

function prepararTeclasRotasVersus() {
  teclasRotasVersus.replaceChildren();
  const marco = marcoVersus.getBoundingClientRect();
  const teclado = tecladoVersus.getBoundingClientRect();
  const anchoUtil = Math.max(120, marco.width - 52);
  const altoUtil = Math.max(90, marco.height - 48);
  teclasRotasVersus.style.setProperty("--explosion-x", `${teclado.left - marco.left + teclado.width / 2}px`);
  teclasRotasVersus.style.setProperty("--explosion-y", `${teclado.top - marco.top + teclado.height / 2}px`);
  [...tecladoVersus.querySelectorAll("button")].forEach((boton, indice) => {
    const origen = boton.getBoundingClientRect();
    const tecla = document.createElement("span");
    const inicioX = origen.left - marco.left;
    const inicioY = origen.top - marco.top;
    const destino = (salto, factor) => ((indice * factor + salto) % 97) / 96;
    tecla.textContent = boton.textContent;
    tecla.style.left = `${inicioX}px`;
    tecla.style.top = `${inicioY}px`;
    tecla.style.setProperty("--rotura-x1", `${24 + destino(11, 37) * anchoUtil - inicioX}px`);
    tecla.style.setProperty("--rotura-y1", `${20 + destino(29, 53) * altoUtil - inicioY}px`);
    tecla.style.setProperty("--rotura-x2", `${24 + destino(47, 71) * anchoUtil - inicioX}px`);
    tecla.style.setProperty("--rotura-y2", `${20 + destino(67, 41) * altoUtil - inicioY}px`);
    tecla.style.setProperty("--rotura-x3", `${24 + destino(83, 29) * anchoUtil - inicioX}px`);
    tecla.style.setProperty("--rotura-y3", `${20 + destino(5, 79) * altoUtil - inicioY}px`);
    tecla.style.setProperty("--giro-rotura", `${(indice % 2 ? -1 : 1) * (260 + (indice % 7) * 38)}deg`);
    tecla.style.setProperty("--demora-rotura", `${460 + (indice % 9) * 16}ms`);
    tecla.style.setProperty("--duracion-rotura", `${1550 + (indice % 6) * 120}ms`);
    teclasRotasVersus.appendChild(tecla);
  });
  teclasRotasVersus.classList.add("activa");
}

function prepararBarridoHieloNivorVersus(milisegundos) {
  const fuentes = [
    "assets/images/elementos/hielo-pantalla-nivor-1.png",
    "assets/images/elementos/hielo-pantalla-nivor-2.png",
    "assets/images/elementos/hielo-pantalla-nivor-3.png",
  ];
  const fragmento = document.createDocumentFragment();
  congelacionNivorVersus.classList.toggle(
    "desde-rival",
    animacionHabilidadVersus.classList.contains("desde-rival"),
  );

  fuentes.forEach((fuente, indice) => {
    const capa = document.createElement("i");
    capa.className = `barrido-hielo-nivor barrido-hielo-nivor-${indice + 1}`;
    capa.setAttribute("aria-hidden", "true");
    capa.style.backgroundImage = `url("${fuente}")`;
    capa.style.setProperty("--opacidad-hielo", indice === 0 ? ".97" : indice === 1 ? ".2" : ".13");
    capa.style.setProperty("--retraso-barrido", "0ms");
    capa.style.setProperty("--duracion-barrido", `${milisegundos}ms`);
    fragmento.appendChild(capa);
  });

  const frenteEscarcha = document.createElement("img");
  frenteEscarcha.className = "frente-escarcha-nivor";
  frenteEscarcha.src = "assets/images/elementos/estela-escarcha-nivor.png";
  frenteEscarcha.alt = "";
  frenteEscarcha.setAttribute("aria-hidden", "true");
  fragmento.appendChild(frenteEscarcha);

  const grietas = document.createElement("b");
  grietas.setAttribute("aria-hidden", "true");
  congelacionNivorVersus.replaceChildren(fragmento, grietas);
}

function aplicarEfectoVisualHabilidadVersus(efecto, milisegundos) {
  limpiarEfectoVisualHabilidadVersus();
  if (!efecto || milisegundos <= 0) {
    if (adaptadorSalasVersus.proveedor === "supabase" && partidaOnlineVersus) {
      actualizarTecladoPartidaOnline(partidaOnlineVersus);
    } else {
      sincronizarTecladoDemoVersus();
    }
    return;
  }

  if (efecto === "roots") {
    tecladoVersus.classList.add("efecto-raices");
    desafioJugadorVersus.classList.add("efecto-raices-desafio");
  }
  if (efecto === "roar") {
    tecladoVersus.classList.add("efecto-rugido");
    desafioJugadorVersus.classList.add("efecto-rugido-desafio");
  }
  if (efecto === "shuffle") {
    tecladoVersus.classList.add("efecto-caos");
    desafioJugadorVersus.classList.add("efecto-caos-desafio");
    iniciarCaosContinuoTecladoVersus();
  }
  if (efecto === "invert") {
    marcoVersus.style.setProperty("--duracion-inversion-lunar", `${milisegundos}ms`);
    marcoVersus.classList.add("efecto-inversion-lunar");
  }
  if (efecto === "black_hole") {
    prepararAgujeroNegroTecladoVersus();
    tecladoVersus.style.setProperty("--duracion-agujero-negro", `${milisegundos}ms`);
    tecladoVersus.classList.add("efecto-agujero-negro");
    desafioJugadorVersus.style.setProperty("--duracion-agujero-negro", `${milisegundos}ms`);
    desafioJugadorVersus.classList.add("efecto-agujero-negro-desafio");
  }
  if (efecto === "key_bounce") {
    prepararTeclasRotasVersus();
    tecladoVersus.classList.add("efecto-teclas-rotas");
    desafioJugadorVersus.classList.add("efecto-ruptura-desafio");
  }
  if (efecto === "ice_screen") {
    prepararBarridoHieloNivorVersus(milisegundos);
    marcoVersus.style.setProperty("--duracion-invierno-absoluto", `${milisegundos}ms`);
    marcoVersus.classList.add("efecto-invierno-absoluto");
    tecladoVersus.classList.add("efecto-congelado");
    congelacionNivorVersus.classList.add("activa");
  }
  if (["roots", "black_hole", "key_bounce", "ice_screen"].includes(efecto)) tecladoVersus.querySelectorAll("button").forEach((boton) => { boton.disabled = true; });

  demoVersus.temporizadorEfectoHabilidad = setTimeout(() => {
    demoVersus.temporizadorEfectoHabilidad = null;
    const restaurarConAnimacion = tecladoVersus.classList.contains("efecto-caos");
    detenerCaosContinuoTecladoVersus();
    tecladoVersus.classList.remove("efecto-raices", "efecto-rugido", "efecto-caos", "efecto-agujero-negro", "efecto-teclas-rotas", "efecto-congelado");
    tecladoVersus.style.removeProperty("--duracion-agujero-negro");
    desafioJugadorVersus.classList.remove(
      "efecto-raices-desafio",
      "efecto-rugido-desafio",
      "efecto-caos-desafio",
      "efecto-agujero-negro-desafio",
      "efecto-ruptura-desafio",
    );
    desafioJugadorVersus.style.removeProperty("--duracion-agujero-negro");
    teclasRotasVersus.classList.remove("activa");
    teclasRotasVersus.replaceChildren();
    marcoVersus.classList.remove("efecto-inversion-lunar");
    marcoVersus.style.removeProperty("--duracion-inversion-lunar");
    marcoVersus.classList.remove("efecto-invierno-absoluto");
    marcoVersus.style.removeProperty("--duracion-invierno-absoluto");
    congelacionNivorVersus.classList.remove("activa");
    restaurarOrdenTecladoVersus(restaurarConAnimacion);
    if (adaptadorSalasVersus.proveedor === "supabase" && partidaOnlineVersus) {
      actualizarTecladoPartidaOnline(partidaOnlineVersus);
    } else {
      sincronizarTecladoDemoVersus();
    }
  }, milisegundos);
}

function obtenerPistaLupaVersus(palabra, letrasUsadas) {
  const pendientes = [...new Set([...VersusEngine.obtenerClavePalabra(palabra)])]
    .filter((letra) => !letrasUsadas.has(letra));
  return pendientes[Math.floor(Math.random() * pendientes.length)] || "";
}

function obtenerLetraIncorrectaDisponibleVersus(palabra, letrasUsadas) {
  const clave = obtenerClavePalabraVersus(palabra);
  const opciones = filasTeclado.flat().filter(
    (letra) => !clave.includes(letra) && !letrasUsadas.has(letra),
  );
  return opciones[Math.floor(Math.random() * opciones.length)] || "";
}

function animarTeclaCalaveraIgneaVersus(letra, recibida = false) {
  const tecla = [...tecladoVersus.querySelectorAll("button")]
    .find((boton) => boton.textContent === letra);
  if (!tecla) return;
  tecla.classList.remove("tecla-calavera-ignea", "impacto-recibido");
  void tecla.offsetWidth;
  tecla.classList.add("tecla-calavera-ignea");
  if (recibida) tecla.classList.add("impacto-recibido");
  setTimeout(() => tecla.classList.remove("tecla-calavera-ignea", "impacto-recibido"), 1100);
}

function aplicarFalloForzadoRivalLocalVersus() {
  const palabra = obtenerPalabraActualRivalVersus();
  const letra = obtenerLetraIncorrectaDisponibleVersus(palabra, demoVersus.letrasRival);
  if (!letra) return;
  const turno = VersusEngine.evaluarLetra({
    palabra,
    letras: [...demoVersus.letrasRival],
    errores: demoVersus.erroresRival,
    letra,
  });
  demoVersus.letrasRival = new Set(turno.letras);
  demoVersus.erroresRival = turno.errores;
  actualizarIntentosVersus(document.getElementById("intentosVersusDos"), turno.errores, "El rival");
  mostrarEstadoProgresoVersus(document.getElementById("estadoProgresoDos"), `Azrak forzó la ${letra}`, "error");
  actualizarProgresosVersus();
  if (turno.sinIntentos) avanzarPalabraRivalVersus(false);
}

function aplicarFalloForzadoJugadorLocalVersus() {
  const palabra = obtenerPalabraActualJugadorVersus();
  const letra = obtenerLetraIncorrectaDisponibleVersus(palabra, demoVersus.letrasJugador);
  if (!letra) return;
  const turno = VersusEngine.evaluarLetra({
    palabra,
    letras: [...demoVersus.letrasJugador],
    errores: demoVersus.erroresJugador,
    letra,
  });
  demoVersus.letrasJugador = new Set(turno.letras);
  demoVersus.erroresJugador = turno.errores;
  animarTeclaCalaveraIgneaVersus(letra, true);
  vibrarImpactoVersus();
  reproducirSonidoVersus("error", 0.58);
  actualizarIntentosVersus(document.getElementById("intentosVersusUno"), turno.errores, "Jugador 1");
  mostrarEstadoProgresoVersus(document.getElementById("estadoProgresoUno"), `La calavera pulsó ${letra}`, "error");
  actualizarProgresosVersus();
  sincronizarTecladoDemoVersus();
  if (turno.sinIntentos) avanzarPalabraJugadorVersus(false);
}

function actualizarPanelHabilidadVersus(carga = demoVersus.cargaHabilidadJugador, pista = "") {
  const habilidad = habilidadesVersus[personajeJugadorVersus] || habilidadesVersus.explorador;
  const lista = carga >= letrasParaHabilidadVersus;
  iconoHabilidadVersus.textContent = habilidad.icono;
  nombreHabilidadVersus.textContent = habilidad.nombre;
  cargaHabilidadVersus.textContent = lista ? "¡Lista para usar!" : `${carga}/${letrasParaHabilidadVersus} letras`;
  progresoHabilidadVersus.style.width = `${Math.min(100, (carga / letrasParaHabilidadVersus) * 100)}%`;
  btnHabilidadVersus.classList.toggle("lista", lista);
  btnHabilidadVersus.disabled = !lista || demoVersus.partidaFinalizada || jugadaOnlineEnCurso;
  btnHabilidadVersus.setAttribute(
    "aria-label",
    lista ? `${habilidad.nombre}: lista para usar` : `${habilidad.nombre}: ${carga} de ${letrasParaHabilidadVersus} letras`,
  );
  actualizarPistaLupaVersus(pista);
}

function activarHabilidadLocalVersus() {
  if (demoVersus.cargaHabilidadJugador < letrasParaHabilidadVersus || demoVersus.partidaFinalizada) return;
  const habilidad = habilidadesVersus[personajeJugadorVersus];
  demoVersus.cargaHabilidadJugador = 0;
  if (habilidad.efecto === "hint") {
    const pista = obtenerPistaLupaVersus(
      obtenerPalabraActualJugadorVersus(),
      demoVersus.letrasJugador,
    );
    demoVersus.pistaLupaJugador = pista;
    actualizarPanelHabilidadVersus(0);
    reproducirAnimacionHabilidadVersus(personajeJugadorVersus, {
      alImpactar: () => {
        actualizarPanelHabilidadVersus(0, pista);
        mostrarAvisoAvanceVersus(`La lupa señaló la letra ${pista}.`, "acierto");
      },
    });
  } else if (habilidad.efecto === "forced_miss") {
    reproducirAnimacionHabilidadVersus(personajeJugadorVersus, {
      alImpactar: () => {
        aplicarFalloForzadoRivalLocalVersus();
        mostrarAvisoAvanceVersus("¡Calavera Ígnea obligó al rival a fallar!", "acierto");
      },
    });
  } else {
    reproducirAnimacionHabilidadVersus(personajeJugadorVersus, {
      alImpactar: () => {
        demoVersus.efectoRival = habilidad.efecto;
        demoVersus.efectoRivalHasta = Date.now() + habilidad.duracion;
        mostrarAvisoAvanceVersus(`¡${habilidad.nombre} afectó al rival!`, "acierto");
      },
    });
  }
  actualizarPanelHabilidadVersus(0);
}

function activarHabilidadRivalLocalVersus() {
  if (demoVersus.cargaHabilidadRival < letrasParaHabilidadVersus || demoVersus.partidaFinalizada) return;
  const habilidad = habilidadesVersus[personajeRivalVersus] || habilidadesVersus.mago;
  if (habilidad.efecto === "hint") {
    const pista = obtenerPistaLupaVersus(
      obtenerPalabraActualRivalVersus(),
      demoVersus.letrasRival,
    );
    if (!pista) return;
    demoVersus.pistaLupaRival = pista;
    reproducirAnimacionHabilidadVersus(personajeRivalVersus, { desdeRival: true });
  } else if (habilidad.efecto === "forced_miss") {
    reproducirAnimacionHabilidadVersus(personajeRivalVersus, {
      desdeRival: true,
      alImpactar: aplicarFalloForzadoJugadorLocalVersus,
    });
  } else {
    reproducirAnimacionHabilidadVersus(personajeRivalVersus, {
      desdeRival: true,
      alImpactar: () => aplicarEfectoVisualHabilidadVersus(habilidad.efecto, habilidad.duracion),
    });
  }
  demoVersus.cargaHabilidadRival = 0;
  mostrarAvisoAvanceVersus(`El rival activó ${habilidad.nombre}.`, "error");
}

async function activarHabilidadVersus() {
  if (btnHabilidadVersus.disabled) return;
  if (adaptadorSalasVersus.proveedor !== "supabase") {
    activarHabilidadLocalVersus();
    return;
  }
  jugadaOnlineEnCurso = true;
  actualizarPanelHabilidadVersus(partidaOnlineVersus?.me?.abilityCharge || 0, partidaOnlineVersus?.me?.abilityHint || "");
  try {
    await adaptadorSalasVersus.activarHabilidad();
  } catch (error) {
    mostrarAvisoAvanceVersus(error.message || "No pudimos activar la habilidad.", "error");
  } finally {
    jugadaOnlineEnCurso = false;
    if (partidaOnlineVersus) renderizarPartidaOnline(partidaOnlineVersus);
  }
}

btnHabilidadVersus.addEventListener("click", activarHabilidadVersus);

// Duelo local de cinco rondas. En línea, las palabras y jugadas del rival
// llegan desde el otro dispositivo en lugar de esta simulación.
const bancosPalabrasVersus = {
  paises: [
    "ARGENTINA", "BRASIL", "CHILE", "PERÚ", "ESPAÑA", "MÉXICO", "CANADÁ", "ITALIA", "JAPÓN", "INDIA",
    "FRANCIA", "ALEMANIA", "PORTUGAL", "URUGUAY", "PARAGUAY", "BOLIVIA", "COLOMBIA", "ECUADOR", "VENEZUELA", "PANAMÁ",
    "CUBA", "HAITÍ", "JAMAICA", "BELICE", "GUATEMALA", "HONDURAS", "NICARAGUA", "DOMINICA", "GRANADA", "BAHAMAS",
    "SUIZA", "AUSTRIA", "BÉLGICA", "GRECIA", "POLONIA", "CROACIA", "SERBIA", "RUMANIA", "BULGARIA", "UCRANIA",
    "RUSIA", "CHINA", "TAILANDIA", "VIETNAM", "EGIPTO", "MARRUECOS", "KENIA", "ANGOLA", "AUSTRALIA", "TURQUÍA",
  ],
  frutas: [
    "MANZANA", "PERA", "UVA", "KIWI", "MANGO", "LIMÓN", "NARANJA", "BANANA", "CIRUELA", "MELÓN",
    "SANDÍA", "PAPAYA", "ANANÁ", "DURAZNO", "CEREZA", "FRUTILLA", "MANDARINA", "POMELO", "COCO", "HIGO",
    "GRANADA", "GUAYABA", "MARACUYÁ", "MEMBRILLO", "DAMASCO", "ARÁNDANO", "FRAMBUESA", "MORA", "GROSELLA", "LIMA",
    "PALTA", "TOMATE", "CAQUI", "LICHI", "NÍSPERO", "TUNA", "DÁTIL", "ACEITUNA", "BERGAMOTA", "CHIRIMOYA",
    "PITAHAYA", "TAMARINDO", "CARAMBOLA", "KUMQUAT", "TORONJA", "UCHUVA", "YACA", "MAMÓN", "ZARZAMORA", "NECTARINA",
  ],
  animales: [
    "ÁGUILA", "BALLENA", "CABALLO", "CONEJO", "DELFÍN", "GATO", "JIRAFA", "LEÓN", "PANDA", "TIGRE",
    "PERRO", "ELEFANTE", "COCODRILO", "TORTUGA", "CANGURO", "KOALA", "CEBRA", "RINOCERONTE", "HIPOPÓTAMO", "MONO",
    "GORILA", "CHIMPANCÉ", "PINGÜINO", "TIBURÓN", "PULPO", "CALAMAR", "FOCA", "NUTRIA", "CASTOR", "ARDILLA",
    "LOBO", "ZORRO", "OSO", "PUMA", "JAGUAR", "LEOPARDO", "GUEPARDO", "HIENA", "BÚFALO", "BISONTE",
    "CAMELLO", "LLAMA", "CABRA", "OVEJA", "CERDO", "GALLO", "GALLINA", "PATO", "CISNE", "BÚHO",
  ],
  comidas: [
    "PIZZA", "PASTA", "EMPANADA", "MILANESA", "LOCRO", "SOPA", "ARROZ", "TORTILLA", "ENSALADA", "HELADO",
    "HAMBURGUESA", "LASAÑA", "RAVIOLES", "ÑOQUIS", "ASADO", "GUISO", "TARTA", "PANQUEQUE", "ALBÓNDIGA", "CROQUETA",
    "SÁNDWICH", "TAMAL", "HUMITA", "AREPA", "TACOS", "BURRITO", "CEVICHE", "SUSHI", "RAMEN", "PAELLA",
    "RISOTTO", "POLENTA", "PURÉ", "OMELETTE", "CHURRASCO", "CHORIZO", "MATAMBRE", "PARRILLA", "CALZONE", "FOCACCIA",
    "CHURRO", "FLAN", "BROWNIE", "GALLETA", "BIZCOCHO", "TORTA", "PASTEL", "BUDÍN", "MOUSSE", "GELATINA",
  ],
  profesiones: [
    "MÉDICO", "DOCENTE", "BOMBERO", "ABOGADO", "ARTISTA", "PANADERO", "PILOTO", "ACTOR", "COCINERO", "DENTISTA",
    "INGENIERO", "ARQUITECTO", "ENFERMERO", "PERIODISTA", "CONTADOR", "MECÁNICO", "ELECTRICISTA", "CARPINTERO", "PLOMERO", "JARDINERO",
    "VETERINARIO", "FARMACÉUTICO", "PSICÓLOGO", "FOTÓGRAFO", "DISEÑADOR", "PROGRAMADOR", "CIENTÍFICO", "ESCRITOR", "MÚSICO", "PINTOR",
    "ESCULTOR", "BAILARÍN", "CANTANTE", "DIRECTOR", "CAMARÓGRAFO", "POLICÍA", "SOLDADO", "MARINERO", "TAXISTA", "CHOFER",
    "CARTERO", "CAJERO", "VENDEDOR", "SECRETARIO", "TRADUCTOR", "LOCUTOR", "AZAFATA", "AGRÓNOMO", "BIÓLOGO", "GEÓLOGO",
  ],
  deportes: [
    "FÚTBOL", "TENIS", "RUGBY", "HOCKEY", "BOXEO", "NATACIÓN", "CICLISMO", "VOLEY", "GOLF", "JUDO",
    "BÁSQUET", "HANDBALL", "BÉISBOL", "SOFTBOL", "CRÍQUET", "PÁDEL", "SQUASH", "SURF", "REMO", "VELA",
    "ATLETISMO", "TRIATLÓN", "MARATÓN", "ESGRIMA", "KARATE", "TAEKWONDO", "SUMO", "LUCHA", "POLO", "BOCHAS",
    "BILLAR", "AJEDREZ", "PATINAJE", "ESQUÍ", "SNOWBOARD", "ALPINISMO", "ESCALADA", "EQUITACIÓN", "CANOTAJE", "KAYAK",
    "MOTOCROSS", "RALLY", "KARTING", "BOWLING", "BÁDMINTON", "WATERPOLO", "LACROSSE", "FUTSAL", "ARQUERÍA", "GIMNASIA",
  ],
  transportes: [
    "AUTO", "TREN", "BARCO", "AVIÓN", "METRO", "BICICLETA", "CAMIÓN", "COLECTIVO", "TRANVÍA", "MOTO",
    "TAXI", "SUBTE", "ÓMNIBUS", "TRACTOR", "CAMIONETA", "FURGONETA", "MONOPATÍN", "TRICICLO", "CUATRICICLO", "MOTONETA",
    "VELERO", "LANCHA", "CANOA", "KAYAK", "BOTE", "YATE", "FERRY", "BUQUE", "CRUCERO", "SUBMARINO",
    "HELICÓPTERO", "AVIONETA", "PLANEADOR", "DIRIGIBLE", "GLOBO", "COHETE", "LANZADERA", "HIDROAVIÓN", "TELEFÉRICO", "FUNICULAR",
    "AMBULANCIA", "PATRULLERO", "REMOLQUE", "CARRETA", "CARRO", "TRINEO", "LOCOMOTORA", "MOTOCICLETA", "AERONAVE", "CATAMARÁN",
  ],
  objetos: [
    "MESA", "SILLA", "RELOJ", "LLAVE", "VASO", "LÁMPARA", "CUADERNO", "ESPEJO", "BOTELLA", "TIJERA",
    "PLATO", "TAZA", "TENEDOR", "CUCHILLO", "CUCHARA", "OLLA", "SARTÉN", "JARRA", "TERMO", "MATE",
    "MOCHILA", "CARTERA", "BILLETERA", "PARAGUAS", "SOMBRERO", "ZAPATO", "CAMISA", "PANTALÓN", "BUFANDA", "GUANTE",
    "TELÉFONO", "TABLETA", "RADIO", "CÁMARA", "AURICULAR", "TECLADO", "PANTALLA", "CONTROL", "CARGADOR", "BATERÍA",
    "MARTILLO", "SERRUCHO", "PINZA", "CLAVO", "TORNILLO", "ESCOBA", "PALA", "CEPILLO", "PEINE", "ALMOHADA",
  ],
  naturaleza: [
    "SOL", "MAR", "RÍO", "LUNA", "MONTAÑA", "VOLCÁN", "BOSQUE", "NUBE", "VIENTO", "LAGUNA",
    "OCÉANO", "PLAYA", "ISLA", "VALLE", "COLINA", "PRADERA", "DESIERTO", "SELVA", "CASCADA", "ARROYO",
    "LAGO", "GLACIAR", "ICEBERG", "ACANTILADO", "CUEVA", "ROCA", "PIEDRA", "ARENA", "TIERRA", "BARRO",
    "LLUVIA", "NIEVE", "GRANIZO", "TORMENTA", "TRUENO", "RELÁMPAGO", "NIEBLA", "ROCÍO", "HIELO", "ESCARCHA",
    "ÁRBOL", "FLOR", "HOJA", "RAMA", "RAÍZ", "MUSGO", "HONGO", "SEMILLA", "PÉTALO", "JUNCAL",
  ],
  nombres: [
    "ANA", "LUZ", "LEO", "JUAN", "SOFÍA", "MARTINA", "TOMÁS", "CARLOS", "ELENA", "JULIÁN",
    "MARÍA", "PEDRO", "LUCÍA", "DIEGO", "CAMILA", "MATEO", "VALENTINA", "SANTIAGO", "EMILIA", "NICOLÁS",
    "PAULA", "PABLO", "LAURA", "MARCOS", "DANIELA", "GABRIELA", "FEDERICO", "AGUSTINA", "SEBASTIÁN", "VICTORIA",
    "FLORENCIA", "FRANCO", "ROMINA", "BRUNO", "JULIETA", "FACUNDO", "ROCÍO", "IGNACIO", "MALENA", "SIMÓN",
    "NOELIA", "RENZO", "CATALINA", "BENJAMÍN", "MICAELA", "JOAQUÍN", "MILAGROS", "BAUTISTA", "ABRIL", "ALMA",
  ],
};
const clavesBancosPalabrasVersus = Object.fromEntries(
  Object.entries(bancosPalabrasVersus).map(([tematica, palabras]) => [
    tematica,
    new Set(palabras.map((palabra) => VersusEngine.obtenerClavePalabra(palabra))),
  ]),
);
const nombresTematicasVersus = {
  paises: "Países",
  frutas: "Frutas",
  animales: "Animales",
  comidas: "Comidas",
  profesiones: "Profesiones",
  deportes: "Deportes",
  transportes: "Transportes",
  objetos: "Objetos",
  naturaleza: "Naturaleza",
  nombres: "Nombres",
};
const arenasVersus = [
  { src: "assets/images/fondos/desierto-1.png", alt: "Ruinas antiguas de combate" },
  { src: "assets/images/fondos/bosque-1.png", alt: "Sendero del bosque encantado" },
  { src: "assets/images/fondos/bosque-6.png", alt: "Bosque misterioso de combate" },
];
const duracionPartidaVersus = VersusEngine.CONFIG.duracionSegundos;
const maximoPalabrasVersus = VersusEngine.CONFIG.maximoPalabras;
const vidasInicialesVersus = VersusEngine.CONFIG.vidasIniciales;
const minimoLetrasPalabraVersus = 3;
const maximoLetrasPalabraVersus = 12;
const maximoErroresVersus = 6;
const intervaloJugadaRivalVersus = 3000;
const probabilidadAciertoRivalVersus = 0.56;
const duracionEntradaDueloVersus = 3200;
const srcExploradorBaseVersus = "assets/images/personajes/versus/explorador-base.png";
const srcExploradorLupaVersus = "assets/images/personajes/versus/explorador-lupa.png";
const srcExploradorPreparaBumeran = "assets/images/personajes/versus/explorador-bumeran-preparacion.png";
const srcExploradorLanzaBumeran = "assets/images/personajes/versus/explorador-bumeran-lanzamiento.png";
const srcMagoBaseVersus = "assets/images/personajes/versus/mago-base.png";
const srcMagoAtaqueVersus = "assets/images/personajes/versus/mago-ataque.png";
const srcGuardianaBaseVersus = "assets/images/personajes/coleccion/guardiana-bosque-base.png";
const srcGuardianaAtaqueVersus = "assets/images/personajes/coleccion/guardiana-bosque-ataque-raices.png";
const srcDragonBaseVersus = "assets/images/personajes/versus/dragon-base.png";
const srcDragonAtaqueVersus = "assets/images/personajes/versus/dragon-ataque.png";
const srcHombreLoboBaseVersus = "assets/images/personajes/versus/hombre-lobo-base.png";
const srcHombreLoboZarpazoVersus = "assets/images/personajes/versus/hombre-lobo-zarpazo.png";
const srcHombreLoboSaltoVersus = "assets/images/personajes/versus/hombre-lobo-salto-lunar.png";
const srcHombreLoboImpactoVersus = "assets/images/personajes/versus/hombre-lobo-impacto-v2.png";
const srcShadowBaseVersus = "assets/images/personajes/versus/t-shadow-base.png";
const srcShadowAtaqueVersus = "assets/images/personajes/versus/t-shadow-ataque.png";
const srcShadowImpactoVersus = "assets/images/personajes/versus/t-shadow-impacto.png";
const srcShadowVictoriaVersus = "assets/images/personajes/versus/t-shadow-victoria.png";
const srcGuardianAlbaBaseVersus = "assets/images/personajes/versus/guardian-alba-base.png";
const srcGuardianAlbaAtaqueVersus = "assets/images/personajes/versus/guardian-alba-ataque.png";
const srcGuardianAlbaHabilidadVersus = "assets/images/personajes/versus/guardian-alba-habilidad.png";
const srcGuardianAlbaImpactoVersus = "assets/images/personajes/versus/guardian-alba-impacto.png";
const srcGuardianAlbaFinalCargaVersus = "assets/images/personajes/versus/guardian-alba-final-carga.png";
const srcGuardianAlbaVictoriaVersus = "assets/images/personajes/versus/guardian-alba-victoria.png";
const srcDragonHieloBaseVersus = "assets/images/personajes/versus/dragon-hielo-base.png";
const srcDragonHieloAtaqueVersus = "assets/images/personajes/versus/dragon-hielo-ataque-v2.png";
const srcDragonHieloVueloVersus = "assets/images/personajes/versus/dragon-hielo-vuelo.png";
const srcDragonHieloAleteoAltoVersus = "assets/images/personajes/versus/dragon-hielo-aleteo-alto.png";
const srcDragonHieloAleteoBajoVersus = "assets/images/personajes/versus/dragon-hielo-aleteo-bajo.png";
const srcDragonHieloDescensoAltoVersus = "assets/images/personajes/versus/dragon-hielo-descenso-alto.png";
const srcDragonHieloDescensoBajoVersus = "assets/images/personajes/versus/dragon-hielo-descenso-bajo.png";
const srcDragonHieloImpactoVersus = "assets/images/personajes/versus/dragon-hielo-impacto.png";
const srcAzrakBaseVersus = "assets/images/personajes/versus/azrak-base.png";
const srcAzrakAtaqueVersus = "assets/images/personajes/versus/azrak-ataque.png";
const srcAzrakImpactoVersus = "assets/images/personajes/versus/azrak-impacto.png";
const personajesVersus = {
  explorador: {
    nombre: "Explorador",
    base: srcExploradorBaseVersus,
    ataque: "bumeran",
    final: "trampa-selvatica",
  },
  mago: {
    nombre: "Mago",
    base: srcMagoBaseVersus,
    ataque: "magia",
    final: "eclipse-violeta",
  },
  guardiana: {
    nombre: "Guardiana",
    base: srcGuardianaBaseVersus,
    ataque: "raices",
    final: "prision-esmeralda",
  },
  dragon: {
    nombre: "Dragón",
    base: srcDragonBaseVersus,
    ataque: "rugido-dragon",
    final: "llamado-matriarca",
  },
  hombre_lobo: {
    nombre: "Hombre Lobo",
    base: srcHombreLoboBaseVersus,
    ataque: "zarpazo-feral",
    final: "caceria-luna-llena",
  },
  t_shadow: {
    nombre: "T. Shadow",
    base: srcShadowBaseVersus,
    ataque: "corte-sombrio",
    final: "legion-umbria",
  },
  guardian_alba: {
    nombre: "A. Lumen",
    base: srcGuardianAlbaBaseVersus,
    ataque: "corte-solar",
    final: "juicio-amanecer",
  },
  dragon_hielo: {
    nombre: "Nivor",
    base: srcDragonHieloBaseVersus,
    ataque: "aliento-glacial",
    final: "cero-absoluto",
  },
  azrak: {
    nombre: "Azrak",
    base: srcAzrakBaseVersus,
    ataque: "corte-infernal",
    final: "eclipse-infernal",
  },
};
const habilidadesVersus = Object.freeze({
  explorador: { nombre: "Lupa", icono: "🔍", efecto: "hint", duracion: 0 },
  guardiana: { nombre: "Enredo de raíces", icono: "🌿", efecto: "roots", duracion: 5000 },
  dragon: { nombre: "Rugido", icono: "🐉", efecto: "roar", duracion: 5000 },
  mago: { nombre: "Caos arcano", icono: "🔮", efecto: "shuffle", duracion: 5000 },
  hombre_lobo: { nombre: "Inversión lunar", icono: "🌕", efecto: "invert", duracion: 5000 },
  t_shadow: { nombre: "Vacío devorador", icono: "🌑", efecto: "black_hole", duracion: 5000 },
  guardian_alba: { nombre: "Ruptura celeste", icono: "☀️", efecto: "key_bounce", duracion: 5000 },
  dragon_hielo: { nombre: "Invierno absoluto", icono: "❄️", efecto: "ice_screen", duracion: 5000 },
  azrak: { nombre: "Calavera Ígnea", icono: "💀", efecto: "forced_miss", duracion: 0 },
});
const letrasParaHabilidadVersus = VersusEngine.CONFIG.letrasParaHabilidad;
let personajeJugadorVersus = "explorador";
let personajeRivalVersus = "mago";

const victimasFaucesVersus = {
  explorador: {
    nombre: "Explorador",
    imagen: srcExploradorBaseVersus,
    imagenAtrapado: "assets/images/personajes/versus/carnivora-devorando-explorador.png",
  },
  mago: {
    nombre: "Mago",
    imagen: srcMagoBaseVersus,
    imagenAtrapado: "assets/images/personajes/versus/carnivora-devorando.png",
  },
  guardiana: {
    nombre: "Guardiana",
    imagen: srcGuardianaBaseVersus,
    imagenAtrapado: "assets/images/personajes/versus/carnivora-devorando-guardiana.png",
  },
  dragon: {
    nombre: "Dragón",
    imagen: srcDragonBaseVersus,
    imagenAtrapado: "assets/images/personajes/versus/carnivora-devorando-dragon.png",
  },
  hombre_lobo: {
    nombre: "Hombre Lobo",
    imagen: srcHombreLoboBaseVersus,
    imagenAtrapado: "assets/images/personajes/versus/carnivora-devorando-hombre-lobo-v2.png",
  },
  t_shadow: {
    nombre: "T. Shadow",
    imagen: srcShadowBaseVersus,
    imagenAtrapado: "assets/images/personajes/versus/carnivora-devorando-t-shadow.png",
  },
  guardian_alba: {
    nombre: "A. Lumen",
    imagen: srcGuardianAlbaBaseVersus,
    imagenAtrapado: "assets/images/personajes/versus/carnivora-devorando-guardian-alba.png",
  },
  dragon_hielo: {
    nombre: "Nivor",
    imagen: srcDragonHieloBaseVersus,
    imagenAtrapado: "assets/images/personajes/versus/carnivora-devorando-dragon-hielo.png",
  },
  azrak: {
    nombre: "Azrak",
    imagen: srcAzrakBaseVersus,
    imagenAtrapado: "assets/images/personajes/versus/carnivora-devorando-azrak.png",
  },
};

const posesDanoPersonajeVersus = {
  hombre_lobo: srcHombreLoboImpactoVersus,
  t_shadow: srcShadowImpactoVersus,
  guardian_alba: srcGuardianAlbaImpactoVersus,
  dragon_hielo: srcDragonHieloImpactoVersus,
  azrak: srcAzrakImpactoVersus,
};

function observarPoseDanoPersonajeVersus(elemento, obtenerPersonaje) {
  new MutationObserver(() => {
    const personaje = obtenerPersonaje();
    const pose = posesDanoPersonajeVersus[personaje];
    if (!pose) return;
    const recibiendoDano = elemento.classList.contains("recibiendo-dano")
      || elemento.classList.contains("recibiendo-dano-magico");
    if (recibiendoDano) {
      elemento.src = pose;
    } else if (elemento.src.endsWith(pose)) {
      elemento.src = personajesVersus[personaje].base;
    }
  }).observe(elemento, { attributes: true, attributeFilter: ["class"] });
}

observarPoseDanoPersonajeVersus(personajeVersusUno, () => personajeJugadorVersus);
observarPoseDanoPersonajeVersus(personajeVersusDos, () => personajeRivalVersus);

const demoVersus = {
  tematicaParaJugador: "frutas",
  tematicaParaRival: "paises",
  palabrasJugador: [],
  palabrasRival: [],
  indiceJugador: 0,
  indiceRival: 0,
  letrasJugador: new Set(),
  letrasRival: new Set(),
  erroresJugador: 0,
  erroresRival: 0,
  vidasJugador: vidasInicialesVersus,
  vidasRival: vidasInicialesVersus,
  cargaHabilidadJugador: 0,
  cargaHabilidadRival: 0,
  pistaLupaJugador: "",
  pistaLupaRival: "",
  efectoRivalHasta: 0,
  efectoRival: "",
  firmaEfectoHabilidad: "",
  temporizadorEfectoHabilidad: null,
  intervaloCaosHabilidad: null,
  temporizadoresHabilidad: [],
  tiempoJugador: duracionPartidaVersus,
  tiempoRival: duracionPartidaVersus,
  finalizadoJugador: false,
  finalizadoRival: false,
  motivoFinalJugador: "",
  motivoFinalRival: "",
  intervaloTiempo: null,
  intervaloRival: null,
  temporizadorAviso: null,
  temporizadorAnuncioFin: null,
  resolverAnuncioFin: null,
  temporizadorRevelacionJugador: null,
  temporizadorRevelacionRival: null,
  temporizadoresAtaqueJugador: [],
  temporizadoresAtaqueRival: [],
  temporizadorCinematica: null,
  temporizadorReaccionCinematica: null,
  resolverCinematica: null,
  temporizadoresEntrada: [],
  entradaActiva: false,
  partidaFinalizada: false,
};

function programarPasoAtaqueVersus(accion, demora, atacante) {
  const temporizador = setTimeout(accion, demora);
  const grupo = atacante === "rival"
    ? demoVersus.temporizadoresAtaqueRival
    : demoVersus.temporizadoresAtaqueJugador;
  grupo.push(temporizador);
}

function mostrarPoseDanoPersonajeVersus(elemento, personaje) {
  const pose = posesDanoPersonajeVersus[personaje];
  if (pose) elemento.src = pose;
}

function restaurarPoseBasePersonajeVersus(elemento, personaje) {
  if (personajesVersus[personaje]) elemento.src = personajesVersus[personaje].base;
}

function limpiarAnimacionAtaqueJugadorVersus() {
  demoVersus.temporizadoresAtaqueJugador.forEach(clearTimeout);
  demoVersus.temporizadoresAtaqueJugador = [];
  personajeVersusUno.src = personajesVersus[personajeJugadorVersus].base;
  restaurarPoseBasePersonajeVersus(personajeVersusDos, personajeRivalVersus);
  personajeVersusUno.classList.remove(
    "preparando-bumeran",
    "lanzando-bumeran",
    "concentrando-hechizo",
    "lanzando-hechizo",
    "lanzando-viento",
    "rugiendo-dragon",
    "zarpando-lobo",
    "cortando-shadow",
    "lanzando-lumen",
    "lanzando-hielo",
    "cortando-infernal",
  );
  personajeVersusDos.classList.remove("recibiendo-dano");
  vidasVersusDos.classList.remove("recibiendo-dano");
  bumeranVersus.classList.remove("volando");
  proyectilMagoJugadorVersus.classList.remove("volando");
  proyectilGuardianaVersus.classList.remove("volando");
  rugidoDragonVersus.classList.remove("volando");
  zarpazoLoboVersus.classList.remove("volando", "desde-rival");
  corteShadowVersus.classList.remove("volando", "desde-rival");
  corteLumenVersus.classList.remove("volando", "desde-rival");
  alientoHieloVersus.classList.remove("volando", "desde-rival");
  corteInfernalVersus.classList.remove("volando", "desde-rival");
  herramientasPruebasVersus.classList.remove("ataque-en-curso");
}

function limpiarAnimacionAtaqueRivalVersus() {
  demoVersus.temporizadoresAtaqueRival.forEach(clearTimeout);
  demoVersus.temporizadoresAtaqueRival = [];
  personajeVersusDos.src = personajesVersus[personajeRivalVersus]?.base || srcMagoBaseVersus;
  restaurarPoseBasePersonajeVersus(personajeVersusUno, personajeJugadorVersus);
  personajeVersusDos.classList.remove(
    "preparando-bumeran",
    "lanzando-bumeran",
    "concentrando-hechizo",
    "lanzando-hechizo",
    "lanzando-viento",
    "rugiendo-dragon",
    "zarpando-lobo",
    "cortando-shadow",
    "lanzando-lumen",
    "lanzando-hielo",
    "cortando-infernal",
  );
  personajeVersusUno.classList.remove("recibiendo-dano-magico");
  vidasVersusUno.classList.remove("recibiendo-dano");
  proyectilMagoVersus.classList.remove("volando");
  bumeranVersus.classList.remove("volando", "desde-rival");
  proyectilGuardianaVersus.classList.remove("volando", "desde-rival");
  rugidoDragonVersus.classList.remove("volando", "desde-rival");
  zarpazoLoboVersus.classList.remove("volando", "desde-rival");
  corteShadowVersus.classList.remove("volando", "desde-rival");
  corteLumenVersus.classList.remove("volando", "desde-rival");
  alientoHieloVersus.classList.remove("volando", "desde-rival");
  corteInfernalVersus.classList.remove("volando", "desde-rival");
}

function limpiarAnimacionAtaqueVersus() {
  limpiarAnimacionAtaqueJugadorVersus();
  limpiarAnimacionAtaqueRivalVersus();
}

function configurarPersonajesCombateVersus() {
  const personaje = personajesVersus[personajeJugadorVersus];
  personajeVersusUno.src = personaje.base;
  personajeVersusUno.alt = `${personaje.nombre} del jugador 1`;
  personajeVersusUno.classList.remove(
    "personaje-explorador",
    "personaje-mago",
    "personaje-guardiana",
    "personaje-dragon",
    "personaje-hombre_lobo",
    "personaje-t_shadow",
    "personaje-guardian_alba",
    "personaje-dragon_hielo",
    "personaje-azrak",
  );
  personajeVersusUno.classList.add(`personaje-${personajeJugadorVersus}`);
  const personajeRival = personajesVersus[personajeRivalVersus] || personajesVersus.mago;
  personajeVersusDos.src = personajeRival.base;
  personajeVersusDos.alt = `${personajeRival.nombre} del jugador 2`;
  personajeVersusDos.classList.remove(
    "personaje-explorador",
    "personaje-mago",
    "personaje-guardiana",
    "personaje-dragon",
    "personaje-hombre_lobo",
    "personaje-t_shadow",
    "personaje-guardian_alba",
    "personaje-dragon_hielo",
    "personaje-azrak",
  );
  personajeVersusDos.classList.add(`personaje-${personajeRivalVersus}`);
  actualizarPanelHabilidadVersus(
    adaptadorSalasVersus.proveedor === "supabase"
      ? (partidaOnlineVersus?.me?.abilityCharge || 0)
      : demoVersus.cargaHabilidadJugador,
    adaptadorSalasVersus.proveedor === "supabase"
      ? (partidaOnlineVersus?.me?.abilityHint || "")
      : demoVersus.pistaLupaJugador,
  );
}

function programarPasoEntradaVersus(accion, demora) {
  const temporizador = setTimeout(accion, demora);
  demoVersus.temporizadoresEntrada.push(temporizador);
}

function programarAleteoEntradaNivor(elemento) {
  const cuadros = [
    srcDragonHieloDescensoAltoVersus,
    srcDragonHieloDescensoBajoVersus,
  ];
  elemento.src = cuadros[0];
  for (let paso = 1; paso <= 13; paso += 1) {
    programarPasoEntradaVersus(() => {
      elemento.src = cuadros[paso % cuadros.length];
    }, paso * 210);
  }
}

function limpiarEntradaDueloVersus() {
  demoVersus.temporizadoresEntrada.forEach(clearTimeout);
  demoVersus.temporizadoresEntrada = [];
  demoVersus.entradaActiva = false;
  marcoVersus.classList.remove("duelo-en-introduccion");
  entradaDueloVersus.className = "entrada-duelo-versus oculto";
  personajeVersusUno.classList.remove(
    "entrando-duelo",
    "entrada-explorador",
    "entrada-mago",
    "entrada-guardiana",
    "entrada-dragon",
    "entrada-hombre_lobo",
    "entrada-t_shadow",
    "entrada-guardian_alba",
    "entrada-dragon_hielo",
    "entrada-azrak",
  );
  personajeVersusDos.classList.remove(
    "entrando-duelo",
    "entrada-explorador-rival",
    "entrada-mago-rival",
    "entrada-guardiana-rival",
    "entrada-dragon-rival",
    "entrada-hombre_lobo-rival",
    "entrada-t_shadow-rival",
    "entrada-guardian_alba-rival",
    "entrada-dragon_hielo-rival",
    "entrada-azrak-rival",
  );
  bumeranVersus.classList.remove("mostrando-entrada");
}

function comenzarRondaVersus() {
  mostrarEstadoProgresoVersus(
    document.getElementById("estadoProgresoUno"),
    "Elegí una letra",
  );
  if (adaptadorSalasVersus.proveedor === "supabase" && partidaOnlineVersus) {
    mostrarEstadoProgresoVersus(document.getElementById("estadoProgresoDos"), "Rival conectado");
    actualizarTecladoPartidaOnline(partidaOnlineVersus);
    demoVersus.intervaloTiempo = setInterval(actualizarRelojPartidaOnline, 1000);
    return;
  }
  mostrarEstadoProgresoVersus(document.getElementById("estadoProgresoDos"), "Pensando...");
  habilitarTecladoVersus();
  demoVersus.intervaloTiempo = setInterval(actualizarRelojesVersus, 1000);
  demoVersus.intervaloRival = setInterval(
    jugarTurnoRivalVersus,
    modoPruebasActivo ? intervaloJugadaRivalVersus * 4 : intervaloJugadaRivalVersus,
  );
}

async function jugarLetraVersus(letra, boton) {
  if (adaptadorSalasVersus.proveedor !== "supabase") {
    jugarLetraDemoVersus(letra, boton);
    return;
  }
  if (boton.disabled || jugadaOnlineEnCurso || !partidaOnlineVersus) return;
  jugadaOnlineEnCurso = true;
  actualizarTecladoPartidaOnline(partidaOnlineVersus);
  try {
    await adaptadorSalasVersus.jugarLetra(letra);
  } catch (error) {
    mostrarEstadoProgresoVersus(
      document.getElementById("estadoProgresoUno"),
      error.message || "No pudimos enviar la letra.",
      "error",
    );
  } finally {
    jugadaOnlineEnCurso = false;
    if (partidaOnlineVersus) actualizarTecladoPartidaOnline(partidaOnlineVersus);
  }
}

function finalizarEntradaDueloVersus() {
  if (!demoVersus.entradaActiva) return;
  const anuncioDueloMostrado = entradaDueloVersus.classList.contains("mostrando-duelo");
  limpiarEntradaDueloVersus();
  configurarPersonajesCombateVersus();
  if (!anuncioDueloMostrado) reproducirSonidoVersus("versusFight", 0.78);
  comenzarRondaVersus();
}

function iniciarEntradaDueloVersus() {
  if (demoVersus.partidaFinalizada || demoVersus.entradaActiva) return;

  const movimientoReducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const duracion = movimientoReducido ? 450 : duracionEntradaDueloVersus;
  demoVersus.entradaActiva = true;
  bloquearTecladoDemoVersus();
  marcoVersus.classList.add("duelo-en-introduccion");
  entradaDueloVersus.className = [
    "entrada-duelo-versus",
    `entrada-jugador-${personajeJugadorVersus}`,
    `entrada-rival-${personajeRivalVersus}`,
  ].join(" ");
  personajeVersusUno.classList.add("entrando-duelo", `entrada-${personajeJugadorVersus}`);
  personajeVersusDos.classList.add(
    "entrando-duelo",
    `entrada-${personajeRivalVersus}-rival`,
  );
  mostrarEstadoProgresoVersus(
    document.getElementById("estadoProgresoUno"),
    "Preparándose...",
  );
  mostrarEstadoProgresoVersus(
    document.getElementById("estadoProgresoDos"),
    "Preparándose...",
  );

  if (!movimientoReducido && personajeJugadorVersus === "explorador") {
    programarPasoEntradaVersus(() => {
      personajeVersusUno.src = srcExploradorPreparaBumeran;
      bumeranVersus.classList.add("mostrando-entrada");
    }, 1280);
    programarPasoEntradaVersus(() => {
      personajeVersusUno.src = srcExploradorBaseVersus;
      bumeranVersus.classList.remove("mostrando-entrada");
    }, 2180);
  }
  if (!movimientoReducido && personajeJugadorVersus === "dragon_hielo") {
    programarAleteoEntradaNivor(personajeVersusUno);
    programarPasoEntradaVersus(() => { personajeVersusUno.src = srcDragonHieloBaseVersus; }, 3180);
  }
  if (!movimientoReducido && personajeRivalVersus === "dragon_hielo") {
    programarAleteoEntradaNivor(personajeVersusDos);
    programarPasoEntradaVersus(() => { personajeVersusDos.src = srcDragonHieloBaseVersus; }, 3180);
  }

  programarPasoEntradaVersus(() => {
    entradaDueloVersus.classList.add("mostrando-duelo");
    reproducirSonidoVersus("versusFight", 0.78);
  }, movimientoReducido ? 80 : 2250);
  programarPasoEntradaVersus(finalizarEntradaDueloVersus, duracion);
}

function reproducirAtaqueBumeranVersus() {
  limpiarAnimacionAtaqueJugadorVersus();
  herramientasPruebasVersus.classList.add("ataque-en-curso");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    reproducirSonidoVersus("versusAtaqueUno", 0.72);
    programarPasoAtaqueVersus(() => {
      reproducirSonidoVersus("versusAtaqueDos", 0.76);
    }, 110, "jugador");
    personajeVersusDos.classList.add("recibiendo-dano");
    programarPasoAtaqueVersus(() => {
      personajeVersusDos.classList.remove("recibiendo-dano");
    }, 220, "jugador");
    programarPasoAtaqueVersus(limpiarAnimacionAtaqueJugadorVersus, 280, "jugador");
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
    reproducirSonidoVersus("versusAtaqueUno", 0.72);
  }, 260, "jugador");

  programarPasoAtaqueVersus(() => {
    personajeVersusDos.classList.add("recibiendo-dano");
    vidasVersusDos.classList.add("recibiendo-dano");
    reproducirSonidoVersus("versusAtaqueDos", 0.78);
  }, 760, "jugador");

  programarPasoAtaqueVersus(() => {
    personajeVersusDos.classList.remove("recibiendo-dano");
    vidasVersusDos.classList.remove("recibiendo-dano");
  }, 1110, "jugador");

  programarPasoAtaqueVersus(limpiarAnimacionAtaqueJugadorVersus, 1510, "jugador");
}

function reproducirAtaqueMagoJugadorVersus() {
  limpiarAnimacionAtaqueJugadorVersus();
  herramientasPruebasVersus.classList.add("ataque-en-curso");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    reproducirSonidoVersus("versusAtaqueUno", 0.72);
    programarPasoAtaqueVersus(() => {
      reproducirSonidoVersus("versusAtaqueDos", 0.76);
    }, 110, "jugador");
    personajeVersusDos.classList.add("recibiendo-dano");
    programarPasoAtaqueVersus(() => {
      personajeVersusDos.classList.remove("recibiendo-dano");
    }, 220, "jugador");
    programarPasoAtaqueVersus(limpiarAnimacionAtaqueJugadorVersus, 280, "jugador");
    return;
  }

  personajeVersusUno.classList.add("concentrando-hechizo");
  programarPasoAtaqueVersus(() => {
    personajeVersusUno.src = srcMagoAtaqueVersus;
    personajeVersusUno.classList.remove("concentrando-hechizo");
    personajeVersusUno.classList.add("lanzando-hechizo");
    void proyectilMagoJugadorVersus.offsetWidth;
    proyectilMagoJugadorVersus.classList.add("volando");
    reproducirSonidoVersus("versusAtaqueUno", 0.72);
  }, 220, "jugador");

  programarPasoAtaqueVersus(() => {
    personajeVersusDos.classList.add("recibiendo-dano");
    vidasVersusDos.classList.add("recibiendo-dano");
    reproducirSonidoVersus("versusAtaqueDos", 0.78);
  }, 760, "jugador");

  programarPasoAtaqueVersus(() => {
    personajeVersusDos.classList.remove("recibiendo-dano");
    vidasVersusDos.classList.remove("recibiendo-dano");
  }, 1080, "jugador");

  programarPasoAtaqueVersus(limpiarAnimacionAtaqueJugadorVersus, 1300, "jugador");
}

function reproducirAtaqueGuardianaVersus() {
  limpiarAnimacionAtaqueJugadorVersus();
  herramientasPruebasVersus.classList.add("ataque-en-curso");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    reproducirSonidoVersus("versusAtaqueUno", 0.72);
    programarPasoAtaqueVersus(() => {
      reproducirSonidoVersus("versusAtaqueDos", 0.76);
    }, 110, "jugador");
    personajeVersusDos.classList.add("recibiendo-dano");
    programarPasoAtaqueVersus(() => {
      personajeVersusDos.classList.remove("recibiendo-dano");
    }, 220, "jugador");
    programarPasoAtaqueVersus(limpiarAnimacionAtaqueJugadorVersus, 280, "jugador");
    return;
  }

  personajeVersusUno.src = srcGuardianaAtaqueVersus;
  personajeVersusUno.classList.add("lanzando-viento");
  void proyectilGuardianaVersus.offsetWidth;
  proyectilGuardianaVersus.classList.add("volando");
  reproducirSonidoVersus("versusAtaqueUno", 0.72);

  programarPasoAtaqueVersus(() => {
    personajeVersusDos.classList.add("recibiendo-dano");
    vidasVersusDos.classList.add("recibiendo-dano");
    reproducirSonidoVersus("versusAtaqueDos", 0.78);
  }, 610, "jugador");

  programarPasoAtaqueVersus(() => {
    personajeVersusDos.classList.remove("recibiendo-dano");
    vidasVersusDos.classList.remove("recibiendo-dano");
  }, 1160, "jugador");

  programarPasoAtaqueVersus(limpiarAnimacionAtaqueJugadorVersus, 1380, "jugador");
}

function reproducirAtaqueDragonVersus() {
  limpiarAnimacionAtaqueJugadorVersus();
  herramientasPruebasVersus.classList.add("ataque-en-curso");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    reproducirSonidoVersus("versusAtaqueUno", 0.68);
    personajeVersusDos.classList.add("recibiendo-dano");
    programarPasoAtaqueVersus(() => {
      personajeVersusDos.classList.remove("recibiendo-dano");
    }, 220, "jugador");
    programarPasoAtaqueVersus(limpiarAnimacionAtaqueJugadorVersus, 280, "jugador");
    return;
  }

  personajeVersusUno.src = srcDragonAtaqueVersus;
  personajeVersusUno.classList.add("rugiendo-dragon");

  programarPasoAtaqueVersus(() => {
    void rugidoDragonVersus.offsetWidth;
    rugidoDragonVersus.classList.add("volando");
    reproducirSonidoVersus("versusAtaqueUno", 0.7);
  }, 180, "jugador");

  programarPasoAtaqueVersus(() => {
    personajeVersusDos.classList.add("recibiendo-dano");
    vidasVersusDos.classList.add("recibiendo-dano");
    reproducirSonidoVersus("versusAtaqueDos", 0.82);
  }, 660, "jugador");

  programarPasoAtaqueVersus(() => {
    personajeVersusDos.classList.remove("recibiendo-dano");
    vidasVersusDos.classList.remove("recibiendo-dano");
  }, 1010, "jugador");

  programarPasoAtaqueVersus(limpiarAnimacionAtaqueJugadorVersus, 1320, "jugador");
}

function reproducirAtaqueHombreLoboVersus() {
  limpiarAnimacionAtaqueJugadorVersus();
  herramientasPruebasVersus.classList.add("ataque-en-curso");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    reproducirSonidoVersus("versusAtaqueUno", 0.76);
    personajeVersusDos.classList.add("recibiendo-dano");
    programarPasoAtaqueVersus(limpiarAnimacionAtaqueJugadorVersus, 280, "jugador");
    return;
  }

  personajeVersusUno.src = srcHombreLoboZarpazoVersus;
  personajeVersusUno.classList.add("zarpando-lobo");
  zarpazoLoboVersus.classList.remove("desde-rival");
  void zarpazoLoboVersus.offsetWidth;
  zarpazoLoboVersus.classList.add("volando");
  reproducirSonidoVersus("versusAtaqueUno", 0.78);

  programarPasoAtaqueVersus(() => {
    personajeVersusDos.classList.add("recibiendo-dano");
    vidasVersusDos.classList.add("recibiendo-dano");
    reproducirSonidoVersus("versusAtaqueDos", 0.84);
  }, 610, "jugador");
  programarPasoAtaqueVersus(() => {
    personajeVersusDos.classList.remove("recibiendo-dano");
    vidasVersusDos.classList.remove("recibiendo-dano");
  }, 990, "jugador");
  programarPasoAtaqueVersus(limpiarAnimacionAtaqueJugadorVersus, 1420, "jugador");
}

function reproducirAtaqueDragonHieloVersus() {
  limpiarAnimacionAtaqueJugadorVersus();
  herramientasPruebasVersus.classList.add("ataque-en-curso");
  personajeVersusUno.src = srcDragonHieloAtaqueVersus;
  personajeVersusUno.classList.add("lanzando-hielo");
  alientoHieloVersus.classList.remove("desde-rival");
  void alientoHieloVersus.offsetWidth;
  alientoHieloVersus.classList.add("volando");
  reproducirSonidoVersus("versusAtaqueUno", 0.74);
  programarPasoAtaqueVersus(() => {
    personajeVersusDos.classList.add("recibiendo-dano-magico");
    vidasVersusDos.classList.add("recibiendo-dano");
    reproducirSonidoVersus("versusAtaqueDos", 0.82);
  }, 810, "jugador");
  programarPasoAtaqueVersus(() => {
    personajeVersusDos.classList.remove("recibiendo-dano-magico");
    vidasVersusDos.classList.remove("recibiendo-dano");
  }, 1200, "jugador");
  programarPasoAtaqueVersus(limpiarAnimacionAtaqueJugadorVersus, 1450, "jugador");
}

function reproducirAtaqueAzrakVersus() {
  limpiarAnimacionAtaqueJugadorVersus();
  herramientasPruebasVersus.classList.add("ataque-en-curso");
  personajeVersusUno.src = srcAzrakAtaqueVersus;
  personajeVersusUno.classList.add("cortando-infernal");
  corteInfernalVersus.classList.remove("desde-rival");
  void corteInfernalVersus.offsetWidth;
  corteInfernalVersus.classList.add("volando");
  reproducirSonidoVersus("versusAtaqueUno", 0.8);
  programarPasoAtaqueVersus(() => {
    mostrarPoseDanoPersonajeVersus(personajeVersusDos, personajeRivalVersus);
    personajeVersusDos.classList.add("recibiendo-dano-magico");
    vidasVersusDos.classList.add("recibiendo-dano");
    reproducirSonidoVersus("versusAtaqueDos", 0.86);
  }, 570, "jugador");
  programarPasoAtaqueVersus(() => {
    personajeVersusDos.classList.remove("recibiendo-dano-magico");
    vidasVersusDos.classList.remove("recibiendo-dano");
  }, 950, "jugador");
  programarPasoAtaqueVersus(limpiarAnimacionAtaqueJugadorVersus, 1320, "jugador");
}

function reproducirAtaqueShadowVersus() {
  limpiarAnimacionAtaqueJugadorVersus();
  herramientasPruebasVersus.classList.add("ataque-en-curso");
  personajeVersusUno.src = srcShadowAtaqueVersus;
  personajeVersusUno.classList.add("cortando-shadow");
  corteShadowVersus.classList.remove("desde-rival");
  void corteShadowVersus.offsetWidth;
  corteShadowVersus.classList.add("volando");
  reproducirSonidoVersus("versusAtaqueUno", 0.78);
  programarPasoAtaqueVersus(() => {
    personajeVersusDos.classList.add("recibiendo-dano");
    vidasVersusDos.classList.add("recibiendo-dano");
    reproducirSonidoVersus("versusAtaqueDos", 0.84);
  }, 520, "jugador");
  programarPasoAtaqueVersus(() => {
    personajeVersusDos.classList.remove("recibiendo-dano");
    vidasVersusDos.classList.remove("recibiendo-dano");
  }, 900, "jugador");
  programarPasoAtaqueVersus(limpiarAnimacionAtaqueJugadorVersus, 1260, "jugador");
}

function reproducirAtaqueGuardianAlbaVersus() {
  limpiarAnimacionAtaqueJugadorVersus();
  herramientasPruebasVersus.classList.add("ataque-en-curso");
  personajeVersusUno.src = srcGuardianAlbaAtaqueVersus;
  personajeVersusUno.classList.add("lanzando-lumen");
  corteLumenVersus.classList.remove("desde-rival");
  void corteLumenVersus.offsetWidth;
  corteLumenVersus.classList.add("volando");
  reproducirSonidoVersus("versusAtaqueUno", 0.76);
  programarPasoAtaqueVersus(() => {
    personajeVersusDos.classList.add("recibiendo-dano-magico");
    vidasVersusDos.classList.add("recibiendo-dano");
    reproducirSonidoVersus("versusAtaqueDos", 0.82);
  }, 560, "jugador");
  programarPasoAtaqueVersus(() => {
    personajeVersusDos.classList.remove("recibiendo-dano-magico");
    vidasVersusDos.classList.remove("recibiendo-dano");
  }, 930, "jugador");
  programarPasoAtaqueVersus(limpiarAnimacionAtaqueJugadorVersus, 1280, "jugador");
}

function reproducirAtaqueJugadorVersus() {
  const ataque = personajesVersus[personajeJugadorVersus].ataque;
  if (ataque === "magia") {
    reproducirAtaqueMagoJugadorVersus();
    return;
  }
  if (ataque === "raices") {
    reproducirAtaqueGuardianaVersus();
    return;
  }
  if (ataque === "rugido-dragon") {
    reproducirAtaqueDragonVersus();
    return;
  }
  if (ataque === "zarpazo-feral") {
    reproducirAtaqueHombreLoboVersus();
    return;
  }
  if (ataque === "corte-sombrio") {
    reproducirAtaqueShadowVersus();
    return;
  }
  if (ataque === "corte-solar") {
    reproducirAtaqueGuardianAlbaVersus();
    return;
  }
  if (ataque === "aliento-glacial") {
    reproducirAtaqueDragonHieloVersus();
    return;
  }
  if (ataque === "corte-infernal") {
    reproducirAtaqueAzrakVersus();
    return;
  }
  reproducirAtaqueBumeranVersus();
}

function reproducirAtaqueMagoVersus() {
  limpiarAnimacionAtaqueRivalVersus();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    reproducirSonidoVersus("versusAtaqueUno", 0.72);
    programarPasoAtaqueVersus(() => {
      vibrarImpactoVersus();
      personajeVersusUno.classList.add("recibiendo-dano-magico");
      reproducirSonidoVersus("versusAtaqueDos", 0.76);
    }, 110, "rival");
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
    reproducirSonidoVersus("versusAtaqueUno", 0.72);
  }, 220, "rival");

  programarPasoAtaqueVersus(() => {
    vibrarImpactoVersus();
    personajeVersusUno.classList.add("recibiendo-dano-magico");
    vidasVersusUno.classList.add("recibiendo-dano");
    reproducirSonidoVersus("versusAtaqueDos", 0.78);
  }, 760, "rival");

  programarPasoAtaqueVersus(() => {
    personajeVersusUno.classList.remove("recibiendo-dano-magico");
    vidasVersusUno.classList.remove("recibiendo-dano");
  }, 1080, "rival");

  programarPasoAtaqueVersus(limpiarAnimacionAtaqueRivalVersus, 1260, "rival");
}

function reproducirAtaqueExploradorRivalVersus() {
  limpiarAnimacionAtaqueRivalVersus();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    reproducirImpactoRivalReducidoVersus();
    return;
  }

  personajeVersusDos.src = srcExploradorPreparaBumeran;
  personajeVersusDos.classList.add("preparando-bumeran");
  bumeranVersus.classList.add("desde-rival");
  programarPasoAtaqueVersus(() => {
    personajeVersusDos.src = srcExploradorLanzaBumeran;
    personajeVersusDos.classList.remove("preparando-bumeran");
    personajeVersusDos.classList.add("lanzando-bumeran");
    void bumeranVersus.offsetWidth;
    bumeranVersus.classList.add("volando");
    reproducirSonidoVersus("versusAtaqueUno", 0.72);
  }, 260, "rival");
  programarImpactoRivalVersus(760, 1510);
}

function reproducirAtaqueGuardianaRivalVersus() {
  limpiarAnimacionAtaqueRivalVersus();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    reproducirImpactoRivalReducidoVersus();
    return;
  }

  personajeVersusDos.src = srcGuardianaAtaqueVersus;
  personajeVersusDos.classList.add("lanzando-viento");
  proyectilGuardianaVersus.classList.add("desde-rival");
  void proyectilGuardianaVersus.offsetWidth;
  proyectilGuardianaVersus.classList.add("volando");
  reproducirSonidoVersus("versusAtaqueUno", 0.72);
  programarImpactoRivalVersus(610, 1380);
}

function reproducirAtaqueDragonRivalVersus() {
  limpiarAnimacionAtaqueRivalVersus();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    reproducirImpactoRivalReducidoVersus();
    return;
  }

  personajeVersusDos.src = srcDragonAtaqueVersus;
  personajeVersusDos.classList.add("rugiendo-dragon");
  rugidoDragonVersus.classList.add("desde-rival");
  programarPasoAtaqueVersus(() => {
    void rugidoDragonVersus.offsetWidth;
    rugidoDragonVersus.classList.add("volando");
    reproducirSonidoVersus("versusAtaqueUno", 0.7);
  }, 180, "rival");
  programarImpactoRivalVersus(660, 1320);
}

function reproducirAtaqueHombreLoboRivalVersus() {
  limpiarAnimacionAtaqueRivalVersus();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    reproducirImpactoRivalReducidoVersus();
    return;
  }
  personajeVersusDos.src = srcHombreLoboZarpazoVersus;
  personajeVersusDos.classList.add("zarpando-lobo");
  zarpazoLoboVersus.classList.add("desde-rival");
  void zarpazoLoboVersus.offsetWidth;
  zarpazoLoboVersus.classList.add("volando");
  reproducirSonidoVersus("versusAtaqueUno", 0.78);
  programarImpactoRivalVersus(610, 1420);
}

function reproducirAtaqueDragonHieloRivalVersus() {
  limpiarAnimacionAtaqueRivalVersus();
  personajeVersusDos.src = srcDragonHieloAtaqueVersus;
  personajeVersusDos.classList.add("lanzando-hielo");
  alientoHieloVersus.classList.add("desde-rival");
  void alientoHieloVersus.offsetWidth;
  alientoHieloVersus.classList.add("volando");
  reproducirSonidoVersus("versusAtaqueUno", 0.74);
  programarImpactoRivalVersus(810, 1450);
}

function reproducirAtaqueAzrakRivalVersus() {
  limpiarAnimacionAtaqueRivalVersus();
  personajeVersusDos.src = srcAzrakAtaqueVersus;
  personajeVersusDos.classList.add("cortando-infernal");
  corteInfernalVersus.classList.add("desde-rival");
  void corteInfernalVersus.offsetWidth;
  corteInfernalVersus.classList.add("volando");
  reproducirSonidoVersus("versusAtaqueUno", 0.8);
  programarImpactoRivalVersus(570, 1320);
}

function reproducirAtaqueShadowRivalVersus() {
  limpiarAnimacionAtaqueRivalVersus();
  personajeVersusDos.src = srcShadowAtaqueVersus;
  personajeVersusDos.classList.add("cortando-shadow");
  corteShadowVersus.classList.add("desde-rival");
  void corteShadowVersus.offsetWidth;
  corteShadowVersus.classList.add("volando");
  reproducirSonidoVersus("versusAtaqueUno", 0.78);
  programarImpactoRivalVersus(520, 1260);
}

function reproducirAtaqueGuardianAlbaRivalVersus() {
  limpiarAnimacionAtaqueRivalVersus();
  personajeVersusDos.src = srcGuardianAlbaAtaqueVersus;
  personajeVersusDos.classList.add("lanzando-lumen");
  corteLumenVersus.classList.add("desde-rival");
  void corteLumenVersus.offsetWidth;
  corteLumenVersus.classList.add("volando");
  reproducirSonidoVersus("versusAtaqueUno", 0.76);
  programarImpactoRivalVersus(560, 1280);
}

function reproducirImpactoRivalReducidoVersus() {
  reproducirSonidoVersus("versusAtaqueUno", 0.72);
  vibrarImpactoVersus();
  personajeVersusUno.classList.add("recibiendo-dano-magico");
  programarPasoAtaqueVersus(() => {
    personajeVersusUno.classList.remove("recibiendo-dano-magico");
    reproducirSonidoVersus("versusAtaqueDos", 0.76);
  }, 220, "rival");
  programarPasoAtaqueVersus(limpiarAnimacionAtaqueRivalVersus, 280, "rival");
}

function programarImpactoRivalVersus(demoraImpacto, demoraLimpieza) {
  programarPasoAtaqueVersus(() => {
    vibrarImpactoVersus();
    personajeVersusUno.classList.add("recibiendo-dano-magico");
    vidasVersusUno.classList.add("recibiendo-dano");
    reproducirSonidoVersus("versusAtaqueDos", 0.78);
  }, demoraImpacto, "rival");
  programarPasoAtaqueVersus(() => {
    personajeVersusUno.classList.remove("recibiendo-dano-magico");
    vidasVersusUno.classList.remove("recibiendo-dano");
  }, demoraImpacto + 350, "rival");
  programarPasoAtaqueVersus(limpiarAnimacionAtaqueRivalVersus, demoraLimpieza, "rival");
}

function reproducirAtaqueRivalVersus() {
  const ataque = personajesVersus[personajeRivalVersus]?.ataque;
  if (ataque === "bumeran") {
    reproducirAtaqueExploradorRivalVersus();
    return;
  }
  if (ataque === "raices") {
    reproducirAtaqueGuardianaRivalVersus();
    return;
  }
  if (ataque === "rugido-dragon") {
    reproducirAtaqueDragonRivalVersus();
    return;
  }
  if (ataque === "zarpazo-feral") {
    reproducirAtaqueHombreLoboRivalVersus();
    return;
  }
  if (ataque === "corte-sombrio") {
    reproducirAtaqueShadowRivalVersus();
    return;
  }
  if (ataque === "corte-solar") {
    reproducirAtaqueGuardianAlbaRivalVersus();
    return;
  }
  if (ataque === "aliento-glacial") {
    reproducirAtaqueDragonHieloRivalVersus();
    return;
  }
  if (ataque === "corte-infernal") {
    reproducirAtaqueAzrakRivalVersus();
    return;
  }
  reproducirAtaqueMagoVersus();
}

function mostrarEstadoProgresoVersus(elemento, mensaje, tipo = "") {
  elemento.textContent = mensaje;
  elemento.className = tipo;
}

function ocultarRevelacionPalabraVersus(elemento, claveTemporizador) {
  if (demoVersus[claveTemporizador]) clearTimeout(demoVersus[claveTemporizador]);
  demoVersus[claveTemporizador] = null;
  elemento.hidden = true;
  elemento.textContent = "";
}

function mostrarRevelacionPalabraVersus(elemento, palabra, tematica, claveTemporizador) {
  if (!palabra) return;
  ocultarRevelacionPalabraVersus(elemento, claveTemporizador);
  const etiqueta = document.createElement("span");
  const respuesta = document.createElement("strong");
  etiqueta.textContent = "La palabra era ";
  respuesta.textContent = palabra;
  elemento.append(
    etiqueta,
    respuesta,
    document.createTextNode(` · Tema: ${obtenerNombreTemaVersus(tematica).toLowerCase()}`),
  );
  elemento.hidden = false;
  demoVersus[claveTemporizador] = setTimeout(() => {
    elemento.hidden = true;
    elemento.textContent = "";
    demoVersus[claveTemporizador] = null;
  }, 4200);
}

function ocultarRevelacionesPalabrasVersus() {
  ocultarRevelacionPalabraVersus(
    revelacionPalabraVersusUno,
    "temporizadorRevelacionJugador",
  );
  ocultarRevelacionPalabraVersus(
    revelacionPalabraVersusDos,
    "temporizadorRevelacionRival",
  );
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
  const bloqueadoPorRaices = tecladoVersus.classList.contains("efecto-raices")
    || tecladoVersus.classList.contains("efecto-agujero-negro")
    || tecladoVersus.classList.contains("efecto-teclas-rotas")
    || tecladoVersus.classList.contains("efecto-congelado");
  tecladoVersus.querySelectorAll("button").forEach((boton) => {
    boton.disabled = bloqueadoPorRaices;
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

function prepararDueloVersus({ comenzarRonda = true } = {}) {
  cancelarCinematicaFinalVersus();
  detenerRondaVersus();
  ocultarRevelacionesPalabrasVersus();
  limpiarAnimacionAtaqueVersus();
  configurarPersonajesCombateVersus();
  const tematicasDisponibles = Object.keys(bancosPalabrasVersus);
  demoVersus.tematicaParaRival = tematicaVersus.value;
  demoVersus.tematicaParaJugador = tematicasDisponibles[
    Math.floor(Math.random() * tematicasDisponibles.length)
  ];
  demoVersus.palabrasJugador = mezclarPalabrasVersus(
    bancosPalabrasVersus[demoVersus.tematicaParaJugador],
  ).slice(0, maximoPalabrasVersus);
  demoVersus.palabrasRival = palabrasSecretasVersus.map(limpiarPalabraParaVersus);
  demoVersus.indiceJugador = 0;
  demoVersus.indiceRival = 0;
  demoVersus.letrasJugador.clear();
  demoVersus.letrasRival.clear();
  demoVersus.erroresJugador = 0;
  demoVersus.erroresRival = 0;
  demoVersus.cargaHabilidadJugador = 0;
  demoVersus.cargaHabilidadRival = 0;
  demoVersus.pistaLupaJugador = "";
  demoVersus.pistaLupaRival = "";
  demoVersus.efectoRival = "";
  demoVersus.efectoRivalHasta = 0;
  demoVersus.firmaEfectoHabilidad = "";
  demoVersus.vidasJugador = vidasInicialesVersus;
  demoVersus.vidasRival = vidasInicialesVersus;
  demoVersus.tiempoJugador = duracionPartidaVersus;
  demoVersus.tiempoRival = duracionPartidaVersus;
  demoVersus.finalizadoJugador = false;
  demoVersus.finalizadoRival = false;
  demoVersus.motivoFinalJugador = "";
  demoVersus.motivoFinalRival = "";
  demoVersus.partidaFinalizada = false;
  const arena = arenasVersus[Math.floor(Math.random() * arenasVersus.length)];
  fondoVersus.src = arena.src;
  fondoVersus.alt = arena.alt;
  resultadoRondaVersus.classList.add("oculto");
  avisoAvanceVersus.classList.add("oculto");
  actualizarVidasVersus();
  actualizarPanelHabilidadVersus(0);
  actualizarIntentosVersus(document.getElementById("intentosVersusUno"), 0, "Jugador 1");
  actualizarIntentosVersus(document.getElementById("intentosVersusDos"), 0, "El rival");
  bloquearTecladoDemoVersus();
  actualizarProgresosVersus();
  actualizarTiemposVersus();

  if (comenzarRonda) {
    reproducirSonidoVersus("versusFight", 0.76);
    comenzarRondaVersus();
  }
}

function detenerRondaVersus() {
  if (demoVersus.intervaloTiempo) clearInterval(demoVersus.intervaloTiempo);
  if (demoVersus.intervaloRival) clearInterval(demoVersus.intervaloRival);
  demoVersus.intervaloTiempo = null;
  demoVersus.intervaloRival = null;
  if (demoVersus.temporizadorAviso) clearTimeout(demoVersus.temporizadorAviso);
  demoVersus.temporizadorAviso = null;
  limpiarAnimacionHabilidadVersus();
  limpiarEfectoVisualHabilidadVersus();
  demoVersus.firmaEfectoHabilidad = "";
  btnHabilidadVersus.disabled = true;
  detenerSonidosVersus();
  limpiarEntradaDueloVersus();
  limpiarAnimacionAtaqueVersus();
}

function jugarLetraDemoVersus(letra, boton) {
  if (boton.disabled || demoVersus.finalizadoJugador || demoVersus.partidaFinalizada) return;

  const estadoJugador = document.getElementById("estadoProgresoUno");
  const intentosJugador = document.getElementById("intentosVersusUno");
  const palabraJugador = obtenerPalabraActualJugadorVersus();
  const descubiertasAntes = VersusEngine.contarDescubiertas(
    palabraJugador,
    [...demoVersus.letrasJugador],
  );

  boton.disabled = true;
  const turno = VersusEngine.evaluarLetra({
    palabra: palabraJugador,
    letras: [...demoVersus.letrasJugador],
    errores: demoVersus.erroresJugador,
    letra,
  });
  demoVersus.letrasJugador = new Set(turno.letras);
  demoVersus.erroresJugador = turno.errores;

  if (turno.resultado === "acierto" || turno.resultado === "completa") {
    const descubiertasDespues = VersusEngine.contarDescubiertas(palabraJugador, turno.letras);
    demoVersus.cargaHabilidadJugador = VersusEngine.sumarCargaHabilidad(
      demoVersus.cargaHabilidadJugador,
      descubiertasDespues - descubiertasAntes,
    );
    if (demoVersus.pistaLupaJugador === letra) demoVersus.pistaLupaJugador = "";
    actualizarPanelHabilidadVersus(demoVersus.cargaHabilidadJugador, demoVersus.pistaLupaJugador);
  }

  if (turno.resultado === "acierto" || turno.resultado === "completa") {
    reproducirSonidoVersus("acertar", 0.5);
    mostrarEstadoProgresoVersus(estadoJugador, "¡Acierto!", "acierto");
  } else {
    reproducirSonidoVersus("error", 0.48);
    actualizarIntentosVersus(intentosJugador, demoVersus.erroresJugador, "Jugador 1");
    mostrarEstadoProgresoVersus(estadoJugador, "Fallaste", "error");
  }

  actualizarProgresosVersus();

  if (turno.palabraCompleta) {
    avanzarPalabraJugadorVersus(true);
    return;
  }

  if (turno.sinIntentos) {
    avanzarPalabraJugadorVersus(false);
  }
}

function jugarTurnoRivalVersus() {
  if (demoVersus.finalizadoRival || demoVersus.partidaFinalizada) return;

  const efectoActivo = Date.now() < demoVersus.efectoRivalHasta ? demoVersus.efectoRival : "";
  if (efectoActivo === "roots") return;
  activarHabilidadRivalLocalVersus();

  const alfabeto = filasTeclado.flat();
  const palabraRival = obtenerPalabraActualRivalVersus();
  const palabraRivalClave = obtenerClavePalabraVersus(palabraRival);
  const descubiertasAntes = VersusEngine.contarDescubiertas(
    palabraRival,
    [...demoVersus.letrasRival],
  );
  const letrasPendientes = [...new Set(palabraRivalClave)]
    .filter((letra) => !demoVersus.letrasRival.has(letra));
  const letrasIncorrectas = alfabeto.filter(
    (letra) => !palabraRivalClave.includes(letra) && !demoVersus.letrasRival.has(letra),
  );
  const probabilidadAcierto = efectoActivo === "roar" || efectoActivo === "shuffle"
    ? 0.25
    : probabilidadAciertoRivalVersus;
  const acierta = Boolean(demoVersus.pistaLupaRival)
    || Math.random() < probabilidadAcierto
    || letrasIncorrectas.length === 0;
  const opciones = acierta ? letrasPendientes : letrasIncorrectas;
  const letra = demoVersus.pistaLupaRival
    || opciones[Math.floor(Math.random() * opciones.length)];
  if (!letra) return;
  demoVersus.pistaLupaRival = "";

  const turno = VersusEngine.evaluarLetra({
    palabra: palabraRival,
    letras: [...demoVersus.letrasRival],
    errores: demoVersus.erroresRival,
    letra,
  });
  demoVersus.letrasRival = new Set(turno.letras);
  demoVersus.erroresRival = turno.errores;
  if (turno.resultado === "acierto" || turno.resultado === "completa") {
    const descubiertasDespues = VersusEngine.contarDescubiertas(palabraRival, turno.letras);
    demoVersus.cargaHabilidadRival = VersusEngine.sumarCargaHabilidad(
      demoVersus.cargaHabilidadRival,
      descubiertasDespues - descubiertasAntes,
    );
    if (!turno.palabraCompleta) activarHabilidadRivalLocalVersus();
  }
  const estadoRival = document.getElementById("estadoProgresoDos");
  if (turno.resultado === "acierto" || turno.resultado === "completa") {
    mostrarEstadoProgresoVersus(estadoRival, "El rival acertó", "acierto");
  } else {
    actualizarIntentosVersus(
      document.getElementById("intentosVersusDos"),
      demoVersus.erroresRival,
      "El rival",
    );
    mostrarEstadoProgresoVersus(estadoRival, "El rival falló", "error");
  }

  actualizarProgresosVersus();

  if (turno.palabraCompleta) {
    avanzarPalabraRivalVersus(true);
  } else if (turno.sinIntentos) {
    avanzarPalabraRivalVersus(false);
  }
}

function obtenerPalabraActualJugadorVersus() {
  return demoVersus.palabrasJugador[demoVersus.indiceJugador] || "";
}

function obtenerPalabraActualRivalVersus() {
  return demoVersus.palabrasRival[demoVersus.indiceRival] || "";
}

function palabraCompletadaVersus(palabra, letras) {
  return VersusEngine.palabraCompletada(palabra, [...letras]);
}

function contarLetrasDescubiertasVersus(palabra, letras) {
  return VersusEngine.contarDescubiertas(palabra, [...letras]);
}

function actualizarProgresosVersus() {
  const palabraJugador = document.getElementById("palabraVersusUno");
  const palabraRival = document.getElementById("palabraVersusDos");
  const objetivoJugador = obtenerPalabraActualJugadorVersus();
  const objetivoRival = obtenerPalabraActualRivalVersus();
  const progresoJugador = VersusEngine.obtenerProgreso(
    objetivoJugador,
    [...demoVersus.letrasJugador],
  );
  const progresoRival = VersusEngine.obtenerProgreso(
    objetivoRival,
    [...demoVersus.letrasRival],
    true,
  );

  const temaJugador = nombresTematicasVersus[demoVersus.tematicaParaJugador];
  const temaRival = nombresTematicasVersus[demoVersus.tematicaParaRival];

  tituloProgresoUno.textContent = demoVersus.finalizadoJugador
    ? "TU RECORRIDO TERMINÓ"
    : `TU DESAFÍO · ${temaJugador.toUpperCase()} ${demoVersus.indiceJugador + 1}/${maximoPalabrasVersus}`;
  tituloProgresoDos.textContent = demoVersus.finalizadoRival
    ? "EL RIVAL TERMINÓ"
    : `RIVAL · ${temaRival.toUpperCase()} ${demoVersus.indiceRival + 1}/${maximoPalabrasVersus}`;
  tituloVersus.textContent = `J1 ${Math.min(demoVersus.indiceJugador, maximoPalabrasVersus)}/${maximoPalabrasVersus} · J2 ${Math.min(demoVersus.indiceRival, maximoPalabrasVersus)}/${maximoPalabrasVersus}`;

  if (demoVersus.finalizadoJugador) {
    palabraJugador.textContent = demoVersus.motivoFinalJugador === "tiempo"
      ? "TIEMPO AGOTADO"
      : `✓ ${maximoPalabrasVersus} PALABRAS`;
  } else {
    palabraJugador.textContent = progresoJugador.join(" ");
  }
  palabraJugador.setAttribute("aria-label", `Tu progreso: ${palabraJugador.textContent}`);

  if (demoVersus.finalizadoRival) {
    palabraRival.textContent = demoVersus.motivoFinalRival === "tiempo"
      ? "TIEMPO AGOTADO"
      : `✓ ${maximoPalabrasVersus} PALABRAS`;
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
  elemento.innerHTML = Array.from({ length: vidasInicialesVersus }, (_, indice) => (
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
  const palabraPerdida = obtenerPalabraActualJugadorVersus();
  demoVersus.indiceJugador += 1;
  demoVersus.letrasJugador.clear();
  demoVersus.erroresJugador = 0;

  if (acertada) {
    demoVersus.vidasRival -= 1;
    reproducirAtaqueJugadorVersus();
    mostrarAvisoAvanceVersus(
      `¡Palabra ${numeroPalabra} superada! Atacaste al rival.`,
      "acierto",
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 260 : 1550,
    );
  } else {
    mostrarRevelacionPalabraVersus(
      revelacionPalabraVersusUno,
      palabraPerdida,
      demoVersus.tematicaParaJugador,
      "temporizadorRevelacionJugador",
    );
    demoVersus.vidasJugador -= 1;
    reproducirAtaqueRivalVersus();
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
    finalizarPartidaVersus(
      "rival",
      "Agotaste tu energía y te quedaste sin corazones.",
      palabraPerdida,
    );
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
  const palabraPerdida = obtenerPalabraActualRivalVersus();
  demoVersus.indiceRival += 1;
  demoVersus.letrasRival.clear();
  demoVersus.erroresRival = 0;

  if (acertada) {
    demoVersus.vidasJugador -= 1;
    reproducirAtaqueRivalVersus();
    mostrarAvisoAvanceVersus(
      `El rival superó su palabra ${numeroPalabra} y te atacó.`,
      "error",
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 260 : 1300,
    );
  } else {
    mostrarRevelacionPalabraVersus(
      revelacionPalabraVersusDos,
      palabraPerdida,
      demoVersus.tematicaParaRival,
      "temporizadorRevelacionRival",
    );
    demoVersus.vidasRival -= 1;
    reproducirAtaqueJugadorVersus();
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
    finalizarPartidaVersus(
      "jugador",
      "El rival agotó su energía y se quedó sin corazones.",
      palabraPerdida,
    );
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

function finalizarPartidaVersus(ganador, detalle, palabraPerdida = "") {
  if (demoVersus.partidaFinalizada) return;
  actualizarProgresosVersus();
  demoVersus.partidaFinalizada = true;
  detenerRondaVersus();
  bloquearTecladoDemoVersus();

  reproducirCierrePartidaVersus(ganador, detalle, palabraPerdida);
}

function obtenerReproductorFinalVersus(personajeGanador, personajeVictima) {
  const finalElegido = personajesVersus[personajeGanador]?.final;
  if (finalElegido === "prision-esmeralda") {
    return () => reproducirPrisionEsmeraldaVersus(personajeVictima);
  }
  if (finalElegido === "eclipse-violeta") {
    return () => reproducirEclipseVioletaVersus(personajeVictima);
  }
  if (finalElegido === "llamado-matriarca") {
    return () => reproducirLlamadoMatriarcaVersus(personajeVictima);
  }
  if (finalElegido === "caceria-luna-llena") {
    return () => reproducirCaceriaLunaLlenaVersus(personajeVictima);
  }
  if (finalElegido === "legion-umbria") {
    return () => reproducirLegionUmbriaVersus(personajeVictima);
  }
  if (finalElegido === "juicio-amanecer") {
    return () => reproducirJuicioAmanecerVersus(personajeVictima);
  }
  if (finalElegido === "cero-absoluto") {
    return () => reproducirCeroAbsolutoVersus(personajeVictima);
  }
  if (finalElegido === "eclipse-infernal") {
    return () => reproducirEclipseInfernalVersus(personajeVictima);
  }
  return () => reproducirTrampaSelvaticaVersus(personajeVictima);
}

function ocultarAnuncioFinVersus() {
  if (demoVersus.temporizadorAnuncioFin) {
    clearTimeout(demoVersus.temporizadorAnuncioFin);
    demoVersus.temporizadorAnuncioFin = null;
  }
  demoVersus.resolverAnuncioFin = null;
  anuncioFinVersus.classList.remove("activo");
  anuncioFinVersus.classList.add("oculto");
  palabraFinalVersus.hidden = true;
  palabraFinalVersus.textContent = "";
}

function mostrarAnuncioFinVersus(palabraPerdida = "") {
  ocultarAnuncioFinVersus();
  if (palabraPerdida) {
    palabraFinalVersus.textContent = `LA PALABRA ERA: ${palabraPerdida}`;
    palabraFinalVersus.hidden = false;
  }
  anuncioFinVersus.classList.remove("oculto");
  void anuncioFinVersus.offsetWidth;
  anuncioFinVersus.classList.add("activo");

  const movimientoReducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return new Promise((resolve) => {
    demoVersus.resolverAnuncioFin = resolve;
    demoVersus.temporizadorAnuncioFin = setTimeout(() => {
      const resolver = demoVersus.resolverAnuncioFin;
      ocultarAnuncioFinVersus();
      resolver?.();
    }, movimientoReducido ? 1200 : 2800);
  });
}

async function reproducirCierrePartidaVersus(ganador, detalle, palabraPerdida = "") {
  if (ganador === "empate") {
    mostrarResultadoPartidaVersus(ganador, detalle);
    return;
  }

  await mostrarAnuncioFinVersus(palabraPerdida);

  const personajeGanador = ganador === "jugador"
    ? personajeJugadorVersus
    : personajeRivalVersus;
  const personajeVictima = ganador === "jugador"
    ? personajeRivalVersus
    : personajeJugadorVersus;
  const reproducirFinal = obtenerReproductorFinalVersus(
    personajeGanador,
    personajeVictima,
  );
  await reproducirFinal();
  mostrarResultadoPartidaVersus(ganador, detalle);
}

function mostrarResultadoPartidaVersus(ganador, detalle) {

  reproducirSonidoVersus(ganador === "jugador" ? "victoria" : "derrota", 0.72);

  iconoResultadoVersus.textContent = ganador === "jugador" ? "🏆" : ganador === "rival" ? "🛡️" : "⚔️";
  etiquetaResultadoVersus.textContent = ganador === "empate" ? "DUELO EMPATADO" : "DUELO FINALIZADO";
  const esOnline = adaptadorSalasVersus.proveedor === "supabase";
  tituloResultadoVersus.textContent = ganador === "jugador"
    ? (esOnline ? "¡Ganaste el duelo!" : "¡Victoria del Jugador 1!")
    : ganador === "rival"
      ? (esOnline ? "Victoria de tu rival" : "Victoria del Jugador 2")
      : "¡Duelo empatado!";
  detalleResultadoVersus.textContent = detalle;
  btnRevanchaVersus.classList.remove("oculto");
  btnRevanchaVersus.disabled = false;
  btnRevanchaVersus.textContent = esOnline ? "Pedir revancha" : "Jugar de nuevo";
  resultadoRondaVersus.classList.remove("oculto");
  if (esOnline) actualizarEstadoRevanchaVersus(adaptadorSalasVersus.obtenerSala());
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

const posesReaccionVictimaVersus = {
  explorador: "assets/images/personajes/versus/explorador-atrapado-eclipse.png",
  mago: "assets/images/personajes/versus/mago-atrapado-trampa.png",
  guardiana: "assets/images/personajes/versus/guardiana-susto-impacto.png",
  dragon: "assets/images/personajes/versus/dragon-susto-impacto.png",
  hombre_lobo: srcHombreLoboImpactoVersus,
  t_shadow: srcShadowImpactoVersus,
  guardian_alba: srcGuardianAlbaImpactoVersus,
  dragon_hielo: srcDragonHieloImpactoVersus,
  azrak: srcAzrakImpactoVersus,
};

function configurarVictimaFinalVersus(elemento, personaje) {
  const clave = personaje in personajesVersus ? personaje : "mago";
  const victima = personajesVersus[clave];
  elemento.src = victima.base;
  elemento.alt = `${victima.nombre}, objetivo de la técnica final`;
  elemento.classList.remove("reaccion-final-activa");
  elemento.classList.remove(
    "victima-final-explorador",
    "victima-final-mago",
    "victima-final-guardiana",
    "victima-final-dragon",
    "victima-final-hombre_lobo",
    "victima-final-t_shadow",
    "victima-final-guardian_alba",
    "victima-final-dragon_hielo",
    "victima-final-azrak",
  );
  elemento.classList.add(`victima-final-${clave}`);
  return clave;
}

function programarReaccionVictimaFinalVersus(elemento, personaje, demora) {
  const clave = configurarVictimaFinalVersus(elemento, personaje);
  demoVersus.temporizadorReaccionCinematica = setTimeout(() => {
    elemento.src = posesReaccionVictimaVersus[clave];
    elemento.classList.add("reaccion-final-activa");
    demoVersus.temporizadorReaccionCinematica = null;
  }, demora);
}

function reproducirEclipseVioletaVersus(victima = personajeRivalVersus) {
  cancelarCinematicaFinalVersus();
  crearParticulasEclipseVersus();
  programarReaccionVictimaFinalVersus(victimaEclipseVersus, victima, 2150);
  fondoCinematicaVersus.src = fondoVersus.src;
  etiquetaCinematicaVersus.textContent = "GOLPE LEGENDARIO";
  tituloCinematicaVersus.textContent = "ECLIPSE VIOLETA";
  cinematicaFinalVersus.classList.remove("trampa-selvatica");
  cinematicaFinalVersus.classList.add("eclipse-violeta");
  cinematicaFinalVersus.classList.remove("oculto");
  void cinematicaFinalVersus.offsetWidth;
  cinematicaFinalVersus.classList.add("activa");
  btnSaltarCinematicaVersus.focus();
  reproducirSonidoVersus("versusFinish", 0.82);

  return new Promise((resolve) => {
    demoVersus.resolverCinematica = resolve;
    demoVersus.temporizadorCinematica = setTimeout(
      completarCinematicaFinalVersus,
      5200,
    );
  });
}

function reproducirTrampaSelvaticaVersus(victima = personajeRivalVersus) {
  cancelarCinematicaFinalVersus();
  crearParticulasEclipseVersus();
  programarReaccionVictimaFinalVersus(victimaTrampaVersus, victima, 2200);
  fondoCinematicaVersus.src = fondoVersus.src;
  etiquetaCinematicaVersus.textContent = "TÉCNICA SECRETA";
  tituloCinematicaVersus.textContent = "TRAMPA SELVÁTICA";
  cinematicaFinalVersus.classList.remove("eclipse-violeta");
  cinematicaFinalVersus.classList.add("trampa-selvatica");
  cinematicaFinalVersus.classList.remove("oculto");
  void cinematicaFinalVersus.offsetWidth;
  cinematicaFinalVersus.classList.add("activa");
  btnSaltarCinematicaVersus.focus();
  reproducirSonidoVersus("versusFinish", 0.82);

  return new Promise((resolve) => {
    demoVersus.resolverCinematica = resolve;
    demoVersus.temporizadorCinematica = setTimeout(
      completarCinematicaFinalVersus,
      5200,
    );
  });
}

function configurarVictimaFaucesVersus(personaje = personajeRivalVersus) {
  const victima = victimasFaucesVersus[personaje] || victimasFaucesVersus.mago;
  victimaFaucesVersus.src = victima.imagen;
  carnivoraDevorandoVersus.src = victima.imagenAtrapado;
  victimaFaucesVersus.alt = `${victima.nombre} atrapado por Fauces Esmeralda`;
  victimaFaucesVersus.classList.remove(
    "victima-fauces-explorador",
    "victima-fauces-mago",
    "victima-fauces-guardiana",
    "victima-fauces-dragon",
    "victima-fauces-hombre_lobo",
    "victima-fauces-t_shadow",
    "victima-fauces-guardian_alba",
    "victima-fauces-dragon_hielo",
    "victima-fauces-azrak",
  );
  victimaFaucesVersus.classList.add(`victima-fauces-${personaje in victimasFaucesVersus ? personaje : "mago"}`);
}

function reproducirPrisionEsmeraldaVersus(victima = personajeRivalVersus) {
  cancelarCinematicaFinalVersus();
  crearParticulasEclipseVersus();
  configurarVictimaFaucesVersus(victima);
  fondoCinematicaVersus.src = fondoVersus.src;
  etiquetaCinematicaVersus.textContent = "TÉCNICA ANCESTRAL";
  tituloCinematicaVersus.textContent = "FAUCES ESMERALDA";
  cinematicaFinalVersus.classList.remove("eclipse-violeta", "trampa-selvatica");
  cinematicaFinalVersus.classList.add("prision-esmeralda");
  cinematicaFinalVersus.classList.remove("oculto");
  void cinematicaFinalVersus.offsetWidth;
  cinematicaFinalVersus.classList.add("activa");
  btnSaltarCinematicaVersus.focus();
  reproducirSonidoVersus("versusFinish", 0.82);

  return new Promise((resolve) => {
    demoVersus.resolverCinematica = resolve;
    demoVersus.temporizadorCinematica = setTimeout(
      completarCinematicaFinalVersus,
      5200,
    );
  });
}

function reproducirLlamadoMatriarcaVersus(victima = personajeRivalVersus) {
  cancelarCinematicaFinalVersus();
  crearParticulasEclipseVersus();
  fondoCinematicaVersus.src = fondoVersus.src;
  programarReaccionVictimaFinalVersus(rivalCinematicaMatriarca, victima, 2700);
  etiquetaCinematicaVersus.textContent = "AUXILIO ANCESTRAL";
  tituloCinematicaVersus.textContent = "LLAMADO DE LA MATRIARCA";
  cinematicaFinalVersus.classList.remove(
    "eclipse-violeta",
    "trampa-selvatica",
    "prision-esmeralda",
  );
  cinematicaFinalVersus.classList.add("llamado-matriarca");
  cinematicaFinalVersus.classList.remove("oculto");
  void cinematicaFinalVersus.offsetWidth;
  cinematicaFinalVersus.classList.add("activa");
  btnSaltarCinematicaVersus.focus();
  reproducirSonidoVersus("versusFinish", 0.82);

  return new Promise((resolve) => {
    demoVersus.resolverCinematica = resolve;
    demoVersus.temporizadorCinematica = setTimeout(
      completarCinematicaFinalVersus,
      6200,
    );
  });
}

function reproducirCaceriaLunaLlenaVersus(victima = personajeRivalVersus) {
  cancelarCinematicaFinalVersus();
  crearParticulasEclipseVersus();
  fondoCinematicaVersus.src = fondoVersus.src;
  programarReaccionVictimaFinalVersus(victimaCaceriaVersus, victima, 3050);
  etiquetaCinematicaVersus.textContent = "CAZA ANCESTRAL";
  tituloCinematicaVersus.textContent = "CACERÍA DE LUNA LLENA";
  cinematicaFinalVersus.classList.remove(
    "eclipse-violeta",
    "trampa-selvatica",
    "prision-esmeralda",
    "llamado-matriarca",
  );
  cinematicaFinalVersus.classList.add("caceria-luna-llena");
  cinematicaFinalVersus.classList.remove("oculto");
  void cinematicaFinalVersus.offsetWidth;
  cinematicaFinalVersus.classList.add("activa");
  btnSaltarCinematicaVersus.focus();
  reproducirSonidoVersus("versusFinish", 0.88);

  return new Promise((resolve) => {
    demoVersus.resolverCinematica = resolve;
    demoVersus.temporizadorCinematica = setTimeout(
      completarCinematicaFinalVersus,
      6800,
    );
  });
}

function reproducirLegionUmbriaVersus(victima = personajeRivalVersus) {
  cancelarCinematicaFinalVersus();
  fondoCinematicaVersus.src = fondoVersus.src;
  programarReaccionVictimaFinalVersus(victimaShadowVersus, victima, 2350);
  etiquetaCinematicaVersus.textContent = "TÉCNICA PROHIBIDA";
  tituloCinematicaVersus.textContent = "LEGIÓN UMBRÍA";
  cinematicaFinalVersus.classList.remove(
    "eclipse-violeta",
    "trampa-selvatica",
    "prision-esmeralda",
    "llamado-matriarca",
    "caceria-luna-llena",
  );
  cinematicaFinalVersus.classList.add("legion-umbria");
  cinematicaFinalVersus.classList.remove("oculto");
  void cinematicaFinalVersus.offsetWidth;
  cinematicaFinalVersus.classList.add("activa");
  btnSaltarCinematicaVersus.focus();
  reproducirSonidoVersus("versusFinish", 0.9);

  return new Promise((resolve) => {
    demoVersus.resolverCinematica = resolve;
    demoVersus.temporizadorCinematica = setTimeout(completarCinematicaFinalVersus, 6500);
  });
}

function reproducirJuicioAmanecerVersus(victima = personajeRivalVersus) {
  cancelarCinematicaFinalVersus();
  fondoCinematicaVersus.src = fondoVersus.src;
  crearParticulasEclipseVersus();
  programarReaccionVictimaFinalVersus(victimaGuardianAlbaVersus, victima, 3650);
  etiquetaCinematicaVersus.textContent = "TÉCNICA CELESTIAL";
  tituloCinematicaVersus.textContent = "JUICIO DEL AMANECER";
  cinematicaFinalVersus.classList.add("juicio-amanecer");
  cinematicaFinalVersus.classList.remove("oculto");
  void cinematicaFinalVersus.offsetWidth;
  cinematicaFinalVersus.classList.add("activa");
  btnSaltarCinematicaVersus.focus();
  reproducirSonidoVersus("versusFinish", 0.92);

  return new Promise((resolve) => {
    demoVersus.resolverCinematica = resolve;
    demoVersus.temporizadorCinematica = setTimeout(completarCinematicaFinalVersus, 6500);
  });
}

function reproducirCeroAbsolutoVersus(victima = personajeRivalVersus) {
  cancelarCinematicaFinalVersus();
  fondoCinematicaVersus.src = fondoVersus.src;
  programarReaccionVictimaFinalVersus(victimaNivorVersus, victima, 2650);
  etiquetaCinematicaVersus.textContent = "CATACLISMO BOREAL";
  tituloCinematicaVersus.textContent = "CERO ABSOLUTO";
  cinematicaFinalVersus.classList.add("cero-absoluto");
  cinematicaFinalVersus.classList.remove("oculto");
  void cinematicaFinalVersus.offsetWidth;
  cinematicaFinalVersus.classList.add("activa");
  btnSaltarCinematicaVersus.focus();
  reproducirSonidoVersus("versusFinish", 0.94);

  return new Promise((resolve) => {
    demoVersus.resolverCinematica = resolve;
    demoVersus.temporizadorCinematica = setTimeout(completarCinematicaFinalVersus, 9200);
  });
}

function reproducirEclipseInfernalVersus(victima = personajeRivalVersus) {
  cancelarCinematicaFinalVersus();
  fondoCinematicaVersus.src = fondoVersus.src;
  const victimaFinal = victima in personajesVersus ? victima : "mago";
  programarReaccionVictimaFinalVersus(victimaPortalAzrakVersus, victimaFinal, 2850);
  manoVictimaAzrakVersus.src = `assets/images/personajes/versus/mano-abismo-atrapa-${victimaFinal.replaceAll("_", "-")}.png`;
  manoVictimaAzrakVersus.alt = `${personajesVersus[victimaFinal].nombre}, atrapado por la Mano del Abismo`;
  etiquetaCinematicaVersus.textContent = "RITO DEL ABISMO";
  tituloCinematicaVersus.textContent = "ECLIPSE INFERNAL";
  cinematicaFinalVersus.classList.add("eclipse-infernal");
  cinematicaFinalVersus.classList.remove("oculto");
  void cinematicaFinalVersus.offsetWidth;
  cinematicaFinalVersus.classList.add("activa");
  btnSaltarCinematicaVersus.focus();
  reproducirSonidoVersus("versusFinish", 0.96);

  return new Promise((resolve) => {
    demoVersus.resolverCinematica = resolve;
    demoVersus.temporizadorCinematica = setTimeout(completarCinematicaFinalVersus, 8400);
  });
}

function completarCinematicaFinalVersus() {
  if (demoVersus.temporizadorReaccionCinematica) {
    clearTimeout(demoVersus.temporizadorReaccionCinematica);
    demoVersus.temporizadorReaccionCinematica = null;
  }
  if (demoVersus.temporizadorCinematica) {
    clearTimeout(demoVersus.temporizadorCinematica);
    demoVersus.temporizadorCinematica = null;
  }
  detenerSonidosVersus();
  cinematicaFinalVersus.classList.remove("activa");
  cinematicaFinalVersus.classList.add("oculto");
  cinematicaFinalVersus.classList.remove(
    "eclipse-violeta",
    "trampa-selvatica",
    "prision-esmeralda",
    "llamado-matriarca",
    "caceria-luna-llena",
    "legion-umbria",
    "juicio-amanecer",
    "cero-absoluto",
    "eclipse-infernal",
  );
  particulasEclipseVersus.replaceChildren();
  const resolver = demoVersus.resolverCinematica;
  demoVersus.resolverCinematica = null;
  resolver?.();
}

function cancelarCinematicaFinalVersus() {
  ocultarAnuncioFinVersus();
  if (demoVersus.temporizadorReaccionCinematica) {
    clearTimeout(demoVersus.temporizadorReaccionCinematica);
    demoVersus.temporizadorReaccionCinematica = null;
  }
  if (demoVersus.temporizadorCinematica) {
    clearTimeout(demoVersus.temporizadorCinematica);
    demoVersus.temporizadorCinematica = null;
  }
  detenerSonidosVersus();
  cinematicaFinalVersus.classList.remove("activa");
  cinematicaFinalVersus.classList.add("oculto");
  cinematicaFinalVersus.classList.remove(
    "eclipse-violeta",
    "trampa-selvatica",
    "prision-esmeralda",
    "llamado-matriarca",
    "caceria-luna-llena",
    "legion-umbria",
    "juicio-amanecer",
    "cero-absoluto",
    "eclipse-infernal",
  );
  particulasEclipseVersus.replaceChildren();
  demoVersus.resolverCinematica = null;
}

btnSaltarCinematicaVersus.addEventListener("click", completarCinematicaFinalVersus);

function probarCinematicaVersus(personaje) {
  if (!modoPruebasActivo || demoVersus.partidaFinalizada) return;
  if (personaje === "guardiana") {
    void reproducirPrisionEsmeraldaVersus(victimaPruebaFaucesVersus.value);
    return;
  }
  if (personaje === "dragon") {
    void reproducirLlamadoMatriarcaVersus(victimaPruebaFaucesVersus.value);
    return;
  }
  if (personaje === "hombre_lobo") {
    void reproducirCaceriaLunaLlenaVersus(victimaPruebaFaucesVersus.value);
    return;
  }
  if (personaje === "t_shadow") {
    void reproducirLegionUmbriaVersus(victimaPruebaFaucesVersus.value);
    return;
  }
  if (personaje === "guardian_alba") {
    void reproducirJuicioAmanecerVersus(victimaPruebaFaucesVersus.value);
    return;
  }
  if (personaje === "dragon_hielo") {
    void reproducirCeroAbsolutoVersus(victimaPruebaFaucesVersus.value);
    return;
  }
  if (personaje === "azrak") {
    void reproducirEclipseInfernalVersus(victimaPruebaFaucesVersus.value);
    return;
  }

  const reproducir = personaje === "mago"
    ? reproducirEclipseVioletaVersus
    : reproducirTrampaSelvaticaVersus;
  void reproducir(victimaPruebaFaucesVersus.value);
}

btnProbarCinematicaExplorador.addEventListener("click", () => {
  probarCinematicaVersus("explorador");
});

btnProbarCinematicaMago.addEventListener("click", () => {
  probarCinematicaVersus("mago");
});

btnProbarCinematicaGuardiana.addEventListener("click", () => {
  probarCinematicaVersus("guardiana");
});

btnProbarCinematicaDragon.addEventListener("click", () => {
  probarCinematicaVersus("dragon");
});

btnProbarCinematicaHombreLobo.addEventListener("click", () => {
  probarCinematicaVersus("hombre_lobo");
});

btnProbarCinematicaShadow.addEventListener("click", () => {
  probarCinematicaVersus("t_shadow");
});

btnProbarCinematicaGuardianAlba.addEventListener("click", () => {
  probarCinematicaVersus("guardian_alba");
});

btnProbarCinematicaDragonHielo.addEventListener("click", () => {
  probarCinematicaVersus("dragon_hielo");
});

btnProbarCinematicaAzrak.addEventListener("click", () => {
  probarCinematicaVersus("azrak");
});

btnProbarAtaqueElegido.addEventListener("click", () => {
  if (!modoPruebasActivo || demoVersus.partidaFinalizada) return;
  reproducirAtaqueJugadorVersus();
});

function probarHabilidadEspecialVersus(personaje) {
  if (!modoPruebasActivo || demoVersus.partidaFinalizada || !habilidadesVersus[personaje]) return;
  const desdeRival = origenHabilidadPruebaVersus.value === "rival";
  actualizarPistaLupaVersus();
  aplicarEfectoVisualHabilidadVersus("", 0);

  reproducirAnimacionHabilidadVersus(personaje, {
    desdeRival,
    alImpactar: () => {
      const habilidad = habilidadesVersus[personaje];
      if (habilidad.efecto === "hint") {
        const teclasDisponibles = [...tecladoVersus.querySelectorAll("button:not(:disabled)")];
        const tecla = teclasDisponibles[Math.floor(Math.random() * teclasDisponibles.length)]
          || tecladoVersus.querySelector("button");
        actualizarPistaLupaVersus(tecla?.textContent || "A");
      } else if (habilidad.efecto === "forced_miss") {
        const letra = obtenerLetraIncorrectaDisponibleVersus(
          desdeRival ? obtenerPalabraActualJugadorVersus() : obtenerPalabraActualRivalVersus(),
          desdeRival ? demoVersus.letrasJugador : demoVersus.letrasRival,
        );
        if (desdeRival) {
          animarTeclaCalaveraIgneaVersus(letra, true);
          vibrarImpactoVersus();
        }
      } else if (desdeRival) {
        aplicarEfectoVisualHabilidadVersus(habilidad.efecto, habilidad.duracion);
      }
      mostrarAvisoAvanceVersus(
        `${habilidad.nombre} · ${desdeRival ? "vista del rival" : "vista del jugador"}`,
        desdeRival ? "error" : "acierto",
      );
    },
  });
}

botonesProbarHabilidadVersus.forEach((boton) => {
  boton.addEventListener("click", () => probarHabilidadEspecialVersus(boton.dataset.habilidad));
});

btnSaltarEntradaVersus.addEventListener("click", finalizarEntradaDueloVersus);
btnRevanchaVersus.addEventListener("click", async () => {
  if (adaptadorSalasVersus.proveedor !== "supabase") {
    prepararDueloVersus();
    return;
  }
  if (revanchaVersusEnCurso || btnRevanchaVersus.disabled) return;
  revanchaVersusEnCurso = true;
  btnRevanchaVersus.disabled = true;
  btnRevanchaVersus.textContent = "Enviando…";
  try {
    const sala = await adaptadorSalasVersus.pedirRevancha();
    actualizarEstadoMultijugador(sala);
  } catch (error) {
    btnRevanchaVersus.disabled = false;
    btnRevanchaVersus.textContent = "Reintentar revancha";
    detalleResultadoVersus.textContent = error.message || "No pudimos solicitar la revancha.";
  } finally {
    revanchaVersusEnCurso = false;
    const sala = adaptadorSalasVersus.obtenerSala();
    if (sala?.estado === "finished") actualizarEstadoRevanchaVersus(sala);
  }
});

// Control reutilizable para cualquier secuencia narrativa presente o futura.
function iniciarSecuenciaNarrativa(
  alSaltar = null,
  { saltarSoloCartel = false } = {},
) {
  const secuencia = {
    alSaltar,
    esperas: new Set(),
    saltada: false,
    saltarSoloCartel,
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
    ".cinematica-despertar-dragon",
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

function protegerTransicionTrasCartel(secuencia) {
  if (!secuencia?.saltarSoloCartel) return;

  secuencia.saltada = false;
  btnSaltarNarrativa.disabled = true;
  btnSaltarNarrativa.classList.add("oculto");
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
  secuenciaHistoriaActiva = iniciarSecuenciaNarrativa(
    () => {
      btnContinuarHistoria.click();
    },
    { saltarSoloCartel: true },
  );

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
  btnProbarMuralSantuario.disabled = escenarioActual !== 0 || misionActual !== 8;
}

function actualizarModoPruebas(activar, { restaurarProgreso = true } = {}) {
  modoPruebasActivo = Boolean(activar);
  modoPruebas.checked = modoPruebasActivo;
  panelModoPruebas.classList.toggle("oculto", !modoPruebasActivo);
  btnCompletarPalabrasPruebasVersus.classList.toggle("oculto", !modoPruebasActivo);
  herramientasPruebasVersus.classList.toggle("oculto", !modoPruebasActivo);
  herramientasHabilidadesPruebasVersus.classList.toggle("oculto", !modoPruebasActivo);
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
  solicitarOrientacion("portrait");
  void precargarRecursosCriticosMision();
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
  muralSantuarioCompletado = false;
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
  pausarMusicaMenu();
  musicaPrologo.pause();
  musicaPrologo.currentTime = 0;
  musicaPrologo.volume = 0.25;
  musicaPrologo.play().catch((error) => {
    logAudio("musica del prologo bloqueada", error);
  });
}

function reproducirMusicaMenu() {
  if (!musicaMenu.paused) return;

  musicaMenu.play().catch((error) => {
    logAudio("melodía del menú bloqueada", error);
  });
}

function pausarMusicaMenu() {
  musicaMenu.pause();
}

function activarMusicaMenuPorInteraccion() {
  if (pantallaMenu.classList.contains("activa")) reproducirMusicaMenu();
}

document.addEventListener("pointerdown", activarMusicaMenuPorInteraccion, { once: true });
document.addEventListener("keydown", activarMusicaMenuPorInteraccion, { once: true });
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    pausarMusicaMenu();
    return;
  }

  if (
    pantallaMenu.classList.contains("activa")
    && !document.body.classList.contains("intro-pendiente")
  ) {
    reproducirMusicaMenu();
  }
});

function reproducirSonidoComenzarAventura() {
  sonidoComenzarAventura.currentTime = 0;
  sonidoComenzarAventura.play().catch((error) => {
    logAudio("sonido de comenzar aventura bloqueado", error);
  });
}

function reproducirSonidoSeleccionPersonaje() {
  sonidoSeleccionPersonaje.currentTime = 0;
  sonidoSeleccionPersonaje.play().catch((error) => {
    logAudio("sonido de selección de personaje bloqueado", error);
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
  detenerBloqueoRamas();
  detenerTormenta();
  detenerNiebla();
  detenerMiradasLobos();
  detenerPresenciaBosque();
  detenerAranaBosque();
  detenerVientoArena();
  detenerSonidosVersus();
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

function detenerBloqueoRamas() {
  contenedorEscenario
    .querySelectorAll(".capa-ramas-bloqueo")
    .forEach((capa) => capa.remove());
}

function actualizarBloqueoRamasMision() {
  detenerBloqueoRamas();

  if (escenarioActual !== 0 || misionActual !== 2) return;

  const capa = document.createElement("div");
  capa.className = "capa-ramas-bloqueo";
  capa.setAttribute("aria-hidden", "true");

  for (let indice = 1; indice <= 12; indice++) {
    const rama = document.createElement("img");
    rama.className = `rama-bloqueo rama-bloqueo-${indice}`;
    const variante = ((indice - 1) % 3) + 1;
    rama.src = `assets/images/elementos/rama-frondosa-bosque-${variante}.png`;
    rama.alt = "";
    capa.appendChild(rama);
  }

  contenedorEscenario.insertBefore(capa, personajeImagen);

  if (desafiosCompletados > 0 || prefiereReducirMovimiento.matches) {
    capa.classList.add("ramas-colocadas");
    return;
  }

  const esperaSonidoNarrativo =
    historiaMisionPendiente && sonidoNarrativoPendiente === "ramas";

  if (!esperaSonidoNarrativo) {
    requestAnimationFrame(() => activarBloqueoRamas());
  }
}

function activarBloqueoRamas() {
  const capa = contenedorEscenario.querySelector(".capa-ramas-bloqueo");
  if (!capa || capa.classList.contains("ramas-activas")) return;

  capa.classList.remove("ramas-colocadas");
  void capa.offsetWidth;
  capa.classList.add("ramas-activas");

  contenedorEscenario.classList.remove("temblor");
  void contenedorEscenario.offsetWidth;
  contenedorEscenario.classList.add("temblor");
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

function obtenerEstadoBaseExplorador(
  escenario = escenarioActual,
  mision = misionActual,
) {
  const estadoConfigurado =
    estadosExploradorPorEscenario[escenario]?.[mision];

  if (estadoConfigurado) return estadoConfigurado;

  if (mision <= 1) return "feliz";

  if (mision <= 3) return "nervioso";

  if (mision <= 5) return "preocupado";

  if (escenario === 0 && mision <= 9) return "feliz";

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

async function iniciarMisionAventura({ presentarMision = false } = {}) {
  ocultarMensajeDesafioSuperado();
  detenerPolvoImpacto();
  detenerAmbientePuente();
  detenerAmbienteCristal();
  detenerAmbienteHojas();
  detenerTormenta();
  detenerEfectos();
  await precargarRecursosCriticosMision();
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
  await Promise.all([
    esperarCargaFondoEscenario(),
    esperarCargaImagen(personajeImagen),
  ]);
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
  programarPrecargaRecursosSecundarios();

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
    muralSantuarioCompletado,
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
  muralSantuarioCompletado =
    progreso.muralSantuarioCompletado === true || cristalesObtenidos > 0;
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
actualizarOrientacionPantalla(pantallaMenu);
void precargarRecursosCriticosMision();
precargarImagenesHojas();

function cambiarPersonaje(estado) {
  personajeImagen.src = obtenerSrcExplorador(estado);

  personajeImagen.classList.remove(...clasesAnimacionExplorador);
  personajeImagen.classList.remove(...clasesEstadoExplorador);
  personajeImagen.classList.add(`expresion-${estado}`);

  if (estado === "celebrando") {
    personajeImagen.classList.add("celebrando");
  }
}

function obtenerEscenaMision(
  escenario = escenarioActual,
  mision = misionActual,
) {
  const escenasPorMision =
    escenasPorEscenario[escenario] || escenasPorEscenario[0];

  return escenasPorMision[Math.min(mision, escenasPorMision.length - 1)];
}

function obtenerNombreFondoMision(
  escenario = escenarioActual,
  mision = misionActual,
  escena = obtenerEscenaMision(escenario, mision),
) {
  let variante = 0;

  if (escenario === 0 && mision === 0 && desafiosCompletados > 0) {
    variante = 1;
  }

  if (escenario === 0 && mision === 9 && portalAbierto) {
    variante = 1;
  }

  return escena.fondos[variante] || escena.fondos[0];
}

function actualizarEscenaPorMision() {
  const escena = obtenerEscenaMision();
  const nombreFondo = obtenerNombreFondoMision(
    escenarioActual,
    misionActual,
    escena,
  );

  contenedorEscenario.classList.toggle(
    "escenario-desierto",
    escenarioActual === 1,
  );
  fondoEscenario.src = `assets/images/fondos/${nombreFondo}`;
  actualizarBloqueoRamasMision();
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

function mezclarPiezasMural(indices) {
  const resultado = [...indices];

  for (let indice = resultado.length - 1; indice > 0; indice -= 1) {
    const destino = Math.floor(Math.random() * (indice + 1));
    [resultado[indice], resultado[destino]] = [resultado[destino], resultado[indice]];
  }

  return resultado;
}

function crearPiezaMuralSantuario(indice) {
  const pieza = document.createElement("button");
  const fila = Math.floor(indice / 3);
  const columna = indice % 3;
  pieza.type = "button";
  pieza.className = "pieza-mural-santuario";
  pieza.dataset.indice = `${indice}`;
  pieza.setAttribute("aria-label", `Fragmento ${indice + 1} del mural`);
  pieza.style.setProperty("--fila-pieza", `${fila}`);
  pieza.style.setProperty("--columna-pieza", `${columna}`);
  pieza.addEventListener("pointerdown", iniciarArrastrePiezaMural);
  pieza.addEventListener("click", (evento) => evento.stopPropagation());
  pieza.addEventListener("keydown", (evento) => {
    if (evento.key !== "Enter" && evento.key !== " ") return;
    evento.preventDefault();
    seleccionarPiezaMural(pieza);
  });
  return pieza;
}

function crearTableroMuralSantuario() {
  tableroMuralSantuario.replaceChildren();
  bandejaMuralSantuario.replaceChildren();
  piezaSeleccionadaMural = null;
  btnRetirarPiezaMural.disabled = true;
  btnRetirarPiezaMural.disabled = true;
  btnRetirarPiezaMural.disabled = true;

  for (let indice = 0; indice < 9; indice += 1) {
    const espacio = document.createElement("div");
    espacio.className = "espacio-mural-santuario";
    espacio.dataset.indice = `${indice}`;
    espacio.setAttribute("role", "gridcell");
    espacio.setAttribute("tabindex", "0");
    espacio.setAttribute("aria-label", `Espacio ${indice + 1}, vacío`);
    espacio.addEventListener("click", () => intentarEncajarPiezaMural(espacio));
    espacio.addEventListener("keydown", (evento) => {
      if (evento.key !== "Enter" && evento.key !== " ") return;
      evento.preventDefault();
      intentarEncajarPiezaMural(espacio);
    });
    tableroMuralSantuario.appendChild(espacio);
  }

  const orden = mezclarPiezasMural(Array.from({ length: 9 }, (_, indice) => indice));
  orden.forEach((indice) => bandejaMuralSantuario.appendChild(crearPiezaMuralSantuario(indice)));
}

function seleccionarPiezaMural(pieza) {
  if (!rompecabezasMuralActivo) return;

  piezaSeleccionadaMural?.classList.remove("seleccionada");
  piezaSeleccionadaMural = piezaSeleccionadaMural === pieza ? null : pieza;
  piezaSeleccionadaMural?.classList.add("seleccionada");
  btnRetirarPiezaMural.disabled = !piezaSeleccionadaMural?.closest(
    ".espacio-mural-santuario",
  );
  estadoMuralSantuario.textContent = piezaSeleccionadaMural
    ? `Fragmento ${Number(pieza.dataset.indice) + 1} seleccionado. Elegí un espacio para moverlo o intercambiarlo.`
    : `${contarEspaciosMuralOcupados()} de 9 espacios ocupados`;
}

function iniciarArrastrePiezaMural(evento) {
  const pieza = evento.currentTarget;
  if (!rompecabezasMuralActivo || evento.button !== 0) return;

  evento.preventDefault();
  const idPuntero = evento.pointerId;
  const origen = pieza.closest(".espacio-mural-santuario");
  const rectangulo = pieza.getBoundingClientRect();
  const desfaseX = evento.clientX - rectangulo.left;
  const desfaseY = evento.clientY - rectangulo.top;
  const inicioX = evento.clientX;
  const inicioY = evento.clientY;
  let seMovio = false;
  let fantasma = null;

  pieza.setPointerCapture?.(idPuntero);

  const mover = (movimiento) => {
    if (movimiento.pointerId !== idPuntero) return;
    if (Math.hypot(movimiento.clientX - inicioX, movimiento.clientY - inicioY) > 6) {
      if (!seMovio) {
        seMovio = true;
        fantasma = crearFantasmaArrastreMural(pieza, rectangulo);
        pieza.classList.add("origen-arrastre");
      }
    }
    if (!seMovio) return;
    fantasma.style.left = `${movimiento.clientX - desfaseX}px`;
    fantasma.style.top = `${movimiento.clientY - desfaseY}px`;
  };

  const soltar = (fin) => {
    if (fin.pointerId !== idPuntero) return;
    window.removeEventListener("pointermove", mover);
    window.removeEventListener("pointerup", soltar);
    window.removeEventListener("pointercancel", cancelar);
    pieza.releasePointerCapture?.(idPuntero);

    if (!seMovio) {
      seleccionarPiezaMural(pieza);
      return;
    }

    const objetivo = document.elementFromPoint(fin.clientX, fin.clientY);
    const espacio = objetivo?.closest?.(".espacio-mural-santuario");
    const soltoEnBandeja = Boolean(
      objetivo?.closest?.(".bandeja-mural-santuario"),
    );
    limpiarFantasmaArrastreMural(pieza, fantasma);

    if (espacio) {
      intentarEncajarPiezaMural(espacio, pieza, origen);
      return;
    }

    if (soltoEnBandeja && origen) {
      retirarPiezaMuralSantuario(pieza, origen);
    }
  };

  const cancelar = (cancelacion) => {
    if (cancelacion.pointerId !== idPuntero) return;
    window.removeEventListener("pointermove", mover);
    window.removeEventListener("pointerup", soltar);
    window.removeEventListener("pointercancel", cancelar);
    pieza.releasePointerCapture?.(idPuntero);
    limpiarFantasmaArrastreMural(pieza, fantasma);
  };

  window.addEventListener("pointermove", mover);
  window.addEventListener("pointerup", soltar);
  window.addEventListener("pointercancel", cancelar);
}

function crearFantasmaArrastreMural(pieza, rectangulo) {
  const fantasma = pieza.cloneNode(true);
  fantasma.classList.remove("seleccionada", "colocada", "origen-arrastre");
  fantasma.classList.add("arrastrando");
  fantasma.removeAttribute("aria-label");
  fantasma.setAttribute("aria-hidden", "true");
  fantasma.tabIndex = -1;
  fantasma.style.width = `${rectangulo.width}px`;
  fantasma.style.height = `${rectangulo.height}px`;
  document.body.appendChild(fantasma);
  return fantasma;
}

function limpiarFantasmaArrastreMural(pieza, fantasma) {
  pieza.classList.remove("origen-arrastre");
  fantasma?.remove();
}

function limpiarEstilosArrastrePiezaMural(pieza) {
  pieza.classList.remove("arrastrando");
  pieza.style.removeProperty("width");
  pieza.style.removeProperty("height");
  pieza.style.removeProperty("left");
  pieza.style.removeProperty("top");
}

function intentarEncajarPiezaMural(
  espacio,
  pieza = piezaSeleccionadaMural,
  origenArrastre = null,
) {
  if (!rompecabezasMuralActivo || !pieza) return;

  const origen = origenArrastre || pieza.closest(".espacio-mural-santuario");
  if (origen === espacio) {
    limpiarSeleccionPiezaMural();
    return;
  }

  const ocupante = espacio.querySelector(":scope > .pieza-mural-santuario");
  limpiarEstilosArrastrePiezaMural(pieza);
  pieza.classList.remove("seleccionada");
  pieza.classList.add("colocada");

  if (ocupante && ocupante !== pieza) {
    if (origen) {
      origen.appendChild(ocupante);
      actualizarEspacioMural(origen);
    } else {
      ocupante.classList.remove("colocada");
      bandejaMuralSantuario.appendChild(ocupante);
    }
  }

  espacio.appendChild(pieza);
  actualizarEspacioMural(espacio);
  if (origen && origen !== espacio) actualizarEspacioMural(origen);
  limpiarSeleccionPiezaMural();
  reproducirSonido("colocarPieza");
  evaluarSolucionMuralSantuario();
}

function actualizarEspacioMural(espacio) {
  const ocupado = Boolean(
    espacio.querySelector(":scope > .pieza-mural-santuario"),
  );
  espacio.classList.toggle("ocupado", ocupado);
  espacio.setAttribute(
    "aria-label",
    `Espacio ${Number(espacio.dataset.indice) + 1}, ${ocupado ? "ocupado" : "vacío"}`,
  );
}

function limpiarSeleccionPiezaMural() {
  piezaSeleccionadaMural?.classList.remove("seleccionada");
  piezaSeleccionadaMural = null;
  btnRetirarPiezaMural.disabled = true;
}

function retirarPiezaMuralSantuario(
  pieza = piezaSeleccionadaMural,
  origenArrastre = null,
) {
  if (!rompecabezasMuralActivo || !pieza) return;

  const origen = origenArrastre || pieza.closest(".espacio-mural-santuario");
  limpiarEstilosArrastrePiezaMural(pieza);
  pieza.classList.remove("colocada", "seleccionada");
  bandejaMuralSantuario.appendChild(pieza);
  if (origen) actualizarEspacioMural(origen);
  limpiarSeleccionPiezaMural();
  estadoMuralSantuario.textContent = `${contarEspaciosMuralOcupados()} de 9 espacios ocupados`;
}

function evaluarSolucionMuralSantuario() {
  const espacios = [...tableroMuralSantuario.querySelectorAll(".espacio-mural-santuario")];
  const ocupadas = contarEspaciosMuralOcupados();
  estadoMuralSantuario.textContent = `${ocupadas} de 9 espacios ocupados`;

  if (ocupadas < 9) return;

  const resuelto = espacios.every((espacio) => {
    const pieza = espacio.querySelector(":scope > .pieza-mural-santuario");
    return pieza?.dataset.indice === espacio.dataset.indice;
  });

  if (resuelto) {
    completarRompecabezasMuralSantuario();
  } else {
    estadoMuralSantuario.textContent =
      "El mural aún no despierta. Reordená los fragmentos hasta revelar al dragón.";
  }
}

function contarEspaciosMuralOcupados() {
  return tableroMuralSantuario.querySelectorAll(
    ".espacio-mural-santuario > .pieza-mural-santuario",
  ).length;
}

function mostrarAyudaMuralSantuario() {
  if (!rompecabezasMuralActivo) return;

  clearTimeout(temporizadorAyudaMural);
  tableroMuralSantuario.classList.add("guia-activa");
  btnAyudaMuralSantuario.disabled = true;
  estadoMuralSantuario.textContent = "La imagen completa se mostrará durante unos segundos.";
  temporizadorAyudaMural = setTimeout(() => {
    tableroMuralSantuario.classList.remove("guia-activa");
    btnAyudaMuralSantuario.disabled = false;
    estadoMuralSantuario.textContent = `${contarEspaciosMuralOcupados()} de 9 espacios ocupados`;
    temporizadorAyudaMural = null;
  }, 3200);
}

function completarRompecabezasMuralSantuario() {
  tableroMuralSantuario.classList.remove("guia-activa");
  tableroMuralSantuario.classList.add("completo");
  btnAyudaMuralSantuario.disabled = true;
  btnRetirarPiezaMural.disabled = true;
  btnSalirMuralSantuario.disabled = true;
  estadoMuralSantuario.textContent = "¡El mural del guardián ha despertado!";
  reproducirSecuenciaSonidos(["piedra", "victoria"]);
  setTimeout(() => cerrarRompecabezasMuralSantuario(true), 1800);
}

function abrirRompecabezasMuralSantuario() {
  if (rompecabezasMuralActivo) return Promise.resolve(false);

  rompecabezasMuralActivo = true;
  focoPrevioMural = document.activeElement;
  crearTableroMuralSantuario();
  tableroMuralSantuario.classList.remove("completo", "guia-activa");
  btnAyudaMuralSantuario.disabled = false;
  btnRetirarPiezaMural.disabled = true;
  btnSalirMuralSantuario.disabled = false;
  estadoMuralSantuario.textContent = "0 de 9 espacios ocupados";
  modalMuralSantuario.classList.remove("oculto");
  pantallaJuego.classList.add("rompecabezas-mural-activo");
  bandejaMuralSantuario.querySelector(".pieza-mural-santuario")?.focus();

  return new Promise((resolve) => {
    resolverRompecabezasMural = resolve;
  });
}

function cerrarRompecabezasMuralSantuario(completado) {
  if (!rompecabezasMuralActivo) return;

  clearTimeout(temporizadorAyudaMural);
  temporizadorAyudaMural = null;
  rompecabezasMuralActivo = false;
  modalMuralSantuario.classList.add("oculto");
  pantallaJuego.classList.remove("rompecabezas-mural-activo");
  piezaSeleccionadaMural = null;
  focoPrevioMural?.focus?.();
  focoPrevioMural = null;
  const resolver = resolverRompecabezasMural;
  resolverRompecabezasMural = null;
  resolver?.(completado);
}

async function completarSantuarioConMural() {
  if (cinematicaSantuarioActiva || rompecabezasMuralActivo) return;

  if (!muralSantuarioCompletado) {
    const completado = await abrirRompecabezasMuralSantuario();
    if (!completado) return;
    muralSantuarioCompletado = true;
    guardarProgreso();
  }

  await completarSantuarioConCinematica();
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
      await ejecutarDespertarDragonSantuario();
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

async function probarDespertarDragonSantuario() {
  if (cinematicaSantuarioActiva) return;

  cinematicaSantuarioActiva = true;
  const secuenciaNarrativa = iniciarSecuenciaNarrativa();
  pantallaJuego.classList.add("cinematica-santuario-activa");

  try {
    await ejecutarDespertarDragonSantuario();
  } finally {
    limpiarCinematicaSantuario();
    finalizarSecuenciaNarrativa(secuenciaNarrativa);
  }
}

async function ejecutarDespertarDragonSantuario() {
  detenerAmbienteCristal();

  const capa = document.createElement("div");
  const destello = document.createElement("div");
  const dialogo = document.createElement("div");
  const nombre = document.createElement("strong");
  const texto = document.createElement("p");
  const planos = [
    ["rompe-mural", "assets/images/elements/dragon-guardian-rompe-mural.png"],
    ["despierto", "assets/images/elements/dragon-guardian-despierto.png"],
    ["entrega-cristal", "assets/images/elements/dragon-guardian-entrega-cristal.png"],
  ].map(([nombrePlano, src]) => {
    const plano = document.createElement("img");
    plano.className = `plano-despertar-dragon plano-${nombrePlano}`;
    plano.alt = "";
    plano.draggable = false;
    plano.src = src;
    capa.appendChild(plano);
    return plano;
  });

  capa.className = "cinematica-despertar-dragon";
  destello.className = "destello-despertar-dragon";
  dialogo.className = "dialogo-despertar-dragon";
  dialogo.setAttribute("role", "status");
  dialogo.setAttribute("aria-live", "polite");
  nombre.textContent = "GUARDIÁN DEL BOSQUE";
  texto.textContent =
    "Has reconstruido el sello y superado las pruebas del bosque.";
  dialogo.append(nombre, texto);
  capa.append(destello, dialogo);
  contenedorEscenario.appendChild(capa);
  personajeImagen.classList.add("oculto-cinematica");

  await Promise.all(planos.map(esperarCargaImagen));

  planos[0].classList.add("visible");
  capa.classList.add("mural-rompiendose");
  reproducirSonido("piedra");
  await esperarMovimiento(1900);

  planos[0].classList.remove("visible");
  planos[1].classList.add("visible");
  capa.classList.add("dragon-liberado");
  dialogo.classList.add("visible");
  reproducirSonido("cristalCasilla");
  await esperarMovimiento(2700);

  texto.textContent =
    "Tu valor demuestra que sos digno. Aceptá el Cristal de la Sabiduría; que su luz guíe tu camino.";
  dialogo.classList.add("segunda-frase");
  await esperarMovimiento(2500);

  planos[1].classList.remove("visible");
  planos[2].classList.add("visible");
  capa.classList.add("cristal-liberado");
  reproducirSonido("diamanteRecolectado");
  await esperarMovimiento(2400);

  dialogo.classList.remove("visible");
  capa.classList.add("saliendo");
  await esperarMovimiento(700);
  capa.remove();
  personajeImagen.classList.remove("oculto-cinematica");
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
    .querySelectorAll(".cinematica-santuario, .cinematica-despertar-dragon")
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

  const promesaCarga = precargarImagen(obtenerSrcExplorador(estado));
  imagenesExploradorPrecargadas.set(estado, promesaCarga);

  return promesaCarga;
}

function precargarImagen(src) {
  const recursoExistente = imagenesPrecargadas.get(src);
  if (recursoExistente) return recursoExistente.promesa;

  const imagen = new Image();
  imagen.decoding = "async";

  const promesa = new Promise((resolve) => {
    let finalizada = false;
    const finalizar = async () => {
      if (finalizada) return;
      finalizada = true;

      if (imagen.naturalWidth > 0 && imagen.decode) {
        await imagen.decode().catch(() => {});
      }

      resolve();
    };

    imagen.addEventListener("load", finalizar, { once: true });
    imagen.addEventListener("error", finalizar, { once: true });
    imagen.src = src;

    if (imagen.complete) void finalizar();
  });

  imagenesPrecargadas.set(src, { imagen, promesa });
  return promesa;
}

function precargarRecursosCriticosMision(
  escenario = escenarioActual,
  mision = misionActual,
) {
  const escena = obtenerEscenaMision(escenario, mision);
  const nombreFondo = obtenerNombreFondoMision(escenario, mision, escena);
  const estadoExplorador = obtenerEstadoBaseExplorador(escenario, mision);

  return Promise.all([
    precargarImagen(`assets/images/fondos/${nombreFondo}`),
    escenario === 0 && mision === 2
      ? precargarImagen("assets/images/elementos/rama-bloqueo-bosque.png")
      : Promise.resolve(),
    cargarImagenExplorador(estadoExplorador),
  ]);
}

function obtenerSiguienteMisionParaPrecarga(escenario, mision) {
  const escenasActuales = escenasPorEscenario[escenario];

  if (mision + 1 < escenasActuales.length) {
    return { escenario, mision: mision + 1 };
  }

  if (escenario + 1 < escenasPorEscenario.length) {
    return { escenario: escenario + 1, mision: 0 };
  }

  return null;
}

async function precargarRecursosSecundariosMision(escenario, mision) {
  await Promise.all(
    ["pensando", "acierto", "desanimado", "celebrando"].map(
      cargarImagenExplorador,
    ),
  );

  const escenaActual = obtenerEscenaMision(escenario, mision);
  const siguienteMision = obtenerSiguienteMisionParaPrecarga(escenario, mision);
  const rutas = escenaActual.fondos.map(
    (nombre) => `assets/images/fondos/${nombre}`,
  );

  if (siguienteMision) {
    const siguienteEscena = obtenerEscenaMision(
      siguienteMision.escenario,
      siguienteMision.mision,
    );
    rutas.push(
      ...siguienteEscena.fondos.map(
        (nombre) => `assets/images/fondos/${nombre}`,
      ),
    );
  }

  rutas.push(...obtenerSpritesCaminata(escenario));

  if (escenario === 0 && mision >= 7) {
    rutas.push(...obtenerSpritesCaminata(escenario, "portal"));
  }

  await Promise.all(rutas.map(precargarImagen));

  if (escenario === 0 && mision >= 8) {
    precargarRecursosCinematicaSantuario();
  }
}

function programarPrecargaRecursosSecundarios() {
  const escenario = escenarioActual;
  const mision = misionActual;

  setTimeout(() => {
    void precargarRecursosSecundariosMision(escenario, mision);
  }, 700);
}

function precargarImagenesHojas() {
  [1, 2].forEach((numero) => {
    void precargarImagen(
      `assets/images/elementos/hoja-${numero}.png?v=20260717-hojas-transparentes-1`,
    );
  });
}

function precargarRecursosCinematicaSantuario() {
  [
    "explorador-acercandose-cristal.png",
    "explorador-brazo-extendido.png",
    "explorador-sosteniendo-cristal.png",
    "cristal-sabiduria-esmeralda.png",
  ].forEach((nombre) => {
    void precargarImagen(`assets/images/elements/${nombre}`);
  });
}
