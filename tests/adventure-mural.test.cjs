const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "js", "app.js"), "utf8");
const styles = fs.readFileSync(path.join(root, "css", "styles.css"), "utf8");
const serviceWorker = fs.readFileSync(path.join(root, "sw.js"), "utf8");
const mural = path.join(root, "assets", "images", "elements", "mural-dragon-bosque.png");

assert.match(html, /id="modalMuralSantuario"[\s\S]+id="tableroMuralSantuario"[\s\S]+id="bandejaMuralSantuario"/);
assert.match(html, /id="btnAyudaMuralSantuario"/);
assert.match(html, /id="btnProbarMuralSantuario"/);
assert.match(app, /function abrirRompecabezasMuralSantuario\(/);
assert.match(app, /function iniciarArrastrePiezaMural\(/);
assert.match(app, /function intentarEncajarPiezaMural\(/);
assert.match(app, /const completado = await abrirRompecabezasMuralSantuario\(\)/);
assert.match(app, /muralSantuarioCompletado[\s\S]+guardarProgreso\(\)/);
assert.match(app, /void completarSantuarioConMural\(\)/);
assert.match(styles, /mural-dragon-bosque\.png/);
assert.match(styles, /@keyframes encajarPiezaMural/);
assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
assert.match(serviceWorker, /aventura-palabras-runtime-v88/);
assert.match(serviceWorker, /mural-dragon-bosque\.png/);
assert.equal(fs.existsSync(mural), true, "Falta el arte del mural del dragón");

console.log("adventure-mural: comprobaciones correctas");
