// Déclaration des variables génériques
let villeDefault;
let apiKey = "13c57efc2c9158a847613fd0231ce56a";

//Géolocalisation
if("geolocation" in navigator) {
    navigator.geolocation.watchPosition((position) => {
        // Requete AJAX géolocalisation
        const url = 'https://api.openweathermap.org/data/2.5/weather?lon=' + position.coords.longitude + '&lat=' + position.coords.latitude + '&appid=' + apiKey + '&units=metric';
    
        let requete = new XMLHttpRequest();
        requete.open('GET', url);
        requete.responseType = 'json';
        requete.send();

        requete.onload = function() {
            if (requete.readyState === XMLHttpRequest.DONE) {
                if (requete.status === 200) {
                    let reponse = requete.response;
                    let temperature = reponse.main.temp;
                    let ville = reponse.name;
                    let ventMPH = reponse.wind.speed;

                    document.querySelector('#temperature_label').textContent = temperature;
                    document.querySelector('#ville').textContent = ville;

                        //Conversion miles par heure en kilomètre par heure
                        let ventConversion = 1.61;
                        let ventKMH = Math.round(ventMPH * ventConversion);
                    document.querySelector('#wind_label').textContent = ventKMH;
                }
                else {
                    alert('Un problème est intervenue, merci de revenir plus tard.');
                }
            }
        }
    }, erreur);
    // Améliore la géolocalisation (option à ajouter)
        // var options = {
        //     enableHighAccuracy: true
        // }
}
else {
    villeDefault ='Tokyo';
    recevoirTemperature(villeDefault);
}

// Gestion de l'erreur de géolocalisation
function erreur() {
    villeDefault = "Paris"
    recevoirTemperature(villeDefault);
}

// Saisie d'une autre ville
let changerDeVille = document.querySelector('#changer');
changerDeVille.addEventListener('click', () => {
    villeDefault = prompt('Quelle ville souhaitez vous voir ?');
    recevoirTemperature(villeDefault);
})

// Requete AJAX choisir une ville
function recevoirTemperature(ville) {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=' + apiKey + '&units=metric';

    let requete = new XMLHttpRequest();
    requete.open('GET', url);
    requete.responseType = 'json';
    requete.send();

    requete.onload = function() {
        if (requete.readyState === XMLHttpRequest.DONE) {
            if (requete.status === 200) {
                let reponse = requete.response;
                let temperature = reponse.main.temp;
                let ville = reponse.name;
                let ventMPH = reponse.wind.speed;

                document.querySelector('#temperature_label').textContent = temperature;
                document.querySelector('#ville').textContent = ville;

                    //Conversion miles par heure en kilomètre par heure
                    let ventConversion = 1.61;
                    let ventKMH = Math.round(ventMPH * ventConversion);
                document.querySelector('#wind_label').textContent = ventKMH;
            }
            else {
                alert('Un problème est intervenue, merci de revenir plus tard.');
            }
        }
    }
}
