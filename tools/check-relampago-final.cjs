const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
  const browser=await chromium.launch({headless:true,channel:'msedge'});
  try {
    for(const [width,height] of [[844,390],[1365,900]]) {
      const page=await browser.newPage({viewport:{width,height},serviceWorkers:'block'});
      const errors=[];page.on('pageerror',e=>errors.push(e.message));
      await page.goto(process.env.GAME_URL||'http://127.0.0.1:8789',{waitUntil:'load',timeout:120000});
      await page.evaluate(()=>{document.querySelector('#introOficial')?.remove();document.body.classList.remove('intro-pendiente');mostrarPantalla(pantallaVersus);personajeJugadorVersus='kairos';personajeRivalVersus='mago';configurarPersonajesCombateVersus();});
      await page.waitForFunction(()=>personajeVersusUno.complete&&personajeVersusDos.complete);
      // Esperar el primer cuadro pintado del combate antes de medir animaciones.
      await page.screenshot({path:`tools/.relampago-escenario-${width}.png`});
      for(const winner of ['jugador','rival']) {
        await page.evaluate(winner=>{void mostrarAnuncioFinVersus('',true,winner);},winner);
        await page.waitForTimeout(310);
        const hit=await page.evaluate(winner=>{
          const target=winner==='jugador'?personajeVersusDos:personajeVersusUno;
          const other=winner==='jugador'?personajeVersusUno:personajeVersusDos;
          const rect=target.getBoundingClientRect(),overlay=anuncioFinVersus.getBoundingClientRect();
          const x=parseFloat(anuncioFinVersus.style.getPropertyValue('--rayo-x'))/100*overlay.width+overlay.left;
          return {target:target.classList.contains('impacto-relampago-final'),other:other.classList.contains('impacto-relampago-final'),x,left:rect.left,right:rect.right,visible:getComputedStyle(document.querySelector('#relampagoFinalVersus')).opacity};
        },winner);
        assert(hit.target&&!hit.other);assert(hit.x>=hit.left&&hit.x<=hit.right);assert(Number(hit.visible)>.9);
        await page.screenshot({path:`tools/.relampago-${width}-${winner}.png`});
        await page.evaluate(()=>ocultarAnuncioFinVersus());
        assert.equal(await page.locator('.impacto-relampago-final').count(),0);
      }
      await page.evaluate(()=>{void mostrarAnuncioFinVersus('',true,'rival');ocultarAnuncioFinVersus();});
      await page.waitForTimeout(220);assert.equal(await page.locator('.impacto-relampago-final').count(),0);
      await page.evaluate(()=>{resultadoRondaVersus.classList.add('oculto');void reproducirCierrePartidaVersus('rival','Prueba de relámpago','MAGIA');});
      await page.waitForFunction(()=>personajeVersusUno.classList.contains('impacto-relampago-final'));
      assert(!await page.locator('.anuncio-fin-versus-contenido').isVisible());
      await page.waitForFunction(()=>cinematicaFinalVersus.classList.contains('activa'));
      assert.equal(await page.locator('.impacto-relampago-final').count(),0);
      await page.evaluate(()=>completarCinematicaFinalVersus());
      await page.waitForFunction(()=>anuncioFinVersus.classList.contains('activo'));
      assert.match(await page.locator('#anuncioFinVersus').innerText(),/FIN DEL DUELO[\s\S]*MAGIA/);
      await page.waitForFunction(()=>!resultadoRondaVersus.classList.contains('oculto'));
      await page.emulateMedia({reducedMotion:'reduce'});
      await page.evaluate(()=>{void mostrarAnuncioFinVersus('',true);});
      assert.equal(await page.locator('.relampago-destello').evaluate(e=>getComputedStyle(e).display),'none');
      assert.deepEqual(errors,[]);
      console.log('PASS losing-side targeting, impact, cancellation, cinematic order and reduced motion',width);
      await page.close();
    }
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
