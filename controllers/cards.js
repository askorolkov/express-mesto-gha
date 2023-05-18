const Card = require('../models/card');
const STATUS_CODE = require('../errors/errors');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => {
      res.status(STATUS_CODE.ERROR).send({
        message: 'Произошла ошибка',
      });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(STATUS_CODE.CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(STATUS_CODE.INCORRECT_DATA).send({
          message: 'Переданы некорректные данные при создании карточки',
        });
      }
      return res.status(STATUS_CODE.ERROR).send({
        message: 'Произошла ошибка',
      });
    });
};

const deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(STATUS_CODE.NOT_FOUND).send({
          message: 'Карточка с таким ID не найдена',
        });
      }
      if (card.owner._id.toString() !== req.user._id) {
        return res.send({ message: 'Нельзя удалить карточку другого пользователя ' });
      }
      return Card.findByIdAndDelete(req.params.cardId)
        .then((card) => {
          res.send(`Карточка ${card.id} успешно удалена`);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(STATUS_CODE.INCORRECT_DATA).send({ message: 'Переданы некорректные данные при удалении карточки' });
      }
      return res.status(STATUS_CODE.ERROR).send({ message: 'Произошла ошибка' });
    });
};

const putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        res.status(STATUS_CODE.NOT_FOUND).send({
          message: 'Карточка с таким ID не найдена',
        });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(STATUS_CODE.INCORRECT_DATA).send({
          message: 'Переданы некорректные данные при постановке лайка карточки',
        });
      }
      return res.status(STATUS_CODE.ERROR).send({
        message: 'Произошла ошибка',
      });
    });
};

const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        res.status(STATUS_CODE.NOT_FOUND).send({
          message: 'Карточка с таким ID не найдена',
        });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(STATUS_CODE.INCORRECT_DATA).send({
          message: 'Переданы некорректные данные при постановке лайка карточки',
        });
      }
      return res.status(STATUS_CODE.ERROR).send({
        message: 'Произошла ошибка',
      });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
};
