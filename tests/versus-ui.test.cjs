const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const raiz = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(raiz, "js", "app.js"), "utf8");
const estilos = fs.readFileSync(path.join(raiz, "css", "styles.css"), "utf8");
const html = fs.readFileSync(path.join(raiz, "index.html"), "utf8");
const serviceWorker = fs.readFileSync(path.join(raiz, "sw.js"), "utf8");
const migracionPalabraPerdida = fs.readFileSync(
  path.join(raiz, "supabase", "migrations", "20260811014047_reveal_failed_versus_word.sql"),
  "utf8",
);

const eventosOnline = app.slice(
  app.indexOf("function procesarEventoPartidaOnline"),
  app.indexOf("function finalizarPartidaOnline"),
);
assert.match(eventosOnline, /else reproducirAtaqueRivalVersus\(\)/);
assert.match(eventosOnline, /if \(propio\) reproducirAtaqueRivalVersus\(\)/);
assert.doesNotMatch(eventosOnline, /else reproducirAtaqueMagoVersus\(\)/);
assert.match(eventosOnline, /evento\.word/);
assert.match(html, /id="revelacionPalabraVersusUno"[\s\S]+id="revelacionPalabraVersusDos"/);
assert.match(estilos, /\.versus-palabra-revelada/);
assert.match(app, /function mostrarRevelacionPalabraVersus\(/);
assert.match(app, /La palabra era/);
assert.match(html, /id="anuncioFinVersus"[\s\S]+FIN DEL JUEGO[\s\S]+id="palabraFinalVersus"/);
assert.match(estilos, /\.anuncio-fin-versus[\s\S]+@keyframes entradaAnuncioFinVersus/);
assert.match(app, /function mostrarAnuncioFinVersus\(palabraPerdida = ""\)/);
assert.match(app, /LA PALABRA ERA: \$\{palabraPerdida\}/);
assert.match(app, /await mostrarAnuncioFinVersus\(palabraPerdida\)/);
assert.match(app, /const palabraActivaJugador = obtenerPalabraActualJugadorVersus\(\)/);
assert.match(app, /El rival completó su ataque[\s\S]+?palabraActivaJugador/);
assert.doesNotMatch(app, /palabraPerdida \|\| \([\s\S]+?ultimaPalabraFalladaJugador/);
assert.match(app, /finalizarPartidaVersus\([\s\S]+?palabraPerdida,[\s\S]+?\);/);
assert.match(migracionPalabraPerdida, /'type', 'word_failed'[\s\S]+?'word', v_word/);
assert.match(migracionPalabraPerdida, /'previousEvent', last_event/);
assert.match(eventosOnline, /eventoFinal\.previousEvent/);

const cierreOnline = app.slice(
  app.indexOf("function finalizarPartidaOnline"),
  app.indexOf("function actualizarPartidaOnline"),
);
assert.match(cierreOnline, /reproducirCierrePartidaVersus\(ganador, detalle, palabraPerdida\)/);
assert.doesNotMatch(cierreOnline, /mostrarResultadoPartidaVersus\(ganador, detalle\)/);

for (const ataque of ["bumeran", "raices", "rugido-dragon", "zarpazo-feral", "corte-sombrio", "corte-solar"]) {
  assert.match(app, new RegExp(`ataque === "${ataque}"`));
}
for (const final of [
  "prision-esmeralda",
  "eclipse-violeta",
  "llamado-matriarca",
  "caceria-luna-llena",
  "legion-umbria",
  "juicio-amanecer",
]) {
  assert.match(app, new RegExp(`finalElegido === "${final}"`));
}

assert.match(app, /reproducirEclipseVioletaVersus\(personajeVictima\)/);
assert.match(app, /reproducirTrampaSelvaticaVersus\(personajeVictima\)/);
assert.match(app, /reproducirLlamadoMatriarcaVersus\(personajeVictima\)/);
assert.match(app, /reproducirCaceriaLunaLlenaVersus\(personajeVictima\)/);
for (const victima of ["explorador", "mago", "guardiana", "dragon"]) {
  assert.match(estilos, new RegExp(`victima-final-${victima}`));
  assert.match(app, new RegExp(`${victima}: "assets/images/personajes/versus/.+"`));
}
for (const victima of ["hombre_lobo", "guardian_alba"]) {
  assert.match(estilos, new RegExp(`victima-final-${victima}`));
}
assert.match(estilos, /victima-final-t_shadow/);
assert.match(app, /t_shadow: srcShadowImpactoVersus/);
assert.match(app, /hombre_lobo: srcHombreLoboImpactoVersus/);
assert.match(app, /guardian_alba: srcGuardianAlbaImpactoVersus/);
assert.match(estilos, /--direccion-victima-trampa: -1/);
assert.match(estilos, /cinematica-mago-atrapado\.victima-final-guardiana \{[\s\S]+--direccion-victima-trampa: -1/);
assert.match(estilos, /cinematica-mago-atrapado\.victima-final-guardiana\.reaccion-final-activa[\s\S]+--direccion-victima-trampa: 1/);
assert.match(estilos, /cinematica-mago-atrapado\.victima-final-mago[\s\S]+--direccion-victima-trampa: 1/);
assert.match(estilos, /capturaMagoTrampaVersus[\s\S]+scaleX\(var\(--direccion-victima-trampa\)\)/);
assert.match(estilos, /--direccion-victima-eclipse: 1/);
assert.match(estilos, /cinematica-explorador-atrapado\.victima-final-guardiana\.reaccion-final-activa[\s\S]+--direccion-victima-eclipse: -1/);
assert.match(estilos, /cinematica-explorador-atrapado\.victima-final-mago[\s\S]+--direccion-victima-eclipse: -1/);
assert.match(estilos, /capturaExploradorEclipseVersus[\s\S]+scaleX\(var\(--direccion-victima-eclipse\)\)/);
assert.equal((html.match(/remolino-arcano-mago\.png/g) || []).length, 2);
assert.match(estilos, /\.remolino-arcano-fondo[\s\S]+z-index: 4/);
assert.match(estilos, /\.remolino-arcano-frente[\s\S]+z-index: 6/);
assert.match(estilos, /@keyframes remolinoArcanoMagoVersus/);
assert.match(estilos, /remolinoArcanoMagoVersus 5\.2s linear/);
assert.match(html, /class="remolino-lineas-viento"/);
assert.match(estilos, /@keyframes barridoVientoRemolinoVersus/);
assert.match(estilos, /remolino-lineas-viento[\s\S]+z-index: 7/);
assert.match(estilos, /eclipse-violeta\.activa \.remolino-lineas-viento[\s\S]+remolinoArcanoMagoVersus 5\.2s linear/);
assert.match(app, /programarReaccionVictimaFinalVersus\(victimaTrampaVersus, victima, 2200\)/);
assert.match(app, /programarReaccionVictimaFinalVersus\(victimaEclipseVersus, victima, 2150\)/);
assert.match(app, /programarReaccionVictimaFinalVersus\(rivalCinematicaMatriarca, victima, 2700\)/);
assert.match(estilos, /--direccion-victima-matriarca: -1/);
assert.match(estilos, /cinematica-rival-matriarca\.victima-final-guardiana\.reaccion-final-activa[\s\S]+--direccion-victima-matriarca: 1/);
assert.match(estilos, /cinematica-rival-matriarca\.victima-final-mago[\s\S]+--direccion-victima-matriarca: 1/);

assert.match(app, /function iniciarPruebaVersusLocal\(\)/);
assert.match(estilos, /personaje-dos\.personaje-guardiana/);
assert.match(estilos, /entrada-guardiana-rival/);
assert.match(estilos, /vueloHalconEspiritualGuardianaRivalVersus/);
assert.match(estilos, /tarjeta-personaje-versus\[data-personaje="mago"\]/);
assert.match(app, /function completarPalabrasAleatoriasVersus\(\)/);
assert.match(app, /function activarHabilidadVersus\(\)/);
assert.match(html, /id="btnArcade"[\s\S]+id="pantallaArcade"/);
assert.match(html, /id="pisosArcade"[\s\S]+id="btnCombatirArcade"/);
assert.match(app, /function crearOrdenRivalesArcade\(\)/);
assert.match(app, /function renderizarTorreArcade\(\)/);
assert.match(app, /function iniciarCombateArcade\(\)/);
assert.match(app, /progresoArcadeAventuraGA/);
assert.match(app, /Math\.min\(\.82, \.43 \+ pisoCombateArcade \* \.055\)/);
assert.match(app, /Math\.max\(1550, 3550 - pisoCombateArcade \* 270\)/);
assert.match(app, /¡Campeón de la torre!/);
assert.match(estilos, /\.pantalla-arcade/);
assert.match(estilos, /\.pisos-arcade li\.actual/);
assert.match(html, /id="modalTutorialVersus"[\s\S]+id="btnComenzarTutorialVersus"[\s\S]+id="impactoTutorialVersus"/);
assert.match(html, /id="btnTutorialVersus"/);
assert.match(app, /const claveTutorialVersusVisto = "tutorialVersusVistoAventuraGA"/);
assert.match(app, /function comenzarTutorialVersus\(\)/);
assert.match(app, /function renderizarPasoTutorialVersus\(\)/);
assert.match(app, /Cada palabra terminada le quita un corazón al rival/);
assert.match(app, /palabra aleatoria de la misma temática/);
assert.match(app, /if \(!modoPruebasActivo && !tutorialVersusYaVisto\(\)\)/);
assert.match(estilos, /\.modal-tutorial-versus/);
assert.match(estilos, /\.impacto-tutorial-versus\.visible/);
assert.match(app, /efecto === "roots"/);
assert.match(app, /efecto === "roar"/);
assert.match(app, /efecto === "shuffle"/);
assert.match(app, /efecto === "invert"/);
assert.match(estilos, /\.teclado-versus\.efecto-raices/);
assert.match(estilos, /\.teclado-versus\.efecto-rugido/);
assert.match(estilos, /\.teclado-versus\.efecto-caos/);
assert.match(estilos, /\.versus-marco\.efecto-inversion-lunar/);
assert.match(estilos, /enredaderas-teclado-versus\.png/);
assert.match(estilos, /translate\(-12vw, -2vh\)/);
assert.match(app, /function animarCambioOrdenTecladoVersus\(reordenar\)/);
assert.match(app, /transform 680ms cubic-bezier/);
assert.match(app, /function iniciarCaosContinuoTecladoVersus\(\)/);
assert.match(app, /intervaloCaosHabilidad = setInterval[\s\S]+?760/);
assert.match(app, /function detenerCaosContinuoTecladoVersus\(\)/);
assert.match(app, /desafioJugadorVersus\.classList\.add\("efecto-raices-desafio"\)/);
assert.match(app, /desafioJugadorVersus\.classList\.add\("efecto-rugido-desafio"\)/);
assert.match(app, /desafioJugadorVersus\.classList\.add\("efecto-caos-desafio"\)/);
assert.match(app, /desafioJugadorVersus\.classList\.add\("efecto-ruptura-desafio"\)/);
assert.match(estilos, /\.versus-palabra-uno\.efecto-raices-desafio::after/);
assert.match(estilos, /\.versus-palabra-uno\.efecto-rugido-desafio/);
assert.match(estilos, /\.versus-palabra-uno\.efecto-caos-desafio strong/);
assert.match(estilos, /\.versus-palabra-uno\.efecto-ruptura-desafio::after/);
assert.match(app, /explorador-lupa\.png/);
assert.match(app, /guardiana: \{ nombre: "Enredo de raíces"[\s\S]+duracion: 5000/);
assert.match(app, /dragon: \{ nombre: "Rugido"[\s\S]+duracion: 5000/);
assert.match(app, /mago: \{ nombre: "Caos arcano"[\s\S]+duracion: 5000/);
assert.match(app, /hombre_lobo: \{ nombre: "Inversión lunar"[\s\S]+duracion: 5000/);
assert.match(app, /hombre-lobo-zarpazo\.png/);
assert.match(app, /function reproducirCaceriaLunaLlenaVersus\(/);
assert.match(estilos, /lobos-espectrales-final/);
assert.match(html, /garra-pantalla-rota\.png/);
assert.match(estilos, /oscuridad-caceria-final/);
assert.match(estilos, /data-personaje="mago"[^}]+translateY\(-47%\) scale\(-2\.2, 2\.2\)/);
assert.match(estilos, /max-height: 500px[\s\S]+data-personaje="mago"[^}]+translateY\(-52%\) scale\(-2, 2\)/);
assert.match(app, /hombre_lobo:[\s\S]+imagenAtrapado: "assets\/images\/personajes\/versus\/carnivora-devorando-hombre-lobo-v2\.png"/);
assert.match(estilos, /victima-fauces-hombre_lobo[^}]+--direccion-victima-fauces: -1/);
assert.match(app, /t_shadow:[\s\S]+imagenAtrapado: "assets\/images\/personajes\/versus\/carnivora-devorando-t-shadow\.png"/);
assert.match(app, /guardian_alba:[\s\S]+imagenAtrapado: "assets\/images\/personajes\/versus\/carnivora-devorando-guardian-alba\.png"/);
assert.match(app, /dragon_hielo:[\s\S]+imagenAtrapado: "assets\/images\/personajes\/versus\/carnivora-devorando-dragon-hielo\.png"/);
assert.match(app, /azrak:[\s\S]+imagenAtrapado: "assets\/images\/personajes\/versus\/carnivora-devorando-azrak\.png"/);
assert.match(app, /function observarPoseDanoPersonajeVersus\(/);
assert.match(estilos, /max-height: 600px[\s\S]+alba-final-rayo-carga[\s\S]+height: clamp\(14px, 2\.7vh, 18px\)/);
assert.match(estilos, /max-height: 600px[\s\S]+cinematica-shadow-victoria[\s\S]+width: min\(32vw, 58vh\)/);
assert.match(app, /dragon:[\s\S]+imagenAtrapado: "assets\/images\/personajes\/versus\/carnivora-devorando-dragon\.png"/);
assert.match(estilos, /victima-fauces-dragon[^}]+--direccion-victima-fauces: -1/);
assert.match(html, /CACER|Cacer/);
assert.match(html, /enredaderas-teclado-versus\.png/);
assert.match(app, /function reproducirAnimacionHabilidadVersus\(/);
assert.match(html, /id="vistaImpactoRivalVersus"[\s\S]+id="miniTecladoRivalVersus"/);
assert.match(app, /function mostrarVistaImpactoRivalVersus\(personaje, letraForzada = ""\)/);
assert.match(app, /mostrarVistaImpactoRivalVersus\([\s\S]+evento\.letter \|\| ""/);
assert.match(estilos, /\.vista-impacto-rival-versus\.visible/);
assert.match(estilos, /\.vista-impacto-rival-versus \{[\s\S]+top: clamp\(70px, 18vh, 150px\);[\s\S]+bottom: auto/);
assert.match(estilos, /\.mini-teclado-rival-versus\.efecto-black_hole::before/);
assert.match(estilos, /vivirAgujeroMiniRivalVersus/);
assert.match(estilos, /\.mini-teclado-rival-versus\.efecto-forced_miss \.tecla-forzada/);
assert.match(app, /reproducirAnimacionHabilidadVersus\(personajeJugadorVersus/);
assert.match(app, /reproducirAnimacionHabilidadVersus\(personajeRivalVersus/);
for (const habilidad of ["explorador", "mago", "guardiana", "dragon", "hombre_lobo", "t_shadow", "guardian_alba", "dragon_hielo"]) {
  assert.match(estilos, new RegExp(`habilidad-${habilidad}`));
  assert.match(html, new RegExp(`data-habilidad="${habilidad}"`));
}
assert.match(html, /id="herramientasHabilidadesPruebasVersus"/);
assert.match(html, /id="origenHabilidadPruebaVersus"/);
assert.match(app, /function probarHabilidadEspecialVersus\(personaje\)/);
assert.match(app, /probarHabilidadEspecialVersus\(boton\.dataset\.habilidad\)/);
assert.match(app, /herramientasHabilidadesPruebasVersus\.classList\.toggle\("oculto", !modoPruebasActivo\)/);
assert.match(estilos, /\.herramientas-habilidades-pruebas-versus/);
assert.match(estilos, /\.herramientas-pruebas-versus \{[\s\S]*?overflow-x: auto/);
assert.match(estilos, /\.herramientas-habilidades-pruebas-versus \{[\s\S]*?overflow-x: auto/);
assert.match(estilos, /@media \(orientation: landscape\) and \(max-height: 600px\) \{[\s\S]*?\.herramientas-pruebas-versus,[\s\S]*?scroll-snap-type: x proximity/);
assert.match(app, /t_shadow: \{ nombre: "Vacío devorador"[\s\S]+efecto: "black_hole"[\s\S]+duracion: 5000/);
assert.match(app, /function prepararAgujeroNegroTecladoVersus\(\)/);
assert.match(estilos, /\.teclado-versus\.efecto-agujero-negro/);
assert.match(estilos, /@keyframes absorberTeclaAgujeroNegroVersus/);
assert.match(html, /id="desafioJugadorVersus"/);
assert.match(app, /desafioJugadorVersus\.classList\.add\("efecto-agujero-negro-desafio"\)/);
assert.match(app, /desafioJugadorVersus\.classList\.remove\([\s\S]+?"efecto-agujero-negro-desafio"/);
assert.match(estilos, /\.versus-palabra-uno\.efecto-agujero-negro-desafio::before/);
assert.match(estilos, /@keyframes oscurecerDesafioAgujeroVersus/);
assert.match(estilos, /@keyframes rotarAgujeroDesafioVersus/);
assert.match(estilos, /transform: translate\(-50%, -50%\) rotate\(360deg\)/);
assert.match(app, /function reproducirLegionUmbriaVersus\(/);
assert.match(estilos, /ataqueClonUnoShadowVersus/);
assert.match(estilos, /fusionLegionShadowVersus/);
assert.match(html, /class="shadow-final-ojos"[\s\S]+t-shadow-ojos\.png/);
assert.match(estilos, /@keyframes ojosLegionShadowVersus/);
assert.match(app, /vortice-interior-agujero-versus/);
assert.match(estilos, /@keyframes rotarAnilloVorticeVersus/);
assert.equal((html.match(/class="cinematica-shadow-clon/g) || []).length, 9);
assert.match(estilos, /\.shadow-final-cortes \{[^}]+top:45%/);
assert.match(estilos, /@keyframes ataqueClonSeisShadowVersus/);
assert.match(estilos, /@keyframes ataqueClonSieteShadowVersus/);
assert.match(estilos, /@keyframes ataqueClonOchoShadowVersus/);
assert.match(estilos, /@keyframes ataqueClonNueveShadowVersus/);
assert.match(estilos, /ataqueClonNueveShadowVersus[^\n]+40%,43%/);
assert.match(html, /t-shadow-victoria\.png/);
assert.match(app, /guardian_alba: \{[\s\S]+ataque: "corte-solar"[\s\S]+final: "juicio-amanecer"/);
assert.match(app, /guardian_alba: \{ nombre: "Ruptura celeste"[\s\S]+efecto: "key_bounce"[\s\S]+duracion: 5000/);
assert.match(app, /function prepararTeclasRotasVersus\(\)/);
assert.match(app, /tecla\.textContent = boton\.textContent/);
assert.match(estilos, /@keyframes reboteTeclaRotaVersus/);
assert.match(estilos, /@keyframes explosionTecladoLumenVersus/);
assert.match(estilos, /@keyframes fracturaTeclaLumenVersus/);
assert.match(app, /function reproducirJuicioAmanecerVersus\(/);
assert.match(estilos, /juicio-amanecer\.activa \.cinematica-alba-victoria/);
assert.match(html, /guardian-alba-base\.png/);
assert.match(app, /srcGuardianAlbaAtaqueVersus/);
assert.match(html, /guardian-alba-final-carga-sin-rayo\.png/);
assert.match(app, /srcGuardianAlbaFinalCargaVersus = "assets\/images\/personajes\/versus\/guardian-alba-final-carga-sin-rayo\.png"/);
assert.match(html, /guardian-alba-esfera-solar\.png/);
assert.match(estilos, /@keyframes esferaSolarJuicioAlbaVersus/);
assert.match(estilos, /\.alba-final-esfera-solar \{[^}]+width:min\(43vw,550px\)/);
assert.match(estilos, /@keyframes esferaSolarJuicioAlbaVersus \{.*?34%,48%.*?scale\(1\.12\).*?58%.*?scale\(1\.12\).*?64%,100%.*?scale\(1\.12\)/);
assert.match(estilos, /max-height: 600px[\s\S]+\.alba-final-esfera-solar \{[\s\S]+width: min\(44vw, 66vh\)/);
assert.match(app, /guardian-alba-habilidad\.png/);
assert.match(html, /guardian-alba-victoria\.png/);
assert.match(html, /data-personaje="dragon_hielo"/);
assert.match(app, /dragon_hielo: \{[\s\S]+ataque: "aliento-glacial"[\s\S]+final: "cero-absoluto"/);
assert.match(app, /dragon_hielo: \{ nombre: "Invierno absoluto"[\s\S]+efecto: "ice_screen"[\s\S]+duracion: 5000/);
assert.match(app, /function reproducirAtaqueDragonHieloVersus\(/);
assert.match(app, /function reproducirCeroAbsolutoVersus\(/);
assert.match(app, /marcoVersus\.classList\.add\("efecto-invierno-absoluto"\)/);
assert.match(estilos, /congelacion-nivor-versus\.activa/);
assert.match(estilos, /@keyframes congelarPantallaNivor/);
assert.match(estilos, /@keyframes entradaNivorJugadorVersus/);
assert.match(html, /dragon-hielo-victoria\.png/);
assert.match(html, /dragon-hielo-frontal-alas\.png/);
assert.match(estilos, /nivor-final-astro/);
assert.match(estilos, /nivor-final-onda/);
assert.match(estilos, /temblorCeroAbsolutoV5/);
assert.match(html, /id="btnConfiguracion"/);
assert.match(html, /id="vibracionAtaques"[^>]+role="switch"/);
assert.match(app, /const claveVibracionAtaques = "vibracionAtaquesAventuraGA"/);
assert.match(app, /function vibrarImpactoVersus\(/);
assert.doesNotMatch(app, /evento\.type === "word_complete"\s*\{\s*vibrarImpactoVersus\(\)/);
assert.match(app, /function programarImpactoRivalVersus[\s\S]+vibrarImpactoVersus\(\)[\s\S]+recibiendo-dano-magico/);
assert.match(estilos, /\.modal-configuracion/);
assert.match(estilos, /translateY\(-52%\) scale\(-2, 2\)/);
assert.match(estilos, /height: clamp\(165px, 54dvh, 225px\)/);
assert.match(html, /class="cinematica-nivor-ataque-final"[\s\S]+dragon-hielo-ataque-v2\.png/);
assert.doesNotMatch(html, /nivor-final-rayo/);
assert.match(app, /function programarAleteoEntradaNivor\(/);
assert.match(app, /dragon-hielo-aleteo-alto\.png/);
assert.match(app, /dragon-hielo-aleteo-bajo\.png/);
assert.match(app, /dragon-hielo-descenso-alto\.png/);
assert.match(app, /dragon-hielo-descenso-bajo\.png/);
assert.match(estilos, /@keyframes aterrizajeNivorJugador/);
assert.match(app, /function prepararBarridoHieloNivorVersus\(/);
assert.match(app, /hielo-pantalla-nivor-1\.png/);
assert.match(app, /hielo-pantalla-nivor-2\.png/);
assert.match(app, /hielo-pantalla-nivor-3\.png/);
assert.match(app, /estela-escarcha-nivor\.png/);
assert.match(html, /prision-hielo-nivor\.png/);
assert.match(html, /cubos-hielo-nivor\.png/);
assert.match(html, /ventisca-nivor\.png/);
assert.match(estilos, /@keyframes barridoHieloNivor/);
assert.match(estilos, /@keyframes avanceEscarchaNivor/);
assert.match(estilos, /nivor-en-vuelo/);
assert.match(estilos, /@keyframes picadaCeroAbsolutoV2/);
assert.match(html, /data-personaje="azrak"/);
assert.match(app, /azrak: \{[\s\S]+ataque: "corte-infernal"[\s\S]+final: "eclipse-infernal"/);
assert.match(app, /azrak: \{ nombre: "Calavera Ígnea"[\s\S]+efecto: "forced_miss"/);
assert.match(app, /function obtenerLetraIncorrectaDisponibleVersus\(/);
assert.match(app, /function aplicarFalloForzadoJugadorLocalVersus\(/);
assert.match(app, /function reproducirAtaqueAzrakVersus\(/);
assert.match(app, /function reproducirEclipseInfernalVersus\(/);
assert.match(html, /corte-infernal-azrak\.png/);
assert.match(html, /calavera-ignea-azrak\.png/);
assert.match(html, /azrak-invocacion-portal\.png/);
assert.match(html, /mano-abismo-emergiendo-azrak\.png/);
assert.match(html, /mano-abismo-abierta-azrak\.png/);
assert.match(html, /id="victimaPortalAzrakVersus"[\s\S]+mago-base\.png/);
assert.match(html, /id="manoVictimaAzrakVersus"[\s\S]+mano-abismo-atrapa-mago\.png/);
assert.match(app, /programarReaccionVictimaFinalVersus\(victimaPortalAzrakVersus, victimaFinal, 2850\)/);
assert.match(app, /mano-abismo-atrapa-\$\{victimaFinal\.replaceAll\("_", "-"\)\}\.png/);
assert.match(app, /setTimeout\(completarCinematicaFinalVersus, 8400\)/);
for (const victima of ["explorador", "mago", "guardiana", "dragon", "hombre-lobo", "t-shadow", "guardian-alba", "dragon-hielo", "azrak"]) {
  assert.match(serviceWorker, new RegExp(`mano-abismo-atrapa-${victima}\\.png`));
}
assert.match(estilos, /@keyframes calaveraIgneaJugador/);
assert.match(estilos, /tecla-calavera-ignea/);
assert.match(estilos, /@keyframes manoEmergiendoAzrakFinal/);
assert.match(estilos, /@keyframes manoAbiertaAzrakFinal/);
assert.match(estilos, /@keyframes victimaAnteManoAzrakFinal/);
assert.match(estilos, /@keyframes manoVictimaAzrakFinal/);
assert.match(estilos, /@keyframes fragmentoAzrakFinal/);
assert.match(estilos, /corteInfernalJugador[^}]+scaleX\(-1\)/);
assert.doesNotMatch(app, /aplicarFalloForzadoRivalLocalVersus[\s\S]+?animarTeclaCalaveraIgneaVersus\(letra\)[\s\S]+?function aplicarFalloForzadoJugadorLocalVersus/);
assert.match(html, /entrada-infernal-azrak entrada-infernal-uno/);
assert.match(html, /entrada-infernal-azrak entrada-infernal-dos/);
assert.match(app, /`entrada-rival-\$\{personajeRivalVersus\}`/);
assert.match(estilos, /@keyframes columnaInfernalAzrak/);
assert.match(estilos, /@keyframes grietaInfernalAzrak/);
assert.match(estilos, /entradaAzrakJugador[^}]+translateY\(72vh\)/);
assert.match(estilos, /\.versus-personaje-dos\.personaje-azrak \{[\s\S]+right:5%/);
assert.match(estilos, /entrada-infernal-azrak \{[^}]+height:30%/);
assert.match(estilos, /entrada-infernal-azrak i \{[^}]+height:29%/);
assert.match(app, /for \(let indice = 1; indice <= 12; indice\+\+\)/);
assert.match(estilos, /\.rama-bloqueo-8/);
assert.match(estilos, /--ancho-rama: 40%/);
assert.doesNotMatch(estilos, /--ancho-rama: 1(?:05|08|16)%/);
assert.match(app, /rama-frondosa-bosque-\$\{variante\}\.png/);
assert.match(estilos, /--direccion-rama: -1/);
assert.match(estilos, /\.rama-bloqueo-12/);

console.log("versus-ui: comprobaciones correctas");
