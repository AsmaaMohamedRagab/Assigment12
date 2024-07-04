var today = document.querySelector("#today")
var todayname = document.querySelector(".todayname")
var todaydate = document.querySelector(".todaydate")
var todaycountry = document.querySelector(".todaycountry")
var todayweather = document.querySelector(".todayweather")
var todayimage = document.querySelector(".todayimage")
var todaystatus = document.querySelector(".todaystatus")
var todaypercantage = document.querySelector(".todaypercantage")
var todayvolicty = document.querySelector(".todayvolicty")
var todaywind = document.querySelector(".todaywind")

var nextday = document.querySelectorAll(".nextday")
var nextdayname = document.querySelectorAll(".nextdayname")
var nextdayimage = document.querySelectorAll(".nextdayimage")
var nextdaytemp = document.querySelectorAll(".nextdaytemp")
var nextdaydeg = document.querySelectorAll(".nextdaydeg")
var nextdaystatus = document.querySelectorAll(".nextdaystatus")

var inputsearch = document.querySelector(".inputsearch")


async function weatherResonse(cityName) {
    let weatherResonse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=f04873f48a124f19a97150325242906&q=${cityName}&days=3`)
    let weatherData = await weatherResonse.json()
    console.log(weatherData);
    return weatherData
}


function todayData(data) {
    let todayDate = new Date()
    todayname.innerHTML = todayDate.toLocaleDateString("en-us", { weekday: "long" })
    todaydate.innerHTML = `${todayDate.getDate()} ${todayDate.toLocaleDateString("en-us", { month: "long" })}`
    todaycountry.innerHTML = data.location.name
    todayweather.innerHTML = data.current.temp_c
    todayimage.setAttribute("src", data.current.condition.icon)
    todaystatus.innerHTML = data.current.condition.text
    todaypercantage.innerHTML = `<i class="fa-solid fa-umbrella"></i> ${data.current.humidity}%`
    todayvolicty.innerHTML = `<i class="fa-solid fa-wind"></i> ${data.current.wind_kph} Km/h`
    todaywind.innerHTML = `<i class="fa-regular fa-compass"></i> ${data.current.wind_dir}`
}


function nextdayData(data) {
    for (let i = 0; i < 2; i++) {
        let nextDayDate = new Date(data.forecast.forecastday[i + 1].date)
        nextdaytemp[i].innerHTML = data.forecast.forecastday[i + 1].day.maxtemp_c
        nextdaydeg[i].innerHTML = data.forecast.forecastday[i + 1].day.mintemp_c
        nextdaystatus[i].innerHTML = data.forecast.forecastday[i + 1].day.condition.text
        nextdayimage[i].setAttribute("src", data.forecast.forecastday[i + 1].day.condition.icon)
        nextdayname[i].innerHTML = nextDayDate.toLocaleDateString("en-us", { weekday: "long" })
    }
}


async function data(city = "london") {
    let weatherData = await weatherResonse(city)
    if (!weatherData.error) {
        todayData(weatherData)
        nextdayData(weatherData)
    }
}
data()

inputsearch.addEventListener("input", function () {
    data(inputsearch.value)
})