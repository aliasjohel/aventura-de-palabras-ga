const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const world=require('../js/azrak-world.js');
const root=path.join(__dirname,'..');
const app=fs.readFileSync(path.join(root,'js/app.js'),'utf8');
test('first Shadow duel is mission three, with independent rescue checkpoint and unchanged final duel',()=>{
  const start=app.indexOf('function obtenerDueloAventuraPendiente(');
  const source=app.slice(start,app.indexOf('\n}',start)+2);
  const ctx=vm.createContext({escenarioActual:4,misionActual:2,estadoPrimerEncuentroShadow:'pendiente',estadoFinalAzrak:'shadow'});
  vm.runInContext(source,ctx);
  assert.equal(ctx.obtenerDueloAventuraPendiente(),'shadow_primero');
  ctx.estadoPrimerEncuentroShadow='rescate';assert.equal(ctx.obtenerDueloAventuraPendiente(),'shadow_primero');
  ctx.estadoPrimerEncuentroShadow='completo';assert.equal(ctx.obtenerDueloAventuraPendiente(),'');
  ctx.misionActual=9;assert.equal(ctx.obtenerDueloAventuraPendiente(),'shadow_final');
  ctx.estadoFinalAzrak='azrak';assert.equal(ctx.obtenerDueloAventuraPendiente(),'azrak_final');
  assert.equal(world.shadowEncounterState(4,2,'rescate'),'rescate');
  assert.equal(world.shadowEncounterState(4,2,undefined),'pendiente');
  assert.equal(world.shadowEncounterState(4,3,undefined),'completo');
  assert.equal(world.shadowEncounterState(4,9,'rescate'),'completo');
});
test('rescue explains fifth guardian and later captivity, with all illustrations installed offline',()=>{
  const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
  assert.match(world.shadowEncounter[0].text,/Aren gana el duelo/);
  assert.match(world.shadowEncounter[1].text,/quinta guardiana/);
  assert.match(world.shadowEncounter.at(-1).text,/Cámara del Eclipse/);
  for(const shot of world.shadowEncounter){const asset='assets/images/cinematicas/reino-azrak/'+shot.image;assert.ok(fs.existsSync(path.join(root,asset)));assert.ok(sw.includes(asset));}
  assert.match(world.missions[6].texto,/guardiana que lo salvó/);
});
