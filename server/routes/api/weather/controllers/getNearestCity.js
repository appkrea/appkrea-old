const cities = require('../data/city.list.json');
const calculateDistance = require('../utilities/calculateDistance');

module.exports = (req, res) => {
  const { lat, lon } = req.query;
  let nearestPlace = {};
  for (let i = 0; i < cities.length; i += 1) {
    const place = cities[i];
    place.distance = calculateDistance(lat, lon, place.coord.lat, place.coord.lon);
    if (Object.keys(nearestPlace).length === 0 || nearestPlace.distance >= place.distance) {
      nearestPlace = place;
    }
  }
  res.send(nearestPlace);
};
