/**
 * @fileoverview Utility functions for matching spellings to identifiers
 * @author David Garner
 */

const britishSpellings = require("../build/british-spellings.json");
const americanSpellings = require("../build/american-spellings.json");
const oxfordSpellings = require("../build/oxford-spellings.json");
const notOxfordSpellings = require("../build/not-oxford-spellings.json");

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
exports.splitWords = splitWords;

/**
 * Finds and returns an array of corrected spellings in a string
 * @param {string} str The corrections dictionary to use
 * @returns {function(obj): [[string]]} A function which splits up a string into words and returns pairs of words with the original and a correction
 */
function findSpellings(spellings) {
    return str =>
        splitWords(str)
            .filter(x => spellings[x] && typeof spellings[x] === "string")
            .map(x => [x, spellings[x]]);
}

/**
 * Finds and returns an array of British spellings in a string
 * @param {string} str The string to split up and check for British spellings
 * @returns {[[string]]} Pairs of words with a British spelling and its equivalent American spelling
 */
exports.findBritishSpellings = findSpellings(britishSpellings);

/**
 * Finds and returns an array of American spellings in a string
 * @param {string} str The string to split up and check for British spellings
 * @returns {[[string]]} Pairs of words with an American spelling and its equivalent British spelling
 */
exports.findAmericanSpellings = findSpellings(americanSpellings);

/**
 * Finds and returns an array of American spellings in a string, enforcing "-ise/-isation" endings
 * @param {string} str The string to split up and check for British spellings
 * @returns {[[string]]} Pairs of words with a British spelling and its equivalent American spelling
 */
exports.findAmericanAndOxfordSpellings = findSpellings(oxfordSpellings);

/**
 * Finds and returns an array of American spellings in a string, enforcing "-ize/-ization" endings
 * @param {string} str The string to split up and check for British spellings
 * @returns {[[string]]} Pairs of words with a British spelling and its equivalent American spelling
 */
exports.findAmericanAndNotOxfordSpellings = findSpellings(notOxfordSpellings);
