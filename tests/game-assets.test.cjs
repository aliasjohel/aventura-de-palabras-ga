const test = require('node:test');
const assert = require('node:assert/strict');
const {audit} = require('../tools/audit-game-assets.cjs');
test('every offline resource and dynamically constructed cinematic/costume asset exists', () => {
  const report = audit();
  assert.deepEqual(report.missingOffline, [], 'Missing offline installation resources');
  assert.deepEqual(report.missingDynamic, [], 'Missing dynamic cinematic, costume or badge resources');
});
