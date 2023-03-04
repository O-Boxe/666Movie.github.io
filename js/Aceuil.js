/*
ce script gère le menu Aceuil
    goTo()              --> permet d'avancer de 400px grace au bouton fleche de droite te de gauche
    save()              --> permet d'enregistrer le film
    loadData()          --> permet d'appeler les fonctions qui génère le code de toute la page
    loadDataTop(),
    loadDataLatest(),
    loadDataPopular()  --> ces 3 command sont presque les memes, la seule différence c'est l'url de la requête et la div dans laquelle il vont innerHtml
*/

// si le local storage est vide il faut le remplir 
if (localStorage.getItem("enregistrement") == null) {
    localStorage.setItem("enregistrement", '')
}

// goTo()               --> permet d'avancer de 400px grace au bouton fleche de droite te de gauche
function goTo(direction,id){
    var div = document.getElementsByClassName('flyers-film')
    var position = div[id].scrollLeft
    if (direction == 'right'){
        div[id].scrollTo({
            left: position + div[id].offsetWidth,
            behavior: 'smooth',
        })
    }else{
        div[id].scrollTo({
            left: position - div[id].offsetWidth,
            behavior: 'smooth',
        })
    }
}
function save(id,reload = false){
    film = localStorage.getItem("enregistrement").split(';')
    // vérifier si le film est deja enregistrer
    if (film.includes(`${id}`)) {
        // suprimmer de l'array l'id deja existant
        elementSuprim = film.splice(film.indexOf(`${id}`), 1)
        // save l'array en remplacant les ',' avec des ';'
        localStorage.setItem("enregistrement", film.join(';'))
    }else{
        localItem = localStorage.getItem("enregistrement")
        // vérifier si le localstorage est vide, si oui il ne faut pas mettre de ';' devant le premier nombre 
        if (localItem == '') {
            localStorage.setItem("enregistrement", `${id}`)
        }else{
            localStorage.setItem("enregistrement", `${localItem};${id}`)
        }
    }
    if (reload == true) {
        loadAciveMenu('../page/Liste.html','thirdBtn')
    }
    saveBtn = document.getElementById(`saveBtn${id}`)
    saveBtn.classList.toggle('saved')
}
// loadData()           --> permet d'appeler les fonctions qui génère le code de toute la page
async function loadData(){
    loadDataMovies('popular', 'tendance')
    loadDataMovies('top_rated', 'top-section')
    loadDataHeader()
    // changer l'etat du film kung fu panda si il est enregistrer
     if (localStorage.getItem("enregistrement").split(';').includes('9502')) {
        document.getElementById('saveBtn9502').classList.add('saved')
    }
}

