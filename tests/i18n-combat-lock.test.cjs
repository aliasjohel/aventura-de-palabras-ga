const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path');
const {create} = require('../js/i18n.js');
const loadJson = async file => JSON.parse(fs.readFileSync(path.join(__dirname,'../locales',file),'utf8'));

test('preference changes persist during combat but presentation waits for release',async()=>{
  const saved=new Map(), api=create({loadJson,storage:{getItem:k=>saved.get(k),setItem:(k,v)=>saved.set(k,v)}});
  await api.init();let updates=0;api.subscribe(()=>updates++);
  const release=api.lockLanguage(), before=api.t('common.done');
  const result=await api.setPreference('en');
  assert(result.deferred);assert.equal(api.preference,'en');assert.equal(api.language,'es');
  assert.equal(saved.get('aventuraIdiomaV1'),'en');assert.equal(api.t('common.done'),before);assert.equal(updates,0);
  release();assert.equal(api.language,'en');assert.equal(updates,1);
  release();assert.equal(updates,1);
});

test('latest manual, device or storage preference wins after all owners release',async()=>{
  let device=['es-AR'];const api=create({loadJson,deviceLanguages:()=>device});await api.init();
  const a=api.lockLanguage(),b=api.lockLanguage();
  await api.setPreference('en',{persist:false});await api.setPreference('pt-BR',{persist:false});
  a();assert.equal(api.language,'es');assert(api.languageLocked);
  device=['en-GB'];await api.setPreference('auto',{persist:false});b();
  assert.equal(api.language,'en');assert(!api.languageLocked);assert.equal(api.preference,'auto');
});

test('a language load that finishes during a later combat remains deferred',async()=>{
  let finish;const api=create({loadJson:async file=>{if(file==='en/common.json')await new Promise(resolve=>{finish=resolve;});return loadJson(file);}});await api.init();
  const first=api.lockLanguage(),pending=api.setPreference('en');
  while(!finish)await new Promise(resolve=>setImmediate(resolve));
  first();const second=api.lockLanguage();finish();await pending;
  assert.equal(api.language,'es');second();assert.equal(api.language,'en');
});

test('initial automatic detection cannot change the language of a combat started before catalogs finish',async()=>{
  let finish;const api=create({deviceLanguages:()=>['pt-BR'],loadJson:async file=>{if(file==='languages.json')await new Promise(resolve=>{finish=resolve;});return loadJson(file);}});
  const ready=api.init(),release=api.lockLanguage();finish();await ready;
  assert.equal(api.language,'es');release();assert.equal(api.language,'pt-BR');
});
