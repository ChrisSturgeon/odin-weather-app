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

    // allData.list.forEach((item) => {
    //   if (item.dt_txt.slice(0, 10) === allDates[0]) {
    //     day0.push(item);
    //   }
    // })

    // console.log(day0)

    allData.list.forEach((item) => {
      switch(item.dt_txt.slice(0, 10)) {
        case allDates[0]:
          day0.push(item)
          break
        case allDates[1]:
          day1.push(item)
          break
        case allDates[2]:
          day2.push(item)
          break
        case allDates[3]:
          day3.push(item)
          break
        case allDates[4]:
          day4.push(item)
          break
        default:
          break
      }
    })

    const data = [day0, day1, day2, day3, day4]

    console.log(data);

    // const data = {
    //   name: allData.name,
    //   cloudCoverage: allData.clouds.all,
    //   main: allData.main,
    //   visibility: allData.visibility,
    //   wind: allData.wind,
    //   description: allData.weather[0].description,
    // };

    return data;
  } catch (error) {
    console.log(error);
    // const errorBox = document.getElementById('errorBox');
    // errorBox.innerText = 'Big Old Error';
  }
}

async function getWeather() {
  const weatherData = await getData(place.value);

}

getBtn.addEventListener('click', getWeather);
