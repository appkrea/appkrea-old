const api = require('express').Router();

// weather endpoint
const getNearestCity = require('./weather/controllers/getNearestCity');
const getFulltextCities = require('./weather/controllers/getFulltextCities');

// weather endpoint
api.get('/weather/city/nearest', getNearestCity);
api.get('/weather/city/fulltext', getFulltextCities);

module.exports = api;
