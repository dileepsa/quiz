const express = require("express");
const fs = require('fs');

const readFile = (path) => {
  const contests = fs.readFileSync(path, 'utf-8');
  return JSON.parse(contests);
};

const joinHandler = (req, res) => {
  res.redirect('/contest.html');
};

const serveQuestion = (req, res, next) => {
  const { id } = req.params;
  const questionsPath = `./db/quiz/${id}.json`;
  const quiz = readFile(questionsPath);
  console.log('quizz', quiz.questions[id]);
  res.json(quiz.questions[0]);
  return;
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
  contestsRouter.get('/:id', serveQuestion);

  app.use(express.static('./public'));
  return app;
};

module.exports = { createApp };
