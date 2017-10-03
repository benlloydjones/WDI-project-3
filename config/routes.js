const router = require('express').Router();
const oauth = require('../controllers/oauth');
const user = require('../controllers/user');
// const secureRoute = require('../lib/secureRoute');

router.route('/users')
  .get(user.index);

router.route('/users/:id')
  .get(user.show)
  .put(user.update);

router.route('/oauth/meetup')
  .post(oauth.meetup);

module.exports = router;
