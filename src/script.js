function showTodayData(response) {
  celsiusTemp = Math.round(response.data.main.temp);
  document.querySelector(".current-location").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = celsiusTemp;
  document.querySelector(".today-precipitation").innerHTML =
    response.data.weather[0].main;
  document.querySelector(".today-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector(".current-time").innerHTML = new Date(
    response.data.dt * 1000
  ).toLocaleTimeString();
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  document.querySelector(".today-day").innerHTML =
    daysOfWeek[new Date(response.data.dt * 1000).getDay()];
  let iconElement = document.querySelector(".today-emoji");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
//add default city
function searchCity(city) {
  let apiKey = "66bb6ce1fd45936de64e0e5b29e1e52a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTodayData);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#text").value; //add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
  searchCity(city);
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "66bb6ce1fd45936de64e0e5b29e1e52a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTodayData);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
function showCelsiumTemp(event) {
  event.preventDefault();
  celsiusButton.classList.add("active");
  fahrenheitButton.classList.remove("active");
  document.querySelector("#current-temp").innerHTML = celsiusTemp;
}
function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  fahrenheitButton.classList.add("active");
  celsiusButton.classList.remove("active");
  document.querySelector("#current-temp").innerHTML =
    Math.round(fahrenheitTemp);
}
let celsiusTemp = null;
let celsiusButton = document.querySelector("#celsium");
celsiusButton.addEventListener("click", showCelsiumTemp);
let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", showFahrenheitTemp);
let currentLocationButton = document.querySelector(".current-location-btn");
currentLocationButton.addEventListener("click", getCurrentPosition);
let searchForm = document.querySelector("#search-engine");
searchForm.addEventListener("submit", handleSubmit);
searchCity("Kyiv"); //add default city
//current location weather
