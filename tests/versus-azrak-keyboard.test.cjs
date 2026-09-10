const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../js/app.js'), 'utf8');
function extract(name) {
  const start = source.indexOf(`function ${name}(`);
  return source.slice(start, source.indexOf('\n}', start) + 2);
}
function harness() {
  const timers = new Map(); let id = 0;
  const classes = () => { const values = new Set(); return { add: (...xs) => xs.forEach(x => values.add(x)), remove: (...xs) => xs.forEach(x => values.delete(x)), contains: x => values.has(x) }; };
  const button = { textContent: 'Z', classList: classes() };
  const keyboard = { classList: classes(), querySelectorAll: () => [button] };
  const ctx = vm.createContext({ tecladoVersus: keyboard, demoVersus: {}, adaptadorSalasVersus: { proveedor: 'local' }, bloquearTecladoDemoVersus() {}, sincronizarTecladoDemoVersus() {}, setTimeout(fn, ms) { timers.set(++id, { fn, ms }); return id; }, clearTimeout(id) { timers.delete(id); } });
  vm.runInContext('let temporizadorCalaveraTeclado = null;\n' + ['limpiarQuemaduraTecladoVersus', 'limpiarCalaveraTecladoVersus', 'mostrarCalaveraTecladoVersus', 'animarTeclaCalaveraIgneaVersus'].map(extract).join('\n'), ctx);
  return { ctx, button, keyboard, timers };
}
test('Azrak presenta la imagen durante dos segundos y conserva la quemadura de la palabra', () => {
  const h = harness(); h.ctx.animarTeclaCalaveraIgneaVersus('Z', true);
  assert.ok(h.keyboard.classList.contains('efecto-calavera-azrak'));
  assert.ok(!h.button.classList.contains('tecla-carbonizada'));
  const timer = [...h.timers.values()][0]; assert.equal(timer.ms, 2000); timer.fn();
  assert.ok(!h.keyboard.classList.contains('efecto-calavera-azrak'));
  assert.ok(h.button.classList.contains('tecla-carbonizada'));
  [...h.timers.values()].find(t => t.ms === 2600).fn();
  assert.ok(h.button.classList.contains('tecla-carbonizada'));
  h.ctx.limpiarQuemaduraTecladoVersus();
  assert.ok(!h.button.classList.contains('tecla-carbonizada'));
});
test('el cambio de palabra cancela una calavera pendiente y limpia fuego y carbonizado', () => {
  const h = harness(); h.ctx.animarTeclaCalaveraIgneaVersus('Z', true, false);
  h.ctx.animarTeclaCalaveraIgneaVersus('Z', true);
  h.ctx.limpiarQuemaduraTecladoVersus();
  for (const timer of [...h.timers.values()]) timer.fn();
  for (const cls of ['tecla-carbonizada', 'tecla-calavera-ignea', 'impacto-recibido']) assert.ok(!h.button.classList.contains(cls));
  assert.ok(!h.keyboard.classList.contains('efecto-calavera-azrak'));
});
