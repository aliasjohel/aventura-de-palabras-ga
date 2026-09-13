const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=process.cwd();
const server=http.createServer((req,res)=>{const name=new URL(req.url,'http://localhost').pathname;const f=path.join(root,name==='/'?'index.html':name);fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);return res.end();}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png'})[path.extname(f)]||'application/octet-stream');res.end(d);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,channel:'msedge'});try{
const page=await browser.newPage({hasTouch:true});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:'+server.address().port);await page.locator('#introOficial').click();await page.waitForTimeout(500);
await page.setViewportSize({width:390,height:844});
await page.evaluate(async()=>{reiniciarEstadoAventura();escenarioActual=4;misionActual=1;await iniciarMisionAventura();abrirPruebaEspecialBosque('runas-azrak');cerrarPuzzleAzrak?.();window.hits=[];window.wins=0;window.dispose=AzrakWorld.mountPuzzle(puzzleCumbres,'runas-azrak',()=>wins++,{sound:name=>hits.push(name)});});
await page.locator('.runas-escena>img').evaluate(img=>img.decode());
assert.ok((await page.locator('.runas-escena>img').getAttribute('src')).endsWith('-v2.png'));
await page.screenshot({path:'tools/.runas-disimuladas-390.png'});
for(const index of [1,1,4,2,0,3])await page.locator('.runa-oculta').nth(index).tap();
await page.waitForTimeout(750);
assert.equal(await page.evaluate(()=>wins),1);
assert.deepEqual(await page.evaluate(()=>hits),Array(5).fill('acertar'));
assert.equal(await page.locator('.runa-oculta.encontrada').count(),5);
assert.deepEqual(errors,[]);console.log('PASS matte runes artwork, five targets, sound once per find, checkmarks and completion');

}finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
