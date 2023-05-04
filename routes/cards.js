const cardsRouter = require('express').Router();
const {
  getCards, createCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);

cardsRouter.delete('/cards/:cardId', deleteCard);

cardsRouter.post('/cards', createCard);

cardsRouter.put('/cards/:cardId/likes', putLike);

cardsRouter.delete('/cards/:cardId/likes', deleteLike);

module.exports = cardsRouter;
