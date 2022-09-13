const usersRouter = require('express').Router();

const {
  getAllUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

const { validateId, validateUserInfo, validateUserAvatar } = require('../middlewares/validators');

usersRouter.get('/users', getAllUsers);
usersRouter.get('/users/:userId', validateId, getUserById);
usersRouter.get('/users/me', validateId, getCurrentUser);
usersRouter.patch('/users/me', validateUserInfo, updateUser);
usersRouter.patch('/users/me/avatar', validateUserAvatar, updateUserAvatar);

module.exports = usersRouter;
