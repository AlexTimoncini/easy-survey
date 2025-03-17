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
    document.getElementById("pw").addEventListener("blur", async function(){
        let password = document.getElementById("pw").value.trim()
        if(password.length < 8){
            err("pw", "Password too short")
        } else {
            d_err("pw")
        }
    })
    document.getElementById("sign-up-form").addEventListener("submit", function(evt){
        evt.preventDefault()
        if(document.querySelectorAll("#sign-up-form input.error").length > 0){
            return false
        }
        fetch(`${api}register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ un: document.getElementById("un").value.trim(), pw: document.getElementById("pw").value.trim() })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.result) {
                        console.log("Registrazione riuscita, eseguo login...");
                        //todo redirect blah blah
                    } else {
                        alert(data.msg)
                    }
                    return false;
                })
                .catch(err => alert("Server error, try again alter."));

            return false
        })

}