const { NOT_FOUND } = require('../utils/constants');

const notFound = (req, res, next) => {
  res.status(NOT_FOUND).send({ message: 'Путь не найден' });

  next();
};

module.exports = notFound;
