const mongoose = require('mongoose');


const commentsSchema = new mongoose.Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  text: { type: String, required: true, unique: true },
  rating: { type: Number, required: true, unique: true },
  googlePlacesId: { type: String }
});

module.exports = mongoose.model('Comment',  commentsSchema);
