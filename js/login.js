init()
function init() {

    document.getElementById("un").addEventListener("blur", async function(){
        let username = document.getElementById("un").value.trim()
        if(username.length < 2 || username.length > 20){
            err("un", "Invalid username")
        } else {
            d_err("un")
        }
    })
    document.getElementById("pw").addEventListener("blur", async function(){
        let password = document.getElementById("pw").value.trim()
        if(!password || password.length > 20){
            err("pw", "Invalid password")
        } else {
            d_err("pw")
        }
    })
    document.getElementById("login-form").addEventListener("submit", function(evt){
        evt.preventDefault()
        if(document.querySelectorAll("#login input.error").length > 0){
            return false
        }
        fetch(`${api}auth`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ un: document.getElementById("un").value.trim(), pw: document.getElementById("pw").value.trim() })
        })
            .then(res => res.json())
            .then(data => {
                if (data.result) {
                    sessionStorage.setItem("token", data.token)
                    sessionStorage.setItem("username", data.data.username)
                    sessionStorage.setItem("user_id", data.data.id)
                    top.location.href = `${domain}/#/dashboard`
                } else {
                    alert(data.msg)
                }
                return false;
            })
            .catch(err => alert("Server error, try again alter."));

        return false
    })

}