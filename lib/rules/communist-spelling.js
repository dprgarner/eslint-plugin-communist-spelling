/**
 * @fileoverview Rule to promote American values in variable names. Adapted from the camelCase rule by Nicholas C. Zakas.
 * @author David Garner
 */
"use strict";

const {
    findBritishSpellings,
    findAmericanSpellings,
    findAmericanAndOxfordSpellings,
    findAmericanAndNotOxfordSpellings,
} = require("../utils");

// Helper function

/**
 * Checks if a parent of a node is an ObjectPattern.
 * @param {ASTNode} node The node to check.
 * @returns {boolean} if the node is inside an ObjectPattern
 * @private
 */
function isInsideObjectPattern(node) {
    let current = node;

    while (current) {
        const parent = current.parent;

        if (
            parent &&
            parent.type === "Property" &&
            parent.computed &&
            parent.key === current
        ) {
            return false;
        }

        if (current.type === "ObjectPattern") {
            return true;
        }

        current = parent;
    }

    return false;
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "Promote American values in variable names",
            category: "Stylistic Issues",
            recommended: true,
            url:
                "https://github.com/dprgarner/eslint-plugin-communist-spelling/blob/master/docs/rules/communist-spelling.md",
        },

        schema: [
            {
                type: "object",
                properties: {
                    ignoreDestructuring: {
                        type: "boolean",
                        default: false,
                    },
                    properties: {
                        enum: ["always", "never"],
                    },
                    allow: {
                        type: "array",
                        items: [
                            {
                                type: "string",
                            },
                        ],
                        minItems: 0,
                        uniqueItems: true,
                    },
                    communist: {
                        enum: ["never", "always"],
                    },
                    oxford: {
                        enum: ["any", "always", "never"],
                    },
                },
                additionalProperties: false,
            },
        ],

        messages: {
            communistSpelling:
                "The spelling '{{word}}' in '{{name}}' is anti-American. Use '{{prefer}}' instead.",
            capitalistSpelling:
                "The spelling '{{word}}' in '{{name}}' is American propaganda. Use '{{prefer}}' instead.",
        },
    },

    create(context) {
        // Parse options
        const options = context.options[0] || {};
        let properties = options.properties || "";
        if (properties !== "always" && properties !== "never") {
            properties = "always";
        }

        // Get the spellings finder function
        let communist = options.communist || "never";
        if (!["always", "never"].includes(communist)) {
            communist = "never";
        }
        let oxford = options.oxford || "any";
        if (!["always", "never", "any"].includes(oxford)) {
            oxford = "any";
        }
        let findSpellings = findBritishSpellings;
        let messageId = "communistSpelling";
        if (communist === "always") {
            messageId = "capitalistSpelling";
            findSpellings = {
                always: findAmericanAndNotOxfordSpellings,
                never: findAmericanAndOxfordSpellings,
                any: findAmericanSpellings,
            }[oxford];
        }
        const ignoreDestructuring = options.ignoreDestructuring;
        const allow = options.allow || [];
        let allowedRegExps = allow.filter(
            w => w[0] === "/" && w[w.length - 1] === "/"
        );
        const allowedWords = allow.filter(w => !allowedRegExps.includes(w));
        allowedRegExps = allowedRegExps.map(
            w => new RegExp(w.slice(1, -1), "u")
        );

        //--------------------------------------------------------------------------
        // Helpers
        //--------------------------------------------------------------------------

        // contains reported nodes to avoid reporting twice on destructuring with shorthand notation
        const reported = [];
        const ALLOWED_PARENT_TYPES = new Set([
            "CallExpression",
            "NewExpression",
        ]);

        /**
         * Checks if a string matches the ignore list
         * @param {string} name The string to check
         * @returns {boolean} if the string is ignored
         * @private
         */
        function isAllowed(name) {
            return (
                allowedWords.findIndex(w => name === w) !== -1 ||
                allowedRegExps.findIndex(r => name.match(r)) !== -1
            );
        }

        /**
         * Checks a node for rule violations.
         * @param {ASTNode} node The node to report.
         * @returns {void}
         * @private
         */
        function checkSpellings(node) {
            if (reported.indexOf(node) < 0) {
                let nodeReported = false;
                findSpellings(node.name).forEach(([word, prefer]) => {
                    if (isAllowed(word)) {
                        return;
                    }
                    nodeReported = true;
                    context.report({
                        node,
                        messageId,
                        data: { name: node.name, word, prefer },
                    });
                });
                if (nodeReported) {
                    reported.push(node);
                }
            }
        }

        return {
            Identifier(node) {
                /*
                 * Leading and trailing underscores are commonly used to flag
                 * private/protected identifiers, strip them before checking if underscored
                 */
                const effectiveParent =
                    node.parent.type === "MemberExpression"
                        ? node.parent.parent
                        : node.parent;

                // MemberExpressions get special rules
                if (node.parent.type === "MemberExpression") {
                    // "never" check properties
                    if (properties === "never") {
                        return;
                    }

                    // Always report underscored object names
                    if (
                        node.parent.object.type === "Identifier" &&
                        node.parent.object.name === node.name
                    ) {
                        checkSpellings(node);

                        // Report AssignmentExpressions only if they are the left side of the assignment
                    } else if (
                        effectiveParent.type === "AssignmentExpression" &&
                        (effectiveParent.right.type !== "MemberExpression" ||
                            (effectiveParent.left.type === "MemberExpression" &&
                                effectiveParent.left.property.name ===
                                    node.name))
                    ) {
                        checkSpellings(node);
                    }

                    /*
                     * Properties have their own rules, and
                     * AssignmentPattern nodes can be treated like Properties:
                     * e.g.: const { no_camelcased = false } = bar;
                     */
                } else if (
                    node.parent.type === "Property" ||
                    node.parent.type === "AssignmentPattern"
                ) {
                    if (
                        node.parent.parent &&
                        node.parent.parent.type === "ObjectPattern"
                    ) {
                        const assignmentKeyEqualsValue =
                            node.parent.key.name === node.parent.value.name;

                        if (node.parent.computed) {
                            checkSpellings(node);
                        }

                        // prevent checking righthand side of destructured object
                        if (
                            node.parent.key === node &&
                            node.parent.value !== node
                        ) {
                            return;
                        }

                        // ignore destructuring if the option is set, unless a new identifier is created
                        if (
                            node.parent.value.name &&
                            !(assignmentKeyEqualsValue && ignoreDestructuring)
                        ) {
                            checkSpellings(node);
                        }
                    }

                    // "never" check properties or always ignore destructuring
                    if (
                        properties === "never" ||
                        (ignoreDestructuring && isInsideObjectPattern(node))
                    ) {
                        return;
                    }

                    // don't check right hand side of AssignmentExpression to prevent duplicate warnings
                    if (
                        !ALLOWED_PARENT_TYPES.has(effectiveParent.type) &&
                        !(node.parent.right === node)
                    ) {
                        checkSpellings(node);
                    }
                    // Check if it's an import specifier
                } else if (
                    [
                        "ImportSpecifier",
                        "ImportNamespaceSpecifier",
                        "ImportDefaultSpecifier",
                    ].indexOf(node.parent.type) >= 0
                ) {
                    // Report only if the local imported identifier is underscored
                    if (
                        node.parent.local &&
                        node.parent.local.name === node.name
                    ) {
                        checkSpellings(node);
                    }
                    // Report anything that is underscored that isn't a CallExpression
                } else if (!ALLOWED_PARENT_TYPES.has(effectiveParent.type)) {
                    checkSpellings(node);
                }
            },
        };
    },
};
