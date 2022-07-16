const express = require("express");
const fs = require('fs');

const readFile = (path) => {
  const contests = fs.readFileSync(path, 'utf-8');
  return JSON.parse(contests);
};

const joinHandler = (req, res) => {
  res.redirect('/contest.html');
};

const addPlayer = (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const contestsPath = `./db/contests/${id}.json`;
  const contests = readFile(contestsPath);
  const contest = contests[0];
  contest.players.push({ name, id: 1 });
  res.sendStatus(201);
};

const createServeQuestion = (questionsPath) => {
  let id = 0;

  const quiz = readFile(questionsPath);
  return (req, res, next) => {
    const question = quiz.questions[id];

    if (id === quiz.questions.length - 1) {
      res.json({ question, last: true });
      return;
    }

    res.json({ question, last: false });
    id++;
    return;
  };
};

const createApp = () => {
  const app = express();

  app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
  });

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
