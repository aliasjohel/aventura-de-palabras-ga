(() => {
  'use strict';
  // The public artifact never enables author tools, including localhost WebViews.
  // tools/serve-author-local.cjs changes this literal only in a loopback HTTP response.
  const localAuthorBuild = false;
  // Author previews are available only on the explicit development server.
  // Public HTTPS, file/WebView builds, URL fragments and storage cannot enable them.
  // This flag is never used as a server entitlement.
  const enabled = localAuthorBuild && ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname)
    && ['http:', 'https:'].includes(location.protocol);
  try { localStorage.removeItem('aventuraAccesoDesarrolladorV1'); } catch (_) {}
  const fragment = new URLSearchParams(location.hash.slice(1));
  if (fragment.has('desarrollador')) {
    fragment.delete('desarrollador');
    const hash = fragment.toString();
    history.replaceState(history.state, '', location.pathname + location.search + (hash ? '#' + hash : ''));
  }
  globalThis.AventuraDeveloper = Object.freeze({enabled, ready: Promise.resolve(enabled)});
})();
