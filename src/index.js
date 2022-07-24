import './style.css';
import { makeHeader, makeCard, makeDayCard, resetCard, showError, checkMetric } from './domControl';

const APIkey = '572ce04b970a4b9ed820d19a8cffe3a4';
const place = document.getElementById('location');
const getBtn = document.getElementById('getBtn');
const unitsBtn = document.getElementById('unitsBtn');


let units = 'metric';

async function getData(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${APIkey}`
    );
    const allData = await response.json();

    // Make master list of dates

    const allDates = [];
    allData.list.forEach((item) => {
      if (!allDates.includes(item.dt_txt.slice(0, 10))) {
        allDates.push(item.dt_txt.slice(0, 10));
      }
    });

    const day0 = [];
    const day1 = [];
    const day2 = [];
    const day3 = [];
    const day4 = [];
    const cityData = allData.city;

    allData.list.forEach((item) => {
      switch (item.dt_txt.slice(0, 10)) {
        case allDates[0]:
          day0.push(item);
          break;
        case allDates[1]:
          day1.push(item);
          break;
        case allDates[2]:
          day2.push(item);
          break;
        case allDates[3]:
          day3.push(item);
          break;
        case allDates[4]:
          day4.push(item);
          break;
        default:
          break;
      }
    });
    const data = [day0, day1, day2, day3, day4, cityData];
    return data;
  } catch (error) {
    console.log(error);
    showError();
  }
}

async function showWeather(location) {
  window.localStorage.setItem('lastSearched', location);

  const data = await getData(location);
  makeHeader(data[5].name, data[5].country);
  makeCard(
    data[0][0].weather[0].main,
    data[0][0].weather[0].description,
    data[0][0].main.temp,
    data[0][0].main.feels_like,
    data[0][0].wind.speed,
    data[0][0].wind.gust,
    data[0][0].wind.deg,
    data[0][0].main.humidity,
    data[0][0].clouds.all
  );

  // Make Today Card

  let todayMaxTemp = 0;
  let todayMinTemp = 1000;

  for (let i = 0; i < data[0].length; i += 1) {
    if (data[0][i].main.temp > todayMaxTemp) {
      todayMaxTemp = data[0][i].main.temp;
    }
    if (data[0][i].main.temp < todayMinTemp) {
      todayMinTemp = data[0][i].main.temp;
    }
  }
  makeDayCard(
    Date.now(),
    todayMaxTemp,
    todayMinTemp,
    data[0][0].weather[0].main
  );

  // Make dayCard for remaining 4 days
  for (let i = 1; i < 5; i += 1) {
    let maxTemp = 0;
    let minTemp = 1000;

    for (let x = 0; x < data[i].length; x += 1) {
      if (data[i][x].main.temp > maxTemp) {
        maxTemp = data[i][x].main.temp;
      }

      if (data[i][x].main.temp < minTemp) {
        minTemp = data[i][x].main.temp;
      }
    }

    const date = new Date(data[i][4].dt_txt);
    const summary = data[i][4].weather[0].main;

    makeDayCard(date, maxTemp, minTemp, summary);
  }
}

// Displays last search result if user has visited before
function checkLast() {
  if (window.localStorage.getItem('lastSearched')) {
    const lastSearch = window.localStorage.getItem('lastSearched');
    showWeather(lastSearch);
  } else {
    showWeather('London');
  }
}

function checkUnits() {
  if (window.localStorage.getItem('units')) {
    units = window.localStorage.getItem('units')
  } else {
    window.localStorage.setItem('units', 'metric')
  }
}

function switchUnits() {
  if (window.localStorage.getItem('units') === 'metric') {
    window.localStorage.setItem('units', 'imperial');
  } else {
    window.localStorage.setItem('units', 'metric');
  }

  const location = localStorage.getItem('lastSearched');
  console.log(location)
  resetCard();
  showWeather(location)
}

function searchWeather() {
  const location = place.value;
  resetCard();
  showWeather(location);
}

// Event listeners
place.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    resetCard();
    const location = place.value;
    showWeather(location);
  }
});


getBtn.addEventListener('click', searchWeather);
unitsBtn.addEventListener('click', switchUnits)


// Run on load

checkUnits();
checkLast();



