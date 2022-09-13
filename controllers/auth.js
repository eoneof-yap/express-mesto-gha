require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  // TODO: remove secter value
  JWT_SECRET = '41f2274f52d9ad3f094d4378b763b7ad2e870e4a1a283c59c1d91a0a0336b026',
} = process.env;

const {
  CREATED,
  BAD_REQUEST,
  SERVER_ERROR,
  UNAUTHORIZED,
  CONFLICT,
  SALT_ROUDNS,
  EMAIL_EXIST_TEXT,
  SERVER_ERROR_TEXT,
  JWT_EXPIRATION_TIMEOUT,
  REQUEST_ERROR_TEXT,
} = require('../utils/constants');
const User = require('../models/user');

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, SALT_ROUDNS).then((hash) => {
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
          res
            .status(BAD_REQUEST)
            .send({ message: REQUEST_ERROR_TEXT, error: err.message });
          return;
        }

        if (err.code === 11000) {
          res.status(CONFLICT).send({
            message: EMAIL_EXIST_TEXT,
            error: err.message,
          });
          return;
        }

        res.status(SERVER_ERROR).send({
          message: SERVER_ERROR_TEXT,
          error: err.message,
        });
      });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION_TIMEOUT,
      });
      res.send({ token });
    })
    .catch((err) => {
      res.status(UNAUTHORIZED).send({
        message: err.message,
      });
    });
};

module.exports = {
  createUser,
  login,
};
