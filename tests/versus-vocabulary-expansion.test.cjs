const {test}=require('node:test');
const assert=require('node:assert/strict'),fs=require('node:fs'),cp=require('node:child_process');
const expanded=require('../js/word-banks-versus-expanded.js'),legacy=require('../js/word-banks-versus.js');
const spanish=require('../js/word-banks-es.js'),gameplay=require('../js/word-gameplay.js'),engine=require('../js/versus-engine.js');
const reviewed=require('../data/versus-vocabulary.json');
test('reviewed artifacts are synchronized without generation writes',()=>{
 assert.match(cp.execFileSync(process.execPath,['tools/build-versus-vocabulary.cjs','--check'],{encoding:'utf8'}),/PASS synchronized/);
});
test('Spanish, Tower, adventure banks and gameplay rules are byte-identical to v367',()=>{
 for(const file of ['js/word-banks-es.js','js/word-banks-versus.js','js/word-banks-forest.js','js/word-banks-worlds.js','js/word-gameplay.js','js/versus-engine.js']){
  assert.equal(fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n'),cp.execFileSync('git',['show','8a85789:'+file],{encoding:'utf8'}).replace(/\r\n/g,'\n'),file);
 }
 assert.equal(Object.values(spanish.versus).flat().length,2000);
});
for(const language of ['en','pt-BR'])test('every '+language+' word has lexical receipt, valid keyboard, unique key and recoveries',()=>{
 const topics=expanded.banks[language],rule=gameplay.rules(language),motor=engine.paraIdioma(language);
 assert.equal(Object.values(topics).flat().length,language==='en'?2000:1999);
 assert.deepEqual(Object.keys(topics),Object.keys(spanish.versus));
 for(const[theme,words]of Object.entries(topics)){
  assert(gameplay.validateBank(words,language));assert(Object.isFrozen(words));
  assert.deepEqual(words.slice(0,legacy.banks[language][theme].length),legacy.banks[language][theme]);
  for(const word of words){
   assert(motor.palabraCompletada(word,[...new Set(rule.key(word))]),word);
   assert.equal(motor.obtenerProgreso(word,[...new Set(rule.key(word))]).join(''),word);
   assert.equal(rule.key(word.normalize('NFD')),rule.key(word));
   for(const letter of rule.key(word))assert(rule.alphabet.includes(letter));
  }
  for(const word of reviewed.additions[language][theme]){
   assert.equal(reviewed.evidence.filter(r=>r.language===language&&r.theme===theme&&r.word===word).length,1);
   assert(!legacy.banks[language][theme].some(w=>rule.key(w)===rule.key(word)));
  }
  const used=words.slice(0,5);
  for(let i=0;i<4;i++){const next=motor.elegirPalabraRecuperacion(words,used,()=>0);assert(next&&!used.some(w=>rule.key(w)===rule.key(next)));used.push(next);}
 }
});
