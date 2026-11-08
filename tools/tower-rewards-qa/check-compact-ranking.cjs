'use strict';
// Synthetic account fixture. External network is blocked; no production writes.
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'../..');let browser;
const server=http.createServer((req,res)=>{try{const name=new URL(req.url,'http://local').pathname,file=path.resolve(root,'.'+(name==='/'?'/index.html':name));if(!file.startsWith(root+path.sep))throw Error();res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}});
(async()=>{try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({channel:'msedge',headless:true});const ctx=await browser.newContext({viewport:{width:844,height:390},isMobile:true,serviceWorkers:'block'});
 await ctx.route('**/*',r=>new URL(r.request().url()).origin===origin?r.continue():r.abort());const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin);await page.evaluate(()=>I18n.ready);

 fs.mkdirSync(path.join(root,'.local-developer/ranking-compact'),{recursive:true});
 await page.evaluate(()=>{
  document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');mostrarPantalla(pantallaMenu);
  window.rankingOpens=[];window.PublicPlayerProfile={abrir:id=>rankingOpens.push(id)};
  asegurarConexionSalasVersus=async()=>adaptadorSalasVersus;
  window.rankingFixture=[...Array.from({length:50},(_,i)=>({position:i+1,alias:'Jugador '+(i+1),points:1000-i*4,wins:100-i,played:120,user_id:'player-'+i,me:false,listed:true})),{position:800,alias:'Gerardo',points:14,wins:5,played:9,user_id:'me-800',me:true,listed:false}];
  adaptadorSalasVersus={...adaptadorSalasVersus,obtenerRanking:async()=>rankingFixture};
 });
 for(const [width,height]of [[320,740],[390,844],[844,390],[1365,900]]){
  await page.setViewportSize({width,height});await page.locator('#btnRankingMenu').click();await page.waitForFunction(()=>document.querySelector('#miRanking').textContent.includes('#800'));
  assert.equal(await page.locator('#listaRanking .ranking-fila').count(),50);assert.match(await page.locator('#miRanking').innerText(),/Bronce IV/);
  assert.equal(await page.locator('#listaRanking .ranking-fila').first().evaluate(e=>e.getBoundingClientRect().height<=64),true);
  assert(await page.locator('#rankingMenu').evaluate(e=>e.scrollWidth<=e.clientWidth));
  await page.locator('#miRanking .ranking-fila').click();assert.equal(await page.evaluate(()=>rankingOpens.at(-1)),'me-800');
  await page.locator('#listaRanking .ranking-fila').nth(1).click();assert.equal(await page.evaluate(()=>rankingOpens.at(-1)),'player-1');
  await page.evaluate(()=>document.getElementById('rankingMenu').scrollTop=1400);
  const pinned=await page.locator('.ranking-fijo').evaluate(e=>{const r=e.getBoundingClientRect(),d=document.getElementById('rankingMenu').getBoundingClientRect();return r.top>=d.top-2&&r.bottom<=d.bottom;});assert(pinned,'Own position must remain pinned');
  await page.locator('#miRanking .ranking-fila').click();assert.equal(await page.evaluate(()=>rankingOpens.at(-1)),'me-800');
  await page.evaluate(()=>document.getElementById('rankingMenu').scrollTop=0);await page.screenshot({path:path.join(root,'.local-developer/ranking-compact/ranking-'+width+'.png')});
  await page.locator('#cerrarRankingMenu').click();
 }
 await page.locator('#btnRankingMenu').click();
 for(const language of ['en','pt-BR','es']){await page.evaluate(language=>I18n.setPreference(language),language);assert.equal(await page.locator('#listaRanking .ranking-fila').count(),50);assert.match(await page.locator('#miRanking').innerText(),/#800/);}
 await page.evaluate(()=>{adaptadorSalasVersus.obtenerRanking=async()=>[];});await page.locator('#btnActualizarRanking').click();assert.equal(await page.locator('#miRanking .ranking-fila').count(),0);
 await page.evaluate(()=>{adaptadorSalasVersus.obtenerRanking=async()=>{throw Error('Offline');};});await page.locator('#btnActualizarRanking').click();assert.equal(await page.locator('#btnActualizarRanking').isEnabled(),true);assert((await page.locator('#miRanking').innerText()).length>0);
 assert.deepEqual(errors,[]);console.log('PASS compact top 50, own position 800 pinned, profile clicks, four viewports, translations, empty/offline');

}finally{await browser?.close();server.closeAllConnections();server.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
