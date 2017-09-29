const router = require('express').Router();
const oauth = require('../controllers/oauth');

router.route('/api/oauth/meetup')
  .post(oauth.meetup);

module.exports = router;
