[![Build Status](https://travis-ci.org/dprgarner/eslint-plugin-communist-spelling.svg?branch=master)](https://travis-ci.org/dprgarner/eslint-plugin-communist-spelling)
[![npm](https://img.shields.io/npm/v/eslint-plugin-communist-spelling)](http://npmjs.com/package/eslint-plugin-communist-spelling)

# eslint-plugin-communist-spelling

An ESLint plugin containing a single rule to catch variable names written in British English instead of American English.

## Rules

Documentation for the rule is located here:

- [communist-spelling/communist-spelling](https://github.com/dprgarner/eslint-plugin-communist-spelling/tree/master/docs/rules/communist-spelling.md)

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-communist-spelling`:

```
$ npm install eslint-plugin-communist-spelling --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-communist-spelling` globally.

## Usage

Add `communist-spelling` to the plugins section of your `.eslintrc` configuration file, and `communist-spelling/communist-spelling` to the list of rules. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "communist-spelling"
    ],
    "rules": {
        "communist-spelling/communist-spelling": "error"
    }
}
```

## Releasing

Releases to NPM are performed via Travis when tagged commits are pushed to the
repo. Create a new tagged commit and bump the version in package.json with:

```bash
npm version patch
```

and push the new commits and tags with:

```bash
git push && git push --tags
```

## Sources

The JSON data for spelling differences was adapted from the [American-British-English-Translator][translator].

[translator]: https://github.com/hyperreality/American-British-English-Translator

## TODO

- Inverse mode option (no capitalist spellings)
- `disallow` option (for made-up words)