require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const {
  CREATED, BAD_REQUEST, SERVER_ERROR, UNAUTHORIZED,
} = require('../utils/constants');
const User = require('../models/user');

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
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
          res.status(BAD_REQUEST).send({ message: 'Ошибка в запросе', error: err.message });
          return;
        }

        if (err.code === 11000) {
          res
            .status(BAD_REQUEST)
            .send({ message: 'Пользователь с таким email уже существует', error: err.message });
          return;
        }

        res.status(SERVER_ERROR).send({
          message: 'Сервер не смог обработать запрос',
          error: err.message,
        });
      });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
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
