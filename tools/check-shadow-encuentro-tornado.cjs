const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=process.cwd();
const server=http.createServer((req,res)=>{const name=new URL(req.url,'http://localhost').pathname;const f=path.join(root,name==='/'?'index.html':name);fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);return res.end();}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png'})[path.extname(f)]||'application/octet-stream');res.end(d);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,channel:'msedge'});try{
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:'+server.address().port);await page.locator('#introOficial').click();await page.waitForTimeout(500);
await page.setViewportSize({width:844,height:390});
await page.emulateMedia({reducedMotion:'reduce'});
await page.evaluate(async()=>{reiniciarEstadoAventura();escenarioActual=4;misionActual=2;await iniciarMisionAventura();});
await page.waitForSelector('.kairos-cinema');
await page.locator('.kairos-cinema [data-action="skip"]').click();
await page.waitForFunction(()=>dueloAventuraActivo?.tipo==='shadow_primero');
await page.evaluate(()=>{detenerRondaVersus();dueloAventuraActivo.resultado='rival';void completarDueloAventura();});
assert.equal(await page.evaluate(()=>estadoPrimerEncuentroShadow),'pendiente');
assert.equal(await page.evaluate(()=>misionActual),2);
await page.evaluate(()=>{dueloAventuraActivo.resultado='jugador';void completarDueloAventura();});
await page.waitForSelector('.kairos-cinema');
assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('progresoAventuraGA')).estadoPrimerEncuentroShadow),'rescate');
await page.screenshot({path:'tools/.shadow-derrota.png'});
await page.reload();await page.locator('#introOficial').click();await page.waitForTimeout(400);
await page.evaluate(()=>{void iniciarMisionAventura();});
await page.waitForSelector('.kairos-cinema');
assert.equal(await page.evaluate(()=>dueloAventuraActivo),null);
await page.locator('.kairos-cinema [data-action="next"]').click();
assert.ok((await page.locator('.kairos-cinema-caption p').textContent()).includes('quinta guardiana'));
await page.locator('.kairos-cinema-art').evaluate(img=>img.decode());
await page.screenshot({path:'tools/.shadow-rescate.png'});
await page.locator('.kairos-cinema [data-action="next"]').click();
await page.locator('.kairos-cinema [data-action="next"]').click();
await page.locator('.kairos-cinema-art').evaluate(img=>img.decode());
await page.screenshot({path:'tools/.shadow-captura.png'});
await page.locator('.kairos-cinema [data-action="next"]').click();
await page.waitForFunction(()=>misionActual===3 && estadoPrimerEncuentroShadow==='completo');
assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('progresoAventuraGA')).misionActual),3);
console.log('PASS Shadow: win required, rescue checkpoint restored after reload, fifth guardian, capture and next mission saved');
await page.reload();await page.locator('#introOficial').click();await page.waitForTimeout(400);
await page.emulateMedia({reducedMotion:'no-preference'});
await page.evaluate(()=>mostrarPantalla(pantallaVersus));
const victims=await page.evaluate(()=>Object.keys(personajesVersus));
for(const [width,height] of [[844,390],[1365,900]]) {
 await page.setViewportSize({width,height});
 for(const victim of victims) {
  await page.evaluate(v=>{void reproducirEclipseVioletaVersus(v);clearTimeout(demoVersus.temporizadorReaccionCinematica);victimaEclipseVersus.src=posesReaccionVictimaVersus[v];victimaEclipseVersus.classList.add('reaccion-final-activa');},victim);
  await page.locator('#victimaEclipseVersus').evaluate(img=>img.decode());
  await page.evaluate(()=>cinematicaFinalVersus.getAnimations({subtree:true}).forEach(a=>{a.pause();a.currentTime=2400;}));
  const positions=await page.evaluate(()=>{const v=victimaEclipseVersus.getBoundingClientRect(),t=document.querySelector('.remolino-arcano-fondo').getBoundingClientRect();return {victim:v.x+v.width/2,tornado:t.x+t.width/2};});
  assert.ok(Math.abs(positions.victim-positions.tornado)<12, victim+JSON.stringify(positions));
  await page.screenshot({path:'tools/.tornado-'+victim+'-'+width+'.png'});
  await page.evaluate(()=>cancelarCinematicaFinalVersus());
 }
}
assert.deepEqual(errors,[]);console.log('PASS all '+victims.length+' victims centered in Zafir tornado on mobile and desktop');

}finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});