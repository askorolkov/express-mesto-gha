const cardsRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getCards, createCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

cardsRouter.get('/cards', auth, getCards);

cardsRouter.delete('/cards/:cardId', auth, deleteCard);

cardsRouter.post('/cards', auth, createCard);

cardsRouter.put('/cards/:cardId/likes', auth, putLike);

cardsRouter.delete('/cards/:cardId/likes', auth, deleteLike);

module.exports = cardsRouter;
