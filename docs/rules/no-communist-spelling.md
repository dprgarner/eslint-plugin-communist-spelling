# Promote American values in variable names (no-communist-spelling)

When working on cross-Atlantic teams, it is common for developers who've learned American English to spell variables differently from those who've learned British English. This linting rule aims to enforce naming consistency within a team's codebase by picking American English.

## Rule Details

This rule picks out when identifiers are set which use British English spellings instead of American English spellings.

Examples of **incorrect** code for this rule:

```js
const GREY = '#888888';
function getColour() { return GREY; };
var favouriteColour = 'grey';
obj.colour = true;
```

Examples of **correct** code for this rule:

```js
const GRAY = '#888888';
function getColor() { return GRAY; };
var favoriteColor = 'grey';  // Strings are not parsed by this rule
console.log(obj.colour);  // The property is not set here
console.log(colour);  // The variable is not set here
```

### Options

TODO:
- Add an option for the communist inverse mode
- Add an option to disable this for imports

## When Not To Use It

If your team is happy to promote un-American values within your codebase by using British English spellings, then you should disable this rule.

