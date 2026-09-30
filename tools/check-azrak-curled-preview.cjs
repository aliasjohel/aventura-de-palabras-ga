const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{
  const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/\/$/,'/index.html'));
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  fs.readFile(file,(error,data)=>{if(error){res.writeHead(404).end();return;}
    res.setHeader('Content-Type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');res.end(data);});
});

(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,channel:'msedge'});try{const page=await browser.newPage({viewport:{width:844,height:390},serviceWorkers:'block'});await page.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort());await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded'});await page.clock.install();
const characters=await page.evaluate(()=>Object.keys(victimasFaucesVersus));
for(const character of characters)for(const costume of ['original','nuevo']){
await page.evaluate(({character,costume})=>{modoPruebasActivo=true;personajeJugadorVersus='guardiana';personajeRivalVersus=character;trajesPruebaVersus.rival[character]=costume;reproducirPrisionEsmeraldaVersus(character);},{character,costume});
const bite=await page.locator('#carnivoraDevorandoVersus').getAttribute('src');assert(bite.includes('planta')||bite.includes('carnivora-devorando'));
const before=await page.locator('#victimaFaucesVersus').getAttribute('src');await page.clock.runFor(1850);
const result=await page.evaluate(()=>({src:victimaFaucesVersus.getAttribute('src'),timer:demoVersus.temporizadorReaccionCinematica}));assert.notEqual(result.src,before);if(character==='kairos'){assert.equal(result.src.includes('/trajes/'),costume==='nuevo');assert.equal(bite.includes('/trajes/'),costume==='nuevo');}assert.equal(result.timer,null);if(character==='azrak'){assert(result.src.includes('susto-v1'));assert.equal(await page.locator('#victimaFaucesVersus').evaluate(el=>getComputedStyle(el).getPropertyValue('--direccion-victima-fauces').trim()),'1');}await page.locator('#victimaFaucesVersus').evaluate(img=>img.decode());
}
await page.evaluate(()=>{reproducirPrisionEsmeraldaVersus('azrak');cancelarCinematicaFinalVersus();});const canceled=await page.locator('#victimaFaucesVersus').getAttribute('src');await page.clock.runFor(2000);assert.equal(await page.locator('#victimaFaucesVersus').getAttribute('src'),canceled);
for(const viewport of [{width:844,height:390},{width:390,height:844}]){await page.setViewportSize(viewport);await page.evaluate(()=>{document.querySelector('#introOficial')?.remove();document.body.classList.remove('intro-pendiente');mostrarPantalla(pantallaVersus);personajeRivalVersus='azrak';trajesPruebaVersus.rival.azrak='nuevo';reproducirPrisionEsmeraldaVersus('azrak');});await page.clock.runFor(1850);await page.locator('#victimaFaucesVersus').evaluate(img=>img.decode());await page.evaluate(()=>{for(const a of cinematicaFinalVersus.getAnimations({subtree:true})){a.pause();a.currentTime=2200;}});await page.screenshot({path:path.join(root,'tools/azrak-fauces-'+viewport.width+'.png')});}
await page.setViewportSize({width:844,height:390});for(const costume of ['original','nuevo'])for(const time of [2200,2700,3000]){await page.evaluate(costume=>{personajeRivalVersus='azrak';trajesPruebaVersus.rival.azrak=costume;reproducirPrisionEsmeraldaVersus('azrak');},costume);await page.clock.runFor(1850);await page.locator('#victimaFaucesVersus').evaluate(img=>img.decode());await page.evaluate(time=>{for(const a of cinematicaFinalVersus.getAnimations({subtree:true})){a.pause();a.currentTime=time;}},time);await page.screenshot({path:path.join(root,'tools/azrak-curled-'+costume+'-'+time+'.png')});}
console.log('PASS: 22 reactions, image decoding, canceled timer, portrait and landscape previews');
}finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
