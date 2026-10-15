const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../js/character-music.js'), 'utf8');
function fixture(storage = new Map()) {
  const events = {}, timers = [], players = [];
  let deny = false, delayed = false, resolvePlay;
  const state = {opponent: 'dragon_hielo', duel: false, sceneAllowed: true};
  const button = {setAttribute(key, value) { this[key] = value; }, addEventListener(type, fn) { this[type] = fn; }};
  class Audio {
    constructor(src) { Object.assign(this, {src, paused: true, volume: 1, currentTime: 0, calls: 0}); players.push(this); }
    play() { this.calls++; if (deny) return Promise.reject(Error('blocked')); this.paused = false; return delayed ? new Promise(resolve => { resolvePlay = resolve; }) : Promise.resolve(); }
    pause() { this.paused = true; }
  }
  const document = {hidden: false, documentElement: {lang: 'es'}, getElementById: () => button, addEventListener(type, fn) { events[type] = fn; }};
  const context = {Audio, GameAudio: {create: src => new Audio(src)}, document, localStorage: {getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value)},
    window: {addEventListener(type, fn) { events[type] = fn; }}, setInterval(fn) { timers.push(fn); }, WorldMusic: {sync() {}}};
  vm.runInNewContext(source, context);
  const music = context.CharacterMusic;
  music.configure(() => state);
  const settle = async () => { for (let i = 0; i < 5; i++) await Promise.resolve(); };
  return {music, state, button, document, players, events, storage, settle,
    deny(value) { deny = value; }, delay(value) { delayed = value; }, resolve() { resolvePlay(); },
    async interact() { events.pointerdown(); await settle(); },
    async poll() { timers.forEach(fn => fn()); await settle(); }};
}
test('approved mappings contain eleven distinct themes; Azrak and Shadow are swapped', () => {
  const {music} = fixture();
  assert.equal(Object.keys(music.tracks).length, 11);
  assert.equal(new Set(Object.values(music.tracks)).size, 11);
  assert(music.tracks.azrak.endsWith('character-azrak.mp3'));
  assert(music.tracks.t_shadow.endsWith('character-shadow.mp3'));
  assert(music.tracks.kalamo.endsWith('azrak-batalla-final-musiclfiles.mp3'));
});
test('two devices independently play the opponent and every theme loops', async () => {
  const aren = fixture(), nivor = fixture();
  aren.state.duel = nivor.state.duel = true;
  nivor.state.opponent = 'explorador';
  await aren.interact(); await nivor.interact();
  assert(aren.players[0].src.endsWith('character-nivor.mp3'));
  assert(nivor.players[0].src.endsWith('character-aren.mp3'));
  for (const character of Object.keys(aren.music.tracks)) {
    aren.state.opponent = character; await aren.poll();
    assert.equal(aren.players.filter(audio => !audio.paused).length, 1);
    assert(aren.players.find(audio => !audio.paused).loop);
  }
});
test('cinematic pause and transition to duel preserve the theme position', async () => {
  const f = fixture(); await f.interact();
  const scene = f.music.startScene('kairos'); await f.settle();
  const audio = f.players[0]; audio.currentTime = 22;
  scene.pause(true); assert(audio.paused);
  scene.pause(false); await f.settle(); assert(!audio.paused);
  f.state.duel = true; f.state.opponent = 'kairos'; scene.close(); await f.settle();
  assert.equal(f.players.length, 1); assert.equal(audio.currentTime, 22); assert(!audio.paused);
  assert.equal(f.music.ownsScene(), false);
});
test('local mute pauses only music and persists across reloads', async () => {
  const f = fixture(); f.state.duel = true; await f.interact(); const audio = f.players[0]; audio.currentTime = 17;
  f.button.click(); assert(audio.paused); assert.equal(f.state.duel, true); assert.equal(f.button['aria-pressed'], 'true');
  const reloaded = fixture(f.storage); reloaded.state.duel = true; await reloaded.interact(); assert.equal(reloaded.players.length, 0);
  f.button.click(); await f.settle(); assert(!audio.paused); assert.equal(audio.currentTime, 17);
});
test('background, page hide, menu and results stop music without losing position', async () => {
  const f = fixture(); f.state.duel = true; await f.interact(); const audio = f.players[0]; audio.currentTime = 9;
  f.document.hidden = true; f.events.visibilitychange(); assert(audio.paused);
  f.document.hidden = false; f.events.visibilitychange(); await f.settle(); assert(!audio.paused);
  f.events.pagehide(); await f.poll(); assert(audio.paused);
  f.events.pageshow(); await f.settle(); assert(!audio.paused); assert.equal(audio.currentTime, 9);
  f.state.duel = false; await f.poll(); assert(audio.paused);
});
test('failed autoplay waits for a new gesture; late play resolution cannot restart a hidden screen', async () => {
  const f = fixture(); f.state.duel = true; f.deny(true); await f.interact(); await f.poll(); await f.poll();
  assert.equal(f.players[0].calls, 1);
  f.deny(false); f.delay(true); await f.interact();
  f.state.duel = false; f.music.sync(); f.resolve(); await f.settle(); assert(f.players[0].paused);
});
test('scene cleanup runs after an interrupted cinematic and stale handles cannot cancel a newer scene', async () => {
  const f = fixture(); await f.interact();
  const old = f.music.startScene('mago'), latest = f.music.startScene('azrak');
  old.close(); old.pause(true); await f.settle(); assert(f.music.ownsScene());
  assert(f.players.find(audio => !audio.paused).src.endsWith('character-azrak.mp3')); latest.close();
  await assert.rejects(f.music.withScene('kairos', async () => { throw Error('cancelled'); }));
  assert.equal(f.music.ownsScene(), false); assert(f.players.every(audio => audio.paused));
});
