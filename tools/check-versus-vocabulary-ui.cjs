// Browser-only integration and previous-client compatibility. All external requests blocked.
const fs=require('node:fs'),http=require('node:http'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const source=require('../data/versus-vocabulary.json');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{
 let relative=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\//,'');
 const legacy=relative.startsWith('legacy/');if(legacy)relative=relative.slice(7);
 const file=path.resolve(root,relative);if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
 try{let data=legacy&&['index.html','js/app.js'].includes(relative)?cp.execFileSync('git',['show','8a85789:'+relative],{maxBuffer:4e6}):fs.readFileSync(file);
 res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json'})[path.extname(file)]||'application/octet-stream');res.end(data);
 }catch{res.writeHead(404);res.end();}
});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'msedge',headless:true});try{
 for(const legacy of [false,true]){
  const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});await context.route('https://**/*',r=>r.abort());
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:'+server.address().port+'/'+(legacy?'legacy/':'')+'index.html');await page.evaluate(()=>I18n.ready);
  if(legacy){
   const compatibility=await page.evaluate(additions=>{
    if(globalThis.ExpandedVersusWordBanks)return false;
    for(const[language,topics]of Object.entries(additions)){
     const motor=VersusEngine.paraIdioma(language);
     for(const words of Object.values(topics))for(const word of words){
      const letters=[...new Set(motor.obtenerClavePalabra(word))];
      if(!motor.palabraCompletada(word,letters)||motor.obtenerProgreso(word,letters).join('')!==word)return false;
     }
    }
    return true;
   },source.additions);assert(compatibility,'v367 can render and solve all new server-sent words');
  }else{
   for(const lang of ['es','en','pt-BR']){
    await page.evaluate(async language=>{document.getElementById('introOficial')?.remove();document.body.classList.remove('intro-pendiente');mostrarPantalla(pantallaMenu);await I18n.setPreference(language);adaptadorSalasVersus=adaptadorLocalSalasVersus;modoArcadeActivo=false;abrirPreparacionVersus();},lang);
    for(const theme of Object.keys(source.additions.en)){
     const result=await page.evaluate(({language,theme,additions})=>{
      tematicaVersus.value=theme;tematicaVersus.dispatchEvent(new Event('change'));completarPalabrasAleatoriasVersus();
      const first=inputsPalabrasVersus.map(n=>n.value),bank=obtenerBancosPalabrasVersus()[theme];
      const autoValid=validarPreparacionVersus(true)&&first.every(w=>bank.includes(w));
      fijarPalabraVersus(0,true);completarPalabrasAleatoriasVersus();const fixed=inputsPalabrasVersus[0].value===first[0];
      const manual=language==='es'?bank.slice(0,5):additions.slice(0,5);
      inputsPalabrasVersus.forEach((input,i)=>{input.value=manual[i];input.dispatchEvent(new Event('input',{bubbles:true}));});
      return {autoValid,fixed,manualValid:validarPreparacionVersus(true),count:bank.length};
     },{language:lang,theme,additions:lang==='es'?[]:source.additions[lang][theme]});
     assert(result.autoValid&&result.fixed&&result.manualValid,lang+':'+theme);
    }
    for(const mode of ['tower','adventure-duel']){
     const identical=await page.evaluate(({lang,mode})=>{iniciarContextoPalabras(mode);return obtenerBancosPalabrasVersus()===(lang==='es'?SpanishWordBanks.versus:LocalVersusWordBanks.banks[lang]);},{lang,mode});
     assert(identical,lang+' '+mode+' keeps old bank identity');
    }
    await page.evaluate(()=>iniciarContextoPalabras('versus'));
    assert(await page.evaluate(lang=>obtenerBancosPalabrasVersus()===(lang==='es'?SpanishWordBanks.versus:ExpandedVersusWordBanks.banks[lang]),lang));
   }
   // Cross-language room: interface remains Spanish while English server-owned words are selected.
   const roomLanguage=await page.evaluate(async()=>{
    mostrarPantalla(pantallaMenu);await I18n.setPreference('es');
    adaptadorSalasVersus={proveedor:'supabase',obtenerSala:()=>({idioma:'en'})};
    iniciarContextoPalabras('online',true);
    return contextoPalabrasCombate.language==='en'&&obtenerBancosPalabrasVersus()===ExpandedVersusWordBanks.banks.en;
   });assert(roomLanguage);
  }
  assert.deepEqual(errors,[]);await context.close();
 }
 console.log('PASS browser: 3 languages x 10 themes, new manual words, automatic words and fixed regeneration; exact Tower/adventure-duel bank identity; room-owned language; v367 renders/solves all 2581 additions. External network blocked.');
}finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
