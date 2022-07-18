const express = require("express");
const cookieParser = require('cookie-parser');
const cookieSession = require("cookie-session");
const morgan = require('morgan');
const { addPlayer } = require("./handlers/addPlayer.js");
const { createServeQuestion } = require("./handlers/createServeQuestion.js");
const { joinHandler } = require("./handlers/joinHandler.js");
const { createValidateHandler } = require("./handlers/validateResponses.js");
const { authenticationHandler } = require("./handlers/authenticationHandler.js");

const createApp = () => {
  const app = express();

  app.use(morgan('tiny'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());

  app.use(cookieSession({
    name: 'session',
    keys: ['key1']
  }))

  const contestsRouter = express.Router();
  app.use('/contests', contestsRouter);
  contestsRouter.get('/:id/join', joinHandler);
  contestsRouter.post('/:id/add-player', addPlayer);
  contestsRouter.use(authenticationHandler);
  contestsRouter.get('/:id/', createServeQuestion(`./db/quiz/1.json`));
  contestsRouter.post('/:id/validate', createValidateHandler(`./db/quiz/1.json`));

  app.use(express.static('./public'));
  return app;
};

module.exports = { createApp };
