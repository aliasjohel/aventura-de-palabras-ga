const fs=require('node:fs'),http=require('node:http'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),ranks=['bronce','plata','oro','platino','diamante','leyenda'];
const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);return res.end();}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp'})[path.extname(file)]||'application/octet-stream');res.end(data);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'msedge',headless:true});try{
for(const lang of ['es','en','pt-BR']){const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});await context.route('https://**/*',r=>r.abort());await context.addInitScript(()=>{localStorage.setItem('aventuraPalabrasIdentidadV1',JSON.stringify({avatar:'mago',frame:'oro'}));});const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:'+server.address().port+'/index.html');await page.evaluate(()=>I18n.ready);
await page.evaluate(async lang=>{document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');mostrarPantalla(pantallaMenu);await I18n.setPreference(lang);},lang);
assert.equal(await page.evaluate(()=>PlayerAvatar.obtener().frame),'oro','equipped frame preserved');
assert.equal(await page.locator('#opcionesMarco .player-avatar-portrait').count(),0,'frame choices have no character');
assert.equal(await page.locator('#opcionesMarco .player-avatar-frame').count(),12,'every frame remains visible');
assert.equal(await page.locator('#opcionesAvatar .player-avatar-portrait').count(),9,'avatar choices retain characters');
await page.locator('#btnMiAvatar').click();await page.evaluate(()=>PlayerAvatar.desbloquear({},480));
assert.equal(await page.locator('#avatarPreview .player-avatar-portrait img').count(),1,'preview retains player avatar');
await page.getByRole('button',{name: lang==='es'?'Zafir · Invocación arcana':lang==='en'?'Zafir · Arcane invocation':'Zafir · Invocação arcana',exact:true}).click();
await page.locator('.perfil-zafir-personaje').evaluate(i=>i.decode());
assert.equal(await page.locator('.perfil-zafir-esfera').evaluate(e=>getComputedStyle(e).animationPlayState),'running');
await page.evaluate(()=>new Promise((resolve,reject)=>{const image=new Image();image.onload=resolve;image.onerror=reject;image.src='assets/images/perfil/fondo-santuario-arcano-v1.webp';}));
for(const width of [320,390,844]) {
  await page.setViewportSize({width,height:844});
  await page.locator('.perfil-fondos-prueba button').first().click();
  const forestSize=await page.locator('#editorAvatar .perfil-cabecera').boundingBox();
  await page.locator('.perfil-fondos-prueba button').nth(1).click();
  const wizardSize=await page.locator('#editorAvatar .perfil-cabecera').boundingBox();
  assert.equal(wizardSize.height,forestSize.height,'same header height as forest at '+width);
  assert.equal(wizardSize.width,forestSize.width,'same header width as forest at '+width);
  assert.equal(await page.locator('#editorAvatar').evaluate(e=>e.scrollWidth<=e.clientWidth),true,'Zafir has no horizontal overflow');
  await page.locator('#editorAvatar').evaluate(e=>e.scrollTop=0);
  await page.screenshot({path:path.join(root,'docs','v377-zafir-'+lang+'-'+width+'.png')});
}
await page.setViewportSize({width:390,height:844});
await page.emulateMedia({reducedMotion:'reduce'});
assert.equal(await page.locator('.perfil-zafir-esfera').evaluate(e=>getComputedStyle(e).animationName),'none');
await page.emulateMedia({reducedMotion:'no-preference'});
await page.evaluate(()=>document.getElementById('editorAvatar').close());
assert.equal(await page.locator('.perfil-zafir-esfera').evaluate(e=>getComputedStyle(e).animationPlayState),'paused');
await page.locator('#btnMiAvatar').click();
await page.locator('.perfil-fondos-prueba button').first().click();
const light=page.locator('.perfil-luciernagas i').first();
assert.equal(await page.locator('.perfil-luciernagas i').count(),8);
assert.equal(await light.evaluate(e=>getComputedStyle(e).animationPlayState),'running');
await page.evaluate(()=>new Promise((resolve,reject)=>{const im=new Image();im.onload=resolve;im.onerror=reject;im.src='assets/images/perfil/fondo-bosque-luciernagas-v1.webp';}));
await page.screenshot({path:path.join(require('os').tmpdir(),`profile-forest-${lang}.png`)});
for(const width of [320,390,844]){await page.setViewportSize({width,height:844});assert.equal(await page.locator('#editorAvatar').evaluate(e=>e.scrollWidth<=e.clientWidth),true,'no horizontal overflow');}
await page.setViewportSize({width:390,height:844});
await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await light.evaluate(e=>getComputedStyle(e).animationName),'none');await page.emulateMedia({reducedMotion:'no-preference'});
await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});assert.equal(await light.evaluate(e=>getComputedStyle(e).animationPlayState),'paused');
await page.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});
await page.locator('#cerrarAvatar').click();assert.equal(await light.evaluate(e=>getComputedStyle(e).animationPlayState),'paused');await page.locator('#btnMiAvatar').click();assert.equal(await light.evaluate(e=>getComputedStyle(e).animationPlayState),'running');
for(const rank of ranks){const button=page.locator(`[data-choice="frame"][data-value="${rank}"]`);assert.equal(await button.isDisabled(),false);await button.click();assert(await page.locator('#avatarPreview .rank-frame').getAttribute('src').then(s=>s.endsWith(`marco-${rank}-v1.webp`)));}
await page.evaluate(ranks=>{const gallery=document.createElement('div');gallery.id='qaFrames';gallery.style='position:fixed;inset:0;z-index:999999;background:#101c30;color:white;display:grid;grid-template-columns:repeat(3,1fr);align-content:center;gap:24px;padding:16px';for(const rank of ranks){const item=document.createElement('div');item.style='text-align:center';const full=PlayerAvatar.crear({avatar:'mago',frame:rank});full.style='width:108px;height:108px';const mini=PlayerAvatar.crear({avatar:'mago',frame:rank},{miniatura:true});mini.style='width:46px;height:46px';item.append(full,document.createElement('br'),mini,document.createElement('br'),PlayerAvatar.nombreMarco(rank));gallery.append(item);}document.querySelector('dialog[open]').append(gallery);},ranks);
await page.locator('#qaFrames img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));assert.equal(await page.locator('#qaFrames .rank-frame').count(),12);assert.equal(await page.locator('#qaFrames .rank-frame').evaluateAll(imgs=>imgs.every(i=>i.naturalWidth>0&&getComputedStyle(i).borderTopWidth==='0px')),true);
await page.screenshot({path:path.join(require('os').tmpdir(),`rank-frames-${lang}.png`)});assert.deepEqual(errors,[]);console.log('PASS',lang,'six unlocks, equipped identity preserved, full/thumbnail images loaded, CSS borders removed');await context.close();}
}finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
