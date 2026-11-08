'use strict';
// Synthetic opponent; all external requests blocked. Never sends real likes.
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');let browser;
const server=http.createServer((req,res)=>{try{const name=new URL(req.url,'http://local').pathname,file=path.resolve(root,'.'+(name==='/'?'/index.html':name));if(!file.startsWith(root+path.sep))throw Error();res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}});
(async()=>{try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=process.env.AVENTURA_QA_PUBLIC_URL||'http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({channel:'msedge',headless:true});const ctx=await browser.newContext({viewport:{width:844,height:390},isMobile:true,serviceWorkers:'block'});
 await ctx.route('**/*',r=>new URL(r.request().url()).origin===new URL(origin).origin?r.continue():r.abort());const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.stack));
 await page.goto(origin,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>typeof MatchLikes!=='undefined'&&typeof mostrarResultadoPartidaVersus==='function');await page.evaluate(()=>I18n.ready);

 await page.evaluate(()=>{document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');mostrarPantalla(pantallaMenu);window.oldProfileReply=null;PlayerProfile={...PlayerProfile,cargar:()=>new Promise(resolve=>oldProfileReply=resolve)};document.getElementById('btnMiAvatar').click();});
 assert.match(await page.locator('#perfilNombre').innerText(),/Conectando/);
 await page.evaluate(()=>oldProfileReply({id:'a',alias:'Gerardo',points:0,favorites:[]}));
 await page.waitForFunction(()=>document.getElementById('perfilNombre').textContent==='Gerardo');
 await page.evaluate(()=>document.getElementById('cerrarAvatar').click());await page.waitForTimeout(50);
 await page.evaluate(()=>{document.getElementById('btnMiAvatar').click();});assert.match(await page.locator('#perfilNombre').innerText(),/Conectando/);
 await page.evaluate(()=>document.getElementById('cerrarAvatar').click());await page.waitForTimeout(50);
 await page.evaluate(()=>{window.staleReply=oldProfileReply;PlayerProfile={...PlayerProfile,cargar:async()=>({id:'b',alias:'Otra cuenta',points:0,favorites:[]})};document.getElementById('btnMiAvatar').click();});
 await page.waitForFunction(()=>document.getElementById('perfilNombre').textContent==='Otra cuenta');
 await page.evaluate(()=>staleReply({id:'a',alias:'Gerardo',points:0,favorites:[]}));await page.waitForTimeout(50);
 assert.equal(await page.locator('#perfilNombre').innerText(),'Otra cuenta');assert.deepEqual(errors,[]);
 console.log('PASS profile: neutral pending identity, valid alias after lookup, closed-view response rejected and fresh account preserved');

}finally{await browser?.close();server.closeAllConnections();server.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
