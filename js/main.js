//parallax
const hasMouse = navigator.maxTouchPoints === 0;
if (hasMouse) {
    document.addEventListener("mousemove", parallax);
} else {
    console.log("Parallax disabled: No mouse detected");
}
function parallax(event) {
    if(document.querySelector(".parallax")){
        this.querySelectorAll(".parallax").forEach((shift) => {
            const position = shift.dataset.parallax
            const x = (window.innerWidth - event.pageX * position) / 90
            const y = (window.innerHeight - event.pageY * position) / 90
            shift.style.transform = `translateX(${x}px) translateY(${y}px)`
        })
    }
}
window.addEventListener('scroll', fadeIn );
function fadeIn() {
    let elementsArray = document.querySelectorAll(".scroll-fade-in");
    for (let i = 0; i < elementsArray.length; i++) {
        let elem = elementsArray[i]
        let distInView = elem.getBoundingClientRect().top - window.innerHeight + 40;
        if (distInView < 0) {
            elem.classList.add("visible");
        } else {
            elem.classList.remove("visible");
        }
    }
}
/* ASSIGN FORM ERROR */
function err(input, error){
    let label = document.getElementById(input+"_err")
    label.innerText = error
    if(label && !label.classList.contains("active")){
        label.classList.add("active")
        document.getElementById(input).classList.add("error")
    }
}
function d_err(input){
    let label = document.getElementById(input+"_err")
    if(label && label.classList.contains("active")){
        label.classList.remove("active")
    }
    let inputEl = document.getElementById(input)
    if(inputEl && inputEl.classList.contains("active")){
        inputEl.classList.remove("active")
    }
}
/* API SETUP */
const api = "https://www.taggx.it/easy_survey_api/"
const domain = 'https://alextimoncini.github.io/easy-survey'