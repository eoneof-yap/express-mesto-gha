const usersRouter = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
} = require('../controllers/users');

usersRouter.get('/users', getAllUsers);
usersRouter.get('/users/:userId', getUserById);
usersRouter.post('/users', createUser);
usersRouter.patch('/users/me', updateUser);
usersRouter.patch('/users/me/avatar', updateUserAvatar);

usersRouter.post('/login', login);

module.exports = usersRouter;
