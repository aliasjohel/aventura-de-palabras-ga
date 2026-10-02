const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),accounts=[];
const server=http.createServer((req,res)=>{
 const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/\/$/,'/index.html'));
 if(!file.startsWith(root+path.sep)||file.includes('.local-developer'))return res.writeHead(403).end();
 fs.readFile(file,(error,data)=>{if(error)return res.writeHead(404).end();res.setHeader('Content-Type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');res.end(data);});
});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({headless:true,channel:'msedge'}),errors=[];
 try {
  async function player(){
   const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block',ignoreHTTPSErrors:true});
   await context.route('https://game.test/**',async route=>{
    try {
     const url=new URL(route.request().url()),file=path.join(root,decodeURIComponent(url.pathname).replace(/^\//,'')||'index.html');
     const contentType=({'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream';
     await route.fulfill({status:200,contentType,body:fs.readFileSync(file)});
    } catch(_) {await route.abort().catch(()=>{});}
   });
   const page=await context.newPage();page.setDefaultTimeout(30000);page.on('pageerror',e=>errors.push(e.message));
   await page.goto('https://game.test/',{waitUntil:'domcontentloaded'});await page.evaluate(()=>AventuraDeveloper.ready);
   await page.evaluate(()=>{document.querySelector('#introOficial')?.remove();document.body.classList.remove('intro-pendiente');abrirConfiguracion();});
   assert.equal(await page.evaluate(()=>AventuraDeveloper.enabled),false);
   assert.equal(await page.locator('#accesoUnionOnline').isVisible(),false);
   return page;
  }
  async function remember(page){const id=await page.evaluate(()=>adaptadorSalasVersus.obtenerUsuarioId());accounts.push(id);fs.writeFileSync(path.join(root,'.local-developer/admin-ui-accounts.json'),JSON.stringify(accounts));}
  const a=await player();await a.locator('#accesoDesarrollador summary').click();
  await a.locator('#codigoDesarrollador').fill('incorrecto');await a.locator('#btnActivarDesarrollador').click();
  await a.waitForFunction(()=>document.querySelector('#estadoAccesoDesarrollador').textContent.includes('incorrecto'));
  assert.equal(await a.locator('#accesoUnionOnline').isVisible(),false);
  const code=JSON.parse(fs.readFileSync(path.join(root,'.local-developer/access.json'),'utf8')).code;
  await a.locator('#codigoDesarrollador').fill(code);await a.locator('#btnActivarDesarrollador').click();
  await a.locator('#btnUnionOnline').waitFor({state:'visible'});
  const coins=await a.evaluate(()=>CosmeticStore.read().coins);
  await a.locator('#btnUnionOnline').click();
  await a.waitForFunction(()=>CosmeticStore.read().adminUnion===true||(!document.querySelector('#btnUnionOnline').disabled&&document.querySelector('#estadoUnionOnline').textContent),{},{timeout:60000});
  assert.equal(await a.evaluate(()=>CosmeticStore.read().adminUnion),true,await a.locator('#estadoUnionOnline').textContent());await remember(a);
  assert.equal(await a.evaluate(()=>CosmeticStore.read().coins),coins);
  assert.equal(await a.evaluate(()=>CosmeticStore.read().equipped.explorador),'aren-union');
  assert.equal(await a.locator('#codigoDesarrollador').inputValue(),'');
  assert.equal(await a.locator('#modalConfiguracion').evaluate(el=>el.scrollWidth<=el.clientWidth),true);
  await a.screenshot({path:path.join(root,'tools/admin-union-activacion-390.png')});
  await a.locator('#btnUnionOnline').click();await a.waitForFunction(()=>CosmeticStore.read().adminUnion===false);
  assert.equal(await a.evaluate(()=>CosmeticStore.read().owned.includes('aren-union')),false);
  await a.locator('#btnUnionOnline').click();await a.waitForFunction(()=>CosmeticStore.read().adminUnion===true);
  await a.reload({waitUntil:'domcontentloaded'});await a.evaluate(async()=>{await AventuraDeveloper.ready;await AventuraShop.connect();});
  assert.equal(await a.evaluate(()=>CosmeticStore.read().adminUnion),true);
  const b=await player();await b.evaluate(()=>AventuraShop.connect());await remember(b);
  assert.equal(await b.evaluate(()=>CosmeticStore.read().adminUnion),false);
  assert.equal(await b.locator('#accesoUnionOnline').isVisible(),false);
  await b.evaluate(()=>{document.querySelector('#btnCerrarConfiguracion').click();document.querySelector('#btnTienda').click();});
  assert.equal(await b.locator('[data-skin="aren-union"]').isVisible(),false);
  await b.evaluate(()=>document.querySelector('#tiendaMenu').close());
  const wrong=await b.evaluate(async()=>{const {data,error}=await AventuraSupabase.obtenerCliente().rpc('activate_game_admin',{p_code:'incorrecto'});return error?.message||data?.activationError;});
  assert.match(wrong,/incorrecto/);
  await a.setViewportSize({width:844,height:390});await b.setViewportSize({width:844,height:390});
  await a.evaluate(()=>{document.querySelector('#introOficial')?.remove();document.body.classList.remove('intro-pendiente');});
  const room=await a.evaluate(()=>adaptadorSalasVersus.crearSala({alias:'UnionAdminTest'}));
  await b.evaluate(code=>adaptadorSalasVersus.unirseSala({codigo:code,alias:'UnionRivalTest'}),room.codigo);
  await b.waitForFunction(()=>adaptadorSalasVersus.obtenerTrajesRival().explorador==='aren-union');
  assert.equal(await a.evaluate(()=>CosmeticStore.read().equipped.explorador),'aren-union');
  for(const page of [a,b])await page.evaluate(async()=>{seleccionarPersonajeVersus('explorador');await adaptadorSalasVersus.actualizarPersonaje({personaje:'explorador'});});
  for(const page of [a,b])await page.evaluate(()=>adaptadorSalasVersus.guardarDesafio({tematica:'animales',palabras:['GATO','PERRO','LORO','TIGRE','OSO']}));
  await a.waitForFunction(()=>partidaOnlineVersus?.status==='playing');await b.waitForFunction(()=>partidaOnlineVersus?.status==='playing');
  await a.waitForFunction(()=>Date.now()>=Date.parse(partidaOnlineVersus.startedAt));
  for(const letter of ['G','A','T','O','P','E','R','O'])await a.evaluate(letter=>adaptadorSalasVersus.jugarLetra(letter),letter);
  assert.equal(await a.evaluate(()=>partidaOnlineVersus.me.abilityCharge),8);
  const ability=await a.evaluate(()=>adaptadorSalasVersus.activarHabilidad());
  assert.equal(ability.lastEvent.costume,'aren-union');assert(ability.me.abilityHint);
  const blocked=await b.evaluate(()=>adaptadorSalasVersus.jugarLetra('G'));assert.equal(blocked.me.scoreLetters,0);
  await b.waitForFunction(()=>document.querySelector('#tecladoVersus').classList.contains('efecto-descarga-union'));
  assert.equal(await b.locator('#tecladoVersus button:not(:disabled)').count(),0);
  assert.equal(await b.evaluate(()=>trajePersonajeVersus(personajeVersusDos,'explorador')),'aren-union');
  await b.screenshot({path:path.join(root,'tools/admin-union-rival-online-844.png')});
  await b.waitForTimeout(2200);const resumed=await b.evaluate(()=>adaptadorSalasVersus.jugarLetra('G'));assert.equal(resumed.me.scoreLetters,1);
  for(const page of [a,b])await page.evaluate(async()=>{salidaSalaVersusEnCurso=true;await adaptadorSalasVersus.salirSala();partidaOnlineVersus=null;mostrarPantalla(pantallaMenu);salidaSalaVersusEnCurso=false;});
  await a.evaluate(()=>GameWallet.setAdminUnion(false));
  assert.deepEqual(errors,[]);
  console.log('PASS: mobile code activation, revoke, reload, unchanged coins, public exclusion, two live accounts, server outfits, real ability charge, hint, electric keyboard and resumed letters');
 } finally {await browser.close();server.close();}
})().catch(e=>{console.error(e.message);server.close();process.exitCode=1;});
