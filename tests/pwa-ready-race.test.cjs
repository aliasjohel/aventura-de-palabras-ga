'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),cp=require('child_process');
const current=fs.readFileSync(require('path').join(__dirname,'../js/pwa.js'),'utf8');
async function harness(source){
 const elements=new Map(),events={},windowEvents={};let reloads=0,menu=true,observer;
 const el=id=>{if(!elements.has(id))elements.set(id,{hidden:true,dataset:{},handlers:{},addEventListener(k,f){this.handlers[k]=f;},classList:{contains:()=>menu}});return elements.get(id);};
 const worker={state:'installed',messages:[],postMessage(m){this.messages.push(m);}},registration={waiting:worker,installing:null,active:{},update:async()=>{},addEventListener(){}};
 const serviceWorker={controller:{},getRegistration:async()=>registration,register:async()=>registration,ready:Promise.resolve(),addEventListener:(k,f)=>events[k]=f};
 const c={navigator:{serviceWorker,onLine:true},document:{readyState:'loading',getElementById:el,documentElement:{dataset:{}},addEventListener(){}},window:{location:{reload:()=>reloads++},addEventListener:(k,f)=>windowEvents[k]=f,setInterval(){},setTimeout(){}},sessionStorage:{getItem(){return null;},setItem(){}},MutationObserver:class{constructor(f){observer=f;}observe(){}},GameUI:{key:k=>k,text:(n,t)=>n.textContent=t}};
 vm.runInNewContext(source,c);await c.registrarAplicacionInstalable();
 return{c,el,worker,registration,events,windowEvents,reloads:()=>reloads,setMenu:v=>{menu=v;observer();}};
}
test('reproduce v408: queued completion hides actions even though the worker is waiting',async()=>{
 const original=cp.execFileSync('git',['show','25bea5d:js/pwa.js'],{cwd:require('path').join(__dirname,'..'),encoding:'utf8'}),h=await harness(original);
 assert.equal(h.el('accionesActualizacionPwa').hidden,false);
 await h.events.message({source:h.worker,data:{type:'PWA_INSTALL_PROGRESS',estado:'completa',porcentaje:100}});
 assert.equal(h.el('accionesActualizacionPwa').hidden,true);
});
test('waiting worker stays ready through late progress, error and completion messages',async()=>{
 const h=await harness(current);
 for(const estado of ['descargando','completa','error']){
  await h.events.message({source:h.worker,data:{type:'PWA_INSTALL_PROGRESS',estado,porcentaje:100}});
  assert.equal(h.el('accionesActualizacionPwa').hidden,false);assert.equal(h.el('btnActualizarAplicacion').disabled,false);
 }
 await h.el('btnActualizarAplicacion').handlers.click();await h.el('btnActualizarAplicacion').handlers.click();assert.equal(h.worker.messages.length,1);
 h.setMenu(false);h.events.controllerchange();assert.equal(h.reloads(),0);h.setMenu(true);assert.equal(h.reloads(),1);
});
test('pageshow reconciles a missed waiting state and active combat cannot request activation',async()=>{
 const h=await harness(current);h.el('avisoActualizacionPwa').hidden=true;h.windowEvents.pageshow();assert.equal(h.el('avisoActualizacionPwa').hidden,false);
 h.setMenu(false);await h.el('btnActualizarAplicacion').handlers.click();assert.equal(h.worker.messages.length,0);h.events.controllerchange();assert.equal(h.reloads(),0);
});
