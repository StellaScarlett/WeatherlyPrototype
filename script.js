var humidity;
var weatherIcon;
var pressure;
var uvIndex;
var temperature;
var windBearing;
var windSpeed;
var weatherSummary;

window.onload = function() {
humidity = document.getElementById("current-humidity");
weatherIcon = document.getElementById("current-icon");
pressure = document.getElementById("current-pressure");
uvIndex = document.getElementById("current-uvIndex");
temperature = document.getElementById("current-temperature");
windBearing = document.getElementById("current-wind-bearing");
windSpeed = document.getElementById("current-wind-speed");
weatherSummary = document.getElementById("weather-summary");
}

function farenheitToCelsius(k) {
return Math.round((k - 32) * 0.5556 );
}

function humidityPercentage(h) {
return Math.round(h * 100);
}

function degreesToDirection(degrees) {
var range = 360/16;
var low = 360 - range/2;
var high = (low + range) % 360;
var angles = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
for (i in angles) {

if(degrees>= low && degrees < high)
	return angles[i];

low = (low + range) % 360;
high = (high + range) % 360;
}
}

function knotsToKilometres(knot) {
return Math.round( knot * 1.852);
}

var weatherImages = {
"clear-day": "images/Clear day.png" ,
"clear-night": "images/clear night.png",
"rain": "images/rain.png",
"snow": "images/snow.png",
"sleet": "images/sleet.png",
"wind": "images/windy.png",
"fog": "images/fog.png",
"cloudy": "/images/cloudy.png",
"partly-cloudy-day": "images/partly cloudy day.png",
"partly-cloudy-night": "images/partly cloudy night.png",
"hail": "images/hail.png",
"thunderstorm": "images/storm.png",
"tornado": "images/tornado.png"
}

var getWeather = function() {
if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(function(position){
var lat = position.coords.latitude;
var long = position.coords.longitude;
showWeather(lat, long)
})
}
else {
	window.alert("Could not get location");
}
}

function showWeather(lat, long) {
var url = `https://api.darksky.net/forecast/b86d276d55f5e2962634d2e52a4d99c9/${lat},${long}` + `?format=jsonp&callback=displayWeather`;
var script = document.createElement("script");
script.type = "text/javascript";
script.src = url;
document.getElementsByTagName("head")[0].appendChild(script);
displayWeather(object)   
}

var object;

function displayWeather(object) {
temperature.innerHTML = farenheitToCelsius(object.currently.temperature) + " C";
humidity.innerHTML = "Humidity: " + humidityPercentage(object.currently.humidity) + "%";
weatherIcon.src = weatherImages[object.currently.icon];
pressure.innerHTML = "Pressure: " + object.currently.pressure + " mb";
uvIndex.innerHTML = "uvIndex: " + object.currently.uvIndex;
windBearing.innerHTML = "Wind Direction: " + degreesToDirection(object.currently.windBearing);
windSpeed.innerHTML = "Wind Speed: " + knotsToKilometres(object.currently.windSpeed) + " km/h";
weatherSummary.innerHTML = object.currently.summary + "<br/> <br/>" + "Current Location: " + object.timezone; 
document.getElementById("weather-summary"); 
var description = data.currently.summary;
console.log(object);
}
