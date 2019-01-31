define(function(require) {
  // Require errors
  var errors = require('../errors/value_errors');
  var ValueError = errors.ValueError;
  var IsNaNError = errors.IsNaNError;

  //Require lists
  var WeightedList = require('../data_types/weighted_list');
  var OrderedNumberList = require('../data_types/ordered_number_list');
  var WordList = require('../data_types/word_list');

  // Creating latin characters list
  var makeLatinCharList = function() {
      var latinCharList = new WeightedList((function() {
        var LETTER_A = 97;
        var LETTER_Z = 122;

        var chars = [];
        for (var i = LETTER_A; i <= LETTER_Z; i++) {
          chars.push(String.fromCharCode(i));
        }

        return chars;
    })());

    return latinCharList;
  };

  var getWordList = function() {
    return new WordList();
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

  // Get list of possible word lengths
  var getWordLengthList = function() {
    var MIN_WORD_LENGTH = 1;
    var MAX_WORD_LENGTH = 25;

    var minLengthInput = document.getElementById("input-min-len");
    var maxLengthInput = document.getElementById("input-max-len");

    var minLength = +minLengthInput.value;
    var maxLength = +maxLengthInput.value;

    // Error conditions
    if (!minLengthInput.value)
      throw new ValueError(minLengthInput.value);
    if (!maxLengthInput.value)
      throw new ValueError(maxLengthInput.value);

    if (isNaN(minLength))
      throw new IsNaNError(minLengthInput.value);
    if (isNaN(maxLength))
      throw new IsNaNError(maxLengthInput.value);

    if (minLength < MIN_WORD_LENGTH)
      throw new ValueError(minLengthInput.value);
    if (maxLength > MAX_WORD_LENGTH)
      throw new ValueError(maxLengthInput.value);

    // Make new list of word lengths
    var wordLengthList = new OrderedNumberList(minLength, maxLength);

    return wordLengthList;
  };

  // Get additional option
  var getStyleOption = function() {
    var selectBox = document.getElementById("select-option");

    return selectBox.options[selectBox.selectedIndex].value;
  };

  return {
    makeLatinCharList : makeLatinCharList,
    getTextLength : getTextLength,
    getWordLengthList : getWordLengthList,
    getWordList : getWordList,
    getStyleOption : getStyleOption
  }
});
