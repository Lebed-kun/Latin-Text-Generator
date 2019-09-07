define(function(require) {
    var { LEFT_BRACE } = require('./constants');
    var WeightedList = require('../data_types/weighted_list');

    var CONSONANTS = new WeightedList([
        'p', 'b', 't', 'd', 'k', 'g',
        'f', 'v', 's', 'z', 'h',
        'm', 'n', 'r', 'l', 'j', 'w'
    ]);
    var VOWELS = new WeightedList([
        'a', 'i', 'u', 'e', 'o'
    ]);

    var WILDCARDS = {
        'C' : function() {
            let consonant = CONSONANTS.getRandomKey();
            CONSONANTS.increaseRank(consonant);
            return consonant;
        },
        'V' : function() {
            let vowel = VOWELS.getRandomKey();
            VOWELS.increaseRank(vowel);
            return vowel;
        }
    }

    var PARSE_RULES = {
        PHONEME : function(WILDCARDS, opStack, resStack) {
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

        WILDCARD : function(WILDCARDS, opStack, resStack) {
            return function(token) {
                let cond = opStack.length === 0 || 
                opStack[opStack.length - 1].type === LEFT_BRACE &&
                    !opStack[opStack.length - 1].ignoring;

                if (cond) {
                    let phoneme = WILDCARDS[token.value]();

                    if (!resStack[0]) {
                        resStack.push(phoneme);
                    } else {
                        resStack[0] += phoneme;
                    }
                }
            }
        },

        LEFT_BRACE : function(WILDCARDS, opStack, resStack) {
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

        RIGHT_BRACE : function(WILDCARDS, opStack, resStack) {
            return function() {
                opStack.pop();
            }
        }
    }

    return {
        WILDCARDS,
        rules : PARSE_RULES
    }
});