'use strict';
// Arm before deployment, then create the local marker only after public hashes pass.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'../..'),out=path.join(root,'.local-developer/tower-ten-outfits'),marker=path.join(out,'published-ready');
const origin='https://aliasjohel.github.io/aventura-de-palabras-ga/';
(async()=>{let browser;try{
 assert(!fs.existsSync(marker),'Remove stale local deployment marker before arming');
 browser=await chromium.launch({channel:'msedge',headless:true});const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 const page=await context.newPage(),errors=[],failed=[],requests=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.url().startsWith(origin)&&r.status()>=400)failed.push({url:r.url(),status:r.status()});});
 page.on('request',r=>{if(r.url().includes('/tower-preview/'))requests.push(r.url());});
 await page.goto(origin,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>globalThis.TowerOutfitPreview&&navigator.serviceWorker.controller,null,{timeout:120000});await page.evaluate(()=>I18n.ready);
 const version=()=>page.evaluate(()=>new Promise(resolve=>{const c=new MessageChannel();c.port1.onmessage=e=>resolve(e.data.version);navigator.serviceWorker.controller.postMessage({type:'GET_VERSION'},[c.port2]);}));
 assert.equal(await version(),'aventura-palabras-runtime-v390-arenchampionselector1');assert.equal(await page.evaluate(()=>TowerOutfitPreview.catalog.length),1);
 await page.evaluate(()=>localStorage.setItem('tower-release-sentinel','keep-v390'));
 console.log('ARMED: actual GitHub Pages v390 installed in mobile browser; awaiting verified publication marker');
 const deadline=Date.now()+15*60e3;while(!fs.existsSync(marker)){if(Date.now()>deadline)throw Error('Publication marker timeout');await new Promise(r=>setTimeout(r,1000));}
 requests.length=0;await page.evaluate(async()=>{window.towerRegistration=await navigator.serviceWorker.getRegistration();await towerRegistration.update();});
 await page.waitForFunction(()=>towerRegistration.waiting,null,{timeout:120000});assert.equal(await version(),'aventura-palabras-runtime-v390-arenchampionselector1');assert.equal(requests.length,0,'No outfit images downloaded by update');
 await page.evaluate(()=>new Promise(resolve=>{navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true});towerRegistration.waiting.postMessage({type:'SKIP_WAITING'});}));
 assert.equal(await version(),'aventura-palabras-runtime-v391-towerten-candidate1');
 await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>globalThis.TowerOutfitPreview&&globalThis.TowerOutfitArtwork);await page.evaluate(()=>I18n.ready);
 assert.equal(await page.evaluate(()=>TowerOutfitPreview.catalog.length),11);assert.equal(await page.evaluate(()=>localStorage.getItem('tower-release-sentinel')),'keep-v390');
 const selected=[];for(const item of await page.evaluate(()=>TowerOutfitPreview.catalog.map(c=>({id:c.id,character:c.character})))){await page.evaluate(id=>TowerOutfitPreview.select(id),item.id);assert.equal(await page.evaluate(()=>TowerOutfitPreview.selection()),item.id);const img=await page.evaluate(character=>TowerOutfitPreview.asset(character),item.character);assert(img.includes(item.id));selected.push(item.id);}
 await page.evaluate(()=>TowerOutfitPreview.reset());assert.equal(await page.evaluate(()=>TowerOutfitPreview.stats().decodedPoses),0);
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
 const result={passed:true,url:origin,from:'v390-arenchampionselector1',to:'v391-towerten-candidate1',actualPublicServiceWorkerUpdate:true,priorWorkerActiveUntilActivation:true,updateOutfitDownloads:0,selectedOutfits:selected,localSentinelPreserved:true,pageErrors:errors,failedPublicRequests:failed,physicalAndroidTest:false};
 fs.writeFileSync(path.join(out,'live-release.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
 }finally{await browser?.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
