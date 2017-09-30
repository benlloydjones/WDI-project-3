const router = require('express').Router();
const drinkPlaces = require('../controllers/drinkPlaces');
const secureRoute = require('../lib/secureRoute');

router.route('/drinkPlaces')
  .get(drinkPlaces.index)
  .post(secureRoute, drinkPlaces.create);

router.route('/drinkPlaces/:id')
  .get(drinkPlaces.show)
  .delete(secureRoute, drinkPlaces.delete);

router.route('/drinkPlaces/:id/comments')
  .post(secureRoute, drinkPlaces.addComment);

router.route('/drinkPlaces/:id/comments/:commentId')
  .delete(secureRoute, drinkPlaces.deleteComment);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
