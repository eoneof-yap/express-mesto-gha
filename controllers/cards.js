const {
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  FORBIDDEN,
  SERVER_ERROR_TEXT,
  REQUEST_ERROR_TEXT,
  CARD_NOT_FOUND_TEXT,
  CARD_RESTRICTED_TEXT,
  WRONG_ID_TEXT,
  CARD_DELETED_TEXT,
} = require('../utils/constants');
const Card = require('../models/card');

const getAllCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch((err) => {
      res.status(SERVER_ERROR).send({
        message: SERVER_ERROR_TEXT,
        // TODO: remove error messages in production mode
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
        res.status(BAD_REQUEST).send({ message: REQUEST_ERROR_TEXT, error: err.message });
        return;
      }
      res.status(SERVER_ERROR).send({
        message: SERVER_ERROR_TEXT,
        error: err.message,
      });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: CARD_NOT_FOUND_TEXT });
        return;
      }
      if (userId !== card.owner.toString()) {
        res.status(FORBIDDEN).send({ message: CARD_RESTRICTED_TEXT });
        return;
      }
      card.delete().then(res.send({ message: CARD_DELETED_TEXT }));
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(BAD_REQUEST).send({ message: WRONG_ID_TEXT, error: err.message });
        return;
      }
      res.status(SERVER_ERROR).send({
        message: SERVER_ERROR_TEXT,
        error: err.message,
      });
    });
};

const likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: CARD_NOT_FOUND_TEXT });
        return;
      }
      res.status(CREATED).send({ likes: card });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(BAD_REQUEST).send({ message: WRONG_ID_TEXT, error: err.message });
        return;
      }
      res.status(SERVER_ERROR).send({
        message: SERVER_ERROR_TEXT,
        error: err.message,
      });
    });
};

const unlikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: CARD_NOT_FOUND_TEXT });
        return;
      }
      res.send({ likes: card });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(BAD_REQUEST).send({ message: WRONG_ID_TEXT, error: err.message });
        return;
      }
      res.status(SERVER_ERROR).send({
        message: SERVER_ERROR_TEXT,
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
