const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const engine = require("../js/versus-engine.js");

const appPath = path.join(__dirname, "../js/app.js");
const app = fs.readFileSync(appPath, "utf8");
const inicio = app.indexOf("const palabrasAdicionalesVersus = ");
const fin = app.indexOf("\nconst clavesBancosPalabrasVersus", inicio);

assert.notEqual(inicio, -1, "Debe existir el diccionario temático");
assert.notEqual(fin, -1, "Debe existir el índice normalizado del diccionario");

const codigoBancos = app.slice(inicio, fin);
const bancos = Function(`"use strict"; ${codigoBancos}; return bancosPalabrasVersus;`)();

assert.equal(Object.keys(bancos).length, 10, "Deben existir diez temáticas");

for (const [tematica, palabras] of Object.entries(bancos)) {
  assert.equal(palabras.length, 100, `${tematica} debe tener 100 palabras`);
  const claves = palabras.map((palabra) => engine.obtenerClavePalabra(palabra));
  assert.equal(new Set(claves).size, 100, `${tematica} no debe contener duplicados equivalentes`);

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

const migrationExpansionPath = path.join(
  __dirname,
  "../supabase/migrations/20260830133000_expand_versus_dictionary.sql",
);
const migrationExpansion = fs.readFileSync(migrationExpansionPath, "utf8");
const expansionRows = [...migrationExpansion.matchAll(/^  \('([^']+)', '([^']+)'\)[,;]?$/gm)]
  .map((match) => ({ tematica: match[1], palabra: match[2] }));
rows.push(...expansionRows);

assert.equal(rows.length, 1000, "Supabase debe contener las mismas 1000 palabras");
for (const [tematica, palabras] of Object.entries(bancos)) {
  const remotas = rows
    .filter((row) => row.tematica === tematica)
    .map((row) => row.palabra);
  assert.deepEqual(remotas.toSorted(), palabras.toSorted(), `${tematica} debe coincidir entre la app y Supabase`);
}

console.log("versus-words: 10 temáticas y 1000 palabras verificadas");

assert.match(app, /const clavesAnteriores = ultimasPalabrasAleatoriasVersus/);
assert.match(app, /btnsFijarPalabrasVersus\[indice\].*aria-pressed/);
const html = fs.readFileSync(path.join(__dirname, "../index.html"), "utf8");
assert.match(html, /btn-fijar-palabra-versus/);
