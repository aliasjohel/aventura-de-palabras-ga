const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=process.cwd();
const server=http.createServer((req,res)=>{const name=new URL(req.url,'http://localhost').pathname;const f=path.join(root,name==='/'?'index.html':name);fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);return res.end();}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png'})[path.extname(f)]||'application/octet-stream');res.end(d);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,channel:'msedge'});try{const pages=await Promise.all([browser.newPage({viewport:{width:844,height:390}}),browser.newPage({viewport:{width:844,height:390}})]);
const ids=[];try {
for(let i=0;i<2;i++){const p=pages[i];await p.goto('http://127.0.0.1:'+server.address().port);await p.locator('#introOficial').click();await p.evaluate(()=>abrirSalaVersus());ids.push(await p.evaluate(()=>adaptadorSalasVersus.obtenerUsuarioId()));await p.locator('#aliasSalaVersus').fill('QA Busqueda '+i);}
fs.writeFileSync('tools/.matchmaking-qa-users.json',JSON.stringify(ids));
await pages[0].locator('#btnBuscarPartida').click();await pages[0].waitForFunction(()=>estadoBusqueda.textContent.includes('Buscando'));await pages[0].locator('#btnCancelarBusqueda').click();await pages[0].waitForFunction(()=>estadoBusqueda.textContent.includes('cancelada'));
await pages[0].locator('#panelRanking summary').click();await pages[0].waitForFunction(()=>!document.getElementById('listaRanking').textContent.includes('Cargando'));await pages[0].screenshot({path:'tools/.ranking-mobile.png'});
await pages[0].locator('#btnBuscarPartida').click();await pages[1].locator('#btnBuscarPartida').click();
for(const p of pages)await p.waitForFunction(()=>estadoBusqueda.textContent.includes('Rival encontrado'),null,{timeout:25000});
const rooms=await Promise.all(pages.map(p=>p.evaluate(()=>adaptadorSalasVersus.obtenerSala())));assert.equal(rooms[0].id,rooms[1].id);assert.equal(rooms[0].jugadores.length,2);
await pages[0].screenshot({path:'tools/.matchmaking-found-mobile.png'});console.log('PASS real two-session pairing, cancellation, ranking RPC, mobile selection');
}finally{for(const p of pages)await p.evaluate(()=>salirDeSalaVersus()).catch(()=>{});}
}finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
