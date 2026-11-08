'use strict';
// Synthetic account fixture. External network is blocked; no production writes.
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'../..');let browser;
const server=http.createServer((req,res)=>{try{const name=new URL(req.url,'http://local').pathname,file=path.resolve(root,'.'+(name==='/'?'/index.html':name));if(!file.startsWith(root+path.sep))throw Error();res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}});
(async()=>{try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({channel:'msedge',headless:true});const ctx=await browser.newContext({viewport:{width:1100,height:700},isMobile:true,serviceWorkers:'block'});
 await ctx.route('**/*',r=>new URL(r.request().url()).origin===origin?r.continue():r.abort());const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin);await page.evaluate(()=>I18n.ready);

 const ids=['clasico','platino','diamante','leyenda','tower_conquistador','tower_maestro','tower_leyenda','xp_codice','xp_infinito','fuego'];
 await page.evaluate(ids=>{
  document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');
  const d=document.getElementById('editorAvatar');d.replaceChildren();d.style.cssText='width:1040px;max-width:calc(100vw - 24px);max-height:none;padding:28px;background:#0b1422';
  const title=document.createElement('h2');title.textContent='Marcos · brillo y destellos';title.style.cssText='color:#ffe8b0;margin:0 0 24px;font:24px Georgia';
  const grid=document.createElement('div');grid.id='avatarPreview';grid.style.cssText='display:grid;grid-template-columns:repeat(5,1fr);gap:24px 12px';
  for(const id of ids){const c=document.createElement('div');c.style.cssText='display:flex;align-items:center;flex-direction:column;gap:12px;color:#e5d7bb;font-size:13px';const badge=PlayerAvatar.crear({avatar:'explorador',frame:id});badge.style.width='150px';badge.style.height='150px';c.append(badge);const text=document.createElement('span');text.textContent=PlayerAvatar.nombreMarco(id);c.append(text);grid.append(c);}
  d.append(title,grid);d.showModal();d.classList.remove('perfil-movimiento-pausado');for(const i of d.querySelectorAll('img'))i.loading='eager';
 },ids);
 await page.evaluate(async()=>{await Promise.all([...document.querySelectorAll('#editorAvatar img')].map(i=>i.decode().catch(()=>{})));});
 assert.equal(await page.locator('#avatarPreview .prestige-frame').count(),9);
 assert.equal(await page.locator('.frame-clasico .frame-prestige-sheen').count(),0);
 assert.equal(await page.locator('.frame-leyenda .frame-prestige-spark').count(),6);
 assert.match(await page.locator('.frame-leyenda .frame-prestige-sheen').evaluate(e=>getComputedStyle(e).maskImage),/marco-leyenda/);
 assert.equal(await page.locator('.frame-tower_leyenda .frame-prestige-sheen').evaluate(e=>getComputedStyle(e).animationName),'framePrestigeSheen');
 await page.evaluate(()=>{for(const a of document.getAnimations()){a.pause();a.currentTime=a.animationName==='framePrestigeSheen'?2700:1900;}});
 fs.mkdirSync(path.join(root,'.local-developer/frame-effects'),{recursive:true});await page.screenshot({path:path.join(root,'.local-developer/frame-effects/gallery.png')});
 await page.emulateMedia({reducedMotion:'reduce'});
 assert.equal(await page.locator('.frame-leyenda .frame-prestige-sheen').evaluate(e=>getComputedStyle(e).animationName),'none');
 assert.equal(await page.locator('.frame-leyenda .frame-prestige-spark').first().evaluate(e=>getComputedStyle(e).display),'none');
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>{document.getElementById('avatarPreview').style.gridTemplateColumns='repeat(2,1fr)';document.getElementById('editorAvatar').style.maxHeight='calc(100dvh - 24px)';});await page.screenshot({path:path.join(root,'.local-developer/frame-effects/mobile.png')});
 assert.deepEqual(errors,[]);console.log('PASS nine prestige frames, base frame unchanged, artwork mask, tier spark count, and reduced motion');

}finally{await browser?.close();server.closeAllConnections();server.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
