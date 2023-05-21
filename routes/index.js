const router = require('express').Router();
const NotFoundError = require('../errors/NotFound');

const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страницае найдена'));
});

module.exports = router;
