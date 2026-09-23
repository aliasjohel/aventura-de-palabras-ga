const test=require('node:test');
const assert=require('node:assert/strict');
const {create,key}=require('../js/cosmetic-store.js');
const fs=require('node:fs');
const path=require('node:path');
function memory(coins=500){const data=new Map([['progresoAventuraGA',JSON.stringify({monedas:coins})]]);return {data,getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v)};}
test('cada traje tiene todas sus poses y cinemáticas disponibles sin conexión',()=>{
  const store=create(memory()),worker=fs.readFileSync(path.join(__dirname,'../sw.js'),'utf8');
  for(const item of store.catalog)for(const pose of [...item.poses,'planta','mano','vidrio','envejecido','anciano','final']){
    const asset=store.asset(item.id,pose);
    assert(fs.existsSync(path.join(__dirname,'..',asset)),asset);
    assert(worker.includes('./'+asset),'Recurso offline: '+asset);
  }
});
test('migra monedas una sola vez y compra sin doble cobro',()=>{const storage=memory(),s=create(storage);assert.equal(s.read().coins,500);assert.equal(s.purchase('aren-bosque').coins,300);assert.equal(s.purchase('aren-bosque').coins,300);storage.data.set('progresoAventuraGA',JSON.stringify({monedas:999}));assert.equal(create(storage).read().coins,300);assert.deepEqual(s.read().owned,['aren-bosque']);});
test('no descuenta saldo insuficiente ni equipa trajes ajenos',()=>{const s=create(memory(20));assert.throws(()=>s.purchase('zafir-celestial'),/faltan/);assert.throws(()=>s.equip('mago','zafir-celestial'),/Primero/);assert.equal(s.read().coins,20);assert.throws(()=>s.purchase('__proto__'),/disponible/);});
test('fallo de escritura deja saldo y colección intactos',()=>{const storage=memory(),s=create(storage);s.read();storage.setItem=()=>{throw Error('storage full');};assert.throws(()=>s.purchase('aren-bosque'));assert.equal(s.read().coins,500);assert.deepEqual(s.read().owned,[]);});
test('persiste equipo y permite restaurar el original sin perder propiedad',()=>{const storage=memory(),s=create(storage);s.purchase('zafir-celestial');s.equip('mago','zafir-celestial');assert.equal(create(storage).read().equipped.mago,'zafir-celestial');assert.throws(()=>s.equip('explorador','zafir-celestial'));s.equip('mago',null);assert.deepEqual(s.read().equipped,{});assert.deepEqual(s.read().owned,['zafir-celestial']);});
test('recompensas normales suman al saldo gastable',()=>{const s=create(memory(0));assert.equal(s.earn(30),30);assert.throws(()=>s.earn(-3));assert.throws(()=>s.earn(NaN));assert.equal(s.read().coins,30);});
test('normaliza sólo IDs conocidos; datos corruptos no reinician saldo',()=>{const storage=memory(),s=create(storage);assert.deepEqual(s.normalizeSkins({mago:'https://evil.test/a.png',kairos:'kairos-real',explorador:'zafir-celestial'}),{kairos:'kairos-real'});storage.data.set(key,'{bad');assert.throws(()=>s.purchase('aren-bosque'),/leer tus compras/);assert.equal(storage.data.get(key),'{bad');});
