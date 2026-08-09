const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const raiz = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(raiz, "js", "app.js"), "utf8");
const estilos = fs.readFileSync(path.join(raiz, "css", "styles.css"), "utf8");
const html = fs.readFileSync(path.join(raiz, "index.html"), "utf8");

const eventosOnline = app.slice(
  app.indexOf("function procesarEventoPartidaOnline"),
  app.indexOf("function finalizarPartidaOnline"),
);
assert.match(eventosOnline, /else reproducirAtaqueRivalVersus\(\)/);
assert.match(eventosOnline, /if \(propio\) reproducirAtaqueRivalVersus\(\)/);
assert.doesNotMatch(eventosOnline, /else reproducirAtaqueMagoVersus\(\)/);

const cierreOnline = app.slice(
  app.indexOf("function finalizarPartidaOnline"),
  app.indexOf("function actualizarPartidaOnline"),
);
assert.match(cierreOnline, /reproducirCierrePartidaVersus\(ganador, detalle\)/);
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
assert.match(estilos, /max-height: 500px[\s\S]+data-personaje="mago"[^}]+translateY\(-8%\) scale\(-1\.4, 1\.4\)/);
assert.match(app, /hombre_lobo:[\s\S]+imagenAtrapado: "assets\/images\/personajes\/versus\/carnivora-devorando-hombre-lobo-v2\.png"/);
assert.match(estilos, /victima-fauces-hombre_lobo[^}]+--direccion-victima-fauces: -1/);
assert.match(app, /t_shadow:[\s\S]+imagenAtrapado: "assets\/images\/personajes\/versus\/carnivora-devorando-t-shadow\.png"/);
assert.match(app, /guardian_alba:[\s\S]+imagenAtrapado: "assets\/images\/personajes\/versus\/carnivora-devorando-guardian-alba\.png"/);
assert.match(app, /function observarPoseDanoPersonajeVersus\(/);
assert.match(estilos, /max-height: 600px[\s\S]+alba-final-rayo-carga[\s\S]+height: clamp\(14px, 2\.7vh, 18px\)/);
assert.match(estilos, /max-height: 600px[\s\S]+cinematica-shadow-victoria[\s\S]+width: min\(32vw, 58vh\)/);
assert.match(app, /dragon:[\s\S]+imagenAtrapado: "assets\/images\/personajes\/versus\/carnivora-devorando-dragon\.png"/);
assert.match(estilos, /victima-fauces-dragon[^}]+--direccion-victima-fauces: -1/);
assert.match(html, /CACER|Cacer/);
assert.match(html, /enredaderas-teclado-versus\.png/);
assert.match(app, /function reproducirAnimacionHabilidadVersus\(/);
assert.match(app, /reproducirAnimacionHabilidadVersus\(personajeJugadorVersus/);
assert.match(app, /reproducirAnimacionHabilidadVersus\(personajeRivalVersus/);
for (const habilidad of ["explorador", "mago", "guardiana", "dragon", "hombre_lobo", "t_shadow", "guardian_alba"]) {
  assert.match(estilos, new RegExp(`habilidad-${habilidad}`));
  assert.match(html, new RegExp(`data-habilidad="${habilidad}"`));
}
assert.match(html, /id="herramientasHabilidadesPruebasVersus"/);
assert.match(html, /id="origenHabilidadPruebaVersus"/);
assert.match(app, /function probarHabilidadEspecialVersus\(personaje\)/);
assert.match(app, /probarHabilidadEspecialVersus\(boton\.dataset\.habilidad\)/);
assert.match(app, /herramientasHabilidadesPruebasVersus\.classList\.toggle\("oculto", !modoPruebasActivo\)/);
assert.match(estilos, /\.herramientas-habilidades-pruebas-versus/);
assert.match(app, /t_shadow: \{ nombre: "Vacío devorador"[\s\S]+efecto: "black_hole"[\s\S]+duracion: 5000/);
assert.match(app, /function prepararAgujeroNegroTecladoVersus\(\)/);
assert.match(estilos, /\.teclado-versus\.efecto-agujero-negro/);
assert.match(estilos, /@keyframes absorberTeclaAgujeroNegroVersus/);
assert.match(app, /function reproducirLegionUmbriaVersus\(/);
assert.match(estilos, /ataqueClonUnoShadowVersus/);
assert.match(estilos, /fusionLegionShadowVersus/);
assert.match(html, /class="shadow-final-ojos"[\s\S]+t-shadow-ojos\.png/);
assert.match(estilos, /@keyframes ojosLegionShadowVersus/);
assert.match(app, /vortice-interior-agujero-versus/);
assert.match(estilos, /@keyframes rotarAnilloVorticeVersus/);
assert.equal((html.match(/class="cinematica-shadow-clon/g) || []).length, 6);
assert.match(estilos, /\.shadow-final-cortes \{[^}]+top:45%/);
assert.match(estilos, /@keyframes ataqueClonSeisShadowVersus/);
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
assert.match(html, /guardian-alba-final-carga\.png/);
assert.match(html, /guardian-alba-esfera-solar\.png/);
assert.match(estilos, /@keyframes esferaSolarJuicioAlbaVersus/);
assert.match(app, /guardian-alba-habilidad\.png/);
assert.match(html, /guardian-alba-victoria\.png/);

console.log("versus-ui: comprobaciones correctas");
