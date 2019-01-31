// Define the module
define(function(require) {
  // Require empty list error
  var EmptyListError = require('../errors/property_errors').EmptyListError;

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

  return WeightedList;
});
