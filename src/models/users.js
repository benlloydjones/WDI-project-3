const mongoose = require('mongoose');


const usersSchema = new mongoose.Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  passwordConfirmation: { type: String, required: true, unique: true }
});


module.exports = mongoose.model('User',  usersSchema);
