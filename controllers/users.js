const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
} = require('../utils/constants');
const User = require('../models/user');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(OK).send(users))
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
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Неверный ID', error: err.message });
        return;
      }
      res.status(SERVER_ERROR).send({
        message: 'Сервер не смог обработать запрос',
        error: err.message,
      });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(CREATED).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Ошибка в запросе', error: err.message });
        return;
      }
      res.status(SERVER_ERROR).send({
        message: 'Сервер не смог обработать запрос',
        error: err.message,
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
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Ошибка в запросе', error: err.message });
        return;
      }
      if (err.kind === 'ObjectId') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Неверный ID', error: err.message });
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
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Неверный ID', error: err.message });
        return;
      }
      res.status(SERVER_ERROR).send({
        message: 'Сервер не смог обработать запрос',
        error: err.message,
      });
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
