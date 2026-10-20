const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),os=require('node:os'),cp=require('node:child_process'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const sharp=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root=path.resolve(__dirname,'..'), frames=fs.mkdtempSync(path.join(os.tmpdir(),'profile-powers-'));
const server=http.createServer((req,res)=>{
  const target=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);
  if(!target.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
  fs.readFile(target,(err,body)=>{if(err){res.writeHead(404);return res.end();}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png'})[path.extname(target)]||'application/octet-stream');res.end(body);});
});
(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const browser=await chromium.launch({channel:'msedge',headless:true});
  try{
    const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
    await context.route('https://**/*',r=>r.abort());
    const page=await context.newPage(),errors=[],captures={};page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:'+server.address().port+'/index.html');await page.evaluate(()=>I18n.ready);
    await page.evaluate(()=>{document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');mostrarPantalla(pantallaMenu);});
    await page.locator('#btnMiAvatar').click();
    for(const width of [320,390,844]){
      await page.setViewportSize({width,height:844});
      for(const [id,selector] of [['azrak','.perfil-llamarada'],['hielo','.perfil-chorro-hielo']]){
        await page.locator('[data-background-choice="'+id+'"]').click();await page.locator('.perfil-criatura').evaluate(i=>i.decode());
        const power=page.locator(selector);
        assert.equal(await power.evaluate(e=>getComputedStyle(e).animationPlayState),'running');
        const figures=await page.locator('.perfil-figura').evaluate(e=>e.querySelectorAll('.perfil-criatura,.perfil-espada-fuego,.perfil-ventisca').length);
        assert.equal(figures,3,'sprite and powers share their movement parent');
        const setTime=time=>page.evaluate(time=>{for(const animation of document.getAnimations()){animation.pause();animation.currentTime=time;}},time);
        await setTime(0);assert.equal(Number(await power.evaluate(e=>getComputedStyle(e).opacity)),0,'starts with no power');
        await setTime(3500);assert(Number(await power.evaluate(e=>getComputedStyle(e).opacity))>.6,'power becomes clearly visible');
        assert(await page.locator('#editorAvatar').evaluate(e=>e.scrollWidth<=e.clientWidth),'powers do not expand the profile');
        await page.locator('#editorAvatar').evaluate(e=>e.scrollTop=0);
        if(width===390){
          captures[id]=[];
          for(let i=0;i<36;i++){
            await setTime(i*210);
            captures[id].push(await page.locator('#editorAvatar .perfil-cabecera').screenshot());
          }
        }
        await page.emulateMedia({reducedMotion:'reduce'});
        assert.equal(await power.evaluate(e=>getComputedStyle(e).animationName),'none');
        await page.emulateMedia({reducedMotion:'no-preference'});
        await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});
        assert.equal(await power.evaluate(e=>getComputedStyle(e).animationPlayState),'paused','power pauses in background');
        await page.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});
        await page.locator('#cerrarAvatar').click();assert.equal(await power.evaluate(e=>getComputedStyle(e).animationPlayState),'paused');
        await page.locator('#btnMiAvatar').click();
      }
    }
    for(let i=0;i<36;i++){
      const meta=await sharp(captures.azrak[i]).metadata();
      await sharp({create:{width:meta.width*2,height:meta.height,channels:4,background:'#0b1220'}})
        .composite([{input:captures.azrak[i],left:0,top:0},{input:captures.hielo[i],left:meta.width,top:0}])
        .png().toFile(path.join(frames,String(i).padStart(3,'0')+'.png'));
    }
    cp.execFileSync('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe',['-c',
      'from PIL import Image; import pathlib,sys; frames=[Image.open(p).convert("RGB") for p in sorted(pathlib.Path(sys.argv[1]).glob("*.png"))]; frames[0].save(sys.argv[2],save_all=True,append_images=frames[1:],duration=210,loop=0,optimize=False)',
      frames,path.join(root,'docs/v379-poderes.gif')]);
    assert.deepEqual(errors,[]);console.log('PASS sword ignition and ice breath cycles at 320/390/844, attached powers, background/close pause, reduced motion; animated capture saved');
    await context.close();
  }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
