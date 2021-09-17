let cacheName = 'v1',
    appShellFiles = [
    '../../index.html',
    '../imgs/bg-1.jpg',
    '../imgs/bg-2.jpg',
    '../imgs/bg-3.jpg',
    '../imgs/bg-4.jpg',
    '../imgs/bg-5.jpg',
    '../imgs/icons/favicon1.svg',
    '../imgs/icons/favicon2.svg',
    '../imgs/icons/add.svg',
    '../imgs/icons/edit.svg',
    '../imgs/icons/pin.svg',
    '../imgs/icons/reset.svg',
    '../imgs/icons/trash.svg',
    '../css/app.css'
];

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(appShellFiles);
        })
    );
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(r) {
            console.log('[Service Worker] Fetching resource: ' + e.request.url);
            return r || fetch(e.request).then(function(response) {
                return caches.open(cacheName).then(function(cache) {
                    console.log('[Service Worker] Caching new resource: '+e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});
