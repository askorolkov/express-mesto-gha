const usersRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUsers, getUserById, updateAvatar, updateUser, getMyProfileInfo,
} = require('../controllers/users');

usersRouter.get('/users', auth, getUsers);

usersRouter.get('/users/me', auth, getMyProfileInfo);

usersRouter.get('/users/:userId', auth, getUserById);

usersRouter.patch('/users/me/avatar', auth, updateAvatar);

usersRouter.patch('/users/me', auth, updateUser);

module.exports = usersRouter;
