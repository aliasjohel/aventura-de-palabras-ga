'use strict';
// Synthetic account fixture. External network is blocked; no production writes.
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'../..');let browser;
const server=http.createServer((req,res)=>{try{const name=new URL(req.url,'http://local').pathname,file=path.resolve(root,'.'+(name==='/'?'/index.html':name));if(!file.startsWith(root+path.sep))throw Error();res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}});
(async()=>{try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({channel:'msedge',headless:true});const ctx=await browser.newContext({viewport:{width:844,height:390},isMobile:true,serviceWorkers:'block'});
 await ctx.route('**/*',r=>new URL(r.request().url()).origin===origin?r.continue():r.abort());const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin);await page.evaluate(()=>I18n.ready);

 fs.mkdirSync(path.join(root,'.local-developer/azrak-keyboard'),{recursive:true});
 for(const skin of ['original','guardiana-otono','tower_guardiana']){
  await page.evaluate(skin=>{
   document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');
   cancelarCinematicaFinalVersus();detenerRondaVersus();modoArcadeActivo=true;torreEnCurso=false;modoPruebasActivo=false;
   partidaOnlineVersus=null;partidaOnlineIniciada=false;dueloAventuraActivo=null;adaptadorSalasVersus=adaptadorLocalSalasVersus;
   CosmeticStore.beginAccount('synthetic-azrak-keyboard');
   CosmeticStore.applyAccount({userId:'synthetic-azrak-keyboard',currencyVersion:2,securityVersion:3,coins:0,revision:0,owned:['guardiana-otono'],equipped:skin==='guardiana-otono'?{guardiana:skin}:{},missionClaims:[]});
   TowerRewards.apply({userId:'synthetic-azrak-keyboard',owned:['tower_guardiana'],equipped:skin==='tower_guardiana'?{guardiana:skin}:{},revision:1});
   personajeJugadorVersus='guardiana';personajeRivalVersus='azrak';ultimoEventoDueloAventura=0;efectoDueloAventura='';
   finalizarContextoPalabras();iniciarContextoPalabras('tower');const theme=Object.keys(obtenerBancosPalabrasVersus())[0];tematicaVersus.value=theme;palabrasSecretasVersus=obtenerBancosPalabrasVersus()[theme].slice(0,maximoPalabrasVersus);
   prepararDueloVersus({comenzarRonda:false});mostrarPantalla(pantallaVersus);limpiarEntradaDueloVersus();
   const actor={index:0,letters:[],errors:0,lives:5,completed:0,finished:false,remaining:120,charge:0,effect:'',effect_until:null,effectRemaining:0,theme:'animales',mask:[null,null,null],hint:''};
   window.azrakState={started:true,finished:false,character:'azrak',playerCharacter:'guardiana',player:{...actor},npc:{...actor},events:[]};
   torreEnCurso=true;torreAutoritativa={view:()=>({detail:azrakState}),active:()=>true,paused:()=>false};
   renderizarDueloAventuraAutoritativo(azrakState);
   azrakState.player={...azrakState.player,effect:'forced_miss',effect_until:'2026-11-08T15:00:02Z',effectRemaining:2000};
   azrakState.events=[{seq:1,type:'impact',actor:'npc',target:'player',effect:'forced_miss'}];renderizarDueloAventuraAutoritativo(azrakState);
  },skin);
  assert.equal(await page.locator('#tecladoVersus').evaluate(e=>e.classList.contains('efecto-calavera-azrak')),true);
  assert.equal(await page.locator('#tecladoVersus .tecla-carbonizada').count(),0);
  await page.waitForTimeout(2100);
  await page.evaluate(()=>{azrakState.player={...azrakState.player,effect:'',effect_until:null,effectRemaining:0,letters:['Q'],errors:1};azrakState.events.push({seq:2,type:'letter',actor:'player',letter:'Q',correct:false},{seq:3,type:'impact',actor:'npc',target:'player',effect:'forced_letter'});renderizarDueloAventuraAutoritativo(azrakState);});
  const burned=page.locator('#tecladoVersus button').filter({hasText:/^Q$/});assert(await burned.evaluate(e=>e.classList.contains('tecla-carbonizada')));assert(await burned.isDisabled());
  assert.equal(await page.locator('#tecladoVersus .tecla-carbonizada').count(),1);
  assert.equal(await page.evaluate(()=>demoVersus.erroresJugador),1);
  const expected=await page.evaluate(skin=>skin==='original'?personajesVersus.guardiana.base:skin==='tower_guardiana'?TowerRewards.asset(skin,'base'):CosmeticStore.asset(skin,'base'),skin);
  assert.equal(await page.locator('#personajeVersusUno').getAttribute('src'),expected);
  await page.screenshot({path:path.join(root,'.local-developer/azrak-keyboard/'+skin+'.png')});
  await page.waitForTimeout(2700);assert(await burned.evaluate(e=>e.classList.contains('tecla-carbonizada')));
  await page.evaluate(()=>{azrakState.player={...azrakState.player,index:1,letters:[],errors:0};azrakState.events=[{seq:4,type:'word',actor:'player',correct:false}];renderizarDueloAventuraAutoritativo(azrakState);});
  assert.equal(await page.locator('#tecladoVersus .tecla-carbonizada').count(),0);console.log('PASS Azrak forced key: '+skin);
 }
 assert.deepEqual(errors,[]);

}finally{await browser?.close();server.closeAllConnections();server.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
