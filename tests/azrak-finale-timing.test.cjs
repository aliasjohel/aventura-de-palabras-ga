const test = require('node:test');
const assert = require('node:assert/strict');
const world = require('../js/azrak-world.js');

test('Nivor enters at 53 seconds and the partial replay ends on the closed seal', () => {
  const plan = world.planFinale();
  const entry = world.finale.findIndex(s => s.key === 'portal-nivor');
  assert.equal(plan.durations.slice(0, entry).reduce((a,b) => a+b, 0), 53000);
  assert.ok(plan.replayStart > 0 && plan.replayStart < plan.battleDuration);
  assert.ok(Math.abs(plan.battleTotal - (2 * plan.battleDuration - plan.replayStart)) < .001);
  const silence = world.finale.findIndex(s => s.intertitle);
  assert.equal(world.finale[silence - 1].key, 'sello-cerrado');
  assert.equal(world.finale[silence + 1].music, 'peace');
  assert.equal(plan.durations[silence], 6500);
  const peaceTime = plan.durations.slice(silence + 1).reduce((a,b) => a+b,0);
  assert.ok(Math.abs(peaceTime - world.finalMusic.peace.duration) < .001);
});
