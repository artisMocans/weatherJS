window.addEventListener("load", () => {
    let longitude;
    let latitude;
    let description = document.querySelector('.temperature-description');
    let degrees = document.querySelector('.temperature-degree');
    let location = document.querySelector('.location-timezone');
    let degreeSection = document.querySelector('.temperature');
    const tempSpan = document.querySelector('.temperature span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            // This acts as a proxy allowing us to call API from localhost
            const proxy = "https://cors-anywhere.herokuapp.com/";

            // Originally api key contains your specific geolocation, however, we'll use 'longitude' and 'latitude' retried from user.
            const api = `${proxy}https://api.darksky.net/forecast/50262ecb4840fb81ad09514d8a181659/${latitude},${longitude}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const {temperature, summary, icon} = data.currently;

                    setText(temperature, summary, data.timezone);
                    setIcons(icon, document.querySelector(".icon"));
                    setDegrees(temperature);
                })
        });
    }

    function setIcons(icon, iconId) {
        const skyCons = new Skycons({color: "white"});

        // Matching API returned icons with the SkyCons syntax.
        const current = icon.replace(/-/g, "_").toUpperCase();
        skyCons.play();
        return skyCons.set(iconId, Skycons[current]);
    }

    function setText(temp, summary, timezone) {
        degrees.textContent = temp;
        description.textContent = summary;
        location.textContent = timezone;
    }

    function setDegrees(temperature) {
        let celsius = (temperature - 32) * (5 / 9);

        degreeSection.addEventListener('click', () => {
            if (tempSpan.textContent === "F") {
                tempSpan.textContent = "C";
                degrees.textContent = Math.floor(celsius);
            } else {
                tempSpan.textContent = "F";
                degrees.textContent = temperature;
            }
        })
    }
});