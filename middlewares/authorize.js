require('dotenv').config();
const jwt = require('jsonwebtoken');

const {
  TOKEN_PREFIX,
  AUTH_REQUIRED_TEXT,
  TOKEN_EXPIRED_TEXT,
} = require('../utils/constants');

const UnauthorizedError = require('../errors/UnauthorizedError');

const {
  // TODO: remove secter value
  JWT_SECRET = '41f2274f52d9ad3f094d4378b763b7ad2e870e4a1a283c59c1d91a0a0336b026',
} = process.env;

// eslint-disable-next-line consistent-return
const authorize = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith(TOKEN_PREFIX)) {
    next(new UnauthorizedError(AUTH_REQUIRED_TEXT));
    return;
  }

  const token = authorization.replace(TOKEN_PREFIX, '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError(TOKEN_EXPIRED_TEXT));
    return;
  }
  req.user = payload;

  next();
};

module.exports = authorize;
