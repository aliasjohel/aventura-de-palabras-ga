const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "js", "app.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "css", "styles.css"), "utf8");
const sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");

assert.match(app, /nombre: "☁️ Cumbres Celestes"/);
assert.match(app, /const historiaCumbres = \[/);
assert.equal((app.match(/fondos: \["cumbres-\d+\.png"\]/g) || []).length, 10);
assert.match(app, /"sopa-celeste"/);
assert.match(app, /"red-pararrayos"/);
assert.match(app, /"sellos-aeralis"/);
assert.doesNotMatch(app, /"campanas-celestes"/);
const selectorPuzzles = app.match(/function obtenerTipoPruebaEspecial\(escenario, mision\) \{[\s\S]+?\n\}/)?.[0] || "";
assert.equal((selectorPuzzles.match(/escenario === 2 && mision ===/g) || []).length, 3);
assert.match(selectorPuzzles, /mision === 1\) return "sopa-celeste"/);
assert.match(selectorPuzzles, /mision === 6\) return "red-pararrayos"/);
assert.match(selectorPuzzles, /mision === 8\) return "sellos-aeralis"/);
assert.match(app, /const palabrasSopaCumbres = Object\.freeze/);
for (const palabra of ["NUBE", "VIENTO", "CIELO"]) assert.match(app, new RegExp(`palabra: "${palabra}"`));
assert.match(app, /function validarTrayectoSopaCumbres\(/);
assert.match(app, /function extenderCaminoRedCumbres\(/);
assert.match(app, /const ladoRedCumbres = 6/);
assert.match(app, /const relevosRedCumbres = Object\.freeze/);
assert.match(app, /const tormentasRedCumbres = new Set/);
assert.match(app, /cian:\s*\[0, 17\][\s\S]+violeta:\s*\[5, 3\][\s\S]+dorado:\s*\[12, 35\]/);
assert.match(app, /cian:\s*14[\s\S]+violeta:\s*10[\s\S]+dorado:\s*21/);
assert.match(app, /todavía no pasó por su torre/);
assert.match(app, /const rondasSellosAeralis = Object\.freeze/);
for (const palabra of ["AIRE", "NUBE", "LIBRE"]) assert.match(app, new RegExp(`palabra: "${palabra}"`));
assert.match(app, /function girarAnilloSelloAeralis\(/);
assert.match(app, /function comprobarSelloAeralis\(/);
assert.match(app, /btn-comprobar-sello-aeralis/);
const giroSellos = app.slice(
  app.indexOf("function girarAnilloSelloAeralis"),
  app.indexOf("function comprobarSelloAeralis"),
);
assert.doesNotMatch(giroSellos, /classList\.toggle\("correcto"/);
assert.match(app, /nimbus_cumbres: \{/);
assert.match(app, /rival: "dragon"/);
assert.match(app, /mundoTresCompletado = true/);
assert.match(app, /cristalesObtenidos = Math\.max\(cristalesObtenidos, 3\)/);
assert.match(app, /guardarDesbloqueoNimbus\(\)/);
assert.match(app, /reproducirCinematicaFinalCumbres\(\)/);
assert.match(html, /id="ranuraCristalCumbres"/);
assert.match(html, /<strong>Nimbus<\/strong>/);
assert.match(css, /\.escenario\.escenario-cumbres/);
assert.match(css, /\.nimbus-cumbres\s*\{[\s\S]*?scale:\s*-1 1/);
assert.match(css, /\.cinematica-final-cumbres/);
assert.match(css, /\.tablero-sopa-cumbres/);
assert.match(css, /\.tablero-red-cumbres/);
assert.match(css, /grid-template-columns:\s*repeat\(6, 1fr\)/);
assert.match(css, /\.celda-red-cumbres\.tormenta/);
assert.match(css, /\.anillo-sello-aeralis/);
assert.match(css, /\.btn-comprobar-sello-aeralis/);
assert.match(css, /@keyframes quebrarSelloAeralis/);
assert.match(app, /Aren, un joven explorador/);
assert.match(app, /nombre: "Aren"/);
assert.match(html, /<strong>Aren<\/strong>/);

for (let mission = 1; mission <= 10; mission += 1) {
  assert.match(sw, new RegExp(`cumbres-${mission}\\.png`));
  assert.ok(fs.existsSync(path.join(root, "assets", "images", "fondos", `cumbres-${mission}.png`)));
}
assert.ok(fs.existsSync(path.join(root, "assets", "images", "personajes", "aventura", "aeralis-liberada-v1.png")));
assert.ok(fs.existsSync(path.join(root, "assets", "images", "elements", "cristal-celeste-v1.png")));
for (const imagen of [
  "01-aeralis-invita-aren-v1.png",
  "02-aren-sube-aeralis-v1.png",
  "03-vuelo-mundo-hielo-v1.png",
  "04-llegada-mundo-hielo-v1.png",
]) {
  assert.match(app, new RegExp(imagen.replace(".", "\\.")));
  assert.match(sw, new RegExp(imagen.replace(".", "\\.")));
  assert.ok(fs.existsSync(path.join(root, "assets", "images", "cinematicas", "cumbres-final", imagen)));
}
assert.match(app, /No hará falta abrir otro portal/);
assert.match(app, /MUNDO 4 · Aeralis deja a Aren/);

console.log("adventure-world3-complete: comprobaciones correctas");
