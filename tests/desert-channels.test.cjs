const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const app = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');
function harness() {
  const ctx = vm.createContext({ pruebaEspecialBosqueActiva: 'vientos',
    tiposCanalesVientoDesierto: [], orientacionesVientosDesierto: [],
    movimientosVientosDesierto: 0, estadoPruebaBosque: {}, botonesVientosDesierto: [],
    renderizarPuzzleVientosDesierto() {} });
  const start = app.indexOf('const ladoTableroVientoDesierto');
  const end = app.indexOf('function renderizarPuzzleVientosDesierto()', start);
  vm.runInContext(app.slice(start, end) + '\nglobalThis.ruta = caminoEnergiaVientoDesierto; globalThis.ramales = desviosVientoDesierto;', ctx);
  ctx.iniciarPuzzleVientosDesierto();
  return ctx;
}
test('tablero 7x7 resoluble, 31 tramos y una salida sin conexión al comenzar', () => {
  for (let i = 0; i < 50; i++) {
    const ctx = harness();
    assert.equal(ctx.tiposCanalesVientoDesierto.length, 49);
    assert.equal(ctx.obtenerCanalesEnergizados().has(24), false);
    assert.equal(ctx.ruta.length, 31);
    ctx.orientacionesVientosDesierto = ctx.tiposCanalesVientoDesierto.map(c => c.objetivo);
    assert.equal(ctx.obtenerCanalesEnergizados().has(24), true);
    assert.equal(ctx.obtenerCanalesEnergizados().size, 31);
  }
});
test('los tres desvíos pueden encenderse hasta su final sin activar el núcleo', () => {
  const ctx = harness();
  for (const ramal of ctx.ramales) {
    ctx.orientacionesVientosDesierto = ctx.tiposCanalesVientoDesierto.map(c => c.objetivo);
    const junction = ramal[0];
    const previous = ctx.ruta[ctx.ruta.indexOf(junction) - 1];
    const incoming = ctx.direccionEntreCasillas(junction, previous);
    const outgoing = ctx.direccionEntreCasillas(junction, ramal[1]);
    for (let orientation=0;orientation<4;orientation++) {
      ctx.orientacionesVientosDesierto[junction]=orientation;
      const openings=ctx.obtenerAberturasCanal(junction);
      if(openings.includes(incoming)&&openings.includes(outgoing)) break;
    }
    const lit=ctx.obtenerCanalesEnergizados();
    assert.ok(ramal.every(cell=>lit.has(cell)));
    assert.equal(lit.has(24),false);
  }
});
test('ninguna combinación de giros permite un atajo menor a 31 casillas', () => {
  const ctx=harness(), dirs=['N','E','S','O'], opposite={N:'S',E:'O',S:'N',O:'E'};
  const queue=[[42,'S',1]],seen=new Set();let shortest=Infinity;
  while(queue.length){
    const [cell,incoming,distance]=queue.shift(),key=cell+incoming;
    if(seen.has(key))continue;seen.add(key);
    if(cell===24){if(incoming==='E'){shortest=distance;break;}continue;}
    for(let rotation=0;rotation<4;rotation++){
      ctx.orientacionesVientosDesierto[cell]=rotation;
      const openings=ctx.obtenerAberturasCanal(cell);
      if(!openings.includes(incoming))continue;
      for(const out of openings){
        if(out===incoming)continue;
        const row=Math.floor(cell/7)+(out==='N'?-1:out==='S'?1:0);
        const col=cell%7+(out==='O'?-1:out==='E'?1:0);
        if(row>=0&&row<7&&col>=0&&col<7)queue.push([row*7+col,opposite[out],distance+1]);
      }
    }
  }
  assert.equal(shortest,31);
});
