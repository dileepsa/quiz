const { readFile } = require("./readFile.js");

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

exports.createServeQuestion = createServeQuestion;
