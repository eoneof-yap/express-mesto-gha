const { NOT_ALLOWED } = require('../utils/constants');

class NotAllowedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_ALLOWED;
  }
}

module.exports = NotAllowedError;
