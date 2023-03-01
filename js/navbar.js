/*
ce script gère la navbar et les redirection de menu
    changeTheme()               --> permet de changer de theme
    displayMenu()               --> ouvre et ferme le menu du design telephone
    displayTxtMenu()            --> ouvre et ferme le menu de l'ecran <700px
    loadAciveMenu(file,classBtn)--> permet d'injecter le code html pour changer,afficher les menus
*/
// au chargement
loadAciveMenu('../page/Aceuil.html','firstBtn')
// function displayMenu         --> ouvre et ferme le menu du design telephone
function displayMenu(){
    menu = document.getElementById('menu')
    menu.classList.toggle('active')
}
// function displayTxtMenu()    --> ouvre et ferme le menu de l'ecran <700px
function displayTxtMenu(){
    txtMenu = document.getElementById('txt-menu')
    closePcBtn = document.getElementById('close-pc-btn')
    miniTxtLogo = document.getElementById('mini-txt-logo')
    // function qui verifie si le menu est deja ouvert 
    if (txtMenu.classList[1] == 'active') {
        // executer le code si le menu est deja visible
        miniTxtLogo.classList.toggle('visible')
        setTimeout(() => {
            txtMenu.classList.toggle('active')
            closePcBtn.classList.toggle('active')
        }, "200")
    }else{
        txtMenu.classList.toggle('active')
        closePcBtn.classList.toggle('active')
        setTimeout(() => {
            miniTxtLogo.classList.toggle('visible')
        }, "300")
    }
}
// event listener vérifie si le menu est ouvert pour que quand l'utilisateur clique en dehors de cette div elle se ferme
var profilMenu = document.getElementById('compte-menu')
var btnProfilPick = document.getElementById('profil-pick')
document.addEventListener('click', function (e) {
    // verifier que la div est afficher
    if (profilMenu.classList[1] != undefined) {
        // verifier qu'il a cliqué dans la div ou sur l'image de profilqui ouvre le menu
        if(profilMenu.contains(e.target) || btnProfilPick.contains(e.target)){
            // il a cliquer dans la div
        }else{
            // si il a pas cliqué dans la div alors on ferme le menu
            profilMenu.classList.remove('visible')
        }
    }
});
// function displayProfilMenu() --> permet d'afficher le menu quand tu clique sur la photo de profil
function displayProfilMenu(){
    setTimeout(() => {
        profilMenu.classList.toggle('visible')
    }, "100") 
}
// function loadAciveMenu()     --> permet d'injecter le code html pour changer,afficher les menus
function loadAciveMenu(file,classBtn){
    mainContainer = document.getElementById('main-container')
    AllLeftNavBtn = document.getElementsByClassName('left-btn')
    leftNavBtn = document.getElementsByClassName(classBtn)
    fetch(file)
    .then(res=>res.text())
    .then(data=>{
        mainContainer.innerHTML = data
    })
    for (let i = 0; i < AllLeftNavBtn.length; i++) {
        AllLeftNavBtn[i].classList.remove('active')
    }
    for (let i = 0; i < leftNavBtn.length; i++) {
        leftNavBtn[i].classList.add('active')
    }
    // executé les function lier au menu
    switch (file) {
        case '../page/Aceuil.html':
            setTimeout(() => {
                loadData()
            }, "100") 
            break;
        case '../page/Liste.html':
                setTimeout(() => {
                    showList()
                }, "100") 
                break;
        case '../page/Recherche.html':
                setTimeout(() => {
                    search()
                }, "100") 
                break;
        default:
            break;
    }
}
// invert(0%) sepia(80%) saturate(5228%) hue-rotate(123deg) brightness(103%) contrast(99%)
// function changetheme()       --> permet de changer de theme
count = 0
function changeTheme(){
    if (count == 0) {
        // theme blanc
        count = 1
        document.getElementById('logo-phone').src = './img/logoPourBgW.svg'

        document.documentElement.style.setProperty('--bg-u', `#FFFFFF`)
        document.documentElement.style.setProperty('--bg-d', `#d0d0d0`)
        document.documentElement.style.setProperty('--bg-t', `#bebebe`)

        document.documentElement.style.setProperty('--font-u', `#161616`)
        document.documentElement.style.setProperty('--font-d', `#96979C`)
        document.documentElement.style.setProperty('--font-t', `#454545`)
        
        document.documentElement.style.setProperty('--font-t', `#CBC7FF`)

        document.documentElement.style.setProperty('--filter', `invert(0%) sepia(80%) saturate(5228%) hue-rotate(123deg) brightness(103%) contrast(99%)`)
    }else{
        // theme sombre
        count = 0
        document.getElementById('logo-phone').src = './img/logoPourBgB.svg'

        document.documentElement.style.setProperty('--bg-u', `#161616`)
        document.documentElement.style.setProperty('--bg-d', `#1F1F1F`)
        document.documentElement.style.setProperty('--bg-t', `#232323`)

        document.documentElement.style.setProperty('--font-u', `#ECEBFF`)
        document.documentElement.style.setProperty('--font-d', `#899098`)
        document.documentElement.style.setProperty('--font-t', `#454545`)
        
        document.documentElement.style.setProperty('--font-t', `#331F1F`)

        document.documentElement.style.setProperty('--filter', `invert(100%) sepia(100%) saturate(0%) hue-rotate(66deg) brightness(102%) contrast(101%)`)
    }
}
