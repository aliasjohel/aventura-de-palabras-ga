const fs=require('fs'),http=require('http'),path=require('path'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
// Exercise the real worker and integrity hashes without downloading game media.
const server=http.createServer((req,res)=>{const file=path.join(root,new URL(req.url,'http://localhost').pathname);fs.readFile(file.endsWith(path.sep)?file+'index.html':file,(error,bytes)=>{
 if(error){res.statusCode=404;return res.end();}
 res.setHeader('Content-Type',({'.js':'text/javascript','.html':'text/html','.css':'text/css','.json':'application/json'})[path.extname(file)]||'application/octet-stream');
 if(path.basename(file)==='sw.js')bytes=Buffer.from(bytes.toString()+"\nCORE_ASSETS.splice(0,CORE_ASSETS.length,...CORE_ASSETS.filter(p=>!p.startsWith('./assets/')));self.addEventListener('install',e=>e.waitUntil(self.skipWaiting()));");
 if(/\.(js|html|css|json|txt|svg|webmanifest)$/.test(file))bytes=Buffer.from(bytes.toString().replace(/\r\n/g,'\n'));
 res.end(bytes);
});});
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const context=await browser.newContext({serviceWorkers:'allow',locale:'es-AR'});await context.route('https://**/*',r=>r.abort());const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:'+server.address().port+'/index.html');await page.evaluate(()=>I18n.ready);
  await page.waitForFunction(async()=>{const registration=await navigator.serviceWorker.getRegistration();return registration?.active&&!!(await caches.match(new URL('./js/narrative-i18n.js',location.href)));},null,{timeout:60000});
  await page.reload();await page.evaluate(()=>I18n.ready);await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
  await context.setOffline(true);await page.reload();await page.evaluate(()=>I18n.ready);
  for(const language of ['en','pt-BR','es']){
   const output=await page.evaluate(async language=>{
    await I18n.setPreference(language);const sources=Object.entries(I18nSpanishUI).filter(([key])=>key.startsWith('adventure.narrative.'));
    return sources.map(([key,source])=>({key,source,text:NarrativeI18n.resolve(source),expected:I18n.resolve(key)}));
   },language);
   assert(output.length>=350);for(const row of output)assert.equal(row.text,row.expected,language+' '+row.key);
  }
  await page.evaluate(()=>I18n.setPreference('pt-BR'));await page.reload();await page.evaluate(()=>I18n.ready);assert.equal(await page.evaluate(()=>I18n.language),'pt-BR');
  assert.equal(await page.evaluate(()=>NarrativeI18n.resolve('La prueba de Zafir')),'A Prova de Zafir');
  assert.deepEqual(errors,[]);console.log('PASS narrative offline: actual worker, cached adapter/fallback and all narrative translations, three languages, preference survives offline reload; media excluded from test cache.');
 }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
