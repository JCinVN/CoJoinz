// 每次載入直接清空瀏覽器的所有 Cache Storage
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key)));
    })
  );
  self.clients.claim();
});

// 完全繞過快取，直接抓取網路最新資料
self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request));
});
