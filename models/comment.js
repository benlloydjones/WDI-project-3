const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  text: { type: String, required: true },
  rating: { type: Number, required: true },
  googlePlacesId: { type: String },
  googlePlaceName: { type: String }
});

module.exports = mongoose.model('Comment',  commentsSchema);
