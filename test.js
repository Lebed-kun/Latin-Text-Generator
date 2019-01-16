function Test(testName, func /*, expectedOutput, okMessage, failMessage */) {
	this.testName = testName;
	
	var optArgs = [].slice.call(arguments, 2);

	this.okMessage = optArgs[1] || 'Passed!';
	this.failMessage = optArgs[2] || 'Failed!';
	this._function = func;
	this._expectedOutput = optArgs[0] || undefined;
	this._result = undefined;
}

Test.prototype.setExpectedOutput = function(expectedOutput) {
	this._expectedOutput = expectedOutput;
}

Test.prototype._getTestResult = function() {
	if (this._result === undefined)
		this._result = this._function.apply(this, arguments);
	return this._result === this._expectedOutput;
}

Test.prototype.showTestResult = function() {
	console.log(this.testName);

	var status;
	if (this._getTestResult.apply(this, arguments))
		status = this.okMessage;
	else
		status = this.failMessage;

	console.log(" - Status: " + status);
	if (!this._getTestResult(arguments)) {
		console.log(" - Expected " + this._result 
			+ " equal to " + this._expectedOutput);
	}
}

function TestOnObjects(testName, func) {
	Test.apply(this, arguments);
	this._jsoned = false;
}

TestOnObjects.prototype = Object.create(Test.prototype);
TestOnObjects.prototype.constructor = TestOnObjects;

TestOnObjects.prototype._getTestResult = function() {
	var testResult = Test.prototype._getTestResult.apply(this, arguments);
	if (!this._jsoned) {
		this._result = JSON.stringify(this._result);
		this._expectedOutput = JSON.stringify(this._expectedOutput);

		this._jsoned = true;
	}
	return testResult || this._result === this._expectedOutput;
}

TestOnObjects.prototype.showTestResult = function() {
	Test.prototype.showTestResult.apply(this, arguments);
	if (this._jsoned) {
		this._result = JSON.parse(this._result);
		this._expectedOutput = JSON.parse(this._expectedOutput);

		this._jsoned = false;
	}
}
// Test WeightedList class +++++

 // Creating empty list +++ 
var testEmptyWL = new TestOnObjects("Create empty weighted list", function() {
	return new WeightedList();
}, {_total : 0});
testEmptyWL.showTestResult();

// Creating list of single element +++ 
var testWL1 = new TestOnObjects("Create weighted list of one element", function() {
	return new WeightedList(['i']);
}, {_total : 1, 'i' : 1});
testWL1.showTestResult();

// Creating list of latin characters +++
var createLatinList = function() {
	var LETTER_A = 97;
    var LETTER_Z = 122;

    var chars = [];
    for (var i = LETTER_A; i <= LETTER_Z; i++) {
      chars.push(String.fromCharCode(i));
    }

    return chars;
}

var testWLLatin = new TestOnObjects("Create list of latin characters", function() {
	return new WeightedList(createLatinList());
}, (function() {
	var LETTER_A = 97;
    var LETTER_Z = 122;

    var chars = {_total : 0};
    for (var i = LETTER_A; i <= LETTER_Z; i++) {
      chars[String.fromCharCode(i)] = 1;
      chars._total++;
    }

    return chars;
})());

testWLLatin.showTestResult(); 

var createLatinList = function() {
	var LETTER_A = 97;
    var LETTER_Z = 122;

    var chars = [];
    for (var i = LETTER_A; i <= LETTER_Z; i++) {
      chars.push(String.fromCharCode(i));
    }

    return chars;
}

//var latinList = new WeightedList(createLatinList());

// WL.getRandomKey(..) test +++
/*var N = 10;
for (var i = 0; i < N; i++) {
	console.log(latinList.getRandomKey());
} 

// WL.increaseRank(...) +++

/*var testWLIncreaseRank = new Test("Increasing rank of 'x' ", function(num) {
	for (var i = 0; i < num; i++) {
		latinList.increaseRank('x');
	}
	return latinList['x'];
});

testWLIncreaseRank.setExpectedOutput(51);
testWLIncreaseRank.showTestResult(50);  */

// WL.clearRanks() +++

/*var testWLClearRanks = new Test("Clear ranks ", function(char, times) {
	for (var i = 0; i < times; i++) {
		latinList.increaseRank(char);
	}
	latinList.clearRanks();
	return latinList[char];
}, 1);

testWLClearRanks.showTestResult('b', 50); */

//WL.clearRanks() of new list +++

/* var testNewWLClearRanks = new Test("Clear ranks of new list ", function() {
	var weightedList = new WeightedList([1, 2, 3]);
	weightedList.clearRanks();
	return weightedList[2];
}, 1);

testNewWLClearRanks.showTestResult(); */


// Test OrderedNumberList class

// Attempting to create ONL without boundaries +++
/*var testONL = new TestOnObjects("Attempting to create ONL without boundaries ", function() {
	return new OrderedNumberList();
});

testONL.showTestResult(); */


// Attempting to create ONL without a boundary +++

/*var testONL = new TestOnObjects("Attempting to create ONL without a boundary",
function() {
	return new OrderedNumberList(2);
} );

testONL.showTestResult(); */

// Creating ONL +++

var testONL = new TestOnObjects("Creating ONL ", function() {
	return new OrderedNumberList(3, 8);
}, (function() {
	var numList = {_total : 0};
	for (var i = 3; i <= 8; i++) {
		numList[i] = 1;
		numList._total++;
	}
	return numList;
})());

testONL.showTestResult();

// Get random word

