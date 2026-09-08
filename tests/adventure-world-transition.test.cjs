const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const app = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');

test('continuar desde el mundo 4 completo abre y guarda la misión 1 de Azrak', async () => {
  const calls = [];
  const context = vm.createContext({
    escenarioActual: 3, misionActual: 9, mundoCuatroCompletado: true,
    mundoTresCompletado: true, desafiosCompletados: 3, desafioActual: 4,
    palabrasUsadasEnMision: ['HIELO'], historiaMisionPendiente: false,
    maximoEscenarioDesbloqueado: 3,
    btnSiguiente: { classList: { add() {} } },
    ocultarMensajeDesafioSuperado() {}, limpiarCinematicaSantuario() {},
    guardarProgreso() { calls.push([context.escenarioActual, context.misionActual]); },
    async iniciarMisionAventura() { calls.push('mission'); },
    mostrarHistoriaMision() { calls.push('story'); },
  });
  const start = app.indexOf('function continuarAventura(');
  const end = app.indexOf('\n}', start) + 2;
  vm.runInContext(app.slice(start, end), context);
  context.continuarAventura();
  await Promise.resolve();
  assert.equal(context.escenarioActual, 4);
  assert.equal(context.misionActual, 0);
  assert.equal(context.desafiosCompletados, 0);
  assert.equal(context.desafioActual, 1);
  assert.equal(context.palabrasUsadasEnMision.length, 0);
  assert.equal(context.maximoEscenarioDesbloqueado, 4);
  assert.deepEqual(calls, [[4, 0], 'mission', 'story']);
});
