const Comment = require('../models/comment');

function commentsIndex(req, res, next) {
  Comment.find(req.query)
    .populate('user')
    .exec()
    .then(comments => res.json(comments))
    .catch(next);
}

function commentsCreate(req, res, next) {
  // req.body.user = req.currentUser;
  Comment.create(req.body)
    .then(comment => res.json(comment))
    .catch(next);
}

function commentsDelete(req, res, next) {
  Comment.findById(req.params.id)
    .exec()
    .then(comment => {
      if(!comment) res.notFound();
      return comment.remove();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: commentsIndex,
  create: commentsCreate,
  delete: commentsDelete
};
