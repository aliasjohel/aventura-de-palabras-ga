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

for (const ataque of ["bumeran", "raices", "rugido-dragon"]) {
  assert.match(app, new RegExp(`ataque === "${ataque}"`));
}
for (const final of [
  "prision-esmeralda",
  "eclipse-violeta",
  "llamado-matriarca",
]) {
  assert.match(app, new RegExp(`finalElegido === "${final}"`));
}

assert.match(app, /reproducirEclipseVioletaVersus\(personajeVictima\)/);
assert.match(app, /reproducirTrampaSelvaticaVersus\(personajeVictima\)/);
assert.match(app, /reproducirLlamadoMatriarcaVersus\(personajeVictima\)/);
for (const victima of ["explorador", "mago", "guardiana", "dragon"]) {
  assert.match(estilos, new RegExp(`victima-final-${victima}`));
  assert.match(app, new RegExp(`${victima}: "assets/images/personajes/versus/.+"`));
}
assert.match(estilos, /--direccion-victima-trampa: -1/);
assert.match(estilos, /cinematica-mago-atrapado\.victima-final-guardiana \{[\s\S]+--direccion-victima-trampa: -1/);
assert.match(estilos, /cinematica-mago-atrapado\.victima-final-guardiana\.reaccion-final-activa[\s\S]+--direccion-victima-trampa: 1/);
assert.match(estilos, /cinematica-mago-atrapado\.victima-final-mago[\s\S]+--direccion-victima-trampa: 1/);
assert.match(estilos, /capturaMagoTrampaVersus[\s\S]+scaleX\(var\(--direccion-victima-trampa\)\)/);
assert.match(estilos, /--direccion-victima-eclipse: 1/);
assert.match(estilos, /cinematica-explorador-atrapado\.victima-final-guardiana\.reaccion-final-activa[\s\S]+--direccion-victima-eclipse: -1/);
assert.match(estilos, /cinematica-explorador-atrapado\.victima-final-mago[\s\S]+--direccion-victima-eclipse: -1/);
assert.match(estilos, /capturaExploradorEclipseVersus[\s\S]+scaleX\(var\(--direccion-victima-eclipse\)\)/);
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
assert.match(estilos, /\.teclado-versus\.efecto-raices/);
assert.match(estilos, /\.teclado-versus\.efecto-rugido/);
assert.match(estilos, /\.teclado-versus\.efecto-caos/);
assert.match(app, /function reproducirAnimacionHabilidadVersus\(/);
assert.match(app, /reproducirAnimacionHabilidadVersus\(personajeJugadorVersus/);
assert.match(app, /reproducirAnimacionHabilidadVersus\(personajeRivalVersus/);
for (const habilidad of ["explorador", "mago", "guardiana", "dragon"]) {
  assert.match(estilos, new RegExp(`habilidad-${habilidad}`));
  assert.match(html, new RegExp(`data-habilidad="${habilidad}"`));
}
assert.match(html, /id="herramientasHabilidadesPruebasVersus"/);
assert.match(html, /id="origenHabilidadPruebaVersus"/);
assert.match(app, /function probarHabilidadEspecialVersus\(personaje\)/);
assert.match(app, /probarHabilidadEspecialVersus\(boton\.dataset\.habilidad\)/);
assert.match(app, /herramientasHabilidadesPruebasVersus\.classList\.toggle\("oculto", !modoPruebasActivo\)/);
assert.match(estilos, /\.herramientas-habilidades-pruebas-versus/);

console.log("versus-ui: comprobaciones correctas");
