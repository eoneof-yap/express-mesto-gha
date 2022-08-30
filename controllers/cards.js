const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
} = require('../utils/constants');
const Card = require('../models/card');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(OK).send(cards))
    .catch((err) => {
      res.status(SERVER_ERROR).send({
        message: 'Сервер не смог обработать запрос',
        error: err.message,
      });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATED).send(card))
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

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(OK).send(card);
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

const likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(OK).send({ likes: card.likes });
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

const unlikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(OK).send({ likes: card.likes });
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
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
