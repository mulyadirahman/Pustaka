const VER = 'pustaka-v4';
const FILES = [
  './', './index.html', './manifest.webmanifest',
  './lib/pdf.min.js', './lib/pdf.worker.min.js', './lib/page-flip.browser.js', './lib/libarchive.js', './lib/worker-bundle.js', './lib/libarchive.wasm',
  './icons/icon-192.png', './icons/icon-512.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VER).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VER).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request).catch(() => caches.match('./index.html')))
  );
});
