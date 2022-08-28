const Card = require('../models/card');
const user = require('../models/user');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createCard = (req, res) => {
  const { title, link, userId } = req.body;
  Card.create({ title, link, owner: userId })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const deleteCard = (req, res) => {
  const { id } = req.body;
  Card.delete({ id })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const likeCard = (req, res) => {
  const { id } = req.body;
  Card.findByIdAndUpdate({ id })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const unlikeCard = (req, res) => {
  const { id } = req.body;
  Card.findByIdAndUpdate({ id })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};