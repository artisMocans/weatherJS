window.addEventListener("load", () => {
    let longitude;
    let latitude;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            var myObj = { Longitude : longitude, latitude : latitude };
            console.log(myObj);
        })
    }
});