require('dotenv').config();
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

const {
  // TODO: remove secret value
  JWT_SECRET = '41f2274f52d9ad3f094d4378b763b7ad2e870e4a1a283c59c1d91a0a0336b026',
} = process.env;

const {
  UNAUTHORIZED,
  USER_NOT_FOUND_TEXT,
  WRONG_ID_TEXT,
  REQUEST_ERROR_TEXT,
} = require('../utils/constants');

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      next(err);
    });
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(USER_NOT_FOUND_TEXT));
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError(WRONG_ID_TEXT));
        return;
      }
      next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(USER_NOT_FOUND_TEXT));
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError(WRONG_ID_TEXT));
        return;
      }
      next(err);
    });
};

const updateUser = (req, res, next) => {
  const id = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    id,
    { name, about },
    {
      new: true, // return updated record
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError(USER_NOT_FOUND_TEXT));
        return;
      }
      res.send({
        name: user.name,
        about: user.about,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(REQUEST_ERROR_TEXT));
        return;
      }
      if (err.kind === 'ObjectId') {
        next(new BadRequestError(WRONG_ID_TEXT));
        return;
      }
      next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
  const id = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError(USER_NOT_FOUND_TEXT));
        return;
      }
      res.send({ avatar: user.avatar });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError(WRONG_ID_TEXT));
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: 3600 });
      res.send({ token });
    })
    .catch((err) => {
      res.status(UNAUTHORIZED).send({
        message: err.message,
      });
      next(err);
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateUserAvatar,
  login,
};
