const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm'), crypto = require('node:crypto');
const root = path.resolve(__dirname, '..'), source = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
const hash = body => 'sha256-' + crypto.createHash('sha256').update(body).digest('hex');
const scope = 'https://game.test/adventure/';
const absolute = input => new URL(typeof input === 'string' ? input : input.url || input.href, scope).href;
function fixture() {
  const stores = new Map(), downloads = [], puts = [], messages = [];
  let network = new Map(), failed = '';
  const caches = {
    keys: async () => [...stores.keys()], delete: async name => stores.delete(name),
    open: async name => {
      if (!stores.has(name)) stores.set(name, new Map());
      const entries = stores.get(name);
      return {
        keys: async () => [...entries.keys()].map(url => new Request(url)),
        match: async (input, options = {}) => {
          const url = new URL(absolute(input)); if (options.ignoreSearch) url.search = '';
          for (const [key, value] of entries) {
            const candidate = new URL(key); if (options.ignoreSearch) candidate.search = '';
            if (candidate.href === url.href) return value.clone();
          }
        },
        put: async (input, response) => { puts.push({cache: name, url: absolute(input)}); entries.set(absolute(input), response.clone()); },
      };
    },
  };
  function worker(version, files) {
    const events = {};
    const context = { URL, Request, Response, Headers, Uint8Array, crypto: crypto.webcrypto, caches,
      fetch: async request => {
        const url = new URL(request.url), file = './' + url.pathname.slice(new URL(scope).pathname.length);
        downloads.push(file);
        if (file === failed) throw Error('network interrupted');
        if (!network.has(file)) return new Response('missing', {status: 404});
        return new Response(network.get(file), {headers: {'Content-Type': file.endsWith('.mp3') ? 'audio/mpeg' : 'text/plain'}});
      },
      self: {registration: {scope}, location: {origin: new URL(scope).origin},
        clients: {matchAll: async () => [{postMessage: m => messages.push(m)}], claim: async () => {}},
        addEventListener: (name, fn) => { events[name] = fn; }, skipWaiting() {},
      },
    };
    let script = source.replace(/const CACHE_NAME = .*;/, 'const CACHE_NAME = ' + JSON.stringify(version) + ';');
    if (files) script += '\nCORE_ASSETS.splice(0,CORE_ASSETS.length,...' + JSON.stringify(Object.keys(files)) + ');Object.assign(ASSET_REVISIONS,' + JSON.stringify(Object.fromEntries(Object.entries(files).map(([p,b])=>[p,hash(b)]))) + ');Object.assign(REVISIONES_ACTUALES,ASSET_REVISIONS);';
    script += '\nglobalThis.config={assets:CORE_ASSETS,revisions:REVISIONES_ACTUALES,legacy:LEGACY_RESOURCE_REVISIONS,resourceCache:RESOURCE_CACHE_NAME};';
    vm.runInNewContext(script, context);
    const lifecycle = async type => { let work; events[type]({waitUntil: promise => {work = promise;}}); await work; };
    return {context, config: context.config, install: () => lifecycle('install'), activate: () => lifecycle('activate'),
      read: (file, headers) => context.responderRecursoEstatico({request: new Request(new URL(file, scope), {headers}), waitUntil() {}})};
  }
  return {stores, caches, puts, downloads, messages, worker, network: files => {network = new Map(Object.entries(files));}, fail: file => {failed = file;}};
}

test('migration from v347 retains unchanged resources in place and only downloads modified files', async () => {
  const f = fixture(), w = f.worker('aventura-palabras-runtime-v348');
  const cache = await f.caches.open('aventura-palabras-runtime-v347');
  for (const file of w.config.assets) await cache.put(new URL(file, scope), new Response('original:' + file));
  const baseline = JSON.parse(fs.readFileSync(path.join(root, 'tools/cache-legacy-v347.json'), 'utf8'));
  await cache.put(new URL('./__revisiones-recursos__.json', scope), new Response(JSON.stringify(Object.fromEntries(Object.entries(baseline).map(([file, record]) => [file, record.revision])))));
  const modified = Array.from(w.config.assets).filter(file => !w.config.legacy[file]);
  f.network(Object.fromEntries(modified.map(file => {
    const filename = file === './' ? 'index.html' : file.slice(2);
    const body = fs.readFileSync(path.join(root, filename));
    return [file, /\.(html|css|js|json|svg|txt|xml|webmanifest)$/.test(filename) ? body.toString().replace(/\r\n/g, '\n') : body];
  })));
  f.puts.length = 0; await w.install(); await w.activate();
  assert.deepEqual(f.downloads, modified);
  assert.equal(f.puts.length, 2 + modified.length, 'only modified files and metadata, no copying of existing resources');
  assert(f.stores.has('aventura-palabras-runtime-v347'), 'referenced original cache is preserved');
  assert.equal(await (await w.read('./js/app.js?v=new')).text(), 'original:./js/app.js');
  assert.equal(f.messages.at(-1).reutilizados, w.config.assets.length - modified.length);
});

