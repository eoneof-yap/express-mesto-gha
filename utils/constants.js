// Server status codes
const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

// TODO: remove
const tempAuth = (req, res, next) => {
  req.user = {
    _id: '630d25a903576ab62032ca24',
  };

  next();
};

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  tempAuth,
};
