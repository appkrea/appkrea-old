const api = require('express').Router();

// weather endpoint
const getNearestCity = require('./weather/controllers/getNearestCity');

// weather endpoint
api.get('/weather/city/nearest', getNearestCity);

module.exports = api;
