/**
 * @fileoverview Promote American values in variable names
 * @author David Garner
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-communist-spelling"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-communist-spelling", rule, {
    valid: [
        "const GRAY = '#888888';",
        "function getColor() { return GRAY; };",
        "var favoriteColor = 'grey';",
    ],

    invalid: [
        {
            code: "const GREY = '#888888';",
            errors: [{
                message: "Prefer good honest American variable names",
                type: "VariableDeclaration"
            }]
        },
        {
            code: "function getColour() { return GREY; };",
            errors: [{
                message: "Prefer good honest American variable names",
                type: "VariableDeclaration"
            }]
        },
        {
            code: "var favouriteColour = 'grey';",
            errors: [{
                message: "Prefer good honest American variable names",
                type: "VariableDeclaration"
            }]
        }
    ]
});
