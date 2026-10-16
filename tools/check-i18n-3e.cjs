const fs=require('fs'),http=require('http'),path=require('path'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const offline=process.argv.includes('--offline');
const server=http.createServer((req,res)=>{const f=path.join(root,new URL(req.url,'http://localhost').pathname);fs.readFile(f.endsWith(path.sep)?f+'index.html':f,(err,data)=>{if(err){res.statusCode=404;return res.end();}res.setHeader('Content-Type',({'.js':'text/javascript','.html':'text/html','.css':'text/css','.json':'application/json'})[path.extname(f)]||'application/octet-stream');if(offline&&path.basename(f)==='sw.js')data=Buffer.from(data.toString()+"\nCORE_ASSETS.splice(0,CORE_ASSETS.length,...CORE_ASSETS.filter(p=>!p.startsWith('./assets/')));self.addEventListener('install',e=>e.waitUntil(self.skipWaiting()));");if(/\.(js|html|css|json|txt|svg|webmanifest)$/.test(f))data=Buffer.from(data.toString().replace(/\r\n/g,'\n'));res.end(data);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const context=await browser.newContext({viewport:{width:844,height:390},serviceWorkers:offline?'allow':'block',locale:'es-AR'});await context.route('https://**/*',r=>r.abort());
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));const url='http://127.0.0.1:'+server.address().port+'/index.html';await page.goto(url);await page.evaluate(()=>I18n.ready);
 if(offline){await page.waitForFunction(async()=>{const r=await navigator.serviceWorker.getRegistration();return r?.active&&!!await caches.match(new URL('./js/word-banks-versus.js',location.href));},null,{timeout:60000});await page.reload();await page.evaluate(()=>I18n.ready);await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);await page.reload();await page.evaluate(()=>I18n.ready);}
 const save=await page.evaluate(()=>localStorage.getItem('progresoAventuraGA'));
 for(const lang of ['es','en','pt-BR']){
  await page.evaluate(async lang=>{document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');mostrarPantalla(pantallaMenu);await I18n.setPreference(lang);adaptadorSalasVersus=adaptadorLocalSalasVersus;modoArcadeActivo=false;abrirPreparacionVersus();},lang);
  assert.equal(await page.evaluate(()=>contextoPalabrasCombate.language),lang);
  assert.equal(await page.locator('#tituloPreparacionVersus').textContent(),lang==='en'?'Prepare your secret words':lang==='pt-BR'?'Prepare suas palavras secretas':'Prepará tus palabras secretas');
  for(const topic of ['paises','frutas','animales','comidas','profesiones','deportes','transportes','objetos','naturaleza','nombres']){
   const selected=await page.evaluate(topic=>{tematicaVersus.value=topic;tematicaVersus.dispatchEvent(new Event('change'));btnPalabrasAleatoriasVersus.click();return {words:inputsPalabrasVersus.map(n=>n.value),valid:validarPreparacionVersus(true),inBank:inputsPalabrasVersus.every(n=>obtenerBancosPalabrasVersus()[topic].includes(n.value))};},topic);
   assert(selected.valid&&selected.inBank,lang+':'+topic);assert.equal(new Set(selected.words).size,5);
   const next=await page.evaluate(()=>{btnsFijarPalabrasVersus[0].click();btnPalabrasAleatoriasVersus.click();return inputsPalabrasVersus.map(n=>n.value);});assert.equal(next[0],selected.words[0]);assert(next.slice(1).every(w=>!selected.words.includes(w)));
  }
  await page.evaluate(()=>{tematicaVersus.value='animales';tematicaVersus.dispatchEvent(new Event('change'));btnPalabrasAleatoriasVersus.click();inputsPalabrasVersus[1].value=inputsPalabrasVersus[0].value;inputsPalabrasVersus[1].dispatchEvent(new Event('input'));});assert(await page.evaluate(()=>btnConfirmarPalabrasVersus.disabled));
  const error=await page.locator('.error-palabra-versus').first().textContent();assert.equal(error,lang==='en'?'This word is repeated.':lang==='es'?'Esta palabra está repetida.':'Esta palavra está repetida.');
  if(lang==='pt-BR'){
   await page.evaluate(()=>{tematicaVersus.value='frutas';tematicaVersus.dispatchEvent(new Event('change'));btnPalabrasAleatoriasVersus.click();for(let i=0;i<5;i++){inputsPalabrasVersus[i].value=['AÇAÍ','ACAI','MAÇÃ','LIMÃO','ROMÃ'][i];inputsPalabrasVersus[i].dispatchEvent(new Event('input'));}});assert(await page.evaluate(()=>btnConfirmarPalabrasVersus.disabled));
  }
  await page.evaluate(()=>{tematicaVersus.value='animales';tematicaVersus.dispatchEvent(new Event('change'));btnPalabrasAleatoriasVersus.click();});
  if(lang==='pt-BR'&&!offline)await page.screenshot({path:require('os').tmpdir()+'/aventura-3e-preparation.png'});
  const before=await page.evaluate(()=>inputsPalabrasVersus.map(n=>n.value));await page.evaluate(()=>I18n.setPreference('en'));assert.equal(await page.evaluate(()=>I18n.language),lang);assert.deepEqual(await page.evaluate(()=>inputsPalabrasVersus.map(n=>n.value)),before);
  await page.evaluate(()=>formPreparacionVersus.requestSubmit());
  await page.waitForFunction(()=>pantallaVersus.classList.contains('activa'));await page.evaluate(()=>detenerRondaVersus());
  assert.equal(await page.evaluate(()=>contextoPalabrasCombate.language),lang);assert.equal(await page.locator('#tecladoVersus button').count(),lang==='es'?27:26);
  assert.equal(await page.evaluate(()=>miniTecladoRivalVersus.querySelectorAll('[data-letra]').length),lang==='es'?27:26);
  assert(await page.evaluate(()=>demoVersus.palabrasJugador.every(w=>obtenerBancosPalabrasVersus()[demoVersus.tematicaParaJugador].includes(w))));
  assert(await page.evaluate(()=>{const previous=[...demoVersus.palabrasJugador];const extra=agregarPalabraRecuperacionVersus('jugador');return extra&&!previous.some(w=>obtenerClavePalabraVersus(w)===obtenerClavePalabraVersus(extra))&&obtenerBancosPalabrasVersus()[demoVersus.tematicaParaJugador].includes(extra);}));
  if(lang==='pt-BR'){assert(await page.evaluate(()=>{demoVersus.palabrasJugador[0]='AÇAÍ';demoVersus.letrasJugador=new Set(['A','C','I']);actualizarProgresosVersus();return motorDePalabras().palabraCompletada('AÇAÍ',['A','C','I'])&&motorDePalabras().obtenerProgreso('AÇAÍ',['A','C','I']).join('')==='AÇAÍ';}));}
  const ai=await page.evaluate(()=>{
    const word=contextoPalabrasCombate.language==='pt-BR'?'AÇAÍ':contextoPalabrasCombate.language==='en'?'APPLE':'ÁRBOL';
    demoVersus.palabrasRival[0]=word;demoVersus.indiceRival=0;demoVersus.letrasRival.clear();demoVersus.erroresRival=0;
    demoVersus.finalizadoRival=false;demoVersus.partidaFinalizada=false;demoVersus.cargaHabilidadRival=0;demoVersus.efectoRival='';demoVersus.efectoRivalHasta=0;
    const hint=obtenerPistaLupaVersus(word,new Set());demoVersus.pistaLupaRival=hint;jugarTurnoRivalVersus();
    const hit=demoVersus.letrasRival.has(hint)&&demoVersus.erroresRival===0;
    const forced=aplicarFalloForzadoRivalLocalVersus();
    const miss=Boolean(forced&&filasTeclado.flat().includes(forced)&&!obtenerClavePalabraVersus(word).includes(forced)&&demoVersus.erroresRival===1);
    demoVersus.efectoRival='roots';demoVersus.efectoRivalHasta=Date.now()+10000;const count=demoVersus.letrasRival.size;jugarTurnoRivalVersus();const blocked=count===demoVersus.letrasRival.size;
    demoVersus.efectoRival='';demoVersus.efectoRivalHasta=0;
    return {hit,miss,blocked,theft:elegirTeclasRobadasKalamo().every(l=>filasTeclado.flat().includes(l))};
  });assert.deepEqual(ai,{hit:true,miss:true,blocked:true,theft:true});
  // Real Tower entry selects both banks before preparing the combat.
  await page.evaluate(async lang=>{mostrarPantalla(pantallaMenu);await I18n.setPreference(lang);modoArcadeActivo=true;rivalesTorreArcade=['mago','guardiana'];pisoActualArcade=0;iniciarCombateArcade();detenerRondaVersus();},lang);
  assert.equal(await page.evaluate(()=>contextoPalabrasCombate.language),lang);assert(await page.evaluate(()=>demoVersus.palabrasRival.every(w=>obtenerBancosPalabrasVersus()[tematicaVersus.value].includes(w))));
  await page.evaluate(()=>{detenerRondaVersus();mostrarPantalla(pantallaMenu);modoArcadeActivo=false;});
 }
 for(const lang of ['en','pt-BR']){
  await page.evaluate(async lang=>{mostrarPantalla(pantallaMenu);await I18n.setPreference(lang);iniciarDueloAventura('mago_desierto');detenerRondaVersus();},lang);
  assert.equal(await page.evaluate(()=>contextoPalabrasCombate.language),lang);assert(await page.evaluate(()=>demoVersus.palabrasJugador.every(w=>obtenerBancosPalabrasVersus()[demoVersus.tematicaParaJugador].includes(w))&&demoVersus.palabrasRival.every(w=>obtenerBancosPalabrasVersus()[demoVersus.tematicaParaRival].includes(w))));
  await page.evaluate(()=>{detenerRondaVersus();dueloAventuraActivo=null;mostrarPantalla(pantallaMenu);});
 }
 assert.equal(await page.evaluate(()=>localStorage.getItem('progresoAventuraGA')),save);
 await page.evaluate(async()=>{await I18n.setPreference('pt-BR');iniciarContextoPalabras('online',true);});assert.equal(await page.evaluate(()=>contextoPalabrasCombate.language),'es');assert.equal(await page.locator('#tecladoVersus button').count(),27);
 await page.evaluate(()=>{mostrarPantalla(pantallaMenu);comenzarTutorialVersus();});assert.equal(await page.evaluate(()=>contextoPalabrasCombate.language),'es');await page.evaluate(()=>cerrarTutorialVersus());
 if(!offline){const fallback=await browser.newContext({serviceWorkers:'block',locale:'en-US'});await fallback.route('https://**/*',r=>r.abort());await fallback.route('**/js/word-banks-versus.js*',r=>r.abort());const fp=await fallback.newPage();await fp.goto(url);await fp.evaluate(()=>I18n.ready);await fp.evaluate(()=>iniciarContextoPalabras('tower'));assert.equal(await fp.evaluate(()=>contextoPalabrasCombate.language),'es');assert.equal(await fp.evaluate(()=>filasTeclado.flat().length),27);await fallback.close();}
 assert.deepEqual(errors,[]);console.log('PASS 3E '+(offline?'offline':'browser')+': 3 languages, 10 preparation topics, pinned/random/duplicate words, both combat banks, recovery, Portuguese display, keyboard rebuilds, deferred language, Tower entry, save unchanged, Spanish online/tutorial and module fallback');
 }finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
