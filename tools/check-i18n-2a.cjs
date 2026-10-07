const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),fixture={
 progresoAventuraGA:JSON.stringify({escenarioActual:1,misionActual:2,cristalesObtenidos:1,monedas:321,historialPalabrasAventura:{}}),
 aventuraTiendaV1:JSON.stringify({coins:321,owned:['aren-bosque'],equipped:{explorador:'aren-bosque'}}),
 aventuraPalabrasIdentidadV1:JSON.stringify({avatar:'explorador',frame:'clasico'}),
 'sb-stage2a-auth-token':JSON.stringify({test:'preserve-session'})};
// Only test HTTP responses replace heavy artwork/audio. Repository assets are unchanged.
const pixel=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aQ1sAAAAASUVORK5CYII=','base64');
const server=http.createServer((req,res)=>{
 const url=new URL(req.url,'http://localhost'),relative=decodeURIComponent(url.pathname).replace(/^\//,'')||'index.html',target=path.resolve(root,relative);
 if(!target.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
 if(relative.startsWith('assets/')){res.setHeader('Content-Type',relative.match(/\.(png|jpe?g|webp)$/i)?'image/png':'application/octet-stream');return res.end(relative.match(/\.(png|jpe?g|webp)$/i)?pixel:Buffer.alloc(0));}
 fs.readFile(target,(error,data)=>{if(error){res.writeHead(404);return res.end();}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json'})[path.extname(target)]||'application/octet-stream');res.end(data);});
});
(async()=>{await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const url='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 try{
  for(const [locale,expected] of [['es-AR','es'],['en-US','en'],['pt-BR','pt-BR']]){
   const context=await browser.newContext({locale,viewport:{width:390,height:844},serviceWorkers:'block',reducedMotion:'reduce'});
   await context.route('https://**/*',route=>route.abort());
   await context.addInitScript(data=>{for(const [key,value]of Object.entries(data))if(localStorage.getItem(key)===null)localStorage.setItem(key,value);},fixture);
   const page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));
   await page.goto(url,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>globalThis.I18n?.ready);await page.evaluate(()=>I18n.ready);
   assert.equal(await page.evaluate(()=>I18n.language),expected);
   await page.evaluate(()=>{document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');document.getElementById('btnConfiguracion').click();});
   await page.waitForFunction(()=>!document.getElementById('idiomaJuego').disabled);
   assert.deepEqual(await page.locator('#idiomaJuego option').evaluateAll(options=>options.map(option=>option.value)),['auto','es','en','pt-BR']);
   for(const [id,label]of [['en','Settings'],['pt-BR','Configurações'],['es','Configuración']]){
    await page.locator('#idiomaJuego').selectOption(id);await page.waitForFunction(value=>I18n.preference===value&& !document.getElementById('idiomaJuego').disabled,id);
    assert.equal(await page.locator('#tituloConfiguracion').textContent(),label);
    assert(await page.locator('.panel-configuracion').evaluate(panel=>panel.scrollWidth<=panel.clientWidth));
    assert.deepEqual(await page.evaluate(keys=>Object.fromEntries(keys.map(key=>[key,localStorage.getItem(key)])),Object.keys(fixture)),fixture);
   }
   await page.locator('#idiomaJuego').selectOption('en');await page.waitForFunction(()=>I18n.preference==='en');
   await page.reload({waitUntil:'domcontentloaded'});await page.evaluate(()=>I18n.ready);assert.equal(await page.evaluate(()=>I18n.language),'en');
   await page.evaluate(()=>I18n.setPreference('auto'));assert.equal(await page.evaluate(()=>I18n.language),expected);
   if(locale==='es-AR'){
    await page.evaluate(()=>{document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');document.getElementById('btnConfiguracion').click();});
    await page.setViewportSize({width:320,height:740});await page.evaluate(()=>I18n.setPreference('pt-BR'));
    assert(await page.locator('.panel-configuracion').evaluate(panel=>panel.scrollWidth<=panel.clientWidth));
    await page.screenshot({path:path.join(root,'tools/i18n-2a-mobile.png')});
   }
   assert.deepEqual(errors,[]);await context.close();
  }
  console.log('PASS es/en/pt-BR device detection, selector, live changes, reload, automatic reset, mobile layout and unchanged saved data');
  // Exercise the actual application service worker and Cache Storage offline.
  const context=await browser.newContext({locale:'es-AR',viewport:{width:390,height:844},serviceWorkers:'allow',reducedMotion:'reduce'});
  await context.route('https://**/*',route=>route.abort());const page=await context.newPage();
  page.on('console',message=>{if(message.type()==='warning'&&message.text().includes('i18n'))console.log(message.text());});
  await page.goto(url,{waitUntil:'domcontentloaded'});await page.evaluate(()=>I18n.ready);
  await page.waitForFunction(async()=>{
   const registration=await navigator.serviceWorker.getRegistration();if(!registration?.active)return false;
   const cache=await caches.open('aventura-palabras-runtime-v340');return !!(await cache.match('./locales/pt-BR/menu.json',{ignoreSearch:true}));
  },null,{timeout:60000});
  await page.reload({waitUntil:'domcontentloaded'});await page.evaluate(()=>I18n.ready);
  await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
  await context.setOffline(true);
  await page.evaluate(()=>I18n.setPreference('en'));assert.equal(await page.locator('#btnConfiguracion').textContent(),'Settings');
  await page.evaluate(()=>I18n.setPreference('pt-BR'));assert.equal(await page.locator('#btnConfiguracion').textContent(),'Configurações');
  await page.reload({waitUntil:'domcontentloaded'});await page.evaluate(()=>I18n.ready);assert.equal(await page.evaluate(()=>I18n.language),'pt-BR');
  await page.evaluate(()=>I18n.setPreference('es'));assert.equal(await page.locator('#btnConfiguracion').textContent(),'Configuración');
  await context.close();console.log('PASS real PWA installation, three-language switching and preference persistence on offline reload');
 }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
