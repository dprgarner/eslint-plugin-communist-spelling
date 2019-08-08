const britishSpellings = require('../data/british_spellings.json');

function splitCamelCase(camelCase) {
  return camelCase
  .replace(/[^A-Za-z]+/g, '')
  .split(/(?=[A-Z])/).map(s => s.toLowerCase());
}

function splitSnakeCase(snakeCase) {
  return snakeCase
  .replace(/[^A-Za-z;]+/g, ';')
  .replace(/;$/, '')
  .split(';');
}

function splitWords(str) {
  if (str.toUpperCase() === str || str.toLowerCase() === str) {
    return splitSnakeCase(str.toLowerCase());
  }
  return splitCamelCase(str);
}

function findBritishSpellings(str) {
  return splitWords(str)
  .filter(x => britishSpellings[x])
  .map(x => britishSpellings[x]);
}

exports.splitWords = splitWords;
exports.findBritishSpellings = findBritishSpellings;
