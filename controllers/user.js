const User = require('../models/user');

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate('friends')
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      return res.json(user);
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  User
    .findByIdAndUpdate(req.params.id, req.body)
    .then(response => res.json(response))
    .catch(next);
}

function indexRoute(req, res, next) {
  User
    .find()
    .exec()
    .then((users) => {
      if(!users) return res.notFournd();
      return res.json(users);
    })
    .catch(next);
}

module.exports = {
  show: showRoute,
  update: updateRoute,
  index: indexRoute
};
