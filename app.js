const process = require('process');
const express = require('express');
const mongoose = require('mongoose');

const { requestLogger } = require('./utils/loggers');
const userRouter = require('./routers/users');
const cardsRouter = require('./routers/cards');
const notFoundRouter = require('./routers/404');

const app = express();
const { PORT = 3000 } = process.env;

app.use(requestLogger);

app.use(express.json()); // body-parser is bundled with Express >4.16
app.use(express.urlencoded({ extended: true }));

// hardcoded user id
app.use((req, res, next) => {
  req.user = {
    _id: '630d25a903576ab62032ca24',
  };

  next();
});

app.use(userRouter); // app.js <= /routes <= /controllers <= /models
app.use(cardsRouter);
app.use(notFoundRouter);

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
    console.log('Database connected');
    await app.listen(PORT);
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    console.error('Database not connected \nERROR:', err);
    console.error('Server not started');
  }
}

main();
