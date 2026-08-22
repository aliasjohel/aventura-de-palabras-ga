const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const raiz = path.join(__dirname, "..");
const app = fs.readFileSync(path.join(raiz, "js", "app.js"), "utf8");
const estilos = fs.readFileSync(path.join(raiz, "css", "styles.css"), "utf8");
const html = fs.readFileSync(path.join(raiz, "index.html"), "utf8");
const serviceWorker = fs.readFileSync(path.join(raiz, "sw.js"), "utf8");
const soporte = path.join(
  raiz,
  "assets",
  "images",
  "ui",
  "presentacion-mision-piedra-desierto-v1.png",
);

assert.match(app, /const historiaDesierto = \[[\s\S]+Más allá del portal/);
assert.match(app, /El paso mágico se cierra detrás de él mientras el viento borra sus primeras huellas/);
assert.match(app, /function actualizarLlegadaDesiertoMision\(\)/);
assert.match(app, /function activarLlegadaDesiertoMision\(\)/);
assert.match(app, /iniciarMisionAventura\(\)\.then\(\(\) => \{\s*mostrarHistoriaMision\(\{ misionYaCargada: true \}\)/);
assert.match(app, /capa-llegada-desierto/);
assert.match(app, /presentacion-mision-piedra-desierto-v1\.png/);
assert.match(estilos, /\.modal-historia\.historia-desierto/);
assert.match(estilos, /\.portal-llegada-desierto/);
assert.match(estilos, /@keyframes cerrarPortalLlegadaDesierto/);
assert.match(estilos, /@keyframes marcarYBorrarHuellaDesierto/);
assert.match(html, /id="imagenSoporteMision"/);
assert.match(serviceWorker, /presentacion-mision-piedra-desierto-v1\.png/);
assert.ok(fs.existsSync(soporte), "Debe existir el soporte narrativo de piedra");
assert.ok(fs.statSync(soporte).size > 100_000, "El soporte de piedra no debe estar vacío");

console.log("adventure-world2-mission1: comprobaciones correctas");
