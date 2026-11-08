'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const TowerOnline=require('../js/tower-online.js');
const app=fs.readFileSync(path.join(__dirname,'../js/app.js'),'utf8');
const extract=name=>app.match(new RegExp('async function '+name+'\\([^]*?\\n}'))[0];
function authority(){
 let unavailable=true,next=0;const calls=[],problems=[],data=new Map();
 const client=TowerOnline.create({account:()=> 'account',online:()=>true,id:()=>String(++next),storage:{getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v)},onProblem:p=>problems.push(p),rpc:async args=>{
  calls.push(args.p_action);if(unavailable)throw Error('Session is still loading');
  if(args.p_action==='status')return {userId:'account',enabled:true,progress:[],pendingRewards:[]};
  return {userId:'account',attempt:{id:'attempt',character:'guardiana',floor:1,language:'es',completedFloors:0,status:'prepared',sequence:0}};
 }});return {client,calls,problems,ready:()=>{unavailable=false;}};
}
test('failed account status never silently starts practice; a retry prepares a verified attempt',async()=>{
 const h=authority(),first=await h.client.prepare('guardiana',1,'es');
 assert.equal(first.waiting,true);assert.equal(first.reason,'accountWaiting');assert.equal(first.practice,undefined);
 assert.deepEqual(h.calls,['status']);assert.deepEqual(h.problems,['accountWaiting']);assert.equal(h.client.active(),false);
 h.ready();const second=await h.client.prepare('guardiana',1,'es');assert.equal(second.attempt.id,'attempt');assert.equal(h.client.active(),true);
});
function setup(){
 let release,owner=null,fail=false;const calls=[],local={proveedor:'local'},gate=new Promise(r=>release=r);
 const c={modoArcadeActivo:true,modoPruebasActivo:false,navigator:{onLine:true},adaptadorSalasVersus:local,adaptadorLocalSalasVersus:local,partidaOnlineVersus:null,
  personajeJugadorVersus:'guardiana',preparandoCuentaTorre:false,btnConfirmarPersonajeVersus:{disabled:false},estadoPersonajePropioVersus:{},
  CosmeticStore:{read:()=>({accountId:owner})},TowerOutfitPreview:{selection:()=>null},
  AventuraShop:{connect:async()=>{calls.push('connect');await gate;if(fail)throw Error('Offline');owner='account';c.adaptadorSalasVersus={proveedor:'supabase'};}},
  OnlineUI:{text:(_node,text)=>calls.push(text)},mensajeTorre:key=>key,
  torreAutoritativa:{refresh:async()=>{calls.push('refresh:'+owner);return {userId:owner,completed:{guardiana:0}};}},
  crearOrdenRivalesArcade:()=>['explorador','mago'],leerProgresoArcade:()=>0,abrirTorreArcade:()=>calls.push('open'),
  torreUsaProgresoServidor:()=>true,informarTorre:k=>calls.push(k),motivoPracticaTorre:()=> 'practice',
 };
 vm.createContext(c);vm.runInContext(extract('confirmarCuentaTorre')+'\n'+extract('prepararRecorridoArcade'),c);
 return {c,calls,release,local,fail:()=>{fail=true;}};
}
test('cold Tower entry waits for the account without opening My profile and keeps a local opponent',async()=>{
 const h=setup(),pending=h.c.prepararRecorridoArcade();
 assert.equal(h.c.btnConfirmarPersonajeVersus.disabled,true);assert.equal(h.calls.includes('open'),false);
 await h.c.prepararRecorridoArcade();assert.equal(h.calls.filter(x=>x==='connect').length,1);
 h.release();await pending;
 assert.deepEqual(h.calls,['checkingAccount','connect','refresh:account','open','verifiedProgress']);
 assert.equal(h.c.adaptadorSalasVersus,h.local);assert.equal(h.c.btnConfirmarPersonajeVersus.disabled,false);
});
test('failed account connection leaves selection open with an actionable message',async()=>{
 const h=setup();h.fail();const pending=h.c.prepararRecorridoArcade();h.release();await pending;
 assert.equal(h.calls.includes('open'),false);assert.equal(h.calls.at(-1),'accountWaiting');assert.equal(h.c.btnConfirmarPersonajeVersus.disabled,false);
});
test('leaving Tower while the account loads cannot reopen it',async()=>{
 const h=setup(),pending=h.c.prepararRecorridoArcade();h.c.modoArcadeActivo=false;h.release();await pending;assert.equal(h.calls.includes('open'),false);
});
test('offline Tower entry keeps practice available without connecting',async()=>{
 const h=setup();h.c.navigator.onLine=false;await h.c.prepararRecorridoArcade();assert.equal(h.calls.includes('connect'),false);assert(h.calls.includes('open'));
});
test('Combatir cannot launch a fight if account confirmation fails',async()=>{
 let started=false;const messages=[],c={modoArcadeActivo:true,rivalesTorreArcade:['mago'],preparandoTorre:false,btnCombatirArcade:{disabled:false},personajeJugadorVersus:'guardiana',pisoActualArcade:0,
  detenerRelojTorre:()=>{},confirmarCuentaTorre:async()=>{throw Error('Session not ready');},informarTorre:k=>messages.push(k),iniciarContextoPalabras:()=>{started=true;}};
 vm.createContext(c);vm.runInContext(extract('iniciarCombateArcade'),c);await c.iniciarCombateArcade();
 assert.equal(started,false);assert.deepEqual(messages,['accountWaiting']);assert.equal(c.btnCombatirArcade.disabled,false);
});
