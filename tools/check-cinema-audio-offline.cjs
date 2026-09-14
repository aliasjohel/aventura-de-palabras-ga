const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=process.cwd(), world=require('../js/azrak-world.js');
const audioFiles=Object.values(world.finalMusic).map(s=>s.src);
const server=http.createServer((req,res)=>{
 const name=new URL(req.url,'http://localhost').pathname;
 if(name==='/test.html'){res.setHeader('Content-Type','text/html');return res.end('<meta charset=utf-8><link rel="stylesheet" href="css/azrak-world.css"><button id="start" onclick="window.done=AzrakWorld.playCinematic(\'final\')">Start</button><script src="js/azrak-world.js"></script>');}
 if(name==='/test-sw.js'){res.setHeader('Content-Type','text/javascript');return res.end(fs.readFileSync('sw.js','utf8')+'\ninstalarRecursosConProgreso = async () => {const c=await caches.open(CACHE_NAME); await c.addAll('+JSON.stringify(audioFiles)+'); await self.skipWaiting();};');}
 fs.readFile(path.join(root,name),(e,d)=>{if(e){res.writeHead(404);return res.end();}res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.png':'image/png','.mp3':'audio/mpeg'})[path.extname(name)]||'application/octet-stream');res.end(d);});
});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,channel:'msedge'});try{
 const context=await browser.newContext({viewport:{width:1000,height:700}});const page=await context.newPage();const url='http://127.0.0.1:'+server.address().port;
 await page.goto(url+'/test.html');
 await page.evaluate(()=>{
  window.media=[];window.blockAudio=false;
  window.Audio=class extends EventTarget{
   constructor(src){super();this.src=src;this.readyState=1;this.duration=130;this.currentTime=0;this.paused=true;this.ended=false;this.seeking=false;media.push(this);}
   play(){if(blockAudio)return Promise.reject(new DOMException('blocked','NotAllowedError'));this.paused=false;return Promise.resolve();}
   start(){this.readyState=4;this.paused=false;this.dispatchEvent(new Event('playing'));}
   pause(){this.paused=true;}load(){}removeAttribute(){}
  };
 });
 await page.click('#start');await page.waitForSelector('.azrak-music-notice');
 await page.waitForTimeout(2800);assert.equal(await page.locator('.cinematica-azrak').getAttribute('data-shot'),null);
 await page.evaluate(()=>media[0].start());await page.waitForSelector('[data-shot="resiste"]');
 await page.evaluate(()=>media[0].dispatchEvent(new Event('waiting')));assert.ok(await page.locator('.azrak-music-notice').isVisible());
 await page.evaluate(()=>media[0].start());assert.ok(await page.locator('.azrak-music-notice').isHidden());
 await page.keyboard.press('Escape');await page.waitForSelector('.cinematica-azrak',{state:'detached'});
 await page.evaluate(()=>{blockAudio=true;media=[];});await page.click('#start');await page.waitForFunction(()=>document.querySelector('.azrak-music-notice p')?.textContent.includes('Tocá'));
 assert.equal(await page.locator('.cinematica-azrak').getAttribute('data-shot'),null);
 await page.getByRole('button',{name:'Continuar sin música',exact:true}).click();await page.waitForSelector('[data-shot="resiste"]');
 await page.keyboard.press('Escape');await page.waitForSelector('.cinematica-azrak',{state:'detached'});
 console.log('PASS delayed audio waits beyond old timeout, buffering pauses, autoplay block explained, explicit silent continuation and skip.');
 await page.goto(url+'/test.html');
 await page.evaluate(async()=>{await navigator.serviceWorker.register('/test-sw.js');await navigator.serviceWorker.ready;});
 await page.waitForFunction(()=>navigator.serviceWorker.controller);
 await context.setOffline(true);
 const ranges=await page.evaluate(async files=>Promise.all(files.map(async src=>{const r=await fetch(src,{headers:{Range:'bytes=0-127'}});return {status:r.status,length:(await r.arrayBuffer()).byteLength};})),audioFiles);
 assert.ok(ranges.every(r=>r.status===206&&r.length===128));
 // Actual browser audio decoder, created for the first time after going offline.
 await page.evaluate(()=>{window.realMedia=[];const NativeAudio=window.Audio;window.Audio=function(src){const a=new NativeAudio(src);realMedia.push(a);return a;};});
 await page.click('#start');await page.waitForSelector('[data-shot="resiste"]',{timeout:15000});
 await page.waitForFunction(()=>realMedia[0].currentTime>.1&&!realMedia[0].paused,{},{timeout:10000});
 assert.ok(await page.locator('.azrak-music-notice').isHidden());
 await page.keyboard.press('Escape');await page.waitForSelector('.cinematica-azrak',{state:'detached'});
 for(const src of audioFiles){await page.evaluate(src=>{window.probe=new Audio(src);document.querySelector('#start').onclick=()=>{window.probeResult=probe.play().then(()=>true,e=>e.name);};},src);await page.click('#start');await page.waitForFunction(()=>probe.currentTime>.1&&!probe.paused);await page.evaluate(()=>probe.pause());}
 console.log('PASS actual service-worker cached ranges and all three real MP3s play on their first offline attempt; final cinematic starts with real audio offline.');
}finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});

