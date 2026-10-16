const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');
const lessons=require('../js/puzzle-lessons.js'),engine=require('../js/versus-engine.js'),puzzles=require('../js/adventure-puzzles.js');
const source=fs.readFileSync(require.resolve('../js/app.js'),'utf8');
const letters=vm.runInNewContext(source.match(/const letrasSopaCumbres = ([\s\S]*?\.join\(""\));/)[1]);
const words=vm.runInNewContext(source.match(/const palabrasSopaCumbres = (Object.freeze\([\s\S]*?\n\]\));/)[1]);
test('each word search has three reachable nonoverlapping words in a straight line',()=>{
 for(const lang of ['es','en','pt-BR']){
  const data=lessons.search(lang,letters,words),used=new Set();assert.equal(data.letters.length,100);assert.equal(data.words.length,3);
  for(const word of data.words){
   assert.equal(word.indices.map(i=>data.letters[i]).join(''),word.palabra);
   assert.deepEqual([...puzzles.obtenerTrayectoRecto(word.indices[0],word.indices.at(-1),10)],[...word.indices]);
   for(const index of word.indices){assert(!used.has(index));used.add(index);}
  }
  if(lang!=='es')assert(!data.letters.includes('Ñ'));
 }
});
test('each translated seal has exactly one answer reachable by turning every ring',()=>{
 for(const [lang,rounds] of Object.entries(lessons.seals)){
  assert.equal(rounds.length,3);assert(Object.isFrozen(rounds));
  for(const round of rounds){assert(round.pista);assert.equal(round.palabra.length,round.opciones.length);
   round.opciones.forEach((options,i)=>{assert.equal(options.length,5);assert.equal(new Set(options).size,5);assert(options.includes(round.palabra[i]));});
  }
 }
});
test('all three tutorial scripts lose exactly one heart and fill skills at the intended step',()=>{
 for(const [lang,lesson] of Object.entries(lessons.tutorial)){
  const motor=engine.paraIdioma(lang);let charge=lesson.initial.length;
  const first=motor.evaluarLetra({palabra:lesson.words[0],letras:lesson.initial,letra:lesson.actions[0][0]});assert(first.palabraCompleta);charge++;
  let letters=[],errors=0;
  for(const letter of [...lesson.actions[1],...lesson.actions[2]]){
   const state=motor.evaluarLetra({palabra:lesson.words[1],letras:letters,errores:errors,letra:letter});letters=state.letras;errors=state.errores;assert.equal(state.resultado,'error');
  }assert.equal(errors,6);
  letters=[];
  for(const letra of lesson.actions[3]){const before=motor.contarDescubiertas(lesson.words[2],letters);letters=motor.evaluarLetra({palabra:lesson.words[2],letras:letters,letra}).letras;charge+=motor.contarDescubiertas(lesson.words[2],letters)-before;}
  assert(motor.palabraCompletada(lesson.words[2],letters));assert.equal(charge,8);
  assert(motor.obtenerClavePalabra(lesson.words[3]).includes(lesson.actions[6][0]));
  assert(motor.evaluarLetra({palabra:lesson.words[4],letras:['T','I','G','R'],letra:lesson.actions[7][0]}).palabraCompleta);
 }
});
