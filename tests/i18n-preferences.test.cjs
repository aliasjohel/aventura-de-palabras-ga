const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {create,preferenceKey}=require('../js/i18n.js');
const root=path.resolve(__dirname,'..');
const loadJson=async file=>JSON.parse(fs.readFileSync(path.join(root,'locales',file),'utf8'));
function fixture(initial={}){
 const data=new Map(Object.entries(initial)),access=[];
 return {data,access,storage:{getItem(key){access.push(['read',key]);return data.get(key)||null;},setItem(key,value){access.push(['write',key]);data.set(key,value);}}};
}
for(const [languages,expected] of [[['es-MX'],'es'],[['en-US'],'en'],[['pt-PT'],'pt-BR'],[['pt-BR'],'pt-BR'],[['de-DE','en-GB','pt-BR'],'en'],[['fr-FR'],'es'],[[],'es']]){
 test(`automatic device preference ${languages} resolves to ${expected}`,async()=>{const api=create({loadJson,deviceLanguages:()=>languages});await api.init();assert.equal(api.language,expected);assert.equal(api.preference,'auto');});
}
test('manual selection persists, overrides device locale, and writes only the new key',async()=>{
 const original={progresoAventuraGA:'saved-progress',aventuraTiendaV1:'purchases',session:'identity'},f=fixture(original);
 let api=create({loadJson,storage:f.storage,deviceLanguages:()=>['pt-BR']});await api.init();
 assert.equal(api.language,'pt-BR');assert.equal(api.t('menu.shop'),'✦ Loja');
 await api.setPreference('en');assert.equal(api.t('menu.shop'),'✦ Shop');
 api=create({loadJson,storage:f.storage,deviceLanguages:()=>['es-AR']});await api.init();assert.equal(api.language,'en');
 assert.equal(api.preference,'en');Object.entries(original).forEach(([key,value])=>assert.equal(f.data.get(key),value));
 assert(f.access.every(([,key])=>key===preferenceKey));
 await api.setPreference('auto');assert.equal(f.data.get(preferenceKey),'auto');assert.equal(api.language,'es');
});
test('invalid stored preferences use automatic without resetting any data',async()=>{
 const f=fixture({[preferenceKey]:'broken'}),api=create({loadJson,storage:f.storage,deviceLanguages:()=>['en-GB']});await api.init();
 assert.equal(api.language,'en');assert.equal(f.data.get(preferenceKey),'broken');assert.equal(f.access.length,1);
});
test('missing English keys and malformed templates fall back to exact Spanish',async()=>{
 const api=create({report:()=>{},loadJson:async file=>{const data=await loadJson(file);if(file==='en/menu.json'){delete data.shop;data.modes='{missing}';}return data;}});
 await api.init();await api.setPreference('en');assert.equal(api.t('menu.shop'),'✦ Tienda');assert.equal(api.t('menu.modes'),'⚔️ Modos de juego');
});
test('unavailable locale catalog falls back and can be retried after recovery',async()=>{
 let offline=true;
 const api=create({report:()=>{},loadJson:async file=>{if(offline&&file==='pt-BR/menu.json')throw Error('offline');return loadJson(file);}});
 await api.init();await api.setPreference('pt-BR');assert.equal(api.t('menu.shop'),'✦ Tienda');
 offline=false;await api.setPreference('pt-BR');assert.equal(api.t('menu.shop'),'✦ Loja');
});
test('storage denial keeps session language working and reports that it was not saved',async()=>{
 const api=create({loadJson,report:()=>{},storage:{getItem(){throw Error('denied');},setItem(){throw Error('denied');}}});
 await api.init();const result=await api.setPreference('en');assert(result.applied);assert(!result.saved);assert.equal(api.language,'en');
});
test('rapid selections cannot apply or persist an older language after a newer one',async()=>{
 let release;
 const pending=new Promise(resolve=>{release=resolve;}),f=fixture();
 const api=create({storage:f.storage,loadJson:async file=>{if(file.startsWith('en/'))await pending;return loadJson(file);}});
 await api.init();const old=api.setPreference('en');await Promise.resolve();await Promise.resolve();
 await api.setPreference('pt-BR');release();assert(!(await old).applied);assert.equal(api.language,'pt-BR');assert.equal(f.data.get(preferenceKey),'pt-BR');
});
test('new locale registration uses the same selection logic',async()=>{
 const api=create({deviceLanguages:()=>['fr-CA'],loadJson:async file=>{if(file==='languages.json'){const r=await loadJson(file);r.languages.push({id:'fr',name:'Français',locale:'fr',matches:['fr']});return r;}if(file.startsWith('fr/'))return {};return loadJson(file);}});
 await api.init();assert.equal(api.language,'fr');assert.equal(api.t('menu.shop'),'✦ Tienda');
});
test('all catalog files are installed with this release and available from cache offline',async()=>{
 const worker=fs.readFileSync(path.join(root,'sw.js'),'utf8');let network=0;
 const context=vm.createContext({URL,Headers,Request,Response,console,self:{addEventListener(){},registration:{scope:'https://test.local/'}},
 caches:{open:async()=>({match:async request=>new Response(fs.readFileSync(path.join(root,new URL(request.url).pathname),'utf8'))})},fetch:async()=>{network++;throw Error('offline');}});
 vm.runInContext(worker+'\nglobalThis.assets=CORE_ASSETS;globalThis.revisions=ASSET_REVISIONS;globalThis.respond=responderRecursoEstatico;',context);
 const registry=await loadJson('languages.json');
 for(const id of ['es','en','pt-BR'])for(const ns of registry.namespaces){const resource=`./locales/${id}/${ns}.json`;assert(context.assets.includes(resource));assert.equal(context.revisions[resource],'aventura-palabras-runtime-v344');const response=await context.respond({request:new Request('https://test.local/'+resource.slice(2))});assert.deepEqual(await response.json(),await loadJson(`${id}/${ns}.json`));}
 assert.equal(network,0);
});
