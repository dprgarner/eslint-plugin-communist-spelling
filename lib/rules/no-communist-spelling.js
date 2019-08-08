/**
 * @fileoverview Promote American values in variable names
 * @author David Garner
 */
"use strict";

const { findBritishSpellings } = require('../utils');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Promote American values in variable names",
            category: "suggestion",
            recommended: true
        },
        fixable: null,  // perhaps "code"
        schema: []
    },

    create: function(context) {
        function checkSpellings(node, str) {
            findBritishSpellings(str).forEach(word => {
                context.report(node, `Use the good honest American spelling "${word}"`);
            });
        }

        function checkFunction(node) {
            if (node.id) {
                checkSpellings(node, node.id.name);
            }
            node.params.forEach(param => {
                checkSpellings(node, param.name);
            });
        }

        return {
            "VariableDeclaration": function(node) {
                node.declarations.forEach(dec => {
                    checkSpellings(node, dec.id.name);
                });
            },

            "FunctionDeclaration": checkFunction,

            "FunctionExpression": checkFunction,

            "AssignmentExpression": function(node) {
                if (node.left.type === 'MemberExpression') {
                    checkSpellings(node, node.left.property.name);
                }
            },

            "CatchClause": function(node) {
                checkSpellings(node, node.param.name);
            },
        };
    }
};
