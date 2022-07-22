const key = '572ce04b970a4b9ed820d19a8cffe3a4';
const place = document.getElementById('location');
const getBtn = document.getElementById('getBtn');

async function getData(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`
    );
    const allData = await response.json();

    const data = {
      err: allData.message,
      name: allData.name,
      main: allData.main,
      visibility: allData.visibility,
      wind: allData.wind,
      description: allData.weather[0].description,
    };
    return data;
  } catch (error) {
    console.log(error);
    console.log('working?');
  }
}

async function getWeather() {
  const weatherData = await getData(place.value);

  console.log(weatherData);
}

getBtn.addEventListener('click', getWeather);
