const process = require('process');
const express = require('express');
const mongoose = require('mongoose');

const { requestLogger } = require('./utils/loggers');
const userRouter = require('./routers/users');
const cardsRouter = require('./routers/cards');

const app = express();
const { PORT = 3000 } = process.env;

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error('Database not connected \nERROR:', err);
  });

app.use(requestLogger);

app.use(express.json()); // body-parser is bundled with Express >4.16
app.use(express.urlencoded({ extended: true }));

app.use(userRouter); // app.js <= /routes <= /controllers <= /models
app.use(cardsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('uncaughtException', (err, origin) => {
  console.log(
    `${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`,
  );
});
