const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "js", "app.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "css", "styles.css"), "utf8");
const sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");

assert.match(app, /nombre: "❄️ Reino del Invierno Eterno"/);
assert.match(app, /const historiaHielo = \[/);
assert.match(app, /if \(escenarioActual === 3\) \{[\s\S]*?return historiaHielo\[misionActual\]/);
assert.equal((app.match(/fondos: \["hielo-\d+\.png"\]/g) || []).length, 10);
for (let mission = 1; mission <= 10; mission += 1) {
  assert.ok(fs.existsSync(path.join(root, "assets", "images", "fondos", `hielo-${mission}.png`)));
  assert.match(sw, new RegExp(`assets/images/fondos/hielo-${mission}\\.png`));
}

const selectorPuzzles = app.match(/function obtenerTipoPruebaEspecial\(escenario, mision\) \{[\s\S]+?\n\}/)?.[0] || "";
assert.equal((selectorPuzzles.match(/escenario === 3 && mision ===/g) || []).length, 2);
assert.match(selectorPuzzles, /mision === 6\) return "laberinto-hielo"/);
assert.match(selectorPuzzles, /mision === 7\) return "corazon-termico"/);
assert.match(app, /const mapaLaberintoHielo = Object\.freeze/);
assert.equal((app.match(/"1[01]{15}1",?/g) || []).length, 17);
assert.match(app, /const ladoLaberintoHielo = mapaLaberintoHielo\.length/);
const bloqueMapa = app.match(/const mapaLaberintoHielo = Object\.freeze\(\[([\s\S]*?)\]\);/)?.[1] || "";
const mapaHielo = [...bloqueMapa.matchAll(/"([01]+)"/g)].map((coincidencia) => coincidencia[1]);
const colaLaberinto = [[1, 1, 0]];
const visitadasLaberinto = new Set(["1,1"]);
let longitudCaminoLaberinto = -1;
while (colaLaberinto.length) {
  const [fila, columna, distancia] = colaLaberinto.shift();
  if (fila === 15 && columna === 1) {
    longitudCaminoLaberinto = distancia;
    break;
  }
  for (const [deltaFila, deltaColumna] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const siguienteFila = fila + deltaFila;
    const siguienteColumna = columna + deltaColumna;
    const clave = `${siguienteFila},${siguienteColumna}`;
    if (mapaHielo[siguienteFila]?.[siguienteColumna] === "0" && !visitadasLaberinto.has(clave)) {
      visitadasLaberinto.add(clave);
      colaLaberinto.push([siguienteFila, siguienteColumna, distancia + 1]);
    }
  }
}
let callejonesLaberinto = 0;
let bifurcacionesLaberinto = 0;
for (let fila = 1; fila < mapaHielo.length - 1; fila += 1) {
  for (let columna = 1; columna < mapaHielo[fila].length - 1; columna += 1) {
    if (mapaHielo[fila][columna] !== "0") continue;
    const salidas = [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(
      ([deltaFila, deltaColumna]) => mapaHielo[fila + deltaFila]?.[columna + deltaColumna] === "0",
    ).length;
    if (salidas === 1) callejonesLaberinto += 1;
    if (salidas >= 3) bifurcacionesLaberinto += 1;
  }
}
assert.ok(longitudCaminoLaberinto >= 80, `El camino del laberinto debe ser largo; mide ${longitudCaminoLaberinto}`);
assert.ok(callejonesLaberinto >= 8, `El laberinto necesita callejones sin salida; tiene ${callejonesLaberinto}`);
assert.ok(bifurcacionesLaberinto >= 6, `El laberinto necesita bifurcaciones; tiene ${bifurcacionesLaberinto}`);
assert.match(app, /function iniciarLaberintoHielo\(/);
assert.match(app, /DeviceOrientationEvent\?\.requestPermission/);
assert.match(app, /window\.addEventListener\("deviceorientation"/);
assert.match(app, /function iniciarCorazonTermico\(/);
assert.match(app, /completarPruebaEspecialBosque\("laberinto-hielo"\)/);
assert.match(app, /completarPruebaEspecialBosque\("corazon-termico"\)/);
assert.match(css, /\.tablero-laberinto-hielo/);
assert.match(css, /\.huevo-laberinto-hielo/);
assert.ok(fs.existsSync(path.join(root, "assets", "images", "ui", "presentacion-mision-hielo-v1.png")));
assert.match(app, /assets\/images\/ui\/presentacion-mision-hielo-v1\.png/);
assert.match(sw, /assets\/images\/ui\/presentacion-mision-hielo-v1\.png/);
assert.match(css, /\.maquina-corazon-termico/);
assert.match(css, /\.nivor-hielo\s*\{[^}]*transform:\s*scaleX\(-1\)/);

const presentacionHistoria = app.match(/function mostrarHistoriaMision\([\s\S]+?\n\}/)?.[0] || "";
assert.doesNotMatch(presentacionHistoria, /setTimeout/);
assert.match(app, /El cartel permanece visible hasta que el jugador elige "Saltar"/);

assert.match(app, /function reproducirPulsacionTeclaVersus\(/);
assert.match(app, /if \(!propio && \["hit", "miss", "word_complete"\]\.includes\(evento\.type\)\)/);
assert.match(app, /function jugarTurnoRivalVersus\([\s\S]*?reproducirPulsacionTeclaVersus\("rival"\)/);

assert.match(app, /nivor_glacial: \{[\s\S]*?escenario: 3,[\s\S]*?mision: 5,[\s\S]*?rival: "dragon_hielo"/);
assert.match(app, /nivor_cero_absoluto: \{[\s\S]*?escenario: 3,[\s\S]*?mision: 9,[\s\S]*?rival: "dragon_hielo"/);
assert.match(app, /intervaloRival: 1900/);
assert.match(app, /probabilidadRival: 0\.76/);
assert.match(app, /primerDueloNivorCompletado = true/);
assert.match(app, /mundoCuatroCompletado = true/);
assert.match(app, /cristalesObtenidos = Math\.max\(cristalesObtenidos, 4\)/);
assert.match(app, /guardarDesbloqueoNivor\(\)/);
assert.match(app, /if \(personaje === "dragon_hielo"\) return nivorDesbloqueado/);

assert.match(app, /async function reproducirIntroduccionMundoHielo\(/);
assert.match(app, /async function reproducirCinematicaFinalHielo\(/);
for (const image of [
  "01-aren-vigilado-por-nivor-v1.png",
  "02-nivor-rompe-cadenas-v1.png",
  "03-nivor-entrega-cristal-v1.png",
]) {
  assert.ok(fs.existsSync(path.join(root, "assets", "images", "cinematicas", "mundo-hielo", image)));
  assert.match(app, new RegExp(image.replace(".", "\\.")));
  assert.match(sw, new RegExp(image.replace(".", "\\.")));
}

assert.match(html, /id="ranuraCristalHielo"/);
assert.match(html, /id="cristalPanelHielo"/);
assert.match(css, /\.cristal-panel-glacial/);
assert.match(app, /mundoCuatroCompletado,/);
assert.match(app, /primerDueloNivorCompletado,/);
assert.match(app, /finalMundoCuatroCompletado[\s\S]*?Mundo 5 · Próximamente/);
assert.match(sw, /CACHE_NAME = `\$\{CACHE_PREFIX\}v203`/);

console.log("World 4 adventure checks passed");
