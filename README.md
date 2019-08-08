# eslint-plugin-no-communist-spelling

An ESLint plugin containing a single rule to catch variable names written in British English instead of American English.

## Rules

- [no-communist-spelling/no-communist-spelling](./docs/rules/no-communist-spelling.md)

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

## Sources

JSON data for spelling differences adapted from [American-British-English-Translator][translator].

[translator]: https://github.com/hyperreality/American-British-English-Translator

Other links:

## Link Dump

- https://eslint.org/docs/developer-guide/working-with-rules
- https://eslint.org/docs/rules/#variables
- https://medium.com/@btegelund/creating-an-eslint-plugin-87f1cb42767f
- <https://en.wikipedia.org/wiki/American_and_British_English_spelling_differences>
