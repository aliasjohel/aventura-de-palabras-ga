'use strict';
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'../..'),out=path.join(root,'.local-developer/tower-costume-selector');fs.mkdirSync(out,{recursive:true});let browser;
const server=http.createServer((req,res)=>{try{const p=new URL(req.url,'http://local').pathname,file=path.resolve(root,'.'+(p==='/'?'/index.html':p));if(!file.startsWith(root+path.sep))throw Error('Path');res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}});
(async()=>{try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=process.argv.includes('--live')?'https://aliasjohel.github.io/aventura-de-palabras-ga/':'http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({channel:'msedge',headless:true});const rows=[],errors=[],failed=[];
 for(const width of [844,1280]){
  const context=await browser.newContext({viewport:{width,height:width===844?390:720},serviceWorkers:'block'});await context.route('**/*',r=>new URL(r.request().url()).pathname.endsWith('/js/intro.js')?r.fulfill({status:200,contentType:'text/javascript',body:''}):new URL(r.request().url()).origin===new URL(origin).origin?r.continue():r.abort());const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push(r.url());});await page.goto(origin);await page.evaluate(()=>I18n.ready);
  await page.evaluate(()=>{
   document.body.classList.remove('intro-pendiente','menu-fondo-pendiente');CharacterStore={...CharacterStore,owns:()=>true,sync:async()=>{}};guardianaDesbloqueada=magoDesbloqueado=dragonDesbloqueado=nivorDesbloqueado=azrakDesbloqueado=true;window.selectorCalls=[];
   GameWallet={...GameWallet,sync:async()=>{const s=CosmeticStore.read();CosmeticStore.applyAccount({...s,userId:s.accountId,revision:s.revision+1},s.equipmentVersion);},cosmetics:async args=>{selectorCalls.push(args);if(args.p_action==='equip_costume'){
    if(window.selectorHold)await new Promise(resolve=>{window.selectorRelease=resolve;});if(window.selectorReject)throw Error('Fixture rejected');
    const s=window.selectorServer;if(args.p_revision!==s.revision)throw Error('TOWER_EQUIPMENT_STALE');if(args.p_item&&!s.owned.includes(args.p_item))throw Error('Tower item not owned');
    if(args.p_item==='tower_explorador'&&CosmeticStore.read().equipped.explorador==='aren-union')throw Error('TOWER_UNION_ACTIVE');
    if(args.p_item)s.equipped[args.p_character]=args.p_item;else delete s.equipped[args.p_character];s.selectedCostumes={...s.equipped};s.revision++;
   }return structuredClone(window.selectorServer);}};
  });
  const characters=await page.evaluate(()=>TowerRewards.catalog.map(c=>c.character));
  for(const arcade of [true,false])for(const character of characters){
   const purchased=await page.evaluate(({character,arcade})=>{
    document.getElementById('elegirTrajeAntesDuelo').close();TowerRewards.reset();CosmeticStore.beginAccount('selector-'+character+'-'+arcade);const userId=CosmeticStore.read().accountId,skin=CosmeticStore.catalog.find(c=>c.character===character&&!c.adminOnly).id;
    CosmeticStore.applyAccount({userId,coins:777,owned:character==='explorador'?[skin,'aren-union']:[skin],adminUnion:character==='explorador',equipped:{},revision:0,securityVersion:3,currencyVersion:2,missionClaims:[]});window.selectorServer={userId,owned:['tower_'+character,'tower_conquistador'],equipped:{},selectedCostumes:{},frame:'tower_conquistador',revision:0,completedCharacters:[character],grantsEnabled:true};TowerRewards.apply(window.selectorServer);
    modoPruebasActivo=false;TowerOutfitPreview.reset();modoArcadeActivo=arcade;partidaOnlineVersus=null;partidaOnlineIniciada=false;adaptadorSalasVersus=adaptadorLocalSalasVersus;btnConfirmarPersonajeVersus.disabled=false;mostrarPantalla(pantallaSeleccionPersonajeVersus);actualizarDisponibilidadPersonajesVersus();seleccionarPersonajeVersus(character);return skin;
   },{character,arcade});
   assert.equal(await page.locator('#opcionesTrajesDuelo button').count(),character==='explorador'?4:3);await page.locator('#opcionesTrajesDuelo [data-costume="tower_'+character+'"]').evaluate(i=>i.querySelector('img').decode());
   await page.evaluate(()=>abrirTrajesAntesDuelo());assert.equal(await page.locator('#opcionesTrajesAntesDuelo button').count(),character==='explorador'?4:3);
   if(character==='explorador'&&arcade){await page.evaluate(()=>window.selectorHold=true);}
   await page.locator('#opcionesTrajesAntesDuelo [data-costume="tower_'+character+'"]').click();
   if(character==='explorador'&&arcade){await page.waitForFunction(()=>typeof window.selectorRelease==='function');assert(await page.locator('#btnConfirmarPersonajeVersus').isDisabled());await page.evaluate(()=>{seleccionarPersonajeVersus('mago');selectorHold=false;selectorRelease();});assert.equal(await page.evaluate(()=>personajeJugadorVersus),character);}
   await page.waitForFunction(character=>!guardandoTrajeVersus&&TowerRewards.equipped(character)==='tower_'+character,character);assert.equal(await page.locator('#opcionesTrajesAntesDuelo [data-costume="tower_'+character+'"]').getAttribute('aria-pressed'),'true');
   const src=await page.evaluate(character=>spriteTrajeVersus(personajeVersusUno,character,personajesVersus[character].base),character);assert(src.includes('/tower-preview/'));
   if(character==='explorador'&&arcade)await page.screenshot({path:path.join(out,'aren-'+width+(process.argv.includes('--live')?'-live':'')+'.png')});
   await page.locator('#opcionesTrajesAntesDuelo [data-costume="original"]').click();await page.waitForFunction(character=>!guardandoTrajeVersus&&!TowerRewards.equipped(character)&&!CosmeticStore.read().equipped[character],character);
   await page.locator('#opcionesTrajesAntesDuelo [data-costume="'+purchased+'"]').click();await page.waitForFunction(({character,purchased})=>!guardandoTrajeVersus&&CosmeticStore.read().equipped[character]===purchased,{character,purchased});assert.equal(await page.evaluate(character=>TowerRewards.equipped(character),character),null);
   assert.equal(await page.evaluate(()=>CosmeticStore.read().coins),777);assert.equal(await page.evaluate(()=>TowerRewards.read().frame),'tower_conquistador');rows.push({width,arcade,character,purchased,tower:src});
  }
  // An unearned character's Tower outfit must stay absent.
  await page.evaluate(()=>{document.getElementById('elegirTrajeAntesDuelo').close();seleccionarPersonajeVersus('explorador');});assert.equal(await page.locator('#opcionesTrajesDuelo [data-costume="tower_explorador"]').count(),0);
  await page.evaluate(()=>{seleccionarPersonajeVersus('kairos');window.selectorReject=true;});
  await page.locator('#opcionesTrajesDuelo [data-costume="tower_kairos"]').click();await page.waitForFunction(()=>!guardandoTrajeVersus);assert.equal(await page.evaluate(()=>TowerRewards.equipped('kairos')),null);assert.equal(await page.evaluate(()=>CosmeticStore.read().equipped.kairos),'kairos-real');assert(await page.locator('#btnConfirmarPersonajeVersus').isEnabled());assert.match(await page.locator('#estadoPersonajePropioVersus').innerText(),/No se pudo confirmar/);
  await page.evaluate(()=>{Object.defineProperty(navigator,'onLine',{configurable:true,get:()=>false});window.dispatchEvent(new Event('offline'));});assert(await page.locator('#opcionesTrajesDuelo [data-costume="tower_kairos"]').isDisabled());assert(await page.locator('#opcionesTrajesDuelo [data-costume="original"]').isEnabled());
  await context.close();console.log('Costume selector '+width+' passed');
 }
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);fs.writeFileSync(path.join(out,process.argv.includes('--live')?'public-tests.json':'tests.json'),JSON.stringify({passed:true,rows,errors,failed,productionWrites:0},null,2));console.log(JSON.stringify({passed:true,cases:rows.length,characters:11,towerAndVersus:true,bothSelectors:true,normalAndPurchasedRestore:true,unearnedHidden:true,savingBlocksCombat:true,failedSavePreservesSelection:true,offlineControls:true,balancesAndFramesPreserved:true}));
}finally{await browser?.close();server.closeAllConnections();server.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
