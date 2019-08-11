#!/usr/bin/env node
/**
 * @fileoverview A script to invert the british spellings dictionary and separate out -ise/-isation spellings
 * @author David Garner
 */

const fs = require("fs");
const path = require("path");
const dataDir = path.join(__dirname, "..", "data");

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

fs.writeFileSync(
    path.join(dataDir, "american-spellings.json"),
    JSON.stringify(americanSpellings, null, 2)
);
fs.writeFileSync(
    path.join(dataDir, "oxford-spellings.json"),
    JSON.stringify(oxfordSpellings, null, 2)
);
fs.writeFileSync(
    path.join(dataDir, "not-oxford-spellings.json"),
    JSON.stringify(notOxfordSpellings, null, 2)
);
