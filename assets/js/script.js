let currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=sydney,au&APPID=c4cf4b862a7cbf3d8ab3425135711b32"
let forecastWeatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=sydney,au&APPID=c4cf4b862a7cbf3d8ab3425135711b32"

function renderSavedLocations() {

    // answer not yet looked at
    let locationsObject = JSON.parse(localStorage.getItem('savedLocations'));
    let locations = JSON.stringify(locationsObject);


    // let locations = JSON.parse(localStorage.getItem('savedLocations'));
    console.log(locations);

    const pastSearches = document.querySelector('#pastsearches');
    // const createLocationButton = document.createElement('button');

    if (!locations) {
        console.log('There are no saved locations');
    } else {
        for (let index = 0; index < locations.length; index++) {
            const createLocationButton = document.createElement('button');
            pastSearches.append(createLocationButton);
            createLocationButton.textContent = locations[index].name;
        }
    }
};

// function renderDisplayedLocation() {
//     // answer not yet looked at
//     let forecastObject = JSON.parse(localStorage.getItem('savedLocations'));
//     let forecast = JSON.stringify(forecastObject);


//     // let locations = JSON.parse(localStorage.getItem('savedLocations'));
//     console.log(forecast);

//     const pastSearches = document.querySelector('#pastsearches');
//     // const createLocationButton = document.createElement('button');

//     if (!forecast) {
//         console.log('There is no saved forecast');
//     } else {
//         for (let index = 0; index < forecast.length; index++) {
//             const createLocationButton = document.createElement('button');
//             pastSearches.append(createLocationButton);
//             createLocationButton.textContent = forecast[index].name;
//         }
//     }
// };

document.querySelector('#form').addEventListener('submit', function (inputLocation) {
    inputLocation.preventDefault();

    const location = document.querySelector('#location').value;
    let locations = JSON.parse(localStorage.getItem('savedLocations'));

    if (!locations) {
        locations = [
        ];
    };

    currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location},au&APPID=c4cf4b862a7cbf3d8ab3425135711b32`
    forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location},au&APPID=c4cf4b862a7cbf3d8ab3425135711b32`
    
    fetch(currentWeatherUrl)
    .then(function(response){
        if (response.status !== 200) {
            alert('Please Enter Valid Australian Location');
            throw currentWeatherUrl;
        } else {
            console.log(response);
            return response.json();
        };
    })
    .then(function(currentWeather){
        console.log(currentWeather);
        if (!currentWeather) {
            console.log('No results found!');
          } else {
            localStorage.setItem('displayedLocation', JSON.stringify(currentWeather));

            fetch(forecastWeatherUrl)
            .then(function(response){
                if (response.status == 200) {
                    return response.json();
                };
            })
            .then(function(forecastWeather){
                console.log(forecastWeather);
                if (!forecastWeather) {
                    console.log('No results found!');
                  } else {
                    locations.push(forecastWeather);
                    localStorage.setItem('savedLocations', JSON.stringify(locations));

                    document.querySelector('#location').value = "";

                    renderSavedLocations();
                  }
            })
          }
    })


    // renderDisplayedLocation();
});

renderDisplayedLocation();
// renderSavedLocations();