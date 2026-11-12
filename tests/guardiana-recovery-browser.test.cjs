'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fallback=path.resolve(__dirname,'..'),root=path.resolve(process.env.TOWER_FEEDBACK_PACKAGE||fallback),out=path.resolve(process.env.GUARDIANA_QA_OUTPUT||require('os').tmpdir()+'/aventura-guardiana-recovery');

test('Guardiana returns from actual wizard hits without a second flipped damage pose, including earned Orquidea',{timeout:180000},async()=>{
 fs.mkdirSync(out,{recursive:true});const errors=[],rows=[];let browser;
 const server=http.createServer((req,res)=>{try{const rel=decodeURIComponent(new URL(req.url,'http://local').pathname).replace(/^\//,'')||'index.html';if(rel.split('/').includes('..'))throw Error('Path');let file=path.join(root,rel);if(!fs.existsSync(file))file=path.join(fallback,rel);let body=fs.readFileSync(file);res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.json':'application/json','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.mp3':'audio/mpeg'})[path.extname(rel)]||'application/octet-stream');res.end(body);}catch{res.writeHead(404).end();}});
 try{
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;browser=await chromium.launch({channel:'msedge',headless:true});
  const context=await browser.newContext({viewport:{width:844,height:390},serviceWorkers:'block'});await context.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort());const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(origin);await page.evaluate(()=>I18n.ready);await page.clock.install();await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now()+1000)));
  await page.evaluate(()=>{const ensure=async paths=>Promise.all(paths.map(async src=>{const image=new Image();image.src=src;await image.decode();}));globalThis.GameResources={...GameResources,ensure,combat:ensure};globalThis.AdventureAccountV2={...AdventureAccountV2,owns:()=>true};document.getElementById('pilotAdmission')?.remove();});
  const setup=async(side,outfit='')=>{
   await page.evaluate(({side})=>{TowerOutfitPreview.reset();document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente','intro-activa');document.getElementById('pilotAdmission')?.remove();cancelarCinematicaFinalVersus();detenerRondaVersus();limpiarEntradaDueloVersus();limpiarAnimacionHabilidadVersus();ocultarAnuncioFinVersus();modoArcadeActivo=true;torreEnCurso=false;modoPruebasActivo=false;partidaOnlineVersus=null;dueloAventuraActivo=null;adaptadorSalasVersus=adaptadorLocalSalasVersus;personajeJugadorVersus=side==='player'?'guardiana':'mago';personajeRivalVersus=side==='player'?'mago':'guardiana';finalizarContextoPalabras();iniciarContextoPalabras('versus');const theme=Object.keys(obtenerBancosPalabrasVersus())[0];tematicaVersus.value=theme;palabrasSecretasVersus=obtenerBancosPalabrasVersus()[theme].slice(0,maximoPalabrasVersus);mostrarPantalla(pantallaVersus);prepararDueloVersus({comenzarRonda:false});limpiarEntradaDueloVersus();}, {side});
   if(outfit)await page.evaluate(id=>TowerOutfitPreview.select(id),outfit);await page.clock.runFor(30);await page.evaluate(()=>Promise.all([personajeVersusUno,personajeVersusDos,fondoVersus].map(image=>image.decode())));
  };
  for(const viewport of [{width:844,height:390},{width:667,height:375},{width:1280,height:820}])for(const motion of ['no-preference','reduce'])for(const side of ['player','npc'])for(const outfit of ['original','tower']){
   await page.setViewportSize(viewport);await page.emulateMedia({reducedMotion:motion});await setup(side);
   if(outfit==='tower')await page.evaluate(()=>{globalThis.__realTower=TowerRewards;globalThis.TowerRewards={...TowerRewards,equipped:character=>character==='guardiana'?'tower_guardiana':null};if(personajeRivalVersus==='guardiana'){modoArcadeActivo=false;adaptadorSalasVersus={...adaptadorLocalSalasVersus,proveedor:'local',obtenerTrajesRival:()=>({guardiana:'tower_guardiana'})};}refrescarTrajesVersus();});
   const selector=side==='player'?'#personajeVersusUno':'#personajeVersusDos';
   const snapshot=()=>page.locator(selector).evaluate(e=>({src:e.getAttribute('src'),x:new DOMMatrixReadOnly(getComputedStyle(e).transform).a,animation:getComputedStyle(e).animationName,hurt:e.classList.contains('impacto-combate-activo')}));
   const base=await snapshot();await page.evaluate(side=>side==='player'?reproducirAtaqueRivalVersus():reproducirAtaqueJugadorVersus(),side);
   await page.clock.runFor(motion==='reduce'?150:800);await page.locator(selector).evaluate(e=>e.decode());const hit=await snapshot();
   assert(hit.hurt,JSON.stringify({viewport,motion,side,outfit,base,hit}));assert(hit.src.endsWith(outfit==='original'?'guardiana-impacto-tronco-frontal-v1.png':'guardiana-orquidea-impacto-v2.webp'));
   const hitSign=outfit==='original'?(side==='player'?-1:1):(side==='player'?1:-1);assert.equal(Math.sign(hit.x),hitSign,'Impact must face opponent');
   if(viewport.width===844&&motion==='no-preference')await page.screenshot({path:path.join(out,outfit+'-'+side+'-impact.png')});
   await page.clock.runFor(motion==='reduce'?90:290);const recovered=await snapshot();assert(!recovered.hurt);assert.equal(recovered.src,base.src,'Pose must return as soon as impact ends, before attack cleanup');assert.equal(Math.sign(recovered.x),Math.sign(base.x));
   await page.clock.runFor(600);const settled=await snapshot();assert.equal(settled.src,base.src);assert.equal(Math.sign(settled.x),Math.sign(base.x));
   rows.push({viewport,motion,side,outfit,base,hit,recovered,settled});
   if(viewport.width===844&&motion==='no-preference')await page.screenshot({path:path.join(out,outfit+'-'+side+'-recovered.png')});
   if(outfit==='tower')await page.evaluate(()=>{globalThis.TowerRewards=__realTower;});
  }
  assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({passed:true,cases:rows.length,rows,productionWrites:0,errors},null,2));
 }finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
});
