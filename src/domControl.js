import { format } from 'date-fns'

export function makeHeader(place, country) {
  const mainHeader = document.getElementById('mainHeader');
  const location = document.createElement('h2');
  location.innerText = `${place}, ${country}`;
  mainHeader.appendChild(location);
}

export function makeCard(
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
  card.classList.add('card');

  const currentLogo = document.createElement('div');
  currentLogo.classList.add('bigIcon')


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
  descriptionLabel.textContent = 'Current weather:';
  currentStats.appendChild(descriptionLabel);

  const descriptionText = document.createElement('div');
  descriptionText.textContent =
    description.slice(0, 1).toUpperCase() + description.slice(1);
  currentStats.appendChild(descriptionText);

  const tempLabel = document.createElement('div');
  tempLabel.textContent = 'Temperature:';
  currentStats.appendChild(tempLabel);

  const tempText = document.createElement('div');
  tempText.innerHTML = `${Math.round(temperature - 273)}&#176;C`;
  currentStats.appendChild(tempText);

  const feelsLabel = document.createElement('div');
  feelsLabel.textContent = 'Feels like:';
  currentStats.appendChild(feelsLabel);

  const feelsText = document.createElement('div');
  feelsText.innerHTML = `${Math.round(feelsLike - 273)}&#176;C`;
  currentStats.appendChild(feelsText);

  const windSpeedLabel = document.createElement('div');
  windSpeedLabel.textContent = 'Wind speed:';
  currentStats.appendChild(windSpeedLabel);

  const windSpeedText = document.createElement('div');
  windSpeedText.textContent = `${Math.round(
    windSpeed * 2.237
  )} mph (gusting ${Math.round(windGust * 2.237)} mph)`;
  currentStats.appendChild(windSpeedText);

  const windDirectionLabel = document.createElement('div');
  windDirectionLabel.textContent = 'Wind direction:';
  currentStats.appendChild(windDirectionLabel);

  const windDirectionArrow = document.createElement('div');
  windDirectionArrow.innerHTML = `${windDirection}&#176;`;
  currentStats.appendChild(windDirectionArrow);

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

export function makeDayCard(date, maxTemp, minTemp, weather) {
  const card = document.createElement('div');
  card.classList.add('dayCard');

  const dateBar = document.createElement('div');
  dateBar.innerText = format(date, 'E do');
  card.appendChild(dateBar);

  const maxTemperature = document.createElement('div');
  maxTemperature.innerHTML = `${Math.round(maxTemp - 273)}&#176;C max`;
  card.appendChild(maxTemperature);

  const minTemperature = document.createElement('div');
  minTemperature.innerHTML = `${Math.round(minTemp - 273)}&#176;C min`;
  card.appendChild(minTemperature);

  const logo = document.createElement('div');
  logo.classList.add('dayLogo');
  card.appendChild(logo);

  switch (weather) {
    case 'Clouds':
      logo.innerHTML =
        '<span class="material-symbols-outlined">cloud</span>';
      break;
    case 'Clear':
      logo.innerHTML =
        '<span class="material-symbols-outlined">clear_day</span>';
      break;
    case 'Rain':
      logo.innerHTML =
        '<span class="material-symbols-outlined">rainy</span>';
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
  box.appendChild(card);
}
