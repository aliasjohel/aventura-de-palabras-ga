const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');
function extract(name) {
  const start = source.indexOf(`function ${name}(`);
  return source.slice(start, source.indexOf('\n}', start) + 2);
}
function harness() {
  const classes = new Set(), timers = new Map();
  const buttons = ['A', 'B'].map(textContent => ({ textContent, disabled: false }));
  let id = 0, now = 0, sand;
  const ctx = vm.createContext({
    tecladoVersus: {
      classList: { add: name => classes.add(name), remove: name => classes.delete(name), contains: name => classes.has(name) },
      querySelector: () => sand,
      querySelectorAll: () => buttons,
      append: el => { sand = el; }, setAttribute() {}, offsetWidth: 100,
    },
    document: { createElement: () => ({ setAttribute() {}, remove() { sand = undefined; } }) },
    demoVersus: { finalizadoJugador: false, partidaFinalizada: false, teclasRobadasJugador: new Set(), letrasJugador: new Set(['A']) },
    adaptadorSalasVersus: { proveedor: 'local' },
    actualizarControlesTutorialVersus() {},
    setTimeout(fn, duration) { const key = ++id; timers.set(key, { fn, at: now + duration }); return key; },
    clearTimeout(key) { timers.delete(key); },
  });
  vm.runInContext('let temporizadorRelojKairos = null; let bloqueoRivalKairosHasta = 0;\n' +
    ['mostrarRelojKairosVersus', 'limpiarRelojKairosVersus', 'bloquearTecladoDemoVersus', 'sincronizarTecladoDemoVersus'].map(extract).join('\n'), ctx);
  return { ctx, classes, timers, buttons, advance(ms) {
    now += ms;
    for (const [key, timer] of [...timers]) if (timer.at <= now) { timers.delete(key); timer.fn(); }
  } };
}
test('el reloj bloquea durante dos segundos y respeta las letras usadas al liberar', () => {
  const h = harness();h.ctx.mostrarRelojKairosVersus();
  h.ctx.sincronizarTecladoDemoVersus();
  h.advance(1999);assert.ok(h.buttons.every(b => b.disabled));
  h.advance(1);assert.deepEqual(h.buttons.map(b => b.disabled), [true, false]);
  assert.equal(h.classes.has('efecto-reloj-kairos'), false);
});
test('no libera otros bloqueos ni una partida terminada y cancela su temporizador al salir', () => {
  for (const reason of ['roots', 'finished']) {
    const h = harness();h.ctx.mostrarRelojKairosVersus();
    if (reason === 'roots') h.classes.add('efecto-raices');
    else h.ctx.demoVersus.partidaFinalizada = true;
    h.advance(2000);assert.ok(h.buttons.every(b => b.disabled));
  }
  const h = harness();h.ctx.mostrarRelojKairosVersus();h.ctx.limpiarRelojKairosVersus();
  assert.equal(h.timers.size, 0);assert.equal(h.classes.size, 0);
});
