const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const raiz = path.join(__dirname, "..");
const app = fs.readFileSync(path.join(raiz, "js", "app.js"), "utf8");
const estilos = fs.readFileSync(path.join(raiz, "css", "styles.css"), "utf8");
const html = fs.readFileSync(path.join(raiz, "index.html"), "utf8");

assert.match(app, /titulo: "El Guardián de la Luna"/);
assert.match(app, /async function ejecutarEncuentroHombreLoboMision\(fase = "desafio"\)/);
assert.match(app, /figura\.src = fase === "victoria"[\s\S]+srcHombreLoboAullidoVersus[\s\S]+srcHombreLoboHumanoVersus/);
assert.match(app, /relato\.textContent = "Superaste la prueba\."/);
assert.doesNotMatch(app, /Superaste las miradas/);
assert.match(app, /figura\.src = srcHombreLoboTransformacionVersus/);
assert.match(app, /figura\.src = srcHombreLoboBaseVersus/);
assert.match(app, /if \(tipo === "lobos"\)[\s\S]+ejecutarEncuentroHombreLoboMision/);
assert.match(app, /obtenerPruebaEspecialBosquePendiente\(\)[\s\S]+misionActual === 5[\s\S]+desafiosCompletados === 0/);
assert.match(app, /iniciarDueloAventura\("hombre_lobo"\)/);
assert.match(app, /hombreLoboDescubierto = true/);
assert.match(app, /hombreLoboDescubierto,/);
assert.match(estilos, /\.encuentro-hombre-lobo-mision/);

assert.match(app, /const clavePersonajesDesbloqueados = "personajesDesbloqueadosAventuraGA"/);
assert.match(app, /function personajeDisponibleVersus\(personaje\)[\s\S]+if \(modoPruebasActivo\) return true/);
assert.match(app, /if \(personaje === "guardiana"\) return guardianaDesbloqueada/);
assert.match(app, /async function presentarDesbloqueoGuardianaBosque\(\)/);
assert.match(app, /guardarDesbloqueoGuardiana\(\)/);
assert.match(app, /if \(escenarioActual >= 1 \|\| maximoEscenarioDesbloqueado >= 1\)[\s\S]+guardarDesbloqueoGuardiana/);
assert.match(app, /await presentarDesbloqueoGuardianaBosque\(\)/);
assert.match(
  app,
  /await presentarDesbloqueoGuardianaBosque\(\);\s*desafiosCompletados = desafiosPorMision - 1;\s*portalAbierto = true;/,
  "la victoria ante la Guardiana debe completar la misión antes de abrir el portal",
);
assert.match(app, /function obtenerDueloAventuraPendiente\(\)[\s\S]+misionActual === 9[\s\S]+return "guardiana"/);
assert.match(app, /async function presentarDesafioGuardianaBosque\(\)/);
assert.match(app, /async function presentarDueloAventura\(tipo\)[\s\S]+await esperarCierreHistoriaMision\(\)[\s\S]+presentarDesafioGuardianaBosque/);
assert.match(app, /function esperarCierreHistoriaMision\(\)[\s\S]+MutationObserver/);
assert.match(app, /const escenasDesafioGuardianaBosque = Object\.freeze\(\[/);
assert.match(app, /01-encuentro-guardiana-v1\.png/);
assert.match(app, /02-desafio-guardiana-v1\.png/);
assert.match(app, /Una voz entre las hojas/);
assert.match(app, /Demostrá que podés vencerme en un duelo de palabras/);
assert.match(app, /continuar\.textContent = indice === escenasDesafioGuardianaBosque\.length - 1[\s\S]+Aceptar desafío/);
assert.match(estilos, /\.cinematica-desafio-guardiana/);
assert.match(estilos, /\.imagen-cinematica-desafio-guardiana[\s\S]+object-fit: contain/);
assert.equal(
  fs.existsSync(path.join(raiz, "assets", "images", "cinematicas", "bosque-mision-10", "01-encuentro-guardiana-v1.png")),
  true,
);
assert.equal(
  fs.existsSync(path.join(raiz, "assets", "images", "cinematicas", "bosque-mision-10", "02-desafio-guardiana-v1.png")),
  true,
);
assert.match(app, /guardiana:[\s\S]+bosque-10-apagado\.png/);
assert.match(app, /if \(dueloAventuraActivo\)[\s\S]+await mostrarAnuncioFinVersus\(palabraPerdida\)[\s\S]+mostrarResultadoPartidaVersus/);
assert.match(app, /portalAbierto = true;[\s\S]+guardarProgreso\(\);[\s\S]+await completarAperturaPortal\(\)/);
assert.doesNotMatch(
  app.slice(app.indexOf("async function ejecutarCinematicaFinalPortal"), app.indexOf("function limpiarEstadoExploradorPortal")),
  /presentarDesbloqueoGuardianaBosque/,
);
assert.match(estilos, /\.encuentro-guardiana-bosque/);
assert.match(estilos, /pantalla-versus\.duelo-aventura[\s\S]+herramientas-pruebas-versus/);
assert.match(estilos, /\.tarjeta-personaje-versus\.bloqueada/);
assert.match(html, /id="btnProbarEscenaPersonaje"/);
assert.match(app, /btnProbarEscenaPersonaje\.addEventListener/);

console.log("adventure-world1-characters: comprobaciones correctas");
