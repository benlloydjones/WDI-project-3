const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  meetUpId: { type: Number, required: true, unique: true },
  friends: [ { type: mongoose.Schema.ObjectId, ref: 'User' } ],
  accessToken: { type: String },
  picture: { type: String },
  name: { type: String }
});

module.exports = mongoose.model('User',  usersSchema);
