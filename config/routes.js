const router = require('express').Router();
const oauth = require('../controllers/oauth');
<<<<<<< HEAD
const user = require('../controllers/user');
const meetUp = require('../controllers/meetUp');
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
=======
const comments = require('../controllers/comments');
>>>>>>> d67715b572b14432abc3831ae3404b39ffe2f085

router.route('/oauth/meetup')
  .post(oauth.meetup);

router.route('/comments')
  .get(comments.index)
  .post(comments.create);

router.route('/comments/:id')
  .delete(comments.delete);


module.exports = router;
