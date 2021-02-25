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

const backgroundsDesktopDay = {
  Rain: 'img/backgrounds/rain.jpg',
  Drizzle: 'img/backgrounds/rain.jpg',
  Thunderstorm: 'img/backgrounds/thunder.jpg',
  Snow: 'img/backgrounds/snow.jpg',
  Clear: 'img/backgrounds/clear.jpg',
  Clouds: 'img/backgrounds/clouds.jpg',
  Mist: 'img/backgrounds/smoke.jpg',
  Smoke: 'img/backgrounds/smoke.jpg',
  Haze: 'img/backgrounds/smoke.jpg',
  Fog: 'img/backgrounds/smoke.jpg',
  Sand: 'img/backgrounds/sand.jpg',
  Dust: 'img/backgrounds/sand.jpg',
  Ash: 'img/backgrounds/ash.jpg',
  Squall: 'img/backgrounds/squalls.jpg',
  Tornado: 'img/backgrounds/tornado.jpg',
};

const backgroundsMobileDay = {
  Rain: 'img/backgrounds/rain-mob.jpg',
  Drizzle: 'img/backgrounds/rain-mob.jpg',
  Thunderstorm: 'img/backgrounds/thunder-mob.jpg',
  Snow: 'img/backgrounds/snow-mob.jpg',
  Clear: 'img/backgrounds/clear-mob.jpg',
  Clouds: 'img/backgrounds/clouds-mob.jpg',
  Mist: 'img/backgrounds/smoke-mob.jpg',
  Smoke: 'img/backgrounds/smoke-mob.jpg',
  Haze: 'img/backgrounds/smoke-mob.jpg',
  Fog: 'img/backgrounds/smoke-mob.jpg',
  Sand: 'img/backgrounds/sand-mob.jpg',
  Dust: 'img/backgrounds/sand-mob.jpg',
  Ash: 'img/backgrounds/ash-mob.jpg',
  Squall: 'img/backgrounds/squalls-mob.jpg',
  Tornado: 'img/backgrounds/tornado-mob.jpg',
};

const backgroundsDesktopNight = {
  Rain: 'img/backgrounds/rain-night.jpg',
  Drizzle: 'img/backgrounds/rain-night.jpg',
  Thunderstorm: 'img/backgrounds/thunder-night.jpg',
  Snow: 'img/backgrounds/snow-night.jpg',
  Clear: 'img/backgrounds/clear-night.jpg',
  Clouds: 'img/backgrounds/clouds-night.jpg',
  Mist: 'img/backgrounds/smoke-night.jpg',
  Smoke: 'img/backgrounds/smoke-night.jpg',
  Haze: 'img/backgrounds/smoke-night.jpg',
  Fog: 'img/backgrounds/smoke-night.jpg',
  Sand: 'img/backgrounds/sand-night.jpg',
  Dust: 'img/backgrounds/sand-night.jpg',
  Ash: 'img/backgrounds/ash.jpg',
  Squall: 'img/backgrounds/squalls.jpg',
  Tornado: 'img/backgrounds/tornado.jpg',
};

const backgroundsMobileNight = {
  Rain: 'img/backgrounds/rain-night-mob.jpg',
  Drizzle: 'img/backgrounds/rain-night-mob.jpg',
  Thunderstorm: 'img/backgrounds/thunder-night-mob.jpg',
  Snow: 'img/backgrounds/snow-night-mob.jpg',
  Clear: 'img/backgrounds/clear-night-mob.jpg',
  Clouds: 'img/backgrounds/clouds-night-mob.jpg',
  Mist: 'img/backgrounds/smoke-night-mob.jpg',
  Smoke: 'img/backgrounds/smoke-night-mob.jpg',
  Haze: 'img/backgrounds/smoke-night-mob.jpg',
  Fog: 'img/backgrounds/smoke-night-mob.jpg',
  Sand: 'img/backgrounds/sand-night-mob.jpg',
  Dust: 'img/backgrounds/sand-night-mob.jpg',
  Ash: 'img/backgrounds/ash-mob.jpg',
  Squall: 'img/backgrounds/squalls-mob.jpg',
  Tornado: 'img/backgrounds/tornado-mob.jpg',
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

      let currentHour = date.getHours();

      if (currentHour > 6 && currentHour < 20) {
        if ((window, innerWidth >= 900)) {
          document.documentElement.style.backgroundImage =
            "url('" +
            backgroundsDesktopDay[data.current.weather[0].main] +
            "')";
        } else {
          document.documentElement.style.backgroundImage =
            "url('" + backgroundsMobileDay[data.current.weather[0].main] + "')";
        }
      } else {
        if ((window, innerWidth >= 900)) {
          document.documentElement.style.backgroundImage =
            "url('" +
            backgroundsDesktopNight[data.current.weather[0].main] +
            "')";
        } else {
          document.documentElement.style.backgroundImage =
            "url('" +
            backgroundsMobileNight[data.current.weather[0].main] +
            "')";
        }
      }

      for (let j = 0; j < forecastDays.length; j++) {
        applyDataToLi(forecastDays[j], data.daily[j + 1]);
      }

      imagesLoaded(
        document.documentElement,
        { background: true },
        function (instance) {
          console.log('all images are loaded');
          let preloader = document.querySelector('.preloader');
          preloader.style.display = 'none';
        }
      );
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
