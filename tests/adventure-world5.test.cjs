const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const world = require('../js/azrak-world.js');
const app = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');
const sw = fs.readFileSync(path.join(__dirname, '../sw.js'), 'utf8');

test('ten missions, three puzzles and all cinematic actors have real local assets', () => {
  assert.equal(world.missions.length, 10);
  assert.deepEqual(world.missions.filter(m => m.puzzle).map(m => m.puzzle), ['runas-azrak', 'sellos-azrak', 'eclipse-azrak']);
  for (const mission of world.missions) {
    const asset = `assets/images/fondos/${mission.fondos[0]}`;
    assert.ok(fs.existsSync(path.join(__dirname, '..', asset)), asset);
    assert.ok(sw.includes(asset), `Offline background ${asset}`);
  }
  for (const shot of [...world.betrayal, ...world.finale]) {
    for (const actor of shot.actors) {
      const asset = path.normalize(`assets/images/personajes/versus/${actor.file}`);
      assert.ok(fs.existsSync(path.join(__dirname, '..', asset)), asset);
    }
  }
  assert.ok(world.finale.findIndex(s => s.key === 'regreso') > world.finale.findIndex(s => s.key === 'contraataque'));
  assert.ok(world.finale.some(s => s.key === 'rescate'));
  assert.ok(world.finale.some(s => s.key === 'madre'));
});

test('eclipse starts unsolved, has a solution and every move is reversible', () => {
  const initial = world.initialLights();
  assert.ok(initial.some(Boolean));
  for (let index = 0; index < 9; index++) {
    assert.deepEqual(world.toggleLight(world.toggleLight(initial, index), index), initial);
  }
  assert.ok([0, 4, 8, 2].reduce(world.toggleLight, initial).every(value => !value));
  assert.equal(world.sealsSolved([0, 1, 2, 3]), false);
  assert.equal(world.sealsSolved([2, 0, 3, 1]), true);
});

function endingHarness(state, playback = async () => {}) {
  const calls = [];
  const ctx = vm.createContext({
    finalAzrakEnCurso: false, estadoFinalAzrak: state,
    prefiereReducirMovimiento: { matches: false }, desafiosPorMision: 3,
    desafiosCompletados: 0, detenerSonidos() {},
    cristalesObtenidos: 4, actualizarJugador() {},
    AzrakWorld: { playCinematic: playback },
    guardarProgreso() { calls.push(`save:${ctx.estadoFinalAzrak}`); },
    iniciarDueloAventura(type) { calls.push(type); },
    mostrarFinalAventuraAzrak() { calls.push('end'); },
  });
  const start = app.indexOf('async function continuarFinalMundoCinco()');
  vm.runInContext(app.slice(start, app.indexOf('function mostrarFinalAventuraAzrak()', start)), ctx);
  return { ctx, calls };
}

test('betrayal transitions straight into Azrak and saves the checkpoint first', async () => {
  const seen = [];
  const h = endingHarness('traicion', async kind => seen.push(kind));
  await h.ctx.continuarFinalMundoCinco();
  assert.deepEqual(seen, ['traicion']);
  assert.deepEqual(h.calls, ['save:azrak', 'azrak_final']);
  assert.equal(h.ctx.estadoFinalAzrak, 'azrak');
});

test('ending is resumable, runs once, and only completes after cinematic playback', async () => {
  let release;
  const h = endingHarness('final', () => new Promise(resolve => { release = resolve; }));
  const pending = h.ctx.continuarFinalMundoCinco();
  await h.ctx.continuarFinalMundoCinco();
  assert.equal(h.ctx.estadoFinalAzrak, 'final');
  assert.deepEqual(h.calls, []);
  release(); await pending;
  assert.equal(h.ctx.estadoFinalAzrak, 'completo');
  assert.equal(h.ctx.finalAzrakEnCurso, false);
  assert.deepEqual(h.calls, ['save:completo', 'end']);
});

test('reloading each final phase chooses the correct battle and never repeats Shadow after victory', () => {
  const start = app.indexOf('function obtenerDueloAventuraPendiente()');
  const snippet = app.slice(start, app.indexOf('function iniciarPuzzleAzrak', start));
  const ctx = vm.createContext({ escenarioActual: 4, misionActual: 9, estadoFinalAzrak: 'shadow' });
  vm.runInContext(snippet, ctx);
  for (const [state, expected] of [['shadow', 'shadow_final'], ['azrak', 'azrak_final'], ['traicion', ''], ['final', ''], ['completo', '']]) {
    ctx.estadoFinalAzrak = state;
    assert.equal(ctx.obtenerDueloAventuraPendiente(), expected);
  }
});

test('the memory puzzle accepts all three rounds, retries mistakes and cancels timers on exit', () => {
  const timers = new Map();
  let timerId = 0, completed = 0;
  function element() {
    const node = { children: [], disabled: false, textContent: '', attrs: {}, handlers: {},
      classList: { add() {}, remove() {}, toggle() {} },
      append(...children) { this.children.push(...children); },
      prepend(child) { this.children.unshift(child); },
      replaceChildren(...children) { this.children = children; },
      setAttribute(key, value) { this.attrs[key] = value; },
      addEventListener(type, callback) { this.handlers[type] = callback; },
      click() { if (!this.disabled) this.handlers.click?.(); },
      focus() {},
      querySelectorAll() { return this.children.flatMap(child => [child, ...child.querySelectorAll()]); },
    };
    return node;
  }
  const ctx = vm.createContext({
    document: { createElement: element },
    setTimeout(fn, delay) { const id = ++timerId; timers.set(id, { fn, delay }); return id; },
    clearTimeout(id) { timers.delete(id); },
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/azrak-world.js'), 'utf8'), ctx);
  const flush = () => {
    for (const [id, timer] of [...timers.entries()].sort((a, b) => a[1].delay - b[1].delay)) {
      if (timers.delete(id)) timer.fn();
    }
  };
  const container = element();
  const close = ctx.AzrakWorld.mountPuzzle(container, 'runas-azrak', () => completed++);
  const buttons = container.children[1].children;
  assert.ok(buttons.every(button => button.disabled));
  flush();
  buttons[1].click(); // Wrong first symbol must replay rather than advance.
  assert.equal(completed, 0);
  assert.ok(buttons.every(button => button.disabled));
  flush();
  for (const sequence of world.paths) {
    for (const index of sequence) buttons[index].click();
    flush();
  }
  assert.equal(completed, 1);
  close();
  const other = element();
  const dispose = ctx.AzrakWorld.mountPuzzle(other, 'runas-azrak', () => completed++);
  assert.ok(timers.size > 0);
  dispose(); flush();
  assert.equal(timers.size, 0);
  assert.equal(completed, 1);
});
