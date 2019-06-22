define(function(require) {
    var { LEFT_BRACE } = require('./constants');
    var WeightedList = require('../data_types/weighted_list');

    var consonants = new WeightedList([
        'p', 'b', 't', 'd', 'k', 'g',
        'f', 'v', 's', 'z', 'h',
        'm', 'n', 'r', 'l', 'j', 'w'
    ]);
    var vowels = new WeightedList([
        'a', 'i', 'u', 'e', 'o'
    ]);

    var wildcards = {
        'C' : function() {
            let consonant = consonants.getRandomKey();
            consonants.increaseRank(consonant);
            return consonant;
        },
        'V' : function() {
            let vowel = vowels.getRandomKey();
            vowels.increaseRank(vowel);
            return vowel;
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