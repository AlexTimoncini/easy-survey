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
    fetch(`${api}stats`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${sessionStorage.getItem("token")}` }
    })
        .then(res => res.json())
        .then(data => {
            if (data.result) {
                document.querySelector("#s_all_time .stat-counter").innerText = data.data.s_all_time
                document.querySelector("#s_ongoing .stat-counter").innerText = data.data.s_ongoing
            } else {
                alert("Server error, try again alter.")
            }
            return false;
        })
        .catch(err => alert("Server error, try again alter."));

}