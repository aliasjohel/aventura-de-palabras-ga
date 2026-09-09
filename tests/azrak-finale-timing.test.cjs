const test = require('node:test');
const assert = require('node:assert/strict');
const world = require('../js/azrak-world.js');

test('Original battle keeps the 17-second cue and MusicLFiles ends on the closed seal', () => {
  const plan = world.planFinale();
  const entry = world.finale.findIndex(s => s.key === 'portal-nivor');
  assert.equal(plan.durations.slice(0, entry).reduce((a,b) => a+b, 0), 17000);
  assert.equal(world.finale[0].music, 'battle');
  const arrival = world.finale.findIndex(s => s.key === 'calamo-llegada');
  assert.ok(Math.abs(plan.durations.slice(0, arrival).reduce((a,b)=>a+b,0) - plan.battleDuration - 5500) < .001);
  assert.deepEqual(world.finale.slice(arrival - 1, arrival + 4).map(s=>s.key), ['azrak-interrumpe', 'calamo-llegada', 'calamo-barrera', 'calamo-contiene', 'union']);
  assert.ok(Math.abs(plan.battleTotal - 203276.813) < .001);
  assert.ok(plan.endingStart > plan.endingDuration / 2);
  assert.ok(Math.abs(plan.battleDuration + 5500 + plan.endingDuration - plan.endingStart - plan.battleTotal) < .001);
  const shadow = world.finale.findIndex(s=>s.key==='energia-shadow');
  assert.equal(world.finale[shadow - 1].key, 'energia-lume');
  assert.equal(plan.durations.slice(0,shadow).reduce((a,b)=>a+b,0),127160);
  assert.ok(Math.abs(plan.durations[shadow]-3791.813)<.001);
  assert.equal(world.finale[shadow+1].silent,true);
  assert.equal(plan.durations[shadow+1],5500);
  const originalStarts = [0,8500,17000,24425,31850,39275,46700,54125,61550,68975,76400,83825,91250,96380,101510,106640,111770,116900,122030,127160];
  for(let i=0;i<originalStarts.length;i++)assert.ok(Math.abs(plan.durations.slice(0,i).reduce((a,b)=>a+b,0)-originalStarts[i])<.001);
  const altered = world.planFinale(131000, 183864, 140000);
  assert.ok(Math.abs(altered.endingStart - 73175) < .001);
  const silence = world.finale.findIndex(s => s.intertitle);
  assert.deepEqual(world.finale.slice(silence - 4, silence).map(s => s.image), [
    'aren-ataque-union-v1.png', 'sellado-inicio-v1.png', 'sellado-avanza-v1.png', 'azrak-sellado-v2.png',
  ]);
  assert.equal(plan.durations.slice(silence - 3, silence).reduce((a,b) => a+b, 0), 18900);
  assert.equal(world.finale[silence - 1].key, 'sello-cerrado');
  assert.equal(world.finale[silence + 1].music, 'peace');
  assert.equal(plan.durations[silence], 6500);
  const peaceTime = plan.durations.slice(silence + 1).reduce((a,b) => a+b,0);
  assert.ok(Math.abs(peaceTime - world.finalMusic.peace.duration) < .001);
});
