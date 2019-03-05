const cacheName = 'jonomcleish-cache-v3';
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/normalize.css',
        '/prefixfree.min.js',
        '/sw.js',
        '/images/jonomcleish-192.png',
        '/images/jonomcleish-512.png'
      ])
      .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});


// self.addEventListener('install', function(e) {
//   e.waitUntil(
//     caches.open('jonomcleish-cache-v2').then(function(cache) {
//       return cache.addAll([
//           '/index.html',
//           '/manifest.json',
//           '/normalize.css',
//           '/prefixfree.min.js',
//           '/sw.js',
//           '/images/jonomcleish-192.png',
//           '/images/jonomcleish-512.png'
//       ]);
//     })
//   );
// });
//
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       return response || fetch(event.request);
//     })
//   );
// });


// var CACHE_NAME = 'jonomcleish-cache-v1';
// var urlsToCache = [
//     '/index.html',
//     '/manifest.json',
//     '/normalize.css',
//     '/prefixfree.min.js',
//     '/sw.js',
//     '/images/jonomcleish-192.png',
//     '/images/jonomcleish-512.png'
// ];
//
// self.addEventListener('install', function(event) {
//   // Perform install steps
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(function(cache) {
//         console.log('Opened cache');
//         return cache.addAll(urlsToCache);
//       })
//   );
// });
//
// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//       caches.match(event.request)
//         .then(function(response) {
//           // Cache hit - return response
//           if (response) {
//             return response;
//           }
//           return fetch(event.request);
//         }
//       )
//     );
// });
