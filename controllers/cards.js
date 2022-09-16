const Card = require('../models/card');

const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');

const {
  CREATED,
  BAD_REQUEST_TEXT,
  CARD_NOT_FOUND_TEXT,
  CARD_RESTRICTED_TEXT,
  WRONG_ID_TEXT,
  CARD_DELETED_TEXT,
} = require('../utils/constants');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      next(err);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(BAD_REQUEST_TEXT);
      }

      next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card.findById(id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(CARD_NOT_FOUND_TEXT);
      }
      if (req.user._id !== card.owner.toString()) {
        throw new ForbiddenError(CARD_RESTRICTED_TEXT);
      }
      card.delete().then(res.send({ message: CARD_DELETED_TEXT }));
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(BadRequestError(WRONG_ID_TEXT));
        return;
      }

      next(err);
    });
};

const likeCard = (req, res, next) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(id, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        next(new NotFoundError(CARD_NOT_FOUND_TEXT));
        return;
      }
      res.status(CREATED).send({ likes: card });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(BadRequestError(WRONG_ID_TEXT));
        return;
      }
      next(err);
    });
};

const unlikeCard = (req, res, next) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(id, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        next(new NotFoundError(CARD_NOT_FOUND_TEXT));
        return;
      }
      res.send({ likes: card });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(BadRequestError(WRONG_ID_TEXT));
        return;
      }
      next(err);
    });
};
module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
