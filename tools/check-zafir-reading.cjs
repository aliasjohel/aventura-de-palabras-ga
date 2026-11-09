// Isolated rendering of the real introduction; no game account or external traffic.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const app=fs.readFileSync(path.join(root,'js/app.js'),'utf8');
const start=app.indexOf('async function presentarDesafioMagoDesierto()');
const intro=app.slice(start,app.indexOf('\nconst escenasCinematicaFinalDesierto',start));
const css=fs.readFileSync(path.join(root,'css/styles.css'),'utf8');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});let checked=0;
 try{
  for(const width of [280,320,360,393])for(const height of [480,640])for(const reduced of [false,true])for(const lang of ['es','en','pt-BR']){
   const context=await browser.newContext({viewport:{width,height},reducedMotion:reduced?'reduce':'no-preference'});
   await context.route('**/*',route=>route.abort());
   const page=await context.newPage();
   await page.setContent('<style>'+css+'</style><button id="previous">Inicio</button><div id="fixture" style="position:fixed;inset:24px 0 24px;overflow:hidden"></div>');
   const narrative=JSON.parse(fs.readFileSync(path.join(root,'locales',lang,'adventure.json'),'utf8')).narrative;
   const translation=narrative.extra37;
   await page.evaluate(({intro,translation,narrative})=>{
    window.escenarioActual=1;window.misionActual=9;window.mundoDosCompletado=false;
    window.CharacterMusic={startScene:()=>({close(){window.musicClosed=true;}})};
    window.srcMagoBaseVersus='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
    window.contenedorEscenario=document.querySelector('#fixture');
    window.prefiereReducirMovimiento=matchMedia('(prefers-reduced-motion: reduce)');
    window.esperarMovimiento=()=>Promise.resolve();
    window.GameUI={key:()=>translation,text:(node,text)=>{node.textContent=text;}};
    document.querySelector('#previous').focus();
    (0,eval)(intro);window.done=false;window.presentarDesafioMagoDesierto().then(()=>{window.done=true;});
    document.querySelector('.mensaje-encuentro-mago strong').textContent=narrative.cinema24;
    document.querySelector('.mensaje-encuentro-mago p').textContent=narrative.cinema25;
   },{intro,translation,narrative});
   const button=page.locator('.continuar-desafio-mago');
   await button.waitFor({state:'visible'});
   assert.equal(await page.evaluate(()=>window.done),false);
   assert.equal(await button.textContent(),translation);
   await button.scrollIntoViewIfNeeded();
   const rect=await button.boundingBox();
   assert.ok(rect&&rect.x>=0&&rect.x+rect.width<=width+1&&rect.y>=24&&rect.y+rect.height<=height-24+1,JSON.stringify({width,height,reduced,lang,rect}));
   await button.click();
   await page.waitForFunction(()=>window.done===true);
   assert.equal(await page.locator('.desafio-mago-desierto').count(),0);
   assert.equal(await page.evaluate(()=>window.musicClosed),true);
   assert.equal(await page.evaluate(()=>document.activeElement.id),'previous');
   checked++;await context.close();
  }
  console.log(JSON.stringify({passed:true,layouts:checked,widths:[280,320,360,393],heights:[480,640],languages:['es','en','pt-BR'],reducedMotion:[false,true],externalRequestsAllowed:false}));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
