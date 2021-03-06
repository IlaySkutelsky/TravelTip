
import utils from './utils.js'
import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
import weatherService from './services/weather.service.js'

window.onload = () => {
    let loc = utils.getLocFromUrl()
    mapService.loadMap(loc.lat, loc.lng)
        .then(() => {
            document.querySelector('.search-btn').addEventListener('click', onSearch);
            document.querySelector('.search-input').addEventListener('keyup', checkEnter);
            document.querySelector('.add-marker-btn').addEventListener('click', onAddMarker);
            document.querySelector('.my-loc-btn').addEventListener('click', loadMyLoc);
            document.querySelector('.copy-loc-btn').addEventListener('click', copyLoc);
        })
}

function checkEnter(ev) {
    if (ev.keyCode !== 13) return
    onSearch()
}

function onSearch() {
    let loc
    var searchInput = document.querySelector('.search-input').value;
    mapService.searchByAdress(searchInput)
        .then((res) => {
            console.log(res);
            loc = res.results[0].geometry.location;
            loadAndRenderMap(loc.lat, loc.lng)
        })
        .then(() => {
            loadAndRenderWeather({ latitude: loc.lat, longitude: loc.lng })
        })
        .then(() => {
            setLocUrl(loc.lat, loc.lng)
        }).catch(console.warn);
}

function loadMyLoc() {
    let coords
    locService.getPosition()
        .then(res => {
            coords = res.coords;
            loadAndRenderMap(coords.latitude, coords.longitude)
        })
        .then(() => {
            mapService.addMarker({ lat: coords.latitude, lng: coords.longitude }, 'Your\'e here!');
        })
        .then(() => {
            loadAndRenderWeather(coords)
        })
        .then(() => {
            setLocUrl(coords.latitude, coords.longitude);
        }).catch(console.warn);

}

function loadAndRenderWeather(loc) {
    let elWeather = document.querySelector('.weather');
    elWeather.classList.remove('animated', 'fadeInLeft');
    weatherService.getWeather(loc)
        .then((res) => {
            res.json()
                .then((res) => {
                    renderWeather(res)
                })
        })
}

function loadAndRenderMap(latitude, longitude) {
    let elMap = document.querySelector('#map');
    elMap.classList.remove('animated', 'fadeInLeft');
    mapService.loadMap(latitude, longitude)
    .then(() => {
        elMap.classList.add('animated', 'fadeInLeft');
    })
}

function renderWeather(weatherData) {
    let elWeather = document.querySelector('.weather');
    // elWeather.classList.remove('animated', 'fadeInLeft');
    elWeather.innerHTML = `
    <h4>${weatherData.name}</h4>
    <div>
    <img class="img-weather" src="https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png" </br>
    <mark>${weatherData.weather[0].description}</mark></br>
    </div>
    <div>
    <mark>Temp:</mark> ${weatherData.main.temp}&#8451; </br>
    </div>
    <div>
    <mark>Humidity:</mark> ${weatherData.main.humidity}% </br>
    </div>
    <div>
    <mark>Cloudiness:</mark> ${weatherData.clouds.all}% </br>
    `
    elWeather.classList.add('animated', 'fadeInLeft');
}

function onAddMarker() {
    let center = mapService.getMapCenter()
    let loc = { lat: center.lat(), lng: center.lng()}
    mapService.addMarker(loc)
}

function copyLoc() {
    var elInput = document.querySelector('.copy-loc-input');
    elInput.select();
    document.execCommand('copy');
}

function setLocUrl(lat, lng) {
    document.querySelector('.copy-loc-input').value = `https://ilayskutelsky.github.io/TravelTip/index.html?lat=${lat}&lng=${lng}`;
}