'use strict';
// Synthetic account fixture. External network is blocked; no production writes.
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'../..');let browser;
const server=http.createServer((req,res)=>{try{const name=new URL(req.url,'http://local').pathname,file=path.resolve(root,'.'+(name==='/'?'/index.html':name));if(!file.startsWith(root+path.sep))throw Error();res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}});
(async()=>{try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({channel:'msedge',headless:true});const ctx=await browser.newContext({viewport:{width:844,height:390},isMobile:true,serviceWorkers:'block'});
 await ctx.route('**/*',r=>new URL(r.request().url()).origin===origin?r.continue():r.abort());const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin);await page.evaluate(()=>I18n.ready);

 await page.evaluate(()=>{
  document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');mostrarPantalla(pantallaMenu);
  window.shopPurchaseCount=0;window.shopRevision=0;window.shopCoins=6000;window.shopOwned=[];
  window.AventuraShop={connect:async()=>{},sync:()=>{},testing:()=>false};
  CosmeticStore.beginAccount('synthetic-costume-shop');
  window.shopApply=()=>CosmeticStore.applyAccount({userId:'synthetic-costume-shop',currencyVersion:2,securityVersion:3,coins:shopCoins,owned:shopOwned,equipped:{},revision:shopRevision++,missionClaims:[]});shopApply();
  CharacterStore.apply({userId:'synthetic-costume-shop',owned:[],unlocked:['explorador'],revision:0});
  CosmeticStore.setPurchaseHandler(id=>{if(!CosmeticStore.canPurchase(id))throw Error('Missing character');shopPurchaseCount++;shopCoins-=CosmeticStore.find(id).price;shopOwned.push(id);shopApply();return CosmeticStore.read();});
 });
 await page.locator('#btnTienda').click();await page.locator('[data-skin="kairos-real"]').click();
 assert.match(await page.locator('#vistaTrajeTienda p.precio-con-moneda').innerText(),/1500/);
 assert.equal(await page.locator('#comprarTraje').isDisabled(),true);assert.match(await page.locator('#tiendaTrajeRequisito').innerText(),/Primero conseguí a Kairós/);
 const error=await page.evaluate(async()=>{try{await CosmeticStore.purchase('kairos-real');return '';}catch(e){return e.message;}});assert.match(error,/Primero conseguí/);assert.equal(await page.evaluate(()=>shopCoins),6000);
 fs.mkdirSync(path.join(root,'.local-developer/costume-prices'),{recursive:true});await page.screenshot({path:path.join(root,'.local-developer/costume-prices/locked-shop.png')});
 await page.evaluate(()=>CharacterStore.apply({userId:'synthetic-costume-shop',owned:['kairos'],unlocked:['explorador','kairos'],revision:1}));
 assert.equal(await page.locator('#comprarTraje').isEnabled(),true);assert.equal(await page.locator('#tiendaTrajeRequisito').isHidden(),true);
 await page.locator('#comprarTraje').click();await page.waitForFunction(()=>CosmeticStore.read().owned.includes('kairos-real'));assert.equal(await page.evaluate(()=>shopCoins),4500);
 await page.evaluate(()=>CosmeticStore.purchase('kairos-real'));assert.equal(await page.evaluate(()=>shopPurchaseCount),1);
 await page.locator('#vistaTrajeTienda .cerrar-vista-traje').click();await page.locator('[data-skin="nimbus-aviador"]').click();
 assert.equal(await page.locator('#comprarTraje').isDisabled(),true);assert.match(await page.locator('#vistaTrajeTienda p.precio-con-moneda').innerText(),/1000/);
 await page.evaluate(()=>CharacterStore.apply({userId:'synthetic-costume-shop',owned:['kairos'],unlocked:['explorador','kairos','dragon'],revision:1}));await page.locator('#comprarTraje').click();await page.waitForFunction(()=>CosmeticStore.read().owned.includes('nimbus-aviador'));assert.equal(await page.evaluate(()=>shopCoins),3500);
 await page.evaluate(()=>{CosmeticStore.beginAccount('other-account');window.dispatchEvent(new Event('wallet-updated'));});assert.equal(await page.locator('#comprarTraje').isDisabled(),true);
 for(const language of ['en','pt-BR','es']){await page.evaluate(async language=>{await I18n.setPreference(language);window.dispatchEvent(new Event('characters-updated'));},language);assert(!/shop\./.test(await page.locator('#tiendaTrajeRequisito').innerText()));}
 await page.setViewportSize({width:390,height:844});assert(await page.locator('#vistaTrajeTienda').evaluate(e=>e.scrollWidth<=e.clientWidth));
 assert.deepEqual(errors,[]);console.log('PASS costume prices, locked character warning, purchase after paid/story unlock, one charge, account isolation and translations');

}finally{await browser?.close();server.closeAllConnections();server.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
