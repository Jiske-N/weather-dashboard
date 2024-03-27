let currentWeatherUrl = "api.openweathermap.org/data/2.5/weather?q=sydney,au&APPID=c4cf4b862a7cbf3d8ab3425135711b32"
let forecastWeatherUrl = "api.openweathermap.org/data/2.5/forecast?q=sydney,au&APPID=c4cf4b862a7cbf3d8ab3425135711b32"

// function renderSavedLocations() {
//     let locations = JSON.parse(localStorage.getItem('savedLocations'));

//     const pastSearches = document.querySelector('#pastsearches');
//     const createLocationButton = document.createElement('button');

//     if (!locations) {
//         console.log('There are no saved locations');
//     } else {
//         for (let index = 0; index < locations.length; index++) {
//             pastSearches.append(createLocationButton);
//             createLocationButton.textContent = locations[index];
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

    currentWeatherUrl = `api.openweathermap.org/data/2.5/weather?q=${location},au&APPID=c4cf4b862a7cbf3d8ab3425135711b32`
    console.log(currentWeatherUrl);
    
    fetch(currentWeatherUrl)
    .then(function(response){
        if (response.status !== 200) {
            alert('Please Enter Valid Search');
        } else {
            console.log(currentWeatherUrl);
            return response.json();
        };
    })
    .then(function(currentWeather){
        console.log(currentWeather);
        if (!currentWeather.results.length) {
            console.log('No results found!');
          } else {
            localStorage.setItem('displayedLocation', location);
          }
    })

    forecastWeatherUrl = `api.openweathermap.org/data/2.5/forecast?q=${location},au&APPID=c4cf4b862a7cbf3d8ab3425135711b32`

    fetch(forecastWeatherUrl)
    .then(function(response){
        if (response.status == 200) {
            return response.json();
        };
    })
    .then(function(forecastWeather){
        console.log(forecastWeather);
        if (!data.results.length) {
            console.log('No results found!');
          } else {
            locations.push(forecastWeather);
            localStorage.setItem('savedLocations', JSON.stringify(locations));
          }
    })

    document.querySelector('#location').value = "";

    // renderSavedLocations();
});

