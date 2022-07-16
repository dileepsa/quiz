const { readFile } = require("./readFile.js");

const validate = (question, answer) => {
  const correctAnswer = question.answer;
  const result = correctAnswer === answer.playerChoice;
  const validation = { ...answer, correctAnswer, result };
  return validation;
};

const createValidateHandler = (questionsPath) => {
  const quiz = readFile(questionsPath);
  return (req, res, next) => {
    const questions = quiz.questions;
    const playerAnswers = req.body;

    const results = playerAnswers.map((answer, index) => {
      return validate(questions[index], answer);
    });

    res.json(results);
    return;
  }
};

module.exports = { createValidateHandler };
