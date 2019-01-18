// Error in property (of object)
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

// Error caused when list is empty
function EmptyListError() {
  PropertyError.call(this, "total");
  this.name = "EmptyListError";
  this.message = "The list is empty";
}
EmptyListError.prototype = Object.create(PropertyError.prototype);
EmptyListError.prototype.constructor = EmptyListError;

// Define the module
define(function() {
  return {
    EmptyListError : EmptyListError
  }
})
