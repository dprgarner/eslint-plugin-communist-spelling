#!/usr/bin/env node
/**
 * @fileoverview A script to invert the british spellings dictionary and separate out -ise/-isation spellings
 * @author David Garner
 */

const fs = require("fs");
const path = require("path");
const buildDir = path.join(__dirname, "..", "build");

const britishSpellings = require("../data/british-spellings.json");

const americanSpellings = {};
const oxfordSpellings = {};
const notOxfordSpellings = {};
const oxfordSuffixes = [/ize/, /ization/, /iza/, /izing/];

function isOxford(word) {
    for (let suffix of oxfordSuffixes) {
        if (word.match(suffix)) {
            return true;
        }
    }
    return false;
}

Object.keys(britishSpellings).forEach(ukWord => {
    const usWord = britishSpellings[ukWord];
    if (isOxford(usWord)) {
        oxfordSpellings[usWord] = ukWord;
        notOxfordSpellings[ukWord] = usWord;
    } else {
        americanSpellings[usWord] = ukWord;
    }
});

Object.entries({
    "british-spellings": britishSpellings,
    "american-spellings": americanSpellings,
    "oxford-spellings": oxfordSpellings,
    "not-oxford-spellings": notOxfordSpellings,
}).forEach(([filename, spellings]) => {
    fs.writeFileSync(
        path.join(buildDir, `${filename}.json`),
        JSON.stringify(spellings)
    );
});
