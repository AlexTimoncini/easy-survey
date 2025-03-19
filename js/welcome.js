init()
function init() {
    if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone) {
        document.getElementById("download").addEventListener("click", ()=>{
            document.getElementById("install").click()
        })
    } else {
        document.getElementById("download").remove()
    }
}