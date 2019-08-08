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
        "var favoriteColor = 'grey';",
        "function getColor() { return GRAY; };",
        "obj.center = true;",
        "this.colors.dont.run = true;",
        "var x = function(armor) {};",

        // Only warn when actually defining the property
        "this.colours.dont.run = true;",
        "var freedom = this.colour;",
        "console.log(obj.colour);",
        "console.log(colour);",

        /*
        "class MyFavoriteClass {};"
        "const GRAY = '#888888';",
        */
    ],

    invalid: [
        {
            code: "var favouriteColour = 'grey';",
            errors: [{
                message: 'Use the good honest American spelling "favorite"',
                type: "VariableDeclaration"
            }, {
                message: 'Use the good honest American spelling "color"',
                type: "VariableDeclaration"
            }]
        },
        {
            code: "var favourite, colour;",
            errors: [{
                message: 'Use the good honest American spelling "favorite"',
                type: "VariableDeclaration"
            }, {
                message: 'Use the good honest American spelling "color"',
                type: "VariableDeclaration"
            }]
        },
        {
            code: "function getColour() { return GREY; };",
            errors: [{
                message: 'Use the good honest American spelling "color"',
                type: "FunctionDeclaration"
            }]
        },
        {
            code: "obj.centre = true;",
            errors: [{
                message: 'Use the good honest American spelling "center"',
                type: "AssignmentExpression"
            }]
        },
        {
            code: "var x = function armour () {};",
            errors: [{
                message: 'Use the good honest American spelling "armor"',
                type: "FunctionExpression"
            }]
        },
        {
            code: "var x = function(armour) {};",
            errors: [{
                message: 'Use the good honest American spelling "armor"',
                type: "FunctionExpression"
            }]
        },
        {
            code: "function freedom(armour) {};",
            errors: [{
                message: 'Use the good honest American spelling "armor"',
                type: "FunctionDeclaration"
            }]
        },
        {
            code: "try {} catch(colourError) {}",
            errors: [{
                message: 'Use the good honest American spelling "color"',
                type: "CatchClause"
            }]
        },

        /*
        {
            code: "class MyFavoriteClass {};",
            errors: [{
                message: 'Use the good honest American spelling "favorite"',
                type: "ClassDeclaration"
            }]
        },
        {
            code: "const GREY = '#888888';",
            errors: [{
                message: "Prefer good honest American variable names",
                type: "VariableDeclaration"
            }]
        },
        */
    ]
});
