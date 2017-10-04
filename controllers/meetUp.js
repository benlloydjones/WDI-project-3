const rp = require('request-promise');

function meetUpGetEventsProxy(req, res) {
  rp({
    url: 'https://api.meetup.com/find/events',
    method: 'GET',
    json: true,
    qs: {
      access_token: req.query.access_token,
      latitude: req.query.lat,
      longitude: req.query.lon,
      radius: req.query.radius
    }
  })
    .then(response => res.json(response))
    .catch(err => res.json(err));
}

function meetUpGetEventProxy(req,res) {
  rp({
    url: `https://api.meetup.com/${req.query.group}/events/${req.query.eventId}`,
    method: 'GET',
    json: true
  })
    .then(response => res.json(response))
    .catch(err => res.json(err));
}

function meetUpGetEventRSVPProxy(req, res) {
  rp({
    url: `https://api.meetup.com/${req.query.group}/events/${req.query.eventId}/rsvps`,
    method: 'GET',
    json: true
  })
    .then(response => res.json(response))
    .catch(err => res.json(err));
}


module.exports = {
  getEvents: meetUpGetEventsProxy,
  getEvent: meetUpGetEventProxy,
  getEventRSVP: meetUpGetEventRSVPProxy
};


// https://api.meetup.com/howdo-london/events/241877723
