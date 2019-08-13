/**
 * @fileoverview Utility functions for matching spellings to identifiers
 * @author David Garner
 */

const britishSpellings = require("../data/british-spellings.json");
const americanSpellings = require("../data/american-spellings.json");
const oxfordSpellings = require("../data/oxford-spellings.json");
const notOxfordSpellings = require("../data/not-oxford-spellings.json");

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
        .filter(
            x => britishSpellings[x] && typeof britishSpellings[x] === "string"
        )
        .map(x => [x, britishSpellings[x]]);
}

/**
 * Finds and returns an array of American spellings in a string
 * @param {("any"|"always"|"never")} oxford Whether to use the Oxford spelling convention or not
 * @returns {function(str: string): [[string]]} A function which splits up a string into words and returning pairs of words with an American spelling and its equivalent British spelling
 */
function findAmericanSpellings(oxford) {
    let spellings = [americanSpellings];
    if (oxford === "always") {
        spellings.push(oxfordSpellings);
    }
    if (oxford === "never") {
        spellings.push(notOxfordSpellings);
    }
    return str =>
        splitWords(str)
            .filter(
                x =>
                    spellings.findIndex(s => !!s[x]) > -1 &&
                    typeof britishSpellings[x] === "string"
            )
            .map(x => [x, s[0][x] || s[1][x]]);
}

exports.splitWords = splitWords;
exports.findBritishSpellings = findBritishSpellings;
exports.findAmericanSpellings = findAmericanSpellings;
