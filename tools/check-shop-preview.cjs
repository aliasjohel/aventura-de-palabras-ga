const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{try{const file=new URL(req.url,'http://localhost').pathname.slice(1)||'index.html',target=path.resolve(root,file);if(!target.startsWith(root+path.sep))throw Error('path');res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.json':'application/json','.png':'image/png','.webp':'image/webp'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(target));}catch{res.writeHead(404);res.end();}});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'msedge',headless:true});
 try{const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});await context.route('https://**/*',r=>r.abort());const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:'+server.address().port+'/');await page.evaluate(()=>I18n.ready);
 await page.evaluate(()=>{document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');mostrarPantalla(pantallaMenu);globalThis.AventuraShop={...AventuraShop,testing:()=>false,connect:async()=>{},sync:()=>{}};});
 for(const viewport of [{width:390,height:844},{width:844,height:390},{width:1280,height:800}]){
  await page.setViewportSize(viewport);await page.locator('#btnTienda').click();
  assert(await page.locator('[data-character-shop] .precio-con-moneda').count()>0);
  const card=page.locator('#tiendaTrajesCatalogo button:not([hidden])').first();const src=await card.locator('img').getAttribute('src');assert(await card.locator('small').evaluate(e=>getComputedStyle(e,'::before').backgroundImage.includes('radial-gradient')));
  await card.click();assert(await page.locator('#vistaTrajeTienda').isVisible());assert.equal(await page.locator('#tiendaTrajeImagen').getAttribute('src'),src);
  await page.locator('#tiendaTrajeImagen').evaluate(i=>i.decode());assert(await page.locator('#comprarTraje').isVisible());
  assert(await page.locator('#vistaTrajeTienda').evaluate(e=>e.scrollWidth<=e.clientWidth));
  if(viewport.width===390)await page.screenshot({path:path.join(root,'docs/tienda-traje-ampliado.png')});
  await page.locator('.cerrar-vista-traje').click();assert(await card.evaluate(e=>document.activeElement===e));assert(await page.locator('#tiendaMenu').isVisible());
  await card.click();await page.keyboard.press('Escape');assert(!await page.locator('#vistaTrajeTienda').isVisible());assert(await page.locator('#tiendaMenu').isVisible());await page.locator('#cerrarTiendaMenu').click();
 }
 await page.setViewportSize({width:844,height:390});await page.evaluate(()=>abrirTutorialVersus());await page.screenshot({path:path.join(root,'docs/tutorial-cartel-central.png')});await page.locator('#btnSiguienteTutorialVersus').click();await page.screenshot({path:path.join(root,'docs/tutorial-arena-completa.png')});await page.keyboard.press('Escape');assert(!await page.evaluate(()=>tutorialCombateVersus.activo));
 assert.deepEqual(errors,[]);console.log('PASS outfit preview, selected image, price icons, buy control, close/Escape/focus, three viewports and tutorial exit');
 }finally{await browser.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
