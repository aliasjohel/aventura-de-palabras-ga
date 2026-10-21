const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{try{const file=new URL(req.url,'http://localhost').pathname.slice(1)||'index.html',target=path.resolve(root,file);if(!target.startsWith(root+path.sep))throw Error('path');res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.json':'application/json','.png':'image/png','.webp':'image/webp'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(target));}catch{res.writeHead(404);res.end();}});
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});await context.route('https://**/*',r=>r.abort());const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:'+server.address().port+'/');await page.evaluate(()=>I18n.ready);
  await page.evaluate(async()=>{
   document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');mostrarPantalla(pantallaMenu);
   const accounts={alice:{coins:500,owned:['bosque'],equipped:'bosque',revision:1},bob:{coins:0,owned:['bosque'],equipped:'bosque',revision:1}};
   let current='alice',testing=false,purchases=0;
   const client={rpc:async(name,args)=>{const state=accounts[current];if(name==='profile_backgrounds'){
    if(args.p_action==='purchase'&&!state.owned.includes(args.p_background)){const price=args.p_background==='zafir'?150:100;if(state.coins<price)return {error:{message:'Saldo insuficiente'}};state.coins-=price;state.owned.push(args.p_background);purchases++;state.revision++;}
    if(args.p_action==='equip'){if(!state.owned.includes(args.p_background))return {error:{message:'Primero conseguí este fondo.'}};state.equipped=args.p_background;state.revision++;}
   }
   return {data:{userId:current,coins:state.coins,owned:[],equipped:{},revision:state.revision,acknowledged:args.p_events?.map(e=>e.id)||[],backgrounds:{userId:current,...structuredClone(state)}}};}};
   globalThis.AventuraShop={...AventuraShop,connect:()=>GameWallet.sync(),testing:()=>testing,canPreviewBackgrounds:()=>testing};
   globalThis.PlayerProfile={...PlayerProfile,cargar:async()=>({id:current,alias:current,friend_code:'QA000001',points:0,favorites:[]}),cargarPublico:async()=>({id:current,alias:current,avatar:'mago',frame:'clasico',background:accounts[current].equipped,points:0,favorites:[],recent:[]})};
   globalThis.backgroundQA={switch:id=>{current=id;GameWallet.connect(client,id);},testing:value=>{testing=value;},purchases:()=>purchases,grant:()=>{accounts[current].owned=['bosque','cumbres','hielo','azrak'];accounts[current].revision++;}};
   backgroundQA.switch('alice');await GameWallet.sync();await ProfileBackgrounds.sync();
  });
  await page.locator('#btnMiAvatar').click();assert(await page.locator('[data-background-choice="cumbres"]').isDisabled());
  await page.evaluate(()=>ProfileBackgroundsUI.preview('zafir'));assert.equal(await page.locator('#editorAvatar .perfil-cabecera').getAttribute('data-profile-background'),'bosque');
  await page.locator('#cerrarAvatar').click();await page.locator('#btnTienda').click();
  const locked=page.locator('[data-background-shop="zafir"]');assert.equal(await locked.locator('.tienda-fondo-candado').count(),1);assert.equal(await locked.getByRole('button',{name:'Probar',exact:true}).count(),0);
  await page.locator('.tienda-fondo-miniatura img').evaluateAll(images=>Promise.all(images.map(i=>i.decode())));
  assert.equal(await page.locator('.tienda-fondo-miniatura').count(),6);
  await locked.locator('[data-background-action="purchase"]').evaluate(button=>{button.click();button.click();});
  await page.waitForFunction(()=>ProfileBackgrounds.read().owned.includes('zafir'));
  assert.equal(await page.evaluate(()=>CosmeticStore.read().coins),350);assert.equal(await page.evaluate(()=>backgroundQA.purchases()),1);
  assert.equal(await page.evaluate(()=>ProfileBackgrounds.read().equipped),'bosque','purchase does not silently equip');
  assert.equal(await locked.locator('.tienda-fondo-candado').count(),0);await locked.getByRole('button',{name:'Probar',exact:true}).click();
  await page.locator('#equiparFondoPerfil').click();await page.waitForFunction(()=>ProfileBackgrounds.read().equipped==='zafir');
  await page.locator('#cerrarAvatar').click();await page.locator('#btnMiAvatar').click();assert.equal(await page.locator('[data-background-choice="zafir"]').getAttribute('aria-pressed'),'true');
  await page.locator('#cerrarAvatar').click();await page.locator('#btnTienda').click();await page.locator('[data-background-shop="desierto"] [data-background-action="purchase"]').click();await page.waitForFunction(()=>ProfileBackgrounds.read().owned.includes('desierto'));assert.equal(await page.evaluate(()=>CosmeticStore.read().coins),250);
  await page.locator('#cerrarTiendaMenu').click();await page.evaluate(()=>backgroundQA.switch('bob'));await page.locator('#btnMiAvatar').click();assert(await page.locator('[data-background-choice="zafir"]').isDisabled());
  await page.locator('#cerrarAvatar').click();await page.locator('#btnTienda').click();await page.locator('[data-background-shop="zafir"] [data-background-action="purchase"]').click();
  await page.waitForFunction(()=>document.querySelector('.tienda-fondos [role="status"]').textContent.includes('Saldo insuficiente'));assert.equal(await page.evaluate(()=>CosmeticStore.read().coins),0);
  await page.locator('#cerrarTiendaMenu').click();await page.evaluate(()=>backgroundQA.testing(true));await page.locator('#btnMiAvatar').click();await page.locator('[data-background-choice="zafir"]').click();
  assert.equal(await page.locator('#editorAvatar .perfil-cabecera').getAttribute('data-profile-background'),'zafir');assert(await page.locator('#comprarFondoPerfil').isDisabled());assert(await page.locator('#equiparFondoPerfil').isDisabled());assert.deepEqual(await page.evaluate(()=>ProfileBackgrounds.read().owned),['bosque']);
  await page.locator('#cerrarAvatar').click();await page.evaluate(()=>backgroundQA.testing(false));await page.locator('#btnMiAvatar').click();assert.equal(await page.locator('#editorAvatar .perfil-cabecera').getAttribute('data-profile-background'),'bosque');assert(await page.locator('[data-background-choice="zafir"]').isDisabled());
  await page.evaluate(async()=>{backgroundQA.grant();await ProfileBackgrounds.sync();});await page.locator('[data-background-choice="azrak"]').click();await page.locator('#equiparFondoPerfil').click();await page.waitForFunction(()=>ProfileBackgrounds.read().equipped==='azrak');
  await page.locator('#cerrarAvatar').click();await page.evaluate(()=>PublicPlayerProfile.abrir('bob'));await page.waitForSelector('#perfilPublico .perfil-publico-identidad[data-profile-background="azrak"]');
  await page.locator('.perfil-publico-figura').evaluate(i=>i.decode());await page.locator('#cerrarPerfilPublico').click();
  for(const lang of ['es','en','pt-BR'])for(const width of [320,390,844]){await page.evaluate(lang=>I18n.setPreference(lang),lang);await page.setViewportSize({width,height:844});await page.locator('#btnMiAvatar').click();assert(await page.locator('#editorAvatar').evaluate(e=>e.scrollWidth<=e.clientWidth));await page.locator('#cerrarAvatar').click();await page.locator('#btnTienda').click();assert(await page.locator('#tiendaMenu').evaluate(e=>e.scrollWidth<=e.clientWidth));await page.locator('#cerrarTiendaMenu').click();}
  await page.evaluate(()=>I18n.setPreference('es'));await page.setViewportSize({width:390,height:844});await page.locator('#btnTienda').click();await page.locator('.tienda-fondos').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(root,'docs/v383-tienda-fondos.png')});
  await page.reload();await page.evaluate(()=>I18n.ready);assert.equal(await page.evaluate(()=>ProfileBackgrounds.read().equipped),'azrak','equipped inventory survives reload');
  assert.deepEqual(errors,[]);console.log('PASS thumbnails, padlocks, normal user preview blocked, admin test preview without ownership, UI purchase/debit/double-click, separate equip, saved selection, shop, locked rewards, insufficient funds, test mode, account isolation, public profile, reload, three languages and mobile widths');
 }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
