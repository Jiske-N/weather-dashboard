var key = "c4cf4b862a7cbf3d8ab3425135711b32";

function renderSavedLocations() {
    let locations = JSON.parse(localStorage.getItem('savedLocations'));

    const pastSearches = document.querySelector('#pastsearches');

    if (!locations) {
        console.log('There are no saved locations');
    } else {
        pastSearches.innerHTML = '';

        for (let index = 0; index < locations.length; index++) {
            const createLocationButton = document.createElement('button');
            pastSearches.append(createLocationButton);
            createLocationButton.textContent = locations[index];
        }
    }
};

function renderDisplayedLocation() {
    let location = JSON.parse(localStorage.getItem('displayedLocation'));
    let dateNow = dayjs();

    document.querySelector('#forecasth4').style.display = "block";

    currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${key}&units=metric`
    forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=${key}&units=metric`

    fetch(currentWeatherUrl)
        .then(function (response) {
            if (response.status !== 200) {
                throw currentWeatherUrl;
            } else {
                return response.json();
            };
        })
        .then(function (currentWeather) {
            if (!currentWeather) {
                console.log('No results found!');
            } else {
                let weatherIconUrl = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;

                const container = document.getElementById('container');

                const createH3 = document.createElement('h3');
                const createImg = document.createElement('img');
                createImg.src = weatherIconUrl;
                const createPTemp = document.createElement('p');
                const createPWind = document.createElement('p');
                const createPHumidity = document.createElement('p');

                createH3.textContent = `${currentWeather.name} (${dateNow.format('DD/MM/YYYY')})`;
                createPTemp.textContent = `Temp: ${currentWeather.main.temp} °C`
                createPWind.textContent = `Wind: ${currentWeather.wind.speed} km/h`
                createPHumidity.textContent = `Humidity: ${currentWeather.main.humidity} %`

                document.querySelector('#current').innerHTML = '';
                createH3.append(createImg);
                document.querySelector('#current').append(createH3, createPTemp, createPWind, createPHumidity);
            }
        })

    fetch(forecastWeatherUrl)
        .then(function (response) {
            if (response.status !== 200) {
                throw forecastWeatherUrl;
            } else {
                return response.json();
            };
        })
        .then(function (forecastWeather) {
            if (!forecastWeather) {
                console.log('No results found!');
            } else {
                document.querySelector('#forecast').innerHTML = '';

                for (let index = 0; index < 5; index++) {
                    const forecast = (forecastWeather.list)[index];

                    let weatherIconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;

                    const createAside = document.createElement('aside');
                    const createImg = document.createElement('img');
                    createImg.src = weatherIconUrl;
                    const createH5 = document.createElement('h5');
                    const createPTemp = document.createElement('p');
                    const createPWind = document.createElement('p');
                    const createPHumidity = document.createElement('p');

                    document.querySelector('#forecast').append(createAside);
                    createAside.append(createH5, createImg, createPTemp, createPWind, createPHumidity);

                    createH5.textContent = `${dateNow.add([index + 1], 'day').format('DD/MM/YYYY')}`;
                    createPTemp.textContent = `Temp: ${forecast.main.temp} °C`
                    createPWind.textContent = `Wind: ${forecast.wind.speed} km/h`
                    createPHumidity.textContent = `Humidity: ${forecast.main.humidity} %`
                }
            }
        })
};

document.querySelector('#form').addEventListener('submit', function (inputLocation) {
    inputLocation.preventDefault();

    const location = document.querySelector('#location').value;
    let locations = JSON.parse(localStorage.getItem('savedLocations'));

    if (!locations) {
        locations = [
        ];
    };

    currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${key}&units=metric`

    fetch(currentWeatherUrl)
        .then(function (response) {
            if (response.status !== 200) {
                alert('Please Enter Valid Location');
                throw currentWeatherUrl;
            } else {
                return response.json();
            };
        })
        .then(function (currentWeather) {
            console.log(currentWeather);
            if (!currentWeather) {
                console.log('No results found!');
            } else {
                locations.push(currentWeather.name);

                localStorage.setItem('displayedLocation', JSON.stringify(currentWeather.name));
                localStorage.setItem('savedLocations', JSON.stringify(locations));

                document.querySelector('#location').value = '';

                renderDisplayedLocation();
                renderSavedLocations();
            }
        })
});

document.querySelector('#pastsearches').addEventListener('click', function (event) {
    localStorage.setItem('displayedLocation', JSON.stringify(event.target.textContent));

    renderDisplayedLocation();
});

if (JSON.parse(localStorage.getItem('displayedLocation'))) {
    renderDisplayedLocation();
    renderSavedLocations();
};
