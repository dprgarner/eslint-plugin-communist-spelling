const britishSpellings = require("../data/british_spellings.json");

/**
 * Cleans a camelCase string into alphabetical characters only and splits it
 * into its constituent words.
 * @param {string} camelCase The camelCased string to split
 * @returns {[string]} The split-up lower-case single words
 * @private
 */
function splitCamelCase(camelCase) {
    return camelCase
        .replace(/[^A-Za-z]+/g, "")
        .split(/(?=[A-Z])/)
        .map(s => s.toLowerCase());
}

/**
 * Cleans a snake_case string into alphabetical characters only and splits it
 * into its constituent words.
 * @param {string} snakeCase The snake_case string to split up
 * @returns {[string]} The split-up lower-case single words
 * @private
 */
function splitSnakeCase(snakeCase) {
    return snakeCase
        .replace(/[^A-Za-z;]+/g, ";")
        .replace(/;$/, "")
        .split(";");
}

/**
 * Cleans and splits a string into its constituent words.
 * @param {string} str The string to split up
 * @returns {[string]} The split-up lower-case single words
 */
function splitWords(str) {
    if (str.toUpperCase() === str || str.toLowerCase() === str) {
        return splitSnakeCase(str.toLowerCase());
    }
    return splitCamelCase(str);
}

/**
 * Finds and returns an array of British spellings in a string
 * @param {string} str The string to split up and check for British spellings
 * @returns {[[string]]} Pairs of words with a British spelling and its equivalent American spelling
 */
function findBritishSpellings(str) {
    return splitWords(str)
        .filter(x => britishSpellings[x])
        .map(x => [x, britishSpellings[x]]);
}

exports.splitWords = splitWords;
exports.findBritishSpellings = findBritishSpellings;
