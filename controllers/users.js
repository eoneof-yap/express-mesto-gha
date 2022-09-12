require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const {
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  UNAUTHORIZED,
} = require('../utils/constants');
const User = require('../models/user');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      res.status(SERVER_ERROR).send({
        message: 'Сервер не смог обработать запрос',
        error: err.message,
      });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(BAD_REQUEST).send({ message: 'Неверный ID', error: err.message });
        return;
      }
      res.status(SERVER_ERROR).send({
        message: 'Сервер не смог обработать запрос',
        error: err.message,
      });
    });
};

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

const updateUser = (req, res) => {
  const id = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    id,
    { name, about },
    {
      new: true, // return updated record
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send({
        name: user.name,
        about: user.about,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Ошибка в запросе', error: err.message });
        return;
      }
      if (err.kind === 'ObjectId') {
        res.status(BAD_REQUEST).send({ message: 'Неверный ID', error: err.message });
        return;
      }
      res.status(SERVER_ERROR).send({
        message: 'Сервер не смог обработать запрос',
        error: err.message,
      });
    });
};

const updateUserAvatar = (req, res) => {
  const id = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send({ avatar: user.avatar });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(BAD_REQUEST).send({ message: 'Неверный ID', error: err.message });
        return;
      }
      res.status(SERVER_ERROR).send({
        message: 'Сервер не смог обработать запрос',
        error: err.message,
      });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: 3600 });
      res.send({ token });
    })
    .catch((err) => {
      res.status(UNAUTHORIZED).send({
        message: err.message,
      });
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
};
