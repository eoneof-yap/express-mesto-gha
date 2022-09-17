const { METHOD_NOT_ALLOWED_TEXT } = require('../utils/constants');
const NotAllowedError = require('../errors/NotAllowedError');

module.exports = (req, res, next) => {
  next(new NotAllowedError(METHOD_NOT_ALLOWED_TEXT));
  next();
};
