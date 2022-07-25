import { format } from 'date-fns';

// Checks if user preference is metric or imperial units
export function checkMetric() {
  if (window.localStorage.getItem('units') === 'metric') {
    return true;
  }
  return false;
}

// Creates location header bar
export function makeHeader(place, country) {
  const mainHeader = document.getElementById('mainHeader');
  const location = document.createElement('h2');
  location.innerText = `${place}, ${country}`;
  mainHeader.appendChild(location);
}

// Converts Kelvin to Celcius
function tempMetric(temp) {
  return Math.round(temp - 273);
}

// Converts Kelvin to Farenheiht
function tempImperial(temp) {
  return Math.round((9 / 5) * (temp - 273) + 32);
}

// Displays upper portion of page with current weather information
export function showCurrentWeather(
  current,
  description,
  temperature,
  feelsLike,
  windSpeed,
  windGust,
  windDirection,
  humidity,
  cloudCoverage
) {
  const body = document.getElementById('mainBody');

  const card = document.createElement('div');
  card.setAttribute('id', 'card');
  card.classList.add('card');

  const currentLogo = document.createElement('div');
  currentLogo.classList.add('bigIcon');

  switch (current) {
    case 'Clouds':
      currentLogo.innerHTML =
        '<span class="material-symbols-outlined">cloud</span>';
      break;
    case 'Clear':
      currentLogo.innerHTML =
        '<span class="material-symbols-outlined">clear_day</span>';
      break;
    case 'Rain':
      currentLogo.innerHTML =
        '<span class="material-symbols-outlined">rainy</span>';
      break;
    case 'Snowing':
      currentLogo.innerHTML =
        '<span class="material-symbols-outlined">cloudy_snowing</span>';
      break;

    default:
      currentLogo.innerHTML = current;
      break;
  }

  card.appendChild(currentLogo);

  const currentStatsBox = document.createElement('div');
  currentStatsBox.classList.add('logoBox');

  card.appendChild(currentStatsBox);

  const currentStats = document.createElement('div');
  currentStats.classList.add('currentStats');
  currentStatsBox.appendChild(currentStats);

  const descriptionLabel = document.createElement('div');
  descriptionLabel.textContent = 'Current Weather:';
  currentStats.appendChild(descriptionLabel);

  const descriptionText = document.createElement('div');
  descriptionText.textContent =
    description.slice(0, 1).toUpperCase() + description.slice(1);
  currentStats.appendChild(descriptionText);

  const tempLabel = document.createElement('div');
  tempLabel.textContent = 'Temperature:';
  currentStats.appendChild(tempLabel);

  const tempText = document.createElement('div');

  if (checkMetric()) {
    tempText.innerHTML = `${tempMetric(feelsLike)}&#176;C`;
  } else {
    tempText.innerHTML = `${tempImperial(feelsLike)}&#176;F`;
  }

  currentStats.appendChild(tempText);

  const feelsLabel = document.createElement('div');
  feelsLabel.textContent = 'Feels Like:';
  currentStats.appendChild(feelsLabel);

  const feelsText = document.createElement('div');

  if (checkMetric()) {
    feelsText.innerHTML = `${tempMetric(temperature)}&#176;C`;
  } else {
    feelsText.innerHTML = `${tempImperial(temperature)}&#176;F`;
  }

  currentStats.appendChild(feelsText);

  const windSpeedLabel = document.createElement('div');
  windSpeedLabel.textContent = 'Wind Speed:';
  currentStats.appendChild(windSpeedLabel);

  const windSpeedText = document.createElement('div');

  if (checkMetric()) {
    windSpeedText.textContent = `${Math.round(
      windSpeed * 3.6
    )} kph (gusting ${Math.round(windGust * 3.6)} kph)`;
  } else {
    windSpeedText.textContent = `${Math.round(
      windSpeed * 2.237
    )} mph (gusting ${Math.round(windGust * 2.237)} mph)`;
  }

  currentStats.appendChild(windSpeedText);

  const windDirectionLabel = document.createElement('div');
  windDirectionLabel.textContent = 'Wind Direction:';
  currentStats.appendChild(windDirectionLabel);

  const windDirectionBox = document.createElement('div');
  windDirectionBox.classList.add('windArrow');

  const windArrow = document.createElement('div');
  windArrow.innerHTML = '&#8595;';
  windArrow.style.transform = `rotate(${windDirection}deg)`;
  windDirectionBox.appendChild(windArrow);
  currentStats.appendChild(windDirectionBox);

  const humidityLabel = document.createElement('div');
  humidityLabel.textContent = 'Humidity:';
  currentStats.appendChild(humidityLabel);

  const humidityText = document.createElement('div');
  humidityText.innerHTML = `${humidity}%`;
  currentStats.appendChild(humidityText);

  const cloudCoverageLabel = document.createElement('div');
  cloudCoverageLabel.textContent = 'Cloud Coverage:';
  currentStats.appendChild(cloudCoverageLabel);

  const cloudCoverageText = document.createElement('div');
  cloudCoverageText.innerHTML = `${cloudCoverage}%`;
  currentStats.appendChild(cloudCoverageText);

  const dayCardsDiv = document.createElement('div');
  dayCardsDiv.setAttribute('id', 'dayCards');
  dayCardsDiv.classList.add('dayCards');
  card.appendChild(dayCardsDiv);

  body.appendChild(card);
}

