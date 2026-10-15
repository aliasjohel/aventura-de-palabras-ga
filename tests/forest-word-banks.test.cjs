const {test}=require('node:test'),assert=require('node:assert/strict');
const words=require('../js/word-gameplay.js'),engine=require('../js/versus-engine.js');
const original=require('../js/word-banks-es.js'),forest=require('../js/word-banks-forest.js');
test('pilot contains complete, immutable, valid banks with matching hints',()=>{
 for(const [language,bank] of Object.entries(forest.banks)){
  assert.equal(bank.length,50);assert(Object.isFrozen(bank));words.validateBank(bank,language,{hints:true});
  for(const entry of bank){assert(Object.isFrozen(entry));assert(entry.pista.length>15);assert(entry.pista.length<150);}
 }
 assert.equal(forest.version,'forest-v1');
});
test('every answer is reachable and reveals its original spelling including Portuguese diacritics',()=>{
 for(const [language,bank] of Object.entries(forest.banks)){
  const motor=engine.paraIdioma(language);
  for(const {palabra} of bank){const letters=[...new Set(words.rules(language).key(palabra))];
   assert(motor.palabraCompletada(palabra,letters));assert.equal(motor.obtenerProgreso(palabra,letters).join(''),palabra);
   for(const letter of letters)assert(words.rules(language).alphabet.includes(letter));
  }
 }
 assert.equal(engine.paraIdioma('pt-BR').obtenerProgreso('OURIÇO',['O','U','R','I','C']).join(''),'OURIÇO');
});
test('word length and distinct-letter workloads stay close to the Spanish pilot',()=>{
 const stats=(bank,language)=>({length:bank.reduce((s,e)=>s+e.palabra.length,0)/50,distinct:bank.reduce((s,e)=>s+new Set(words.rules(language).key(e.palabra)).size,0)/50});
 const reference=stats(original.adventure[0].palabras,'es');
 for(const [language,bank] of Object.entries(forest.banks)){
  const result=stats(bank,language);assert(Math.abs(result.length/reference.length-1)<.15);assert(Math.abs(result.distinct/reference.distinct-1)<.15);
  assert.deepEqual(engine.paraIdioma(language).CONFIG,engine.CONFIG);
 }
});
test('history IDs are scoped by language and cannot be read as Spanish history',()=>{
 for(const [language,bank] of Object.entries(forest.banks)){
  const worlds=[{palabras:bank}],history={0:{usadas:bank.map(x=>x.palabra),enMision:[bank[0].palabra],mision:3}};
  const saved=words.encodeHistory(history,worlds,language);
  assert(saved[0].used.every(id=>id.startsWith(language+':world:0:')));
  assert.deepEqual(words.decodeHistory(saved,worlds,language),history);
  assert.equal(words.decodeHistory(saved,original.adventure,'es')[0].usadas.length,0);
 }
});
