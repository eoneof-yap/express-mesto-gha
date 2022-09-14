require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  // TODO: remove secret value
  JWT_SECRET = '41f2274f52d9ad3f094d4378b763b7ad2e870e4a1a283c59c1d91a0a0336b026',
} = process.env;

const {
  CREATED,
  SALT_ROUNDS,
  EMAIL_EXIST_TEXT,
  JWT_EXPIRATION_TIMEOUT,
  BAD_REQUEST_TEXT,
  DB_DUPLICATE_KEY_CODE,
} = require('../utils/constants');
const User = require('../models/user');
const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, SALT_ROUNDS).then((hash) => {
    User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => res.status(CREATED).send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new ValidationError(BAD_REQUEST_TEXT));
          return;
        }

        if (err.code === DB_DUPLICATE_KEY_CODE) {
          next(new ConflictError(EMAIL_EXIST_TEXT));
          return;
        }
        next(err);
      });
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION_TIMEOUT,
      });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createUser,
  login,
};
