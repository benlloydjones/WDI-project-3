const rp = require('request-promise');

function googlePlacesProxy(req, res) {
  rp({
    url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=51.5363321,-0.1031599&radius=500&type=bar&key=AIzaSyDHSfv1q1Iy7wE4b_dncrPpXwsKFqrJkh8',
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
