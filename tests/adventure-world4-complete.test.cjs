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
assert.match(selectorPuzzles, /mision === 1\) return "placas-hielo"/);
assert.match(selectorPuzzles, /mision === 7\) return "corazon-termico"/);
assert.match(app, /const rutasPlacasHielo = Object\.freeze/);
assert.match(app, /function iniciarPlacasHielo\(/);
assert.match(app, /function iniciarCorazonTermico\(/);
assert.match(app, /completarPruebaEspecialBosque\("placas-hielo"\)/);
assert.match(app, /completarPruebaEspecialBosque\("corazon-termico"\)/);
assert.match(css, /\.tablero-placas-hielo/);
assert.match(css, /\.maquina-corazon-termico/);

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
assert.match(sw, /CACHE_NAME = `\$\{CACHE_PREFIX\}v199`/);

console.log("World 4 adventure checks passed");
