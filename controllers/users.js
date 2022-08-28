const User = require('../models/user');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ users }))
    .catch((err) => res.status(500).send(err.message));
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => res.status(200).send({ user }))
    .catch((err) => res.status(500).send(err.message));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ user }))
    .catch((err) => res.status(500).send(err.message));
};

const updateUser = (req, res) => {
  const { id, name, about } = req.body;
  User.findByIdAndUpdate({ id, name, about })
    .then((user) => res.status(201).send({ user }))
    .catch((err) => res.status(500).send(err.message));
};

const updateUserAvatar = (req, res) => {
  const { id, avatar } = req.body;
  User.findByIdAndUpdate({ id, avatar })
    .then((user) => res.status(201).send({ user }))
    .catch((err) => res.status(500).send(err.message));
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
