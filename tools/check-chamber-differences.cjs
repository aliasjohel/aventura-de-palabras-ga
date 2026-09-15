const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const server=http.createServer((req,res)=>{const n=new URL(req.url,'http://localhost').pathname,f=path.join(process.cwd(),n==='/'?'index.html':n);fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);return res.end();}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png'})[path.extname(f)]||'application/octet-stream');res.end(d);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const b=await chromium.launch({headless:true,channel:'msedge'});try{const p=await b.newPage();await p.goto('http://127.0.0.1:'+server.address().port);await p.locator('#introOficial').click();
await p.evaluate(()=>{mostrarPantalla(pantallaJuego);abrirPruebaEspecialBosque('eclipse-azrak');cerrarPuzzleAzrak();window.wins=0;window.dispose=AzrakWorld.mountPuzzle(puzzleCumbres,'eclipse-azrak',()=>wins++);});
await p.waitForSelector('.camara-diferencias:not(.cargando)');
for(const [width,height] of [[1365,900],[390,844],[844,390]]){await p.setViewportSize({width,height});await p.screenshot({path:`tools/.diferencias-${width}.png`});assert.ok(await p.locator('.camara-diferencias').evaluate(e=>e.scrollWidth<=e.clientWidth));}
await p.setViewportSize({width:1365,height:900});
await p.getByRole('button',{name:'+ Ampliar',exact:true}).click();await p.getByRole('button',{name:'+ Ampliar',exact:true}).click();
await p.locator('.camara-visor').first().evaluate(e=>{e.scrollLeft=160;e.scrollTop=100;});await p.waitForTimeout(100);const positions=await p.locator('.camara-visor').evaluateAll(es=>es.map(e=>[e.scrollLeft,e.scrollTop]));assert.deepEqual(positions[0],positions[1]);
await p.getByRole('button',{name:/Vista completa/}).click();
const regions=await p.evaluate(()=>AzrakWorld.chamberDifferences);
async function hit(i,side=0){const d=regions[i],scene=p.locator('.camara-escena').nth(side);await scene.scrollIntoViewIfNeeded();const r=await scene.boundingBox();await scene.click({position:{x:(d.x+d.w/2)/1536*r.width,y:(d.y+d.h/2)/1024*r.height}});}
await hit(0);await hit(0,1);assert.match(await p.locator('.azrak-puzzle-status').textContent(),/^1\/7/);
for(let i=1;i<7;i++)await hit(i,i%2);
await p.waitForTimeout(700);assert.equal(await p.evaluate(()=>wins),1);assert.equal(await p.locator('.diferencia-encontrada').count(),14);
// Failed reward gives no clue; a pending reward is ignored after the puzzle closes.
await p.evaluate(()=>{dispose();window.reward=false;dispose=AzrakWorld.mountPuzzle(puzzleCumbres,'eclipse-azrak',()=>wins++,{requestHint:async()=>reward});});await p.waitForSelector('.camara-diferencias:not(.cargando)');await p.getByRole('button',{name:'Ver anuncio para una pista',exact:true}).click();assert.match(await p.locator('.azrak-puzzle-status').textContent(),/No se obtuvo/);
await p.evaluate(()=>reward=true);await p.getByRole('button',{name:'Ver anuncio para una pista',exact:true}).click();assert.match(await p.locator('.azrak-puzzle-status').textContent(),/superior izquierda/);assert.equal(await p.locator('.diferencia-encontrada').count(),0);
await p.evaluate(()=>{dispose();dispose=AzrakWorld.mountPuzzle(puzzleCumbres,'eclipse-azrak',()=>wins++,{requestHint:()=>new Promise(r=>window.rewardResolve=r)});});await p.waitForSelector('.camara-diferencias:not(.cargando)');await p.getByRole('button',{name:'Ver anuncio para una pista',exact:true}).click();await p.evaluate(()=>{dispose();dispose=AzrakWorld.mountPuzzle(puzzleCumbres,'eclipse-azrak',()=>wins++);rewardResolve(true);});await p.waitForSelector('.camara-diferencias:not(.cargando)');assert.match(await p.locator('.azrak-puzzle-status').textContent(),/^0\/7 diferencias · Tocá/);
console.log('PASS desktop/mobile layouts, paired zoom and pan, seven hits on either image, duplicate prevention, completion once, reward gating and stale reward cleanup.');
}finally{await b.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
