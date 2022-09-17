require('dotenv').config();
const process = require('process');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();
const { PORT = 3000, DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const routers = require('./routers/routers');
const notFoundHandler = require('./controllers/notFound');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const { requestLogger, eventLogger, errorLogger } = require('./utils/loggers');

const {
  DB_CONNECTED_TEXT,
  SERVER_STARTED_TEXT,
  DB_NOT_CONNECTED_TEXT,
  SERVER_START_FAILED_TEXT,
} = require('./utils/constants');

app.use(limiter);
app.use(helmet.hidePoweredBy());
app.use(requestLogger);

app.use(express.json()); // body-parser is bundled with Express >4.16
app.use(express.urlencoded({ extended: true }));

app.use(routers);

app.use(notFoundHandler);
app.use(errors());

async function main() {
  try {
    await mongoose.connect(DB_ADDRESS);
    eventLogger(DB_CONNECTED_TEXT);
    await app.listen(PORT);
    eventLogger(`${SERVER_STARTED_TEXT} ${PORT}`);
  } catch (err) {
    errorLogger(DB_NOT_CONNECTED_TEXT);
    errorLogger(SERVER_START_FAILED_TEXT);
  }
}

main();

app.use(globalErrorHandler);

process.on('uncaughtException', (err, origin) => {
  errorLogger(
    `${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`,
  );
});
