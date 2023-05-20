const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');
const NotFoundError = require('./errors/NotFound');
const auth = require('./middlewares/auth');

const { onUserCreateValidation, onUserLoginValidation } = require('./middlewares/validation');

const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

app.post('/signin', onUserLoginValidation, login);
app.post('/signup', onUserCreateValidation, createUser);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Page not found'));
});
app.use(auth);
app.use(router);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
