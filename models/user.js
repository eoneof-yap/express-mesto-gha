const mongoose = require('mongoose');

const { DEFAULT_NAME, DEFAULT_ABOUT, DEFAULT_AVATAR } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    default: DEFAULT_NAME,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    default: DEFAULT_ABOUT,
  },
  avatar: {
    type: String,
    required: true,
    default: DEFAULT_AVATAR,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

module.exports = mongoose.model('user', userSchema);
