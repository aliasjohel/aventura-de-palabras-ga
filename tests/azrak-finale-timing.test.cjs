const test = require('node:test');
const assert = require('node:assert/strict');
const world = require('../js/azrak-world.js');

test('battle continues into MusicLFiles from zero, with Calamo smiling at ten seconds', () => {
  const plan = world.planFinale();
  const start = index => plan.durations.slice(0,index).reduce((a,b)=>a+b,0);
  const interruption = world.finale.findIndex(s=>s.key==='azrak-interrumpe');
  const arrival = world.finale.findIndex(s=>s.key==='calamo-llegada');
  assert.equal(world.finale[0].music,'battle');
  assert.equal(world.finale[interruption].music,'ending');
  assert.equal(Boolean(world.finale[interruption].silent),false);
  assert.equal(world.finale[arrival].music,undefined);
  assert.equal(plan.endingStart,0);
  assert.ok(Math.abs(start(interruption)-plan.battleDuration)<.001);
  assert.ok(Math.abs(start(arrival)-start(interruption)-10000)<.001);
  assert.deepEqual(world.finale.slice(arrival-1,arrival+4).map(s=>s.key),['azrak-interrumpe','calamo-llegada','calamo-barrera','calamo-contiene','union']);
  const originalStarts=[0,8500,17000,24425,31850,39275,46700,54125,61550,68975,76400,83825,91250,96380,101510,106640,111770,116900,122030,127160];
  for(let i=0;i<originalStarts.length;i++) assert.ok(Math.abs(start(i)-originalStarts[i])<.001);
  const silence=world.finale.findIndex(s=>s.intertitle);
  assert.equal(world.finale[silence-1].key,'sello-cerrado');
  assert.equal(world.finale[silence+1].music,'peace');
  assert.equal(plan.durations[silence],6500);
  assert.equal(plan.durations.slice(silence-3,silence).reduce((a,b)=>a+b,0),18900);
  assert.ok(Math.abs(start(silence)-start(interruption)-plan.endingLength)<.001);
  assert.ok(plan.endingLength<plan.endingDuration);
  const peaceTime=plan.durations.slice(silence+1).reduce((a,b)=>a+b,0);
  assert.ok(Math.abs(peaceTime-world.finalMusic.peace.duration)<.001);
  assert.equal(world.planFinale(131000,183864,140000).endingStart,0);
});

test('ending volume fades to silence over the last 4.5 seconds of the closed seal', () => {
  const length=world.planFinale().endingLength;
  assert.equal(world.endingVolume(0,length),0);
  assert.equal(world.endingVolume(10000,length),.65);
  assert.equal(world.endingVolume(length-4500,length),.65);
  assert.equal(world.endingVolume(length-2250,length),.325);
  assert.equal(world.endingVolume(length,length),0);
  assert.equal(world.endingVolume(length+100,length),0);
});
