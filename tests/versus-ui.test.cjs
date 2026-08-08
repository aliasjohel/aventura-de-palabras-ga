const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const raiz = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(raiz, "js", "app.js"), "utf8");
const estilos = fs.readFileSync(path.join(raiz, "css", "styles.css"), "utf8");

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
}

assert.match(app, /function iniciarPruebaVersusLocal\(\)/);
assert.match(estilos, /personaje-dos\.personaje-guardiana/);
assert.match(estilos, /entrada-guardiana-rival/);
assert.match(estilos, /vueloHalconEspiritualGuardianaRivalVersus/);
assert.match(estilos, /tarjeta-personaje-versus\[data-personaje="mago"\]/);

console.log("versus-ui: 22 comprobaciones correctas");
