(() => {
  'use strict';
  const key = 'aventuraAccesoDesarrolladorV1';
  const expectedHash = '425638c83a8fdbb0920472d04e2ef5f11897e6d69839c360231144c8a4fe7e2a';
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname) || location.protocol === 'file:';
  let enabled = local;
  const ready = (async () => {
    const fragment = new URLSearchParams(location.hash.slice(1));
    const supplied = fragment.get('desarrollador');
    try {
      const token = supplied || localStorage.getItem(key);
      if (token && crypto.subtle) {
        const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
        const hash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
        if (hash === expectedHash) {
          enabled = true;
          if (supplied) localStorage.setItem(key, supplied);
        }
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
  globalThis.AventuraDeveloper = Object.freeze({get enabled() { return enabled; }, ready});
})();
