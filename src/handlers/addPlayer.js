const { readFile } = require("./readFile.js");

const createSession = (req, res) => {
  const id = new Date().getTime().toString();
  const time = new Date().getTime();
  const { name } = req.body;
  const session = { id, name, time, qid: 0 };
  return session;
};

const addPlayer = (sessions) => (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const contestsPath = `./db/contests/${id}.json`;
  const contests = readFile(contestsPath);
  const contest = contests[0];
  contest.players.push({ name, id: 1 });

  const session = createSession(req, res);
  sessions[session.id] = session;

  res.cookie('id', session.id);
  res.sendStatus(201);
};

module.exports = { addPlayer };
