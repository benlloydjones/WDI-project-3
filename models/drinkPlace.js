const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: '', required: true }
});

const drinkPlaceSchema = new mongoose.Schema({
  image: { type: String, required: true },
  description: { type: String, required: true },
  lat: Number,
  lng: Number,
  comments: [commentSchema]
});

module.exports = mongoose.model('drinkPlace', drinkPlaceSchema);
