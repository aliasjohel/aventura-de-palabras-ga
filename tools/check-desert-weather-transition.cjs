const fs=require('fs'),http=require('http'),path=require('path'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');const server=http.createServer((req,res)=>{const f=path.join(root,new URL(req.url,'http://localhost').pathname);fs.readFile(f.endsWith(path.sep)?f+'index.html':f,(err,data)=>{if(err){res.statusCode=404;return res.end();}res.setHeader('Content-Type',({'.js':'text/javascript','.html':'text/html','.css':'text/css','.json':'application/json'})[path.extname(f)]||'application/octet-stream');res.end(data);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const page=await browser.newPage({viewport:{width:844,height:390},serviceWorkers:'block',locale:'es-AR'}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.route('https://**/*',r=>r.abort());await page.goto('http://127.0.0.1:'+server.address().port+'/index.html');await page.evaluate(()=>I18n.ready);
 await page.evaluate(async()=>{document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');modoPruebasActivo=true;escenarioActual=1;misionActual=0;desafiosCompletados=0;await iniciarMisionAventura();});assert.equal(await page.locator('.particula-arena').count(),12);
 for(let n=0;n<3;n++){
  const word=await page.evaluate(()=>palabraSecreta);
  await page.evaluate(()=>{for(const letter of new Set(motorDePalabras().obtenerClavePalabra(palabraSecreta))){const button=[...teclado.querySelectorAll('button')].find(n=>n.textContent===letter);button.click();}});
  if(n<2)await page.waitForFunction(word=>palabraSecreta!==word && [...teclado.querySelectorAll('button')].some(n=>!n.disabled),word,{timeout:20000});
 }
 await page.waitForFunction(()=>!modalHistoria.classList.contains('oculto'),null,{timeout:20000});
 assert.equal(await page.evaluate(()=>misionActual),1);
 await page.evaluate(()=>btnContinuarHistoria.click());
 await page.waitForFunction(()=>!transicionEscenaActiva && modalHistoria.classList.contains('oculto'),null,{timeout:30000});
 const weather=await page.locator('.capa-viento-arena').evaluate(n=>({className:n.className,particles:n.children.length}));console.log('After solving all mission 1 words and walking into mission 2:',weather);
 if(process.argv.includes('--baseline')){assert(weather.className.includes('mision-1'));console.log('REPRODUCED: previous mission breeze is retained instead of creating the storm');return;}
 assert(weather.className.includes('mision-2'));assert.equal(weather.particles,112);assert.equal(await page.evaluate(()=>categoriaActual.textContent),'🌵 Tema: palabras del desierto');
 await page.evaluate(()=>{window.weatherNode=document.querySelector('.capa-viento-arena');});
 await page.evaluate(async()=>{await iniciarMisionAventura();});assert(await page.evaluate(()=>window.weatherNode===document.querySelector('.capa-viento-arena')));
 await page.evaluate(async()=>{misionActual=2;await iniciarMisionAventura();});assert.equal(await page.locator('.capa-viento-arena').count(),0);
 await page.evaluate(async()=>{misionActual=1;await iniciarMisionAventura();});assert.equal(await page.locator('.viento-desierto-mision-2 .particula-arena').count(),112);
 await page.setViewportSize({width:390,height:844});await page.evaluate(async()=>{detenerVientoArena();misionActual=0;await iniciarMisionAventura();misionActual=1;await iniciarMisionAventura();});assert.equal(await page.locator('.viento-desierto-mision-2 .particula-arena').count(),72);
 await page.emulateMedia({reducedMotion:'reduce'});await page.evaluate(()=>actualizarVientoArenaMision());assert.equal(await page.locator('.capa-viento-arena').count(),0);assert.deepEqual(errors,[]);
 await page.evaluate(()=>finalizarContextoPalabras());for(const [lang,label] of [['es','🌵 Tema: palabras del desierto'],['en','🌵 Theme: desert words'],['pt-BR','🌵 Tema: palavras do deserto']]){await page.evaluate(async lang=>{await I18n.setPreference(lang);actualizarCabeceraMision();},lang);assert.equal(await page.evaluate(()=>categoriaActual.textContent),label);}assert.equal(await page.evaluate(()=>aventura[1].nombre),'🏜️ Desierto Perdido');
 console.log('PASS actual mission 1 completion, story and walk to mission 2, stable layer within a mission, removal on mission 3, direct entry, mobile transition and reduced motion');
 }finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
