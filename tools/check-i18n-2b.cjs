const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const fixture={progresoAventuraGA:JSON.stringify({escenarioActual:1,misionActual:2,cristalesObtenidos:1,monedas:321,historialPalabrasAventura:{}}),aventuraTiendaV1:JSON.stringify({coins:321,owned:['aren-bosque'],equipped:{explorador:'aren-bosque'}}),aventuraPalabrasIdentidadV1:JSON.stringify({avatar:'explorador',frame:'clasico'}),'sb-stage2b-auth-token':JSON.stringify({test:'preserve-session'})};
// Local image assets are real. Audio is suppressed, and external requests are blocked.
const server=http.createServer((req,res)=>{const relative=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\//,'')||'index.html',target=path.resolve(root,relative);if(!target.startsWith(root+path.sep)){res.writeHead(403);return res.end();}if(/\.(mp3|wav|ogg)$/i.test(relative))return res.end();fs.readFile(target,(error,data)=>{if(error){res.writeHead(404);return res.end();}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg'})[path.extname(target)]||'application/octet-stream');res.end(data);});});
async function layout(page,scope){
 const problems=await page.locator(scope).evaluate(root=>{
  const problems=[];if(root.scrollWidth>root.clientWidth+1)problems.push('panel overflow');
  for(const node of root.querySelectorAll('button,h2,h3,p,legend,input,select,.modo-etiqueta,.modo-textos>span,.rango-jugador small')){
   const rect=node.getBoundingClientRect();if(!rect.width||!rect.height||getComputedStyle(node).visibility==='hidden')continue;
   if(node.clientWidth && node.scrollWidth>node.clientWidth+2 && !node.classList.contains('tarjeta-modo'))problems.push(node.id||node.className||node.tagName);
   if(node.clientHeight && node.scrollHeight>node.clientHeight+2 && ['hidden','clip'].includes(getComputedStyle(node).overflowY) && !node.classList.contains('tarjeta-modo'))problems.push((node.id||node.className||node.tagName)+' clipped height');
  }return problems;
 });if(problems.length)await page.screenshot({path:path.join(root,'tools/i18n-2b-layout-failure.png')});assert.deepEqual(problems,[],scope+' layout');
}
async function snapshot(page){return page.evaluate(keys=>Object.fromEntries(keys.map(key=>[key,localStorage.getItem(key)])),Object.keys(fixture));}
(async()=>{await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const url='http://127.0.0.1:'+server.address().port,browser=await chromium.launch({headless:true,channel:'msedge'});
try{
const context=await browser.newContext({locale:'es-AR',viewport:{width:390,height:844},serviceWorkers:'block',reducedMotion:'reduce'});
await context.route('https://**/*',route=>route.abort());
await context.addInitScript(data=>{for(const[key,value]of Object.entries(data))if(localStorage.getItem(key)===null)localStorage.setItem(key,value);},fixture);
const page=await context.newPage(),errors=[],missing=[];
page.on('pageerror',error=>errors.push(error.message));page.on('console',message=>{if(message.text().includes('i18n: missing')||message.text().includes('original text retained'))missing.push(message.text());});
await page.goto(url,{waitUntil:'domcontentloaded'});await page.evaluate(()=>I18n.ready);
await page.evaluate(()=>{
document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');
globalThis.uiTestCalls={own:0,public:0,share:0,connect:0,ranking:0};
const data={id:'test-profile',alias:'Mi perfil',friend_code:'GATEST01',guest:false,points:42,ranked_played:7,played:12,wins:10,losses:1,draws:1,position:2,avatar:'explorador',frame:'clasico',favorites:[{character:'explorador',played:12,wins:10}],recent:[{win:true,ranked:true,finished_at:'2026-10-01T12:00:00Z',opponent_alias:'Shadow',opponent_id:'rival-id'}],has_more:false};
globalThis.PlayerProfile={...PlayerProfile,cargar:async()=>{uiTestCalls.own++;return data;},cargarPublico:async()=>{uiTestCalls.public++;return data;},guardarApariencia:async()=>{uiTestCalls.share++;}};
globalThis.AventuraShop={...AventuraShop,connect:async()=>{uiTestCalls.connect++;throw Error('local test connection failure');}};
// Substitute only the network boundary in the isolated browser fixture.
asegurarConexionSalasVersus=async()=>({});adaptadorSalasVersus={obtenerSala:()=>null,obtenerRanking:async()=>{uiTestCalls.ranking++;return [{me:true,position:1,alias:'Mi perfil',points:42,wins:10,played:12,user_id:'test-profile'}];}};
});
const labels={es:{settings:'Configuración',shop:'Tienda',profile:'Mi perfil',rank:'Plata III'},en:{settings:'Settings',shop:'Shop',profile:'My profile',rank:'Silver III'},'pt-BR':{settings:'Configurações',shop:'Loja',profile:'Meu perfil',rank:'Prata III'}};
for(const size of [{width:320,height:740},{width:390,height:844},{width:844,height:390}]){
 await page.setViewportSize(size);
 for(const language of ['es','en','pt-BR']){
  await page.evaluate(language=>I18n.setPreference(language),language);
  assert.equal(await page.locator('#btnConfiguracion').textContent(),labels[language].settings);
  await page.evaluate(()=>document.getElementById('btnConfiguracion').click());await layout(page,'.panel-configuracion');
  assert.equal(await page.locator('#codigoDesarrollador').getAttribute('placeholder'),await page.evaluate(()=>I18n.t('common.codePlaceholder')));
  const expectedConfirmation=await page.evaluate(()=>I18n.t('common.newAdventureConfirm'));
  const dialogEvent=page.waitForEvent('dialog'),newAdventure=page.evaluate(()=>document.getElementById('btnNuevaAventura').click());const confirmation=await dialogEvent;
  assert.equal(confirmation.message(),expectedConfirmation);await confirmation.dismiss();await newAdventure;assert.deepEqual(await snapshot(page),fixture);
  if(size.width===390)await page.screenshot({path:path.join(root,'tools/i18n-2b-settings-'+language+'.png')});
  await page.evaluate(()=>document.getElementById('btnCerrarConfiguracion').click());
  await page.evaluate(()=>document.getElementById('btnModosJuego').click());await layout(page,'#selectorModosJuego');if(size.width===390)await page.screenshot({path:path.join(root,'tools/i18n-2b-modes-'+language+'.png')});await page.evaluate(()=>document.getElementById('cerrarModosJuego').click());
  await page.evaluate(()=>document.getElementById('btnMiAvatar').click());await page.waitForFunction(()=>document.getElementById('perfilId').textContent==='GATEST01');
  assert.equal(await page.locator('#tituloAvatar').textContent(),labels[language].profile);
  assert.equal(await page.locator('#perfilNombre').textContent(),'Mi perfil');assert.equal(await page.locator('#rangoPerfilPropio strong').textContent(),labels[language].rank);
  await layout(page,'#editorAvatar');
  if(size.width===390)await page.screenshot({path:path.join(root,'tools/i18n-2b-profile-'+language+'.png')});
  await page.evaluate(()=>document.getElementById('verHistorialRivales').click());await page.waitForFunction(()=>!document.getElementById('contenidoPerfilPublico').hidden);
  assert.equal(await page.locator('#nombrePerfilPublico').textContent(),'Mi perfil');assert.equal(await page.locator('#partidasPerfilPublico .enlace-perfil-jugador').textContent(),'Shadow ›');
  await layout(page,'#perfilPublico');if(size.width===390)await page.screenshot({path:path.join(root,'tools/i18n-2b-public-profile-'+language+'.png')});await page.evaluate(()=>document.getElementById('cerrarPerfilPublico').click());await page.evaluate(()=>document.getElementById('cancelarAvatar').click());
  await page.evaluate(()=>document.getElementById('btnTienda').click());await page.waitForFunction(()=>document.getElementById('tiendaTrajesEstado').textContent.length>0);
  assert.equal(await page.locator('#tituloTiendaMenu').textContent(),labels[language].shop);
  await page.locator('#tiendaTrajesCatalogo [data-skin="aren-bosque"]').click();
  assert.equal(await page.locator('#tiendaTrajeNombre').textContent(),await page.evaluate(()=>I18n.t('shop.skins.aren-bosque.name')));
  assert.equal(await page.locator('#equiparTraje').textContent(),await page.evaluate(()=>I18n.t('shop.equippedOutfit')));assert(await page.locator('#equiparTraje').isDisabled());
  if(size.width===390){await page.locator('#tiendaMenu').evaluate(panel=>{panel.scrollTop=0;});await page.screenshot({path:path.join(root,'tools/i18n-2b-outfits-'+language+'.png')});}
  for(const id of ['kalamo-astral','azrak-eclipse','guardiana-otono']){
   await page.locator('#tiendaTrajesCatalogo [data-skin="'+id+'"]').click();
   assert.equal(await page.locator('#tiendaTrajeNombre').textContent(),await page.evaluate(id=>I18n.t('shop.skins.'+id+'.name'),id));await layout(page,'#tiendaMenu');
  }
  assert.equal(await page.locator("#tiendaMarcos").count(),0);await layout(page,"#tiendaMenu");
  if(size.width===390)await page.screenshot({path:path.join(root,'tools/i18n-2b-shop-'+language+'.png')});
  await page.evaluate(()=>document.getElementById('cerrarTiendaMenu').click());
  await page.evaluate(()=>document.getElementById('btnRankingMenu').click());await page.waitForFunction(()=>!document.getElementById('btnActualizarRanking').disabled);
  assert.equal(await page.locator('#miRanking strong').textContent(),labels[language].rank);await layout(page,'#rankingMenu');
  await page.evaluate(()=>document.getElementById('cerrarRankingMenu').click());assert.deepEqual(await snapshot(page),fixture);
 }
}
// An open, loaded UI changes language without fetching, syncing, or saving anything.
await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.getElementById('btnMiAvatar').click());await page.waitForFunction(()=>document.getElementById('perfilId').textContent==='GATEST01');
const calls=await page.evaluate(()=>({...uiTestCalls}));
for(const lang of ['en','pt-BR','es']){await page.evaluate(lang=>I18n.setPreference(lang),lang);assert.equal(await page.locator('#perfilNombre').textContent(),'Mi perfil');assert.equal(await page.locator('#rangoPerfilPropio strong').textContent(),labels[lang].rank);assert.deepEqual(await page.evaluate(()=>uiTestCalls),calls);assert.deepEqual(await snapshot(page),fixture);}
await page.evaluate(()=>document.getElementById('cancelarAvatar').click());
await page.evaluate(()=>document.getElementById('btnTienda').click());await page.waitForFunction(()=>document.getElementById('tiendaTrajesEstado').textContent.length>0);
const shopCalls=await page.evaluate(()=>({...uiTestCalls}));
for(const lang of ['en','pt-BR','es']){await page.evaluate(lang=>I18n.setPreference(lang),lang);assert.equal(await page.locator('#tiendaTrajeNombre').textContent(),await page.evaluate(()=>I18n.t('shop.skins.guardiana-otono.name')));assert.deepEqual(await page.evaluate(()=>uiTestCalls),shopCalls);}
// Developer-only pose previews: no unlocking or actual online activation.
await page.evaluate(()=>{AventuraShop={...AventuraShop,testing:()=>true};document.getElementById('tiendaTrajesCatalogo').querySelector('[data-skin="zafir-celestial"]').click();});
await page.evaluate(()=>I18n.setPreference('en'));assert.equal(await page.locator('.tienda-traje-poses [data-pose="ataque"]').textContent(),'Attack');
await page.evaluate(()=>I18n.setPreference('pt-BR'));assert.equal(await page.locator('.tienda-traje-poses [data-pose="ataque"]').textContent(),'Ataque');await layout(page,'#tiendaMenu');
assert.deepEqual(await snapshot(page),fixture);assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);
await page.evaluate(()=>{document.getElementById('cerrarTiendaMenu').click();document.getElementById('btnMiAvatar').click();});
await page.waitForFunction(()=>document.getElementById('perfilId').textContent==='GATEST01');
assert.equal(await page.locator('#opcionesMarco button').count(),12);
for(const id of ['clasico','bosque','bronce','plata'])assert.equal(await page.locator('#opcionesMarco [data-value="'+id+'"]').isDisabled(),false);
for(const id of ['arcano','real','hielo','fuego','oro','platino','diamante','leyenda'])assert.equal(await page.locator('#opcionesMarco [data-value="'+id+'"]').isDisabled(),true);
for(const language of ['es','en','pt-BR']){
 await page.evaluate(language=>I18n.setPreference(language),language);
 await layout(page,'#editorAvatar');
 await page.locator('#opcionesMarco [data-value="plata"]').click();
 assert.equal(await page.locator('#avatarPreview .rank-frame').count(),1);
 await page.screenshot({path:path.join(root,'tools/reward-frames-'+language+'.png')});
}
await page.evaluate(()=>document.getElementById('cancelarAvatar').click());assert.deepEqual(await snapshot(page),fixture);
await page.setViewportSize({width:844,height:390});
await page.evaluate(()=>{rivalesTorreArcade=['mago','explorador','guardiana','dragon','hombre_lobo','guardian_alba','dragon_hielo','kalamo','kairos','t_shadow','azrak'];pisosDesbloqueadosArcade=1;pisoActualArcade=1;abrirTorreArcade();});
for(const language of ['es','en','pt-BR']){
 await page.evaluate(language=>I18n.setPreference(language),language);
 assert.equal(await page.locator('#etiquetaPisoArcade').textContent(),await page.evaluate(()=>I18n.t('adventure.controls.floor',{floor:2,total:11})));
 assert.equal(await page.locator('#pisosArcade small').first().textContent(),await page.evaluate(()=>I18n.t('adventure.controls.tiers.boss')));
 await layout(page,'#pantallaArcade');
 await page.screenshot({path:path.join(root,'tools/tower-controls-'+language+'.png')});
}
assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);
console.log('PASS reward thresholds, locked choices, rank frame rendering, preserved identity on cancel, three-language tower labels and mobile layouts');
await page.goto(url+'/actualizar.html',{waitUntil:'domcontentloaded'});await page.evaluate(()=>I18n.ready);assert.equal(await page.locator('h1').textContent(),'Atualizar o jogo');assert.equal(await page.locator('#buscar').textContent(),'Buscar e instalar atualização');
await context.close();console.log('PASS real assets, es/en/pt-BR, 320/390 portrait and 844 landscape, menu/settings/shop/profiles/ranking, literal aliases, live updates without remote calls, unchanged saves, accessibility and update page');
// Catalog fetch failure must retain usable Spanish dynamic UI from the local fallback.
const fallback=await browser.newContext({serviceWorkers:'block'});await fallback.route('https://**/*',route=>route.abort());await fallback.route('**/locales/**',route=>route.abort());const failed=await fallback.newPage();await failed.goto(url,{waitUntil:'domcontentloaded'});await failed.evaluate(()=>I18n.ready);await failed.evaluate(()=>{document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');document.getElementById('btnTienda').click();});assert.equal(await failed.locator('#tiendaTrajeNombre').textContent(),'Guardián del Bosque');assert.equal(await failed.locator('#tiendaTrajeDetalle').textContent(),'Cuero esmeralda, hojas de bronce y espíritu de explorador.');await fallback.close();console.log('PASS Spanish dynamic fallback after complete catalog loading failure');
}finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
