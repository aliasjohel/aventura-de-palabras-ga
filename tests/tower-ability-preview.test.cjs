'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const app=fs.readFileSync(path.join(process.env.TOWER_FEEDBACK_PACKAGE||path.resolve(__dirname,'..'),'js/app.js'),'utf8');
const source=app.match(/function renderizarDueloAventuraAutoritativo\([^]*?\n}/)[0];
for(const character of ['explorador','mago','guardiana','dragon','hombre_lobo','t_shadow','guardian_alba','dragon_hielo','azrak','kalamo','kairos'])for(const actor of ['player','npc'])test(`${character} ${actor}: only the confirmed player ability opens the opponent preview, once`,()=>{
 const animations=[],previews=[];
 const c={dueloAventuraActivo:null,modoArcadeActivo:true,torreEnCurso:true,ultimoEventoDueloAventura:0,demoVersus:{indiceJugador:0},efectoDueloAventura:':null',document:{getElementById:()=>({})},tecladoVersus:{querySelectorAll:()=>[]},btnHabilidadVersus:{},
  usaUnionVersus:()=>false,reproducirAnimacionHabilidadVersus:(id,options)=>animations.push({id,options}),mostrarVistaImpactoRivalVersus:(...args)=>previews.push(args),letrasCalaveraDueloAutoritativo:()=>[]};
 for(const name of ['limpiarQuemaduraTecladoVersus','mostrarProgresoDueloAventura','actualizarVidasVersus','actualizarIntentosVersus','actualizarTiemposVersus','actualizarPanelHabilidadVersus','sincronizarTecladoDueloAventura'])c[name]=()=>{};
 const p={index:0,lives:5,errors:0,letters:[],completed:0,finished:false,remaining:200,charge:0,hint:'A',effect:'',effect_until:null};
 const state={started:true,finished:false,playerCharacter:character,character,player:{...p},npc:{...p},events:[{seq:1,type:'ability',actor,letter:'Q'}]},before=structuredClone(state);
 vm.createContext(c);vm.runInContext(source,c);c.renderizarDueloAventuraAutoritativo(state);c.renderizarDueloAventuraAutoritativo(state);
 assert.equal(animations.length,1);assert.equal(animations[0].id,character);assert.equal(animations[0].options.desdeRival,actor==='npc');assert.deepEqual(previews,[],'Wait for visual impact');
 animations[0].options.alImpactar();assert.deepEqual(previews,actor==='player'?[[character,'Q',false]]:[]);assert.deepEqual(state,before,'Presentation never changes server damage, effects, charge or time');
 if(character==='explorador'&&actor==='player'){
  c.usaUnionVersus=()=>true;state.events.push({seq:2,type:'ability',actor});c.renderizarDueloAventuraAutoritativo(state);animations[1].options.alImpactar();assert.deepEqual(previews.at(-1),['explorador','',true]);
 }
});
