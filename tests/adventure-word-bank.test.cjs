const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const app = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');
const AzrakWorld = require('../js/azrak-world.js');
const code = app.slice(app.indexOf('const aventura = ['), app.indexOf('\nconst historiaBosque'));
const aventura = Function(code + '; return aventura;')();
aventura.push({ nombre: 'Azrak', palabras: AzrakWorld.words });
for (const mundo of aventura) {
  assert.equal(mundo.palabras.length, 50, mundo.nombre);
  assert.equal(new Set(mundo.palabras.map(p => p.palabra)).size, 50);
  for (const item of mundo.palabras) {
    assert.match(item.palabra, /^[A-ZÑ]{3,12}$/);
    assert.ok(item.pista.length > 15 && item.pista.length < 150, item.palabra);
  }
}
const functions = app.slice(app.indexOf('function guardarProgreso()'), app.indexOf('\ncargarPersonajesDesbloqueados();', app.indexOf('function obtenerPalabraAleatoria()')));
const storage = new Map();
const ctx = { aventura, AzrakWorld, Math, Set, JSON, Number,
  modoPruebasActivo: false, historialPalabrasAventura: {}, palabrasUsadasEnMision: [],
  escenarioActual: 0, misionActual: 0, desafioActual: 1, desafiosCompletados: 0,
  monedas: 123, experiencia: 456, cristalesObtenidos: 0,
  muralSantuarioCompletado: false, portalAbierto: false, mundoDosCompletado: false,
  mundoTresCompletado: false, mundoCuatroCompletado: false, estadoFinalAzrak: 'shadow',
  primerDueloNivorCompletado: false, estadoPrimerEncuentroShadow: 'pendiente',
  estadoPruebaKairos: 'pendiente', estadoEncuentroCalamo: 'pendiente', hombreLoboDescubierto: false,
  maximoEscenarioDesbloqueado: 0, obtenerCantidadDesafiosMision: () => 3,
  localStorage: { getItem: k => storage.get(k) ?? null, setItem: (k,v) => storage.set(k,v), removeItem: k => storage.delete(k) },
  btnJugar: {}, btnNuevaAventura: { classList: { add() {}, remove() {} } },
  actualizarJugador() {}, guardarDesbloqueoGuardiana() {}, guardarDesbloqueoMago() {},
  guardarDesbloqueoNimbus() {}, guardarDesbloqueoNivor() {},
};
vm.createContext(ctx);
vm.runInContext(functions, ctx);
// Every world completes two full cycles, crossing missions and reloads.
for (let mundo = 0; mundo < 5; mundo++) {
  ctx.escenarioActual = mundo;
  let last = null;
  const missionWords = new Map();
  for (let ciclo = 0; ciclo < 2; ciclo++) {
    const cycle = new Set();
    for (let n = 0; n < 50; n++) {
      ctx.misionActual = Math.floor((ciclo * 50 + n) / 3);
      // Mission engine clears this old transient list; persistent history must survive.
      ctx.palabrasUsadasEnMision = [];
      if (n % 7 === 0) { ctx.guardarProgreso(); ctx.historialPalabrasAventura = {}; ctx.cargarProgreso(); }
      const word = ctx.obtenerPalabraAleatoria().palabra;
      assert.ok(!cycle.has(word), `Cycle repeated ${word}`);
      assert.notEqual(word, last, 'No immediate repeat at cycle boundary');
      const key = `${mundo}:${ctx.misionActual}`;
      const inMission = missionWords.get(key) || new Set();
      assert.ok(!inMission.has(word), `Mission repeated ${word}`);
      inMission.add(word); missionWords.set(key, inMission);
      cycle.add(word); last = word;
    }
    assert.equal(cycle.size, 50);
  }
}
assert.equal(ctx.monedas, 123);
assert.equal(ctx.experiencia, 456);
const historyBefore = JSON.stringify(ctx.historialPalabrasAventura);
const saveBefore = storage.get('progresoAventuraGA');
ctx.modoPruebasActivo = true;
ctx.obtenerPalabraAleatoria();
assert.equal(JSON.stringify(ctx.historialPalabrasAventura), historyBefore);
assert.equal(storage.get('progresoAventuraGA'), saveBefore);
ctx.modoPruebasActivo = false;
// Old saves remain compatible; malformed word history is discarded.
storage.set('progresoAventuraGA', JSON.stringify({ monedas: 77, experiencia: 12 }));
ctx.cargarProgreso();
assert.equal(Object.keys(ctx.historialPalabrasAventura).length, 0);
assert.equal(ctx.monedas, 77);
storage.set('progresoAventuraGA', JSON.stringify({ historialPalabrasAventura: {
  0: { usadas: ['ARBOL', 'ARBOL', 'FAKE', null], enMision: 'invalid', mision: 'invalid' },
} }));
ctx.cargarProgreso();
assert.equal(JSON.stringify(ctx.historialPalabrasAventura[0]), JSON.stringify({ usadas: ['ARBOL'], mision: -1, enMision: [] }));
console.log('adventure-word-bank: 250 clues, cycles, missions, persistence, old saves and test-mode isolation OK');
