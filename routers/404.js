const notFoundRouter = require('express').Router();

const notFound = require('../controllers/404');

notFoundRouter.get('*', notFound);

module.exports = notFoundRouter;
