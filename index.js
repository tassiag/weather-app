function formatDate(timestamp) {
    //calculate the date
    let date = new Date(timestamp);

    // day of week
    let day = date.getDay();
    let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

    let dayWeek = days[day];

    return `${dayWeek}, ${formatHours(timestamp)}`;
}

function formatHours (timestamp) {
   let date = new Date(timestamp);
  
   //get complete hours
   let hours = date.getHours();
      if (hours < 10) {
        hours = `0${hours}`;
    } 

    //get complet minutes
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    } 
    return `${hours}:${minutes}`;

}

//function that shows the temperature and other weather info

function displayTemperature(response) {

    //show temperature
    let temperatureDisplay = document.querySelector(".degrees");
    let celsius = Math.round(response.data.main.temp)
    temperatureDisplay.innerHTML = celsius;
    
    //show city
    let cityDisplay = document.querySelector(".city");
    cityDisplay.innerHTML = response.data.name;
   
    //show description
     let descriptionDisplay = document.querySelector(".description");
    descriptionDisplay.innerHTML = response.data.weather[0].description;

    //show wind
    let windDisplay = document.querySelector(".wind");
    windDisplay.innerHTML = Math.round(response.data.wind.speed);

    //show humidity
    let humidityDisplay = document.querySelector(".humidity");
    humidityDisplay.innerHTML = Math.round(response.data.main.humidity);

    //show date
    let dateDisplay = document.querySelector(".date");
    dateDisplay.innerHTML = formatDate(response.data.dt * 1000);

    //show icon
    let iconReference = response.data.weather[0].icon;
    let iconDisplay = document.querySelector(".main-icon");
    iconDisplay.setAttribute("src", `imgs/${iconReference}.png`);
    iconDisplay.setAttribute("alt", response.data.weather[0].description);

    //show max temperature
    let maxTempDisplay = document.querySelector(".max");
    maxTempDisplay.innerHTML = Math.round(response.data.main.temp_max);

    //show min temperature
    let minTempDisplay = document.querySelector(".min");
    minTempDisplay.innerHTML = Math.round(response.data.main.temp_min);

    // function to show fahrenheit

    function displayFahrenheitTemp(event) {
    event.preventDefault();
    let fahrenheitTemperature = Math.round((celsius * 9 / 5) + 32);
 
    let temperatureDisplay = document.querySelector(".degrees");
    temperatureDisplay.innerHTML = fahrenheitTemperature;

   
    }

    // function to show celsius

    function displayCelsiusTemp(event) {
    event.preventDefault();
 
    let temperatureDisplay = document.querySelector(".degrees");
    temperatureDisplay.innerHTML = celsius;
 
    }

    // add fahrenheit and celsius temperature on html

    let fahrenheitLink = document.querySelector("#fahrenheit-link");
    fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

    let celsiusLink = document.querySelector("#celsius-link");
    celsiusLink.addEventListener("click", displayCelsiusTemp);

}

// ***** forecast ******** //

 function displayForecast (response) {
    let forecastDisplay = document.querySelector("#forecast");
    forecastDisplay.innerHTML = null;
    let forecast = null;
   
   
    for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastDisplay.innerHTML += `
     <div class="col">
                    <h3>${formatHours(forecast.dt * 1000)}</h3>
                    <img class="icon-forecast" src="imgs/${forecast.weather[0].icon}.png">
                    <p class="forecast-temp">${Math.round(forecast.main.temp)}º</p>
                </div>
   `;

   }
    
  }

  // ***** main function to search and show city *********** //
  function search(city) { 
    let apiKey = "6c5142618c3f5b73b72829108626271d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);

    apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  
 
    axios.get(apiUrlForecast).then(displayForecast);

  }

  function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
  }

  let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);

  search("Lisbon");
