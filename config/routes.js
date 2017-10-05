const router = require('express').Router();
const oauth = require('../controllers/oauth');
const user = require('../controllers/user');
const meetUp = require('../controllers/meetUp');
const comments = require('../controllers/comments');
const googlePlaces = require('../controllers/googlePlaces');
// const secureRoute = require('../lib/secureRoute');

router.route('/eventsIndex')
  .get(meetUp.getEvents);

router.route('/eventsShow')
  .get(meetUp.getEvent);

router.route('/eventsShow/rsvps')
  .get(meetUp.getEventRSVP);

router.route('/users')
  .get(user.index);

router.route('/users/:id')
  .get(user.show)
  .put(user.update);

router.route('/oauth/meetup')
  .post(oauth.meetup);

router.route('/comments')
  .get(comments.index)
  .post(comments.create);

router.route('/comments/:id')
  .delete(comments.delete);

router.route('/googlePlaces')
  .get(googlePlaces.getPlaces);

router.route('/usersEvents')
  .get(meetUp.getUsersEvents);

module.exports = router;
