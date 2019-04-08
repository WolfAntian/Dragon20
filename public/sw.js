self.addEventListener('install', function (event) {
    console.log('SW Installed');
    event.waitUntil(
        caches.open('static')
            .then(function (cache) {
                cache.addAll([
                    '/',
                    '/js/app.js',
                    '/css/app.css',
                    '/favicon.ico',
                    '/manifest.json',
                    'https://fonts.googleapis.com/css?family=Nunito',
                    'https://fonts.gstatic.com/s/nunito/v9/XRXV3I6Li01BKofINeaB.woff',
                ]);
            })
    );
});

self.addEventListener('activate', function () {
    console.log('SW activated');
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open('static').then(function(cache) {
            return cache.match(event.request).then(function (response) {
                var fetchPromise = fetch(event.request).then(function (networkResponse) {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
                return response || fetchPromise;
            })
        })
    );
});