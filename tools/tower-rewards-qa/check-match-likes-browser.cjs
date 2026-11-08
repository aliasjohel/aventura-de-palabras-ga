'use strict';
// Synthetic opponent; all external requests blocked. Never sends real likes.
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'../..');let browser;
const server=http.createServer((req,res)=>{try{const name=new URL(req.url,'http://local').pathname,file=path.resolve(root,'.'+(name==='/'?'/index.html':name));if(!file.startsWith(root+path.sep))throw Error();res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}});
(async()=>{try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=process.env.AVENTURA_QA_PUBLIC_URL||'http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({channel:'msedge',headless:true});const ctx=await browser.newContext({viewport:{width:844,height:390},isMobile:true,serviceWorkers:'block'});
 await ctx.route('**/*',r=>new URL(r.request().url()).origin===new URL(origin).origin?r.continue():r.abort());const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.stack));
 await page.goto(origin,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>typeof MatchLikes!=='undefined'&&typeof mostrarResultadoPartidaVersus==='function');await page.evaluate(()=>I18n.ready);
 await page.evaluate(()=>{
  document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');mostrarPantalla(pantallaVersus);
  window.likeCalls=[];window.likeUser='player-a';window.likeMode='ok';window.likeSent=new Set();
  window.likeAdapter={proveedor:'supabase',obtenerUsuarioId:()=>likeUser,obtenerSala:()=>null,meGustaPartida:async(match,send)=>{
    likeCalls.push({match,send});if(likeMode==='network')throw Error('Offline');
    if(likeMode==='defer')await new Promise(r=>window.resolveLike=r);
    if(send)likeSent.add(match);
    return {matchId:match,userId:likeUser,opponentId:'player-b',sent:likeSent.has(match)};
  }};
  adaptadorSalasVersus=likeAdapter;partidaOnlineVersus={matchId:'match-1'};
  mostrarResultadoRango=async()=>{};mostrarPremioVersus=async()=>{};actualizarEstadoRevanchaVersus=()=>{};
  mostrarResultadoPartidaVersus('jugador','Duelo terminado.');
 });
 const button=page.locator('#btnMeGustaDuelo');await button.waitFor();await page.waitForFunction(()=>!document.getElementById('btnMeGustaDuelo').disabled);
 assert.deepEqual(await page.evaluate(()=>likeCalls),[{match:'match-1',send:false}]);
 await button.click();await page.waitForFunction(()=>document.getElementById('btnMeGustaDuelo').getAttribute('aria-pressed')==='true');
 assert.equal(await button.isDisabled(),true);assert.equal(await page.evaluate(()=>likeCalls.filter(c=>c.send).length),1);
 await page.evaluate(()=>document.getElementById('btnMeGustaDuelo').click());assert.equal(await page.evaluate(()=>likeCalls.filter(c=>c.send).length),1);
 for(const [language,label] of [['en','Like sent'],['pt-BR','Curtida enviada'],['es','Me gusta enviado']]){await page.evaluate(l=>I18n.setPreference(l),language);assert.match(await button.innerText(),new RegExp(label));}
 await page.evaluate(()=>mostrarResultadoPartidaVersus('rival','Otro resultado del mismo duelo.'));await page.waitForFunction(()=>document.getElementById('btnMeGustaDuelo').getAttribute('aria-pressed')==='true');
 assert.equal(await page.evaluate(()=>likeCalls.filter(c=>c.send).length),1);
 // A lost response can be retried; the server is authoritative about previous sends.
 await page.evaluate(()=>{partidaOnlineVersus={matchId:'match-2'};likeMode='network';mostrarResultadoPartidaVersus('empate','Empate.');});
 await page.waitForFunction(()=>document.getElementById('estadoMeGustaDuelo').textContent.includes('reintentar'));assert.equal(await button.isEnabled(),true);
 await page.evaluate(()=>likeMode='ok');await button.click();await page.waitForFunction(()=>document.getElementById('btnMeGustaDuelo').getAttribute('aria-pressed')==='true');
 assert.equal(await page.evaluate(()=>likeCalls.filter(c=>c.send&&c.match==='match-2').length),1);
 // Combat uses landscape on phones.
 for(const [width,height]of [[740,320],[844,390],[1365,900]]){
  await page.setViewportSize({width,height});assert.equal(await button.evaluate(e=>e.getBoundingClientRect().height>=44),true);
  const card=page.locator('.tarjeta-resultado-versus');assert(await card.evaluate(e=>e.scrollWidth<=e.clientWidth));
  await button.scrollIntoViewIfNeeded();assert.equal(await button.isVisible(),true);
 }
 fs.mkdirSync(path.join(root,'.local-developer/match-likes'),{recursive:true});await page.screenshot({path:path.join(root,'.local-developer/match-likes/result.png')});
 // Changing match or leaving while a status request is in flight must keep it hidden.
 await page.evaluate(()=>{likeMode='defer';partidaOnlineVersus={matchId:'stale'};mostrarResultadoPartidaVersus('rival','Final.');MatchLikes.clear();resolveLike();});
 assert.equal(await page.locator('#meGustaDuelo').isHidden(),true);
 await page.evaluate(()=>{likeMode='ok';partidaOnlineVersus={matchId:'account'};mostrarResultadoPartidaVersus('jugador','Final.');});
 await page.waitForFunction(()=>!document.getElementById('btnMeGustaDuelo').disabled);
 await page.evaluate(()=>{likeUser='player-c';dispatchEvent(new Event('wallet-session-ended'));});assert.equal(await page.locator('#meGustaDuelo').isHidden(),true);
 // Local and Tower results never offer likes.
 await page.evaluate(()=>{adaptadorSalasVersus={proveedor:'local'};mostrarResultadoPartidaVersus('jugador','Local.');});assert.equal(await page.locator('#meGustaDuelo').isHidden(),true);
 await page.evaluate(()=>{adaptadorSalasVersus=likeAdapter;modoArcadeActivo=true;rivalesTorreArcade=['explorador'];pisoCombateArcade=0;mostrarResultadoPartidaVersus('rival','Torre.');modoArcadeActivo=false;});assert.equal(await page.locator('#meGustaDuelo').isHidden(),true);
 // Profile presents the received count separately from points.
 await page.evaluate(async()=>{PlayerProfile={...PlayerProfile,cargarPublico:async()=>({id:'player-b',alias:'Rival',points:12,likes:7,recent:[],favorites:[]})};await PublicPlayerProfile.abrir('player-b');});
 assert.match(await page.locator('#meGustaPerfilPublico').innerText(),/7/);assert.match(await page.locator('#rankingPerfilPublico').innerText(),/12/);
 await page.evaluate(()=>{document.getElementById('perfilPublico').close();mostrarPantalla(pantallaMenu);PlayerProfile={...PlayerProfile,cargar:async()=>({alias:'Yo',likes:4,points:12,favorites:[]})};document.getElementById('btnMiAvatar').click();});
 await page.waitForFunction(()=>document.getElementById('perfilMeGusta').textContent.includes('4'));
 assert.deepEqual(errors,[]);console.log('PASS browser: explicit optional click, sent state, translations, repeated result, network retry, mobile sizes, stale/account responses, local/Tower exclusion and public profile count');
}finally{await browser?.close();server.closeAllConnections();server.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
