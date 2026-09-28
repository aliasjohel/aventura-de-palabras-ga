const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{
  const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/\/$/,'/index.html'));
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  fs.readFile(file,(error,data)=>{if(error){res.writeHead(404).end();return;}
    res.setHeader('Content-Type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');res.end(data);});
});
const costumes=[['guardiana','guardiana-otono'],['guardian_alba','alba-lunar'],['t_shadow','shadow-carmesi']];
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
        const poses=await page.locator('.tienda-traje-poses button').evaluateAll(buttons=>buttons.map(b=>b.dataset.pose));
        for(const pose of poses){
          await page.locator(`[data-pose="${pose}"]`).click();
          assert.match(await page.locator('#tiendaTrajeImagen').getAttribute('src'),new RegExp(skin+'-'+pose));
          await page.locator('#tiendaTrajeImagen').evaluate(img=>img.decode());
        }
      }
      assert(await page.locator('#tiendaMenu').evaluate(e=>e.scrollWidth<=e.clientWidth));
      assert.equal(await page.evaluate(()=>localStorage.getItem('aventuraTiendaV1')),before);
      await page.evaluate(()=>{
        CosmeticStore.earn(1000);
        for(const item of CosmeticStore.catalog.filter(item=>['guardiana','guardian_alba','t_shadow'].includes(item.character))){CosmeticStore.purchase(item.id);CosmeticStore.equip(item.character,item.id);}
        document.querySelector('#tiendaMenu').close();mostrarPantalla(pantallaVersus);
      });
      const purchased=await page.evaluate(()=>localStorage.getItem('aventuraTiendaV1'));
      assert.equal(await page.evaluate(()=>CosmeticStore.read().coins),400);
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
        ['guardiana','.cinematica-guardiana-victoria','final','guardiana-otono'],
        ['guardian_alba','.cinematica-alba-ataque','carga','alba-lunar'],
        ['t_shadow','.cinematica-shadow-clon','ataque','shadow-carmesi']
      ]){
        await page.evaluate(c=>{ladoGanadorCinematicaVersus='jugador';prepararTrajesFinalVersus(c);},character);
        const images=await page.locator(selector).evaluateAll(imgs=>imgs.map(img=>img.getAttribute('src')));
        assert(images.length>0);for(const src of images)assert.match(src,new RegExp(skin+'-'+pose));
      }
      assert.equal(await page.evaluate(()=>localStorage.getItem('aventuraTiendaV1')),purchased);
      await page.evaluate(()=>{CosmeticStore.equip('t_shadow',null);prepararTrajesFinalVersus('t_shadow');});
      for(const src of await page.locator('.cinematica-shadow-clon').evaluateAll(imgs=>imgs.map(img=>img.src)))assert.doesNotMatch(src,/trajes/);
      assert.equal(await page.evaluate(()=>CosmeticStore.read().coins),400);
      assert.deepEqual(errors,[]);console.log('PASS collection: 29 previews, 33 victim scenes, winners/clones, originals restored, wallet unchanged',viewport);
      await page.close();
    }
  }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
