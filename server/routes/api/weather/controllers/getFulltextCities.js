const FlexSearch = require('flexsearch');
const cities = require('../data/city.list.json');

const index = new FlexSearch();

for (let i = 0; i < cities.length; i += 1) {
  index.add(i, cities[i].name);
  console.log('s');
}

// eslint-disable-next-line no-unused-vars
module.exports = (req, res) => {
  console.log(req.query.q);
  index.search(req.query.q, {
    limit: 5,
  }, (results) => {
    console.log(results);
    const response = [];
    for (let i = 0; i < results.length; i += 1) {
      response.push(cities[results[i]]);
    }
    res.json(response);
  });
};
