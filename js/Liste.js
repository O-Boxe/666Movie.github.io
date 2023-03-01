async function showList() {
    film = localStorage.getItem("enregistrement").split(';')
    console.log(film)
    for (let i = 0; i < film.length; i++) {
        var responseApi = await fetch(`https://api.themoviedb.org/3/movie/${film[i]}?api_key=10e786dc9a35f5eadcac1dd044301973`);
        var data= await responseApi .json();
        console.log(data)
        var genre = ''
        var genre2 = ''
        var genre3 = ''
        // récuperer l'id des genres et les transformer en string
        if (data.genres[0] != undefined){
            switch (data.genres[0]) {
                case 28:
                    genre = 'Action'
                    break
                case 12:
                    genre = 'Aventure' 
                    break
                case 16:
                    genre = 'Animation' 
                    break
                case 35:
                    genre = 'Comédie' 
                    break
                case 80:
                    genre = 'Crime' 
                    break
                case 99:
                    genre = 'Documentaire' 
                    break
                case 18:
                    genre = 'Drama' 
                    break
                case 10751:
                    genre = 'Famille' 
                    break
                case 14:
                    genre = 'Fantaisie' 
                    break
                case 36:
                    genre = 'Histoire' 
                    break
                case 27:
                    genre = 'Horreur' 
                    break
                case 10402:
                    genre = 'Musique' 
                    break
                case 9648:
                    genre = 'Mistère' 
                    break
                case 10749:
                    genre = 'Romance' 
                    break
                case 878:
                    genre = 'Science Fiction' 
                    break
                case 10770:
                    genre = 'TV Movie' 
                    break
                case 53:
                    genre = 'Thriller' 
                    break
                case 10752:
                    genre = 'Guerre'
                    break
                case 37:
                    genre = 'Western' 
                    break
                default:
                    genre = ''
            }
        }
        // si il y a un premier genre on vérifie qu'il y en ai un deuxième
        if (data.genres[1] != undefined) {
            switch (data.genres[1]) {
                case 28:
                    genre2 = ' • Action'
                    break
                case 12:
                    genre2 = ' • Aventure' 
                    break
                case 16:
                    genre2 = ' • Animation' 
                    break
                case 35:
                    genre2 = ' • Comédie' 
                    break
                case 80:
                    genre2 = ' • Crime' 
                    break
                case 99:
                    genre2 = ' • Documentaire' 
                    break
                case 18:
                    genre2 = ' • Drama' 
                    break
                case 10751:
                    genre2 = ' • Famille' 
                    break
                case 14:
                    genre2 = ' • Fantaisie' 
                    break
                case 36:
                    genre2 = ' • Histoire' 
                    break
                case 27:
                    genre2 = ' • Horreur' 
                    break
                case 10402:
                    genre2 = ' • Musique' 
                    break
                case 9648:
                    genre2 = ' • Mistère' 
                    break
                case 10749:
                    genre2 = ' • Romance' 
                    break
                case 878:
                    genre2 = ' • Science Fiction' 
                    break
                case 10770:
                    genre2 = ' • TV Movie' 
                    break
                case 53:
                    genre2 = ' • Thriller' 
                    break
                case 10752:
                    genre2 = ' • Guerre'
                    break
                case 37:
                    genre2 = ' • Western' 
                    break
                default:
                    genre2 = ''
            } 
        }
        // si il y a un deuxieme genre on vérifie qu'il y en ai un troisieme
        if (data.genres[2] != undefined) {
            switch (data.genres[2]) {
                case 28:
                    genre3 = ' • Action'
                    break
                case 12:
                    genre3 = ' • Aventure' 
                    break
                case 16:
                    genre3 = ' • Animation' 
                    break
                case 35:
                    genre3 = ' • Comédie' 
                    break
                case 80:
                    genre3 = ' • Crime' 
                    break
                case 99:
                    genre3 = ' • Documentaire' 
                    break
                case 18:
                    genre3 = ' • Drama' 
                    break
                case 10751:
                    genre3 = ' • Famille' 
                    break
                case 14:
                    genre3 = ' • Fantaisie' 
                    break
                case 36:
                    genre3 = ' • Histoire' 
                    break
                case 27:
                    genre3 = ' • Horreur' 
                    break
                case 10402:
                    genre3 = ' • Musique' 
                    break
                case 9648:
                    genre3 = ' • Mistère' 
                    break
                case 10749:
                    genre3 = ' • Romance' 
                    break
                case 878:
                    genre3 = ' • Science Fiction' 
                    break
                case 10770:
                    genre3 = ' • TV Movie' 
                    break
                case 53:
                    genre3 = ' • Thriller' 
                    break
                case 10752:
                    genre3 = ' • Guerre'
                    break
                case 37:
                    genre3 = ' • Western' 
                    break
                default:
                    genre3 = ''
            } 
        }
        if (genre == '') {
            txtGenre = 'pad de genre disponible'
        } else if (genre2 == '') {
            txtGenre = genre
        }else if (genre3 == '') {
            txtGenre = genre + genre2 
        }else if (genre3 != ''){
            txtGenre = genre + genre2 + genre3
        }
        // aller chercher les images 
        var responseApiForImage = await fetch(`https://api.themoviedb.org/3/movie/${data.id}?api_key=10e786dc9a35f5eadcac1dd044301973`);
        var dataImage = await responseApiForImage .json();
        // aller chercher les images 
        if (dataImage.backdrop_path == null) {
            imageLink = `../img/imgNotFound.svg`
        }else{
            imageLink = `https://www.themoviedb.org/t/p/original${dataImage.backdrop_path}`
        }
        // construire le flyers
        flyers =   `<div class="flyer" style="background:linear-gradient(to top,rgb(0, 0, 0) ,rgba(0, 0, 0, 0.123)),url(${imageLink});">
                        <svg class="save" onclick="save(${data.id}, true)" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.57425 24.6458C3.18425 24.6458 2.80508 24.5483 2.48008 24.3533C1.75424 23.9308 1.34259 23.0858 1.34259 22.035V9.72835C1.34259 7.42085 3.21674 5.54666 5.52424 5.54666H13.9526C16.2601 5.54666 18.1343 7.42085 18.1343 9.72835V22.035C18.1343 23.0858 17.7226 23.92 16.9968 24.3533C16.2709 24.7758 15.3393 24.7325 14.4184 24.2233L10.1609 21.8508C9.95511 21.7317 9.52174 21.7317 9.31591 21.8508L5.05842 24.2233C4.56008 24.505 4.05092 24.6458 3.57425 24.6458ZM5.53508 7.18251C4.12675 7.18251 2.97843 8.33082 2.97843 9.73916V22.0458C2.97843 22.49 3.10843 22.8367 3.31426 22.9558C3.5201 23.075 3.88845 23.0208 4.27845 22.8042L8.53594 20.4317C9.22927 20.0525 10.2693 20.0525 10.9626 20.4317L15.2201 22.8042C15.6101 23.0208 15.9676 23.075 16.1843 22.9558C16.3901 22.8367 16.5201 22.49 16.5201 22.0458V9.73916C16.5201 8.33082 15.3718 7.18251 13.9634 7.18251H5.53508Z" fill="#899098"/>
                            <path d="M15.9132 24.6458C15.4365 24.6458 14.9382 24.505 14.4291 24.2342L10.1716 21.8617C9.96573 21.7533 9.52152 21.7533 9.31568 21.8617L5.06904 24.2342C4.1482 24.7433 3.2057 24.7867 2.4907 24.3642C1.76486 23.9417 1.35321 23.0967 1.35321 22.0567V9.75001C1.35321 7.44251 3.22736 5.56836 5.53486 5.56836H13.9632C16.2707 5.56836 18.1449 7.44251 18.1449 9.75001V22.0567C18.1449 23.0967 17.7332 23.9417 17.0074 24.3642C16.6824 24.5483 16.314 24.6458 15.9132 24.6458ZM9.74904 20.15C10.1824 20.15 10.6049 20.2475 10.9624 20.4425L15.2199 22.815C15.6099 23.0317 15.9782 23.0858 16.184 22.9558C16.3899 22.8367 16.5199 22.49 16.5199 22.0459V9.73917C16.5199 8.33083 15.3716 7.18252 13.9632 7.18252H5.53486C4.12653 7.18252 2.97821 8.33083 2.97821 9.73917V22.0459C2.97821 22.49 3.10821 22.8367 3.31404 22.9558C3.51987 23.075 3.88822 23.0208 4.27822 22.8042L8.53572 20.4317C8.88238 20.2475 9.31571 20.15 9.74904 20.15Z" fill="#899098"/>
                            <path d="M22.4132 20.4425C21.9365 20.4425 21.4382 20.3017 20.9291 20.0308L16.9315 17.7992C16.6715 17.6583 16.5199 17.3875 16.5199 17.095V9.75001C16.5199 8.34168 15.3716 7.19336 13.9632 7.19336H8.66571C8.22154 7.19336 7.85321 6.82503 7.85321 6.38086V5.54667C7.85321 3.23917 9.72736 1.36502 12.0349 1.36502H20.4632C22.7707 1.36502 24.6449 3.23917 24.6449 5.54667V17.8534C24.6449 18.8934 24.2332 19.7383 23.5074 20.1608C23.1824 20.345 22.814 20.4425 22.4132 20.4425ZM18.1449 16.6075L21.7199 18.6117C22.1099 18.8283 22.4674 18.8825 22.684 18.7525C22.9007 18.6225 23.0199 18.2867 23.0199 17.8425V5.53583C23.0199 4.12749 21.8716 2.97918 20.4632 2.97918H12.0349C10.6265 2.97918 9.47821 4.12749 9.47821 5.53583V5.55752H13.9632C16.2707 5.55752 18.1449 7.43167 18.1449 9.73917V16.6075V16.6075Z" fill="#899098"/>
                        </svg>
                        <h3>${data.title}</h3>
                        <h5>${txtGenre}</h5>
                        <div class="eval"><img src="./img/star.svg" alt="évaluation"><h5>${data.vote_average / 2}</h5></div>
                    </div>`
        var topSection = document.getElementById('list')
        topSection.innerHTML += flyers
    }
}