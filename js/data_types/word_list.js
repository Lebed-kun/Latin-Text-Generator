define(function(require) {
  // Require WeightedList class
  var WeightedList = require('./weighted_list');

  function WordList() {
    WeightedList.apply(this, arguments);
  }

  WordList.prototype = Object.create(WeightedList.prototype);
  WordList.prototype.constructor = WordList;

  WordList.prototype._generateList = function() {
    WeightedList.prototype._generateList.apply(this, arguments);
    this._newWord = 1;
    this._total++;
  }

  WordList.prototype.getRandomKey = function(makeRandomWord, charList, lengthList) {
    var key = WeightedList.prototype.getRandomKey.call(this);

    if (key == '_newWord') {
      var word = makeRandomWord(charList, lengthList);
      if (!this[word]) {
        this[word] = 1;
        this._newWord++;
        this._total++;
      }
      return word;
    } else {
      return key;
    }
  }

  WordList.prototype.increaseRank = function(key) {
    if (key != '_newWord') {
      WeightedList.prototype.increaseRank.call(this, key);
    }
  }

  return WordList;
})
