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
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 try {
  for(const width of [844,667]) {
   const page=await browser.newPage({viewport:{width,height:390},serviceWorkers:'block'}),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   await page.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort());
   await page.goto('http://127.0.0.1:'+server.address().port);
   await page.evaluate(()=>{
    document.querySelector('#introOficial')?.remove();document.body.classList.remove('intro-pendiente');
    modoPruebasActivo=true;herramientasAutorDisponibles=true;adaptadorSalasVersus={...adaptadorSalasVersus,proveedor:'local'};
    seleccionarPersonajeVersus('kalamo');personajeRivalVersus='explorador';
    trajesPruebaVersus.rival.explorador='union';mostrarPantalla(pantallaVersus);
    prepararDueloVersus({comenzarRonda:false});refrescarTrajesVersus();ladoGanadorCinematicaVersus='jugador';
   });
   const scenes=[
    ['reproducirLibroPalabrasPerdidasVersus','#pantallaRotaKalamoVersus','vidrio',8000],
    ['reproducirEclipseInfernalVersus','#manoVictimaAzrakVersus','mano',4500],
    ['reproducirPrisionEsmeraldaVersus','#carnivoraDevorandoVersus','planta',3400],
    ['reproducirSiglosEnUnSegundoVersus','#victimaKairosEnvejecidaVersus','envejecido',4800],
    ['reproducirSiglosEnUnSegundoVersus','#victimaKairosAncianaVersus','anciano',6500]
   ];
   for(const [fn,selector,pose,time] of scenes) {
    await page.evaluate(fn=>{void window[fn]('explorador');},fn);
    await page.locator(selector).evaluate(img=>img.decode());
    assert.match(await page.locator(selector).getAttribute('src'),new RegExp('aren-union-'+pose+'-v1'));
    await page.evaluate(async time=>{
     clearTimeout(demoVersus.temporizadorCinematica);
     const animations=cinematicaFinalVersus.getAnimations({subtree:true});
     for(const a of animations)a.pause();await Promise.all(animations.map(a=>a.ready));
     for(const a of animations)a.currentTime=time;
    },time);
    await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
    if(pose==='planta')assert(Number(await page.locator(selector).evaluate(el=>getComputedStyle(el).opacity))>.9);
    await page.screenshot({path:path.join(root,`tools/aren-union-cinematica-${pose}-${width}.png`)});
    await page.evaluate(()=>cancelarCinematicaFinalVersus());
   }
   // The losing player also retains the costume, independent of screen side.
   await page.evaluate(()=>{trajesPruebaVersus.jugador.explorador='union';ladoGanadorCinematicaVersus='rival';void reproducirLibroPalabrasPerdidasVersus('explorador');});
   assert.match(await page.locator('#pantallaRotaKalamoVersus').getAttribute('src'),/aren-union-vidrio-v1/);
   await page.evaluate(()=>{cancelarCinematicaFinalVersus();trajesPruebaVersus.jugador.explorador='original';void reproducirLibroPalabrasPerdidasVersus('explorador');});
   assert.match(await page.locator('#pantallaRotaKalamoVersus').getAttribute('src'),/explorador-pantalla-rota-kalamo-v1/);
   assert.deepEqual(errors,[]);await page.close();
  }
  console.log('PASS: five cinematic poses, both victim sides, original costume and mobile layouts');
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
