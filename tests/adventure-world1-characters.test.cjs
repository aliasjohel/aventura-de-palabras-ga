const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const raiz = path.join(__dirname, "..");
const app = fs.readFileSync(path.join(raiz, "js", "app.js"), "utf8");
const estilos = fs.readFileSync(path.join(raiz, "css", "styles.css"), "utf8");
const html = fs.readFileSync(path.join(raiz, "index.html"), "utf8");

assert.match(app, /titulo: "El Guardián de la Luna"/);
assert.match(app, /async function ejecutarEncuentroHombreLoboMision\(\)/);
assert.match(app, /figura\.src = srcHombreLoboHumanoVersus/);
assert.match(app, /figura\.src = srcHombreLoboTransformacionVersus/);
assert.match(app, /figura\.src = srcHombreLoboBaseVersus/);
assert.match(app, /if \(tipo === "lobos"\)[\s\S]+ejecutarEncuentroHombreLoboMision/);
assert.match(estilos, /\.encuentro-hombre-lobo-mision/);

assert.match(app, /const clavePersonajesDesbloqueados = "personajesDesbloqueadosAventuraGA"/);
assert.match(app, /function personajeDisponibleVersus\(personaje\)[\s\S]+if \(modoPruebasActivo\) return true/);
assert.match(app, /if \(personaje === "guardiana"\) return guardianaDesbloqueada/);
assert.match(app, /async function presentarDesbloqueoGuardianaBosque\(\)/);
assert.match(app, /guardarDesbloqueoGuardiana\(\)/);
assert.match(app, /if \(escenarioActual >= 1 \|\| maximoEscenarioDesbloqueado >= 1\)[\s\S]+guardarDesbloqueoGuardiana/);
assert.match(app, /await presentarDesbloqueoGuardianaBosque\(\)/);
assert.match(estilos, /\.encuentro-guardiana-bosque/);
assert.match(estilos, /\.tarjeta-personaje-versus\.bloqueada/);
assert.match(html, /id="btnProbarEscenaPersonaje"/);
assert.match(app, /btnProbarEscenaPersonaje\.addEventListener/);

console.log("adventure-world1-characters: comprobaciones correctas");
