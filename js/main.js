// Define the man site module
define(function(require) {
    // Require function that runs when button is clicked
    var run = require('./run').run;

    // Where the application starts its work
    var genTextButton = document.getElementById("button-gen-text");
    genTextButton.onclick = run;
});
