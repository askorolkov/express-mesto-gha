const usersRouter = require('express').Router();
const { getUsers,getUserById,createUser, updateAvatar, updateUser} = require('../controllers/users');

usersRouter.get('/users', getUsers )

usersRouter.get('/users/:userId', getUserById )

usersRouter.post('/users', createUser )

usersRouter.patch('/users/me/avatar', updateAvatar)


usersRouter.patch('/users/me', updateUser)

module.exports = usersRouter;

