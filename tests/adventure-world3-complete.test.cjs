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
assert.match(app, /const ladoRedCumbres = 8/);
assert.match(app, /cian:\s*\[25, 30\][\s\S]+violeta:\s*\[2, 58\][\s\S]+dorado:\s*\[5, 61\]/);
assert.doesNotMatch(app, /const relevosRedCumbres|const tormentasRedCumbres/);
assert.match(app, /Los caminos directos se chocan/);
const rutasEntrelazadas = [
  [25, 26, 27, 28, 29, 30],
  [2, 1, 0, 8, 16, 24, 32, 33, 41, 49, 57, 58],
  [5, 6, 7, 15, 23, 31, 39, 38, 46, 54, 62, 61],
];
const celdasRutasEntrelazadas = rutasEntrelazadas.flat();
assert.equal(new Set(celdasRutasEntrelazadas).size, celdasRutasEntrelazadas.length);
for (const ruta of rutasEntrelazadas) {
  for (let indice = 1; indice < ruta.length; indice += 1) {
    const diferencia = Math.abs(ruta[indice] - ruta[indice - 1]);
    assert.ok(diferencia === 8 || (diferencia === 1 && Math.floor(ruta[indice] / 8) === Math.floor(ruta[indice - 1] / 8)));
  }
}
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
assert.doesNotMatch(giroSellos, /classList\.add\("pista-correcta"/);
assert.match(giroSellos, /classList\.remove\("pista-correcta"/);
assert.match(app, /posicionesCorrectas[\s\S]+classList\.add\("pista-correcta"\)[\s\S]+classList\.remove\("pista-correcta"\)/);
assert.match(app, /nimbus_cumbres: \{/);
assert.match(app, /rival: "dragon"/);
assert.match(app, /mundoTresCompletado = true/);
assert.match(app, /cristalesObtenidos = Math\.max\(cristalesObtenidos, 3\)/);
assert.match(app, /guardarDesbloqueoNimbus\(\)/);
assert.match(app, /reproducirCinematicaFinalCumbres\(\)/);
assert.match(app, /musicaCinematicaFinalMundo3[\s\S]*?cinematica-final-mundo3\.mp3/);
assert.match(app, /reproducirCinematicaFinalCumbres\(\)[\s\S]*?reproducirMusicaCinematica\([\s\S]*?musicaCinematicaFinalMundo3/);
assert.match(app, /reproducirCinematicaFinalCumbres\(\)[\s\S]*?finally \{[\s\S]*?detenerMusicaCinematica\(musicaCinematicaFinalMundo3, 0\.58\)/);
assert.match(sw, /assets\/sounds\/cinematica-final-mundo3\.mp3/);
assert.match(html, /id="ranuraCristalCumbres"/);
assert.match(html, /<strong>Nimbus<\/strong>/);
assert.match(css, /\.escenario\.escenario-cumbres/);
assert.match(css, /\.nimbus-cumbres\s*\{[\s\S]*?scale:\s*-1 1/);
assert.match(css, /\.cinematica-final-cumbres/);
assert.match(app, /cinematica-cumbres-ambiente/);
assert.match(app, /classList\.toggle\("plano-ilustrado", Boolean\(escena\.imagen\)\)/);
assert.match(app, /02-aren-sube-aeralis-v2\.png/);
assert.match(app, /classList\.add\("cambiando-plano"\)/);
assert.match(app, /classList\.remove\("cambiando-plano"\)/);
assert.match(css, /\.cinematica-final-cumbres\.cambiando-plano/);
assert.match(css, /plano-ilustrado \.cinematica-cumbres-fondo\s*\{[\s\S]*?object-fit:\s*contain/);
assert.match(css, /\.tablero-sopa-cumbres/);
assert.match(css, /\.tablero-red-cumbres/);
assert.match(css, /grid-template-columns:\s*repeat\(8, 1fr\)/);
assert.doesNotMatch(css, /\.celda-red-cumbres\.(?:tormenta|relevo)/);
assert.match(css, /\.anillo-sello-aeralis/);
assert.match(css, /\.btn-comprobar-sello-aeralis/);
assert.match(css, /\.anillo-sello-aeralis\.pista-correcta/);
assert.match(css, /@keyframes destelloPistaSelloAeralis/);
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
  "02-aren-sube-aeralis-v2.png",
  "03-vuelo-mundo-hielo-v1.png",
  "04-llegada-mundo-hielo-v1.png",
]) {
  assert.match(app, new RegExp(imagen.replace(".", "\\.")));
  assert.match(sw, new RegExp(imagen.replace(".", "\\.")));
  assert.ok(fs.existsSync(path.join(root, "assets", "images", "cinematicas", "cumbres-final", imagen)));
}
assert.match(app, /No hará falta abrir otro portal/);
assert.match(app, /MUNDO 4 · Aeralis deja a Aren/);
assert.match(app, /classList\.toggle\("historia-cumbres", esHistoriaCumbres\)/);
assert.match(css, /\.modal-historia\.historia-cumbres/);
assert.match(css, /@keyframes aparecerPlacaCristalCumbres/);
assert.match(app, /presentacion-mision-cumbres-v1\.png/);
assert.match(sw, /presentacion-mision-cumbres-v1\.png/);
assert.ok(fs.existsSync(path.join(root, "assets", "images", "ui", "presentacion-mision-cumbres-v1.png")));

for (const criatura of [
  ["nubelun-cumbres-v1.png", "nubelun-cumbres", 0],
  ["velario-cumbres-v1.png", "velario-cumbres", 1],
  ["lumiri-cumbres-v1.png", "lumiri-cumbres", 4],
]) {
  const [imagen, clase, mision] = criatura;
  assert.match(app, new RegExp(`${mision}: \\{[\\s\\S]*?${clase}[\\s\\S]*?${imagen.replace(".", "\\.")}`));
  assert.match(css, new RegExp(`\\.${clase}\\s*\\{`));
  assert.match(sw, new RegExp(imagen.replace(".", "\\.")));
  assert.ok(fs.existsSync(path.join(root, "assets", "images", "ambiente", "cumbres", imagen)));
}
assert.match(css, /\.historia-cumbres \.pergamino-mision\s*\{[\s\S]*?background:[\s\S]*?rgba\(255, 255, 250, \.99\)/);
assert.match(css, /@keyframes nubelunCamina/);
assert.match(css, /@keyframes velarioVuela/);
assert.match(css, /@keyframes lumiriRespira/);
for (const imagen of ["nubelun-cumbres-paso-v2.png", "velario-cumbres-aleteo-v2.png"]) {
  assert.match(app, new RegExp(imagen.replace(".", "\\.")));
  assert.match(sw, new RegExp(imagen.replace(".", "\\.")));
  assert.ok(fs.existsSync(path.join(root, "assets", "images", "ambiente", "cumbres", imagen)));
}

for (const imagen of [
  "nubelun-cumbres-v1.png",
  "nubelun-cumbres-paso-v2.png",
  "velario-cumbres-v1.png",
  "velario-cumbres-aleteo-v2.png",
]) {
  const ruta = path.join(root, "assets", "images", "ambiente", "cumbres", imagen);
  assert.equal(fs.readFileSync(ruta)[25], 6, `${imagen} debe tener transparencia RGBA`);
}
assert.match(css, /\.nubelun-cumbres\s*\{[\s\S]*?left:\s*50%[\s\S]*?bottom:\s*20%[\s\S]*?opacity:\s*1/);
assert.match(css, /@media \(max-width: 640px\)[\s\S]*?\.nubelun-cumbres\s*\{\s*left:\s*45%;\s*bottom:\s*16%/);
assert.match(css, /@media \(max-width: 640px\) and \(orientation: portrait\)[\s\S]*?\.cinematica-final-cumbres\s*\{[\s\S]*?rotate\(90deg\)/);
console.log("adventure-world3-complete: comprobaciones correctas");
