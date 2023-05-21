const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthErr');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AuthError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'secret');
  } catch (err) {
    return next(new AuthError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
