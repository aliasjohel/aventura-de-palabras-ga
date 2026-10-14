const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),cp=require('node:child_process'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const files=['./css/forest-wildlife.css','./assets/sounds/seleccion-personaje.mp3','./assets/images/elementos/pajaro-bosque-aleteo-v1.png'];
const current=fs.readFileSync(path.join(root,'sw.js'),'utf8');
const nextVersion=Number(current.match(/CACHE_PREFIX}v(\d+)/)[1])+1;
const old=cp.execFileSync('git',['show','58aa6a9:sw.js'],{cwd:root,encoding:'utf8'});
const css=fs.readFileSync(path.join(root,files[0]),'utf8').replace(/\r\n/g,'\n');
const updated=css+'\n.cache-probe { color: rgb(123, 45, 67); }\n';
const revision='sha256-'+crypto.createHash('sha256').update(updated).digest('hex');
let phase=0,requests=[];
const server=http.createServer((req,res)=>{
  const url=new URL(req.url,'http://localhost'),name=url.pathname;
  res.setHeader('Cache-Control','no-store');
  if(name==='/probe.html'){res.setHeader('Content-Type','text/html');return res.end('<meta charset="utf-8"><button id="play">Play</button><script>window.progress=[];window.changes=0;navigator.serviceWorker.addEventListener("message",e=>{if(e.data.type==="PWA_INSTALL_PROGRESS")progress.push(e.data);});navigator.serviceWorker.addEventListener("controllerchange",()=>changes++);document.getElementById("play").onclick=()=>{window.sound=new Audio("assets/sounds/seleccion-personaje.mp3");window.playing=sound.play();};</script>');}
  if(name==='/sw.js'){
    res.setHeader('Content-Type','text/javascript');
    let script=phase===0?old:current;
    if(phase>=2)script=script.replace(/const CACHE_NAME = .*;/,'const CACHE_NAME = "aventura-palabras-runtime-v'+nextVersion+'";');
    script+='\nCORE_ASSETS.splice(0,CORE_ASSETS.length,...'+JSON.stringify(files)+');';
    if(phase>=2)script+='\nASSET_REVISIONS["'+files[0]+'"]="'+revision+'";REVISIONES_ACTUALES["'+files[0]+'"]="'+revision+'";delete LEGACY_RESOURCE_REVISIONS["'+files[0]+'"];';
    return res.end(script);
  }
  const file=path.resolve(root,'.'+name);
  if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
  if(files.includes('.'+name)) requests.push({phase,path:'.'+name});
  fs.readFile(file,(error,body)=>{
    if(error){res.writeHead(404);return res.end();}
    res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.mp3':'audio/mpeg','.png':'image/png'})[path.extname(file)]||'application/octet-stream');
    if('.'+name===files[0])body=Buffer.from(phase>=2?updated:css);
    res.end(body);
  });
});
(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const browser=await chromium.launch({channel:'msedge',headless:true});
  try{
    const context=await browser.newContext(),page=await context.newPage(),base='http://127.0.0.1:'+server.address().port;
    await page.goto(base+'/probe.html');
    await page.evaluate(async()=>{window.registration=await navigator.serviceWorker.register('/sw.js');await navigator.serviceWorker.ready;});
    await page.waitForFunction(()=>navigator.serviceWorker.controller);
    phase=1;requests=[];await page.evaluate(()=>registration.update());
    await page.waitForFunction(()=>registration.waiting);
    assert.deepEqual(requests,[],'migration must not fetch existing media or CSS');
    const progress=await page.evaluate(()=>progress.at(-1));assert.equal(progress.reutilizados,3);assert.equal(progress.descargados,0);
    let changes=await page.evaluate(()=>changes);
    await page.evaluate(()=>registration.waiting.postMessage({type:'SKIP_WAITING'}));
    await page.waitForFunction(previous=>changes>previous,changes);
    assert((await page.evaluate(()=>caches.keys())).includes('aventura-palabras-runtime-v347'));
    phase=2;requests=[];await page.evaluate(()=>registration.update());await page.waitForFunction(()=>registration.waiting);
    assert.deepEqual(requests.map(r=>r.path),[files[0]],'only modified CSS is downloaded');
    assert.equal(await page.evaluate(async()=>await (await fetch('css/forest-wildlife.css')).text()),css,'old active worker stays on old CSS while waiting');
    changes=await page.evaluate(()=>changes);await page.evaluate(()=>registration.waiting.postMessage({type:'SKIP_WAITING'}));await page.waitForFunction(previous=>changes>previous,changes);
    await context.setOffline(true);
    const result=await page.evaluate(async()=>{
      const style=await (await fetch('css/forest-wildlife.css?v=old')).text();
      const range=await fetch('assets/sounds/seleccion-personaje.mp3',{headers:{Range:'bytes=0-127'}});
      const image=await fetch('assets/images/elementos/pajaro-bosque-aleteo-v1.png');
      return {style,status:range.status,length:(await range.arrayBuffer()).byteLength,image:image.status};
    });
    assert.equal(result.style,updated);assert.equal(result.status,206);assert.equal(result.length,128);assert.equal(result.image,200);
    await page.click('#play');await page.evaluate(()=>playing);await page.waitForFunction(()=>sound.currentTime>.02);await page.evaluate(()=>sound.pause());
    console.log('PASS real browser: v347 migration with zero resource downloads; one CSS download on next release; active/waiting isolation; cached image and MP3 byte ranges offline; real audio plays offline.');
  }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
