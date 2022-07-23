import './style.css';
import { makeHeader, makeCard, makeDayCard } from './domControl';

const key = '572ce04b970a4b9ed820d19a8cffe3a4';
const place = document.getElementById('location');
const getBtn = document.getElementById('getBtn');

async function getData(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${key}`
    );
    const allData = await response.json();

    // Make master list of dates

    const allDates = [];

    console.log(allData);

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

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
}

async function showWeather() {
  const location = place.value;
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
    data[0][0].clouds.all,
  );

  for (let i = 1; i < 5; i += 1) {

    let maxTemp = 0;
    let minTemp = 1000;

    for (let x = 0; x < data[i].length; x+=1) {
      if (data[i][x].main.temp > maxTemp) {
        maxTemp = data[i][x].main.temp;
      }

      if(data[i][x].main.temp < minTemp) {
        minTemp = data[i][x].main.temp
      }
    }

    console.log(maxTemp)
    console.log(minTemp)


    const date = new Date(data[i][4].dt_txt);
    const summary = data[i][4].weather[0].main;



    makeDayCard(date, maxTemp, minTemp, summary)

  }
}



getBtn.addEventListener('click', showWeather);
