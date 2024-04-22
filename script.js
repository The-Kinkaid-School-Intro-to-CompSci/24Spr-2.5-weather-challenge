/** Helper function to clear elements of children */
function clearContainer(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
 }

/** *******Getting the location. No need to edit  *******/
function locationSuccess(position, status, location) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = ''; //clear the status
    location.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;


    let getWeatherBtn = document.querySelector('#getWeatherBtn');
    getWeatherBtn.classList.remove('d-none');
    //bind the function getWeather with latitude and longitude to the button
    getWeatherBtn.addEventListener('click', 
        getWeather.bind(null, latitude, longitude)
    );
}

function locationError(status) {
    status.textContent = 'Unable to retrieve your location';
}

function getLocation() {
    //get the status and location elements
    const status = document.querySelector('#status');
    const location = document.querySelector('#location');

    //check if the browser supports geolocation
    if(!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    }
    else {
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(
            (position) => locationSuccess(position, status, location), 
            () => locationError(status),
            {maximumAge: 600000}
        );
    }

}
/** *******Getting the location. No need to edit  *******/

//**************** Functions to show the city Info END ****************/

function makeCityName(cityName) {
    // Create a new h2 element
    let city = document.createElement('h2');
    // Add the card-title class to the h2 element
    city.classList.add('card-title');
    // Set the text content of the h2 element to the cityName parameter
    city.textContent = cityName;
    // Return the h2 element
    return city;
}

function makeCountry(countryName) {
    // Create a new p element

    // Add the card-text class to the p element

    // Set the text content of the p element to the countryName parameter

    // Return the p element
}

function makePopulation(population) {
    // Create a new p element

    // Add the card-text class to the p element

    // Set the text content of the p element to be like `Population: 123456`

    // Return the p element
}


function makeSunrise(sunriseTime) {
    //making a new date time object from the sunriseTime
    //sunriseTime is in seconds (unix), so we need to multiply by 1000 to get milliseconds (Unix time is in seconds, JavaScript time is in milliseconds)
    //if you're curious about this, read about epoch time here: https://www.baeldung.com/linux/epoch-time || https://en.wikipedia.org/wiki/Unix_time
    let sunriseTimeDate = new Date(sunriseTime*1000);
    let sunrise = document.createElement('p');
    sunrise.classList.add('card-text');
    sunrise.textContent = `Sunrise Time: ${sunriseTimeDate.getHours()}:${sunriseTimeDate.getMinutes()}:${sunriseTimeDate.getSeconds()}`;
    return sunrise;
}

function makeSunset(sunsetTime) {
    //Look at the makeSunrise function and use it as a template to create the makeSunset function
}

function showCity(city) {

    let cityCard = document.querySelector('#cityCard');
    clearContainer(cityCard);
    cityCard.classList.add('card', 'col-12');
    
    let cityName = makeCityName(city.name);
    // Append the city element to the cityCard element
    cityCard.appendChild(cityName);

    //TODO: Fill out makeCountry function
    //then append the country element to the cityCard element
    let country = makeCountry(/** city.___ must be passed in */);

    //TODO: Fill out makePopulation function
    //then append the population element to the cityCard element
    let population = makePopulation(/* city.___ must be passed in */);

    let sunriseTime = makeSunrise(city.sunrise);
    cityCard.appendChild(sunriseTime);

    //TODO: Fill out makeSunset function
    //then append the sunset element to the cityCard element
    let sunsetTime = makeSunset(/* city.___ must be passed in */);

}

//**************** Functions to show the city Info END ****************/

//**************** Functions to make the forecast card START ****************/
function makeIcon(icon, weatherDescription) {
    let iconImg = document.createElement('img');
    let something = 'replace me';

    //use the icon parameter to set the src attribute of the iconImg element
    iconImg.src = `http://openweathermap.org/img/wn/${something}.png`;
    iconImg.alt = weatherDescription;
    iconImg.classList.add('card-img-top');
    return iconImg;
}


