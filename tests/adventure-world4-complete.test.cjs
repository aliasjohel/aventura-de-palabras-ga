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
const fondosMundoHielo = [
  "hielo-1-yeti-paso-1-v2.png",
  "hielo-2.png",
  "hielo-3-zorro-paso-1-v2.png",
  "hielo-4-aldea-congelada-v2.png",
  "hielo-5.png",
  "hielo-6.png",
  "hielo-7.png",
  "hielo-8.png",
  "hielo-9.png",
  "hielo-10.png",
];
assert.equal((app.match(/fondos: \["hielo-[^"]+\.png"\]/g) || []).length, 10);
for (const fondo of fondosMundoHielo) {
  assert.ok(fs.existsSync(path.join(root, "assets", "images", "fondos", fondo)));
  assert.match(sw, new RegExp(`assets/images/fondos/${fondo.replace(".", "\\.")}`));
}
for (const cuadroAnimado of [
  "hielo-1-yeti-paso-2-v2.png",
  "hielo-3-zorro-paso-2-v2.png",
]) {
  assert.ok(fs.existsSync(path.join(root, "assets", "images", "fondos", cuadroAnimado)));
  assert.match(app, new RegExp(cuadroAnimado.replace(".", "\\.")));
  assert.match(sw, new RegExp(cuadroAnimado.replace(".", "\\.")));
}
assert.match(app, /let intervaloFaunaHielo = null/);
assert.match(app, /prefiereReducirMovimiento\.matches[\s\S]*?intervaloFaunaHielo = window\.setInterval/);

const selectorPuzzles = app.match(/function obtenerTipoPruebaEspecial\(escenario, mision\) \{[\s\S]+?\n\}/)?.[0] || "";
assert.equal((selectorPuzzles.match(/escenario === 3 && mision ===/g) || []).length, 2);
assert.match(selectorPuzzles, /mision === 6\) return "laberinto-hielo"/);
assert.match(selectorPuzzles, /mision === 7\) return "corazon-termico"/);
assert.match(app, /const mapaLaberintoHielo = Object\.freeze/);
assert.equal((app.match(/"1[01]{19}1",?/g) || []).length, 21);
assert.match(app, /const ladoLaberintoHielo = mapaLaberintoHielo\.length/);
const bloqueMapa = app.match(/const mapaLaberintoHielo = Object\.freeze\(\[([\s\S]*?)\]\);/)?.[1] || "";
const mapaHielo = [...bloqueMapa.matchAll(/"([01]+)"/g)].map((coincidencia) => coincidencia[1]);
const colaLaberinto = [[1, 1, 0]];
const visitadasLaberinto = new Set(["1,1"]);
const origenLaberinto = new Map([["1,1", null]]);
let longitudCaminoLaberinto = -1;
while (colaLaberinto.length) {
  const [fila, columna, distancia] = colaLaberinto.shift();
  if (fila === 19 && columna === 19) {
    longitudCaminoLaberinto = distancia;
  }
  for (const [deltaFila, deltaColumna] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const siguienteFila = fila + deltaFila;
    const siguienteColumna = columna + deltaColumna;
    const clave = `${siguienteFila},${siguienteColumna}`;
    if (mapaHielo[siguienteFila]?.[siguienteColumna] === "0" && !visitadasLaberinto.has(clave)) {
      visitadasLaberinto.add(clave);
      origenLaberinto.set(clave, `${fila},${columna}`);
      colaLaberinto.push([siguienteFila, siguienteColumna, distancia + 1]);
    }
  }
}
const caminoCorrectoLaberinto = new Set();
for (let celda = "19,19"; celda; celda = origenLaberinto.get(celda)) caminoCorrectoLaberinto.add(celda);
const ramalesMedidosLaberinto = new Set();
const extensionesRamalesLaberinto = [];
for (const celda of caminoCorrectoLaberinto) {
  const [fila, columna] = celda.split(",").map(Number);
  for (const [deltaFila, deltaColumna] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const entradaRamal = `${fila + deltaFila},${columna + deltaColumna}`;
    if (mapaHielo[fila + deltaFila]?.[columna + deltaColumna] !== "0"
      || caminoCorrectoLaberinto.has(entradaRamal)
      || ramalesMedidosLaberinto.has(entradaRamal)) continue;
    const pendientesRamal = [entradaRamal];
    const celdasRamal = new Set([entradaRamal]);
    ramalesMedidosLaberinto.add(entradaRamal);
    while (pendientesRamal.length) {
      const actual = pendientesRamal.shift();
      const [filaActual, columnaActual] = actual.split(",").map(Number);
      for (const [avanceFila, avanceColumna] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const siguiente = `${filaActual + avanceFila},${columnaActual + avanceColumna}`;
        if (mapaHielo[filaActual + avanceFila]?.[columnaActual + avanceColumna] === "0"
          && !caminoCorrectoLaberinto.has(siguiente)
          && !celdasRamal.has(siguiente)) {
          celdasRamal.add(siguiente);
          ramalesMedidosLaberinto.add(siguiente);
          pendientesRamal.push(siguiente);
        }
      }
    }
    extensionesRamalesLaberinto.push(celdasRamal.size);
  }
}
assert.ok(longitudCaminoLaberinto >= 100, `El camino del laberinto debe ser largo; mide ${longitudCaminoLaberinto}`);
assert.ok(
  extensionesRamalesLaberinto.filter((longitud) => longitud >= 8).length >= 6,
  `El laberinto necesita al menos seis rutas falsas largas; tiene ${extensionesRamalesLaberinto.join(", ")}`,
);
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
assert.match(html, /Cristal Glacial Violeta/);
assert.match(css, /\.cristal-panel-glacial \{ filter: hue-rotate\(105deg\)/);
assert.match(app, /mundoCuatroCompletado,/);
assert.match(app, /primerDueloNivorCompletado,/);
assert.match(app, /finalMundoCuatroCompletado[\s\S]*?Mundo 5 · Próximamente/);
assert.match(sw, /CACHE_NAME = `\$\{CACHE_PREFIX\}v211`/);

console.log("World 4 adventure checks passed");
