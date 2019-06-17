define(function(require) {
    var LEFT_BRACE = require('./constants').LEFT_BRACE;
    
    var operators = {
        'C' : function(consonants) {
            return consonants.getRandomKey();
        },
        'V' : function(vowels) {
            return vowels.getRandomKey();
        }
    };

    var parseRules = {
        phoneme : function(operators, opStack, resStack) {
            return function(token) {
                return token.value;
            }
        },
        wildcard : function(operators, opStack, resStack) {
            return function(token) {

            }
        }
    }
});