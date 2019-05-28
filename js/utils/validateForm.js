define(function() {
    function makeValidator(name, condition) {
        return function(input) {
            if (!input.hasAttribute('data-' + name)) return true;
            return condition(input);
        }
    }
    
    var validators = [
        // check required
        makeValidator('required', function(input) {
            return input.value.length > 0;
        }),
        // check number
        makeValidator('validator', function(input) {
            return !isNaN(+input.value);
        }),
        // check min value
        makeValidator('min-value', function(input) {
            return +input.value >= +input.getAttribute('data-min-value');
        }),
        // check max value
        makeValidator('max-value', function(input) {
            return +input.value <= +input.getAttribute('data-max-value');
        })
    ];
    
    function validateForm(options) {
        var inputErrorClass = options.inputErrorClass;
        
        var form = document.getElementById(options.formId);
        var inputs = form.querySelectorAll('input, textarea');

        for (var i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('focus', function(e) {
                if (e.target.classList.contains(inputErrorClass)) {
                    e.target.classList.remove(inputErrorClass);
                }
            });

            inputs[i].addEventListener('blur', function(e) {
                for (var j = 0; j < validators.length; j++) {
                    if (!validators[j](e.target) && !e.target.classList.contains(inputErrorClass)) {
                        e.target.classList.add(inputErrorClass);
                    }
                }
            });
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (e.target.classList.contains(options.formInvalidClass)) {
                e.target.classList.remove(options.formInvalidClass);
            }

            for (var i = 0; i < inputs.length; i++) {
                for (var j = 0; j < validators.length; j++) {
                    if (!validators[j](inputs[i])) {
                        if (!inputs[i].classList.contains(inputErrorClass)) {
                            inputs[i].classList.add(inputErrorClass);
                        }
                        
                        if (!e.target.classList.contains(options.formInvalidClass)) {
                            e.target.classList.add(options.formInvalidClass);
                            i = inputs.length;
                            break;
                        }
                    } else if (inputs[i].classList.contains(inputErrorClass)) {
                        inputs[i].classList.remove(inputErrorClass);
                    }
                }
            }
        });
    }

    return validateForm;
});