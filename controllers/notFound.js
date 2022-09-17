const { PATH_NOT_FOUND_TEXT } = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');

module.exports = (req, res, next) => {
  next(new NotFoundError(PATH_NOT_FOUND_TEXT));
};
