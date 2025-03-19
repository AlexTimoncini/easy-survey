init()
function init() {
    let installEvent = null;
    let installButton = document.getElementById("install")
    document.getElementById("install").style.display = "none"
    if (localStorage["pwa-enabled"]) {
        startPwa();
    } else {
        startPwa(true);
    }
}