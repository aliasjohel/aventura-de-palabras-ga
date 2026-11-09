const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');
function section(start, end) {
  return source.slice(source.indexOf(start), source.indexOf(end, source.indexOf(start)));
}
const introduction = section('async function presentarDesafioMagoDesierto()', '\nconst escenasCinematicaFinalDesierto');
const keyboard = section('function sincronizarTecladoDueloAventura()', '\nfunction mostrarProgresoDueloAventura');
const input = section('async function jugarLetraVersus(', '\nfunction ');

for (const reduced of [false, true]) {
  test(`Zafir waits for an explicit click with reduced motion ${reduced}`, async () => {
    const nodes = [];
    let closed = 0, settled = false;
    const document = { activeElement: null, createElement(tag) {
      const node = { tag, children: [], attrs: {}, disabled: false, isConnected: true,
        classList: { add() {} }, setAttribute(k,v) { this.attrs[k]=v; },
        append(...children) { this.children.push(...children); },
        addEventListener(type, callback) { this[type]=callback; },
        focus() { document.activeElement=this; },
        remove() { this.removed=true; document.activeElement=null; }
      };
      nodes.push(node); return node;
    } };
    const previous = { isConnected: true, focus() { document.activeElement=this; } };
    document.activeElement=previous;
    const waits=[];
    const context = { document, escenarioActual:1, misionActual:9, mundoDosCompletado:false,
      CharacterMusic:{startScene:()=>({close(){closed++;}})}, srcMagoBaseVersus:'zafir.png',
      contenedorEscenario:{appendChild(){}}, prefiereReducirMovimiento:{matches:reduced},
      requestAnimationFrame:fn=>fn(), esperarMovimiento:async ms=>{waits.push(ms);},
      GameUI:{key:key=>key,text:(node,text)=>{node.textContent=text;}}
    };
    vm.runInNewContext(introduction, context);
    const pending = context.presentarDesafioMagoDesierto().then(()=>{settled=true;});
    await new Promise(resolve=>setImmediate(resolve));
    assert.equal(settled,false,'reading must not end automatically');
    assert.equal(waits.length,0,'no animation wait acts as a reading timer');
    assert.equal(closed,0);
    const button=nodes.find(node=>node.tag==='button');
    assert.equal(document.activeElement,button);
    assert.equal(button.textContent,'adventure.narrative.extra37');
    button.click(); await pending;
    assert.equal(settled,true);
    assert.equal(closed,1);
    assert.equal(nodes[0].removed,true);
    assert.equal(document.activeElement,previous);
    assert.equal(waits.length,1,'only the exit animation remains timed');
  });
}

function button(letter) {
  return {textContent:letter,dataset:{},attrs:{},disabled:false,setAttribute(k,v){this.attrs[k]=v;}};
}
function keyboardContext(state, buttons) {
  return { estadoCombateAutoritativo:()=>state, modoArcadeActivo:false, torreEnCurso:false,
    letrasPendientesDueloAventura:new Set(), tecladoVersus:{querySelectorAll:()=>buttons} };
}
test('pending keys, confirmed keys and ability locks remain distinct across words', () => {
  const state={started:true,finished:false,player:{index:0,letters:['B'],effect:'',finished:false}};
  const buttons=['A','B','C'].map(button), context=keyboardContext(state,buttons);
  context.letrasPendientesDueloAventura.add('0:A');
  vm.runInNewContext(keyboard,context);
  context.sincronizarTecladoDueloAventura();
  assert.equal(buttons[0].dataset.entradaDuelo,'pendiente');
  assert.equal(buttons[0].attrs['aria-busy'],'true');
  assert.equal(buttons[0].disabled,true);
  assert.equal(buttons[1].dataset.entradaDuelo,'confirmada');
  assert.equal(buttons[2].disabled,false);
  state.player.effect='roots'; context.sincronizarTecladoDueloAventura();
  assert.equal(buttons[2].disabled,true);
  assert.equal(buttons[2].dataset.entradaDuelo,'');
  state.player.effect='';state.player.index=1;state.player.letters=[];
  context.sincronizarTecladoDueloAventura();
  for(const b of buttons){assert.equal(b.disabled,false);assert.equal(b.dataset.entradaDuelo,'');}
});

test('a slow server gets immediate pending feedback without an invented result or duplicate tap', async () => {
  const state={started:true,finished:false,player:{index:0,letters:[],effect:'',finished:false}};
  const buttons=[button('A')], context=keyboardContext(state,buttons);
  let release, calls=0;
  const response=new Promise(resolve=>{release=resolve;});
  Object.assign(context,{ tutorialCombateVersus:{activo:false},demoVersus:{partidaFinalizada:false},
    reproducirPulsacionTeclaVersus(){},AdventureOnline:{view:()=>({detail:state})},
    autoridadDueloAventura:{active:()=>true,send:async()=>{calls++;await response;}}
  });
  vm.runInNewContext(keyboard+'\n'+input,context);
  const pending=context.jugarLetraVersus('A',buttons[0]);
  assert.equal(buttons[0].dataset.entradaDuelo,'pendiente');
  assert.deepEqual(state.player.letters,[],'no optimistic correct/incorrect result');
  await context.jugarLetraVersus('A',buttons[0]);
  assert.equal(calls,1);
  state.player.letters=['A'];release();await pending;
  assert.equal(buttons[0].dataset.entradaDuelo,'confirmada');
  assert.equal(buttons[0].attrs['aria-busy'],'false');
  assert.equal(context.letrasPendientesDueloAventura.size,0);
});

test('a rejected letter clears pending presentation without confirming a result', async () => {
  const state={started:true,finished:false,player:{index:0,letters:[],effect:'',finished:false}};
  const buttons=[button('A')], context=keyboardContext(state,buttons);
  Object.assign(context,{tutorialCombateVersus:{activo:false},demoVersus:{partidaFinalizada:false},
    reproducirPulsacionTeclaVersus(){},AdventureOnline:{view:()=>({detail:state})},
    autoridadDueloAventura:{active:()=>true,send:async()=>{throw Error('rejected');}}
  });
  vm.runInNewContext(keyboard+'\n'+input,context);
  await assert.rejects(context.jugarLetraVersus('A',buttons[0]),/rejected/);
  assert.deepEqual(state.player.letters,[]);
  assert.equal(buttons[0].dataset.entradaDuelo,'');
  assert.equal(buttons[0].attrs['aria-busy'],'false');
  assert.equal(buttons[0].disabled,false);
});

test('confirmed letters and server ability locks prevent another gameplay request', async () => {
  const state={started:true,finished:false,player:{index:0,letters:['A'],effect:'',finished:false}};
  const buttons=[button('A')], context=keyboardContext(state,buttons);
  let calls=0;
  Object.assign(context,{tutorialCombateVersus:{activo:false},demoVersus:{partidaFinalizada:false},
    reproducirPulsacionTeclaVersus(){},AdventureOnline:{view:()=>({detail:state})},
    autoridadDueloAventura:{active:()=>true,send:async()=>{calls++;}}
  });
  vm.runInNewContext(keyboard+'\n'+input,context);
  context.sincronizarTecladoDueloAventura();
  await context.jugarLetraVersus('A',buttons[0]);
  state.player.letters=[];state.player.effect='roots';context.sincronizarTecladoDueloAventura();
  await context.jugarLetraVersus('A',buttons[0]);
  assert.equal(calls,0);
});
