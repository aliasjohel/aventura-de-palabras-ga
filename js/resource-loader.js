/* Resource preflight is separate from match operations and player storage. */
(() => {
  'use strict';
  const pending = new Map();
  const catalogue = new Set(globalThis.GameResourceCatalog || []);
  const preparations = new Map();
  const readyWorlds = new Map();
  globalThis.addEventListener?.('pageshow', () => readyWorlds.clear());
  document.addEventListener?.('visibilitychange', () => {
    if (document.visibilityState === 'visible') readyWorlds.clear();
  });
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
  async function workerRequest(paths, checkOnly = false, core = false, onProgress) {
    const worker = navigator.serviceWorker?.controller;
    if (!worker || !await supportsPacks()) return null;
    return new Promise((resolve, reject) => {
      const channel = new MessageChannel();
      let timer;
      const resetTimer = () => {
        clearTimeout(timer);
        timer = setTimeout(() => { channel.port1.close(); reject(Error('La preparación de recursos tardó demasiado. Podés reintentar.')); }, 180000);
      };
      resetTimer();
      channel.port1.onmessage = ({ data }) => {
        if (data.progress) { resetTimer(); onProgress?.(data); return; }
        clearTimeout(timer); channel.port1.close();
        if (data.error) reject(Error(data.error)); else resolve(data);
      };
      worker.postMessage({ type: 'RESOURCE_PACK', paths, checkOnly, core, sizes: globalThis.GameResourceSizes }, [channel.port2]);
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
  async function ensure(values, onProgress) {
    const paths = [...new Set(values.filter(Boolean).map(canonical))];
    for (const path of paths) if (!catalogue.has(path)) throw Error(`Recurso fuera del catálogo: ${path}`);
    if (await supportsPacks()) {
      const result = await workerRequest(paths, false, false, onProgress);
      return { offline: result.available, total: paths.length };
    }
    let next = 0;
    await Promise.all(Array.from({ length: Math.min(3, paths.length) }, async () => {
      while (next < paths.length) await load(paths[next++]);
    }));
    if (await supportsPacks()) await workerRequest(paths);
    return { offline: !!(await workerRequest(paths, true))?.available, total: paths.length };
  }
  function prepareWorld(paths, worldIndex) {
    const key = paths.join('|');
    if (preparations.has(key)) return preparations.get(key);
    const operation = (async () => {
      const notice = document.createElement('div'); notice.setAttribute('role', 'status');
      notice.style.cssText = 'position:fixed;inset:0;z-index:10000;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:16px;padding:24px;background:#061923f5;color:white;text-align:center';
      const language = globalThis.I18n?.language || 'es';
      const labels = language === 'en' ? ['Preparing scene resources…', 'Retry'] : language === 'pt-BR' ? ['Preparando os recursos da cena…', 'Tentar novamente'] : ['Preparando los recursos de la escena…', 'Reintentar'];
      const title = document.createElement('strong');
      title.textContent = worldIndex === undefined ? labels[0] :
        (language === 'en' ? `Downloading world ${worldIndex + 1}` : language === 'pt-BR' ? `Baixando o mundo ${worldIndex + 1}` : `Descargando el mundo ${worldIndex + 1}`);
      const bar = document.createElement('progress'); bar.max = 1; bar.value = 0;
      bar.style.cssText = 'width:min(420px,85vw);height:24px;accent-color:#63d9c6';
      bar.setAttribute('aria-label', title.textContent);
      const detail = document.createElement('span');
      const update = data => {
        bar.max = data.totalBytes || data.total || 1;
        bar.value = data.completedBytes || data.completed || 0;
        detail.textContent = data.totalBytes
          ? `${(data.completedBytes / 1e6).toFixed(1)} / ${(data.totalBytes / 1e6).toFixed(1)} MB · ${Math.floor(100 * data.completedBytes / data.totalBytes)}%`
          : `${data.completed || 0} / ${data.total} · ${Math.floor(100 * (data.completed || 0) / (data.total || 1))}%`;
      };
      // Avoid a notice flicker when a previously downloaded world is ready.
      const showTimer = setTimeout(() => document.body.append(notice), 700);
      try {
        for (;;) {
          notice.replaceChildren(title, bar, detail);
          try {
            if (worldIndex !== undefined && navigator.serviceWorker && !navigator.serviceWorker.controller) {
              await new Promise((resolve, reject) => {
                const changed = () => {
                  if (!navigator.serviceWorker.controller) return;
                  clearTimeout(timer);
                  navigator.serviceWorker.removeEventListener('controllerchange', changed);
                  resolve();
                };
                const timer = setTimeout(() => {
                  navigator.serviceWorker.removeEventListener('controllerchange', changed);
                  reject(Error(language === 'en' ? 'Offline storage is still preparing. Please retry.' : language === 'pt-BR' ? 'O armazenamento offline ainda está sendo preparado. Tente novamente.' : 'Todavía se está preparando el almacenamiento sin conexión. Reintentá.'));
                }, 20000);
                navigator.serviceWorker.addEventListener('controllerchange', changed);
                changed();
              });
            }
            const result = await ensure(paths, update);
            if (result.offline) void navigator.storage?.persist?.().catch(() => {});
            return result;
          }
          catch (error) {
            notice.textContent = error.message + ' ';
            await new Promise(resolve => { const button = document.createElement('button'); button.textContent = labels[1]; button.onclick = resolve; notice.append(button); });
          }
        }
      } finally { clearTimeout(showTimer); notice.remove(); }
    })();
    preparations.set(key, operation);
    operation.then(() => preparations.delete(key), () => preparations.delete(key));
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
    const cast = [['explorador','guardiana','kairos','hombre_lobo'], ['explorador','mago','kalamo'],
      ['explorador','dragon','guardian_alba'], ['explorador','dragon_hielo','azrak'], Object.keys(fighterTokens)][index];
    const castTokens = cast.flatMap(id => fighterTokens[id]);
    const worker = navigator.serviceWorker?.controller;
    const key = String(index);
    const ready = readyWorlds.get(key);
    if (ready?.worker === worker) return ready.promise;
    const operation = prepareWorld([...new Set([...paths, ...[...catalogue].filter(p =>
      (/assets\/images\//.test(p) && !p.includes('/trajes/') && ((worldPattern.test(p) && !p.includes('/personajes/versus/'))
        || /\/(?:elements|elementos|ui)\//.test(p) || /personajes\/explorador-/.test(p)
        // Include the world's combat poses and finishers before the first mission.
        || (p.includes('/personajes/') && castTokens.some(token => p.includes(token)))
        || (p.includes('/personajes/versus/') && !Object.values(fighterTokens).flat().some(token => p.includes(token)))))
      || (index === 4 && p.includes('/trajes/aren-union-'))
      || (index === 0 && p.includes('/intro/'))
      || (p.includes('/sounds/character-') && castTokens.some(token => p.includes(token)))
      || (index === 0 && /mural-dragon1|comienza-mundo-2/.test(p))
      || (/assets\/sounds\//.test(p) && (worldPattern.test(p) || (index === 1 && /azrak-batalla/.test(p)) || !/world-|character-|azrak|mundo[345]|mundo-2|mural|diamante/.test(p))))])], index);
    readyWorlds.set(key, { worker, promise: operation });
    operation.then(result => { if (!result.offline) readyWorlds.delete(key); }, () => readyWorlds.delete(key));
    return operation;
  }
  globalThis.GameResources = Object.freeze({ ensure, combat, world, prepare: prepareWorld,
    coreAvailable: () => workerRequest([], true, true).then(result => !!result?.available),
    available: values => workerRequest(values.map(canonical), true).then(result => !!result?.available) });
})();
