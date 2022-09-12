const publicRouter = require('express').Router();

const { login, createUser } = require('../controllers/auth');

publicRouter.post('/signin', login);
publicRouter.post('/signup', createUser);

module.exports = publicRouter;
