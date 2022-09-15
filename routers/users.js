const usersRouter = require('express').Router();

const {
  getAllUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

const {
  validateId,
  validateUserInfo,
  validateUserAvatar,
} = require('../middlewares/validators');

usersRouter.get('/users', getAllUsers);
usersRouter.get('/users/me', getCurrentUser);
usersRouter.get('/users/:id', validateId, getUserById);
usersRouter.patch('/users/me', validateUserInfo, updateUser);
usersRouter.patch('/users/me/avatar', validateUserAvatar, updateUserAvatar);

module.exports = usersRouter;
