'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(require('node:path').join(__dirname,'../js/app.js'),'utf8');
const extract=name=>source.match(new RegExp('function '+name+'\\([^]*?\\n}'))[0];
const letter=(seq,value='Q')=>({seq,type:'letter',actor:'player',letter:value,correct:false});
const impact=seq=>({seq,type:'impact',actor:'npc',target:'player',effect:'forced_letter'});
function state(events,letters=['Q']){const actor={index:0,letters,errors:1,lives:5,completed:0,finished:false,remaining:120,charge:0,effect:'',effect_until:null};return {started:true,finished:false,player:{...actor},npc:{...actor,letters:[]},events};}
function context(){const animations=[],buttons=['Q','W'].map(textContent=>({textContent,classList:{values:new Set(),add(x){this.values.add(x);},remove(x){this.values.delete(x);},contains(x){return this.values.has(x);}}}));
 const c={modoArcadeActivo:true,torreEnCurso:true,dueloAventuraActivo:null,demoVersus:{indiceJugador:0},ultimoEventoDueloAventura:0,efectoDueloAventura:':null',
  tecladoVersus:{querySelectorAll:()=>buttons},document:{getElementById:()=>({})},btnHabilidadVersus:{},letrasPendientesDueloAventura:new Set(),
  animarTeclaCalaveraIgneaVersus:(value,received,present)=>{animations.push({value,received,present});},
  limpiarQuemaduraTecladoVersus:()=>buttons.forEach(b=>b.classList.values.clear()),
 };
 for(const name of ['mostrarProgresoDueloAventura','actualizarVidasVersus','actualizarIntentosVersus','actualizarTiemposVersus','actualizarPanelHabilidadVersus','sincronizarTecladoDueloAventura','reproducirPulsacionTeclaVersus'])c[name]=()=>{};
 vm.createContext(c);vm.runInContext(extract('letrasCalaveraDueloAutoritativo')+'\n'+extract('renderizarDueloAventuraAutoritativo'),c);return {c,animations,buttons};
}
test('only the server-selected forced letter burns; replay does not animate or deduct twice',()=>{
 const h=context(),s=state([letter(1,'W'),letter(2),impact(3)],['W','Q']);h.c.renderizarDueloAventuraAutoritativo(s);
 assert.deepEqual(h.animations,[{value:'Q',received:true,present:false}]);assert(h.buttons[0].classList.contains('tecla-carbonizada'));assert(!h.buttons[1].classList.contains('tecla-carbonizada'));
 h.c.renderizarDueloAventuraAutoritativo(s);assert.equal(h.animations.length,1);assert.equal(h.c.demoVersus.erroresJugador,1);assert.equal(s.player.errors,1);
});
test('the burn survives bounded event-log eviction and clears on the next word',()=>{
 const h=context();h.c.renderizarDueloAventuraAutoritativo(state([letter(1),impact(2)]));
 h.c.renderizarDueloAventuraAutoritativo(state([{seq:30,type:'letter',actor:'npc'}]));assert(h.buttons[0].classList.contains('tecla-carbonizada'));
 const next=state([{seq:31,type:'word',actor:'player'},{...letter(32),letter:'Q'}]);next.player.index=1;
 h.c.renderizarDueloAventuraAutoritativo(next);assert(!h.buttons[0].classList.contains('tecla-carbonizada'));assert.equal(h.animations.length,1);
});
test('a forced miss that exhausts the word cannot burn that key in the next word',()=>{
 const h=context(),s=state([letter(1),{seq:2,type:'word',actor:'player',correct:false},impact(3),letter(4)]);s.player.index=1;
 assert.equal(h.c.letrasCalaveraDueloAutoritativo(s).length,0);h.c.renderizarDueloAventuraAutoritativo(s);assert.equal(h.animations.length,0);
});
test('ability windup, ordinary errors and attacks aimed at the NPC do not burn the player keyboard',()=>{
 const h=context();for(const events of [[{seq:1,type:'ability',actor:'npc'}],[letter(1)],[letter(1),{...impact(2),actor:'player',target:'npc'}],[letter(1),{...impact(2),effect:'forced_miss'}]])assert.equal(h.c.letrasCalaveraDueloAutoritativo(state(events)).length,0);
});
