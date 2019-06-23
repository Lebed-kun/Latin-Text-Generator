define(function(require) {
  // Require InvalidArgumentError
  var InvalidArgumentError = require('../errors/value_errors').InvalidArgumentError;

  // Require lists
  var WeightedList = require('../data_types/weighted_list');
  var WordList = require('../data_types/word_list');

  // Require phonetic template parser
  var phParser = require('../phonetic_templator/fullParser');

  function getRandomWord(wordList, templateList) {
    if(!(wordList instanceof WordList))
      throw new InvalidArgumentError(wordList);
    if (!(templateList instanceof WeightedList))
      throw new InvalidArgumentError(templateList);

    var word = wordList.getRandomKey(makeRandomWord, templateList);
    wordList.increaseRank(word);

    return word;
  }

  // Word generating function
  function makeRandomWord(templateList) {
    if (!(templateList instanceof WeightedList))
      throw new InvalidArgumentError(templateList);

    var template = templateList.getRandomKey();
    templateList.increaseRank(template);
    var word = phParser(template);

    return word;
  }

  // Generating text function
  // (action, wordCount, charList, lengthList, wordList)
  function generateText(options) {
    for (var i = 0; i < options.wordCount; i++) {
      var word = getRandomWord(options.wordList, options.templateList);
      options.action(word);
    }

    options.wordList.clearRanks();
    options.templateList.clearRanks();
  };

  return generateText;
});
