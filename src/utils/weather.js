const request = require("request");

const weather = (latitude, longitude, location, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=3bc6f990f4505d22d46411d43ec555bf&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback(undefined, "Unable to connect to the weather services!");
    } else if (response.body.error) {
      callback(undefined, "Unable to find location");
    } else
      callback({
        Location:location,
        Weather_descriptions: response.body.current.weather_descriptions[0],
        Temperature: response.body.current.temperature,
        Feels_like:response.body.current.feelslike
      },
        undefined
      );
  });
};

module.exports = weather;
