const User = require('../models/user');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ error: err.message }));
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ error: 'Пользователь не найден' });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(400).send({ error: 'Неверный ID', message: err.message });
        return;
      }
      res.status(500).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err._message === 'user validation failed') {
        res.status(400).send({ error: 'Ошибка в запросе' });
        return;
      }
      res.status(500).send({ message: err.message });
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
        res.status(404).send({ error: 'Пользователь не найден' });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(400).send({ error: 'Неверный ID', message: err.message });
        return;
      }
      res.status(500).send({ message: err.message });
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
        res.status(404).send({ error: 'Пользователь не найден' });
        return;
      }
      res.status(200).send({ avatar: user.avatar });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(400).send({ error: 'Неверный ID', message: err.message });
        return;
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
