const request = require('request');
const config = require('../../../../config');

module.exports = (req, res) => {
  const { lat, lon } = req.query;
  request(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${config.keys.openWeatherMap}`, (error, response, body) => {
    res.send(body);
  });
};
