require('dotenv').config();
const process = require('process');
const express = require('express');
const mongoose = require('mongoose');

const { requestLogger } = require('./utils/loggers');
const publicRouter = require('./routers/auth');
const authorize = require('./middlewares/auth');
const userRouter = require('./routers/users');
const cardsRouter = require('./routers/cards');
const notFoundRouter = require('./routers/404');

const { PORT = 3000, DB_ADDRESS } = process.env;

const app = express();

app.use(requestLogger);

app.use(express.json()); // body-parser is bundled with Express >4.16
app.use(express.urlencoded({ extended: true }));

app.use(publicRouter);
app.use(notFoundRouter);

app.use(authorize);

app.use(userRouter); // app.js <= /routes <= /controllers <= /models
app.use(cardsRouter);
app.use(notFoundRouter);

async function main() {
  try {
    await mongoose.connect(DB_ADDRESS);
    console.log('База данных подключена');
    await app.listen(PORT);
    console.log(`Сервер запущен на ${PORT} порту`);
  } catch (err) {
    console.log('Не удалось подключить базу данных \nERROR:', err);
    console.log('Сервер не запустился');
  }
}

main();
