// Local UI review only. External services blocked; no real accounts or rewards.
const fs=require('fs'),path=require('path'),cp=require('child_process'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'.local-developer/menu-reorganization-20261109');
fs.mkdirSync(out,{recursive:true});
const base='305eef6580d77e56e7df5a73265cdff04ee30398';let baseline=false,browser;
const changed=cp.execFileSync('git',['diff','--name-only',base],{encoding:'utf8'}).trim().split('\n').filter(f=>/\.(html|css|js|json)$/.test(f));
const old=new Map(changed.map(f=>[f,cp.execFileSync('git',['show',base+':'+f],{maxBuffer:20e6})]));
const server=http.createServer((req,res)=>{try{const pathname=new URL(req.url,'http://local').pathname;const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));if(!file.startsWith(root+path.sep))throw Error('Invalid path');const relative=path.relative(root,file).replaceAll(path.sep,'/');let bytes=baseline&&old.has(relative)?old.get(relative):fs.readFileSync(file);if(/\.(html|css|js|json|svg|txt|xml|webmanifest)$/.test(relative))bytes=Buffer.from(bytes.toString('utf8').replace(/\r\n/g,'\n'));res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.mp3':'audio/mpeg'})[path.extname(file)]||'application/octet-stream');res.setHeader('Cache-Control','no-store');res.end(bytes);}catch{res.writeHead(404).end();}});
async function showMenu(page){await page.evaluate(()=>{document.getElementById('introOficial')?.remove();document.querySelector('.app').inert=false;document.body.classList.remove('intro-pendiente','menu-fondo-pendiente','menu-entrada','menu-camara-inicio');document.body.classList.add('menu-camara-lista');mostrarPantalla(pantallaMenu);});}
(async()=>{try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({channel:'msedge',headless:true});const errors=[],measurements=[],baselineHeights={};
 async function open(serviceWorkers='block'){const context=await browser.newContext({viewport:{width:393,height:852},reducedMotion:'reduce',serviceWorkers});await context.route('**/*',r=>new URL(r.request().url()).origin===origin?r.continue():r.abort());const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(origin,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>typeof mostrarPantalla==='function'&&typeof I18n!=='undefined');await page.evaluate(()=>I18n.ready);await showMenu(page);return{page,context};}
 baseline=true;let device=await open();
 for(const lang of ['es','en','pt-BR']){await device.page.evaluate(lang=>I18n.setPreference(lang),lang);for(const width of [280,320,360,393])for(const height of [480,640,852]){await device.page.setViewportSize({width,height});await showMenu(device.page);baselineHeights[lang+':'+width+'x'+height]=(await device.page.locator('#pantallaMenu .menu-contenido').boundingBox()).height;}}
 await device.context.close();baseline=false;device=await open();const {page}=device;
 for(const lang of ['es','en','pt-BR']){
  await page.evaluate(lang=>I18n.setPreference(lang),lang);
  for(const width of [280,320,360,393])for(const height of [480,640,852]){
   await page.setViewportSize({width,height});await showMenu(page);
   const ids=await page.locator('#pantallaMenu .menu-contenido > button').evaluateAll(buttons=>buttons.map(b=>b.id));
   assert.deepEqual(ids,['btnVersus','btnModosJuego','btnRankingMenu','btnTienda','btnConfiguracion']);
   const box=await page.locator('#pantallaMenu .menu-contenido').boundingBox();
   assert.ok(box.height<=baselineHeights[lang+':'+width+'x'+height]+1,JSON.stringify({lang,width,height,before:baselineHeights[lang+':'+width+'x'+height],after:box.height}));
   assert.equal(await page.locator('.tarjeta-modo-versus').count(),0);
   await page.locator('#btnModosJuego').click();await page.waitForFunction(()=>document.getElementById('selectorModosJuego').open);
   assert.equal(await page.locator('#btnJugar .modo-ilustracion').count(),1,'the illustrated card must survive menu refresh');
   assert.equal(await page.locator('#btnJugar .modo-textos > strong').count(),1);
   const adventure=await page.locator('#btnJugar').boundingBox(),tower=await page.locator('#btnArcade').boundingBox();
   assert.ok(tower.y>=adventure.y+adventure.height-1,'mobile cards must stack vertically');
   await page.locator('#btnArcade').scrollIntoViewIfNeeded();
   await page.locator('#cerrarModosJuego').click();assert.equal(await page.locator('#selectorModosJuego').evaluate(e=>e.open),false);
   measurements.push({lang,width,height,menuHeight:box.height,baselineHeight:baselineHeights[lang+':'+width+'x'+height]});
  }
 }
 await page.evaluate(()=>I18n.setPreference('es'));await page.setViewportSize({width:393,height:852});await showMenu(page);
 await page.screenshot({path:path.join(out,'main-menu-393.png')});
 await page.locator('#btnModosJuego').click();await page.screenshot({path:path.join(out,'adventure-tower-393.png')});
 await page.locator('#btnJugar').click();await page.waitForFunction(()=>document.getElementById('mapaAventura').open);
 assert.equal(await page.locator('#selectorModosJuego').evaluate(e=>e.open),false);
 await page.locator('#cerrarMapaAventura').click();await page.waitForFunction(()=>document.getElementById('selectorModosJuego').open);
 await page.locator('#cerrarModosJuego').click();await page.setViewportSize({width:844,height:390});await showMenu(page);
 await page.locator('#btnVersus').click();await page.waitForFunction(()=>document.getElementById('pantallaSalaVersus').classList.contains('activa'));
 assert.equal(await page.locator('#selectorModosJuego').evaluate(e=>e.open),false);
 assert.equal(await page.locator('#modalTutorialVersus').evaluate(e=>e.classList.contains('oculto')),true);
 assert.equal(await page.locator('input[name="modoOnline"]').count(),2);
 await page.locator('input[name="modoOnline"][value="ranked"]').check();assert.equal(await page.locator('input[value="ranked"]').isChecked(),true);
 await page.locator('input[name="modoOnline"][value="classic"]').check();assert.equal(await page.locator('input[value="classic"]').isChecked(),true);
 await page.screenshot({path:path.join(out,'multiplayer-options-844.png')});
 await page.locator('#btnTutorialVersus').click();await page.waitForFunction(()=>!document.getElementById('modalTutorialVersus').classList.contains('oculto'));
 await page.locator('#btnCerrarTutorialVersus').click();await page.waitForFunction(()=>document.getElementById('modalTutorialVersus').classList.contains('oculto'));
 await device.context.close();
 const pwa=await open('allow');
 await pwa.page.waitForFunction(()=>document.getElementById('estadoOfflineJuego').dataset.estado==='listo',null,{timeout:15000}).catch(async error=>{
  console.log('PWA diagnostic',await pwa.page.evaluate(async()=>({status:document.getElementById('estadoOfflineJuego').outerHTML,controller:navigator.serviceWorker.controller?.scriptURL,registrations:(await navigator.serviceWorker.getRegistrations()).map(r=>({active:r.active?.state,waiting:r.waiting?.state,installing:r.installing?.state})),caches:await caches.keys()})));
  throw error;
 });
 await showMenu(pwa.page);await pwa.page.screenshot({path:path.join(out,'main-menu-393.png')});
 await pwa.context.close();
 assert.deepEqual(errors,[]);
 fs.writeFileSync(path.join(out,'browser-results.json'),JSON.stringify({passed:true,base,measurements,externalServicesBlocked:true,realAccountsUsed:false,mainButtonCount:5,oldIllustratedMultiplayerRemoved:true,mapBackPassed:true,classicRankedSelectionPassed:true,tutorialPassed:true},null,2));
 console.log(JSON.stringify({passed:true,mobileLayouts:measurements.length,mainMenuHeightNotIncreased:true,oldIllustratedMultiplayerRemoved:true,mapBackPassed:true,classicRankedSelectionPassed:true,tutorialPassed:true,screenshots:out}));
}finally{await browser?.close();server.closeAllConnections();server.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
