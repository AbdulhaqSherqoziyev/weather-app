const apiKey = "5f8503fb89ffdb650735ce3ffd36d138";
const getWeatherBtn = document.getElementById("getWeatherBtn");
const resultDiv = document.getElementById("result");

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

function updateBackground(condition) {
  const body = document.body;
  switch (condition.toLowerCase()) {
    case "clear":
      body.style.backgroundImage = "url('./images/clear.jpg')";
      break;
    case "rain":
      body.style.backgroundImage = "url('./images/rain.jpg')";
      break;
    case "snow":
      body.style.backgroundImage = "url('./images/snow.jpg')";
      break;
    case "clouds":
      body.style.backgroundImage = "url('./images/clouds.jpg')";
      break;
    case "wind":
      body.style.backgroundImage = "url('./images/wind.jpg')";
      break;
    case "smoke":
      body.style.backgroundImage = "url('./images/smoke.jpg')";
      break;
    case "mist":
      body.style.backgroundImage = "url('./images/mist.jpg')";
      break;
    default:
      body.style.backgroundImage = "url('./images/default.jpg')";
      break;
  }
}

window.onload = () => {
  updateBackground("default");
};

getWeatherBtn.addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    resultDiv.innerHTML = "Please enter a city name!";
    return;
  }

  resultDiv.innerHTML = "Loading...";
  const weatherData = await getWeather(city);
  if (weatherData) {
    const { main, weather, name } = weatherData;
    resultDiv.innerHTML = `
            <strong>${name}</strong><br>
            Temperature: ${main.temp}°C<br>
            Condition: ${weather[0].description}
        `;
    updateBackground(weather[0].main);
  } else {
    resultDiv.innerHTML = "City not found. Please try again!";
  }
});
