(() => {
  'use strict';
  // Adapt legacy Spanish presentation values only. Engine state and messages stay intact.
  let entries;
  function value(text, depth = 0) {
    if (typeof text !== 'string' || !text || depth > 3) return text;
    if (!entries) entries = Object.entries(I18nSpanishUI)
      .filter(([key]) => key.startsWith('adventure.combat.'))
      .map(([key, source]) => {
        const names = [];
        const pattern = source.split(/(\{[A-Za-z][A-Za-z0-9_]*\})/g).map(part => {
          if (/^\{/.test(part)) {
            const name = part.slice(1, -1); names.push(name);
            return name === 'icon' ? '(\\p{Extended_Pictographic}\\uFE0F?)' : '(.+?)';
          }
          return part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }).join('');
        return {key, source, names, pattern: new RegExp('^' + pattern + '$', 'u')};
      }).sort((a, b) => a.names.length - b.names.length || b.source.length - a.source.length);
    for (const entry of entries) {
      const match = entry.pattern.exec(text);
      if (!match) continue;
      const params = Object.fromEntries(entry.names.map((name, index) => [name,
        ['detail', 'name', 'subject', 'topic'].includes(name) ? value(match[index + 1], depth + 1) : match[index + 1]
      ]));
      return GameUI.key(entry.key, params);
    }
    return text;
  }
  globalThis.CombatUI = Object.freeze({
    value,
    text: (node, text) => GameUI.text(node, value(text)),
    attribute: (node, attribute, text) => GameUI.attribute(node, attribute, value(text))
  });
})();
