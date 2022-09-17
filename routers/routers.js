const express = require('express');
const { errors } = require('celebrate');

const routers = express();

const authorize = require('../middlewares/authorize');
const publicRouter = require('./auth');
const userRouter = require('./users');
const cardsRouter = require('./cards');
const notFoundHandler = require('../controllers/notFound');
const notAllowedMethods = require('../controllers/notAllowed');

routers.use(publicRouter);
routers.use(authorize);
routers.use(userRouter); // app.js <= /routes <= /controllers <= /models
routers.use(cardsRouter);
routers.all('*', notAllowedMethods);
routers.use(notFoundHandler);
routers.use(errors());

module.exports = routers;
