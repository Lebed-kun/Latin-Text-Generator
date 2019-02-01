define(function(require) {
  // Require InvalidArgumentError
  var InvalidArgumentError = require('../errors/value_errors').InvalidArgumentError;

  // Require lists
  var WeightedList = require('../data_types/weighted_list');
  var OrderedNumberList = require('../data_types/ordered_number_list');
  var WordList = require('../data_types/word_list');

  function getRandomWord(wordList, charList, lengthList) {
    if(!(wordList instanceof WordList))
      throw new InvalidArgumentError(charList);
    if(!(charList instanceof WeightedList))
      throw new InvalidArgumentError(charList);
    if (!(lengthList instanceof OrderedNumberList))
      throw new InvalidArgumentError(lengthList);

    var word = wordList.getRandomKey(makeRandomWord, charList, lengthList);
    lengthList.increaseRank(word.length);
    wordList.increaseRank(word);

    for (var i = 0; i < word.length; i++) {
      charList.increaseRank(word[i]);
    }

    return word;
  }

  // Word generating function
  function makeRandomWord(charList, lengthList) {
    if(!(charList instanceof WeightedList))
      throw new InvalidArgumentError(charList);
    if (!(lengthList instanceof OrderedNumberList))
      throw new InvalidArgumentError(lengthList);

    var word = "";

    var wordLength = lengthList.getRandomKey();

    for (var i = 0; i < wordLength; i++) {
      var char = charList.getRandomKey();
      word += char;
    }

    return word;
  }

  // Generating text function
  // (action, wordCount, charList, lengthList, wordList)
  function generateText(options) {
    for (var i = 0; i < options.wordCount; i++) {
      var word = getRandomWord(options.wordList, options.charList, options.lengthList);
      options.action(word);
    }

    options.wordList.clearRanks();
    options.charList.clearRanks();
    options.lengthList.clearRanks();
  };

  return generateText;
});
