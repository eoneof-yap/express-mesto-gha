require('dotenv').config();
const process = require('process');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { requestLogger } = require('./utils/loggers');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const notFoundHandler = require('./controllers/notFound');
const routers = require('./routers/routers');
const {
  DB_CONNECTED_TEXT,
  SERVER_STARTED_TEXT,
  DB_NOT_CONNECTED_TEXT,
  SERVER_START_FAILED_TEXT,
} = require('./utils/constants');

const { PORT = 3000, DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(requestLogger);

app.use(express.json()); // body-parser is bundled with Express >4.16
app.use(express.urlencoded({ extended: true }));

app.use(routers);

app.use(notFoundHandler);
app.use(errors());

async function main() {
  try {
    await mongoose.connect(DB_ADDRESS);
    console.log(DB_CONNECTED_TEXT);
    await app.listen(PORT);
    console.log(`${SERVER_STARTED_TEXT} ${PORT}`);
  } catch (err) {
    console.log(DB_NOT_CONNECTED_TEXT, err);
    console.log(SERVER_START_FAILED_TEXT);
  }
}

main();

app.use(globalErrorHandler);

process.on('uncaughtException', (err, origin) => {
  console.warn(
    `${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`,
  );
});
