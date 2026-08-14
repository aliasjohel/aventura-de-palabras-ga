const CACHE_PREFIX = "aventura-palabras-runtime-";
const CACHE_NAME = `${CACHE_PREFIX}v95`;
const LEGACY_CACHE_NAMES = new Set([
  `${CACHE_PREFIX}v93`,
  `${CACHE_PREFIX}v94`,
]);
const LEGACY_REVISION = "legacy-v93-v94";
const REVISIONES_CACHE_URL = "./__revisiones-recursos__.json";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/styles.css",
  "./css/intro.css",
  "./js/intro.js",
  "./js/supabase-config.js",
  "./js/supabase-client.js",
  "./js/versus-engine.js",
  "./js/versus-room.js",
  "./js/versus-room-supabase.js",
  "./js/app.js",
  "./js/pwa.js",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/images/intro/libro-intro-sin-cristal.png",
  "./assets/images/intro/cristal-icono.png",
  "./assets/images/elementos/rama-frondosa-bosque-1.png",
  "./assets/images/elementos/rama-frondosa-bosque-2.png",
  "./assets/images/elementos/rama-frondosa-bosque-3.png",
  "./assets/images/fondos/menu-inicio-aventura.png",
  "./assets/icons/icon-maskable-512.png",
  "./assets/images/elements/cristal-sabiduria-esmeralda.png",
  "./assets/images/elements/mural-dragon-bosque.png",
  "./assets/images/elements/dragon-guardian-rompe-mural.png",
  "./assets/images/elements/dragon-guardian-despierto.png",
  "./assets/images/elements/dragon-guardian-entrega-cristal.png",
  "./assets/sounds/colocar-piezas.mp3",
  "./assets/sounds/cristal-casilla.mp3",
  "./assets/sounds/comenzar-aventura.wav",
  "./assets/sounds/melodia-menu.mp3",
  "./assets/sounds/seleccion-personaje.mp3",
  "./assets/sounds/prologo.mp3",
  "./assets/sounds/acertar.mp3",
  "./assets/sounds/error.mp3",
  "./assets/sounds/moneda.mp3",
  "./assets/sounds/victoria.mp3",
  "./assets/sounds/derrota.mp3",
  "./assets/sounds/piedra.mp3",
  "./assets/sounds/ramas.mp3",
  "./assets/sounds/lluvia.mp3",
  "./assets/sounds/niebla.mp3",
  "./assets/sounds/lobos.mp3",
  "./assets/sounds/bosque-prohibido.mp3",
  "./assets/sounds/ambiente-puente.mp3",
  "./assets/sounds/crujido-puente.mp3",
  "./assets/sounds/ambiente-santuario.mp3",
  "./assets/sounds/ambiente-portal.mp3",
  "./assets/sounds/diamante-recolectado.mp3",
  "./assets/sounds/comienza-mundo-2.mp3",
  "./assets/sounds/ataque-1.mp3",
  "./assets/sounds/ataque-2.mp3",
  "./assets/sounds/fight.mp3",
  "./assets/sounds/finish.mp3",
  "./assets/sounds/mural-dragon1.mp3",
  "./assets/sounds/camina-al-portal.mp3",
  "./assets/images/personajes/versus/dragon-base.png",
  "./assets/images/personajes/versus/dragon-ataque.png",
  "./assets/images/personajes/versus/dragon-llamando.png",
  "./assets/images/personajes/versus/dragon-victoria.png",
  "./assets/images/personajes/versus/remolino-arcano-mago.png",
  "./assets/images/personajes/versus/explorador-lupa.png",
  "./assets/images/elementos/enredaderas-teclado-versus.png",
  "./assets/images/personajes/versus/guardiana-susto-impacto.png",
  "./assets/images/personajes/versus/dragon-susto-impacto.png",
  "./assets/images/personajes/versus/mama-dragon-pata.png",
  "./assets/images/personajes/versus/hombre-lobo-base.png",
  "./assets/images/personajes/versus/hombre-lobo-zarpazo.png",
  "./assets/images/personajes/versus/hombre-lobo-salto-lunar.png",
  "./assets/images/personajes/versus/hombre-lobo-aullido.png",
  "./assets/images/personajes/versus/hombre-lobo-impacto.png",
  "./assets/images/personajes/versus/carnivora-devorando-hombre-lobo.png",
  "./assets/images/personajes/versus/hombre-lobo-impacto-v2.png",
  "./assets/images/personajes/versus/carnivora-devorando-hombre-lobo-v2.png",
  "./assets/images/personajes/versus/carnivora-devorando-dragon.png",
  "./assets/images/personajes/versus/lobos-espectrales.png",
  "./assets/images/personajes/versus/garra-pantalla-rota.png",
  "./assets/images/personajes/versus/t-shadow-base.png",
  "./assets/images/personajes/versus/t-shadow-ataque.png",
  "./assets/images/personajes/versus/t-shadow-victoria.png",
  "./assets/images/personajes/versus/t-shadow-ojos.png",
  "./assets/images/personajes/versus/t-shadow-impacto.png",
  "./assets/images/personajes/versus/carnivora-devorando-t-shadow.png",
  "./assets/images/personajes/versus/guardian-alba-base.png",
  "./assets/images/personajes/versus/guardian-alba-ataque.png",
  "./assets/images/personajes/versus/guardian-alba-habilidad.png",
  "./assets/images/personajes/versus/guardian-alba-final-carga.png",
  "./assets/images/personajes/versus/guardian-alba-esfera-solar.png",
  "./assets/images/personajes/versus/guardian-alba-victoria.png",
  "./assets/images/personajes/versus/guardian-alba-impacto.png",
  "./assets/images/personajes/versus/dragon-hielo-base.png",
  "./assets/images/personajes/versus/dragon-hielo-ataque.png",
  "./assets/images/personajes/versus/dragon-hielo-ataque-v2.png",
  "./assets/images/personajes/versus/dragon-hielo-vuelo.png",
  "./assets/images/personajes/versus/dragon-hielo-impacto.png",
  "./assets/images/personajes/versus/orbe-hielo-nivor.png",
  "./assets/images/personajes/versus/dragon-hielo-victoria.png",
  "./assets/images/personajes/versus/dragon-hielo-frontal-alas.png",
  "./assets/images/personajes/versus/dragon-hielo-aleteo-alto.png",
  "./assets/images/personajes/versus/dragon-hielo-aleteo-bajo.png",
  "./assets/images/personajes/versus/dragon-hielo-descenso-alto.png",
  "./assets/images/personajes/versus/dragon-hielo-descenso-bajo.png",
  "./assets/images/elementos/hielo-pantalla-nivor-1.png",
  "./assets/images/elementos/hielo-pantalla-nivor-2.png",
  "./assets/images/elementos/hielo-pantalla-nivor-3.png",
  "./assets/images/elementos/prision-hielo-nivor.png",
  "./assets/images/elementos/cubos-hielo-nivor.png",
  "./assets/images/elementos/ventisca-nivor.png",
  "./assets/images/personajes/versus/azrak-base.png",
  "./assets/images/personajes/versus/azrak-ataque.png",
  "./assets/images/personajes/versus/azrak-impacto.png",
  "./assets/images/personajes/versus/azrak-victoria.png",
  "./assets/images/personajes/versus/corte-infernal-azrak.png",
  "./assets/images/personajes/versus/calavera-ignea-azrak.png",
  "./assets/images/personajes/versus/azrak-invocacion-portal.png",
  "./assets/images/personajes/versus/mano-abismo-emergiendo-azrak.png",
  "./assets/images/personajes/versus/mano-abismo-abierta-azrak.png",
  "./assets/images/personajes/versus/mano-abismo-atrapa-explorador.png",
  "./assets/images/personajes/versus/mano-abismo-atrapa-mago.png",
  "./assets/images/personajes/versus/mano-abismo-atrapa-guardiana.png",
  "./assets/images/personajes/versus/mano-abismo-atrapa-dragon.png",
  "./assets/images/personajes/versus/mano-abismo-atrapa-hombre-lobo.png",
  "./assets/images/personajes/versus/mano-abismo-atrapa-t-shadow.png",
  "./assets/images/personajes/versus/mano-abismo-atrapa-guardian-alba.png",
  "./assets/images/personajes/versus/mano-abismo-atrapa-dragon-hielo.png",
  "./assets/images/personajes/versus/mano-abismo-atrapa-azrak.png",
  "./assets/images/personajes/versus/carnivora-devorando-guardian-alba.png",
  "./assets/images/personajes/versus/carnivora-devorando-dragon-hielo.png",
  "./assets/images/personajes/versus/carnivora-devorando-azrak.png",
];

