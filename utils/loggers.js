const getTimeStamp = () => new Date().toUTCString();

// Console colors

const red = '\x1b[31m';
const blue = '\x1b[34m';
const yellow = '\x1b[33m';

const errorLogger = (message) => {
  console.log(red, `${getTimeStamp()} ${message}`);
};

const eventLogger = (message) => {
  console.log(yellow, `${getTimeStamp()} ${message}`);
};

const requestLogger = (req, res, next) => {
  console.log(blue, `${getTimeStamp()} ${req.method} ${req.url}`);
  next();
};

module.exports = { requestLogger, eventLogger, errorLogger };
