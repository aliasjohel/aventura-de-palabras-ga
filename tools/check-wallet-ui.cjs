const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{
  const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/\/$/,'/index.html'));
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  fs.readFile(file,(error,data)=>{if(error){res.writeHead(404).end();return;}
    res.setHeader('Content-Type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');res.end(data);});
});
(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const browser=await chromium.launch({headless:true,channel:'msedge'});
  try {
    for(const viewport of [{width:390,height:844},{width:844,height:390}]){
      const page=await browser.newPage({viewport,serviceWorkers:'block'}),errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      await page.route('**/*',route=>new URL(route.request().url()).hostname==='127.0.0.1'?route.continue():route.abort());
      await page.goto(`http://127.0.0.1:${server.address().port}`,{waitUntil:'domcontentloaded'});
      await page.evaluate(()=>{
        Object.defineProperty(navigator,'onLine',{get:()=>false,configurable:true});
        document.querySelector('#introOficial')?.remove();document.body.classList.remove('intro-pendiente');
        CosmeticStore.earn(500);CosmeticStore.beginAccount('ui-test');
        CosmeticStore.setPurchaseHandler(()=>new Promise((resolve,reject)=>{window.purchaseResolve=resolve;window.purchaseReject=reject;}));
        document.querySelector('#btnTienda').click();
      });
      await page.locator('#comprarTraje').click();
      await page.waitForFunction(()=>typeof purchaseReject==='function');
      assert.equal(await page.locator('#comprarTraje').isDisabled(),true);
      assert.doesNotMatch(await page.locator('#tiendaTrajesEstado').textContent(),/comprado/);
      await page.evaluate(()=>purchaseReject(Error('Sin conexión')));
      await page.waitForFunction(()=>document.querySelector('#tiendaTrajesEstado').textContent==='Sin conexión');
      assert.equal(await page.evaluate(()=>CosmeticStore.read().coins),500);
      await page.evaluate(()=>{window.purchaseResolve=null;});
      await page.locator('#comprarTraje').click();
      await page.waitForFunction(()=>typeof purchaseResolve==='function');
      await page.evaluate(()=>purchaseResolve());
      await page.waitForFunction(()=>document.querySelector('#tiendaTrajesEstado').textContent.includes('comprado'));
      await page.evaluate(async()=>{
        partidaOnlineVersus={matchId:'test'};
        globalThis.GameWallet={sync:async()=>({reward:{amount:20}})};
        await mostrarPremioVersus('test');
      });
      assert.match(await page.locator('#resultadoMonedasVersus').textContent(),/\+20 monedas/);
      await page.evaluate(async()=>{globalThis.GameWallet={sync:async()=>{throw Error('offline');}};await mostrarPremioVersus('test');});
      assert.match(await page.locator('#resultadoMonedasVersus').textContent(),/Reintentar/);
      assert.deepEqual(errors,[]);await page.close();
    }
    console.log('PASS UI: portrait/landscape, pending purchase, failure preserves balance, confirmation and reward retry');
  }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
