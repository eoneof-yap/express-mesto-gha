const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

const {
  USER_NOT_FOUND_TEXT,
  WRONG_ID_TEXT,
  BAD_REQUEST_TEXT,
} = require('../utils/constants');

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      next(err);
    });
};

const getUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        next(NotFoundError(USER_NOT_FOUND_TEXT));
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError(WRONG_ID_TEXT));
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
        next(new BadRequestError(BAD_REQUEST_TEXT));
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
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_TEXT));
        return;
      }
      if (err.kind === 'ObjectId') {
        next(new BadRequestError(WRONG_ID_TEXT));
        return;
      }
      next(err);
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateUserAvatar,
};
