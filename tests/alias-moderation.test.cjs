const test=require('node:test');const assert=require('node:assert/strict');
const {aliasInapropiado,validarAlias,aliasVisible,crearAdaptadorLocal}=require('../js/versus-room.js');
test('rechaza insultos, tildes, separadores, repeticiones y sustituciones frecuentes',()=>{
 for(const alias of ['verga','puto','PÚTÁ','p.u.t.o','p u t a','p\u200bu\u200bt\u200bo','p3lotudo','b0lud0','puto123','elputo','soy puto','puuutooo','mierda','hijo de puta','HDP','forro','coño','f.u.c.k','sh1t','asshole']){
 assert(aliasInapropiado(alias),alias);assert.throws(()=>validarAlias(alias),/Elegí otro nombre/);assert.equal(aliasVisible(alias),'Aventurero');}
});
test('permite nombres legítimos y palabras con coincidencias parciales',()=>{
 for(const alias of ['Vergara','Maricarmen','Semaforo','Ana','José','María','Ñandú','Aren','Kairos','Concha','Armando','Scunthorpe','Computadora','Diputado','Disputo','Gabi123','T-Shadow','Dragón_77']){assert.equal(aliasInapropiado(alias),false,alias);assert.equal(validarAlias(alias),alias);}
});
test('una sala local nunca guarda un alias rechazado',()=>{
 const datos=new Map();const room=crearAdaptadorLocal({getItem:k=>datos.get(k),setItem:(k,v)=>datos.set(k,v)});
 assert.throws(()=>room.crearSala({alias:'boludo'}),/malas palabras/);assert.equal(datos.size,0);
});
