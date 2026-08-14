const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "js", "app.js"), "utf8");
const worker = fs.readFileSync(path.join(root, "sw.js"), "utf8");

assert.match(app, /musicaCaminaPortal = new Audio\("assets\/sounds\/camina-al-portal\.mp3"\)/);
assert.match(app, /function ejecutarCinematicaFinalPortal[\s\S]+reproducirMusicaCinematica\([\s\S]+musicaCaminaPortal/);
assert.match(app, /detenerMusicaCinematica\(musicaCaminaPortal, 0\.62\);[\s\S]+await mostrarIntroduccionMundoDos\(\)/);
assert.match(app, /function mostrarIntroduccionMundoDos\([\s\S]+reproducirSonido\("comienzaMundo2"\)/);
assert.match(worker, /assets\/sounds\/mural-dragon1\.mp3/);
assert.match(worker, /assets\/sounds\/camina-al-portal\.mp3/);

for (const archivo of ["mural-dragon1.mp3", "camina-al-portal.mp3"]) {
  assert.equal(
    fs.existsSync(path.join(root, "assets", "sounds", archivo)),
    true,
    `Falta ${archivo}`,
  );
}

console.log("adventure-cinematic-music: comprobaciones correctas");
