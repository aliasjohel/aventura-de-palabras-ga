'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fallback=path.resolve(__dirname,'..'),root=path.resolve(process.env.TOWER_FEEDBACK_PACKAGE||fallback),out=path.resolve(process.env.TOWER_ABILITY_QA_OUTPUT||require('os').tmpdir()+'/aventura-tower-ability-preview');

test('Tower abilities show the opponent keyboard; Classic and Ranked retain Zafir feedback',{timeout:180000},async()=>{
 fs.mkdirSync(out,{recursive:true});const errors=[],rows=[];let browser;
 const server=http.createServer((req,res)=>{try{const rel=decodeURIComponent(new URL(req.url,'http://local').pathname).replace(/^\//,'')||'index.html';if(rel.split('/').includes('..'))throw Error('Path');let file=path.join(root,rel);if(!fs.existsSync(file))file=path.join(fallback,rel);let body=fs.readFileSync(file);res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.json':'application/json','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.mp3':'audio/mpeg'})[path.extname(rel)]||'application/octet-stream');res.end(body);}catch{res.writeHead(404).end();}});
 try{
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;browser=await chromium.launch({channel:'msedge',headless:true});
  const context=await browser.newContext({viewport:{width:844,height:390},serviceWorkers:'block'});await context.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort());const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(origin);await page.evaluate(()=>I18n.ready);await page.clock.install();await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now()+1000)));
  await page.evaluate(()=>{const ensure=async paths=>Promise.all(paths.map(async src=>{const image=new Image();image.src=src;await image.decode();}));globalThis.GameResources={...GameResources,ensure,combat:ensure};globalThis.AdventureAccountV2={...AdventureAccountV2,owns:()=>true};document.getElementById('pilotAdmission')?.remove();});
  const setup=async(side,outfit='')=>{
   await page.evaluate(({side})=>{TowerOutfitPreview.reset();document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente','intro-activa');document.getElementById('pilotAdmission')?.remove();cancelarCinematicaFinalVersus();detenerRondaVersus();limpiarEntradaDueloVersus();limpiarAnimacionHabilidadVersus();ocultarAnuncioFinVersus();modoArcadeActivo=true;torreEnCurso=false;modoPruebasActivo=false;partidaOnlineVersus=null;dueloAventuraActivo=null;adaptadorSalasVersus=adaptadorLocalSalasVersus;personajeJugadorVersus=side==='player'?'guardiana':'mago';personajeRivalVersus=side==='player'?'mago':'guardiana';finalizarContextoPalabras();iniciarContextoPalabras('versus');const theme=Object.keys(obtenerBancosPalabrasVersus())[0];tematicaVersus.value=theme;palabrasSecretasVersus=obtenerBancosPalabrasVersus()[theme].slice(0,maximoPalabrasVersus);mostrarPantalla(pantallaVersus);prepararDueloVersus({comenzarRonda:false});limpiarEntradaDueloVersus();}, {side});
   if(outfit)await page.evaluate(id=>TowerOutfitPreview.select(id),outfit);await page.clock.runFor(30);await page.evaluate(()=>Promise.all([personajeVersusUno,personajeVersusDos,fondoVersus].map(image=>image.decode())));
  };
  const characters=['explorador','mago','guardiana','dragon','hombre_lobo','t_shadow','guardian_alba','dragon_hielo','azrak','kalamo','kairos'];
  for(const motion of ['no-preference','reduce'])for(const character of characters){
   await page.emulateMedia({reducedMotion:motion});await setup('player');
   await page.evaluate(character=>{
    personajeJugadorVersus=character;personajeRivalVersus='guardiana';configurarPersonajesCombateVersus();ocultarVistaImpactoRivalVersus();demoVersus.partidaFinalizada=false;tutorialCombateVersus.activo=false;
    const p={index:0,lives:5,errors:0,letters:[],completed:0,finished:false,remaining:200,charge:6,hint:'A',effect:'',effect_until:null,mask:[null,null,null],theme:Object.keys(obtenerBancosPalabrasVersus())[0]};
    const state={started:true,finished:false,playerCharacter:character,character:'guardiana',player:{...p},npc:{...p},events:[]};
    globalThis.__previewState=state;globalThis.__sent=0;torreEnCurso=true;ultimoEventoDueloAventura=0;efectoDueloAventura=':null';
    torreAutoritativa={...torreAutoritativa,active:()=>true,paused:()=>false,view:()=>({detail:state}),send:async(action)=>{if(action!=='ability')throw Error('Unexpected action');__sent++;state.player.charge=0;state.events.push({seq:1,type:'ability',actor:'player'});renderizarDueloAventuraAutoritativo(state);return {attempt:{detail:state}};}};btnHabilidadVersus.disabled=false;
   },character);
   await page.evaluate(()=>activarHabilidadVersus());await page.clock.runFor(900);
   await page.locator('#vistaImpactoRivalVersus').evaluate(e=>{for(const a of e.getAnimations())a.currentTime=700;});
   const result=await page.evaluate(()=>({opacity:Number(getComputedStyle(vistaImpactoRivalVersus).opacity),visible:vistaImpactoRivalVersus.classList.contains('visible'),hidden:vistaImpactoRivalVersus.getAttribute('aria-hidden'),effect:miniTecladoRivalVersus.className,keys:miniTecladoRivalVersus.querySelectorAll('i').length,title:nombreImpactoRivalVersus.textContent,sent:__sent,expected:habilidadesVersus[personajeJugadorVersus].efecto,state:JSON.stringify(__previewState)}));
   assert.equal(result.sent,1);assert.equal(result.visible,character!=='explorador');if(character!=='explorador'){assert(result.opacity>0.9,JSON.stringify(result));assert.equal(result.hidden,'false');assert(result.keys>=26);assert(result.effect.includes('efecto-'+result.expected));}
   await page.evaluate(()=>renderizarDueloAventuraAutoritativo(__previewState));await page.clock.runFor(100);assert.equal(await page.evaluate(()=>JSON.stringify(__previewState)),result.state);
   if(character==='mago'&&motion==='no-preference')await page.screenshot({path:path.join(out,'tower-zafir-preview.png')});
   await page.clock.runFor(4000);assert.equal(await page.evaluate(()=>vistaImpactoRivalVersus.classList.contains('visible')),false);rows.push({motion,character,...result,state:undefined});
  }
  for(const mode of ['classic','ranked']){
   await setup('player');await page.evaluate(mode=>{modoArcadeActivo=false;torreEnCurso=false;personajeJugadorVersus='mago';personajeRivalVersus='guardiana';configurarPersonajesCombateVersus();ocultarVistaImpactoRivalVersus();ultimoEventoPartidaVersus=0;const partida={mode,eventSequence:1,me:{userId:'synthetic-player',abilityHint:''},opponent:{userId:'synthetic-npc'},lastEvent:{type:'ability_used',actorId:'synthetic-player',character:'mago'}};procesarEventoPartidaOnline(partida);},mode);
   await page.clock.runFor(900);assert.equal(await page.evaluate(()=>vistaImpactoRivalVersus.classList.contains('visible')&&miniTecladoRivalVersus.classList.contains('efecto-shuffle')),true);rows.push({mode,zafirPreview:true});
  }
  assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({passed:true,cases:rows.length,rows,productionWrites:0,errors},null,2));
 }finally{await browser?.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
});
