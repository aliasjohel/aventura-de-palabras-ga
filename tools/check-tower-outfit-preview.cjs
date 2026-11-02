'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'.local-developer/aren-champion-qa');fs.mkdirSync(out,{recursive:true});
const server=http.createServer((req,res)=>{try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname),file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));if(!file.startsWith(root+path.sep))throw Error('invalid path');res.setHeader('Cache-Control','no-store');res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png','.mp3':'audio/mpeg','.wav':'audio/wav','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}});
let browser;
(async()=>{try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({channel:'msedge',headless:true});const context=await browser.newContext({viewport:{width:844,height:390},isMobile:true,hasTouch:true,serviceWorkers:'block'}),page=await context.newPage(),errors=[],failed=[],requests=[],remote=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.url().includes('/tower-preview/'))requests.push(new URL(r.url()).pathname);});page.on('response',r=>{if(r.status()>=400)failed.push(r.url());});
 await context.route('**/*',r=>{if(new URL(r.request().url()).origin!==origin){remote.push({url:r.request().url(),method:r.request().method()});return r.abort();}return r.continue();});
 await page.goto(origin);await page.evaluate(()=>I18n.ready);await page.waitForFunction(()=>globalThis.TowerOutfitPreview);assert.equal(requests.length,0);
 await page.evaluate(()=>{document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');});
 const snapshot=()=>page.evaluate(()=>Object.fromEntries(Object.keys(localStorage).sort().map(k=>[k,localStorage.getItem(k)])));
 const before=await snapshot();
 await page.click('#btnConfiguracion');await page.selectOption('#towerOutfitPreviewSelect','aren-campeon');await page.click('#towerOutfitPreviewApply');await page.waitForFunction(()=>TowerOutfitPreview.selection()==='aren-campeon');
 assert.deepEqual(await snapshot(),before,'Preview selection changes no persisted data');assert.equal(new Set(requests).size,5);assert.equal(await page.evaluate(()=>CosmeticStore.catalog.some(p=>p.id==='aren-campeon')),false);
 await page.screenshot({path:path.join(out,'android-selector.png')});await page.click('#btnCerrarConfiguracion');
 const setup=async rival=>page.evaluate(rival=>{
  cancelarCinematicaFinalVersus();detenerRondaVersus();limpiarEntradaDueloVersus();ocultarAnuncioFinVersus();modoArcadeActivo=false;modoPruebasActivo=false;partidaOnlineVersus=null;partidaOnlineIniciada=false;dueloAventuraActivo=null;adaptadorSalasVersus=adaptadorLocalSalasVersus;personajeJugadorVersus='explorador';personajeRivalVersus=rival;
  finalizarContextoPalabras();iniciarContextoPalabras('versus');const themes=Object.keys(obtenerBancosPalabrasVersus());tematicaVersus.value=themes[0];palabrasSecretasVersus=obtenerBancosPalabrasVersus()[themes[0]].slice(0,maximoPalabrasVersus);mostrarPantalla(pantallaVersus);prepararDueloVersus({comenzarRonda:false});refrescarTrajesVersus();
 },rival);
 await setup('mago');await page.locator('#personajeVersusUno').evaluate(i=>i.decode());assert((await page.locator('#personajeVersusUno').getAttribute('src')).includes('/tower-preview/'));await page.screenshot({path:path.join(out,'android-combat.png')});
 await page.clock.install();await page.clock.pauseAt(new Date(Date.now()+100));
 await page.evaluate(()=>reproducirAtaqueJugadorVersus());await page.clock.runFor(100);assert((await page.locator('#personajeVersusUno').getAttribute('src')).endsWith('preparacion-v1.webp'));await page.clock.runFor(700);assert((await page.locator('#personajeVersusUno').getAttribute('src')).endsWith('ataque-v1.webp'));await page.clock.runFor(1500);
 await page.evaluate(()=>reproducirAnimacionHabilidadVersus('explorador',{alImpactar:()=>actualizarPistaLupaVersus('A')}));await page.clock.runFor(100);assert((await page.locator('#personajeVersusUno').getAttribute('src')).endsWith('habilidad-v1.webp'));await page.clock.runFor(3000);
 await page.evaluate(()=>reproducirAtaqueRivalVersus());await page.clock.runFor(800);assert((await page.locator('#personajeVersusUno').getAttribute('src')).endsWith('impacto-v1.webp'));await page.clock.runFor(2000);assert((await page.locator('#personajeVersusUno').getAttribute('src')).endsWith('base-v1.webp'),'Damage returns to base');
 const sceneChecks=[];
 for(const viewport of [{width:844,height:390},{width:667,height:375}]){
  await page.setViewportSize(viewport);
  for(const [winner,pose,time]of [['explorador','final',2000],['guardiana','planta',3400],['azrak','mano',4400],['kalamo','vidrio',7400],['kairos','anciano',7000]]){
   await setup(winner==='explorador'?'mago':winner);
   await page.evaluate(winner=>{ladoGanadorCinematicaVersus=winner==='explorador'?'jugador':'rival';void obtenerReproductorFinalVersus(winner,winner==='explorador'?'mago':'explorador')();},winner);
   await page.waitForFunction(({p,winner})=>{const scene={explorador:'trampa-selvatica',guardiana:'prision-esmeralda',azrak:'eclipse-infernal',kalamo:'libro-palabras-perdidas',kairos:'siglos-en-un-segundo'}[winner];return cinematicaFinalVersus.classList.contains('activa')&&cinematicaFinalVersus.classList.contains(scene)&&document.querySelector('#cinematicaFinalVersus img[src$="aren-campeon-'+p+'-v1.webp"]');},{p:pose,winner});
   await page.clock.runFor(time);await page.evaluate(time=>{for(const a of cinematicaFinalVersus.getAnimations({subtree:true})){a.pause();a.currentTime=time;}},time);
   const matches=page.locator('#cinematicaFinalVersus img[src$="aren-campeon-'+pose+'-v1.webp"]');const locator=pose==='anciano'?matches.last():matches.first();await locator.evaluate(i=>i.decode());assert(await locator.isVisible());
   const rect=await locator.evaluate(i=>{const r=i.getBoundingClientRect(),s=cinematicaFinalVersus.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom,stage:{x:s.x,y:s.y,right:s.right,bottom:s.bottom},opacity:getComputedStyle(i).opacity,stageClass:cinematicaFinalVersus.className,animation:getComputedStyle(i).animationName};});await page.screenshot({path:path.join(out,'inspect-'+pose+'-'+viewport.width+'.png')});assert(Number(rect.opacity)>.1,pose+' visible '+JSON.stringify(rect));assert(rect.x>=-8&&rect.y>=-8&&rect.right<=viewport.width+8&&rect.bottom<=viewport.height+8,pose+' in mobile viewport '+JSON.stringify(rect));
   await page.screenshot({path:path.join(out,pose+'-'+viewport.width+'.png')});sceneChecks.push({winner,pose,viewport,rect});await page.evaluate(()=>cancelarCinematicaFinalVersus());
  }
 }
 assert.equal(new Set(requests).size,11);
 // Full match: one naturally lost word, then solve actual words until victory.
 await setup('mago');let turns=0;
 while(!await page.evaluate(()=>demoVersus.partidaFinalizada)){
  if(++turns>120)throw Error('Match did not finish');
  await page.evaluate(()=>{const word=obtenerClavePalabraVersus(obtenerPalabraActualJugadorVersus());const letter=demoVersus.vidasJugador===vidasInicialesVersus?filasTeclado.flat().find(l=>!word.includes(l)&&!demoVersus.letrasJugador.has(l)):[...new Set(word)].find(l=>!demoVersus.letrasJugador.has(l));if(!letter)throw Error('Missing letter');jugarLetraDemoVersus(letter,{disabled:false});if(demoVersus.cargaHabilidadJugador>=letrasParaHabilidadVersus&&!demoVersus.partidaFinalizada)activarHabilidadLocalVersus();});
  await page.clock.runFor(700);
 }
 await page.clock.runFor(2000);await page.waitForFunction(()=>cinematicaFinalVersus.classList.contains('activa'));await page.clock.runFor(18000);assert.equal(await page.locator('#resultadoRondaVersus').evaluate(e=>e.classList.contains('oculto')),false);const victory=await page.evaluate(()=>({lives:[demoVersus.vidasJugador,demoVersus.vidasRival],finished:demoVersus.partidaFinalizada}));assert.deepEqual(victory.lives,[4,0]);
 await setup('mago');await page.evaluate(()=>finalizarPartidaVersus('rival','Prueba visual'));await page.clock.runFor(2000);await page.waitForFunction(()=>cinematicaFinalVersus.classList.contains('activa'));await page.clock.runFor(18000);assert.equal(await page.locator('#resultadoRondaVersus').evaluate(e=>e.classList.contains('oculto')),false);
 assert.deepEqual(await snapshot(),before,'Combat visual review leaves stored business state intact');
 const modes=await page.evaluate(()=>{
  const result={};modoArcadeActivo=true;result.tower=spriteTrajeVersus(personajeVersusUno,'explorador',srcExploradorBaseVersus);modoArcadeActivo=false;
  dueloAventuraActivo={tipo:'qa-visual'};result.adventure=spriteTrajeVersus(personajeVersusUno,'explorador',srcExploradorBaseVersus);dueloAventuraActivo=null;
  partidaOnlineVersus={};result.multiplayerLocalView=spriteTrajeVersus(personajeVersusUno,'explorador',srcExploradorBaseVersus);result.serverOutfit=trajePersonajeVersus(personajeVersusUno,'explorador');result.serializedEquipment=CosmeticStore.read().equipped;partidaOnlineVersus=null;
  return result;
 });for(const key of ['tower','adventure','multiplayerLocalView'])assert(modes[key].includes('/tower-preview/'));assert.notEqual(modes.serverOutfit,'aren-campeon');assert(!JSON.stringify(modes.serializedEquipment).includes('aren-campeon'));
 const heroes=await page.evaluate(async()=>{const list=[];for(const id of Object.keys(personajesVersus).filter(p=>p!=='explorador')){personajeJugadorVersus=id;personajeRivalVersus='explorador';prepararDueloVersus({comenzarRonda:false});refrescarTrajesVersus();await personajeVersusUno.decode();list.push({id,src:personajeVersusUno.getAttribute('src')});}return list;});assert.equal(heroes.length,10);for(const hero of heroes)assert(!hero.src.includes('/tower-preview/'));
 await page.evaluate(()=>window.dispatchEvent(new Event('wallet-session-ended')));assert.equal(await page.evaluate(()=>TowerOutfitPreview.selection()),null);
 await page.evaluate(()=>TowerOutfitPreview.select('aren-campeon'));await page.reload();await page.clock.resume();await page.evaluate(()=>I18n.ready);assert.equal(await page.evaluate(()=>TowerOutfitPreview.selection()),null);
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>{document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');mostrarPantalla(pantallaMenu);});await page.click('#btnConfiguracion');assert(await page.locator('#towerOutfitPreviewSelect').isVisible());assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await page.locator('#towerOutfitPreview').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(out,'android-portrait-settings.png')});
 for(const lang of ['en','pt-BR','es']){await page.evaluate(lang=>I18n.setPreference(lang),lang);await page.waitForFunction(lang=>I18n.language===lang,lang);assert((await page.locator('#towerOutfitPreview legend').textContent()).length>5);}
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);assert(!remote.some(r=>r.method!=='GET'),'No remote business mutations');
 const hashes=Object.fromEntries(fs.readdirSync(path.join(root,'assets/images/tower-preview')).map(f=>[f,crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'assets/images/tower-preview',f))).digest('hex')]));
 const report={passed:true,engine:'Edge Chromium, Android mobile/touch emulation; physical Android pending user verification',beforeSelectionImageRequests:0,initialUniqueImages:5,totalUniqueImages:11,businessStateByteIdentical:true,serverCostumesUnchanged:true,modes,heroes,sceneChecks,victory,reloadAndLogoutReset:true,previewHashes:hashes,pageErrors:errors,failedResponses:failed,remoteRequests:remote};fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({passed:true,sceneChecks:sceneChecks.length,victory,heroes:heroes.length,pageErrors:errors}));
}finally{await browser?.close();server.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
