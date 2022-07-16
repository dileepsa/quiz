const express = require("express");
const { addPlayer } = require("./handlers/addPlayer.js");
const { createServeQuestion } = require("./handlers/createServeQuestion.js");
const { joinHandler } = require("./handlers/joinHandler.js");
const { logRequest } = require("./handlers/logRequest.js");

const createApp = () => {
  const app = express();

  app.use(logRequest);
  app.use(express.urlencoded({ extended: true }));

  const contestsRouter = express.Router();
  app.use('/contests', contestsRouter);
  contestsRouter.get('/:id/join', joinHandler);
  contestsRouter.post('/:id/add-player', addPlayer);
  contestsRouter.get('/:id/', createServeQuestion(`./db/quiz/1.json`));

  app.use(express.static('./public'));
  return app;
};

module.exports = { createApp };
