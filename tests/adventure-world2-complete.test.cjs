const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const raiz = path.join(__dirname, "..");
const app = fs.readFileSync(path.join(raiz, "js", "app.js"), "utf8");
const estilos = fs.readFileSync(path.join(raiz, "css", "styles.css"), "utf8");
const html = fs.readFileSync(path.join(raiz, "index.html"), "utf8");
const sw = fs.readFileSync(path.join(raiz, "sw.js"), "utf8");

for (let mision = 1; mision <= 10; mision += 1) {
  const nombre = `desierto-${mision}.png`;
  const fondo = path.join(raiz, "assets", "images", "fondos", nombre);
  assert.ok(fs.existsSync(fondo), `Falta el fondo ${nombre}`);
  assert.ok(fs.statSync(fondo).size > 500_000, `${nombre} parece incompleto`);
  assert.match(app, new RegExp(nombre.replace(".", "\\.")));
}

for (const titulo of [
  "Más allá del portal",
  "La tormenta sin camino",
  "Las ruinas de los cuatro vientos",
  "La sombra bajo las dunas",
  "El oasis imposible",
  "El secreto de Zafir",
  "El Devoradunas",
  "El templo enterrado",
  "La cámara del sol",
  "El Cristal Dorado",
]) {
  assert.match(app, new RegExp(titulo));
}

for (const tipo of ["vientos", "oasis", "espejos"]) {
  assert.match(app, new RegExp(`return "${tipo}"`));
}

for (const id of [
  "puzzleVientosDesierto",
  "puzzleOasisDesierto",
  "puzzleEspejosDesierto",
]) {
  assert.match(html, new RegExp(`id="${id}"`));
}

for (const criatura of ["emerge", "persigue", "pacifico"]) {
  const nombre = `devoradunas-${criatura}-v1.png`;
  const archivo = path.join(
    raiz,
    "assets",
    "images",
    "personajes",
    "aventura",
    nombre,
  );
  assert.ok(fs.existsSync(archivo), `Falta ${nombre}`);
  assert.match(app, new RegExp(nombre.replace(".", "\\.")));
  assert.match(sw, new RegExp(nombre.replace(".", "\\.")));
}

