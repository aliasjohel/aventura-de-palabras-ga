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
assert.match(app, /"puente-celeste"/);
assert.match(app, /"campanas-celestes"/);
assert.match(app, /"pararrayos-celestes"/);
assert.match(app, /"sellos-aeralis"/);
assert.match(app, /nimbus_cumbres: \{/);
assert.match(app, /rival: "dragon"/);
assert.match(app, /mundoTresCompletado = true/);
assert.match(app, /cristalesObtenidos = Math\.max\(cristalesObtenidos, 3\)/);
assert.match(app, /guardarDesbloqueoNimbus\(\)/);
assert.match(app, /reproducirCinematicaFinalCumbres\(\)/);
assert.match(html, /id="ranuraCristalCumbres"/);
assert.match(html, /<strong>Nimbus<\/strong>/);
assert.match(css, /\.escenario\.escenario-cumbres/);
assert.match(css, /\.cinematica-final-cumbres/);

for (let mission = 1; mission <= 10; mission += 1) {
  assert.match(sw, new RegExp(`cumbres-${mission}\\.png`));
  assert.ok(fs.existsSync(path.join(root, "assets", "images", "fondos", `cumbres-${mission}.png`)));
}
assert.ok(fs.existsSync(path.join(root, "assets", "images", "personajes", "aventura", "aeralis-liberada-v1.png")));
assert.ok(fs.existsSync(path.join(root, "assets", "images", "elements", "cristal-celeste-v1.png")));

console.log("adventure-world3-complete: comprobaciones correctas");
