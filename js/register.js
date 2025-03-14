init()    
function init() {

    document.getElementById("un").addEventListener("blur", async function(){
        let username = document.getElementById("un").value.trim()
        if(username.length > 1){
            let param = new URLSearchParams({ un: username })
            const request = new Request(api+"check_un_aval?"+param, {
                method: "GET"
            });
            const response2 = await fetch(request);
            console.log(response2.status);
        } else {
            //active errore minlength
        }
    })
}