(() => {
  'use strict';
  // Reuse the server's six allowed quick-message codes; never send image URLs.
  const entries = [
    ['buena', 'zafir-aplauso', 650], ['alcanzo', 'nimbus-lengua', 1200],
    ['facil', 'aren-risa', 700], ['preparate', 'shadow-desafio', 1100],
    ['revancha', 'guardiana-triste', 1400], ['suerte', 'lumen-guino', 1200],
  ];
  const catalog = Object.freeze(Object.fromEntries(entries.map(([id, name, period]) => [id,
    Object.freeze({ id, name, period, label: `multiplayer.stickers.${id}`, asset: `assets/images/stickers/${name}-v1.png` }),
  ])));
  function create(id, preview = false) {
    const sticker = Object.hasOwn(catalog, id) ? catalog[id] : null;
    if (!sticker) return null;
    const node = document.createElement('span');
    node.className = `versus-sticker${preview ? ' sticker-preview' : ''}`;
    node.dataset.sticker = id;
    node.style.setProperty('--sticker-period', `${sticker.period}ms`);
    if (preview) node.setAttribute('aria-hidden', 'true');
    else { node.setAttribute('role', 'img'); GameUI.attribute(node, 'aria-label', GameUI.key(sticker.label)); }
    const image = document.createElement('img');
    image.src = sticker.asset;
    image.alt = '';
    image.draggable = false;
    image.decoding = 'async';
    image.loading = preview ? 'lazy' : 'eager';
    const fallback = document.createElement('span');
    fallback.className = 'sticker-fallback'; fallback.hidden = true;
    GameUI.text(fallback, GameUI.key(sticker.label));
    image.addEventListener('error', () => { image.hidden = true; fallback.hidden = false; });
    node.append(image, fallback);
    return node;
  }
  globalThis.VersusStickers = Object.freeze({ catalog, create });
})();
