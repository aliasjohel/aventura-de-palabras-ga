const fs=require('fs'),http=require('http'),path=require('path'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{const f=path.join(root,new URL(req.url,'http://localhost').pathname);fs.readFile(f.endsWith(path.sep)?f+'index.html':f,(err,data)=>{if(err){res.statusCode=404;return res.end();}res.setHeader('Content-Type',({'.js':'text/javascript','.html':'text/html','.css':'text/css','.json':'application/json'})[path.extname(f)]||'application/octet-stream');res.end(data);});});
const catalogs=Object.fromEntries(['es','en','pt-BR'].map(lang=>[lang,JSON.parse(fs.readFileSync(path.join(root,'locales',lang,'adventure.json'))).narrative]));
function expected(lang,source){const key=Object.keys(catalogs.es).find(key=>catalogs.es[key]===source);assert(key,'Missing source: '+source);return catalogs[lang][key];}
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block',locale:'es-AR',reducedMotion:'reduce'});
  await context.route('https://**/*',r=>r.abort());
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:'+server.address().port+'/index.html');await page.evaluate(()=>I18n.ready);
  await page.evaluate(()=>{document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');modoPruebasActivo=true;mostrarPantalla(pantallaJuego);});
  for(const lang of ['en','pt-BR','es']){
   await page.evaluate(async lang=>{finalizarContextoPalabras();await I18n.setPreference(lang);},lang);
   // Render every actual story, without changing its original object or puzzle metadata.
   for(let world=0;world<5;world++)for(let mission=0;mission<10;mission++){
    const actual=await page.evaluate(async({world,mission})=>{escenarioActual=world;misionActual=mission;const native=obtenerHistoriaMision();mostrarHistoriaMision();await new Promise(requestAnimationFrame);return {native,chapter:numeroCapitulo.textContent,title:tituloCapitulo.textContent,text:textoCapitulo.textContent};},{world,mission});
    assert.equal(actual.chapter,expected(lang,actual.native.capitulo));assert.equal(actual.title,expected(lang,actual.native.titulo));assert.equal(actual.text,expected(lang,actual.native.texto));
   }
   await page.evaluate(()=>{modalHistoria.classList.add('oculto');finalizarSecuenciaNarrativa(secuenciaHistoriaActiva);});
   const shots=await page.evaluate(()=>[...AzrakWorld.betrayal,...AzrakWorld.finale,...AzrakWorld.shadowEncounter,...Object.values(KairosForest.scenes).flat()].map(shot=>({title:shot.title,text:shot.text})));
   for(const shot of shots)for(const source of [shot.title,shot.text].filter(Boolean))assert.equal(await page.evaluate(source=>NarrativeI18n.resolve(source),source),expected(lang,source));
   // Every catalog entry is exercised through the scoped DOM adapter, including
   // controls, accessibility attributes, a reused caption and dynamic counters.
   const output=await page.evaluate(async sources=>{
    const layer=document.createElement('section');layer.className='cinematica-azrak';
    for(const source of sources){const p=document.createElement('p');p.textContent=source;p.setAttribute('aria-label',source);layer.append(p);}
    document.body.append(layer);await new Promise(requestAnimationFrame);
    const result=[...layer.children].map(p=>[p.textContent,p.getAttribute('aria-label')]);layer.remove();return result;
   },Object.values(catalogs.es));
   Object.keys(catalogs.es).forEach((key,i)=>{assert.equal(output[i][0],expected(lang,catalogs.es[key]));assert.equal(output[i][1],output[i][0]);});
   // Actual shared cinematic: next, pause and skip still work with localized labels.
   await page.evaluate(()=>{void KairosForest.play('informe',{reduced:true});});
   await page.waitForSelector('.kairos-cinema');
   for(let index=0;index<3;index++){
    await page.waitForTimeout(30);
    const scene=await page.evaluate(index=>({original:KairosForest.scenes.informe[index],title:document.querySelector('.kairos-cinema h2').textContent,text:document.querySelector('.kairos-cinema p').textContent,counter:document.querySelector('.kairos-cinema small').textContent}),index);
    assert.equal(scene.title,expected(lang,scene.original.title));assert.equal(scene.text,expected(lang,scene.original.text));assert(scene.counter.endsWith(`${index+1} / 3`));
    if(index<2)await page.locator('.kairos-cinema [data-action=next]').click();
   }
   await page.locator('.kairos-cinema [data-action=pause]').click();await page.waitForTimeout(20);assert.equal(await page.locator('.kairos-cinema [data-action=pause]').textContent(),expected(lang,'Ⅱ Pausar'));
   await page.locator('.kairos-cinema [data-action=pause]').click();await page.waitForTimeout(20);assert.equal(await page.locator('.kairos-cinema [data-action=pause]').textContent(),expected(lang,'▶ Reanudar'));
   await page.locator('.kairos-cinema [data-action=skip]').click();await page.waitForSelector('.kairos-cinema',{state:'detached'});
  }
  // A menu language change updates existing captions, but a battle lock defers it.
  await page.evaluate(async()=>{await I18n.setPreference('en');const p=document.createElement('p');p.id='narrative-test';p.textContent='La arena comienza a girar bajo sus botas.';document.getElementById('mensajePersonaje').replaceChildren(p);window.releaseNarrativeTest=I18n.lockLanguage();});
  await page.evaluate(()=>I18n.setPreference('pt-BR'));assert.equal(await page.locator('#narrative-test').textContent(),expected('en','La arena comienza a girar bajo sus botas.'));
  await page.evaluate(()=>window.releaseNarrativeTest());assert.equal(await page.locator('#narrative-test').textContent(),expected('pt-BR','La arena comienza a girar bajo sus botas.'));
  await page.evaluate(()=>{document.getElementById('narrative-test').textContent='La arena le cubre los tobillos.';});await page.waitForTimeout(20);assert.equal(await page.locator('#narrative-test').textContent(),expected('pt-BR','La arena le cubre los tobillos.'));
  const isolation=await page.evaluate(async()=>{const p=document.createElement('p');p.textContent='La arena le cubre los tobillos.';document.body.append(p);await new Promise(requestAnimationFrame);const text=p.textContent;p.remove();return text;});assert.equal(isolation,'La arena le cubre los tobillos.');
  assert.deepEqual(errors,[]);
  console.log('PASS narrative: 150 mission cards, all final/guardian/Shadow/Kairos scenes, all catalog entries and accessibility text in 3 languages, actual next/pause/skip controls, live language changes, battle lock, reused captions, scope isolation.');
 }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
