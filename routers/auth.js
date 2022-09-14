const publicRouter = require('express').Router();

const { validateUserCredentials } = require('../middlewares/validators');
const { login, createUser } = require('../controllers/authorization');

publicRouter.post('/signin', validateUserCredentials, login);
publicRouter.post('/signup', validateUserCredentials, createUser);

module.exports = publicRouter;
