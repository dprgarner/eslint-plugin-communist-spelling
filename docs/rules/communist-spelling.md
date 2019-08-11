# Promote American values in variable names (communist-spelling)

When working on cross-Atlantic teams, it is common for developers who've learned American English to spell variables differently from those who've learned British English. This linting rule aims to enforce naming consistency within a team's codebase.

## Rule Details

This rule picks out identifiers containing words with British English spellings instead of American English spellings. The rule tokenizes camelCase and snake-case identifiers and checks the words against a dictionary of the most common British-American spelling differences. 

This rule flags definitions and assignments, but not function calls. For ES6 `import` statements, this rule only targets the name of the variable that will be imported into the local module scope.

## Options

This rule has an object option which takes the following properties:

* `"properties": "always"` (default) - enforces American spellings in property names
* `"properties": "never"` - does not check property names
* `"ignoreDestructuring": false` (default) - enforces American spellings in destructured identifiers
* `"ignoreDestructuring": true` - does not check destructured identifiers
* `allow` (`string[]`) - list of un-American *words* (not identifiers) to accept. Also accepts regexes.

## Examples

Examples of **incorrect** code for this rule with the default options:

```js
/* eslint communist-spelling: "error" */

import { addFavourite } from "external-module";

colours = ["#B22234", "#FFFFFF", "#3C3B6E"]

function favouriteColour(){
    // ...
}

function freedom({ colours }) {
    // ...
};

function murcah({ isHonorable: isHonourable }) {
    // ...
}

function freedom({ colours = ['red', 'white', 'blue'] }) {
    // ...
};

var obj = { honourable: true };
obj.honourable = false;
obj.favouriteColour = function() {
    // ...
};
var { favouriteCountries } = query;
var { favouriteCountries = 1 } = query;
var { favourite: favourite } = query;
var { favourite: myFavourite } = query;
var { favouriteColour: favoriteColor, ...otherColours } = query;

function analyseJson(json) {
    // ...
}
```

Examples of **correct** code with the default options:

```js
/*eslint communist-spelling: "error"*/

import { favouriteColour as favoriteColor } from "external-module"

var my_favorite_colors = ['#B22234', '#FFFFFF', '#3C3B6E'];

function freedom({ colors }) {
    // ...
}

function murcah({ isHonourable: isHonorable }) {
    // ...
}

function freedom({ colors = ['red', 'white', 'blue'] }) {
    // ...
}

// This rule only flags assigments
var freedom = obj.favouriteCountry;
var freedom = { my: obj.favouriteCountry };

// This rule does not flag function calls
obj.favouriteCountry();
favouriteCountry();
new favouriteCountry();

var obj = { honorable: true };
var { favoriteCountries = 1 } = query;
var { favorite: countries } = query;
var { favorite: countries = 1 } = query;

// This rule can only match against known words.
// New words with -ise/-ised/-isation suffixes aren't matched.
function yamliseJson(json) {
    // ...
}
```

### `properties: "never"`
Examples of **correct** code with the `{ "properties": "never" }` option:

```js
/* eslint communist-spelling: ["error", { properties: "never" }] */
var obj = { honourable: true };
obj.honourable = false;
```

### `ignoreDestructuring: true`
Examples of **incorrect** code with the `{ "ignoreDestructuring": true }` option:

```js
/* eslint communist-spelling: ["error", { ignoreDestructuring: true }] */
var { colour: favouriteColour } = query;
var { favouriteColour, ...otherColours } = query;
```

Examples of **correct** code with the `{ "ignoreDestructuring": true }` option:

```js
/* eslint communist-spelling: ["error", { ignoreDestructuring: true }] */
var { favouriteColour } = query;
var { favouriteColours = ['red', 'white', 'blue'] } = query;
var { favouriteColour: favouriteColour } = query;
```

### `allow`

Examples of **incorrect** code for this rule with the `allow` option:
```js
/* eslint communist-spelling: ["error", { allow: ["favourite"] }] */
const favourites = ['red', 'white', 'blue']; // Words must be exact matches
```

Examples of **correct** code for this rule with the `allow` option:

```js
/* eslint communist-spelling: ["error", { allow: ["favourite"] }] */
const favourite = 'red';
var myFavourite = false;
```

```js
/* eslint communist-spelling: ["error", { allow: ["/ise$/", "colours"] }] */
var digitiseColours = false;
```

## When Not To Use It

If your team is happy to promote un-American values within your codebase by using British English spellings, then you should disable this rule.

