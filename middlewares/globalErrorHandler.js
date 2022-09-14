const { SERVER_ERROR, SERVER_ERROR_TEXT } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    message: statusCode === SERVER_ERROR ? SERVER_ERROR_TEXT : message,
  });

  next();
};

module.exports = errorHandler;
