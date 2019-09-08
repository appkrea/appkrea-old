const api = require('express').Router();

// weather endpoint
const getNearestCity = require('./weather/controllers/getNearestCity');
const getFulltextCities = require('./weather/controllers/getFulltextCities');
const getCurrentWeather = require('./weather/controllers/getCurrentWeather');
const getForecastWeather = require('./weather/controllers/getForecastWeather');

// weather endpoint
api.get('/weather/city/nearest', getNearestCity);
api.get('/weather/city/fulltext', getFulltextCities);
api.get('/weather/current', getCurrentWeather);
api.get('/weather/forecast', getForecastWeather);

module.exports = api;
