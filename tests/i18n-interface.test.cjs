const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {create}=require('../js/i18n.js'),{catalog}=require('../js/cosmetic-store.js');
const root=path.resolve(__dirname,'..'),loadJson=async file=>JSON.parse(fs.readFileSync(path.join(root,'locales',file),'utf8'));
const flatten=(value,prefix='',result={})=>{for(const[name,item]of Object.entries(value)){const key=prefix?prefix+'.'+name:name;if(typeof item==='string'||Object.hasOwn(item,'other'))result[key]=item;else flatten(item,key,result);}return result;};
test('interface catalogs have the same keys and interpolation parameters in all three languages',async()=>{
 for(const namespace of ['common','menu','profile','shop','characters','errors','adventure']){
  const spanish=flatten(await loadJson('es/'+namespace+'.json'));
  for(const locale of ['en','pt-BR']){
   const translated=flatten(await loadJson(locale+'/'+namespace+'.json'));assert.deepEqual(Object.keys(translated).sort(),Object.keys(spanish).sort());
   for(const[key,source]of Object.entries(spanish))for(const value of typeof translated[key]==='string'?[translated[key]]:Object.values(translated[key])){
    const params=text=>[...new Set([...text.matchAll(/\{(\w+)\}/g)].map(match=>match[1]))].sort();assert.deepEqual(params(value),params(source),locale+' '+namespace+'.'+key);
   }
  }
 }
});
test('all literal interface keys in markup and presentation modules exist in the Spanish catalog',async()=>{
 const known={};for(const ns of ['common','menu','profile','shop','characters','errors','adventure'])Object.assign(known,flatten(await loadJson('es/'+ns+'.json'),ns));
 for(const file of ['index.html','actualizar.html','js/i18n-ui.js','js/i18n-settings.js','js/player-avatar.js','js/cosmetic-shop.js','js/public-player-profile.js','js/pwa.js','js/app.js']){
  const source=fs.readFileSync(path.join(root,file),'utf8');
  for(const[,name]of source.matchAll(/["']((?:common|menu|profile|shop|characters|errors)\.[\w.-]+)["']/g))if(!name.endsWith('.'))assert(Object.hasOwn(known,name),file+' '+name);
 }
});
test('Spanish outfit text is exact, all existing IDs and preview poses have translations',async()=>{
 for(const locale of ['es','en','pt-BR']){
  const shop=await loadJson(locale+'/shop.json');for(const outfit of catalog){assert(shop.skins[outfit.id]);for(const pose of outfit.poses)assert(shop.poses[pose],pose);if(locale==='es'){assert.equal(shop.skins[outfit.id].name,outfit.name);assert.equal(shop.skins[outfit.id].description,outfit.description);}}
 }
 const avatars=(await loadJson('es/characters.json')).avatars;
 for(const locale of ['en','pt-BR']){const names=(await loadJson(locale+'/characters.json')).avatars;for(const id of ['t-shadow','kalamo','azrak'])assert.equal(names[id],avatars[id]);}
});
function element(){return {children:[],attributes:new Map(),replaceChildren(...nodes){for(const old of this.children)old.isConnected=false;this.children=nodes;},setAttribute(name,value){this.attributes.set(name,value);},getAttribute(name){return this.attributes.get(name)??null;},removeAttribute(name){this.attributes.delete(name);},get textContent(){return this.children.map(node=>node.nodeValue??'').join('');},set textContent(value){this.replaceChildren({nodeValue:value,isConnected:true});}};}
async function ui({failed=false}={}){
 const api=create({loadJson:failed?async()=>{throw Error('offline');}:loadJson,report:()=>{}});api.ready=api.init().then(()=>true).catch(()=>false);
 const context={I18n:api,console:{warn(){}},document:{createTextNode:nodeValue=>({nodeValue,isConnected:true})}};
 vm.runInNewContext(fs.readFileSync(path.join(root,'js/i18n-es-fallback.js'),'utf8'),context);
 vm.runInNewContext(fs.readFileSync(path.join(root,'js/i18n-ui.js'),'utf8'),context);await api.ready;return {api,U:context.GameUI};
}
test('dynamic texts change language while keeping nested references and literal user names',async()=>{
 const {api,U}=await ui(),node=element();
 U.text(node,U.key('shop.previewAlt',{hero:'Shadow',outfit:U.key('shop.skins.aren-bosque.name'),pose:U.key('shop.poses.ataque')}));
 assert.equal(node.textContent,'Shadow · Guardián del Bosque · Ataque');
 const control={nodeValue:' [control]',isConnected:true,listener:()=>42};node.children.push(control);
 await api.setPreference('en');assert.equal(node.textContent,'Shadow · Forest Guardian · Attack [control]');assert.equal(control.listener(),42);
 await api.setPreference('pt-BR');assert.equal(node.textContent,'Shadow · Guardião da Floresta · Ataque [control]');
 U.text(node,'Mi perfil');await api.setPreference('en');assert.equal(node.textContent,'Mi perfil');
 U.text(node,U.key('profile.viewAlias',{alias:'<img src=x onerror=alert(1)>'}));assert.equal(node.textContent,'View <img src=x onerror=alert(1)>’s profile');assert.equal(node.children.length,1);
});
test('late literal assignments and cleared statuses cannot be overwritten by a prior binding',async()=>{
 const {api,U}=await ui(),node=element();U.text(node,U.key('profile.adventurer'));node.textContent='Aren';await api.setPreference('en');assert.equal(node.textContent,'Aren');
 U.text(node,U.key('shop.purchased'));node.textContent='';await api.setPreference('pt-BR');assert.equal(node.textContent,'');
});
test('known and unknown error notices switch language without changing errors or operations',async()=>{
 const {api,U}=await ui(),node=element(),error=Error('No pudimos leer tus compras. No se cobró ninguna moneda.');
 U.text(node,U.error(error));await api.setPreference('en');assert.equal(node.textContent,'We could not load your purchases. No coins were charged.');assert.equal(error.message,'No pudimos leer tus compras. No se cobró ninguna moneda.');
 await api.setPreference('es');U.text(node,U.error(Error('backend diagnostic'),'errors.publicProfile'));assert.equal(node.textContent,'backend diagnostic');
 await api.setPreference('pt-BR');assert.equal(node.textContent,'Não foi possível carregar este perfil.');await api.setPreference('es');assert.equal(node.textContent,'backend diagnostic');
});
test('complete catalog failure leaves a usable, exact Spanish dynamic interface',async()=>{
 const {U}=await ui({failed:true}),node=element();U.text(node,U.key('shop.buyPrice',{coins:200}));assert.equal(node.textContent,'Comprar por 200 monedas');
 U.text(node,U.key('profile.appearance',{avatar:U.key('characters.avatars.kalamo'),frame:U.key('profile.frames.hielo')}));assert.equal(node.textContent,'Cálamo · Marco Hielo');
});
test('the presentation layer remains usable with the previous installed i18n core',async()=>{
 const {api,U}=await ui(),node=element();delete api.resolve;
 U.text(node,U.key('common.pwa.applying'));assert.equal(node.textContent,'Aplicando la actualización…');
 U.text(node,U.key('shop.buyPrice',{coins:200}));assert.equal(node.textContent,'Comprar por 200 monedas');
});
test('the generated offline fallback matches the central Spanish catalogs',async()=>{
 const values={};for(const ns of ['common','menu','profile','shop','characters','errors','adventure'])Object.assign(values,flatten(await loadJson('es/'+ns+'.json'),ns));
 const context={};vm.runInNewContext(fs.readFileSync(path.join(root,'js/i18n-es-fallback.js'),'utf8'),context);assert.deepEqual(JSON.parse(JSON.stringify(context.I18nSpanishUI)),values);
});
test('coin notices use natural singular and plural forms without rewriting Spanish',async()=>{
 const {api,U}=await ui();assert.equal(U.resolve(U.key('shop.missingCoins',{coins:1})),'Te faltan 1 monedas');
 await api.setPreference('en');assert.equal(U.resolve(U.key('shop.missingCoins',{coins:1})),'You need 1 more coin');assert.equal(U.resolve(U.key('shop.missingCoins',{coins:2})),'You need 2 more coins');
 await api.setPreference('pt-BR');assert.equal(U.resolve(U.key('shop.missingCoins',{coins:1})),'Falta 1 moeda');assert.equal(U.resolve(U.key('shop.missingCoins',{coins:2})),'Faltam 2 moedas');
});
test('profile display metadata distinguishes a default name from an actual alias without changing the profile',async()=>{
 const source=fs.readFileSync(path.join(root,'js/app.js'),'utf8');const from=source.indexOf('globalThis.PlayerProfile = Object.freeze('),to=source.indexOf('async function cargarRankingPublico()',from);assert(from>=0&&to>from);
 let profile={id:'existing-id',alias:null,coins:321};const context={aliasSalaVersus:{value:''},asegurarConexionSalasVersus:async()=>({obtenerPerfilJugador:async()=>profile})};vm.runInNewContext(source.slice(from,to),context);
 const display=await context.PlayerProfile.cargar();assert.equal(display.alias,'Aventurero');assert.equal(display.aliasIsFallback,true);assert.deepEqual(profile,{id:'existing-id',alias:null,coins:321});
 profile={...profile,alias:'Aventurero'};const named=await context.PlayerProfile.cargar();assert.equal(named.aliasIsFallback,false);assert.equal(named.alias,'Aventurero');
});
