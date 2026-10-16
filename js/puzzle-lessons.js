/* Stage 3F: language-dependent puzzle answers and guided combat sequences. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.PuzzleLessons=api;})(globalThis,()=>{
 'use strict';
 const tutorial=Object.freeze({
  es:{words:['GATO','PERRO','LORO','OSO','TIGRE'],initial:['G','T','O'],actions:[['A'],['X'],['B','C','D','F','H'],['L','O','R'],[],[],['O'],['E']]},
  en:{words:['CAT','DOG','GOOSE','OTTER','TIGER'],initial:['C','T'],actions:[['A'],['X'],['B','C','F','H','J'],['G','O','S','E'],[],[],['O'],['E']]},
  'pt-BR':{words:['GATO','CÃO','LOBO','URSO','TIGRE'],initial:['G','T','O'],actions:[['A'],['X'],['B','D','F','H','J'],['L','O','B'],[],[],['O'],['E']]}
 });
 const searches={en:['CLOUD','WIND','SKY'],'pt-BR':['NUVEM','VENTO','CÉU']};
 const paths=[[18,27,36,45,54],[91,82,73,64,55,46],[4,13,22,31,40]];
 const cache=new Map();
 function search(language,originalLetters,originalWords){
  if(!searches[language])return {letters:originalLetters,words:originalWords};
  if(cache.has(language))return cache.get(language);
  const letters=[...originalLetters.replaceAll('Ñ','N')];
  const words=searches[language].map((palabra,n)=>{
   const indices=paths[n].slice(0,palabra.length);indices.forEach((index,i)=>letters[index]=palabra[i]);
   return Object.freeze({palabra,indices:Object.freeze(indices)});
  });
  const data=Object.freeze({letters:letters.join(''),words:Object.freeze(words)});cache.set(language,data);return data;
 }
 function seal(palabra,pista){return {palabra,pista,opciones:[...palabra].map((letter,n)=>{
  const options=[letter,...'AEIOUBCDLMNRST'.split('').filter(x=>x!==letter).slice(n%4,n%4+4)];
  return Object.freeze(options.slice(n%5).concat(options.slice(0,n%5)));
 })};}
 const seals={
  en:[seal('AIR','It fills the Celestial Heights.'),seal('CLOUD','It floats around the islands.'),seal('FREE','How Aeralis must be.')],
  'pt-BR':[seal('VENTO','O ar em movimento nos Picos Celestes.'),seal('NUVEM','Flutua ao redor das ilhas.'),seal('LIVRE','Como Aeralis deve ficar.')]
 };
 function freeze(value){if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}return value;}
 return freeze({version:'puzzle-lessons-v1',tutorial,seals,search});
});
