function alert(msg, title="", cancelBtn=false, callback=false, cancelCallback=false, okText=false, cancelText=false, callBackTimer=false) {
    closeAlertGX()
    let html = `
        <div class="alert">
            <div class="alert-dialog-mask"></div>
            <div class="alert-dialog">
                <div class="alert-dialog-container">
                    ${title ? '<div class="alert-dialog-title">'+title+'</div>' : ''}
                    <div class="alert-dialog-content">${msg}</div>
                    <div class="alert-dialog-footer">
                        ${cancelBtn ? '<button id="cancelAlert" class="alert-dialog-button">'+(cancelText ? cancelText : "BACK")+'</button>' : ""}
                        <button id="confirmAlert" class="alert-dialog-button alert-dialog-button--primal">${okText ? okText : "OK"}</button>
                    </div>
                </div>
            </div>
        </div>
    `
    document.querySelector(".app-container").insertAdjacentHTML("beforeend", html)
    if(callBackTimer){
        document.getElementById("confirmAlert").style.setProperty("--duration", (callBackTimer / 1000).toFixed(0)+"s")
        document.getElementById("confirmAlert").classList.add("timer")
        let timeoutId = setTimeout(()=>{
            closeAlertGX()
            if(typeof callback == "function") {
                callback()
            }
        }, callBackTimer)
        localStorage.setItem("timeoutId", timeoutId);
    }
    if(cancelBtn){
        document.getElementById("cancelAlert").addEventListener("click", function(){
            closeAlertGX()
            if(typeof cancelCallback == "function") {
                cancelCallback()
            }
        })
    }
    document.getElementById("confirmAlert").addEventListener("click", function(){
        closeAlertGX()
        if(typeof callback == "function") {
            callback()
        }
    })
}
function closeAlertGX(){
    clearTimeout(localStorage.getItem("timeoutId"))
    document.querySelectorAll(".alert").forEach( alert => {
        alert.remove()
    })
}
