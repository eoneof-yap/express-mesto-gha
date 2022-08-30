const notFoundRouter = require('express').Router();

const notFound = require('../controllers/404');

notFoundRouter.get('*', notFound);
notFoundRouter.post('*', notFound);
notFoundRouter.put('*', notFound);
notFoundRouter.patch('*', notFound); // github tests require `PATCH` (???)
notFoundRouter.delete('*', notFound);

module.exports = notFoundRouter;
