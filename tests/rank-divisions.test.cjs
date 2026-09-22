const assert = require('node:assert/strict');
const {division} = require('../js/versus-ranks.js');
for (const [points,name,next] of [[0,'Novato',10],[10,'Bronce V',14],[13,'Bronce V',14],[14,'Bronce IV',18],[26,'Bronce I',30],[30,'Plata V',36],[59,'Plata I',60],[60,'Oro V',72],[120,'Platino V',144],[240,'Diamante V',288],[479,'Diamante I',480],[480,'Leyenda',null]]) {
  assert.equal(division(points).name,name);
  assert.equal(division(points).next,next);
}
for(let p=0;p<1000;p++) {
  const d=division(p);
  assert(p>=d.min);
  assert(d.next===null || p<d.next);
  if(d.next!==null) assert.equal(d.nextName,division(d.next).name);
}
console.log('PASS division boundaries, progression and next rank labels');
