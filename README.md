[![Build Status](https://travis-ci.org/dprgarner/eslint-plugin-communist-spelling.svg?branch=master)](https://travis-ci.org/dprgarner/eslint-plugin-communist-spelling)
[![npm](https://img.shields.io/npm/v/eslint-plugin-communist-spelling)](http://npmjs.com/package/eslint-plugin-communist-spelling)

# eslint-plugin-communist-spelling

An ESLint plugin containing a single rule to catch variable names written in ~~Communist~~ Commonwealth English instead of American English. Keep them Reds out of decent American codebases.

```js
function favouriteCountry({ colours = ["communist", "red"] }) {} // 👎😠☭
function favoriteCountry({ colors = ["red", "white", "blue"] }) {} // 👍🇺🇸🦅
```

...or, if you're a Godless ~~Communist~~ Commonwealther, the rule can be inverted to enforce Commonwealth spellings in your variable names.

In-depth documentation for the rule, the available options, and more examples of code are located here:

-   [communist-spelling/communist-spelling](https://github.com/dprgarner/eslint-plugin-communist-spelling/tree/master/docs/rules/communist-spelling.md)

## Installation

If using yarn:

```bash
yarn add -D eslint-plugin-communist-spelling
```

If using npm:

```bash
npm install --save-dev eslint-plugin-communist-spelling
```

## Usage

Add `communist-spelling` to the plugins section of your `.eslintrc` configuration file, and `communist-spelling/communist-spelling` to the list of rules. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": ["communist-spelling"],
    "rules": {
        "communist-spelling/communist-spelling": "error"
    }
}
```

or, if using a YAML ESLint config file:

```yaml
plugins:
    - communist-spelling
rules:
    communist-spelling/communist-spelling:
        - error
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

## Acknowledgements

The JSON data for spelling differences was adapted from the [American-British-English-Translator][translator]. The core functionality of the tree-traversing code was adapted from the [camelCase][camelcase] rule included in the core ESLint package.

[translator]: https://github.com/hyperreality/American-British-English-Translator
[camelcase]: https://eslint.org/docs/rules/camelcase
