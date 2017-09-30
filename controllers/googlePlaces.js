const rp = require('request-promise');

function googlePlacesProxy(req, res) {
  rp({
    url: '',
    method: 'GET',
    json: true,
    qs: {
      api_key: process.env.GOOGLE_PLACES_API_KEY,
      latitude: req.query.lat,
      longitude: req.query.lng,
      radius: 5,
      eventcode: req.query.eventcode
    }
  })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));

}

module.exports = {
  proxy: googlePlacesProxy
};
