const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const STATUS_CODE = require('./errors/errors');

const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

app.use(router);

router.post('/signin', login);
router.post('/signup', createUser);

router.use('*', (req, res) => {
  res.status(STATUS_CODE.NOT_FOUND).send({ message: 'Page not found' });
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
