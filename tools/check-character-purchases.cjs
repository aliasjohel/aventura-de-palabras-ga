const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{try{const file=new URL(req.url,'http://localhost').pathname.slice(1)||'index.html',target=path.resolve(root,file);if(!target.startsWith(root+path.sep))throw Error('path');res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.json':'application/json','.png':'image/png','.webp':'image/webp'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(target));}catch{res.writeHead(404);res.end();}});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'msedge',headless:true});
 try{const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});await context.route('https://**/*',r=>r.abort());const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:'+server.address().port+'/');await page.evaluate(()=>I18n.ready);
 await page.evaluate(async()=>{
 document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');mostrarPantalla(pantallaMenu);
 const accounts={alice:{coins:15000,owned:[],revision:1},bob:{coins:0,owned:[],revision:1}};let current='alice',purchases=0,testing=false;
 const client={rpc:async(name,args)=>{const state=accounts[current];if(name==='game_characters'&&args.p_action==='purchase'&&!state.owned.includes(args.p_character)){const price=CharacterStore.catalog.find(c=>c.id===args.p_character).price;if(state.coins<price)return {error:{message:'No tenés suficientes monedas para este personaje.'}};state.coins-=price;state.owned.push(args.p_character);state.revision++;purchases++;}
 return {data:{currencyVersion:2,userId:current,coins:state.coins,owned:[],equipped:{},revision:state.revision,acknowledged:args.p_events?.map(e=>e.id)||[],characters:{userId:current,owned:[...state.owned],revision:state.revision},backgrounds:{userId:current,owned:['bosque'],equipped:'bosque',revision:1}}};}};
 globalThis.AventuraShop={...AventuraShop,connect:()=>GameWallet.sync(),testing:()=>testing};globalThis.characterQA={switch:id=>{current=id;GameWallet.connect(client,id);},purchases:()=>purchases,testing:value=>testing=value};characterQA.switch('alice');await GameWallet.sync();
 });
 assert.deepEqual(await page.evaluate(()=>Object.keys(personajesVersus).filter(personajeDisponibleVersus)),['explorador']);
 await page.locator('#btnTienda').click();assert.equal(await page.locator('[data-character-shop]').count(),5);await page.locator('.tienda-personajes img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));
 await page.screenshot({path:path.join(root,'docs/v386-tienda-personajes.png')});
 for(const id of ['hombre_lobo','kairos','kalamo','guardian_alba','t_shadow']){
 await page.locator('[data-character-shop="'+id+'"] button').evaluate(b=>{b.click();b.click();});await page.waitForFunction(id=>CharacterStore.owns(id),id);assert(await page.locator('[data-character-shop="'+id+'"] button').isDisabled());assert(await page.evaluate(id=>personajeDisponibleVersus(id),id));
 }
 assert.equal(await page.evaluate(()=>CosmeticStore.read().coins),1000);assert.equal(await page.evaluate(()=>characterQA.purchases()),5);
 await page.locator('#cerrarTiendaMenu').click();await page.evaluate(()=>{modoArcadeActivo=true;abrirSeleccionPersonajeVersus();});assert(await page.evaluate(()=>tarjetasPersonajesVersus.find(t=>t.dataset.personaje==='kalamo').disabled===false));
 assert(await page.evaluate(()=>{seleccionarPersonajeVersus('kalamo');return personajeJugadorVersus==='kalamo';}));
 await page.evaluate(async()=>{mostrarPantalla(pantallaMenu);characterQA.switch('bob');await GameWallet.sync();});assert.deepEqual(await page.evaluate(()=>CharacterStore.read().owned),[]);assert(!await page.evaluate(()=>personajeDisponibleVersus('kalamo')));
 await page.locator('#btnTienda').click();await page.locator('[data-character-shop="kalamo"] button').click();await page.waitForFunction(()=>document.querySelector('.tienda-personajes [role="status"]').textContent.includes('suficientes'));assert.equal(await page.evaluate(()=>CosmeticStore.read().coins),0);
 await page.locator('#cerrarTiendaMenu').click();await page.evaluate(()=>characterQA.testing(true));await page.locator('#btnTienda').click();assert(await page.locator('[data-character-shop="kalamo"] button').isDisabled());await page.locator('#cerrarTiendaMenu').click();
 await page.evaluate(async()=>{characterQA.testing(false);characterQA.switch('alice');await GameWallet.sync();});assert.equal(await page.evaluate(()=>CharacterStore.read().owned.length),5);
 for(const lang of ['es','en','pt-BR'])for(const width of [320,390,844]){await page.evaluate(lang=>I18n.setPreference(lang),lang);await page.setViewportSize({width,height:844});await page.locator('#btnTienda').click();assert(await page.locator('#tiendaMenu').evaluate(e=>e.scrollWidth<=e.clientWidth));await page.locator('#cerrarTiendaMenu').click();}
 assert.deepEqual(errors,[]);console.log('PASS: prices, purchases, double-click, five images, balance, Arcade selection, account isolation, insufficient balance, test mode, translations and mobile layout');
 }finally{await browser.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
