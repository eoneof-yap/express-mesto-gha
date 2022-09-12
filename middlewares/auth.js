require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const { UNAUTHORIZED } = require('../utils/constants');

const handleAuthError = (res) => res.status(UNAUTHORIZED).send({ message: 'Необходима авторизация' });
const extractBearerToken = (header) => header.replace('Bearer ', '');

// eslint-disable-next-line consistent-return
const authorize = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  }
  req.user = payload;

  next();
};

module.exports = authorize;
