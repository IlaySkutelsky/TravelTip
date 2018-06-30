function getLocFromUrl(){
    let loc = {}
    loc.lat = parseFloat(getParameterByName('lat'))
    loc.lng = parseFloat(getParameterByName('lng'))
    return loc
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return undefined;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default {
    getLocFromUrl
}