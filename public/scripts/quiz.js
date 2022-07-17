const questionTemplate = ` <form id="questionform" name="questionform">
<fieldset class="options">
  <h2>__QUESTION__</h2>
  <input type="radio" value="1" name="option">
  <label for="1">__OPTION1__</label>

  <input type="radio" value="2" name="option">
  <label for="2">__OPTION2__</label>
  
  <input type="radio" value="3" name="option">
  <label for="3">__OPTION3__</label>
</fieldset>
<div><button type="button" id="action">__ACTION__</button></div>
</form>`;

const answers = [];

const px = (text) => text + 'px';

const createResultsHtml = (results) => {
  const div = document.createElement('div');
  const total = results.length;
  const correctAnswers = results.filter(x => x.result).length;
  div.innerText = `Correct : ${correctAnswers} out of ${total}`;
  div.style.fontSize = px(70);
  div.style.color = 'green'
  div.style.textAlign = 'center';
  return div;
};

const drawResults = (xhr) => {
  const body = document.querySelector('body');

  const results = JSON.parse(xhr.response);
  const resultsHtml = createResultsHtml(results);
  console.log('resultshtml', resultsHtml);
  body.innerHTML = null;
  body.appendChild(resultsHtml);
}

const validateResponses = () => {
  const url = '/contests/1/validate';
  xhrPost(url, drawResults, onFailure, JSON.stringify(answers), 'json');
  return;
};

const createQuestionHtml = (question, action) => {
  let content = questionTemplate.replace('__QUESTION__', question.question);
  const options = question.options;
  for (let index = 0; index < question.options.length; index++) {
    content = content.replace(`__OPTION${index + 1}__`, options[index].option);
  }

  content = content.replace('__ACTION__', action);
  return content;
};

const storeResponse = (question) => {
  const selected = document.questionform.option.value;
  const { id } = question;
  const answer = { questionId: id, playerChoice: selected };
  answers.push(answer);
};

const drawQuestion = ({ question, last }) => {
  let action = 'next';
  let actionEvent = fetchQuestion;

  if (last) {
    action = 'submit';
    actionEvent = validateResponses;
  }

  const questionHtml = createQuestionHtml(question, action);

  const body = document.querySelector('body');
  body.innerHTML = questionHtml;

  const actionElement = document.querySelector('#action');
  actionElement.addEventListener('click', () => storeResponse(question));
  actionElement.addEventListener('click', actionEvent);
  return;
};

const fetchQuestion = (xhr) => {
  const url = '/contests/1';
  xhrGet(url, (xhr) => drawQuestion(JSON.parse(xhr.response)), onFailure);
};

const onFailure = (xhr) => {
  alert('Failed');
};

const joinContest = () => {
  const body = readFormData('#login-form');
  const url = '/contests/1/add-player';
  xhrPost(url, fetchQuestion, onFailure, body.toString());
};
