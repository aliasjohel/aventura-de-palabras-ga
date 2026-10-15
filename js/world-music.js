/* Quiet exploration music. Battle/cinematic audio remains owned by the game. */
(() => {
  'use strict';
  const tracks = Object.freeze({
    forest: 'assets/sounds/world-forest-sunset-plains.mp3',
    desert: 'assets/sounds/world-desert-meditation.mp3',
    sky: 'assets/sounds/world-sky-rising-moon.mp3',
    winterSlow: 'assets/sounds/world-winter-slow.mp3',
    winter: 'assets/sounds/world-winter-through-snow.mp3',
    azrak: 'assets/sounds/world-azrak-end-of-hope.mp3',
  });
  const players = new Map(), fades = new Map(), pending = new Set(), blocked = new Set();
  let readState, active, unlocked = false, fadeTimer;
  function select(world, mission) {
    return world === 3 ? (mission < 3 ? tracks.winterSlow : tracks.winter)
      : [tracks.forest, tracks.desert, tracks.sky, null, tracks.azrak][world];
  }
  function visible(node) {
    return node.getClientRects().length > 0 && getComputedStyle(node).visibility !== 'hidden';
  }
  function state() {
    const game = readState?.();
    if (!game || document.hidden || !game.screen.classList.contains('activa')) return null;
    const cinema = [...document.querySelectorAll('.cinematica-azrak,.cinematica-final-cumbres,.cinematica-santuario,.cinematica-despertar-dragon,.kairos-cinema,.story-cinema,.presentacion-mision')].some(node => node.dataset.worldMusic !== 'true' && visible(node));
    if (cinema || game.cinematic || globalThis.CharacterMusic?.ownsScene()) return null;
    const dialogue = game.dialogue || [...document.querySelectorAll('[aria-modal="true"]')].some(visible);
    return {src: select(game.world, game.mission), volume: dialogue ? 0.035 : 0.14};
  }
  function pauseAll() {
    fades.clear(); clearInterval(fadeTimer); fadeTimer = null;
    players.forEach(audio => { audio.pause(); audio.volume = 0; });
  }
  function fade(audio, volume, pause = false) {
    if (fades.get(audio)?.target === volume) return;
    if (Math.abs(audio.volume - volume) < .001) { if (pause) audio.pause(); return; }
    fades.set(audio, {from: audio.volume, target: volume, start: performance.now(), pause});
    if (fadeTimer) return;
    fadeTimer = setInterval(() => {
      const now = performance.now();
      fades.forEach((step, player) => {
        const ratio = Math.min(1, (now - step.start) / 650);
        player.volume = step.from + (step.target - step.from) * ratio;
        if (ratio === 1) { fades.delete(player); if (step.pause) player.pause(); }
      });
      if (!fades.size) { clearInterval(fadeTimer); fadeTimer = null; }
    }, 40);
  }
  function sync() {
    const target = state();
    if (!unlocked || !target?.src) { pauseAll(); return; }
    let next = players.get(target.src);
    if (!next) {
      next = new Audio(target.src); next.loop = true; next.preload = 'none'; next.volume = 0;
      players.set(target.src, next);
    }
    if (active !== next) { if (active) fade(active, 0, true); active = next; }
    if (!next.paused) { fade(next, target.volume); return; }
    if (pending.has(next) || blocked.has(next)) return;
    pending.add(next);
    next.play().then(() => {
      const current = state();
      if (active !== next || current?.src !== target.src) { next.pause(); return; }
      fade(next, current.volume);
    }).catch(error => {
      // Pausing for a duel can interrupt a still-loading play request. That is
      // not an autoplay denial and must not block the return to exploration.
      if (error.name !== 'AbortError') blocked.add(next);
    }).finally(() => { pending.delete(next); });
  }
  function interact() { unlocked = true; blocked.clear(); sync(); }
  document.addEventListener('pointerdown', interact, {passive: true});
  document.addEventListener('keydown', interact);
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pagehide', pauseAll);
  window.addEventListener('pageshow', sync);
  // Covers narrative flags and audio started outside the DOM as well as dialogs.
  setInterval(sync, 250);
  globalThis.WorldMusic = Object.freeze({
    configure(reader) { readState = reader; sync(); },
    sync,
    select,
    tracks,
  });
})();
