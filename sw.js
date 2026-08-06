const CACHE_NAME = "aventura-palabras-runtime-v18";
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
  "./assets/images/fondos/menu-inicio-aventura.png",
  "./assets/icons/icon-maskable-512.png",
  "./assets/images/elements/cristal-sabiduria-esmeralda.png",
  "./assets/images/personajes/versus/dragon-base.png",
  "./assets/images/personajes/versus/dragon-ataque.png",
  "./assets/images/personajes/versus/dragon-llamando.png",
  "./assets/images/personajes/versus/dragon-victoria.png",
  "./assets/images/personajes/versus/mama-dragon-pata.png",
  "./assets/sounds/cristal-casilla.mp3",
  "./assets/sounds/comenzar-aventura.wav",
  "./assets/sounds/melodia-menu.mp3",
  "./assets/sounds/seleccion-personaje.mp3",
  "./assets/sounds/prologo.mp3",
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const requests = CORE_ASSETS.map((path) => new Request(
      new URL(path, self.registration.scope),
      { cache: "reload" },
    ));
    await cache.addAll(requests);
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames
        .filter((cacheName) => cacheName.startsWith("aventura-palabras-") && cacheName !== CACHE_NAME)
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
