let now = new Date();

function showDay(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturdar",
  ];
  let currentDay = days[date.getDay()];
  return currentDay;
}

function showFullDate(date) {
  let currentDate = date.getDate();
  if (currentDate < 10) {
    currentDate = `0${currentDate}`;
  }
  let currentMonth = date.getMonth();
  if (currentMonth < 10) {
    currentMonth = `0${currentMonth}`;
  }
  let currentYear = date.getFullYear();
  let nowFullDate = `${currentDate}/${currentMonth}/${currentYear}`;
  return nowFullDate;
}

function showTime(date) {
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let nowTime = `${currentHour}:${currentMinutes}`;
  return nowTime;
}

function search(event) {
  event.preventDefault();
  function getWeather(response) {
    let temperature = Math.round(response.data.main.temp);
    let currentTemp = document.getElementById("current-temp");
    let celciusLink = document.getElementById("celcius-link");
    console.log(celciusLink);
    currentTemp.innerHTML = `${temperature} °C|°F`;
    let mainIcon = document.getElementById("main-icon");
    mainIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    mainIcon.setAttribute("alt", response.data.weather[0].description);
    let description = document.getElementById("description");
    let descriptionNow = response.data.weather[0].description;
    description.innerHTML = `${descriptionNow}`;
    let wind = Math.round(response.data.wind.speed);
    let windSpeed = document.getElementById("wind-speed");
    windSpeed.innerHTML = `Wind speed: ${wind}m/s`;
    let humidity = response.data.main.humidity;
    let humidityNow = document.getElementById("humidity");
    humidityNow.innerHTML = `Humidity: ${humidity}%`;
  }

  let cityInput = document.getElementById("city-input");
  let cityCountry = document.querySelector("h1");
  cityCountry.innerHTML = `${cityInput.value}`;
  let apiKey = "db15d65fb04d4d3ab973f7ec3f38b472";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getWeather);
}

function showCurrentLocation(event) {
  event.preventDefault();
  function getYourWeather(response) {
    let tempYourLocation = Math.round(response.data.main.temp);
    let h1 = document.querySelector("h1");
    h1.innerHTML = `${response.data.name}`;
    let currentTempYourLocation = document.getElementById("current-temp");
    currentTempYourLocation.innerHTML = `${tempYourLocation}°C`;
    let mainIcon = document.getElementById("main-icon");
    mainIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    mainIcon.setAttribute("alt", response.data.weather[0].description);
    let description = document.getElementById("description");
    let descriptionNow = response.data.weather[0].description;
    description.innerHTML = `${descriptionNow}`;
    let wind = Math.round(response.data.wind.speed);
    let windSpeed = document.getElementById("wind-speed");
    windSpeed.innerHTML = `Wind speed: ${wind}m/s`;
    let humidity = response.data.main.humidity;
    let humidityNow = document.getElementById("humidity");
    humidityNow.innerHTML = `Humidity: ${humidity}%`;
  }

  function getYourLocation(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let apiKey = "db15d65fb04d4d3ab973f7ec3f38b472";
    let apiUrlYourLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
    axios.get(apiUrlYourLocation).then(getYourWeather);
  }

  navigator.geolocation.getCurrentPosition(getYourLocation);
}
let dayOfWeek = document.getElementById("day-element");
dayOfWeek.innerHTML = `${showDay(now)}`;

let fullDate = document.getElementById("date-element");
fullDate.innerHTML = `${showFullDate(now)}`;

let currentTime = document.getElementById("time-element");
currentTime.innerHTML = `${showTime(now)}`;

let form = document.getElementById("search-city-form");
form.addEventListener("submit", search);

let locationButton = document.getElementById("your-location-button");
locationButton.addEventListener("click", showCurrentLocation);
