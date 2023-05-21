const usersRouter = require('express').Router();
const {
  getUsers, getUserById, updateAvatar, updateUser, getMyProfileInfo,
} = require('../controllers/users');

const { onUpdateUserInfo, onUpdateUserAvatar, userIdValidation } = require('../middlewares/validation');

usersRouter.get('/users', getUsers);

usersRouter.get('/users/me', getMyProfileInfo);

usersRouter.get('/users/:userId', userIdValidation, getUserById);

usersRouter.patch('/users/me/avatar', onUpdateUserAvatar, updateAvatar);

usersRouter.patch('/users/me', onUpdateUserInfo, updateUser);

module.exports = usersRouter;
