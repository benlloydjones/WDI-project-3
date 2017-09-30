const rp = require('request-promise');

function googlePlacesProxy(req, res) {
  rp({
    url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
    method: 'GET',
    json: true,
    qs: {
      key: process.env.GOOGLE_PLACES_API_KEY,
      location: `${req.query.lat},${req.query.lng}`,
      radius: 500,
      type: req.query.type
    }
  })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));

}

module.exports = {
  proxy: googlePlacesProxy
};
