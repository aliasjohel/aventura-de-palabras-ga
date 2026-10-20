const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const sharp=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{try{const file=new URL(req.url,'http://localhost').pathname.slice(1)||'index.html',target=path.resolve(root,file);if(!target.startsWith(root+path.sep))throw Error('path');res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.json':'application/json','.png':'image/png','.webp':'image/webp'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(target));}catch{res.writeHead(404);res.end();}});
(async()=>{
 const bounds={};
 for(const pose of ['pensando','nervioso','feliz','preocupado','acierto','desanimado','triste','celebrando']){
  const {data,info}=await sharp(path.join(root,'assets/images/personajes/explorador-'+pose+'.png')).ensureAlpha().raw().toBuffer({resolveWithObject:true});let x0=info.width,y0=info.height,x1=0,y1=0;
  for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++)if(data[(y*info.width+x)*4+3]>128){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);}
  bounds[pose]=[info.width,info.height,x0,y0,x1,y1];
 }
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});await context.route('https://**/*',r=>r.request().url().startsWith(process.env.GAME_BASE_URL || 'http://127.0.0.1')?r.continue():r.abort());const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.GAME_BASE_URL || 'http://127.0.0.1:'+server.address().port+'/');await page.evaluate(()=>I18n.ready);
  await page.evaluate(async()=>{document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');await Promise.all(['acierto','celebrando'].map(pose=>new Promise(resolve=>{const image=new Image();image.onload=resolve;image.src='assets/images/personajes/explorador-'+pose+'.png';})));});
  const measure=()=>page.evaluate(bounds=>{
   const actor=document.getElementById('personajeImagen'),r=actor.getBoundingClientRect(),pose=actor.getAttribute('src').match(/explorador-([a-z]+)\.png/)[1];
   const [w,h,x0,y0,x1,y1]=bounds[pose],fit=Math.min(r.width/w,r.height/h);
   return {pose,x:r.left+(r.width-w*fit)/2+(x0+x1)*fit/2,feet:r.bottom-(h-y1)*fit,height:(y1-y0)*fit};
  },bounds);
  const stable=(actual,expected,label)=>{for(const key of ['x','feet','height'])assert(Math.abs(actual[key]-expected[key])<.8,label+' '+key+': '+actual[key]+' vs '+expected[key]);};
  for(const width of [320,390,844])for(const mission of [0,4,8]){
   await page.setViewportSize({width,height:844});
   await page.evaluate(async mission=>{cancelarRetornoEstadoBaseExplorador();escenarioActual=2;misionActual=mission;intentos=6;palabraSecreta='VIENTO';letrasElegidas=[];actualizarEscenaPorMision();actualizarCabeceraMision();actualizarVidas();cambiarPersonaje(obtenerEstadoBaseExplorador());mostrarPantalla(pantallaJuego);await Promise.all([esperarCargaFondoEscenario(),esperarCargaImagen(personajeImagen)]);},mission);
   await page.waitForTimeout(30);const reference=await measure();
   if(!process.env.GAME_BASE_URL&&width===390&&mission===0)await page.screenshot({path:path.join(root,'docs/v381-aren-reposo.png')});
   await page.evaluate(()=>elegirLetra('V',document.createElement('button')));await page.waitForFunction(()=>personajeImagen.classList.contains('expresion-acierto'));
   for(let i=0;i<5;i++){await page.waitForTimeout(60);stable(await measure(),reference,'correct letter '+width+'/'+mission);}
   if(!process.env.GAME_BASE_URL&&width===390&&mission===0)await page.screenshot({path:path.join(root,'docs/v381-aren-acierto.png')});
   await page.waitForTimeout(750);stable(await measure(),reference,'return to idle');
   await page.evaluate(()=>{cancelarRetornoEstadoBaseExplorador();WorldWordHazards.release();cambiarPersonaje('celebrando');});await page.waitForTimeout(120);stable(await measure(),reference,'celebration');
   await page.emulateMedia({reducedMotion:'reduce'});stable(await measure(),reference,'reduced motion');await page.emulateMedia({reducedMotion:'no-preference'});
  }
  await page.evaluate(()=>{WorldWordHazards.update(2,0,0);});await page.waitForTimeout(750);assert.equal(await page.locator('#personajeImagen').evaluate(e=>getComputedStyle(e).opacity),'0.2');
  await page.evaluate(()=>WorldWordHazards.update(3,0,6));assert.equal(await page.locator('.viento-poses-fijas').count(),0,'other worlds do not inherit the correction');assert.deepEqual(errors,[]);
  console.log('PASS real correct letter, idle and celebration retain visible feet/center/height at 320/390/844 in missions 1/5/9; reduced motion, final wind and other worlds preserved');
 }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
