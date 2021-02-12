window.onload = () => {
  setTimeout(() => {
    let preloader = document.querySelector('.preloader');
    preloader.style.display = 'none';
  }, 1000);
};

function getWeekdayName(date) {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return weekdays[date.getDay()];
}

const weatherBackgrounds = {
  Rain: 'img/rain-bg.jpg',
  Snow: 'img/snowy-bg.png',
  Clear: 'img/clear-bg.png',
  Clouds: 'img/cloudy-bg.png',
};

let forecastIcons = document.querySelectorAll('.day__img');
let forecastHighestTemp = document.querySelectorAll('.day__highest-temp');
let forecastLowestTemp = document.querySelectorAll('.day__lowest-temp');

// document.querySelector(
//   '.local-data__date'
// ).textContent = currentDate.toLocaleDateString('en-US', dateOptions);

const forecastDates = document.querySelectorAll('.day__date');

const forecastDays = document.querySelectorAll('.day');

function applyDataToLi(li, liData) {
  li.querySelector(
    '.day__img'
  ).src = `https://openweathermap.org/img/wn/${liData.weather[0].icon}@2x.png`;

  let tempMax = liData.temp.max - 273;
  tempMax = Math.round(tempMax);
  li.querySelector('.day__highest-temp').innerHTML = tempMax;

  let tempMin = liData.temp.min - 273;
  tempMin = Math.round(tempMin);
  li.querySelector('.day__lowest-temp').innerHTML = tempMin;
}

fetch(
  'https://api.openweathermap.org/data/2.5/onecall?lat=59.93863&lon=30.31413&exclude=hourly,minutely&appid=3e352cf401fb565c887aab84536ac798'
)
  .then(function (resp) {
    return resp.json();
  })
  // 498817
  .then(function (data) {
    console.log(data);

    let unixData = data.current.dt;
    let date = new Date(unixData * 1000);

    let currentDateNum = date.toLocaleDateString('en-US', {
      day: 'numeric',
    });
    document.querySelector('.local-data__date').textContent =
      getWeekdayName(date) + ', ' + currentDateNum;

    for (let i = 0; i < forecastDates.length; i++) {
      forecastDates[i].textContent = +currentDateNum + i + 1;
    }

    document.querySelector('.current__temperature-range').innerHTML =
      Math.round(data.daily[0].temp.min - 273) +
      '&deg;' +
      ' C ' +
      '/ ' +
      Math.round(data.daily[0].temp.max - 273) +
      '&deg;' +
      ' C';
    document.querySelector('.current__temperature').innerHTML =
      Math.round(data.current.temp - 273) + '&deg;' + ' C';
    document.querySelector('.current__weather').textContent =
      data.current.weather[0]['description'];
    document.querySelector('.current__feeling').innerHTML =
      'Feels like: ' +
      ' ' +
      Math.round(data.current['feels_like'] - 273) +
      '&deg;' +
      ' C';
    document.querySelector(
      '.current__img'
    ).src = `https://openweathermap.org/img/wn/${data.current.weather[0]['icon']}@2x.png`;
    document.querySelector('.humidity').textContent =
      data.current['humidity'] + '%';
    document.querySelector('.pressure').textContent =
      data.current['pressure'] + ' pmh';
    document.querySelector('.wind').textContent =
      data.current['wind_speed'] + ' m/s';
    // if (data.weather[0].main in weatherBackgrounds) {
    //   document.querySelector('.inner-container').style.backgroundImage =
    //     "url('" + weatherBackgrounds[data.weather[0].main] + "')";
    // }

    for (let j = 0; j < forecastDays.length; j++) {
      applyDataToLi(forecastDays[j], data.daily[j + 1]);
    }
    // applyDataToLi(document.querySelector('.day'), data.daily[1]);

    // for (let j = 0; j < forecastIcons.length; j++) {
    //   forecastIcons[j].src = `https://openweathermap.org/img/wn/${
    //     data.daily[j + 1].weather[0].icon
    //   }@2x.png`;
    // }

    // for (let k = 0; k < forecastHighestTemp.length; k++) {
    //   let tempMax = data.daily[k + 1].temp.max - 273;
    //   tempMax = Math.round(tempMax);
    //   forecastHighestTemp[k].innerHTML = tempMax;
    // }
  })
  .catch(function () {
    // catch any errors
  });
