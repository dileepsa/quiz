const fs = require('fs');

const readFile = (path) => {
  const content = fs.readFileSync(path, 'utf-8');
  return JSON.parse(content);
};

module.exports = { readFile };
