const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const test = require('node:test');
const source = fs.readFileSync(require.resolve('../js/app.js'), 'utf8');
const tutorial = source.slice(source.indexOf('const claveTutorialVersusVisto'), source.indexOf('function entrarAlModoVersus()'));

function harness() {
  const timers = new Map();
  let nextId = 0;
  const classes = () => ({ add() {}, remove() {}, toggle() {} });
  const node = () => ({ classList: classes(), focus() {}, disabled: false });
  const buttons = ['A', 'B', 'O'].map(textContent => ({ ...node(), textContent }));
  const calls = [];
  const context = vm.createContext({
    Set, Date, pasoActualTutorialVersus: 0,
    setTimeout(fn) { const id = ++nextId; timers.set(id, fn); return id; },
    clearTimeout(id) { timers.delete(id); },
    tecladoVersus: { querySelectorAll() { return buttons; } },
    btnHabilidadVersus: node(), btnSiguienteTutorialVersus: node(),
    pantallaVersus: node(), accionPasoTutorialVersus: node(),
    demoVersus: {}, temporizadorVistaImpactoRivalVersus: null,
    detenerCaosContinuoTecladoVersus() {},
    jugarLetraDemoVersus(letter) { calls.push(letter); },
    mostrarAnuncioFinVersus: async () => {},
    obtenerReproductorFinalVersus: (winner, loser) => async () => calls.push([winner, loser]),
  });
  vm.runInContext(tutorial, context);
  const run = code => vm.runInContext(code, context);
  run('tutorialCombateVersus.activo = true; tutorialCombateVersus.letras = ["A"]');
  return { context, run, buttons, calls, timers };
}

test('only the requested combat control accepts input, and repeated input cannot skip a step', () => {
  const h = harness();
  h.run('actualizarControlesTutorialVersus()');
  assert.deepEqual(h.buttons.map(b => b.disabled), [false, true, true]);
  assert.equal(h.context.btnHabilidadVersus.disabled, true);
  h.context.jugarLetraTutorialVersus('B', h.buttons[1]);
  assert.deepEqual(h.calls, []);
  h.context.jugarLetraTutorialVersus('A', h.buttons[0]);
  h.context.jugarLetraTutorialVersus('A', h.buttons[0]);
  assert.deepEqual(h.calls, ['A']);
  assert.ok(h.buttons.every(b => b.disabled));
  assert.equal(h.run('tutorialCombateVersus.completado'), false);
  for (const fn of h.timers.values()) fn();
  assert.equal(h.run('tutorialCombateVersus.completado'), true);
  assert.equal(h.context.btnSiguienteTutorialVersus.disabled, false);
});

test('callbacks from a closed or previous practice cannot change the current guide', () => {
  const h = harness();
  h.run('programarTutorialVersus(completarAccionPasoTutorialVersus, 100)');
  const oldCallback = [...h.timers.values()][0];
  h.run('tutorialCombateVersus.activo = false');
  oldCallback();
  assert.equal(h.run('tutorialCombateVersus.completado'), false);
  h.run('tutorialCombateVersus.activo = true; tutorialCombateVersus.sesion += 1');
  oldCallback();
  assert.equal(h.run('tutorialCombateVersus.completado'), false);
});

test('victory awaits the real finisher, and leaving during its announcement cancels continuation', async () => {
  const h = harness();
  h.run('pasoActualTutorialVersus = 7');
  await h.context.mostrarVictoriaTutorialVersus();
  assert.deepEqual(h.calls, [['guardiana', 'mago']]);
  assert.equal(h.run('tutorialCombateVersus.completado'), true);
  const canceled = harness();
  let resolveAnnouncement;
  canceled.context.mostrarAnuncioFinVersus = () => new Promise(resolve => { resolveAnnouncement = resolve; });
  const pending = canceled.context.mostrarVictoriaTutorialVersus();
  canceled.run('tutorialCombateVersus.activo = false; tutorialCombateVersus.sesion += 1');
  resolveAnnouncement();
  await pending;
  assert.deepEqual(canceled.calls, []);
  assert.equal(canceled.run('tutorialCombateVersus.completado'), false);
});