assert.match(app, /mago-base\.png/);
assert.match(app, /mago_desierto:\s*{[\s\S]*escenario: 1,[\s\S]*mision: 9,[\s\S]*rival: "mago"/);
assert.match(app, /function obtenerDueloAventuraPendiente\(\)[\s\S]*return "mago_desierto"/);
assert.match(app, /async function presentarDesafioMagoDesierto\(\)/);
assert.match(app, /async function reproducirCinematicaFinalDesierto\(\)/);
assert.match(app, /reproducirCinematicaFinalDesierto\(\)[\s\S]+reproducirMusicaCinematica\([\s\S]+musicaSegundoCristal/);
assert.match(app, /esperarMovimiento\(duracionPlanoCinematicaFinalDesierto\)/);
assert.match(app, /reproducirCinematicaFinalDesierto\(\)[\s\S]+finally \{[\s\S]+detenerMusicaCinematica\(musicaSegundoCristal, 0\.52\)/);
assert.match(app, /async function presentarDesbloqueoMagoDesierto\(\)/);
assert.match(app, /if \(personaje === "mago"\) return magoDesbloqueado/);
assert.match(app, /guardarDesbloqueoMago\(\)/);
assert.match(app, /Zafir te espera para la prueba final del Cristal Dorado/);
assert.doesNotMatch(app, /La última palabra liberará el Cristal Dorado/);
assert.match(app, /mundoDosCompletado = true/);
assert.match(app, /cristalesObtenidos = Math\.max\(cristalesObtenidos, 2\)/);
assert.match(app, /1: crearRutasSpritesCaminata\("bosque"\)/);
assert.match(app, /escenarioActual === 0 \? sonidosNarrativosPorMision\[misionActual\]/);
assert.match(app, /const caminoEnergiaVientoDesierto = \[[\s\S]*20, 21, 22, 23, 24,[\s\S]*14, 13, 12/);
assert.match(app, /function obtenerCanalesEnergizados\(/);
assert.match(app, /caminoEnergiaVientoDesierto\.every\(/);
assert.match(app, /tipo: "bloqueado"/);
assert.match(app, /function activarEmergenciaDevoradunas\(/);
assert.match(app, /activarEmergenciaDevoradunas\(\);/);
assert.match(app, /new Set\(\[3, 6, 8, 9\]\)/);
assert.match(app, /configuracionesVientoDesierto[\s\S]+1:\s*\{\s*tipo:\s*"ventisca"/);
assert.match(app, /configuracionesVientoDesierto[\s\S]+3:\s*\{\s*tipo:\s*"remolino"/);
assert.match(app, /configuracionesAvesDesierto[\s\S]+2:\s*\{\s*cantidad:\s*4,\s*bandada:\s*true/);
assert.match(app, /cantidadesEscorpionesDesierto = Object\.freeze\(\{ 5: 2 \}\)/);
assert.match(app, /const misionesLagartijaDesierto = new Set\(\[7\]\)/);
const bloqueAvesDesierto = app.match(
  /const configuracionesAvesDesierto = Object\.freeze\(\{([\s\S]+?)\n\}\);/,
)?.[1] || "";
assert.doesNotMatch(bloqueAvesDesierto, /^\s*(?:3|6|8|9):\s*\{/m);
assert.match(app, /const misionesPastoDesierto = new Set\(\[0, 5, 7\]\)/);
assert.match(app, /const misionesCalorDesierto = new Set\(\[0, 2, 3, 4, 5, 7\]\)/);
assert.match(app, /function actualizarVidaDesiertoMision\(\)/);
assert.match(app, /trampa-espejismo-maguito/);
assert.match(app, /function liberarMaguitoDeTrampaEspejismo\(\)/);
assert.match(app, /if \(tipo === "oasis"\) await liberarMaguitoDeTrampaEspejismo\(\)/);
assert.match(app, /assets\/images\/ambiente\/desierto\/alacran-camina-1\.png/);
assert.match(estilos, /\.escorpion-desierto-ambiente \{[\s\S]+width: clamp\(34px, 4\.3vw, 60px\)/);
assert.match(app, /assets\/images\/ambiente\/desierto\/halcon-alas-abajo\.png/);
for (let cuadro = 1; cuadro <= 4; cuadro += 1) {
  const nombre = `lagartija-camina-${cuadro}.png`;
  const archivo = path.join(raiz, "assets", "images", "ambiente", "desierto", nombre);
  assert.ok(fs.existsSync(archivo), `Falta el cuadro ${cuadro} de la lagartija`);
  assert.equal(fs.readFileSync(archivo)[25], 6, `${nombre} debe conservar transparencia RGBA`);
  assert.match(app, new RegExp(nombre.replace(".", "\\.")));
  assert.match(sw, new RegExp(nombre.replace(".", "\\.")));
}
assert.match(app, /assets\/images\/ambiente\/desierto\/pasto-seco-viento\.png/);
assert.match(app, /actualizarVientoArenaMision\(\);\s*actualizarVidaDesiertoMision\(\)/);
assert.match(app, /function prepararRondaOasisDesierto\(/);
assert.match(app, /function crearPistaEnigmaOasis\(/);
assert.match(app, /La ilusión cambia de lugar y aparece una inscripción nueva/);
assert.match(app, /function aplicarGiroEspejosVinculados\(/);
assert.match(app, /orientacionesEspejosDesierto\[indice\] === objetivos\[indice\]/);
assert.match(estilos, /\.canal-viento\.energizado/);
assert.match(estilos, /\.canal-bloqueado/);
assert.match(estilos, /@keyframes emergerDevoradunasDesdeArena/);
assert.match(estilos, /\.devoradunas-entrada-arena\.emergencia-activa/);
assert.match(estilos, /\.oasis-opcion/);
assert.match(estilos, /\.espejo-solar/);
assert.match(estilos, /@keyframes perseguirDevoradunas/);
assert.match(estilos, /@keyframes aparecerDevoradunasFijo/);
assert.match(estilos, /\.capa-vida-desierto/);
assert.match(estilos, /@keyframes cruzarAveDesierto/);
assert.match(estilos, /@keyframes cruzarEscorpionDesierto/);
assert.match(estilos, /@keyframes aletearHalconDesierto/);
assert.match(estilos, /@keyframes caminarAlacranDesierto/);
assert.match(estilos, /@keyframes correrLagartijaDesierto/);
assert.match(estilos, /@keyframes cicloCaminataLagartija/);
assert.match(estilos, /\.cuadro-fauna-4\s*\{\s*animation-delay:\s*\.42s/);
assert.match(estilos, /@keyframes mecerPastoDesierto/);
assert.match(estilos, /@keyframes barrerVentiscaDesierto/);
assert.match(estilos, /@keyframes cruzarRemolinoDesierto/);
assert.match(estilos, /\.ave-bandada-desierto/);
assert.match(estilos, /\.pareja-escorpiones-desierto/);
assert.match(estilos, /\.maguito-corriendo\s*\{[\s\S]+?animation:\s*correrMaguitoDesierto 1\.8s/);
assert.match(estilos, /@keyframes correrMaguitoDesierto\s*\{[\s\S]+?translate3d\(-2px, 1px[\s\S]+?translate3d\(2px, -2px/);
assert.match(estilos, /\.escenario\.escenario-desierto\[data-mision-desierto/);
for (const mision of [1, 2, 8, 9]) {
  assert.match(
    estilos,
    new RegExp(`data-mision-desierto="${mision}"`),
    `Falta elevar al Explorador en la mision ${mision} del desierto`,
  );
}
assert.match(estilos, /--altura-explorador-desierto:\s*-2%/);
assert.match(estilos, /--altura-explorador-desierto:\s*-4%/);
for (const mision of [1, 2, 5, 7, 8, 9]) {
  assert.match(
    estilos,
    new RegExp(`data-mision-desierto="${mision}"\\] \\.personaje-imagen`),
    `La correccion movil debe aplicarse directamente al Explorador en la mision ${mision}`,
  );
}
assert.match(estilos, /\.trampa-espejismo-maguito/);
assert.match(estilos, /data-mision-desierto="5"\] \.trampa-espejismo-maguito\s*\{[\s\S]+?right:\s*3%[\s\S]+?width:\s*39%/);
assert.match(estilos, /data-mision-desierto="5"\] \.maguito-espejismo\s*\{[\s\S]+?width:\s*94%[\s\S]+?height:\s*82%/);
assert.match(app, /Zafir atrapado dentro de una prisión de espejismo/);
assert.match(estilos, /\.aro-prision-espejismo/);
assert.match(estilos, /@keyframes romperAroPrision/);
assert.doesNotMatch(estilos, /data-mision-desierto="(?:1|2|7|8|9)"[^{}]*\.personaje-imagen\s*\{\s*bottom:/);
assert.match(estilos, /@keyframes romperPrisionEspejismo/);
assert.match(estilos, /@keyframes descenderMaguitoLiberado/);
assert.match(estilos, /@keyframes respirarCalorDesierto/);
assert.doesNotMatch(
  estilos,
  /\.devoradunas-(?:emerge|persigue|irrumpe)[^{]*\{[^}]*animation:[^;}]*infinite/,
);
assert.match(html, /id="ranuraCristalDesierto"/);
assert.match(html, /data-oasis="3"/);
assert.match(html, /data-espejo="4"/);

const cristalDorado = path.join(
  raiz,
  "assets",
  "images",
  "elements",
  "cristal-sabiduria-dorado-v2.png",
);
assert.ok(fs.existsSync(cristalDorado), "Falta la imagen del Cristal Dorado");
assert.ok(fs.statSync(cristalDorado).size > 500_000, "El Cristal Dorado parece incompleto");
assert.equal(
  fs.readFileSync(cristalDorado)[25],
  6,
  "El Cristal Dorado debe conservar transparencia RGBA",
);
for (const contenido of [app, html, sw]) {
  assert.match(contenido, /cristal-sabiduria-dorado-v2\.png/);
}

for (const nombre of [
  "01-devoradunas-revela-cristal-v1.png",
  "02-devoradunas-entrega-cristal-v1.png",
  "03-mago-purifica-cristal-v1.png",
  "04-mago-entrega-cristal-v1.png",
  "05-mago-abre-portal-cumbres-v1.png",
]) {
  const archivo = path.join(
    raiz,
    "assets",
    "images",
    "cinematicas",
    "desierto-final",
    nombre,
  );
  assert.ok(fs.existsSync(archivo), `Falta el plano cinemático ${nombre}`);
  assert.ok(fs.statSync(archivo).size > 1_000_000, `${nombre} parece incompleto`);
  assert.match(app, new RegExp(nombre.replace(".", "\\.")));
  assert.match(sw, new RegExp(nombre.replace(".", "\\.")));
}

assert.match(estilos, /\.cinematica-final-desierto/);
assert.match(estilos, /\.encuentro-mago-desierto/);
assert.match(app, /const duracionPlanoCinematicaFinalDesierto = 6000/);
assert.match(app, /const duracionDesbloqueoMagoDesierto = 4300/);
assert.match(app, /esperarMovimiento\(duracionPlanoCinematicaFinalDesierto\)/);
assert.match(app, /esperarMovimiento\(duracionDesbloqueoMagoDesierto\)/);
assert.match(
  estilos,
  /@media \(max-width: 620px\)[\s\S]+?\.imagen-cinematica-final-desierto\s*\{[\s\S]+?object-fit:\s*contain;/,
);

console.log("adventure-world2-complete: comprobaciones correctas");
