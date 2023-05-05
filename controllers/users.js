const User = require('../models/user');
const STATUS_CODE = require('../errors/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      res.status(STATUS_CODE.ERROR).send({
        message: 'Произошла ошибка',
      });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(STATUS_CODE.NOT_FOUND).send({
          message: 'Пользователь с таким ID не найден',
        });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(STATUS_CODE.INCORRECT_DATA).send({
          message: 'Некорректный ID пользователя',
        });
      }
      return res.status(STATUS_CODE.ERROR).send({
        message: 'Произошла ошибка',
      });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(STATUS_CODE.INCORRECT_DATA).send({
          message: 'Переданы некорректные данные при создании пользователя',
        });
      }
      return res.status(STATUS_CODE.ERROR).send({
        message: 'Произошла ошибка',
      });
    });
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(STATUS_CODE.NOT_FOUND).send({
          message: 'Пользователь с таким ID не найден',
        });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(STATUS_CODE.INCORRECT_DATA).send({
          message: 'Переданы некорректные данные при обновлении данных пользователя',
        });
      }
      return res.status(STATUS_CODE.ERROR).send({
        message: 'Произошла ошибка',
      });
    });
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res.status(STATUS_CODE.NOT_FOUND).send({
          message: 'Пользователь с таким ID не найден',
        });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(STATUS_CODE.INCORRECT_DATA).send({
          message: 'Переданы некорректные данные при обновлении данных пользователя',
        });
      }
      return res.status(STATUS_CODE.ERROR).send({
        message: 'Произошла ошибка',
      });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
