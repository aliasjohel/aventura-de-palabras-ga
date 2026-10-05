const http = require('node:http'), fs = require('node:fs'), path = require('node:path');
const assert = require('node:assert/strict');
const {chromium} = require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = path.resolve(__dirname, '..');
const server = http.createServer((req, res) => {
  const file = path.resolve(root, '.' + new URL(req.url, 'http://localhost').pathname.replace(/\/$/, '/index.html'));
  if (!file.startsWith(root + path.sep)) return res.writeHead(403).end();
  fs.readFile(file, (error, data) => {
    if (error) return res.writeHead(404).end();
    res.setHeader('Content-Type', ({'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png'})[path.extname(file)] || 'application/octet-stream');
    res.end(data);
  });
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch({headless:true, channel:'msedge'});
  try {
    for (const width of [844, 667]) {
      const page = await browser.newPage({viewport:{width,height:390},serviceWorkers:'block'});
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.route('**/*', r => new URL(r.request().url()).hostname === '127.0.0.1' ? r.continue() : r.abort());
      await page.goto('http://127.0.0.1:' + server.address().port);
      await page.evaluate(() => {
        document.querySelector('#introOficial')?.remove();document.body.classList.remove('intro-pendiente');
        modoPruebasActivo=true;herramientasAutorDisponibles=true;
        adaptadorSalasVersus={...adaptadorSalasVersus,proveedor:'local'};
        seleccionarPersonajeVersus('explorador');personajeRivalVersus='explorador';
        trajesPruebaVersus.jugador.explorador='union';trajesPruebaVersus.rival.explorador='union';
        mostrarPantalla(pantallaVersus);prepararDueloVersus({comenzarRonda:false});refrescarTrajesVersus();
        actualizarPanelHabilidadVersus(5);
      });
      assert.equal(await page.locator('#nombreHabilidadVersus').textContent(),'Destello de Sabiduría');
      await page.clock.install();await page.clock.pauseAt(new Date(Date.now()+100));
      await page.evaluate(() => {demoVersus.cargaHabilidadJugador=letrasParaHabilidadVersus;activarHabilidadLocalVersus();});
      await page.locator('#personajeVersusUno').evaluate(img=>img.decode());
      assert.match(await page.locator('#personajeVersusUno').getAttribute('src'),/aren-union-habilidad-v1/);
      assert.equal(await page.locator('.aren-union-duelo-capa').first().evaluate(el=>el.hidden),true);
      assert.equal(await page.locator('.habilidad-lupa-versus').evaluate(el=>getComputedStyle(el).display),'none');
      await page.clock.runFor(500);
      const ray=page.locator('.destello-union-nucleo');
      assert.match(await ray.getAttribute('d'),/^M.+ L/);
      const geometry=await page.evaluate(()=>{
        const ray=document.querySelector('.destello-union-nucleo');
        const target=[...tecladoVersus.querySelectorAll('button')].find(b=>b.textContent===demoVersus.pistaLupaJugador).getBoundingClientRect();
        const end=ray.getPointAtLength(ray.getTotalLength());
        return {distance:Math.hypot(end.x-target.left-target.width/2,end.y-target.top-target.height/2)};
      });
      assert(geometry.distance<2,'Beam must reach the revealed key');
      await page.screenshot({path:path.join(root,`tools/aren-union-habilidad-propia-${width}.png`)});
      await page.clock.runFor(200);
      assert.equal(await page.locator('#tecladoVersus .pista-lupa').count(),1);
      assert.equal(await page.locator('#miniTecladoRivalVersus').evaluate(el=>el.classList.contains('efecto-descarga-union')),true);
      await page.screenshot({path:path.join(root,`tools/aren-union-habilidad-descarga-${width}.png`)});
      await page.clock.runFor(470);
      assert.equal(await page.locator('.destello-union-rayo').count(),0);
      assert.match(await page.locator('#personajeVersusUno').getAttribute('src'),/aren-union-base-v1/);
      await page.evaluate(()=>reproducirAnimacionHabilidadVersus('explorador',{desdeRival:true,alImpactar:()=>aplicarDescargaUnionVersus(true)}));
      await page.locator('#personajeVersusDos').evaluate(img=>img.decode());
      await page.clock.runFor(600);
      assert.match(await page.locator('#personajeVersusDos').getAttribute('src'),/aren-union-habilidad-v1/);
      assert.equal(await page.locator('#tecladoVersus').evaluate(el=>el.classList.contains('efecto-descarga-union')),true);
      assert.equal(await page.locator('#tecladoVersus button:not(:disabled)').count(),0);
      assert(await page.locator('#personajeVersusDos').evaluate(el=>new DOMMatrixReadOnly(getComputedStyle(el).transform).a<0));
      await page.screenshot({path:path.join(root,`tools/aren-union-habilidad-rival-${width}.png`)});
      await page.evaluate(()=>limpiarAnimacionHabilidadVersus());
      assert.equal(await page.locator('.destello-union-rayo').count(),0);
      await page.clock.runFor(2000);
      assert.equal(await page.locator('#tecladoVersus').evaluate(el=>el.classList.contains('efecto-descarga-union')),false);
      // Online rival Union events previously skipped the cast animation entirely.
      await page.evaluate(()=>procesarEventoPartidaOnline({
        eventSequence:ultimoEventoPartidaVersus+1,
        me:{userId:'self'},opponent:{userId:'opponent'},
        lastEvent:{type:'ability_used',actorId:'opponent',character:'explorador',costume:'aren-union'}
      }));
      await page.locator('#personajeVersusDos').evaluate(img=>img.decode());
      assert.match(await page.locator('#personajeVersusDos').getAttribute('src'),/aren-union-habilidad-v1/);
      assert.equal(await page.locator('.destello-union-rayo').count(),1);
      await page.evaluate(()=>limpiarAnimacionHabilidadVersus());
      await page.emulateMedia({reducedMotion:'reduce'});
      await page.evaluate(()=>reproducirAnimacionHabilidadVersus('explorador',{pista:'A'}));
      await page.clock.runFor(180);
      assert.equal(await page.locator('.destello-union-rayo').count(),0);
      await page.evaluate(()=>{trajesPruebaVersus.jugador.explorador='original';actualizarPanelHabilidadVersus(0);reproducirAnimacionHabilidadVersus('explorador');});
      assert.equal(await page.locator('#nombreHabilidadVersus').textContent(),'Lupa');
      assert.match(await page.locator('#personajeVersusUno').getAttribute('src'),/explorador-lupa/);
      assert.equal(await page.locator('.destello-union-rayo').count(),0);
      assert.deepEqual(errors,[]);
      await page.close();
    }
    console.log('PASS: finger pose, exact hint target, both keyboards, blocking, cleanup, reduced motion and classic Aren');
  } finally {await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
