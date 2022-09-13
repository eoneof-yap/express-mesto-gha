const cardsRouter = require('express').Router();

const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');

const { validateId, validateCardData } = require('../middlewares/validators');

cardsRouter.get('/cards', getAllCards);
cardsRouter.post('/cards', validateCardData, createCard);
cardsRouter.delete('/cards/:cardId', validateId, deleteCard);
cardsRouter.put('/cards/:cardId/likes', validateId, likeCard);
cardsRouter.delete('/cards/:cardId/likes', validateId, unlikeCard);

module.exports = cardsRouter;
