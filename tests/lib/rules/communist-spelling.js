/**
 * @fileoverview Tests for the rule which promote American values in variable names. Adapted from camelCase rule tests by Nicholas C. Zakas.
 * @author David Garner
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const rule = require("../../../lib/rules/communist-spelling"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const ruleTester = new RuleTester();

ruleTester.run("communist-spelling", rule, {
    valid: [
        "color = \"Freedom\"",
        "COLOR = \"Murcah\"",
        "function addFavoriteCountry(){}",
        "favourite()",
        "new favourite",
        "new favourite()",
        "foo.favourite()",
        "var foo = bar.colour;",
        "var foo = bar.colour.something;",
        "foo.colour.qux = bar.colour.something;",
        "if (bar.colour) {}",
        "var obj = { key: foo.colour };",
        "var arr = [foo.colour];",
        "[foo.colour]",
        "var arr = [foo.colour.qux];",
        "[foo.colour.nesting]",
        "if (foo.colour === boom.colour) { [foo.colour] }",
        {
            code: "var o = {favorite: 1}",
            options: [{ properties: "always" }]
        },
        {
            code: "var o = {favourite: 1}",
            options: [{ properties: "never" }]
        },
        {
            code: "obj.favorite = 2;",
            options: [{ properties: "always" }]
        },
        {
            code: "obj.favourite = 2;",
            options: [{ properties: "never" }]
        },
        {
            code: "var obj = {\n colour: 1 \n};\n obj.colour = 2;",
            options: [{ properties: "never" }]
        },
        {
            code: "obj.colour = function(){};",
            options: [{ properties: "never" }]
        },
        {
            code: "var { colour } = query;",
            options: [{ ignoreDestructuring: true }],
            parserOptions: { ecmaVersion: 6 }
        },
        {
            code: "var { colour: colour } = query;",
            options: [{ ignoreDestructuring: true }],
            parserOptions: { ecmaVersion: 6 }
        },
        {
            code: "var { colour = 1 } = query;",
            options: [{ ignoreDestructuring: true }],
            parserOptions: { ecmaVersion: 6 }
        },
        {
            code: "var { [{colour} = query]: color } = query;",
            options: [{ ignoreDestructuring: true }],
            parserOptions: { ecmaVersion: 6 }
        },
        {
            code: "var { colour: category } = query;",
            parserOptions: { ecmaVersion: 6 }
        },
        {
            code: "import { color } from \"external-module\";",
            parserOptions: { ecmaVersion: 6, sourceType: "module" }
        },
        {
            code: "import { colour as color } from \"external-module\";",
            parserOptions: { ecmaVersion: 6, sourceType: "module" }
        },
        {
            code: "import { colour as color, favor } from \"external-module\";",
            parserOptions: { ecmaVersion: 6, sourceType: "module" }
        },
        {
            code: "function foo({ colour: color }) {};",
            parserOptions: { ecmaVersion: 6 }
        },
        {
            code: "function foo({ color = 'default value' }) {};",
            parserOptions: { ecmaVersion: 6 }
        },
        {
            code: "function foo({ camelCased }) {};",
            parserOptions: { ecmaVersion: 6 }
        },
        {
            code: "favourite = 0;",
            options: [{ allow: ["favourite"] }]
        },
        {
            code: "addFavourite = 0;",
            options: [{ allow: ["favourite"] }]
        },
        {
            code: "favourite = 0; colour = 1;",
            options: [{ allow: ["favourite", "colour"] }]
        },
        {
            code: "digitise = 0;",
            options: [{ allow: ["ise$"] }]
        },
        {
            code: "digitiseColours = 0;",
            options: [{ allow: ["ise$", "colours"] }]
        },
        {
            code: "foo = { [favor]: 0 };",
            options: [{ ignoreDestructuring: true }],
            parserOptions: { ecmaVersion: 6 }
        }
    ],
    invalid: [
        {
            code: "colour = \"Red White and Blue\"",
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "colour", prefer: "color" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "function addColour(){}",
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "colour", prefer: "color" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "function favouriteColour(){}",
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "favourite", prefer: "favorite" },
                    type: "Identifier"
                },
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "colour", prefer: "color" },
                    type: "Identifier"
                },
            ]
        },
        {
            code: "obj.favourite = function(){};",
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "favourite", prefer: "favorite" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "favourite.flag = function(){};",
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "favourite", prefer: "favorite" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "[favourite.flag]",
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "favourite", prefer: "favorite" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "if (flag.colours === country.favourite) { [honour.veterans] }",
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "honour", prefer: "honor" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "flag.colours = country.favourite",
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "colours", prefer: "colors" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "var murcah = { colour: gun.favourite }",
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "colour", prefer: "color" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "var murcah = { colour: gun.favourite }",
            options: [{ ignoreDestructuring: true }],
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "colour", prefer: "color" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "serve.with.honour = { color: gun.favourite }",
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "honour", prefer: "honor" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "var o = {colour: 1}",
            options: [{ properties: "always" }],
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "colour", prefer: "color" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "obj.colour = 2;",
            options: [{ properties: "always" }],
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "colour", prefer: "color" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "var { honour: colour } = query;",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "colour", prefer: "color" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "var { honour: colour } = query;",
            options: [{ ignoreDestructuring: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "colour", prefer: "color" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "var { [colour]: color } = query;",
            options: [{ ignoreDestructuring: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "colour", prefer: "color" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "var { [colour]: color } = query;",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "colour", prefer: "color" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "var { colour: color, ...favouredProps } = query;",
            options: [{ ignoreDestructuring: true }],
            parserOptions: { ecmaVersion: 2018 },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "favoured", prefer: "favored" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "var { colour } = query;",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "colour", prefer: "color" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "var { colour: colour } = query;",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "colour", prefer: "color" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "var { colour = 1 } = query;",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "colour", prefer: "color" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "import addFavourite from \"external-module\";",
            parserOptions: { ecmaVersion: 6, sourceType: "module" },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "favourite", prefer: "favorite" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "import * as favourites from \"external-module\";",
            parserOptions: { ecmaVersion: 6, sourceType: "module" },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "favourites", prefer: "favorites" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "import { addFavourite } from \"external-module\";",
            parserOptions: { ecmaVersion: 6, sourceType: "module" },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "favourite", prefer: "favorite" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "import { myFavourite as myColour } from \"external-module\";",
            parserOptions: { ecmaVersion: 6, sourceType: "module" },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "colour", prefer: "color" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "import { favorite as favourite } from \"external-module\";",
            parserOptions: { ecmaVersion: 6, sourceType: "module" },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "favourite", prefer: "favorite" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "import { favorite, colour } from \"external-module\";",
            parserOptions: { ecmaVersion: 6, sourceType: "module" },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "colour", prefer: "color" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "import { favourite as favorite, colour } from \"external-module\";",
            parserOptions: { ecmaVersion: 6, sourceType: "module" },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "colour", prefer: "color" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "import honor, { favour } from \"external-module\";",
            parserOptions: { ecmaVersion: 6, sourceType: "module" },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "favour", prefer: "favor" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "import addFavourite, { anotherFavourite as anotherFavorite } from \"external-module\";",
            parserOptions: { ecmaVersion: 6, sourceType: "module" },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "favourite", prefer: "favorite" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "function foo({ colour }) {};",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "colour", prefer: "color" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "function foo({ colour = 'default value' }) {};",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "colour", prefer: "color" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "const colour = 0; function foo({ favourite = honour}) {}",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "colour", prefer: "color" },
                    type: "Identifier"
                },
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "favourite", prefer: "favorite" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "const { bar: colour } = foo;",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "colour", prefer: "color" },
                    type: "Identifier"
                },
            ]
        },
        {
            code: "function foo({ colour: honour }) {}",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "honour", prefer: "honor" },
                    type: "Identifier"
                },
            ]
        },
        {
            code: "function foo({ isHonorable: isHonourable }) {};",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "honourable", prefer: "honorable" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "var { foo: honourable = 1 } = quz;",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "honourable", prefer: "honorable" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "const { honour = false } = bar;",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "honour", prefer: "honor" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "const { honour = colour } = bar;",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "honour", prefer: "honor" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "withHonour = 0;",
            options: [{ allow: ["colour"] }],
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "honour", prefer: "honor" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "withHonour = 0;",
            options: [{ allow: ["ise$"] }],
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "honour", prefer: "honor" },
                    type: "Identifier"
                }
            ]
        },
        {
            code: "foo = { [addColour]: 0 };",
            options: [{ ignoreDestructuring: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "noCommunistSpelling",
                    data: { word: "colour", prefer: "color" },
                    type: "Identifier"
                }
            ]
        }
    ]
});