/*
 * Al modificar un recurso existente, hay que cambiar también su revisión aquí.
 * Los recursos no enumerados conservan la revisión de las cachés v93/v94 y se
 * copian localmente durante la migración, sin volver a descargarlos.
 */
const ASSET_REVISIONS = {
  "./": "20260814-pwa-diferencial-1",
  "./index.html": "20260814-pwa-diferencial-1",
  "./css/styles.css": "20260814-mural-pantalla-completa-1",
  "./js/app.js": "20260814-mural-pantalla-completa-1",
  "./js/pwa.js": "20260814-pwa-diferencial-1",
};

const REVISIONES_ACTUALES = Object.fromEntries(
  CORE_ASSETS.map((path) => [path, ASSET_REVISIONS[path] || LEGACY_REVISION]),
);

async function informarProgresoInstalacion({
  completados,
  total,
  descargados = 0,
  reutilizados = 0,
  estado = "preparando",
}) {
  const clientes = await self.clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });
  const porcentaje = total > 0 ? Math.round((completados / total) * 100) : 100;
  clientes.forEach((cliente) => cliente.postMessage({
    type: "PWA_INSTALL_PROGRESS",
    estado,
    completados,
    total,
    descargados,
    reutilizados,
    porcentaje,
    version: CACHE_NAME,
  }));
}

