define(function(require) {
  // Require generateText function
  var generateText = require('./generate_text');

  // Output text area
  var outputTextArea = document.getElementById("output-text");

  // Type single word to the text field
  function typeWord(word) {
      outputTextArea.value += word + " ";
  }

  // Options for words
  var styleOptionList = {
    "lowercase" : function(word) {
                    outputTextArea.style.cssText = "text-transform: lowercase;";
                    typeWord(word);
                  },
    "camelize" : function(word) {
                    outputTextArea.style.cssText = "text-transform: capitalize;";
                    typeWord(word);
                  },
    "uppercase" : function(word) {
                    outputTextArea.style.cssText = "text-transform: uppercase;";
                    typeWord(word);
                  },
    getOptFunction : function(option) {
      return this[option];
    }
  };

  // Make a text
  var makeText = function(options) {
    outputTextArea.value = "";
    var generateOptions = {
      action : styleOptionList.getOptFunction(options.styleOption),
      wordCount : options.textLength,
      templateList : options.templateList,
      wordList : options.wordList
    };
    generateText(generateOptions);
  }

  return makeText;
})
