const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto');
const token = 'test-author-token';
const hash = crypto.createHash('sha256').update(token).digest('hex');
const source = fs.readFileSync(require('node:path').join(__dirname, '../js/developer-access.js'), 'utf8')
  .replace(/const expectedHash = '[a-f0-9]+';/, `const expectedHash = '${hash}';`);
async function boot({hostname='game.test', fragment='', saved=null, storageFails=false}={}) {
  const data = new Map(saved ? [['aventuraAccesoDesarrolladorV1',saved]] : []);
  const context = {URL, URLSearchParams, TextEncoder, Event, dispatchEvent:()=>{}, crypto:crypto.webcrypto,
    location:{hostname, protocol:'https:', pathname:'/game/', search:'', hash:fragment},
    localStorage:{getItem:key=>data.get(key),setItem:(key,value)=>{if(storageFails)throw Error('unavailable');data.set(key,value);}},
    history:{replaceState:(_state,_title,url)=>context.cleanedURL=url}};
  vm.runInNewContext(source,context);
  await context.AventuraDeveloper.ready;
  return {enabled:context.AventuraDeveloper.enabled, api:context.AventuraDeveloper, data, cleanedURL:context.cleanedURL};
}
test('public players and invalid activation links cannot enable author tools',async()=>{
  assert.equal((await boot()).enabled,false);
  assert.equal((await boot({fragment:'#desarrollador=invalid'})).enabled,false);
  assert.equal((await boot({saved:'invalid'})).enabled,false);
});
test('author link activates the device, persists access and clears only its secret fragment',async()=>{
  const result=await boot({fragment:'#desarrollador='+token+'&other=keep'});
  assert.equal(result.enabled,true);
  assert.equal(result.data.get('aventuraAccesoDesarrolladorV1'),token);
  assert.equal(result.cleanedURL,'/game/#other=keep');
  assert.equal((await boot({saved:token})).enabled,true);
});
test('local development works without activation and storage failure still permits this author session',async()=>{
  assert.equal((await boot({hostname:'localhost'})).enabled,true);
  assert.equal((await boot({fragment:'#desarrollador='+token,storageFails:true})).enabled,true);
});
test('in-app activation accepts a valid credential, rejects invalid input and persists across launch',async()=>{
  const result = await boot();
  await assert.rejects(result.api.activate('wrong'), /Código incorrecto/);
  assert.equal(result.api.enabled, false);
  assert.equal((await result.api.activate('  '+token+'  ')).persisted, true);
  assert.equal(result.api.enabled, true);
  assert.equal((await boot({saved:result.data.get('aventuraAccesoDesarrolladorV1')})).enabled, true);
});
