const NotAllowedError = require('../errors/NotAllowedError');
const { METHOD_NOT_ALLOWED_TEXT } = require('./constants');

const methodsNotAllowed = (req, res, next) => {
  next(new NotAllowedError(METHOD_NOT_ALLOWED_TEXT));
};

module.exports = { methodsNotAllowed };
