const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({headless:true,channel:'msedge'});try{
  const p=await b.newPage({viewport:{width:844,height:390},serviceWorkers:'block',ignoreHTTPSErrors:true});
  const live=process.argv.includes('--live');
  await p.goto(live?'https://aliasjohel.github.io/aventura-de-palabras-ga/?release=torre304':'http://127.0.0.1:8789',{waitUntil:'domcontentloaded',timeout:90000});
  const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.evaluate(()=>{document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');localStorage.setItem(CosmeticStore.key,JSON.stringify({coins:1000,owned:[],equipped:{}}));magoDesbloqueado=true;iniciarModoArcade();seleccionarPersonajeVersus('mago');});
  assert.equal(await p.locator('#selectorTrajesDuelo').isVisible(),false);
  for(const [character,id,name] of [['mago','zafir-celestial','Celestial'],['explorador','aren-bosque','Guardián del Bosque'],['kairos','kairos-real','Relojero Real']]){
    await p.evaluate(({character,id})=>{CosmeticStore.purchase(id);iniciarModoArcade();seleccionarPersonajeVersus(character);document.getElementById('trajePruebaAtacante').value='original';},{character,id});
    assert.equal(await p.locator('#opcionesTrajesDuelo button').count(),2);
    await p.locator('#opcionesTrajesDuelo button').filter({hasText:name}).click();
    await p.locator('#btnConfirmarPersonajeVersus').click();
    await p.evaluate(()=>{iniciarCombateArcade();limpiarEntradaDueloVersus();});
    assert.match(await p.locator('#personajeVersusUno').getAttribute('src'),new RegExp(id));
    await p.evaluate(()=>{detenerRondaVersus();pisoActualArcade=1;iniciarCombateArcade();limpiarEntradaDueloVersus();});
    assert.match(await p.locator('#personajeVersusUno').getAttribute('src'),new RegExp(id));
    await p.evaluate(()=>{detenerRondaVersus();abrirSeleccionPersonajeVersus();});
    await p.locator('#opcionesTrajesDuelo button').filter({hasText:'Original'}).click();
    await p.evaluate(()=>{prepararRecorridoArcade();iniciarCombateArcade();limpiarEntradaDueloVersus();});
    assert.doesNotMatch(await p.locator('#personajeVersusUno').getAttribute('src'),/\/trajes\//);
  }
  if(live)await p.evaluate(code=>AventuraDeveloper.activate(code),JSON.parse(require('node:fs').readFileSync('.local-developer/access.json','utf8')).code);
  await p.evaluate(()=>{detenerRondaVersus();localStorage.setItem(CosmeticStore.key,JSON.stringify({coins:0,owned:[],equipped:{}}));actualizarModoPruebas(true);iniciarModoArcade();seleccionarPersonajeVersus('mago');});
  assert.equal(await p.locator('#opcionesTrajesDuelo button').count(),2);
  const before=await p.evaluate(()=>localStorage.getItem(CosmeticStore.key));
  await p.locator('#opcionesTrajesDuelo button').filter({hasText:'Celestial'}).click();
  await p.evaluate(()=>{prepararRecorridoArcade();iniciarCombateArcade();limpiarEntradaDueloVersus();});
  assert.match(await p.locator('#personajeVersusUno').getAttribute('src'),/zafir-celestial/);
  assert.equal(await p.evaluate(()=>localStorage.getItem(CosmeticStore.key)),before);
  assert.deepEqual(errors,[]);console.log('PASS arcade: all purchased costumes, original choice, next floor, author preview without purchases');
}finally{await b.close();}})().catch(e=>{console.error(e.message);process.exitCode=1;});
