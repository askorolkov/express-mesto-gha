const router = require('express').Router();
const STATUS_CODE = require('../errors/errors');

const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use(usersRouter);
router.use(cardsRouter);

router.use('/*', (req, res) => {
  res.status(STATUS_CODE.NOT_FOUND).send({ message: 'Page not found' });
});

module.exports = router;
