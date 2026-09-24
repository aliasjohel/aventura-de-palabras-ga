const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({headless:true,channel:'msedge'});try{
for(const width of [667,844]){
 const page=await browser.newPage({viewport:{width,height:390},serviceWorkers:'block'}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.argv.includes('--live')?'https://aliasjohel.github.io/aventura-de-palabras-ga/?release=trajes305':'http://127.0.0.1:8789',{waitUntil:'domcontentloaded',timeout:90000});
 await page.evaluate(()=>{document.querySelector('#introOficial')?.remove();document.body.classList.remove('intro-pendiente');});
 if(process.argv.includes('--live'))await page.evaluate(code=>AventuraDeveloper.activate(code),JSON.parse(require('node:fs').readFileSync('.local-developer/access.json','utf8')).code);
 for(const testing of [true,false])for(const arcade of [false,true])for(const [character,skin] of [['explorador','aren-bosque'],['mago','zafir-celestial'],['kairos','kairos-real']]){
  await page.evaluate(({testing,arcade,skin})=>{
   detenerRondaVersus();modoArcadeActivo=false;actualizarModoPruebas(testing);magoDesbloqueado=true;
   localStorage.setItem(CosmeticStore.key,JSON.stringify({coins:0,owned:testing?[]:[skin],equipped:{}}));
   document.querySelector('#trajePruebaAtacante').value='equipado';
   if(arcade)iniciarModoArcade();else iniciarPruebaVersusLocal();
  },{testing,arcade,skin});
  const before=await page.evaluate(()=>localStorage.getItem(CosmeticStore.key));
  await page.locator(`.tarjeta-personaje-versus[data-personaje="${character}"]`).click();
  assert(await page.locator('#elegirTrajeAntesDuelo').isVisible());
  assert.equal(await page.locator('#opcionesTrajesAntesDuelo button').count(),2);
  assert(await page.locator('#pantallaSeleccionPersonajeVersus').evaluate(e=>e.classList.contains('activa')));
  await page.locator('#opcionesTrajesAntesDuelo button').nth(1).click();
  assert.equal(await page.locator('#opcionesTrajesAntesDuelo button').nth(1).getAttribute('aria-pressed'),'true');
  assert(await page.locator('#elegirTrajeAntesDuelo').evaluate(e=>e.scrollWidth<=e.clientWidth));
  if(testing&&arcade&&character==='mago')await page.screenshot({path:`tools/.before-duel-${width}.png`});
  await page.locator('#confirmarTrajeAntesDuelo').click();
  await page.locator('#btnConfirmarPersonajeVersus').click();
  await page.evaluate(arcade=>{if(arcade)iniciarCombateArcade();else prepararDueloVersus({comenzarRonda:false});limpiarEntradaDueloVersus();},arcade);
  assert.match(await page.locator('#personajeVersusUno').getAttribute('src'),new RegExp(skin));
  if(testing)assert.equal(await page.evaluate(()=>localStorage.getItem(CosmeticStore.key)),before);
  await page.evaluate(()=>{detenerRondaVersus();abrirSeleccionPersonajeVersus();});
  await page.locator(`.tarjeta-personaje-versus[data-personaje="${character}"]`).click();
  await page.locator('#opcionesTrajesAntesDuelo button').first().click();
  await page.locator('#confirmarTrajeAntesDuelo').click();
  assert.equal(await page.evaluate(c=>trajePersonajeVersus(personajeVersusUno,c),character),null);
 }
 assert.deepEqual(errors,[]);console.log('PASS before-duel clicks: Versus + Arcade, free preview + owned costumes, all three heroes, new + original, width',width);await page.close();
}
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
