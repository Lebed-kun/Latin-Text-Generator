// Define the module
define(function() {
  // Errors of kind of ValueError
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

  // Error caused when arguments of function are invalid
  function InvalidArgumentError(arg) {
    ValueError.apply(this, arguments);
    this.name = "InvalidArgumentError";
    this.message = "Invalid argument " + arg + " of function";
  }
  InvalidArgumentError.prototype = Object.create(ValueError.prototype);
  InvalidArgumentError.prototype.constructor = InvalidArgumentError;

  // Error caused when value is NaN
  function IsNaNError(value) {
    ValueError.apply(this, arguments);
    this.name = "IsNaNError";
    this.message = value + "is not a valid number";
  }
  IsNaNError.prototype = Object.create(ValueError.prototype);
  IsNaNError.prototype.constructor = IsNaNError;

  return {
    ValueError : ValueError,
    InvalidArgumentError : InvalidArgumentError,
    IsNaNError : IsNaNError
  };
});
