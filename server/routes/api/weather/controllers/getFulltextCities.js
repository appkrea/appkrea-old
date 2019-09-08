const Fuse = require('fuse.js');
const cities = require('../data/city.list.json');

// eslint-disable-next-line no-unused-vars
module.exports = (req, res) => {
  const fuse = new Fuse(cities, {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      'name',
    ],
  });
  res.send(fuse.search((req.query.q)).slice(0, 10));
};
