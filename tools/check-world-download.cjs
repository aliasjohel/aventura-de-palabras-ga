// Fresh browser storage, a complete forest download, then a second offline visit.
const fs = require('node:fs'), path = require('node:path'), http = require('node:http'), assert = require('node:assert/strict');
const { chromium } = require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = path.resolve(__dirname, '..'), downloads = [];
const server = http.createServer((req, res) => {
  try {
    const file = new URL(req.url, 'http://localhost').pathname.slice(1) || 'index.html';
    if (!path.resolve(root, file).startsWith(root + path.sep)) throw Error('path');
    let body = fs.readFileSync(path.join(root, file));
    if (/\.(html|css|js|json|svg|txt|webmanifest)$/.test(file)) body = Buffer.from(body.toString().replace(/\r\n/g, '\n'));
    res.setHeader('Content-Type', ({'.js':'text/javascript','.html':'text/html','.css':'text/css','.json':'application/json','.mp3':'audio/mpeg','.png':'image/png','.webp':'image/webp','.webmanifest':'application/manifest+json'})[path.extname(file)] || 'application/octet-stream');
    downloads.push(file); res.end(body);
  } catch { res.writeHead(404); res.end(); }
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await context.route('https://**/*', route => route.abort());
    const page = await context.newPage(), errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:' + server.address().port + '/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => I18n.ready);
    await page.waitForFunction(() => !!navigator.serviceWorker.controller, null, { timeout: 90000 });
    const saveBefore = await page.evaluate(() => localStorage.getItem('progresoAventuraGA'));
    await page.evaluate(() => {
      window.worldPreparation = GameResources.world([], 0);
      window.worldProgress = [];
      const observer = new MutationObserver(() => {
        const label = [...document.querySelectorAll('[role="status"] span')].find(el => el.textContent.includes(' MB'));
        if (label) worldProgress.push(label.textContent);
      });
      observer.observe(document.body, { subtree: true, childList: true, characterData: true });
    });
    await page.getByText('Descargando el mundo 1', { exact: true }).waitFor({ timeout: 30000 });
    await page.screenshot({ path: path.join(root, process.env.WORLD_SCREENSHOT || 'docs/v370-descarga-mundo.png') });
    const prepared = await page.evaluate(() => worldPreparation);
    assert.equal(prepared.offline, true);
    assert(await page.evaluate(() => worldProgress.some(text => /MB/.test(text))), 'visible byte progress');
    const preparedPaths = await page.evaluate(async () => {
      const channel = new MessageChannel();
      const paths = [];
      // Expose the exact fixed world selection through a new preparation after pageshow.
      const post = navigator.serviceWorker.controller.postMessage.bind(navigator.serviceWorker.controller);
      navigator.serviceWorker.controller.postMessage = (data, ports) => {
        if (data.type === 'RESOURCE_PACK') paths.push(...data.paths);
        post(data, ports);
      };
      dispatchEvent(new Event('pageshow'));
      await GameResources.world([], 0);
      navigator.serviceWorker.controller.postMessage = post;
      channel.port1.close(); channel.port2.close();
      return paths;
    });
    const worldBytes = await page.evaluate(paths => paths.reduce((sum, file) => sum + (GameResourceSizes[file] || 0), 0), preparedPaths);
    await context.setOffline(true);
    await page.reload(); await page.evaluate(() => I18n.ready);
    const beforeRepeat = downloads.length;
    const repeatStart = Date.now();
    assert.equal((await page.evaluate(() => GameResources.world([], 0))).offline, true);
    const repeatPreparationMs = Date.now() - repeatStart;
    assert.equal(downloads.length, beforeRepeat, 'offline revisit uses saved resources');
    assert.equal(await page.getByText('Descargando el mundo 1', { exact: true }).count(), 0, 'saved worlds never show another download');
    const allAvailable = await page.evaluate(paths => GameResources.available(paths), preparedPaths);
    assert.equal(allAvailable, true);
    await page.evaluate(() => {
      document.getElementById('introOficial')?.remove();
      document.body.classList.remove('intro-pendiente');
      mostrarPantalla(pantallaMenu);
    });
    await page.locator('#btnJugar').click(); // Real user activation for audio.
    const music = await page.evaluate(async () => {
      await musicaMuralDragon.play();
      const result = { playing: !musicaMuralDragon.paused, ready: musicaMuralDragon.readyState };
      musicaMuralDragon.pause(); return result;
    });
    assert(music.playing && music.ready >= 2, 'dragon music plays offline');
    assert.equal(await page.evaluate(() => localStorage.getItem('progresoAventuraGA')), saveBefore);
    await page.evaluate(() => {
      document.getElementById('mapaAventura').close();
      window.repeatedDownloadScreens = [];
      new MutationObserver(() => {
        for (const title of document.querySelectorAll('[role="status"] strong')) {
          if (title.textContent.startsWith('Descargando')) repeatedDownloadScreens.push(title.textContent);
        }
      }).observe(document.body, { subtree: true, childList: true, characterData: true });
      modoPruebasActivo = true;
      selectorMundoPruebas.value = '0'; selectorMisionPruebas.value = '0';
      dispatchEvent(new Event('pageshow'));
      iniciarMisionSeleccionadaPruebas();
    });
    await page.waitForFunction(() => pantallaJuego.classList.contains('activa'));
    assert.deepEqual(await page.evaluate(() => repeatedDownloadScreens), [], 'author test mode does not ask to download a saved world');
    assert.equal(downloads.length, beforeRepeat, 'author test mode stays offline');
    const worlds = [{ world: 1, files: preparedPaths.length, MB: worldBytes / 1e6 }];
    if (process.env.ALL_WORLDS === '1') {
      for (let index = 1; index < 5; index++) {
        await context.setOffline(false);
        const paths = await page.evaluate(async index => {
          const paths = [];
          const worker = navigator.serviceWorker.controller;
          const post = worker.postMessage.bind(worker);
          worker.postMessage = (data, ports) => {
            if (data.type === 'RESOURCE_PACK') paths.push(...data.paths);
            post(data, ports);
          };
          try { await precargarRecursosCriticosMision(index, 0); }
          finally { worker.postMessage = post; }
          return [...new Set(paths)];
        }, index);
        assert(paths.length > 0);
        const MB = await page.evaluate(paths => paths.reduce((sum, path) => sum + (GameResourceSizes[path] || 0), 0) / 1e6, paths);
        await context.setOffline(true);
        await page.reload(); await page.evaluate(() => I18n.ready);
        const before = downloads.length;
        await page.evaluate(index => precargarRecursosCriticosMision(index, 0), index);
        assert.equal(await page.evaluate(paths => GameResources.available(paths), paths), true);
        assert.equal(downloads.length, before, `world ${index + 1} reuses its saved files`);
        worlds.push({ world: index + 1, files: paths.length, MB });
        console.log('PASS offline world ' + (index + 1));
      }
    }
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ pass: true, worlds, repeatPreparationMs, savedOffline: allAvailable, offlineDragonMusic: music, noRepeatDownloads: true, playerSaveUnchanged: true }, null, 2));
  } finally { await browser.close(); server.close(); }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
