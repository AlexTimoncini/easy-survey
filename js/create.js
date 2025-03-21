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
    document.getElementById("hero").change(function() {
        document.getElementById("hero").simpleUpload("/include/simpleUploader.php", {
            maxFileSize: 5242880,
            start: function(file) {
                document.querySelector("#progress").html("")
                document.querySelector("#progressBar").width(0)
            },
            progress: function(progress) {
                document.querySelector("#progressBar").width(progress + "%")
            },
            success: function(data) {
                console.log("initFileInput", data)
                document.querySelector("input[name=\'disegno\']").val(data.name).valid()
            },
            error: function(error){
                document.querySelector("#progress").html("Errore!<br>" + error)
            }
        })
    })
}