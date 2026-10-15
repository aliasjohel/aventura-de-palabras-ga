/* Stage 3B: language rules and save adapters, independent of UI and network. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.WordGameplay = api;
})(globalThis, () => {
  'use strict';
  const version = 'word-rules-v1';
  const definitions = {
    es: {locale: 'es-AR', allowed: /^[A-ZÁÉÍÓÚÜÑ]+$/, strip: /[^A-ZÁÉÍÓÚÜÑ]/g},
    en: {locale: 'en-US', allowed: /^[A-Z]+$/, strip: /[^A-Z]/g},
    'pt-BR': {locale: 'pt-BR', allowed: /^[A-ZÁÀÂÃÉÊÍÓÔÕÚÜÇ]+$/, strip: /[^A-ZÁÀÂÃÉÊÍÓÔÕÚÜÇ]/g},
  };
  const cache = new Map();
  function rules(language = 'es') {
    if (!Object.hasOwn(definitions, language)) throw new RangeError('Unsupported word language');
    if (cache.has(language)) return cache.get(language);
    const definition = definitions[language];
    const display = value => String(value ?? '').normalize('NFC').toLocaleUpperCase(definition.locale).normalize('NFC');
    function key(value) {
      let text = display(value);
      if (!definition.allowed.test(text)) return '';
      if (language === 'es') text = text.replaceAll('Ñ', '\uE000');
      return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replaceAll('\uE000', 'Ñ');
    }
    const rows = Object.freeze(['QWERTYUIOP', 'ASDFGHJKL' + (language === 'es' ? 'Ñ' : ''), 'ZXCVBNM'].map(row => Object.freeze([...row])));
    const alphabet = Object.freeze(rows.flat());
    function validate(value, {min = 3, max = 12} = {}) {
      const word = display(value), match = key(word);
      return Boolean([...String(value ?? '').normalize('NFC')].length === [...word].length && match && word.length >= min && word.length <= max && [...match].every(letter => alphabet.includes(letter)));
    }
    const api = Object.freeze({language, version, rows, alphabet, display, key, validate,
      letter: value => { const match = key(value); return match.length === 1 && alphabet.includes(match) ? match : ''; },
      // Kept for the existing Spanish preparation form. Bank validation never cleans data.
      clean: (value, max = 12) => display(value).replace(definition.strip, '').slice(0, max),
    });
    cache.set(language, api); return api;
  }
  function createContext({requestedLanguage = 'es', availableLanguages = ['es'], online = false, mode = 'adventure', bankVersion} = {}) {
    const requested = Object.hasOwn(definitions, requestedLanguage) ? requestedLanguage : 'es';
    const language = online ? 'es' : availableLanguages.includes(requested) ? requested : 'es';
    if (!availableLanguages.includes(language)) throw new Error('No complete word bank available');
    return Object.freeze({mode, requestedLanguage: requested, language, fallback: requested !== language,
      bankVersion: bankVersion || (language === 'es' ? 'es-original-v1' : language + '-v1'), rulesVersion: version, rules: rules(language)});
  }
  function validateBank(entries, language, {hints = false} = {}) {
    const rule = rules(language), seen = new Set();
    for (const entry of entries) {
      const word = typeof entry === 'string' ? entry : entry.palabra;
      if (!rule.validate(word)) throw new Error('Invalid word: ' + word);
      const key = rule.key(word);
      if (seen.has(key)) throw new Error('Duplicate word: ' + word);
      if (hints && (typeof entry.pista !== 'string' || !entry.pista.trim())) throw new Error('Missing hint: ' + word);
      seen.add(key);
    }
    return true;
  }
  // IDs refer to the original, immutable bank order, not translated spellings.
  const wordId = (world, index, language = "es") => `${language}:world:${world}:word:${index}`;
  function encodeHistory(history, worlds, language = "es") {
    return Object.fromEntries(worlds.map((world, index) => {
      const record = history[index] || {}, ids = new Map(world.palabras.map((item, n) => [item.palabra, wordId(index, n, language)]));
      const encode = list => Array.isArray(list) ? [...new Set(list.map(word => ids.get(word)).filter(Boolean))] : [];
      return [index, {used: encode(record.usadas), inMission: encode(record.enMision), mission: Number.isInteger(record.mision) ? record.mision : -1}];
    }));
  }
  function decodeHistory(history, worlds, language = "es") {
    if (!history || typeof history !== 'object' || Array.isArray(history)) return null;
    const result = {};
    worlds.forEach((world, index) => {
      const record = history[index]; if (!record || typeof record !== 'object') return;
      const words = new Map(world.palabras.map((item, n) => [wordId(index, n, language), item.palabra]));
      const decode = list => Array.isArray(list) ? [...new Set(list.map(id => words.get(id)).filter(Boolean))] : [];
      result[index] = {usadas: decode(record.used), enMision: decode(record.inMission), mision: Number.isInteger(record.mission) ? record.mission : -1};
    });
    return result;
  }
  return Object.freeze({rules, createContext, validateBank, encodeHistory, decodeHistory, wordId, version});
});
