const usersRouter = require('express').Router();

const {
  getAllUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

const { validateId, validateUserInfo, validateUserAvatar } = require('../middlewares/validators');

module.exports = usersRouter
  .get('/users', getAllUsers)
  .get('/users/me', getCurrentUser)
  .get('/users/:id', validateId, getUserById)
  .patch('/users/me', validateUserInfo, updateUser)
  .patch('/users/me/avatar', validateUserAvatar, updateUserAvatar);
