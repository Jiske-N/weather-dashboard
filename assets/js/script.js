var key = "c4cf4b862a7cbf3d8ab3425135711b32";
// let weatherIconUrl = `https://openweathermap.org/img/wn/${currentWeather.weather.icon}@2x.png`;
let dateNow = dayjs();
// console.log(dateNow.format('DD/MM/YYYY'));
// console.log(`${dateNow.format('DD/MM/YYYY')}`);

function renderSavedLocations() {

    // answer not yet looked at
    let locations = JSON.parse(localStorage.getItem('savedLocations'));
    // let locations = JSON.stringify(locationsObject);


    // let locations = JSON.parse(localStorage.getItem('savedLocations'));
    // console.log(locationsObject);
    // console.log(locations);

    const pastSearches = document.querySelector('#pastsearches');
    // const createLocationButton = document.createElement('button');

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

    document.querySelector('#forecasth4').style.display = "block";

    currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${key}&units=metric`
    forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=${key}&units=metric`

    fetch(currentWeatherUrl)
    .then(function(response) {
        if (response.status !== 200) {
            throw currentWeatherUrl;
        } else {
            // console.log(response.name);
            return response.json();
        };
    })
    .then(function(currentWeather) {
        if (!currentWeather) {
            console.log('No results found!');
        } else {
            let weatherIconUrl = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;

            const container = document.getElementById('container');

            const weatherDetails = ['First paragraph', 'Second paragraph', 'Third paragraph'];

            weatherDetails.forEach(weatherDetails => {
                const pElement = document.createElement('p');
                pElement.textContent = text;
                container.appendChild(pElement);
            });

            // const createArticle = document.createElement('article');
            const createH3 = document.createElement('h3');
            const createImg = document.createElement('img');
            createImg.src = weatherIconUrl;
            const createP = document.createElement('p');

            document.querySelector('#current').innerHTML = '';
            document.querySelector('#current').append(createH3, createImg, createP);

            createH3.textContent = `${currentWeather.name} (${dateNow.format('DD/MM/YYYY')})`;
            createP.textContent = `Temp: ${currentWeather.main.temp} °C \nWind: ${currentWeather.wind.speed} km/h \nHumidity: ${currentWeather.main.humidity} %`        
        }
    })

    fetch(forecastWeatherUrl)
    .then(function(response) {
        if (response.status !== 200) {
            throw forecastWeatherUrl;
        } else {
            // console.log(response.name);
            return response.json();
        };
    })
    .then(function(forecastWeather) {
        if (!forecastWeather) {
            console.log('No results found!');
        } else {
            document.querySelector('#forecast').innerHTML = '';

            for (let index = 0; index < 5; index++) {
                const forecast = (forecastWeather.list)[index];
                // console.log(forecast.wind.speed)
                // console.log(forecast.weather[index].icon)
                let weatherIconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
                // console.log(forecast.wind.speed)

                const createAside = document.createElement('aside');
                const createImg = document.createElement('img');
                createImg.src = weatherIconUrl;
                const createH5 = document.createElement('h5');
                const createP = document.createElement('p');

                document.querySelector('#forecast').append(createAside);
                createAside.append(createH5, createImg, createP);

                createH5.textContent = `${dateNow.add([index + 1], 'day').format('DD/MM/YYYY')}`;
                createP.textContent = `Temp: ${forecast.main.temp} °C Wind: ${forecast.wind.speed} km/h Humidity: ${forecast.main.humidity} %`
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
    // forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=${key}`
    
    fetch(currentWeatherUrl)
    .then(function(response) {
        if (response.status !== 200) {
            alert('Please Enter Valid Australian Location');
            throw currentWeatherUrl;
        } else {
            return response.json();
        };
    })
    .then(function(currentWeather) {
        console.log(currentWeather);
        if (!currentWeather) {
            console.log('No results found!');
          } else {
            locations.push(currentWeather.name);

            localStorage.setItem('displayedLocation', JSON.stringify(currentWeather.name));
            localStorage.setItem('savedLocations', JSON.stringify(locations));

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
