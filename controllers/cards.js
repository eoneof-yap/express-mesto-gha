const Card = require('../models/card');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      res
        .status(500)
        .send({ message: 'Сервер не смог обработать запрос', error: err.message });
    });
};

const createCard = (req, res) => {
  const userId = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner: userId })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Ошибка в запросе', error: err.message });
        return;
      }
      res
        .status(500)
        .send({ message: 'Сервер не смог обработать запрос', error: err.message });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findOneAndDelete({ cardId })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: 'Сервер не смог обработать запрос', error: err.message });
    });
};

const likeCard = (req, res) => {
  const { cardId } = req.body;
  Card.findByIdAndUpdate({ cardId })
    .then((card) => res.status(201).send(card))
    .catch((err) => res.status(500).send(err.message));
};

const unlikeCard = (req, res) => {
  const { cardId } = req.body;
  Card.findByIdAndUpdate({ cardId })
    .then((card) => res.status(200).send(card))
    .catch((err) => res.status(500).send(err.message));
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
