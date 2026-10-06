(function (root, factory) {
  "use strict";
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
    return;
  }
  const api = factory();
  const base = new URL("../locales/", document.currentScript.src);
  const instance = api.create({
    document,
    loadJson: async (path) => {
      const response = await fetch(new URL(path, base));
      if (!response.ok) throw new Error(`i18n resource unavailable: ${path}`);
      return response.json();
    },
  });
  root.I18n = instance;
  // Stage 1 is Spanish only. No preference, account or game storage is accessed.
  instance.ready = instance.init().then(() => instance.apply()).catch((error) => {
    console.warn("i18n: original Spanish HTML retained", error);
  });
})(globalThis, () => {
  "use strict";
  function create({ loadJson, document: doc = null, report = (message) => console.warn(message) }) {
    const catalogs = new Map();
    const reported = new Set();
    let registry = null;
    let initialized = false;
    let initialization = null;
    function diagnostic(message) {
      if (!reported.has(message)) { reported.add(message); report(message); }
    }
    function resolve(key) {
      if (typeof key !== "string") return undefined;
      const separator = key.indexOf(".");
      if (separator <= 0) return undefined;
      const namespace = key.slice(0, separator);
      let value = catalogs.get(namespace);
      for (const part of key.slice(separator + 1).split(".")) {
        if (!value || typeof value !== "object" || !Object.hasOwn(value, part)) return undefined;
        value = value[part];
      }
      return value;
    }
    function translation(key, params = {}) {
      let value = resolve(key);
      if (value && typeof value === "object") {
        const count = Number(params.count);
        if (!Number.isFinite(count)) return undefined;
        const category = new Intl.PluralRules(registry?.formatLocale || "es-AR").select(count);
        value = value[category] ?? value.other;
      }
      if (typeof value !== "string") return undefined;
      let complete = true;
      const result = value.replace(/\{([A-Za-z][A-Za-z0-9_]*)\}/g, (placeholder, name) => {
        if (!Object.hasOwn(params, name)) { complete = false; return placeholder; }
        return String(params[name]);
      });
      return complete ? result : undefined;
    }
    function t(key, params = {}) {
      const value = translation(key, params);
      if (value === undefined) diagnostic(`i18n: missing key or parameters: ${key}`);
      return value ?? key;
    }
    function apply(scope = doc) {
      if (!initialized || !scope) return;
      const nodes = [...scope.querySelectorAll("[data-i18n], [data-i18n-aria-label], [data-i18n-title], [data-i18n-placeholder], [data-i18n-alt]")];
      if (scope.matches?.("[data-i18n], [data-i18n-aria-label], [data-i18n-title], [data-i18n-placeholder], [data-i18n-alt]")) nodes.unshift(scope);
      for (const node of nodes) {
        for (const attribute of ["text", "aria-label", "title", "placeholder", "alt"]) {
          const key = node.getAttribute(attribute === "text" ? "data-i18n" : `data-i18n-${attribute}`);
          if (!key) continue;
          const value = translation(key);
          if (value === undefined) { diagnostic(`i18n: original text retained for ${key}`); continue; }
          if (attribute === "text") {
            // Annotate only text leaves: never replace child nodes or their listeners.
            if (node.children.length) { diagnostic(`i18n: text binding requires a leaf: ${key}`); continue; }
            if (node.textContent !== value) node.textContent = value;
          } else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
        }
      }
    }
    async function initialize() {
      registry = await loadJson("languages.json");
      if (registry.defaultLanguage !== "es" || registry.fallbackLanguage !== "es"
          || registry.languages.length !== 1 || registry.languages[0].id !== "es") {
        throw new Error("Stage 1 requires Spanish only");
      }
      const results = await Promise.allSettled(registry.namespaces.map(async (namespace) => {
        const values = await loadJson(`es/${namespace}.json`);
        if (!values || Array.isArray(values) || typeof values !== "object") throw new Error(`Invalid catalog: ${namespace}`);
        catalogs.set(namespace, values);
      }));
      results.forEach((result, index) => {
        if (result.status === "rejected") diagnostic(`i18n: catalog unavailable: ${registry.namespaces[index]}`);
      });
      initialized = true;
      if (doc?.documentElement) doc.documentElement.lang = registry.formatLocale;
    }
    function init() {
      if (!initialization) initialization = initialize().catch((error) => { initialization = null; throw error; });
      return initialization;
    }
    return {
      init, t, apply,
      get language() { return "es"; },
      get fallbackLanguage() { return "es"; },
      number: (value, options) => new Intl.NumberFormat(registry?.formatLocale || "es-AR", options).format(value),
      date: (value, options) => new Intl.DateTimeFormat(registry?.formatLocale || "es-AR", options).format(value),
    };
  }
  return Object.freeze({ create });
});
