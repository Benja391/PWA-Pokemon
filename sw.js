const cacheName = 'pwa-pokemon-archivos';
const assets = [
  'index.html',
  'js/main.js',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
  'css/style.css',
  'manifest.json',
  'sw.js',
  'icons/icon-192x192.png',
  'icons/icon-256x256.png',
  'src/ash.jpg',
  'src/pokedex.jpg',
  'src/tipos-de-pokemon.jpg',
  'src/entrenadores-dos.jpeg'
];

self.addEventListener('install', event => {
  console.log('El SW se instaló.');

  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(assets);
      })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("Fetch:", event.request.url);

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log("Recuperado del caché:", event.request.url);
        return response;
      }

      return fetch(event.request)
        .then((fetchResponse) => {
          if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== "basic") {
            return fetchResponse;
          }

          const responseToCache = fetchResponse.clone();

          caches.open(cacheName).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return fetchResponse;
        })
        .catch((error) => {
          console.log("Error en la solicitud de recuperación:", error);
        });
    })
  );
});
