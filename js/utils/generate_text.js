define(function(require) {
  // Require InvalidArgumentError
  var InvalidArgumentError = require('../errors/value_errors').InvalidArgumentError;

  // Require lists
  var WeightedList = require('../data_types/weighted_list');
  var OrderedNumberList = require('../data_types/ordered_number_list');

  // Word generating function
  function getRandomWord(charList, lengthList) {
    if(!(charList instanceof WeightedList))
      throw new InvalidArgumentError(charList);
    if (!(lengthList instanceof OrderedNumberList))
      throw new InvalidArgumentError(lengthList);

    var word = "";

    var wordLength = lengthList.getRandomKey();
    lengthList.increaseRank(wordLength);

    for (var i = 0; i < wordLength; i++) {
      var char = charList.getRandomKey();
      word += char;
      charList.increaseRank(char);
    }

    return word;
  }

  // Generating text function
  function generateText(action, charsAmount, charList, lengthList) {
    for (var i = 0; i < charsAmount; i++) {
      var word = getRandomWord(charList, lengthList);
      action(word);
    }

    charList.clearRanks();
    lengthList.clearRanks();
  };

  return generateText;
});
