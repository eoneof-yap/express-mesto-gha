const publicRouter = require('express').Router();

const { validateUserCredentials } = require('../middlewares/validators');
const { login, createUser } = require('../controllers/authorization');
const { methodsNotAllowed } = require('../utils/utils');

publicRouter
  .post('/signin', validateUserCredentials, login)
  .post('/signup', validateUserCredentials, createUser)
  .all('*', methodsNotAllowed);
module.exports = publicRouter;
