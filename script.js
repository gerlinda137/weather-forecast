/*Получение геолокации юзера */

navigator.geolocation.getCurrentPosition(onLocationSucceed, onLocationFailed);

function onLocationSucceed(position) {
  fetchWeather(position.coords.latitude, position.coords.longitude);
  fetchLocation(position.coords.latitude, position.coords.longitude);
}

function onLocationFailed() {
  alert(
    'Please make sure that you allowed geolocation info for this app and enabled geolocation on your device. For now, check the weather in Saint-Petersburg, Russia'
  );
  fetchWeather(59.9342802, 30.3350986);
}

// navigator.geolocation.getCurrentPosition(function (position) {
//   fetchWeather(position.coords.latitude, position.coords.longitude);
//   fetchLocation(position.coords.latitude, position.coords.longitude);
// });

/////////////////////////////////////////

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

const forecastDates = document.querySelectorAll('.day__date');

const forecastDays = document.querySelectorAll('.day');

function applyDataToLi(li, liData) {
  li.querySelector('.day__weekday').textContent = getWeekdayName(
    new Date(liData.dt * 1000)
  );

  li.querySelector('.day__date').textContent = new Date(
    liData.dt * 1000
  ).toLocaleDateString('en-US', {
    day: 'numeric',
  });

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

function fetchWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=3e352cf401fb565c887aab84536ac798`
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data);

      let unixData = data.current.dt;
      let date = new Date(unixData * 1000);

      let currentDateNum = date.toLocaleDateString('en-US', {
        day: 'numeric',
      });
      document.querySelector('.local-data__date').textContent =
        getWeekdayName(date) + ', ' + currentDateNum;

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

      imagesLoaded(document.body, { background: true }, function (instance) {
        console.log('all images are loaded');
        let preloader = document.querySelector('.preloader');
        preloader.style.display = 'none';
      });
    })
    .catch(function () {
      document.querySelector('.preloader').style.display = 'none';
      document.querySelector('.weather-load-error').style.display = 'flex';
    });
}

function fetchLocation(lat, lon) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=eng`
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data);

      if (data.city == '') {
        document.querySelector('.local-data__city').textContent = data.locality;
      } else {
        document.querySelector('.local-data__city').textContent =
          data.city + ', ' + data.locality;
      }
    })
    .catch(function () {
      // catch any errors
    });
}
