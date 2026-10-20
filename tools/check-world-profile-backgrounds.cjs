const fs = require('node:fs'), http = require('node:http'), path = require('node:path'), assert = require('node:assert/strict');
const {chromium} = require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const sharp = require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root = path.resolve(__dirname, '..');
const ids = ['bosque','zafir','desierto','cumbres','hielo','azrak'];
const server = http.createServer((req,res) => {
  const file = path.resolve(root, '.' + new URL(req.url,'http://localhost').pathname);
  if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
  fs.readFile(file,(error,data) => {
    if(error) { res.writeHead(404); return res.end(); }
    res.setHeader('Content-Type', ({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png'})[path.extname(file)] || 'application/octet-stream');
    res.end(data);
  });
});
(async () => {
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  const browser = await chromium.launch({channel:'msedge',headless:true});
  try {
    for (const lang of ['es','en','pt-BR']) {
      const context = await browser.newContext({viewport:{width:390,height:844}, serviceWorkers:'block'});
      await context.route('https://**/*',r => r.abort());
      await context.addInitScript(() => {
        localStorage.setItem('aventuraPalabrasIdentidadV1',JSON.stringify({avatar:'mago',frame:'oro'}));
        localStorage.setItem('aventuraTiendaV1',JSON.stringify({coins:345,owned:['aren-bosque'],equipped:{explorador:'aren-bosque'}}));
      });
      const page = await context.newPage(), errors=[], requests=[], screenshots=[];
      page.on('pageerror',error => errors.push(error.message));
      page.on('request',request => requests.push(request.url()));
      await page.goto('http://127.0.0.1:'+server.address().port+'/index.html');
      await page.evaluate(() => I18n.ready);
      await page.evaluate(async lang => {
        document.getElementById('introOficial')?.remove(); document.body.classList.remove('intro-pendiente');
        mostrarPantalla(pantallaMenu); await I18n.setPreference(lang);
      },lang);
      await page.locator('#btnMiAvatar').click();
      assert.equal(await page.locator('[data-background-choice]').count(),6);
      assert(!requests.some(url => /fondo-(desierto|cumbres|hielo|azrak)-animado|figura-(nimbus|nivor|azrak)/.test(url)), 'new art is not downloaded before selection');
      const snapshot = () => page.evaluate(() => Object.fromEntries(['aventuraPalabrasIdentidadV1','aventuraTiendaV1','progresoAventuraGA'].map(key=>[key,localStorage.getItem(key)])));
      const before = await snapshot();
      for (const width of [320,390,844]) {
        await page.setViewportSize({width,height:844});
        await page.locator('[data-background-choice="bosque"]').click();
        const reference = await page.locator('#editorAvatar .perfil-cabecera').boundingBox();
        for (const id of ids) {
          await page.locator('[data-background-choice="'+id+'"]').click();
          const header = page.locator('#editorAvatar .perfil-cabecera');
          assert.equal(await header.getAttribute('data-profile-background'),id);
          const bounds = await header.boundingBox();
          assert.equal(bounds.height,reference.height,id+' header height at '+width);
          assert.equal(bounds.width,reference.width,id+' header width at '+width);
          assert(await page.locator('#editorAvatar').evaluate(e=>e.scrollWidth<=e.clientWidth),id+' no overflow');
          const imageName = id==='bosque'?'fondo-bosque-luciernagas-v1.webp':id==='zafir'?'fondo-santuario-arcano-v1.webp':'fondo-'+id+'-animado-v1.webp';
          await page.evaluate(name => new Promise((resolve,reject) => { const image=new Image(); image.onload=resolve; image.onerror=reject; image.src='assets/images/perfil/'+name; }),imageName);
          if (['cumbres','hielo','azrak'].includes(id)) await page.locator('.perfil-criatura').evaluate(image=>image.decode());
          if(id==='zafir') await page.locator('.perfil-zafir-personaje').evaluate(image=>image.decode());
          const animated = page.locator(id==='bosque'?'.perfil-luciernagas i':id==='zafir'?'.perfil-zafir-esfera':'.perfil-particulas i').first();
          assert.equal(await animated.evaluate(e=>getComputedStyle(e).animationPlayState),'running');
          await page.emulateMedia({reducedMotion:'reduce'});
          assert.equal(await animated.evaluate(e=>getComputedStyle(e).animationName),'none');
          await page.emulateMedia({reducedMotion:'no-preference'});
          await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});
          assert.equal(await animated.evaluate(e=>getComputedStyle(e).animationPlayState),'paused');
          await page.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});
          if(lang==='es' && width===390) { await page.locator('#editorAvatar').evaluate(e=>e.scrollTop=0); screenshots.push(await header.screenshot({animations:'disabled'})); }
        }
      }
      // Changing language must preserve the current selection and dimensions.
      await page.evaluate(()=>I18n.setPreference('en'));
      assert.equal(await page.locator('[data-background-choice="azrak"]').getAttribute('aria-pressed'),'true');
      assert.deepEqual(await snapshot(),before,'previews cannot alter identity, wallet or progress');
      await page.locator('#cerrarAvatar').click();
      assert.equal(await page.locator('.perfil-figura').evaluate(e=>getComputedStyle(e).animationPlayState),'paused');
      assert.deepEqual(errors,[]);
      if(screenshots.length) {
        const meta=await sharp(screenshots[0]).metadata();
        await sharp({create:{width:meta.width*2,height:meta.height*3,channels:4,background:'#0b1220'}})
          .composite(screenshots.map((input,i)=>({input,left:i%2*meta.width,top:Math.floor(i/2)*meta.height})))
          .png().toFile(path.join(root,'docs',process.env.PROFILE_CAPTURE_NAME || 'v378-coleccion-fondos.png'));
      }
      console.log('PASS',lang,'six backgrounds, three widths, deferred art, motion pause, reduced motion, unchanged wallet and identity');
      await context.close();
    }
  } finally { await browser.close(); server.close(); }
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
