const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const musicFiles=['world-forest-sunset-plains.mp3','world-desert-meditation.mp3','world-sky-rising-moon.mp3','world-winter-slow.mp3','world-winter-through-snow.mp3','world-azrak-end-of-hope.mp3','defeat-crystal-chime.wav'].map(f=>'./assets/sounds/'+f);
const server=http.createServer((req,res)=>{
  const name=new URL(req.url,'http://localhost').pathname;
  if(name==='/music-test-sw.js'){
    res.setHeader('Content-Type','text/javascript');
    return res.end(fs.readFileSync(path.join(root,'sw.js'),'utf8')+'\nCORE_ASSETS.splice(0,CORE_ASSETS.length,...'+JSON.stringify(musicFiles)+');self.addEventListener("install",e=>e.waitUntil(self.skipWaiting()));');
  }
  const file=path.resolve(root,'.'+(name==='/'?'/index.html':name));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
  fs.readFile(file,(error,data)=>{
    if(error){res.writeHead(404);return res.end();}
    res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.mp3':'audio/mpeg','.wav':'audio/wav'})[path.extname(file)]||'application/octet-stream');
    if(/\.(html|js|css|json|txt)$/.test(file))data=Buffer.from(data.toString().replace(/\r\n/g,'\n'));
    res.end(data);
  });
});
(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const browser=await chromium.launch({channel:'msedge',headless:true});
  try{
    const context=await browser.newContext({viewport:{width:390,height:844}});await context.route('https://**/*',r=>r.abort());
    await context.addInitScript(()=>{
      window.nativeAudio=window.Audio;window.worldPlayers=[];window.defeatPlayers=[];
      class SilentAudio extends EventTarget{
        constructor(src){super();this.src=src;this.currentSrc=src;this.paused=true;this.ended=false;this.currentTime=0;this.duration=120;this.readyState=4;this.networkState=1;this.volume=1;}
        play(){this.paused=false;return Promise.resolve();}pause(){this.paused=true;}load(){}removeAttribute(){}
      }
      window.Audio=function(src){if(String(src).includes('/world-')){const a=new nativeAudio(src);worldPlayers.push(a);return a;}if(String(src).includes('defeat-crystal-chime.wav')){const a=new nativeAudio(src);defeatPlayers.push(a);return a;}return new SilentAudio(src);};
      window.Audio.prototype=nativeAudio.prototype;
    });
    const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded'});await page.evaluate(()=>I18n.ready);
    await page.evaluate(()=>{document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');document.querySelectorAll('[aria-modal="true"]').forEach(n=>n.classList.add('oculto'));escenarioActual=0;misionActual=0;actualizarEscenaPorMision();mostrarPantalla(pantallaJuego);});
    await page.locator('body').click({position:{x:380,y:800}});
    const waitPlaying=async file=>{await page.waitForFunction(file=>worldPlayers.some(a=>a.src.endsWith(file)&&!a.paused&&a.currentTime>.03&&a.volume>.13),file,{timeout:15000});};
    await waitPlaying('world-forest-sunset-plains.mp3');
    assert.equal(await page.locator('#vidas').isVisible(),false);
    await page.evaluate(()=>{intentos=5;actualizarVidas();});assert.equal(await page.locator('.trampa-raices').getAttribute('data-stage'),'1');
    await page.evaluate(()=>{intentos=0;actualizarVidas();});assert.equal(await page.locator('.trampa-raices').getAttribute('data-stage'),'6');assert(await page.locator('.trampa-raices').evaluate(n=>n.classList.contains('capturado')));
    await page.evaluate(()=>{intentos=6;actualizarVidas();modalHistoria.classList.remove('oculto');});
    // GameAudio.volume exposes the authored level; the mixer applies its gain
    // separately through the native media setter.
    await page.waitForFunction(()=>Math.abs((worldPlayers.find(a=>!a.paused)?.volume ?? 1)-.12)<.001);await page.evaluate(()=>modalHistoria.classList.add('oculto'));
    for(const [world,mission,file] of [[1,0,'world-desert-meditation.mp3'],[2,0,'world-sky-rising-moon.mp3'],[3,0,'world-winter-slow.mp3'],[3,3,'world-winter-through-snow.mp3'],[4,0,'world-azrak-end-of-hope.mp3']]){
      await page.evaluate(({world,mission})=>{escenarioActual=world;misionActual=mission;actualizarEscenaPorMision();actualizarVidas();}, {world,mission});
      await waitPlaying(file);assert.equal(await page.locator('#vidas').isVisible(),false);
      await page.waitForFunction(()=>worldPlayers.filter(a=>!a.paused).length===1);
      if(world>=2){await page.evaluate(()=>{intentos=0;actualizarVidas();});assert.equal(await page.locator('.peligro-palabras').getAttribute('data-stage'),'6');await page.evaluate(()=>{intentos=6;actualizarVidas();});}
    }
    const duration=await page.evaluate(()=>Object.fromEntries(worldPlayers.map(a=>[a.src.split('/').pop(),a.duration])));
    assert(duration['world-winter-slow.mp3']>duration['world-winter-through-snow.mp3']);
    await page.evaluate(()=>mostrarPantalla(pantallaMenu));await page.waitForFunction(()=>worldPlayers.every(a=>a.paused));
    assert.equal(await page.evaluate(()=>sonidos.derrota.src.endsWith('defeat-crystal-chime.wav')),true);
    await page.evaluate(()=>{const b=document.createElement('button');b.id='defeatProbe';b.textContent='Defeat';b.onclick=()=>reproducirSonido('derrota');document.body.append(b);});await page.locator('#defeatProbe').click();await page.waitForFunction(()=>defeatPlayers.some(a=>!a.paused&&a.currentTime>.03));await page.evaluate(()=>sonidos.derrota.pause());
    await page.evaluate(async()=>{window.musicRegistration=await navigator.serviceWorker.register('/music-test-sw.js');await navigator.serviceWorker.ready;});
    await page.waitForFunction(() => navigator.serviceWorker.controller?.scriptURL.endsWith('/music-test-sw.js'));
    await context.setOffline(true);
    for(const src of musicFiles){
      const range=await page.evaluate(async src=>{const r=await fetch(src,{headers:{Range:'bytes=0-127'}});return {status:r.status,length:(await r.arrayBuffer()).byteLength};},src);
      assert.equal(range.status,206);assert.equal(range.length,128);
      await page.evaluate(src=>{window.probe=new nativeAudio(src);let b=document.getElementById('musicOfflineProbe');if(!b){b=document.createElement('button');b.id='musicOfflineProbe';b.textContent='Audio offline';document.body.append(b);}b.onclick=()=>{window.probeResult=probe.play();};},src);
      await page.locator('#musicOfflineProbe').click();await page.evaluate(()=>probeResult);await page.waitForFunction(()=>probe.currentTime>.03);await page.evaluate(()=>probe.pause());
    }
    assert.deepEqual(errors,[]);
    console.log('PASS: six real tracks play; soft volume/ducking; winter slow-to-normal transition; one track at a time; adventure hearts hidden and traps still reach stage six; menu pause; all six MP3s and the new defeat chime play and return cached ranges offline.');
    console.log(JSON.stringify({durationSeconds:duration,totalNewAudioBytes:musicFiles.reduce((n,f)=>n+fs.statSync(path.join(root,f)).size,0)}));
  }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
