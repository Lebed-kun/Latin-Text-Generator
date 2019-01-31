define(function(require) {
  // Require value error
  var ValueError = require('./errors/value_errors').ValueError;

  // Require EmptyListError
  var EmptyListError = require('./errors/property_errors').EmptyListError;

  // Require functions that returns data for text generation
  var getData = require('./utils/get_data');
  var makeLatinCharList = getData.makeLatinCharList;
  var getTextLength = getData.getTextLength;
  var getWordLengthList = getData.getWordLengthList;
  var getOption = getData.getOption;

  // Require function for setting output text
  var makeText = require('./utils/set_text');

  // Require function for marking inputs with invalid values
  var markInvalidField = require('./utils/mark_invalid_field').markInvalidField;

  // Runs tasks for text generation
  var run = function() {
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

  return {
    run : run
  }
});
