/* Only a player's explicit click sends a like. The server derives the recipient. */
(() => {
  'use strict';
  let generation = 0, current = null;
  const el = id => document.getElementById(id);
  const text = key => GameUI.key('profile.' + key);
  function clear() {
    generation++;
    current = null;
    el('meGustaDuelo').hidden = true;
    el('estadoMeGustaDuelo').textContent = '';
  }
  function valid(c) { return current === c && c.generation === generation && c.user === c.adapter.obtenerUsuarioId() && c.isCurrent(); }
  function render() {
    const c = current;
    if (!c) return;
    const button = el('btnMeGustaDuelo');
    el('meGustaDuelo').hidden = false;
    button.disabled = c.pending || c.sent;
    button.setAttribute('aria-pressed', String(c.sent));
    GameUI.text(button, text(c.sent ? 'likeSent' : 'sendLike'));
    GameUI.text(el('estadoMeGustaDuelo'), c.failed ? text('likeFailed') : '');
  }
  async function request(c, send) {
    if (!valid(c) || c.pending || c.sent) return;
    c.pending = true; c.failed = false; render();
    try {
      const r = await c.adapter.meGustaPartida(c.matchId, send);
      if (!valid(c)) return;
      if (r?.userId !== c.user || r.matchId !== c.matchId || !r.opponentId || r.opponentId === c.user || typeof r.sent !== 'boolean' || (send && !r.sent)) throw Error('Invalid receipt');
      c.sent = r.sent;
    } catch (_) {
      if (!valid(c)) return;
      c.failed = true;
    } finally {
      if (valid(c)) { c.pending = false; render(); }
    }
  }
  async function show(matchId, adapter, isCurrent = () => true) {
    clear();
    const user = adapter.obtenerUsuarioId();
    if (!user || !matchId || adapter.proveedor !== 'supabase') return;
    const c = current = {generation, matchId, adapter, user, isCurrent, pending:false, sent:false, failed:false};
    await request(c, false);
  }
  el('btnMeGustaDuelo').addEventListener('click', () => { if (current) void request(current, true); });
  globalThis.addEventListener('wallet-session-ended', clear);
  globalThis.addEventListener('wallet-updated', () => { if (current && !valid(current)) clear(); });
  globalThis.I18n?.subscribe(render);
  globalThis.MatchLikes = Object.freeze({show, clear});
})();
