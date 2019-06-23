define(function(require) {
  // Require errors
  var errors = require('../errors/value_errors');
  var ValueError = errors.ValueError;
  var IsNaNError = errors.IsNaNError;

  //Require lists
  var WordList = require('../data_types/word_list');
  var WeightedList = require('../data_types/weighted_list');

  var getWordList = function() {
    return new WordList();
  }

  // Get phonetic template list
  var getTemplateList = function() {
    return new WeightedList([
      'CV', 'CVC', 'CVCV',
      'CVCCV', 'CVCVCV', 'CCVCV',
      'CVCCVCV', 'CCVCVCV'
    ])
  }

  // Get text length from user input
  var getTextLength = function() {
    var MIN_TEXT_LENGTH = 1;
    var MAX_TEXT_LENGTH = 10000;

    var textLengthInput = document.getElementById("input-text-len");
    var textLength = +textLengthInput.value;

    // Error conditions
    if (isNaN(textLength))
      throw new IsNaNError(textLengthInput.value);
    if (!Number.isInteger(textLength))
      throw new ValueError(textLengthInput.value);
    if ((textLength < MIN_TEXT_LENGTH) || (textLength > MAX_TEXT_LENGTH))
      throw new ValueError(textLengthInput.value);

    return textLength;
  };

  // Get additional option
  var getStyleOption = function() {
    var selectBox = document.getElementById("select-option");

    return selectBox.options[selectBox.selectedIndex].value;
  };

  return {
    getTextLength : getTextLength,
    getTemplateList : getTemplateList,
    getWordList : getWordList,
    getStyleOption : getStyleOption
  }
});
