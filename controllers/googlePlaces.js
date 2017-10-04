const rp = require('request-promise');

function getPlaces(req, res, next) {
  rp({
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.lat},${req.query.lng}&radius=${req.query.radius}&type=${req.query.type}&key=AIzaSyDHSfv1q1Iy7wE4b_dncrPpXwsKFqrJkh8`,
    method: 'GET',
    json: true
  })
    .then(response => res.json(response))
    .catch(next);
}

module.exports = {
  getPlaces
};
