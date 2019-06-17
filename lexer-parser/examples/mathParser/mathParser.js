// Lexer
var lexer = require('../../lib/lexer');
// Parser
var parser = require('../../lib/parser');

// Lexemes
var lexemes = require('./lex_rules').lexemes;
// Additional lexical rules
var lexRules = require('./lex_rules').rules;

// Operators for parsing machine
var operators = require('./parse_rules').operators;
// Parsing rules
var parseRules = require('./parse_rules').rules;

// Custom lexer-parser
var mathLexer = lexer(lexemes, lexRules);
// Custom math parser
var mathParser = parser(parseRules, operators);

module.exports = function(str) {
  let tokens = mathLexer(str);
  let result = mathParser(tokens);

  return result;
}