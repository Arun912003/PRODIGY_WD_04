document.getElementById('getWeather').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    if (city) {
        getWeatherByCity(city);
    } else {
        alert('Please enter a city name');
    }
});

document.getElementById('getCurrentLocationWeather').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            getWeatherByCoordinates(latitude, longitude);
        }, error => {
            alert('Unable to retrieve your location');
        });
    } else {
        alert('Geolocation is not supported by this browser');
    }
});

function getWeatherByCity(city) {
    const apiKey = '592d989bc7d76369d70a5202ba6bffc9'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            document.getElementById('weatherInfo').innerHTML = '<p>Error fetching weather data</p>';
        });
}

function getWeatherByCoordinates(lat, lon) {
    const apiKey = '592d989bc7d76369d70a5202ba6bffc9'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            document.getElementById('weatherInfo').innerHTML = '<p>Error fetching weather data</p>';
        });
}

function displayWeather(data) {
    if (data.cod === 200) {
        const weatherInfo = `
            <h2>${data.name}</h2>
            <p>${data.weather[0].description}</p>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        document.getElementById('weatherInfo').innerHTML = weatherInfo;
    } else {
        document.getElementById('weatherInfo').innerHTML = '<p>City not found</p>';
    }
}
