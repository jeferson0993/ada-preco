const STATIC_CACHE_NAME = "ada-preco-v1.0.0";
const ASSETS = [
  "/ada-preco/",
  "/ada-preco/app.js",
  "/ada-preco/index.js",
  "/ada-preco/index.html"
];

// install event
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS);
    })
  );
});

// activate event
self.addEventListener("activate", function (e) {
  console.log("service worker %cativado!", "color: green");
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== STATIC_CACHE_NAME)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(cacheRes => {
      return cacheRes || fetch(e.request);
    })
  );
});
