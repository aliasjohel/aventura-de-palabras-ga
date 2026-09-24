(() => {
  'use strict';
  const key = 'aventuraAccesoDesarrolladorV1';
  const expectedHash = '425638c83a8fdbb0920472d04e2ef5f11897e6d69839c360231144c8a4fe7e2a';
  const expectedCodeHash = 'fcae6b31e45bbbc149fe5789532e9cd8c355d98366ee077921e76bf4168cd2dc';
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname) || location.protocol === 'file:';
  let enabled = local;
  function normalize(value) {
    const text = String(value || '').trim();
    if (/^https?:\/\//i.test(text)) {
      try { return new URLSearchParams(new URL(text).hash.slice(1)).get('desarrollador') || ''; } catch (_) { return ''; }
    }
    const code = text.replace(/[\s-]/g, '').toUpperCase();
    return /^[A-F0-9]{12}$/.test(code) ? code : text;
  }
  async function valid(token) {
    if (!token || !crypto.subtle) return false;
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
    const hash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
    return hash === expectedHash || hash === expectedCodeHash;
  }
  async function activate(value) {
    await ready;
    const token = normalize(value);
    if (!await valid(token)) throw Error('Código incorrecto. Revisalo e intentá nuevamente.');
    let persisted = true;
    try { localStorage.setItem(key, token); } catch (_) { persisted = false; }
    enabled = true;
    globalThis.dispatchEvent(new Event('developer-access-changed'));
    return {persisted};
  }
  const ready = (async () => {
    const fragment = new URLSearchParams(location.hash.slice(1));
    const supplied = fragment.get('desarrollador');
    try {
      const token = supplied || localStorage.getItem(key);
      if (await valid(normalize(token))) {
        enabled = true;
        if (supplied) localStorage.setItem(key, supplied);
      }
    } catch (_) { /* La falta de almacenamiento no impide jugar. */ }
    finally {
      // El enlace de autor no queda en la barra ni se comparte con la URL normal.
      if (supplied) {
        fragment.delete('desarrollador');
        const hash = fragment.toString();
        history.replaceState(history.state, '', location.pathname + location.search + (hash ? '#' + hash : ''));
      }
    }
    return enabled;
  })();
  globalThis.AventuraDeveloper = Object.freeze({get enabled() { return enabled; }, ready, activate});
})();
