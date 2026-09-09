const test = require('node:test');
const assert = require('node:assert/strict');
const world = require('../js/azrak-world.js');

test('Original battle keeps the 17-second cue and MusicLFiles ends on the closed seal', () => {
  const plan = world.planFinale();
  const entry = world.finale.findIndex(s => s.key === 'portal-nivor');
  assert.equal(plan.durations.slice(0, entry).reduce((a,b) => a+b, 0), 17000);
  assert.equal(world.finale[0].music, 'battle');
  assert.equal(plan.battleTotal, 177515);
  assert.ok(plan.endingStart > plan.endingDuration / 2);
  assert.ok(Math.abs(plan.battleDuration + plan.endingDuration - plan.endingStart - plan.battleTotal) < .001);
  const altered = world.planFinale(125000, 183864, 140000);
  assert.equal(altered.endingStart, 87485);
  const silence = world.finale.findIndex(s => s.intertitle);
  assert.equal(world.finale[silence - 1].key, 'sello-cerrado');
  assert.equal(world.finale[silence + 1].music, 'peace');
  assert.equal(plan.durations[silence], 6500);
  const peaceTime = plan.durations.slice(silence + 1).reduce((a,b) => a+b,0);
  assert.ok(Math.abs(peaceTime - world.finalMusic.peace.duration) < .001);
});
