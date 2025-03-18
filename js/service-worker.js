self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open("pwa").then(function(cache) {
            return cache.addAll([
                "alextimonci.github.io/easy-survey/",
                "alextimonci.github.io/easy-survey/assets/css/general.css",
                "alextimonci.github.io/easy-survey/assets/css/loader.css",
                "alextimonci.github.io/easy-survey/assets/css/navbar.css",
                "alextimonci.github.io/easy-survey/assets/css/footer.css"
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