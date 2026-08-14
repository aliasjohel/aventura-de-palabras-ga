const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const pwa = fs.readFileSync(path.join(root, "js", "pwa.js"), "utf8");
const worker = fs.readFileSync(path.join(root, "sw.js"), "utf8");

assert.match(html, /id="progresoActualizacionPwa"/);
assert.match(html, /id="barraActualizacionPwa"[\s\S]+max="100"/);
assert.match(html, /id="porcentajeActualizacionPwa"/);
assert.match(pwa, /PWA_INSTALL_PROGRESS/);
assert.match(pwa, /actualizarBarraDescarga/);
assert.match(pwa, /La descarga llegó al 100%/);
assert.match(worker, /function instalarRecursosConProgreso/);
assert.match(worker, /informarProgresoInstalacion\(completados, total\)/);
assert.doesNotMatch(worker, /cache\.addAll/);

const sonidos = fs.readdirSync(path.join(root, "assets", "sounds"));
sonidos.forEach((archivo) => {
  assert.match(worker, new RegExp(`assets/sounds/${archivo.replace(".", "\\.")}`));
});

console.log("pwa-update-progress: comprobaciones correctas");
