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
assert.match(app, /"campanas-celestes"/);
assert.match(app, /"sellos-aeralis"/);
assert.doesNotMatch(app, /"red-pararrayos"/);
const selectorPuzzles = app.match(/function obtenerTipoPruebaEspecial\(escenario, mision\) \{[\s\S]+?\n\}/)?.[0] || "";
assert.equal((selectorPuzzles.match(/escenario === 2 && mision ===/g) || []).length, 3);
assert.match(selectorPuzzles, /mision === 1\) return "sopa-celeste"/);
assert.match(selectorPuzzles, /mision === 6\) return "campanas-celestes"/);
assert.match(selectorPuzzles, /mision === 8\) return "sellos-aeralis"/);
assert.match(app, /const palabrasSopaCumbres = Object\.freeze/);
for (const palabra of ["NUBE", "VIENTO", "CIELO"]) assert.match(app, new RegExp(`palabra: "${palabra}"`));
assert.match(app, /function validarTrayectoSopaCumbres\(/);
assert.match(app, /const rondasCampanasCumbres = Object\.freeze\(\[/);
assert.match(app, /intercambios: 5, duracionPaso: 650/);
assert.match(app, /intercambios: 7, duracionPaso: 500/);
assert.match(app, /intercambios: 9, duracionPaso: 380/);
assert.match(app, /function prepararRondaCampanasCumbres\(/);
assert.match(app, /async function mezclarCampanasCumbres\(/);
assert.match(app, /function elegirCampanaCumbres\(/);
assert.match(app, /campanaReliquiaCumbres = Math\.floor\(Math\.random\(\) \* 3\)/);
assert.match(app, /completarPruebaEspecialBosque\("campanas-celestes"\)/);
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
assert.match(app, /reproducirCinematicaFinalCumbres\(\)[\s\S]*?const duracionLecturaEscena = 7600/);
assert.match(app, /const esperarLectura = \(milisegundos\) => new Promise[\s\S]*?window\.setTimeout\(resolver, milisegundos\)/);
assert.match(app, /transcurrido < duracionLecturaEscena && !saltar/);
assert.match(app, /transcurrido < duracionLecturaEscena[\s\S]*?await esperarLectura\(paso\)/);
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
assert.match(css, /\.tablero-campanas-cumbres/);
assert.match(css, /\.opcion-campana-cumbres/);
assert.match(css, /\.figura-campana-cumbres/);
assert.match(css, /\.reliquia-campana-cumbres/);
assert.match(app, /const ladoSopaCumbres = 10/);
const bloqueLetrasSopa = app.match(/const letrasSopaCumbres = \[([\s\S]*?)\]\.join\(""\)/)?.[1] || "";
const letrasSopaUnica = [...bloqueLetrasSopa.matchAll(/"([A-ZÑ]+)"/g)]
  .map((coincidencia) => coincidencia[1])
  .join("");
assert.equal(letrasSopaUnica.length, 100, "la sopa celeste debe conservar sus 100 letras");
function contarPalabraSopa(palabra) {
  let apariciones = 0;
  for (let indice = 0; indice < letrasSopaUnica.length; indice += 1) {
    const fila = Math.floor(indice / 10);
    const columna = indice % 10;
    for (const deltaFila of [-1, 0, 1]) {
      for (const deltaColumna of [-1, 0, 1]) {
        if (deltaFila === 0 && deltaColumna === 0) continue;
        const texto = [...palabra].map((_, paso) => {
          const nuevaFila = fila + deltaFila * paso;
          const nuevaColumna = columna + deltaColumna * paso;
          if (nuevaFila < 0 || nuevaFila >= 10 || nuevaColumna < 0 || nuevaColumna >= 10) return "";
          return letrasSopaUnica[nuevaFila * 10 + nuevaColumna];
        }).join("");
        if (texto === palabra) apariciones += 1;
      }
    }
  }
  return apariciones;
}
for (const palabra of ["NUBE", "VIENTO", "CIELO"]) {
  assert.equal(contarPalabraSopa(palabra), 1, `${palabra} debe aparecer una sola vez en la sopa`);
}
assert.match(css, /\.tablero-sopa-cumbres\s*\{[\s\S]*?grid-template-columns:\s*repeat\(10, 1fr\)/);
assert.doesNotMatch(css, /\.tablero-red-cumbres|\.celda-red-cumbres/);
assert.match(css, /left:\s*calc\(\(var\(--posicion-campana\) \* 33\.333%\) \+ 16\.666%\)/);
assert.match(css, /left var\(--duracion-mezcla\)/);
assert.match(css, /\.opcion-campana-cumbres\.revelando \.figura-campana-cumbres/);
assert.match(app, /botonesPuzzleCumbres\.forEach\(\(boton\) => \(boton\.disabled = true\)\)/);
assert.match(app, /¡Encontraste la chispa en las tres rondas y debilitaste la tormenta!/);
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
assert.match(css, /#cristalPanelCumbres\s*\{[\s\S]*?width:\s*34px[\s\S]*?height:\s*34px/);
assert.match(css, /@media \(max-width: 640px\)[\s\S]*?#cristalPanelCumbres\s*\{\s*width:\s*29px;\s*height:\s*29px/);
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
assert.match(css, /\.nubelun-cumbres\s*\{[\s\S]*?left:\s*32%[\s\S]*?bottom:\s*29%[\s\S]*?opacity:\s*1/);
assert.match(app, /const nubelunEnMovil = faunaMision\.clase === "nubelun-cumbres"[\s\S]*?matchMedia\("\(max-width: 640px\)"\)\.matches/);
assert.match(app, /const usarCuadrosAnimados = Boolean\(faunaMision\.cuadros\) && !nubelunEnMovil/);
assert.match(app, /document\.createElement\(usarCuadrosAnimados \? "span" : "img"\)/);
assert.match(app, /if \(nubelunEnMovil && faunaMision\.cuadros\)[\s\S]*?imagen\.decode\(\)\.catch[\s\S]*?setInterval[\s\S]*?criatura\.src = faunaMision\.cuadros\[indiceCuadro\][\s\S]*?, 360\)/);
assert.match(css, /\.nubelun-cumbres:not\(\.fauna-cumbres-animada\),\s*\.nubelun-cumbres \.fauna-cumbres-cuadro\s*\{[\s\S]*?saturate\(1\.48\)/);
assert.match(css, /@media \(max-width: 640px\)[\s\S]*?\.nubelun-cumbres\s*\{\s*left:\s*20%;\s*bottom:\s*42%;\s*width:\s*7%/);
assert.match(css, /@media \(max-width: 640px\)[\s\S]*?\.nubelun-cumbres\.fauna-cumbres-animada \.fauna-cumbres-cuadro-2\s*\{[\s\S]*?display:\s*none/);
assert.match(css, /@media \(max-width: 640px\) and \(orientation: portrait\)[\s\S]*?\.cinematica-final-cumbres\s*\{[\s\S]*?rotate\(90deg\)/);
assert.match(css, /@media \(max-width: 640px\) and \(orientation: portrait\)[\s\S]*?\.cinematica-aeralis\s*\{[\s\S]*?height:\s*88%[\s\S]*?max-width:\s*42%/);
console.log("adventure-world3-complete: comprobaciones correctas");
