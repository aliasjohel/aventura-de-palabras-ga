const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const banks = require('../js/word-banks-es.js');
const root = path.resolve(__dirname, '..');

// SHA256 of the original v343 data, including order, spelling, clues and themes.
const originalHashes = {
  adventure: '59c556145ec7e7e0a1ff106e1760efda534b6d6133e2d0e43bc8dfc27d60fd9f',
  azrak: 'bcead1f218ba491fdb982c412dbb020b987739216b5a20b15178a5beb4687782',
  versus: '7d050dfb7fab3e89c87bcab12c2c05c5520440def0476ea04a5788b5a4aa8135',
};

test('all Spanish gameplay data is identical to published v343', () => {
  for (const [key, hash] of Object.entries(originalHashes)) {
    assert.equal(crypto.createHash('sha256').update(JSON.stringify(banks[key])).digest('hex'), hash, key);
  }
  assert.equal(banks.adventure.reduce((n, world) => n + world.palabras.length, 0) + banks.azrak.length, 250);
  assert.equal(Object.values(banks.versus).reduce((n, words) => n + words.length, 0), 2000);
});

test('browser data loads without storage, network or language selection', () => {
  const context = vm.createContext({});
  for (const property of ['localStorage', 'fetch', 'I18n']) {
    Object.defineProperty(context, property, { get() { throw new Error(`Unexpected dependency: ${property}`); } });
  }
  vm.runInContext(fs.readFileSync(path.join(root, 'js/word-banks-es.js'), 'utf8'), context);
  assert.deepEqual(JSON.parse(JSON.stringify(context.SpanishWordBanks)), banks);
  vm.runInContext(fs.readFileSync(path.join(root, 'js/azrak-world.js'), 'utf8'), context);
  assert.equal(context.AzrakWorld.words, context.SpanishWordBanks.azrak);
});

test('world setup can append Azrak without modifying the source world list', () => {
  const app = fs.readFileSync(path.join(root, 'js/app.js'), 'utf8');
  const declaration = app.match(/^const aventura = .*;$/m)[0];
  const context = vm.createContext({ SpanishWordBanks: banks });
  vm.runInContext(declaration + '\naventura.push({ palabras: SpanishWordBanks.azrak }); globalThis.worlds = aventura;', context);
  assert.equal(context.worlds.length, 5);
  assert.equal(banks.adventure.length, 4);
  assert.equal(context.worlds[0].palabras, banks.adventure[0].palabras);
});

test('HTML loads banks before consumers and offline installation includes them', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const scripts = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(match => match[1].split('?')[0]);
  for (const consumer of ['js/azrak-world.js', 'js/app.js']) {
    assert.ok(scripts.indexOf('js/word-banks-es.js') >= 0);
    assert.ok(scripts.indexOf('js/word-banks-es.js') < scripts.indexOf(consumer), consumer);
  }
  const worker = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
  assert.match(worker.match(/const CORE_ASSETS = \[([\s\S]*?)\n\];/)[1], /"\.\/js\/word-banks-es\.js"/);
});

test('installed Spanish bank is served offline without a network request', async () => {
  const source = fs.readFileSync(path.join(root, 'js/word-banks-es.js'), 'utf8');
  const worker = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
  let networkCalls = 0;
  const context = vm.createContext({ URL, Headers, Request, Response, console,
    self: { addEventListener() {}, location: { origin: 'https://test.local' }, registration: { scope: 'https://test.local/' } },
    caches: { open: async () => ({ match: async () => new Response(source) }) },
    fetch: async () => { networkCalls++; throw new Error('offline'); },
  });
  vm.runInContext(worker + '\nglobalThis.respond = responderRecursoEstatico;', context);
  const response = await context.respond({ request: new Request('https://test.local/js/word-banks-es.js') });
  assert.equal(await response.text(), source);
  assert.equal(networkCalls, 0);
});
