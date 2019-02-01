define(function(require) {
  // Require weighted list class
  var WeightedList = require('./weighted_list');

  // Require InvalidArgumentError
  var InvalidArgumentError = require('../errors/value_errors').InvalidArgumentError;

  function countNumbers(min, max) {
    return Math.abs(max - min + 1);
  }

  // Weight function
  function weightNumber(number, min, max) {
    if ((min <= number) && (number <= max)) {
      var k = 1 / Math.sqrt(Math.PI);
      var l = (min + max) / 2;
      var s = countNumbers(min, max);
      return s * k * Math.exp(-Math.pow(number - l, 2));
    } else {
      return 0;
    }
  }

  // Number list class
  function OrderedNumberList(min, max) {
    WeightedList.apply(this, arguments);
  }

  OrderedNumberList.prototype = Object.create(WeightedList.prototype);
  OrderedNumberList.prototype.constructor = OrderedNumberList;

  OrderedNumberList.prototype._generateList = function(min, max) {
    if (!Number.isInteger(min))
      throw new InvalidArgumentError(min);
    if (!Number.isInteger(max))
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
      this[i] = weightNumber(i, leftBoundary, rightBoundary);
    }

    this._total = countNumbers(leftBoundary, rightBoundary);
  }

  return OrderedNumberList;
});
