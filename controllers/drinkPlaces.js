const DrinkPlace = require('../models/drinkPlace');

function indexRoute(req, res, next) {
  DrinkPlace
    .find()
    .populate('')
    .exec()
    .then((drinkPlaces) => res.json(drinkPlaces))
    .catch(next);
}

function showRoute(req, res, next) {
  DrinkPlace
    .findById(req.params.id)
    .populate('')
    .exec()
    .then((drinkPlace) => {
      if(!drinkPlace) return res.notFound();

      return res.json(drinkPlace);
    })
    .catch(next);
}

function addCommentRoute(req, res, next) {
  console.log('drinkPlace');
  req.body.createdBy = req.currentUser;

  DrinkPlace
    .findById(req.params.id)
    .exec()
    .then((drinkPlace) => {
      if(!drinkPlace) return res.notFound();

      const comment = drinkPlace.comments.create(req.body);
      drinkPlace.comments.push(comment);

      return drinkPlace.save()
        .then(() => res.json(comment));
    })
    .catch(next);
}

function deleteCommentRoute(req, res, next) {
  DrinkPlace
    .findById(req.params.id)
    .exec()
    .then((drinkPlace) => {
      if(!drinkPlace) return res.notFound();

      const comment = drinkPlace.comments.id(req.params.commentId);
      comment.remove();

      return drinkPlace.save();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  addComment: addCommentRoute,
  deleteComment: deleteCommentRoute
};
