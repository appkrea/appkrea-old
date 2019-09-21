const request = require('request');
const config = require('../../../../config');

module.exports = (req, res) => {
  const { lat, lon } = req.query;
  const options = {
    method: 'GET',
    url: `https://webcamstravel.p.rapidapi.com/webcams/list/nearby=${lat},${lon},5`,
    qs: {
      lang: 'en',
      show: 'webcams:image,location',
    },
    headers: {
      'x-rapidapi-host': 'webcamstravel.p.rapidapi.com',
      'x-rapidapi-key': config.keys.rapidApi,
    },
  };
  request(options, (error, response, body) => {
    if (error) {
      console.error(error);
    } else {
      res.send(body);
    }
  });
};
