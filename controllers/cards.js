const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => {
      res.status(500).send({
        message: 'Произошла ошибка',
      });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при создании карточки',
        });
      }
      return res.status(500).send({
        message: 'Произошла ошибка',
      });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId, { new: true, runValidators: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({
          message: 'Карточка с таким ID не найдена',
        });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при удалении карточки',
        });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({
          message: 'Карточка с таким ID не найдена',
        });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при постановке лайка карточки',
        });
      }
      return res.status(500).send({
        message: 'Произошла ошибка',
      });
    });
};

const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({
          message: 'Карточка с таким ID не найдена',
        });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при постановке лайка карточки',
        });
      }
      return res.status(500).send({
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
