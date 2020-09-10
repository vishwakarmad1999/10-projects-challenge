const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

form.addEventListener("submit", e => {
    e.preventDefault()
    const city = search.value
    if (city) {
        getWeatherData(city)
    }
})

function getWeatherData(city) {
    fetch(url(city))
    .then(res => res.json())
    .then(data => {
        const weather = document.createElement("div")
        weather.classList.add("weather")

        weather.innerHTML = `
            <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${KtoC(data.main.temp)}°C</h2>
            <small>${data.weather[0].main}</small>
        `

        main.innerHTML = ""
        main.appendChild(weather)
    })
    .catch(message => alert("Location not found"))
}

function KtoC(temp) {
    return Math.floor(temp - 273.15)
}