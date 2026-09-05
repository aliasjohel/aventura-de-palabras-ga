const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const app = fs.readFileSync(require('node:path').join(__dirname, '../js/app.js'), 'utf8');
const source = app.slice(app.indexOf('async function reproducirCinematicaFinalHielo()'), app.indexOf('\nconst victimasFaucesVersus'));

async function run({ reduced = false, skip = false, fail = false } = {}) {
  let click, time = 0, removed = false, playing = false, ticks = 0;
  const events = [];
  const audio = { set currentTime(value) { events.push(['seek', value]); } };
  const elements = {};
  const layer = {
    classList: { add() {}, remove() {} }, remove() { removed = true; },
    querySelector(name) {
      return elements[name] ||= { addEventListener(_, fn) { click = fn; },
        set src(value) { events.push(['image', value]); } };
    },
  };
  const context = vm.createContext({
    document: { createElement: () => layer, body: { appendChild() {} } },
    prefiereReducirMovimiento: { matches: reduced },
    precargarImagen: async () => { if (fail) throw Error('image unavailable'); },
    esperarMovimiento: async ms => { time += ms; },
    musicaCinematicaFinalMundo4: audio,
    reproducirMusicaCinematica: () => { playing = true; events.push(['play', time]); },
    detenerMusicaCinematica: () => { playing = false; events.push(['stop']); },
    window: { setTimeout(fn, ms) {
      time += ms;
      if (skip && ++ticks === 3) click();
      fn();
    } },
  });
  vm.runInContext(source, context);
  let error;
  try { await context.reproducirCinematicaFinalHielo(); } catch (e) { error = e; }
  return { events, removed, playing, error };
}

for (const reduced of [false, true]) test(`music changes with Azrak; reduced=${reduced}`, async () => {
  const result = await run({ reduced });
  assert.equal(result.error, undefined);
  assert.equal(result.events.filter(e => e[0] === 'play').length, 1);
  const index = result.events.findIndex(e => e[0] === 'seek');
  assert.equal(result.events[index][1], 33.84);
  assert.match(result.events.slice(0, index).filter(e => e[0] === 'image').at(-1)[1], /06-azrak/);
  assert.equal(result.removed, true);
  assert.equal(result.playing, false);
});
test('skip stops music before Azrak and removes overlay', async () => {
  const result = await run({ skip: true });
  assert.equal(result.events.some(e => e[0] === 'seek'), false);
  assert.equal(result.playing, false);
  assert.equal(result.removed, true);
});
test('image failure still stops music and removes overlay', async () => {
  const result = await run({ fail: true });
  assert.match(result.error.message, /image unavailable/);
  assert.equal(result.playing, false);
  assert.equal(result.removed, true);
});
