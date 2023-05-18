const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const STATUS_CODE = require('../errors/errors');

const SALT = 10;

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user.id }, 'secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

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
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, SALT)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => { res.status(201).send(`Пользователь ${user.email} успешно создан`); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(STATUS_CODE.INCORRECT_DATA).send({
          message: 'Переданы некорректные данные при создании пользователя',
        });
      }
      if (err.code === 11000) {
        return res.status(409).send({ message: 'Такой пользователь уже существует ' });
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

const getMyProfileInfo = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch(() => res.status(STATUS_CODE.ERROR).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getMyProfileInfo,
};
