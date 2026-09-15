const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=process.cwd();const server=http.createServer((req,res)=>{const n=new URL(req.url,'http://localhost').pathname;fs.readFile(path.join(root,n==='/'?'index.html':n),(e,d)=>{if(e){res.writeHead(404);return res.end();}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png'})[path.extname(n==='/'?'index.html':n)]||'application/octet-stream');res.end(d);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,channel:'msedge'});try{
 const page=await browser.newPage({viewport:{width:844,height:390}});await page.goto('http://127.0.0.1:'+server.address().port);await page.locator('#introOficial').click();
 await page.evaluate(()=>{mostrarPantalla(pantallaVersus);personajeJugadorVersus='dragon_hielo';personajeRivalVersus='mago';configurarPersonajesCombateVersus();demoVersus.partidaFinalizada=false;});
 // Delay decoding even when the file was already downloaded, as on a slow first mobile render.
 await page.evaluate(()=>{window.nativeDecode=HTMLImageElement.prototype.decode;HTMLImageElement.prototype.decode=async function(){await nativeDecode.call(this);if(this.src.includes('aterrizaje-bajo'))await new Promise(r=>setTimeout(r,1800));};window.preparation=iniciarEntradaDueloVersus();});
 await page.waitForSelector('.preparacion-imagenes-combate');
 assert.equal(await page.locator('.nivor-aleteando').count(),0);
 await page.waitForTimeout(500);assert.equal(await page.locator('.nivor-aleteando').count(),0);
 await page.evaluate(()=>preparation);
 assert.ok(await page.evaluate(()=>imagenesCombateListas.length>=7&&imagenesCombateListas.every(i=>i.complete&&i.naturalWidth>0)));
 const seen=new Set();for(let i=0;i<6;i++){await page.waitForTimeout(150);seen.add(await page.evaluate(()=>personajeVersusUno.src.split('/').pop()));}
 assert.ok(seen.has('dragon-hielo-aterrizaje-alto-v2.png'));assert.ok(seen.has('dragon-hielo-aterrizaje-bajo-v2.png'));
 await page.screenshot({path:'tools/.nivor-ready-mobile.png'});
 await page.evaluate(()=>{limpiarEntradaDueloVersus();configurarPersonajesCombateVersus();HTMLImageElement.prototype.decode=nativeDecode;});
 // Real simultaneous attack timers: opposing cleanup and damage must preserve an active attack.
 await page.evaluate(()=>{reproducirAtaqueMagoVersus();});await page.waitForTimeout(350);
 await page.evaluate(()=>{limpiarAnimacionAtaqueJugadorVersus();});
 assert.ok(await page.evaluate(()=>personajeVersusDos.src.endsWith(srcMagoAtaqueVersus)));
 await page.evaluate(()=>{establecerPoseCombateVersus(personajeVersusUno,'ataque',srcDragonHieloAtaqueVersus);personajeVersusUno.classList.add('recibiendo-dano');});
 assert.ok(await page.evaluate(()=>personajeVersusUno.src.endsWith(srcDragonHieloAtaqueVersus)));
 await page.evaluate(()=>{establecerPoseCombateVersus(personajeVersusUno,'habilidad',srcDragonHieloVueloVersus);limpiarAnimacionAtaqueJugadorVersus();});
 assert.ok(await page.evaluate(()=>personajeVersusUno.src.endsWith(srcDragonHieloVueloVersus)));
 await page.evaluate(()=>{limpiarAnimacionHabilidadVersus();limpiarAnimacionAtaqueVersus();});
 // Cancel a pending preparation; stale async completion must never start an entry.
 await page.evaluate(()=>{HTMLImageElement.prototype.decode=async function(){await nativeDecode.call(this);await new Promise(r=>setTimeout(r,500));};window.cancelled=iniciarEntradaDueloVersus();limpiarEntradaDueloVersus();});
 await page.evaluate(()=>cancelled);assert.equal(await page.locator('.entrando-duelo').count(),0);assert.equal(await page.locator('.preparacion-imagenes-combate').count(),0);
 // Decode failure is visible and retryable, rather than silently caching failure.
 await page.evaluate(()=>{HTMLImageElement.prototype.decode=async()=>{throw new Error('decode failure');};window.failed=iniciarEntradaDueloVersus();});await page.evaluate(()=>failed);
 assert.ok(await page.getByRole('button',{name:'Reintentar',exact:true}).isVisible());
 await page.evaluate(()=>{HTMLImageElement.prototype.decode=nativeDecode;});await page.getByRole('button',{name:'Reintentar',exact:true}).click();await page.waitForSelector('.nivor-aleteando');
 await page.evaluate(()=>limpiarEntradaDueloVersus());
 console.log('PASS delayed first decode gates entrance, both Nivor wing frames render, opposing cleanup/damage preserve attacks, ability survives cleanup, cancellation and retry.');
}finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});


