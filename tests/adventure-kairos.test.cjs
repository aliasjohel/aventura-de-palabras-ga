const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'js/app.js'), 'utf8');
function extract(name) {
  const start = app.indexOf(`function ${name}(`);
  const end = app.indexOf('\n}', start) + 2;
  return app.slice(start, end);
}
function state() {
  const ctx = vm.createContext({ escenarioActual: 0, misionActual: 1, desafiosCompletados: 0, desafiosPorMision: 3, estadoPruebaKairos: 'pendiente', portalAbierto: false });
  vm.runInContext(extract('obtenerCantidadDesafiosMision') + '\n' + extract('obtenerDueloAventuraPendiente'), ctx);
  return ctx;
}
test('Kairós espera los tres desafíos y conserva el duelo final de la Guardiana', () => {
  const ctx = state();
  assert.equal(ctx.obtenerCantidadDesafiosMision(), 4);
  for (let n = 0; n < 3; n++) { ctx.desafiosCompletados = n; assert.equal(ctx.obtenerDueloAventuraPendiente(), ''); }
  ctx.desafiosCompletados = 3;
  assert.equal(ctx.obtenerDueloAventuraPendiente(), 'kairos_bosque');
  ctx.estadoPruebaKairos = 'informe';
  assert.equal(ctx.obtenerDueloAventuraPendiente(), 'kairos_bosque');
  ctx.estadoPruebaKairos = 'completo';
  assert.equal(ctx.obtenerDueloAventuraPendiente(), '');
  ctx.misionActual = 9;
  assert.equal(ctx.obtenerDueloAventuraPendiente(), 'guardiana');
  assert.equal(ctx.obtenerCantidadDesafiosMision(), 3);
});
test('el informe se guarda antes de reproducirse y todas las imágenes se instalan offline', () => {
  const victory = app.slice(app.indexOf('async function completarDueloAventura()'), app.indexOf('async function continuarFinalMundoCinco'));
  assert.match(victory, /duelo.tipo === "kairos_bosque"[\s\S]*?estadoPruebaKairos = "informe";\s*guardarProgreso\(\);\s*await completarInformeKairos\(\)/);
  const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
  for (const name of ['aparicion-v1', 'ataque-v1', 'informe-sombra-v1', 'guardiana-revelada-v1']) {
    const asset = `assets/images/cinematicas/bosque-kairos/${name}.png`;
    assert.ok(fs.existsSync(path.join(root, asset)));
    assert.ok(sw.includes(asset));
  }
});
