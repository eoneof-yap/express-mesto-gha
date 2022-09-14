require('dotenv').config();
const jwt = require('jsonwebtoken');

const {
  // TODO: remove secter value
  JWT_SECRET = '41f2274f52d9ad3f094d4378b763b7ad2e870e4a1a283c59c1d91a0a0336b026',
} = process.env;
const { UNAUTHORIZED, TOKEN_PREFIX, AUTH_REQUIRED_TEXT } = require('../utils/constants');

const handleAuthError = (res) => res.status(UNAUTHORIZED).send({ message: AUTH_REQUIRED_TEXT });
const extractBearerToken = (header) => header.replace('Bearer ', '');

// eslint-disable-next-line consistent-return
const authorize = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith(TOKEN_PREFIX)) {
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
