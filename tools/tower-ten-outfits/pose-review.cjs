'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const sharp=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root=path.resolve(__dirname,'../..'),out=path.join(root,'.local-developer/tower-pose-review');fs.mkdirSync(out,{recursive:true});
const server=http.createServer((req,res)=>{try{const file=path.resolve(root,'.'+(new URL(req.url,'http://local').pathname==='/'?'/index.html':new URL(req.url,'http://local').pathname));if(!file.startsWith(root+path.sep))throw Error('Path');res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}});
let browser;
(async()=>{try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=process.argv.includes('--live')?'https://aliasjohel.github.io/aventura-de-palabras-ga/':'http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({channel:'msedge',headless:true});const context=await browser.newContext({viewport:{width:844,height:390},serviceWorkers:'block'}),page=await context.newPage(),errors=[];
 await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(origin).origin?r.continue():r.abort());page.on('pageerror',e=>errors.push(e.message));await page.goto(origin);await page.evaluate(()=>I18n.ready);await page.clock.install();await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now())));
 const catalogue=await page.evaluate(()=>TowerOutfitPreview.catalog.map(c=>({id:c.id,character:c.character})));
 const rows=[];
 for(const item of catalogue.filter(c=>!process.argv.includes('--guardiana-only')||c.character==='guardiana')){
  await page.evaluate(({character})=>{TowerOutfitPreview.reset();document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');cancelarCinematicaFinalVersus();detenerRondaVersus();limpiarEntradaDueloVersus();limpiarAnimacionHabilidadVersus();ocultarAnuncioFinVersus();modoArcadeActivo=true;modoPruebasActivo=false;partidaOnlineVersus=null;partidaOnlineIniciada=false;dueloAventuraActivo=null;adaptadorSalasVersus=adaptadorLocalSalasVersus;personajeJugadorVersus=character;personajeRivalVersus='mago';finalizarContextoPalabras();iniciarContextoPalabras('versus');const theme=Object.keys(obtenerBancosPalabrasVersus())[0];tematicaVersus.value=theme;palabrasSecretasVersus=obtenerBancosPalabrasVersus()[theme].slice(0,maximoPalabrasVersus);mostrarPantalla(pantallaVersus);prepararDueloVersus({comenzarRonda:false});limpiarEntradaDueloVersus();},item);
  await page.evaluate(id=>TowerOutfitPreview.select(id),item.id);await page.clock.runFor(3500);
  const captures=[],states=[];
  for(const state of ['base','attack','ability','damage','magic']){
   await page.evaluate(()=>{limpiarAnimacionAtaqueJugadorVersus();limpiarAnimacionHabilidadVersus();personajeVersusUno.classList.remove('recibiendo-dano','recibiendo-dano-magico');});await page.clock.runFor(50);
   await page.evaluate(({state,character})=>{if(state==='attack')reproducirAtaqueJugadorVersus();if(state==='ability')reproducirAnimacionHabilidadVersus(character);if(state==='damage')personajeVersusUno.classList.add('recibiendo-dano');if(state==='magic')personajeVersusUno.classList.add('recibiendo-dano-magico');},{state,...item});
   await page.clock.runFor(state==='attack'?300:100);await page.locator('#personajeVersusUno').evaluate(i=>i.decode());
   states.push(await page.locator('#personajeVersusUno').evaluate((i,state)=>{const s=getComputedStyle(i);return {state,src:i.getAttribute('src'),classes:i.className,transform:s.transform,scale:s.scale,translate:s.translate,animation:s.animationName};},state));
   const shot=await page.screenshot();captures.push({input:await sharp(shot).resize(422,195).png().toBuffer(),left:captures.length*422,top:30});
  }
  captures.push({input:Buffer.from(`<svg width="2110" height="30"><rect width="2110" height="30" fill="#18232b"/><text x="10" y="22" fill="white" font-size="18">${item.id} | BASE -------------------------- ATTACK -------------------------- ABILITY -------------------------- DAMAGE -------------------------- MAGIC</text></svg>`),left:0,top:0});
  await sharp({create:{width:2110,height:225,channels:3,background:'#18232b'}}).composite(captures).png().toFile(path.join(out,item.id+'.png'));rows.push({...item,states});
 }
 // Keep CSS animations enabled: previous geometry checks disabled them and
 // therefore missed the roots pose losing its attack calibration.
 for(const row of rows){const direction=s=>Math.sign(Number(s.transform.match(/matrix\(([^,]+)/)?.[1]||1));for(const state of row.states)assert.equal(direction(state),direction(row.states[0]),row.id+'/'+state.state+' preserves facing');}
 const guardiana=[];
 await page.evaluate(()=>{TowerOutfitPreview.reset();detenerRondaVersus();limpiarAnimacionHabilidadVersus();limpiarAnimacionAtaqueJugadorVersus();personajeJugadorVersus='guardiana';prepararDueloVersus({comenzarRonda:false});limpiarEntradaDueloVersus();});await page.evaluate(()=>TowerOutfitPreview.select('guardiana-orquidea'));await page.evaluate(()=>mostrarPantalla(pantallaVersus));
 const geometry=()=>page.locator('#personajeVersusUno').evaluate(async i=>{await i.decode();const c=document.createElement('canvas');c.width=i.naturalWidth;c.height=i.naturalHeight;const ctx=c.getContext('2d');ctx.drawImage(i,0,0);const {data}=ctx.getImageData(0,0,c.width,c.height);let top=c.height,foot=0;for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++)if(data[(y*c.width+x)*4+3]>=128){top=Math.min(top,y);foot=Math.max(foot,y);}const s=getComputedStyle(i),m=new DOMMatrix(s.transform),h=Math.min(i.clientHeight,i.clientWidth*c.height/c.width),scale=Math.hypot(m.c,m.d)*(s.scale==='none'?1:parseFloat(s.scale));return {height:h*(foot-top+1)/c.height*scale,direction:Math.sign(m.a),src:i.getAttribute('src')};});
 for(const viewport of [{width:844,height:390},{width:667,height:375},{width:1280,height:820}])for(const reducedMotion of ['no-preference','reduce']){
  await page.setViewportSize(viewport);await page.emulateMedia({reducedMotion});
  await page.evaluate(()=>{limpiarAnimacionHabilidadVersus();limpiarAnimacionAtaqueJugadorVersus();personajeVersusUno.classList.remove('recibiendo-dano','recibiendo-dano-magico');});await page.clock.runFor(50);
  const base=await geometry();await page.evaluate(()=>reproducirAnimacionHabilidadVersus('guardiana'));await page.clock.runFor(100);const ability=await geometry();
  assert(ability.height/base.height>.9&&ability.height/base.height<1.12,'Guardiana roots preserve scale '+JSON.stringify({viewport,reducedMotion,base,ability}));
  for(const damageClass of ['recibiendo-dano','recibiendo-dano-magico']){
   await page.evaluate(c=>personajeVersusUno.classList.add(c),damageClass);await page.clock.runFor(reducedMotion==='reduce'?10:100);const damage=await geometry();
   assert.equal(damage.direction,base.direction);assert(Math.abs(damage.height/base.height-1)<.03,'Damage during ability preserves scale');assert(damage.src.endsWith('impacto-v2.webp'));
   await page.evaluate(c=>personajeVersusUno.classList.remove(c),damageClass);await page.clock.runFor(10);const restored=await geometry();assert(restored.src.endsWith('ataque-v1.webp'),JSON.stringify({viewport,reducedMotion,damageClass,restored}));assert(Math.abs(restored.height/ability.height-1)<.01,'Restore ability scale');
  }
  guardiana.push({viewport,reducedMotion,base,ability,ratio:ability.height/base.height});
 }
 assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,process.argv.includes('--live')?'public-states.json':'states.json'),JSON.stringify({passed:true,rows,guardiana,errors},null,2));console.log(JSON.stringify({passed:true,out,characters:rows.length,guardianaViewports:guardiana.length,errors}));
}finally{await browser?.close();server.closeAllConnections();server.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
