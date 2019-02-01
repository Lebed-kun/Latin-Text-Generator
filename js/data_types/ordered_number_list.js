define(function(require) {
  // Require weighted list class
  var WeightedList = require('./weighted_list');

  // Require InvalidArgumentError
  var InvalidArgumentError = require('../errors/value_errors').InvalidArgumentError;

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
      this[i] = this[i] === undefined ? 1 : this[i] + 1;

      this._total++;
    }
  }

  return OrderedNumberList;
});
