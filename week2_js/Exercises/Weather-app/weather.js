//Get the user's location

const getLocation = () => {
  return new Promise(function (resolve, reject) {
    try {
      navigator.geolocation.getCurrentPosition(function (position) {
        resolve(position.coords);
      });
    } catch (e) {
      reject(new Error(e));
    }
  });
};

//get the weather for the user's location
const getWeather = async (coords) => {
  const apiKey = "3e159d6df3f1db6720b886e620ccaa5a";
  const url =
    "http://api.openweathermap.org/data/2.5/weather?lat=" +
    coords.latitude +
    "&lon=" +
    coords.longitude +
    "&apiKey=" +
    apiKey;
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open("GET", url);
    req.onload = function () {
      if (req.status === 200) {
        resolve(JSON.parse(req.response));
      } else {
        reject(new Error(req.statusText));
      }
    };
    req.send();
  });
};

async function getWeatherData() {
  try {
    const coords = await getLocation();
    const weather = await getWeather(coords);
    document.getElementById("weather").innerHTML =
      weather.main.temp + " " + weather.weather[0].description;
    console.log(weather);
  } catch (error) {
    console.error(error);
  }
}

getWeatherData();
