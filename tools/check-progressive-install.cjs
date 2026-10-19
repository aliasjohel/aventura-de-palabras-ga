// Real Edge + real v369 worker: fresh installation and on-demand offline packs.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');let interrupted=false;
const sound='assets/sounds/error.mp3',image='assets/images/perfil/miniaturas/marco-bosque-v1.webp';
const downloads=[];
const server=http.createServer((req,res)=>{try{const file=new URL(req.url,'http://localhost').pathname.slice(1)||'index.html';
 if(!path.resolve(root,file).startsWith(root+path.sep))throw Error('path');
 if(interrupted&&file===sound){res.writeHead(503);return res.end('interrupted');}
 let body=fs.readFileSync(path.join(root,file));if(/\.(html|css|js|json|svg|txt|webmanifest)$/.test(file))body=Buffer.from(body.toString().replace(/\r\n/g,'\n'));
 res.setHeader('Content-Type',({'.js':'text/javascript','.html':'text/html','.css':'text/css','.json':'application/json','.mp3':'audio/mpeg','.png':'image/png','.webp':'image/webp','.webmanifest':'application/manifest+json'})[path.extname(file)]||'application/octet-stream');
 res.setHeader('Cache-Control','no-store');downloads.push(file);res.end(body);
}catch{res.writeHead(404);res.end();}});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'allow'});
 await context.route('https://**/*',r=>r.abort());
 await context.addInitScript(()=>{window.installMessages=[];navigator.serviceWorker.addEventListener('message',e=>{if(e.data?.type==='PWA_INSTALL_PROGRESS')installMessages.push({controlled:!!navigator.serviceWorker.controller,...e.data});});});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const start=Date.now(),url='http://127.0.0.1:'+server.address().port+'/';
 await page.goto(url,{waitUntil:'domcontentloaded'});await page.evaluate(()=>I18n.ready);
 await page.waitForFunction(()=>!!navigator.serviceWorker.controller,null,{timeout:90000});
 const installedMs=Date.now()-start;
 assert(await page.evaluate(()=>installMessages.some(m=>!m.controlled&&m.total<150&&m.completados>0)),'fresh progress before a controller exists');
 const before=await page.evaluate(()=>localStorage.getItem('progresoAventuraGA'));
 assert.equal(await page.evaluate(p=>GameResources.available(p),[image,sound]),false);
 interrupted=true;
 const failure=await page.evaluate(async paths=>{try{await GameResources.ensure(paths);return '';}catch(e){return e.message;}},[image,sound]);
 assert(failure,'interrupted download must fail');
 assert.equal(await page.evaluate(p=>GameResources.available(p),[image,sound]),false);
 interrupted=false;
 const prepared=await page.evaluate(p=>GameResources.ensure(p),[image,sound]);assert.equal(prepared.offline,true);
 assert.equal(await page.evaluate(()=>localStorage.getItem('progresoAventuraGA')),before);
 await context.setOffline(true);await page.reload();await page.evaluate(()=>I18n.ready);
 for(const language of ['es','en','pt-BR']){await page.evaluate(lang=>I18n.setPreference(lang),language);assert.equal(await page.evaluate(()=>I18n.language),language);}
 const offline=await page.evaluate(async ({image,sound})=>({available:await GameResources.available([image,sound]),image:(await fetch(image)).status,range:(await fetch(sound,{headers:{Range:'bytes=0-15'}})).status}),{image,sound});
 assert.deepEqual(offline,{available:true,image:200,range:206});
 for(const id of ['btnJugar','btnModosJuego','pantallaArcade','pantallaVersus'])assert.equal(await page.locator('#'+id).count(),1);
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({pass:true,installedMs,coreProgress:true,interruptionRecovery:true,offlineLanguages:3,offlineImage:200,offlineAudioRange:206,playerSaveUnchanged:true,errors},null,2));
}finally{await browser.close();server.close();}})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
