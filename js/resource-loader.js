/* Resource preflight is separate from match operations and player storage. */
(() => {
  'use strict';
  const pending = new Map();
  const catalogue = new Set(globalThis.GameResourceCatalog || []);
  const preparations = new Map();
  const canonical = value => './' + new URL(value, document.baseURI).pathname.slice(new URL('./', document.baseURI).pathname.length);
  let capabilityWorker, capability;
  async function supportsPacks() {
    const worker = navigator.serviceWorker?.controller;
    if (!worker) return false;
    if (capabilityWorker !== worker) {
      capabilityWorker = worker;
      capability = new Promise(resolve => {
        const channel = new MessageChannel();
        const timer = setTimeout(() => { channel.port1.close(); resolve(false); }, 2000);
        channel.port1.onmessage = ({ data }) => { clearTimeout(timer); channel.port1.close(); resolve(data.resourcePacks === true); };
        worker.postMessage({ type: 'GET_VERSION' }, [channel.port2]);
      });
    }
    return capability;
  }
  async function workerRequest(paths, checkOnly = false, core = false) {
    const worker = navigator.serviceWorker?.controller;
    if (!worker || !await supportsPacks()) return null;
    return new Promise((resolve, reject) => {
      const channel = new MessageChannel();
      const timer = setTimeout(() => { channel.port1.close(); reject(Error('La preparación de recursos tardó demasiado. Podés reintentar.')); }, 180000);
      channel.port1.onmessage = ({ data }) => {
        clearTimeout(timer); channel.port1.close();
        if (data.error) reject(Error(data.error)); else resolve(data);
      };
      worker.postMessage({ type: 'RESOURCE_PACK', paths, checkOnly, core }, [channel.port2]);
    });
  }
  async function load(path) {
    if (pending.has(path)) return pending.get(path);
    const promise = (async () => {
      if (await supportsPacks()) {
        await workerRequest([path]); return;
      }
      // First visit without a controller: validate availability, never claim offline.
      for (let attempt = 0; attempt < 2; attempt++) {
        const controller = new AbortController(), timer = setTimeout(() => controller.abort(), 30000);
        try {
          const response = await fetch(path, { signal: controller.signal, cache: 'default' });
          if (!response.ok) throw Error(`No se pudo cargar ${path} (${response.status})`);
          await response.arrayBuffer(); return;
        } catch (error) { if (attempt || !navigator.onLine) throw error; }
        finally { clearTimeout(timer); }
      }
    })();
    pending.set(path, promise);
    try { await promise; } finally { pending.delete(path); }
  }
  async function ensure(values) {
    const paths = [...new Set(values.filter(Boolean).map(canonical))];
    for (const path of paths) if (!catalogue.has(path)) throw Error(`Recurso fuera del catálogo: ${path}`);
    let next = 0;
    await Promise.all(Array.from({ length: Math.min(3, paths.length) }, async () => {
      while (next < paths.length) await load(paths[next++]);
    }));
    if (await supportsPacks()) await workerRequest(paths);
    return { offline: !!(await workerRequest(paths, true))?.available, total: paths.length };
  }
  function prepareWorld(paths) {
    const key = paths.join('|');
    if (preparations.has(key)) return preparations.get(key);
    const operation = (async () => {
      const notice = document.createElement('div'); notice.setAttribute('role', 'status');
      notice.style.cssText = 'position:fixed;bottom:12px;left:5%;right:5%;z-index:10000;padding:12px;background:#061923;color:white;border-radius:10px;text-align:center';
      const language = globalThis.I18n?.language || 'es';
      const labels = language === 'en' ? ['Preparing scene resources…', 'Retry'] : language === 'pt-BR' ? ['Preparando os recursos da cena…', 'Tentar novamente'] : ['Preparando los recursos de la escena…', 'Reintentar'];
      // Avoid a notice flicker when a previously downloaded world is ready.
      const showTimer = setTimeout(() => document.body.append(notice), 700);
      try {
        for (;;) {
          notice.textContent = labels[0];
          try { return await ensure(paths); }
          catch (error) {
            notice.textContent = error.message + ' ';
            await new Promise(resolve => { const button = document.createElement('button'); button.textContent = labels[1]; button.onclick = resolve; notice.append(button); });
          }
        }
      } finally { clearTimeout(showTimer); notice.remove(); }
    })();
    preparations.set(key, operation);
    operation.finally(() => preparations.delete(key));
    return operation;
  }
  const fighterTokens = {
    explorador: ['explorador', 'aren'], mago: ['mago', 'zafir'], guardiana: ['guardiana'],
    dragon: ['dragon', 'nimbus', 'matriarca'], hombre_lobo: ['hombre-lobo', 'lobo', 'caceria'],
    t_shadow: ['t-shadow', 'shadow'], guardian_alba: ['guardian-alba', 'alba', 'lumen'],
    dragon_hielo: ['dragon-hielo', 'nivor'], azrak: ['azrak', 'abismo'], kalamo: ['kalamo', 'calamo'], kairos: ['kairos'],
  };
  function combat(paths, fighters) {
    const tokens = fighters.flatMap(id => fighterTokens[id] || []);
    const allTokens = Object.values(fighterTokens).flat();
    const matches = (path, values) => values.some(token => path.includes(token));
    const costumes = paths.filter(p => p.includes('/trajes/')).map(p => p.replace(/-(?:base|ataque|habilidad|impacto|victoria|capa|vidrio|mano|planta|envejecido|anciano|invocacion)-v\d+\.png$/, ''));
    return ensure([...paths, ...[...catalogue].filter(p =>
      /assets\/sounds\/(?:ataque-[12]|fight|finish|acertar|error|victoria|derrota|seleccion-personaje)\./.test(p)
      || (p.includes('/sounds/character-') && matches(p, tokens))
      || (/assets\/images\/personajes\/(?:versus|coleccion)\//.test(p) && (!matches(p, allTokens) || matches(p, tokens)))
      || (p.includes('/elementos/') && matches(p, tokens))
      || (costumes.length > 0 && /elements\/cristal-sabiduria-esmeralda\.png|fondos\/reino-azrak\/trono-v1\.png/.test(p))
      || (p.includes('/trajes/') && costumes.some(prefix => p.startsWith(canonical(prefix)))))]);
  }
  function world(paths, index) {
    const worldPattern = [/bosque|forest|santuario|portal/, /desierto|desert|calamo|mural-dragon|recibe-2|mundo-2|diamante/, /cumbres|sky|aeralis|mundo3/, /hielo|winter|nivor|mundo4/, /reino-azrak|azrak|lume|mundo5/][index];
    const cast = [['explorador','guardiana','kairos'], ['explorador','mago','kalamo'],
      ['explorador','dragon','guardian_alba'], ['explorador','dragon_hielo','azrak'], Object.keys(fighterTokens)][index];
    const castTokens = cast.flatMap(id => fighterTokens[id]);
    return prepareWorld([...paths, ...[...catalogue].filter(p =>
      (/assets\/images\//.test(p) && !p.includes('/trajes/') && ((worldPattern.test(p) && !p.includes('/personajes/versus/'))
        || /\/(?:elements|elementos|ui)\//.test(p) || /personajes\/explorador-/.test(p)
        // Combat finishers belong to the selected pair's pack. Narrative NPCs
        // need their scene poses, not every possible victim's finisher frames.
        || (p.includes('/personajes/') && castTokens.some(token => p.includes(token))
          && /-(?:base|ataque|victoria|habilidad|combate|seleccion)(?:-v\d+)?\.png$/.test(p))))
      || (index === 4 && p.includes('/trajes/aren-union-'))
      || (p.includes('/sounds/character-') && castTokens.some(token => p.includes(token)))
      || (/assets\/sounds\//.test(p) && (worldPattern.test(p) || (index === 1 && /azrak-batalla/.test(p)) || !/world-|character-|azrak|mundo[345]|mundo-2|mural|diamante/.test(p))))]);
  }
  globalThis.GameResources = Object.freeze({ ensure, combat, world, prepare: prepareWorld,
    coreAvailable: () => workerRequest([], true, true).then(result => !!result?.available),
    available: values => workerRequest(values.map(canonical), true).then(result => !!result?.available) });
})();
