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

test('guardians empower Aren before his attack, then both complete music tracks accompany the ending', () => {
  const keys = world.finale.map(shot => shot.key);
  const portraits = world.finale.filter(shot => shot.portrait);
  assert.equal(portraits.length, 8);
  assert.equal(new Set(portraits.map(shot => shot.name)).size, 8);
  for (const portrait of portraits) assert.ok(keys.indexOf(portrait.key) < keys.indexOf('transformacion'));
  for (const [before, after] of [['union','transformacion'],['transformacion','ataque-union'],['ataque-union','azrak-vencido'],['azrak-vencido','amanecer'],['amanecer','aren-normal'],['aren-normal','deshielo'],['cielo-libre','abrazo'],['abrazo','epilogo']]) {
    assert.ok(keys.indexOf(before) < keys.indexOf(after), `${before} before ${after}`);
  }
  assert.deepEqual(world.finale.filter(shot => shot.music).map(shot => [shot.key,shot.music]), [['resiste','battle'],['amanecer','peace']]);
  for (const track of Object.values(world.finalMusic)) {
    assert.ok(fs.existsSync(path.join(__dirname, '..', track.src)));
    assert.ok(sw.includes(track.src));
    assert.ok(track.duration > 120000);
  }
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

test('mission 8 keeps three completed portals and advances only on the fourth word', () => {
  const ctx = vm.createContext({
    escenarioActual: 4, misionActual: 7, desafiosCompletados: 0, desafiosPorMision: 3,
    historiaMisionPendiente: false, palabrasUsadasEnMision: [], mensajePersonaje: {},
    obtenerCantidadMisiones: () => 10,
    ...Object.fromEntries(['detenerAmbiente', 'detenerAmbientePuente', 'detenerAmbienteCristal',
      'detenerPortalMision', 'detenerAmbienteHojas', 'detenerTormenta', 'detenerNiebla',
      'detenerMiradasLobos', 'detenerPresenciaBosque', 'detenerAranaBosque'].map(name => [name, () => {}])),
  });
  const helper = app.match(/function obtenerCantidadDesafiosMision\([\s\S]*?\n\}/)[0];
  const start = app.indexOf('function avanzarMision()');
  vm.runInContext(helper + '\n' + app.slice(start, app.indexOf('function actualizarJugador()', start)), ctx);
  for (let i = 1; i <= 3; i++) {
    ctx.avanzarMision();
    assert.equal(ctx.misionActual, 7);
    assert.equal(ctx.desafiosCompletados, i);
  }
  // Exercise the actual reload clamp, which must retain a saved third portal.
  const clamp = app.slice(app.indexOf('  desafiosCompletados = Math.min('), app.indexOf('  desafioActual = desafiosCompletados + 1;', app.indexOf('  desafiosCompletados = Math.min(')));
  vm.runInContext(clamp, ctx);
  assert.equal(ctx.desafiosCompletados, 3);
  ctx.avanzarMision();
  assert.equal(ctx.misionActual, 8);
  assert.equal(ctx.desafiosCompletados, 0);
  assert.equal(ctx.obtenerCantidadDesafiosMision(), 3);
});

test('cinematic illustrations exist offline and the giant rescue precedes the battle', () => {
  for (const shot of [...world.betrayal, ...world.finale]) {
    if (shot.portrait) {
      const portrait = path.posix.normalize(`assets/images/personajes/versus/${shot.actors[0].file}`);
      assert.ok(fs.existsSync(path.join(__dirname, '..', portrait)), portrait);
      assert.ok(sw.includes(portrait), `Offline portrait ${portrait}`);
      continue;
    }
    const asset = `assets/images/cinematicas/reino-azrak/${shot.image || shot.key + '-v1.png'}`;
    assert.ok(fs.existsSync(path.join(__dirname, '..', asset)), asset);
    assert.ok(sw.includes(asset), `Offline cinematic ${asset}`);
  }
  const keys = world.finale.map(s => s.key);
  assert.ok(keys.indexOf('emboscada-cancerbero') < keys.indexOf('portal-nivor'));
  assert.ok(keys.indexOf('portal-nivor') < keys.indexOf('titanes'));
  assert.deepEqual(keys.slice(keys.indexOf('titanes'), keys.indexOf('guardianes') + 1), ['titanes', 'rescate', 'madre', 'victoria-nivor', 'hielo', 'guardianes']);
  assert.doesNotMatch(world.finale.find(s => s.key === 'rescate').text, /rompe parte del hielo/);
});
