const cardsRouter = require('express').Router();

const {
  getCards, createCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

const { onCardCreateValidation, cardIdValidation } = require('../middlewares/validation');

cardsRouter.get('/', getCards);

cardsRouter.post('/', onCardCreateValidation, createCard);

cardsRouter.delete('/:cardId', cardIdValidation, deleteCard);

cardsRouter.put('/:cardId/likes', cardIdValidation, putLike);

cardsRouter.delete('/:cardId/likes', cardIdValidation, deleteLike);

module.exports = cardsRouter;
