const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../sw.js'), 'utf8');
function fixture(cached = true) {
  let network = 0, writes = 0; const events = {};
  const context = { URL, Request, Response, Headers,
    caches: { open: async () => ({ match: async () => cached ? new Response('0123456789', { headers: { 'Content-Type': 'audio/mpeg' } }) : undefined, put: async () => { writes++; } }) },
    fetch: async () => { network++; return new Response('network', { status: 206 }); },
    self: { registration: { scope: 'https://game.test/app/' }, location: { origin: 'https://game.test' }, addEventListener: (type, fn) => events[type] = fn },
  };
  vm.runInNewContext(source, context);
  return { context, events, counts: () => ({network, writes}) };
}
test('cached media ranges return exact bytes without network, including suffix and open end', async () => {
  const f=fixture();
  for(const [range,body,contentRange] of [['bytes=0-0','0','bytes 0-0/10'],['bytes=2-5','2345','bytes 2-5/10'],['bytes=7-','789','bytes 7-9/10'],['bytes=-3','789','bytes 7-9/10'],['bytes=8-99','89','bytes 8-9/10']]) {
    let response;
    f.events.fetch({ request:new Request('https://game.test/app/assets/sounds/victoria-mundo5.mp3?v=1',{headers:{Range:range}}),respondWith:p=>response=p });
    const r=await response; assert.equal(r.status,206);assert.equal(r.headers.get('Content-Range'),contentRange);assert.equal(r.headers.get('Content-Type'),'audio/mpeg');assert.equal(await r.text(),body);
  }
  assert.deepEqual(f.counts(),{network:0,writes:0});
});
test('unsatisfiable ranges return 416; unsupported syntax returns the complete file',async()=>{
 const f=fixture();
 for(const range of ['bytes=10-','bytes=8-3','bytes=-0']) {
  const r=await f.context.responderRecursoEstatico({request:new Request('https://game.test/app/a.mp3',{headers:{Range:range}})});
  assert.equal(r.status,416);assert.equal(r.headers.get('Content-Range'),'bytes */10');assert.equal(await r.text(),'');
 }
 for(const range of ['bytes=0-1,5-7','bytes=abc','bytes=-']) {
  const r=await f.context.responderRecursoEstatico({request:new Request('https://game.test/app/a.mp3',{headers:{Range:range}})});
  assert.equal(r.status,200);assert.equal(await r.text(),'0123456789');
 }
});
test('a cache miss uses the network without storing partial content',async()=>{
 const f=fixture(false);
 const r=await f.context.responderRecursoEstatico({request:new Request('https://game.test/app/a.mp3',{headers:{Range:'bytes=0-2'}})});
 assert.equal(r.status,206);assert.deepEqual(f.counts(),{network:1,writes:0});
});
