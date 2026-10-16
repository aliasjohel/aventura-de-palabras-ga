const {test}=require('node:test');
const assert=require('node:assert/strict');
const {banks,version}=require('../js/word-banks-versus.js');
const original=require('../js/word-banks-es.js');
const rules=require('../js/word-gameplay.js');
const engine=require('../js/versus-engine.js');

test('local banks cover all original topics and every answer is reachable',()=>{
 assert.equal(version,'local-versus-v1');assert(Object.isFrozen(banks));
 for(const [language,topics] of Object.entries(banks)){
  assert.deepEqual(Object.keys(topics),Object.keys(original.versus));
  const motor=engine.paraIdioma(language);
  for(const words of Object.values(topics)){
   assert(words.length>=40);assert(Object.isFrozen(words));assert(rules.validateBank(words,language));
   for(const word of words){
    const letters=[...new Set(motor.obtenerClavePalabra(word))];
    let state={palabra:word,letras:[],errores:0};
    for(const letra of letters)state={...state,...motor.evaluarLetra({...state,letra})};
    assert(state.palabraCompleta,word);assert.equal(state.errores,0);
    assert.equal(motor.obtenerProgreso(word,state.letras).join(''),word);
   }
   // All five starting answers and four possible recovery answers are distinct.
   const used=words.slice(0,5);
   for(let n=0;n<4;n++){const next=motor.elegirPalabraRecuperacion(words,used,()=>0);assert(next);assert(!used.includes(next));used.push(next);}
   assert.equal(motor.elegirPalabraRecuperacion(words,words),'');
  }
  assert.deepEqual(motor.CONFIG,engine.CONFIG);
 }
});

test('Portuguese matching keeps display accents and merges equivalent spellings',()=>{
 const motor=engine.paraIdioma('pt-BR');
 for(const word of ['AÇAÍ','MAÇÃ','LIMÃO','PÊSSEGO','ÔNIBUS','JOÃO']){
  assert.equal(motor.normalizarPalabra(word.normalize('NFD')),word);
  assert(motor.palabraCompletada(word,[...motor.obtenerClavePalabra(word)]));
 }
 assert.equal(motor.obtenerClavePalabra('AÇAÍ'),'ACAI');
 assert.equal(motor.elegirPalabraRecuperacion(['AÇAÍ'],['ACAI']),'');
 assert.equal(motor.reglas.letter('Ç'),'C');assert.equal(motor.reglas.letter('Ã'),'A');
 assert.equal(engine.paraIdioma('en').reglas.letter('Ñ'),'');
 assert.equal(engine.reglas.letter('Ñ'),'Ñ');
});
