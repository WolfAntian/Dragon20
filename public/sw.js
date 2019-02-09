self.addEventListener('install', function (event) {
    console.log('SW Installed');
    event.waitUntil(
        caches.open('static')
            .then(function (cache) {
                cache.addAll([
                    '/',
                    '/js/app.js',
                    '/css/app.css',
                ]);
            })
    );
});

self.addEventListener('activate', function () {
    console.log('SW activated');
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(res) {
                if (res) {
                    return res;
                } else {
                    return fetch(event.request);
                }
            })
    );
});