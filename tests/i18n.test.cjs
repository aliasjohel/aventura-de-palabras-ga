const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {create}=require('../js/i18n.js');
const root=path.resolve(__dirname,'..');
const loadJson=async file=>JSON.parse(fs.readFileSync(path.join(root,'locales',file),'utf8'));
test('Spanish catalog preserves all sample HTML bindings exactly',async()=>{
  const api=create({loadJson});await api.init();
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
  const entries=[...html.matchAll(/data-i18n="([^"]+)"[^>]*>([^<]*)</g)];
  assert.equal(entries.length,13);
  entries.forEach(([,key,original])=>assert.equal(api.t(key),original));
  assert.equal(api.language,'es');assert.equal(api.fallbackLanguage,'es');
});
test('parameters, plurals and missing keys are handled without interpreting HTML',async()=>{
  const reports=[];
  const api=create({report:message=>reports.push(message),loadJson:async file=>{
    const values=await loadJson(file);
    return file==='es/common.json'?{...values,example:{one:'{count} moneda para {name}',other:'{count} monedas para {name}'}}:values;
  }});await api.init();
  assert.equal(api.t('common.example',{count:1,name:'Aren'}),'1 moneda para Aren');
  assert.equal(api.t('common.example',{count:2,name:'<b>Shadow</b>'}),'2 monedas para <b>Shadow</b>');
  assert.equal(api.t('common.example'),'common.example');
  assert.equal(api.t('unknown.key'),'unknown.key');api.t('unknown.key');
  assert.equal(reports.filter(message=>message.includes('unknown.key')).length,1);
});
test('DOM bindings retain Spanish on failures and preserve child elements/listeners',async()=>{
  function node(key,text,children=[]){return {textContent:text,children,getAttribute:name=>name==='data-i18n'?key:null};}
  const missing=node('missing.key','Texto original');
  const nested=node('menu.title','Título con botón',[{}]);
  const translated=node('menu.configuration','Configuración');
  const doc={documentElement:{},querySelectorAll:()=>[missing,nested,translated]};
  const api=create({loadJson,document:doc,report:()=>{}});await api.init();api.apply();
  assert.equal(missing.textContent,'Texto original');assert.equal(nested.textContent,'Título con botón');
  assert.equal(translated.textContent,'Configuración');assert.equal(doc.documentElement.lang,'es-AR');
});
test('failed catalog leaves its bindings intact while the menu remains available',async()=>{
  const api=create({report:()=>{},loadJson:async file=>{if(file==='es/common.json')throw Error('offline');return loadJson(file);}});
  await api.init();assert.equal(api.t('menu.adventure'),'🗺️ Aventura');assert.equal(api.t('common.done'),'common.done');
});
test('registry failure can be retried; initialization is shared',async()=>{
  let unavailable=true,requests=0;
  const api=create({loadJson:async file=>{requests++;if(unavailable)throw Error('offline');return loadJson(file);}});
  await assert.rejects(api.init());unavailable=false;
  const first=api.init();assert.equal(first,api.init());await first;
  assert.equal(requests,13);
});
test('all language resources have explicit cache revisions; gameplay storage is never accessed',async()=>{
  const worker=fs.readFileSync(path.join(root,'sw.js'),'utf8');
  const context=vm.createContext({URL,Headers,Request,Response,console,self:{addEventListener(){}}});
  vm.runInContext(worker+'\n globalThis.assets=CORE_ASSETS;globalThis.revisions=ASSET_REVISIONS;',context);
  const registry=await loadJson('languages.json');
  for(const asset of ['./js/i18n.js','./locales/languages.json',...registry.namespaces.map(name=>`./locales/es/${name}.json`)]){
    assert(context.assets.includes(asset));assert.equal(context.revisions[asset],'aventura-palabras-runtime-v340');
  }
  const code=fs.readFileSync(path.join(root,'js/i18n.js'),'utf8');
  const module={exports:{}};
  const sandbox=vm.createContext({module,Intl,console});
  Object.defineProperty(sandbox,'localStorage',{get(){throw Error('game data must not be accessed');}});
  vm.runInContext(code,sandbox);await sandbox.module.exports.create({loadJson}).init();
});
test('cinematic music action follows state even if its visible label changes',()=>{
  const code=fs.readFileSync(path.join(root,'js/azrak-world.js'),'utf8');
  assert.doesNotMatch(code,/mute\.textContent\s*===/);
  const state=code.match(/let musicAction = 'mute';[\s\S]*?\n    };/)[0];
  const handler=code.match(/mute\.onclick = \(\) => \{([\s\S]*?)\n    };/)[1];
  const context=vm.createContext({mute:{textContent:'Silenciar'},muted:false,tracks:{track:{muted:false}},updateMusicState(){},controlsSuspended:()=>true});
  vm.runInContext(state+'\n globalThis.show=showMusicAction;globalThis.click=()=>{'+handler+'};',context);
  context.mute.textContent='Different visible label';context.click();assert.equal(context.muted,true);
  context.mute.textContent='Another label';context.click();assert.equal(context.muted,false);
  context.show(true);context.mute.textContent='Anything';context.click();assert.equal(context.muted,false);
});
test('installed catalog is served offline without attempting a network request',async()=>{
  const worker=fs.readFileSync(path.join(root,'sw.js'),'utf8');
  let network=0;
  const response=new Response(JSON.stringify({done:'Listo'}),{headers:{'Content-Type':'application/json'}});
  const context=vm.createContext({URL,Headers,Request,Response,console,self:{addEventListener(){},location:{origin:'https://test.local'},registration:{scope:'https://test.local/'}},
    caches:{open:async()=>({match:async()=>response})},fetch:async()=>{network++;throw Error('offline');}});
  vm.runInContext(worker+'\n globalThis.respond=responderRecursoEstatico;',context);
  const result=await context.respond({request:new Request('https://test.local/locales/es/common.json')});
  assert.deepEqual(await result.json(),{done:'Listo'});assert.equal(network,0);
});
