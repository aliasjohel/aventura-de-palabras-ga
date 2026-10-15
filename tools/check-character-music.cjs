const fs = require('node:fs'), path = require('node:path'), http = require('node:http'), assert = require('node:assert/strict');
const {chromium} = require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = path.resolve(__dirname, '..');
const musicFiles = fs.readdirSync(path.join(root, 'assets/sounds')).filter(file => /^character-.*\.mp3$/.test(file)).map(file => './assets/sounds/' + file);
const server = http.createServer((req, res) => {
  const name = new URL(req.url, 'http://localhost').pathname;
  if (name === '/character-test-sw.js') {
    res.setHeader('Content-Type', 'text/javascript');
    return res.end(fs.readFileSync(path.join(root, 'sw.js'), 'utf8') + '\nCORE_ASSETS.splice(0,CORE_ASSETS.length,...' + JSON.stringify(musicFiles) + ');self.addEventListener("install",e=>e.waitUntil(self.skipWaiting()));');
  }
  const file = path.resolve(root, '.' + (name === '/' ? '/index.html' : name));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (error, data) => {
    if (error) { res.writeHead(404); return res.end(); }
    res.setHeader('Content-Type', ({'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.mp3':'audio/mpeg', '.png':'image/png', '.json':'application/json'})[path.extname(file)] || 'application/octet-stream');
    if (/\.(html|js|css|json|txt)$/.test(file)) data = Buffer.from(data.toString().replace(/\r\n/g, '\n'));
    res.end(data);
  });
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch({channel: 'msedge', headless: true});
  try {
    const contexts = [], pages = [], errors = [];
    for (let i = 0; i < 3; i++) {
      const context = await browser.newContext({viewport: {width: 844, height: 390}}); contexts.push(context);
      await context.route('https://**/*', route => route.abort());
      await context.addInitScript(() => {
        window.nativeAudio = window.Audio; window.characterPlayers = []; window.worldPlayers = [];
        class SilentAudio extends EventTarget {
          constructor(src) { super(); Object.assign(this, {src, paused:true, ended:false, currentTime:0, duration:120, readyState:4, networkState:1, volume:1}); }
          play() { this.paused = false; return Promise.resolve(); } pause() { this.paused = true; } load() {} removeAttribute() {}
        }
        window.Audio = function(src) {
          if (/\/(character-|world-)/.test(String(src))) {
            const audio = new nativeAudio(src); (String(src).includes('/character-') ? characterPlayers : worldPlayers).push(audio); return audio;
          }
          return new SilentAudio(src);
        };
        window.Audio.prototype = nativeAudio.prototype;
      });
      const page = await context.newPage(); pages.push(page); page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://127.0.0.1:' + server.address().port, {waitUntil:'domcontentloaded'}); await page.evaluate(() => I18n.ready);
      await page.evaluate(() => {
        document.getElementById('introOficial')?.remove(); document.body.classList.remove('intro-pendiente');
        document.querySelectorAll('[aria-modal="true"]').forEach(node => node.classList.add('oculto'));
        escenarioActual = 0; misionActual = 1; actualizarEscenaPorMision(); mostrarPantalla(pantallaJuego);
      });
      await page.locator('body').click({position:{x:830,y:375}});
    }
    const [first, second] = pages;
    const victory = pages[2];
    await victory.evaluate(() => {
      personajeRivalVersus = 'kairos';
      dueloAventuraActivo = {...configuracionesDuelosAventura.kairos_bosque, tipo:'kairos_bosque', resultado:'jugador'};
      resultadoRondaVersus.classList.add('oculto'); mostrarPantalla(pantallaVersus);
    });
    await victory.waitForFunction(() => characterPlayers.some(audio => !audio.paused && audio.currentTime > .05));
    await victory.evaluate(() => mostrarResultadoPartidaVersus('jugador', 'Victoria de prueba'));
    await victory.locator('#btnRevanchaVersus').click();
    await victory.locator('.kairos-cinema[data-world-music="true"]').waitFor();
    await victory.waitForFunction(() => worldPlayers.some(audio => audio.src.endsWith('world-forest-sunset-plains.mp3') && !audio.paused && audio.currentTime > .05 && audio.volume > .03)).catch(async error => {
      console.error(await victory.evaluate(() => ({hidden:document.hidden, screen:pantallaJuego.className, scene:CharacterMusic.ownsScene(), calamo:temaCalamoActivo, players:worldPlayers.map(a=>({src:a.src,paused:a.paused,time:a.currentTime,volume:a.volume,error:a.error?.message})), cinemas:[...document.querySelectorAll('.kairos-cinema')].map(n=>n.dataset.worldMusic)}))); throw error;
    });
    assert(await victory.evaluate(() => characterPlayers.every(audio => audio.paused)));
    assert.equal(await victory.evaluate(() => CharacterMusic.ownsScene()), false);
    await contexts[2].close();
    await first.evaluate(() => { window.introPromise = KairosForest.play('entrada'); });
    await first.waitForFunction(() => characterPlayers.some(audio => audio.src.endsWith('character-kairos.mp3') && !audio.paused && audio.currentTime > .05));
    assert(await first.evaluate(() => worldPlayers.every(audio => audio.paused)));
    await first.locator('.kairos-cinema [data-action="pause"]').click();
    assert(await first.evaluate(() => characterPlayers.every(audio => audio.paused)));
    await first.locator('.kairos-cinema [data-action="pause"]').click();
    await first.waitForFunction(() => characterPlayers.some(audio => !audio.paused));
    const introPosition = await first.evaluate(() => characterPlayers[0].currentTime);
    await first.locator('.kairos-cinema [data-action="skip"]').click();
    await first.evaluate(() => iniciarDueloAventura('kairos_bosque'));
    await first.waitForFunction(() => characterPlayers.some(audio => !audio.paused));
    assert(await first.evaluate(position => characterPlayers[0].currentTime >= position, introPosition));
    assert.equal(await first.evaluate(() => characterPlayers.length), 1);
    const enter = (page, opponent) => page.evaluate(opponent => {
      detenerRondaVersus(); dueloAventuraActivo = null; personajeRivalVersus = opponent;
      resultadoRondaVersus.classList.add('oculto'); mostrarPantalla(pantallaVersus); CharacterMusic.sync();
    }, opponent);
    await enter(first, 'dragon_hielo'); await enter(second, 'explorador');
    await first.waitForFunction(() => characterPlayers.some(audio => audio.src.endsWith('character-nivor.mp3') && !audio.paused && audio.currentTime > .05));
    await second.waitForFunction(() => characterPlayers.some(audio => audio.src.endsWith('character-aren.mp3') && !audio.paused && audio.currentTime > .05));
    await first.locator('#btnMusicaDuelo').click();
    assert(await first.evaluate(() => characterPlayers.every(audio => audio.paused)));
    assert(await second.evaluate(() => characterPlayers.some(audio => !audio.paused)));
    await first.locator('#btnMusicaDuelo').click(); await first.waitForFunction(() => characterPlayers.some(audio => !audio.paused));
    for (const opponent of ['azrak', 't_shadow', 'mago', 'guardiana', 'dragon', 'hombre_lobo', 'guardian_alba']) {
      await enter(first, opponent);
      await first.waitForFunction(opponent => characterPlayers.some(audio => audio.src.endsWith(CharacterMusic.tracks[opponent]) && !audio.paused && audio.currentTime > .05), opponent);
      assert.equal(await first.evaluate(() => characterPlayers.filter(audio => !audio.paused).length), 1);
    }
    // Native loop really restarts after reaching the end, rather than relying on a mocked event.
    await second.evaluate(() => { const audio = characterPlayers.find(audio => !audio.paused); audio.currentTime = audio.duration - .15; });
    await second.waitForFunction(() => characterPlayers.some(audio => !audio.paused && audio.currentTime < 2));
    const button = await first.locator('#btnMusicaDuelo').boundingBox();
    assert(button.x >= 0 && button.y >= 0 && button.x + button.width <= 844 && button.y + button.height <= 390);
    await first.screenshot({path:'E:/Proyectos/adventure-music-source/character-music-mobile.png'});
    await first.evaluate(() => mostrarPantalla(pantallaMenu)); assert(await first.evaluate(() => characterPlayers.every(audio => audio.paused)));
    await first.evaluate(async () => { await navigator.serviceWorker.register('/character-test-sw.js'); await navigator.serviceWorker.ready; });
    await first.waitForFunction(() => navigator.serviceWorker.controller);
    await contexts[0].setOffline(true);
    for (const src of musicFiles) {
      const range = await first.evaluate(async src => { const response = await fetch(src, {headers:{Range:'bytes=0-127'}}); return {status:response.status, size:(await response.arrayBuffer()).byteLength}; }, src);
      assert.deepEqual(range, {status:206, size:128});
      await first.evaluate(src => {
        window.probe = new nativeAudio(src);
        let button = document.getElementById('offlineMusicProbe');
        if (!button) { button = document.createElement('button'); button.id = 'offlineMusicProbe'; button.textContent = 'Audio'; document.body.append(button); }
        button.onclick = () => { window.probePromise = probe.play(); };
      }, src);
      await first.locator('#offlineMusicProbe').click(); await first.evaluate(() => probePromise);
      await first.waitForFunction(() => probe.currentTime > .03); await first.evaluate(() => probe.pause());
    }
    assert.deepEqual(errors, []);
    console.log('PASS: forest music after Kairos victory/report; intro-to-duel audio, independent opponents/mute, all 10 decodable themes, native loop, mobile button and offline range playback.');
  } finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
})().catch(error => { console.error(error); process.exitCode = 1; });
