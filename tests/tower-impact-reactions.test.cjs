'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const app=fs.readFileSync(path.join(__dirname,'../js/app.js'),'utf8');
for(const failure of ['offline','decode'])test('ordinary final still completes when optional impact artwork fails: '+failure,async()=>{
 let completed=0;
 const context={
  obtenerReproductorFinalSinVistaVersus:()=>()=>{completed++;return 'complete';},
  personajeJugadorVersus:'explorador',personajesVersus:{mago:{base:'base.png'}},posesReaccionVictimaVersus:{mago:'impact.png'},
  imagenTrajeFinalVersus:(_character,_pose,original)=>original,usaImpactoFrontalGuardianaVersus:()=>false,
  GameResources:{ensure:async()=>{if(failure==='offline')throw Error('Offline');}},
  Image:class{decode(){return Promise.reject(Error('Missing image'));}}
 };
 vm.createContext(context);vm.runInContext(app.match(/function obtenerReproductorFinalVersus\([^]*?\n}/)[0],context);
 assert.equal(await context.obtenerReproductorFinalVersus('explorador','mago')(),'complete');assert.equal(completed,1);
});
