const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{try{const file=new URL(req.url,'http://localhost').pathname.slice(1)||'index.html',target=path.resolve(root,file);if(!target.startsWith(root+path.sep))throw Error('path');res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.json':'application/json','.png':'image/png','.webp':'image/webp'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(target));}catch{res.writeHead(404);res.end();}});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'msedge',headless:true});
 try{const context=await browser.newContext({viewport:{width:844,height:390},serviceWorkers:'block'});await context.route('https://**/*',r=>r.abort());const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:'+server.address().port+'/');await page.evaluate(()=>I18n.ready);
 await page.evaluate(()=>{document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');mostrarPantalla(pantallaMenu);abrirTutorialVersus();});
 for(let step=0;step<8;step++){
  await page.waitForFunction(s=>pasoActualTutorialVersus===s&&tutorialCombateVersus.explicando,step);
  const panel=await page.locator('.guia-en-arena .panel-tutorial-versus').boundingBox();assert(Math.abs(panel.x+panel.width/2-422)<2);
  assert(await page.evaluate(()=>pantallaVersus.inert));
  await page.locator('#btnSiguienteTutorialVersus').click();assert(!await page.locator('#modalTutorialVersus').isVisible());
  const padding=await page.evaluate(()=>{const before=getComputedStyle(pantallaVersus).paddingRight;document.body.classList.remove('tutorial-combate-real');const normal=getComputedStyle(pantallaVersus).paddingRight;document.body.classList.add('tutorial-combate-real');return [before,normal];});assert.equal(padding[0],padding[1]);
  if(step===4)await page.locator('#btnHabilidadVersus').click();
  else if(step!==5){while(await page.evaluate(()=>tutorialCombateVersus.letras.length>0)){await page.locator('#tecladoVersus button.objetivo-tutorial').click();}}
  await page.waitForFunction(()=>tutorialCombateVersus.completado,null,{timeout:45000});
  await page.locator('#btnSiguienteTutorialVersus').click();
 }
 assert(!await page.evaluate(()=>tutorialCombateVersus.activo));assert(!await page.evaluate(()=>pantallaVersus.inert));assert.deepEqual(errors,[]);
 console.log('PASS full eight-step tutorial, centered instructions, full-size arena, controls and real Guardiana finisher');
 }finally{await browser.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
