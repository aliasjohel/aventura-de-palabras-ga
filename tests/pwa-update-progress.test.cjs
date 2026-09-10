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
assert.match(pwa, /Todos los archivos están listos/);
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

test("la actualización reutiliza la caché anterior y descarga sólo las diferencias", async () => {
  const eventos = {};
  const mensajes = [];
  const almacenes = new Map();
  const solicitudesRed = [];

  const clave = (entrada, ignorarBusqueda = false) => {
    const valor = entrada instanceof URL
      ? entrada.href
      : typeof entrada === "string"
        ? entrada
        : entrada.url;
    const url = new URL(valor);
    if (ignorarBusqueda) url.search = "";
    return url.href;
  };

  class CacheSimulada {
    constructor() {
      this.entradas = new Map();
    }

    async match(request, options = {}) {
      const buscada = clave(request, options.ignoreSearch);
      for (const [guardada, response] of this.entradas) {
        if (clave(guardada, options.ignoreSearch) === buscada) return response.clone();
      }
      return undefined;
    }

    async put(request, response) {
      this.entradas.set(clave(request), response.clone());
    }
  }

  const cachesSimuladas = {
    async keys() {
      return [...almacenes.keys()];
    },
    async open(nombre) {
      if (!almacenes.has(nombre)) almacenes.set(nombre, new CacheSimulada());
      return almacenes.get(nombre);
    },
    async delete(nombre) {
      return almacenes.delete(nombre);
    },
  };

  const contexto = {
    Request,
    Response,
    URL,
    caches: cachesSimuladas,
    fetch: async (request) => {
      solicitudesRed.push(request.url);
      return new Response(`red:${request.url}`, { status: 200 });
    },
    self: {
      registration: { scope: "https://juego.test/" },
      location: { origin: "https://juego.test" },
      clients: {
        async matchAll() {
          return [{ postMessage: (mensaje) => mensajes.push(mensaje) }];
        },
        async claim() {},
      },
      addEventListener(tipo, callback) {
        eventos[tipo] = callback;
      },
      skipWaiting() {},
    },
  };

  vm.runInNewContext(
    `${worker}\nself.__pwaTest = { CORE_ASSETS, ASSET_REVISIONS, CACHE_NAME };`,
    contexto,
  );

  for (const recurso of contexto.self.__pwaTest.CORE_ASSETS) {
    if (recurso === './' || /\.(html|css|js)$/.test(recurso)) {
      assert.equal(contexto.self.__pwaTest.ASSET_REVISIONS[recurso], contexto.self.__pwaTest.CACHE_NAME,
        `El archivo ejecutable ${recurso} debe renovarse con cada actualización`);
    }
  }
  const cacheAnterior = await cachesSimuladas.open("aventura-palabras-runtime-v93");
  for (const recurso of contexto.self.__pwaTest.CORE_ASSETS) {
    const url = new URL(recurso, contexto.self.registration.scope);
    await cacheAnterior.put(url, new Response(`guardado:${recurso}`));
  }

  let instalacion;
  eventos.install({ waitUntil: (promesa) => { instalacion = promesa; } });
  await instalacion;

  const diferencias = Object.keys(contexto.self.__pwaTest.ASSET_REVISIONS);
  assert.equal(solicitudesRed.length, diferencias.length);
  assert.deepEqual(
    solicitudesRed.map((url) => new URL(url).pathname).sort(),
    diferencias.map((recurso) => new URL(recurso, contexto.self.registration.scope).pathname).sort(),
  );

  const progresoFinal = mensajes.at(-1);
  assert.equal(progresoFinal.estado, "completa");
  assert.equal(progresoFinal.descargados, diferencias.length);
  assert.equal(
    progresoFinal.reutilizados,
    contexto.self.__pwaTest.CORE_ASSETS.length - diferencias.length,
  );
});
