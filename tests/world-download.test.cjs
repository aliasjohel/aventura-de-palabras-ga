const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

test('forest pack includes the dragon music, all missions, cinematics and combat; words share one preparation', async () => {
  const requests = [], listeners = {}, elements = [], saved = new Set();
  const context = {
    URL, setTimeout: () => 1, clearTimeout() {},
    addEventListener(type, handler) { listeners[type] = handler; },
    document: {
      baseURI: 'https://game.test/', body: { append() {} },
      addEventListener() {},
      createElement() {
        const el = { style: {}, setAttribute() {}, replaceChildren() {}, remove() {} };
        elements.push(el); return el;
      },
    },
    MessageChannel: class {
      constructor() {
        this.port1 = { close() {} };
        this.port2 = { postMessage: data => this.port1.onmessage({ data }) };
      }
    },
    navigator: { serviceWorker: { controller: {
      postMessage(data, ports) {
        if (data.type === 'GET_VERSION') return ports[0].postMessage({ resourcePacks: true });
        requests.push(data);
        if (data.checkOnly) return ports[0].postMessage({ available: data.paths.every(path => saved.has(path)) });
        const totalBytes = data.paths.reduce((sum, path) => sum + (data.sizes[path] || 0), 0);
        ports[0].postMessage({ progress: true, completedBytes: totalBytes, totalBytes, completed: data.paths.length, total: data.paths.length });
        ports[0].postMessage({ available: true });
        data.paths.forEach(path => saved.add(path));
      },
    } } },
  };
  vm.runInNewContext(fs.readFileSync('js/resource-catalog.js', 'utf8'), context);
  vm.runInNewContext(fs.readFileSync('js/resource-loader.js', 'utf8'), context);
  await context.GameResources.world([], 0);
  await context.GameResources.world([], 0);
  assert.equal(requests.length, 2);
  assert.equal(requests.filter(request => !request.checkOnly).length, 1);
  const paths = requests[0].paths;
  for (const path of [
    './assets/sounds/mural-dragon1.mp3', './assets/sounds/camina-al-portal.mp3',
    './assets/sounds/comienza-mundo-2.mp3',
    './assets/images/elements/dragon-guardian-entrega-cristal.png',
    './assets/images/fondos/bosque-9.png', './assets/images/fondos/bosque-10.png',
  ]) assert(paths.includes(path), path);
  for (const path of context.GameResourceCatalog.filter(p => /bosque-kairos|personajes\/versus\/guardiana|personajes\/versus\/kairos/.test(p))) {
    assert(paths.includes(path), path);
  }
  assert(elements.some(el => /MB/.test(el.textContent || '')));
  listeners.pageshow();
  await context.GameResources.world([], 0);
  assert.equal(requests.length, 3, 'returning to the app checks persisted files again');
  assert.equal(requests.at(-1).checkOnly, true);
  assert.equal(requests.filter(request => !request.checkOnly).length, 1, 'saved worlds do not start another download');
});
