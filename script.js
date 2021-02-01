let currentDate = new Date();

let dateOptions = { month: 'long', day: 'numeric' };

function getWeekday(date) {
  let weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return weekdays[date.getDay()];
}

document.querySelector('.main-footer__weekday').textContent = getWeekday(
  currentDate
);

document.querySelector(
  '.main-footer__date'
).textContent = currentDate.toLocaleDateString('en-US', dateOptions);

fetch(
  'http://api.openweathermap.org/data/2.5/weather?id=498817&appid=3e352cf401fb565c887aab84536ac798'
)
  .then(function (resp) {
    return resp.json();
  })
  .then(function (data) {
    console.log(data);
    document.querySelector('.main-header__city').textContent = data.name;
    document.querySelector('.top-section__temperature-range').innerHTML =
      Math.round(data.main.temp_min - 273) +
      '&deg;' +
      ' C ' +
      '/ ' +
      Math.round(data.main.temp_max - 273) +
      '&deg;' +
      ' C';
    document.querySelector('.top-section__temperature-current').innerHTML =
      Math.round(data.main.temp - 273) + '&deg;' + ' C';
    document.querySelector('.top-section__weather').textContent =
      data.weather[0]['description'];
    document.querySelector(
      '.weather-image__img'
    ).src = `https://openweathermap.org/img/wn/${data.weather[0]['icon']}@4x.png`;
    document.querySelector('.humidity').textContent =
      data.main['humidity'] + '%';
    document.querySelector('.wind').textContent = data.wind['speed'] + ' m/s';
  })
  .catch(function () {
    // catch any errors
  });