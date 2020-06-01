const WEEKDAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let weatherNow = {
    city: "New York",
    cloudiness: 50,
    country: "US",
    desc: "scattered clouds",
    humidity: 50,
    sunrise: 1519626034,
    sunset: 1519664697,
    temp: 32,
    type: "03d",
    wind: 10
};

let forecast = [];

function setCurrentWeather(weather, metric){
    console.log("setCurrentWeather", weather);
    weatherNow = weather;
    updateWeather(metric);
}

function updateWeather(metric){
    console.log("Update wether");
    var temp = metric ? FtoC(weatherNow.temp).toFixed(0) : weatherNow.temp.toFixed(0);
    var wind = metric ? mphToKmh(weatherNow.wind).toFixed(0) + " km/h" : weatherNow.wind.toFixed(0) + " mph";
    var date = new Date();
    var time = WEEKDAY[date.getDay()] + ", " + getTime(date, metric);
    var sunrise = getTime(new Date(weatherNow.sunrise * 1000), metric);
    var sunset = getTime(new Date(weatherNow.sunset * 1000), metric);
    document.querySelector("weather-widget-inline").shadowRoot.querySelector("#temp-now").innerHTML = temp;
    document.querySelector("weather-widget-inline").shadowRoot.querySelector("#icon-now").className = typeToIcon(weatherNow.type);
    document.querySelector("weather-widget-inline").shadowRoot.querySelector("#desc-now").innerHTML = weatherNow.desc;
    document.querySelector("weather-widget-inline").shadowRoot.querySelector("#city-now").innerHTML = weatherNow.city;
    document.querySelector("weather-widget-inline").shadowRoot.querySelector("#wind-now").innerHTML = wind;
    document.querySelector("weather-widget-inline").shadowRoot.querySelector("#time-now").innerHTML = time;
    document.querySelector("weather-widget-inline").shadowRoot.querySelector("#humidity-now").innerHTML = weatherNow.humidity;
    document.querySelector("weather-widget-inline").shadowRoot.querySelector("#cloudiness-now").innerHTML = weatherNow.cloudiness;
    document.querySelector("weather-widget-inline").shadowRoot.querySelector("#sunrise-now").innerHTML = sunrise;
    document.querySelector("weather-widget-inline").shadowRoot.querySelector("#sunset-now").innerHTML = sunset;
    console.log(document.querySelector("weather-widget-inline").shadowRoot.querySelector("#sunset-now"));
}

function setForecast(forecast, metric){
    this.forecast = forecast;
    setForecastDay("#first-day", 0, forecast, metric);
    setForecastDay("#second-day", 1, forecast, metric);
    setForecastDay("#third-day", 2, forecast, metric);
    setForecastDay("#forth-day", 3, forecast, metric);
  }

function setForecastDay(day, num, forecast, metric){
    var min = metric ? FtoC(forecast[num].min).toFixed(0) : forecast[num].min.toFixed(0);
    var max = metric ? FtoC(forecast[num].max).toFixed(0) : forecast[num].max.toFixed(0);
    document.querySelector("weather-widget-inline").shadowRoot.querySelector(day + " > h3").innerHTML = forecast[num].weekday;
    document.querySelector("weather-widget-inline").shadowRoot.querySelector(day + " #min").innerHTML = max;
    document.querySelector("weather-widget-inline").shadowRoot.querySelector(day + " #max").innerHTML = min;
}

function getTime(date, metric) {
    var hour, minute, ampm;
    if(metric){
        hour = date.getHours();
        minute = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
        return hour + ":" + minute;
    } else {
        hour = date.getHours();
        ampm = "AM";
        if(hour >= 12){
            if(hour > 12) hour -= 12;
            ampm = "PM";
        }
        minute = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
        return hour + ":" + minute + " " + ampm;
    }
}

function FtoC(degree) {return (degree - 32) * 5/9;}

function mphToKmh(val) {return val * 1.609344;}

function typeToIcon(type){
    switch(type){
        case "01d": return "wi-day-sunny";
        case "02d": return "wi-night-cloudy";
        case "03d": return "wi-cloudy";
        case "04d": return "wi-cloudy";
        case "09d": return "wi-day-showers";
        case "10d": return "wi-day-rain";
        case "11d": return "wi-thunderstorm";
        case "13d": return "wi-snow";
        case "50d": return "wi-fog";
        case "01n": return "wi-night-clear";
        case "02n": return "wi-day-cloudy";
        case "03n": return "wi-cloudy";
        case "04n": return "wi-cloudy";
        case "09n": return "wi-night-showers"; 
        case "10n": return "wi-night-rain";
        case "11n": return "wi-thunderstorm";
        case "13n": return "wi-snow";
        case "50n": return "wi-fog";
    }
}

export default {
    setCurrentWeather,
    setForecast,
    updateWeather
}