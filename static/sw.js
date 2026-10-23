const CACHE_NAME = 'senac-cache-v1';
const urlsToCache = [
  '/',
  '/login',
  '/static/style.css',
  '/static/script.js',
  'https://cdn-icons-png.flaticon.com/512/2602/2602202.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  // Para chamadas de API (dados), tenta buscar na internet primeiro
  if (event.request.url.includes('/api/')) {
    event.respondWith(fetch(event.request));
    return;
  }
  
  // Para o resto (CSS, JS, HTML), tenta do cache primeiro
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});