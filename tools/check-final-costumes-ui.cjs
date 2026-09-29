const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{
  const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/\/$/,'/index.html'));
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  fs.readFile(file,(error,data)=>{if(error){res.writeHead(404).end();return;}
    res.setHeader('Content-Type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');res.end(data);});
});
const costumes=[['azrak','azrak-eclipse'],['kalamo','kalamo-astral']];
const scenes=[
  ['reproducirEclipseVioletaVersus','#victimaEclipseVersus','base'],
  ['reproducirTrampaSelvaticaVersus','#victimaTrampaVersus','base'],
  ['reproducirPrisionEsmeraldaVersus','#carnivoraDevorandoVersus','planta'],
  ['reproducirLlamadoMatriarcaVersus','.cinematica-rival-matriarca','base'],
  ['reproducirCaceriaLunaLlenaVersus','#victimaCaceriaVersus','base'],
  ['reproducirLegionUmbriaVersus','#victimaShadowVersus','base'],
  ['reproducirJuicioAmanecerVersus','#victimaGuardianAlbaVersus','base'],
  ['reproducirCeroAbsolutoVersus','#victimaNivorVersus','base'],
  ['reproducirEclipseInfernalVersus','#manoVictimaAzrakVersus','mano'],
  ['reproducirLibroPalabrasPerdidasVersus','#pantallaRotaKalamoVersus','vidrio'],
  ['reproducirSiglosEnUnSegundoVersus','#victimaKairosAncianaVersus','anciano']
];
(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const browser=await chromium.launch({headless:true,channel:'msedge'});
  try{
    for(const viewport of [{width:390,height:844},{width:844,height:390}]){
      const page=await browser.newPage({viewport,serviceWorkers:'block'}),errors=[];
      page.on('pageerror',error=>errors.push(error.message));
      await page.route('**/*',route=>new URL(route.request().url()).hostname==='127.0.0.1'?route.continue():route.abort());
      await page.goto(`http://127.0.0.1:${server.address().port}`,{waitUntil:'domcontentloaded'});
      await page.evaluate(()=>{
        Object.defineProperty(navigator,'onLine',{get:()=>false,configurable:true});
        document.querySelector('#introOficial')?.remove();document.body.classList.remove('intro-pendiente');
        document.querySelector('#btnTienda').click();
      });
      const before=await page.evaluate(()=>localStorage.getItem('aventuraTiendaV1'));
      for(const [,skin] of costumes){
        await page.locator(`[data-skin="${skin}"]`).click();
        assert.equal(await page.locator('.tienda-traje-poses button').count(),0);
        assert.match(await page.locator('#tiendaTrajeImagen').getAttribute('src'),new RegExp(skin+'-base'));
        await page.locator('#tiendaTrajeImagen').evaluate(img=>img.decode());
        if(viewport.width===844)await page.screenshot({path:path.join(root,`tools/.shop-${skin}.png`)});
      }
      assert(await page.locator('#tiendaMenu').evaluate(e=>e.scrollWidth<=e.clientWidth));
      assert.equal(await page.evaluate(()=>localStorage.getItem('aventuraTiendaV1')),before);
      await page.evaluate(()=>{modoPruebasActivo=true;document.querySelector('#btnTienda').click();});
      await page.locator('[data-pose="ataque"]').click();
      assert.match(await page.locator('#tiendaTrajeImagen').getAttribute('src'),/kalamo-astral-ataque/);
      await page.evaluate(()=>{modoPruebasActivo=false;document.querySelector('#btnTienda').click();});
      assert.equal(await page.locator('.tienda-traje-poses').isVisible(),false);
      assert.equal(await page.locator('.tienda-traje-poses button').count(),0);
      assert.match(await page.locator('#tiendaTrajeImagen').getAttribute('src'),/kalamo-astral-base/);
      await page.evaluate(()=>{
        CosmeticStore.earn(1000);
        for(const item of CosmeticStore.catalog.filter(item=>['azrak','kalamo'].includes(item.character))){CosmeticStore.purchase(item.id);CosmeticStore.equip(item.character,item.id);}
        document.querySelector('#tiendaMenu').close();mostrarPantalla(pantallaVersus);
      });
      const purchased=await page.evaluate(()=>localStorage.getItem('aventuraTiendaV1'));
      assert.equal(await page.evaluate(()=>CosmeticStore.read().coins),550);
      for(const [character,skin] of costumes){
        assert.match(await page.evaluate(c=>spriteTrajeVersus(personajeVersusUno,c,personajesVersus[c].base),character),new RegExp(skin+'-base'));
        for(const [fn,selector,pose] of scenes){
          await page.evaluate(({fn,character})=>{ladoGanadorCinematicaVersus='rival';void window[fn](character);clearTimeout(demoVersus.temporizadorCinematica);},{fn,character});
          assert.match(await page.locator(selector).getAttribute('src'),new RegExp(skin+'-'+pose),fn);
          await page.locator(selector).evaluate(img=>img.decode());
          if(viewport.width===844&&pose!=='base'){
            await page.evaluate(time=>document.getAnimations().forEach(a=>{a.pause();a.currentTime=time;}),pose==='vidrio'?8000:pose==='planta'?3000:pose==='anciano'?7000:4200);
            await page.screenshot({path:path.join(root,`tools/.collection-${skin}-${pose}.png`)});
          }
          await page.evaluate(()=>cancelarCinematicaFinalVersus());
        }
      }
      for(const [character,selector,pose,skin] of [
        ['azrak','.cinematica-azrak-invocacion','invocacion','azrak-eclipse'],
        ['azrak','.cinematica-azrak-victoria','final','azrak-eclipse'],
        ...['alcanza','extrae','prepara','lanza-explorador','golpea'].map(p=>['kalamo','.kalamo-final-'+p,p==='lanza-explorador'?'lanza':p,'kalamo-astral']),
        ['kalamo','.cinematica-kalamo-victoria','final','kalamo-astral']
      ]){
        await page.evaluate(c=>{ladoGanadorCinematicaVersus='jugador';prepararTrajesFinalVersus(c);},character);
        assert.match(await page.locator(selector).getAttribute('src'),new RegExp(skin+'-'+pose));
        await page.locator(selector).evaluate(img=>img.decode());
      }
      assert.equal(await page.evaluate(()=>localStorage.getItem('aventuraTiendaV1')),purchased);
      const routes=await page.evaluate(()=>[[srcAzrakAtaqueVersus,'azrak','ataque'],[srcKalamoAtaqueVersus,'kalamo','ataque'],[srcKalamoHabilidadVersus,'kalamo','habilidad']].map(([src,c,p])=>[spriteTrajeVersus(personajeVersusUno,c,src),p]));
      for(const [src,pose] of routes)assert(src.endsWith('-'+pose+'-v1.png'),src);
      await page.evaluate(()=>prepararTrajeEntradaKalamo());
      for(let n=1;n<=3;n++){
        const frame=page.locator('.entrada-tinta-uno .entrada-formacion-kalamo-'+n);
        assert.match(await frame.getAttribute('src'),new RegExp('kalamo-astral-formacion-'+n));
        await frame.evaluate(img=>img.decode());
        assert.doesNotMatch(await page.locator('.entrada-tinta-dos .entrada-formacion-kalamo-'+n).getAttribute('src'),/trajes/);
      }
      const arcade=await page.evaluate(()=>{modoArcadeActivo=true;try{return {player:spriteTrajeVersus(personajeVersusUno,'kalamo',srcKalamoAtaqueVersus),rival:spriteTrajeVersus(personajeVersusDos,'kalamo',srcKalamoAtaqueVersus)};}finally{modoArcadeActivo=false;}});
      assert.match(arcade.player,/kalamo-astral-ataque/);assert.doesNotMatch(arcade.rival,/trajes/);
      await page.evaluate(()=>{CosmeticStore.equip('kalamo',null);prepararTrajesFinalVersus('kalamo');prepararTrajeEntradaKalamo();});
      assert.doesNotMatch(await page.locator('.cinematica-kalamo-victoria').getAttribute('src'),/trajes/);
      for(const src of await page.locator('.entrada-formacion-kalamo').evaluateAll(imgs=>imgs.map(img=>img.src)))assert.doesNotMatch(src,/trajes/);
      assert.equal(await page.evaluate(()=>CosmeticStore.read().coins),550);
      const isolated=await page.evaluate(()=>{
        modoPruebasActivo=true;herramientasAutorDisponibles=true;btnConfirmarPersonajeVersus.disabled=false;
        seleccionarPersonajeVersus('mago');
        document.querySelector('#opcionesTrajesDuelo button:last-child').click();
        const mago=trajePersonajeVersus(personajeVersusUno,'mago');
        seleccionarPersonajeVersus('explorador');
        const explorador=trajePersonajeVersus(personajeVersusUno,'explorador');
        const control=document.getElementById('trajePruebaAtacante').value;
        seleccionarPersonajeVersus('mago');
        const retained=trajePersonajeVersus(personajeVersusUno,'mago');
        document.querySelector('#opcionesTrajesDuelo button:first-child').click();
        return {mago,explorador,control,retained,restored:trajePersonajeVersus(personajeVersusUno,'mago')};
      });
      assert.deepEqual(isolated,{mago:'zafir-celestial',explorador:null,control:'equipado',retained:'zafir-celestial',restored:null});
      assert.deepEqual(errors,[]);console.log('PASS final collection: base-only shop, 22 victim scenes, eight winner poses, combat, entrance, arcade, originals restored',viewport);
      await page.close();
    }
  }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
