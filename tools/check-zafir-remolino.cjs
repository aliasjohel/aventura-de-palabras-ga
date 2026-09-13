const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=process.cwd();
const server=http.createServer((req,res)=>{const name=new URL(req.url,'http://localhost').pathname;const f=path.join(root,name==='/'?'index.html':name);fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);return res.end();}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png'})[path.extname(f)]||'application/octet-stream');res.end(d);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,channel:'msedge'});try{
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:'+server.address().port);await page.locator('#introOficial').click();await page.waitForTimeout(500);
await page.evaluate(()=>mostrarPantalla(pantallaVersus));
for(const [width,height] of [[844,390],[1365,900],[390,844]]) {
 await page.setViewportSize({width,height});
 if(width<height) {
   assert.equal(await page.locator('#marcoVersus').isVisible(),false);
   await page.setViewportSize({width:844,height:390});
 }
 await page.evaluate(()=>{void reproducirEclipseVioletaVersus('explorador');});
 await page.waitForTimeout(150);
 assert.equal(await page.locator('.zafir-mota-orbita').count(),64);
 await page.evaluate(()=>{cinematicaFinalVersus.getAnimations({subtree:true}).forEach(a=>{a.pause();a.currentTime=2500;});});
 assert.ok(await page.locator('.remolino-particulas-magicas').isVisible());
 const first=await page.locator('.zafir-mota-orbita').first().evaluate(el=>getComputedStyle(el).transform);
 await page.evaluate(()=>{document.querySelector('.zafir-mota-orbita').getAnimations()[0].currentTime+=200;});
 assert.notEqual(await page.locator('.zafir-mota-orbita').first().evaluate(el=>getComputedStyle(el).transform),first);
 await page.screenshot({path:'tools/.zafir-remolino-'+width+'.png'});
 await page.evaluate(()=>cancelarCinematicaFinalVersus());
 assert.equal(await page.locator('.remolino-particulas-magicas').isVisible(),false);
}
await page.evaluate(()=>{void reproducirTrampaSelvaticaVersus('mago');});
assert.equal(await page.locator('.remolino-particulas-magicas').isVisible(),false);
await page.evaluate(()=>cancelarCinematicaFinalVersus());
await page.emulateMedia({reducedMotion:'reduce'});
await page.evaluate(()=>{void reproducirEclipseVioletaVersus('kairos');});
assert.equal(await page.locator('.zafir-mota-orbita').first().evaluate(el=>getComputedStyle(el).animationName),'none');
await page.evaluate(()=>cancelarCinematicaFinalVersus());
assert.deepEqual(errors,[]);console.log('PASS 64 magical orbit particles, motion, desktop, mobile landscape and rotation, replay without duplication, cleanup, isolation and reduced motion');

}finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});