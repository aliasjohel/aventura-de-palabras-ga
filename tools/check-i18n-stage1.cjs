const fs=require('node:fs'),http=require('node:http'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const baseline=process.env.I18N_BASELINE_DIR||path.join(os.tmpdir(),'aventura-i18n-stage1-baseline');
const baselineFiles=new Set(['index.html','sw.js','js/azrak-world.js']);
const server=http.createServer((req,res)=>{
 const url=new URL(req.url,'http://localhost');let relative=decodeURIComponent(url.pathname).replace(/^\//,'');
 const before=relative.startsWith('before/');if(before)relative=relative.slice(7);if(!relative)relative='index.html';
 const target=path.resolve(root,relative);if(!target.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 const file=before&&baselineFiles.has(relative)?path.join(baseline,relative.replaceAll('/','__')):target;
 fs.readFile(file,(error,data)=>{if(error){res.writeHead(404);res.end();return;}
 res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.png':'image/png','.mp3':'audio/mpeg'})[path.extname(file)]||'application/octet-stream');res.end(data);});
});
const keys=['progresoAventuraGA','aventuraTiendaV1','aventuraPalabrasIdentidadV1','aventuraMarcosDesbloqueadosV1','sb-stage1-auth-token'];
const fixture={
 progresoAventuraGA:JSON.stringify({escenarioActual:1,misionActual:2,cristalesObtenidos:1,monedas:321,historialPalabrasAventura:{}}),
 aventuraTiendaV1:JSON.stringify({coins:321,owned:['aren-bosque'],equipped:{explorador:'aren-bosque'}}),
 aventuraPalabrasIdentidadV1:JSON.stringify({avatar:'explorador',frame:'clasico'}),
 aventuraMarcosDesbloqueadosV1:JSON.stringify(['clasico','bosque']),
 'sb-stage1-auth-token':JSON.stringify({test:'preserve-session'}),
};
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 try{
   async function inspect(before,{missing=false,width=390}={}){
     const context=await browser.newContext({viewport:{width,height:844},serviceWorkers:'block',reducedMotion:'reduce'});
     await context.route('https://**/*',route=>route.abort()); // Never contact production services.
     if(missing)await context.route('**/locales/**',route=>route.abort());
     await context.addInitScript(data=>{Object.entries(data).forEach(([key,value])=>localStorage.setItem(key,value));},fixture);
     const page=await context.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
     await page.goto('http://127.0.0.1:'+server.address().port+'/'+(before?'before/':''));
     await page.waitForFunction(()=>!!globalThis.PlayerAvatar);
     if(!before)await page.evaluate(()=>I18n.ready);
     const result=await page.evaluate(keys=>{
       const ids=['btnJugar','btnModosJuego','btnRankingMenu','btnTienda','btnConfiguracion','tituloConfiguracion','btnCerrarConfiguracion'];
       const labels=Object.fromEntries(ids.map(id=>[id,document.getElementById(id).textContent]));
       labels.title=document.querySelector('#pantallaMenu .titulo').textContent;
       labels.subtitle=document.querySelector('#pantallaMenu .subtitulo').textContent;
       labels.settings=document.querySelector('.etiqueta-configuracion').textContent;
       document.getElementById('btnConfiguracion').click();
       const opened=!document.getElementById('modalConfiguracion').classList.contains('oculto');
       document.getElementById('btnCerrarConfiguracion').click();
       const closed=document.getElementById('modalConfiguracion').classList.contains('oculto');
       return {labels,opened,closed,storage:Object.fromEntries(keys.map(key=>[key,localStorage.getItem(key)]))};
     },keys);
     assert.deepEqual(errors,[]);assert(result.opened&&result.closed);assert.deepEqual(result.storage,fixture);
     if(!before&&!missing){assert.equal(await page.evaluate(()=>I18n.language),'es');assert.equal(await page.locator('[data-i18n]').count(),10);}
     await context.close();return result;
   }
   const old=await inspect(true),current=await inspect(false);assert.deepEqual(current,old);
   const failure=await inspect(false,{missing:true});assert.deepEqual(failure,old);
   assert.deepEqual(await inspect(false,{width:1365}),old);
   // Compare every immutable pre-existing module in the pending frame work.
   for(const file of ['js/app.js','js/player-avatar.js','js/public-player-profile.js','css/player-avatar.css']){
     assert.equal(fs.readFileSync(path.join(root,file),'utf8'),fs.readFileSync(path.join(baseline,file.replaceAll('/','__')),'utf8'));
   }
   console.log('PASS baseline/current Spanish labels, settings controls, missing-catalog fallback, mobile/desktop, saved progress, coins, inventory, identity, session and untouched frame modules');
 }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
