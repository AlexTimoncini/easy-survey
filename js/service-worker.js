self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open("pwa").then(function(cache) {
            return cache.addAll([
                '/easy-survey/assets/css/general.css',
                '/easy-survey/assets/css/navbar.css',
                '/easy-survey/assets/css/loader.css',
                '/easy-survey/assets/css/footer.css',
                '/easy-survey/index.html'
            ])
        })
    )
})

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response
            }
            return fetch(event.request).then(function(networkResponse) {
                return caches.open("pwa").then(function(cache) {
                    cache.put(event.request, networkResponse.clone())
                    return networkResponse
                })
            })
        })
    )
})
