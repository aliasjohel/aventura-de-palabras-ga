/* Presentation-only localization for legacy story renderers. Scene data stays
 * in Spanish so animation timing, actor identities and game rules stay stable. */
(() => {
  'use strict';
  const normalize = value => String(value ?? '').replace(/\s+/g, ' ').trim();
  const sourceKeys = new Map(Object.entries(globalThis.I18nSpanishUI || {})
    .filter(([key]) => key.startsWith('adventure.narrative.'))
    .map(([key, value]) => [normalize(value), key]));
  const selector = [
    '#modalHistoria', '#modalPrologo', '#modalIntroduccionMundo2',
    '#btnSaltarNarrativa', '#mensajePersonaje', '#selectorMisionPruebas',
    '.mapa-mision strong', '.kairos-cinema', '.cinematica-azrak',
    '.cinematica-final-cumbres', '.cinematica-final-desierto',
    '.cinematica-desafio-guardiana', '.encuentro-guardiana-bosque',
    '.encuentro-mago-desierto', '.cinematica-despertar-dragon',
    '.cinematica-santuario',
  ].join(',');
  const originals = new WeakMap();

  function resolve(source) {
    const normalized = normalize(source), key = sourceKeys.get(normalized);
    if (key) return globalThis.GameUI.resolve(globalThis.GameUI.key(key));
    // Captions add a shot counter; mission lists add a number or chapter.
    const caption = normalized.match(/^(.*?) · (\d+\s*\/\s*\d+)$/);
    if (caption && sourceKeys.has(caption[1])) return `${resolve(caption[1])} · ${caption[2]}`;
    const mission = normalized.match(/^(Misión \d+) · (.+)$/);
    if (mission && sourceKeys.has(mission[1]) && sourceKeys.has(mission[2])) return `${resolve(mission[1])} · ${resolve(mission[2])}`;
    const numbered = normalized.match(/^(\d+\. )(.+)$/);
    if (numbered && sourceKeys.has(numbered[2])) return numbered[1] + resolve(numbered[2]);
    // Illustrated scenes expose the same title and narration together as alt text.
    const divider = normalized.indexOf('. ');
    if (divider >= 0) {
      const title = normalized.slice(0, divider), text = normalized.slice(divider + 2);
      if (sourceKeys.has(title) && sourceKeys.has(text)) return `${resolve(title)}. ${resolve(text)}`;
    }
    return source;
  }

  function translateSlot(node, attribute) {
    const read = () => attribute ? node.getAttribute(attribute) : node.nodeValue;
    const value = read();
    if (!value) return;
    let slots = originals.get(node);
    if (!slots) { slots = new Map(); originals.set(node, slots); }
    let slot = slots.get(attribute);
    // A renderer can reuse a caption node for a different shot or trap stage.
    if (!slot || value !== slot.last) slot = { source: value, last: value };
    const output = resolve(slot.source);
    slot.last = output;
    slots.set(attribute, slot);
    if (output !== value) {
      if (attribute) node.setAttribute(attribute, output);
      else node.nodeValue = output;
    }
  }

  function localize(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let node = root;
    do {
      if (node.nodeType === Node.TEXT_NODE) translateSlot(node, null);
      else if (node.nodeType === Node.ELEMENT_NODE) {
        for (const attribute of ['aria-label', 'alt', 'title']) translateSlot(node, attribute);
      }
    } while ((node = walker.nextNode()));
  }

  function refresh() { document.querySelectorAll(selector).forEach(localize); }
  function observe() {
    refresh();
    new MutationObserver(records => {
      const roots = new Set();
      for (const record of records) {
        const target = record.target.nodeType === Node.ELEMENT_NODE ? record.target : record.target.parentElement;
        const owner = target?.closest(selector);
        if (owner) roots.add(owner);
        for (const added of record.addedNodes) if (added.nodeType === Node.ELEMENT_NODE) {
          if (added.matches(selector)) roots.add(added);
          added.querySelectorAll(selector).forEach(root => roots.add(root));
        }
      }
      roots.forEach(localize);
    }).observe(document.body, { subtree: true, childList: true, characterData: true,
      attributes: true, attributeFilter: ['aria-label', 'alt', 'title'] });
  }
  globalThis.NarrativeI18n = Object.freeze({ resolve });
  globalThis.I18n.subscribe(refresh);
  globalThis.I18n.ready.then(refresh);
  if (document.body) observe();
  else document.addEventListener('DOMContentLoaded', observe, { once: true });
})();
