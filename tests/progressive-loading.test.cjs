const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),cp=require('node:child_process');
test('progressive catalogue preserves every v368 resource while the core stays below 15 MB',()=>{
 const current={self:{addEventListener(){}},URL,Request,Response},old={self:{addEventListener(){}},URL,Request,Response};
 vm.runInNewContext(fs.readFileSync('sw.js','utf8')+'\nglobalThis.assets=RESOURCE_ASSETS;globalThis.core=CORE_ASSETS;',current);
 vm.runInNewContext(cp.execFileSync('git',['show','d3d0bf1:sw.js'],{encoding:'utf8'})+'\nglobalThis.assets=CORE_ASSETS;',old);
 for(const path of old.assets)assert(current.assets.includes(path),path);
 assert(current.core.length<150);assert(current.core.reduce((sum,p)=>sum+fs.statSync(p==='./'?'index.html':p).size,0)<15e6);
 assert.equal(cp.execFileSync('git',['diff','--name-only','HEAD','--','assets','supabase','js/word-banks-es.js','js/word-banks-versus.js','js/word-banks-versus-expanded.js','tools/cache-legacy-v347.json'],{encoding:'utf8'}).trim(),'');
});
function loader(){const scripts=[],timers=[];const context={navigator:{onLine:true},document:{createElement:()=>({dataset:{},events:{},addEventListener(type,fn){this.events[type]=fn;},remove(){this.removed=true;}}),head:{appendChild:s=>scripts.push(s)}},setTimeout:fn=>(timers.push(fn),timers.length),clearTimeout(){}};vm.runInNewContext(fs.readFileSync('js/supabase-loader.js','utf8'),context);return {context,scripts,timers};}
test('SDK loading is single-flight, high priority and distinguishable from server failures',async()=>{
 const {context,scripts}=loader(),one=context.AventuraOnline.cargarSupabase(),two=context.AventuraOnline.cargarSupabase();
 assert.equal(one,two);assert.equal(scripts.length,1);assert.equal(scripts[0].fetchPriority,'high');
 const rejected=assert.rejects(one,e=>e.code==='SDK_LOAD_FAILED'&&/SDK/.test(e.message));scripts[0].events.error();await rejected;
 const retried=context.AventuraOnline.cargarSupabase();assert.equal(scripts.length,2);context.supabase={createClient(){}};scripts[1].events.load();assert.equal(await retried,context.supabase);
});
test('SDK timeout permits a deliberate retry and never calls a match operation',async()=>{
 const {context,scripts,timers}=loader(),pending=context.AventuraOnline.cargarSupabase();
 const rejected=assert.rejects(pending,e=>e.code==='SDK_LOAD_FAILED'&&/Todavía no se comprobó/.test(e.message));timers[0]();await rejected;
 assert(scripts[0].removed);assert.equal(context.supabase,undefined);
});
test('hidden mission images are loaded eagerly before waiting, and challenge preflight precedes the single write',()=>{
 const app=fs.readFileSync('js/app.js','utf8');
 assert.match(app,/function esperarCargaImagen\(imagen\)\s*\{\s*imagen.loading = "eager"/);
 assert.match(app,/function esperarCargaFondoEscenario\(\)\s*\{\s*fondoEscenario.loading = "eager"/);
 const submit=app.slice(app.indexOf('formPreparacionVersus.addEventListener("submit"'),app.indexOf('btnCompletarPalabrasPruebasVersus.addEventListener'));
 assert(submit.indexOf('await prepararImagenesCombate(')<submit.indexOf('await adaptadorSalasVersus.guardarDesafio('));
 assert.match(submit,/if \(btnConfirmarPalabrasVersus.disabled\) return/);
 assert.equal((submit.match(/guardarDesafio\(/g)||[]).length,1);
});
