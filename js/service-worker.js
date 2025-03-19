self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open("pwa").then(function(cache) {
            return cache.addAll([
                '/easy-survey/assets/css/general.css',
                '/easy-survey/assets/css/navbar.css',
                '/easy-survey/assets/css/loader.css',
                '/easy-survey/assets/css/footer.css',
                '/easy-survey/index.html'
            ]);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.open("pwa").then(function(cache) {
            return cache.match(event.request).then(function(response) {
                cache.addAll([event.request.url]);
                if (response) {
                    return response;
                }
                return fetch(event.request);
            });
        })
    );
});