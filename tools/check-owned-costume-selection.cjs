const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
  const browser=await chromium.launch({headless:true,channel:'msedge'});
  try {
    for(const publicSite of [false,true]) {
      const context=await browser.newContext({viewport:{width:844,height:390},serviceWorkers:'block'});
      if(publicSite) await context.route('http://game.test/**',async route=>{
        const url=new URL(route.request().url());
        const response=await context.request.get('http://127.0.0.1:8789'+url.pathname+url.search);
        await route.fulfill({response});
      });
      const p=await context.newPage(),errors=[];
      p.on('pageerror',e=>errors.push(e.message));
      await p.goto(publicSite?'http://game.test/':'http://127.0.0.1:8789/',{waitUntil:'load'});
      await p.evaluate(()=>{
        document.querySelector('#introOficial')?.remove();document.body.classList.remove('intro-pendiente');
        localStorage.setItem(CosmeticStore.key,JSON.stringify({coins:1000,owned:[],equipped:{}}));
        document.getElementById('btnTienda').click();
      });
      assert.equal(await p.locator('#probarTrajeGratis').count(),0);
      assert.equal(await p.locator('#tiendaTrajePoses').count(),0);
      await p.locator('[data-skin="zafir-celestial"]').click();
      assert.match(await p.locator('#tiendaTrajeImagen').getAttribute('src'),/base-v1/);
      await p.locator('#comprarTraje').click();
      assert.equal(await p.evaluate(()=>CosmeticStore.read().coins),750);
      await p.evaluate(()=>{
        document.getElementById('tiendaMenu').close();magoDesbloqueado=true;modoArcadeActivo=true;
        abrirSeleccionPersonajeVersus();seleccionarPersonajeVersus('mago');
      });
      assert.equal(await p.locator('#opcionesTrajesDuelo button').count(),2);
      await p.locator('#opcionesTrajesDuelo button').filter({hasText:'Celestial'}).click();
      assert.equal(await p.evaluate(()=>CosmeticStore.read().equipped.mago),'zafir-celestial');
      await p.locator('#opcionesTrajesDuelo button').filter({hasText:'Original'}).click();
      assert.equal(await p.evaluate(()=>CosmeticStore.read().equipped.mago),undefined);
      await p.evaluate(()=>seleccionarPersonajeVersus('kairos'));
      assert.equal(await p.locator('#selectorTrajesDuelo').isVisible(),false);
      const randomSelection=await p.evaluate(()=>{
        const available=tarjetasPersonajesVersus.filter(t=>!t.disabled&&personajeDisponibleVersus(t.dataset.personaje)).map(t=>t.dataset.personaje);
        const seen=[],originalRandom=Math.random;
        try {for(let i=0;i<available.length;i++){
          Math.random=()=>(i+.5)/available.length;
          document.getElementById('btnPersonajeAleatorio').click();seen.push(personajeJugadorVersus);
        }} finally {Math.random=originalRandom;}
        return {available,seen,selectionOpen:pantallaSeleccionPersonajeVersus.classList.contains('activa')};
      });
      assert.deepEqual(randomSelection.seen,randomSelection.available);
      assert.equal(randomSelection.selectionOpen,true);
      await p.evaluate(()=>{seleccionarPersonajeVersus('mago');btnConfirmarPersonajeVersus.disabled=true;actualizarSelectorTrajeVersus();});
      assert.equal(await p.locator('#opcionesTrajesDuelo button:disabled').count(),2);
      assert.equal(await p.locator('#btnPersonajeAleatorio').isDisabled(),true);
      await p.evaluate(()=>actualizarModoPruebas(true));
      assert.equal(await p.evaluate(()=>modoPruebasActivo),!publicSite);
      if(publicSite) {
        assert.equal(await p.locator('#btnAbrirPruebasMenu').isVisible(),false);
        assert.match(await p.evaluate(()=>{try{AventuraShop.tryOn('mago');return '';}catch(e){return e.message;}}),/acceso de desarrollador/);
      }
      assert.deepEqual(errors,[]);
      console.log(publicSite?'Public player: shop, ownership, selection lock and author gate OK':'Local author: shop, ownership, costume selection and testing OK');
      await context.close();
    }
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
