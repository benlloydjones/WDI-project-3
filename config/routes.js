const router = require('express').Router();
const oauth = require('../controllers/oauth');

router.route('/oauth/meetup')
  .post(oauth.meetup);

module.exports = router;
