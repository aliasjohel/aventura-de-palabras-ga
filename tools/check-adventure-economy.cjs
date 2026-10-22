const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{try{const file=new URL(req.url,'http://localhost').pathname.slice(1)||'index.html',target=path.resolve(root,file);if(!target.startsWith(root+path.sep))throw Error('path');res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.json':'application/json','.png':'image/png','.webp':'image/webp'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(target));}catch{res.writeHead(404);res.end();}});
(async()=>{
await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'msedge',headless:true});
try{const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});await context.route('https://**/*',r=>r.abort());const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:'+server.address().port+'/');await page.evaluate(()=>I18n.ready);
const result=await page.evaluate(async()=>{
 document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');mostrarPantalla(pantallaMenu);
 const balance=()=>CosmeticStore.read().coins,results=[];escenarioActual=0;misionActual=0;desafiosCompletados=0;
 avanzarMision();results.push(balance());avanzarMision();results.push(balance());avanzarMision();results.push(balance());
 escenarioActual=0;misionActual=0;desafiosCompletados=2;avanzarMision();results.push(balance());
 escenarioActual=2;misionActual=9;desafiosCompletados=0;dueloAventuraActivo={tipo:'nimbus_cumbres',resultado:'jugador'};
 reproducirCinematicaFinalCumbres=async()=>{};await completarDueloAventura();results.push(balance());
 otorgarRecompensaMision();results.push(balance());
 modoPruebasActivo=true;escenarioActual=0;misionActual=1;otorgarRecompensaMision();results.push(balance());modoPruebasActivo=false;
 AventuraMapa.repeticion={completa:false};otorgarRecompensaMision();results.push(balance());AventuraMapa.repeticion=null;
 return results;
});
assert.deepEqual(result,[0,0,50,50,350,350,350,350]);assert.deepEqual(errors,[]);console.log('PASS actual Adventure: partial words pay nothing, completed mission pays 50 once, final Nimbus pays 300 once, developer/replay pay nothing');
}finally{await browser.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1});
