/* Decorative forest visitors: no game state, word or progress changes. */
(() => {
  'use strict';
  let scene, screen, world = -1, mission = -1, timer, removal, visitor, context;
  const voices = new Set();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  function eligible() {
    return world === 0 && [0, 2].includes(mission) && !document.hidden
      && screen?.classList.contains('activa')
      && ![...document.querySelectorAll('[aria-modal="true"]')].some(node => node.getClientRects().length && getComputedStyle(node).visibility !== 'hidden');
  }
  function clear() {
    clearTimeout(timer); clearTimeout(removal); timer = removal = null;
    visitor?.remove(); visitor = null;
    voices.forEach(voice => { try { voice.stop(); } catch {} }); voices.clear();
  }
  function unlock() {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;
    context ||= new Audio();
    if (context.state === 'suspended') void context.resume().catch(() => {});
  }
  function call(kind) {
    if (!context || context.state !== 'running') return;
    const bird = kind === 'bird';
    for (let i = 0; i < (bird ? 3 : 2); i++) {
      const start = context.currentTime + i * (bird ? .19 : .12);
      const voice = context.createOscillator(), volume = context.createGain();
      voice.type = 'sine';
      voice.frequency.setValueAtTime(bird ? 2600 + i * 220 : 1500, start);
      voice.frequency.exponentialRampToValueAtTime(bird ? 4200 : 2300, start + .045);
      voice.frequency.exponentialRampToValueAtTime(bird ? 2900 : 1200, start + .11);
      volume.gain.setValueAtTime(.0001, start);
      volume.gain.exponentialRampToValueAtTime(bird ? .035 : .018, start + .012);
      volume.gain.exponentialRampToValueAtTime(.0001, start + .13);
      voice.connect(volume); volume.connect(context.destination); voices.add(voice);
      voice.onended = () => { voices.delete(voice); voice.disconnect(); volume.disconnect(); };
      voice.start(start); voice.stop(start + .15);
    }
  }
  function visit() {
    if (!eligible()) return;
    const kind = mission === 0 ? 'bird' : 'squirrel';
    call(kind);
    if (reduced.matches) return;
    visitor = document.createElement('div');
    visitor.className = `forest-visitor forest-visitor-${kind}`;
    visitor.setAttribute('aria-hidden', 'true');
    visitor.style.setProperty('--visitor-y', kind === 'bird' ? `${14 + Math.random() * 20}%` : '78%');
    const sprite = document.createElement('span'); sprite.className = 'forest-visitor-sprite';
    visitor.append(sprite); scene.append(visitor);
    removal = setTimeout(() => { visitor?.remove(); visitor = null; }, kind === 'bird' ? 6500 : 5500);
  }
  function schedule(first = false) {
    if (timer || !eligible()) return;
    timer = setTimeout(() => {
      timer = null; visit(); schedule();
    }, first ? 6000 + Math.random() * 4000 : 22000 + Math.random() * 18000);
  }
  function refresh() {
    if (!eligible()) clear(); else schedule(true);
  }
  function configure(options) {
    const changed = world !== options.world || mission !== options.mission;
    if (changed) clear();
    ({scene, screen, world, mission} = options); refresh();
  }
  document.addEventListener('pointerdown', unlock, {passive: true});
  document.addEventListener('keydown', unlock);
  document.addEventListener('visibilitychange', refresh);
  reduced.addEventListener('change', () => { clear(); refresh(); });
  new MutationObserver(refresh).observe(document.body, {subtree: true, attributes: true, attributeFilter: ['class']});
  globalThis.ForestWildlife = Object.freeze({configure, stop: clear});
})();
