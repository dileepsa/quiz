const express = require("express");
const { addPlayer } = require("./handlers/addPlayer.js");
const { createServeQuestion } = require("./handlers/createServeQuestion.js");
const { joinHandler } = require("./handlers/joinHandler.js");
const { logRequest } = require("./handlers/logRequest.js");
const { createValidateHandler } = require("./handlers/validateResponses.js");

const createApp = () => {
  const app = express();

  app.use(logRequest);
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  const contestsRouter = express.Router();
  app.use('/contests', contestsRouter);
  contestsRouter.get('/:id/join', joinHandler);
  contestsRouter.post('/:id/add-player', addPlayer);
  contestsRouter.get('/:id/', createServeQuestion(`./db/quiz/1.json`));
  contestsRouter.post('/:id/validate', createValidateHandler(`./db/quiz/1.json`));


  app.use(express.static('./public'));
  return app;
};

module.exports = { createApp };
