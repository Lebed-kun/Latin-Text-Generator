define(function(require) {
    var { PHONEME, WILDCARD, LEFT_BRACE, RIGHT_BRACE } = require('./constants');

    var lexemes = {
        '[a-z]' : {
            type : PHONEME
        },
        '[A-Z]' : {
            type : WILDCARD
        },
        '\\(' : {
            type : LEFT_BRACE
        },
        '\\)' : {
            type : RIGHT_BRACE
        }
    };

    return lexemes;
})