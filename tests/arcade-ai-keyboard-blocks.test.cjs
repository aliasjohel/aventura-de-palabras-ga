const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(require('node:path').join(__dirname,'../js/app.js'),'utf8');
const start=source.indexOf('function jugarTurnoRivalVersus()');const end=source.indexOf('\nfunction ',start+1);const code=source.slice(start,end);
test('all keyboard disabling abilities block AI input until effect expires',()=>{
 for(const effect of ['roots','black_hole','key_bounce','ice_screen','key_theft']){
  let now=1000,calls=0;const nextStep=new Error('AI proceeds');const context={Date:{now:()=>now},tutorialCombateVersus:{activo:false},demoVersus:{finalizadoRival:false,partidaFinalizada:false,efectoRival:effect,efectoRivalHasta:6000,letrasRival:new Set()},bloqueoRivalKairosHasta:0,activarHabilidadRivalLocalVersus(){calls++;throw nextStep;}};
  vm.runInNewContext(code,context);for(now=1000;now<6000;now+=250)context.jugarTurnoRivalVersus();assert.equal(calls,0,effect);assert.equal(context.demoVersus.letrasRival.size,0);
  assert.throws(()=>context.jugarTurnoRivalVersus(),e=>e===nextStep);assert.equal(calls,1,effect+' resumes on expiry');
 }
});