test('a CSS-only update downloads one file; unchanged code and media are neither copied nor downloaded', async () => {
  const f = fixture(), original = {'./index.html':'old html','./styles.css':'old css','./music.mp3':'0123456789','./scene.png':'image','./app.js':'code'};
  f.network(original); const old = f.worker('aventura-palabras-runtime-v400', original); await old.install(); await old.activate();
  const changed = {...original, './styles.css':'new css'}; f.network(changed); f.downloads.length = f.puts.length = 0;
  const next = f.worker('aventura-palabras-runtime-v401', changed); await next.install();
  assert.deepEqual(f.downloads, ['./styles.css']);
  assert.equal(f.puts.filter(p=>p.cache===next.config.resourceCache).length, 1);
  assert.equal(await (await old.read('./styles.css')).text(), 'old css', 'waiting update cannot alter the active version');
  await next.activate(); f.fail('./music.mp3');
  assert.equal(await (await next.read('./styles.css?v=stale')).text(), 'new css');
  const range = await next.read('./music.mp3', {Range:'bytes=2-5'});
  assert.equal(range.status, 206); assert.equal(await range.text(), '2345');
  assert.equal(f.downloads.length, 1);
  assert(!f.stores.has('aventura-palabras-runtime-v400'), 'obsolete manifest can be deleted without deleting resources');
});

test('an interrupted update leaves the active release offline-capable and retries only missing files', async () => {
  const f = fixture(), original = {'./index.html':'old html','./styles.css':'old css','./music.mp3':'music'};
  f.network(original); const old = f.worker('aventura-palabras-runtime-v410', original); await old.install(); await old.activate();
  const changed = {...original, './index.html':'new html','./styles.css':'new css'}; f.network(changed); f.fail('./styles.css');
  const next = f.worker('aventura-palabras-runtime-v411', changed); await assert.rejects(next.install(), /interrupted/);
  assert.equal(await (await old.read('./index.html')).text(), 'old html');
  const incomplete = await f.caches.open('aventura-palabras-runtime-v411');
  assert.equal(await incomplete.match(new URL('./__ubicaciones-recursos__.json',scope)), undefined);
  assert.equal(f.messages.at(-1).estado, 'error');
  f.fail(''); f.downloads.length = 0; await next.install(); assert.deepEqual(f.downloads, ['./styles.css']);
  await next.activate(); assert.equal(await (await next.read('./index.html')).text(), 'new html');
});

test('a stale or corrupted server response cannot replace the installed file', async () => {
  const f = fixture(), expected = {'./styles.css':'expected css'};
  f.network({'./styles.css':'stale css'}); const w = f.worker('aventura-palabras-runtime-v420', expected);
  await assert.rejects(w.install(), /no corresponde/);
  assert.equal(f.puts.length, 0);
  f.network(expected); await w.install(); await w.activate();
  assert.equal(await (await w.read('./styles.css')).text(), 'expected css');
});

test('missing legacy revision metadata is not treated as permission to reuse unknown bytes', async () => {
  const f = fixture(), files = {'./styles.css':'new css'};
  const cache = await f.caches.open('aventura-palabras-runtime-v346'); await cache.put(new URL('./styles.css',scope),new Response('unknown old css'));
  f.network(files); const w = f.worker('aventura-palabras-runtime-v430',files); await w.install();
  assert.deepEqual(f.downloads,['./styles.css']);
  assert.equal(await (await w.read('./styles.css')).text(),'new css');
});
