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
cardsRouter.delete('/cards/:id', validateId, deleteCard);
cardsRouter.put('/cards/:id/likes', validateId, likeCard);
cardsRouter.delete('/cards/:id/likes', validateId, unlikeCard);

module.exports = cardsRouter;
