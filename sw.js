// Bump this when you deploy changes so installed copies pick up the new version.
const VERSION = 'sf-guide-v9';
// Map tiles live in their own cache so they survive version bumps; capped to keep storage small.
const TILES = 'sf-tiles-v1';
const TILE_MAX = 800;
const CORE = [
  './', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => Promise.allSettled(CORE.map(u =>
    fetch(u, { mode: u.startsWith('http') ? 'no-cors' : 'same-origin' }).then(res => c.put(u, res))
  ))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== TILES).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.host === 'tile.openstreetmap.org' || url.host === 'server.arcgisonline.com') { e.respondWith(tile(req)); return; }
  const cacheable = url.origin === location.origin || /cdnjs\.cloudflare\.com|fonts\.(googleapis|gstatic)\.com/.test(url.host);
  if (!cacheable) return;
  // Pages: network first (fresh content). Everything else: cache first (fast, works offline).
  if (req.mode === 'navigate') {
    // no-cache: always ask the server (GitHub Pages sends max-age=600), so a deploy shows up on the next open.
    e.respondWith(fetch(req, { cache: 'no-cache' }).then(res => { caches.open(VERSION).then(c => c.put('./index.html', res.clone())); return res; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  })));
});

// Tiles: cache first, so areas you've already looked at still show offline.
function tile(req) {
  return caches.open(TILES).then(c => c.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok) c.put(req, res.clone()).then(() => trim(c));
    return res;
  })));
}
function trim(c) {
  return c.keys().then(keys => keys.length > TILE_MAX && Promise.all(keys.slice(0, keys.length - TILE_MAX).map(k => c.delete(k))));
}
