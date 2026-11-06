'use strict';
// Visual fixture only. Ownership/security are independently tested in PostgreSQL.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'../..');let browser;
const server=http.createServer((req,res)=>{try{const name=new URL(req.url,'http://local').pathname,file=path.resolve(root,'.'+(name==='/'?'/index.html':name));if(!file.startsWith(root+path.sep))throw Error('Path');res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}});
(async()=>{try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({channel:'msedge',headless:true});const context=await browser.newContext({viewport:{width:844,height:390},serviceWorkers:'block'});await context.route('**/*',r=>new URL(r.request().url()).origin===origin?r.continue():r.abort());const page=await context.newPage(),errors=[],scenes=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin);await page.evaluate(()=>I18n.ready);await page.evaluate(()=>{
  document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');
  CosmeticStore.beginAccount('synthetic-cinematic-fixture');
  TowerRewards.apply({userId:'synthetic-cinematic-fixture',owned:TowerRewards.catalog.map(c=>c.id),equipped:Object.fromEntries(TowerRewards.catalog.map(c=>[c.character,c.id])),revision:1});
 });await page.clock.install();await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now())));
 for(const c of await page.evaluate(()=>TowerRewards.catalog.map(c=>({id:c.id,character:c.character,assets:c.assets})))){
  for(const winner of [...new Set([c.character,'explorador','guardiana','azrak','kalamo','kairos'])]){
   const own=winner===c.character;await page.evaluate(({character,winner,own})=>{
    cancelarCinematicaFinalVersus();detenerRondaVersus();limpiarEntradaDueloVersus();limpiarAnimacionHabilidadVersus();ocultarAnuncioFinVersus();modoArcadeActivo=false;modoPruebasActivo=false;partidaOnlineVersus=null;partidaOnlineIniciada=false;dueloAventuraActivo=null;adaptadorSalasVersus=adaptadorLocalSalasVersus;personajeJugadorVersus=character;personajeRivalVersus=own?'mago':winner;finalizarContextoPalabras();iniciarContextoPalabras('versus');const theme=Object.keys(obtenerBancosPalabrasVersus())[0];tematicaVersus.value=theme;palabrasSecretasVersus=obtenerBancosPalabrasVersus()[theme].slice(0,maximoPalabrasVersus);mostrarPantalla(pantallaVersus);prepararDueloVersus({comenzarRonda:false});ladoGanadorCinematicaVersus=own?'jugador':'rival';void obtenerReproductorFinalVersus(winner,own?'mago':character)();
   },{character:c.character,winner,own});await page.waitForFunction(()=>cinematicaFinalVersus.classList.contains('activa'));
   await page.clock.runFor(own?3000:winner==='kalamo'?7400:winner==='kairos'?7000:winner==='azrak'?4400:3400);
   if(!own){const pose={explorador:c.character==='guardiana'?'impacto-tronco':'impacto',guardiana:'planta',azrak:'mano',kalamo:'vidrio',kairos:'anciano'}[winner];await page.waitForFunction(src=>[...document.querySelectorAll('#cinematicaFinalVersus img')].some(i=>i.getAttribute('src')===src),c.assets[pose]);}
   const sources=await page.locator('#cinematicaFinalVersus img').evaluateAll(imgs=>imgs.map(i=>i.getAttribute('src')).filter(s=>s?.includes('/tower-preview/')));assert(sources.some(s=>s.includes('/'+c.id.replace('tower_','')+'-'))||sources.some(s=>Object.values(c.assets).includes(s)),c.id+'/'+winner);
   if(!own){const expected={explorador:c.character==='guardiana'?'impacto-tronco':'impacto',guardiana:'planta',azrak:'mano',kalamo:'vidrio',kairos:'anciano'}[winner];assert(sources.includes(c.assets[expected]),JSON.stringify({id:c.id,expected,asset:c.assets[expected],sources}));}
   scenes.push({character:c.character,winner,own,sources});await page.evaluate(()=>cancelarCinematicaFinalVersus());
  }console.log('Cinematics '+c.character);
 }assert.deepEqual(errors,[]);const result={passed:true,syntheticVisualFixture:true,productionWrites:0,characters:11,sceneCases:scenes.length,selectorUsed:false,scenes,pageErrors:errors};fs.writeFileSync(path.join(root,'docs/tower-rewards-cinematics-results.json'),JSON.stringify(result,null,2));
}finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
