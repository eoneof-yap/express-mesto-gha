const publicRouter = require('express').Router();

const { validateUserCredentials } = require('../middlewares/validators');
const { login, createUser } = require('../controllers/authorization');

module.exports = publicRouter
  .post('/signin', validateUserCredentials, login)
  .post('/signup', validateUserCredentials, createUser);
