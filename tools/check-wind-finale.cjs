const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{try{
  const file=new URL(req.url,'http://localhost').pathname.slice(1)||'index.html',target=path.resolve(root,file);
  if(!target.startsWith(root+path.sep))throw Error('path');
  res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.json':'application/json','.png':'image/png','.webp':'image/webp'})[path.extname(file)]||'application/octet-stream');
  res.end(fs.readFileSync(target));
}catch{res.writeHead(404);res.end();}});
(async()=>{
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const browser=await chromium.launch({channel:'msedge',headless:true});
  try{
    const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
    await context.route('https://**/*',r=>r.abort());
    const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:'+server.address().port+'/',{waitUntil:'domcontentloaded'});await page.evaluate(()=>I18n.ready);
    await page.evaluate(async()=>{
      document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');
      escenarioActual=2;misionActual=0;intentos=1;
      actualizarEscenaPorMision();actualizarCabeceraMision();actualizarVidas();
      await cambiarPersonaje('preocupado');mostrarPantalla(pantallaJuego);
      await Promise.all([esperarCargaFondoEscenario(),esperarCargaImagen(personajeImagen)]);
    });
    await page.waitForTimeout(800);
    await page.screenshot({path:path.join(root,'docs/v371-viento-quinto-error.png')});
    assert.equal(await page.locator('.aren-en-remolino-final').count(),0);
    await page.evaluate(async()=>{intentos=0;actualizarVidas();await cambiarPersonaje('triste');await esperarCargaImagen(personajeImagen);});
    await page.waitForTimeout(900);
    const final=await page.evaluate(()=>({stage:document.querySelector('.peligro-palabras').dataset.stage,actorOpacity:getComputedStyle(personajeImagen).opacity,stormOpacity:getComputedStyle(document.querySelector('.torbellino-final')).opacity,translate:getComputedStyle(personajeImagen).translate}));
    assert.equal(final.stage,'6');assert.equal(Number(final.actorOpacity),.2);assert.equal(final.stormOpacity,'1');assert.equal(final.translate,'0px -10px');
    await page.screenshot({path:path.join(root,'docs/v371-viento-ultimo-error.png')});
    await page.emulateMedia({reducedMotion:'reduce'});
    assert.equal(await page.evaluate(()=>getComputedStyle(personajeImagen).translate),'none');
    await page.evaluate(()=>{WorldWordHazards.update(3,0,0);});
    assert.equal(await page.locator('.aren-en-remolino-final').count(),0);
    await page.evaluate(()=>WorldWordHazards.update(2,0,6));
    assert(await page.locator('.peligro-palabras').evaluate(el=>el.hidden));
    await page.evaluate(()=>{WorldWordHazards.update(2,0,0);WorldWordHazards.release();});
    assert.equal(await page.locator('.aren-en-remolino-final').count(),0);
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({pass:true,final,reducedMotion:true,reset:true,otherWorldUnchanged:true,errors},null,2));
  }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
