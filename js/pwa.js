let installEvent = null;
let installButton = document.getElementById("install");
if (localStorage["pwa-enabled"]) {
    startPwa();
} else {
    startPwa(true);
}
function startPwa(firstStart) {
    localStorage["pwa-enabled"] = true;

    if (firstStart) {
        location.reload();
    }

    window.addEventListener("load", () => {
        navigator.serviceWorker.register("../service-worker.js")
            .then(registration => {
                console.log("Service Worker is registered", registration);
                /*if (enableButton) {
                    enableButton.remove();
                }*/
            })
            .catch(err => {
                console.error("Registration failed:", err);
            });
    });

    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        console.log("Ready to install...");
        installEvent = e;
        document.getElementById("install").style.display = "initial";
    });

    setTimeout(cacheAll, 500);

    function cacheAll() {
        caches.open("pwa").then(function(cache) {
            let linksFound = [];
            document.querySelectorAll("a").forEach(function(el) {
                linksFound.push(el.href);
            });
            cache.addAll(linksFound);
            let jsFound = [];
            document.querySelectorAll("script").forEach(function(el) {
                linksFound.push(el.src);
            });
            cache.addAll(jsFound);
            let cssFound = [];
            document.querySelectorAll("link[rel='stylesheet']").forEach(function(el) {
                linksFound.push(el.href);
            });
            cache.addAll(cssFound);
            let imgFound = [];
            document.querySelectorAll("img").forEach(function(el) {
                linksFound.push(el.src);
            });
            cache.addAll(imgFound);
        });
    }

    if (installButton) {
        installButton.addEventListener("click", function() {
            if (installEvent) {
                installEvent.prompt();
            } else {
                vex.dialog.alert("non è possibile installare l'applicazione");
            }
        });
    }
}
