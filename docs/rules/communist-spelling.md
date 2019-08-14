# Promote American values in variable names (communist-spelling)

When working on cross-Atlantic teams, it is common for developers who've learned American English to spell variables differently from those who've learned British or Commonwealth English. This linting rule aims to enforce naming consistency within a team's codebase.

## Rule Details

This rule picks out identifiers containing words with Commonwealth English spellings instead of American English spellings. The rule tokenizes camelCase and snake-case identifiers and checks the words against a dictionary of the most common Commonwealth-American spelling differences.

This rule flags definitions and assignments, but not function calls. For ES6 `import` statements, this rule only targets the name of the variable that will be imported into the local module scope.

## Options

This rule has an object option which takes the following properties:

-   `"properties": "always"` (default) - enforces American spellings in property names
-   `"properties": "never"` - does not check property names
-   `"ignoreDestructuring": false` (default) - enforces American spellings in destructured identifiers
-   `"ignoreDestructuring": true` - does not check destructured identifiers
-   `"allow"` (`string[]`) - list of un-American _words_ (not identifiers) to accept. Also accepts regexes.
-   `"communist": "never"` - (default 🇺🇸) - enforces American spellings
-   `"communist": "always"` - enforces Commonwealth spellings
-   `"oxford": "never"` - when in `"communist"` spellings mode, enforces "-ise/-isation" spellings
-   `"oxford": "always"` - when in `"communist"` spellings mode, enforces "-ize/-ization" spellings
-   `"oxford": "any"` (default) - when in `"communist"` spellings mode, allows both "-ise" or "-ize" spellings

## Examples

Examples of **incorrect** code for this rule with the default options:

```js
/* eslint communist-spelling: "error" */

import { addFavourite } from "external-module";

colours = ["#B22234", "#FFFFFF", "#3C3B6E"];

function favouriteColour() {
    // ...
}

function freedom({ colours }) {
    // ...
}

function murcah({ isHonorable: isHonourable }) {
    // ...
}

function freedom({ colours = ["red", "white", "blue"] }) {
    // ...
}

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

import { favouriteColour as favoriteColor } from "external-module";

var my_favorite_colors = ["#B22234", "#FFFFFF", "#3C3B6E"];

function freedom({ colors }) {
    // ...
}

function murcah({ isHonourable: isHonorable }) {
    // ...
}

function freedom({ colors = ["red", "white", "blue"] }) {
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

When `properties` is set to `"never"`, assignments to properties are not checked against this rule.

Examples of **correct** code with the `{ "properties": "never" }` option:

```js
/* eslint communist-spelling: ["error", { properties: "never" }] */
var obj = { honourable: true };
obj.honourable = false;
```

### `ignoreDestructuring: true`

When `ignoreDestructuring` is set to `true`, assigments to variables from destructured objects are not checked against the rule.

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
var { favouriteColours = ["red", "white", "blue"] } = query;
var { favouriteColour: favouriteColour } = query;
```

### `allow`

A set of strings or string-representations of regexes (with surrounding slashes, e.g. `"/isation$/"`) can be provided, which will be ignored by this rule.

Examples of **incorrect** code for this rule with the `allow` option:

```js
/* eslint communist-spelling: ["error", { allow: ["favourite"] }] */
const favourites = ["red", "white", "blue"]; // Words must be exact matches
```

Examples of **correct** code for this rule with the `allow` option:

```js
/* eslint communist-spelling: ["error", { allow: ["favourite"] }] */
const favourite = "red";
var myFavourite = false;
```

```js
/* eslint communist-spelling: ["error", { allow: ["/ise$/", "colours"] }] */
var digitiseColours = false;
```

### `communist: "always"`

Communist mode inverts the rule, and enforces Commonwealth spellings which make Uncle Sam weep.

Examples of **incorrect** code with the `{ "communist": "always" }` option:

```js
/* eslint communist-spelling: ["error", { "communist": "always" }] */

function favoriteCountry({ colors = ["red", "white", "blue"] }) {
    // ...
}
```

Examples of **correct** code with the `{ "communist": "always" }` option:

```js
/* eslint communist-spelling: ["error", { "communist": "always" }] */

function favouriteCountry({ colours = ["communist", "red"] }) {
    // ☭
}
const civilisedColonizing = false; // -ise and -izing are both acceptable in Commonwealth English
```

### `oxford: "never"`

[Oxford Spelling][oxford] is the spelling standard used by the Oxford University Press, which uses -ize/-ization word endings instead of -ise/-isation word endings. When this option is set to "never", the linter will enforce the non-Oxford Commonwealth English spelling convention of -ise/-isation word endings. This option only has an effect when the `"communist"` option is set to `always`.

[oxford]: https://en.wikipedia.org/wiki/Oxford_spelling

Examples of **incorrect** code with the `{ "communist": "always", "oxford": "never" }` options:

```js
/* eslint communist-spelling: ["error", { "communist": "always", "oxford": "never" }] */

const colonizing = false;
const civilisedColonizing = false;
const civilizedColour = "red";
```

Examples of **correct** code with the `{ "communist": "always", "oxford": "never" }` options:

```js
/* eslint communist-spelling: ["error", { "communist": "always", "oxford": "never" }] */

const colonising = false;
const civilisedColour = "red";
```

### `oxford: "always"`

When the `oxford` option is set to `"always"`, -ize/-ization endings are always enforced. This option only has any effect when the `"communist"` option is set to "`always`". (In the default `communist: "never"` mode, -ize/-ization endings are always enforced.)

Examples of **incorrect** code with the `{ "communist": "always", "oxford": "always" }` options:

```js
/* eslint communist-spelling: ["error", { "communist": "always", "oxford": "always" }] */

const civilisedColonizing = false;
const colonising = false;
const civilisedColour = "red";
```

Examples of **correct** code with the `{ "communist": "always", "oxford": "always" }` options:

```js
/* eslint communist-spelling: ["error", { "communist": "always", "oxford": "always" }] */

const colonizing = false;
const civilizedColour = "red";
```

## When Not To Use It

If your team is happy to promote un-American values within your codebase by using both Commonwealth English and American English spellings, then you should disable this rule.
