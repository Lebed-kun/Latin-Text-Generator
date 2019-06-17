// Math expression interpreter
var mathEval = require('./examples/mathParser/mathParser');

// Test
var value = mathEval('(100 - 80.5) / 1.11 + sin(100)');
console.log(value);
