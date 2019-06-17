define(function() {
        /**
     * 
     * @param Object{
     *  ...,
     *  @param String operatorChar : @param Function operatorFunction
     *  ...
     * } operators 
     * @param Object[] opStack // array of tokens
     * @param Number[] resStack 
     */
    // Clean ops
    var cleanOps = function(operators, opStack, resStack) {
        return function(token, condition) {
            let cond = condition(token, opStack);
        
            while (cond) {
                let op = opStack.pop();
                let argsQueue = [];
                let arity = operators[op.value].length;

                for (let j = 1; j <= arity; j++) {
                    argsQueue.push(resStack.pop());
                }
                
                let result = operators[op.value].apply(null, argsQueue.reverse());
                resStack.push(result);
                
                cond = condition(token, opStack);
            }
        }
    }

    /**
     * 
     * @param Object{
     *  ...,
     *  @param String tokenType : @param Function(@param Object operators, @param Object[] opStack, @param Number[] resStack) action
     *  ...
     * } rules 
     * @param Object[] operators 
     */

    var parser = function(rules, operators) {
        return function(tokens) {
            var opStack = [];
            var resStack = [];
            
            for (let i = 0; i < tokens.length; i++) {
                let action = rules[tokens[i].type](operators, opStack, resStack);
                action(tokens[i], cleanOps);
            }
            
            cleanOps(operators, opStack, resStack)(
                null,
                (token, opStack) => {
                    return opStack.length > 0;
                }
            );
            
            return resStack[0];
        }
    }

    return parser;
});