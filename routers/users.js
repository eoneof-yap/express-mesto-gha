const usersRouter = require('express').Router();

const {
  getAllUsers, getUserById, updateUser, updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getAllUsers);
usersRouter.get('/users/:userId', getUserById);
usersRouter.patch('/users/me', updateUser);
usersRouter.patch('/users/me/avatar', updateUserAvatar);

module.exports = usersRouter;
