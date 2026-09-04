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
const ranuraCristalCumbres = document.getElementById("ranuraCristalCumbres");
const cristalPanelCumbres = document.getElementById("cristalPanelCumbres");
const ranuraCristalHielo = document.getElementById("ranuraCristalHielo");
const cristalPanelHielo = document.getElementById("cristalPanelHielo");
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
const pantallaArcade = document.getElementById("pantallaArcade");
const marcoVersus = document.getElementById("marcoVersus");

const btnJugar = document.getElementById("btnJugar");
const btnVersus = document.getElementById("btnVersus");
const btnArcade = document.getElementById("btnArcade");
const btnSalirArcade = document.getElementById("btnSalirArcade");
const btnSalirArcadeVertical = document.getElementById("btnSalirArcadeVertical");
const pisosArcade = document.getElementById("pisosArcade");
const estadoArcade = document.getElementById("estadoArcade");
const etiquetaPisoArcade = document.getElementById("etiquetaPisoArcade");
const imagenRivalArcade = document.getElementById("imagenRivalArcade");
const nombreRivalArcade = document.getElementById("nombreRivalArcade");
const habilidadRivalArcade = document.getElementById("habilidadRivalArcade");
const dificultadArcade = document.getElementById("dificultadArcade");
const btnCombatirArcade = document.getElementById("btnCombatirArcade");
const btnTutorialVersus = document.getElementById("btnTutorialVersus");
const modalTutorialVersus = document.getElementById("modalTutorialVersus");
const bienvenidaTutorialVersus = document.getElementById("bienvenidaTutorialVersus");
const pasoTutorialVersus = document.getElementById("pasoTutorialVersus");
const progresoTutorialVersus = document.getElementById("progresoTutorialVersus");
const btnCerrarTutorialVersus = document.getElementById("btnCerrarTutorialVersus");
const btnComenzarTutorialVersus = document.getElementById("btnComenzarTutorialVersus");
const btnOmitirTutorialVersus = document.getElementById("btnOmitirTutorialVersus");
const escenaTutorialVersus = document.getElementById("escenaTutorialVersus");
const numeroPasoTutorialVersus = document.getElementById("numeroPasoTutorialVersus");
const tituloPasoTutorialVersus = document.getElementById("tituloPasoTutorialVersus");
const descripcionPasoTutorialVersus = document.getElementById("descripcionPasoTutorialVersus");
const accionPasoTutorialVersus = document.getElementById("accionPasoTutorialVersus");
const btnSiguienteTutorialVersus = document.getElementById("btnSiguienteTutorialVersus");
const palabraTutorialVersus = document.getElementById("palabraTutorialVersus");
const temaTutorialVersus = document.getElementById("temaTutorialVersus");
const intentosTutorialVersus = document.getElementById("intentosTutorialVersus");
const corazonesRivalTutorialVersus = document.getElementById("corazonesRivalTutorialVersus");
const corazonesJugadorTutorialVersus = document.getElementById("corazonesJugadorTutorialVersus");
const tecladoTutorialVersus = document.getElementById("tecladoTutorialVersus");
const btnCargaTutorialVersus = document.getElementById("btnCargaTutorialVersus");
const barraCargaTutorialVersus = document.getElementById("barraCargaTutorialVersus");
const btnHabilidadTutorialVersus = document.getElementById("btnHabilidadTutorialVersus");
const impactoTutorialVersus = document.getElementById("impactoTutorialVersus");
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
const estadoCuentaVersus = document.getElementById("estadoCuentaVersus");
const registroCuentaVersus = document.getElementById("registroCuentaVersus");
const correoCuentaVersus = document.getElementById("correoCuentaVersus");
const btnGuardarCuentaVersus = document.getElementById("btnGuardarCuentaVersus");
const btnEntrarCuentaVersus = document.getElementById("btnEntrarCuentaVersus");
const btnGoogleCuentaVersus = document.getElementById("btnGoogleCuentaVersus");
const crearPerfilVersus = document.getElementById("crearPerfilVersus");
const aliasPerfilVersus = document.getElementById("aliasPerfilVersus");
const btnGuardarPerfilVersus = document.getElementById("btnGuardarPerfilVersus");
const contenidoAmigosVersus = document.getElementById("contenidoAmigosVersus");
const codigoAmigoVersus = document.getElementById("codigoAmigoVersus");
const btnCopiarCodigoAmigoVersus = document.getElementById("btnCopiarCodigoAmigoVersus");
const formAgregarAmigoVersus = document.getElementById("formAgregarAmigoVersus");
const codigoNuevoAmigoVersus = document.getElementById("codigoNuevoAmigoVersus");
const solicitudesAmigosVersus = document.getElementById("solicitudesAmigosVersus");
const invitacionesVersus = document.getElementById("invitacionesVersus");
const listaAmigosVersus = document.getElementById("listaAmigosVersus");
const mensajeAmigosVersus = document.getElementById("mensajeAmigosVersus");
const btnSalirSeleccionPersonajeVersus = document.getElementById(
  "btnSalirSeleccionPersonajeVersus",
);
const btnSalirSeleccionPersonajeVersusVertical = document.getElementById(
  "btnSalirSeleccionPersonajeVersusVertical",
);
const btnConfirmarPersonajeVersus = document.getElementById(
  "btnConfirmarPersonajeVersus",
);
const etiquetaSeleccionPersonajeVersus = document.getElementById("etiquetaSeleccionPersonajeVersus");
const tituloSeleccionPersonajeVersus = document.getElementById("tituloSeleccionPersonajeVersus");
const detalleSeleccionPersonajeVersus = document.getElementById("detalleSeleccionPersonajeVersus");
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
const btnsFijarPalabrasVersus = [...document.querySelectorAll(".btn-fijar-palabra-versus")];
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
const vistaImpactoRivalVersus = document.getElementById("vistaImpactoRivalVersus");
const nombreImpactoRivalVersus = document.getElementById("nombreImpactoRivalVersus");
const miniTecladoRivalVersus = document.getElementById("miniTecladoRivalVersus");
const detalleImpactoRivalVersus = document.getElementById("detalleImpactoRivalVersus");
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
const latigazoTintaKalamoVersus = document.getElementById("latigazoTintaKalamoVersus");
const agujaTiempoKairosVersus = document.getElementById("agujaTiempoKairosVersus");
const congelacionNivorVersus = document.getElementById("congelacionNivorVersus");
const teclasRotasVersus = document.getElementById("teclasRotasVersus");
const hurtoTeclasKalamoVersus = document.getElementById("hurtoTeclasKalamoVersus");
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
const btnProbarCinematicaKalamo = document.getElementById("btnProbarCinematicaKalamo");
const btnProbarCinematicaKairos = document.getElementById("btnProbarCinematicaKairos");
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
const victimaLibroKalamoVersus = document.getElementById("victimaLibroKalamoVersus");
const pantallaRotaKalamoVersus = document.getElementById("pantallaRotaKalamoVersus");
const kairosFinalConceptoVersus = document.getElementById("kairosFinalConceptoVersus");
const kairosFinalMontajeVersus = document.createElement("img");
kairosFinalMontajeVersus.id = "kairosFinalMontajeVersus";
kairosFinalMontajeVersus.className = "kairos-final-montaje";
kairosFinalMontajeVersus.alt = "";
kairosFinalConceptoVersus.after(kairosFinalMontajeVersus);
const victimaKairosVersus = document.getElementById("victimaKairosVersus");
const victimaKairosEnvejecidaVersus = document.getElementById("victimaKairosEnvejecidaVersus");
const victimaKairosAncianaVersus = document.getElementById("victimaKairosAncianaVersus");
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
const btnProbarPruebaBosque = document.getElementById("btnProbarPruebaBosque");
const btnProbarEscenaPersonaje = document.getElementById("btnProbarEscenaPersonaje");
const btnProbarMuralSantuario = document.getElementById("btnProbarMuralSantuario");
const modalMuralSantuario = document.getElementById("modalMuralSantuario");
const tableroMuralSantuario = document.getElementById("tableroMuralSantuario");
const bandejaMuralSantuario = document.getElementById("bandejaMuralSantuario");
const estadoMuralSantuario = document.getElementById("estadoMuralSantuario");
const btnAyudaMuralSantuario = document.getElementById("btnAyudaMuralSantuario");
const btnRetirarPiezaMural = document.getElementById("btnRetirarPiezaMural");
const btnSalirMuralSantuario = document.getElementById("btnSalirMuralSantuario");
const modalPruebaBosque = document.getElementById("modalPruebaBosque");
const etiquetaPruebaBosque = document.getElementById("etiquetaPruebaBosque");
const tituloPruebaBosque = document.getElementById("tituloPruebaBosque");
const instruccionPruebaBosque = document.getElementById("instruccionPruebaBosque");
const puzzleRamasDeslizante = document.getElementById("puzzleRamasDeslizante");
const tableroRamasDeslizante = document.getElementById("tableroRamasDeslizante");
const puzzleMemoriaLobos = document.getElementById("puzzleMemoriaLobos");
const escenaMemoriaLobos = document.getElementById("escenaMemoriaLobos");
const botonesMemoriaLobos = [...escenaMemoriaLobos.querySelectorAll(".lobo-memoria")];
const progresoMemoriaLobos = document.getElementById("progresoMemoriaLobos");
const puzzleVientosDesierto = document.getElementById("puzzleVientosDesierto");
let botonesVientosDesierto = [];
const puzzleOasisDesierto = document.getElementById("puzzleOasisDesierto");
const botonesOasisDesierto = [...document.querySelectorAll(".oasis-opcion")];
const pistaOasisDesierto = document.getElementById("pistaOasisDesierto");
const puzzleEspejosDesierto = document.getElementById("puzzleEspejosDesierto");
const rutaLuzEspejos = document.getElementById("rutaLuzEspejos");
const botonesEspejosDesierto = [...document.querySelectorAll(".espejo-solar")];
const puzzleCumbres = document.createElement("div");
puzzleCumbres.id = "puzzleCumbres";
puzzleCumbres.className = "puzzle-cumbres oculto";
puzzleCumbres.setAttribute("role", "grid");
puzzleCumbres.setAttribute("aria-label", "Prueba de Cumbres Celestes");
puzzleEspejosDesierto.insertAdjacentElement("afterend", puzzleCumbres);
let botonesPuzzleCumbres = [];
let inicioSeleccionSopaCumbres = null;
let trayectoSeleccionSopaCumbres = [];
let palabrasEncontradasSopaCumbres = new Set();
let rondaCampanasCumbresActual = 0;
let campanaReliquiaCumbres = 0;
let campanasCumbresAceptando = false;
let secuenciaCampanasCumbres = 0;
let rondaSellosCumbres = 0;
let indicesSellosCumbres = [];
let secuenciaPistaSellosCumbres = 0;
let cuadroLaberintoHielo = null;
let escuchandoInclinacionLaberinto = false;
let controlesLaberintoHielo = { x: 0, y: 0 };
let inclinacionLaberintoHielo = { x: 0, y: 0 };
let laberintoHieloCompletado = false;
let estadosCorazonTermico = [];
let movimientosCorazonTermico = 0;
const estadoPruebaBosque = document.getElementById("estadoPruebaBosque");
const btnRepetirPruebaBosque = document.getElementById("btnRepetirPruebaBosque");
const btnSalirPruebaBosque = document.getElementById("btnSalirPruebaBosque");
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
const ranuraCristalDesierto = document.getElementById("ranuraCristalDesierto");
const cristalPanelDesierto = document.getElementById("cristalPanelDesierto");
const modalHistoria = document.getElementById("modalHistoria");
const imagenSoporteMision = document.getElementById("imagenSoporteMision");
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
const musicaMuralDragon = new Audio("assets/sounds/mural-dragon1.mp3");
const musicaCaminaPortal = new Audio("assets/sounds/camina-al-portal.mp3");
const musicaSegundoCristal = new Audio("assets/sounds/recibe-2-diamante.mp3");
const musicaCinematicaFinalMundo3 = new Audio(
  "assets/sounds/cinematica-final-mundo3.mp3",
);
musicaMuralDragon.loop = false;
musicaMuralDragon.volume = 0.58;
musicaMuralDragon.preload = "auto";
musicaCaminaPortal.loop = false;
musicaCaminaPortal.volume = 0.62;
musicaCaminaPortal.preload = "auto";
musicaSegundoCristal.loop = false;
musicaSegundoCristal.volume = 0.52;
musicaSegundoCristal.preload = "auto";
musicaCinematicaFinalMundo3.loop = false;
musicaCinematicaFinalMundo3.volume = 0.58;
musicaCinematicaFinalMundo3.preload = "auto";
Object.values(sonidos).forEach((sonido) => {
  sonido.preload = "none";
});
sonidoComenzarAventura.preload = "auto";
sonidoSeleccionPersonaje.preload = "auto";

function reproducirMusicaCinematica(musica, nombre, volumen) {
  if (!musica.paused && !musica.ended) return;

  musica.currentTime = 0;
  musica.volume = volumen;
  musica.play().catch((error) => {
    logAudio(`${nombre} bloqueada`, error);
  });
}

function detenerMusicaCinematica(musica, volumen) {
  musica.pause();
  musica.currentTime = 0;
  musica.volume = volumen;
}

let colaSonidos = [];
let audioDesbloqueado = false;
let ambienteActual = "";
let temporizadorCrujidoPuente = null;
const instanciasSonidoVersus = new Set();
let contextoAudioTeclasVersus = null;
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

function reproducirPulsacionTeclaVersus(origen = "jugador") {
  const ConstructorAudio = window.AudioContext || window.webkitAudioContext;
  if (!ConstructorAudio) return;

  contextoAudioTeclasVersus ||= new ConstructorAudio();
  if (contextoAudioTeclasVersus.state === "suspended") {
    void contextoAudioTeclasVersus.resume();
  }

  const ahora = contextoAudioTeclasVersus.currentTime;
  const oscilador = contextoAudioTeclasVersus.createOscillator();
  const ganancia = contextoAudioTeclasVersus.createGain();
  oscilador.type = "triangle";
  oscilador.frequency.setValueAtTime(origen === "rival" ? 185 : 245, ahora);
  oscilador.frequency.exponentialRampToValueAtTime(origen === "rival" ? 118 : 165, ahora + 0.055);
  ganancia.gain.setValueAtTime(0.0001, ahora);
  ganancia.gain.exponentialRampToValueAtTime(origen === "rival" ? 0.075 : 0.055, ahora + 0.006);
  ganancia.gain.exponentialRampToValueAtTime(0.0001, ahora + 0.075);
  oscilador.connect(ganancia);
  ganancia.connect(contextoAudioTeclasVersus.destination);
  oscilador.start(ahora);
  oscilador.stop(ahora + 0.08);
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
  1: crearRutasSpritesCaminata("bosque"),
  2: crearRutasSpritesCaminata("bosque"),
  3: crearRutasSpritesCaminata("bosque"),
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
      texto: "🌳 Resuelve la palabra para abrir un paso junto al árbol caído.",
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
        "🐺 Superá la prueba de las miradas y enfrentá al Guardián de la Luna.",
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
      texto: "🌌 Demostrá tu valor ante la Guardiana para abrir el Portal de los Mundos.",
    },
  ],
  [
    {
      fondos: ["desierto-1.png"],
      texto:
        "🌵 Descubre la palabra secreta para comenzar tu expedición por el Desierto Perdido.",
    },
    {
      fondos: ["desierto-2.png"],
      texto: "🌪️ Encuentra la palabra para orientarte dentro de la tormenta de arena.",
    },
    {
      fondos: ["desierto-3.png"],
      texto: "🧭 Resuelve la palabra y despierta las Ruinas de los Cuatro Vientos.",
    },
    {
      fondos: ["desierto-4.png"],
      texto: "〰️ Descubre la palabra antes de que la sombra bajo las dunas se acerque.",
    },
    {
      fondos: ["desierto-5.png"],
      texto: "💧 Solo la palabra correcta permitirá distinguir el oasis verdadero.",
    },
    {
      fondos: ["desierto-6.png"],
      texto: "🪄 Resuelve la palabra para descifrar el secreto que conoce Zafir.",
    },
    {
      fondos: ["desierto-7.png"],
      texto: "🏃 Encuentra la palabra y escapa del Devoradunas a través del cañón.",
    },
    {
      fondos: ["desierto-8.png"],
      texto: "☀️ La palabra secreta revelará la entrada del templo enterrado.",
    },
    {
      fondos: ["desierto-9.png"],
      texto: "🏛️ Resuelve la palabra para romper la corrupción de la Cámara del Sol.",
    },
    {
      fondos: ["desierto-10.png"],
      texto: "🪄 Zafir te espera para la prueba final por el Cristal Dorado.",
    },
  ],
  [
    { fondos: ["cumbres-1.png"], texto: "☁️ Descubre la palabra para dar tus primeros pasos más allá de las nubes." },
    { fondos: ["cumbres-2.png"], texto: "🌬️ Haz que el viento recuerde el camino y reconstruya el puente celeste." },
    { fondos: ["cumbres-3.png"], texto: "🐉 Resuelve la palabra antes de que el pequeño guardián vuelva a atacar." },
    { fondos: ["cumbres-4.png"], texto: "🔔 Las campanas del cielo despiertan y anuncian que Nimbus está cerca." },
    { fondos: ["cumbres-5.png"], texto: "🏝️ Ordena las islas a la deriva y encuentra una ruta segura." },
    { fondos: ["cumbres-6.png"], texto: "🪺 La palabra secreta revelará a quién pertenece el nido vacío." },
    { fondos: ["cumbres-7.png"], texto: "🔔 Sigue la chispa oculta bajo las campanas para debilitar la tormenta encadenada." },
    { fondos: ["cumbres-8.png"], texto: "🏛️ Los cuatro vientos abrirán el Santuario de la Matriarca." },
    { fondos: ["cumbres-9.png"], texto: "⛓️ Rompe los cuatro sellos y libera a Aeralis de su prisión." },
    { fondos: ["cumbres-10.png"], texto: "🐲 Nimbus te desafía a demostrar que protegerás el Cristal Celeste." },
  ],
  [
    { fondos: ["hielo-1.png"], texto: "🌨️ La ventisca borra el camino mientras una criatura de las nieves cruza las montañas." },
    { fondos: ["hielo-2.png"], texto: "🧊 Recordá las placas seguras y cruzá el lago antes de que el hielo se quiebre." },
    { fondos: ["hielo-3.png"], texto: "🐾 Seguí al zorro boreal y las huellas luminosas entre los árboles de escarcha." },
    { fondos: ["hielo-4-aldea-congelada-v2.png"], texto: "🏘️ Descubrí qué fuerza dejó a los habitantes de una aldea detenidos dentro del hielo." },
    { fondos: ["hielo-5.png"], texto: "🌌 El observatorio boreal conserva la historia del deshielo y del pacto de Nivor." },
    { fondos: ["hielo-6.png"], texto: "🐉 Nivor bloquea el camino: enfrentá al Guardián del Invierno en combate directo." },
    { fondos: ["hielo-7.png"], texto: "🥚 El último huevo boreal revela el verdadero precio del acuerdo con Azrak." },
    { fondos: ["hielo-8.png"], texto: "⚙️ Equilibrá el corazón térmico para detener el invierno eterno." },
    { fondos: ["hielo-9.png"], texto: "🔮 Bajo el glaciar se encuentra la prueba del engaño que inició el desastre." },
    { fondos: ["hielo-10.png"], texto: "❄️ Nivor desata Cero Absoluto en la batalla decisiva por el Cristal Glacial." },
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
  {
    nombre: "☁️ Cumbres Celestes",
    palabras: [
      { palabra: "NUBE", pista: "Flota en el cielo y puede traer lluvia." },
      { palabra: "VIENTO", pista: "Mueve las banderas y guía los puentes celestes." },
      { palabra: "CIMA", pista: "Es la parte más alta de una montaña." },
      { palabra: "AGUILA", pista: "Ave de gran vista que vuela entre las cumbres." },
      { palabra: "RAYO", pista: "Descarga brillante que nace en una tormenta." },
      { palabra: "ALTURA", pista: "Distancia que separa algo del suelo." },
      { palabra: "TEMPLO", pista: "Edificio antiguo dedicado a un poder sagrado." },
      { palabra: "ISLA", pista: "Tierra rodeada de agua... o de nubes." },
      { palabra: "TORMENTA", pista: "Trae viento, nubes oscuras, lluvia y rayos." },
      { palabra: "CRISTAL", pista: "Tesoro luminoso que equilibra cada mundo." },
    ],
  },
  {
    nombre: "❄️ Reino del Invierno Eterno",
    palabras: [
      { palabra: "NIEVE", pista: "Cae del cielo en pequeños copos blancos." },
      { palabra: "HIELO", pista: "Es agua congelada y puede ser muy resbaladiza." },
      { palabra: "GLACIAR", pista: "Enorme masa de hielo que avanza muy lentamente." },
      { palabra: "ESCARCHA", pista: "Capa de pequeños cristales que cubre las superficies frías." },
      { palabra: "AURORA", pista: "Luz de colores que danza en el cielo polar." },
      { palabra: "VENTISCA", pista: "Tormenta de nieve acompañada por viento fuerte." },
      { palabra: "INVIERNO", pista: "Es la estación más fría del año." },
      { palabra: "FORTALEZA", pista: "Construcción protegida y difícil de conquistar." },
      { palabra: "CRISTAL", pista: "Tesoro luminoso que mantiene el equilibrio del mundo." },
      { palabra: "TEMPERATURA", pista: "Indica qué tan frío o caliente está algo." },
    ],
  },
];

const historiaBosque = [
  {
    capitulo: "Misión 1",
    titulo: "El Bosque Encantado",
    texto:
      "Aren, un joven explorador, entra al Bosque Encantado siguiendo un antiguo mapa. La leyenda dice que en lo más profundo del bosque se encuentra el Primer Cristal de la Sabiduría. El sendero parece tranquilo, pero la aventura recién comienza.",
  },
  {
    capitulo: "Misión 2",
    titulo: "La Piedra del Sendero",
    texto:
      "Un fuerte estruendo rompe el silencio. Una enorme roca cae delante de Aren y bloquea el camino. Tendrá que encontrar una nueva forma de continuar su viaje.",
  },
  {
    capitulo: "Misión 3",
    titulo: "El Árbol Caído",
    texto:
      "Mientras rodea la roca, un crujido sacude el bosque. Un árbol antiguo se desploma frente a Aren y atraviesa todo el sendero. Es demasiado grande para saltarlo o rodearlo: tendrá que encontrar la forma de abrirse paso.",
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
    titulo: "El Guardián de la Luna",
    texto:
      "Desde la oscuridad se escuchan los aullidos de varios lobos. Entre los árboles aparece un viajero solitario y le advierte a Aren que la manada sólo dejará pasar a quien comprenda el orden de sus miradas. Hay algo extraño y salvaje oculto en aquel desconocido.",
  },
  {
    capitulo: "Misión 7",
    titulo: "El Bosque Prohibido",
    texto:
      "Los árboles son gigantes y el bosque permanece en un silencio absoluto. Aren siente que está muy cerca de descubrir un antiguo secreto.",
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
      "Aren lleva el Primer Cristal hasta el portal dormido, pero una presencia esmeralda bloquea el paso. La Guardiana del Bosque sólo permitirá que el cristal despierte el portal si demuestra que es digno de cruzar hacia otros mundos.",
  },
];

const historiaDesierto = [
  {
    capitulo: "Misión 1",
    titulo: "Más allá del portal",
    texto:
      "Aren atraviesa el portal y una ráfaga ardiente lo recibe en el Desierto Perdido. El paso mágico se cierra detrás de él mientras el viento borra sus primeras huellas. Sin posibilidad de regresar, distingue unas ruinas lejanas y comienza la búsqueda del Cristal Dorado.",
  },
  {
    capitulo: "Misión 2",
    titulo: "La tormenta sin camino",
    texto:
      "Una muralla de arena cubre el horizonte y borra el sendero. Aren protege el mapa mientras avanza entre antiguas piedras señaladoras. Cuando el viento abre un claro, descubre que las ruinas lejanas pertenecen a un observatorio olvidado.",
  },
  {
    capitulo: "Misión 3",
    titulo: "Las ruinas de los cuatro vientos",
    texto:
      "Cuatro obeliscos rodean una plataforma cubierta de arena. Entre ellos aparece una red de canales de piedra capaz de transportar energía solar. Si Aren gira las losas y conduce la luz hasta el núcleo central, el observatorio revelará la ruta hacia el Cristal Dorado.",
  },
  {
    capitulo: "Misión 4",
    titulo: "La sombra bajo las dunas",
    texto:
      "La arena comienza a elevarse como una ola. Una criatura gigantesca viaja bajo las dunas y se dirige hacia Aren. El Devoradunas emerge con un rugido, cubierto por antiguas marcas que brillan con una energía extraña.",
  },
  {
    capitulo: "Misión 5",
    titulo: "El oasis imposible",
    texto:
      "Cuatro oasis aparecen al mismo tiempo, aunque el mapa no señala ninguno. Dentro de uno de los espejismos, un joven mago llamado Zafir pide ayuda. Para liberarlo, Aren deberá descifrar las inscripciones y descubrir qué agua pertenece al mundo real.",
  },
  {
    capitulo: "Misión 6",
    titulo: "El secreto de Zafir",
    texto:
      "Ya libre de la ilusión, Zafir explica que la energía corrupta del templo despertó al Devoradunas. En una caravana enterrada encuentran provisiones y la última señal del camino. Desde ahora continuarán la expedición juntos.",
  },
  {
    capitulo: "Misión 7",
    titulo: "El Devoradunas",
    texto:
      "Las paredes del cañón tiemblan. El gusano los encontró y cada nueva embestida derrumba parte del camino. Aren y Zafir corren hacia la silueta del templo mientras la criatura se aproxima detrás de ellos.",
  },
  {
    capitulo: "Misión 8",
    titulo: "El templo enterrado",
    texto:
      "Una última tormenta retira la arena de la montaña y deja al descubierto una puerta monumental. Cinco espejos solares vinculados rodean el sello. Solo un rayo de luz correctamente dirigido podrá abrir la entrada.",
  },
  {
    capitulo: "Misión 9",
    titulo: "La cámara del sol",
    texto:
      "En el corazón del templo, raíces oscuras envuelven la cámara del cristal. El Devoradunas irrumpe a través del muro, pero Zafir reconoce las mismas marcas corruptas sobre su armadura. La criatura también es prisionera de esa fuerza.",
  },
  {
    capitulo: "Misión 10",
    titulo: "La prueba de Zafir",
    texto:
      "Al romperse la corrupción, el Devoradunas recupera la calma y revela el Cristal Dorado bajo la arena. Antes de entregarlo, Zafir propone una última batalla de palabras: quiere comprobar que Aren está preparado para llevar el cristal al siguiente mundo.",
  },
];

const historiaCumbres = [
  { capitulo: "Misión 1", titulo: "Más allá de las nubes", texto: "El portal deposita a Aren sobre una isla suspendida en un océano de nubes. A lo lejos, una tormenta imposible rodea las ruinas de Cumbres Celestes y el camino de regreso se desvanece." },
  { capitulo: "Misión 2", titulo: "El puente que olvidó el viento", texto: "Los fragmentos de un puente antiguo flotan fuera de lugar. Sus canales de aire aún conservan magia: si vuelven a orientarse, el viento podrá reconstruir el paso." },
  { capitulo: "Misión 3", titulo: "El pequeño guardián", texto: "Un dragoncito azul desciende desde las alturas. Se llama Nimbus y, convencido de que Aren viene a robar el cristal de su familia, defiende el sendero con un rugido mucho más valiente que feroz." },
  { capitulo: "Misión 4", titulo: "Las campanas del cielo", texto: "Nimbus desaparece entre las nubes. Para seguirlo, Aren debe hallar la chispa celeste que abre las corrientes del firmamento. Tres campanas de cristal cambian de lugar para protegerla." },
  { capitulo: "Misión 5", titulo: "Islas a la deriva", texto: "La tormenta desordena las islas y amenaza con hacerlas chocar. Sus sombras y corrientes revelan un orden seguro, pero habrá que actuar antes de que el camino vuelva a separarse." },
  { capitulo: "Misión 6", titulo: "El nido vacío", texto: "En un refugio oculto aparece un nido pequeño, juguetes tallados y restos de un cascarón. El temible guardián no es más que una cría que intenta encontrar a su madre desaparecida." },
  { capitulo: "Misión 7", titulo: "La tormenta encadenada", texto: "Nimbus regresa y acepta la ayuda de Aren. Juntos atraviesan los rayos que encadenan la tormenta y buscan el camino seguro hacia el santuario de la Matriarca." },
  { capitulo: "Misión 8", titulo: "El santuario de la Matriarca", texto: "Tras cruzar la tormenta llegan al santuario de Aeralis, Matriarca del Firmamento. Cuatro puertas, una por cada viento, protegen la cámara donde fue sellada." },
  { capitulo: "Misión 9", titulo: "La prisión del firmamento", texto: "Aeralis utilizó el Cristal Celeste para contener una tormenta corrupta, pero quedó atrapada dentro de ella. Aren y Nimbus deben romper los cuatro sellos sin liberar la oscuridad que contienen." },
  { capitulo: "Misión 10", titulo: "El juramento del pequeño guardián", texto: "Con Aeralis libre, Nimbus comprende que Aren no es un ladrón. Aun así propone una última batalla de palabras: sólo entregará el cristal a quien jure protegerlo en los mundos que faltan." },
];

const historiaHielo = [
  { capitulo: "Misión 1", titulo: "La huella borrada", texto: "Aeralis deja a Aren sobre la nieve y emprende el regreso hacia Cumbres Celestes. Una ventisca repentina borra el camino detrás de él. A lo lejos, un enorme yeti cruza la cresta y desaparece entre la nieve." },
  { capitulo: "Misión 2", titulo: "El lago de cristal", texto: "El sendero termina frente a un lago congelado. Aren sigue las huellas que la ventisca deja ver por instantes y alcanza la otra orilla justo antes de que el hielo comience a resquebrajarse." },
  { capitulo: "Misión 3", titulo: "Las criaturas de la escarcha", texto: "Un zorro boreal de cola cristalina sigue las huellas luminosas que atraviesan el bosque congelado. Las criaturas del lugar están alteradas por una fuerza que convierte ramas, garras y colmillos en cristal." },
  { capitulo: "Misión 4", titulo: "La aldea detenida", texto: "Aren encuentra una aldea completa atrapada dentro del hielo. Sus habitantes permanecen inmóviles bajo la escarcha, los faroles aún brillan y los relojes se detuvieron al mismo tiempo. En una torre aparece una marca oscura que no pertenece a Nivor." },
  { capitulo: "Misión 5", titulo: "El observatorio boreal", texto: "Los instrumentos del observatorio registraron el comienzo del deshielo. Entre sus mapas, Aren descubre que alguien provocó el desastre antes de ofrecerle a Nivor el poder para detenerlo." },
  { capitulo: "Misión 6", titulo: "El Guardián del Invierno", texto: "Nivor desciende sobre el observatorio y acusa a Aren de querer destruir el último refugio de los dragones boreales. No aceptará explicaciones: para continuar, Aren deberá enfrentarlo directamente." },
  { capitulo: "Misión 7", titulo: "El último huevo boreal", texto: "Tras el combate, Aren entra en la fortaleza y encuentra el último huevo de dragón atrapado en un laberinto de hielo negro. Deberá inclinar el antiguo mecanismo y guiarlo con cuidado hasta el nido para liberarlo." },
  { capitulo: "Misión 8", titulo: "El corazón térmico", texto: "Tres núcleos alimentan la tormenta que cubre el reino. Aren deberá equilibrar su energía: demasiado frío congelará el mecanismo y demasiado calor quebrará la fortaleza." },
  { capitulo: "Misión 9", titulo: "La verdad bajo el glaciar", texto: "En la cámara más profunda, Aren encuentra la prueba definitiva: Azrak causó el deshielo y después utilizó el miedo de Nivor para robar energía del Cristal Glacial." },
  { capitulo: "Misión 10", titulo: "Cero Absoluto", texto: "Nivor contempla la prueba, pero aceptar la verdad significaría reconocer todo el daño que causó. Consumido por la culpa y el orgullo, desata Cero Absoluto y desafía a Aren por última vez." },
];

const estadosExploradorPorEscenario = {
  0: [
    "feliz", // El Bosque Encantado
    "nervioso", // La Piedra del Sendero
    "feliz", // El Árbol Caído
    "preocupado", // La Tormenta
    "nervioso", // La Niebla Misteriosa
    "preocupado", // Los Aullidos
    "preocupado", // El Bosque Prohibido
    "nervioso", // El Puente Olvidado
    "feliz", // El Santuario del Cristal
    "feliz", // El Portal de los Mundos
  ],
  1: [
    "nervioso",
    "preocupado",
    "pensando",
    "preocupado",
    "pensando",
    "feliz",
    "preocupado",
    "pensando",
    "preocupado",
    "feliz",
  ],
  2: ["feliz", "pensando", "preocupado", "pensando", "nervioso", "pensando", "preocupado", "feliz", "preocupado", "feliz"],
  3: ["preocupado", "pensando", "nervioso", "preocupado", "pensando", "preocupado", "nervioso", "pensando", "preocupado", "preocupado"],
};

let palabraSecreta = "";
let pistaActual = "";
let letrasElegidas = [];
let palabrasUsadasEnMision = [];
let intentos = 6;
let escenarioActual = 0;
let misionActual = 0;
let monedas = 0;
const claveRecompensasMonedasPendientes = "recompensasMonedasPendientesAventuraGA";

function leerRecompensasMonedasPendientes() {
  try {
    const guardadas = JSON.parse(
      localStorage.getItem(claveRecompensasMonedasPendientes) || "[]",
    );
    return Array.isArray(guardadas) ? guardadas : [];
  } catch (_error) {
    return [];
  }
}

function guardarRecompensasMonedasPendientes(recompensas) {
  try {
    localStorage.setItem(
      claveRecompensasMonedasPendientes,
      JSON.stringify(recompensas),
    );
  } catch (error) {
    console.warn("No se pudo guardar la cola de monedas offline.", error);
  }
}

