init()    
function init() {

    document.getElementById("un").addEventListener("blur", async function(){
        let username = document.getElementById("un").value.trim()
        if(username.length > 1){
            let param = new URLSearchParams({ un: username })
            const request = new Request(api+"check_un_aval?"+param, {
                method: "GET"
            });
            await fetch(request)
            .then(response => response.json())
            .then(data => {
                if(!data.taken){
                    err("un", data.msg)
                } else {
                    d_err("un")
                }
            })
            .catch(error => alert("Server Error, try later"));
        } else {
            err("un", "Username too short")
        }
    })
}