function makeDate(dateTimeTxt) {
    let date = document.createElement('h5');
    date.classList.add('card-title');

    //handle the date time text formatting
    let dateTime = new Date(dateTimeTxt);
    const month = dateTime.toLocaleString('default', { month: 'long' });
    const dayOfTheWeek = dateTime.toLocaleString('default', { weekday: 'long' });
    date.textContent = `${dayOfTheWeek}, ${month} ${dateTime.getDate()} ${dateTime.getFullYear()} ${dateTime.toLocaleTimeString()}`;

    return date;
}

function makeTemperature(temp) {
    // Create a new p element

    // Add the card-text class to the p element

    // Set the text content of the p element to be like `Temperature: 123.45°F`

    // Return the p element

}

function makeWeather(weather) {
    // Create a new p element

    // Add the card-text class to the p element

    // Set the text content of the p element to be like `Weather: Cloudy`

    // Return the p element

}

function makeHumidity(humidity) {

    // Create a new p element

    // Add the card-text class to the p element

    // Set the text content of the p element to be like `Humidity: 50%`

    // Return the p element
}

function makeForecastCard(forecast) {
    let card = document.createElement('div');
    card.classList.add('card', 'col-12', 'col-md-6', 'col-lg-4', 'bg-info', 'text-white');

    //TODO: Finish the makeIcon function
    let lilIcon = makeIcon(forecast.weather[0].icon, forecast.weather[0].description);
    card.appendChild(lilIcon);

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    card.appendChild(cardBody);

    let date = makeDate(forecast.dt_txt);
    cardBody.appendChild(date);

    //TODO: Fill out the makeTemperature function
    //then append the temperature element to the cardBody element
    let temp = makeTemperature(/** forecast.____.___ must be passed i */);

    //TODO: Fill out the makeWeather function
    //then append the weather element to the cardBody element
    let weather = makeWeather(/** forecast.___[0].___ must be passed in */);

    //TODO: Fill out the makeHumidity function
    //then append the humidity element to the cardBody element
    let humidity = makeHumidity(/** forecast.____ must be passed in */);

    return card;
}
//**************** Functions to make the forecast card END ****************/

function showForecast(forecastList) {
    let forecastsContainer = document.querySelector('#forecastsContainer');
    clearContainer(forecastsContainer);

    //Step 2: Create one forecast card for testing
    let singleForecast = forecastList[0];
    let forecastCard = makeForecastCard(singleForecast);
    forecastsContainer.appendChild(forecastCard);
    
    //Step 3: Loop through the forecastList array
    //and create a forecast card for each forecast
    //and append it to the forecastsContainer

}

function displayWeather(weatherData) {
    console.log(weatherData);
    let weatherInfoContainer = document.querySelector('#weatherInfo');
    weatherInfoContainer.classList.remove('d-none');
    //Step 1A: Display the city info
    showCity(/*weatherData._____*/);
    //Step 2A: Display the forecasts
    // showForecast(/**weatherData.____ */);
}

async function getWeather(latitude, longitude) {

    if(latitude === null || longitude === null) {
        console.log('Please get your location first');
        return;
    }

    // Step 0A: Paste in your API Key
    const apiKey = '';
    const units = 'imperial';
    //Step 0B: Construct the URL
    const apiURL =``;
    //Step 0C: Create a local JSON file
    const localJSON = './weather-data.json';

    console.log(apiURL);
    let weatherData;
    try {
        // Step 0B: Fetch the weather data
        const response = await fetch(localJSON);
        //save it to the weatherData variable
        weatherData = null;


    }
    catch(error) {
        console.log('error', error);
    }
    // Display the weather
    console.log(weatherData);
    displayWeather(weatherData);

}


function runProgram() {

    // Your get your location
    let myLocBtn = document.querySelector('#getLocationBtn');
    myLocBtn.addEventListener('click', getLocation);

}

document.addEventListener('DOMContentLoaded', runProgram);