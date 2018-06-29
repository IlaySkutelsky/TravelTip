
// var map;

let W_KEY = 'dcce2e8980961ef5d95b8b5594b059a9'
// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}


function getWeather(loc) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${loc.latitude}&lon=${loc.longitude}&units=metric&APPID=${W_KEY}`)
}

// function initMap(lat = 32.0881183, lng = 34.803004) {
//     console.log('InitMap'); 
//     return _connectGoogleApi()
//     .then(() => {
//         console.log('google available');
//         map = new google.maps.Map(
//             document.querySelector('#map'), {
//                 center: { lat, lng },
//                 zoom: 15
//             })
//         console.log('Map!', map);
//     })
// }

// function addMarker(loc, title) {
//     var marker = new google.maps.Marker({
//         position: loc,
//         map: map,
//         title: title
//     });
//     console.log('marker:', marker);
    
//     return marker;
// }

// function _connectGoogleApi() {
//     if (window.google) return Promise.resolve()
//     const API_KEY = 'AIzaSyAls7l4BOIH_m37Pa-5xOcc8ddGZaKOmJQ';
//     // const API_KEY = '';
//     var elGoogleApi = document.createElement('script');
//     elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
//     elGoogleApi.async = true;
//     document.body.append(elGoogleApi);
    
//     return new Promise((resolve, reject) => {
//         elGoogleApi.onload = resolve;
//         elGoogleApi.onerror = () => reject('Google script failed to load')
//         // elGoogleApi.onerror = reject.bind(null,'Google script failed to load')
//     })
// }

export default {
    getWeather
}

