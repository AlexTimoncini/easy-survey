init()
async function init() {
    let un = sessionStorage.getItem("username")
    if(un){
        document.getElementById("pic").innerHTML = un[0]+un[un.length-1]
        document.getElementById("un").innerHTML = un
    } else {
        sessionStorage.clear()
        top.location.reload()
    }
}