define(function(require) {
  // Require value error
  var ValueError = require('./errors/value_errors').ValueError;

  // Require EmptyListError
  var EmptyListError = require('./errors/property_errors').EmptyListError;

  // Require functions that returns data for text generation
  var getData = require('./utils/get_data');
  var getTextLength = getData.getTextLength;
  var getTemplateList = getData.getTemplateList;
  var getWordList = getData.getWordList;
  var getStyleOption = getData.getStyleOption;

  // Require function for setting output text
  var makeText = require('./utils/set_text');

  // Require function for validating form and validate form
  var validateForm = require('./utils/validateForm');
  validateForm({
    formId : 'form-text-gen',
    inputErrorClass : 'input-error',
    formInvalidClass : 'form-invalid'
  });

  // Runs tasks for text generation
  var run = function() {
    try {
      var textLength = getTextLength();
      var templateList = getTemplateList();
      var wordList = getWordList();
      var styleOption = getStyleOption();

      makeText({
        styleOption : styleOption,
        textLength : textLength,
        templateList : templateList,
        wordList : wordList
      });
    } catch (error) {
       if (error instanceof ValueError) {
         console.log(error.stack);
       } else if (error instanceof EmptyListError)  {
          console.log(error.stack);
       } else {
         throw error;
       }
    }
  }

  return {
    run : run
  }
});
