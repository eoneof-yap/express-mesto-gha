const cardsRouter = require('express').Router();

const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');

const { validateId, validateCardData } = require('../middlewares/validators');
const { methodsNotAllowed } = require('../utils/utils');

cardsRouter
  .get('/cards', getAllCards)
  .post('/cards', validateCardData, createCard)
  .delete('/cards/:id', validateId, deleteCard)
  .put('/cards/:id/likes', validateId, likeCard)
  .delete('/cards/:id/likes', validateId, unlikeCard)
  .all('*', methodsNotAllowed);

module.exports = cardsRouter;
