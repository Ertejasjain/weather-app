async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const apiKey = '2451d665fe514bc5bb0192304250508'; // Replace with your real WeatherAPI key
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  const weatherResult = document.getElementById('weatherResult');
  const body = document.body;

  if (!city) {
    weatherResult.innerHTML = `<p class="placeholder">Please enter a city name</p>`;
    return;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      weatherResult.innerHTML = `<p class="placeholder">${data.error.message}</p>`;
    } else {
      const condition = data.current.condition.text.toLowerCase();

      // Remove old weather classes
      body.className = '';

      // Apply new background based on weather
      if (condition.includes('rain')) {
        body.classList.add('rainy');
      } else if (condition.includes('snow')) {
        body.classList.add('snowy');
      } else if (condition.includes('cloud')) {
        body.classList.add('cloudy');
      } else if (condition.includes('clear')) {
        if (data.current.is_day === 1) {
          body.classList.add('sunny');
        } else {
          body.classList.add('clear-night');
        }
      } else {
        body.classList.add('sunny'); // default
      }

      weatherResult.innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}">
        <p>🌡️ Temperature: <b>${data.current.temp_c} °C</b></p>
        <p>🌥️ Condition: <b>${data.current.condition.text}</b></p>
        <p>💨 Wind Speed: <b>${data.current.wind_kph} kph</b></p>
        <p>🌅 Local Time: <b>${data.location.localtime}</b></p>
      `;
    }
  } catch (error) {
    console.error(error);
    weatherResult.innerHTML = `<p class="placeholder">Something went wrong! Try again later.</p>`;
  }
}
