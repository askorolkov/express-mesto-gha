const cardsRouter = require('express').Router();

const {
  getCards, createCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

const { onCardCreateValidation, cardIdValidation } = require('../middlewares/validation');

cardsRouter.get('/cards', getCards);

cardsRouter.delete('/cards/:cardId', cardIdValidation, deleteCard);

cardsRouter.post('/cards', onCardCreateValidation, createCard);

cardsRouter.put('/cards/:cardId/likes', cardIdValidation, putLike);

cardsRouter.delete('/cards/:cardId/likes', cardIdValidation, deleteLike);

module.exports = cardsRouter;
