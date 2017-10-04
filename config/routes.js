const router = require('express').Router();
const oauth = require('../controllers/oauth');
const comments = require('../controllers/comments');

router.route('/oauth/meetup')
  .post(oauth.meetup);

router.route('/comments')
  .get(comments.index)
  .post(comments.create);

router.route('/comments/:id')
  .delete(comments.delete);


module.exports = router;
