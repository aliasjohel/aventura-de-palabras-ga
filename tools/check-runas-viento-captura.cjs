const fs = require('node:fs'), path = require('node:path'), http = require('node:http'), assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = path.resolve(__dirname, '..');
const server = http.createServer((req,res) => {
  const pathname = new URL(req.url,'http://localhost').pathname;
  const file = path.join(root,pathname==='/'?'index.html':pathname);
  fs.readFile(file,(error,data) => { if(error){res.writeHead(404);res.end();return;}
    res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png'})[path.extname(file)]||'application/octet-stream');res.end(data); });
});
(async () => {
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  const browser = await chromium.launch({channel:'msedge',headless:true});
  try {
    const page = await browser.newPage({hasTouch:true});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:'+server.address().port);
    await page.locator('#introOficial').click();await page.waitForTimeout(800);
    await page.evaluate(async()=>{reiniciarEstadoAventura();escenarioActual=4;misionActual=1;await iniciarMisionAventura();abrirPruebaEspecialBosque('runas-azrak');});
    for(const [width,height] of [[390,844],[844,390],[1365,900]]) {
      await page.setViewportSize({width,height});
      await page.waitForTimeout(300);
      await page.locator('.runas-escena > img').evaluate(img=>img.decode());
      assert.ok(await page.locator('.runas-visor').isVisible());
      assert.equal(await page.locator('.runa-oculta').count(),5);
      await page.screenshot({path:path.join(root,`tools/.runas-${width}.png`)});
    }
    // Isolate completion callback to test arbitrary order, duplicate taps, zoom and disposal.
    await page.setViewportSize({width:390,height:844});
    await page.evaluate(()=>{cerrarPuzzleAzrak?.();window.runeWins=0;window.disposeRunes=AzrakWorld.mountPuzzle(puzzleCumbres,'runas-azrak',()=>window.runeWins++);});
    await page.getByRole('button',{name:'+ Ampliar',exact:true}).tap();
    assert.equal(await page.locator('.runas-escena').evaluate(el=>el.style.width),'150%');
    const viewport=page.locator('.runas-visor');
    await viewport.evaluate(el=>{el.scrollLeft=0;el.scrollTop=0;});
    const box=await viewport.boundingBox();
    await page.mouse.move(box.x+box.width*.8,box.y+box.height*.8);await page.mouse.down();
    await page.mouse.move(box.x+box.width*.3,box.y+box.height*.5,{steps:10});await page.mouse.up();
    assert.ok(await viewport.evaluate(el=>el.scrollLeft>0));
    assert.equal(await page.locator('.runa-oculta.encontrada').count(),0);
    const touch = await page.context().newCDPSession(page);
    const cy=box.y+box.height/2, cx=box.x+box.width/2;
    await touch.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{id:1,x:cx-35,y:cy},{id:2,x:cx+35,y:cy}]});
    await touch.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{id:1,x:cx-65,y:cy},{id:2,x:cx+65,y:cy}]});
    await touch.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
    assert.ok(await page.locator('.runas-escena').evaluate(el=>parseFloat(el.style.width)>150));
    assert.equal(await page.locator('.runa-oculta.encontrada').count(),0);
    await page.getByRole('button',{name:/Vista completa/}).tap();
    for(const index of [3,0,0,4,1]) {
      await page.locator('.runa-oculta').nth(index).tap();
    }
    assert.equal(await page.locator('.runa-oculta.encontrada').count(),4);
    assert.equal(await page.evaluate(()=>runeWins),0);
    await page.locator('.runa-oculta').nth(2).tap();await page.waitForTimeout(750);
    assert.equal(await page.evaluate(()=>runeWins),1);
    await page.evaluate(()=>{disposeRunes();window.disposeRunes=AzrakWorld.mountPuzzle(puzzleCumbres,'runas-azrak',()=>window.runeWins++);});
    // Finish then immediately close: the scheduled completion must never fire.
    await page.evaluate(()=>{document.querySelectorAll('.runa-oculta').forEach(b=>b.click());disposeRunes();});
    await page.waitForTimeout(750);assert.equal(await page.evaluate(()=>runeWins),1);
    await page.evaluate(()=>{cerrarPruebaEspecialBosque();window.beforeRunes=desafiosCompletados;abrirPruebaEspecialBosque('runas-azrak');document.querySelectorAll('.runa-oculta').forEach(b=>b.click());});
    await page.waitForFunction(()=>desafiosCompletados===window.beforeRunes+1);
    console.log('PASS runes: responsive scene, drag, pinch, zoom, any order, duplicates, completion, cancellation and adventure progress');

    await page.evaluate(async()=>{cerrarPruebaEspecialBosque();escenarioActual=2;misionActual=0;await iniciarMisionAventura();});
    for(let mission=0;mission<10;mission++) {
      await page.evaluate(m=>{misionActual=m;intentos=6;palabraSecreta='SOL';letrasElegidas=[];actualizarVidas();volverEstadoBaseExplorador();elegirLetra('X',document.createElement('button'));},mission);
      await page.waitForTimeout(1300);
      assert.ok(await page.locator('.peligro-palabras').isVisible(),`wind remains after reaction in mission ${mission+1}`);
      assert.equal(await page.locator('.peligro-etapa.activa').count(),1);
    }
    await page.evaluate(()=>{intentos=3;actualizarVidas();});
    assert.equal(await page.locator('.viento-polvo').count(),84);
    for(const [width,height] of [[390,844],[844,390],[1365,900]]) {
      await page.setViewportSize({width,height});await page.waitForTimeout(500);
      await page.locator('.escenario').first().screenshot({path:path.join(root,`tools/.viento-nuevo-${width}.png`)});
    }
    await page.emulateMedia({reducedMotion:'reduce'});
    assert.equal(await page.locator('.viento-polvo').first().evaluate(el=>getComputedStyle(el).animationName),'none');
    await page.emulateMedia({reducedMotion:'no-preference'});
    console.log('PASS wind: all ten mission idle poses after errors, dust and reduced motion');

    await page.setViewportSize({width:844,height:390});
    await page.evaluate(()=>{mostrarPantalla(pantallaVersus);});
    for(const victim of ['kairos','guardian_alba','t_shadow','kairos','mago']) {
      await page.evaluate(v=>{void reproducirEclipseInfernalVersus(v);},victim);
      await page.locator('#manoVictimaAzrakVersus').evaluate(img=>img.decode());
      await page.evaluate(()=>{cinematicaFinalVersus.getAnimations({subtree:true}).forEach(a=>{a.pause();a.currentTime=4300;});});
      const state=await page.locator('#manoVictimaAzrakVersus').evaluate(el=>({src:el.getAttribute('src'),opacity:getComputedStyle(el).opacity,display:getComputedStyle(el).display,naturalWidth:el.naturalWidth,scene:el.classList.contains('captura-kairos-escena')}));
      assert.ok(state.src.includes('mano-abismo-atrapa-'));assert.equal(state.opacity,'1');assert.notEqual(state.display,'none');assert.ok(state.naturalWidth>0);assert.equal(state.scene,victim==='kairos');
      await page.screenshot({path:path.join(root,`tools/.captura-versus-${victim}.png`)});
      await page.evaluate(()=>cancelarCinematicaFinalVersus());
    }
    assert.deepEqual(errors,[]);console.log('PASS Versus: Kairos, Lume and Shadow captures load and appear at the correct time; switching victims resets scene styling');
  } finally { await browser.close();server.close(); }
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
