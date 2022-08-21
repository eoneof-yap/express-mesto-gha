const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routers/user');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(userRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
