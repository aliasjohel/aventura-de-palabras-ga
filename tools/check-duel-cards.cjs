// UI contract test. No real accounts, matchmaking, rewards or Supabase traffic.
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'.local-developer/releases/v417-duel-cards');fs.mkdirSync(out,{recursive:true});let browser;
const server=http.createServer((req,res)=>{try{const url=new URL(req.url,'http://local'),file=path.resolve(root,'.'+(url.pathname==='/'?'/index.html':url.pathname));if(!file.startsWith(root+path.sep))throw Error();let bytes=fs.readFileSync(file);if(/\.(html|css|js|json|svg|txt|xml|webmanifest)$/.test(file))bytes=Buffer.from(bytes.toString('utf8').replace(/\r\n/g,'\n'));res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.mp3':'audio/mpeg'})[path.extname(file)]||'application/octet-stream');res.setHeader('Cache-Control','no-store');res.end(bytes);}catch{res.writeHead(404).end();}});
(async()=>{try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=process.env.AVENTURA_QA_PUBLIC_URL||'http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({channel:'msedge',headless:true});const cases=[],errors=[];
 for(const reduced of [false,true]){
  const context=await browser.newContext({viewport:{width:844,height:390},serviceWorkers:'block',reducedMotion:reduced?'reduce':'no-preference'});
  await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(origin).origin?r.continue():r.abort());
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>typeof entrarAlModoVersus==='function'&&typeof I18n!=='undefined');await page.evaluate(()=>I18n.ready);
  await page.evaluate(()=>{
   document.getElementById('introOficial')?.remove();document.querySelector('.app').inert=false;document.body.classList.remove('intro-pendiente','menu-fondo-pendiente','menu-entrada','menu-camara-inicio');document.body.classList.add('menu-camara-lista');
   prepararRecursosMultijugador=async()=>{};asegurarConexionSalasVersus=async()=>{};
   window.__modeRequests=[];
   // Read-only room/rank state, synthetic search and cancellation. No match is created.
   adaptadorSalasVersus={proveedor:'qa',obtenerSala:()=>null,obtenerRango:async()=>{throw Error('QA account absent');},buscarPartida:async request=>{window.__modeRequests.push(request);return {};},salirSala:async()=>{}};
   mostrarPantalla(pantallaMenu);
  });
  await page.locator('#btnVersus').click();await page.waitForFunction(()=>document.getElementById('pantallaSalaVersus').classList.contains('activa'));
  for(const lang of ['es','en','pt-BR']){
   await page.evaluate(lang=>I18n.setPreference(lang),lang);
   const names=JSON.parse(fs.readFileSync(path.join(root,'locales',lang,'menu.json'),'utf8'));
   for(const [width,height]of [[480,280],[568,320],[640,360],[780,360],[844,390],[915,412]]){
    await page.setViewportSize({width,height});
    for(const[mode,title]of [['classic',names.classicDuel],['ranked',names.rankedDuel]]){
     const input=page.locator('input[name="modoOnline"][value="'+mode+'"]'),card=input.locator('..');
     await card.scrollIntoViewIfNeeded();await card.click();assert.equal(await input.isChecked(),true);
     assert.equal(await card.locator('strong').textContent(),title);
     assert.ok((await card.locator('.modo-ilustracion').evaluate(e=>getComputedStyle(e).backgroundImage)).includes('multiplayer-'+mode+'-card-v1.webp'));
     const box=await card.boundingBox();assert.ok(box.x>=0&&box.x+box.width<=width+1&&box.height>=130);
     const geometry=await card.locator('.modo-online-textos').evaluate(e=>({overflow:e.scrollWidth>e.clientWidth+1}));assert.equal(geometry.overflow,false);
    }
    const cards=await page.locator('.modos-online .modo-online').all();const a=await cards[0].boundingBox(),b=await cards[1].boundingBox();assert.ok(Math.abs(a.y-b.y)<=1,'landscape choices remain side by side');
    for(const id of ['btnCrearSalaVersus','btnUnirseSalaVersus','btnBuscarPartida','codigoSalaVersus','aliasSalaVersus'])assert.equal(await page.locator('#'+id).count(),1);
    await page.locator('.salas-manuales-versus summary').click();await page.locator('#btnCrearSalaVersus').scrollIntoViewIfNeeded();assert.equal(await page.locator('#btnCrearSalaVersus').isVisible(),true);assert.equal(await page.locator('#btnUnirseSalaVersus').isVisible(),true);await page.locator('.salas-manuales-versus summary').click();
    if(reduced)assert.equal(await cards[0].evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
    cases.push({lang,reduced,width,height});
   }
   for(const[width,height]of [[280,480],[320,568],[360,640],[393,852]]){
    await page.setViewportSize({width,height});assert.equal(await page.locator('.sala-versus-marco').isVisible(),false);assert.equal(await page.locator('#pantallaSalaVersus .versus-aviso-orientacion').isVisible(),true);
    cases.push({lang,reduced,width,height,portraitOrientationPreserved:true});
   }
  }
  await page.setViewportSize({width:844,height:390});await page.evaluate(()=>I18n.setPreference('es'));
  await page.locator('input[value="classic"][name="modoOnline"]').focus();await page.keyboard.press('ArrowRight');assert.equal(await page.locator('input[value="ranked"][name="modoOnline"]').isChecked(),true);
  await page.evaluate(()=>mostrarBusquedaActiva(true));
  const lockedCard=page.locator('.modo-online-clasico');await lockedCard.scrollIntoViewIfNeeded();const lockedBox=await lockedCard.boundingBox();await page.mouse.click(lockedBox.x+lockedBox.width/2,lockedBox.y+lockedBox.height/2);
  assert.equal(await page.locator('input[value="ranked"][name="modoOnline"]').isChecked(),true);await page.evaluate(()=>mostrarBusquedaActiva(false));
  await page.evaluate(async()=>{aliasSalaVersus.value='QA';for(const mode of ['classic','ranked']){const input=document.querySelector('input[name="modoOnline"][value="'+mode+'"]');input.checked=true;input.dispatchEvent(new Event('change',{bubbles:true}));busquedaPublicaActiva=true;await consultarBusquedaPublica();busquedaPublicaActiva=false;}});
  assert.deepEqual(await page.evaluate(()=>__modeRequests.map(r=>r.modo)),['classic','ranked']);
  if(reduced){await page.locator('.modo-online-clasico').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(out,'duel-cards-844.png')});}
  await page.locator('#btnSalirSalaVersus').scrollIntoViewIfNeeded();await page.locator('#btnSalirSalaVersus').click();await page.waitForFunction(()=>document.getElementById('pantallaMenu').classList.contains('activa'));
  await context.close();
 }
 assert.deepEqual(errors,[]);const result={passed:true,cases,origin,modeValuesPreserved:true,keyboardNavigation:true,disabledSelectionPreserved:true,manualRoomControlsPreserved:true,syntheticSearchRoutingPassed:true,externalServicesBlocked:true,mediaPreparationStubbed:true,realAccountsUsed:false};
 fs.writeFileSync(path.join(out,process.env.AVENTURA_QA_PUBLIC_URL?'public-browser.json':'browser-results.json'),JSON.stringify(result,null,2));console.log(JSON.stringify({...result,cases:cases.length}));
}finally{await browser?.close();server.closeAllConnections();server.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
