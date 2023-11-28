const search = document.querySelector('#card .search button')
const infoCard = document.querySelector('#card .infos')

let date = document.querySelector('#card .city .current-date')
const currentDate = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

date.innerHTML = currentDate.toLocaleDateString('en-us', options)

search.addEventListener('click', () => {
    const APIkey = 'b4436432bdc896730d0e1ae7563c4c9d'
    const city = document.querySelector('#card .search input').value
    const cityName = city.charAt(0).toUpperCase() + city.slice(1);
    document.querySelector('#card .infos .city-name').innerHTML = `${cityName}`

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).then(response => response.json()).then(json => {

        if (json.cod == '404') {
            document.querySelector('.error').style.display = `flex`
            infoCard.style.display = 'none'
        }
        else {
            infoCard.style.display = `flex`
            document.querySelector('.error').style.display = `none`
            const temperature = document.querySelector('#card .infos .temperature')
            const decsription = document.querySelector('#card .infos .description')
            const wind = document.querySelector('#card .additional-info .info-wind')
            const humidity = document.querySelector('#card .additional-info .info-humidity')
            const pressure = document.querySelector('#card .additional-info .info-pressure')
            const clouds = document.querySelector('#card .additional-info .info-clouds')
    
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
    
            switch (json.weather[0].main) {
                case 'Clear':
                    document.body.style.backgroundImage = `url(/img/Sunny.png)`
                    decsription.innerHTML = `Clear`
                    break
                case 'Rain':
                    document.body.style.backgroundImage = `url(/img/Rainy.png)`
                    decsription.innerHTML = `Rain`
                    break
                case 'Snow':
                    decsription.innerHTML = `Snow`
                    document.body.style.backgroundImage = `url(/img/Snowy.png)`
                    break
                case 'Clouds':
                    document.body.style.backgroundImage = `url(/img/Cloudy.png)`
                    decsription.innerHTML = `Clouds`
                    break
                case 'Mist':
                    decsription.innerHTML = `Mist`
                    break
                case 'Haze':
                    decsription.innerHTML = `Haze`
                    break
                default:
                    document.body.style.backgroundImage = `none`
                    decsription.innerHTML = `Broken clouds`
            }
            wind.innerHTML = `<span>${json.wind.speed} km/h</span>`
            humidity.innerHTML = `<span>${json.main.humidity} %</span>`
            pressure.innerHTML = `<span>${json.main.pressure} hPa</span>`
            clouds.innerHTML = `<span>${json.clouds.all} %</span>`
        }
    })
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).then(response => response.json()).then(jsonFuture => {
        
        })
})