'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const app=fs.readFileSync(path.join(__dirname,'../js/app.js'),'utf8');
for(const failure of ['none','offline','decode','stalled'])test('werewolf hidden return poses cannot block the final: '+failure,async()=>{
 let played=0,prepared=0;
 const images=Array.from({length:5},()=>({loading:'lazy',getAttribute:()=> 'wolf.png',decode(){
  assert.equal(this.loading,'eager');
  return failure==='decode'?Promise.reject(Error('Missing image')):failure==='stalled'?new Promise(()=>{}):Promise.resolve();
 }}));
 const context={
  obtenerReproductorFinalSinVistaVersus:()=>()=>{played++;return 'complete';},
  personajeJugadorVersus:'guardian_alba',personajesVersus:{guardian_alba:{base:'base.png'}},posesReaccionVictimaVersus:{guardian_alba:'impact.png'},
  imagenTrajeFinalVersus:(_character,_pose,original)=>original,usaImpactoFrontalGuardianaVersus:()=>false,
  prepararTrajesFinalVersus:()=>{prepared++;},cinematicaFinalVersus:{querySelectorAll:()=>images},
  GameResources:{ensure:async paths=>{if(failure==='offline'&&paths.includes('wolf.png'))throw Error('Offline');}},
  Image:class{decode(){return Promise.resolve();}},setTimeout,clearTimeout,
 };
 vm.createContext(context);vm.runInContext(app.match(/function obtenerReproductorFinalVersus\([^]*?\n}/)[0],context);
 assert.equal(await context.obtenerReproductorFinalVersus('hombre_lobo','guardian_alba')(),'complete');
 assert.equal(played,1);assert.equal(prepared,1);
});
for(const failure of ['offline','decode'])test('ordinary final still completes when optional impact artwork fails: '+failure,async()=>{
 let completed=0;
 const context={
  obtenerReproductorFinalSinVistaVersus:()=>()=>{completed++;return 'complete';},
  personajeJugadorVersus:'explorador',personajesVersus:{mago:{base:'base.png'}},posesReaccionVictimaVersus:{mago:'impact.png'},
  imagenTrajeFinalVersus:(_character,_pose,original)=>original,usaImpactoFrontalGuardianaVersus:()=>false,
  GameResources:{ensure:async()=>{if(failure==='offline')throw Error('Offline');}},
  Image:class{decode(){return Promise.reject(Error('Missing image'));}},setTimeout,clearTimeout
 };
 vm.createContext(context);vm.runInContext(app.match(/function obtenerReproductorFinalVersus\([^]*?\n}/)[0],context);
 assert.equal(await context.obtenerReproductorFinalVersus('explorador','mago')(),'complete');assert.equal(completed,1);
});
for(const winner of ['explorador','mago','guardiana','dragon','hombre_lobo','t_shadow','guardian_alba','dragon_hielo','azrak','kalamo','kairos']){
 for(const stage of ['preview','earned','reaction'])for(const failure of ['reject','stall']){
  test(`${winner} final reaches playback after ${stage} ${failure}`,async()=>{
   let played=0;
   const fail=()=>failure==='reject'?Promise.reject(Error('Unavailable artwork')):new Promise(()=>{});
   const context={
    obtenerReproductorFinalSinVistaVersus:()=>()=>{played++;return 'complete';},
    TowerOutfitPreview:{prepareFinal:()=>stage==='preview'?fail():Promise.resolve()},
    TowerRewards:{find:()=>stage==='earned'?{finals:['final'],assets:{final:'earned.png'}}:null},
    trajeFinalVersus:()=> 'outfit',personajeJugadorVersus:'guardian_alba',
    personajesVersus:{guardian_alba:{base:'base.png'}},posesReaccionVictimaVersus:{guardian_alba:'impact.png'},
    imagenTrajeFinalVersus:(_character,_pose,original)=>original,usaImpactoFrontalGuardianaVersus:()=>false,
    GameResources:{ensure:()=>stage==='earned'?fail():Promise.resolve()},
    Image:class{decode(){return stage==='reaction'?fail():Promise.resolve();}},
    prepararTrajesFinalVersus:()=>{},cinematicaFinalVersus:{querySelectorAll:()=>[]},
    setTimeout:(fn,delay)=>{assert.equal(delay,4000);return setTimeout(fn,10);},clearTimeout,
   };
   vm.createContext(context);vm.runInContext(app.match(/function obtenerReproductorFinalVersus\([^]*?\n}/)[0],context);
   assert.equal(await context.obtenerReproductorFinalVersus(winner,'guardian_alba')(),'complete');assert.equal(played,1);
  });
 }
}