async function obtenerCachesReutilizables() {
  const nombres = (await caches.keys()).filter(
    (nombre) => nombre.startsWith(CACHE_PREFIX) && nombre !== CACHE_NAME,
  );

  return Promise.all(nombres.map(async (nombre) => {
    const cache = await caches.open(nombre);
    const respuestaRevisiones = await cache.match(
      new URL(REVISIONES_CACHE_URL, self.registration.scope),
    );
    let revisiones = {};

    if (respuestaRevisiones) {
      try {
        revisiones = await respuestaRevisiones.json();
      } catch (_error) {
        revisiones = {};
      }
    } else if (LEGACY_CACHE_NAMES.has(nombre)) {
      revisiones = Object.fromEntries(
        CORE_ASSETS.map((path) => [path, LEGACY_REVISION]),
      );
    }

    return { cache, revisiones };
  }));
}

async function buscarRecursoReutilizable(path, revision, cachesAnteriores) {
  const request = new Request(new URL(path, self.registration.scope));

  for (const anterior of cachesAnteriores) {
    if (anterior.revisiones[path] !== revision) continue;
    const response = await anterior.cache.match(request, { ignoreSearch: true });
    if (response) return response;
  }

  return null;
}

async function instalarRecursosConProgreso() {
  const cache = await caches.open(CACHE_NAME);
  const cachesAnteriores = await obtenerCachesReutilizables();
  const total = CORE_ASSETS.length;
  let completados = 0;
  let descargados = 0;
  let reutilizados = 0;

  await informarProgresoInstalacion({
    completados,
    total,
    descargados,
    reutilizados,
    estado: "iniciando",
  });

  for (const path of CORE_ASSETS) {
    const request = new Request(new URL(path, self.registration.scope));
    const revision = REVISIONES_ACTUALES[path];
    const reutilizable = await buscarRecursoReutilizable(
      path,
      revision,
      cachesAnteriores,
    );

    if (reutilizable) {
      await cache.put(request, reutilizable.clone());
      reutilizados += 1;
    } else {
      const response = await fetch(new Request(request, { cache: "reload" }));
      if (!response.ok) {
        throw new Error(`No se pudo descargar ${path}: ${response.status}`);
      }
      await cache.put(request, response);
      descargados += 1;
    }

    completados += 1;
    await informarProgresoInstalacion({
      completados,
      total,
      descargados,
      reutilizados,
    });
  }

  await cache.put(
    new URL(REVISIONES_CACHE_URL, self.registration.scope),
    new Response(JSON.stringify(REVISIONES_ACTUALES), {
      headers: { "Content-Type": "application/json" },
    }),
  );

  await informarProgresoInstalacion({
    completados: total,
    total,
    descargados,
    reutilizados,
    estado: "completa",
  });
}

self.addEventListener("install", (event) => {
  event.waitUntil(instalarRecursosConProgreso().catch(async (error) => {
    await informarProgresoInstalacion({
      completados: 0,
      total: CORE_ASSETS.length,
      estado: "error",
    });
    throw error;
  }));
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames
        .filter((cacheName) => cacheName.startsWith(CACHE_PREFIX) && cacheName !== CACHE_NAME)
        .map((cacheName) => caches.delete(cacheName)),
    );
    await self.clients.claim();
  })());
});

async function responderDesdeRed(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request, { cache: "no-store" });
    if (response.ok) {
      await cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cachedResponse = await cache.match(request, { ignoreSearch: true });
    if (cachedResponse) return cachedResponse;

    if (request.mode === "navigate") {
      const offlinePage = await cache.match(new URL("./index.html", self.registration.scope));
      if (offlinePage) return offlinePage;
    }

    throw error;
  }
}

async function responderRecursoEstatico(event) {
  const { request } = event;
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request, { ignoreSearch: true });
  const actualizarCache = fetch(request, { cache: "no-cache" }).then(
    async (response) => {
      if (response.ok) {
        await cache.put(request, response.clone());
      }

      return response;
    },
  );

  if (cachedResponse) {
    event.waitUntil(actualizarCache.catch(() => {}));
    return cachedResponse;
  }

  return actualizarCache;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (
    request.method !== "GET"
    || url.origin !== self.location.origin
    || request.headers.has("range")
  ) {
    return;
  }

  if (["image", "audio", "font"].includes(request.destination)) {
    event.respondWith(responderRecursoEstatico(event));
    return;
  }

  event.respondWith(responderDesdeRed(request));
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
