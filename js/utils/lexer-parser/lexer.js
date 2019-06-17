define(function() {
    /**
   * 
   * @param Object{
   *  ...,
   *  @param String regexp : @param Object{
   *      type : @param String,
   *      priority : @param Number // for operators
   *      rtl : @param Boolean // for operators (optional)
   *  } token,
   *  ...
   * } lexems
   *  
   * @param Function(@param Object token, @param Object[] outputLexems)[] rules 
   * 
   * 
   */

  var lexer = function(lexems, rules) {
    return function(str) {
      let remString = str;
      let outputLexems = [];
      
      while (remString.length > 0) {
        for (let lex in lexems) {
          remString = remString.trim();
          
          let regex = new RegExp('^' + lex);
          let match = remString.match(regex);
          
          if (match) {
            let token = Object.create(lexems[lex]);
            token.value = match[0];
            
            for (let i = 0; rules && i < rules.length; i++) {
              rules[i](token, outputLexems);
            }
            
            outputLexems.push(token);
            remString = remString.replace(regex, '');
            break;
          }
        }
      }
      
      return outputLexems;
    }
  }

  return lexer;
});
