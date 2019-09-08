const api = require('express').Router();

api.get('/', (req, res) => {
  res.send('api is working');
});

module.exports = api;
