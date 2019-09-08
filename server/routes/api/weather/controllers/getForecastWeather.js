const request = require('request');
const config = require('../../../../config');

module.exports = (req, res) => {
  const { id } = req.query;
  request(`https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=${config.keys.openWeatherMap}`, (error, response, body) => {
    res.send(body);
  });
};
