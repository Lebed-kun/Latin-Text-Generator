var constants = require('./constants');
var { NUMBER, OPERATOR, LEFT_BRACE,
  RIGHT_BRACE, UPLUS, UMINUS } = constants;

var lexems = {
    '(\\d+\\.?\\d*|\\.\\d+)' : {
      type : NUMBER
    },
    '[a-zA-Z_]+\\w*' : {
      type : OPERATOR,
      priority : 4
    },
    '\\^': {
      type : OPERATOR,
      priority : 3,
      rtl : true
    },
    '\\*' : {
      type : OPERATOR,
      priority : 2
    },
    '/' : {
      type : OPERATOR,
      priority : 2
    },
    '\\-' : {
      type : OPERATOR,
      priority : 1
    },
    '\\+' : {
      type : OPERATOR,
      priority : 1
    },
    '\\(' : {
      type : LEFT_BRACE
    },
    '\\)' : {
      type : RIGHT_BRACE
    }
  }

// Additional lexical rules
var lexRules = [  
  function checkNumber(token, outputLexems) {
    token.value = token.type === NUMBER ? +token.value : token.value;
  },

  function checkUnaryPM(token, outputLexems) {
    let resCond = token.value === '+' || token.value === '-';
    let outLexCond = outputLexems.length === 0 ||
             outputLexems[outputLexems.length - 1].type !== NUMBER;
    resCond = resCond && outLexCond;
    
    if (resCond) {
      token.priority = 4;
      
      if (token.value === '+') {
        token.value = UPLUS;
      } else {
        token.value = UMINUS;
      }
    }
  }
];

module.exports = {
  lexemes : lexems,
  rules : lexRules
}