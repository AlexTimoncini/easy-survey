init()
function init() {
    if (localStorage.getItem("pwa-enabled")) {
        startPwa()
    } else {
        startPwa(true)
    }
}