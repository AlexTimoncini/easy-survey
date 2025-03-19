let installEvent = null
let installButton = document.getElementById("install")
if (installButton) {
    installButton.style.display = "none"
}
if (localStorage.getItem("pwa-enabled")) {
    startPwa()
} else {
    startPwa(true)
}
function startPwa(firstStart) {
    localStorage.setItem("pwa-enabled", "true")
    if (firstStart) {
        location.reload()
    }
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/easy-survey/service-worker.js")
            .then(registration => {
                console.log("Service Worker registrato con successo", registration)
            })
            .catch(err => {
                console.error("Registrazione del Service Worker fallita:", err)
            })
    })
    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault()
        console.log("Pronto per l'installazione...")
        installEvent = e

        if (installButton) {
            installButton.style.display = "block"
        }
    })
    setTimeout(cacheAll, 500)
    function cacheAll() {
        caches.open("pwa").then(function(cache) {
            let linksFound = []
            document.querySelectorAll("a").forEach(el => {
                if (el.href.startsWith(location.origin)) linksFound.push(el.href)
            })
            let jsFound = []
            document.querySelectorAll("script").forEach(el => {
                if (el.src) jsFound.push(el.src)
            })
            let cssFound = []
            document.querySelectorAll("link[rel='stylesheet']").forEach(el => {
                if (el.href) cssFound.push(el.href)
            })
            let imgFound = []
            document.querySelectorAll("img").forEach(el => {
                if (el.src) imgFound.push(el.src)
            })
            cache.addAll([...linksFound, ...jsFound, ...cssFound, ...imgFound]).catch(err => {
                console.warn("Errore durante la cache:", err)
            })
        })
    }
    if (installButton) {
        installButton.addEventListener("click", function() {
            if (installEvent) {
                installEvent.prompt()
                installEvent.userChoice.then(choiceResult => {
                    if (choiceResult.outcome === "accepted") {
                        console.log("L'utente ha installato la PWA.")
                        installButton.style.display = "none"
                    } else {
                        console.log("L'utente ha rifiutato l'installazione.")
                    }
                })
            } else {
                alert("L'installazione automatica della PWA non è supportata su questo dispositivo. Installala manualmente dal menu del browser.")
            }
        })
    }
}
