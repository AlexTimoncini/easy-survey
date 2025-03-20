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
    fetch(`${api}surveys`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${sessionStorage.getItem("token")}` }
    })
        .then(res => res.json())
        .then(data => {
            if (data.result) {
                document.getElementById("surveys").innerHTML = ""
                if(data.surveys.length){
                    data.surveys.forEach(s=>{
                        let li = `
                            <div class="survey-card">
                                <div class="card-image"><img src="/easy-survey/assets/images/uploads/${data.user.id}/${s.image}" alt="${s.title}"></div>
                                <h2>${s.title}</h2>
                            </div>
                        `
                        document.getElementById("surveys").insertAdjacentHTML('beforeend', li)
                    })
                } else {
                    document.getElementById("surveys").innerHTML = "<h2>No surveys created.</h2>"
                }
            } else {
                alert("Server error, try again alter.")
            }
            return false;
        })
        .catch(err => alert("Server error, try again alter."));
}