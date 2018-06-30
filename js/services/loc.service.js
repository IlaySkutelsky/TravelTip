
function getPosition() {
    return new Promise((resolve, reject)=>{
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

export default {
    getPosition
}