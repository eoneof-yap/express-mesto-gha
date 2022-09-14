const { NOT_FOUND, PATH_NOT_FOUND_TEXT } = require('../utils/constants');

module.exports = (req, res, next) => {
  res.status(NOT_FOUND).send({ message: PATH_NOT_FOUND_TEXT });

  next();
};

// class NotFoundError extends Error {
//   constructor(message) {
//     super(message);
//     this.statusCode = NOT_FOUND;
//   }
// }

// module.exports = NotFoundError;
