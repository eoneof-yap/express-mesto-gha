const notFoundRouter = require('express').Router();

const notFound = require('../controllers/404');

notFoundRouter.patch('*', notFound);

module.exports = notFoundRouter;
