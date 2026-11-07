'use strict';
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'../..'),out=path.join(root,'.local-developer/werewolf-recoil');fs.mkdirSync(out,{recursive:true});let browser;
const server=http.createServer((req,res)=>{try{const p=new URL(req.url,'http://local').pathname,file=path.resolve(root,'.'+(p==='/'?'/index.html':p));if(!file.startsWith(root+path.sep))throw Error('Path');res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}});
(async()=>{try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=process.argv.includes('--live')?'https://aliasjohel.github.io/aventura-de-palabras-ga/':'http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({channel:'msedge',headless:true});const rows=[],errors=[],failed=[];
 for(const viewport of [{width:844,height:390},{width:1280,height:720}])for(const motion of ['no-preference','reduce']){
  const context=await browser.newContext({viewport,reducedMotion:motion,serviceWorkers:'block'});await context.route('**/*',r=>new URL(r.request().url()).pathname.endsWith('/js/intro.js')?r.fulfill({status:200,contentType:'text/javascript',body:''}):new URL(r.request().url()).origin===new URL(origin).origin?r.continue():r.abort());const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push(r.url());});
  await page.goto(origin);await page.evaluate(()=>I18n.ready);await page.evaluate(()=>{document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente','menu-fondo-pendiente');CosmeticStore.beginAccount('synthetic-wolf-recoil');});await page.clock.install();await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now())));
  let revision=0;
  for(const [skin,expected]of [[null,'assets/images/personajes/versus/hombre-lobo-impacto-v3.webp'],['lobo-lunar','assets/images/trajes/lobo-lunar-impacto-v2.webp'],['tower_hombre_lobo','assets/images/tower-preview/lobo-basaltico-impacto-v2.webp']])for(const side of ['jugador','rival']){
   await page.evaluate(({skin,side,revision})=>{
    TowerOutfitPreview.reset();cancelarCinematicaFinalVersus();detenerRondaVersus();limpiarEntradaDueloVersus();limpiarAnimacionHabilidadVersus();ocultarAnuncioFinVersus();modoArcadeActivo=false;modoPruebasActivo=false;partidaOnlineVersus=null;partidaOnlineIniciada=false;dueloAventuraActivo=null;
    CosmeticStore.applyAccount({userId:'synthetic-wolf-recoil',coins:0,owned:skin==='lobo-lunar'?['lobo-lunar']:[],equipped:skin==='lobo-lunar'&&side==='jugador'?{hombre_lobo:skin}:{},revision,securityVersion:3,currencyVersion:2,missionClaims:[]});
    TowerRewards.apply({userId:'synthetic-wolf-recoil',owned:skin==='tower_hombre_lobo'?[skin]:[],equipped:skin==='tower_hombre_lobo'&&side==='jugador'?{hombre_lobo:skin}:{},revision});
    adaptadorSalasVersus=side==='rival'?{...adaptadorLocalSalasVersus,obtenerTrajesRival:()=>skin?{hombre_lobo:skin}:{}}:adaptadorLocalSalasVersus;
    personajeJugadorVersus=side==='jugador'?'hombre_lobo':'explorador';personajeRivalVersus=side==='jugador'?'explorador':'hombre_lobo';finalizarContextoPalabras();iniciarContextoPalabras('versus');const theme=Object.keys(obtenerBancosPalabrasVersus())[0];tematicaVersus.value=theme;palabrasSecretasVersus=obtenerBancosPalabrasVersus()[theme].slice(0,maximoPalabrasVersus);mostrarPantalla(pantallaVersus);prepararDueloVersus({comenzarRonda:false});limpiarEntradaDueloVersus();
   },{skin,side,revision:++revision});
   const target=side==='jugador'?'#personajeVersusUno':'#personajeVersusDos';
   for(const damage of ['recibiendo-dano','recibiendo-dano-magico']){
    await page.locator(target).evaluate((i,damage)=>{establecerPoseCombateVersus(i,'ataque',personajesVersus.hombre_lobo.base);i.classList.add(damage);},damage);await page.waitForFunction(({selector,expected})=>document.querySelector(selector).getAttribute('src')===expected,{selector:target,expected});await page.locator(target).evaluate(i=>i.decode());await page.locator(target).evaluate((i,damage)=>{i.classList.remove(damage);establecerPoseCombateVersus(i,'ataque',null);},damage);
   }
   await page.evaluate(side=>{ladoGanadorCinematicaVersus=side==='jugador'?'rival':'jugador';void obtenerReproductorFinalVersus('explorador','hombre_lobo')();},side);await page.waitForFunction(()=>cinematicaFinalVersus.classList.contains('activa'));
   const before=await page.locator('#victimaTrampaVersus').getAttribute('src');await page.clock.runFor(2750);await page.waitForFunction(src=>victimaTrampaVersus.getAttribute('src')===src,expected);await page.locator('#victimaTrampaVersus').evaluate(i=>i.decode());assert.notEqual(before,expected);
   const frames=[];for(const time of [2750,3200]){
    await page.evaluate(time=>{for(const a of cinematicaFinalVersus.getAnimations({subtree:true})){a.pause();a.currentTime=time;}},time);
    const state=await page.locator('#victimaTrampaVersus').evaluate(i=>{const s=getComputedStyle(i),m=new DOMMatrix(s.transform);return {src:i.getAttribute('src'),opacity:Number(s.opacity),x:m.m41,active:i.classList.contains('reaccion-final-activa')};});assert.equal(state.src,expected);assert(state.active);frames.push({time,...state});
    if(viewport.width===844&&motion==='no-preference'&&side==='rival')await page.screenshot({path:path.join(out,(skin||'original')+'-'+time+(process.argv.includes('--live')?'-live':'')+'.png')});
   }
   if(motion==='no-preference')assert(frames[1].x>frames[0].x,'The trunk knocks the victim backward');
   await page.evaluate(()=>completarCinematicaFinalVersus());await page.clock.runFor(6000);assert(await page.locator('#cinematicaFinalVersus').evaluate(i=>i.classList.contains('oculto')));rows.push({viewport,motion,skin,side,frames});
  }
  await context.close();console.log('Werewolf recoil '+viewport.width+' '+motion+' passed');
 }
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);const report={passed:true,scenes:rows.length,combatDamageChecks:rows.length*2,rows,errors,failed,productionWrites:0,physicalAndroidTest:false};fs.writeFileSync(path.join(out,process.argv.includes('--live')?'public-tests.json':'tests.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({...report,rows:undefined}));
}finally{await browser?.close();server.closeAllConnections();server.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
