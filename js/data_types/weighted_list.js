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
    var collection;
    if (typeof arguments[0] == 'object') {
      collection = arguments[0];
    } else {
      collection = arguments;
    }


    for (var i = 0; i < collection.length; i++) {
      this[collection[i]] = this[collection[i]] === undefined ? 1 : this[collection[i]] + 1;
      this._total++;
    }
  }

  WeightedList.prototype.getRandomKey = function() {
    if (this._total < 1)
      throw new EmptyListError();

    var num = Math.random();
    var lowerBound = 0;

    var keys = Object.keys(this);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] != "_total") {
        if (num < lowerBound + this[keys[i]] / this._total) {
          return keys[i];
        }
        lowerBound += this[keys[i]] / this._total;
      }
    }

    return keys[keys.length - 1];
  };

  WeightedList.prototype.increaseRank = function(key) {
    if (key !== undefined && key != "_total") {
      if (this[key] !== undefined) {
        this[key]++;
      } else {
        this[key] = 1;
      }

      this._total++;
    }
  };

  WeightedList.prototype.clearRanks = function() {
    var keys = Object.keys(this);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] != "_total") {
        this._total -= this[keys[i]] - 1;
        this[keys[i]] = 1;
      }
    }
  };

  return WeightedList;
});
