const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{try{
  const file=new URL(req.url,'http://localhost').pathname.slice(1)||'index.html',target=path.resolve(root,file);
  if(!target.startsWith(root+path.sep))throw Error('path');
  res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.json':'application/json','.png':'image/png','.webp':'image/webp'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(target));
}catch{res.writeHead(404);res.end();}});
(async()=>{
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'msedge',headless:true});
  try{
    const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});await context.route('https://**/*',r=>r.abort());
    const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:'+server.address().port+'/',{waitUntil:'domcontentloaded'});await page.evaluate(()=>I18n.ready);
    await page.evaluate(async()=>{
      document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');
      escenarioActual=3;misionActual=0;intentos=6;palabraSecreta='NIEVE';letrasElegidas=[];
      actualizarEscenaPorMision();actualizarCabeceraMision();actualizarVidas();await cambiarPersonaje('preocupado');mostrarPantalla(pantallaJuego);
      await Promise.all([esperarCargaFondoEscenario(),esperarCargaImagen(personajeImagen)]);
    });
    let stage=0; const parts=['pierna-izquierda','pierna-derecha','brazo-izquierdo','brazo-derecho','torso','cabeza']; const poses=[];
    for(const letter of ['A','B','C','D','F','G']){
      await page.evaluate(letter=>elegirLetra(letter,document.createElement('button')),letter);await page.waitForTimeout(800);stage++;
      assert.equal(await page.locator('.peligro-etapa.activa').count(),stage);
      assert.deepEqual(await page.locator('.peligro-etapa.activa .hielo-parte').evaluateAll(els=>els.map(el=>el.dataset.parte)),parts.slice(0,stage));
      poses.push(await page.locator('#personajeImagen').evaluate(el=>({top:el.getBoundingClientRect().top,src:el.src})));
      if(stage<6)assert.equal(await page.locator('.aren-congelado-final').count(),0);
      if(stage===3)await page.screenshot({path:path.join(root,'docs/v374-hielo-tercer-error.png')});
    }
    assert(poses.every(p=>p.src===poses[0].src && Math.abs(p.top-poses[0].top)<.1),'frozen limbs stay in place throughout the six mistakes');
    const final=await page.evaluate(()=>({actorOpacity:getComputedStyle(personajeImagen).opacity,iceOpacity:getComputedStyle(document.querySelector('.hielo-final')).opacity,stage:document.querySelector('.peligro-palabras').dataset.stage}));
    assert.equal(final.actorOpacity,'0');assert.equal(final.iceOpacity,'1');assert.equal(final.stage,'6');
    await page.screenshot({path:path.join(root,'docs/v374-hielo-ultimo-error.png')});
    await page.emulateMedia({reducedMotion:'reduce'});
    assert.equal(await page.locator('.hielo-final').evaluate(el=>getComputedStyle(el).transitionDuration),'0s');
    await page.evaluate(()=>WorldWordHazards.release());assert.equal(await page.locator('.aren-congelado-final').count(),0);
    await page.evaluate(()=>WorldWordHazards.update(3,0,6));assert(await page.locator('.peligro-palabras').evaluate(el=>el.hidden));
    await page.evaluate(()=>{WorldWordHazards.update(3,0,0);WorldWordHazards.update(2,0,0);});assert.equal(await page.locator('.aren-congelado-final').count(),0);
    assert.equal(await page.locator('.aren-en-remolino-final').count(),1);assert.deepEqual(errors,[]);
    console.log(JSON.stringify({pass:true,final,progressiveStages:6,release:true,retry:true,reducedMotion:true,windPreserved:true,errors},null,2));
  }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
