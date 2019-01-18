// Custom errors
function PropertyError(property) {
  this.name = "PropertyError";
  this.property = property;
  this.message = "Error in property " + property;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  }
  else {
    this.stack = (new Error()).stack;
  }
}
PropertyError.prototype = Object.create(Error.prototype);
PropertyError.prototype.constructor = PropertyError;

function ValueError(value) {
  this.name = "ValueError";
  this.message = "Incorrect value  " + value;
  this.value = value;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error()).stack;
  }
}
ValueError.prototype = Object.create(Error.prototype);
ValueError.prototype.constructor = ValueError;

function InvalidArgumentError(arg) {
  ValueError.apply(this, arguments);
  this.name = "InvalidArgumentError";
  this.message = "Invalid argument " + arg + " of function";
}
InvalidArgumentError.prototype = Object.create(ValueError.prototype);
InvalidArgumentError.prototype.constructor = InvalidArgumentError;

function EmptyListError() {
  PropertyError.call(this, "total");
  this.name = "EmptyListError";
  this.message = "The list is empty";
}
EmptyListError.prototype = Object.create(PropertyError.prototype);
EmptyListError.prototype.constructor = EmptyListError;

function IsNaNError(value) {
  ValueError.apply(this, arguments);
  this.name = "IsNaNError";
  this.message = value + "is not a valid number";
}
IsNaNError.prototype = Object.create(ValueError.prototype);
IsNaNError.prototype.constructor = IsNaNError;

// Character-rank list class
function WeightedList(/* ...keys */) {
  this._total = 0;
  this._generateList.apply(this, arguments);
}

WeightedList.prototype._generateList = function() {
  var arr;
  if (Array.isArray(arguments[0])) {
    arr = arguments[0];
  } else {
    arr = arguments;
  }

  for (var i = 0; i < arr.length; i++) {
    this[arr[i]] = this[arr[i]] === undefined ? 1 : this[arr[i]] + 1;

    this._total++;
  }

}

WeightedList.prototype.getRandomKey = function() {
  if (this._total < 1)
    throw new EmptyListError();

  var num = Math.random();
  var lowerBound = 0;
  for (var key in this) {
    if (key != "_total") {
      if (num < lowerBound + this[key] / this._total) {
        return key;
      }

      lowerBound += this[key] / this._total;
    }
  }
};

WeightedList.prototype.increaseRank = function(key) {
  if (key !== undefined && key != "_total") {
    this[key]++;
    this._total++;
  }
};

WeightedList.prototype.clearRanks = function() {
  for (var key in this) {
    if (key != "_total") {
      this._total -= this[key] - 1;
      this[key] = 1;
    }
  }
};

// Number list class
function OrderedNumberList(min, max) {
  WeightedList.apply(this, arguments);
}

OrderedNumberList.prototype = Object.create(WeightedList.prototype);
OrderedNumberList.prototype.constructor = OrderedNumberList;

OrderedNumberList.prototype._generateList = function(min, max) {
  if (!Number.isInteger(+min))
    throw new InvalidArgumentError(min);
  if (!Number.isInteger(+max))
    throw new InvalidArgumentError(max);

  var leftBoundary, rightBoundary;
  if (min > max) {
    leftBoundary = +max;
    rightBoundary = +min;
  } else {
    leftBoundary = +min;
    rightBoundary = +max;
  }

  for (var i = leftBoundary; i <= rightBoundary; i++) {
    this[i] = this[i] === undefined ? 1 : this[i] + 1;

    this._total++;
  }
}

// Word generating function
function getRandomWord(charList, lengthList) {
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

// Where the application starts its work

window.onload = function() {
  var outputTextArea = document.getElementById("output-text");

  function typeWord(word) {
      outputTextArea.value += word + " ";
  }

  var optionList = {
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
}


  // Get text length from user input
  var getTextLength = function() {
    var MIN_TEXT_LENGTH = 1;
    var MAX_TEXT_LENGTH = 10000;

    var textLengthInput = document.getElementById("input-text-len");
    var textLength = +textLengthInput.value;

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

    if (minLength < MIN_WORD_LENGTH)
      throw new ValueError(minLength);
    if (maxLength > MAX_WORD_LENGTH)
      throw new ValueError(maxLength);

    var wordLengthList = new OrderedNumberList(minLength, maxLength);

    return wordLengthList;
  }

  // Get additional option
  var getOption = function() {
    var selectBox = document.getElementById("select-option");

    return selectBox.options[selectBox.selectedIndex].value;
  }

  // Make a text
  var makeText = function(textLength, charList, lengthList, option) {
    generateText(optionList.getOptFunction(option), textLength, charList, lengthList);
  }

  // Combining things together
  var run = function() {
    var inputs = document.getElementsByTagName("input");

    function markInvalidField(value) {
      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value === value) {
          inputs[i].style.cssText = "background-color: 	#eb5153";

          if (Event.oninput && !inputs[i].oninput) {
            inputs[i].oninput = function me() {
              if (inputs[me.i].hasAttribute("style"))
                inputs[me.i].removeAttribute("style");
            }
            inputs[i].oninput.i = i;
          } else if (!inputs[i].onchange) {
            inputs[i].onchange = function me() {
              if (inputs[me.i].hasAttribute("style"))
                inputs[me.i].removeAttribute("style");
            }
            inputs[i].onchange.i = i;
          }
          break;
        }
      }
    }

    try {
      var latinCharList = makeLatinCharList();
      var textLength = getTextLength();
      var lengthList = getWordLengthList();
      var option = getOption();

      makeText(textLength, latinCharList, lengthList, option);
    } catch (error) {
       if (error instanceof ValueError) {
         markInvalidField(error.value);
       } else if (error instanceof EmptyListError)  {
          console.log("Error in function latinCharList : " + error);
       } else {
         throw error;
       }
    }
  }

  var genTextButton = document.getElementById("button-gen-text");
  genTextButton.onclick = run;
}
