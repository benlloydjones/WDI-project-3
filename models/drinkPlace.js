const mongoose = require('mongoose');

const drinkPlaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  food: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  lat: Number,
  lng: Number,
  rating: { type: Number }
});

module.exports = mongoose.model('drinkPlace', drinkPlaceSchema);
