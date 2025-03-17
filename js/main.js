//parallax
const hasMouse = navigator.maxTouchPoints === 0;
if (hasMouse) {
    document.addEventListener("mousemove", parallax);
} else {
    console.log("Parallax disabled: No mouse detected");
}
function parallax(event) {
    this.querySelectorAll(".parallax").forEach((shift) => {
        const position = shift.dataset.parallax
        const x = (window.innerWidth - event.pageX * position) / 90
        const y = (window.innerHeight - event.pageY * position) / 90
        shift.style.transform = `translateX(${x}px) translateY(${y}px)`
    })
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
    label.classList.add("active")
    document.getElementById(input).classList.add("error")
}
function d_err(input){
    let label = document.getElementById(input+"_err")
    label.classList.remove("active")
    document.getElementById(input).classList.remove("error")

}
/* API SETUP */
const api = "https://www.taggx.it/easy_survey_api/"
const domain = 'https://alextimoncini.github.io/easy-survey'