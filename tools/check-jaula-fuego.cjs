const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=process.cwd();
const server=http.createServer((req,res)=>{const name=new URL(req.url,'http://localhost').pathname;const f=path.join(root,name==='/'?'index.html':name);fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);return res.end();}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png'})[path.extname(f)]||'application/octet-stream');res.end(d);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,channel:'msedge'});try{
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:'+server.address().port);await page.locator('#introOficial').click();await page.waitForTimeout(800);


for(const world of [4]) {
 await page.setViewportSize({width:390,height:844});
 await page.evaluate(async world=>{reiniciarEstadoAventura();escenarioActual=world;misionActual=0;await iniciarMisionAventura();palabraSecreta='SOL';letrasElegidas=[];mostrarPalabra();crearTeclado();},world);
 assert.equal(await page.locator('.peligro-palabras').isVisible(),false);
 for(const [i,letter] of [...'XYZWJK'].entries()){
  await page.evaluate(letter=>elegirLetra(letter,document.createElement('button')),letter);
  assert.equal(await page.locator('.peligro-etapa.activa').count(),i+1);
  if(i===2){await page.waitForTimeout(800);await page.locator('.escenario').first().screenshot({path:'tools/.jaula-fuego-'+world+'-stage3.png'});}
 }
 await page.waitForTimeout(900);assert.ok(await page.locator('#btnReintentar').isVisible());
 for(const [w,h] of [[390,844],[844,390],[1365,900]]){await page.setViewportSize({width:w,height:h});await page.waitForTimeout(750);await page.locator('.escenario').first().screenshot({path:'tools/.jaula-fuego-'+world+'-'+w+'.png'});assert.ok(await page.locator('.peligro-palabras').isVisible());}
 await page.locator('#btnReintentar').click();await page.waitForTimeout(700);assert.equal(await page.locator('.peligro-palabras').isVisible(),false);
 await page.evaluate(()=>{palabraSecreta='SOL';letrasElegidas=[];elegirLetra('X',document.createElement('button'));for(const l of 'SOL') elegirLetra(l,document.createElement('button'));});
 assert.ok(await page.locator('.peligro-palabras').evaluate(el=>el.classList.contains('liberando')));
 for(let mission=0;mission<10;mission++){await page.evaluate(m=>{misionActual=m;intentos=3;actualizarVidas();},mission);assert.equal(await page.locator('.peligro-etapa.activa').count(),3);}
}
await page.evaluate(()=>{escenarioActual=1;misionActual=0;intentos=3;actualizarVidas();});assert.equal(await page.locator('.peligro-palabras').isVisible(),false);
await page.emulateMedia({reducedMotion:'reduce'});await page.evaluate(()=>{escenarioActual=4;actualizarVidas();});assert.equal(await page.locator('.jaula-llama').first().evaluate(el=>getComputedStyle(el).animationName),'none');
assert.deepEqual(errors,[]);console.log('PASS fire cage, 6 errors, capture, retry, victory, 10 missions, mobile landscape/portrait, reduced motion');
}finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
