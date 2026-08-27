const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Puzzles = require("../js/adventure-puzzles.js");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "js", "app.js"), "utf8");
const styles = fs.readFileSync(path.join(root, "css", "styles.css"), "utf8");
const serviceWorker = fs.readFileSync(path.join(root, "sw.js"), "utf8");

const ordenado = Puzzles.crearEstadoOrdenado();
assert.equal(Puzzles.estaOrdenado(ordenado), true);
assert.deepEqual(Puzzles.obtenerMovimientosValidos(ordenado), [5, 7]);

const invalido = Puzzles.moverPieza(ordenado, 0);
assert.equal(invalido.movida, false);
assert.deepEqual(invalido.estado, ordenado);

const valido = Puzzles.moverPieza(ordenado, 7);
assert.equal(valido.movida, true);
assert.equal(valido.estado[7], null);
assert.equal(valido.estado[8], 7);

const valoresAleatorios = [0.1, 0.8, 0.3, 0.65, 0.2, 0.9];
let indiceAleatorio = 0;
const mezclado = Puzzles.crearTableroMezclado(
  16,
  () => valoresAleatorios[indiceAleatorio++ % valoresAleatorios.length],
);
assert.equal(Puzzles.estaOrdenado(mezclado), false);
assert.deepEqual([...mezclado].sort((a, b) => (a ?? 8) - (b ?? 8)), ordenado);

indiceAleatorio = 0;
const secuencia = Puzzles.crearSecuenciaMemoria(
  8,
  4,
  () => valoresAleatorios[indiceAleatorio++ % valoresAleatorios.length],
);
assert.equal(secuencia.length, 8);
assert.equal(secuencia.every((valor) => valor >= 0 && valor < 4), true);
assert.equal(secuencia.every((valor, indice) => indice === 0 || valor !== secuencia[indice - 1]), true);

assert.deepEqual(Puzzles.obtenerTrayectoRecto(1, 4, 8), [1, 2, 3, 4]);
assert.deepEqual(Puzzles.obtenerTrayectoRecto(16, 52, 8), [16, 25, 34, 43, 52]);
assert.deepEqual(Puzzles.obtenerTrayectoRecto(0, 11, 8), []);
assert.equal(Puzzles.sonCeldasAdyacentes(6, 7, 5), true);
assert.equal(Puzzles.sonCeldasAdyacentes(4, 5, 5), false);

assert.match(html, /id="modalPruebaBosque"[\s\S]+id="tableroRamasDeslizante"/);
assert.match(html, /id="escenaMemoriaLobos"[\s\S]+data-lobo="3"/);
assert.match(html, /id="btnProbarPruebaBosque"/);
assert.match(app, /function obtenerPruebaEspecialBosquePendiente\(\)[\s\S]+desafiosCompletados !== 2/);
assert.match(app, /escenario === 0 && mision === 2[\s\S]+return "ramas"/);
assert.match(app, /escenario === 0 && mision === 5[\s\S]+return "lobos"/);
assert.match(app, /escenario === 1 && mision === 2[\s\S]+return "vientos"/);
assert.match(app, /escenario === 1 && mision === 4[\s\S]+return "oasis"/);
assert.match(app, /escenario === 1 && mision === 7[\s\S]+return "espejos"/);
assert.match(app, /function iniciarPuzzleRamasDeslizante\(/);
assert.match(app, /function activarBloqueoTronco\(/);
assert.match(app, /tronco-antiguo-caido-bosque\.png/);
assert.doesNotMatch(app, /rama-frondosa-bosque-/);
assert.match(app, /crearTableroMezclado\(6\)/);
assert.match(app, /Objetivo: 1-2-3 \/ 4-5-6 \/ 7-8-ACÁ/);
assert.match(app, /Las piezas iluminadas son las que podés tocar/);
assert.match(app, /function iniciarPuzzleMemoriaLobos\(/);
assert.match(app, /function completarPruebaEspecialBosque\(/);
assert.match(styles, /\.tablero-ramas-deslizante/);
assert.match(styles, /\.pieza-ramas-deslizante:not\(:disabled\)/);
assert.match(styles, /@keyframes caerArbolSobreSendero/);
assert.match(styles, /\.hoja-impacto-tronco/);
assert.match(styles, /content:"ACÁ"/);
assert.match(styles, /\.escena-memoria-lobos/);
assert.match(styles, /bosque-6-lobos-v2\.png/);
assert.match(styles, /lobo-memoria-1\{left:23\.65%;top:35\.85%\}/);
assert.match(styles, /lobo-memoria-4\{left:62\.4%;top:56\.35%\}/);
assert.match(styles, /\.lobo-memoria:hover,\.lobo-memoria:active\{transform:translate\(-50%,-50%\)\}/);
assert.match(styles, /\.lobo-memoria span\{[^}]+width:7cqw/);
assert.match(styles, /\.lobo-memoria-3 span,\.lobo-memoria-4 span\{width:8\.5cqw\}/);
assert.match(styles, /width:min\(70vw,78vh,610px\);max-height:none/);
assert.match(serviceWorker, /assets\/images\/fondos\/bosque-6-lobos-v2\.png/);
assert.match(serviceWorker, /assets\/images\/elementos\/tronco-antiguo-caido-bosque\.png/);
assert.match(serviceWorker, /js\/adventure-puzzles\.js/);
assert.equal(
  fs.existsSync(path.join(root, "assets", "images", "elementos", "tronco-antiguo-caido-bosque.png")),
  true,
);

console.log("adventure-puzzles: comprobaciones correctas");
