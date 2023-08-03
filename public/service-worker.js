// Define the cache name for your app's assets
const cacheName = 'Stocky-v1';

// List the files and assets you want to cache
const filesToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Add other paths to your static assets, like CSS, JS, and images here
];

// Install the Service Worker and cache the app's assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

// Activate the Service Worker and remove old caches if necessary
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== cacheName) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Intercept fetch requests and serve cached assets if available
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
