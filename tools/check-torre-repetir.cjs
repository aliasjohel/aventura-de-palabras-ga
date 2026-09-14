const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=process.cwd();
const server=http.createServer((req,res)=>{const name=new URL(req.url,'http://localhost').pathname;const f=path.join(root,name==='/'?'index.html':name);fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);return res.end();}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png'})[path.extname(f)]||'application/octet-stream');res.end(d);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,channel:'msedge'});try{
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:'+server.address().port);await page.locator('#introOficial').click();await page.waitForTimeout(800);await page.setViewportSize({width:844,height:390});
await page.evaluate(()=>{personajeJugadorVersus='explorador';localStorage.setItem(obtenerClaveProgresoArcade(),'8');modoArcadeActivo=true;prepararRecorridoArcade();});
await page.locator('#pisosArcade li').last().click();assert.equal(await page.evaluate(()=>pisoActualArcade),0);assert.equal(await page.locator('#btnCombatirArcade').textContent(),'Volver a luchar');
await page.locator('#pisosArcade li').first().click({force:true});assert.equal(await page.evaluate(()=>pisoActualArcade),0);
await page.evaluate(()=>{pisoCombateArcade=0;mostrarResultadoPartidaVersus('jugador','Ganaste');});assert.equal(await page.evaluate(()=>pisosDesbloqueadosArcade),8);assert.equal(await page.evaluate(()=>pisoActualArcade),8);assert.equal(await page.evaluate(()=>leerProgresoArcade()),8);
await page.evaluate(()=>abrirTorreArcade());await page.locator('#pisosArcade li').last().focus();await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>pisoActualArcade),0);
await page.evaluate(()=>{pisoCombateArcade=0;mostrarResultadoPartidaVersus('rival','');});assert.equal(await page.evaluate(()=>leerProgresoArcade()),8);
await page.evaluate(()=>{guardarProgresoArcade(rivalesTorreArcade.length);abrirTorreArcade();});assert.equal(await page.locator('#pisosArcade [aria-disabled="true"]').count(),0);
await page.screenshot({path:'tools/.torre-repetir-844.png'});assert.deepEqual(errors,[]);console.log('PASS replay selection, locked floor, keyboard, win/loss preserve progress, completed tower');
}finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
