const fs=require('fs'),http=require('http'),path=require('path'),assert=require('assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{const f=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname.replace(/\/$/,'/index.html'));if(!f.startsWith(root+path.sep)){res.writeHead(403);return res.end();}fs.readFile(f,(err,data)=>{if(err){res.writeHead(404);return res.end();}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png'})[path.extname(f)]||'application/octet-stream');res.end(data);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'msedge',headless:true});try{const page=await browser.newPage({viewport:{width:390,height:844},serviceWorkers:'block'});await page.route('https://**/*',r=>r.abort());const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.clock.install();await page.goto('http://127.0.0.1:'+server.address().port);await page.evaluate(()=>I18n.ready);
await page.evaluate(()=>{document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');document.querySelectorAll('[aria-modal="true"]').forEach(n=>n.classList.add('oculto'));escenarioActual=0;misionActual=0;actualizarCabeceraMision();actualizarEscenaPorMision();mostrarPantalla(pantallaJuego);});

await page.evaluate(()=>{desafiosCompletados=0;crearTeclado();mostrarHistoriaMision({misionYaCargada:true});});
assert.equal(await page.locator('#personajeImagen').evaluate(n=>getComputedStyle(n).visibility),'hidden');
await page.evaluate(()=>btnContinuarHistoria.click());await page.clock.runFor(1400);
assert.equal(await page.locator('#personajeImagen').evaluate(n=>n.classList.contains('llegada-bosque-activa')),true);
assert.equal(await page.locator('#teclado button:enabled').count(),0);
const first=await page.locator('#personajeImagen').getAttribute('src');await page.clock.runFor(180);const second=await page.locator('#personajeImagen').getAttribute('src');assert.notEqual(first,second);
await page.clock.runFor(1400);assert.equal(await page.locator('#personajeImagen').evaluate(n=>n.classList.contains('llegada-bosque-activa')),false);assert((await page.locator('#teclado button:enabled').count())>0);assert.equal(await page.evaluate(()=>temporizadorSpriteCaminata),null);
assert.equal(await page.locator('#personajeImagen').evaluate(n=>getComputedStyle(n).left),await page.locator('#personajeImagen').evaluate(n=>parseFloat(getComputedStyle(n).getPropertyValue('--posicion-inicial-explorador'))/100*n.parentElement.clientWidth+'px'));
await page.evaluate(()=>{desafiosCompletados=1;mostrarHistoriaMision({misionYaCargada:true});});assert.equal(await page.locator('.llegada-bosque-preparada').count(),0);
await page.emulateMedia({reducedMotion:'reduce'});await page.evaluate(()=>{desafiosCompletados=0;mostrarHistoriaMision({misionYaCargada:true});});await page.evaluate(()=>btnContinuarHistoria.click());await page.clock.runFor(2000);assert.equal(await page.locator('.llegada-bosque-activa').count(),0);assert.equal(await page.locator('#personajeImagen').evaluate(n=>getComputedStyle(n).visibility),'visible');
assert.deepEqual(errors,[]);console.log('PASS: first-mission arrival, changing walk sprites, blocked/restored keyboard, correct final position, no repeat mid-mission, reduced motion, no browser errors.');
}finally{await browser.close();server.close();}})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
