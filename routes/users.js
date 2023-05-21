const usersRouter = require('express').Router();
const {
  getUsers, getUserById, updateAvatar, updateUser, getMyProfileInfo,
} = require('../controllers/users');

const { onUpdateUserInfo, onUpdateUserAvatar, userIdValidation } = require('../middlewares/validation');

usersRouter.get('/', getUsers);

usersRouter.get('/me', getMyProfileInfo);

usersRouter.patch('/me', onUpdateUserInfo, updateUser);

usersRouter.get('/:userId', userIdValidation, getUserById);

usersRouter.patch('/me/avatar', onUpdateUserAvatar, updateAvatar);

module.exports = usersRouter;
