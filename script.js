const apiKey = 'b61a73f0fae6510c800126ff363c912d'; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = 'Loading...';

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        console.log(data)

        if (data.cod === '404') {
            weatherInfo.innerHTML = 'City not found';
            return;
        }

        if (data.cod === 401) {
            weatherInfo.innerHTML = 'Invalid API key';
            return;
        }

        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const cityName = data.name;
        const country = data.sys.country;
        const windSpeed = data.wind.speed;
        const feelLike = data.main.feels_like;

        weatherInfo.innerHTML = `
            <h2>${cityName}, ${country}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Feels Like: ${feelLike}°C</p>
            <p>Condition: ${description}</p>
            <p>Wind: ${windSpeed} km/h</p>
        `;
    } catch (error) {
        weatherInfo.innerHTML = 'Error fetching weather data';
        console.error(error);
    }
}
