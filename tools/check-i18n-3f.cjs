const fs=require('fs'),http=require('http'),path=require('path'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const offline=process.argv.includes('--offline');
const server=http.createServer((req,res)=>{const f=path.join(root,new URL(req.url,'http://localhost').pathname);fs.readFile(f.endsWith(path.sep)?f+'index.html':f,(err,data)=>{if(err){res.statusCode=404;return res.end();}res.setHeader('Content-Type',({'.js':'text/javascript','.html':'text/html','.css':'text/css','.json':'application/json'})[path.extname(f)]||'application/octet-stream');if(offline&&path.basename(f)==='sw.js')data=Buffer.from(data.toString()+"\nCORE_ASSETS.splice(0,CORE_ASSETS.length,...CORE_ASSETS.filter(p=>!p.startsWith('./assets/')));self.addEventListener('install',e=>e.waitUntil(self.skipWaiting()));");if(/\.(js|html|css|json|txt|svg|webmanifest)$/.test(f))data=Buffer.from(data.toString().replace(/\r\n/g,'\n'));res.end(data);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const context=await browser.newContext({viewport:{width:844,height:390},reducedMotion:'reduce',serviceWorkers:offline?'allow':'block',locale:'es-AR'});await context.route('https://**/*',r=>r.abort());
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(20000);
 const url='http://127.0.0.1:'+server.address().port+'/index.html';await page.goto(url);await page.evaluate(()=>I18n.ready);
 if(offline){await page.waitForFunction(async()=>{const r=await navigator.serviceWorker.getRegistration();return r?.active&&!!await caches.match(new URL('./js/lessons-i18n.js',location.href));},null,{timeout:60000});await page.reload();await page.evaluate(()=>I18n.ready);await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);await page.reload();await page.evaluate(()=>I18n.ready);}
 const save=await page.evaluate(()=>localStorage.getItem('progresoAventuraGA'));const snapshots={};
 const types=['ramas','lobos','vientos','oasis','espejos','sopa-celeste','campanas-celestes','sellos-aeralis','corrientes-hielo','laberinto-hielo','corazon-termico','runas-azrak','sellos-azrak','eclipse-azrak'];
 const titles={en:['Open a path beside the fallen tree','Remember the order of the eyes','Guide the energy to the core','Find the real oasis','Guide the beam to the door','Find the hidden words','Follow the bell hiding the spark',"Decipher Aeralis's seals",'Complete the three current networks','Guide the egg through the maze','Balance the three cores','The rune bridge','The four oaths','Light among the shadows'],
 'pt-BR':['Abra uma passagem junto à árvore caída','Lembre a ordem dos olhares','Leve a energia ao núcleo','Encontre o oásis verdadeiro','Conduza o raio até a porta','Encontre as palavras escondidas','Siga o sino que esconde a faísca','Decifre os selos de Aeralis','Supere as três redes de correntes','Guie o ovo pelo labirinto','Equilibre os três núcleos','A ponte das runas','Os quatro juramentos','Luz entre as sombras']};
 for(const language of ['es','en','pt-BR']){
  await page.evaluate(async language=>{document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');mostrarPantalla(pantallaMenu);await I18n.setPreference(language);mostrarPantalla(pantallaJuego);},language);
  for(const [n,type] of types.entries()){
   await page.evaluate(type=>{pruebaBosqueEnModoDemo=true;abrirPruebaEspecialBosque(type);},type);
   await page.evaluate(()=>new Promise(requestAnimationFrame));
   if(language!=='es')assert.equal(await page.locator('#tituloPruebaBosque').textContent(),titles[language][n],language+':'+type);
   assert.equal(await page.evaluate(()=>I18n.languageLocked),true);
   if(language==='en')snapshots[type]=await page.evaluate(()=>({text:modalPruebaBosque.innerText,labels:[...modalPruebaBosque.querySelectorAll('[aria-label]')].map(n=>n.getAttribute('aria-label')).filter((s,i,a)=>a.findIndex(t=>t.replace(/\d/g,'')===s.replace(/\d/g,''))===i)}));
   if(type==='ramas')assert.equal(await page.locator('.espacio-vacio-ramas').getAttribute('data-puzzle-label'),language==='en'?'HERE':language==='es'?'ACÁ':'AQUI');
   if(language==='en'&&type==='ramas')assert(await page.evaluate(()=>[...tableroRamasDeslizante.querySelectorAll('button')].every(b=>!b.getAttribute('aria-label').includes('se puede mover'))));
   if(language==='en'&&type==='vientos')assert(await page.evaluate(()=>[...tableroVientosDesierto.querySelectorAll('button')].every(b=>!/(energía|ciego|hacia)/.test(b.getAttribute('aria-label')))&&tableroVientosDesierto.querySelector('.canal-origen').dataset.puzzleLabel==='☀ INLET'));
   if(type==='oasis'&&language==='en'){assert((await page.locator('#pistaOasisDesierto').textContent()).includes('palm'));assert(!(await page.locator('#pistaOasisDesierto').textContent()).includes('palmeras'));}
   if(type==='sopa-celeste'){
    const data=await page.evaluate(()=>obtenerDatosSopaCumbres());
    if(language==='pt-BR'&&!offline){await page.setViewportSize({width:320,height:740});await page.screenshot({path:require('os').tmpdir()+'/aventura-3f-search.png'});assert(await page.evaluate(()=>puzzleCumbres.querySelector('.tablero-sopa-cumbres').getBoundingClientRect().width<=innerWidth));await page.setViewportSize({width:844,height:390});}assert.equal(data.letters.length,100);
    assert((await page.locator('#instruccionPruebaBosque').textContent()).includes(data.words[0].palabra));
    const letters=await page.locator('.letra-sopa-cumbres').allTextContents();assert.equal(letters.join(''),data.letters);
    // Select all three solutions with the same endpoint controls used by keyboard users.
    for(const word of data.words){await page.evaluate(indices=>{seleccionarSopaCumbresConTeclado(indices[0]);seleccionarSopaCumbresConTeclado(indices.at(-1));},word.indices);}
    assert.equal(await page.evaluate(()=>palabrasEncontradasSopaCumbres.size),3);
    await page.waitForFunction(()=>!pruebaEspecialBosqueActiva);continue;
   }
   if(type==='sellos-aeralis'){
    const rounds=await page.evaluate(()=>obtenerRondasSellosAeralis());
    for(let r=0;r<rounds.length;r++){
     await page.waitForFunction(r=>rondaSellosCumbres===r&&!puzzleCumbres.classList.contains('sello-rompiendose'),r);
     assert.equal(await page.locator('.anillos-sellos-aeralis button').count(),rounds[r].palabra.length);
     const solved=await page.evaluate(()=>{const round=obtenerRondasSellosAeralis()[rondaSellosCumbres];round.opciones.forEach((options,i)=>{let turns=0;while(botonesPuzzleCumbres[i].querySelector('strong').textContent!==round.palabra[i]&&turns++<5)botonesPuzzleCumbres[i].click();});return botonesPuzzleCumbres.map(b=>b.querySelector('strong').textContent).join('');});assert.equal(solved,rounds[r].palabra);
     await page.evaluate(()=>puzzleCumbres.querySelector('.btn-comprobar-sello-aeralis').click());
    }
    await page.waitForFunction(()=>!pruebaEspecialBosqueActiva);continue;
   }
   if(type==='runas-azrak'&&!offline&&language!=='es'){await page.evaluate(()=>[...puzzleCumbres.querySelectorAll('button')].find(b=>b.textContent===I18n.t('adventure.lessons.messages.p192')).click());assert(!(await page.locator('.azrak-puzzle-status').textContent()).includes('Entre las piedras'));}
   // Preference changes must not change a board halfway through a trial.
   if(type==='corazon-termico'){
    const before=await page.evaluate(()=>({state:[...estadosCorazonTermico],label:instruccionPruebaBosque.textContent}));await page.evaluate(()=>I18n.setPreference('en'));
    assert.deepEqual(await page.evaluate(()=>({state:[...estadosCorazonTermico],label:instruccionPruebaBosque.textContent})),before);assert.equal(await page.evaluate(()=>I18n.language),language);
   }
   await page.evaluate(()=>cerrarPruebaEspecialBosque());
   if(type==='corazon-termico')await page.evaluate(language=>I18n.setPreference(language),language);
  }
  await page.evaluate(()=>{void abrirRompecabezasMuralSantuario();});await page.evaluate(()=>new Promise(requestAnimationFrame));
  assert.equal(await page.locator('.pieza-mural-santuario').count(),16);if(language==='en')assert.equal(await page.locator('#tituloMuralSantuario').textContent(),'Rebuild the dragon mural');
  await page.evaluate(()=>{bandejaMuralSantuario.querySelector('.pieza-mural-santuario').click();mostrarAyudaMuralSantuario();cerrarRompecabezasMuralSantuario(false);mostrarPantalla(pantallaMenu);btnTutorialVersus.click();});
  assert.equal(await page.evaluate(()=>contextoPalabrasCombate.language),language);
  assert(await page.locator('#modalTutorialVersus').isVisible());
  for(let step=0;step<8;step++){
   assert.equal(await page.evaluate(()=>pasoActualTutorialVersus),step);
   const actions=await page.evaluate(()=>[...tutorialCombateVersus.letras]);
   if(step===4)await page.evaluate(()=>btnHabilidadVersus.click());
   else if(step===5)await page.evaluate(()=>btnSiguienteTutorialVersus.click());
   else for(const letter of actions){await page.evaluate(letter=>{const b=[...tecladoVersus.querySelectorAll('button')].find(b=>b.textContent===letter);if(!b||b.disabled)throw Error('Tutorial requested an unavailable letter '+letter);b.click();},letter);}
   if(step===7){await page.waitForFunction(()=>!cinematicaFinalVersus.classList.contains('oculto'));await page.evaluate(()=>btnSaltarCinematicaVersus.click());}
   await page.waitForFunction(()=>tutorialCombateVersus.completado);
   if(step===2){const words=await page.evaluate(()=>[...demoVersus.palabrasJugador]);await page.evaluate(language=>I18n.setPreference(language==='en'?'pt-BR':'en'),language);assert.equal(await page.evaluate(()=>I18n.language),language);assert.deepEqual(await page.evaluate(()=>[...demoVersus.palabrasJugador]),words);}
   if(step===3)assert.equal(await page.evaluate(()=>demoVersus.cargaHabilidadJugador),8);
   if(step===0&&!offline&&language==='en')await page.screenshot({path:require('os').tmpdir()+'/aventura-3f-tutorial.png'});
   await page.evaluate(()=>btnSiguienteTutorialVersus.click());
  }
  assert.equal(await page.evaluate(()=>tutorialCombateVersus.activo),false);
  console.log('PASS '+language+': 14 puzzle screens, word search and seals solved, mural, language lock, eight real tutorial steps and victory');
 }
 assert.equal(await page.evaluate(()=>localStorage.getItem('progresoAventuraGA')),save);assert.deepEqual(errors,[]);
 if(!offline)fs.writeFileSync(require('os').tmpdir()+'/aventura-3f-puzzle-labels.json',JSON.stringify(snapshots,null,2));
 console.log('PASS 3F '+(offline?'offline':'browser')+': progress unchanged; tutorial, words, instructions and puzzle controls in three languages');
 }finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
