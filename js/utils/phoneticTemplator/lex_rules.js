define(function(require) {
    var constants = require('./constants');

    var lexemes = {
        '[a-z0-9\\-_]' : {
            type : constants.PHONEME
        },
        '[A-Z]' : {
            type : constants.WILDCARD
        },
        '\\(' : {
            type : constants.LEFT_BRACE
        },
        '\\)' : {
            type : constants.RIGHT_BRACE
        }
    };

    return {
        lexemes : lexemes
    }
})