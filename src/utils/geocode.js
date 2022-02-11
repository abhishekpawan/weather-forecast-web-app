const request = require("request");

const geocode = (address, callback) => {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=6938467492c04edeac641432221102&q=${encodeURIComponent(address)}&days=6&alerts=yes`

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the location services!", undefined);
    } else if (response.body.error) {
      callback(
        response.body.error.message,
        undefined
      );
    } else
      callback(undefined, {
        location: response.body.location,
        current: response.body.current,
        forecast: response.body.forecast.forecastday,
        alert: response.body.alerts
      });
  });
};

module.exports = geocode;
