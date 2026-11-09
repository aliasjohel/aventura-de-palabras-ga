// Isolated UI + actual HTMLAudio playback; no real accounts or backend requests.
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'.local-developer/releases/v419-adventure-music');fs.mkdirSync(out,{recursive:true});let browser;
const server=http.createServer((req,res)=>{try{const url=new URL(req.url,'http://local'),file=path.resolve(root,'.'+(url.pathname==='/'?'/index.html':url.pathname));if(!file.startsWith(root+path.sep))throw Error();let bytes=fs.readFileSync(file);if(/\.(html|css|js|json|svg|txt|xml|webmanifest)$/.test(file))bytes=Buffer.from(bytes.toString('utf8').replace(/\r\n/g,'\n'));res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.mp3':'audio/mpeg'})[path.extname(file)]||'application/octet-stream');res.end(bytes);}catch{res.writeHead(404).end();}});
const musicPlaying=(page,file)=>page.waitForFunction(file=>__qaAudio.some(a=>a.src.endsWith(file)&&!a.paused&&a.currentTime>.05),file);
const singleScore=page=>page.evaluate(()=>__qaAudio.filter(a=>/\/(lobby-|character-|world-|melodia-menu)/.test(a.src)&&!a.paused&&!a.ended).map(a=>a.src));
(async()=>{try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=process.env.AVENTURA_QA_PUBLIC_URL||'http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({channel:'msedge',headless:true});const cases=[],errors=[];
 const context=await browser.newContext({viewport:{width:844,height:390},serviceWorkers:'block',reducedMotion:'reduce'});
 await context.addInitScript(()=>{const Native=Audio;window.__qaAudio=[];window.Audio=function(...args){const a=new Native(...args);__qaAudio.push(a);return a;};window.Audio.prototype=Native.prototype;});
 await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(origin).origin?r.continue():r.abort());
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>typeof MultiplayerLobby!=='undefined'&&typeof CharacterMusic!=='undefined');await page.evaluate(()=>I18n.ready);
 // Let the authored intro finish so its delayed audio cannot restart during QA.
 await page.waitForFunction(()=>!document.getElementById('introOficial'));
 await page.evaluate(()=>{
  document.getElementById('introOficial')?.remove();document.querySelector('.app').inert=false;document.body.classList.remove('intro-pendiente','menu-fondo-pendiente','menu-entrada','menu-camara-inicio');document.body.classList.add('menu-camara-lista');
  prepararRecursosMultijugador=async()=>{};asegurarConexionSalasVersus=async()=>{};
  window.__requests=[];window.__hold=false;
  adaptadorSalasVersus={proveedor:'qa',obtenerSala:()=>null,obtenerRango:async()=>{throw Error('QA');},salirSala:async()=>{},buscarPartida:request=>{__requests.push(request);return __hold&&!request.cancelar?new Promise(resolve=>window.__release=resolve):Promise.resolve({});}};
  aliasSalaVersus.value='Cuenta QA';mostrarPantalla(pantallaMenu);
 });
 await page.locator('#btnModosJuego').click();await musicPlaying(page,'lobby-adventure-old-tower-inn-v1.mp3');assert.equal((await singleScore(page)).length,1,JSON.stringify(await singleScore(page)));
 for(let trip=0;trip<3;trip++){
  await page.locator('#btnJugar').click();
  await page.waitForFunction(()=>document.getElementById('mapaAventura').open);
  await musicPlaying(page,'lobby-adventure-old-tower-inn-v1.mp3');
  assert.equal((await singleScore(page)).length,1,JSON.stringify(await singleScore(page)));
  await page.evaluate(()=>document.dispatchEvent(new Event('visibilitychange')));
  await page.waitForTimeout(300);
  assert.equal((await singleScore(page)).length,1,JSON.stringify(await singleScore(page)));
  if(trip===1)await page.keyboard.press('Escape');
  else await page.locator('#cerrarMapaAventura').click();
  await page.waitForFunction(()=>document.getElementById('selectorModosJuego').open);
  await musicPlaying(page,'lobby-adventure-old-tower-inn-v1.mp3');
  assert.equal((await singleScore(page)).length,1,JSON.stringify(await singleScore(page)));
 }
 await page.locator('#cerrarModosJuego').click();await musicPlaying(page,'melodia-menu.mp3');assert.equal((await singleScore(page)).length,1,JSON.stringify(await singleScore(page)));
 await page.locator('#btnVersus').click();await musicPlaying(page,'lobby-multiplayer-epic-march-v1.mp3');assert.equal((await singleScore(page)).length,1,JSON.stringify(await singleScore(page)));
 assert.equal(await page.locator('#accionesModalidadOnline').isVisible(),false);
 assert.equal(await page.locator('#rangoSalaVersus').isVisible(),false);assert.equal(await page.locator('#aliasSalaVersus').isVisible(),false);
 for(const lang of ['es','en','pt-BR']){
  await page.evaluate(lang=>I18n.setPreference(lang),lang);
  for(const[width,height]of [[480,280],[568,320],[640,360],[780,360],[844,390],[915,412]]){
   await page.setViewportSize({width,height});
   for(const mode of ['classic','ranked']){
    const card=page.locator('input[name="modoOnline"][value="'+mode+'"]').locator('..');await card.scrollIntoViewIfNeeded();await card.click();
    assert.equal(await page.locator('#btnBuscarPartida').evaluate(e=>e.closest('.modo-online-opcion').querySelector('input').value),mode);
    assert.equal(await page.locator('#accionesModalidadOnline').isVisible(),true);await page.locator('#btnBuscarPartida').scrollIntoViewIfNeeded();
    const box=await page.locator('#btnBuscarPartida').boundingBox();assert.ok(box.x>=0&&box.x+box.width<=width+1&&box.height>=44);
    assert.equal(await page.locator('#aliasSalaVersus').isVisible(),false);assert.equal(await page.locator('#rangoSalaVersus').isVisible(),false);
   }
   cases.push({lang,width,height});
  }
 }
 assert.equal(await page.evaluate(()=>__requests.length),0,'card clicks never start matchmaking');
 await page.setViewportSize({width:844,height:390});await page.evaluate(()=>I18n.setPreference('es'));
 await page.locator('.modo-online-clasico').click();await page.evaluate(()=>__hold=true);await page.locator('#btnBuscarPartida').click();await page.waitForFunction(()=>__requests.length===1);
 assert.equal(await page.evaluate(()=>__requests[0].modo),'classic');const button=await page.locator('#btnBuscarPartida').boundingBox();await page.mouse.click(button.x+button.width/2,button.y+button.height/2);assert.equal(await page.evaluate(()=>__requests.length),1);
 await page.locator('#btnCancelarBusqueda').click();assert.equal(await page.locator('input[name="modoOnline"][value="ranked"]').isDisabled(),true);
 const rankedBox=await page.locator('.modo-online-clasificatorio').boundingBox();await page.mouse.click(rankedBox.x+rankedBox.width/2,rankedBox.y+rankedBox.height/2);assert.equal(await page.locator('input[name="modoOnline"][value="classic"]').isChecked(),true);
 await page.evaluate(()=>__release({}));await page.waitForFunction(()=>!btnBuscarPartida.disabled);assert.equal(await page.evaluate(()=>__requests.filter(r=>r.cancelar).length),1);
 await page.locator('.modo-online-clasificatorio').click();await page.evaluate(()=>__hold=false);await page.locator('#btnBuscarPartida').click();await page.waitForFunction(()=>__requests.some(r=>r.modo==='ranked'&&!r.cancelar));await page.locator('#btnCancelarBusqueda').click();await page.waitForFunction(()=>!btnBuscarPartida.disabled);
 await page.evaluate(()=>{aliasSalaVersus.value='';MultiplayerLobby.syncAlias();});assert.equal(await page.locator('#aliasSalaVersus').isVisible(),true);
 await page.locator('.salas-manuales-versus summary').click();await page.waitForFunction(()=>document.getElementById('aliasSalaVersus').closest('.salas-manuales-versus'));
 for(const id of ['btnCrearSalaVersus','btnUnirseSalaVersus','codigoSalaVersus']){await page.locator('#'+id).scrollIntoViewIfNeeded();assert.equal(await page.locator('#'+id).isVisible(),true);}
 await page.locator('.salas-manuales-versus summary').click();await page.evaluate(()=>{aliasSalaVersus.value='Cuenta QA';MultiplayerLobby.syncAlias();});
 await page.evaluate(()=>GameAudio.set('music',0));assert.equal(await page.evaluate(()=>{const a=__qaAudio.find(a=>a.src.endsWith('lobby-multiplayer-epic-march-v1.mp3'));return Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype,'volume').get.call(a);}),0);await page.evaluate(()=>GameAudio.set('music',65));
 await page.locator('.modo-online-clasificatorio').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(out,'inline-search-844.png')});
 await page.locator('#btnSalirSalaVersus').scrollIntoViewIfNeeded();await page.locator('#btnSalirSalaVersus').click();await musicPlaying(page,'melodia-menu.mp3');assert.equal((await singleScore(page)).length,1,JSON.stringify(await singleScore(page)));
 assert.deepEqual(errors,[]);const result={passed:true,origin,cases:cases.length,inlineModeActions:true,noAutomaticMatchmaking:true,duplicateTapGuard:true,cancelAndModeRouting:true,guestManualAliasFallback:true,savedIdentityHidden:true,actualNewAudioPlayback:true,noMusicOverlap:true,adventureMapRoundTrips:3,mapEscapeAndForeground:true,musicVolumeRespected:true,externalServicesBlocked:true,backendAndPreparationStubbed:true,realAccountsUsed:false};
 fs.writeFileSync(path.join(out,process.env.AVENTURA_QA_PUBLIC_URL?'public-browser.json':'browser-results.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));await context.close();
}finally{await browser?.close();server.closeAllConnections();server.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
