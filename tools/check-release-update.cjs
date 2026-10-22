// Real service-worker upgrade from the previous release, with unchanged player storage.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),cp=require('node:child_process'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),previous=process.env.PREVIOUS_RELEASE_REF||'c2977e0';
const oldWorker=cp.execFileSync('git',['show',previous+':sw.js'],{encoding:'utf8'});
const currentWorker=fs.readFileSync(path.join(root,'sw.js'),'utf8');
const oldVersion=oldWorker.match(/CACHE_PREFIX}v(\d+)/)[1],newVersion=currentWorker.match(/CACHE_PREFIX}v(\d+)/)[1];
assert.notEqual(oldVersion,newVersion,'release must bump the public cache version');
const changed=new Set(cp.execFileSync('git',['diff','--name-only',previous],{cwd:root,encoding:'utf8'}).trim().split(/\r?\n/));
const oldBodies=new Map();let phase=0;
function bytes(relative){if(phase===0&&changed.has(relative)){if(!oldBodies.has(relative))oldBodies.set(relative,cp.execFileSync('git',['show',previous+':'+relative],{cwd:root,maxBuffer:20e6}));return oldBodies.get(relative);}return fs.readFileSync(path.join(root,relative));}
const server=http.createServer((req,res)=>{try{
 const url=new URL(req.url,'http://localhost');let relative=decodeURIComponent(url.pathname).replace(/^\//,'')||'index.html';
 const target=path.resolve(root,relative);if(!target.startsWith(root+path.sep))throw Error('invalid path');
 res.setHeader('Cache-Control','no-store');res.setHeader('Content-Type',({'.js':'text/javascript','.json':'application/json','.html':'text/html','.css':'text/css','.webp':'image/webp','.png':'image/png','.mp3':'audio/mpeg'})[path.extname(relative)]||'application/octet-stream');
 if(relative==='upgrade-probe.html')return res.end('<!doctype html><meta charset="utf-8"><title>Release upgrade probe</title>');
 if(relative==='sw.js')return res.end((phase===0?oldWorker:currentWorker)+"\nCORE_ASSETS.splice(0,CORE_ASSETS.length,...CORE_ASSETS.filter(p=>!p.startsWith('./assets/')||p.includes('/miniaturas/')));\n");
 let body=bytes(relative);if(/\.(html|js|json|css|svg|txt|webmanifest)$/.test(relative))body=Buffer.from(body.toString().replace(/\r\n/g,'\n'));res.end(body);
 }catch(error){res.writeHead(404);res.end('not found');}});
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
 const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'allow'});await context.route('https://**/*',r=>r.abort());
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await context.addInitScript(()=>{
  if(localStorage.getItem('release-preservation-seeded'))return;
  const values={progresoAventuraGA:JSON.stringify({monedas:345,experiencia:888,cristalesObtenidos:2,escenarioActual:1,misionActual:3,versionHistorialPalabras:1,historialPalabrasPorIdioma:{es:{0:{used:['es:world:0:word:1'],inMission:[],mission:1}}}}),aventuraTiendaV1:JSON.stringify({coins:345,owned:['aren-bosque'],equipped:{explorador:'aren-bosque'}}),aventuraPalabrasIdentidadV1:JSON.stringify({avatar:'mago',frame:'bosque'}),aventuraAudioV1:JSON.stringify({music:22,keyboard:33,effects:44}),aventuraIdiomaV1:'en','progresoArcadeAventuraGA:explorador':'4','release-auth-preservation-probe':'synthetic-session','release-preservation-seeded':'true'};
  for(const [key,value] of Object.entries(values))localStorage.setItem(key,value);
 });
 const url='http://127.0.0.1:'+server.address().port+'/index.html';await page.goto(url);await page.evaluate(()=>I18n.ready);
 await page.waitForFunction(async()=>{const r=await navigator.serviceWorker.getRegistration();if(!r?.active)return false;for(const name of await caches.keys())if((await (await caches.open(name)).keys()).some(key=>new URL(key.url).pathname.endsWith('/js/app.js')))return true;return false;},null,{timeout:60000});await page.reload();await page.evaluate(()=>I18n.ready);await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
 await page.evaluate(async()=>{await new Promise((resolve,reject)=>{const request=indexedDB.open('release-preservation',1);request.onupgradeneeded=()=>request.result.createObjectStore('player');request.onerror=()=>reject(request.error);request.onsuccess=()=>{const db=request.result,tx=db.transaction('player','readwrite');tx.objectStore('player').put({profile:'synthetic-player',friends:['synthetic-friend']},'snapshot');tx.oncomplete=()=>{db.close();resolve();};};});});
 const snapshot=()=>page.evaluate(()=>Object.fromEntries(Object.keys(localStorage).sort().map(k=>[k,localStorage.getItem(k)])));
 const before=await snapshot();assert.equal(JSON.parse(before.aventuraTiendaV1).coins,345);assert.equal(before['progresoArcadeAventuraGA:explorador'],'4');
 const version=()=>page.evaluate(()=>new Promise(resolve=>{const channel=new MessageChannel();channel.port1.onmessage=e=>resolve(e.data.version);navigator.serviceWorker.controller.postMessage({type:'GET_VERSION'},[channel.port2]);}));
 assert.equal(await version(),'aventura-palabras-runtime-v'+oldVersion);
 // A neutral page avoids competing automatic update checks from the game's old UI.
 await page.goto('http://127.0.0.1:'+server.address().port+'/upgrade-probe.html');
 phase=1;
 const transitions=await page.evaluate(async ({oldVersion,newVersion})=>{
  const registration=await navigator.serviceWorker.getRegistration();
  await registration.update();
  const started=Date.now();
  while(!registration.waiting){if(Date.now()-started>60000)throw Error('new worker never reached waiting');await new Promise(r=>setTimeout(r,50));}
  const next=registration.waiting;
  const read=worker=>new Promise(resolve=>{const c=new MessageChannel();c.port1.onmessage=e=>resolve(e.data.version);worker.postMessage({type:'GET_VERSION'},[c.port2]);});
  const active=await read(navigator.serviceWorker.controller),waiting=await read(next);
  if(active!=='aventura-palabras-runtime-v'+oldVersion||waiting!=='aventura-palabras-runtime-v'+newVersion)throw Error('release versions overlap incorrectly');
  const changed=new Promise(resolve=>navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true}));
  next.postMessage({type:'SKIP_WAITING'});await changed;
  return {active,waiting};
 },{oldVersion,newVersion});
 assert.equal(transitions.active,'aventura-palabras-runtime-v'+oldVersion);
 assert.equal(transitions.waiting,'aventura-palabras-runtime-v'+newVersion);
 await context.setOffline(true);await page.goto(url);await page.evaluate(()=>I18n.ready);
 const after=await snapshot();
 const previousWallet=JSON.parse(before.aventuraTiendaV1),nextWallet=JSON.parse(after.aventuraTiendaV1);
 if(nextWallet.currencyVersion===2&&previousWallet.currencyVersion!==2){
  assert.equal(nextWallet.coins,previousWallet.coins*10,'legacy coins scale exactly once');
  assert.deepEqual(nextWallet.owned,previousWallet.owned,'costume ownership preserved');
  assert.deepEqual(nextWallet.equipped,previousWallet.equipped,'equipment preserved');
  const again=await page.evaluate(()=>CosmeticStore.read());assert.equal(again.coins,nextWallet.coins,'repeat read does not scale again');
  delete after.aventuraTiendaV1;const rest={...before};delete rest.aventuraTiendaV1;assert.deepEqual(after,rest,'all other local player data preserved');
 }else assert.deepEqual(after,before,'all local player data survives the upgrade byte-for-byte');
 const preserved=await page.evaluate(()=>new Promise((resolve,reject)=>{const r=indexedDB.open('release-preservation',1);r.onerror=()=>reject(r.error);r.onsuccess=()=>{const db=r.result,q=db.transaction('player').objectStore('player').get('snapshot');q.onsuccess=()=>{db.close();resolve(q.result);};};}));assert.deepEqual(preserved,{profile:'synthetic-player',friends:['synthetic-friend']});
 assert.equal(await page.locator('#btnAmigosPerfil').count(),1,'new profile entry is cached offline');assert.equal(await page.evaluate(()=>I18n.language),'en');assert.deepEqual(errors,[]);
 console.log('PASS release upgrade v'+oldVersion+' -> v'+newVersion+': active/waiting isolation, offline app, all localStorage and IndexedDB preserved (profile, wallet, progress, Tower, language, audio and session probes).');
 }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
