# eslint-plugin-no-communist-spelling

An ESLint plugin containing a single rule to catch variable names written in British English instead of American English.

## Rules

Documentation for the rule is located here:

- [no-communist-spelling/no-communist-spelling](https://github.com/dprgarner/eslint-plugin-no-communist-spelling/tree/master/docs/rules/no-communist-spelling.md)

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-no-communist-spelling`:

```
$ npm install eslint-plugin-no-communist-spelling --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-no-communist-spelling` globally.

## Usage

Add `no-communist-spelling` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "no-communist-spelling"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "no-communist-spelling/no-communist-spelling": 2
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

JSON data for spelling differences adapted from [American-British-English-Translator][translator].

[translator]: https://github.com/hyperreality/American-British-English-Translator

## TODO

- [ ] Fix ES6 syntax (classes, destructuring variables, etc.)
- [ ] Add React support
- [ ] Disable this for CommonJS imports
- [ ] Add an option for the Communist American-to-British inverse mode
