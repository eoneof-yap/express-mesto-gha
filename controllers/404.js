const { NOT_FOUND } = require('../utils/constants');

const notFound = (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Путь не найден' });
};

module.exports = notFound;
