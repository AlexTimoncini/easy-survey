init()
function init() {
    document.getElementById("install").style.display = "none"
    if (localStorage["pwa-enabled"]) {
        startPwa();
    } else {
        startPwa(true);
    }
}