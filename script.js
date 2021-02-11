window.onload = () => {
  setTimeout(() => {
    let preloader = document.querySelector('.preloader');
    preloader.style.display = 'none';
  }, 1000);
};

let currentDate = new Date();
console.log(currentDate);

let dateOptions = { day: 'numeric' };

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

let currentDateNum = currentDate.toLocaleDateString('en-US', dateOptions);

document.querySelector('.local-data__date').textContent =
  getWeekdayName(currentDate) + ', ' + currentDateNum;

let forecastDays = document.querySelectorAll('.day__date');
console.log(forecastDays);
for (let i = 0; i < forecastDays.length; i++) {
  forecastDays[i].textContent = +currentDateNum + i + 1;
}

let forecastIcons = document.querySelectorAll('.day__img');

// document.querySelector(
//   '.local-data__date'
// ).textContent = currentDate.toLocaleDateString('en-US', dateOptions);

fetch(
  'https://api.openweathermap.org/data/2.5/onecall?lat=59.93863&lon=30.31413&exclude=hourly,minutely&appid=3e352cf401fb565c887aab84536ac798'
)
  .then(function (resp) {
    return resp.json();
  })
  // 498817
  .then(function (data) {
    console.log(data);
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

    for (let j = 0; j < forecastIcons.length; j++) {
      forecastIcons[j].src = `https://openweathermap.org/img/wn/${
        data.daily[j + 1].weather[0]['icon']
      }@2x.png`;
    }
  })
  .catch(function () {
    // catch any errors
  });
