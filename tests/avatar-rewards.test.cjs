const {test}=require('node:test');
const assert=require('node:assert/strict');
const rewards=require('../js/avatar-rewards.js');
test('new players have only the classic frame',()=>assert.deepEqual(rewards.earned(),['clasico']));
test('each completed world grants its themed frame',()=>{
  const order=['bosque','arcano','real','hielo','fuego'];
  for(let world=1;world<=5;world++) assert.deepEqual(rewards.earned({cristalesObtenidos:world}),['clasico',...order.slice(0,world)]);
});
test('rank thresholds grant every reached tier without granting the next one',()=>{
  const ranks=rewards.catalog.filter(frame=>frame.rank);
  for(const rank of ranks){
    assert(!rewards.earned({},rank.points-1).includes(rank.id));
    assert(rewards.earned({},rank.points).includes(rank.id));
  }
  assert.deepEqual(rewards.earned({},480),['clasico',...ranks.map(frame=>frame.id)]);
});
test('mission numbers and preview worlds do not grant story rewards',()=>assert.deepEqual(rewards.earned({escenarioActual:4,maximoEscenarioDesbloqueado:4}),['clasico']));
