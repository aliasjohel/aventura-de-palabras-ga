const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const engine = require("../js/versus-engine.js");

const appPath = path.join(__dirname, "../js/app.js");
const app = fs.readFileSync(appPath, "utf8");
const inicio = app.indexOf("const bancosPalabrasVersus = ");
const fin = app.indexOf("\nconst clavesBancosPalabrasVersus", inicio);

assert.notEqual(inicio, -1, "Debe existir el diccionario temático");
assert.notEqual(fin, -1, "Debe existir el índice normalizado del diccionario");

const literal = app
  .slice(inicio + "const bancosPalabrasVersus = ".length, fin)
  .trim()
  .replace(/;$/, "");
const bancos = Function(`"use strict"; return (${literal});`)();

assert.equal(Object.keys(bancos).length, 10, "Deben existir diez temáticas");

for (const [tematica, palabras] of Object.entries(bancos)) {
  assert.equal(palabras.length, 50, `${tematica} debe tener 50 palabras`);
  const claves = palabras.map((palabra) => engine.obtenerClavePalabra(palabra));
  assert.equal(new Set(claves).size, 50, `${tematica} no debe contener duplicados equivalentes`);

  palabras.forEach((palabra) => {
    const longitud = [...palabra].length;
    assert.ok(longitud >= 3 && longitud <= 12, `${palabra} debe tener entre 3 y 12 letras`);
    assert.equal(engine.normalizarPalabra(palabra), palabra, `${palabra} debe estar normalizada`);
  });
}

const frutas = new Set(bancos.frutas.map((palabra) => engine.obtenerClavePalabra(palabra)));
assert.ok(frutas.has(engine.obtenerClavePalabra("limon")), "LIMON debe coincidir con LIMÓN");
assert.equal(engine.obtenerClavePalabra("ÁFRICA"), engine.obtenerClavePalabra("africa"));
assert.match(app, /No figura en el diccionario de/);
assert.match(app, /tematicaVersus\.addEventListener\("change"/);

const migrationPath = path.join(
  __dirname,
  "../supabase/migrations/20260809015253_versus_thematic_dictionary.sql",
);
const migration = fs.readFileSync(migrationPath, "utf8");
const rows = [...migration.matchAll(/^  \('([^']+)', '([^']+)'\)[,;]?$/gm)]
  .map((match) => ({ tematica: match[1], palabra: match[2] }));

assert.equal(rows.length, 500, "Supabase debe contener las mismas 500 palabras");
for (const [tematica, palabras] of Object.entries(bancos)) {
  const remotas = rows
    .filter((row) => row.tematica === tematica)
    .map((row) => row.palabra);
  assert.deepEqual(remotas, palabras, `${tematica} debe coincidir entre la app y Supabase`);
}

console.log("versus-words: 10 temáticas y 500 palabras verificadas");
