const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({headless:true,channel:'msedge'});try{
const page=await browser.newPage({viewport:{width:844,height:390},serviceWorkers:'block'}),errors=[];
page.on('pageerror',e=>errors.push(e.message));
await page.goto('https://aliasjohel.github.io/aventura-de-palabras-ga/?release=final-v312',{waitUntil:'domcontentloaded',timeout:60000});
await page.evaluate(()=>{document.querySelector('#introOficial')?.remove();document.body.classList.remove('intro-pendiente');document.querySelector('#btnTienda').click();});
assert.equal(await page.evaluate(()=>CosmeticStore.catalog.length),11);
for(const skin of ['lobo-lunar','nimbus-aviador','nivor-boreal','azrak-eclipse','kalamo-astral']){
await page.locator(`[data-skin="${skin}"]`).click();
await page.locator('#tiendaTrajeImagen').evaluate(img=>img.decode());
assert.match(await page.locator('#tiendaTrajeImagen').getAttribute('src'),new RegExp(skin+'-base'));
assert.equal(await page.locator('.tienda-traje-poses button').count(),0);
}
assert.match(await page.evaluate(async()=>await(await fetch('sw.js?release=final-v312')).text()),/v312/);
await page.screenshot({path:require('node:path').join(__dirname,'creature-release-final-v312.png')});
assert.deepEqual(errors,[]);console.log('PASS published final-v312: eleven costumes, new images decode, base-only shop, v312, no runtime errors. No real purchase performed.');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
