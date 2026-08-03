const CACHE_NAME = "aventura-palabras-runtime-v3";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/styles.css",
  "./js/app.js",
  "./js/pwa.js",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon-maskable-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const requests = CORE_ASSETS.map((path) => new Request(
      new URL(path, self.registration.scope),
      { cache: "reload" },
    ));
    await cache.addAll(requests);
    await self.skipWaiting();
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
