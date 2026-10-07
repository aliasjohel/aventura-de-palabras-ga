const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{
 const file=path.resolve(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\//,'')||'index.html');
 if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
 if(/\.(mp3|wav|ogg)$/.test(file))return res.end();
 fs.readFile(file,(error,data)=>{if(error){res.writeHead(404);return res.end();}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.webp':'image/webp'})[path.extname(file)]||'application/octet-stream');res.end(data);});
});
async function state(page){return page.evaluate(()=>({words:demoVersus.palabrasJugador,rivalWords:demoVersus.palabrasRival,letters:[...demoVersus.letrasJugador],lives:[demoVersus.vidasJugador,demoVersus.vidasRival],time:[demoVersus.tiempoJugador,demoVersus.tiempoRival],errors:demoVersus.erroresJugador,charge:demoVersus.cargaHabilidadJugador,saved:Object.fromEntries(Object.keys(localStorage).filter(key=>key!=='aventuraIdiomaV1').map(key=>[key,localStorage.getItem(key)]))}));}
async function layout(page,selector){
 const problems=await page.locator(selector).evaluate(root=>[...root.querySelectorAll('button,h2,.habilidad-versus-texto strong,.habilidad-versus-texto small')].filter(node=>{const box=node.getBoundingClientRect();return box.width&&box.height&&node.clientWidth&&node.scrollWidth>node.clientWidth+2;}).map(node=>node.id||node.className));
 assert.deepEqual(problems,[],selector+' horizontal overflow');
}
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const browser=await chromium.launch({headless:true,channel:'msedge'});
 try{
 const context=await browser.newContext({viewport:{width:844,height:390},locale:'es-AR',serviceWorkers:'block',reducedMotion:'reduce'});await context.route('https://**/*',route=>route.abort());
 const page=await context.newPage(),errors=[],missing=[];page.on('pageerror',error=>errors.push(error.message));page.on('console',message=>{if(/i18n: missing|original text retained/.test(message.text()))missing.push(message.text());});
 await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded'});await page.evaluate(()=>I18n.ready);
 await page.evaluate(()=>{document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');adaptadorSalasVersus={proveedor:'local',obtenerSala:()=>null};prepararDueloVersus({comenzarRonda:false});demoVersus.palabrasJugador[0]='FRUTAS';demoVersus.palabrasRival[0]='ANIMALES';demoVersus.tematicaParaJugador='frutas';demoVersus.tematicaParaRival='animales';demoVersus.letrasJugador=new Set(['F']);demoVersus.erroresJugador=1;demoVersus.cargaHabilidadJugador=8;actualizarProgresosVersus();actualizarVidasVersus();actualizarTiemposVersus();actualizarPanelHabilidadVersus(8);mostrarPantalla(pantallaVersus);mostrarEstadoProgresoVersus(document.getElementById('estadoProgresoUno'),'¡Acierto!','acierto');mostrarAvisoAvanceVersus('¡Palabra 2 superada! Atacaste al rival.');mostrarRevelacionPalabraVersus(revelacionPalabraVersusUno,'FRUTAS','frutas','temporizadorRevelacionJugador');});
 const before=await state(page);
 const labels={es:{ready:'¡Lista para usar!',correct:'¡Acierto!',attack:'¡Palabra 2 superada! Atacaste al rival.',final:'Juicio de los Cinco Cristales'},en:{ready:'Ready to use!',correct:'Correct!',attack:'Word 2 completed! You attacked the opponent.',final:'Judgment of the Five Crystals'},'pt-BR':{ready:'Pronta para usar!',correct:'Acertou!',attack:'Palavra 2 concluída! Você atacou o rival.',final:'Julgamento dos Cinco Cristais'}};
 for(const lang of ['en','pt-BR','es']){
  await page.evaluate(lang=>I18n.setPreference(lang),lang);
  assert.equal(await page.locator('#cargaHabilidadVersus').textContent(),labels[lang].ready);
  assert.equal(await page.locator('#estadoProgresoUno').textContent(),labels[lang].correct);
  assert.equal(await page.locator('#avisoAvanceVersus').textContent(),labels[lang].attack);
  assert.equal(await page.locator('#revelacionPalabraVersusUno strong').textContent(),'FRUTAS');
  assert.equal(await page.locator('#palabraVersusUno').textContent(),'F _ _ _ _ _');assert.deepEqual(await state(page),before);
 }
 // Both entry completion and skipping use the same start-of-round lifecycle.
 await page.evaluate(()=>{void iniciarEntradaDueloVersus();});
 await page.waitForFunction(()=>!preparandoImagenesCombate && demoVersus.entradaActiva);
 assert.equal(await page.locator('.versus-insignia').isVisible(),true);
 await page.locator('#btnSaltarEntradaVersus').click();
 await page.evaluate(()=>{clearInterval(demoVersus.intervaloTiempo);clearInterval(demoVersus.intervaloRival);});
 assert.equal(await page.locator('.versus-insignia').isVisible(),false);assert.equal(await page.locator('.versus-estado-combate strong').textContent(),'VS');
 // Online combat presentation is exercised with local server snapshots only.
 await page.evaluate(()=>{
  const me={userId:'fixture-player',theme:'frutas',wordIndex:0,completedWords:1,errors:1,lives:4,finished:false,progress:['F','_','_','_','_','_'],wordLength:6,abilityCharge:8,usedLetters:['F']};
  const opponent={...me,userId:'fixture-opponent',theme:'animales',completedWords:2,finished:true,finishReason:'lives'};
  globalThis.uiCombatSnapshot={status:'playing',startedAt:new Date(Date.now()-1000).toISOString(),deadlineAt:new Date(Date.now()+240000).toISOString(),me,opponent};
  renderizarPartidaOnline(uiCombatSnapshot);
 });
 const onlineState=await state(page),snapshotJson=await page.evaluate(()=>JSON.stringify(uiCombatSnapshot));
 for(const lang of ['en','pt-BR','es']){
  await page.evaluate(lang=>I18n.setPreference(lang),lang);
  assert.equal(await page.locator('#palabraVersusUno').textContent(),'F _ _ _ _ _');
  assert.equal(await page.locator('#palabraVersusDos').textContent(),{es:'SIN CORAZONES',en:'NO HEARTS LEFT','pt-BR':'SEM CORAÇÕES'}[lang]);
  assert.equal(await page.locator('#palabraVersusDos').getAttribute('aria-label'),{es:'Progreso rival: SIN CORAZONES',en:"Opponent's progress: NO HEARTS LEFT",'pt-BR':'Progresso do rival: SEM CORAÇÕES'}[lang]);
  assert.deepEqual(await state(page),onlineState);assert.equal(await page.evaluate(()=>JSON.stringify(uiCombatSnapshot)),snapshotJson);
 }
 await page.evaluate(async()=>{partidaOnlineVersus={matchId:'ui-only-match'};globalThis.uiRewardCalls=0;GameWallet={...GameWallet,sync:async()=>{uiRewardCalls++;return {reward:{amount:5}};}};await mostrarPremioVersus('ui-only-match');});
 const rewardState=await state(page);
 for(const lang of ['en','pt-BR','es']){await page.evaluate(lang=>I18n.setPreference(lang),lang);assert((await page.locator('#resultadoMonedasVersus').textContent()).includes({es:'+5 monedas',en:'+5 coins','pt-BR':'+5 moedas'}[lang]));assert.equal(await page.evaluate(()=>uiRewardCalls),1);assert.deepEqual(await state(page),rewardState);}
 await page.evaluate(()=>{partidaOnlineVersus=null;});
 // Open result details must update their nested reason without changing tower progress.
 await page.evaluate(()=>{modoArcadeActivo=true;rivalesTorreArcade=['mago','guardiana'];pisoCombateArcade=0;mostrarResultadoPartidaVersus('rival','Se agotó tu tiempo antes que el del rival.');});
 const afterResult=await state(page);
 for(const size of [{width:844,height:390},{width:740,height:320}]){await page.setViewportSize(size);for(const lang of ['es','en','pt-BR']){
  await page.evaluate(lang=>I18n.setPreference(lang),lang);await layout(page,'#resultadoRondaVersus');
  assert.equal(await page.locator('#btnRevanchaVersus').textContent(),{es:'Reintentar piso',en:'Retry floor','pt-BR':'Tentar andar novamente'}[lang]);
  assert.equal(await page.locator('#detalleResultadoVersus').textContent(),{es:'Se agotó tu tiempo antes que el del rival. Podés volver a intentar este piso.',en:"Your time ran out before the opponent's. You can retry this floor.",'pt-BR':'Seu tempo acabou antes do tempo do rival. Você pode tentar este andar novamente.'}[lang]);assert.deepEqual(await state(page),afterResult);
 }}
 await page.setViewportSize({width:844,height:390});
 await page.evaluate(()=>{resultadoRondaVersus.classList.add('oculto');modoArcadeActivo=false;dueloAventuraActivo={rival:'mago',etiqueta:'ENCUENTRO',resultado:''};mostrarResultadoPartidaVersus('jugador','¡Ataque final! El rival se quedó sin corazones.');});
 for(const lang of ['en','pt-BR','es']){await page.evaluate(lang=>I18n.setPreference(lang),lang);assert.equal(await page.locator('#btnRevanchaVersus').textContent(),{es:'Continuar aventura',en:'Continue adventure','pt-BR':'Continuar aventura'}[lang]);}
 // Actual embedded finale: title stays fixed through prison, shatter and victory.
 await page.evaluate(()=>{dueloAventuraActivo=null;resultadoRondaVersus.classList.add('oculto');void reproducirJuicioCristalesVersus('azrak');});
 const frame=page.frameLocator('.aren-union-final-integrado');await frame.locator('#escena.aren-solo').waitFor();
 for(const lang of ['en','pt-BR','es']){await page.evaluate(lang=>I18n.setPreference(lang),lang);assert.equal(await frame.locator('#titulo').textContent(),labels[lang].final);assert.equal(await frame.locator('#fase').isVisible(),false);}
 await frame.locator('#escena.encerrado').waitFor();assert.equal(await frame.locator('#titulo').textContent(),labels.es.final);await page.screenshot({path:path.join(root,'tools/i18n-2c-final.png')});
 await frame.locator('#escena.estallido').waitFor();assert.equal(await frame.locator('#titulo').textContent(),labels.es.final);
 await frame.locator('#escena.victoria').waitFor();assert.equal(await frame.locator('#titulo').textContent(),labels.es.final);await page.waitForFunction(()=>!document.querySelector('.aren-union-final-integrado'));
 assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);
 await page.evaluate(()=>I18n.setPreference('pt-BR'));await page.reload({waitUntil:'domcontentloaded'});await page.evaluate(()=>I18n.ready);assert.equal(await page.evaluate(()=>I18n.language),'pt-BR');
 console.log('PASS: es/en/pt-BR combat HUD, live notices, literal playable words, unchanged state/storage, simulated online HUD and reward without repeated calls, tower/adventure results, landscape layout, fixed finale title and completion, VS lifecycle, reload persistence');
 await context.close();
 }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
