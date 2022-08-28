const cardsRouter = require('express').Router();

const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');

cardsRouter.get('/cards', getAllCards);
cardsRouter.post('/cards', createCard);
cardsRouter.get('/cards/:cardId', deleteCard);
cardsRouter.patch('/cards/:cardId', likeCard);
cardsRouter.patch('/cards/:cardId', unlikeCard);

module.exports = cardsRouter;
