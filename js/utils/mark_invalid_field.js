define(function() {
  // Input fields
  var inputs = document.getElementsByTagName("input");

  // Mark field with invalid values
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

  return {
    markInvalidField : markInvalidField
  }
});
