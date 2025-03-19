//ROUTER
import { Router } from '/easy-survey/js/classes/router.class.js'
const domain = 'https://alextimoncini.github.io/easy-survey'
const api = "https://www.taggx.it/easy_survey_api/"
let router = new Router(domain)
//rotte
router.get('/', function(){
    buildPage('welcome.html',
        [
            'welcome.css'
        ],
        [
            {url: 'welcome.js'}
        ]).then(()=>stopLoading())
})
router.get('/login', function(){
    buildPage('login.html',
        [
            'login.css'
        ],
        [
            {url: 'login.js'}
        ]).then(()=>stopLoading())
})
router.get('/register', function(){
    buildPage('register.html',
        [
            'login.css'
        ],
        [
            {url: 'register.js'}
        ]).then(()=>stopLoading())
})
router.get('/dashboard', function(){
    buildPage('dashboard.html',
        [
            'dashboard.css'
        ],
        [
            {url: 'dashboard.js'}
        ], true).then(()=> {
            validateToken().then(isValid => {
                if (isValid) {
                    stopLoading()
                } else {
                    sessionStorage.clear()
                    top.location.href = `${domain}/#/login`
                }
            })
        })
})
router.get('/surveys', function(){
    buildPage('surveys.html',
        [
            'surveys.css'
        ],
        [
            {url: 'surveys.js'}
        ], true).then(()=> {
            validateToken().then(isValid => {
                if (isValid) {
                    stopLoading()
                } else {
                    sessionStorage.clear()
                    top.location.href = `${domain}/#/login`
                }
            })
        })
})
router.get('/create', function(){
    buildPage('create.html',
        [
            'create.css'
        ],
        [
            {url: 'create.js'}
        ], true).then(()=> {
            validateToken().then(isValid => {
                if (isValid) {
                    stopLoading()
                } else {
                    sessionStorage.clear()
                    top.location.href = `${domain}/#/login`
                }
            })
        })
})
router.get('/profile', function(){
    buildPage('profile.html',
        [
            'profile.css'
        ],
        [
            {url: 'profile.js'}
        ], true).then(()=> {
            validateToken().then(isValid => {
                if (isValid) {
                    stopLoading()
                } else {
                    sessionStorage.clear()
                    top.location.href = `${domain}/#/login`
                }
            })
        })
})

router.start();

async function buildPage(mainHTML, css, scriptList, isAuth=false){
    //RUN
    startLoading()
    removeOldStyles()
    loadCss();
    if (!document.getElementById("loader"))await loader()

    //NO AUTH
    if (!document.getElementById("navbar") && !isAuth)await navbar()
    if (!document.getElementById("footer") && !isAuth)await footer()
    if(!isAuth && document.getElementById("navbar-auth")) document.getElementById("navbar-auth").remove()

    //AUTH
    if(isAuth && document.getElementById("navbar")) document.getElementById("navbar").remove()
    if(isAuth && document.getElementById("footer")) document.getElementById("footer").remove()
    if(isAuth && !document.getElementById("navbar-auth")) await navbarAuth()

    await main()
    await scripts()

    //Functions
    function removeOldStyles() {
        const existingStyles = document.querySelectorAll('link[rel="stylesheet"]:not([data-default=true])');
        existingStyles.forEach(style => style.remove());
    }
    function loadCss(){
        if(css){
            css.forEach((url)=>{
                let link = document.createElement('link');
                link.rel = "stylesheet";
                link.href = "/easy-survey/assets/css/"+url;
                document.head.append(link);
            })
        }
    }
    async function loader() {
        const resp = await fetch("/easy-survey/components/loader.html");
        const html = await resp.text();
        document.getElementById("app").insertAdjacentHTML("beforebegin", html);
    }
    async function navbar() {
        const resp = await fetch("/easy-survey/components/navbar.html");
        const html = await resp.text();
        document.getElementById("app").insertAdjacentHTML("beforebegin", html);
    }
    async function main() {
        const resp = await fetch("/easy-survey/views/"+mainHTML);
        const html = await resp.text();
        document.getElementById("app").innerHTML = ''
        document.getElementById("app").insertAdjacentHTML("afterbegin", html);
    }
    async function footer() {
        const resp = await fetch("/easy-survey/components/footer.html");
        const html = await resp.text();
        document.getElementById("app").insertAdjacentHTML("afterend", html);
    }
    async function navbarAuth() {
        const resp = await fetch("/easy-survey/components/navbar-auth.html");
        const html = await resp.text();
        document.getElementById("app").insertAdjacentHTML("beforebegin", html);
    }

    async function footerAuth() {
        const resp = await fetch("/easy-survey/components/footer-auth.html");
        const html = await resp.text();
        document.getElementById("app").insertAdjacentHTML("afterend", html);
    }
    async function scripts() {
        const existingScripts = document.querySelectorAll('script:not([data-default=true])');
        existingScripts.forEach(spt => spt.remove());
        if (scriptList) {
            for (const scripty of scriptList) {
                await loadScript(scripty)
            }
        }
        
    }
    async function loadScript(scripty) {
        return new Promise((resolve, reject) => {
            let newScript = document.createElement('script')
            newScript.src = "/easy-survey/js/" + scripty.url
            if (scripty.type) newScript.type = scripty.type
            newScript.onload = () => {
                resolve()
            }
            newScript.onerror = (error) => {
                reject(error)
            }
            document.body.append(newScript);
        })
    }
    

}

//loader
function startLoading(){
    disableScroll()
    if (document.getElementById("loader")) {
        document.getElementById("loader").classList.remove("hidden")
    }
}
function stopLoading(){
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
        enableScroll()
    }, 500);
}
function validateToken() {
    const token = sessionStorage.getItem("token");
    if (!token) {
        console.warn("Token vuoto, redirect login")
        return Promise.resolve(false);
    }
    return fetch(`${api}validate`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    })
        .then(res => res.json())
        .then(data => {
            if (data.result === 1) {
                sessionStorage.setItem("token", data.token)
                sessionStorage.setItem("username", data.data.username)
                sessionStorage.setItem("user_id", data.data.id)
                return true;
            } else {
                console.warn("Token scaduto o invalido, effettua nuovamente il login.");
                return false;
            }
        })
        .catch(err => {
            console.error(err)
            alert("Server error, try again later")
            return false;
        });
}
