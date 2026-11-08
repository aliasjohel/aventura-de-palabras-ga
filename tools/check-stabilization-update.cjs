'use strict';
// Loopback only, real service worker; no game accounts or production requests.
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');let phase=0,browser;
const ids=['avisoActualizacionPwa','iconoActualizacionPwa','tituloActualizacionPwa','textoActualizacionPwa','progresoActualizacionPwa','detalleProgresoActualizacionPwa','porcentajeActualizacionPwa','barraActualizacionPwa','accionesActualizacionPwa','estadoOfflineJuego'];
const html=`<!doctype html><html><head><meta charset="utf-8"></head><body><main id="pantallaMenu" class="activa"></main>${ids.map(id=>'<div id="'+id+'"></div>').join('')}<button id="btnActualizarAplicacion">Update</button><button id="btnPosponerActualizacion">Later</button><script>
sessionStorage.setItem('probeLoads',String(Number(sessionStorage.getItem('probeLoads')||0)+1));
window.GameUI={key:(k)=>k,text:(n,v)=>n.textContent=v};
</script><script src="pwa.js"></script></body></html>`;
const worker=fs.readFileSync(path.join(root,'sw.js'),'utf8');
const server=http.createServer((req,res)=>{const name=new URL(req.url,'http://local').pathname;res.setHeader('Cache-Control','no-store');if(name==='/probe.html'){res.setHeader('Content-Type','text/html');return res.end(html);}if(name==='/pwa.js'){res.setHeader('Content-Type','text/javascript');return res.end(fs.readFileSync(path.join(root,'js/pwa.js')));}if(name==='/sw.js'){res.setHeader('Content-Type','text/javascript');return res.end(worker.replace(/const CACHE_NAME = .*;/,'const CACHE_NAME = "aventura-palabras-runtime-v'+(500+phase)+'-stabilization-fixture";')+'\nCORE_ASSETS.splice(0,CORE_ASSETS.length,"./css/forest-wildlife.css","./assets/sounds/seleccion-personaje.mp3");\nself.addEventListener("message",event=>{if(event.data?.type==="QA_LATE_PROGRESS")event.waitUntil(self.clients.matchAll({includeUncontrolled:true}).then(clients=>clients.forEach(c=>c.postMessage({type:"PWA_INSTALL_PROGRESS",estado:"completa",porcentaje:100,completados:2,total:2,reutilizados:2,descargados:0}))));});');}try{const file=path.resolve(root,'.'+name);if(!file.startsWith(root+path.sep))throw Error();res.setHeader('Content-Type',path.extname(file)==='.css'?'text/css':'application/octet-stream');res.end(/\.(css|js|html|json)$/.test(file)?fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n'):fs.readFileSync(file));}catch{res.writeHead(404).end();}});
(async()=>{try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({channel:'msedge',headless:true});const context=await browser.newContext();await context.route('**/*',r=>new URL(r.request().url()).origin===origin?r.continue():r.abort());
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(origin+'/probe.html');await page.waitForFunction(()=>navigator.serviceWorker.controller);await page.reload();
 const peer=await context.newPage();await peer.goto(origin+'/probe.html');await peer.waitForFunction(()=>navigator.serviceWorker.controller);
 await page.evaluate(async()=>{localStorage.setItem('session-marker','keep-existing-session');localStorage.setItem('game-marker','keep-existing-progress');window.oldController=navigator.serviceWorker.controller;sessionStorage.setItem('probeLoads','1');const request=indexedDB.open('stabilization-probe',1);await new Promise((resolve,reject)=>{request.onupgradeneeded=()=>request.result.createObjectStore('data');request.onerror=reject;request.onsuccess=()=>{const db=request.result,t=db.transaction('data','readwrite');t.objectStore('data').put('preserved','progress');t.oncomplete=()=>{db.close();resolve();};};});});
 await peer.evaluate(()=>sessionStorage.setItem('probeLoads','1'));
 phase=1;await page.evaluate(async()=>{const r=await navigator.serviceWorker.getRegistration();await r.update();});await page.waitForFunction(async()=>Boolean((await navigator.serviceWorker.getRegistration())?.waiting));
 await page.waitForFunction(()=>document.getElementById('textoActualizacionPwa').textContent==='common.pwa.readyToUpdate');
 await page.evaluate(async()=>{(await navigator.serviceWorker.getRegistration()).waiting.postMessage({type:'QA_LATE_PROGRESS'});});
 await page.waitForTimeout(150);
 const ready=await page.locator('#accionesActualizacionPwa').evaluate(e=>!e.hidden);
 assert.equal(ready,true);assert.equal(await page.locator('#btnActualizarAplicacion').isEnabled(),true);
 assert.equal(await page.evaluate(()=>navigator.serviceWorker.controller===oldController),true,'No activation before consent');
 await page.evaluate(()=>{document.getElementById('pantallaMenu').classList.remove('activa');document.getElementById('btnActualizarAplicacion').click();});
 assert.equal(await page.evaluate(async()=>(await navigator.serviceWorker.getRegistration()).waiting.state),'installed','A click after combat starts must not activate');
 await page.evaluate(()=>document.getElementById('pantallaMenu').classList.add('activa'));
 await page.waitForFunction(()=>!document.getElementById('avisoActualizacionPwa').hidden);
 // Start combat in the small gap after consent, before controllerchange.
 await page.evaluate(()=>{document.getElementById('btnActualizarAplicacion').click();document.getElementById('pantallaMenu').classList.remove('activa');});
 await page.waitForFunction(()=>navigator.serviceWorker.controller!==oldController);
 assert.equal(await page.evaluate(()=>sessionStorage.getItem('probeLoads')),'1','Never reload an active duel');
 await peer.waitForFunction(async()=>!(await navigator.serviceWorker.getRegistration()).waiting);
 assert.equal(await peer.evaluate(()=>sessionStorage.getItem('probeLoads')),'1','Other tabs must not reload without consent');
 await Promise.all([page.waitForNavigation(),page.evaluate(()=>document.getElementById('pantallaMenu').classList.add('activa'))]);
 assert.equal(await page.evaluate(()=>sessionStorage.getItem('probeLoads')),'2');assert.equal(await page.evaluate(()=>localStorage.getItem('session-marker')),'keep-existing-session');assert.equal(await page.evaluate(()=>localStorage.getItem('game-marker')),'keep-existing-progress');
 const preserved=await page.evaluate(()=>new Promise(resolve=>{const r=indexedDB.open('stabilization-probe');r.onsuccess=()=>{const db=r.result,q=db.transaction('data').objectStore('data').get('progress');q.onsuccess=()=>{db.close();resolve(q.result);};};}));assert.equal(preserved,'preserved');
 await context.setOffline(true);const audio=await page.evaluate(async()=>{const r=await fetch('assets/sounds/seleccion-personaje.mp3',{headers:{Range:'bytes=0-31'}});return{status:r.status,size:(await r.arrayBuffer()).byteLength};});assert.deepEqual(audio,{status:206,size:32});
 assert.deepEqual(errors,[]);console.log('PASS real service worker: immediate ready button, late-progress ordering, one consent, no duel/other-tab reload, deferred safe activation, session/local/IndexedDB preservation and cached audio ranges offline');
}finally{await browser?.close();server.closeAllConnections();server.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
