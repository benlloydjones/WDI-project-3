const rp = require('request-promise');

function meetUpGetEventsProxy(req, res, next) {
  rp({
    url: 'https://api.meetup.com/find/events',
    method: 'GET',
    json: true,
    qs: {
      access_token: req.query.access_token,
      latitude: req.query.lat,
      longitude: req.query.lon,
      radius: req.query.radius,
      fields: 'group_key_photo'
    }
  })
    .then(response => res.json(response))
    .catch(next);
}

function meetUpGetEventProxy(req, res, next) {
  rp({
    url: `https://api.meetup.com/${req.query.group}/events/${req.query.eventId}`,
    method: 'GET',
    qs: {
      fields: 'group_key_photo'
    },
    json: true
  })
    .then(response => res.json(response))
    .catch(next);
}

function meetUpGetEventRSVPProxy(req, res, next) {
  rp({
    url: `https://api.meetup.com/${req.query.group}/events/${req.query.eventId}/rsvps`,
    method: 'GET',
    json: true
  })
    .then(response => res.json(response))
    .catch(next);
}


module.exports = {
  getEvents: meetUpGetEventsProxy,
  getEvent: meetUpGetEventProxy,
  getEventRSVP: meetUpGetEventRSVPProxy
};


// https://api.meetup.com/howdo-london/events/241877723
