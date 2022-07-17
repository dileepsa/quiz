const { readFile } = require("./readFile.js");

const createServeQuestion = (questionsPath) => {
  const quiz = readFile(questionsPath);
  return (req, res, next) => {
    const { qid } = req.session;
    const question = quiz.questions[qid];
    if (qid === quiz.questions.length - 1) {
      res.json({ question, last: true });
      return;
    }

    res.json({ question, last: false });
    req.session.qid++;
    return;
  };
};

exports.createServeQuestion = createServeQuestion;
