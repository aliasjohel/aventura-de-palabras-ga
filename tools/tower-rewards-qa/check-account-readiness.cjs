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
 await page.evaluate(()=>{
  document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');
  window.accountTrace=[];window.accountFailed=false;window.releaseAccount=null;
  window.AventuraShop={...AventuraShop,connect:async()=>{accountTrace.push('connect');if(accountFailed)throw Error('Session loading');if(!CosmeticStore.read().accountId)await new Promise(r=>releaseAccount=r);CosmeticStore.beginAccount('synthetic-tower-account');adaptadorSalasVersus={proveedor:'supabase'};}};
  modoArcadeActivo=true;personajeJugadorVersus='guardiana';adaptadorSalasVersus=adaptadorLocalSalasVersus;
  torreAutoritativa={refresh:async()=>{accountTrace.push('refresh');return {userId:'synthetic-tower-account',managed:true,completed:{guardiana:0}};},progress:()=>({userId:'synthetic-tower-account',managed:true,completed:{guardiana:0}}),prepare:async()=>{accountTrace.push('prepare');return {attempt:{detail:{}}};},view:()=>({detail:{}})};
  mostrarPantalla(pantallaSeleccionPersonajeVersus);window.entryPromise=prepararRecorridoArcade();
 });
 assert.equal(await page.locator('#btnConfirmarPersonajeVersus').isDisabled(),true);
 assert.match(await page.locator('#estadoPersonajePropioVersus').innerText(),/Confirmando tu cuenta/);
 assert.equal(await page.evaluate(()=>pantallaArcade.classList.contains('activa')),false);
 await page.evaluate(async()=>{releaseAccount();await entryPromise;});
 assert.equal(await page.evaluate(()=>pantallaArcade.classList.contains('activa')),true);
 assert.equal(await page.evaluate(()=>adaptadorSalasVersus===adaptadorLocalSalasVersus),true);
 assert.equal(await page.evaluate(()=>document.querySelector('dialog[open]')),null);
 await page.evaluate(async()=>{prepararDueloVersus=()=>accountTrace.push('fight');renderizarDueloAventuraAutoritativo=()=>{};iniciarEntradaDueloVersus=()=>{};await iniciarCombateArcade();});
 assert.equal(await page.evaluate(()=>torreEnCurso),true);
 assert.match(await page.locator('#estadoValidacionCombateTorre').innerText(),/Combate por premios/);
 assert.deepEqual(await page.evaluate(()=>accountTrace),['connect','refresh','connect','prepare','fight']);
 await page.evaluate(async()=>{mostrarPantalla(pantallaArcade);accountFailed=true;await iniciarCombateArcade();});
 assert.equal(await page.evaluate(()=>pantallaArcade.classList.contains('activa')),true);
 assert.match(await page.locator('#estadoValidacionTorre').innerText(),/El combate no comenzó/);
 assert.equal(await page.evaluate(()=>accountTrace.filter(x=>x==='fight').length),1);
 assert.deepEqual(errors,[]);console.log('PASS cold Tower waits for account, starts verified without My profile, and blocks on connection failure');
}finally{await browser?.close();server.closeAllConnections();server.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
