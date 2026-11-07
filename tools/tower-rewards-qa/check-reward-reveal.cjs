'use strict';
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'../..'),out=path.join(root,'.local-developer/reward-reveal');fs.mkdirSync(out,{recursive:true});let browser;
const server=http.createServer((req,res)=>{try{const p=new URL(req.url,'http://local').pathname,file=path.resolve(root,'.'+(p==='/'?'/index.html':p));if(!file.startsWith(root+path.sep))throw Error('Path');res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}});
(async()=>{try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=process.argv.includes('--live')?'https://aliasjohel.github.io/aventura-de-palabras-ga/':'http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({channel:'msedge',headless:true});const rows=[],errors=[],failed=[];
 for(const [width,height,language]of [[844,390,'es'],[390,844,'en'],[1280,720,'pt-BR']]){
  const context=await browser.newContext({viewport:{width,height},serviceWorkers:'block'});await context.route('**/*',r=>new URL(r.request().url()).pathname.endsWith('/js/intro.js')?r.fulfill({status:200,contentType:'text/javascript',body:''}):new URL(r.request().url()).origin===new URL(origin).origin?r.continue():r.abort());const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push(r.url());});await page.goto(origin);await page.evaluate(()=>I18n.ready);await page.evaluate(async language=>{document.body.classList.remove('intro-pendiente','menu-fondo-pendiente');await I18n.setPreference(language);},language);
  const characters=await page.evaluate(()=>TowerRewards.catalog.map(c=>c.character));
  for(let index=0;index<characters.length;index++){
   if(width!==844&&![0,5,10].includes(index))continue;
   const character=characters[index],frame={0:'tower_conquistador',5:'tower_maestro',10:'tower_leyenda'}[index],expected=['tower_'+character,...(frame?[frame]:[])];
   await page.evaluate(({character,index,characters,frame})=>{
    resultadoRondaVersus.classList.add('oculto');TowerRewards.reset();CosmeticStore.beginAccount('synthetic-reveal-'+character+'-'+index);const userId=CosmeticStore.read().accountId;const previous=characters.slice(0,index).map(c=>'tower_'+c);if(index>0)previous.push('tower_conquistador');if(index>5)previous.push('tower_maestro');
    TowerRewards.apply({userId,owned:previous,equipped:{},frame:null,revision:0,completedCharacters:characters.slice(0,index),grantsEnabled:true});
    modoPruebasActivo=false;TowerOutfitPreview.reset();modoArcadeActivo=true;torreEnCurso=true;dueloAventuraActivo=null;personajeJugadorVersus=character;rivalesTorreArcade=crearOrdenRivalesArcade();pisoCombateArcade=9;pisosDesbloqueadosArcade=9;progresoServidorTorre={userId,managed:true,completed:{[character]:10}};torreAutoritativa={progress:()=>progresoServidorTorre,view:()=>({detail:{finished:true}})};mostrarPantalla(pantallaVersus);
    window.syntheticGrant={userId,owned:[...previous,'tower_'+character,...(frame?[frame]:[])],equipped:{},frame:null,revision:0,completedCharacters:characters.slice(0,index+1),grantsEnabled:true};
   },{character,index,characters,frame});
   // Both grant-before-result and late server confirmation must reveal the same rewards.
   if(index%2===0){await page.evaluate(()=>TowerRewards.apply(window.syntheticGrant));assert(await page.locator('#towerRewardReveal').isHidden());await page.evaluate(()=>mostrarResultadoPartidaVersus('jugador','Victoria validada.'));}
   else{await page.evaluate(()=>mostrarResultadoPartidaVersus('jugador','Victoria validada.'));assert(await page.locator('#towerRewardReveal').isHidden());await page.evaluate(()=>TowerRewards.apply(window.syntheticGrant));}
   await page.waitForFunction(()=>!document.getElementById('towerRewardReveal').hidden);assert.deepEqual(await page.locator('#towerRewardReveal article').evaluateAll(cards=>cards.map(c=>c.dataset.item)),expected);await page.locator('#towerRewardReveal img').evaluateAll(images=>Promise.all(images.map(i=>i.decode())));await page.waitForFunction(()=>TowerRewards.pendingNotices().length===0);
   assert.deepEqual(await page.evaluate(()=>TowerRewards.read().equipped),{});assert.equal(await page.evaluate(()=>TowerRewards.read().frame),null);const bounds=await page.locator('#towerRewardReveal').evaluate(el=>({scroll:el.scrollWidth,client:el.clientWidth}));assert(bounds.scroll<=bounds.client);
   if([0,5,10].includes(index))await page.waitForTimeout(350);if([0,5,10].includes(index))await page.screenshot({path:path.join(out,language+'-'+character+(process.argv.includes('--live')?'-live':'')+'.png')});
   rows.push({width,height,language,character,items:expected});await page.evaluate(()=>resultadoRondaVersus.classList.add('oculto'));await page.waitForFunction(()=>document.getElementById('towerRewardReveal').hidden);await page.evaluate(()=>{TowerRewards.apply(window.syntheticGrant);mostrarResultadoPartidaVersus('jugador','Victoria repetida.');});assert(await page.locator('#towerRewardReveal').isHidden());
  }
  await context.close();console.log('Reward reveal '+language+' passed');
 }
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);fs.writeFileSync(path.join(out,process.argv.includes('--live')?'public-tests.json':'tests.json'),JSON.stringify({passed:true,rows,errors,failed,productionWrites:0},null,2));console.log(JSON.stringify({passed:true,cases:rows.length,allCharacters:true,milestoneFrames:true,lateConfirmation:true,noAutoEquip:true,noRepeatNotices:true}));
}finally{await browser?.close();server.closeAllConnections();server.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});

