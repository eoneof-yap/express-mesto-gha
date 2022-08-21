const userRouter = require('express').Router();

userRouter.get('/users', (req, res) => {
  res.send(req.query);
});

userRouter.get('/users/:userId', (req, res) => {
  res.send(req.params.userId);
});

userRouter.post('/users', (req, res) => {
  res.send(req.query);
});

module.exports = userRouter;
