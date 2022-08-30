const { NOT_FOUND } = require('../utils/constants');

const notFound = (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Страница не найдена' });
};

module.exports = notFound;
