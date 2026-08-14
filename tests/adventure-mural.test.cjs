const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "js", "app.js"), "utf8");
const styles = fs.readFileSync(path.join(root, "css", "styles.css"), "utf8");
const serviceWorker = fs.readFileSync(path.join(root, "sw.js"), "utf8");
const mural = path.join(root, "assets", "images", "elements", "mural-dragon-bosque.png");
const planosDragon = [
  "dragon-guardian-rompe-mural.png",
  "dragon-guardian-despierto.png",
  "dragon-guardian-entrega-cristal.png",
];

assert.match(html, /id="modalMuralSantuario"[\s\S]+id="tableroMuralSantuario"[\s\S]+id="bandejaMuralSantuario"/);
assert.match(html, /id="btnAyudaMuralSantuario"/);
assert.match(html, /id="btnRetirarPiezaMural"/);
assert.match(html, /id="btnProbarMuralSantuario"/);
assert.match(app, /function abrirRompecabezasMuralSantuario\(/);
assert.match(app, /function iniciarArrastrePiezaMural\(/);
assert.match(app, /function crearFantasmaArrastreMural\(/);
assert.match(app, /function limpiarFantasmaArrastreMural\(/);
assert.match(app, /if \(soltoEnBandeja && origen\)/);
assert.doesNotMatch(app, /document\.body\.appendChild\(pieza\)/);
assert.match(app, /function intentarEncajarPiezaMural\(/);
assert.match(app, /colocarPieza: new Audio\("assets\/sounds\/colocar-piezas\.mp3"\)/);
assert.match(app, /reproducirSonido\("colocarPieza"\);[\s\S]+evaluarSolucionMuralSantuario\(\)/);
assert.match(app, /function retirarPiezaMuralSantuario\(/);
assert.match(app, /function evaluarSolucionMuralSantuario\(/);
assert.match(app, /El mural aún no despierta/);
assert.doesNotMatch(app, /Ese fragmento no encaja ahí/);
assert.match(app, /const ocupante = espacio\.querySelector/);
assert.match(app, /origen\.appendChild\(ocupante\)/);
assert.match(app, /function ejecutarDespertarDragonSantuario\(/);
assert.match(app, /GUARDIÁN DEL BOSQUE/);
assert.match(app, /const completado = await abrirRompecabezasMuralSantuario\(\)/);
assert.match(app, /muralSantuarioCompletado[\s\S]+guardarProgreso\(\)/);
assert.match(app, /void completarSantuarioConMural\(\)/);
assert.match(styles, /mural-dragon-bosque\.png/);
assert.match(styles, /@keyframes encajarPiezaMural/);
assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
assert.match(serviceWorker, /aventura-palabras-runtime-v91/);
assert.match(serviceWorker, /assets\/sounds\/colocar-piezas\.mp3/);
assert.match(serviceWorker, /mural-dragon-bosque\.png/);
assert.equal(fs.existsSync(mural), true, "Falta el arte del mural del dragón");
planosDragon.forEach((archivo) => {
  assert.match(serviceWorker, new RegExp(archivo.replace(".", "\\.")));
  assert.equal(
    fs.existsSync(path.join(root, "assets", "images", "elements", archivo)),
    true,
    `Falta el plano ${archivo}`,
  );
});

console.log("adventure-mural: comprobaciones correctas");
