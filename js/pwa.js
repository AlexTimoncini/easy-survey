let installEvent = null
let installButton = document.getElementById("install")
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
                console.log("Success Service Worker registration", registration)
            })
            .catch(err => {
                console.error("Fail Service Worker registration:", err)
            })
    })
    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault()
        console.log("Ready to install")
        installEvent = e
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
                console.warn("Cache error:", err)
            })
        })
    }
    if (installButton) {
        installButton.addEventListener("click", function() {
            if (installEvent) {
                installEvent.prompt()
                installEvent.userChoice.then(choiceResult => {
                    if (choiceResult.outcome === "accepted") {
                        console.log("PWA installed")
                        installButton.style.display = "none"
                    } else {
                        console.log("PWA rejected")
                    }
                })
            } else {
                alert("PWAs automatic installer is not supported on this device, please install it manually from browser menu.")
            }
        })
    }
}
