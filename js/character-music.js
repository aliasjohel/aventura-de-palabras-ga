/* Each device scores its opponent locally; no audio state is sent to the match. */
(() => {
  'use strict';
  const tracks = Object.freeze({
    explorador: 'assets/sounds/character-aren.mp3',
    mago: 'assets/sounds/character-zafir.mp3',
    guardiana: 'assets/sounds/character-guardiana.mp3',
    dragon: 'assets/sounds/character-nimbus.mp3',
    hombre_lobo: 'assets/sounds/character-lobo.mp3',
    t_shadow: 'assets/sounds/character-shadow.mp3',
    guardian_alba: 'assets/sounds/character-lumen.mp3',
    dragon_hielo: 'assets/sounds/character-nivor.mp3',
    azrak: 'assets/sounds/character-azrak.mp3',
    kalamo: 'assets/sounds/azrak-batalla-final-musiclfiles.mp3',
    kairos: 'assets/sounds/character-kairos.mp3',
  });
  const players = new Map(), pending = new Set(), blocked = new Set();
  let readState, scene = null, active = null, unlocked = false, away = false, muted = false;
  try { muted = localStorage.getItem('aventura-character-music-muted') === 'true'; } catch {}
  function audioFor(character) {
    const src = tracks[character];
    if (!src) return null;
    if (!players.has(src)) {
      const audio = GameAudio.create(src, 'music');
      audio.preload = 'none'; audio.loop = true; audio.volume = .22;
      players.set(src, audio);
    }
    return players.get(src);
  }
  function target() {
    const state = readState?.();
    if (!state || muted || away || document.hidden || !unlocked) return null;
    if (scene && state.sceneAllowed) return scene.paused ? null : {character: scene.character, volume: .30};
    return state.duel ? {character: state.opponent, volume: .22} : null;
  }
  function pauseAll() { players.forEach(audio => audio.pause()); }
  function sync() {
    const next = target();
    const audio = next && audioFor(next.character);
    players.forEach(player => { if (player !== audio) player.pause(); });
    active = audio;
    if (!audio) return;
    audio.volume = next.volume;
    if (!audio.paused || pending.has(audio) || blocked.has(audio)) return;
    pending.add(audio);
    audio.play().then(() => {
      const latest = target();
      if (active !== audio || players.get(tracks[latest?.character]) !== audio) audio.pause();
    }).catch(() => { blocked.add(audio); }).finally(() => { pending.delete(audio); });
  }
  function startScene(character) {
    const token = {character, paused: false};
    scene = token;
    globalThis.WorldMusic?.sync(); sync();
    return {
      pause(value) { if (scene === token) { token.paused = value; sync(); } },
      close() { if (scene === token) { scene = null; sync(); globalThis.WorldMusic?.sync(); } },
    };
  }
  async function withScene(character, play) {
    const handle = startScene(character);
    try { return await play(value => handle.pause(value)); }
    finally { handle.close(); }
  }
  function updateButton() {
    const button = document.getElementById('btnMusicaDuelo');
    if (!button) return;
    const lang = globalThis.I18n?.language || document.documentElement.lang || 'es';
    const labels = lang.startsWith('en') ? ['Mute music', 'Enable music']
      : lang.startsWith('pt') ? ['Silenciar música', 'Ativar música'] : ['Silenciar música', 'Activar música'];
    button.textContent = (muted ? '🔇 ' : '🎵 ') + (lang.startsWith('en') ? 'Music' : 'Música');
    button.setAttribute('aria-label', labels[Number(muted)]);
    button.title = labels[Number(muted)];
    button.setAttribute('aria-pressed', String(muted));
  }
  function setMuted(value) {
    muted = Boolean(value);
    try { localStorage.setItem('aventura-character-music-muted', String(muted)); } catch {}
    updateButton(); sync();
  }
  function interact() { unlocked = true; blocked.clear(); sync(); }
  document.addEventListener('pointerdown', interact, {passive: true});
  document.addEventListener('keydown', interact);
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pagehide', () => { away = true; pauseAll(); });
  window.addEventListener('pageshow', () => { away = false; sync(); });
  document.getElementById('btnMusicaDuelo')?.addEventListener('click', () => { unlocked = true; blocked.clear(); setMuted(!muted); });
  setInterval(sync, 250);
  globalThis.CharacterMusic = Object.freeze({
    tracks, audioFor, startScene, withScene, setMuted, sync,
    ownsScene: () => Boolean(scene),
    configure(reader) { readState = reader; globalThis.I18n?.subscribe(updateButton); updateButton(); sync(); },
  });
})();
