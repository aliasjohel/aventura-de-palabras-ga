'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'.local-developer/aren-champion-scale');fs.mkdirSync(out,{recursive:true});let browser;
const server=http.createServer((req,res)=>{try{const name=decodeURIComponent(new URL(req.url,'http://local').pathname),file=path.resolve(root,'.'+(name==='/'?'/index.html':name));if(!file.startsWith(root+path.sep))throw Error('Path');res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.mp3':'audio/mpeg','.wav':'audio/wav'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}});
(async()=>{try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;browser=await chromium.launch({channel:'msedge',headless:true});const context=await browser.newContext({viewport:{width:844,height:390},serviceWorkers:'block'}),page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));await context.route('**/*',r=>new URL(r.request().url()).origin===origin?r.continue():r.abort());await page.goto(origin);await page.evaluate(()=>I18n.ready);
 await page.evaluate(()=>{document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');window.scaleOriginalStore=CosmeticStore;modoArcadeActivo=false;modoPruebasActivo=false;partidaOnlineVersus=null;adaptadorSalasVersus=adaptadorLocalSalasVersus;personajeJugadorVersus='explorador';personajeRivalVersus='mago';finalizarContextoPalabras();iniciarContextoPalabras('versus');const themes=Object.keys(obtenerBancosPalabrasVersus());tematicaVersus.value=themes[0];palabrasSecretasVersus=obtenerBancosPalabrasVersus()[themes[0]].slice(0,maximoPalabrasVersus);mostrarPantalla(pantallaVersus);prepararDueloVersus({comenzarRonda:false});personajeVersusUno.style.animation='none';});
 async function geometry(selector='#personajeVersusUno'){await page.locator(selector).evaluate(i=>i.decode());await page.waitForTimeout(150);return page.locator(selector).evaluate(i=>{
  const canvas=document.createElement('canvas');canvas.width=i.naturalWidth;canvas.height=i.naturalHeight;const context=canvas.getContext('2d');context.drawImage(i,0,0);const {data}=context.getImageData(0,0,canvas.width,canvas.height);let top=canvas.height,foot=0;
  for(let y=0;y<canvas.height;y++)for(let x=0;x<canvas.width;x++)if(data[(y*canvas.width+x)*4+3]>=128){top=Math.min(top,y);foot=Math.max(foot,y);}
  const s=getComputedStyle(i),scale=s.scale==='none'?1:parseFloat(s.scale),renderedHeight=Math.min(i.clientHeight,i.clientWidth*canvas.height/canvas.width),rect=i.getBoundingClientRect();
  return {src:i.getAttribute('src'),visibleHeight:renderedHeight*(foot-top)/canvas.height*scale,ground:rect.top+(i.clientHeight-renderedHeight+renderedHeight*foot/canvas.height)*scale,scale};
 });}
 const checks=[];
 for(const viewport of [{width:844,height:390},{width:667,height:375},{width:1280,height:820}]){
  await page.setViewportSize(viewport);
  await page.evaluate(()=>{TowerOutfitPreview.reset();globalThis.CosmeticStore={...scaleOriginalStore,read:()=>({...scaleOriginalStore.read(),equipped:{}})};establecerPoseCombateVersus(personajeVersusUno,'ataque',null);establecerPoseCombateVersus(personajeVersusUno,'habilidad',null);refrescarTrajesVersus();});const original=await geometry();await page.screenshot({path:path.join(out,'original-'+viewport.width+'.png')});
  await page.evaluate(()=>{globalThis.CosmeticStore={...scaleOriginalStore,read:()=>({...scaleOriginalStore.read(),equipped:{explorador:'aren-bosque'}})};refrescarTrajesVersus();});const forest=await geometry();await page.screenshot({path:path.join(out,'forest-'+viewport.width+'.png')});
  assert(Math.abs(forest.visibleHeight-original.visibleHeight)<1,'Original and Forest reference heights '+JSON.stringify({original,forest,viewport}));
  await page.evaluate(()=>{globalThis.CosmeticStore=scaleOriginalStore;});await page.evaluate(()=>TowerOutfitPreview.select('aren-campeon'));
  const champion=[];
  for(const pose of ['base','preparacion','ataque','habilidad','impacto']){
   await page.evaluate(pose=>{const i=personajeVersusUno;i.classList.remove('recibiendo-dano','recibiendo-dano-magico');establecerPoseCombateVersus(i,'habilidad',null);establecerPoseCombateVersus(i,'ataque',null);if(pose==='preparacion')establecerPoseCombateVersus(i,'ataque',srcExploradorPreparaBumeran);if(pose==='ataque')establecerPoseCombateVersus(i,'ataque',srcExploradorLanzaBumeran);if(pose==='habilidad')establecerPoseCombateVersus(i,'habilidad',srcExploradorLupaVersus);if(pose==='impacto')i.classList.add('recibiendo-dano');},pose);
   const measured=await geometry();assert(measured.src.endsWith('-'+pose+'-v1.webp'));assert(Math.abs(measured.visibleHeight-original.visibleHeight)<1,pose+' matches original visible height '+JSON.stringify({original,measured}));assert(Math.abs(measured.ground-original.ground)<1,pose+' matches original ground '+JSON.stringify({original,measured}));champion.push({pose,...measured});await page.screenshot({path:path.join(out,pose+'-'+viewport.width+'.png')});
  }
  checks.push({viewport,original,forest,champion});await page.evaluate(()=>personajeVersusUno.classList.remove('recibiendo-dano'));
 }
 const cardChecks=[],cardSelector='.tarjeta-personaje-versus[data-personaje="explorador"] img';
 for(const viewport of [{width:667,height:375},{width:844,height:390},{width:1280,height:820}]){
  await page.setViewportSize(viewport);
  await page.evaluate(()=>{TowerOutfitPreview.reset();globalThis.CosmeticStore={...scaleOriginalStore,read:()=>({...scaleOriginalStore.read(),equipped:{}})};refrescarTrajesVersus();mostrarPantalla(pantallaSeleccionPersonajeVersus);});
  const original=await geometry(cardSelector);assert(original.visibleHeight>0);
  await page.screenshot({path:path.join(out,'selector-original-'+viewport.width+'.png')});
  await page.evaluate(()=>{globalThis.CosmeticStore={...scaleOriginalStore,read:()=>({...scaleOriginalStore.read(),equipped:{explorador:'aren-bosque'}})};refrescarTrajesVersus();});const forest=await geometry(cardSelector);
  // Select while the card is hidden, as in Settings, then reveal it.
  await page.evaluate(()=>{globalThis.CosmeticStore=scaleOriginalStore;mostrarPantalla(pantallaVersus);});await page.evaluate(()=>TowerOutfitPreview.select('aren-campeon'));await page.evaluate(()=>mostrarPantalla(pantallaSeleccionPersonajeVersus));
  const champion=await geometry(cardSelector);
  assert(champion.src.endsWith('-base-v1.webp'));assert(Math.abs(champion.visibleHeight-original.visibleHeight)<1,'Selection card height '+JSON.stringify({viewport,original,champion}));assert(Math.abs(champion.ground-original.ground)<1,'Selection card foot anchor');assert(Math.abs(champion.visibleHeight-forest.visibleHeight)<1,'Selection card Forest height');
  await page.screenshot({path:path.join(out,'selector-champion-'+viewport.width+'.png')});
  await page.evaluate(()=>TowerOutfitPreview.reset());const restored=await geometry(cardSelector);assert.equal(restored.scale,1);assert(Math.abs(restored.visibleHeight-forest.visibleHeight)<1,'Selection reset restores usual outfit');
  assert.equal(await page.locator(cardSelector).evaluate(i=>i.hasAttribute('data-champion-pose')||!!i.style.getPropertyValue('--champion-scale')||!!i.style.getPropertyValue('--champion-y')),false);
  cardChecks.push({viewport,original,forest,champion,restored});
 }
 assert.deepEqual(errors,[]);const result={passed:true,reference:'Opaque artwork bounds of original Aren and Forest; same visible height and foot anchor',tolerancePixels:1,checks,cardChecks,pageErrors:errors};fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(result,null,2));console.log(JSON.stringify({passed:true,viewports:checks.length,posesPerViewport:5,selectionViewports:cardChecks.length,maxSelectionHeightDifference:Math.max(...cardChecks.map(c=>Math.abs(c.champion.visibleHeight-c.original.visibleHeight))),maxHeightDifference:Math.max(...checks.flatMap(c=>c.champion.map(p=>Math.abs(p.visibleHeight-c.original.visibleHeight)))),maxGroundDifference:Math.max(...checks.flatMap(c=>c.champion.map(p=>Math.abs(p.ground-c.original.ground))))}));
}finally{await browser?.close();server.closeAllConnections();server.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
