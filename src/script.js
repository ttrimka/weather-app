function showTodayData(response) {
  document.querySelector(".current-location").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
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
let searchForm = document.querySelector("#search-engine");
searchForm.addEventListener("submit", handleSubmit);
searchCity("Kyiv"); //add default city
//current location weather
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
let currentLocationButton = document.querySelector(".current-location-btn");
currentLocationButton.addEventListener("click", getCurrentPosition);