// Creates smaller card for each day with date, min/max temp and weather symbol (at midday)
export function makeDayCard(date, maxTemp, minTemp, weather) {
  const dayCard = document.createElement('div');
  dayCard.classList.add('dayCard');

  const dateBar = document.createElement('div');

  if (date === 'Today') {
    dateBar.innerText = 'Today';
  } else {
    dateBar.innerText = format(date, 'E do');
  }

  dateBar.innerText = format(date, 'E do');
  dayCard.appendChild(dateBar);

  const maxTemperature = document.createElement('div');

  if (checkMetric()) {
    maxTemperature.innerHTML = `${tempMetric(maxTemp)}&#176;C max`;
  } else {
    maxTemperature.innerHTML = `${tempImperial(maxTemp)}&#176;F max`;
  }

  dayCard.appendChild(maxTemperature);

  const minTemperature = document.createElement('div');

  if (checkMetric()) {
    minTemperature.innerHTML = `${tempMetric(minTemp)}&#176;C min `;
  } else {
    minTemperature.innerHTML = `${tempImperial(minTemp)}&#176;F min`;
  }

  dayCard.appendChild(minTemperature);

  const logo = document.createElement('div');
  logo.classList.add('dayLogo');
  dayCard.appendChild(logo);

  switch (weather) {
    case 'Clouds':
      logo.innerHTML = '<span class="material-symbols-outlined">cloud</span>';
      break;
    case 'Clear':
      logo.innerHTML =
        '<span class="material-symbols-outlined">clear_day</span>';
      break;
    case 'Rain':
      logo.innerHTML = '<span class="material-symbols-outlined">rainy</span>';
      break;
    case 'Snowing':
      logo.innerHTML =
        '<span class="material-symbols-outlined">cloudy_snowing</span>';
      break;

    default:
      logo.innerHTML = weather;
      break;
  }

  const box = document.getElementById('dayCards');
  box.appendChild(dayCard);
}

// Clears main body of page
export function clearResults() {
  document.getElementById('mainHeader').innerHTML = '';
  const mainBody = document.getElementById('mainBody');
  mainBody.innerHTML = '';
}

// Shows error msg on page if API cannot find requested location
export function showError() {
  clearResults();
  const mainBody = document.getElementById('mainBody');
  const errorMsg = document.createElement('div');
  errorMsg.textContent =
    'Error: location not found. Please check spelling and search again, or try searching with format "location, country-code".';
  mainBody.appendChild(errorMsg);
}
