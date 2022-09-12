const publicRouter = require('express').Router();

const { login, createUser } = require('../controllers/auth');

publicRouter.post('/login', login);
publicRouter.post('/signup', createUser);

module.exports = publicRouter;
