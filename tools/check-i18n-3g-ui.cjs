const fs=require('fs'),http=require('http'),path=require('path'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const offline=process.argv.includes('--offline');
const server=http.createServer((req,res)=>{const f=path.join(root,new URL(req.url,'http://localhost').pathname);fs.readFile(f.endsWith(path.sep)?f+'index.html':f,(err,data)=>{if(err){res.statusCode=404;return res.end();}res.setHeader('Content-Type',({'.js':'text/javascript','.html':'text/html','.css':'text/css','.json':'application/json'})[path.extname(f)]||'application/octet-stream');if(offline&&path.basename(f)==='sw.js')data=Buffer.from(data.toString()+"\nCORE_ASSETS.splice(0,CORE_ASSETS.length,...CORE_ASSETS.filter(p=>!p.startsWith('./assets/')));self.addEventListener('install',e=>e.waitUntil(self.skipWaiting()));");if(/\.(js|html|css|json|txt|svg|webmanifest)$/.test(f))data=Buffer.from(data.toString().replace(/\r\n/g,'\n'));res.end(data);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const context=await browser.newContext({viewport:{width:844,height:390},serviceWorkers:offline?'allow':'block',locale:'es-AR'});await context.route('https://**/*',r=>r.abort());
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));const url='http://127.0.0.1:'+server.address().port+'/index.html';await page.goto(url);await page.evaluate(()=>I18n.ready);
 if(offline){await page.waitForFunction(async()=>{const r=await navigator.serviceWorker.getRegistration();return r?.active&&!!await caches.match(new URL('./js/word-banks-versus.js',location.href));},null,{timeout:60000});await page.reload();await page.evaluate(()=>I18n.ready);await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);await page.reload();await page.evaluate(()=>I18n.ready);}

 for(const lang of ['es','en','pt-BR']){
  await page.evaluate(async lang=>{document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');mostrarPantalla(pantallaMenu);await I18n.setPreference(lang);mostrarPantalla(pantallaSalaVersus);actualizarPanelAmigosVersus({profile:{alias:'Aceptar',friend_code:'QA123456'},friends:[{alias:'Copiar',friend_code:'QA654321',user_id:'qa',friendship_id:'qa'}],incoming_requests:[{alias:'Cancelar',friend_code:'QA777777',id:'qa'}]}, {id:'qa'},null,true);},lang);
  assert.equal(await page.locator('#estadoCuentaVersus').textContent(),'Aceptar');
  assert.equal(await page.locator('#listaAmigosVersus strong').first().textContent(),'Copiar');
  assert.equal(await page.locator('#tituloSalaVersus').textContent(),lang==='en'?'Multiplayer room':lang==='pt-BR'?'Sala multijogador':'Sala multijugador');
  const request=await page.locator('#solicitudesAmigosVersus strong').first().textContent();assert(request.startsWith('Cancelar '));
  const quick=await page.locator('[data-mensaje="buena"]').textContent();assert.equal(quick,lang==='en'?'Nice move! 👏':lang==='pt-BR'?'Boa jogada! 👏':'¡Buena jugada! 👏');
  await page.evaluate(()=>{abrirSeleccionPersonajeVersus();seleccionarPersonajeVersus('explorador');});
  assert.equal(await page.locator('#btnConfirmarPersonajeVersus').textContent(),lang==='en'?'Fight with Aren':lang==='pt-BR'?'Lutar com Aren':'Luchar con Aren');
  await page.evaluate(()=>mostrarPantalla(pantallaSalaVersus));
  if(lang==='en')await page.screenshot({path:require('os').tmpdir()+'/aventura-3g-room'+(offline?'-offline':'')+'.png'});
 }
 assert.deepEqual(errors,[]);console.log('PASS 3G room, social aliases, quick messages, selection, language changes'+(offline?' offline':''));
 }finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
