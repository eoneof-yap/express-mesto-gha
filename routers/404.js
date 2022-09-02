const notFoundRouter = require('express').Router();

const notFound = require('../controllers/404');

notFoundRouter.all('*', notFound);

module.exports = notFoundRouter;