function crearIdRecompensaMonedas() {
  return globalThis.crypto?.randomUUID?.()
    || `monedas-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function otorgarMonedas(cantidad, origen) {
  const valor = Math.max(0, Math.trunc(Number(cantidad) || 0));
  if (!valor) return;
  monedas += valor;
  if (modoPruebasActivo) return;

  const recompensas = leerRecompensasMonedasPendientes();
  recompensas.push({
    id: crearIdRecompensaMonedas(),
    cantidad: valor,
    origen,
    obtenidaEn: new Date().toISOString(),
  });
  guardarRecompensasMonedasPendientes(recompensas);
}

function confirmarRecompensasMonedasSincronizadas(idsConfirmados = []) {
  const confirmados = new Set(idsConfirmados);
  if (!confirmados.size) return;
  guardarRecompensasMonedasPendientes(
    leerRecompensasMonedasPendientes().filter(({ id }) => !confirmados.has(id)),
  );
}

globalThis.AventuraMonedasOffline = Object.freeze({
  obtenerPendientes: () => leerRecompensasMonedasPendientes().map((item) => ({ ...item })),
  confirmarSincronizadas: confirmarRecompensasMonedasSincronizadas,
});

let experiencia = 0;
let cristalesObtenidos = 0;
let mundoDosCompletado = false;
let mundoTresCompletado = false;
let mundoCuatroCompletado = false;
let primerDueloNivorCompletado = false;
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
let pruebaEspecialBosqueActiva = "";
let estadoTableroRamas = [];
let movimientosPuzzleRamas = 0;
let secuenciaMemoriaLobos = [];
let entradaMemoriaLobos = [];
let rondaMemoriaLobos = 0;
let memoriaLobosAceptandoEntrada = false;
let secuenciaPruebaBosque = 0;
let focoPrevioPruebaBosque = null;
let pruebaBosqueEnModoDemo = false;
let orientacionesVientosDesierto = [];
let tiposCanalesVientoDesierto = [];
let movimientosVientosDesierto = 0;
let oasisVerdaderoDesierto = 0;
let rondaOasisDesierto = 0;
let aciertosOasisDesierto = 0;
let objetivoOasisDesiertoActual = null;
let orientacionesEspejosDesierto = [];
let movimientosEspejosDesierto = 0;
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
let secuenciaLlegadaDesierto = 0;
let resolverIntroduccionMundo2 = null;
let secuenciaNarrativaActual = null;
let secuenciaHistoriaActiva = null;
let secuenciaPrologoActiva = null;
let secuenciaIntroduccionMundoActiva = null;
let modoPruebasActivo = false;
let maximoEscenarioDesbloqueado = 0;
const clavePersonajesDesbloqueados = "personajesDesbloqueadosAventuraGA";
let guardianaDesbloqueada = false;
let magoDesbloqueado = false;
let dragonDesbloqueado = false;
let nivorDesbloqueado = false;
let hombreLoboDescubierto = false;
let dueloAventuraActivo = null;
const desafiosPorMision = 3;
const adaptadorLocalSalasVersus = VersusRoom.crearAdaptadorLocal();
let adaptadorSalasVersus = adaptadorLocalSalasVersus;
let promesaConexionSalasVersus = null;
let cancelarSuscripcionPartidaVersus = null;
let cancelarSuscripcionSocialVersus = null;
let cancelarSuscripcionInvitacionesVersus = null;
let partidaOnlineVersus = null;
let partidaOnlineIniciada = false;
let ultimoEventoPartidaVersus = -1;
let temporizadorVistaImpactoRivalVersus = null;
let pasoActualTutorialVersus = 0;
let accionPosteriorTutorialVersus = null;
let modoArcadeActivo = false;
let rivalesTorreArcade = [];
let pisoActualArcade = 0;
let pisoCombateArcade = 0;
let pisosDesbloqueadosArcade = 0;
let ultimoResultadoArcade = "";
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

    await globalThis.AventuraOnline?.cargarSupabase?.();

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
    cancelarSuscripcionSocialVersus?.();
    cancelarSuscripcionSocialVersus = adaptadorSalasVersus.suscribirSocial(
      actualizarPanelAmigosVersus,
    );
    cancelarSuscripcionInvitacionesVersus?.();
    cancelarSuscripcionInvitacionesVersus = adaptadorSalasVersus
      .suscribirInvitacionesAceptadas((sala) => {
        actualizarEstadoMultijugador(sala);
        abrirSeleccionPersonajeVersus();
      });
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

function mostrarMensajeAmigosVersus(mensaje = "", esError = false) {
  delete mensajeAmigosVersus.dataset.errorConexion;
  mensajeAmigosVersus.textContent = mensaje;
  mensajeAmigosVersus.classList.toggle("error", esError);
}

function crearFilaSocialVersus({ nombre, detalle, acciones = [] }) {
  const fila = document.createElement("article");
  fila.className = "fila-social-versus";
  const textos = document.createElement("div");
  const titulo = document.createElement("strong");
  titulo.textContent = nombre;
  const textoDetalle = document.createElement("small");
  textoDetalle.textContent = detalle;
  textos.append(titulo, textoDetalle);
  const botones = document.createElement("div");
  botones.className = "acciones-fila-social-versus";
  acciones.forEach(({ texto, accion }) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = texto;
    boton.addEventListener("click", () => ejecutarAccionAmigosVersus(accion));
    botones.append(boton);
  });
  fila.append(textos, botones);
  return fila;
}

function actualizarPanelAmigosVersus(
  estado,
  usuario,
  errorSocial = null,
  cuentaPermanente = false,
) {
  const permanente = Boolean(usuario && cuentaPermanente);
  registroCuentaVersus.classList.toggle("oculto", permanente);
  crearPerfilVersus.classList.toggle("oculto", !permanente || Boolean(estado?.profile));
  contenidoAmigosVersus.classList.toggle("oculto", !estado?.profile);
  estadoCuentaVersus.textContent = errorSocial
    ? "Conexión pendiente"
    : permanente
      ? (estado?.profile ? estado.profile.alias : "Cuenta guardada")
    : "Modo invitado";

  if (errorSocial) {
    mensajeAmigosVersus.dataset.errorConexion = "true";
    mensajeAmigosVersus.textContent = `${errorSocial.message} Volvé a abrir Multijugador para reintentar.`;
    mensajeAmigosVersus.classList.add("error");
  } else if (mensajeAmigosVersus.dataset.errorConexion) {
    delete mensajeAmigosVersus.dataset.errorConexion;
    mensajeAmigosVersus.textContent = "";
    mensajeAmigosVersus.classList.remove("error");
  }

  if (!permanente || !estado?.profile) return;
  aliasSalaVersus.value = estado.profile.alias;
  codigoAmigoVersus.textContent = estado.profile.friend_code;
  solicitudesAmigosVersus.replaceChildren();
  invitacionesVersus.replaceChildren();
  listaAmigosVersus.replaceChildren();

  (estado.incoming_requests || []).forEach((solicitud) => {
    solicitudesAmigosVersus.append(crearFilaSocialVersus({
      nombre: `${solicitud.alias} quiere agregarte`,
      detalle: `Código ${solicitud.friend_code}`,
      acciones: [
        { texto: "Aceptar", accion: () => adaptadorSalasVersus.responderSolicitudAmistad(solicitud.id, true) },
        { texto: "Rechazar", accion: () => adaptadorSalasVersus.responderSolicitudAmistad(solicitud.id, false) },
      ],
    }));
  });
  (estado.outgoing_requests || []).forEach((solicitud) => {
    solicitudesAmigosVersus.append(crearFilaSocialVersus({
      nombre: `Solicitud enviada a ${solicitud.alias}`,
      detalle: "Esperando respuesta",
    }));
  });
  (estado.incoming_invites || []).forEach((invitacion) => {
    invitacionesVersus.append(crearFilaSocialVersus({
      nombre: `${invitacion.alias} te desafía`,
      detalle: "Aceptá y la partida comenzará automáticamente",
      acciones: [
        { texto: "Aceptar", accion: () => adaptadorSalasVersus.responderInvitacion(invitacion.id, true) },
        { texto: "Rechazar", accion: () => adaptadorSalasVersus.responderInvitacion(invitacion.id, false) },
      ],
    }));
  });
  (estado.outgoing_invites || []).forEach((invitacion) => {
    invitacionesVersus.append(crearFilaSocialVersus({
      nombre: `Desafío enviado a ${invitacion.alias}`,
      detalle: "Esperando que acepte",
      acciones: [
        { texto: "Cancelar", accion: () => adaptadorSalasVersus.cancelarInvitacion(invitacion.id) },
      ],
    }));
  });
  (estado.friends || []).forEach((amigo) => {
    listaAmigosVersus.append(crearFilaSocialVersus({
      nombre: amigo.alias,
      detalle: `Código ${amigo.friend_code}`,
      acciones: [
        { texto: "Desafiar", accion: () => adaptadorSalasVersus.enviarInvitacion(amigo.user_id) },
        { texto: "Quitar", accion: () => adaptadorSalasVersus.eliminarAmigo(amigo.friendship_id) },
      ],
    }));
  });
  if (!(estado.friends || []).length) {
    listaAmigosVersus.append(crearFilaSocialVersus({
      nombre: "Todavía no agregaste amigos",
      detalle: "Compartí tu código o escribí el de otro jugador",
    }));
  }
}

async function ejecutarAccionAmigosVersus(accion, mensajeExito = "Listo") {
  mostrarMensajeAmigosVersus("Procesando…");
  try {
    await asegurarConexionSalasVersus();
    await accion();
    mostrarMensajeAmigosVersus(mensajeExito);
  } catch (error) {
    mostrarMensajeAmigosVersus(error.message || "No pudimos completar la acción.", true);
  }
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
  actualizarDisponibilidadPersonajesVersus({ seleccionBloqueada: propioListo });
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
  habilitarFijadoresPalabrasVersus(false);
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

function calcularTiempoOnlineVersus(partida, jugador) {
  if (!partida?.deadlineAt || !jugador) return 0;
  if (jugador.finished && jugador.finishReason === "time") return 0;
  const restanteGlobal = (
    Date.parse(partida.deadlineAt) - (Date.now() + desfaseServidorVersus)
  ) / 1000;
  return Math.max(0, Math.ceil(
    restanteGlobal - Number(jugador.timePenaltySeconds || 0),
  ));
}

function actualizarRelojPartidaOnline() {
  if (!partidaOnlineVersus) return;
  const restanteJugador = calcularTiempoOnlineVersus(partidaOnlineVersus, partidaOnlineVersus.me);
  const restanteRival = calcularTiempoOnlineVersus(partidaOnlineVersus, partidaOnlineVersus.opponent);
  demoVersus.tiempoJugador = restanteJugador;
  demoVersus.tiempoRival = restanteRival;
  actualizarTiemposVersus();
  if ((restanteJugador === 0 || restanteRival === 0) && partidaOnlineVersus.status === "playing") {
    void adaptadorSalasVersus.cargarPartida?.();
  }
}

function actualizarTecladoPartidaOnline(partida) {
  const comenzo = Date.now() + desfaseServidorVersus >= Date.parse(partida.startedAt);
  const usadas = new Set(partida.me?.usedLetters || []);
  const efectoBloqueoActivo = ["roots", "black_hole", "key_bounce", "ice_screen", "key_theft"].includes(partida.me?.activeEffect)
    && Date.now() + desfaseServidorVersus < Date.parse(partida.me?.effectExpiresAt || 0);
  const hurtoActivo = partida.me?.activeEffect === "key_theft"
    && Date.now() + desfaseServidorVersus < Date.parse(partida.me?.effectExpiresAt || 0);
  tecladoVersus.querySelectorAll("button").forEach((boton) => {
    boton.disabled = jugadaOnlineEnCurso
      || efectoBloqueoActivo
      || partida.status !== "playing"
      || !comenzo
      || partida.me?.finished
      || calcularTiempoOnlineVersus(partida, partida.me) <= 0
      || (hurtoActivo && demoVersus.teclasRobadasJugador.has(boton.textContent))
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
  demoVersus.palabrasCompletadasJugador = propio.completedWords;
  demoVersus.palabrasCompletadasRival = rival.completedWords;
  demoVersus.ultimaPalabraFalladaJugador = propio.lastFailedWord || "";
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
    : `TU DESAFÍO · ${obtenerNombreTemaVersus(propio.theme).toUpperCase()} ${VersusEngine.obtenerEtiquetaRonda(propio.wordIndex)}`;
  tituloProgresoDos.textContent = rival.finished
    ? "EL RIVAL TERMINÓ"
    : `RIVAL · ${obtenerNombreTemaVersus(rival.theme).toUpperCase()} ${VersusEngine.obtenerEtiquetaRonda(rival.wordIndex)}`;
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
  if (!propio && ["hit", "miss", "word_complete"].includes(evento.type)) {
    reproducirPulsacionTeclaVersus("rival");
  }

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
          } else {
            if (evento.character === "kairos") {
              animarRoboTiempoKairosVersus(false, evento.seconds || 20);
            }
            mostrarVistaImpactoRivalVersus(
              evento.character || personajeJugadorVersus,
              evento.letter || "",
            );
          }
        },
      });
    } else if (evento.character === "explorador") {
      reproducirAnimacionHabilidadVersus("explorador", { desdeRival: true });
    } else if (evento.character === "kairos") {
      reproducirAnimacionHabilidadVersus("kairos", {
        desdeRival: true,
        alImpactar: () => animarRoboTiempoKairosVersus(true, evento.seconds || 20),
      });
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
  const palabraEvento = eventoPrevio?.type === "word_failed" || eventoPrevio?.wordFailed
    ? eventoPrevio.word || ""
    : "";
  const palabraPerdida = ganador === "rival" ? palabraEvento : "";
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
    estadoCuentaVersus.textContent = "Sin conexión";
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

  if (mundoCuatroCompletado) {
    detenerSonidos();
    mostrarPantalla(pantallaMenu);
    actualizarMenuPrincipal();
    return;
  }

  if (mundoTresCompletado && escenarioActual === 2) {
    void entrarAlMundoHielo();
    return;
  }

  if (mundoDosCompletado && escenarioActual === 1) {
    escenarioActual = 2;
    misionActual = 0;
    desafioActual = 1;
    desafiosCompletados = 0;
    palabrasUsadasEnMision = [];
    historiaMisionPendiente = false;
    maximoEscenarioDesbloqueado = Math.max(maximoEscenarioDesbloqueado, 2);
    guardarProgreso();
    void iniciarMisionAventura().then(() => {
      mostrarHistoriaMision({ misionYaCargada: true });
    });
    return;
  }

  if (historiaMisionPendiente) {
    mostrarHistoriaMision();
    return;
  }

  void iniciarMisionAventura();
}

async function entrarAlMundoHielo() {
  escenarioActual = 3;
  misionActual = 0;
  desafioActual = 1;
  desafiosCompletados = 0;
  palabrasUsadasEnMision = [];
  historiaMisionPendiente = false;
  maximoEscenarioDesbloqueado = Math.max(maximoEscenarioDesbloqueado, 3);
  guardarProgreso();
  await reproducirIntroduccionMundoHielo();
  await iniciarMisionAventura({ presentarMision: true });
  mostrarHistoriaMision({ misionYaCargada: true });
}

btnSiguiente.addEventListener("click", continuarAventura);

function seleccionarPersonajeVersus(personaje) {
  if (!personajesVersus[personaje] || !personajeDisponibleVersus(personaje)) return;
  personajeJugadorVersus = personaje;
  tarjetasPersonajesVersus.forEach((tarjeta) => {
    const seleccionada = tarjeta.dataset.personaje === personaje;
    tarjeta.classList.toggle("seleccionada", seleccionada);
    tarjeta.setAttribute("aria-checked", `${seleccionada}`);
  });
  btnConfirmarPersonajeVersus.textContent = `Luchar con ${personajesVersus[personaje].nombre}`;
}

function cargarPersonajesDesbloqueados() {
  try {
    const personajes = JSON.parse(
      localStorage.getItem(clavePersonajesDesbloqueados) || "[]",
    );
    guardianaDesbloqueada = Array.isArray(personajes) && personajes.includes("guardiana");
    magoDesbloqueado = Array.isArray(personajes) && personajes.includes("mago");
    dragonDesbloqueado = Array.isArray(personajes) && personajes.includes("dragon");
    nivorDesbloqueado = Array.isArray(personajes) && personajes.includes("dragon_hielo");
  } catch {
    guardianaDesbloqueada = false;
    magoDesbloqueado = false;
    dragonDesbloqueado = false;
    nivorDesbloqueado = false;
  }
}

function personajeDisponibleVersus(personaje) {
  if (modoPruebasActivo) return true;
  if (personaje === "guardiana") return guardianaDesbloqueada;
  if (personaje === "mago") return magoDesbloqueado;
  if (personaje === "dragon") return dragonDesbloqueado;
  if (personaje === "dragon_hielo") return nivorDesbloqueado;
  return true;
}

function guardarPersonajeDesbloqueado(personaje) {
  if (modoPruebasActivo) return;
  try {
    const personajes = JSON.parse(
      localStorage.getItem(clavePersonajesDesbloqueados) || "[]",
    );
    const desbloqueados = new Set(Array.isArray(personajes) ? personajes : []);
    desbloqueados.add(personaje);
    localStorage.setItem(
      clavePersonajesDesbloqueados,
      JSON.stringify([...desbloqueados]),
    );
  } catch {
    // El personaje permanece desbloqueado durante la sesión actual.
  }
}

function guardarDesbloqueoGuardiana() {
  guardianaDesbloqueada = true;
  guardarPersonajeDesbloqueado("guardiana");
}

function guardarDesbloqueoMago() {
  magoDesbloqueado = true;
  guardarPersonajeDesbloqueado("mago");
}

function guardarDesbloqueoNivor() {
  nivorDesbloqueado = true;
  guardarPersonajeDesbloqueado("dragon_hielo");
}

function actualizarDisponibilidadPersonajesVersus({ seleccionBloqueada = false } = {}) {
  tarjetasPersonajesVersus.forEach((tarjeta) => {
    const disponible = personajeDisponibleVersus(tarjeta.dataset.personaje);
    const estado = tarjeta.querySelector(".estado-personaje-versus");
    tarjeta.classList.toggle("bloqueada", !disponible);
    tarjeta.disabled = seleccionBloqueada || !disponible;
    tarjeta.setAttribute("aria-disabled", `${seleccionBloqueada || !disponible}`);
    if (estado) {
      const mundoRequerido = tarjeta.dataset.personaje === "dragon_hielo"
        ? 4
        : tarjeta.dataset.personaje === "dragon"
          ? 3
        : tarjeta.dataset.personaje === "mago"
          ? 2
          : 1;
      estado.textContent = disponible
        ? "DISPONIBLE"
        : `COMPLETÁ EL MUNDO ${mundoRequerido}`;
    }
  });

  if (!personajeDisponibleVersus(personajeJugadorVersus)) {
    personajeJugadorVersus = "explorador";
  }
}

function abrirSeleccionPersonajeVersus() {
  actualizarDisponibilidadPersonajesVersus();
  seleccionarPersonajeVersus(personajeJugadorVersus);
  etiquetaSeleccionPersonajeVersus.textContent = modoArcadeActivo
    ? "ELEGÍ A TU CAMPEÓN PARA LA TORRE"
    : "ELIGE A TU CAMPEÓN";
  tituloSeleccionPersonajeVersus.textContent = modoArcadeActivo
    ? "Selección del modo Arcade"
    : "Selección de personaje";
  detalleSeleccionPersonajeVersus.textContent = modoPruebasActivo
    ? "Modo Pruebas: todos los personajes están disponibles."
    : modoArcadeActivo
      ? "Tu personaje se enfrentará a ocho rivales controlados por la máquina."
      : "La Guardiana se desbloquea al completar el Mundo 1.";
  mostrarPantalla(pantallaSeleccionPersonajeVersus);
  if (modoArcadeActivo) {
    btnConfirmarPersonajeVersus.disabled = false;
    actualizarDisponibilidadPersonajesVersus();
    estadoPersonajePropioVersus.className = "";
    estadoPersonajePropioVersus.textContent = "Elegí con quién subirás la torre.";
    estadoPersonajeRivalVersus.className = "listo";
    estadoPersonajeRivalVersus.textContent = "La máquina ya preparó a tus rivales.";
  } else {
    actualizarSeleccionPersonajeRemota(adaptadorSalasVersus.obtenerSala());
  }
}

function obtenerClaveProgresoArcade() {
  return `progresoArcadeAventuraGA:${personajeJugadorVersus}`;
}

function leerProgresoArcade() {
  try {
    return Math.max(0, Number.parseInt(localStorage.getItem(obtenerClaveProgresoArcade()), 10) || 0);
  } catch {
    return 0;
  }
}

function guardarProgresoArcade(pisosSuperados) {
  pisosDesbloqueadosArcade = Math.max(pisosDesbloqueadosArcade, pisosSuperados);
  try {
    localStorage.setItem(obtenerClaveProgresoArcade(), `${pisosDesbloqueadosArcade}`);
  } catch {
    // La torre continúa en esta sesión aunque no haya almacenamiento local.
  }
}

function crearOrdenRivalesArcade() {
  const ordenBase = [
    "explorador", "mago", "guardiana", "dragon", "hombre_lobo",
    "guardian_alba", "dragon_hielo", "kalamo", "kairos", "t_shadow", "azrak",
  ].filter((personaje) => personaje !== personajeJugadorVersus);
  const jefe = ordenBase.includes("azrak") ? "azrak" : "t_shadow";
  return [...ordenBase.filter((personaje) => personaje !== jefe), jefe];
}

function obtenerDificultadArcade(indice) {
  if (indice >= rivalesTorreArcade.length - 1) return "JEFE FINAL";
  if (indice >= 5) return "ÉLITE";
  if (indice >= 2) return "GUERRERO";
  return "APRENDIZ";
}

function renderizarTorreArcade() {
  const total = rivalesTorreArcade.length;
  const torreCompletada = pisosDesbloqueadosArcade >= total;
  pisosArcade.replaceChildren();
  [...rivalesTorreArcade].reverse().forEach((personaje, indiceInvertido) => {
    const indice = total - 1 - indiceInvertido;
    const rival = personajesVersus[personaje];
    const piso = document.createElement("li");
    piso.className = indice < pisosDesbloqueadosArcade
      ? "superado"
      : indice === pisoActualArcade ? "actual" : "bloqueado";
    if (torreCompletada && indice === total - 1) piso.className = "actual superado";
    piso.innerHTML = `
      <span>${indice + 1}</span>
      <img src="${rival.base}" alt="">
      <strong>${rival.nombre}</strong>
      <small>${indice < pisosDesbloqueadosArcade ? "SUPERADO" : obtenerDificultadArcade(indice)}</small>
    `;
    pisosArcade.appendChild(piso);
  });

  const personajeRival = rivalesTorreArcade[pisoActualArcade];
  const rival = personajesVersus[personajeRival];
  const habilidad = habilidadesVersus[personajeRival];
  etiquetaPisoArcade.textContent = `PISO ${pisoActualArcade + 1} DE ${total}`;
  imagenRivalArcade.src = rival.base;
  imagenRivalArcade.alt = `${rival.nombre}, rival del piso ${pisoActualArcade + 1}`;
  nombreRivalArcade.textContent = rival.nombre;
  habilidadRivalArcade.textContent = `Habilidad: ${habilidad.nombre}`;
  dificultadArcade.textContent = obtenerDificultadArcade(pisoActualArcade);
  estadoArcade.textContent = torreCompletada
    ? "¡Torre completada! Podés volver a desafiar al jefe final."
    : `Progreso: ${pisosDesbloqueadosArcade} de ${total} rivales superados.`;
  btnCombatirArcade.textContent = torreCompletada && pisoActualArcade === total - 1
    ? "Desafiar otra vez al jefe"
    : "Entrar al combate";
}

function abrirTorreArcade() {
  detenerRondaVersus();
  cancelarCinematicaFinalVersus();
  resultadoRondaVersus.classList.add("oculto");
  renderizarTorreArcade();
  mostrarPantalla(pantallaArcade);
}

function iniciarModoArcade() {
  reproducirSonidoComenzarAventura();
  cancelarSecuenciaNarrativaActual();
  detenerSonidos();
  modoArcadeActivo = true;
  cancelarSuscripcionPartidaVersus?.();
  cancelarSuscripcionPartidaVersus = null;
  adaptadorSalasVersus = adaptadorLocalSalasVersus;
  partidaOnlineVersus = null;
  partidaOnlineIniciada = false;
  abrirSeleccionPersonajeVersus();
}

function prepararRecorridoArcade() {
  rivalesTorreArcade = crearOrdenRivalesArcade();
  pisosDesbloqueadosArcade = Math.min(leerProgresoArcade(), rivalesTorreArcade.length);
  pisoActualArcade = Math.min(pisosDesbloqueadosArcade, rivalesTorreArcade.length - 1);
  ultimoResultadoArcade = "";
  abrirTorreArcade();
}

function salirModoArcade() {
  detenerRondaVersus();
  cancelarCinematicaFinalVersus();
  modoArcadeActivo = false;
  ultimoResultadoArcade = "";
  mostrarPantalla(pantallaMenu);
}

const claveTutorialVersusVisto = "tutorialVersusVistoAventuraGA";
const pasosTutorialVersus = [
  {
    titulo: "Completá la palabra",
    descripcion: "Elegí la A para completar GATO. Cada palabra terminada le quita un corazón al rival.",
    accion: "Tocá la letra A para continuar.",
  },
  {
    titulo: "Cuidá tus intentos",
    descripcion: "Una letra incorrecta consume un intento. El corazón se conserva mientras todavía queden intentos.",
    accion: "Probá la letra X.",
  },
  {
    titulo: "Perder una ronda suma otra palabra",
    descripcion: "Al agotar los seis intentos perdés un corazón. La aventura agrega una palabra aleatoria de la misma temática para que el duelo continúe.",
    accion: "Simulá que agotaste los intentos.",
  },
  {
    titulo: "Cargá tu habilidad",
    descripcion: "Cada letra correcta llena la barra. Al llegar a ocho letras, la habilidad queda lista para usar.",
    accion: "Completá la barra de habilidad.",
  },
  {
    titulo: "Atacá y mirá el resultado",
    descripcion: "Al usar una habilidad verás una ventana con lo que está ocurriendo en la pantalla y el teclado del rival.",
    accion: "Usá Enredo de raíces.",
  },
];

function tutorialVersusYaVisto() {
  try {
    return localStorage.getItem(claveTutorialVersusVisto) === "1";
  } catch {
    return false;
  }
}

function guardarTutorialVersusVisto() {
  try {
    localStorage.setItem(claveTutorialVersusVisto, "1");
  } catch {
    // El tutorial sigue funcionando aunque el navegador no permita persistencia.
  }
}

function completarAccionPasoTutorialVersus() {
  btnSiguienteTutorialVersus.disabled = false;
  accionPasoTutorialVersus.textContent = pasoActualTutorialVersus === pasosTutorialVersus.length - 1
    ? "¡Listo! Ya conocés lo esencial del duelo."
    : "¡Bien hecho! Podés continuar.";
  accionPasoTutorialVersus.classList.add("completada");
}

function renderizarPasoTutorialVersus() {
  const paso = pasosTutorialVersus[pasoActualTutorialVersus];
  escenaTutorialVersus.dataset.paso = `${pasoActualTutorialVersus}`;
  progresoTutorialVersus.textContent = `TUTORIAL · ${pasoActualTutorialVersus + 1}/${pasosTutorialVersus.length}`;
  numeroPasoTutorialVersus.textContent = `PASO ${pasoActualTutorialVersus + 1} DE ${pasosTutorialVersus.length}`;
  tituloPasoTutorialVersus.textContent = paso.titulo;
  descripcionPasoTutorialVersus.textContent = paso.descripcion;
  accionPasoTutorialVersus.textContent = paso.accion;
  accionPasoTutorialVersus.classList.remove("completada");
  btnSiguienteTutorialVersus.disabled = true;
  btnSiguienteTutorialVersus.textContent = pasoActualTutorialVersus === pasosTutorialVersus.length - 1
    ? "Terminar tutorial"
    : "Siguiente";
  palabraTutorialVersus.textContent = pasoActualTutorialVersus === 0 ? "G _ T O" : "_ _ _ _";
  temaTutorialVersus.textContent = pasoActualTutorialVersus === 2
    ? "ANIMALES · PALABRA EXTRA"
    : "ANIMALES · PALABRA 1/5";
  intentosTutorialVersus.textContent = "◆ ◆ ◆ ◆ ◆ ◆";
  corazonesRivalTutorialVersus.textContent = "♥ ♥ ♥";
  corazonesJugadorTutorialVersus.textContent = "♥ ♥ ♥";
  barraCargaTutorialVersus.style.width = pasoActualTutorialVersus === 4 ? "100%" : "0%";
  btnCargaTutorialVersus.classList.remove("completa");
  btnHabilidadTutorialVersus.disabled = pasoActualTutorialVersus !== 4;
  impactoTutorialVersus.classList.remove("visible");
  tecladoTutorialVersus.querySelectorAll("button").forEach((boton) => {
    boton.disabled = false;
    boton.classList.remove("correcta", "incorrecta");
  });
}

function comenzarTutorialVersus() {
  pasoActualTutorialVersus = 0;
  bienvenidaTutorialVersus.classList.add("oculto");
  pasoTutorialVersus.classList.remove("oculto");
  renderizarPasoTutorialVersus();
}

function abrirTutorialVersus({ mostrarBienvenida = false, alCerrar = null } = {}) {
  accionPosteriorTutorialVersus = alCerrar;
  modalTutorialVersus.classList.remove("oculto");
  bienvenidaTutorialVersus.classList.toggle("oculto", !mostrarBienvenida);
  pasoTutorialVersus.classList.toggle("oculto", mostrarBienvenida);
  progresoTutorialVersus.textContent = mostrarBienvenida ? "GUÍA DE COMBATE" : "TUTORIAL · 1/5";
  if (!mostrarBienvenida) comenzarTutorialVersus();
  (mostrarBienvenida ? btnComenzarTutorialVersus : tecladoTutorialVersus.querySelector("button"))?.focus();
}

function cerrarTutorialVersus({ recordar = false } = {}) {
  if (recordar) guardarTutorialVersusVisto();
  modalTutorialVersus.classList.add("oculto");
  impactoTutorialVersus.classList.remove("visible");
  const continuar = accionPosteriorTutorialVersus;
  accionPosteriorTutorialVersus = null;
  if (continuar) continuar();
  else btnTutorialVersus.focus();
}

function entrarAlModoVersus() {
  document.querySelector(".versus-jugador-uno .versus-etiqueta").textContent = "JUGADOR 1";
  document.querySelector(".versus-jugador-dos .versus-etiqueta").textContent = "JUGADOR 2";
  reproducirSonidoComenzarAventura();
  cancelarSecuenciaNarrativaActual();
  detenerSonidos();
  if (modoPruebasActivo) {
    iniciarPruebaVersusLocal();
    return;
  }
  abrirSalaVersus();
}

btnVersus.addEventListener("click", () => {
  modoArcadeActivo = false;
  if (!modoPruebasActivo && !tutorialVersusYaVisto()) {
    abrirTutorialVersus({ mostrarBienvenida: true, alCerrar: entrarAlModoVersus });
    return;
  }
  entrarAlModoVersus();
});

btnArcade.addEventListener("click", iniciarModoArcade);
btnSalirArcade.addEventListener("click", salirModoArcade);
btnSalirArcadeVertical.addEventListener("click", salirModoArcade);

btnTutorialVersus.addEventListener("click", () => abrirTutorialVersus());
btnComenzarTutorialVersus.addEventListener("click", comenzarTutorialVersus);
btnOmitirTutorialVersus.addEventListener("click", () => cerrarTutorialVersus({ recordar: true }));
btnCerrarTutorialVersus.addEventListener("click", () => cerrarTutorialVersus({ recordar: true }));

tecladoTutorialVersus.addEventListener("click", (evento) => {
  const boton = evento.target.closest("button");
  if (!boton || boton.disabled) return;
  if (pasoActualTutorialVersus === 0 && boton.dataset.accion === "acierto") {
    boton.classList.add("correcta");
    boton.disabled = true;
    palabraTutorialVersus.textContent = "G A T O";
    corazonesRivalTutorialVersus.innerHTML = "♥ ♥ <i>♥</i>";
    completarAccionPasoTutorialVersus();
  } else if (pasoActualTutorialVersus === 1 && boton.dataset.accion === "error") {
    boton.classList.add("incorrecta");
    boton.disabled = true;
    intentosTutorialVersus.textContent = "◆ ◆ ◆ ◆ ◆ ◇";
    completarAccionPasoTutorialVersus();
  } else if (pasoActualTutorialVersus === 2 && boton.dataset.accion === "agotar") {
    boton.disabled = true;
    intentosTutorialVersus.textContent = "◇ ◇ ◇ ◇ ◇ ◇";
    corazonesJugadorTutorialVersus.innerHTML = "♥ ♥ <i>♥</i>";
    palabraTutorialVersus.textContent = "_ _ _ _ _";
    completarAccionPasoTutorialVersus();
  }
});

btnCargaTutorialVersus.addEventListener("click", () => {
  if (pasoActualTutorialVersus !== 3) return;
  barraCargaTutorialVersus.style.width = "100%";
  btnCargaTutorialVersus.classList.add("completa");
  completarAccionPasoTutorialVersus();
});

btnHabilidadTutorialVersus.addEventListener("click", () => {
  if (pasoActualTutorialVersus !== 4) return;
  btnHabilidadTutorialVersus.disabled = true;
  impactoTutorialVersus.classList.add("visible");
  completarAccionPasoTutorialVersus();
});

btnSiguienteTutorialVersus.addEventListener("click", () => {
  if (btnSiguienteTutorialVersus.disabled) return;
  if (pasoActualTutorialVersus >= pasosTutorialVersus.length - 1) {
    cerrarTutorialVersus({ recordar: true });
    return;
  }
  pasoActualTutorialVersus += 1;
  renderizarPasoTutorialVersus();
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

btnGuardarCuentaVersus.addEventListener("click", () => ejecutarAccionAmigosVersus(
  () => adaptadorSalasVersus.vincularCorreo(correoCuentaVersus.value),
  "Te enviamos una confirmación. Abrila desde tu correo para guardar el jugador.",
));

btnEntrarCuentaVersus.addEventListener("click", () => ejecutarAccionAmigosVersus(
  () => adaptadorSalasVersus.entrarConCorreo(correoCuentaVersus.value),
  "Te enviamos un enlace para entrar a tu cuenta.",
));

btnGoogleCuentaVersus.addEventListener("click", () => ejecutarAccionAmigosVersus(
  () => adaptadorSalasVersus.vincularGoogle(),
  "Abriendo Google…",
));

btnGuardarPerfilVersus.addEventListener("click", () => ejecutarAccionAmigosVersus(
  async () => {
    await adaptadorSalasVersus.guardarPerfil(aliasPerfilVersus.value);
    aliasSalaVersus.value = aliasPerfilVersus.value.trim();
  },
  "Perfil creado. Ya podés agregar amigos.",
));

formAgregarAmigoVersus.addEventListener("submit", (evento) => {
  evento.preventDefault();
  void ejecutarAccionAmigosVersus(async () => {
    await adaptadorSalasVersus.enviarSolicitudAmistad(codigoNuevoAmigoVersus.value);
    codigoNuevoAmigoVersus.value = "";
  }, "Solicitud enviada.");
});

codigoNuevoAmigoVersus.addEventListener("input", () => {
  codigoNuevoAmigoVersus.value = codigoNuevoAmigoVersus.value
    .toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
});

btnCopiarCodigoAmigoVersus.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(codigoAmigoVersus.textContent);
    btnCopiarCodigoAmigoVersus.textContent = "Copiado";
    setTimeout(() => { btnCopiarCodigoAmigoVersus.textContent = "Copiar"; }, 1300);
  } catch (error) {
    mostrarMensajeAmigosVersus(`Tu código es ${codigoAmigoVersus.textContent}`);
  }
});

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
  if (!personajeDisponibleVersus(personajeJugadorVersus)) return;
  reproducirSonidoComenzarAventura();
  if (modoArcadeActivo) {
    prepararRecorridoArcade();
    return;
  }
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
    actualizarDisponibilidadPersonajesVersus();
  }
});

async function volverASalaDesdeSeleccionVersus() {
  if (modoArcadeActivo) {
    salirModoArcade();
    return;
  }
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
const ultimasPalabrasAleatoriasVersus = new Map();

function fijarPalabraVersus(indice, fijada) {
  const boton = btnsFijarPalabrasVersus[indice];
  if (!boton) return;
  const activa = Boolean(fijada && inputsPalabrasVersus[indice]?.value);
  boton.setAttribute("aria-pressed", String(activa));
  boton.title = activa ? "Liberar palabra" : "Conservar palabra";
}

function habilitarFijadoresPalabrasVersus(habilitados = true) {
  btnsFijarPalabrasVersus.forEach((boton, indice) => {
    boton.disabled = !habilitados || !inputsPalabrasVersus[indice].value;
  });
}

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
  btnsFijarPalabrasVersus.forEach((boton, indice) => {
    fijarPalabraVersus(indice, false);
    boton.disabled = true;
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
    habilitarFijadoresPalabrasVersus();
    validarPreparacionVersus(true);
  });
});

btnsFijarPalabrasVersus.forEach((boton, indice) => {
  boton.addEventListener("click", (evento) => {
    evento.preventDefault();
    evento.stopPropagation();
    fijarPalabraVersus(indice, boton.getAttribute("aria-pressed") !== "true");
  });
});

tematicaVersus.addEventListener("change", () => {
  btnsFijarPalabrasVersus.forEach((boton, indice) => fijarPalabraVersus(indice, false));
  validarPreparacionVersus(true);
});

function completarPalabrasAleatoriasVersus() {
  const banco = bancosPalabrasVersus[tematicaVersus.value] || [];
  const clavesFijadas = new Set(inputsPalabrasVersus.flatMap((input, indice) => (
    btnsFijarPalabrasVersus[indice]?.getAttribute("aria-pressed") === "true"
      ? [obtenerClavePalabraVersus(input.value)]
      : []
  )));
  const clavesAnteriores = ultimasPalabrasAleatoriasVersus.get(tematicaVersus.value) || new Set();
  let seleccion = mezclarPalabrasVersus(banco.filter((palabra) => {
    const clave = obtenerClavePalabraVersus(palabra);
    return !clavesFijadas.has(clave) && !clavesAnteriores.has(clave);
  }));
  const cantidadNecesaria = maximoPalabrasVersus - clavesFijadas.size;
  if (seleccion.length < cantidadNecesaria) {
    seleccion = mezclarPalabrasVersus(banco.filter(
      (palabra) => !clavesFijadas.has(obtenerClavePalabraVersus(palabra)),
    ));
  }
  let indiceSeleccion = 0;
  inputsPalabrasVersus.forEach((input, indice) => {
    if (btnsFijarPalabrasVersus[indice]?.getAttribute("aria-pressed") === "true") return;
    input.value = seleccion[indiceSeleccion] || "";
    indiceSeleccion += 1;
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
  ultimasPalabrasAleatoriasVersus.set(
    tematicaVersus.value,
    new Set(inputsPalabrasVersus.map((input) => obtenerClavePalabraVersus(input.value))),
  );
  btnConfirmarPalabrasVersus.focus();
}

btnPalabrasAleatoriasVersus.addEventListener("click", completarPalabrasAleatoriasVersus);

formPreparacionVersus.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  if (!validarPreparacionVersus(true)) return;

  palabrasSecretasVersus = inputsPalabrasVersus.map((input) => input.value);
  inputsPalabrasVersus.forEach((input) => { input.disabled = true; });
  habilitarFijadoresPalabrasVersus(false);
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
      habilitarFijadoresPalabrasVersus();
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
  if (modoArcadeActivo) {
    salirModoArcade();
    return;
  }
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

btnSalirVersus.addEventListener("click", () => {
  if (dueloAventuraActivo) abandonarDueloAventura();
  else if (modoArcadeActivo) abrirTorreArcade();
  else void volverAlMenuDesdeVersus();
});
btnSalirVersusVertical.addEventListener("click", () => {
  if (dueloAventuraActivo) abandonarDueloAventura();
  else if (modoArcadeActivo) abrirTorreArcade();
  else void volverAlMenuDesdeVersus();
});
btnMenuResultadoVersus.addEventListener("click", () => {
  if (dueloAventuraActivo) abandonarDueloAventura();
  else void volverAlMenuDesdeVersus();
});

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
      const debeMostrarLlegadaDesierto =
        escenarioActual === 1 &&
        misionActual === 0 &&
        desafiosCompletados === 0;
      presentacionMisionYaCargada = false;
      historiaMisionPendiente = false;
      if (debeMostrarLlegadaDesierto) {
        requestAnimationFrame(activarLlegadaDesiertoMision);
      }
      activarEmergenciaDevoradunas();
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
    activarEmergenciaDevoradunas();

    historiaMisionPendiente = false;

    if (sonidoNarrativoPendiente) {
      if (sonidoNarrativoPendiente === "piedra") {
        animarImpactoPiedra();
      }

      if (sonidoNarrativoPendiente === "ramas") {
        activarBloqueoTronco();
      }

      reproducirSonido(sonidoNarrativoPendiente);
      sonidoNarrativoPendiente = "";
    }

    if (
      escenarioActual === 1 &&
      misionActual === 0 &&
      desafiosCompletados === 0
    ) {
      activarLlegadaDesiertoMision();
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

btnProbarPruebaBosque.addEventListener("click", () => {
  if (!modoPruebasActivo || pruebaEspecialBosqueActiva) return;
  const tipo = obtenerTipoPruebaEspecial(escenarioActual, misionActual);
  if (!tipo) return;
  pruebaBosqueEnModoDemo = true;
  abrirPruebaEspecialBosque(tipo);
});

btnProbarEscenaPersonaje.addEventListener("click", () => {
  if (!modoPruebasActivo) return;
  if (escenarioActual === 0 && misionActual === 5) void ejecutarEncuentroHombreLoboMision();
  if (escenarioActual === 0 && misionActual === 9) void presentarDesbloqueoGuardianaBosque();
  if (escenarioActual === 2 && [8, 9].includes(misionActual)) void reproducirCinematicaFinalCumbres();
});

btnAyudaMuralSantuario.addEventListener("click", mostrarAyudaMuralSantuario);
btnRetirarPiezaMural.addEventListener("click", retirarPiezaMuralSantuario);
btnSalirMuralSantuario.addEventListener("click", () => {
  cerrarRompecabezasMuralSantuario(false);
  detenerSonidos();
  mostrarPantalla(pantallaMenu);
});

btnRepetirPruebaBosque.addEventListener("click", () => {
  if (pruebaEspecialBosqueActiva === "ramas") {
    iniciarPuzzleRamasDeslizante();
  } else if (pruebaEspecialBosqueActiva === "lobos") {
    void mostrarSecuenciaMemoriaLobos();
  } else if (pruebaEspecialBosqueActiva === "vientos") {
    iniciarPuzzleVientosDesierto();
  } else if (pruebaEspecialBosqueActiva === "oasis") {
    iniciarPuzzleOasisDesierto();
  } else if (pruebaEspecialBosqueActiva === "espejos") {
    iniciarPuzzleEspejosDesierto();
  } else if (["sopa-celeste", "campanas-celestes", "sellos-aeralis"].includes(pruebaEspecialBosqueActiva)) {
    iniciarPuzzleCumbres(pruebaEspecialBosqueActiva);
  } else if (["laberinto-hielo", "corazon-termico"].includes(pruebaEspecialBosqueActiva)) {
    iniciarPuzzleCumbres(pruebaEspecialBosqueActiva);
  }
});

botonesMemoriaLobos.forEach((boton) => {
  boton.addEventListener("click", () => elegirLoboMemoria(Number(boton.dataset.lobo)));
});

botonesOasisDesierto.forEach((boton) => {
  boton.addEventListener("click", () =>
    elegirOasisDesierto(Number(boton.dataset.oasis)),
  );
});

botonesEspejosDesierto.forEach((boton) => {
  boton.addEventListener("click", () =>
    girarEspejoDesierto(Number(boton.dataset.espejo)),
  );
});

btnSalirPruebaBosque.addEventListener("click", () => {
  cerrarPruebaEspecialBosque();
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
    otorgarMonedas(
      10,
      `aventura:${escenarioActual}:${misionActual}:${desafiosCompletados + 1}:palabra`,
    );
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

    const completaMundoDos =
      escenarioActual === 1 &&
      misionActual === 9 &&
      desafiosCompletados === desafiosPorMision - 1;

    if (completaMundoDos) {
      desafiosCompletados = desafiosPorMision;
      cristalesObtenidos = Math.max(cristalesObtenidos, 2);
      mundoDosCompletado = true;
      historiaMisionPendiente = false;
      actualizarJugador();
      reproducirSecuenciaSonidos(["acertar", "moneda", "victoria"]);
      bloquearTeclado();
      btnPista.disabled = true;
      btnSiguiente.textContent = "🏆 Aventura completada";
      btnSiguiente.classList.add("oculto");
      contenedorEscenario.classList.add("final-desierto-activo");
      guardarProgreso();
      void mensajeSuperadoTerminado.then((mensajeCompleto) => {
        if (!mensajeCompleto) return;
        mensajePersonaje.classList.remove("oculto");
        mensajePersonaje.textContent =
          "✨ ¡Recuperaste el Cristal Dorado! El camino al tercer mundo comienza a revelarse.";
        btnSiguiente.classList.remove("oculto");
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
    || pantallaSeleccionada === pantallaArcade
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

function crearMiniTecladoRivalVersus() {
  if (miniTecladoRivalVersus.children.length > 0) return;
  filasTeclado.forEach((fila) => {
    const filaMiniatura = document.createElement("div");
    filaMiniatura.className = "fila-mini-teclado-rival-versus";
    fila.forEach((letra) => {
      const tecla = document.createElement("i");
      tecla.textContent = letra;
      tecla.dataset.letra = letra;
      filaMiniatura.appendChild(tecla);
    });
    miniTecladoRivalVersus.appendChild(filaMiniatura);
  });
  for (let capa = 1; capa <= 3; capa += 1) {
    const hielo = document.createElement("span");
    hielo.className = `mini-hielo-nivor mini-hielo-nivor-${capa}`;
    miniTecladoRivalVersus.appendChild(hielo);
  }
}

function prepararMiniaturaHabilidadRival(efecto) {
  const teclas = [...miniTecladoRivalVersus.querySelectorAll("i")];
  teclas.forEach((tecla) => {
    tecla.classList.remove("tecla-mini-robada-kalamo");
    for (const propiedad of [
      "--mini-caos-x",
      "--mini-caos-y",
      "--mini-caos-giro",
      "--mini-rebote-x",
      "--mini-rebote-y",
      "--mini-rebote-giro",
      "--mini-demora",
    ]) tecla.style.removeProperty(propiedad);
  });

  if (efecto === "shuffle") {
    const posiciones = teclas.map((tecla) => tecla.getBoundingClientRect());
    const salto = 7;
    teclas.forEach((tecla, indice) => {
      const origen = posiciones[indice];
      const destino = posiciones[(indice + salto) % posiciones.length];
      tecla.style.setProperty("--mini-caos-x", `${destino.left - origen.left}px`);
      tecla.style.setProperty("--mini-caos-y", `${destino.top - origen.top}px`);
      tecla.style.setProperty("--mini-caos-giro", `${indice % 2 ? -14 : 14}deg`);
      tecla.style.setProperty("--mini-demora", `${-(indice % 6) * 90}ms`);
    });
  }

  if (efecto === "key_bounce") {
    teclas.forEach((tecla, indice) => {
      const direccion = (indice % 7) - 3;
      tecla.style.setProperty("--mini-rebote-x", `${direccion * 3}px`);
      tecla.style.setProperty("--mini-rebote-y", `${-(9 + (indice % 5) * 2)}px`);
      tecla.style.setProperty("--mini-rebote-giro", `${direccion * 7}deg`);
      tecla.style.setProperty("--mini-demora", `${-(indice % 8) * 105}ms`);
    });
  }
  if (efecto === "key_theft") {
    teclas.forEach((tecla) => tecla.classList.add("tecla-mini-robada-kalamo"));
  }
}

function ocultarVistaImpactoRivalVersus() {
  if (temporizadorVistaImpactoRivalVersus) clearTimeout(temporizadorVistaImpactoRivalVersus);
  temporizadorVistaImpactoRivalVersus = null;
  vistaImpactoRivalVersus.classList.remove("visible");
  vistaImpactoRivalVersus.setAttribute("aria-hidden", "true");
}

function mostrarVistaImpactoRivalVersus(personaje, letraForzada = "") {
  const habilidad = habilidadesVersus[personaje] || habilidadesVersus.explorador;
  if (habilidad.efecto === "hint") return;
  crearMiniTecladoRivalVersus();
  ocultarVistaImpactoRivalVersus();

  const detallesPorEfecto = {
    roots: "Teclado bloqueado durante 5 segundos.",
    roar: "El teclado rival tiembla durante 5 segundos.",
    shuffle: "Las teclas cambian de lugar durante 5 segundos.",
    invert: "La pantalla rival queda invertida durante 5 segundos.",
    black_hole: "El teclado queda atrapado durante 5 segundos.",
    key_bounce: "Las teclas salen despedidas durante 5 segundos.",
    ice_screen: "La pantalla rival queda congelada durante 5 segundos.",
      key_theft: "La mirada de la Bestia oculta la palabra mientras destruye el teclado durante 5 segundos.",
    forced_miss: letraForzada
      ? `La calavera pulsó la ${letraForzada}: error forzado.`
      : "La calavera obligó al rival a cometer un error.",
    time_steal: "El cronómetro rival perdió 20 segundos.",
  };
  nombreImpactoRivalVersus.textContent = `${habilidad.icono} ${habilidad.nombre}`;
  detalleImpactoRivalVersus.textContent = detallesPorEfecto[habilidad.efecto]
    || "El rival recibió tu ataque.";
  miniTecladoRivalVersus.className = `mini-teclado-rival-versus efecto-${habilidad.efecto}`;
  prepararMiniaturaHabilidadRival(habilidad.efecto);
  miniTecladoRivalVersus.querySelectorAll("i").forEach((tecla) => {
    tecla.classList.toggle("tecla-forzada", Boolean(letraForzada) && tecla.dataset.letra === letraForzada);
  });
  vistaImpactoRivalVersus.classList.add("visible");
  vistaImpactoRivalVersus.setAttribute("aria-hidden", "false");
  temporizadorVistaImpactoRivalVersus = setTimeout(
    ocultarVistaImpactoRivalVersus,
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1800 : 3000,
  );
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

function prepararTrayectoriaTintaKalamo(atacante) {
  const chorro = animacionHabilidadVersus.querySelector(".chorro-tinta-codigo-kalamo");
  if (!chorro || !atacante) return;
  const lienzo = animacionHabilidadVersus.getBoundingClientRect();
  const origen = atacante.getBoundingClientRect();
  const limitesTeclas = [...tecladoVersus.querySelectorAll("button")]
    .map((boton) => boton.getBoundingClientRect());
  const teclado = limitesTeclas.length
    ? {
        left: Math.min(...limitesTeclas.map((limite) => limite.left)),
        right: Math.max(...limitesTeclas.map((limite) => limite.right)),
        top: Math.min(...limitesTeclas.map((limite) => limite.top)),
        bottom: Math.max(...limitesTeclas.map((limite) => limite.bottom)),
      }
    : tecladoVersus.getBoundingClientRect();
  teclado.width = teclado.right - teclado.left;
  teclado.height = teclado.bottom - teclado.top;
  const desdeRival = animacionHabilidadVersus.classList.contains("desde-rival");
  const inicioX = origen.left - lienzo.left + origen.width * (desdeRival ? 0.34 : 0.68);
  const inicioY = origen.top - lienzo.top + origen.height * 0.48;
  const destinoX = teclado.left - lienzo.left + teclado.width * 0.08;
  const destinoY = teclado.top - lienzo.top + teclado.height * 0.55;
  const recorridoX = destinoX - inicioX;
  const recorridoY = destinoY - inicioY;
  chorro.style.setProperty("--tinta-inicio-x", `${inicioX}px`);
  chorro.style.setProperty("--tinta-inicio-y", `${inicioY}px`);
  chorro.style.setProperty("--tinta-recorrido-x", `${recorridoX}px`);
  chorro.style.setProperty("--tinta-recorrido-y", `${recorridoY}px`);
  chorro.style.setProperty("--tinta-mitad-x", `${recorridoX * 0.53}px`);
  chorro.style.setProperty("--tinta-mitad-y", `${recorridoY * 0.36 - Math.min(54, lienzo.height * 0.07)}px`);
  chorro.style.setProperty("--tinta-impacto-x", `${destinoX}px`);
  chorro.style.setProperty("--tinta-impacto-y", `${destinoY}px`);
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
    kalamo: srcKalamoHabilidadVersus,
    kairos: srcKairosAtaqueVersus,
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
  if (personaje === "kalamo") prepararTrayectoriaTintaKalamo(atacante);
  void animacionHabilidadVersus.offsetWidth;
  animacionHabilidadVersus.classList.add("activa");
  reproducirSonidoVersus(desdeRival ? "versusAtaqueDos" : "versusAtaqueUno", 0.5);

  const demoraImpacto = personaje === "dragon_hielo" ? 140 : personaje === "azrak" ? 620 : personaje === "kalamo" ? 720 : personaje === "kairos" ? 700 : 560;
  const demoraLimpieza = personaje === "dragon_hielo" ? 1900 : personaje === "azrak" ? 1380 : personaje === "kalamo" ? 1480 : personaje === "kairos" ? 1550 : 1120;
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
    boton.disabled = bloqueado
      || demoVersus.teclasRobadasJugador.has(boton.textContent)
      || demoVersus.letrasJugador.has(boton.textContent);
  });
}

function limpiarEfectoVisualHabilidadVersus() {
  if (demoVersus.temporizadorEfectoHabilidad) clearTimeout(demoVersus.temporizadorEfectoHabilidad);
  demoVersus.temporizadorEfectoHabilidad = null;
  detenerCaosContinuoTecladoVersus();
  tecladoVersus.classList.remove("efecto-raices", "efecto-rugido", "efecto-caos", "efecto-agujero-negro", "efecto-teclas-rotas", "efecto-congelado", "efecto-hurto-teclas");
  tecladoVersus.style.removeProperty("--duracion-agujero-negro");
  desafioJugadorVersus.classList.remove(
    "efecto-raices-desafio",
    "efecto-rugido-desafio",
    "efecto-caos-desafio",
    "efecto-agujero-negro-desafio",
    "efecto-ruptura-desafio",
    "efecto-tinta-bestia-desafio",
  );
  desafioJugadorVersus.style.removeProperty("--duracion-agujero-negro");
  marcoVersus.classList.remove("efecto-inversion-lunar");
  marcoVersus.classList.remove("efecto-invierno-absoluto");
  marcoVersus.style.removeProperty("--duracion-invierno-absoluto");
  congelacionNivorVersus.classList.remove("activa", "desde-rival");
  teclasRotasVersus.classList.remove("activa");
  teclasRotasVersus.replaceChildren();
  hurtoTeclasKalamoVersus.classList.remove("activa", "desde-rival");
  hurtoTeclasKalamoVersus.replaceChildren();
  demoVersus.teclasRobadasJugador.clear();
  tecladoVersus.querySelectorAll("button").forEach((boton) => {
    const regresaba = boton.classList.contains("tecla-robada-kalamo");
    boton.classList.remove("tecla-robada-kalamo");
    boton.style.removeProperty("--succion-x");
    boton.style.removeProperty("--succion-y");
    boton.style.removeProperty("--tinta-demora");
    boton.style.removeProperty("--bestia-vuelo-x");
    boton.style.removeProperty("--bestia-vuelo-y");
    boton.style.removeProperty("--bestia-giro");
    if (regresaba) {
      boton.classList.add("tecla-regresando-kalamo");
      setTimeout(() => boton.classList.remove("tecla-regresando-kalamo"), 520);
    }
  });
  restaurarOrdenTecladoVersus();
}

function elegirTeclasRobadasKalamo() {
  return filasTeclado.flat();
}

function prepararHurtoTeclasKalamoVersus() {
  hurtoTeclasKalamoVersus.replaceChildren();
  demoVersus.teclasRobadasJugador = new Set(elegirTeclasRobadasKalamo());
  const marco = marcoVersus.getBoundingClientRect();
  const teclado = tecladoVersus.getBoundingClientRect();
  const limitesTeclas = [...tecladoVersus.querySelectorAll("button")]
    .map((boton) => boton.getBoundingClientRect());
  const izquierdaTeclas = limitesTeclas.length
    ? Math.min(...limitesTeclas.map((limite) => limite.left))
    : teclado.left;
  const derechaTeclas = limitesTeclas.length
    ? Math.max(...limitesTeclas.map((limite) => limite.right))
    : teclado.right;
  const fondoTeclas = limitesTeclas.length
    ? Math.max(...limitesTeclas.map((limite) => limite.bottom))
    : teclado.bottom;
  const techoTeclas = limitesTeclas.length
    ? Math.min(...limitesTeclas.map((limite) => limite.top))
    : teclado.top;
  const desdeRival = animacionHabilidadVersus.classList.contains("desde-rival");
  hurtoTeclasKalamoVersus.classList.toggle("desde-rival", desdeRival);
  const anchoTeclado = derechaTeclas - izquierdaTeclas;
  const altoTeclado = fondoTeclas - techoTeclas;
  const altoEscena = Math.max(96, altoTeclado * 1.9);
  const esPantallaCelularHorizontal = window.matchMedia("(orientation: landscape) and (max-height: 600px)").matches;
  const elevacionEscena = esPantallaCelularHorizontal ? 0.5 : 0.56;
  const escena = document.createElement("div");
  escena.className = "embestida-bestia-tintero-kalamo";
  escena.setAttribute("aria-hidden", "true");
  escena.style.left = `${izquierdaTeclas - marco.left}px`;
  escena.style.top = `${techoTeclas - marco.top - altoEscena * elevacionEscena}px`;
  escena.style.width = `${anchoTeclado}px`;
  escena.style.height = `${altoEscena}px`;

  const charco = document.createElement("i");
  charco.className = "charco-bestia-tintero-kalamo";
  const bestia = document.createElement("img");
  bestia.className = "bestia-tintero-kalamo";
  bestia.src = "assets/images/personajes/versus/bestia-tintero-kalamo.png";
  bestia.alt = "";
  bestia.setAttribute("aria-hidden", "true");
  const impacto = document.createElement("b");
  impacto.className = "impacto-bestia-tintero-kalamo";
  escena.append(charco, bestia, impacto);
  hurtoTeclasKalamoVersus.appendChild(escena);

  tecladoVersus.querySelectorAll("button").forEach((boton, indice) => {
    const robada = demoVersus.teclasRobadasJugador.has(boton.textContent);
    boton.classList.toggle("tecla-robada-kalamo", robada);
    if (!robada) return;
    const origen = boton.getBoundingClientRect();
    const avanceHorizontal = Math.min(1, Math.max(0,
      (origen.left + origen.width / 2 - izquierdaTeclas) / Math.max(1, anchoTeclado),
    ));
    const demoraChoque = Math.round(1200 + avanceHorizontal * 900 + (indice % 3) * 28);
    const vueloX = 58 + (indice % 6) * 13;
    const vueloY = (indice % 2 === 0 ? -1 : 1) * (42 + (indice % 5) * 12);
    const giro = (indice % 2 === 0 ? -1 : 1) * (38 + (indice % 7) * 17);
    boton.style.setProperty("--tinta-demora", `${demoraChoque}ms`);
    boton.style.setProperty("--bestia-vuelo-x", `${vueloX}px`);
    boton.style.setProperty("--bestia-vuelo-y", `${vueloY}px`);
    boton.style.setProperty("--bestia-giro", `${giro}deg`);

    const fragmento = document.createElement("div");
    fragmento.className = "fragmento-tecla-bestia-kalamo";
    fragmento.textContent = boton.textContent;
    fragmento.setAttribute("aria-hidden", "true");
    fragmento.style.left = `${origen.left - marco.left}px`;
    fragmento.style.top = `${origen.top - marco.top}px`;
    fragmento.style.width = `${origen.width}px`;
    fragmento.style.height = `${origen.height}px`;
    fragmento.style.setProperty("--tinta-demora", `${demoraChoque}ms`);
    fragmento.style.setProperty("--bestia-vuelo-x", `${vueloX}px`);
    fragmento.style.setProperty("--bestia-vuelo-y", `${vueloY}px`);
    fragmento.style.setProperty("--bestia-giro", `${giro}deg`);
    hurtoTeclasKalamoVersus.appendChild(fragmento);
  });
  hurtoTeclasKalamoVersus.classList.add("activa");
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
  if (efecto === "key_theft") {
    prepararHurtoTeclasKalamoVersus();
    tecladoVersus.classList.add("efecto-hurto-teclas");
    desafioJugadorVersus.classList.add("efecto-tinta-bestia-desafio");
  }
  if (["roots", "black_hole", "key_bounce", "ice_screen", "key_theft"].includes(efecto)) tecladoVersus.querySelectorAll("button").forEach((boton) => { boton.disabled = true; });

  demoVersus.temporizadorEfectoHabilidad = setTimeout(() => {
    demoVersus.temporizadorEfectoHabilidad = null;
    const restaurarConAnimacion = tecladoVersus.classList.contains("efecto-caos");
    detenerCaosContinuoTecladoVersus();
    tecladoVersus.classList.remove("efecto-raices", "efecto-rugido", "efecto-caos", "efecto-agujero-negro", "efecto-teclas-rotas", "efecto-congelado", "efecto-hurto-teclas");
    tecladoVersus.style.removeProperty("--duracion-agujero-negro");
    desafioJugadorVersus.classList.remove(
      "efecto-raices-desafio",
      "efecto-rugido-desafio",
      "efecto-caos-desafio",
      "efecto-agujero-negro-desafio",
      "efecto-ruptura-desafio",
      "efecto-tinta-bestia-desafio",
    );
    desafioJugadorVersus.style.removeProperty("--duracion-agujero-negro");
    teclasRotasVersus.classList.remove("activa");
    teclasRotasVersus.replaceChildren();
    hurtoTeclasKalamoVersus.classList.remove("activa", "desde-rival");
    hurtoTeclasKalamoVersus.replaceChildren();
    demoVersus.teclasRobadasJugador.clear();
    tecladoVersus.querySelectorAll("button").forEach((boton) => {
      if (!boton.classList.contains("tecla-robada-kalamo")) return;
      boton.classList.remove("tecla-robada-kalamo");
      boton.style.removeProperty("--succion-x");
      boton.style.removeProperty("--succion-y");
      boton.style.removeProperty("--tinta-demora");
      boton.style.removeProperty("--bestia-vuelo-x");
      boton.style.removeProperty("--bestia-vuelo-y");
      boton.style.removeProperty("--bestia-giro");
      boton.classList.add("tecla-regresando-kalamo");
      setTimeout(() => boton.classList.remove("tecla-regresando-kalamo"), 520);
    });
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
  if (!letra) return "";
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
  return letra;
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

function animarRoboTiempoKairosVersus(desdeRival = false, segundos = 20) {
  const panel = desdeRival ? tiempoVersusUno : tiempoVersusDos;
  panel.style.setProperty("--segundos-robados", `"-${segundos} s"`);
  panel.classList.remove("tiempo-robado-kairos");
  void panel.offsetWidth;
  panel.classList.add("tiempo-robado-kairos");
  setTimeout(() => panel.classList.remove("tiempo-robado-kairos"), 1100);
}

function aplicarRoboTiempoLocalVersus(desdeRival = false, segundos = 20) {
  if (desdeRival) {
    demoVersus.tiempoJugador = Math.max(0, demoVersus.tiempoJugador - segundos);
    animarRoboTiempoKairosVersus(true, segundos);
    if (demoVersus.tiempoJugador === 0) agotarTiempoJugadorVersus();
  } else {
    demoVersus.tiempoRival = Math.max(0, demoVersus.tiempoRival - segundos);
    animarRoboTiempoKairosVersus(false, segundos);
    if (demoVersus.tiempoRival === 0) agotarTiempoRivalVersus();
  }
  actualizarTiemposVersus();
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
  } else if (habilidad.efecto === "time_steal") {
    reproducirAnimacionHabilidadVersus(personajeJugadorVersus, {
      alImpactar: () => {
        aplicarRoboTiempoLocalVersus(false, habilidad.segundos);
        mostrarVistaImpactoRivalVersus(personajeJugadorVersus);
        mostrarAvisoAvanceVersus(`¡${habilidad.nombre} restó ${habilidad.segundos} segundos!`, "acierto");
      },
    });
  } else if (habilidad.efecto === "forced_miss") {
    reproducirAnimacionHabilidadVersus(personajeJugadorVersus, {
      alImpactar: () => {
        const letraForzada = aplicarFalloForzadoRivalLocalVersus();
        mostrarVistaImpactoRivalVersus(personajeJugadorVersus, letraForzada);
        mostrarAvisoAvanceVersus("¡Calavera Ígnea obligó al rival a fallar!", "acierto");
      },
    });
  } else {
    reproducirAnimacionHabilidadVersus(personajeJugadorVersus, {
      alImpactar: () => {
        demoVersus.efectoRival = habilidad.efecto;
        demoVersus.efectoRivalHasta = Date.now() + habilidad.duracion;
        if (habilidad.efecto === "key_theft") {
          demoVersus.teclasRobadasRival = new Set(elegirTeclasRobadasKalamo());
        }
        mostrarVistaImpactoRivalVersus(personajeJugadorVersus);
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
  } else if (habilidad.efecto === "time_steal") {
    reproducirAnimacionHabilidadVersus(personajeRivalVersus, {
      desdeRival: true,
      alImpactar: () => aplicarRoboTiempoLocalVersus(true, habilidad.segundos),
    });
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
const palabrasAdicionalesVersus = {
  "paises": [
    "IRLANDA",
    "ISLANDIA",
    "NORUEGA",
    "SUECIA",
    "FINLANDIA",
    "DINAMARCA",
    "ESTONIA",
    "LETONIA",
    "LITUANIA",
    "HUNGRÍA",
    "ESLOVAQUIA",
    "ESLOVENIA",
    "ALBANIA",
    "MOLDAVIA",
    "GEORGIA",
    "ARMENIA",
    "CHIPRE",
    "MALTA",
    "ANDORRA",
    "MÓNACO",
    "LUXEMBURGO",
    "HOLANDA",
    "NEPAL",
    "BUTÁN",
    "PAKISTÁN",
    "BANGLADESH",
    "MYANMAR",
    "CAMBOYA",
    "MALASIA",
    "SINGAPUR",
    "INDONESIA",
    "FILIPINAS",
    "MONGOLIA",
    "KAZAJISTÁN",
    "UZBEKISTÁN",
    "IRÁN",
    "IRAK",
    "ISRAEL",
    "JORDANIA",
    "LÍBANO",
    "SIRIA",
    "CATAR",
    "KUWAIT",
    "OMÁN",
    "YEMEN",
    "ETIOPÍA",
    "SOMALIA",
    "SUDÁN",
    "SENEGAL",
    "NIGERIA"
  ],
  "frutas": [
    "ACEROLA",
    "AGUACATE",
    "ALBARICOQUE",
    "ALQUEJENJE",
    "BABACO",
    "CACAO",
    "CAIMITO",
    "CALABAZA",
    "CLEMENTINA",
    "CURUBA",
    "FEIJOA",
    "GUANÁBANA",
    "JABUTICABA",
    "LONGAN",
    "LÚCUMA",
    "MANGOSTÁN",
    "MARULA",
    "NANCE",
    "PLÁTANO",
    "QUINOTO",
    "RAMBUTÁN",
    "SALAK",
    "SAPOTE",
    "TAMARILLO",
    "TANGELO",
    "YUZU",
    "ARAZÁ",
    "BOROJÓ",
    "COPAO",
    "COROZO",
    "CHONTADURO",
    "MAMEY",
    "PITANGA",
    "NARANJILLA",
    "MADROÑO",
    "MURTA",
    "CALAFATE",
    "MAQUI",
    "CAMUCAMU",
    "NONI",
    "PEPINO",
    "BERENJENA",
    "PIMIENTO",
    "ZAPALLO",
    "ZAPALLITO",
    "ALMENDRA",
    "AVELLANA",
    "NUEZ",
    "PISTACHO",
    "ANACARDO"
  ],
  "animales": [
    "ANTÍLOPE",
    "ARMADILLO",
    "AVESTRUZ",
    "BABUINO",
    "BARRACUDA",
    "BUITRE",
    "BURRO",
    "CAIMÁN",
    "CAPIBARA",
    "CARACOL",
    "CIERVO",
    "COBRA",
    "CODORNIZ",
    "COLIBRÍ",
    "COMADREJA",
    "CÓNDOR",
    "COTORRA",
    "CUERVO",
    "DROMEDARIO",
    "EQUIDNA",
    "ERIZO",
    "FLAMENCO",
    "GACELA",
    "GAVIOTA",
    "GECKO",
    "HALCÓN",
    "HÁMSTER",
    "HURÓN",
    "IGUANA",
    "JABALÍ",
    "LANGOSTA",
    "LÉMUR",
    "LINCE",
    "LORO",
    "MANTARRAYA",
    "MAPACHE",
    "MEDUSA",
    "MOFETA",
    "MURCIÉLAGO",
    "ORCA",
    "ORNITORRINCO",
    "PELICANO",
    "PEREZOSO",
    "PIRAÑA",
    "RANA",
    "RENO",
    "SALAMANDRA",
    "SURICATA",
    "TAPIR",
    "TUCÁN"
  ],
  "comidas": [
    "AJIACO",
    "ALFAJOR",
    "ARROLLADO",
    "BAGUETTE",
    "BIFE",
    "BROCHETA",
    "CANELONES",
    "CAPELETI",
    "CARBONADA",
    "CAZUELA",
    "CHIPA",
    "CHUCRUT",
    "CUSCÚS",
    "CURRY",
    "ESCABECHE",
    "ESTOFADO",
    "FAJITA",
    "FAINÁ",
    "FALAFEL",
    "FIDEO",
    "FONDUE",
    "FRIJOLES",
    "GARBANZOS",
    "GAZPACHO",
    "GYOZA",
    "KEBAB",
    "LENTEJAS",
    "MACARRONES",
    "MAKI",
    "MANDIOCA",
    "MARMITAKO",
    "MONDONGO",
    "MORTADELA",
    "NACHOS",
    "PANCHO",
    "PAMBAZO",
    "PASTRAMI",
    "PESTO",
    "PICADILLO",
    "PIONONO",
    "PISTO",
    "PUPUSA",
    "QUICHE",
    "QUINOA",
    "RATATOUILLE",
    "SAMOSA",
    "TEMPURA",
    "TIRAMISÚ",
    "TOSTADA",
    "WAFFLE"
  ],
  "profesiones": [
    "ACTUARIO",
    "APICULTOR",
    "ARQUEÓLOGO",
    "ASTRONAUTA",
    "ASTRÓNOMO",
    "AUDITOR",
    "BARBERO",
    "BOTÁNICO",
    "CAMARERO",
    "CARTÓGRAFO",
    "CERAMISTA",
    "CIRUJANO",
    "COMERCIANTE",
    "CRONISTA",
    "DECORADOR",
    "DIPLOMÁTICO",
    "EDITOR",
    "ENTRENADOR",
    "FILÓSOFO",
    "FISCAL",
    "FÍSICO",
    "GUARDAPARQUE",
    "HISTORIADOR",
    "ILUSTRADOR",
    "JUEZ",
    "JOYERO",
    "MATEMÁTICO",
    "METEORÓLOGO",
    "MINERO",
    "MODELISTA",
    "NOTARIO",
    "DIETISTA",
    "OCEANÓGRAFO",
    "ÓPTICO",
    "ORFEBRE",
    "PEDIATRA",
    "PELUQUERO",
    "POLÍTICO",
    "PRODUCTOR",
    "QUÍMICO",
    "RADIÓLOGO",
    "RELOJERO",
    "REPORTERO",
    "SOCIÓLOGO",
    "TÉCNICO",
    "TERAPEUTA",
    "TOPÓGRAFO",
    "TORNERO",
    "URBANISTA",
    "ZAPATERO"
  ],
  "deportes": [
    "ACROBACIA",
    "AEROBISMO",
    "AIKIDO",
    "ALADELTA",
    "MOTONÁUTICA",
    "BALONMANO",
    "BIATLÓN",
    "BMX",
    "BOBSLEIGH",
    "BUCEO",
    "CICLOCROSS",
    "CROSS",
    "CURLING",
    "DARDOS",
    "DECATLÓN",
    "DESCENSO",
    "DUATLÓN",
    "ENDURO",
    "FOOTGOLF",
    "FREESTYLE",
    "FRONTÓN",
    "HALTEROFILIA",
    "KENDO",
    "KITESURF",
    "LANZAMIENTO",
    "MARCHA",
    "MUAYTHAI",
    "ORIENTACIÓN",
    "PAINTBALL",
    "PARAPENTE",
    "PARKOUR",
    "PELOTA",
    "PESCA",
    "PETANCA",
    "RAQUETBOL",
    "RODEO",
    "SALTO",
    "SENDERISMO",
    "SKATE",
    "SLALOM",
    "SNORKEL",
    "TENISMESA",
    "TIRO",
    "TRAMPOLÍN",
    "TREKKING",
    "TUMBLING",
    "ULTRATRAIL",
    "WAKEBOARD",
    "WAKESURF",
    "WINDSURF"
  ],
  "transportes": [
    "AEROTAXI",
    "ALADELTA",
    "AUTOBÚS",
    "AUTOCAR",
    "AUTOGIRO",
    "BARCAZA",
    "BERGANTÍN",
    "BICIMOTO",
    "BIPLANO",
    "CABRIOLET",
    "CARGUERO",
    "CARAVANA",
    "CARRUAJE",
    "CAZA",
    "CHALANA",
    "CICLOMOTOR",
    "CORBETA",
    "DILIGENCIA",
    "DRON",
    "DRAGA",
    "ESCÚTER",
    "FERROCARRIL",
    "FURGÓN",
    "GALEÓN",
    "GÓNDOLA",
    "GOLETA",
    "GRANELERO",
    "JEEP",
    "MICRO",
    "MINIBÚS",
    "MONORRIEL",
    "MOTOCARRO",
    "MOTOTAXI",
    "NAVÍO",
    "PARAPENTE",
    "PETROLERO",
    "PIRAGUA",
    "PORTAAVIONES",
    "ROMPEHIELOS",
    "TROLEBÚS",
    "ULTRALIGERO",
    "VAGONETA",
    "ZEPPELIN",
    "BIRRODADO",
    "MOTONIEVE",
    "AEROTREN",
    "HIDROBUS",
    "MOTOVELERO",
    "TAXIBÚS",
    "TRIMARÁN"
  ],
  "objetos": [
    "ABANICO",
    "ABRELATAS",
    "AGUJA",
    "ALFILER",
    "ANILLO",
    "ARMARIO",
    "BALDE",
    "BANDEJA",
    "BASTÓN",
    "BOLÍGRAFO",
    "BOMBILLA",
    "BORRADOR",
    "BRÚJULA",
    "CANASTA",
    "CANDADO",
    "CARPETA",
    "CASCO",
    "CENICERO",
    "CINTURÓN",
    "COLCHÓN",
    "CORTINA",
    "SACACORCHOS",
    "EMBUDO",
    "ESCALERA",
    "ESTANTE",
    "GOMA",
    "GORRA",
    "GRAPADORA",
    "IMÁN",
    "JABONERA",
    "LINTERNA",
    "MALETA",
    "MANGUERA",
    "MÁSCARA",
    "MICRÓFONO",
    "MONEDERO",
    "PAPELERA",
    "PERCHA",
    "PINCEL",
    "PIZARRA",
    "REGLA",
    "RODILLO",
    "SÁBANA",
    "SILBATO",
    "SOFÁ",
    "TALADRO",
    "TOALLA",
    "TRAPO",
    "TRÍPODE",
    "VENTILADOR"
  ],
  "naturaleza": [
    "AURORA",
    "BAHÍA",
    "BRISA",
    "CAÑÓN",
    "CAVERNA",
    "CENIZA",
    "CÉSPED",
    "CIELO",
    "CORDILLERA",
    "CRÁTER",
    "DELTA",
    "DUNA",
    "ECLIPSE",
    "ESTEPA",
    "ESTUARIO",
    "FARALLÓN",
    "FIORDO",
    "FUEGO",
    "GÉISER",
    "HORIZONTE",
    "HUMEDAL",
    "JUNGLA",
    "LADERA",
    "LAVA",
    "LLANURA",
    "MANANTIAL",
    "MAREA",
    "MESETA",
    "METEORITO",
    "PANTANO",
    "PÁRAMO",
    "PENÍNSULA",
    "PLANICIE",
    "QUEBRADA",
    "RIBERA",
    "SABANA",
    "SALINA",
    "SENDERO",
    "SIERRA",
    "SISMO",
    "TERREMOTO",
    "TORNADO",
    "TUNDRA",
    "VAGUADA",
    "VEGETACIÓN",
    "VENTISCA",
    "YERBA",
    "ARRECIFE",
    "LOMA",
    "OLEAJE"
  ],
  "nombres": [
    "ADRIÁN",
    "ALAN",
    "ALEJANDRA",
    "ALFONSO",
    "AMANDA",
    "ANDRÉS",
    "ANTONIA",
    "ARIANA",
    "BELÉN",
    "CANDELA",
    "CARMEN",
    "CECILIA",
    "CLARA",
    "DAMIÁN",
    "DANTE",
    "DELFINA",
    "EDUARDO",
    "ELÍAS",
    "ESTEBAN",
    "EUGENIA",
    "EZEQUIEL",
    "FABIÁN",
    "FELIPE",
    "FERNANDA",
    "GABRIEL",
    "GAEL",
    "GLORIA",
    "GUADALUPE",
    "GUILLERMO",
    "HELENA",
    "HUGO",
    "ISABEL",
    "IVÁN",
    "JAVIER",
    "JEREMÍAS",
    "JIMENA",
    "JOSÉ",
    "LEANDRO",
    "LORENA",
    "MANUEL",
    "MARIANO",
    "MARINA",
    "NADIA",
    "NATALIA",
    "OLIVIA",
    "RAMIRO",
    "RAÚL",
    "SALVADOR",
    "VERÓNICA",
    "ZOE"
  ]
};

const bancosPalabrasVersus = {
  paises: [
    ...palabrasAdicionalesVersus.paises,
    "ARGENTINA", "BRASIL", "CHILE", "PERÚ", "ESPAÑA", "MÉXICO", "CANADÁ", "ITALIA", "JAPÓN", "INDIA",
    "FRANCIA", "ALEMANIA", "PORTUGAL", "URUGUAY", "PARAGUAY", "BOLIVIA", "COLOMBIA", "ECUADOR", "VENEZUELA", "PANAMÁ",
    "CUBA", "HAITÍ", "JAMAICA", "BELICE", "GUATEMALA", "HONDURAS", "NICARAGUA", "DOMINICA", "GRANADA", "BAHAMAS",
    "SUIZA", "AUSTRIA", "BÉLGICA", "GRECIA", "POLONIA", "CROACIA", "SERBIA", "RUMANIA", "BULGARIA", "UCRANIA",
    "RUSIA", "CHINA", "TAILANDIA", "VIETNAM", "EGIPTO", "MARRUECOS", "KENIA", "ANGOLA", "AUSTRALIA", "TURQUÍA",
  ],
  frutas: [
    ...palabrasAdicionalesVersus.frutas,
    "MANZANA", "PERA", "UVA", "KIWI", "MANGO", "LIMÓN", "NARANJA", "BANANA", "CIRUELA", "MELÓN",
    "SANDÍA", "PAPAYA", "ANANÁ", "DURAZNO", "CEREZA", "FRUTILLA", "MANDARINA", "POMELO", "COCO", "HIGO",
    "GRANADA", "GUAYABA", "MARACUYÁ", "MEMBRILLO", "DAMASCO", "ARÁNDANO", "FRAMBUESA", "MORA", "GROSELLA", "LIMA",
    "PALTA", "TOMATE", "CAQUI", "LICHI", "NÍSPERO", "TUNA", "DÁTIL", "ACEITUNA", "BERGAMOTA", "CHIRIMOYA",
    "PITAHAYA", "TAMARINDO", "CARAMBOLA", "KUMQUAT", "TORONJA", "UCHUVA", "YACA", "MAMÓN", "ZARZAMORA", "NECTARINA",
  ],
  animales: [
    ...palabrasAdicionalesVersus.animales,
    "ÁGUILA", "BALLENA", "CABALLO", "CONEJO", "DELFÍN", "GATO", "JIRAFA", "LEÓN", "PANDA", "TIGRE",
    "PERRO", "ELEFANTE", "COCODRILO", "TORTUGA", "CANGURO", "KOALA", "CEBRA", "RINOCERONTE", "HIPOPÓTAMO", "MONO",
    "GORILA", "CHIMPANCÉ", "PINGÜINO", "TIBURÓN", "PULPO", "CALAMAR", "FOCA", "NUTRIA", "CASTOR", "ARDILLA",
    "LOBO", "ZORRO", "OSO", "PUMA", "JAGUAR", "LEOPARDO", "GUEPARDO", "HIENA", "BÚFALO", "BISONTE",
    "CAMELLO", "LLAMA", "CABRA", "OVEJA", "CERDO", "GALLO", "GALLINA", "PATO", "CISNE", "BÚHO",
  ],
  comidas: [
    ...palabrasAdicionalesVersus.comidas,
    "PIZZA", "PASTA", "EMPANADA", "MILANESA", "LOCRO", "SOPA", "ARROZ", "TORTILLA", "ENSALADA", "HELADO",
    "HAMBURGUESA", "LASAÑA", "RAVIOLES", "ÑOQUIS", "ASADO", "GUISO", "TARTA", "PANQUEQUE", "ALBÓNDIGA", "CROQUETA",
    "SÁNDWICH", "TAMAL", "HUMITA", "AREPA", "TACOS", "BURRITO", "CEVICHE", "SUSHI", "RAMEN", "PAELLA",
    "RISOTTO", "POLENTA", "PURÉ", "OMELETTE", "CHURRASCO", "CHORIZO", "MATAMBRE", "PARRILLA", "CALZONE", "FOCACCIA",
    "CHURRO", "FLAN", "BROWNIE", "GALLETA", "BIZCOCHO", "TORTA", "PASTEL", "BUDÍN", "MOUSSE", "GELATINA",
  ],
  profesiones: [
    ...palabrasAdicionalesVersus.profesiones,
    "MÉDICO", "DOCENTE", "BOMBERO", "ABOGADO", "ARTISTA", "PANADERO", "PILOTO", "ACTOR", "COCINERO", "DENTISTA",
    "INGENIERO", "ARQUITECTO", "ENFERMERO", "PERIODISTA", "CONTADOR", "MECÁNICO", "ELECTRICISTA", "CARPINTERO", "PLOMERO", "JARDINERO",
    "VETERINARIO", "FARMACÉUTICO", "PSICÓLOGO", "FOTÓGRAFO", "DISEÑADOR", "PROGRAMADOR", "CIENTÍFICO", "ESCRITOR", "MÚSICO", "PINTOR",
    "ESCULTOR", "BAILARÍN", "CANTANTE", "DIRECTOR", "CAMARÓGRAFO", "POLICÍA", "SOLDADO", "MARINERO", "TAXISTA", "CHOFER",
    "CARTERO", "CAJERO", "VENDEDOR", "SECRETARIO", "TRADUCTOR", "LOCUTOR", "AZAFATA", "AGRÓNOMO", "BIÓLOGO", "GEÓLOGO",
  ],
  deportes: [
    ...palabrasAdicionalesVersus.deportes,
    "FÚTBOL", "TENIS", "RUGBY", "HOCKEY", "BOXEO", "NATACIÓN", "CICLISMO", "VOLEY", "GOLF", "JUDO",
    "BÁSQUET", "HANDBALL", "BÉISBOL", "SOFTBOL", "CRÍQUET", "PÁDEL", "SQUASH", "SURF", "REMO", "VELA",
    "ATLETISMO", "TRIATLÓN", "MARATÓN", "ESGRIMA", "KARATE", "TAEKWONDO", "SUMO", "LUCHA", "POLO", "BOCHAS",
    "BILLAR", "AJEDREZ", "PATINAJE", "ESQUÍ", "SNOWBOARD", "ALPINISMO", "ESCALADA", "EQUITACIÓN", "CANOTAJE", "KAYAK",
    "MOTOCROSS", "RALLY", "KARTING", "BOWLING", "BÁDMINTON", "WATERPOLO", "LACROSSE", "FUTSAL", "ARQUERÍA", "GIMNASIA",
  ],
  transportes: [
    ...palabrasAdicionalesVersus.transportes,
    "AUTO", "TREN", "BARCO", "AVIÓN", "METRO", "BICICLETA", "CAMIÓN", "COLECTIVO", "TRANVÍA", "MOTO",
    "TAXI", "SUBTE", "ÓMNIBUS", "TRACTOR", "CAMIONETA", "FURGONETA", "MONOPATÍN", "TRICICLO", "CUATRICICLO", "MOTONETA",
    "VELERO", "LANCHA", "CANOA", "KAYAK", "BOTE", "YATE", "FERRY", "BUQUE", "CRUCERO", "SUBMARINO",
    "HELICÓPTERO", "AVIONETA", "PLANEADOR", "DIRIGIBLE", "GLOBO", "COHETE", "LANZADERA", "HIDROAVIÓN", "TELEFÉRICO", "FUNICULAR",
    "AMBULANCIA", "PATRULLERO", "REMOLQUE", "CARRETA", "CARRO", "TRINEO", "LOCOMOTORA", "MOTOCICLETA", "AERONAVE", "CATAMARÁN",
  ],
  objetos: [
    ...palabrasAdicionalesVersus.objetos,
    "MESA", "SILLA", "RELOJ", "LLAVE", "VASO", "LÁMPARA", "CUADERNO", "ESPEJO", "BOTELLA", "TIJERA",
    "PLATO", "TAZA", "TENEDOR", "CUCHILLO", "CUCHARA", "OLLA", "SARTÉN", "JARRA", "TERMO", "MATE",
    "MOCHILA", "CARTERA", "BILLETERA", "PARAGUAS", "SOMBRERO", "ZAPATO", "CAMISA", "PANTALÓN", "BUFANDA", "GUANTE",
    "TELÉFONO", "TABLETA", "RADIO", "CÁMARA", "AURICULAR", "TECLADO", "PANTALLA", "CONTROL", "CARGADOR", "BATERÍA",
    "MARTILLO", "SERRUCHO", "PINZA", "CLAVO", "TORNILLO", "ESCOBA", "PALA", "CEPILLO", "PEINE", "ALMOHADA",
  ],
  naturaleza: [
    ...palabrasAdicionalesVersus.naturaleza,
    "SOL", "MAR", "RÍO", "LUNA", "MONTAÑA", "VOLCÁN", "BOSQUE", "NUBE", "VIENTO", "LAGUNA",
    "OCÉANO", "PLAYA", "ISLA", "VALLE", "COLINA", "PRADERA", "DESIERTO", "SELVA", "CASCADA", "ARROYO",
    "LAGO", "GLACIAR", "ICEBERG", "ACANTILADO", "CUEVA", "ROCA", "PIEDRA", "ARENA", "TIERRA", "BARRO",
    "LLUVIA", "NIEVE", "GRANIZO", "TORMENTA", "TRUENO", "RELÁMPAGO", "NIEBLA", "ROCÍO", "HIELO", "ESCARCHA",
    "ÁRBOL", "FLOR", "HOJA", "RAMA", "RAÍZ", "MUSGO", "HONGO", "SEMILLA", "PÉTALO", "JUNCAL",
  ],
  nombres: [
    ...palabrasAdicionalesVersus.nombres,
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

function obtenerIntervaloJugadaRivalVersus() {
  if (dueloAventuraActivo) {
    return dueloAventuraActivo.intervaloRival || intervaloJugadaRivalVersus;
  }
  if (!modoArcadeActivo) return modoPruebasActivo
    ? intervaloJugadaRivalVersus * 4
    : intervaloJugadaRivalVersus;
  return Math.max(1550, 3550 - pisoCombateArcade * 270);
}

function obtenerProbabilidadAciertoRivalVersus() {
  if (dueloAventuraActivo) {
    return dueloAventuraActivo.probabilidadRival || probabilidadAciertoRivalVersus;
  }
  if (!modoArcadeActivo) return probabilidadAciertoRivalVersus;
  return Math.min(.82, .43 + pisoCombateArcade * .055);
}
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
const srcHombreLoboHumanoVersus = "assets/images/personajes/versus/hombre-lobo-humano.png";
const srcHombreLoboTransformacionVersus = "assets/images/personajes/versus/hombre-lobo-transformacion.png";
const srcHombreLoboAullidoVersus = "assets/images/personajes/versus/hombre-lobo-aullido.png";
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
const srcGuardianAlbaFinalCargaVersus = "assets/images/personajes/versus/guardian-alba-final-carga-sin-rayo.png";
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
const srcKalamoBaseVersus = "assets/images/personajes/versus/kalamo-base.png";
const srcKalamoAtaqueVersus = "assets/images/personajes/versus/kalamo-ataque.png";
const srcKalamoHabilidadVersus = "assets/images/personajes/versus/kalamo-habilidad.png";
const srcKalamoImpactoVersus = "assets/images/personajes/versus/kalamo-impacto.png";
const srcKairosSeleccionVersus = "assets/images/personajes/versus/kairos-seleccion-v2.png";
const srcKairosBaseVersus = "assets/images/personajes/versus/kairos-combate-v1.png";
const srcKairosAtaqueVersus = "assets/images/personajes/versus/kairos-ataque-v2.png";
const srcExploradorEnvejecidoKairosVersus = "assets/images/personajes/versus/explorador-envejecido-kairos-v2.png";
const srcExploradorAncianoKairosVersus = "assets/images/personajes/versus/explorador-anciano-kairos-v2.png";
const imagenesEdadKairosVersus = Object.freeze({
  kairos: Object.freeze({ intermedia: "assets/images/personajes/versus/kairos-envejecido-kairos-v1.png", anciana: "assets/images/personajes/versus/kairos-anciano-kairos-v1.png" }),
  explorador: Object.freeze({ intermedia: srcExploradorEnvejecidoKairosVersus, anciana: srcExploradorAncianoKairosVersus }),
  mago: Object.freeze({ intermedia: "assets/images/personajes/versus/mago-envejecido-kairos-v1.png", anciana: "assets/images/personajes/versus/mago-anciano-kairos-v1.png" }),
  guardiana: Object.freeze({ intermedia: "assets/images/personajes/versus/guardiana-envejecida-kairos-v1.png", anciana: "assets/images/personajes/versus/guardiana-anciana-kairos-v1.png" }),
  dragon: Object.freeze({ intermedia: "assets/images/personajes/versus/dragon-adulto-kairos-v1.png", anciana: "assets/images/personajes/versus/dragon-anciano-kairos-v1.png" }),
  hombre_lobo: Object.freeze({ intermedia: "assets/images/personajes/versus/hombre-lobo-envejecido-kairos-v1.png", anciana: "assets/images/personajes/versus/hombre-lobo-anciano-kairos-v1.png" }),
  t_shadow: Object.freeze({ intermedia: "assets/images/personajes/versus/t-shadow-envejecido-kairos-v1.png", anciana: "assets/images/personajes/versus/t-shadow-anciano-kairos-v1.png" }),
  guardian_alba: Object.freeze({ intermedia: "assets/images/personajes/versus/guardian-alba-envejecido-kairos-v1.png", anciana: "assets/images/personajes/versus/guardian-alba-anciano-kairos-v1.png" }),
  dragon_hielo: Object.freeze({ intermedia: "assets/images/personajes/versus/dragon-hielo-envejecido-kairos-v1.png", anciana: "assets/images/personajes/versus/dragon-hielo-anciano-kairos-v1.png" }),
  azrak: Object.freeze({ intermedia: "assets/images/personajes/versus/azrak-envejecido-kairos-v1.png", anciana: "assets/images/personajes/versus/azrak-anciano-kairos-v1.png" }),
  kalamo: Object.freeze({ intermedia: "assets/images/personajes/versus/kalamo-envejecido-kairos-v1.png", anciana: "assets/images/personajes/versus/kalamo-anciano-kairos-v1.png" }),
});
const imagenesFinalKairosVersus = Object.freeze({
  kairos: "assets/images/personajes/versus/kairos-final-kairos-v1.png",
  explorador: "assets/images/personajes/versus/kairos-final-explorador-concepto-v1.png",
  mago: "assets/images/personajes/versus/kairos-final-mago-v1.png",
  guardiana: "assets/images/personajes/versus/kairos-final-guardiana-v1.png",
  dragon: "assets/images/personajes/versus/kairos-final-dragon-v1.png",
  hombre_lobo: "assets/images/personajes/versus/kairos-final-hombre-lobo-v1.png",
  t_shadow: "assets/images/personajes/versus/kairos-final-t-shadow-v1.png",
  guardian_alba: "assets/images/personajes/versus/kairos-final-guardian-alba-v1.png",
  dragon_hielo: "assets/images/personajes/versus/kairos-final-dragon-hielo-v1.png",
  azrak: "assets/images/personajes/versus/kairos-final-azrak-v1.png",
  kalamo: "assets/images/personajes/versus/kairos-final-kalamo-v1.png",
});
const personajesVersus = {
  explorador: {
    nombre: "Aren",
    base: srcExploradorBaseVersus,
    ataque: "bumeran",
    final: "trampa-selvatica",
  },
  mago: {
    nombre: "Zafir",
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
    nombre: "Nimbus",
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
  kalamo: {
    nombre: "Kálamo",
    base: srcKalamoBaseVersus,
    ataque: "latigazo-tinta",
    final: "libro-palabras-perdidas",
  },
  kairos: {
    nombre: "Kairós",
    base: srcKairosBaseVersus,
    ataque: "aguja-tiempo",
    final: "siglos-en-un-segundo",
  },
};
const clasesVictimasKairosVersus = Object.freeze(
  Object.keys(personajesVersus).map((personaje) => `kairos-victima-${personaje}`),
);
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
  kalamo: { nombre: "Bestia del Tintero", icono: "🦏", efecto: "key_theft", duracion: 5000 },
  kairos: { nombre: "Robo de instantes", icono: "⏳", efecto: "time_steal", duracion: 0, segundos: 20 },
});
const letrasParaHabilidadVersus = VersusEngine.CONFIG.letrasParaHabilidad;
let personajeJugadorVersus = "explorador";
let personajeRivalVersus = "mago";

const configuracionesDuelosAventura = Object.freeze({
  hombre_lobo: {
    escenario: 0,
    mision: 5,
    rival: "hombre_lobo",
    etiqueta: "PRUEBA DEL GUARDIÁN DE LA LUNA",
    arena: "assets/images/fondos/bosque-6.png",
    altArena: "Claro lunar del Bosque Encantado",
  },
  guardiana: {
    escenario: 0,
    mision: 9,
    rival: "guardiana",
    etiqueta: "PRUEBA DE LA GUARDIANA",
    arena: "assets/images/fondos/bosque-10-apagado.png",
    altArena: "Portal dormido del Bosque Encantado",
  },
  mago_desierto: {
    escenario: 1,
    mision: 9,
    rival: "mago",
    etiqueta: "PRUEBA FINAL DEL CRISTAL DORADO",
    arena: "assets/images/fondos/desierto-10.png",
    altArena: "Santuario del Cristal Dorado en el Desierto Perdido",
  },
  nimbus_cumbres: {
    escenario: 2,
    mision: 9,
    rival: "dragon",
    etiqueta: "JURAMENTO DEL PEQUEÑO GUARDIÁN",
    arena: "assets/images/fondos/cumbres-10.png",
    altArena: "Arena celeste del juramento de Nimbus",
  },
  nivor_glacial: {
    escenario: 3,
    mision: 5,
    rival: "dragon_hielo",
    etiqueta: "PRIMER DUELO CONTRA NIVOR",
    arena: "assets/images/fondos/hielo-6.png",
    altArena: "Arena glacial ante la fortaleza de Nivor",
    intervaloRival: 2700,
    probabilidadRival: 0.62,
  },
  nivor_cero_absoluto: {
    escenario: 3,
    mision: 9,
    rival: "dragon_hielo",
    etiqueta: "BATALLA FINAL · CERO ABSOLUTO",
    arena: "assets/images/fondos/hielo-10.png",
    altArena: "Cumbre del Cero Absoluto bajo la aurora",
    intervaloRival: 1900,
    probabilidadRival: 0.76,
  },
});

async function presentarDueloAventura(tipo) {
  const configuracion = configuracionesDuelosAventura[tipo];
  if (
    !configuracion
    || dueloAventuraActivo
    || escenarioActual !== configuracion.escenario
    || misionActual !== configuracion.mision
  ) {
    return;
  }

  await esperarCierreHistoriaMision();
  if (
    dueloAventuraActivo
    || escenarioActual !== configuracion.escenario
    || misionActual !== configuracion.mision
  ) {
    return;
  }

  if (tipo === "guardiana") await presentarDesafioGuardianaBosque();
  if (tipo === "mago_desierto") await presentarDesafioMagoDesierto();
  if (
    escenarioActual !== configuracion.escenario
    || misionActual !== configuracion.mision
  ) {
    return;
  }

  iniciarDueloAventura(tipo);
}

function iniciarDueloAventura(tipo) {
  const configuracion = configuracionesDuelosAventura[tipo];
  if (!configuracion) return;

  cancelarCinematicaFinalVersus();
  detenerRondaVersus();
  modoArcadeActivo = false;
  adaptadorSalasVersus = adaptadorLocalSalasVersus;
  partidaOnlineVersus = null;
  partidaOnlineIniciada = false;
  personajeJugadorVersus = "explorador";
  personajeRivalVersus = configuracion.rival;

  const tematicasDisponibles = Object.keys(bancosPalabrasVersus);
  const tematicaRival = tematicasDisponibles[
    Math.floor(Math.random() * tematicasDisponibles.length)
  ];
  tematicaVersus.value = tematicaRival;
  palabrasSecretasVersus = mezclarPalabrasVersus(
    bancosPalabrasVersus[tematicaRival],
  ).slice(0, maximoPalabrasVersus);
  dueloAventuraActivo = {
    ...configuracion,
    tipo,
    resultado: "",
  };

  prepararDueloVersus({ comenzarRonda: false });
  fondoVersus.src = configuracion.arena;
  fondoVersus.alt = configuracion.altArena;
  document.querySelector(".versus-jugador-uno .versus-etiqueta").textContent = "EXPLORADOR";
  document.querySelector(".versus-jugador-dos .versus-etiqueta").textContent =
    personajesVersus[configuracion.rival].nombre.toUpperCase();
  mensajeRondaVersus.textContent = configuracion.etiqueta;
  pantallaVersus.classList.add("duelo-aventura");
  btnSalirVersus.textContent = "← Abandonar prueba";
  btnSalirVersusVertical.textContent = "Abandonar prueba";
  mostrarPantalla(pantallaVersus);
  requestAnimationFrame(iniciarEntradaDueloVersus);
}

function limpiarInterfazDueloAventura() {
  pantallaVersus.classList.remove("duelo-aventura");
  btnSalirVersus.textContent = "← Volver";
  btnSalirVersusVertical.textContent = "Volver al menú";
  resultadoRondaVersus.classList.add("oculto");
  btnRevanchaVersus.classList.add("oculto");
  mensajeRondaVersus.textContent = "Cada error gasta un intento";
}

function abandonarDueloAventura() {
  cancelarCinematicaFinalVersus();
  detenerRondaVersus();
  dueloAventuraActivo = null;
  limpiarInterfazDueloAventura();
  mostrarPantalla(pantallaMenu);
}

function reintentarDueloAventura() {
  const tipo = dueloAventuraActivo?.tipo;
  if (!tipo) return;
  dueloAventuraActivo = null;
  limpiarInterfazDueloAventura();
  iniciarDueloAventura(tipo);
}

async function completarDueloAventura() {
  const duelo = dueloAventuraActivo;
  if (!duelo || duelo.resultado !== "jugador") return;

  dueloAventuraActivo = null;
  limpiarInterfazDueloAventura();
  mostrarPantalla(pantallaJuego);
  otorgarMonedas(30, `aventura:${duelo.tipo}:duelo`);
  experiencia += 60;
  actualizarJugador();

  if (duelo.tipo === "hombre_lobo") {
    hombreLoboDescubierto = true;
    await ejecutarEncuentroHombreLoboMision("victoria");
    desafiosCompletados = desafiosPorMision - 1;
    sonidoNarrativoPendiente = avanzarMision();
    btnSiguiente.textContent = "➡️ Siguiente misión";
    guardarProgreso();
    const mensajeCompleto = await mostrarMensajeDesafioSuperado();
    if (mensajeCompleto) continuarAventura();
    return;
  }

  if (duelo.tipo === "mago_desierto") {
    desafiosCompletados = desafiosPorMision;
    cristalesObtenidos = Math.max(cristalesObtenidos, 2);
    mundoDosCompletado = true;
    historiaMisionPendiente = false;
    guardarDesbloqueoMago();
    contenedorEscenario.classList.add("final-desierto-activo");
    actualizarJugador();
    actualizarDisponibilidadPersonajesVersus();
    guardarProgreso();

    await reproducirCinematicaFinalDesierto();
    await presentarDesbloqueoMagoDesierto();

    bloquearTeclado();
    btnPista.disabled = true;
    btnSiguiente.textContent = "☁️ Entrar a Cumbres Celestes";
    btnSiguiente.classList.remove("oculto");
    mensajePersonaje.classList.remove("oculto");
    mensajePersonaje.textContent =
      "✨ El Cristal Dorado está a salvo. Zafir abrió el portal hacia las Cumbres Celestes.";
    actualizarPersonajesNarrativosDesierto();
    guardarProgreso();
    return;
  }

  if (duelo.tipo === "nimbus_cumbres") {
    desafiosCompletados = desafiosPorMision;
    cristalesObtenidos = Math.max(cristalesObtenidos, 3);
    mundoTresCompletado = true;
    historiaMisionPendiente = false;
    guardarDesbloqueoNimbus();
    actualizarJugador();
    actualizarDisponibilidadPersonajesVersus();
    guardarProgreso();
    actualizarPersonajesNarrativosCumbres();
    await reproducirCinematicaFinalCumbres();
    bloquearTeclado();
    btnPista.disabled = true;
    btnSiguiente.textContent = "❄️ Entrar al Reino del Invierno Eterno";
    btnSiguiente.classList.remove("oculto");
    mensajePersonaje.classList.remove("oculto");
    mensajePersonaje.textContent =
      "💎 Aeralis llevó a Aren al Mundo de Hielo. Nimbus ya está disponible en Versus.";
    guardarProgreso();
    return;
  }

  if (duelo.tipo === "nivor_glacial") {
    primerDueloNivorCompletado = true;
    desafiosCompletados = desafiosPorMision - 1;
    sonidoNarrativoPendiente = avanzarMision();
    btnSiguiente.textContent = "➡️ Seguir la pista de Nivor";
    guardarProgreso();
    mensajePersonaje.classList.remove("oculto");
    mensajePersonaje.textContent =
      "❄️ Nivor interrumpe el duelo y se retira. Algo más fuerte que su orgullo lo obliga a proteger la fortaleza.";
    const mensajeCompleto = await mostrarMensajeDesafioSuperado();
    if (mensajeCompleto) continuarAventura();
    return;
  }

  if (duelo.tipo === "nivor_cero_absoluto") {
    desafiosCompletados = desafiosPorMision;
    cristalesObtenidos = Math.max(cristalesObtenidos, 4);
    mundoCuatroCompletado = true;
    historiaMisionPendiente = false;
    guardarDesbloqueoNivor();
    actualizarJugador();
    actualizarDisponibilidadPersonajesVersus();
    guardarProgreso();
    await reproducirCinematicaFinalHielo();
    bloquearTeclado();
    btnPista.disabled = true;
    btnSiguiente.textContent = "🔥 Mundo 5 · Próximamente";
    btnSiguiente.classList.remove("oculto");
    mensajePersonaje.classList.remove("oculto");
    mensajePersonaje.textContent =
      "💎 El Cristal Glacial está a salvo. Nivor descubrió el engaño de Azrak y ahora luchará junto a Aren.";
    guardarProgreso();
    return;
  }

  await presentarDesbloqueoGuardianaBosque();
  desafiosCompletados = desafiosPorMision - 1;
  portalAbierto = true;
  guardarProgreso();
  await completarAperturaPortal();
}

async function reproducirCinematicaFinalCumbres() {
  const duracionLecturaEscena = 7600;
  const esperarLectura = (milisegundos) => new Promise((resolver) => {
    window.setTimeout(resolver, milisegundos);
  });
  const escenas = [
    {
      fondo: "cumbres-10.png",
      texto: "Nimbus baja la cabeza. La batalla no era por orgullo: quería saber si Aren protegería a su familia.",
      nimbus: true,
    },
    {
      fondo: "cumbres-9.png",
      texto: "Su llamado atraviesa las nubes. Los últimos sellos se apagan y Aeralis, la Matriarca del Firmamento, extiende por fin sus alas.",
      aeralis: true,
    },
    {
      fondo: "cumbres-8.png",
      texto: "Aeralis reconoce el Cristal Verde y el Cristal Dorado. Aren no vino a robar: está restaurando el equilibrio de los cinco mundos.",
      aeralis: true,
      nimbus: true,
    },
    {
      fondo: "cumbres-10.png",
      texto: "La Matriarca libera el Cristal Celeste y lo confía a Aren. Nimbus promete acompañar su juramento desde la arena Versus.",
      aeralis: true,
      nimbus: true,
      cristal: true,
    },
    {
      imagen: "01-aeralis-invita-aren-v1.png",
      alt: "Aeralis baja un ala ante Aren y le ofrece llevarlo al siguiente mundo",
      texto: "No hará falta abrir otro portal. Aeralis baja una de sus enormes alas y ofrece llevar a Aren hasta el cuarto mundo.",
    },
    {
      imagen: "02-aren-sube-aeralis-v2.png",
      alt: "Aren sentado sobre la espalda de Aeralis antes de despegar",
      texto: "Aren se acomoda entre las escamas de la Matriarca. Con un poderoso aleteo, las Cumbres Celestes quedan atrás.",
    },
    {
      imagen: "03-vuelo-mundo-hielo-v1.png",
      alt: "Aeralis vuela con Aren sobre las nubes rumbo al mundo helado",
      texto: "Juntos atraviesan el mar de nubes. El aire se vuelve cada vez más frío y, bajo la aurora, aparece un reino de hielo.",
    },
    {
      imagen: "04-llegada-mundo-hielo-v1.png",
      alt: "Aren se despide de Aeralis en el Mundo de Hielo",
      texto: "MUNDO 4 · Aeralis deja a Aren a salvo sobre la nieve y regresa con Nimbus. Desde aquí deberá continuar la exploración solo.",
    },
  ];
  const capa = document.createElement("div");
  capa.className = "cinematica-final-cumbres";
  capa.innerHTML = `
    <img class="cinematica-cumbres-ambiente" alt="" aria-hidden="true">
    <img class="cinematica-cumbres-fondo" alt="">
    <div class="cinematica-cumbres-personajes" aria-hidden="true"></div>
    <p class="cinematica-cumbres-texto"></p>
    <button type="button" class="cinematica-cumbres-saltar">Saltar</button>`;
  document.body.appendChild(capa);
  const ambiente = capa.querySelector(".cinematica-cumbres-ambiente");
  const fondo = capa.querySelector(".cinematica-cumbres-fondo");
  const personajes = capa.querySelector(".cinematica-cumbres-personajes");
  const texto = capa.querySelector(".cinematica-cumbres-texto");
  let saltar = false;
  capa.querySelector(".cinematica-cumbres-saltar").addEventListener("click", () => {
    saltar = true;
  });

  try {
    reproducirMusicaCinematica(
      musicaCinematicaFinalMundo3,
      "Música de la cinemática final del mundo 3",
      0.58,
    );
    await Promise.all(
      escenas
        .filter((escena) => escena.imagen)
        .map((escena) => precargarImagen(`assets/images/cinematicas/cumbres-final/${escena.imagen}`)),
    );
    let primerPlano = true;
    for (const escena of escenas) {
      if (saltar) break;
      if (!primerPlano) {
        capa.classList.add("cambiando-plano");
        await esperarMovimiento(prefiereReducirMovimiento.matches ? 0 : 260);
      }
      const origenPlano = escena.imagen
        ? `assets/images/cinematicas/cumbres-final/${escena.imagen}`
        : `assets/images/fondos/${escena.fondo}`;
      capa.classList.toggle("plano-ilustrado", Boolean(escena.imagen));
      ambiente.src = origenPlano;
      fondo.src = origenPlano;
      fondo.alt = escena.alt || "";
      personajes.replaceChildren();
      if (escena.aeralis) {
        const imagen = document.createElement("img");
        imagen.className = "cinematica-aeralis";
        imagen.src = "assets/images/personajes/aventura/aeralis-liberada-v1.png";
        personajes.appendChild(imagen);
      }
      if (escena.nimbus) {
        const imagen = document.createElement("img");
        imagen.className = "cinematica-nimbus";
        imagen.src = "assets/images/personajes/versus/dragon-victoria.png";
        personajes.appendChild(imagen);
      }
      if (escena.cristal) {
        const imagen = document.createElement("img");
        imagen.className = "cinematica-cristal-celeste";
        imagen.src = "assets/images/elements/cristal-celeste-v1.png";
        personajes.appendChild(imagen);
      }
      texto.textContent = escena.texto;
      if (primerPlano) {
        capa.classList.add("visible");
        primerPlano = false;
      } else {
        await esperarMovimiento(prefiereReducirMovimiento.matches ? 0 : 30);
        capa.classList.remove("cambiando-plano");
      }
      const paso = 200;
      for (let transcurrido = 0; transcurrido < duracionLecturaEscena && !saltar; transcurrido += paso) {
        await esperarLectura(paso);
      }
    }
  } finally {
    detenerMusicaCinematica(musicaCinematicaFinalMundo3, 0.58);
    capa.classList.remove("visible");
    await esperarMovimiento(250);
    capa.remove();
  }
}

async function reproducirIntroduccionMundoHielo() {
  const capa = document.createElement("div");
  capa.className = "cinematica-final-cumbres cinematica-mundo-hielo";
  capa.innerHTML = `
    <img class="cinematica-cumbres-ambiente" alt="" aria-hidden="true">
    <img class="cinematica-cumbres-fondo" alt="Aren queda solo en la nieve mientras Nivor lo observa desde una cresta">
    <div class="cinematica-cumbres-personajes" aria-hidden="true"></div>
    <p class="cinematica-cumbres-texto"></p>
    <button type="button" class="cinematica-cumbres-saltar">Continuar</button>`;
  const origen = "assets/images/cinematicas/mundo-hielo/01-aren-vigilado-por-nivor-v1.png";
  const ambiente = capa.querySelector(".cinematica-cumbres-ambiente");
  const fondo = capa.querySelector(".cinematica-cumbres-fondo");
  const texto = capa.querySelector(".cinematica-cumbres-texto");
  ambiente.src = origen;
  fondo.src = origen;
  texto.textContent =
    "Aeralis se pierde tras la ventisca. La nieve borra sus huellas y, desde la cresta, la silueta de Nivor vigila cada paso de Aren.";
  document.body.appendChild(capa);
  await esperarCargaImagen(fondo);
  capa.classList.add("visible", "plano-ilustrado");
  await new Promise((resolver) => {
    const temporizador = window.setTimeout(resolver, prefiereReducirMovimiento.matches ? 900 : 5600);
    capa.querySelector(".cinematica-cumbres-saltar").addEventListener("click", () => {
      window.clearTimeout(temporizador);
      resolver();
    }, { once: true });
  });
  capa.classList.remove("visible");
  await esperarMovimiento(250);
  capa.remove();
}

async function reproducirCinematicaFinalHielo() {
  const escenas = [
    {
      imagen: "02-nivor-rompe-cadenas-v1.png",
      alt: "Nivor rompe las cadenas de hielo negro que retenían el último huevo boreal",
      texto: "La prueba bajo el glaciar era cierta: Azrak provocó el deshielo y convirtió el miedo de Nivor en una cadena. El dragón rompe su pacto y libera el último huevo boreal.",
    },
    {
      imagen: "03-nivor-entrega-cristal-v1.png",
      alt: "Nivor entrega el Cristal Glacial a Aren al amanecer",
      texto: "Al amanecer, Nivor confía a Aren el Cristal Glacial. No pide olvidar sus errores: promete repararlos y enfrentar a Azrak junto a los guardianes de los cuatro mundos.",
    },
  ];
  const capa = document.createElement("div");
  capa.className = "cinematica-final-cumbres cinematica-mundo-hielo";
  capa.innerHTML = `
    <img class="cinematica-cumbres-ambiente" alt="" aria-hidden="true">
    <img class="cinematica-cumbres-fondo" alt="">
    <div class="cinematica-cumbres-personajes" aria-hidden="true"></div>
    <p class="cinematica-cumbres-texto"></p>
    <button type="button" class="cinematica-cumbres-saltar">Saltar</button>`;
  document.body.appendChild(capa);
  const ambiente = capa.querySelector(".cinematica-cumbres-ambiente");
  const fondo = capa.querySelector(".cinematica-cumbres-fondo");
  const texto = capa.querySelector(".cinematica-cumbres-texto");
  let saltar = false;
  capa.querySelector(".cinematica-cumbres-saltar").addEventListener("click", () => (saltar = true));
  await Promise.all(escenas.map(({ imagen }) =>
    precargarImagen(`assets/images/cinematicas/mundo-hielo/${imagen}`)));
  let primera = true;
  for (const escena of escenas) {
    if (saltar) break;
    if (!primera) {
      capa.classList.add("cambiando-plano");
      await esperarMovimiento(prefiereReducirMovimiento.matches ? 0 : 260);
    }
    const origen = `assets/images/cinematicas/mundo-hielo/${escena.imagen}`;
    ambiente.src = origen;
    fondo.src = origen;
    fondo.alt = escena.alt;
    texto.textContent = escena.texto;
    if (primera) {
      capa.classList.add("visible", "plano-ilustrado");
      primera = false;
    } else {
      capa.classList.remove("cambiando-plano");
    }
    for (let tiempo = 0; tiempo < (prefiereReducirMovimiento.matches ? 1200 : 6800) && !saltar; tiempo += 200) {
      await new Promise((resolver) => window.setTimeout(resolver, 200));
    }
  }
  capa.classList.remove("visible");
  await esperarMovimiento(250);
  capa.remove();
}

const victimasFaucesVersus = {
  explorador: {
    nombre: "Aren",
    imagen: srcExploradorBaseVersus,
    imagenAtrapado: "assets/images/personajes/versus/carnivora-devorando-explorador.png",
  },
  mago: {
    nombre: "Zafir",
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
  kalamo: {
    nombre: "Kálamo",
    imagen: srcKalamoBaseVersus,
    imagenAtrapado: "assets/images/personajes/versus/carnivora-devorando-kalamo.png",
  },
  kairos: {
    nombre: "Kairós",
    imagen: srcKairosBaseVersus,
    imagenAtrapado: srcKairosBaseVersus,
  },
};

const posesDanoPersonajeVersus = {
  hombre_lobo: srcHombreLoboImpactoVersus,
  t_shadow: srcShadowImpactoVersus,
  guardian_alba: srcGuardianAlbaImpactoVersus,
  dragon_hielo: srcDragonHieloImpactoVersus,
  azrak: srcAzrakImpactoVersus,
  kalamo: srcKalamoImpactoVersus,
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
  palabrasCompletadasJugador: 0,
  palabrasCompletadasRival: 0,
  ultimaPalabraFalladaJugador: "",
  ultimaPalabraFalladaRival: "",
  letrasJugador: new Set(),
  letrasRival: new Set(),
  teclasRobadasJugador: new Set(),
  teclasRobadasRival: new Set(),
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
    "lanzando-tinta",
    "lanzando-tiempo",
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
  latigazoTintaKalamoVersus.classList.remove("volando", "desde-rival");
  agujaTiempoKairosVersus.classList.remove("volando", "desde-rival");
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
    "lanzando-tinta",
    "lanzando-tiempo",
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
  latigazoTintaKalamoVersus.classList.remove("volando", "desde-rival");
  agujaTiempoKairosVersus.classList.remove("volando", "desde-rival");
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
    "personaje-kalamo",
    "personaje-kairos",
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
    "personaje-kalamo",
    "personaje-kairos",
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

function programarTransformacionEntradaHombreLobo(elemento) {
  elemento.src = srcHombreLoboHumanoVersus;

  programarPasoEntradaVersus(() => {
    elemento.src = srcHombreLoboTransformacionVersus;
    reproducirSonidoVersus("versusAtaqueUno", 0.52);
  }, 760);

  programarPasoEntradaVersus(() => {
    elemento.src = srcHombreLoboAullidoVersus;
    reproducirSonidoVersus("lobos", 0.72);
  }, 1510);

  programarPasoEntradaVersus(() => {
    elemento.src = srcHombreLoboBaseVersus;
  }, 2520);
}

function programarEntradaKairosVersus(elemento) {
  elemento.src = srcKairosBaseVersus;
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
    "entrada-kalamo",
    "entrada-kairos",
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
    "entrada-kalamo-rival",
    "entrada-kairos-rival",
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
    obtenerIntervaloJugadaRivalVersus(),
  );
}

async function jugarLetraVersus(letra, boton) {
  if (!boton.disabled) reproducirPulsacionTeclaVersus("jugador");
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
  if (!movimientoReducido && personajeJugadorVersus === "hombre_lobo") {
    programarTransformacionEntradaHombreLobo(personajeVersusUno);
  }
  if (!movimientoReducido && personajeRivalVersus === "hombre_lobo") {
    programarTransformacionEntradaHombreLobo(personajeVersusDos);
  }
  if (!movimientoReducido && personajeJugadorVersus === "kairos") {
    programarEntradaKairosVersus(personajeVersusUno);
  }
  if (!movimientoReducido && personajeRivalVersus === "kairos") {
    programarEntradaKairosVersus(personajeVersusDos);
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

function reproducirAtaqueKalamoVersus() {
  limpiarAnimacionAtaqueJugadorVersus();
  herramientasPruebasVersus.classList.add("ataque-en-curso");
  personajeVersusUno.src = srcKalamoAtaqueVersus;
  personajeVersusUno.classList.add("lanzando-tinta");
  latigazoTintaKalamoVersus.classList.remove("desde-rival");
  void latigazoTintaKalamoVersus.offsetWidth;
  latigazoTintaKalamoVersus.classList.add("volando");
  reproducirSonidoVersus("versusAtaqueUno", 0.76);
  programarPasoAtaqueVersus(() => {
    mostrarPoseDanoPersonajeVersus(personajeVersusDos, personajeRivalVersus);
    personajeVersusDos.classList.add("recibiendo-dano-magico");
    vidasVersusDos.classList.add("recibiendo-dano");
    reproducirSonidoVersus("versusAtaqueDos", 0.82);
  }, 610, "jugador");
  programarPasoAtaqueVersus(() => {
    personajeVersusDos.classList.remove("recibiendo-dano-magico");
    vidasVersusDos.classList.remove("recibiendo-dano");
  }, 980, "jugador");
  programarPasoAtaqueVersus(limpiarAnimacionAtaqueJugadorVersus, 1360, "jugador");
}

function reproducirAtaqueKairosVersus() {
  limpiarAnimacionAtaqueJugadorVersus();
  herramientasPruebasVersus.classList.add("ataque-en-curso");
  personajeVersusUno.src = srcKairosAtaqueVersus;
  personajeVersusUno.classList.add("lanzando-tiempo");
  agujaTiempoKairosVersus.classList.remove("desde-rival");
  void agujaTiempoKairosVersus.offsetWidth;
  agujaTiempoKairosVersus.classList.add("volando");
  reproducirSonidoVersus("versusAtaqueUno", 0.76);
  programarPasoAtaqueVersus(() => {
    mostrarPoseDanoPersonajeVersus(personajeVersusDos, personajeRivalVersus);
    personajeVersusDos.classList.add("recibiendo-dano-magico");
    vidasVersusDos.classList.add("recibiendo-dano");
    reproducirSonidoVersus("versusAtaqueDos", 0.84);
  }, 650, "jugador");
  programarPasoAtaqueVersus(() => {
    personajeVersusDos.classList.remove("recibiendo-dano-magico");
    vidasVersusDos.classList.remove("recibiendo-dano");
  }, 1010, "jugador");
  programarPasoAtaqueVersus(limpiarAnimacionAtaqueJugadorVersus, 1380, "jugador");
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
  if (ataque === "latigazo-tinta") {
    reproducirAtaqueKalamoVersus();
    return;
  }
  if (ataque === "aguja-tiempo") {
    reproducirAtaqueKairosVersus();
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

function reproducirAtaqueKalamoRivalVersus() {
  limpiarAnimacionAtaqueRivalVersus();
  personajeVersusDos.src = srcKalamoAtaqueVersus;
  personajeVersusDos.classList.add("lanzando-tinta");
  latigazoTintaKalamoVersus.classList.add("desde-rival");
  void latigazoTintaKalamoVersus.offsetWidth;
  latigazoTintaKalamoVersus.classList.add("volando");
  reproducirSonidoVersus("versusAtaqueUno", 0.76);
  programarImpactoRivalVersus(610, 1360);
}

function reproducirAtaqueKairosRivalVersus() {
  limpiarAnimacionAtaqueRivalVersus();
  personajeVersusDos.src = srcKairosAtaqueVersus;
  personajeVersusDos.classList.add("lanzando-tiempo");
  agujaTiempoKairosVersus.classList.add("desde-rival");
  void agujaTiempoKairosVersus.offsetWidth;
  agujaTiempoKairosVersus.classList.add("volando");
  reproducirSonidoVersus("versusAtaqueUno", 0.76);
  programarImpactoRivalVersus(650, 1380);
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
  if (ataque === "latigazo-tinta") {
    reproducirAtaqueKalamoRivalVersus();
    return;
  }
  if (ataque === "aguja-tiempo") {
    reproducirAtaqueKairosRivalVersus();
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

function agregarPalabraRecuperacionVersus(tipoJugador) {
  const esJugador = tipoJugador === "jugador";
  const tema = esJugador ? demoVersus.tematicaParaJugador : demoVersus.tematicaParaRival;
  const propiedad = esJugador ? "palabrasJugador" : "palabrasRival";
  const palabraExtra = VersusEngine.elegirPalabraRecuperacion(
    bancosPalabrasVersus[tema] || [],
    demoVersus[propiedad],
  );
  if (palabraExtra) demoVersus[propiedad].push(palabraExtra);
  return palabraExtra;
}

function prepararDueloVersus({ comenzarRonda = true } = {}) {
  cancelarCinematicaFinalVersus();
  detenerRondaVersus();
  ocultarRevelacionesPalabrasVersus();
  limpiarAnimacionAtaqueVersus();
  configurarPersonajesCombateVersus();
  if (!modoArcadeActivo) {
    document.querySelector(".versus-jugador-uno .versus-etiqueta").textContent = "JUGADOR 1";
    document.querySelector(".versus-jugador-dos .versus-etiqueta").textContent = "JUGADOR 2";
  }
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
  demoVersus.palabrasCompletadasJugador = 0;
  demoVersus.palabrasCompletadasRival = 0;
  demoVersus.ultimaPalabraFalladaJugador = "";
  demoVersus.ultimaPalabraFalladaRival = "";
  demoVersus.letrasJugador.clear();
  demoVersus.letrasRival.clear();
  demoVersus.teclasRobadasJugador.clear();
  demoVersus.teclasRobadasRival.clear();
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

function iniciarCombateArcade() {
  if (!modoArcadeActivo || rivalesTorreArcade.length === 0) return;
  pisoCombateArcade = pisoActualArcade;
  personajeRivalVersus = rivalesTorreArcade[pisoCombateArcade];
  const tematicasDisponibles = Object.keys(bancosPalabrasVersus);
  const temaRival = tematicasDisponibles[pisoCombateArcade % tematicasDisponibles.length];
  tematicaVersus.value = temaRival;
  palabrasSecretasVersus = mezclarPalabrasVersus(bancosPalabrasVersus[temaRival])
    .slice(0, maximoPalabrasVersus);
  prepararDueloVersus({ comenzarRonda: false });
  const arena = arenasVersus[pisoCombateArcade % arenasVersus.length];
  fondoVersus.src = arena.src;
  fondoVersus.alt = arena.alt;
  document.querySelector(".versus-jugador-uno .versus-etiqueta").textContent = "VOS";
  document.querySelector(".versus-jugador-dos .versus-etiqueta").textContent = `PISO ${pisoCombateArcade + 1}`;
  mostrarPantalla(pantallaVersus);
  requestAnimationFrame(iniciarEntradaDueloVersus);
}

btnCombatirArcade.addEventListener("click", iniciarCombateArcade);

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
    .filter((letra) => !demoVersus.letrasRival.has(letra))
    .filter((letra) => efectoActivo !== "key_theft" || !demoVersus.teclasRobadasRival.has(letra));
  const letrasIncorrectas = alfabeto.filter(
    (letra) => !palabraRivalClave.includes(letra)
      && !demoVersus.letrasRival.has(letra)
      && (efectoActivo !== "key_theft" || !demoVersus.teclasRobadasRival.has(letra)),
  );
  const probabilidadAcierto = efectoActivo === "roar" || efectoActivo === "shuffle"
    ? 0.25
    : obtenerProbabilidadAciertoRivalVersus();
  const acierta = Boolean(demoVersus.pistaLupaRival)
    || Math.random() < probabilidadAcierto
    || letrasIncorrectas.length === 0;
  const opciones = acierta ? letrasPendientes : letrasIncorrectas;
  const letra = demoVersus.pistaLupaRival
    || opciones[Math.floor(Math.random() * opciones.length)];
  if (!letra) return;
  reproducirPulsacionTeclaVersus("rival");
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
    : `TU DESAFÍO · ${temaJugador.toUpperCase()} ${VersusEngine.obtenerEtiquetaRonda(demoVersus.indiceJugador)}`;
  tituloProgresoDos.textContent = demoVersus.finalizadoRival
    ? "EL RIVAL TERMINÓ"
    : `RIVAL · ${temaRival.toUpperCase()} ${VersusEngine.obtenerEtiquetaRonda(demoVersus.indiceRival)}`;
  tituloVersus.textContent = `J1 ${demoVersus.palabrasCompletadasJugador}/${maximoPalabrasVersus} · J2 ${demoVersus.palabrasCompletadasRival}/${maximoPalabrasVersus}`;

  if (demoVersus.finalizadoJugador) {
    palabraJugador.textContent = demoVersus.motivoFinalJugador === "tiempo"
      ? "TIEMPO AGOTADO"
      : `✓ ${demoVersus.palabrasCompletadasJugador} PALABRAS`;
  } else {
    palabraJugador.textContent = progresoJugador.join(" ");
  }
  palabraJugador.setAttribute("aria-label", `Tu progreso: ${palabraJugador.textContent}`);

  if (demoVersus.finalizadoRival) {
    palabraRival.textContent = demoVersus.motivoFinalRival === "tiempo"
      ? "TIEMPO AGOTADO"
      : `✓ ${demoVersus.palabrasCompletadasRival} PALABRAS`;
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
  const jugadorActivo = !demoVersus.finalizadoJugador;
  const rivalActivo = !demoVersus.finalizadoRival;
  if (jugadorActivo) {
    demoVersus.tiempoJugador = Math.max(0, demoVersus.tiempoJugador - 1);
  }
  if (rivalActivo) {
    demoVersus.tiempoRival = Math.max(0, demoVersus.tiempoRival - 1);
  }

  const resultadoTiempo = VersusEngine.resolverAgotamientoTiempo({
    tiempoJugador: demoVersus.tiempoJugador,
    tiempoRival: demoVersus.tiempoRival,
    jugadorActivo,
    rivalActivo,
  });
  if (resultadoTiempo === "ambos") {
    agotarTiemposSimultaneosVersus();
  } else if (resultadoTiempo === "rival") {
    agotarTiempoJugadorVersus();
  } else if (resultadoTiempo === "jugador") {
    agotarTiempoRivalVersus();
  }
  actualizarTiemposVersus();
}

function guardarDesbloqueoNimbus() {
  dragonDesbloqueado = true;
  guardarPersonajeDesbloqueado("dragon");
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
    demoVersus.palabrasCompletadasJugador += 1;
    demoVersus.vidasRival -= 1;
    reproducirAtaqueJugadorVersus();
    mostrarAvisoAvanceVersus(
      `¡Palabra ${numeroPalabra} superada! Atacaste al rival.`,
      "acierto",
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 260 : 1550,
    );
  } else {
    demoVersus.ultimaPalabraFalladaJugador = palabraPerdida;
    mostrarRevelacionPalabraVersus(
      revelacionPalabraVersusUno,
      palabraPerdida,
      demoVersus.tematicaParaJugador,
      "temporizadorRevelacionJugador",
    );
    demoVersus.vidasJugador -= 1;
    if (demoVersus.vidasJugador > 0) agregarPalabraRecuperacionVersus("jugador");
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

  if (demoVersus.palabrasCompletadasJugador >= maximoPalabrasVersus) {
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
  const palabraActivaJugador = obtenerPalabraActualJugadorVersus();
  demoVersus.indiceRival += 1;
  demoVersus.letrasRival.clear();
  demoVersus.erroresRival = 0;

  if (acertada) {
    demoVersus.palabrasCompletadasRival += 1;
    demoVersus.vidasJugador -= 1;
    reproducirAtaqueRivalVersus();
    mostrarAvisoAvanceVersus(
      `El rival superó su palabra ${numeroPalabra} y te atacó.`,
      "error",
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 260 : 1300,
    );
  } else {
    demoVersus.ultimaPalabraFalladaRival = palabraPerdida;
    mostrarRevelacionPalabraVersus(
      revelacionPalabraVersusDos,
      palabraPerdida,
      demoVersus.tematicaParaRival,
      "temporizadorRevelacionRival",
    );
    demoVersus.vidasRival -= 1;
    if (demoVersus.vidasRival > 0) agregarPalabraRecuperacionVersus("rival");
    reproducirAtaqueJugadorVersus();
    mostrarAvisoAvanceVersus(
      `El rival agotó la energía de su palabra ${numeroPalabra} y perdió un corazón.`,
      "acierto",
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 260 : 1550,
    );
  }
  actualizarVidasVersus();

  if (demoVersus.vidasJugador <= 0) {
    finalizarPartidaVersus(
      "rival",
      "El rival completó su ataque y te dejó sin corazones.",
      palabraActivaJugador,
    );
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

  if (demoVersus.palabrasCompletadasRival >= maximoPalabrasVersus) {
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
  mostrarAvisoAvanceVersus("Se agotó tu tiempo. Perdiste el duelo.", "error");
  actualizarProgresosVersus();
  finalizarPartidaVersus(
    "rival",
    "Se agotó tu tiempo antes que el del rival.",
    obtenerPalabraActualJugadorVersus(),
  );
}

function agotarTiempoRivalVersus() {
  if (demoVersus.finalizadoRival) return;
  demoVersus.finalizadoRival = true;
  demoVersus.motivoFinalRival = "tiempo";
  mostrarEstadoProgresoVersus(document.getElementById("estadoProgresoDos"), "Tiempo agotado", "agotado");
  mostrarAvisoAvanceVersus("El rival agotó su tiempo. ¡Ganaste el duelo!", "acierto");
  actualizarProgresosVersus();
  finalizarPartidaVersus(
    "jugador",
    "El rival agotó su tiempo antes que vos.",
  );
}

function agotarTiemposSimultaneosVersus() {
  if (demoVersus.partidaFinalizada) return;
  demoVersus.finalizadoJugador = true;
  demoVersus.finalizadoRival = true;
  demoVersus.motivoFinalJugador = "tiempo";
  demoVersus.motivoFinalRival = "tiempo";
  bloquearTecladoDemoVersus();
  mostrarEstadoProgresoVersus(document.getElementById("estadoProgresoUno"), "Tiempo agotado", "agotado");
  mostrarEstadoProgresoVersus(document.getElementById("estadoProgresoDos"), "Tiempo agotado", "agotado");
  mostrarAvisoAvanceVersus("Ambos tiempos se agotaron a la vez.");
  actualizarProgresosVersus();
  verificarFinNaturalVersus();
}

function verificarFinNaturalVersus() {
  if (!demoVersus.finalizadoJugador || !demoVersus.finalizadoRival) return;
  const diferencia = demoVersus.vidasJugador - demoVersus.vidasRival;
  const ganador = diferencia > 0 ? "jugador" : diferencia < 0 ? "rival" : "empate";
  const palabraActivaJugador = ganador === "rival" && demoVersus.motivoFinalJugador !== "completo"
    ? obtenerPalabraActualJugadorVersus()
    : "";
  finalizarPartidaVersus(
    ganador,
    `Resultado final: ${demoVersus.vidasJugador} a ${demoVersus.vidasRival} corazones.`,
    palabraActivaJugador,
  );
}

function finalizarPartidaVersus(ganador, detalle, palabraPerdida = "") {
  if (demoVersus.partidaFinalizada) return;
  actualizarProgresosVersus();
  demoVersus.partidaFinalizada = true;
  detenerRondaVersus();
  bloquearTecladoDemoVersus();

  const palabraFinal = ganador === "rival" ? palabraPerdida : "";
  reproducirCierrePartidaVersus(ganador, detalle, palabraFinal);
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
  if (finalElegido === "libro-palabras-perdidas") {
    return () => reproducirLibroPalabrasPerdidasVersus(personajeVictima);
  }
  if (finalElegido === "siglos-en-un-segundo") {
    return () => reproducirSiglosEnUnSegundoVersus(personajeVictima);
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
  if (dueloAventuraActivo) {
    await mostrarAnuncioFinVersus(palabraPerdida);
    mostrarResultadoPartidaVersus(ganador, detalle);
    return;
  }

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

  if (dueloAventuraActivo) {
    const rival = personajesVersus[dueloAventuraActivo.rival];
    dueloAventuraActivo.resultado = ganador;
    iconoResultadoVersus.textContent = ganador === "jugador" ? "🏆" : "🌲";
    etiquetaResultadoVersus.textContent = dueloAventuraActivo.etiqueta;
    tituloResultadoVersus.textContent = ganador === "jugador"
      ? `¡Superaste a ${rival.nombre}!`
      : ganador === "empate"
        ? "La prueba terminó empatada"
        : `${rival.nombre} ganó la prueba`;
    detalleResultadoVersus.textContent = ganador === "jugador"
      ? "Demostraste tu valor. La historia continuará desde este encuentro."
      : `${detalle} Podés volver a intentarlo sin repetir los desafíos anteriores.`;
    btnRevanchaVersus.classList.remove("oculto");
    btnRevanchaVersus.disabled = false;
    btnRevanchaVersus.textContent = ganador === "jugador"
      ? "Continuar aventura"
      : "Reintentar prueba";
    btnMenuResultadoVersus.textContent = "Volver al menú";
    resultadoRondaVersus.classList.remove("oculto");
    return;
  }

  if (modoArcadeActivo) {
    const total = rivalesTorreArcade.length;
    const rival = personajesVersus[rivalesTorreArcade[pisoCombateArcade]];
    ultimoResultadoArcade = ganador;
    iconoResultadoVersus.textContent = ganador === "jugador" ? "🏆" : "🏰";
    etiquetaResultadoVersus.textContent = `PISO ${pisoCombateArcade + 1} DE ${total}`;
    if (ganador === "jugador") {
      guardarProgresoArcade(pisoCombateArcade + 1);
      const completoLaTorre = pisoCombateArcade >= total - 1;
      pisoActualArcade = completoLaTorre ? total - 1 : pisoCombateArcade + 1;
      tituloResultadoVersus.textContent = completoLaTorre
        ? "¡Campeón de la torre!"
        : `¡Superaste a ${rival.nombre}!`;
      detalleResultadoVersus.textContent = completoLaTorre
        ? "Venciste a todos los rivales del modo Arcade. La cima es tuya."
        : `${detalle} El siguiente piso ya está desbloqueado.`;
      btnRevanchaVersus.textContent = completoLaTorre ? "Ver torre completada" : "Continuar la torre";
    } else {
      pisoActualArcade = pisoCombateArcade;
      tituloResultadoVersus.textContent = ganador === "empate"
        ? "El piso terminó empatado"
        : `${rival.nombre} defendió la torre`;
      detalleResultadoVersus.textContent = `${detalle} Podés volver a intentar este piso.`;
      btnRevanchaVersus.textContent = "Reintentar piso";
    }
    btnRevanchaVersus.classList.remove("oculto");
    btnRevanchaVersus.disabled = false;
    btnMenuResultadoVersus.textContent = "Abandonar torre";
    resultadoRondaVersus.classList.remove("oculto");
    return;
  }

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
  btnMenuResultadoVersus.textContent = "Volver al menú";
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
  kalamo: srcKalamoImpactoVersus,
  kairos: srcKairosBaseVersus,
};

const pantallasRotasKalamoVersus = {
  explorador: "assets/images/personajes/versus/explorador-pantalla-rota-kalamo-v1.png",
  mago: "assets/images/personajes/versus/mago-pantalla-rota-kalamo-v1.png",
  guardiana: "assets/images/personajes/versus/guardiana-pantalla-rota-kalamo-v1.png",
  dragon: "assets/images/personajes/versus/dragon-pantalla-rota-kalamo-v1.png",
  hombre_lobo: "assets/images/personajes/versus/hombre-lobo-pantalla-rota-kalamo-v1.png",
  t_shadow: "assets/images/personajes/versus/t-shadow-pantalla-rota-kalamo-v1.png",
  guardian_alba: "assets/images/personajes/versus/guardian-alba-pantalla-rota-kalamo-v1.png",
  dragon_hielo: "assets/images/personajes/versus/dragon-hielo-pantalla-rota-kalamo-v1.png",
  azrak: "assets/images/personajes/versus/azrak-pantalla-rota-kalamo-v1.png",
  kalamo: "assets/images/personajes/versus/kalamo-pantalla-rota-kalamo-v1.png",
  kairos: srcKairosBaseVersus,
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
    "victima-final-kalamo",
    "victima-final-kairos",
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
    "victima-fauces-kalamo",
    "victima-fauces-kairos",
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
  manoVictimaAzrakVersus.src = victimaFinal === "kairos"
    ? srcKairosBaseVersus
    : `assets/images/personajes/versus/mano-abismo-atrapa-${victimaFinal.replaceAll("_", "-")}.png`;
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

function reproducirLibroPalabrasPerdidasVersus(victima = personajeRivalVersus) {
  cancelarCinematicaFinalVersus();
  fondoCinematicaVersus.src = fondoVersus.src;
  crearParticulasEclipseVersus();
  const victimaFinal = victima in personajesVersus ? victima : "mago";
  programarReaccionVictimaFinalVersus(victimaLibroKalamoVersus, victimaFinal, 4100);
  pantallaRotaKalamoVersus.src = pantallasRotasKalamoVersus[victimaFinal];
  pantallaRotaKalamoVersus.alt = `${personajesVersus[victimaFinal].nombre}, estampado contra la pantalla por Kalamo`;
  etiquetaCinematicaVersus.textContent = "GRAN CALIGRAFÍA";
  tituloCinematicaVersus.textContent = "EL LIBRO DE LAS PALABRAS PERDIDAS";
  cinematicaFinalVersus.classList.add("libro-palabras-perdidas");
  cinematicaFinalVersus.classList.add("kalamo-final-remate-pantalla");
  cinematicaFinalVersus.classList.toggle("kalamo-victima-explorador", victimaFinal === "explorador");
  cinematicaFinalVersus.classList.remove("oculto");
  void cinematicaFinalVersus.offsetWidth;
  cinematicaFinalVersus.classList.add("activa");
  btnSaltarCinematicaVersus.focus();
  reproducirSonidoVersus("versusFinish", 0.9);

  return new Promise((resolve) => {
    demoVersus.resolverCinematica = resolve;
    demoVersus.temporizadorCinematica = setTimeout(completarCinematicaFinalVersus, 12200);
  });
}

function configurarVictimaKairosVersus(personaje = personajeRivalVersus) {
  const victimaFinal = personaje in personajesVersus ? personaje : "explorador";
  const nombre = personajesVersus[victimaFinal].nombre;
  const imagenBase = personajesVersus[victimaFinal].base;
  const imagenesEdad = imagenesEdadKairosVersus[victimaFinal] || { intermedia: imagenBase, anciana: imagenBase };
  victimaKairosVersus.src = imagenBase;
  victimaKairosVersus.alt = `${nombre}, antes de que Kairós adelante su tiempo`;
  victimaKairosEnvejecidaVersus.src = imagenesEdad.intermedia;
  victimaKairosEnvejecidaVersus.alt = `${nombre}, envejeciendo por el poder de Kairós`;
  victimaKairosAncianaVersus.src = imagenesEdad.anciana;
  victimaKairosAncianaVersus.alt = `${nombre}, anciano, agotado y debilitado por los años`;
  kairosFinalMontajeVersus.src = imagenesFinalKairosVersus[victimaFinal]
    || imagenesFinalKairosVersus.explorador;
  kairosFinalMontajeVersus.alt = `Las tres edades de ${nombre}: original, envejecido y anciano`;
  kairosFinalConceptoVersus.alt = victimaFinal === "explorador"
    ? "Kairós adelanta el tiempo de Aren hasta volverlo anciano"
    : "";
  cinematicaFinalVersus.classList.remove(...clasesVictimasKairosVersus);
  cinematicaFinalVersus.classList.add(`kairos-victima-${victimaFinal}`);
}

function reproducirSiglosEnUnSegundoVersus(victima = personajeRivalVersus) {
  cancelarCinematicaFinalVersus();
  fondoCinematicaVersus.src = fondoVersus.src;
  configurarVictimaKairosVersus(victima);
  etiquetaCinematicaVersus.textContent = "CRONOCASTIGO";
  tituloCinematicaVersus.textContent = "SIGLOS EN UN SEGUNDO";
  cinematicaFinalVersus.classList.add("siglos-en-un-segundo");
  cinematicaFinalVersus.classList.remove("oculto");
  void cinematicaFinalVersus.offsetWidth;
  cinematicaFinalVersus.classList.add("activa");
  btnSaltarCinematicaVersus.focus();
  reproducirSonidoVersus("versusFinish", 0.94);

  return new Promise((resolve) => {
    demoVersus.resolverCinematica = resolve;
    demoVersus.temporizadorCinematica = setTimeout(completarCinematicaFinalVersus, 9000);
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
    "libro-palabras-perdidas",
    "kalamo-final-remate-pantalla",
    "kalamo-victima-explorador",
    "siglos-en-un-segundo",
    ...clasesVictimasKairosVersus,
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
    "libro-palabras-perdidas",
    "kalamo-final-remate-pantalla",
    "kalamo-victima-explorador",
    "siglos-en-un-segundo",
    ...clasesVictimasKairosVersus,
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
  if (personaje === "kalamo") {
    void reproducirLibroPalabrasPerdidasVersus(victimaPruebaFaucesVersus.value);
    return;
  }
  if (personaje === "kairos") {
    void reproducirSiglosEnUnSegundoVersus(victimaPruebaFaucesVersus.value);
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

btnProbarCinematicaKalamo.addEventListener("click", () => {
  probarCinematicaVersus("kalamo");
});

btnProbarCinematicaKairos.addEventListener("click", () => {
  probarCinematicaVersus("kairos");
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
      if (habilidad.efecto === "time_steal") {
        aplicarRoboTiempoLocalVersus(desdeRival, habilidad.segundos);
        if (!desdeRival) mostrarVistaImpactoRivalVersus(personaje);
      } else if (habilidad.efecto === "hint") {
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
        } else {
          mostrarVistaImpactoRivalVersus(personaje, letra);
        }
      } else if (desdeRival) {
        aplicarEfectoVisualHabilidadVersus(habilidad.efecto, habilidad.duracion);
      } else {
        mostrarVistaImpactoRivalVersus(personaje);
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
  if (dueloAventuraActivo) {
    if (dueloAventuraActivo.resultado === "jugador") {
      btnRevanchaVersus.disabled = true;
      await completarDueloAventura();
    } else {
      reintentarDueloAventura();
    }
    return;
  }
  if (modoArcadeActivo) {
    if (ultimoResultadoArcade === "jugador") abrirTorreArcade();
    else iniciarCombateArcade();
    return;
  }
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
  secuenciaPresentacionMision += 1;
  const esHistoriaDesierto = escenarioActual === 1;
  const esHistoriaCumbres = escenarioActual === 2;
  const esHistoriaHielo = escenarioActual === 3;

  presentacionMisionYaCargada = misionYaCargada;
  modalHistoria.classList.toggle("historia-desierto", esHistoriaDesierto);
  modalHistoria.classList.toggle("historia-cumbres", esHistoriaCumbres);
  modalHistoria.classList.toggle("historia-hielo", esHistoriaHielo);
  imagenSoporteMision.src = esHistoriaDesierto
    ? "assets/images/ui/presentacion-mision-piedra-desierto-v1.png"
    : esHistoriaHielo
      ? "assets/images/ui/presentacion-mision-hielo-v1.png"
      : esHistoriaCumbres
        ? "assets/images/ui/presentacion-mision-cumbres-v1.png"
        : "assets/images/ui/presentacion-mision-tronco.png";
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

  // El cartel permanece visible hasta que el jugador elige "Saltar".
  // No usamos un temporizador: cada persona puede leer la historia a su ritmo.
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
  sonidoNarrativoPendiente =
    escenarioActual === 0 ? sonidosNarrativosPorMision[misionActual] || "" : "";
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
  btnProbarPruebaBosque.disabled = !obtenerTipoPruebaEspecial(
    escenarioActual,
    misionActual,
  );
  btnProbarMuralSantuario.disabled = escenarioActual !== 0 || misionActual !== 8;
  btnProbarEscenaPersonaje.disabled = !(
    (escenarioActual === 0 && [5, 9].includes(misionActual)) ||
    (escenarioActual === 2 && [8, 9].includes(misionActual))
  );
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
    cargarPersonajesDesbloqueados();
    restaurarPartidaTrasPruebas();
  }

  actualizarControlesDev();
  actualizarDisponibilidadPersonajesVersus();
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
    const historia =
      mundo === 0
        ? historiaBosque[indice]
        : mundo === 1
          ? historiaDesierto[indice]
          : mundo === 2
            ? historiaCumbres[indice]
            : historiaHielo[indice];
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
  if (escenario === 1) return historiaDesierto.length;
  if (escenario === 2) return historiaCumbres.length;
  if (escenario === 3) return historiaHielo.length;
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
  mundoDosCompletado = escenarioActual >= 2;
  mundoTresCompletado = escenarioActual >= 3;
  mundoCuatroCompletado = false;
  primerDueloNivorCompletado = escenarioActual === 3 && misionActual > 5;

  if (escenarioActual === 0 && misionActual >= 9) {
    cristalesObtenidos = Math.max(cristalesObtenidos, 1);
  }
  if (escenarioActual === 2) {
    cristalesObtenidos = Math.max(cristalesObtenidos, 2);
  }

  actualizarJugador();
  void iniciarMisionAventura().then(() => {
    mostrarHistoriaMision({ misionYaCargada: true });
  });
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

  const finalDesiertoCompletado =
    mundoDosCompletado && escenarioActual === 1 && misionActual === 9;
  contenedorEscenario.classList.toggle(
    "final-desierto-activo",
    finalDesiertoCompletado,
  );

  if (finalDesiertoCompletado) {
    bloquearTeclado();
    btnPista.disabled = true;
    btnSiguiente.textContent = "☁️ Cumbres Celestes · Próximamente";
    btnSiguiente.classList.remove("oculto");
    mensajePersonaje.textContent =
      "✨ El Cristal Dorado está a salvo. Zafir abrió el portal hacia las Cumbres Celestes.";
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
  mundoDosCompletado = false;
  mundoTresCompletado = false;
  mundoCuatroCompletado = false;
  primerDueloNivorCompletado = false;
  hombreLoboDescubierto = false;
  dueloAventuraActivo = null;
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
    "final-desierto-activo",
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
          "Aren continúa su camino mientras el bosque guarda nuevos secretos.",
      }
    );
  }

  if (escenarioActual === 1) {
    return (
      historiaDesierto[misionActual] || {
        capitulo: `Misión ${misionActual + 1}`,
        titulo: "El Desierto Perdido",
        texto:
          "Aren avanza entre dunas mientras el viento oculta los secretos del Cristal Dorado.",
      }
    );
  }

  if (escenarioActual === 2) {
    return historiaCumbres[misionActual] || {
      capitulo: `Misión ${misionActual + 1}`,
      titulo: "Cumbres Celestes",
      texto: "Aren avanza entre islas flotantes mientras Nimbus busca a Aeralis.",
    };
  }

  if (escenarioActual === 3) {
    return historiaHielo[misionActual] || {
      capitulo: `Misión ${misionActual + 1}`,
      titulo: "Reino del Invierno Eterno",
      texto: "Aren avanza hacia la fortaleza mientras la ventisca oculta la verdad de Nivor.",
    };
  }

  return {
    capitulo: `Misión ${misionActual + 1}`,
    titulo: aventura[escenarioActual].nombre,
    texto: "Una nueva región se abre ante Aren.",
  };
}

function esperarTransicionHistoria() {
  return esperarMovimiento(duracionTransicionHistoria);
}

function esperarCierreHistoriaMision() {
  if (modalHistoria.classList.contains("oculto")) return Promise.resolve();

  return new Promise((resolve) => {
    const observador = new MutationObserver(() => {
      if (!modalHistoria.classList.contains("oculto")) return;
      observador.disconnect();
      resolve();
    });
    observador.observe(modalHistoria, {
      attributes: true,
      attributeFilter: ["class"],
    });
  });
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
  detenerMusicaCinematica(musicaMuralDragon, 0.58);
  detenerMusicaCinematica(musicaCaminaPortal, 0.62);
  detenerMusicaCinematica(musicaSegundoCristal, 0.52);
  detenerCicloCaminata();
  limpiarCinematicaSantuario();
  detenerPolvoImpacto();
  detenerAmbientePuente();
  detenerAmbienteCristal();
  detenerPortalMision();
  detenerAmbienteHojas();
  detenerBloqueoTronco();
  detenerTormenta();
  detenerNiebla();
  detenerMiradasLobos();
  detenerPresenciaBosque();
  detenerAranaBosque();
  detenerVientoArena();
  detenerVidaDesierto();
  detenerLlegadaDesiertoMision();
  detenerPersonajesNarrativosDesierto();
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

function detenerBloqueoTronco() {
  contenedorEscenario
    .querySelectorAll(".capa-tronco-bloqueo")
    .forEach((capa) => capa.remove());
}

function actualizarBloqueoTroncoMision() {
  detenerBloqueoTronco();

  if (escenarioActual !== 0 || misionActual !== 2) return;

  const capa = document.createElement("div");
  capa.className = "capa-tronco-bloqueo";
  capa.setAttribute("aria-hidden", "true");

  const sombra = document.createElement("span");
  sombra.className = "sombra-tronco-bloqueo";

  const tronco = document.createElement("img");
  tronco.className = "tronco-bloqueo";
  tronco.src = "assets/images/elementos/tronco-antiguo-caido-bosque.png";
  tronco.alt = "";

  const hojasImpacto = [
    ["-190px", "-82px", "-125deg", "0ms", 0],
    ["-132px", "-118px", "82deg", "45ms", 1],
    ["-74px", "-96px", "-70deg", "90ms", 0],
    ["-18px", "-132px", "145deg", "25ms", 1],
    ["52px", "-105px", "-110deg", "110ms", 0],
    ["116px", "-120px", "95deg", "60ms", 1],
    ["172px", "-78px", "160deg", "130ms", 0],
    ["224px", "-102px", "-85deg", "80ms", 1],
  ];

  capa.append(sombra, tronco);
  hojasImpacto.forEach(([x, y, rotacion, retraso, variante], indice) => {
    const hoja = document.createElement("img");
    hoja.className = "hoja-impacto-tronco";
    hoja.src = `assets/images/elementos/hoja-${variante + 1}.png`;
    hoja.alt = "";
    hoja.style.setProperty("--impacto-x", x);
    hoja.style.setProperty("--impacto-y", y);
    hoja.style.setProperty("--impacto-rotacion", rotacion);
    hoja.style.setProperty("--impacto-retraso", retraso);
    hoja.style.setProperty(
      "--impacto-escala",
      indice % 3 === 0 ? "0.78" : "0.58",
    );
    capa.appendChild(hoja);
  });

  contenedorEscenario.insertBefore(capa, personajeImagen);

  if (desafiosCompletados > 0 || prefiereReducirMovimiento.matches) {
    capa.classList.add("tronco-colocado");
    return;
  }

  const esperaSonidoNarrativo =
    historiaMisionPendiente && sonidoNarrativoPendiente === "ramas";

  if (!esperaSonidoNarrativo) {
    requestAnimationFrame(() => activarBloqueoTronco());
  }
}

function activarBloqueoTronco() {
  const capa = contenedorEscenario.querySelector(".capa-tronco-bloqueo");
  if (!capa || capa.classList.contains("tronco-activo")) return;

  capa.classList.remove("tronco-colocado");
  void capa.offsetWidth;
  capa.classList.add("tronco-activo");

  setTimeout(() => {
    if (!capa.isConnected || !capa.classList.contains("tronco-activo")) return;

    contenedorEscenario.classList.remove("temblor");
    void contenedorEscenario.offsetWidth;
    contenedorEscenario.classList.add("temblor");
    animarPolvoImpacto();
  }, 720);
}

function detenerVientoArena() {
  contenedorEscenario
    .querySelectorAll(".capa-viento-arena")
    .forEach((capa) => capa.remove());
}

function detenerVidaDesierto() {
  contenedorEscenario
    .querySelectorAll(".capa-vida-desierto")
    .forEach((capa) => capa.remove());
}

function detenerLlegadaDesiertoMision() {
  secuenciaLlegadaDesierto += 1;
  contenedorEscenario
    .querySelectorAll(".capa-llegada-desierto")
    .forEach((capa) => capa.remove());
  contenedorEscenario.classList.remove(
    "llegada-desierto-preparada",
    "llegada-desierto-activa",
  );
}

function actualizarLlegadaDesiertoMision() {
  detenerLlegadaDesiertoMision();

  const esLlegadaInicial =
    escenarioActual === 1 &&
    misionActual === 0 &&
    desafiosCompletados === 0;

  if (!esLlegadaInicial) return;

  const capa = document.createElement("div");
  const portal = document.createElement("span");
  const huellas = document.createElement("div");

  capa.className = "capa-llegada-desierto";
  capa.setAttribute("aria-hidden", "true");
  portal.className = "portal-llegada-desierto";
  huellas.className = "huellas-llegada-desierto";

  for (let indice = 0; indice < 7; indice++) {
    const huella = document.createElement("span");
    huella.style.setProperty("--indice-huella", indice);
    huella.style.setProperty(
      "--giro-huella",
      indice % 2 === 0 ? "-24deg" : "18deg",
    );
    huellas.appendChild(huella);
  }

  capa.append(portal, huellas);
  contenedorEscenario.insertBefore(capa, personajeImagen);
  contenedorEscenario.classList.add("llegada-desierto-preparada");
}

function activarLlegadaDesiertoMision() {
  const capa = contenedorEscenario.querySelector(".capa-llegada-desierto");
  if (!capa || !contenedorEscenario.classList.contains("llegada-desierto-preparada")) {
    return;
  }

  const secuencia = ++secuenciaLlegadaDesierto;
  contenedorEscenario.classList.remove("llegada-desierto-preparada");
  void contenedorEscenario.offsetWidth;
  contenedorEscenario.classList.add("llegada-desierto-activa");

  window.setTimeout(() => {
    if (secuencia !== secuenciaLlegadaDesierto) return;
    capa.remove();
    contenedorEscenario.classList.remove("llegada-desierto-activa");
  }, prefiereReducirMovimiento.matches ? 50 : 7600);
}

function detenerPersonajesNarrativosDesierto() {
  contenedorEscenario
    .querySelectorAll(".personaje-narrativo-desierto")
    .forEach((elemento) => elemento.remove());
}

function crearImagenNarrativaDesierto(src, clase, alt) {
  const imagen = document.createElement("img");
  imagen.className = `personaje-narrativo-desierto ${clase}`;
  imagen.src = src;
  imagen.alt = alt;
  imagen.decoding = "async";
  return imagen;
}

const misionesEmergenciaDevoradunas = new Set([3, 6, 8, 9]);

function activarEmergenciaDevoradunas() {
  if (
    escenarioActual !== 1 ||
    !misionesEmergenciaDevoradunas.has(misionActual)
  ) return;

  contenedorEscenario
    .querySelectorAll(
      ".devoradunas-entrada-arena, .arena-emergencia-devoradunas",
    )
    .forEach((elemento) => {
      elemento.classList.remove("emergencia-activa");
      void elemento.getBoundingClientRect();
      elemento.classList.add("emergencia-activa");
    });
}

function actualizarPersonajesNarrativosDesierto() {
  detenerPersonajesNarrativosDesierto();
  if (escenarioActual !== 1) return;

  if (misionActual >= 4) {
    const maguito = crearImagenNarrativaDesierto(
      "assets/images/personajes/versus/mago-base.png",
      misionActual === 4
        ? "maguito-desierto maguito-espejismo"
        : misionActual === 6
          ? "maguito-desierto maguito-corriendo"
          : "maguito-desierto",
      misionActual === 4
        ? "Zafir atrapado dentro de una prisión de espejismo"
        : "Zafir acompañando a Aren",
    );

    if (misionActual === 4) {
      const trampa = document.createElement("div");
      trampa.className = "personaje-narrativo-desierto trampa-espejismo-maguito";
      trampa.setAttribute("role", "img");
      trampa.setAttribute(
        "aria-label",
        "Zafir está encerrado dentro de una prisión de agua ilusoria",
      );

      for (let indice = 0; indice < 3; indice += 1) {
        const onda = document.createElement("span");
        onda.className = `onda-trampa-espejismo onda-trampa-${indice + 1}`;
        onda.setAttribute("aria-hidden", "true");
        trampa.appendChild(onda);
      }

      for (let indice = 0; indice < 2; indice += 1) {
        const aro = document.createElement("span");
        aro.className = `aro-prision-espejismo aro-prision-${indice + 1}`;
        aro.setAttribute("aria-hidden", "true");
        trampa.appendChild(aro);
      }

      trampa.appendChild(maguito);
      contenedorEscenario.appendChild(trampa);
    } else {
      contenedorEscenario.appendChild(maguito);
    }
  }

  const estadoEmergenciaDevoradunas =
    desafiosCompletados > 0
      ? "emergencia-finalizada"
      : "esperando-emergencia";

  const configuracionDevoradunas = {
    3: {
      src: "assets/images/personajes/aventura/devoradunas-emerge-v1.png",
      clase: `devoradunas-desierto devoradunas-emerge devoradunas-entrada-arena ${estadoEmergenciaDevoradunas}`,
      alt: "El Devoradunas emergiendo de la arena",
    },
    6: {
      src: "assets/images/personajes/aventura/devoradunas-persigue-v1.png",
      clase: `devoradunas-desierto devoradunas-persigue devoradunas-entrada-arena ${estadoEmergenciaDevoradunas}`,
      alt: "El Devoradunas persiguiendo a los viajeros",
    },
    8: {
      src: "assets/images/personajes/aventura/devoradunas-persigue-v1.png",
      clase: `devoradunas-desierto devoradunas-irrumpe devoradunas-entrada-arena ${estadoEmergenciaDevoradunas}`,
      alt: "El Devoradunas irrumpiendo en la Cámara del Sol",
    },
    9: {
      src: "assets/images/personajes/aventura/devoradunas-pacifico-v1.png",
      clase: `devoradunas-desierto devoradunas-pacifico devoradunas-entrada-arena ${estadoEmergenciaDevoradunas}`,
      alt: "El Devoradunas descansando en paz",
    },
  }[misionActual];

  if (configuracionDevoradunas) {
    const devoradunas = crearImagenNarrativaDesierto(
      configuracionDevoradunas.src,
      configuracionDevoradunas.clase,
      configuracionDevoradunas.alt,
    );
    const arenaEmergencia = document.createElement("span");
    arenaEmergencia.className =
      `personaje-narrativo-desierto arena-emergencia-devoradunas arena-emergencia-mision-${misionActual + 1}`;
    arenaEmergencia.setAttribute("aria-hidden", "true");
    contenedorEscenario.insertBefore(arenaEmergencia, personajeImagen);
    contenedorEscenario.insertBefore(devoradunas, personajeImagen);
  }

  if (misionActual === 9 && mundoDosCompletado) {
    const cristal = document.createElement("img");
    cristal.className = "personaje-narrativo-desierto cristal-dorado-desierto";
    cristal.src = "assets/images/elements/cristal-sabiduria-dorado-v2.png";
    cristal.alt = "Cristal Dorado del Desierto";
    contenedorEscenario.appendChild(cristal);
  }
}

function actualizarVientoArenaMision() {
  const configuracionViento = escenarioActual === 1
    ? configuracionesVientoDesierto[misionActual]
    : null;
  const capaExistente = contenedorEscenario.querySelector(
    ".capa-viento-arena",
  );

  if (!configuracionViento || prefiereReducirMovimiento.matches) {
    capaExistente?.remove();
    return;
  }

  if (capaExistente) return;

  const capa = document.createElement("div");
  const esMovil = window.matchMedia("(max-width: 600px)").matches;
  const cantidadParticulas = esMovil
    ? configuracionViento.particulasMovil
    : configuracionViento.particulasEscritorio;

  capa.className =
    `capa-viento-arena viento-desierto-mision-${misionActual + 1} viento-desierto-${configuracionViento.tipo}`;
  capa.setAttribute("aria-hidden", "true");

  for (let indice = 0; indice < cantidadParticulas; indice++) {
    const particula = document.createElement("span");
    const tamano = 1 + Math.random() * 1.6;

    particula.className = "particula-arena";
    particula.style.setProperty("--y-arena", `${12 + Math.random() * 76}%`);
    particula.style.setProperty(
      "--duracion-arena",
      `${configuracionViento.duracionMinima + Math.random() * configuracionViento.variacionDuracion}s`,
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

const configuracionesVientoDesierto = Object.freeze({
  0: { tipo: "brisa", particulasMovil: 7, particulasEscritorio: 12, duracionMinima: 12, variacionDuracion: 8 },
  1: { tipo: "ventisca", particulasMovil: 18, particulasEscritorio: 28, duracionMinima: 4.2, variacionDuracion: 3.4 },
  3: { tipo: "remolino", particulasMovil: 14, particulasEscritorio: 22, duracionMinima: 6, variacionDuracion: 4 },
  6: { tipo: "ventisca", particulasMovil: 16, particulasEscritorio: 26, duracionMinima: 4.8, variacionDuracion: 3.8 },
});

const configuracionesAvesDesierto = Object.freeze({
  0: { cantidad: 1, bandada: false },
  2: { cantidad: 4, bandada: true },
});
const cantidadesEscorpionesDesierto = Object.freeze({ 5: 2 });
const misionesLagartijaDesierto = new Set([7]);
const misionesPastoDesierto = new Set([0, 5, 7]);
const misionesCalorDesierto = new Set([0, 2, 3, 4, 5, 7]);

function crearAnimalAnimadoDesierto(clase, cuadros, alt) {
  const animal = document.createElement("span");
  animal.className = clase;
  animal.setAttribute("role", "img");
  animal.setAttribute("aria-label", alt);

  cuadros.forEach((src, indice) => {
    const imagen = document.createElement("img");
    imagen.className = `cuadro-fauna-desierto cuadro-fauna-${indice + 1}`;
    imagen.src = src;
    imagen.alt = "";
    imagen.decoding = "async";
    imagen.draggable = false;
    animal.appendChild(imagen);
  });

  return animal;
}

function actualizarVidaDesiertoMision() {
  detenerVidaDesierto();

  if (escenarioActual !== 1 || prefiereReducirMovimiento.matches) return;

  const capa = document.createElement("div");
  capa.className = "capa-vida-desierto";
  capa.setAttribute("aria-hidden", "true");

  if (misionesCalorDesierto.has(misionActual)) {
    const calor = document.createElement("span");
    calor.className = "espejismo-calor-desierto";
    capa.appendChild(calor);
  }

  const configuracionAves = configuracionesAvesDesierto[misionActual];
  if (configuracionAves) {
    const retrasoBandada = -Math.random() * 24;
    const alturaBandada = 9 + Math.random() * 7;
    const duracionBandada = 22 + Math.random() * 5;
    for (let indice = 0; indice < configuracionAves.cantidad; indice += 1) {
      const ave = crearAnimalAnimadoDesierto(
        `ave-desierto-ambiente${configuracionAves.bandada ? " ave-bandada-desierto" : ""}`,
        [
          "assets/images/ambiente/desierto/halcon-alas-arriba.png",
          "assets/images/ambiente/desierto/halcon-alas-abajo.png",
        ],
        configuracionAves.bandada
          ? "Bandada de halcones cruzando a lo lejos"
          : "Halcón del desierto volando",
      );
      ave.style.setProperty(
        "--altura-ave",
        `${configuracionAves.bandada ? alturaBandada + indice * 2.2 : 12 + Math.random() * 8}%`,
      );
      ave.style.setProperty(
        "--duracion-ave",
        `${configuracionAves.bandada ? duracionBandada : 20 + Math.random() * 8}s`,
      );
      ave.style.setProperty(
        "--retraso-ave",
        `${configuracionAves.bandada ? retrasoBandada - indice * 0.65 : -Math.random() * 24}s`,
      );
      ave.style.setProperty(
        "--escala-ave",
        `${configuracionAves.bandada ? 0.38 + indice * 0.045 : 0.76 + Math.random() * 0.25}`,
      );
      ave.style.setProperty("--retraso-aleteo", `${-Math.random() * 0.7}s`);
      capa.appendChild(ave);
    }
  }

  const cantidadEscorpiones = cantidadesEscorpionesDesierto[misionActual] || 0;
  if (cantidadEscorpiones > 0) {
    const retrasoPareja = -Math.random() * 25;
    for (let indice = 0; indice < cantidadEscorpiones; indice += 1) {
      const escorpion = crearAnimalAnimadoDesierto(
        `escorpion-desierto-ambiente${cantidadEscorpiones > 1 ? " pareja-escorpiones-desierto" : ""}`,
        [
          "assets/images/ambiente/desierto/alacran-camina-1.png",
          "assets/images/ambiente/desierto/alacran-camina-2.png",
        ],
        cantidadEscorpiones > 1
          ? "Pareja de alacranes caminando por la arena"
          : "Alacrán caminando por la arena",
      );
      escorpion.style.setProperty("--retraso-escorpion", `${retrasoPareja - indice * 0.85}s`);
      escorpion.style.setProperty("--altura-escorpion", `${1.2 + indice * 2.4}%`);
      escorpion.style.setProperty("--escala-escorpion", `${0.72 - indice * 0.08}`);
      capa.appendChild(escorpion);
    }
  }

  if (misionesLagartijaDesierto.has(misionActual)) {
    const lagartija = crearAnimalAnimadoDesierto(
      "lagartija-desierto-ambiente",
      [
        "assets/images/ambiente/desierto/lagartija-camina-1.png",
        "assets/images/ambiente/desierto/lagartija-camina-2.png",
        "assets/images/ambiente/desierto/lagartija-camina-3.png",
        "assets/images/ambiente/desierto/lagartija-camina-4.png",
      ],
      "Lagartija corriendo entre las dunas",
    );
    lagartija.style.setProperty("--retraso-lagartija", `${-Math.random() * 18}s`);
    capa.appendChild(lagartija);
  }

  if (misionesPastoDesierto.has(misionActual)) {
    const cantidadMatas = window.matchMedia("(max-width: 600px)").matches ? 1 : 2;
    for (let indice = 0; indice < cantidadMatas; indice += 1) {
      const pasto = document.createElement("img");
      pasto.className = "pasto-seco-desierto-ambiente";
      pasto.src = "assets/images/ambiente/desierto/pasto-seco-viento.png";
      pasto.alt = "";
      pasto.decoding = "async";
      pasto.draggable = false;
      pasto.style.setProperty("--posicion-pasto", `${indice === 0 ? 7 + Math.random() * 10 : 76 + Math.random() * 10}%`);
      pasto.style.setProperty("--escala-pasto", `${0.72 + Math.random() * 0.34}`);
      pasto.style.setProperty("--retraso-pasto", `${-Math.random() * 3}s`);
      capa.appendChild(pasto);
    }
  }

  if (capa.childElementCount > 0) {
    contenedorEscenario.insertBefore(capa, personajeImagen);
  }
}

async function liberarMaguitoDeTrampaEspejismo() {
  const trampa = contenedorEscenario.querySelector(
    ".trampa-espejismo-maguito",
  );
  if (!trampa) return;

  trampa.classList.add("liberandose");
  trampa.setAttribute(
    "aria-label",
    "La prisión de espejismo se rompe y Zafir queda libre",
  );

  await esperarPruebaBosque(prefiereReducirMovimiento.matches ? 250 : 1850);
  if (!trampa.isConnected) return;
  trampa.classList.add("liberada");
  await esperarPruebaBosque(prefiereReducirMovimiento.matches ? 100 : 650);
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

  const pruebaEspecial = obtenerPruebaEspecialBosquePendiente();
  const dueloAventura = obtenerDueloAventuraPendiente();
  const finalMundoCuatroCompletado =
    escenarioActual === 3 && misionActual === 9 && mundoCuatroCompletado;
  const sinPalabraNormal = Boolean(
    pruebaEspecial || dueloAventura || finalMundoCuatroCompletado,
  );
  const palabraSeleccionada = sinPalabraNormal ? null : obtenerPalabraAleatoria();

  palabraSecreta = palabraSeleccionada?.palabra || "";

  pistaActual = palabraSeleccionada?.pista || "";

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
  btnPista.disabled = sinPalabraNormal;
  btnSiguiente.classList.add("oculto");

  palabraOculta.classList.toggle("oculto", sinPalabraNormal);
  btnPista.classList.toggle("oculto", sinPalabraNormal);
  teclado.classList.toggle("oculto", sinPalabraNormal);

  if (!pruebaEspecial) {
    mostrarPalabra();
    crearTeclado();
  }
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

  if (finalMundoCuatroCompletado) {
    bloquearTeclado();
    btnPista.disabled = true;
    btnSiguiente.textContent = "🔥 Mundo 5 · Próximamente";
    btnSiguiente.classList.remove("oculto");
    mensajePersonaje.textContent =
      "💎 El Cristal Glacial está a salvo. Nivor está listo para luchar junto a Aren.";
    return Promise.resolve();
  }

  if (pruebaEspecial) {
    mensajePersonaje.textContent = escenarioActual === 3
      ? "El hielo antiguo preparó una prueba para revelar el camino hacia Nivor."
      : escenarioActual === 2
        ? "Las Cumbres prepararon una prueba especial para dominar el viento."
      : escenarioActual === 1
        ? "El desierto preparó una prueba especial para revelar el camino."
        : "El bosque preparó una prueba especial para abrir el camino.";
    abrirPruebaEspecialBosque(pruebaEspecial);
    return Promise.resolve();
  }

  if (dueloAventura) {
    mensajePersonaje.textContent = dueloAventura === "guardiana"
      ? "La Guardiana del Bosque espera frente al portal apagado."
      : dueloAventura === "mago_desierto"
        ? "Zafir te espera para la prueba final del Cristal Dorado."
      : dueloAventura === "nimbus_cumbres"
          ? "Nimbus te espera para el juramento final del Cristal Celeste."
          : dueloAventura === "nivor_glacial"
            ? "Nivor desciende sobre la arena. No habrá acertijos: esta vez deberás enfrentarlo."
            : dueloAventura === "nivor_cero_absoluto"
              ? "Nivor convoca el Cero Absoluto. La verdad se decidirá en una última batalla."
          : "El Guardián de la Luna te desafía a demostrar tu valor.";
    if (presentarMision) await presentarInicioMision();
    requestAnimationFrame(() => void presentarDueloAventura(dueloAventura));
    return Promise.resolve();
  }

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
  let sonidoNarrativo =
    escenarioActual === 0 ? sonidosNarrativosPorMision[misionActual] || "" : "";

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
  const cristalDesiertoObtenido = cristalesObtenidos > 1;
  const cristalCumbresObtenido = cristalesObtenidos > 2;
  const cristalHieloObtenido = cristalesObtenidos > 3;

  cristalPanelBosque.classList.toggle("oculto", !cristalBosqueObtenido);
  ranuraCristalBosque.classList.toggle("obtenida", cristalBosqueObtenido);
  ranuraCristalBosque.setAttribute(
    "aria-label",
    cristalBosqueObtenido
      ? "Cristal del Bosque Encantado obtenido"
      : "Espacio del Cristal del Bosque Encantado vacío",
  );
  cristalPanelDesierto.classList.toggle("oculto", !cristalDesiertoObtenido);
  ranuraCristalDesierto.classList.toggle("obtenida", cristalDesiertoObtenido);
  ranuraCristalDesierto.classList.toggle("bloqueada", !cristalDesiertoObtenido);
  ranuraCristalDesierto.setAttribute(
    "aria-label",
    cristalDesiertoObtenido
      ? "Cristal Dorado del Desierto obtenido"
      : "Cristal Dorado del Desierto bloqueado",
  );
  cristalPanelCumbres?.classList.toggle("oculto", !cristalCumbresObtenido);
  ranuraCristalCumbres?.classList.toggle("obtenida", cristalCumbresObtenido);
  ranuraCristalCumbres?.classList.toggle("bloqueada", !cristalCumbresObtenido);
  ranuraCristalCumbres?.setAttribute(
    "aria-label",
    cristalCumbresObtenido
      ? "Cristal Celeste de Cumbres Celestes obtenido"
      : "Cristal Celeste de Cumbres Celestes bloqueado",
  );
  cristalPanelHielo?.classList.toggle("oculto", !cristalHieloObtenido);
  ranuraCristalHielo?.classList.toggle("obtenida", cristalHieloObtenido);
  ranuraCristalHielo?.classList.toggle("bloqueada", !cristalHieloObtenido);
  ranuraCristalHielo?.setAttribute(
    "aria-label",
    cristalHieloObtenido
      ? "Cristal Glacial Violeta del Reino del Invierno Eterno obtenido"
      : "Cristal Glacial Violeta del Reino del Invierno Eterno bloqueado",
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
    mundoDosCompletado,
    mundoTresCompletado,
    mundoCuatroCompletado,
    primerDueloNivorCompletado,
    hombreLoboDescubierto,
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
  mundoDosCompletado =
    progreso.mundoDosCompletado === true || cristalesObtenidos > 1;
  mundoTresCompletado =
    progreso.mundoTresCompletado === true || cristalesObtenidos > 2;
  mundoCuatroCompletado =
    progreso.mundoCuatroCompletado === true || cristalesObtenidos > 3;
  primerDueloNivorCompletado =
    progreso.primerDueloNivorCompletado === true
    || mundoCuatroCompletado
    || (escenarioActual === 3 && misionActual > 5);
  hombreLoboDescubierto = progreso.hombreLoboDescubierto === true
    || escenarioActual > 0
    || (escenarioActual === 0 && misionActual > 5);
  maximoEscenarioDesbloqueado = Math.min(
    Math.max(
      progreso.maximoEscenarioDesbloqueado ?? escenarioActual,
      escenarioActual,
      0,
    ),
    aventura.length - 1,
  );

  // Migra partidas anteriores que ya habían llegado al Mundo 2 antes de que
  // existiera el sistema de personajes desbloqueables.
  if (escenarioActual >= 1 || maximoEscenarioDesbloqueado >= 1) {
    guardarDesbloqueoGuardiana();
  }
  if (mundoDosCompletado) {
    guardarDesbloqueoMago();
  }
  if (mundoTresCompletado) {
    guardarDesbloqueoNimbus();
  }
  if (mundoCuatroCompletado) {
    guardarDesbloqueoNivor();
  }

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

cargarPersonajesDesbloqueados();
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

  contenedorEscenario.classList.remove("final-desierto-activo");
  contenedorEscenario.classList.toggle(
    "escenario-desierto",
    escenarioActual === 1,
  );
  contenedorEscenario.classList.toggle(
    "escenario-cumbres",
    escenarioActual === 2,
  );
  contenedorEscenario.classList.toggle(
    "escenario-hielo",
    escenarioActual === 3,
  );
  if (escenarioActual === 1) {
    contenedorEscenario.dataset.misionDesierto = `${misionActual + 1}`;
  } else {
    delete contenedorEscenario.dataset.misionDesierto;
  }
  if (escenarioActual === 2) {
    contenedorEscenario.dataset.misionCumbres = `${misionActual + 1}`;
  } else {
    delete contenedorEscenario.dataset.misionCumbres;
  }
  if (escenarioActual === 3) {
    contenedorEscenario.dataset.misionHielo = `${misionActual + 1}`;
  } else {
    delete contenedorEscenario.dataset.misionHielo;
  }
  fondoEscenario.src = `assets/images/fondos/${nombreFondo}`;
  fondoEscenario.alt = escenarioActual === 3
    ? "Reino del Invierno Eterno"
    : escenarioActual === 2
      ? "Cumbres Celestes"
      : escenarioActual === 1
        ? "Desierto Perdido"
        : "Bosque Encantado";
  actualizarBloqueoTroncoMision();
  actualizarVientoArenaMision();
  actualizarVidaDesiertoMision();
  actualizarLlegadaDesiertoMision();
  actualizarPersonajesNarrativosDesierto();
  actualizarPersonajesNarrativosCumbres();
  actualizarPersonajesNarrativosHielo();
  volverEstadoBaseExplorador();
}

function iniciarFaunaHieloCuandoLaEscenaEsteLibre(fauna, misionFauna) {
  let temporizadorInicio = null;
  const observador = new MutationObserver(programarInicio);

  function detenerEspera() {
    if (temporizadorInicio) window.clearTimeout(temporizadorInicio);
    temporizadorInicio = null;
    observador.disconnect();
  }

  function escenaBloqueada() {
    return (
      !modalHistoria.classList.contains("oculto") ||
      pantallaJuego.classList.contains("presentacion-mision-preparada") ||
      pantallaJuego.classList.contains("presentacion-mision-activa") ||
      pantallaJuego.classList.contains("interfaz-revelandose")
    );
  }

  function programarInicio() {
    if (
      escenarioActual !== 3 ||
      misionActual !== misionFauna ||
      !fauna.isConnected
    ) {
      detenerEspera();
      return;
    }

    if (temporizadorInicio) window.clearTimeout(temporizadorInicio);
    temporizadorInicio = null;
    if (escenaBloqueada()) return;

    temporizadorInicio = window.setTimeout(() => {
      temporizadorInicio = null;
      if (escenaBloqueada()) {
        programarInicio();
        return;
      }
      fauna.classList.add("en-marcha");
      observador.disconnect();
    }, 650);
  }

  observador.observe(modalHistoria, { attributes: true, attributeFilter: ["class"] });
  observador.observe(pantallaJuego, { attributes: true, attributeFilter: ["class"] });
  programarInicio();
}

function actualizarPersonajesNarrativosHielo() {
  contenedorEscenario
    .querySelectorAll(".personaje-narrativo-hielo, .ambiente-hielo")
    .forEach((elemento) => elemento.remove());
  if (escenarioActual !== 3) return;

  const ambiente = document.createElement("div");
  ambiente.className = "ambiente-hielo";
  ambiente.setAttribute("aria-hidden", "true");
  ambiente.innerHTML = "<i></i><i></i><i></i><i></i>";
  contenedorEscenario.appendChild(ambiente);

  const faunaAnimadaPorMision = {
    0: {
      clase: "fauna-yeti-hielo",
      presentacion: "assets/images/personajes/mundo-hielo/yeti-camina-paso-1-v2.png",
      cuadros: [
        "assets/images/personajes/mundo-hielo/yeti-camina-paso-2-v2.png",
        "assets/images/personajes/mundo-hielo/yeti-camina-paso-suave-v4.png",
      ],
      descripcion: "Yeti caminando por el valle helado",
    },
    2: {
      clase: "fauna-zorro-hielo",
      presentacion: "assets/images/personajes/mundo-hielo/zorro-hielo-camina-paso-1-v2.png",
      cuadros: [
        "assets/images/personajes/mundo-hielo/zorro-hielo-camina-paso-2-v2.png",
        "assets/images/personajes/mundo-hielo/zorro-hielo-camina-paso-alto-v4.png",
      ],
      descripcion: "Zorro boreal caminando por el sendero",
    },
  };
  const faunaAnimada = faunaAnimadaPorMision[misionActual];
  if (faunaAnimada) {
    const misionFauna = misionActual;
    const fauna = document.createElement("div");
    fauna.className = `personaje-narrativo-hielo fauna-hielo ${faunaAnimada.clase}`;
    fauna.setAttribute("role", "img");
    fauna.setAttribute("aria-label", faunaAnimada.descripcion);
    const presentacion = document.createElement("img");
    presentacion.className = "fauna-hielo-presentacion";
    presentacion.src = faunaAnimada.presentacion;
    presentacion.alt = "";
    presentacion.setAttribute("aria-hidden", "true");
    fauna.appendChild(presentacion);
    faunaAnimada.cuadros.forEach((src, indice) => {
      const cuadro = document.createElement("img");
      cuadro.className = `fauna-hielo-cuadro fauna-hielo-cuadro-${indice + 1}`;
      cuadro.src = src;
      cuadro.alt = "";
      cuadro.setAttribute("aria-hidden", "true");
      fauna.appendChild(cuadro);
    });
    contenedorEscenario.appendChild(fauna);

    if (!prefiereReducirMovimiento.matches) {
      const imagenesFauna = [faunaAnimada.presentacion, ...faunaAnimada.cuadros];
      void Promise.all(imagenesFauna.map((src) => precargarImagen(src))).then(() => {
        if (
          escenarioActual !== 3 ||
          misionActual !== misionFauna ||
          !fauna.isConnected
        ) return;
        iniciarFaunaHieloCuandoLaEscenaEsteLibre(fauna, misionFauna);
      });
    }
  }

  if (![5, 9].includes(misionActual)) return;
  const nivor = document.createElement("img");
  nivor.className = `personaje-narrativo-hielo nivor-hielo nivor-hielo-${misionActual + 1}`;
  nivor.src = misionActual === 9
    ? srcDragonHieloAtaqueVersus
    : srcDragonHieloBaseVersus;
  nivor.alt = misionActual === 9
    ? "Nivor invocando el Cero Absoluto"
    : "Nivor, guardián del Reino del Invierno Eterno";
  contenedorEscenario.appendChild(nivor);
}

function actualizarPersonajesNarrativosCumbres() {
  contenedorEscenario
    .querySelectorAll(".personaje-narrativo-cumbres, .ambiente-cumbres")
    .forEach((elemento) => elemento.remove());
  if (escenarioActual !== 2) return;

  const ambiente = document.createElement("div");
  ambiente.className = "ambiente-cumbres";
  ambiente.setAttribute("aria-hidden", "true");
  ambiente.innerHTML = "<i></i><i></i><i></i>";
  contenedorEscenario.appendChild(ambiente);

  const faunaPorMision = {
    0: {
      clase: "nubelun-cumbres",
      src: "assets/images/ambiente/cumbres/nubelun-cumbres-v1.png",
      srcMovil: "assets/images/ambiente/cumbres/nubelun-cumbres-movil-v2.png",
      srcMovilPaso: "assets/images/ambiente/cumbres/nubelun-cumbres-movil-paso-v3.png",
      cuadros: [
        "assets/images/ambiente/cumbres/nubelun-cumbres-v1.png",
        "assets/images/ambiente/cumbres/nubelun-cumbres-paso-v2.png",
      ],
      alt: "Nubelún, una criatura de nubes que observa el camino",
    },
    1: {
      clase: "velario-cumbres",
      src: "assets/images/ambiente/cumbres/velario-cumbres-v1.png",
      cuadros: [
        "assets/images/ambiente/cumbres/velario-cumbres-v1.png",
        "assets/images/ambiente/cumbres/velario-cumbres-aleteo-v2.png",
      ],
      alt: "Velario, una criatura celeste que planea a lo lejos",
    },
    4: {
      clase: "lumiri-cumbres",
      src: "assets/images/ambiente/cumbres/lumiri-cumbres-v1.png",
      alt: "Lúmiri, una criatura de constelaciones que descansa junto al sendero",
    },
  };
  const faunaMision = faunaPorMision[misionActual];
  if (faunaMision) {
    const nubelunEnMovil = faunaMision.clase === "nubelun-cumbres"
      && window.matchMedia("(max-width: 640px)").matches;
    const usarCuadrosAnimados = Boolean(faunaMision.cuadros) && !nubelunEnMovil;
    const usarContenedorFauna = usarCuadrosAnimados || nubelunEnMovil;
    const criatura = document.createElement(usarContenedorFauna ? "span" : "img");
    criatura.className = `personaje-narrativo-cumbres fauna-cumbres ${faunaMision.clase}`;
    if (usarContenedorFauna) {
      criatura.classList.add("fauna-cumbres-animada");
      criatura.classList.toggle("fauna-cumbres-un-cuadro", nubelunEnMovil);
      criatura.setAttribute("role", "img");
      criatura.setAttribute("aria-label", faunaMision.alt);
      const cuadrosMoviles = [faunaMision.srcMovil, faunaMision.srcMovilPaso].filter(Boolean);
      const cuadrosVisibles = nubelunEnMovil
        ? [cuadrosMoviles[0] || faunaMision.src]
        : faunaMision.cuadros;
      cuadrosVisibles.forEach((src, indice) => {
        const cuadro = document.createElement("img");
        cuadro.className = `fauna-cumbres-cuadro fauna-cumbres-cuadro-${indice + 1}`;
        cuadro.src = src;
        cuadro.alt = "";
        criatura.appendChild(cuadro);
      });
      if (nubelunEnMovil && cuadrosMoviles.length > 1) {
        const precargas = cuadrosMoviles.map((src) => {
          const imagen = new Image();
          imagen.src = src;
          return imagen;
        });
        Promise.all(precargas.map((imagen) => imagen.decode().catch(() => {})))
          .then(() => {
            const cuadroMovil = criatura.querySelector(".fauna-cumbres-cuadro-1");
            if (!cuadroMovil || !criatura.isConnected) return;
            let indiceCuadro = 0;
            const intervaloPaso = window.setInterval(() => {
              if (!criatura.isConnected) {
                window.clearInterval(intervaloPaso);
                return;
              }
              indiceCuadro = (indiceCuadro + 1) % cuadrosMoviles.length;
              cuadroMovil.src = cuadrosMoviles[indiceCuadro];
            }, 360);
          });
      }
    } else {
      criatura.src = faunaMision.src;
      criatura.alt = faunaMision.alt;
    }
    contenedorEscenario.appendChild(criatura);
  }

  if (misionActual >= 2) {
    const nimbus = document.createElement("img");
    nimbus.className = "personaje-narrativo-cumbres nimbus-cumbres";
    nimbus.src = misionActual === 9
      ? "assets/images/personajes/versus/dragon-victoria.png"
      : misionActual === 2
        ? "assets/images/personajes/versus/dragon-ataque.png"
        : "assets/images/personajes/versus/dragon-base.png";
    nimbus.alt = "Nimbus, el pequeño dragón guardián";
    contenedorEscenario.appendChild(nimbus);
  }

  if (misionActual === 9 && mundoTresCompletado) {
    const aeralis = document.createElement("img");
    aeralis.className = "personaje-narrativo-cumbres aeralis-cumbres";
    aeralis.src = "assets/images/personajes/aventura/aeralis-liberada-v1.png";
    aeralis.alt = mundoTresCompletado
      ? "Aeralis liberada de la tormenta"
      : "Aeralis atrapada por los sellos del firmamento";
    contenedorEscenario.appendChild(aeralis);
  }
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

async function presentarDesbloqueoGuardianaBosque() {
  if (escenarioActual !== 0 || misionActual !== 9) return;

  const yaEstabaDesbloqueada = guardianaDesbloqueada;
  const capa = document.createElement("div");
  const aura = document.createElement("span");
  const guardiana = document.createElement("img");
  const mensaje = document.createElement("div");
  const titulo = document.createElement("strong");
  const texto = document.createElement("p");

  capa.className = "encuentro-guardiana-bosque";
  capa.setAttribute("aria-live", "polite");
  aura.className = "aura-encuentro-guardiana";
  guardiana.className = "figura-encuentro-guardiana";
  guardiana.src = srcGuardianaBaseVersus;
  guardiana.alt = "Guardiana del Bosque";
  mensaje.className = "mensaje-encuentro-guardiana";
  titulo.textContent = yaEstabaDesbloqueada
    ? "La Guardiana del Bosque"
    : "¡Guardiana desbloqueada!";
  texto.textContent = yaEstabaDesbloqueada
    ? "Volviste a demostrar que sos digno de atravesar el portal."
    : "Superaste su prueba. La Guardiana autoriza tu paso y se une a tus campeones del modo versus.";
  mensaje.append(titulo, texto);
  capa.append(aura, guardiana, mensaje);
  contenedorEscenario.appendChild(capa);

  try {
    requestAnimationFrame(() => capa.classList.add("visible"));
    await esperarMovimiento(prefiereReducirMovimiento.matches ? 180 : 850);
    guardarDesbloqueoGuardiana();
    actualizarDisponibilidadPersonajesVersus();
    capa.classList.add("revelada");
    await esperarMovimiento(prefiereReducirMovimiento.matches ? 500 : 3300);
    capa.classList.add("saliendo");
    await esperarMovimiento(prefiereReducirMovimiento.matches ? 120 : 650);
  } finally {
    capa.remove();
  }
}

const escenasDesafioGuardianaBosque = Object.freeze([
  {
    imagen: "assets/images/cinematicas/bosque-mision-10/01-encuentro-guardiana-v1.png",
    titulo: "Una voz entre las hojas",
    texto:
      "—¡Alto, viajero! Soy la Guardiana de este bosque. He observado cada prueba que superaste para llegar hasta el portal.",
  },
  {
    imagen: "assets/images/cinematicas/bosque-mision-10/02-desafio-guardiana-v1.png",
    titulo: "La prueba del portal",
    texto:
      "—El cristal respondió a tu valor, pero no dejaré que su poder cruce el portal sin una última prueba. Demostrá que podés vencerme en un duelo de palabras.",
  },
]);

async function presentarDesafioGuardianaBosque() {
  if (escenarioActual !== 0 || misionActual !== 9 || portalAbierto) return;

  const capa = document.createElement("div");
  const imagen = document.createElement("img");
  const relato = document.createElement("div");
  const titulo = document.createElement("strong");
  const texto = document.createElement("p");
  const progreso = document.createElement("span");
  const continuar = document.createElement("button");
  const saltar = document.createElement("button");
  let indice = 0;
  let resolverCinematica;
  const cinematicaTerminada = new Promise((resolve) => {
    resolverCinematica = resolve;
  });

  capa.className = "cinematica-desafio-guardiana";
  capa.setAttribute("role", "dialog");
  capa.setAttribute("aria-modal", "true");
  capa.setAttribute("aria-label", "Encuentro con la Guardiana del Bosque");
  imagen.className = "imagen-cinematica-desafio-guardiana";
  relato.className = "relato-cinematica-desafio-guardiana";
  progreso.className = "progreso-cinematica-desafio-guardiana";
  continuar.className = "continuar-cinematica-desafio-guardiana";
  continuar.type = "button";
  saltar.className = "saltar-cinematica-desafio-guardiana";
  saltar.type = "button";
  saltar.textContent = "Saltar cinemática";
  relato.append(titulo, texto, progreso, continuar);
  capa.append(imagen, relato, saltar);
  document.body.appendChild(capa);

  const terminar = () => resolverCinematica();
  const mostrarPlano = async () => {
    const escena = escenasDesafioGuardianaBosque[indice];
    capa.classList.remove("plano-visible");
    imagen.src = escena.imagen;
    imagen.alt = `${escena.titulo}. ${escena.texto}`;
    titulo.textContent = escena.titulo;
    texto.textContent = escena.texto;
    progreso.textContent = `${indice + 1} / ${escenasDesafioGuardianaBosque.length}`;
    continuar.textContent = indice === escenasDesafioGuardianaBosque.length - 1
      ? "Aceptar desafío"
      : "Continuar";
    await esperarCargaImagen(imagen);
    requestAnimationFrame(() => capa.classList.add("plano-visible"));
  };

  continuar.addEventListener("click", () => {
    if (indice >= escenasDesafioGuardianaBosque.length - 1) {
      terminar();
      return;
    }
    indice += 1;
    void mostrarPlano();
  });
  saltar.addEventListener("click", terminar, { once: true });

  try {
    void mostrarPlano();
    requestAnimationFrame(() => capa.classList.add("visible"));
    continuar.focus();
    await cinematicaTerminada;
    capa.classList.add("saliendo");
    await esperarMovimiento(prefiereReducirMovimiento.matches ? 100 : 450);
  } finally {
    capa.remove();
  }
}

async function presentarDesafioMagoDesierto() {
  if (escenarioActual !== 1 || misionActual !== 9 || mundoDosCompletado) return;

  const capa = document.createElement("div");
  const mago = document.createElement("img");
  const mensaje = document.createElement("div");
  const titulo = document.createElement("strong");
  const texto = document.createElement("p");

  capa.className = "encuentro-mago-desierto desafio-mago-desierto";
  capa.setAttribute("aria-live", "polite");
  mago.className = "figura-encuentro-mago";
  mago.src = srcMagoBaseVersus;
  mago.alt = "Zafir frente al Cristal Dorado";
  mensaje.className = "mensaje-encuentro-mago";
  titulo.textContent = "La prueba final del desierto";
  texto.textContent =
    "Liberaste al Devoradunas, pero el cristal exige un guardián preparado. Venceme en un duelo de palabras y te ayudaré a llevarlo al siguiente mundo.";
  mensaje.append(titulo, texto);
  capa.append(mago, mensaje);
  contenedorEscenario.appendChild(capa);

  try {
    requestAnimationFrame(() => capa.classList.add("visible"));
    await esperarMovimiento(prefiereReducirMovimiento.matches ? 450 : 2800);
    capa.classList.add("saliendo");
    await esperarMovimiento(prefiereReducirMovimiento.matches ? 120 : 650);
  } finally {
    capa.remove();
  }
}

const escenasCinematicaFinalDesierto = Object.freeze([
  {
    imagen: "assets/images/cinematicas/desierto-final/01-devoradunas-revela-cristal-v1.png",
    titulo: "El secreto bajo la arena",
    texto: "Ya libre de la corrupción, el Devoradunas revela el Cristal Dorado que custodiaba bajo su cuerpo.",
  },
  {
    imagen: "assets/images/cinematicas/desierto-final/02-devoradunas-entrega-cristal-v1.png",
    titulo: "Una entrega voluntaria",
    texto: "La criatura empuja el cristal hacia Aren. La persecución terminó: ahora confía en él.",
  },
  {
    imagen: "assets/images/cinematicas/desierto-final/03-mago-purifica-cristal-v1.png",
    titulo: "La última sombra",
    texto: "Zafir hace levitar el cristal y desprende con su magia los últimos restos de arena corrupta.",
  },
  {
    imagen: "assets/images/cinematicas/desierto-final/04-mago-entrega-cristal-v1.png",
    titulo: "El Cristal Dorado",
    texto: "Limpio y luminoso, el segundo Cristal de la Sabiduría pasa por fin a manos de Aren.",
  },
  {
    imagen: "assets/images/cinematicas/desierto-final/05-mago-abre-portal-cumbres-v1.png",
    titulo: "Rumbo a las Cumbres Celestes",
    texto: "Zafir abre un portal entre las nubes. Detrás aguarda un mundo de montañas e islas flotantes.",
  },
]);

const duracionPlanoCinematicaFinalDesierto = 6000;
const duracionDesbloqueoMagoDesierto = 4300;

async function reproducirCinematicaFinalDesierto() {
  if (escenarioActual !== 1 || misionActual !== 9) return;

  const capa = document.createElement("div");
  const imagen = document.createElement("img");
  const relato = document.createElement("div");
  const titulo = document.createElement("strong");
  const texto = document.createElement("p");
  const progreso = document.createElement("span");
  const saltar = document.createElement("button");
  let omitida = false;
  let resolverSalto;
  const saltoSolicitado = new Promise((resolver) => {
    resolverSalto = resolver;
  });

  capa.className = "cinematica-final-desierto";
  capa.setAttribute("role", "dialog");
  capa.setAttribute("aria-label", "Cinemática final del Desierto Perdido");
  imagen.className = "imagen-cinematica-final-desierto";
  relato.className = "relato-cinematica-final-desierto";
  progreso.className = "progreso-cinematica-final-desierto";
  saltar.className = "saltar-cinematica-final-desierto";
  saltar.type = "button";
  saltar.textContent = "Saltar cinemática";
  saltar.addEventListener("click", () => {
    omitida = true;
    resolverSalto();
  }, { once: true });
  relato.append(titulo, texto, progreso);
  capa.append(imagen, relato, saltar);
  document.body.appendChild(capa);

  try {
    reproducirMusicaCinematica(
      musicaSegundoCristal,
      "Música del segundo cristal",
      0.52,
    );
    requestAnimationFrame(() => capa.classList.add("visible"));
    for (let indice = 0; indice < escenasCinematicaFinalDesierto.length; indice += 1) {
      const escena = escenasCinematicaFinalDesierto[indice];
      capa.classList.remove("plano-visible");
      imagen.src = escena.imagen;
      imagen.alt = `${escena.titulo}. ${escena.texto}`;
      titulo.textContent = escena.titulo;
      texto.textContent = escena.texto;
      progreso.textContent = `${indice + 1} / ${escenasCinematicaFinalDesierto.length}`;
      await esperarCargaImagen(imagen);
      requestAnimationFrame(() => capa.classList.add("plano-visible"));
      await Promise.race([
        esperarMovimiento(duracionPlanoCinematicaFinalDesierto),
        saltoSolicitado,
      ]);
      if (omitida) break;
    }
    capa.classList.add("saliendo");
    await esperarMovimiento(prefiereReducirMovimiento.matches ? 100 : 500);
  } finally {
    detenerMusicaCinematica(musicaSegundoCristal, 0.52);
    capa.remove();
  }
}

async function presentarDesbloqueoMagoDesierto() {
  const capa = document.createElement("div");
  const mago = document.createElement("img");
  const mensaje = document.createElement("div");
  const titulo = document.createElement("strong");
  const texto = document.createElement("p");

  capa.className = "encuentro-mago-desierto desbloqueo-mago-desierto";
  capa.setAttribute("aria-live", "polite");
  mago.className = "figura-encuentro-mago";
  mago.src = srcMagoBaseVersus;
  mago.alt = "Zafir desbloqueado";
  mensaje.className = "mensaje-encuentro-mago";
  titulo.textContent = "¡Zafir desbloqueado!";
  texto.textContent =
    "Superaste su prueba y recuperaste el Cristal Dorado. Zafir se une a tus campeones del modo versus.";
  mensaje.append(titulo, texto);
  capa.append(mago, mensaje);
  contenedorEscenario.appendChild(capa);

  try {
    requestAnimationFrame(() => capa.classList.add("visible"));
    await esperarMovimiento(duracionDesbloqueoMagoDesierto);
    capa.classList.add("saliendo");
    await esperarMovimiento(prefiereReducirMovimiento.matches ? 120 : 650);
  } finally {
    capa.remove();
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
  reproducirMusicaCinematica(
    musicaCaminaPortal,
    "música de caminata al portal",
    0.62,
  );

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

    detenerMusicaCinematica(musicaCaminaPortal, 0.62);
    await mostrarIntroduccionMundoDos();
    await iniciarMisionAventura({ presentarMision: true });
    mostrarHistoriaMision({ misionYaCargada: true });
    guardarProgreso();
    restablecerControlesTrasPortal();
  } finally {
    detenerMusicaCinematica(musicaCaminaPortal, 0.62);
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

function obtenerTipoPruebaEspecial(escenario, mision) {
  if (escenario === 0 && mision === 2) return "ramas";
  if (escenario === 0 && mision === 5) return "lobos";
  if (escenario === 1 && mision === 2) return "vientos";
  if (escenario === 1 && mision === 4) return "oasis";
  if (escenario === 1 && mision === 7) return "espejos";
  if (escenario === 2 && mision === 1) return "sopa-celeste";
  if (escenario === 2 && mision === 3) return "campanas-celestes";
  if (escenario === 2 && mision === 8) return "sellos-aeralis";
  if (escenario === 3 && mision === 6) return "laberinto-hielo";
  if (escenario === 3 && mision === 7) return "corazon-termico";
  return "";
}

function obtenerPruebaEspecialBosquePendiente() {
  if (escenarioActual === 0 && misionActual === 5) {
    return desafiosCompletados === 0 ? "lobos" : "";
  }
  if (desafiosCompletados !== 2) return "";
  return obtenerTipoPruebaEspecial(escenarioActual, misionActual);
}

function obtenerDueloAventuraPendiente() {
  if (escenarioActual === 0 && misionActual === 9 && !portalAbierto) {
    return "guardiana";
  }
  if (escenarioActual === 1 && misionActual === 9 && !mundoDosCompletado) {
    return "mago_desierto";
  }
  if (escenarioActual === 2 && misionActual === 9 && !mundoTresCompletado) {
    return "nimbus_cumbres";
  }
  if (escenarioActual === 3 && misionActual === 5 && !primerDueloNivorCompletado) {
    return "nivor_glacial";
  }
  if (escenarioActual === 3 && misionActual === 9 && !mundoCuatroCompletado) {
    return "nivor_cero_absoluto";
  }
  return "";
}

function abrirPruebaEspecialBosque(tipo) {
  if (!tipo || pruebaEspecialBosqueActiva) return;

  pruebaEspecialBosqueActiva = tipo;
  focoPrevioPruebaBosque = document.activeElement;
  modalPruebaBosque.classList.remove("oculto", "prueba-completada");
  modalPruebaBosque.classList.toggle(
    "prueba-desierto",
    ["vientos", "oasis", "espejos"].includes(tipo),
  );
  const esPruebaCumbres = [
    "sopa-celeste",
    "campanas-celestes",
    "sellos-aeralis",
  ].includes(tipo);
  const esPruebaHielo = ["laberinto-hielo", "corazon-termico"].includes(tipo);
  modalPruebaBosque.classList.toggle("prueba-cumbres", esPruebaCumbres);
  modalPruebaBosque.classList.toggle("prueba-hielo", esPruebaHielo);
  pantallaJuego.classList.add("prueba-bosque-activa");
  puzzleRamasDeslizante.classList.toggle("oculto", tipo !== "ramas");
  puzzleMemoriaLobos.classList.toggle("oculto", tipo !== "lobos");
  puzzleVientosDesierto.classList.toggle("oculto", tipo !== "vientos");
  puzzleOasisDesierto.classList.toggle("oculto", tipo !== "oasis");
  puzzleEspejosDesierto.classList.toggle("oculto", tipo !== "espejos");
  puzzleCumbres.classList.toggle("oculto", !(esPruebaCumbres || esPruebaHielo));
  btnRepetirPruebaBosque.disabled = false;
  btnSalirPruebaBosque.disabled = false;

  if (tipo === "ramas") {
    etiquetaPruebaBosque.textContent = "PRUEBA DEL SENDERO";
    tituloPruebaBosque.textContent = "Abrí un paso junto al árbol caído";
    instruccionPruebaBosque.textContent =
      "Armá las filas 1-2-3, 4-5-6 y 7-8-vacío. Tocá solamente una pieza iluminada para moverla al espacio que dice ACÁ.";
    btnRepetirPruebaBosque.textContent = "↻ Reiniciar fácil";
    iniciarPuzzleRamasDeslizante();
    return;
  }

  if (tipo === "vientos") {
    etiquetaPruebaBosque.textContent = "PRUEBA DEL CIRCUITO SOLAR";
    tituloPruebaBosque.textContent = "Llevá la energía al núcleo";
    instruccionPruebaBosque.textContent =
      "Girá los canales de piedra. La luz avanza solo por las uniones correctas y debe alcanzar el núcleo del centro.";
    btnRepetirPruebaBosque.textContent = "↻ Desordenar canales";
    iniciarPuzzleVientosDesierto();
    return;
  }

  if (tipo === "oasis") {
    etiquetaPruebaBosque.textContent = "PRUEBA DEL ESPEJISMO";
    tituloPruebaBosque.textContent = "Encontrá el oasis verdadero";
    instruccionPruebaBosque.textContent =
      "Superá tres rondas. En cada una compará ondas, cantidad de palmeras y color del destello entre cuatro oasis.";
    btnRepetirPruebaBosque.textContent = "↻ Cambiar los espejismos";
    iniciarPuzzleOasisDesierto();
    return;
  }

  if (tipo === "espejos") {
    etiquetaPruebaBosque.textContent = "PRUEBA DEL TEMPLO SOLAR";
    tituloPruebaBosque.textContent = "Conducí el rayo hasta la puerta";
    instruccionPruebaBosque.textContent =
      "Alineá cinco espejos vinculados. Al girar uno también cambia el siguiente, así que deberás pensar la secuencia.";
    btnRepetirPruebaBosque.textContent = "↻ Desordenar espejos";
    iniciarPuzzleEspejosDesierto();
    return;
  }

  if (esPruebaHielo) {
    iniciarPuzzleCumbres(tipo);
    return;
  }

  if (esPruebaCumbres) {
    iniciarPuzzleCumbres(tipo);
    return;
  }

  etiquetaPruebaBosque.textContent = "PRUEBA DE LOS AULLIDOS";
  tituloPruebaBosque.textContent = "Recordá el orden de las miradas";
  instruccionPruebaBosque.textContent =
    "Observá qué ojos brillan y después repetí la secuencia. Superá tres rondas para alejar a la manada.";
  btnRepetirPruebaBosque.textContent = "👁 Volver a observar";
  iniciarPuzzleMemoriaLobos();
}

function cerrarPruebaEspecialBosque() {
  if (!pruebaEspecialBosqueActiva) return;

  detenerLaberintoHielo();
  secuenciaPruebaBosque += 1;
  secuenciaCampanasCumbres += 1;
  punteroSopaCumbresActivo = false;
  memoriaLobosAceptandoEntrada = false;
  botonesMemoriaLobos.forEach((boton) => {
    boton.disabled = true;
    boton.classList.remove("iluminado", "elegido", "error");
  });
  botonesVientosDesierto.forEach((boton) => (boton.disabled = true));
  botonesOasisDesierto.forEach((boton) => (boton.disabled = true));
  botonesEspejosDesierto.forEach((boton) => (boton.disabled = true));
  botonesPuzzleCumbres.forEach((boton) => (boton.disabled = true));
  modalPruebaBosque.classList.add("oculto");
  modalPruebaBosque.classList.remove(
    "prueba-completada",
    "prueba-desierto",
    "prueba-cumbres",
    "prueba-hielo",
  );
  pantallaJuego.classList.remove("prueba-bosque-activa");
  const focoAnterior = focoPrevioPruebaBosque;
  focoPrevioPruebaBosque = null;
  pruebaEspecialBosqueActiva = "";
  pruebaBosqueEnModoDemo = false;
  focoAnterior?.focus?.();
}

const ladoSopaCumbres = 10;
const letrasSopaCumbres = [
  "JGQSCSNMFG",
  "PCUITENENR",
  "BDEOFUBUÑV",
  "SLBORABBPJ",
  "OINROEOOTV",
  "BCHUWTADAI",
  "JXACNCSZXA",
  "SUZEIZJUGQ",
  "SMIVXEEDFY",
  "EVIJWJMVFH",
].join("");
const palabrasSopaCumbres = Object.freeze([
  { palabra: "NUBE", indices: [18, 27, 36, 45] },
  { palabra: "VIENTO", indices: [91, 82, 73, 64, 55, 46] },
  { palabra: "CIELO", indices: [4, 13, 22, 31, 40] },
]);

const rondasCampanasCumbres = Object.freeze([
  Object.freeze({ intercambios: 5, duracionPaso: 650 }),
  Object.freeze({ intercambios: 7, duracionPaso: 500 }),
  Object.freeze({ intercambios: 9, duracionPaso: 380 }),
]);

const rondasSellosAeralis = Object.freeze([
  {
    palabra: "AIRE",
    pista: "Lo que llena las Cumbres Celestes.",
    opciones: [["E", "O", "A", "U", "I"], ["A", "E", "O", "I", "U"], ["N", "R", "L", "S", "T"], ["A", "O", "E", "U", "I"]],
  },
  {
    palabra: "NUBE",
    pista: "Flota alrededor de las islas.",
    opciones: [["V", "C", "N", "M", "L"], ["A", "U", "O", "I", "E"], ["P", "D", "G", "B", "R"], ["O", "A", "E", "I", "U"]],
  },
  {
    palabra: "LIBRE",
    pista: "Así debe quedar Aeralis.",
    opciones: [["I", "T", "L", "R", "A"], ["A", "I", "E", "O", "U"], ["P", "B", "D", "G", "R"], ["N", "S", "R", "L", "T"], ["A", "O", "U", "E", "I"]],
  },
]);

let punteroSopaCumbresActivo = false;

function iniciarPuzzleCumbres(tipo) {
  if (pruebaEspecialBosqueActiva !== tipo) return;
  puzzleCumbres.className = `puzzle-cumbres puzzle-${tipo}`;
  puzzleCumbres.setAttribute(
    "aria-label",
    ["laberinto-hielo", "corazon-termico"].includes(tipo)
      ? "Prueba del Reino del Invierno Eterno"
      : "Prueba de Cumbres Celestes",
  );
  puzzleCumbres.replaceChildren();
  botonesPuzzleCumbres = [];
  btnRepetirPruebaBosque.textContent = "↻ Reiniciar prueba";

  if (tipo === "sopa-celeste") {
    iniciarSopaCeleste();
  } else if (tipo === "campanas-celestes") {
    iniciarCampanasCelestes();
  } else if (tipo === "sellos-aeralis") {
    iniciarSellosAeralis();
  } else if (tipo === "laberinto-hielo") {
    iniciarLaberintoHielo();
  } else if (tipo === "corazon-termico") {
    iniciarCorazonTermico();
  }
}

const mapaLaberintoHielo = Object.freeze([
  "111111111111111111111",
  "100010100000000010001",
  "111010101111101010101",
  "100010000000101000101",
  "101111111111101111101",
  "101000000000001010001",
  "101010111111111010111",
  "101010001000000010001",
  "101011101011111011101",
  "101010101000001000101",
  "101010101111111011101",
  "101000100000001000001",
  "101111101111101111101",
  "100000101000100000101",
  "111110101110111110101",
  "100010100000100000101",
  "111010111110101111101",
  "100010000010101000101",
  "101111111011101010101",
  "100000000000001010001",
  "111111111111111111111",
]);
const ladoLaberintoHielo = mapaLaberintoHielo.length;
const estadoLaberintoHielo = { x: 1.5, y: 1.5, vx: 0, vy: 0, ultimoTiempo: 0 };

function esperarPuzzleHielo(milisegundos) {
  return new Promise((resolver) => window.setTimeout(resolver, milisegundos));
}

function detenerLaberintoHielo() {
  if (cuadroLaberintoHielo) cancelAnimationFrame(cuadroLaberintoHielo);
  cuadroLaberintoHielo = null;
  window.removeEventListener("deviceorientation", leerInclinacionLaberintoHielo);
  window.removeEventListener("keydown", manejarTeclaLaberintoHielo);
  window.removeEventListener("keyup", manejarTeclaLaberintoHielo);
  escuchandoInclinacionLaberinto = false;
  controlesLaberintoHielo = { x: 0, y: 0 };
  inclinacionLaberintoHielo = { x: 0, y: 0 };
}

function leerInclinacionLaberintoHielo(evento) {
  const beta = Math.max(-35, Math.min(35, Number(evento.beta) || 0)) / 24;
  const gamma = Math.max(-35, Math.min(35, Number(evento.gamma) || 0)) / 24;
  const angulo = Number(screen.orientation?.angle || window.orientation || 0);
  if (angulo === 90) inclinacionLaberintoHielo = { x: beta, y: -gamma };
  else if (angulo === -90 || angulo === 270) inclinacionLaberintoHielo = { x: -beta, y: gamma };
  else if (Math.abs(angulo) === 180) inclinacionLaberintoHielo = { x: -gamma, y: -beta };
  else inclinacionLaberintoHielo = { x: gamma, y: beta };
}

function manejarTeclaLaberintoHielo(evento) {
  if (pruebaEspecialBosqueActiva !== "laberinto-hielo") return;
  const valor = evento.type === "keydown" ? 1 : 0;
  if (evento.key === "ArrowLeft") controlesLaberintoHielo.x = -valor;
  else if (evento.key === "ArrowRight") controlesLaberintoHielo.x = valor;
  else if (evento.key === "ArrowUp") controlesLaberintoHielo.y = -valor;
  else if (evento.key === "ArrowDown") controlesLaberintoHielo.y = valor;
  else return;
  evento.preventDefault();
}

function hayChoqueLaberintoHielo(x, y) {
  const radio = 0.27;
  for (let fila = Math.floor(y - radio); fila <= Math.floor(y + radio); fila += 1) {
    for (let columna = Math.floor(x - radio); columna <= Math.floor(x + radio); columna += 1) {
      if (mapaLaberintoHielo[fila]?.[columna] !== "1") continue;
      const cercanoX = Math.max(columna, Math.min(x, columna + 1));
      const cercanoY = Math.max(fila, Math.min(y, fila + 1));
      if ((x - cercanoX) ** 2 + (y - cercanoY) ** 2 < radio ** 2) return true;
    }
  }
  return false;
}

function dibujarHuevoLaberintoHielo() {
  const huevo = puzzleCumbres.querySelector(".huevo-laberinto-hielo");
  if (!huevo) return;
  huevo.style.setProperty("--huevo-x", `${(estadoLaberintoHielo.x / ladoLaberintoHielo) * 100}%`);
  huevo.style.setProperty("--huevo-y", `${(estadoLaberintoHielo.y / ladoLaberintoHielo) * 100}%`);
  huevo.style.setProperty("--giro-huevo", `${estadoLaberintoHielo.vx * 16}deg`);
}

function animarLaberintoHielo(tiempo) {
  if (pruebaEspecialBosqueActiva !== "laberinto-hielo" || laberintoHieloCompletado) return;
  const delta = estadoLaberintoHielo.ultimoTiempo
    ? Math.min(0.034, (tiempo - estadoLaberintoHielo.ultimoTiempo) / 1000)
    : 0.016;
  estadoLaberintoHielo.ultimoTiempo = tiempo;
  const fuerzaX = controlesLaberintoHielo.x || inclinacionLaberintoHielo.x;
  const fuerzaY = controlesLaberintoHielo.y || inclinacionLaberintoHielo.y;
  estadoLaberintoHielo.vx = (estadoLaberintoHielo.vx + fuerzaX * 7.2 * delta) * 0.975;
  estadoLaberintoHielo.vy = (estadoLaberintoHielo.vy + fuerzaY * 7.2 * delta) * 0.975;
  const velocidad = Math.hypot(estadoLaberintoHielo.vx, estadoLaberintoHielo.vy);
  if (velocidad > 4.2) {
    estadoLaberintoHielo.vx *= 4.2 / velocidad;
    estadoLaberintoHielo.vy *= 4.2 / velocidad;
  }

  const siguienteX = estadoLaberintoHielo.x + estadoLaberintoHielo.vx * delta;
  if (!hayChoqueLaberintoHielo(siguienteX, estadoLaberintoHielo.y)) estadoLaberintoHielo.x = siguienteX;
  else estadoLaberintoHielo.vx *= -0.24;
  const siguienteY = estadoLaberintoHielo.y + estadoLaberintoHielo.vy * delta;
  if (!hayChoqueLaberintoHielo(estadoLaberintoHielo.x, siguienteY)) estadoLaberintoHielo.y = siguienteY;
  else estadoLaberintoHielo.vy *= -0.24;
  dibujarHuevoLaberintoHielo();

  if (Math.hypot(
    estadoLaberintoHielo.x - (ladoLaberintoHielo - 1.5),
    estadoLaberintoHielo.y - (ladoLaberintoHielo - 1.5),
  ) < 0.42) {
    laberintoHieloCompletado = true;
    puzzleCumbres.querySelector(".meta-laberinto-hielo")?.classList.add("rescatado");
    estadoPruebaBosque.textContent = "¡El huevo llegó a salvo al nido boreal!";
    detenerLaberintoHielo();
    window.setTimeout(() => void completarPruebaEspecialBosque("laberinto-hielo"), 650);
    return;
  }
  cuadroLaberintoHielo = requestAnimationFrame(animarLaberintoHielo);
}

async function activarInclinacionLaberintoHielo(boton) {
  try {
    if (typeof window.DeviceOrientationEvent?.requestPermission === "function") {
      const permiso = await window.DeviceOrientationEvent.requestPermission();
      if (permiso !== "granted") throw new Error("permiso-denegado");
    }
    if (!escuchandoInclinacionLaberinto) {
      window.addEventListener("deviceorientation", leerInclinacionLaberintoHielo, { passive: true });
      escuchandoInclinacionLaberinto = true;
    }
    boton.textContent = "✓ Inclinación activa";
    boton.disabled = true;
    estadoPruebaBosque.textContent = "Incliná suavemente el teléfono y llevá el huevo hasta el nido.";
  } catch (_error) {
    estadoPruebaBosque.textContent = "No se pudo activar el sensor. Usá las flechas para guiar el huevo.";
  }
}

function iniciarLaberintoHielo() {
  detenerLaberintoHielo();
  etiquetaPruebaBosque.textContent = "PRUEBA DEL ÚLTIMO HUEVO";
  tituloPruebaBosque.textContent = "Guiá el huevo por el laberinto";
  instruccionPruebaBosque.textContent =
    "Incliná el celular para hacerlo rodar hasta el nido. También podés usar las flechas de la pantalla o del teclado.";
  btnRepetirPruebaBosque.textContent = "↻ Volver al inicio";
  laberintoHieloCompletado = false;
  Object.assign(estadoLaberintoHielo, { x: 1.5, y: 1.5, vx: 0, vy: 0, ultimoTiempo: 0 });

  const tablero = document.createElement("div");
  tablero.className = "tablero-laberinto-hielo";
  tablero.style.setProperty("--lado-laberinto", `${ladoLaberintoHielo}`);
  tablero.setAttribute("role", "img");
  tablero.setAttribute("aria-label", "Laberinto de hielo. El huevo comienza arriba a la izquierda y el nido está abajo a la derecha.");
  mapaLaberintoHielo.forEach((fila, y) => [...fila].forEach((celda, x) => {
    if (celda !== "1") return;
    const pared = document.createElement("i");
    pared.className = "pared-laberinto-hielo";
    pared.style.setProperty("--columna", `${x}`);
    pared.style.setProperty("--fila", `${y}`);
    tablero.appendChild(pared);
  }));
  const meta = document.createElement("span");
  meta.className = "meta-laberinto-hielo";
  meta.style.left = `${((ladoLaberintoHielo - 1.5) / ladoLaberintoHielo) * 100}%`;
  meta.style.top = `${((ladoLaberintoHielo - 1.5) / ladoLaberintoHielo) * 100}%`;
  meta.setAttribute("aria-hidden", "true");
  const huevo = document.createElement("span");
  huevo.className = "huevo-laberinto-hielo";
  huevo.setAttribute("aria-hidden", "true");
  tablero.append(meta, huevo);

  const acciones = document.createElement("div");
  acciones.className = "controles-laberinto-hielo";
  const activar = document.createElement("button");
  activar.type = "button";
  activar.className = "activar-inclinacion-hielo";
  activar.textContent = "📱 Activar inclinación";
  activar.addEventListener("click", () => void activarInclinacionLaberintoHielo(activar));
  const direcciones = [["↑", 0, -1], ["←", -1, 0], ["↓", 0, 1], ["→", 1, 0]];
  const cruceta = document.createElement("div");
  cruceta.className = "cruceta-laberinto-hielo";
  direcciones.forEach(([etiqueta, x, y]) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = etiqueta;
    boton.setAttribute("aria-label", `Mover ${etiqueta}`);
    const comenzar = (evento) => {
      evento.preventDefault();
      controlesLaberintoHielo = { x, y };
    };
    const terminar = () => { controlesLaberintoHielo = { x: 0, y: 0 }; };
    boton.addEventListener("pointerdown", comenzar);
    boton.addEventListener("pointerup", terminar);
    boton.addEventListener("pointercancel", terminar);
    boton.addEventListener("pointerleave", terminar);
    cruceta.appendChild(boton);
  });
  acciones.append(activar, cruceta);
  puzzleCumbres.append(tablero, acciones);
  botonesPuzzleCumbres = [activar, ...cruceta.querySelectorAll("button")];
  estadoPruebaBosque.textContent = "Activá la inclinación o usá las flechas para comenzar.";
  dibujarHuevoLaberintoHielo();
  window.addEventListener("keydown", manejarTeclaLaberintoHielo, { passive: false });
  window.addEventListener("keyup", manejarTeclaLaberintoHielo, { passive: false });
  cuadroLaberintoHielo = requestAnimationFrame(animarLaberintoHielo);
}

function iniciarCorazonTermico() {
  etiquetaPruebaBosque.textContent = "PRUEBA DEL CORAZÓN TÉRMICO";
  tituloPruebaBosque.textContent = "Equilibrá los tres núcleos";
  instruccionPruebaBosque.textContent =
    "Cada toque cambia un núcleo y también el siguiente. Dejá los tres en celeste estable: ni congelados ni sobrecargados.";
  btnRepetirPruebaBosque.textContent = "↻ Reiniciar núcleos";
  estadosCorazonTermico = [2, 0, 2];
  movimientosCorazonTermico = 0;
  renderizarCorazonTermico();
}

function renderizarCorazonTermico() {
  puzzleCumbres.replaceChildren();
  const maquina = document.createElement("div");
  maquina.className = "maquina-corazon-termico";
  maquina.setAttribute("role", "group");
  maquina.setAttribute("aria-label", "Tres núcleos térmicos vinculados");
  botonesPuzzleCumbres = estadosCorazonTermico.map((estado, indice) => {
    const boton = document.createElement("button");
    const nombres = ["congelado", "estable", "sobrecargado"];
    boton.type = "button";
    boton.className = `nucleo-termico estado-${nombres[estado]}`;
    boton.innerHTML = `<span></span><strong>Núcleo ${indice + 1}</strong><small>${nombres[estado]}</small>`;
    boton.setAttribute("aria-label", `Núcleo ${indice + 1}: ${nombres[estado]}`);
    boton.addEventListener("click", () => ajustarNucleoTermico(indice));
    maquina.appendChild(boton);
    return boton;
  });
  const contador = document.createElement("p");
  contador.className = "movimientos-corazon-termico";
  contador.textContent = `${movimientosCorazonTermico} ajustes`;
  puzzleCumbres.append(maquina, contador);
  estadoPruebaBosque.textContent = estadosCorazonTermico.every((estado) => estado === 1)
    ? "¡El corazón térmico está estable!"
    : "Ajustá los núcleos. Cada control también modifica el siguiente.";
}

function ajustarNucleoTermico(indice) {
  if (pruebaEspecialBosqueActiva !== "corazon-termico") return;
  estadosCorazonTermico[indice] = (estadosCorazonTermico[indice] + 1) % 3;
  const siguiente = (indice + 1) % estadosCorazonTermico.length;
  estadosCorazonTermico[siguiente] = (estadosCorazonTermico[siguiente] + 1) % 3;
  movimientosCorazonTermico += 1;
  renderizarCorazonTermico();
  if (!estadosCorazonTermico.every((estado) => estado === 1)) return;
  botonesPuzzleCumbres.forEach((boton) => (boton.disabled = true));
  window.setTimeout(() => void completarPruebaEspecialBosque("corazon-termico"), 700);
}

function iniciarSopaCeleste() {
  etiquetaPruebaBosque.textContent = "PRUEBA DEL PUENTE DE PALABRAS";
  tituloPruebaBosque.textContent = "Encontrá las palabras ocultas";
  instruccionPruebaBosque.textContent =
    "Buscá NUBE, VIENTO y CIELO. Arrastrá sobre sus letras en línea recta o elegí la primera y la última con el teclado.";
  inicioSeleccionSopaCumbres = null;
  trayectoSeleccionSopaCumbres = [];
  palabrasEncontradasSopaCumbres = new Set();

  const progreso = document.createElement("div");
  progreso.className = "progreso-puente-celeste";
  progreso.setAttribute("aria-label", "Tres tramos del puente por completar");
  progreso.innerHTML = "<i></i><i></i><i></i>";

  const lista = document.createElement("div");
  lista.className = "palabras-sopa-cumbres";
  palabrasSopaCumbres.forEach(({ palabra }) => {
    const objetivo = document.createElement("span");
    objetivo.dataset.palabra = palabra;
    objetivo.textContent = palabra;
    lista.appendChild(objetivo);
  });

  const tablero = document.createElement("div");
  tablero.className = "tablero-sopa-cumbres";
  tablero.setAttribute("role", "grid");
  tablero.setAttribute("aria-label", "Sopa de letras de diez por diez");
  botonesPuzzleCumbres = [...letrasSopaCumbres].map((letra, indice) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "letra-sopa-cumbres";
    boton.dataset.indice = `${indice}`;
    boton.textContent = letra;
    boton.setAttribute("role", "gridcell");
    boton.setAttribute("aria-label", `Letra ${letra}, fila ${Math.floor(indice / ladoSopaCumbres) + 1}, columna ${(indice % ladoSopaCumbres) + 1}`);
    boton.addEventListener("pointerdown", (evento) => {
      evento.preventDefault();
      tablero.setPointerCapture?.(evento.pointerId);
      punteroSopaCumbresActivo = true;
      comenzarSeleccionSopaCumbres(indice);
    });
    boton.addEventListener("keydown", (evento) => {
      if (evento.key !== "Enter" && evento.key !== " ") return;
      evento.preventDefault();
      seleccionarSopaCumbresConTeclado(indice);
    });
    tablero.appendChild(boton);
    return boton;
  });
  tablero.addEventListener("pointermove", actualizarArrastreSopaCumbres);
  tablero.addEventListener("pointerup", finalizarArrastreSopaCumbres);
  tablero.addEventListener("pointercancel", finalizarArrastreSopaCumbres);

  puzzleCumbres.append(progreso, lista, tablero);
  estadoPruebaBosque.textContent = "0 de 3 palabras · Cada hallazgo construye un tramo del puente.";
  botonesPuzzleCumbres[0]?.focus();
}

function comenzarSeleccionSopaCumbres(indice) {
  if (inicioSeleccionSopaCumbres === null) {
    inicioSeleccionSopaCumbres = indice;
    trayectoSeleccionSopaCumbres = [indice];
  } else {
    trayectoSeleccionSopaCumbres = AdventurePuzzles.obtenerTrayectoRecto(
      inicioSeleccionSopaCumbres,
      indice,
      ladoSopaCumbres,
    );
  }
  mostrarTrayectoSopaCumbres();
}

function actualizarArrastreSopaCumbres(evento) {
  if (!punteroSopaCumbresActivo || inicioSeleccionSopaCumbres === null) return;
  const elemento = document.elementFromPoint(evento.clientX, evento.clientY)?.closest(".letra-sopa-cumbres");
  if (!elemento || !puzzleCumbres.contains(elemento)) return;
  const indice = Number(elemento.dataset.indice);
  const trayecto = AdventurePuzzles.obtenerTrayectoRecto(
    inicioSeleccionSopaCumbres,
    indice,
    ladoSopaCumbres,
  );
  if (trayecto.length) {
    trayectoSeleccionSopaCumbres = trayecto;
    mostrarTrayectoSopaCumbres();
  }
}

function finalizarArrastreSopaCumbres() {
  punteroSopaCumbresActivo = false;
  if (trayectoSeleccionSopaCumbres.length > 1) validarTrayectoSopaCumbres();
}

function seleccionarSopaCumbresConTeclado(indice) {
  if (inicioSeleccionSopaCumbres === null) {
    inicioSeleccionSopaCumbres = indice;
    trayectoSeleccionSopaCumbres = [indice];
    mostrarTrayectoSopaCumbres();
    estadoPruebaBosque.textContent = "Ahora elegí la última letra de la palabra.";
    return;
  }
  trayectoSeleccionSopaCumbres = AdventurePuzzles.obtenerTrayectoRecto(
    inicioSeleccionSopaCumbres,
    indice,
    ladoSopaCumbres,
  );
  validarTrayectoSopaCumbres();
}

function mostrarTrayectoSopaCumbres() {
  botonesPuzzleCumbres.forEach((boton) => boton.classList.remove("seleccionada"));
  trayectoSeleccionSopaCumbres.forEach((indice) =>
    botonesPuzzleCumbres[indice]?.classList.add("seleccionada"),
  );
}

function validarTrayectoSopaCumbres() {
  const trayecto = [...trayectoSeleccionSopaCumbres];
  const texto = trayecto.map((indice) => letrasSopaCumbres[indice]).join("");
  const palabra = palabrasSopaCumbres.find(
    (objetivo) => objetivo.palabra === texto || objetivo.palabra === [...texto].reverse().join(""),
  );
  botonesPuzzleCumbres.forEach((boton) => boton.classList.remove("seleccionada"));
  inicioSeleccionSopaCumbres = null;
  trayectoSeleccionSopaCumbres = [];

  if (!palabra || palabrasEncontradasSopaCumbres.has(palabra.palabra)) {
    const tablero = puzzleCumbres.querySelector(".tablero-sopa-cumbres");
    tablero?.classList.add("error");
    setTimeout(() => tablero?.classList.remove("error"), 420);
    estadoPruebaBosque.textContent = "Esa línea no forma una palabra pendiente. Probá en otra dirección.";
    return;
  }

  palabrasEncontradasSopaCumbres.add(palabra.palabra);
  trayecto.forEach((indice) => botonesPuzzleCumbres[indice]?.classList.add("encontrada"));
  puzzleCumbres.querySelector(`[data-palabra="${palabra.palabra}"]`)?.classList.add("encontrada");
  const cantidad = palabrasEncontradasSopaCumbres.size;
  puzzleCumbres.querySelectorAll(".progreso-puente-celeste i")[cantidad - 1]?.classList.add("construido");
  reproducirSonido("cristalCasilla");

  if (cantidad === palabrasSopaCumbres.length) {
    estadoPruebaBosque.textContent = "¡Las tres palabras reconstruyeron el puente celeste!";
    void completarPruebaEspecialBosque("sopa-celeste");
  } else {
    estadoPruebaBosque.textContent = `${cantidad} de 3 palabras · El puente ya tiene ${cantidad} tramo${cantidad === 1 ? "" : "s"}.`;
  }
}

function iniciarCampanasCelestes() {
  etiquetaPruebaBosque.textContent = "PRUEBA DE LA CHISPA CELESTE";
  tituloPruebaBosque.textContent = "Seguí la campana que oculta la chispa";
  instruccionPruebaBosque.textContent =
    "Mirá dónde se esconde la chispa, seguí esa campana durante la mezcla y elegila. Son tres rondas y cada una se mueve un poco más rápido.";
  btnRepetirPruebaBosque.textContent = "↻ Reiniciar campanas";
  rondaCampanasCumbresActual = 0;
  prepararRondaCampanasCumbres();
}

function esperarCampanasCumbres(milisegundos) {
  return new Promise((resolver) => window.setTimeout(resolver, milisegundos));
}

function nombrarPosicionCampanaCumbres(posicion) {
  return ["izquierda", "centro", "derecha"][posicion] || "";
}

function actualizarPosicionesCampanasCumbres(posiciones, duracionPaso) {
  botonesPuzzleCumbres.forEach((boton, identidad) => {
    const posicion = posiciones[identidad];
    boton.style.setProperty("--posicion-campana", `${posicion}`);
    boton.style.setProperty("--duracion-mezcla", `${duracionPaso}ms`);
    boton.setAttribute("aria-label", `Campana de la ${nombrarPosicionCampanaCumbres(posicion)}`);
  });
}

function prepararRondaCampanasCumbres() {
  if (pruebaEspecialBosqueActiva !== "campanas-celestes") return;
  const configuracion = rondasCampanasCumbres[rondaCampanasCumbresActual];
  const secuencia = ++secuenciaCampanasCumbres;
  campanasCumbresAceptando = false;
  campanaReliquiaCumbres = Math.floor(Math.random() * 3);
  puzzleCumbres.replaceChildren();

  const cabecera = document.createElement("div");
  cabecera.className = "cabecera-campanas-cumbres";
  cabecera.innerHTML = `
    <strong>Ronda ${rondaCampanasCumbresActual + 1} de ${rondasCampanasCumbres.length}</strong>
    <span>${configuracion.intercambios} movimientos · velocidad ${rondaCampanasCumbresActual + 1}</span>`;

  const tablero = document.createElement("div");
  tablero.className = "tablero-campanas-cumbres";
  tablero.setAttribute("role", "group");
  tablero.setAttribute("aria-label", `Tres campanas celestes, ronda ${rondaCampanasCumbresActual + 1}`);
  const posiciones = [0, 1, 2];
  botonesPuzzleCumbres = posiciones.map((_, identidad) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "opcion-campana-cumbres";
    boton.disabled = true;
    boton.innerHTML = `
      <img class="reliquia-campana-cumbres"
        src="assets/images/puzzles/cumbres/chispa-celeste-v3.png?v=20260830-kairos-edades-1" alt="" aria-hidden="true">
      <img class="figura-campana-cumbres"
        src="assets/images/puzzles/cumbres/campana-celeste-v3.png?v=20260830-kairos-edades-1" alt="" aria-hidden="true">`;
    boton.addEventListener("click", () => elegirCampanaCumbres(identidad));
    tablero.appendChild(boton);
    return boton;
  });
  actualizarPosicionesCampanasCumbres(posiciones, configuracion.duracionPaso);
  puzzleCumbres.append(cabecera, tablero);
  botonesPuzzleCumbres[campanaReliquiaCumbres].classList.add("revelando");
  estadoPruebaBosque.textContent =
    `Ronda ${rondaCampanasCumbresActual + 1} de 3 · Mirá bien: esta campana guarda la chispa celeste.`;
  void mezclarCampanasCumbres(posiciones, configuracion, secuencia);
}

async function mezclarCampanasCumbres(posiciones, configuracion, secuencia) {
  await esperarCampanasCumbres(1350);
  if (secuencia !== secuenciaCampanasCumbres || pruebaEspecialBosqueActiva !== "campanas-celestes") return;
  botonesPuzzleCumbres[campanaReliquiaCumbres]?.classList.remove("revelando");
  estadoPruebaBosque.textContent = "Seguí la campana…";
  await esperarCampanasCumbres(420);

  const pares = [[0, 1], [1, 2], [0, 2]];
  const desfase = Math.floor(Math.random() * pares.length);
  for (let paso = 0; paso < configuracion.intercambios; paso += 1) {
    if (secuencia !== secuenciaCampanasCumbres || pruebaEspecialBosqueActiva !== "campanas-celestes") return;
    const [primera, segunda] = pares[(paso + desfase) % pares.length];
    [posiciones[primera], posiciones[segunda]] = [posiciones[segunda], posiciones[primera]];
    botonesPuzzleCumbres[primera].classList.add("cruzando-arriba");
    botonesPuzzleCumbres[segunda].classList.add("cruzando-abajo");
    actualizarPosicionesCampanasCumbres(posiciones, configuracion.duracionPaso);
    await esperarCampanasCumbres(configuracion.duracionPaso + 90);
    botonesPuzzleCumbres[primera].classList.remove("cruzando-arriba");
    botonesPuzzleCumbres[segunda].classList.remove("cruzando-abajo");
  }

  if (secuencia !== secuenciaCampanasCumbres || pruebaEspecialBosqueActiva !== "campanas-celestes") return;
  campanasCumbresAceptando = true;
  botonesPuzzleCumbres.forEach((boton) => (boton.disabled = false));
  estadoPruebaBosque.textContent =
    `Ronda ${rondaCampanasCumbresActual + 1} de 3 · ¿Bajo qué campana está la chispa?`;
  const botonIzquierdo = botonesPuzzleCumbres.find((_, identidad) => posiciones[identidad] === 0);
  botonIzquierdo?.focus();
}

function elegirCampanaCumbres(identidad) {
  if (!campanasCumbresAceptando || pruebaEspecialBosqueActiva !== "campanas-celestes") return;
  campanasCumbresAceptando = false;
  botonesPuzzleCumbres.forEach((boton) => (boton.disabled = true));
  const secuencia = ++secuenciaCampanasCumbres;
  const botonElegido = botonesPuzzleCumbres[identidad];
  const botonCorrecto = botonesPuzzleCumbres[campanaReliquiaCumbres];
  botonCorrecto?.classList.add("revelando");

  if (identidad !== campanaReliquiaCumbres) {
    botonElegido?.classList.add("error");
    estadoPruebaBosque.textContent = "La chispa estaba bajo otra campana. Mirala otra vez y repetí esta ronda.";
    window.setTimeout(() => {
      if (secuencia === secuenciaCampanasCumbres && pruebaEspecialBosqueActiva === "campanas-celestes") {
        prepararRondaCampanasCumbres();
      }
    }, 1550);
    return;
  }

  botonCorrecto?.classList.add("acierto");
  reproducirSonido("cristalCasilla");
  rondaCampanasCumbresActual += 1;
  if (rondaCampanasCumbresActual === rondasCampanasCumbres.length) {
    estadoPruebaBosque.textContent = "¡Encontraste la chispa y abriste las corrientes del firmamento!";
    window.setTimeout(() => {
      if (secuencia === secuenciaCampanasCumbres && pruebaEspecialBosqueActiva === "campanas-celestes") {
        void completarPruebaEspecialBosque("campanas-celestes");
      }
    }, 1100);
    return;
  }

  estadoPruebaBosque.textContent =
    `¡Correcto! Preparando la ronda ${rondaCampanasCumbresActual + 1}, un poco más rápida…`;
  window.setTimeout(() => {
    if (secuencia === secuenciaCampanasCumbres && pruebaEspecialBosqueActiva === "campanas-celestes") {
      prepararRondaCampanasCumbres();
    }
  }, 1200);
}

function iniciarSellosAeralis() {
  etiquetaPruebaBosque.textContent = "PRISIÓN DEL FIRMAMENTO";
  tituloPruebaBosque.textContent = "Descifrá los sellos de Aeralis";
  instruccionPruebaBosque.textContent =
    "Girá los anillos y probá el sello. Solo después de probar, las letras acertadas brillarán un instante para orientarte.";
  rondaSellosCumbres = 0;
  renderizarRondaSellosAeralis();
}

function renderizarRondaSellosAeralis() {
  const ronda = rondasSellosAeralis[rondaSellosCumbres];
  if (!ronda || pruebaEspecialBosqueActiva !== "sellos-aeralis") return;
  puzzleCumbres.replaceChildren();
  puzzleCumbres.classList.remove("sello-rompiendose");
  secuenciaPistaSellosCumbres += 1;
  indicesSellosCumbres = ronda.opciones.map(() => 0);

  const cabecera = document.createElement("div");
  cabecera.className = "cabecera-sellos-aeralis";
  cabecera.innerHTML = `<span>Sello ${rondaSellosCumbres + 1} de ${rondasSellosAeralis.length}</span><strong>${ronda.pista}</strong>`;
  const anillos = document.createElement("div");
  anillos.className = "anillos-sellos-aeralis";
  anillos.setAttribute("role", "group");
  anillos.setAttribute("aria-label", `Combinación del sello ${rondaSellosCumbres + 1}`);

  botonesPuzzleCumbres = ronda.opciones.map((opciones, posicion) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "anillo-sello-aeralis";
    boton.dataset.posicion = `${posicion}`;
    boton.style.setProperty("--giro-anillo", "0deg");
    boton.innerHTML = `<span aria-hidden="true">✦</span><strong>${opciones[0]}</strong><small>GIRAR</small>`;
    boton.setAttribute("aria-label", `Anillo ${posicion + 1}, letra ${opciones[0]}. Activar para girar.`);
    boton.addEventListener("click", () => girarAnilloSelloAeralis(posicion));
    anillos.appendChild(boton);
    return boton;
  });
  const btnComprobar = document.createElement("button");
  btnComprobar.type = "button";
  btnComprobar.className = "btn-comprobar-sello-aeralis";
  btnComprobar.textContent = "✦ Probar sello";
  btnComprobar.addEventListener("click", comprobarSelloAeralis);
  const grieta = document.createElement("div");
  grieta.className = "grieta-sello-aeralis";
  grieta.setAttribute("aria-hidden", "true");
  puzzleCumbres.append(cabecera, anillos, btnComprobar, grieta);
  estadoPruebaBosque.textContent = `Sello ${rondaSellosCumbres + 1} de 3 · Formá la palabra completa antes de probar.`;
  botonesPuzzleCumbres[0]?.focus();
}

function girarAnilloSelloAeralis(posicion) {
  const ronda = rondasSellosAeralis[rondaSellosCumbres];
  const opciones = ronda?.opciones[posicion];
  const boton = botonesPuzzleCumbres[posicion];
  if (!ronda || !opciones || !boton || boton.disabled) return;
  indicesSellosCumbres[posicion] = (indicesSellosCumbres[posicion] + 1) % opciones.length;
  const letra = opciones[indicesSellosCumbres[posicion]];
  boton.querySelector("strong").textContent = letra;
  boton.style.setProperty("--giro-anillo", `${indicesSellosCumbres[posicion] * (360 / opciones.length)}deg`);
  boton.setAttribute("aria-label", `Anillo ${posicion + 1}, letra ${letra}. Activar para girar.`);
  boton.classList.remove("pista-correcta");
  reproducirSonido("colocarPieza");
}

function comprobarSelloAeralis() {
  const ronda = rondasSellosAeralis[rondaSellosCumbres];
  if (!ronda || pruebaEspecialBosqueActiva !== "sellos-aeralis") return;
  const palabraActual = ronda.opciones
    .map((letras, indice) => letras[indicesSellosCumbres[indice]])
    .join("");
  if (palabraActual !== ronda.palabra) {
    const secuenciaPista = ++secuenciaPistaSellosCumbres;
    const posicionesCorrectas = botonesPuzzleCumbres.filter((boton, posicion) =>
      boton.querySelector("strong").textContent === ronda.palabra[posicion],
    );
    botonesPuzzleCumbres.forEach((boton) => boton.classList.remove("pista-correcta"));
    posicionesCorrectas.forEach((boton) => boton.classList.add("pista-correcta"));
    puzzleCumbres.classList.remove("error");
    void puzzleCumbres.offsetWidth;
    puzzleCumbres.classList.add("error");
    estadoPruebaBosque.textContent = posicionesCorrectas.length
      ? `“${palabraActual}” no abre el sello · ${posicionesCorrectas.length} letra${posicionesCorrectas.length === 1 ? " brilló" : "s brillaron"} por estar bien ubicada${posicionesCorrectas.length === 1 ? "" : "s"}.`
      : `“${palabraActual}” no abre el sello · Ninguna letra está bien ubicada todavía.`;
    reproducirSonido("error");
    setTimeout(() => {
      if (secuenciaPista !== secuenciaPistaSellosCumbres) return;
      posicionesCorrectas.forEach((boton) => boton.classList.remove("pista-correcta"));
    }, prefiereReducirMovimiento.matches ? 300 : 1150);
    return;
  }
  secuenciaPistaSellosCumbres += 1;
  botonesPuzzleCumbres.forEach((control) => {
    control.classList.remove("pista-correcta");
    control.disabled = true;
    control.classList.add("correcto");
  });
  puzzleCumbres.querySelector(".btn-comprobar-sello-aeralis").disabled = true;
  puzzleCumbres.classList.remove("error");
  puzzleCumbres.classList.add("sello-rompiendose");
  reproducirSonido("cristalCasilla");
  estadoPruebaBosque.textContent = `¡${ronda.palabra}! El sello se está quebrando.`;
  setTimeout(() => {
    if (pruebaEspecialBosqueActiva !== "sellos-aeralis") return;
    rondaSellosCumbres += 1;
    if (rondaSellosCumbres === rondasSellosAeralis.length) {
      estadoPruebaBosque.textContent = "¡AIRE, NUBE y LIBRE rompieron la prisión de Aeralis!";
      void completarPruebaEspecialBosque("sellos-aeralis");
    } else {
      renderizarRondaSellosAeralis();
    }
  }, prefiereReducirMovimiento.matches ? 180 : 760);
}

function iniciarPuzzleRamasDeslizante() {
  if (pruebaEspecialBosqueActiva !== "ramas") return;

  estadoTableroRamas = AdventurePuzzles.crearTableroMezclado(6);
  movimientosPuzzleRamas = 0;
  tableroRamasDeslizante.classList.remove("resuelto", "movimiento-invalido");
  estadoPruebaBosque.textContent =
    "Objetivo: 1-2-3 / 4-5-6 / 7-8-ACÁ. Las piezas iluminadas son las que podés tocar.";
  renderizarPuzzleRamasDeslizante();
  tableroRamasDeslizante.querySelector("button:not(:disabled)")?.focus();
}

function renderizarPuzzleRamasDeslizante() {
  tableroRamasDeslizante.replaceChildren();
  const movimientosValidos = AdventurePuzzles.obtenerMovimientosValidos(
    estadoTableroRamas,
  );

  estadoTableroRamas.forEach((pieza, posicion) => {
    if (pieza === null) {
      const vacio = document.createElement("span");
      vacio.className = "espacio-vacio-ramas";
      vacio.setAttribute("role", "gridcell");
      vacio.setAttribute("aria-label", "Espacio vacío");
      tableroRamasDeslizante.appendChild(vacio);
      return;
    }

    const boton = document.createElement("button");
    const fila = Math.floor(pieza / 3);
    const columna = pieza % 3;
    boton.type = "button";
    boton.className = "pieza-ramas-deslizante";
    boton.dataset.numero = `${pieza + 1}`;
    boton.style.backgroundPosition = `${columna * 50}% ${fila * 50}%`;
    boton.disabled = !movimientosValidos.includes(posicion);
    boton.setAttribute(
      "aria-label",
      `Pieza ${pieza + 1}${boton.disabled ? "" : ", se puede mover"}`,
    );
    boton.addEventListener("click", () => moverPiezaPuzzleRamas(posicion));
    tableroRamasDeslizante.appendChild(boton);
  });
}

function moverPiezaPuzzleRamas(posicion) {
  if (pruebaEspecialBosqueActiva !== "ramas") return;

  const resultado = AdventurePuzzles.moverPieza(estadoTableroRamas, posicion);
  if (!resultado.movida) {
    tableroRamasDeslizante.classList.remove("movimiento-invalido");
    void tableroRamasDeslizante.offsetWidth;
    tableroRamasDeslizante.classList.add("movimiento-invalido");
    return;
  }

  estadoTableroRamas = resultado.estado;
  movimientosPuzzleRamas += 1;
  reproducirSonido("colocarPieza");
  renderizarPuzzleRamasDeslizante();
  estadoPruebaBosque.textContent = `${movimientosPuzzleRamas} ${
    movimientosPuzzleRamas === 1 ? "movimiento" : "movimientos"
  }. Tocá una pieza iluminada junto a ACÁ.`;

  if (!AdventurePuzzles.estaOrdenado(estadoTableroRamas)) {
    tableroRamasDeslizante.querySelector("button:not(:disabled)")?.focus();
    return;
  }

  tableroRamasDeslizante.classList.add("resuelto");
  estadoPruebaBosque.textContent = "¡El sendero está completo! Ya encontraste cómo superar el árbol.";
  void completarPruebaEspecialBosque("ramas");
}

const caminoEnergiaVientoDesierto = [
  20, 21, 22, 23, 24,
  19, 18, 17, 16, 15,
  10, 5, 0, 1, 2, 3, 4, 9, 14, 13, 12,
];

function iniciarPuzzleVientosDesierto() {
  if (pruebaEspecialBosqueActiva !== "vientos") return;

  tiposCanalesVientoDesierto = Array.from({ length: 25 }, () => ({
    tipo: "bloqueado",
    objetivo: 0,
  }));

  caminoEnergiaVientoDesierto.forEach((casilla, posicion) => {
    if (casilla === 12) {
      tiposCanalesVientoDesierto[casilla] = { tipo: "nucleo", objetivo: 0 };
      return;
    }

    const anterior = posicion === 0
      ? "S"
      : direccionEntreCasillas(casilla, caminoEnergiaVientoDesierto[posicion - 1]);
    const siguiente = direccionEntreCasillas(
      casilla,
      caminoEnergiaVientoDesierto[posicion + 1],
    );
    tiposCanalesVientoDesierto[casilla] = crearCanalParaDirecciones(
      anterior,
      siguiente,
    );
  });

  orientacionesVientosDesierto = tiposCanalesVientoDesierto.map(
    ({ tipo, objetivo }) => {
      if (tipo === "nucleo" || tipo === "bloqueado") return 0;
      const desplazamientos = tipo === "recto" ? [1, 3] : [1, 2, 3];
      return (
        objetivo +
        desplazamientos[Math.floor(Math.random() * desplazamientos.length)]
      ) % 4;
    },
  );
  movimientosVientosDesierto = 0;
  estadoPruebaBosque.textContent =
    "Hay una sola entrada solar en la esquina inferior izquierda. Conectá sus 21 tramos hasta el núcleo central.";
  renderizarPuzzleVientosDesierto();
  botonesVientosDesierto[0]?.focus();
}

function direccionEntreCasillas(origen, destino) {
  const diferencia = destino - origen;
  if (diferencia === -5) return "N";
  if (diferencia === 1) return "E";
  if (diferencia === 5) return "S";
  return "O";
}

function crearCanalParaDirecciones(primera, segunda) {
  const direcciones = new Set([primera, segunda]);
  if (direcciones.has("N") && direcciones.has("S")) {
    return { tipo: "recto", objetivo: 0 };
  }
  if (direcciones.has("E") && direcciones.has("O")) {
    return { tipo: "recto", objetivo: 1 };
  }
  if (direcciones.has("N") && direcciones.has("E")) {
    return { tipo: "curva", objetivo: 0 };
  }
  if (direcciones.has("E") && direcciones.has("S")) {
    return { tipo: "curva", objetivo: 1 };
  }
  if (direcciones.has("S") && direcciones.has("O")) {
    return { tipo: "curva", objetivo: 2 };
  }
  return { tipo: "curva", objetivo: 3 };
}

function obtenerAberturasCanal(indice) {
  const canal = tiposCanalesVientoDesierto[indice];
  if (canal.tipo === "bloqueado") return [];
  if (canal.tipo === "nucleo") return ["E"];
  const bases = canal.tipo === "recto" ? [0, 2] : [0, 1];
  const nombres = ["N", "E", "S", "O"];
  return bases.map(
    (direccion) => nombres[(direccion + orientacionesVientosDesierto[indice]) % 4],
  );
}

function obtenerCanalesEnergizados() {
  const energizados = new Set();
  if (!obtenerAberturasCanal(20).includes("S")) return energizados;

  const pendientes = [20];
  energizados.add(20);
  const desplazamientos = { N: -5, E: 1, S: 5, O: -1 };
  const opuestas = { N: "S", E: "O", S: "N", O: "E" };

  while (pendientes.length) {
    const actual = pendientes.shift();
    const fila = Math.floor(actual / 5);
    const columna = actual % 5;
    obtenerAberturasCanal(actual).forEach((direccion) => {
      if (direccion === "N" && fila === 0) return;
      if (direccion === "S" && fila === 4) return;
      if (direccion === "E" && columna === 4) return;
      if (direccion === "O" && columna === 0) return;
      const vecina = actual + desplazamientos[direccion];
      if (
        energizados.has(vecina) ||
        !obtenerAberturasCanal(vecina).includes(opuestas[direccion])
      ) {
        return;
      }
      energizados.add(vecina);
      pendientes.push(vecina);
    });
  }

  return energizados;
}

function renderizarPuzzleVientosDesierto() {
  const energizados = obtenerCanalesEnergizados();
  tableroVientosDesierto.replaceChildren();

  tiposCanalesVientoDesierto.forEach((canal, indice) => {
    if (canal.tipo === "bloqueado") {
      const muro = document.createElement("span");
      muro.className = "canal-viento canal-bloqueado";
      muro.setAttribute("role", "gridcell");
      muro.setAttribute("aria-label", "Bloque de piedra sin canal");
      muro.innerHTML = "<span></span>";
      tableroVientosDesierto.appendChild(muro);
      return;
    }

    if (canal.tipo === "nucleo") {
      const nucleo = document.createElement("span");
      nucleo.className = `canal-viento nucleo-viento${energizados.has(indice) ? " energizado" : ""}`;
      nucleo.setAttribute("role", "gridcell");
      nucleo.setAttribute(
        "aria-label",
        energizados.has(indice) ? "Núcleo central activado" : "Núcleo central sin energía",
      );
      nucleo.innerHTML = "<span>✦</span>";
      tableroVientosDesierto.appendChild(nucleo);
      return;
    }

    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = `canal-viento canal-${canal.tipo}${energizados.has(indice) ? " energizado" : ""}${indice === 20 ? " canal-origen" : ""}`;
    boton.dataset.viento = `${indice}`;
    boton.style.setProperty(
      "--giro-canal",
      `${orientacionesVientosDesierto[indice] * 90}deg`,
    );
    boton.setAttribute("role", "gridcell");
    boton.setAttribute(
      "aria-label",
      `Canal ${indice + 1}, ${energizados.has(indice) ? "con energía" : "sin energía"}`,
    );
    boton.innerHTML = "<span></span>";
    boton.addEventListener("click", () => girarObeliscoViento(indice));
    tableroVientosDesierto.appendChild(boton);
  });

  botonesVientosDesierto = [
    ...tableroVientosDesierto.querySelectorAll("button.canal-viento"),
  ];
  return energizados;
}

function girarObeliscoViento(indice) {
  if (pruebaEspecialBosqueActiva !== "vientos") return;

  orientacionesVientosDesierto[indice] =
    (orientacionesVientosDesierto[indice] + 1) % 4;
  movimientosVientosDesierto += 1;
  reproducirSonido("colocarPieza");
  const energizados = renderizarPuzzleVientosDesierto();
  const tramosEnergizados = caminoEnergiaVientoDesierto.filter((casilla) =>
    energizados.has(casilla),
  ).length;
  const recorridoCompleto = caminoEnergiaVientoDesierto.every((casilla) =>
    energizados.has(casilla),
  );

  if (!recorridoCompleto) {
    estadoPruebaBosque.textContent = `${movimientosVientosDesierto} ${
      movimientosVientosDesierto === 1 ? "movimiento" : "movimientos"
    }. La luz recorrió ${tramosEnergizados} de los 21 tramos obligatorios.`;
    tableroVientosDesierto.querySelector(`[data-viento="${indice}"]`)?.focus();
    return;
  }

  estadoPruebaBosque.textContent =
    "¡La energía llegó al núcleo! El observatorio revela el camino.";
  void completarPruebaEspecialBosque("vientos");
}

function iniciarPuzzleOasisDesierto() {
  if (pruebaEspecialBosqueActiva !== "oasis") return;

  secuenciaPruebaBosque += 1;
  rondaOasisDesierto = 0;
  aciertosOasisDesierto = 0;
  prepararRondaOasisDesierto();
  botonesOasisDesierto[0]?.focus();
}

const cantidadRondasOasisDesierto = 3;
const coloresBrilloOasis = ["ninguno", "azul", "dorado"];

function mezclarLista(lista) {
  const copia = [...lista];
  for (let indice = copia.length - 1; indice > 0; indice -= 1) {
    const destino = Math.floor(Math.random() * (indice + 1));
    [copia[indice], copia[destino]] = [copia[destino], copia[indice]];
  }
  return copia;
}

function describirRasgosOasis(rasgos) {
  const agua = rasgos.ondas ? "agua con ondas" : "agua quieta";
  const palmeras = `${rasgos.palmeras} ${rasgos.palmeras === 1 ? "palmera" : "palmeras"}`;
  const brillo = rasgos.brillo === "ninguno" ? "sin destellos" : `destello ${rasgos.brillo}`;
  return `${agua}, ${palmeras} y ${brillo}`;
}

function crearClaveRasgosOasis(rasgos) {
  return `${rasgos.ondas}-${rasgos.palmeras}-${rasgos.brillo}`;
}

function crearPistaEnigmaOasis(rasgos) {
  const agua = rasgos.ondas
    ? "El agua no permanece quieta"
    : "La superficie no forma ondas";
  const palmeras =
    rasgos.palmeras === 1
      ? "hay menos de dos palmeras"
      : rasgos.palmeras === 2
        ? "hay más de una palmera, pero menos de tres"
        : "no hay una ni dos palmeras";
  const brillo =
    rasgos.brillo === "ninguno"
      ? "ninguna luz de color flota sobre ella"
      : rasgos.brillo === "azul"
        ? "su destello es frío como la noche"
        : "su destello tiene el color del sol";
  return `${agua}; ${palmeras}; ${brillo}.`;
}

function crearObjetivoOasisAleatorio() {
  const posibilidades = [];
  for (const ondas of [true, false]) {
    for (const palmeras of [1, 2, 3]) {
      for (const brillo of coloresBrilloOasis) {
        posibilidades.push({ ondas, palmeras, brillo });
      }
    }
  }
  const claveAnterior = objetivoOasisDesiertoActual
    ? crearClaveRasgosOasis(objetivoOasisDesiertoActual)
    : "";
  return mezclarLista(posibilidades).find(
    (opcion) => crearClaveRasgosOasis(opcion) !== claveAnterior,
  );
}

function prepararRondaOasisDesierto() {
  const objetivo = crearObjetivoOasisAleatorio();
  objetivoOasisDesiertoActual = objetivo;
  const indiceBrillo = coloresBrilloOasis.indexOf(objetivo.brillo);
  const palmeraSiguiente = (objetivo.palmeras % 3) + 1;
  const palmeraAnterior = ((objetivo.palmeras + 1) % 3) + 1;
  const opciones = mezclarLista([
    objetivo,
    {
      ondas: objetivo.ondas,
      palmeras: palmeraSiguiente,
      brillo: coloresBrilloOasis[(indiceBrillo + 1) % coloresBrilloOasis.length],
    },
    {
      ondas: !objetivo.ondas,
      palmeras: objetivo.palmeras,
      brillo: coloresBrilloOasis[(indiceBrillo + 2) % coloresBrilloOasis.length],
    },
    {
      ondas: !objetivo.ondas,
      palmeras: palmeraAnterior,
      brillo: objetivo.brillo,
    },
  ]);
  oasisVerdaderoDesierto = opciones.indexOf(objetivo);
  botonesOasisDesierto.forEach((boton, indice) => {
    const rasgos = opciones[indice];
    boton.disabled = false;
    boton.classList.remove("error", "elegido");
    boton.dataset.ondas = `${rasgos.ondas}`;
    boton.dataset.palmeras = `${rasgos.palmeras}`;
    boton.dataset.brillo = rasgos.brillo;
    boton.setAttribute(
      "aria-label",
      `${boton.querySelector("strong").textContent}: ${describirRasgosOasis(rasgos)}`,
    );
  });
  pistaOasisDesierto.textContent = `Ronda ${rondaOasisDesierto + 1} de ${cantidadRondasOasisDesierto} · ${crearPistaEnigmaOasis(objetivo)}`;
  estadoPruebaBosque.textContent =
    "Cada rasgo aparece en más de una imagen. Combiná las tres pistas para encontrar el oasis.";
}

function elegirOasisDesierto(indice) {
  if (pruebaEspecialBosqueActiva !== "oasis") return;

  const boton = botonesOasisDesierto[indice];
  if (indice !== oasisVerdaderoDesierto) {
    boton.classList.add("error");
    botonesOasisDesierto.forEach((opcion) => (opcion.disabled = true));
    estadoPruebaBosque.textContent =
      "Era un espejismo. La ilusión cambia de lugar y aparece una inscripción nueva…";
    reproducirSonido("error");
    const secuencia = secuenciaPruebaBosque;
    setTimeout(() => {
      if (
        pruebaEspecialBosqueActiva === "oasis" &&
        secuencia === secuenciaPruebaBosque
      ) {
        prepararRondaOasisDesierto();
        botonesOasisDesierto[0]?.focus();
      }
    }, 620);
    return;
  }

  boton.classList.add("elegido");
  botonesOasisDesierto.forEach((opcion) => (opcion.disabled = true));
  reproducirSonido("acertar");
  aciertosOasisDesierto += 1;
  rondaOasisDesierto += 1;

  if (aciertosOasisDesierto >= cantidadRondasOasisDesierto) {
    estadoPruebaBosque.textContent =
      "¡Descifraste los tres oasis! El espejismo se rompe y Zafir queda libre.";
    void completarPruebaEspecialBosque("oasis");
    return;
  }

  estadoPruebaBosque.textContent = `¡Correcto! Se abre la inscripción de la ronda ${rondaOasisDesierto + 1}.`;
  const secuencia = secuenciaPruebaBosque;
  setTimeout(() => {
    if (
      pruebaEspecialBosqueActiva === "oasis" &&
      secuencia === secuenciaPruebaBosque
    ) {
      prepararRondaOasisDesierto();
    }
  }, 720);
}

function iniciarPuzzleEspejosDesierto() {
  if (pruebaEspecialBosqueActiva !== "espejos") return;

  const objetivos = [1, 3, 1, 3, 1];
  orientacionesEspejosDesierto = [...objetivos];
  movimientosEspejosDesierto = 0;
  const cantidadGiros = 9 + Math.floor(Math.random() * 5);
  for (let paso = 0; paso < cantidadGiros; paso += 1) {
    aplicarGiroEspejosVinculados(Math.floor(Math.random() * objetivos.length));
  }
  if (
    orientacionesEspejosDesierto.every(
      (orientacion, posicion) => orientacion === objetivos[posicion],
    )
  ) {
    aplicarGiroEspejosVinculados(Math.floor(Math.random() * objetivos.length));
  }
  rutaLuzEspejos.classList.remove("resuelta");
  estadoPruebaBosque.textContent =
    "Los cinco espejos están conectados: cada toque gira el elegido y el siguiente.";
  renderizarPuzzleEspejosDesierto();
  botonesEspejosDesierto[0]?.focus();
}

function aplicarGiroEspejosVinculados(indice) {
  const siguiente = (indice + 1) % orientacionesEspejosDesierto.length;
  orientacionesEspejosDesierto[indice] =
    (orientacionesEspejosDesierto[indice] + 1) % 4;
  orientacionesEspejosDesierto[siguiente] =
    (orientacionesEspejosDesierto[siguiente] + 1) % 4;
}

function renderizarPuzzleEspejosDesierto() {
  const objetivos = [1, 3, 1, 3, 1];
  botonesEspejosDesierto.forEach((boton, indice) => {
    boton.disabled = false;
    boton.classList.toggle(
      "correcto",
      orientacionesEspejosDesierto[indice] === objetivos[indice],
    );
    boton.style.setProperty(
      "--giro-espejo",
      `${orientacionesEspejosDesierto[indice] * 45}deg`,
    );
  });
}

function girarEspejoDesierto(indice) {
  if (pruebaEspecialBosqueActiva !== "espejos") return;

  const objetivos = [1, 3, 1, 3, 1];
  aplicarGiroEspejosVinculados(indice);
  movimientosEspejosDesierto += 1;
  reproducirSonido("cristalCasilla");
  renderizarPuzzleEspejosDesierto();

  const resuelto = orientacionesEspejosDesierto.every(
    (orientacion, posicion) => orientacion === objetivos[posicion],
  );
  if (!resuelto) {
    estadoPruebaBosque.textContent = `${movimientosEspejosDesierto} ${
      movimientosEspejosDesierto === 1 ? "movimiento" : "movimientos"
    }. Cada espejo arrastra al siguiente; seguí buscando la cadena completa.`;
    return;
  }

  rutaLuzEspejos.classList.add("resuelta");
  botonesEspejosDesierto.forEach((boton) => (boton.disabled = true));
  estadoPruebaBosque.textContent =
    "¡El rayo alcanzó el sello! La puerta del templo comienza a abrirse.";
  void completarPruebaEspecialBosque("espejos");
}

function iniciarPuzzleMemoriaLobos() {
  if (pruebaEspecialBosqueActiva !== "lobos") return;

  rondaMemoriaLobos = 0;
  escenaMemoriaLobos.classList.remove("lobos-retirandose");
  secuenciaMemoriaLobos = AdventurePuzzles.crearSecuenciaMemoria(3);
  entradaMemoriaLobos = [];
  estadoPruebaBosque.textContent = "Preparate: los ojos comenzarán a brillar en unos instantes.";
  actualizarProgresoMemoriaLobos();
  setTimeout(() => void mostrarSecuenciaMemoriaLobos(), 650);
}

function esperarPruebaBosque(duracion) {
  return new Promise((resolve) => setTimeout(resolve, duracion));
}

async function mostrarSecuenciaMemoriaLobos() {
  if (pruebaEspecialBosqueActiva !== "lobos") return;

  const secuencia = ++secuenciaPruebaBosque;
  memoriaLobosAceptandoEntrada = false;
  entradaMemoriaLobos = [];
  btnRepetirPruebaBosque.disabled = true;
  botonesMemoriaLobos.forEach((boton) => {
    boton.disabled = true;
    boton.classList.remove("iluminado", "elegido", "error");
  });
  estadoPruebaBosque.textContent = `Ronda ${rondaMemoriaLobos + 1} de 3 · Observá con atención…`;

  await esperarPruebaBosque(prefiereReducirMovimiento.matches ? 250 : 500);
  for (const indice of secuenciaMemoriaLobos) {
    if (secuencia !== secuenciaPruebaBosque || pruebaEspecialBosqueActiva !== "lobos") return;
    botonesMemoriaLobos[indice].classList.add("iluminado");
    reproducirSonido("cristalCasilla");
    await esperarPruebaBosque(prefiereReducirMovimiento.matches ? 380 : 620);
    botonesMemoriaLobos[indice].classList.remove("iluminado");
    await esperarPruebaBosque(prefiereReducirMovimiento.matches ? 130 : 250);
  }

  if (secuencia !== secuenciaPruebaBosque || pruebaEspecialBosqueActiva !== "lobos") return;
  memoriaLobosAceptandoEntrada = true;
  btnRepetirPruebaBosque.disabled = false;
  botonesMemoriaLobos.forEach((boton) => (boton.disabled = false));
  estadoPruebaBosque.textContent = "Ahora repetí la secuencia tocando los ojos.";
  botonesMemoriaLobos[0]?.focus();
}

function elegirLoboMemoria(indice) {
  if (pruebaEspecialBosqueActiva !== "lobos" || !memoriaLobosAceptandoEntrada) return;

  const boton = botonesMemoriaLobos[indice];
  boton.classList.add("elegido");
  setTimeout(() => boton.classList.remove("elegido"), 280);
  entradaMemoriaLobos.push(indice);
  const posicion = entradaMemoriaLobos.length - 1;

  if (secuenciaMemoriaLobos[posicion] !== indice) {
    memoriaLobosAceptandoEntrada = false;
    botonesMemoriaLobos.forEach((item) => {
      item.disabled = true;
      item.classList.add("error");
    });
    estadoPruebaBosque.textContent = "Casi. Los lobos se ocultaron; observá la misma secuencia otra vez.";
    reproducirSonido("error");
    setTimeout(() => void mostrarSecuenciaMemoriaLobos(), 950);
    return;
  }

  reproducirSonido("acertar");
  if (entradaMemoriaLobos.length < secuenciaMemoriaLobos.length) {
    estadoPruebaBosque.textContent = `${entradaMemoriaLobos.length} de ${secuenciaMemoriaLobos.length} miradas recordadas.`;
    return;
  }

  memoriaLobosAceptandoEntrada = false;
  botonesMemoriaLobos.forEach((item) => (item.disabled = true));
  rondaMemoriaLobos += 1;
  actualizarProgresoMemoriaLobos();

  if (rondaMemoriaLobos >= 3) {
    estadoPruebaBosque.textContent = "¡Recordaste todas las miradas! La manada se aleja entre los árboles.";
    escenaMemoriaLobos.classList.add("lobos-retirandose");
    void completarPruebaEspecialBosque("lobos");
    return;
  }

  let siguiente = AdventurePuzzles.crearSecuenciaMemoria(1)[0];
  if (siguiente === secuenciaMemoriaLobos.at(-1)) siguiente = (siguiente + 1) % 4;
  secuenciaMemoriaLobos.push(siguiente);
  estadoPruebaBosque.textContent = `¡Ronda ${rondaMemoriaLobos} superada! La próxima secuencia será un poco más larga.`;
  setTimeout(() => void mostrarSecuenciaMemoriaLobos(), 900);
}

function actualizarProgresoMemoriaLobos() {
  [...progresoMemoriaLobos.children].forEach((marca, indice) => {
    marca.classList.toggle("completada", indice < rondaMemoriaLobos);
    marca.classList.toggle("actual", indice === rondaMemoriaLobos && rondaMemoriaLobos < 3);
  });
}

async function ejecutarEncuentroHombreLoboMision(fase = "desafio") {
  if (escenarioActual !== 0 || misionActual !== 5) return;

  const capa = document.createElement("div");
  const luna = document.createElement("span");
  const figura = document.createElement("img");
  const relato = document.createElement("p");
  const esperaCorta = prefiereReducirMovimiento.matches ? 180 : 760;
  const esperaTransformacion = prefiereReducirMovimiento.matches ? 240 : 950;

  capa.className = "encuentro-hombre-lobo-mision";
  capa.setAttribute("aria-live", "polite");
  luna.className = "luna-encuentro-lobo";
  figura.className = "figura-encuentro-lobo";
  figura.src = fase === "victoria"
    ? srcHombreLoboAullidoVersus
    : srcHombreLoboHumanoVersus;
  figura.alt = fase === "victoria"
    ? "El Guardián de la Luna aullando ante la manada"
    : "El viajero misterioso frente a Aren";
  relato.className = "relato-encuentro-lobo";
  relato.textContent = fase === "victoria"
    ? "El Guardián de la Luna acepta la derrota y alza la mirada hacia la luna."
    : "El desconocido reconoce que aprendiste el lenguaje de la manada…";
  capa.append(luna, figura, relato);
  contenedorEscenario.appendChild(capa);

  try {
    requestAnimationFrame(() => capa.classList.add("visible"));
    await esperarPruebaBosque(esperaCorta);

    if (fase === "victoria") {
      capa.classList.add("transformado", "aullando-victoria");
      relato.textContent = "Su aullido ordena a los lobos retirarse. El sendero queda abierto.";
      reproducirSonido("lobos");
      await esperarPruebaBosque(prefiereReducirMovimiento.matches ? 420 : 1900);
      capa.classList.add("saliendo");
      await esperarPruebaBosque(prefiereReducirMovimiento.matches ? 120 : 520);
      return;
    }

    figura.src = srcHombreLoboTransformacionVersus;
    figura.alt = "El viajero transformándose bajo la luz de la luna";
    capa.classList.add("transformando");
    relato.textContent = "La luz de la luna revela su verdadera naturaleza.";
    reproducirSonido("lobos");
    await esperarPruebaBosque(esperaTransformacion);

    figura.src = srcHombreLoboBaseVersus;
    figura.alt = "El Guardián de la Luna convertido en hombre lobo";
    capa.classList.add("transformado");
    relato.textContent = "Superaste la prueba.";
    await esperarPruebaBosque(prefiereReducirMovimiento.matches ? 420 : 1750);

    capa.classList.add("saliendo");
    await esperarPruebaBosque(prefiereReducirMovimiento.matches ? 120 : 520);
  } finally {
    capa.remove();
  }
}

async function completarPruebaEspecialBosque(tipo) {
  if (pruebaEspecialBosqueActiva !== tipo) return;

  pruebaEspecialBosqueActiva = "completando";
  const secuencia = ++secuenciaPruebaBosque;
  btnRepetirPruebaBosque.disabled = true;
  btnSalirPruebaBosque.disabled = true;
  tableroRamasDeslizante.querySelectorAll("button").forEach((boton) => (boton.disabled = true));
  botonesMemoriaLobos.forEach((boton) => (boton.disabled = true));
  botonesVientosDesierto.forEach((boton) => (boton.disabled = true));
  botonesOasisDesierto.forEach((boton) => (boton.disabled = true));
  botonesEspejosDesierto.forEach((boton) => (boton.disabled = true));
  botonesPuzzleCumbres.forEach((boton) => (boton.disabled = true));
  modalPruebaBosque.classList.add("prueba-completada");
  cambiarPersonaje("celebrando");
  reproducirSecuenciaSonidos(["acertar", "moneda", "victoria"]);

  await esperarPruebaBosque(prefiereReducirMovimiento.matches ? 700 : 1500);
  if (secuencia !== secuenciaPruebaBosque || pruebaEspecialBosqueActiva !== "completando") return;

  if (pruebaBosqueEnModoDemo) {
    cerrarPruebaEspecialBosque();
    if (tipo === "oasis") await liberarMaguitoDeTrampaEspejismo();
    volverEstadoBaseExplorador();
    return;
  }

  if (tipo === "lobos") {
    cerrarPruebaEspecialBosque();
    await ejecutarEncuentroHombreLoboMision("desafio");
    void iniciarDueloAventura("hombre_lobo");
    return;
  }

  if (tipo === "oasis") {
    cerrarPruebaEspecialBosque();
    await liberarMaguitoDeTrampaEspejismo();
  }

  otorgarMonedas(10, `aventura:${escenarioActual}:${misionActual}:puzzle:${tipo}`);
  experiencia += 20;
  actualizarJugador();
  sonidoNarrativoPendiente = avanzarMision();
  btnSiguiente.textContent = "➡️ Siguiente misión";
  guardarProgreso();
  if (tipo !== "lobos") cerrarPruebaEspecialBosque();
  const mensajeCompleto = await mostrarMensajeDesafioSuperado();
  if (mensajeCompleto) continuarAventura();
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
  reproducirMusicaCinematica(
    musicaMuralDragon,
    "música del mural del dragón",
    0.58,
  );
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
  reproducirMusicaCinematica(
    musicaMuralDragon,
    "música del mural del dragón",
    0.58,
  );

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
    detenerMusicaCinematica(musicaMuralDragon, 0.58);
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
  reproducirMusicaCinematica(
    musicaMuralDragon,
    "música del mural del dragón",
    0.58,
  );

  try {
    await ejecutarDespertarDragonSantuario();
  } finally {
    detenerMusicaCinematica(musicaMuralDragon, 0.58);
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
  // La capa vive fuera del escenario 16:9 para ocupar todo el viewport vertical.
  pantallaJuego.appendChild(capa);
  personajeImagen.classList.add("oculto-cinematica");

  await Promise.all(planos.map(esperarCargaImagen));

  planos[0].classList.add("visible");
  capa.classList.add("mural-rompiendose");
  sonidos.piedra.volume = 0.22;
  reproducirSonido("piedra");
  await esperarMovimiento(1900);
  detenerSonido("piedra");
  sonidos.piedra.volume = 1;

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
  pantallaJuego
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
      ? precargarImagen("assets/images/elementos/tronco-antiguo-caido-bosque.png")
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
