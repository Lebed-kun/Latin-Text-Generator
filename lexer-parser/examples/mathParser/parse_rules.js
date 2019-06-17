var constants = require('./constants');
var { LEFT_BRACE } = constants;

// Operators for parsing tokens
var operators = {
    'uplus' : function(value) {
      return +value;
    },
    'uminus' : function(value) {
      return -value;
    },
    '+' : function(value1, value2) {
      return value1 + value2;
    },
    '-' : function(value1, value2) {
      return value1 - value2;
    },
    '*' : function(value1, value2) {
      return value1 * value2;
    },
    '/' : function(value1, value2) {
      return value1 / value2;
    },
    '^' : function(value1, value2) {
      return Math.pow(value1, value2);
    },
    'sqrt' : function (value) {
      return Math.sqrt(value);
    },
    'exp' : function (value) {
      return Math.pow(Math.E, value);
    },
    'ln' : function (value) {
      return Math.log(value);
    },
    'sin' : function (value) {
      return Math.sin(value);
    },
    'cos' : function (value) {
      return Math.cos(value);
    },
    'tan' : function (value) {
      return Math.tan(value);
    }
};

var parseRules = {
    number : function(operators, opStack, resStack) {
        return function(token) {
          resStack.push(token.value);
        }
    },
  
    operator : function(operators, opStack, resStack) {
        return function(token, cleanOps) {
          cleanOps(operators, opStack, resStack)(
              token,
              (token, opStack) => {
                  let condLTR = opStack.length > 0 && 
                      token.priority <= opStack[opStack.length - 1].priority &&
                      !token.rtl;
                  let condRTL = opStack.length > 0 && 
                      token.priority < opStack[opStack.length - 1].priority &&
                      token.rtl;
  
                  return condLTR || condRTL;
              }
          )
          
          opStack.push(token);
        }
    },
  
    left_brace : function(operators, opStack, resStack) {
        return function(token) {
          opStack.push(token);
        }
    },
  
    right_brace : function(operators, opStack, resStack) {
        return function(token, cleanOps) {
            cleanOps(operators, opStack, resStack)(
                token,
                (token, opStack) => {
                  let cond = opStack.length > 0 &&
                      opStack[opStack.length - 1].type !== LEFT_BRACE;
                  return cond;
                }
            );
  
            if (opStack[opStack.length - 1].type === LEFT_BRACE) {
              opStack.pop();
            };
        }
    }

}

module.exports = {
    operators,
    rules : parseRules
}