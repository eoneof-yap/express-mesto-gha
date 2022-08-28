const userRouter = require('express').Router();

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/userss', getAllUsers);
userRouter.get('/users/:userId', getUser);
userRouter.post('/users', createUser);
userRouter.patch('/users/me', updateUser);
userRouter.patch('/users/me/avatar', updateUserAvatar);

module.exports = userRouter;
