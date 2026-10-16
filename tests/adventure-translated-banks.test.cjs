const {test}=require('node:test'),assert=require('node:assert/strict');
const rules=require('../js/word-gameplay.js'),engine=require('../js/versus-engine.js');
const original=require('../js/word-banks-es.js'),worlds=require('../js/word-banks-worlds.js'),forest=require('../js/word-banks-forest.js');
const spanish=[...original.adventure,{palabras:original.azrak}];
test('four complete immutable banks per language contain 400 valid word/hint pairs',()=>{
 for(const [language,banks] of Object.entries(worlds.banks)){
  assert.deepEqual(Object.keys(banks),['1','2','3','4']);assert(Object.isFrozen(banks));
  for(const bank of Object.values(banks)){
   assert.equal(bank.length,50);assert(Object.isFrozen(bank));rules.validateBank(bank,language,{hints:true});
   for(const item of bank){assert(Object.isFrozen(item));assert(item.pista.length>15);assert(item.pista.length<150);}
  }
 }
});
test('every new answer is reachable, reveals original accents and preserves combat constants',()=>{
 for(const [language,banks] of Object.entries(worlds.banks)){
  const motor=engine.paraIdioma(language);assert.deepEqual(motor.CONFIG,engine.CONFIG);
  for(const bank of Object.values(banks))for(const {palabra} of bank){
   const letters=[...new Set(rules.rules(language).key(palabra))];
   assert(motor.palabraCompletada(palabra,letters));assert.equal(motor.obtenerProgreso(palabra,letters).join(''),palabra);
   assert.equal(motor.contarDescubiertas(palabra,letters),palabra.length);
  }
 }
});
test('length and distinct-letter workload remain within 15 percent of each original world',()=>{
 const average=(bank,fn)=>bank.reduce((sum,item)=>sum+fn(item),0)/bank.length;
 for(const [language,banks] of Object.entries(worlds.banks))for(const [world,bank] of Object.entries(banks)){
  const length=average(bank,x=>x.palabra.length),sourceLength=average(spanish[world].palabras,x=>x.palabra.length);
  const letters=average(bank,x=>new Set(rules.rules(language).key(x.palabra)).size),sourceLetters=average(spanish[world].palabras,x=>new Set(rules.rules('es').key(x.palabra)).size);
  assert(Math.abs(length/sourceLength-1)<.15,language+' world '+world+' length');
  assert(Math.abs(letters/sourceLetters-1)<.15,language+' world '+world+' letters');
 }
});
test('five-world history encoding preserves forest-v1 IDs and isolates languages and worlds',()=>{
 for(const language of ['en','pt-BR']){
  const banks=[{palabras:forest.banks[language]},...[1,2,3,4].map(world=>({palabras:worlds.banks[language][world]}))];
  const previous=rules.encodeHistory({0:{usadas:[banks[0].palabras[0].palabra],enMision:[],mision:2}},[banks[0]],language);
  const migrated=rules.decodeHistory(previous,banks,language);
  assert.equal(migrated[0].usadas[0],banks[0].palabras[0].palabra);
  for(let world=1;world<5;world++)migrated[world]={usadas:banks[world].palabras.map(x=>x.palabra),enMision:[],mision:4};
  const saved=rules.encodeHistory(migrated,banks,language);assert.equal(saved[0].used[0],previous[0].used[0]);
  for(let world=1;world<5;world++)assert.equal(new Set(saved[world].used).size,50);
  assert.deepEqual(rules.decodeHistory(saved,banks,language),migrated);
 }
});
