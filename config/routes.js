const router = require('express').Router();
const oauth = require('../controllers/oauth');
const user = require('../controllers/user');
const meetUp = require('../controllers/meetUp');
const comments = require('../controllers/comments');
const googlePlaces = require('../controllers/googlePlaces');
const secureRoute = require('../lib/secureRoute');

router.route('/eventsIndex')
  .get(secureRoute, meetUp.getEvents);

router.route('/eventsShow')
  .get(secureRoute, meetUp.getEvent);

router.route('/eventsShow/rsvps')
  .get(secureRoute, meetUp.getEventRSVP);

router.route('/users')
  .get(secureRoute, user.index);

router.route('/users/:id')
  .get(secureRoute, user.show)
  .put(secureRoute, user.update);

router.route('/oauth/meetup')
  .post(oauth.meetup);

router.route('/comments')
  .get(secureRoute, comments.index)
  .post(secureRoute, comments.create);

router.route('/comments/:id')
  .delete(secureRoute, comments.delete);

router.route('/googlePlaces')
  .get(secureRoute, googlePlaces.getPlaces);

router.route('/usersEvents')
  .get(secureRoute, meetUp.getUsersEvents);

module.exports = router;
