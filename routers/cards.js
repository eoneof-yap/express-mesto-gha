const express = require('express');
const userRouter = require('express').Router();

userRouter.get('/cards', (req, res) => {
  res.send(req.query);
});

userRouter.post('/cards', express.json(), (req, res) => {
  res.send(req.query);
});

userRouter.delete('/cards/:cardId', (req, res) => {
  res.send(req.params.cardId);
});

userRouter.put('/cards/:cardId/likes', (req, res) => {
  res.send(req.params.cardId);
});

userRouter.delete('/cards/:cardId/likes', (req, res) => {
  res.send(req.params.userId);
});

module.exports = userRouter;
