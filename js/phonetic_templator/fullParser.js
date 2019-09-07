define(function(require) {
    // Lexer
    var lexer = require('./lexer-parser/lexer');
    // Parser
    var parser = require('./lexer-parser/parser');

    // LEXEMES
    var LEXEMES = require('./lex_rules');

    // WILDCARDS (operators) for parsing machine
    var WILDCARDS = require('./parse_rules').WILDCARDS;
    // Parsing rules
    var PARSE_RULES = require('./parse_rules').rules;

    // Custom lexer
    var phonemeLexer = lexer(LEXEMES);
    // Custom parser
    var phonemeParser = parser(PARSE_RULES, WILDCARDS);

    return function(str) {
        let tokens = phonemeLexer(str);
        let result = phonemeParser(tokens);
  
        return result;
    }
});