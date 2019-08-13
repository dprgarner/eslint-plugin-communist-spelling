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
        'color = "Freedom"',
        'COLOR = "Murcah"',
        "function addFavoriteCountry(){}",
        "favouriteCountry()",
        "new favouriteCountry",
        "new favouriteCountry()",
        "foo.favouriteCountry()",
        "var freedom = obj.favouriteCountry;",
        "var freedom = obj.favourite.country;",
        "foo.colour.qux = bar.colour.something;",
        "if (bar.colour) {}",
        "var freedom = { my: obj.favouriteCountry };",
        "var arr = [foo.colour];",
        "[foo.colour]",
        "var arr = [foo.colour.qux];",
        "[foo.colour.nesting]",
        "if (foo.colour === boom.colour) { [foo.colour] }",
        {
            code: "var o = {favorite: 1}",
            options: [{ properties: "always" }],
        },
        {
            code: "var o = {favourite: 1}",
            options: [{ properties: "never" }],
        },
        {
            code: "obj.favorite = 2;",
            options: [{ properties: "always" }],
        },
        {
            code: "obj.favourite = 2;",
            options: [{ properties: "never" }],
        },
        {
            code: "var obj = {\n colour: 1 \n};\n obj.colour = 2;",
            options: [{ properties: "never" }],
        },
        {
            code: "obj.colour = function(){};",
            options: [{ properties: "never" }],
        },
        {
            code: "var { colour } = query;",
            options: [{ ignoreDestructuring: true }],
            parserOptions: { ecmaVersion: 6 },
        },
        {
            code: "var { colour: colour } = query;",
            options: [{ ignoreDestructuring: true }],
            parserOptions: { ecmaVersion: 6 },
        },
        {
            code: "var { colour = 1 } = query;",
            options: [{ ignoreDestructuring: true }],
            parserOptions: { ecmaVersion: 6 },
        },
        {
            code: "var { [{colour} = query]: color } = query;",
            options: [{ ignoreDestructuring: true }],
            parserOptions: { ecmaVersion: 6 },
        },
        {
            code: "var { colour: color } = query;",
            parserOptions: { ecmaVersion: 6 },
        },
        {
            code: 'import { color } from "external-module";',
            parserOptions: { ecmaVersion: 6, sourceType: "module" },
        },
        {
            code: 'import { colour as color } from "external-module";',
            parserOptions: { ecmaVersion: 6, sourceType: "module" },
        },
        {
            code: 'import { colour as color, favor } from "external-module";',
            parserOptions: { ecmaVersion: 6, sourceType: "module" },
        },
        {
            code: "function foo({ colour: color }) {};",
            parserOptions: { ecmaVersion: 6 },
        },
        {
            code: "function foo({ color = 'default value' }) {};",
            parserOptions: { ecmaVersion: 6 },
        },
        {
            code: "function foo({ camelCased }) {};",
            parserOptions: { ecmaVersion: 6 },
        },
        {
            code: "favourite = 0;",
            options: [{ allow: ["favourite"] }],
        },
        {
            code: "addFavourite = 0;",
            options: [{ allow: ["favourite"] }],
        },
        {
            code: "favourite = 0; colour = 1;",
            options: [{ allow: ["favourite", "colour"] }],
        },
        {
            code: "digitise = 0;",
            options: [{ allow: ["/ise$/"] }],
        },
        {
            code: "digitiseColours = 0;",
            options: [{ allow: ["/ise$/", "colours"] }],
        },
        {
            code: "foo = { [favor]: 0 };",
            options: [{ ignoreDestructuring: true }],
            parserOptions: { ecmaVersion: 6 },
        },
        {
            code: "class X { constructor() {} }",
            parserOptions: { ecmaVersion: 6 },
        },
        {
            code: "favorite = 0;",
            options: [{ communist: "never" }],
        },
        {
            code: "favourite = 0;",
            options: [{ communist: "always" }],
        },
        {
            code: "civilisedColonizing = false",
            options: [{ communist: "always" }],
        },
        {
            code: "civilisedColonizing = false",
            options: [{ communist: "always", oxford: "any" }],
        },
        {
            code: "civilisedColonising = false",
            options: [{ communist: "always", oxford: "never" }],
        },
        {
            code: "civilizedColonizing = false",
            options: [{ communist: "always", oxford: "always" }],
        },
    ],
    invalid: [
        {
            code: 'colours = ["#B22234", "#FFFFFF", "#3C3B6E"]',
            errors: [
                {
                    messageId: "communistSpelling",
                    data: {
                        name: "colours",
                        word: "colours",
                        prefer: "colors",
                    },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "function addColour(){}",
            errors: [
                {
                    messageId: "communistSpelling",
                    data: {
                        name: "addColour",
                        word: "colour",
                        prefer: "color",
                    },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "function favouriteColour(){}",
            errors: [
                {
                    messageId: "communistSpelling",
                    data: {
                        name: "favouriteColour",
                        word: "favourite",
                        prefer: "favorite",
                    },
                    type: "Identifier",
                },
                {
                    messageId: "communistSpelling",
                    data: {
                        name: "favouriteColour",
                        word: "colour",
                        prefer: "color",
                    },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "obj.favourite = function(){};",
            errors: [
                {
                    messageId: "communistSpelling",
                    data: {
                        name: "favourite",
                        word: "favourite",
                        prefer: "favorite",
                    },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "favourite.flag = function(){};",
            errors: [
                {
                    messageId: "communistSpelling",
                    data: {
                        name: "favourite",
                        word: "favourite",
                        prefer: "favorite",
                    },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "[favourite.flag]",
            errors: [
                {
                    messageId: "communistSpelling",
                    data: {
                        name: "favourite",
                        word: "favourite",
                        prefer: "favorite",
                    },
                    type: "Identifier",
                },
            ],
        },
        {
            code:
                "if (flag.colours === country.favourite) { [honour.veterans] }",
            errors: [
                {
                    messageId: "communistSpelling",
                    data: { name: "honour", word: "honour", prefer: "honor" },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "flag.colours = country.favourite",
            errors: [
                {
                    messageId: "communistSpelling",
                    data: {
                        name: "colours",
                        word: "colours",
                        prefer: "colors",
                    },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "var murcah = { colour: gun.favourite }",
            errors: [
                {
                    messageId: "communistSpelling",
                    data: { name: "colour", word: "colour", prefer: "color" },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "var murcah = { colour: gun.favourite }",
            options: [{ ignoreDestructuring: true }],
            errors: [
                {
                    messageId: "communistSpelling",
                    data: { name: "colour", word: "colour", prefer: "color" },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "serve.with.honour = { color: gun.favourite }",
            errors: [
                {
                    messageId: "communistSpelling",
                    data: { name: "honour", word: "honour", prefer: "honor" },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "var o = {colour: 1}",
            options: [{ properties: "always" }],
            errors: [
                {
                    messageId: "communistSpelling",
                    data: { name: "colour", word: "colour", prefer: "color" },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "obj.colour = 2;",
            options: [{ properties: "always" }],
            errors: [
                {
                    messageId: "communistSpelling",
                    data: { name: "colour", word: "colour", prefer: "color" },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "var { honour: colour } = query;",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: { name: "colour", word: "colour", prefer: "color" },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "var { honour: colour } = query;",
            options: [{ ignoreDestructuring: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: { name: "colour", word: "colour", prefer: "color" },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "var { [colour]: color } = query;",
            options: [{ ignoreDestructuring: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: { name: "colour", word: "colour", prefer: "color" },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "var { [colour]: color } = query;",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: { name: "colour", word: "colour", prefer: "color" },
                    type: "Identifier",
                },
            ],
        },
        {
            code:
                "var { favouriteColour: favoriteColor, ...otherColours } = query;",
            options: [{ ignoreDestructuring: true }],
            parserOptions: { ecmaVersion: 2018 },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: {
                        name: "otherColours",
                        word: "colours",
                        prefer: "colors",
                    },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "var { colour } = query;",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: { name: "colour", word: "colour", prefer: "color" },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "var { colour: colour } = query;",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: { name: "colour", word: "colour", prefer: "color" },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "var { colour = 1 } = query;",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: { name: "colour", word: "colour", prefer: "color" },
                    type: "Identifier",
                },
            ],
        },
        {
            code: 'import addFavourite from "external-module";',
            parserOptions: { ecmaVersion: 6, sourceType: "module" },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: {
                        name: "addFavourite",
                        word: "favourite",
                        prefer: "favorite",
                    },
                    type: "Identifier",
                },
            ],
        },
        {
            code: 'import * as favourites from "external-module";',
            parserOptions: { ecmaVersion: 6, sourceType: "module" },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: {
                        name: "favourites",
                        word: "favourites",
                        prefer: "favorites",
                    },
                    type: "Identifier",
                },
            ],
        },
        {
            code: 'import { addFavourite } from "external-module";',
            parserOptions: { ecmaVersion: 6, sourceType: "module" },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: {
                        name: "addFavourite",
                        word: "favourite",
                        prefer: "favorite",
                    },
                    type: "Identifier",
                },
            ],
        },
        {
            code:
                'import { theFavourite as myFavourite } from "external-module";',
            parserOptions: { ecmaVersion: 6, sourceType: "module" },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: {
                        name: "myFavourite",
                        word: "favourite",
                        prefer: "favorite",
                    },
                    type: "Identifier",
                },
            ],
        },
        {
            code: 'import { favorite as favourite } from "external-module";',
            parserOptions: { ecmaVersion: 6, sourceType: "module" },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: {
                        name: "favourite",
                        word: "favourite",
                        prefer: "favorite",
                    },
                    type: "Identifier",
                },
            ],
        },
        {
            code: 'import { favorite, colour } from "external-module";',
            parserOptions: { ecmaVersion: 6, sourceType: "module" },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: { name: "colour", word: "colour", prefer: "color" },
                    type: "Identifier",
                },
            ],
        },
        {
            code:
                'import { favourite as favorite, colour } from "external-module";',
            parserOptions: { ecmaVersion: 6, sourceType: "module" },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: { name: "colour", word: "colour", prefer: "color" },
                    type: "Identifier",
                },
            ],
        },
        {
            code: 'import honor, { favour } from "external-module";',
            parserOptions: { ecmaVersion: 6, sourceType: "module" },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: { name: "favour", word: "favour", prefer: "favor" },
                    type: "Identifier",
                },
            ],
        },
        {
            code:
                'import addFavourite, { anotherFavourite as anotherFavorite } from "external-module";',
            parserOptions: { ecmaVersion: 6, sourceType: "module" },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: {
                        name: "addFavourite",
                        word: "favourite",
                        prefer: "favorite",
                    },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "function freedom({ colours }) {};",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: {
                        name: "colours",
                        word: "colours",
                        prefer: "colors",
                    },
                    type: "Identifier",
                },
            ],
        },
        {
            code:
                "function freedom({ colours = ['red', 'white', 'blue'] }) {};",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: {
                        name: "colours",
                        word: "colours",
                        prefer: "colors",
                    },
                    type: "Identifier",
                },
            ],
        },
        {
            code:
                "const colour = 0; function freedom({ favourite = honour }) {}",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: { name: "colour", word: "colour", prefer: "color" },
                    type: "Identifier",
                },
                {
                    messageId: "communistSpelling",
                    data: {
                        name: "favourite",
                        word: "favourite",
                        prefer: "favorite",
                    },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "const { color: colour } = murcah;",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: { name: "colour", word: "colour", prefer: "color" },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "function murcah({ honor: honour }) {}",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: { name: "honour", word: "honour", prefer: "honor" },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "function murcah({ isHonorable: isHonourable }) {};",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: {
                        name: "isHonourable",
                        word: "honourable",
                        prefer: "honorable",
                    },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "var { murcah: honourable = 1 } = quz;",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: {
                        name: "honourable",
                        word: "honourable",
                        prefer: "honorable",
                    },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "const { honour = false } = bar;",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: { name: "honour", word: "honour", prefer: "honor" },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "const { honour = colour } = bar;",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: { name: "honour", word: "honour", prefer: "honor" },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "withHonour = 0;",
            options: [{ allow: ["colour"] }],
            errors: [
                {
                    messageId: "communistSpelling",
                    data: {
                        name: "withHonour",
                        word: "honour",
                        prefer: "honor",
                    },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "withHonour = 0;",
            options: [{ allow: ["ise$"] }],
            errors: [
                {
                    messageId: "communistSpelling",
                    data: {
                        name: "withHonour",
                        word: "honour",
                        prefer: "honor",
                    },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "foo = { [addColour]: 0 };",
            options: [{ ignoreDestructuring: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: {
                        name: "addColour",
                        word: "colour",
                        prefer: "color",
                    },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "const myFavourites = [];",
            options: [{ allow: ["favourite"] }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "communistSpelling",
                    data: {
                        name: "myFavourites",
                        word: "favourites",
                        prefer: "favorites",
                    },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "favoriteColour = 0;",
            options: [{ communist: "always" }],
            errors: [
                {
                    messageId: "capitalistSpelling",
                    data: {
                        name: "favoriteColour",
                        word: "favorite",
                        prefer: "favourite",
                    },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "favoriteColour = 0;",
            options: [{ communist: "always", oxford: "any" }],
            errors: [
                {
                    messageId: "capitalistSpelling",
                    data: {
                        name: "favoriteColour",
                        word: "favorite",
                        prefer: "favourite",
                    },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "civilisedColonizing = false",
            options: [{ communist: "always", oxford: "always" }],
            errors: [
                {
                    messageId: "capitalistSpelling",
                    data: {
                        name: "civilisedColonizing",
                        word: "civilised",
                        prefer: "civilized",
                    },
                    type: "Identifier",
                },
            ],
        },
        {
            code: "civilisedColonizing = false",
            options: [{ communist: "always", oxford: "never" }],
            errors: [
                {
                    messageId: "capitalistSpelling",
                    data: {
                        name: "civilisedColonizing",
                        word: "colonizing",
                        prefer: "colonising",
                    },
                    type: "Identifier",
                },
            ],
        },
    ],
});
