const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');

const BadRequestError = require('../errors/BadRequest');

const urlValidation = function (url) {
  if (isUrl(url)) {
    return url;
  }
  throw new BadRequestError('Некорректный адрес URL');
};

module.exports.onUserLoginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.onUserCreateValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(urlValidation),
  }),
});

module.exports.onUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.onUpdateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(urlValidation),
  }),
});

module.exports.onCardCreateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
});
