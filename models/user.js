const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  this.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject(new Error('Неправильные почта или пароль'));
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return user;
    });
  });
};

module.exports = mongoose.model('user', userSchema);
