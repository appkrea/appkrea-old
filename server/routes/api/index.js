const api = require('express').Router();

// weather endpoint
const getNearestCity = require('./weather/controllers/getNearestCity');
const getFulltextCities = require('./weather/controllers/getFulltextCities');
const getCurrentWeather = require('./weather/controllers/getCurrentWeather');
const getForecastWeather = require('./weather/controllers/getForecastWeather');
const getCurrentUV = require('./weather/controllers/getCurrentUV');
const getWebcams = require('./weather/controllers/getWebcams');

// weather endpoint
api.get('/weather/city/nearest', getNearestCity);
api.get('/weather/city/fulltext', getFulltextCities);
api.get('/weather/current', getCurrentWeather);
api.get('/weather/forecast', getForecastWeather);
api.get('/weather/uv', getCurrentUV);
api.get('/weather/webcams', getWebcams);

module.exports = api;