// loadDataMovies()        --> permet de générer le code de la section souhaiter grace a deux param de foonction(type = type de film,section,l'id du container de la section)
async function loadDataMovies(type, section){
    var responseApi = await fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=10e786dc9a35f5eadcac1dd044301973&language=fr`);
    var data = await responseApi.json();
    for (let i = 0; i < data.results.length; i++) {
        var genre = ''
        var genre2 = ''
        var genre3 = ''
        var genres = {28: 'Action', 12: 'Aventure', 16: 'Animation', 35: 'Comédie' , 80: 'Crime', 99: 'Documentaire', 18: 'Drama', 10751: 'Famille', 14: 'Fantaisie', 36: 'Histoire', 27: 'Horreur', 10402: 'Musique', 9648: 'Mistère', 10749: 'Romance',878: 'Science Fiction', 10770: 'TV Movie', 53: 'Thriller', 10752: 'Guerre', 37: 'Western'}; //etc
        
        // récuperer l'id des genres et les transformer en string
        if (data.results[i].genre_ids[0] != undefined){
            var genre = genres[data.results[i].genre_ids[0]];
        }
        // si il y a un premier genre on vérifie qu'il y en ai un deuxième
        if (data.results[i].genre_ids[1] != undefined) {
            var genre2 = " • " + genres[data.results[i].genre_ids[1]];
        }
        // si il y a un deuxieme genre on vérifie qu'il y en ai un troisieme
        if (data.results[i].genre_ids[2] != undefined) {
            var genre3 = " • " + genres[data.results[i].genre_ids[2]];
        }
        // assembler le genres
        if (genre == '') {
            txtGenre = 'pad de genre disponible'
        } else if (genre2 == '') {
            txtGenre = genre
        }else if (genre3 == '') {
            txtGenre = genre + genre2 
        }else if (genre3 != ''){
            txtGenre = genre + genre2 + genre3
        }
        // verifier si il est enregistrer , si oui l'icon doit etre active
        if (localStorage.getItem("enregistrement").split(';').includes(`${data.results[i].id}`)) {
             var saved = 'saved'
        }else{
             var saved = ''
        }
        // aller chercher les images 
        var responseApiForImage = await fetch(`https://api.themoviedb.org/3/movie/${data.results[i].id}?api_key=10e786dc9a35f5eadcac1dd044301973`);
        var dataImage = await responseApiForImage .json();
        //background: linear-gradient(to top,rgb(0, 0, 0) ,rgba(0, 0, 0, 0.123));
        imageLink = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${dataImage.backdrop_path}`
        // construire le flyers
        flyers =   `<div class="flyer" style="background:linear-gradient(to top,rgb(0, 0, 0) ,rgba(0, 0, 0, 0.123)),url(${imageLink});">
                        <svg id="saveBtn${data.results[i].id}" class="save ${saved}" onclick="save(${data.results[i].id})" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.57425 24.6458C3.18425 24.6458 2.80508 24.5483 2.48008 24.3533C1.75424 23.9308 1.34259 23.0858 1.34259 22.035V9.72835C1.34259 7.42085 3.21674 5.54666 5.52424 5.54666H13.9526C16.2601 5.54666 18.1343 7.42085 18.1343 9.72835V22.035C18.1343 23.0858 17.7226 23.92 16.9968 24.3533C16.2709 24.7758 15.3393 24.7325 14.4184 24.2233L10.1609 21.8508C9.95511 21.7317 9.52174 21.7317 9.31591 21.8508L5.05842 24.2233C4.56008 24.505 4.05092 24.6458 3.57425 24.6458ZM5.53508 7.18251C4.12675 7.18251 2.97843 8.33082 2.97843 9.73916V22.0458C2.97843 22.49 3.10843 22.8367 3.31426 22.9558C3.5201 23.075 3.88845 23.0208 4.27845 22.8042L8.53594 20.4317C9.22927 20.0525 10.2693 20.0525 10.9626 20.4317L15.2201 22.8042C15.6101 23.0208 15.9676 23.075 16.1843 22.9558C16.3901 22.8367 16.5201 22.49 16.5201 22.0458V9.73916C16.5201 8.33082 15.3718 7.18251 13.9634 7.18251H5.53508Z" fill="#899098"/>
                            <path d="M15.9132 24.6458C15.4365 24.6458 14.9382 24.505 14.4291 24.2342L10.1716 21.8617C9.96573 21.7533 9.52152 21.7533 9.31568 21.8617L5.06904 24.2342C4.1482 24.7433 3.2057 24.7867 2.4907 24.3642C1.76486 23.9417 1.35321 23.0967 1.35321 22.0567V9.75001C1.35321 7.44251 3.22736 5.56836 5.53486 5.56836H13.9632C16.2707 5.56836 18.1449 7.44251 18.1449 9.75001V22.0567C18.1449 23.0967 17.7332 23.9417 17.0074 24.3642C16.6824 24.5483 16.314 24.6458 15.9132 24.6458ZM9.74904 20.15C10.1824 20.15 10.6049 20.2475 10.9624 20.4425L15.2199 22.815C15.6099 23.0317 15.9782 23.0858 16.184 22.9558C16.3899 22.8367 16.5199 22.49 16.5199 22.0459V9.73917C16.5199 8.33083 15.3716 7.18252 13.9632 7.18252H5.53486C4.12653 7.18252 2.97821 8.33083 2.97821 9.73917V22.0459C2.97821 22.49 3.10821 22.8367 3.31404 22.9558C3.51987 23.075 3.88822 23.0208 4.27822 22.8042L8.53572 20.4317C8.88238 20.2475 9.31571 20.15 9.74904 20.15Z" fill="#899098"/>
                            <path d="M22.4132 20.4425C21.9365 20.4425 21.4382 20.3017 20.9291 20.0308L16.9315 17.7992C16.6715 17.6583 16.5199 17.3875 16.5199 17.095V9.75001C16.5199 8.34168 15.3716 7.19336 13.9632 7.19336H8.66571C8.22154 7.19336 7.85321 6.82503 7.85321 6.38086V5.54667C7.85321 3.23917 9.72736 1.36502 12.0349 1.36502H20.4632C22.7707 1.36502 24.6449 3.23917 24.6449 5.54667V17.8534C24.6449 18.8934 24.2332 19.7383 23.5074 20.1608C23.1824 20.345 22.814 20.4425 22.4132 20.4425ZM18.1449 16.6075L21.7199 18.6117C22.1099 18.8283 22.4674 18.8825 22.684 18.7525C22.9007 18.6225 23.0199 18.2867 23.0199 17.8425V5.53583C23.0199 4.12749 21.8716 2.97918 20.4632 2.97918H12.0349C10.6265 2.97918 9.47821 4.12749 9.47821 5.53583V5.55752H13.9632C16.2707 5.55752 18.1449 7.43167 18.1449 9.73917V16.6075V16.6075Z" fill="#899098"/>
                        </svg>
                        <h3>${data.results[i].title}</h3>
                        <h5>${txtGenre}</h5>
                        <div class="eval"><img src="./img/star.svg" alt="évaluation"><h5>${data.results[i].vote_average / 2}</h5></div>
                    </div>`
        var topSection = document.getElementById(section)
        topSection.innerHTML += flyers
    }
}
// loadDataHeader()     --> permet de générer le code de l'Affiche + les film qui lui ressemble à l'aide de l'api THE MOVIE DATABASE
async function loadDataHeader(){
    var responseApiForHeader = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=10e786dc9a35f5eadcac1dd044301973&language=fr`);
    var data = await responseApiForHeader.json();
    var genre = ''
    var genre2 = ''
    var genre3 = ''
    i = Math.floor(Math.random() * 19)
    // récuperer l'id des genres et les transformer en string
    var genres = {28: 'Action', 12: 'Aventure', 16: 'Animation', 35: 'Comédie' , 80: 'Crime', 99: 'Documentaire', 18: 'Drama', 10751: 'Famille', 14: 'Fantaisie', 36: 'Histoire', 27: 'Horreur', 10402: 'Musique', 9648: 'Mistère', 10749: 'Romance',878: 'Science Fiction', 10770: 'TV Movie', 53: 'Thriller', 10752: 'Guerre', 37: 'Western'}; //etc
        
    // récuperer l'id des genres et les transformer en string
    if (data.results[i].genre_ids[0] != undefined){
        var genre = genres[data.results[i].genre_ids[0]];
    }
    // si il y a un premier genre on vérifie qu'il y en ai un deuxième
    if (data.results[i].genre_ids[1] != undefined) {
        var genre2 = " • " + genres[data.results[i].genre_ids[1]];
    }
    // si il y a un deuxieme genre on vérifie qu'il y en ai un troisieme
    if (data.results[i].genre_ids[2] != undefined) {
        var genre3 = " • " + genres[data.results[i].genre_ids[2]];
    }
    // assembler le genres
    if (genre == '') {
        txtGenre = 'pad de genre disponible'
    } else if (genre2 == '') {
        txtGenre = genre
    }else if (genre3 == '') {
        txtGenre = genre + genre2 
    }else if (genre3 != ''){
        txtGenre = genre + genre2 + genre3
    }
    // verifier si il est enregistrer , si oui l'icon doit etre active
    if (localStorage.getItem("enregistrement").split(';').includes(`${data.results[i].id}`)) {
        var saved = 'saved'
   }else{
        var saved = ''
   }
    // aller chercher les images 
    var responseApiForImage = await fetch(`https://api.themoviedb.org/3/movie/${data.results[i].id}/images?api_key=10e786dc9a35f5eadcac1dd044301973`);
    var dataImage = await responseApiForImage .json();
    imageLink = `https://www.themoviedb.org/t/p/original${dataImage.backdrops[0].file_path}`
    // aller chercher les details
    var responseApiForDetails = await fetch(`https://api.themoviedb.org/3/movie/${data.results[i].id}?api_key=10e786dc9a35f5eadcac1dd044301973`);
    var dataDetails = await responseApiForDetails .json();
    console.log(dataDetails)
    // construire le flyers
    flyers = ``
    flyers = `<!-- insertion html  ici -->
        <div id="affiche" class="affiche" style="background: linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0.12)), url(&quot;https://www.themoviedb.org/t/p/original/zGoZB4CboMzY1z4G3nU6BWnMDB2.jpg&quot;);">
                <div class="etiquettes-line">
                <h5 id="date" class="etiquette">${data.results[i].vote_average / 2}</h5>
                </div>
                <div class="main-block-text">
                    <h2>${data.results[i].title}</h2>
                    <h5 id="genre">${txtGenre}</h5>
                    <h4 id="description" class="description">${data.results[i].overview}</h4>
                    <div id="btn-affiche" class="btn-affiche">
                        <button>regarder maintenant <img src="./img/play.svg" alt="play"></button>
                        <button id="saveBtn${data.results[i].id}" class="${saved}" onclick="save(${data.results[i].id})">
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.19337 15.3231C2.95337 15.3231 2.72003 15.2631 2.52003 15.1431C2.07336 14.8831 1.82004 14.3631 1.82004 13.7164V6.14311C1.82004 4.72311 2.97336 3.56976 4.39336 3.56976H9.58005C11 3.56976 12.1534 4.72311 12.1534 6.14311V13.7164C12.1534 14.3631 11.9 14.8764 11.4534 15.1431C11.0067 15.4031 10.4334 15.3764 9.86671 15.0631L7.24671 13.6031C7.12005 13.5298 6.85336 13.5298 6.72669 13.6031L4.1067 15.0631C3.80003 15.2364 3.4867 15.3231 3.19337 15.3231ZM4.40003 4.57644C3.53337 4.57644 2.82671 5.28309 2.82671 6.14976V13.7231C2.82671 13.9964 2.90671 14.2098 3.03338 14.2831C3.16004 14.3564 3.38672 14.3231 3.62672 14.1898L6.24671 12.7298C6.67338 12.4964 7.31337 12.4964 7.74004 12.7298L10.36 14.1898C10.6 14.3231 10.82 14.3564 10.9534 14.2831C11.08 14.2098 11.16 13.9964 11.16 13.7231V6.14976C11.16 5.28309 10.4534 4.57644 9.58672 4.57644H4.40003Z" fill="#CC3232"/>
                            <path d="M10.7866 15.3231C10.4932 15.3231 10.1866 15.2364 9.87324 15.0698L7.25324 13.6098C7.12658 13.5431 6.85322 13.5431 6.72655 13.6098L4.11323 15.0698C3.54656 15.3831 2.96656 15.4098 2.52656 15.1498C2.07989 14.8898 1.82657 14.3698 1.82657 13.7298V6.15644C1.82657 4.73644 2.97989 3.58311 4.39989 3.58311H9.58658C11.0066 3.58311 12.1599 4.73644 12.1599 6.15644V13.7298C12.1599 14.3698 11.9066 14.8898 11.4599 15.1498C11.2599 15.2631 11.0332 15.3231 10.7866 15.3231ZM6.99324 12.5564C7.2599 12.5564 7.5199 12.6164 7.7399 12.7364L10.3599 14.1964C10.5999 14.3298 10.8266 14.3631 10.9532 14.2831C11.0799 14.2098 11.1599 13.9964 11.1599 13.7231V6.14976C11.1599 5.2831 10.4532 4.57644 9.58658 4.57644H4.39989C3.53323 4.57644 2.82657 5.2831 2.82657 6.14976V13.7231C2.82657 13.9964 2.90657 14.2098 3.03323 14.2831C3.1599 14.3564 3.38658 14.3231 3.62658 14.1898L6.24657 12.7298C6.45991 12.6164 6.72657 12.5564 6.99324 12.5564Z" fill="#CC3232"/>
                            <path d="M14.7866 12.7364C14.4932 12.7364 14.1866 12.6498 13.8732 12.4831L11.4132 11.1098C11.2532 11.0231 11.1599 10.8564 11.1599 10.6764V6.15644C11.1599 5.28977 10.4532 4.58311 9.58658 4.58311H6.32657C6.05324 4.58311 5.82657 4.35645 5.82657 4.08311V3.56977C5.82657 2.14977 6.97989 0.996445 8.39989 0.996445H13.5866C15.0066 0.996445 16.1599 2.14977 16.1599 3.56977V11.1431C16.1599 11.7831 15.9066 12.3031 15.4599 12.5631C15.2599 12.6764 15.0332 12.7364 14.7866 12.7364ZM12.1599 10.3764L14.3599 11.6098C14.5999 11.7431 14.8199 11.7764 14.9532 11.6964C15.0866 11.6164 15.1599 11.4098 15.1599 11.1364V3.5631C15.1599 2.69643 14.4532 1.98977 13.5866 1.98977H8.39989C7.53323 1.98977 6.82657 2.69643 6.82657 3.5631V3.57644H9.58658C11.0066 3.57644 12.1599 4.72976 12.1599 6.14977V10.3764Z" fill="#CC3232"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <img class="share" src="./img/share.svg" alt="partager"></img>
            </div>
            <!-- sim -->
            <div id="similaire" class="similaire">
                <div class="top-container">
                    <h2 class="title-section">Similaire à ${data.results[i].title}</h2>
                    <button class="top-section-btn" onclick="goTo('left',0)"><img src="../img/Vector.svg" alt="" srcset=""></button>    
                    <button class="top-section-btn" onclick="goTo('right',0)"><img src="../img/Vector.svg" alt="" srcset=""></button>  
                <div id="similaire-section" class="flyers-film"> 
                    <!-- flyers zone -->
                    
                    <!-- flyers -->
                </div>
            </div> 
        </div>
        <!-- end sim -->`
        var topSection = document.getElementById('affiche-zone')
        topSection.innerHTML = flyers
        document.getElementById('affiche').style = `background:linear-gradient(to top,rgb(0, 0, 0) ,rgba(0, 0, 0, 0.123)), url(${imageLink});`
        // inmjecter les films similaire
        // aller chercher les films similaires
        var responseApiForSim = await fetch(`https://api.themoviedb.org/3/movie/${data.results[i].id}/similar?api_key=10e786dc9a35f5eadcac1dd044301973`);
        var dataSim = await responseApiForSim .json();
        for (let i = 0; i < dataSim.results.length; i++) {
            var genre = ''
            var genre2 = ''
            var genre3 = ''
            var genres = {28: 'Action', 12: 'Aventure', 16: 'Animation', 35: 'Comédie' , 80: 'Crime', 99: 'Documentaire', 18: 'Drama', 10751: 'Famille', 14: 'Fantaisie', 36: 'Histoire', 27: 'Horreur', 10402: 'Musique', 9648: 'Mistère', 10749: 'Romance',878: 'Science Fiction', 10770: 'TV Movie', 53: 'Thriller', 10752: 'Guerre', 37: 'Western'}; //etc
        
        // récuperer l'id des genres et les transformer en string
        if (data.results[i].genre_ids[0] != undefined){
            var genre = genres[data.results[i].genre_ids[0]];
        }
        // si il y a un premier genre on vérifie qu'il y en ai un deuxième
        if (data.results[i].genre_ids[1] != undefined) {
            var genre2 = " • " + genres[data.results[i].genre_ids[1]];
        }
        // si il y a un deuxieme genre on vérifie qu'il y en ai un troisieme
        if (data.results[i].genre_ids[2] != undefined) {
            var genre3 = " • " + genres[data.results[i].genre_ids[2]];
        }
        // assembler le genres
            if (genre == '') {
                txtGenre = 'pad de genre disponible'
            } else if (genre2 == '') {
                txtGenre = genre
            }else if (genre3 == '') {
                txtGenre = genre + genre2 
            }else if (genre3 != ''){
                txtGenre = genre + genre2 + genre3
            }
            // verifier si il est enregistrer , si oui l'icon doit etre active
        if (localStorage.getItem("enregistrement").split(';').includes(`${dataSim.results[i].id}`)) {
            var saved = 'saved'
       }else{
            var saved = ''
       }
            // aller chercher les images 
            var responseApiForImage = await fetch(`https://api.themoviedb.org/3/movie/${dataSim.results[i].id}?api_key=10e786dc9a35f5eadcac1dd044301973`);
            var dataSimImage = await responseApiForImage .json();
            //créer le lien de l'image
            if (dataSimImage.backdrop_path == null) {
                imageLink = `../img/imgNotFound.svg`
            }else{
                imageLink = `https://www.themoviedb.org/t/p/original${dataSimImage.backdrop_path}`
            }
            // construire le flyers
            flyers =   `<div class="flyer" style="background:linear-gradient(to top,rgb(0, 0, 0) ,rgba(0, 0, 0, 0.123)),url(${imageLink});">
                            <svg id="saveBtn${dataSim.results[i].id}" class="save ${saved}" onclick="save(${dataSim.results[i].id})" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.57425 24.6458C3.18425 24.6458 2.80508 24.5483 2.48008 24.3533C1.75424 23.9308 1.34259 23.0858 1.34259 22.035V9.72835C1.34259 7.42085 3.21674 5.54666 5.52424 5.54666H13.9526C16.2601 5.54666 18.1343 7.42085 18.1343 9.72835V22.035C18.1343 23.0858 17.7226 23.92 16.9968 24.3533C16.2709 24.7758 15.3393 24.7325 14.4184 24.2233L10.1609 21.8508C9.95511 21.7317 9.52174 21.7317 9.31591 21.8508L5.05842 24.2233C4.56008 24.505 4.05092 24.6458 3.57425 24.6458ZM5.53508 7.18251C4.12675 7.18251 2.97843 8.33082 2.97843 9.73916V22.0458C2.97843 22.49 3.10843 22.8367 3.31426 22.9558C3.5201 23.075 3.88845 23.0208 4.27845 22.8042L8.53594 20.4317C9.22927 20.0525 10.2693 20.0525 10.9626 20.4317L15.2201 22.8042C15.6101 23.0208 15.9676 23.075 16.1843 22.9558C16.3901 22.8367 16.5201 22.49 16.5201 22.0458V9.73916C16.5201 8.33082 15.3718 7.18251 13.9634 7.18251H5.53508Z" fill="#899098"/>
                                <path d="M15.9132 24.6458C15.4365 24.6458 14.9382 24.505 14.4291 24.2342L10.1716 21.8617C9.96573 21.7533 9.52152 21.7533 9.31568 21.8617L5.06904 24.2342C4.1482 24.7433 3.2057 24.7867 2.4907 24.3642C1.76486 23.9417 1.35321 23.0967 1.35321 22.0567V9.75001C1.35321 7.44251 3.22736 5.56836 5.53486 5.56836H13.9632C16.2707 5.56836 18.1449 7.44251 18.1449 9.75001V22.0567C18.1449 23.0967 17.7332 23.9417 17.0074 24.3642C16.6824 24.5483 16.314 24.6458 15.9132 24.6458ZM9.74904 20.15C10.1824 20.15 10.6049 20.2475 10.9624 20.4425L15.2199 22.815C15.6099 23.0317 15.9782 23.0858 16.184 22.9558C16.3899 22.8367 16.5199 22.49 16.5199 22.0459V9.73917C16.5199 8.33083 15.3716 7.18252 13.9632 7.18252H5.53486C4.12653 7.18252 2.97821 8.33083 2.97821 9.73917V22.0459C2.97821 22.49 3.10821 22.8367 3.31404 22.9558C3.51987 23.075 3.88822 23.0208 4.27822 22.8042L8.53572 20.4317C8.88238 20.2475 9.31571 20.15 9.74904 20.15Z" fill="#899098"/>
                                <path d="M22.4132 20.4425C21.9365 20.4425 21.4382 20.3017 20.9291 20.0308L16.9315 17.7992C16.6715 17.6583 16.5199 17.3875 16.5199 17.095V9.75001C16.5199 8.34168 15.3716 7.19336 13.9632 7.19336H8.66571C8.22154 7.19336 7.85321 6.82503 7.85321 6.38086V5.54667C7.85321 3.23917 9.72736 1.36502 12.0349 1.36502H20.4632C22.7707 1.36502 24.6449 3.23917 24.6449 5.54667V17.8534C24.6449 18.8934 24.2332 19.7383 23.5074 20.1608C23.1824 20.345 22.814 20.4425 22.4132 20.4425ZM18.1449 16.6075L21.7199 18.6117C22.1099 18.8283 22.4674 18.8825 22.684 18.7525C22.9007 18.6225 23.0199 18.2867 23.0199 17.8425V5.53583C23.0199 4.12749 21.8716 2.97918 20.4632 2.97918H12.0349C10.6265 2.97918 9.47821 4.12749 9.47821 5.53583V5.55752H13.9632C16.2707 5.55752 18.1449 7.43167 18.1449 9.73917V16.6075V16.6075Z" fill="#899098"/>
                            </svg>
                            <h3>${dataSim.results[i].title}</h3>
                            <h5>${txtGenre}</h5>
                            <div class="eval"><img src="./img/star.svg" alt="évaluation"><h5>${dataSim.results[i].vote_average / 2}</h5></div>
                        </div>`
            var topSection = document.getElementById('similaire-section')
            topSection.innerHTML += flyers
        }
        // verifier si il y a des film similaire
        if (dataSim.results.length == 0) {
            elem = document.getElementById('similaire')
            elem.parentNode.removeChild(elem);
        }
}
