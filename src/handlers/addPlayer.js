const { readFile } = require("./readFile.js");

const addPlayer = (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const contestsPath = `./db/contests/${id}.json`;
  const contests = readFile(contestsPath);
  const contest = contests[0];
  contest.players.push({ name, id: 1 });
  res.sendStatus(201);
};

module.exports = { addPlayer };
