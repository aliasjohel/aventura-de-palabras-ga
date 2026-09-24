const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs'),assert=require('node:assert/strict');
(async()=>{
  const browser=await chromium.launch({headless:true,channel:'msedge'});
  try {
    const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block',ignoreHTTPSErrors:true});
    const live=process.argv.includes('--live');
    if(!live)await context.route('https://game.test/**',async route=>{
      const url=new URL(route.request().url());
      await route.fulfill({response:await context.request.get('http://127.0.0.1:8789'+url.pathname+url.search)});
    });
    const base=live?'https://aliasjohel.github.io/aventura-de-palabras-ga/?release=autor-app-302':'https://game.test/';
    const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base,{waitUntil:'domcontentloaded',timeout:90000});
    await page.evaluate(()=>AventuraDeveloper.ready);
    assert.equal(await page.evaluate(()=>herramientasAutorDisponibles),false);
    await page.evaluate(()=>{document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');abrirConfiguracion();});
    await page.locator('#accesoDesarrollador summary').click();
    await page.locator('#codigoDesarrollador').fill('incorrecto');
    await page.locator('#btnActivarDesarrollador').click();
    await page.waitForFunction(()=>document.getElementById('estadoAccesoDesarrollador').textContent.includes('incorrecto'));
    assert.equal(await page.evaluate(()=>herramientasAutorDisponibles),false);
    const code=JSON.parse(fs.readFileSync('.local-developer/access.json','utf8')).code;
    await page.locator('#codigoDesarrollador').fill(code.toLowerCase().match(/.{1,4}/g).join('-'));
    await page.locator('#btnActivarDesarrollador').click();
    await page.waitForFunction(()=>herramientasAutorDisponibles);
    assert.equal(await page.locator('#codigoDesarrollador').inputValue(),'');
    await page.locator('#modoPruebas').check();
    assert.equal(await page.locator('#panelModoPruebas').isVisible(),true);
    assert.equal(await page.locator('#modalConfiguracion').evaluate(el=>el.scrollWidth<=el.clientWidth),true);
    await page.reload({waitUntil:'domcontentloaded',timeout:90000});
    await page.evaluate(()=>AventuraDeveloper.ready);
    assert.equal(await page.evaluate(()=>herramientasAutorDisponibles&&modoPruebasActivo),true);
    assert.equal(await page.locator('#btnAbrirPruebasMenu').getAttribute('hidden'),null);
    assert.deepEqual(errors,[]);
    console.log('PASS: in-app code activation, invalid code rejected, mobile layout, immediate tools, persisted access and test mode after reload');
  }finally{await browser.close();}
})().catch(e=>{console.error(e.message);process.exitCode=1;});
