const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const pwa = fs.readFileSync(path.join(root, "js", "pwa.js"), "utf8");
const worker = fs.readFileSync(path.join(root, "sw.js"), "utf8");

assert.match(html, /id="progresoActualizacionPwa"/);
assert.match(html, /id="barraActualizacionPwa"[\s\S]+max="100"/);
assert.match(html, /id="porcentajeActualizacionPwa"/);
assert.match(pwa, /PWA_INSTALL_PROGRESS/);
assert.match(pwa, /actualizarBarraDescarga/);
assert.match(pwa, /common\.pwa\.allReady/);
assert.match(pwa, /descargados/);
assert.match(pwa, /reutilizados/);
assert.match(worker, /function instalarRecursosConProgreso/);
assert.match(worker, /function buscarRecursoReutilizable/);
assert.match(worker, /REVISIONES_ACTUALES/);
assert.match(worker, /reutilizados/);
assert.doesNotMatch(worker, /cache\.addAll/);

const sonidos = fs.readdirSync(path.join(root, "assets", "sounds"));
sonidos.forEach((archivo) => {
  assert.match(worker, new RegExp(`assets/sounds/${archivo.replace(".", "\\.")}`));
});

console.log("pwa-update-progress: comprobaciones correctas");

test("volver al menú recupera el aviso de una descarga o un error pendientes", async () => {
  const elementos = new Map();
  let menuActivo = false, observarMenu;
  const eventos = {};
  const elemento = id => {
    if (!elementos.has(id)) elementos.set(id, {
      hidden: true, dataset: {}, addEventListener() {},
      classList: { contains: () => menuActivo },
    });
    return elementos.get(id);
  };
  const contexto = {
    GameUI: {
      key: (name,params={}) => ({name,params}),
      text: (node,value) => {
        const catalog=JSON.parse(fs.readFileSync(path.join(root,'locales/es/common.json'))).pwa;
        node.textContent=typeof value==='string'?value:catalog[value.name.split('.').at(-1)].replace(/\{(\w+)\}/g,(_,key)=>String(value.params[key]));
      },
    },
    navigator: { onLine: true, serviceWorker: {
      controller: {}, addEventListener: (tipo, fn) => { eventos[tipo] = fn; },
      register: async () => ({ update: async () => {}, addEventListener() {} }),
      ready: Promise.resolve(),
    } },
    document: { getElementById: elemento, documentElement: { dataset: {} }, addEventListener() {} },
    window: { addEventListener() {}, setInterval() {} },
    sessionStorage: { getItem() {} },
    MutationObserver: class { constructor(fn) { observarMenu = fn; } observe() {} },
  };
  vm.runInNewContext(pwa, contexto);
  await contexto.registrarAplicacionInstalable();
  eventos.message({ data: { type: 'PWA_INSTALL_PROGRESS', porcentaje: 25, completados: 1, total: 4 } });
  assert.equal(elemento('avisoActualizacionPwa').hidden, true);
  menuActivo = true; observarMenu();
  assert.equal(elemento('avisoActualizacionPwa').hidden, false);
  assert.equal(elemento('barraActualizacionPwa').value, 25);
  menuActivo = false; observarMenu();
  eventos.message({ data: { type: 'PWA_INSTALL_PROGRESS', estado: 'error' } });
  menuActivo = true; observarMenu();
  assert.equal(elemento('avisoActualizacionPwa').hidden, false);
  assert.equal(elemento('tituloActualizacionPwa').textContent, 'No se completó la actualización');
});

test("los archivos instalados no se mezclan con otra versión en segundo plano", async () => {
  let descargas = 0;
  const contexto = {
    URL, Request, Response,
    caches: { open: async () => ({ match: async () => new Response('versión instalada') }) },
    fetch: async () => { descargas++; return new Response('otra versión'); },
    self: { registration: { scope: 'https://juego.test/' }, addEventListener() {} },
  };
  vm.runInNewContext(worker, contexto);
  const respuesta = await contexto.responderRecursoEstatico({
    request: new Request('https://juego.test/js/app.js?v=nueva'), waitUntil() {},
  });
  assert.equal(await respuesta.text(), 'versión instalada');
  assert.equal(descargas, 0);
});
