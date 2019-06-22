define(function(require) {
    var { LEFT_BRACE } = require('./constants');

    var consonants = [
        'p', 'b', 't', 'd', 'k', 'g',
        'f', 'v', 's', 'z', 'h',
        'm', 'n', 'r', 'l', 'j'
    ];
    var vowels = [
        'a', 'i', 'u', 'e', 'o'
    ];

    var wildcards = {
        'C' : function() {
            let id = Math.floor(Math.random() * consonants.length);
            return consonants[id];
        },
        'V' : function() {
            let id = Math.floor(Math.random() * vowels.length);
            return vowels[id];
        }
    }

    var parseRules = {
        PHONEME : function(wildcards, opStack, resStack) {
            return function(token) {
                let cond = opStack.length === 0 || 
                opStack[opStack.length - 1].type === LEFT_BRACE &&
                    !opStack[opStack.length - 1].ignoring;
                
                if (cond) {
                    if (!resStack[0]) {
                        resStack.push(token.value);
                    } else {
                        resStack[0] += token.value;
                    }
                }
                
            }
        },

        WILDCARD : function(wildcards, opStack, resStack) {
            return function(token) {
                let cond = opStack.length === 0 || 
                opStack[opStack.length - 1].type === LEFT_BRACE &&
                    !opStack[opStack.length - 1].ignoring;

                if (cond) {
                    let phoneme = wildcards[token.value]();

                    if (!resStack[0]) {
                        resStack.push(phoneme);
                    } else {
                        resStack[0] += phoneme;
                    }
                }
            }
        },

        LEFT_BRACE : function(wildcards, opStack, resStack) {
            return function(token) {
                let cond = opStack.length > 0 &&
                    opStack[opStack.length - 1].type === LEFT_BRACE &&
                    opStack[opStack.length - 1].ignoring;

                cond = cond || Math.random() >= 0.5;
                
                if (cond) {
                    token.ignoring = true;
                }

                opStack.push(token);
            }
        },

        RIGHT_BRACE : function(wildcards, opStack, resStack) {
            return function() {
                opStack.pop();
            }
        }
    }

    return {
        wildcards,
        rules : parseRules
    }
});