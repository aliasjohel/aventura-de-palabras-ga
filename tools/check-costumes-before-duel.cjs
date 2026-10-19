const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+(new URL(req.url,'http://localhost').pathname==='/'?'/index.html':new URL(req.url,'http://localhost').pathname));if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}fs.readFile(file,(error,body)=>{if(error){res.writeHead(404);return res.end();}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg'})[path.extname(file)]||'application/octet-stream');if(/\.(html|js|css|json|txt|svg|webmanifest)$/.test(file))body=Buffer.from(body.toString().replace(/\r\n/g,'\n'));res.end(body);});});
(async()=>{await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const browser=await chromium.launch({headless:true,channel:'msedge'});try{
for(const width of [667,844]){
 const page=await browser.newPage({viewport:{width,height:390},serviceWorkers:'block'}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.argv.includes('--live')?'https://aliasjohel.github.io/aventura-de-palabras-ga/?release=trajes305':'http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded',timeout:90000});
 await page.evaluate(()=>I18n.ready);
 assert.deepEqual(errors,[], 'game must initialize before costume interaction');
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
  assert((await page.locator('#opcionesTrajesAntesDuelo button').count()) >= 2, 'original and the test costume must be selectable; later costumes may also exist');
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
}finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
