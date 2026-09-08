const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'js/app.js'), 'utf8');
function extract(name) {
  const start = app.indexOf(`function ${name}(`);
  return app.slice(start, app.indexOf('\n}', start) + 2);
}
test('Cálamo espera los tres desafíos de la misión 6 y conserva la prueba final de Zafir', () => {
  const ctx = vm.createContext({ escenarioActual: 1, misionActual: 5, desafiosCompletados: 0,
    desafiosPorMision: 3, estadoEncuentroCalamo: 'pendiente', mundoDosCompletado: false });
  vm.runInContext(extract('obtenerCantidadDesafiosMision') + '\n' + extract('obtenerDueloAventuraPendiente'),ctx);
  assert.equal(ctx.obtenerCantidadDesafiosMision(),4);
  for(let n=0;n<3;n++){ctx.desafiosCompletados=n;assert.equal(ctx.obtenerDueloAventuraPendiente(),'');}
  ctx.desafiosCompletados=3;
  assert.equal(ctx.obtenerDueloAventuraPendiente(),'calamo_desierto');
  ctx.estadoEncuentroCalamo='huida';
  assert.equal(ctx.obtenerDueloAventuraPendiente(),'calamo_desierto');
  ctx.estadoEncuentroCalamo='completo';
  assert.equal(ctx.obtenerDueloAventuraPendiente(),'');
  ctx.misionActual=9;
  assert.equal(ctx.obtenerDueloAventuraPendiente(),'mago_desierto');
  assert.equal(ctx.obtenerCantidadDesafiosMision(),3);
});

test('la ilustración nueva y el arte de la aparición de Cálamo están disponibles sin conexión', () => {
  const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
  for(const asset of ['assets/images/cinematicas/desierto-calamo/robo-mapa-v1.png', 'assets/images/fondos/desierto-6.png', 'assets/images/personajes/versus/kalamo-base.png']){
    assert.ok(fs.existsSync(path.join(root,asset)));
    assert.ok(sw.includes(asset));
  }
});
